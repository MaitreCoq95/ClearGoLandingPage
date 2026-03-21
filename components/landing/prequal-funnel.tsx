"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { X, ChevronLeft, CheckCircle2, AlertTriangle, Zap, Target, Building2, Loader2 } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

type Answers = Record<string, string>

interface SiretData {
  nom: string
  siren: string
  siret: string
  adresse: string
  ville: string
  codePostal: string
  naf: string
  libelleNaf: string
  effectif: string
  dateCreation: string
  formeJuridique: string
  isTransport: boolean
}

const EFFECTIF_LABELS: Record<string, string> = {
  "00": "Non employeur", "01": "1 à 2 salariés", "02": "3 à 5 salariés",
  "03": "6 à 9 salariés", "11": "10 à 19 salariés", "12": "20 à 49 salariés",
  "21": "50 à 99 salariés", "22": "100 à 199 salariés", "31": "200 à 249 salariés",
  "32": "250 à 499 salariés", "41": "500 à 999 salariés", "42": "1 000 à 1 999 salariés",
  "51": "2 000 à 4 999 salariés", "52": "5 000 à 9 999 salariés", "53": "10 000+ salariés",
}

const TRANSPORT_NAF = ["4941", "4942", "4939", "4932", "5229", "5210", "5224", "4931", "4950"]

async function fetchSiretData(siret: string): Promise<SiretData | null> {
  try {
    const res = await fetch(
      `https://recherche-entreprises.api.gouv.fr/search?q=${siret.replace(/\s/g, "")}&page=1&per_page=1`
    )
    if (!res.ok) return null
    const data = await res.json()
    const r = data.results?.[0]
    if (!r) return null
    const nafCode = (r.activite_principale ?? "").replace(".", "").slice(0, 4)
    return {
      nom:             r.nom_complet ?? "",
      siren:           r.siren ?? "",
      siret:           r.siege?.siret ?? siret,
      adresse:         r.siege?.adresse ?? "",
      ville:           r.siege?.commune ?? "",
      codePostal:      r.siege?.code_postal ?? "",
      naf:             r.activite_principale ?? "",
      libelleNaf:      r.libelle_activite_principale?.naf ?? "",
      effectif:        EFFECTIF_LABELS[r.tranche_effectif_salarie ?? ""] ?? "Non renseigné",
      dateCreation:    r.date_creation
        ? new Date(r.date_creation).toLocaleDateString("fr-FR", { year: "numeric", month: "long" })
        : "",
      formeJuridique:  r.nature_juridique ?? "",
      isTransport:     TRANSPORT_NAF.some((c) => nafCode.startsWith(c)),
    }
  } catch {
    return null
  }
}

interface Question {
  id: string
  type: "choice" | "open"
  label: string
  hint: string | null
  options?: string[]
  placeholder?: string
  block: string
  optional?: boolean
}

interface Swot {
  forces: string[]
  faiblesses: string[]
  opportunites: string[]
  menaces: string[]
}

interface SynthesisData {
  profilType: string
  profilSub: string
  pills: string[]
  douleurs: string[]
  urgence: 1 | 2 | 3
  reco: string[]
  citation: string
  swot: Swot
}

// ─── Questions ───────────────────────────────────────────────────────────────

