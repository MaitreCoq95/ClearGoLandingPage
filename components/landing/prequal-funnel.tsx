"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { X, ChevronLeft, CheckCircle2, AlertTriangle, Zap, Target } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

type Answers = Record<string, string>

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

interface SynthesisData {
  profilType: string
  profilSub: string
  douleurs: string[]
  urgence: 1 | 2 | 3
  reco: string[]
  citation: string
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
  const role     = answers.role     ?? ""
  const phase    = answers.phase    ?? ""
  const structure = answers.structure ?? ""

  // ── Profile type ──
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

  // ── Pain points ──
  const douleurs: string[] = []

  if (answers.controle === "Un contrôle est prévu dans les 6 mois")
    douleurs.push("Contrôle imminent — préparation insuffisante")
  if (answers.controle === "Oui, avec des sanctions")
    douleurs.push("Antécédent de sanctions DRIEAT / DREAL")
  if (answers.contratPerdu === "Oui, ça m'est arrivé")
    douleurs.push("Perte de contrat par manque de preuve de conformité")
  if (answers.contratPerdu === "Non, mais je le crains")
    douleurs.push("Risque latent de perte de contrats clients")
  if (answers.docsAJour === "Non, c'est désorganisé")
    douleurs.push("Documents éparpillés, difficiles à retrouver en urgence")
  if (answers.docsAJour === "Partiellement")
    douleurs.push("Conformité partielle — des zones grises restent à traiter")
  if (answers.frein === "Manque de temps")
    douleurs.push("Pas le temps de gérer la conformité au quotidien")
  if (answers.frein?.includes("seul"))
    douleurs.push("Gestion en solo sans ressource dédiée")
  if (answers.qse === "Non, j'en ai besoin")
    douleurs.push("Pas de compétence QSE internalisée")
  if (answers.securite === "Pas de DUERP formalisé — je dois m'y mettre")
    douleurs.push("DUERP absent — exposition aux risques de sanction en cas de contrôle")
  if (answers.securite === "DUERP existant mais pas mis à jour")
    douleurs.push("DUERP non actualisé — non conforme aux obligations légales")
  if (answers.securite === "Je ne sais pas ce que c'est")
    douleurs.push("Sécurité au travail non couverte — risque légal et humain important")
  if (phase.includes("Croissance rapide"))
    douleurs.push("La conformité n'a pas suivi le rythme de la croissance")
  if (answers.outils === "Je ne gère pas vraiment — c'est le flou")
    douleurs.push("Aucun suivi de conformité en place — risque invisible mais réel")
  if (answers.outils === "Papier et classeurs physiques")
    douleurs.push("Gestion papier — impossible à partager, à auditer ou à mettre à jour en temps réel")
  if (douleurs.length === 0)
    douleurs.push("Besoin de visibilité objective sur le niveau de conformité")

  // ── Urgency level ──
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