const QUESTIONS: Question[] = [
  // ── Bloc 1 : Votre profil ──────────────────────────────────────────────────
  {
    id: "role",
    type: "choice",
    block: "Votre profil",
    label: "Quel est votre rôle dans l'entreprise ?",
    hint: "Pour personnaliser votre diagnostic.",
    options: [
      "Dirigeant / Gérant",
      "Responsable d'Exploitation",
      "Responsable QSE / QHSE",
      "Responsable Administratif",
      "Associé / Co-fondateur",
    ],
  },
  {
    id: "structure",
    type: "choice",
    block: "Votre profil",
    label: "Quel type de structure êtes-vous ?",
    hint: null,
    options: [
      "Entreprise individuelle / auto-entrepreneur",
      "Société familiale (2e génération+)",
      "PME en croissance",
      "Groupe / multi-sites",
    ],
  },
  {
    id: "phase",
    type: "choice",
    block: "Votre profil",
    label: "Où en est votre entreprise aujourd'hui ?",
    hint: "Soyez honnête — ça aide à calibrer le bon accompagnement.",
    options: [
      "Démarrage — je saisis une opportunité de marché",
      "Croissance rapide — j'ai du mal à tout structurer",
      "Consolidation — je veux professionnaliser",
      "Restructuration — je dois remettre de l'ordre",
    ],
  },

  // ── Bloc 2 : Votre activité ────────────────────────────────────────────────
  {
    id: "activite",
    type: "choice",
    block: "Votre activité",
    label: "Quel type de transport exercez-vous ?",
    hint: "Chaque activité a ses propres obligations réglementaires.",
    options: [
      "Transport général (TRM)",
      "Température dirigée",
      "Pharma / GDP",
      "ADR — Matières dangereuses",
      "Messagerie / Colis / DSP e-commerce",
    ],
  },
  {
    id: "clients",
    type: "choice",
    block: "Votre activité",
    label: "Qui sont vos principaux clients ?",
    hint: "Les exigences varient fortement selon le type de donneur d'ordre.",
    options: [
      "Grands comptes / donneurs d'ordre structurés",
      "E-commerce / DSP (Amazon, Cdiscount…)",
      "Clients pharmaceutiques / Healthcare",
      "Industrie / B2B",
      "Clientèle mixte",
    ],
  },
  {
    id: "flotte",
    type: "choice",
    block: "Votre activité",
    label: "Quelle est la taille de votre flotte ?",
    hint: "Chaque véhicule est un point de contrôle.",
    options: ["1 à 5 véhicules", "6 à 20 véhicules", "21 à 50 véhicules", "50+ véhicules"],
  },
  {
    id: "conducteurs",
    type: "choice",
    block: "Votre activité",
    label: "Combien de conducteurs gérez-vous ?",
    hint: "FCO, FIMO, aptitudes médicales — c'est là que tout commence.",
    options: ["1 à 5", "6 à 20", "21 à 50", "50+"],
  },

  // ── Bloc 3 : Vos douleurs ──────────────────────────────────────────────────
  {
    id: "controle",
    type: "choice",
    block: "Vos douleurs",
    label: "Avez-vous déjà eu un contrôle DRIEAT ou DREAL ?",
    hint: null,
    options: [
      "Non, jamais",
      "Oui, sans problème",
      "Oui, avec des sanctions",
      "Un contrôle est prévu dans les 6 mois",
    ],
  },
  {
    id: "contratPerdu",
    type: "choice",
    block: "Vos douleurs",
    label: "Avez-vous déjà perdu un contrat faute de prouver votre conformité ?",
    hint: null,
    options: [
      "Oui, ça m'est arrivé",
      "Non, mais je le crains",
      "Non, pas mon problème",
      "Je ne sais pas",
    ],
  },
  {
    id: "douleurLibre",
    type: "open",
    block: "Vos douleurs",
    label: "Décrivez votre principal problème aujourd'hui.",
    hint: "En quelques mots — qu'est-ce qui vous empêche de dormir la nuit côté conformité ?",
    placeholder:
      "Ex : je n'ai pas le temps de suivre les formations de mes chauffeurs, mes documents sont éparpillés partout...",
  },

  // ── Bloc 4 : Vos objectifs ─────────────────────────────────────────────────
  {
    id: "priorite",
    type: "choice",
    block: "Vos objectifs",
    label: "Quelle est votre priorité n°1 aujourd'hui ?",
    hint: null,
    options: [
      "Passer un audit sans stress",
      "Décrocher de nouveaux appels d'offres",
      "Obtenir une certification ISO ou GDP",
      "Structurer ma conformité de A à Z",
    ],
  },
  {
    id: "frein",
    type: "choice",
    block: "Vos objectifs",
    label: "Quel est votre principal frein pour avancer ?",
    hint: null,
    options: [
      "Manque de temps",
      "Budget limité",
      "Manque de méthode — je ne sais pas par où commencer",
      "Je gère seul, sans ressource dédiée",
    ],
  },
  {
    id: "declicLibre",
    type: "open",
    block: "Vos objectifs",
    label: "Qu'est-ce qui vous a poussé à chercher une solution aujourd'hui ?",
    hint: "Un événement déclencheur ? Une pression client ? Un audit difficile ?",
    placeholder:
      "Ex : j'ai failli perdre un gros client qui me demandait une preuve de conformité...",
    optional: true,
  },
  {
    id: "roi",
    type: "choice",
    block: "Vos objectifs",
    label: "Qu'est-ce qui justifierait l'investissement pour vous ?",
    hint: "Ce qui compte vraiment au bout du compte.",
    options: [
      "Décrocher 1 nouveau contrat grâce à ma conformité",
      "Éviter une sanction ou un audit raté",
      "Gagner du temps sur la gestion documentaire",
      "Valoriser mon entreprise auprès de mes clients actuels",
    ],
  },

  // ── Bloc 5 : Votre organisation ────────────────────────────────────────────
  {
    id: "outils",
    type: "choice",
    block: "Votre organisation",
    label: "Comment gérez-vous votre conformité aujourd'hui ?",
    hint: "Pour comprendre d'où vous partez.",
    options: [
      "Fichiers Excel / Google Sheets",
      "Papier et classeurs physiques",
      "Un logiciel dédié (ERP, TMS…)",
      "Je ne gère pas vraiment — c'est le flou",
    ],
  },
  {
    id: "rse",
    type: "choice",
    block: "Votre organisation",
    label: "Avez-vous des engagements RSE ou environnementaux ?",
    hint: "De plus en plus de donneurs d'ordre l'exigent — c'est aussi un levier de différenciation.",
    options: [
      "Oui, c'est une priorité stratégique pour nous",
      "Oui, mais je ne sais pas comment les structurer ou documenter",
      "C'est une attente de mes clients — je dois m'y mettre",
      "Non, pas encore concerné",
    ],
  },
  {
    id: "securite",
    type: "choice",
    block: "Votre organisation",
    label: "Où en êtes-vous sur la sécurité au travail ?",
    hint: "DUERP, ISO 45001, accidents du travail — un angle souvent négligé mais très contrôlé.",
    options: [
      "DUERP à jour et suivi régulièrement",
      "DUERP existant mais pas mis à jour",
      "Pas de DUERP formalisé — je dois m'y mettre",
      "Je ne sais pas ce que c'est",
    ],
  },
  {
    id: "qse",
    type: "choice",
    block: "Votre organisation",
    label: "Avez-vous un responsable QSE en interne ?",
    hint: "Pour calibrer l'accompagnement selon votre organisation.",
    options: [
      "Oui, une personne dédiée",
      "Je partage la fonction",
      "Je gère moi-même",
      "Non, j'en ai besoin",
    ],
  },
  {
    id: "docsAJour",
    type: "choice",
    block: "Votre organisation",
    label: "Vos documents de conformité sont-ils à jour ?",
    hint: null,
    options: [
      "Oui, complètement",
      "Partiellement",
      "Non, c'est désorganisé",
      "Je ne sais pas évaluer",
    ],
  },
  {
    id: "delai",
    type: "choice",
    block: "Votre organisation",
    label: "Dans quel délai avez-vous besoin de résultats ?",
    hint: null,
    options: [
      "Dans le mois — c'est urgent",
      "1 à 3 mois",
      "3 à 6 mois",
      "Plus de 6 mois",
    ],
  },
]

const TOTAL = QUESTIONS.length // 15 questions + contact = 16 étapes

// ─── Synthesis generator ──────────────────────────────────────────────────────