  // ── Recommendations ──
  const reco: string[] = []
  if (urgence === 3)
    reco.push("Diagnostic flash sous 48h — identifier les risques critiques immédiatement")
  if (answers.priorite?.includes("audit"))
    reco.push("Plan de préparation audit personnalisé + checklist des 20 points de contrôle clés")
  if (answers.priorite?.includes("appels d'offres"))
    reco.push("ClearGo Certificate — preuve de conformité vérifiable par QR code pour vos dossiers AO")
  if (answers.priorite?.includes("certification"))
    reco.push("Roadmap certification ISO / GDP structurée étape par étape")
  if (answers.activite === "Pharma / GDP" || answers.clients?.includes("pharmaceutiques"))
    reco.push("Conformité GDP documentée avec audit trail complet")
  if (answers.activite?.includes("Messagerie") || answers.clients?.includes("E-commerce"))
    reco.push("Conformité DSP calibrée pour les exigences e-commerce (Amazon, Cdiscount…)")
  if (answers.docsAJour === "Non, c'est désorganisé")
    reco.push("Centralisation documentaire — tout au même endroit, à jour en temps réel")
  if (answers.qse === "Non, j'en ai besoin" || answers.frein?.includes("seul"))
    reco.push("Accompagnement complet — ClearGo agit comme votre QSE externalisé")
  if (answers.rse === "Oui, c'est une priorité stratégique pour nous")
    reco.push("Module RSE & ISO 14001 — documentez et valorisez vos engagements environnementaux")
  if (answers.rse === "Oui, mais je ne sais pas comment les structurer ou documenter")
    reco.push("Structuration RSE clé en main — transformez vos pratiques en preuves documentées")
  if (answers.rse === "C'est une attente de mes clients — je dois m'y mettre")
    reco.push("Conformité RSE rapide — répondez aux exigences clients avec les bons documents")
  if (answers.securite === "Pas de DUERP formalisé — je dois m'y mettre" || answers.securite === "Je ne sais pas ce que c'est")
    reco.push("DUERP clé en main — évaluation des risques professionnels conforme ISO 45001")
  if (answers.securite === "DUERP existant mais pas mis à jour")
    reco.push("Mise à jour DUERP + plan de prévention — remise en conformité rapide")
  if (answers.roi === "Décrocher 1 nouveau contrat grâce à ma conformité")
    reco.push("ClearGo Certificate + Trust Score — votre arme commerciale pour convaincre les donneurs d'ordre")
  if (answers.roi === "Éviter une sanction ou un audit raté")
    reco.push("Checklist audit temps réel — savoir exactement où vous en êtes avant le contrôle")
  if (answers.roi === "Gagner du temps sur la gestion documentaire")
    reco.push("Centralisation & automatisation — fini les heures perdues à chercher un document")
  if (answers.roi === "Valoriser mon entreprise auprès de mes clients actuels")
    reco.push("Profil de confiance ClearGo — partageable en 1 lien, vérifiable par vos clients")
  if (answers.outils === "Je ne gère pas vraiment — c'est le flou" || answers.outils === "Papier et classeurs physiques")
    reco.push("Migration documentaire complète — on part de zéro et on structure tout ensemble")
  if (answers.outils === "Fichiers Excel / Google Sheets")
    reco.push("Remplacement Excel — plateforme dédiée, collaborative, mise à jour en temps réel")
  if (reco.length < 2)
    reco.push("Trust Score 0-1000 — mesurer objectivement votre niveau de conformité")
  if (reco.length < 3)
    reco.push("Plan d'action personnalisé avec priorisation des actions à fort impact")

  // ── Citation type ──
  let citation = `"Je veux savoir où j'en suis vraiment, et agir sur ce qui compte."`
  if (urgence === 3)
    citation = `"J'ai besoin de résultats vite — je ne peux pas me permettre d'attendre."`
  else if (answers.contratPerdu === "Oui, ça m'est arrivé")
    citation = `"Ça ne doit plus se reproduire. Je veux pouvoir prouver ma fiabilité à n'importe qui."`
  else if (answers.priorite?.includes("appels d'offres"))
    citation = `"Je veux décrocher de nouveaux contrats — mais il me faut les bonnes preuves."`
  else if (answers.priorite?.includes("certification"))
    citation = `"Je veux une certification, mais je ne sais pas par où commencer concrètement."`

  return {
    profilType,
    profilSub,
    douleurs: douleurs.slice(0, 5),
    urgence,
    reco: reco.slice(0, 4),
    citation,
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
  const [prenom, setPrenom]       = useState("")
  const [nom, setNom]             = useState("")
  const [email, setEmail]         = useState("")
  const [tel, setTel]             = useState("")
  const [sending, setSending]     = useState(false)
  const [synthesis, setSynthesis] = useState<SynthesisData | null>(null)
  const textareaRef               = useRef<HTMLTextAreaElement>(null)

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
        setStep(0)
        setAnswers({})
        setPrenom("")
        setNom("")
        setEmail("")
        setTel("")
        setSynthesis(null)
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
          prenom, nom, email, tel,
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
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider text-[#0D2B4E]">
                      Prénom
                    </label>
                    <input
                      type="text" required value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      placeholder="Jean"
                      className="w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-[15px] font-medium text-[#0D2B4E] placeholder:text-[#94A3B8] outline-none transition-all focus:border-[#00A896] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider text-[#0D2B4E]">
                      Nom
                    </label>
                    <input
                      type="text" required value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Dupont"
                      className="w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-[15px] font-medium text-[#0D2B4E] placeholder:text-[#94A3B8] outline-none transition-all focus:border-[#00A896] focus:bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider text-[#0D2B4E]">
                    Email professionnel
                  </label>
                  <input
                    type="email" required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jean@transport.fr"
                    className="w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3.5 text-[15px] font-medium text-[#0D2B4E] placeholder:text-[#94A3B8] outline-none transition-all focus:border-[#00A896] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider text-[#0D2B4E]">
                    Téléphone{" "}
                    <span className="font-normal normal-case text-[#94A3B8]">(optionnel)</span>
                  </label>
                  <input
                    type="tel" value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    placeholder="06 XX XX XX XX"
                    className="w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3.5 text-[15px] font-medium text-[#0D2B4E] placeholder:text-[#94A3B8] outline-none transition-all focus:border-[#00A896] focus:bg-white"
                  />
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