function generateSynthesis(answers: Answers): SynthesisData {
  const role      = answers.role      ?? ""
  const phase     = answers.phase     ?? ""
  const structure = answers.structure ?? ""

  // ── Profile type ──────────────────────────────────────────────────────────
  let profilType = "Professionnel du transport"
  let profilSub  = "En quête de structuration et de visibilité"

  if (role.includes("Dirigeant")) {
    if (phase.includes("Croissance rapide")) {
      profilType = "Dirigeant en croissance rapide"
      profilSub  = "Saisit les opportunités — la structure doit suivre"
    } else if (structure.includes("familiale")) {
      profilType = "Dirigeant d'entreprise familiale"
      profilSub  = "Pérenniser et professionnaliser l'héritage"
    } else {
      profilType = "Dirigeant-exploitant"
      profilSub  = "Opérationnel et stratège à la fois"
    }
  } else if (role.includes("Exploitation")) {
    profilType = "Responsable d'Exploitation"
    profilSub  = structure.includes("familiale")
      ? "Modernise sans remettre en cause l'existant"
      : "Pilote du quotidien opérationnel"
  } else if (role.includes("QSE")) {
    profilType = "Responsable QSE / QHSE"
    profilSub  = "Garant de la conformité et des certifications"
  } else if (role.includes("Administratif")) {
    profilType = "Responsable Administratif"
    profilSub  = "Centralise et structure les obligations réglementaires"
  } else if (role.includes("Associé")) {
    profilType = "Associé / Co-fondateur"
    profilSub  = "Vision long terme et structuration de la croissance"
  }

  // ── Context pills ─────────────────────────────────────────────────────────
  const pills: string[] = []
  if (answers.activite)    pills.push(answers.activite)
  if (answers.clients)     pills.push(answers.clients)
  if (answers.flotte)      pills.push(answers.flotte)
  if (answers.conducteurs) pills.push(`${answers.conducteurs} conducteurs`)
  if (answers.structure)   pills.push(answers.structure)
  if (answers.phase)       pills.push(answers.phase.split("—")[0].trim())

  // ── Douleurs (toutes les questions couvertes) ─────────────────────────────
  const douleurs: string[] = []

  // Contrôles
  if (answers.controle === "Un contrôle est prévu dans les 6 mois")
    douleurs.push("Contrôle DRIEAT/DREAL imminent — préparation insuffisante")
  if (answers.controle === "Oui, avec des sanctions")
    douleurs.push("Antécédent de sanctions — surveillance renforcée probable")

  // Contrats
  if (answers.contratPerdu === "Oui, ça m'est arrivé")
    douleurs.push("Perte de contrat avérée faute de preuve de conformité")
  if (answers.contratPerdu === "Non, mais je le crains")
    douleurs.push("Risque latent de perte de contrats clients")

  // Documents
  if (answers.docsAJour === "Non, c'est désorganisé")
    douleurs.push("Documents éparpillés — introuvables en cas de contrôle ou d'urgence")
  if (answers.docsAJour === "Partiellement")
    douleurs.push("Conformité incomplète — des zones grises non traitées")
  if (answers.docsAJour === "Je ne sais pas évaluer")
    douleurs.push("Visibilité nulle sur le niveau réel de conformité")

  // Sécurité / DUERP
  if (answers.securite === "Pas de DUERP formalisé — je dois m'y mettre")
    douleurs.push("DUERP absent — non-conformité légale, risque de sanction à l'Inspection du Travail")
  if (answers.securite === "DUERP existant mais pas mis à jour")
    douleurs.push("DUERP obsolète — non conforme aux obligations de mise à jour annuelle")
  if (answers.securite === "Je ne sais pas ce que c'est")
    douleurs.push("Sécurité au travail non couverte — risque légal et humain majeur")

  // Organisation
  if (answers.frein === "Manque de temps")
    douleurs.push("Conformité reléguée au second plan par manque de temps")
  if (answers.frein?.includes("seul"))
    douleurs.push("Gestion en solo — aucune ressource dédiée à la conformité")
  if (answers.frein === "Budget limité")
    douleurs.push("Contrainte budgétaire — risque de sous-investissement sur la conformité")
  if (answers.frein?.includes("méthode"))
    douleurs.push("Absence de méthode — ne sait pas par où commencer")
  if (answers.qse === "Non, j'en ai besoin")
    douleurs.push("Aucune compétence QSE internalisée")

  // Outils
  if (answers.outils === "Je ne gère pas vraiment — c'est le flou")
    douleurs.push("Aucun suivi de conformité en place — exposition invisible mais réelle")
  if (answers.outils === "Papier et classeurs physiques")
    douleurs.push("Gestion 100% papier — impossible à partager, auditer ou mettre à jour")

  // Phase
  if (phase.includes("Croissance rapide"))
    douleurs.push("Croissance rapide non accompagnée d'une structuration réglementaire")
  if (phase.includes("Restructuration"))
    douleurs.push("Phase de restructuration — remise en ordre réglementaire urgente")

  if (douleurs.length === 0)
    douleurs.push("Besoin de visibilité objective sur le niveau de conformité")

  // ── Urgency level ─────────────────────────────────────────────────────────
  let urgence: 1 | 2 | 3 = 1
  if (
    answers.controle === "Un contrôle est prévu dans les 6 mois" ||
    answers.delai === "Dans le mois — c'est urgent"
  ) urgence = 3
  else if (
    answers.contratPerdu === "Oui, ça m'est arrivé" ||
    answers.controle === "Oui, avec des sanctions" ||
    answers.delai === "1 à 3 mois"
  ) urgence = 2

  // ── Recommendations (toutes les questions couvertes) ──────────────────────
  const reco: string[] = []

  if (urgence === 3)
    reco.push("Diagnostic flash sous 48h — identifier les risques critiques immédiatement")
  if (answers.priorite?.includes("audit"))
    reco.push("Plan de préparation audit personnalisé + checklist des 20 points de contrôle clés")
  if (answers.priorite?.includes("appels d'offres"))
    reco.push("ClearGo Certificate — preuve vérifiable par QR code pour vos dossiers AO")
  if (answers.priorite?.includes("certification"))
    reco.push("Roadmap certification ISO / GDP structurée étape par étape")
  if (answers.priorite?.includes("A à Z"))
    reco.push("Audit complet 360° — couvrir tous les volets réglementaires de A à Z")

  if (answers.activite === "Pharma / GDP" || answers.clients?.includes("pharmaceutiques"))
    reco.push("Conformité GDP documentée avec audit trail complet")
  if (answers.activite?.includes("Messagerie") || answers.clients?.includes("E-commerce"))
    reco.push("Conformité DSP calibrée pour les exigences e-commerce (Amazon, Cdiscount…)")
  if (answers.activite?.includes("ADR"))
    reco.push("Dossier ADR structuré — formations, équipements et documents en règle")
  if (answers.activite?.includes("Température"))
    reco.push("Traçabilité température — conformité ATP et chaîne du froid documentée")

  if (answers.clients?.includes("Grands comptes"))
    reco.push("Profil ClearGo partageable — répondez aux due diligences grands comptes en 1 lien")

  if (answers.docsAJour === "Non, c'est désorganisé")
    reco.push("Centralisation documentaire complète — tout au même endroit, mis à jour en temps réel")
  if (answers.docsAJour === "Je ne sais pas évaluer")
    reco.push("Audit documentaire initial — cartographie exacte de ce qui manque")

  if (answers.qse === "Non, j'en ai besoin" || answers.frein?.includes("seul"))
    reco.push("Accompagnement complet — ClearGo agit comme votre QSE externalisé")

  if (answers.rse === "Oui, c'est une priorité stratégique pour nous")
    reco.push("Module RSE & ISO 14001 — documentez et valorisez vos engagements environnementaux")
  if (answers.rse === "Oui, mais je ne sais pas comment les structurer ou documenter")
    reco.push("Structuration RSE clé en main — transformez vos pratiques en preuves documentées")
  if (answers.rse === "C'est une attente de mes clients — je dois m'y mettre")
    reco.push("Conformité RSE express — répondez aux exigences clients sans délai")

  if (answers.securite === "Pas de DUERP formalisé — je dois m'y mettre" || answers.securite === "Je ne sais pas ce que c'est")
    reco.push("DUERP clé en main — évaluation des risques professionnels conforme ISO 45001")
  if (answers.securite === "DUERP existant mais pas mis à jour")
    reco.push("Mise à jour DUERP + plan de prévention — remise en conformité rapide")

  if (answers.roi === "Décrocher 1 nouveau contrat grâce à ma conformité")
    reco.push("Trust Score 0-1000 + Certificate — argument commercial concret face aux donneurs d'ordre")
  if (answers.roi === "Éviter une sanction ou un audit raté")
    reco.push("Monitoring temps réel — savoir exactement où vous en êtes avant tout contrôle")
  if (answers.roi === "Gagner du temps sur la gestion documentaire")
    reco.push("Automatisation documentaire — fini les heures perdues à chercher un document")
  if (answers.roi === "Valoriser mon entreprise auprès de mes clients actuels")
    reco.push("Profil de confiance ClearGo — partageable en 1 lien, vérifiable par vos clients")

  if (answers.outils === "Je ne gère pas vraiment — c'est le flou" || answers.outils === "Papier et classeurs physiques")
    reco.push("Migration documentaire complète — on part de zéro et on structure tout ensemble")
  if (answers.outils === "Fichiers Excel / Google Sheets")
    reco.push("Remplacement Excel — plateforme dédiée, collaborative, mise à jour en temps réel")

  if (reco.length < 2) reco.push("Trust Score 0-1000 — mesurer objectivement votre niveau de conformité")
  if (reco.length < 3) reco.push("Plan d'action personnalisé avec priorisation des actions à fort impact")

  // ── Citation type ─────────────────────────────────────────────────────────
  let citation = `"Je veux savoir où j'en suis vraiment, et agir sur ce qui compte."`
  if (urgence === 3)
    citation = `"J'ai besoin de résultats vite — je ne peux pas me permettre d'attendre."`
  else if (answers.contratPerdu === "Oui, ça m'est arrivé")
    citation = `"Ça ne doit plus se reproduire. Je veux prouver ma fiabilité à n'importe qui."`
  else if (answers.priorite?.includes("appels d'offres"))
    citation = `"Je veux décrocher de nouveaux contrats — mais il me faut les bonnes preuves."`
  else if (answers.priorite?.includes("certification"))
    citation = `"Je veux une certification, mais je ne sais pas par où commencer concrètement."`
  else if (answers.outils === "Je ne gère pas vraiment — c'est le flou")
    citation = `"Je sais que je dois m'organiser. Je ne sais juste pas par où attaquer."`

  // ── SWOT ─────────────────────────────────────────────────────────────────

  // Forces — ce que le prospect fait déjà bien
  const forces: string[] = []
  if (answers.docsAJour === "Oui, complètement")
    forces.push("Documents de conformité à jour et bien organisés")
  if (answers.qse?.includes("dédiée"))
    forces.push("Responsable QSE internalisé — expertise métier en place")
  if (answers.controle === "Oui, sans problème")
    forces.push("Historique de contrôles DRIEAT/DREAL positifs")
  if (answers.securite === "DUERP à jour et suivi régulièrement")
    forces.push("DUERP tenu à jour — bonne maîtrise de la sécurité au travail")
  if (answers.rse === "Oui, c'est une priorité stratégique pour nous")
    forces.push("Engagements RSE formalisés — levier de différenciation concret")
  if (answers.outils?.includes("logiciel dédié"))
    forces.push("Outil de gestion en place — base technique déjà existante")
  if (answers.phase?.includes("Consolidation"))
    forces.push("Volonté affirmée de professionnaliser — maturité de gestion")
  if (answers.conducteurs?.includes("21") || answers.conducteurs?.includes("50+"))
    forces.push("Structure de taille significative — crédibilité opérationnelle")
  if (answers.controle === "Non, jamais")
    forces.push("Aucun antécédent réglementaire — terrain vierge pour structurer")
  if (forces.length === 0)
    forces.push("Activité en exercice — expérience terrain solide")

  // Faiblesses — points internes à corriger
  const faiblesses: string[] = []
  if (answers.docsAJour === "Non, c'est désorganisé")
    faiblesses.push("Documents éparpillés — aucune centralisation ni traçabilité")
  if (answers.docsAJour === "Partiellement")
    faiblesses.push("Conformité incomplète — zones grises persistantes")
  if (answers.docsAJour === "Je ne sais pas évaluer")
    faiblesses.push("Niveau de conformité inconnu — pas de visibilité interne")
  if (answers.qse === "Non, j'en ai besoin")
    faiblesses.push("Aucune compétence QSE internalisée")
  if (answers.qse === "Je gère moi-même")
    faiblesses.push("QSE géré par le dirigeant — surcharge et risque d'oubli")
  if (answers.securite?.includes("Pas de DUERP") || answers.securite === "Je ne sais pas ce que c'est")
    faiblesses.push("DUERP absent — non-conformité légale sur la sécurité")
  if (answers.securite === "DUERP existant mais pas mis à jour")
    faiblesses.push("DUERP obsolète — non conforme à l'obligation de mise à jour")
  if (answers.outils?.includes("flou") || answers.outils?.includes("Papier"))
    faiblesses.push("Gestion de conformité non structurée — risque opérationnel élevé")
  if (answers.outils?.includes("Excel"))
    faiblesses.push("Excel — outil non traçable, non collaboratif, non auditable")
  if (answers.frein?.includes("seul"))
    faiblesses.push("Gestion solitaire — aucune ressource dédiée à la conformité")
  if (answers.frein === "Manque de temps")
    faiblesses.push("Conformité traitée en urgence — jamais en anticipation")
  if (faiblesses.length === 0)
    faiblesses.push("Processus internes à formaliser pour passer à l'échelle")

  // Opportunités — leviers externes à saisir
  const opportunites: string[] = []
  if (answers.priorite?.includes("appels d'offres"))
    opportunites.push("Appels d'offres accessibles grâce à la preuve de conformité")
  if (answers.priorite?.includes("certification"))
    opportunites.push("Certification ISO/GDP — levier de crédibilité et d'accès à de nouveaux marchés")
  if (answers.clients?.includes("Grands comptes"))
    opportunites.push("Grands comptes — valeur ajoutée forte si conformité prouvée")
  if (answers.clients?.includes("pharmaceutiques"))
    opportunites.push("Marché pharma — conformité GDP = accès à un segment premium")
  if (answers.clients?.includes("E-commerce"))
    opportunites.push("Marché DSP e-commerce en forte croissance — différenciation par la conformité")
  if (answers.rse !== "Non, pas encore concerné" && answers.rse)
    opportunites.push("Démarche RSE — différenciation face à la concurrence et fidélisation clients")
  if (answers.roi?.includes("Décrocher"))
    opportunites.push("Conformité = argument commercial direct pour décrocher des contrats")
  if (phase.includes("Croissance"))
    opportunites.push("Dynamique de croissance — moment idéal pour structurer avant de scaler")
  if (answers.activite === "Pharma / GDP")
    opportunites.push("Spécialisation GDP — niche à forte valeur si conformité irréprochable")
  if (opportunites.length === 0)
    opportunites.push("Structuration de la conformité comme levier de croissance durable")

  // Menaces — risques externes à anticiper
  const menaces: string[] = []
  if (answers.controle === "Un contrôle est prévu dans les 6 mois")
    menaces.push("Contrôle DRIEAT/DREAL imminent — risque de sanction à court terme")
  if (answers.controle === "Oui, avec des sanctions")
    menaces.push("Antécédents de sanctions — probabilité de surveillance renforcée")
  if (answers.contratPerdu === "Oui, ça m'est arrivé")
    menaces.push("Risque de récidive de perte de contrat si rien ne change")
  if (answers.contratPerdu === "Non, mais je le crains")
    menaces.push("Pression croissante des donneurs d'ordre sur la preuve de conformité")
  if (answers.securite?.includes("Pas") || answers.securite === "Je ne sais pas ce que c'est")
    menaces.push("Risque Inspection du Travail — DUERP absent = infraction immédiate")
  if (phase.includes("Croissance rapide"))
    menaces.push("Croissance sans structure réglementaire = fragilité en cas de contrôle")
  if (answers.frein === "Budget limité")
    menaces.push("Sous-investissement en conformité — coût d'une sanction bien supérieur")
  if (answers.clients?.includes("pharmaceutiques") || answers.activite === "Pharma / GDP")
    menaces.push("Exigences GDP très strictes — non-conformité = exclusion immédiate du marché")
  if (answers.activite?.includes("ADR"))
    menaces.push("Réglementation ADR — risques humains et pénaux en cas de manquement")
  if (menaces.length === 0)
    menaces.push("Évolution réglementaire constante — veille active indispensable")

  return {
    profilType,
    profilSub,
    pills,
    douleurs,
    urgence,
    reco,
    citation,
    swot: { forces, faiblesses, opportunites, menaces },
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

interface PrequalFunnelProps {
  open: boolean
  onClose: () => void
}

export function PrequalFunnel({ open, onClose }: PrequalFunnelProps) {
  const [step, setStep]           = useState(0)
  const [answers, setAnswers]     = useState<Answers>({})
  const [direction, setDirection] = useState<"forward" | "back">("forward")
  const [animating, setAnimating] = useState(false)
  const [prenom, setPrenom]           = useState("")
  const [nom, setNom]                 = useState("")
  const [societe, setSociete]         = useState("")
  const [siret, setSiret]             = useState("")
  const [siretData, setSiretData]     = useState<SiretData | null>(null)
  const [siretLoading, setSiretLoading] = useState(false)
  const [siretError, setSiretError]   = useState(false)
  const [email, setEmail]             = useState("")
  const [tel, setTel]                 = useState("")
  const [sending, setSending]         = useState(false)
  const [synthesis, setSynthesis]     = useState<SynthesisData | null>(null)
  const textareaRef                   = useRef<HTMLTextAreaElement>(null)

  const isDone    = step === TOTAL + 1
  const isContact = step === TOTAL
  const progress  = isDone ? 100 : Math.round((step / (TOTAL + 1)) * 100)

  const currentQ      = step < QUESTIONS.length ? QUESTIONS[step] : null
  const currentAnswer = currentQ ? (answers[currentQ.id] ?? "") : ""

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    if (!open) {
      setTimeout(() => {
        setStep(0); setAnswers({}); setPrenom(""); setNom("")
        setSociete(""); setSiret(""); setSiretData(null)
        setSiretError(false); setEmail(""); setTel(""); setSynthesis(null)
      }, 300)
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  // Esc key
  const close = useCallback(() => onClose(), [onClose])
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") close() }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [close])

  // Auto-fetch SIRET when 14 digits entered
  useEffect(() => {
    const clean = siret.replace(/\s/g, "")
    if (clean.length !== 14) { setSiretData(null); setSiretError(false); return }
    setSiretLoading(true)
    setSiretError(false)
    fetchSiretData(clean).then((d) => {
      setSiretLoading(false)
      if (d) { setSiretData(d); if (!societe) setSociete(d.nom) }
      else setSiretError(true)
    })
  }, [siret]) // eslint-disable-line react-hooks/exhaustive-deps

  // Focus textarea on open question
  useEffect(() => {
    if (currentQ?.type === "open") {
      setTimeout(() => textareaRef.current?.focus(), 250)
    }
  }, [step, currentQ])

  function go(n: number, dir: "forward" | "back") {
    if (animating) return
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setStep(n)
      setAnimating(false)
    }, 180)
  }

  function selectOption(option: string) {
    const q = QUESTIONS[step]
    if (!q) return
    setAnswers((prev) => ({ ...prev, [q.id]: option }))
    go(step + 1, "forward")
  }

  function submitOpenQuestion() {
    go(step + 1, "forward")
  }

  function goBack() {
    if (step > 0) go(step - 1, "back")
  }

  async function submitContact(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    const synth = generateSynthesis(answers)
    setSynthesis(synth)
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "funnel",
          prenom, nom, societe, email, tel,
          siret:            siretData?.siret ?? siret,
          siren:            siretData?.siren ?? "",
          societe_legale:   siretData?.nom ?? societe,
          adresse:          siretData?.adresse ?? "",
          ville:            siretData?.ville ?? "",
          code_postal:      siretData?.codePostal ?? "",
          naf:              siretData?.naf ?? "",
          libelle_naf:      siretData?.libelleNaf ?? "",
          effectif_sirene:  siretData?.effectif ?? "",
          date_creation:    siretData?.dateCreation ?? "",
          forme_juridique:  siretData?.formeJuridique ?? "",
          is_transport:     siretData?.isTransport ?? false,
          role:              answers.role,
          structure:         answers.structure,
          phase:             answers.phase,
          activite:          answers.activite,
          clients:           answers.clients,
          flotte:            answers.flotte,
          conducteurs:       answers.conducteurs,
          controle_drieat:   answers.controle,
          contrat_perdu:     answers.contratPerdu,
          douleur_libre:     answers.douleurLibre,
          priorite:          answers.priorite,
          frein_principal:   answers.frein,
          declic_libre:      answers.declicLibre,
          roi_attendu:       answers.roi,
          outils_actuels:    answers.outils,
          rse:               answers.rse,
          securite_duerp:    answers.securite,
          responsable_qse:   answers.qse,
          docs_a_jour:       answers.docsAJour,
          delai_souhaite:    answers.delai,
          profil_type:       synth.profilType,
          urgence:           synth.urgence,
          douleurs:          synth.douleurs.join(" | "),
        }),
      })
    } catch { /* fail silently */ }
    setSending(false)
    go(TOTAL + 1, "forward")
  }

  if (!open) return null

  const slideStyle: React.CSSProperties = animating
    ? {
        opacity: 0,
        transform: direction === "forward" ? "translateX(20px)" : "translateX(-20px)",
        transition: "all 0.18s ease",
      }
    : {
        opacity: 1,
        transform: "translateX(0)",
        transition: "all 0.28s cubic-bezier(0.25,0.1,0.25,1) 0.02s",
      }

  const urgenceLabel = synthesis
    ? synthesis.urgence === 3 ? "URGENT" : synthesis.urgence === 2 ? "PRIORITAIRE" : "STANDARD"
    : ""
  const urgenceColor = synthesis
    ? synthesis.urgence === 3 ? "#EF4444" : synthesis.urgence === 2 ? "#F59E0B" : "#00A896"
    : "#00A896"

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#081B32]/75 backdrop-blur-md"
        onClick={close}
        style={{ animation: "fadeIn 0.2s ease both" }}
      />

      {/* Modal — bottom sheet on mobile, centered on desktop */}
      <div
        className="relative w-full sm:max-w-lg flex flex-col bg-white sm:rounded-3xl overflow-hidden shadow-2xl"
        style={{
          maxHeight: "92vh",
          borderRadius: "24px 24px 0 0",
          animation: "slideDownModal 0.3s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        {/* ── Header ── */}
        <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-[#F0F4F8]">
          <button
            onClick={goBack}
            className={`p-2 rounded-xl hover:bg-[#F0F4F8] text-[#94A3B8] transition-all ${step === 0 || isDone ? "invisible" : ""}`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#00A896]">
              {isDone ? "Votre synthèse personnalisée" : "Pré-qualification gratuite"}
            </p>
            {!isDone && (
              <p className="text-[11px] text-[#94A3B8] mt-0.5">
                {isContact
                  ? "Dernière étape"
                  : currentQ
                    ? `${currentQ.block} · ${step + 1} / ${TOTAL + 1}`
                    : ""}
              </p>
            )}
          </div>
          <button onClick={close} className="p-2 rounded-xl hover:bg-[#F0F4F8] text-[#94A3B8] transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Progress bar ── */}
        {!isDone && (
          <div className="h-[3px] bg-[#F0F4F8]">
            <div
              className="h-full bg-[#00A896]"
              style={{ width: `${progress}%`, transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)" }}
            />
          </div>
        )}

        {/* ── Social proof strip ── */}
        {!isDone && !isContact && (
          <div className="flex items-center justify-center gap-4 border-b border-[#F0F4F8] bg-[#F8FAFC] px-6 py-2">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#4A5A72]">
              <span>⏱</span>
              <span>1 min 45</span>
            </span>
            <span className="h-3 w-px bg-[#CBD5E1]" />
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#4A5A72]">
              <span>✅</span>
              <span><strong className="text-[#0D2B4E]">3 284</strong> transporteurs ont déjà répondu</span>
            </span>
          </div>
        )}

        {/* ── Content ── */}
        <div className="overflow-y-auto flex-1 px-6 py-6">

          {/* ══ SYNTHESIS SCREEN ══════════════════════════════════════════════ */}
          {isDone && synthesis && (
            <div style={{ animation: "scaleUp 0.5s cubic-bezier(0.34,1.56,0.64,1) both" }}>

              {/* Profil card */}
              <div className="rounded-2xl bg-[#0D2B4E] p-5 mb-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#00A896] mb-1">
                      Profil identifié
                    </p>
                    <p className="text-[18px] font-black text-white leading-tight">{synthesis.profilType}</p>
                    <p className="text-[12px] text-white/50 mt-0.5">{synthesis.profilSub}</p>
                  </div>
                  <div
                    className="flex-shrink-0 rounded-lg px-2.5 py-1.5 text-[10px] font-black uppercase tracking-widest"
                    style={{ background: urgenceColor, color: "white" }}
                  >
                    {urgenceLabel}
                  </div>
                </div>
                {/* Citation type */}
                <div className="rounded-xl border border-white/10 bg-white/8 px-4 py-3">
                  <p className="text-[13px] font-medium italic text-white/75">{synthesis.citation}</p>
                </div>
              </div>

              {/* Pills recap */}
              {synthesis.pills.length > 0 && (
                <div className="mb-5 flex flex-wrap gap-2">
                  {synthesis.pills.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-[#E2E8F0] bg-white px-3 py-1 text-[11px] font-semibold text-[#4A5A72]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}

              {/* Douleurs identifiées */}
              <div className="mb-4 rounded-2xl border border-[#FEE2E2] bg-[#FFF5F5] p-5">
                <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#EF4444]">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Douleurs identifiées
                </p>
                <div className="flex flex-col gap-2.5">
                  {synthesis.douleurs.map((d) => (
                    <div key={d} className="flex items-start gap-2.5">
                      <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#EF4444]" />
                      <p className="text-[13px] text-[#0D2B4E]">{d}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ce que ClearGo peut faire */}
              <div className="mb-4 rounded-2xl border border-[#CCEDE9] bg-[#F0FAFA] p-5">
                <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#00A896]">
                  <Zap className="h-3.5 w-3.5" />
                  Ce que ClearGo peut faire pour vous
                </p>
                <div className="flex flex-col gap-2.5">
                  {synthesis.reco.map((r) => (
                    <div key={r} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-[2px] h-4 w-4 flex-shrink-0 text-[#00A896]" strokeWidth={2.5} />
                      <p className="text-[13px] text-[#0D2B4E]">{r}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SWOT */}
              <div className="mb-5">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                  Analyse SWOT — vue d&apos;ensemble
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {/* Forces */}
                  <div className="rounded-2xl border border-[#BBEDD6] bg-[#F0FBF5] p-4">
                    <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-[#16A34A]">
                      💪 Forces
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {synthesis.swot.forces.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-start gap-1.5">
                          <span className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#16A34A]" />
                          <span className="text-[11px] leading-snug text-[#0D2B4E]">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Faiblesses */}
                  <div className="rounded-2xl border border-[#FEE2E2] bg-[#FFF5F5] p-4">
                    <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-[#DC2626]">
                      ⚠️ Faiblesses
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {synthesis.swot.faiblesses.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-start gap-1.5">
                          <span className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#DC2626]" />
                          <span className="text-[11px] leading-snug text-[#0D2B4E]">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Opportunités */}
                  <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4">
                    <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-[#2563EB]">
                      🚀 Opportunités
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {synthesis.swot.opportunites.slice(0, 3).map((o) => (
                        <li key={o} className="flex items-start gap-1.5">
                          <span className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                          <span className="text-[11px] leading-snug text-[#0D2B4E]">{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Menaces */}
                  <div className="rounded-2xl border border-[#FED7AA] bg-[#FFF7ED] p-4">
                    <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-[#EA580C]">
                      🔥 Menaces
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {synthesis.swot.menaces.slice(0, 3).map((m) => (
                        <li key={m} className="flex items-start gap-1.5">
                          <span className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#EA580C]" />
                          <span className="text-[11px] leading-snug text-[#0D2B4E]">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Ce qui vous attend */}
              <div className="mb-5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
                <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                  <Target className="h-3.5 w-3.5" />
                  Ce qui vous attend
                </p>
                {[
                  "Résultat de pré-qualification sous 24h",
                  "Accès au diagnostic complet à 199€ (offre SITL)",
                  "Trust Score 0-1000 + plan d'action personnalisé",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 border-b border-[#E2E8F0] py-2 last:border-0">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#00A896] text-[10px] font-black text-white">
                      ✓
                    </span>
                    <span className="text-[13px] font-medium text-[#0D2B4E]">{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={close}
                className="btn-press w-full rounded-2xl bg-[#0D2B4E] py-4 text-[15px] font-bold text-white"
              >
                Fermer
              </button>
            </div>
          )}

          {/* ══ CONTACT ══════════════════════════════════════════════════════ */}
          {!isDone && isContact && (
            <div style={slideStyle}>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#00A896]">Étape finale</p>
              <h3 className="mb-2 text-[22px] font-black leading-tight text-[#0D2B4E]">
                Où envoyer votre synthèse ?
              </h3>
              <p className="mb-7 text-[14px] leading-relaxed text-[#4A5A72]">
                On génère votre profil personnalisé et on vous recontacte sous 24h.
              </p>
              <form onSubmit={submitContact} className="flex flex-col gap-4">

                {/* Prénom + Nom */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider text-[#0D2B4E]">Prénom</label>
                    <input type="text" required value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Jean"
                      className="w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-[15px] font-medium text-[#0D2B4E] placeholder:text-[#94A3B8] outline-none transition-all focus:border-[#00A896] focus:bg-white" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider text-[#0D2B4E]">Nom</label>
                    <input type="text" required value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Dupont"
                      className="w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-[15px] font-medium text-[#0D2B4E] placeholder:text-[#94A3B8] outline-none transition-all focus:border-[#00A896] focus:bg-white" />
                  </div>
                </div>

                {/* Société */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider text-[#0D2B4E]">Société</label>
                  <input type="text" required value={societe} onChange={(e) => setSociete(e.target.value)} placeholder="Transports Dupont & Fils"
                    className="w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-[15px] font-medium text-[#0D2B4E] placeholder:text-[#94A3B8] outline-none transition-all focus:border-[#00A896] focus:bg-white" />
                </div>

                {/* SIRET */}
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#0D2B4E]">
                    SIRET
                    <span className="font-normal normal-case text-[#94A3B8]">(optionnel — on vérifie automatiquement)</span>
                    {siretLoading && <Loader2 className="h-3 w-3 animate-spin text-[#00A896]" />}
                  </label>
                  <input
                    type="text" value={siret}
                    onChange={(e) => setSiret(e.target.value.replace(/[^0-9\s]/g, ""))}
                    placeholder="362 521 879 00034"
                    maxLength={17}
                    className={`w-full rounded-xl border-2 bg-[#F8FAFC] px-4 py-3 text-[15px] font-medium text-[#0D2B4E] placeholder:text-[#94A3B8] outline-none transition-all focus:bg-white ${
                      siretData ? "border-[#00A896]" : siretError ? "border-[#EF4444]" : "border-[#E2E8F0] focus:border-[#00A896]"
                    }`}
                  />
                  {siretError && (
                    <p className="mt-1 text-[11px] text-[#EF4444]">SIRET non trouvé — vérifiez les 14 chiffres</p>
                  )}

                  {/* Carte société vérifiée */}
                  {siretData && (
                    <div className="mt-3 rounded-xl border border-[#CCEDE9] bg-[#F0FAFA] p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#00A896]">
                          <Building2 className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-[13px] font-black text-[#0D2B4E] truncate">{siretData.nom}</p>
                            {siretData.isTransport && (
                              <span className="flex-shrink-0 rounded-full bg-[#00A896] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">Transport ✓</span>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                            {siretData.adresse && (
                              <p className="col-span-2 text-[11px] text-[#4A5A72]">📍 {siretData.adresse}, {siretData.codePostal} {siretData.ville}</p>
                            )}
                            {siretData.libelleNaf && (
                              <p className="text-[11px] text-[#4A5A72]">🏷 {siretData.naf} — {siretData.libelleNaf}</p>
                            )}
                            {siretData.effectif && (
                              <p className="text-[11px] text-[#4A5A72]">👥 {siretData.effectif}</p>
                            )}
                            {siretData.dateCreation && (
                              <p className="text-[11px] text-[#4A5A72]">📅 Créée en {siretData.dateCreation}</p>
                            )}
                            <p className="text-[11px] text-[#4A5A72]">🔢 SIREN {siretData.siren}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider text-[#0D2B4E]">Email professionnel</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jean@transport.fr"
                    className="w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3.5 text-[15px] font-medium text-[#0D2B4E] placeholder:text-[#94A3B8] outline-none transition-all focus:border-[#00A896] focus:bg-white" />
                </div>

                {/* Téléphone */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider text-[#0D2B4E]">
                    Téléphone <span className="font-normal normal-case text-[#94A3B8]">(optionnel)</span>
                  </label>
                  <input type="tel" value={tel} onChange={(e) => setTel(e.target.value)} placeholder="06 XX XX XX XX"
                    className="w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3.5 text-[15px] font-medium text-[#0D2B4E] placeholder:text-[#94A3B8] outline-none transition-all focus:border-[#00A896] focus:bg-white" />
                </div>
                <button
                  type="submit" disabled={sending}
                  className="btn-press mt-2 w-full rounded-2xl bg-[#00A896] py-4 text-[16px] font-extrabold text-white disabled:pointer-events-none disabled:opacity-50"
                  style={{ boxShadow: "0 8px 32px -4px rgba(0,168,150,0.4)" }}
                >
                  {sending ? "Génération en cours…" : "Voir ma synthèse personnalisée →"}
                </button>
                <p className="text-center text-[11px] text-[#94A3B8]">
                  Pas de spam · Aucun engagement · Réponse sous 24h
                </p>
              </form>
            </div>
          )}

          {/* ══ QUESTIONS ════════════════════════════════════════════════════ */}
          {!isDone && currentQ && (
            <div style={slideStyle}>
              <h3
                className="font-black leading-tight text-[#0D2B4E] mb-2"
                style={{ fontSize: "clamp(18px, 3.5vw, 22px)" }}
              >
                {currentQ.label}
              </h3>
              {currentQ.hint && (
                <p className="text-[13px] text-[#94A3B8] mb-5">{currentQ.hint}</p>
              )}

              {/* ── Choice question ── */}
              {currentQ.type === "choice" && (
                <div className={`flex flex-col gap-2.5 ${!currentQ.hint ? "mt-5" : ""}`}>
                  {currentQ.options?.map((opt) => {
                    const selected = currentAnswer === opt
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => selectOption(opt)}
                        className="w-full text-left rounded-2xl border-2 px-5 py-4 text-[14px] font-semibold transition-all"
                        style={{
                          borderColor: selected ? "#00A896" : "#E2E8F0",
                          background:  selected ? "#E6F7F5" : "#FAFBFC",
                          color:       selected ? "#0D2B4E" : "#4A5A72",
                          transform:   selected ? "scale(1.01)" : "scale(1)",
                        }}
                      >
                        <span className="flex items-center gap-4">
                          <span
                            className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all"
                            style={{
                              borderColor: selected ? "#00A896" : "#CBD5E1",
                              background:  selected ? "#00A896" : "transparent",
                            }}
                          >
                            {selected && <span className="h-2 w-2 rounded-full bg-white" />}
                          </span>
                          {opt}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* ── Open question ── */}
              {currentQ.type === "open" && (
                <div className={!currentQ.hint ? "mt-5" : ""}>
                  <textarea
                    ref={textareaRef}
                    value={currentAnswer}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, [currentQ.id]: e.target.value }))
                    }
                    placeholder={currentQ.placeholder}
                    rows={4}
                    className="w-full resize-none rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3.5 text-[14px] font-medium leading-relaxed text-[#0D2B4E] placeholder:text-[#94A3B8] outline-none transition-all focus:border-[#00A896] focus:bg-white"
                  />
                  <div className="mt-4 flex gap-3">
                    {currentQ.optional && (
                      <button
                        type="button"
                        onClick={submitOpenQuestion}
                        className="flex-1 rounded-xl border-2 border-[#E2E8F0] py-3.5 text-[14px] font-semibold text-[#94A3B8] transition-all hover:border-[#00A896] hover:text-[#0D2B4E]"
                      >
                        Passer →
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={submitOpenQuestion}
                      disabled={!currentQ.optional && !currentAnswer.trim()}
                      className="btn-press flex-1 rounded-xl bg-[#00A896] py-3.5 text-[14px] font-bold text-white transition-all disabled:pointer-events-none disabled:opacity-40"
                      style={{
                        boxShadow: currentAnswer.trim()
                          ? "0 6px 20px -4px rgba(0,168,150,0.4)"
                          : "none",
                      }}
                    >
                      Continuer →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Teal bottom stripe */}
        <div className="h-1 flex-shrink-0 bg-[#00A896]" />
      </div>
    </div>
  )
}
