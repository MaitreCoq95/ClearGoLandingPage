export interface QuestionOption {
  label: string
  value: string
  scoreReglo?: number
  scoreExcellence?: number
}

export interface Question {
  id: string
  bloc: string
  header?: string
  headerSubtitle?: string
  question: string
  multiSelect?: boolean
  maxSelect?: number
  options: QuestionOption[]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BLOC A — Core questions (Q1-Q10)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const blocA: Question[] = [
  {
    id: "Q1",
    bloc: "A",
    question: "Quelle est votre activite principale de transport ?",
    multiSelect: true,
    options: [
      { label: "Transport de marchandises generales", value: "marchandises" },
      { label: "Transport temperature dirigee (froid / surgele)", value: "temperature" },
      { label: "Transport matieres dangereuses (ADR)", value: "adr" },
      { label: "Transport de voyageurs", value: "voyageurs" },
      { label: "Commissionnaire / Affreteur", value: "commissionnaire" },
      { label: "Transport evenementiel (festivals, salons)", value: "evenementiel" },
      { label: "Transport pharmaceutique (GDP)", value: "gdp" },
      { label: "Transport alimentaire (HACCP)", value: "haccp" },
    ],
  },
  {
    id: "Q2",
    bloc: "A",
    question: "Combien de vehicules exploitez-vous ?",
    options: [
      { label: "1 a 5 vehicules", value: "1-5" },
      { label: "6 a 15 vehicules", value: "6-15" },
      { label: "16 a 50 vehicules", value: "16-50" },
      { label: "51 a 150 vehicules", value: "51-150" },
      { label: "150+ vehicules", value: "150+" },
    ],
  },
  {
    id: "Q3",
    bloc: "A",
    question: "Avez-vous fait l'objet d'un controle DRIEAT ou DREAL ces 3 dernieres annees ?",
    options: [
      { label: "Oui, et tout s'est bien passe", value: "ok", scoreReglo: 80 },
      { label: "Oui, avec des constats / injonctions a corriger", value: "constats", scoreReglo: 40 },
      { label: "Oui, avec des sanctions ou mises en demeure", value: "sanctions", scoreReglo: 10 },
      { label: "Non, aucun controle a notre connaissance", value: "aucun", scoreReglo: 50 },
      { label: "On ne sait pas / on vient de reprendre", value: "nsp", scoreReglo: 30 },
    ],
  },
  {
    id: "Q4",
    bloc: "A",
    question: "Comment gerez-vous le suivi des qualifications de vos conducteurs ?",
    options: [
      { label: "Logiciel dedie avec alertes automatiques", value: "logiciel", scoreReglo: 80 },
      { label: "Tableur Excel mis a jour manuellement", value: "excel", scoreReglo: 50 },
      { label: "Dossiers papier dans les classeurs", value: "papier", scoreReglo: 20 },
      { label: "De memoire / chaque conducteur gere lui-meme", value: "memoire", scoreReglo: 5 },
      { label: "On n'a pas de suivi systematique", value: "aucun", scoreReglo: 0 },
    ],
  },
  {
    id: "Q5",
    bloc: "A",
    question: "Comment suivez-vous les echeances reglementaires de votre flotte ?",
    options: [
      { label: "Outil de gestion flotte avec rappels", value: "outil", scoreReglo: 70 },
      { label: "Tableau de bord Excel maison", value: "excel", scoreReglo: 45 },
      { label: "Agenda / rappels telephone", value: "agenda", scoreReglo: 25 },
      { label: "Le garage nous previent pour les CT", value: "garage", scoreReglo: 15 },
      { label: "Pas de suivi structure", value: "aucun", scoreReglo: 0 },
    ],
  },
  {
    id: "Q6",
    bloc: "A",
    question: "Gerez-vous les fichiers tachygraphes de vos conducteurs et vehicules ?",
    options: [
      { label: "Oui, logiciel dedie (TIS-Web, Tacho Universal...)", value: "logiciel", scoreReglo: 60 },
      { label: "Oui mais manuellement, sans logiciel d'analyse", value: "manuel", scoreReglo: 35 },
      { label: "Parfois, pas de procedure formalisee", value: "parfois", scoreReglo: 15 },
      { label: "Non, on ne fait pas ces telechargements", value: "jamais", scoreReglo: 0 },
      { label: "Je ne sais pas ce que c'est", value: "nsp", scoreReglo: 0 },
    ],
  },
  {
    id: "Q7",
    bloc: "A",
    question: "Faites-vous appel a des transporteurs sous-traitants / affretes ?",
    options: [
      { label: "Oui, avec registre de vigilance a jour", value: "registre", scoreReglo: 60 },
      { label: "Oui, mais le suivi des documents est incomplet", value: "incomplet", scoreReglo: 30 },
      { label: "Oui, mais sans dossier de vigilance formalise", value: "aucun_dossier", scoreReglo: 0 },
      { label: "Non, on ne sous-traite pas", value: "non", scoreReglo: 60 },
    ],
  },
  {
    id: "Q8",
    bloc: "A",
    question: "Comment gerez-vous vos documents qualite et reglementaires ?",
    options: [
      { label: "DMS (Gestion Electronique de Documents) dedie", value: "dms", scoreReglo: 50 },
      { label: "SharePoint / Google Drive organise par dossiers", value: "cloud", scoreReglo: 35 },
      { label: "Classeurs physiques + quelques scans", value: "classeurs", scoreReglo: 15 },
      { label: "Emails et pieces jointes dispersees", value: "emails", scoreReglo: 5 },
      { label: "Pas de gestion documentaire formalisee", value: "rien", scoreReglo: 0 },
    ],
  },
  {
    id: "Q9",
    bloc: "A",
    question: "Quelles certifications votre entreprise detient-elle actuellement ?",
    multiSelect: true,
    options: [
      { label: "ISO 9001 (Qualite)", value: "iso9001", scoreExcellence: 100 },
      { label: "ISO 45001 (Sante-Securite)", value: "iso45001", scoreExcellence: 80 },
      { label: "ISO 14001 (Environnement)", value: "iso14001", scoreExcellence: 80 },
      { label: "GDP (Bonnes Pratiques Distribution)", value: "gdp", scoreExcellence: 60 },
      { label: "HACCP", value: "haccp", scoreExcellence: 40 },
      { label: "Label RSE / Engage RSE AFNOR", value: "rse", scoreExcellence: 40 },
      { label: "Aucune certification actuellement", value: "aucune", scoreExcellence: 0 },
      { label: "En cours de certification", value: "en_cours", scoreExcellence: 30 },
    ],
  },
  {
    id: "Q10",
    bloc: "A",
    question: "Quel est votre defi numero 1 aujourd'hui ?",
    multiSelect: true,
    maxSelect: 2,
    options: [
      { label: "Me preparer a une inspection DRIEAT imminente", value: "drieat", scoreExcellence: 0 },
      { label: "Decrocher des contrats grands comptes / AO", value: "contrats", scoreExcellence: 20 },
      { label: "Structurer mon Systeme de Management QSE", value: "qse", scoreExcellence: 30 },
      { label: "Produire un bilan carbone et rapport RSE", value: "rse", scoreExcellence: 20 },
      { label: "Savoir exactement ou j'en suis reglementairement", value: "etat_lieux", scoreExcellence: 0 },
      { label: "Automatiser ma veille reglementaire", value: "veille", scoreExcellence: 0 },
    ],
  },
]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BLOC B — ADR branch
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const blocB: Question[] = [
  {
    id: "B1",
    bloc: "B",
    header: "Questions specifiques -- Transport ADR",
    headerSubtitle: "Quelques questions supplementaires sur vos obligations ADR",
    question: "Avez-vous designe un Conseiller a la Securite pour le Transport de Matieres Dangereuses (CSTMD) ?",
    options: [
      { label: "Oui, interne -- salarie certifie", value: "interne_ok", scoreReglo: 20 },
      { label: "Oui, externe -- conseiller mandate (contrat en cours)", value: "externe_ok", scoreReglo: 20 },
      { label: "Oui mais son contrat / certificat n'est plus a jour", value: "expire", scoreReglo: 5 },
      { label: "Non, on n'en a pas", value: "non", scoreReglo: 0 },
      { label: "Je ne savais pas que c'etait obligatoire", value: "nsp", scoreReglo: -10 },
    ],
  },
  {
    id: "B2",
    bloc: "B",
    question: "Les rapports annuels du Conseiller a la Securite sont-ils produits et archives ?",
    options: [
      { label: "Oui, les 3 derniers rapports sont disponibles", value: "ok", scoreReglo: 15 },
      { label: "Oui mais je ne suis pas sur de les retrouver", value: "incertain", scoreReglo: 5 },
      { label: "Non, aucun rapport produit", value: "non", scoreReglo: 0 },
      { label: "Je ne savais pas que c'etait obligatoire", value: "nsp", scoreReglo: 0 },
    ],
  },
  {
    id: "B3",
    bloc: "B",
    question: "Le personnel intervenant sur les MD est-il forme chapitre 1.3 ADR ?",
    options: [
      { label: "Oui, formation tracee pour tout le personnel", value: "ok", scoreReglo: 15 },
      { label: "Oui mais sans registre formel de formation", value: "sans_registre", scoreReglo: 8 },
      { label: "Partiellement -- certains n'ont pas ete formes", value: "partiel", scoreReglo: 3 },
      { label: "Non, pas de formation 1.3 realisee", value: "non", scoreReglo: 0 },
    ],
  },
  {
    id: "B4",
    bloc: "B",
    question: "Vos vehicules transportant des MD disposent-ils de certificats d'agrement ADR a jour ?",
    options: [
      { label: "Oui, tous a jour", value: "ok", scoreReglo: 15 },
      { label: "Certains agrements approchent de l'expiration", value: "bientot", scoreReglo: 7 },
      { label: "Des agrements sont expires", value: "expire", scoreReglo: 0 },
      { label: "On ne transporte pas de MD en citerne", value: "na", scoreReglo: 0 },
    ],
  },
]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BLOC C — GDP branch
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const blocC: Question[] = [
  {
    id: "C1",
    bloc: "C",
    header: "Questions specifiques -- Transport GDP",
    headerSubtitle: "Transport pharmaceutique et chaine du froid",
    question: "Vos vehicules dedies au transport pharmaceutique sont-ils qualifies GDP (IQ/OQ/PQ) ?",
    options: [
      { label: "Oui, qualification documentee et validee annuellement", value: "ok", scoreReglo: 20 },
      { label: "Oui mais la qualification n'a pas ete renouvelee", value: "expire", scoreReglo: 5 },
      { label: "En cours de qualification", value: "en_cours", scoreReglo: 10 },
      { label: "Non, pas de qualification formelle", value: "non", scoreReglo: 0 },
    ],
  },
  {
    id: "C2",
    bloc: "C",
    question: "Comment enregistrez-vous les donnees de temperature pendant le transport ?",
    options: [
      { label: "Enregistreurs connectes avec alerte en temps reel", value: "connecte", scoreReglo: 20 },
      { label: "Enregistreurs avec telechargement manuel", value: "manuel", scoreReglo: 10 },
      { label: "Releves manuels par le conducteur", value: "releves", scoreReglo: 5 },
      { label: "Pas d'enregistrement systematique", value: "non", scoreReglo: 0 },
    ],
  },
  {
    id: "C3",
    bloc: "C",
    question: "En cas de depassement de temperature, avez-vous une procedure de gestion des deviations ?",
    options: [
      { label: "Oui, procedure ecrite avec tracabilite", value: "ok", scoreReglo: 15 },
      { label: "On gere au cas par cas sans procedure", value: "cas_par_cas", scoreReglo: 5 },
      { label: "Non, aucune procedure", value: "non", scoreReglo: 0 },
    ],
  },
  {
    id: "C4",
    bloc: "C",
    question: "Realisez-vous une revue qualite annuelle GDP ?",
    options: [
      { label: "Oui, document produit et archive chaque annee", value: "ok", scoreReglo: 15 },
      { label: "On y reflechit mais rien de formalise", value: "envisage", scoreReglo: 3 },
      { label: "Non, jamais realise", value: "non", scoreReglo: 0 },
    ],
  },
]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BLOC D — HACCP branch
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const blocD: Question[] = [
  {
    id: "D1",
    bloc: "D",
    header: "Questions specifiques -- Transport alimentaire HACCP",
    headerSubtitle: "Hygiene et securite alimentaire dans le transport",
    question: "Avez-vous formalise un plan HACCP specifique a votre activite de transport ?",
    options: [
      { label: "Oui, plan HACCP documente et mis a jour", value: "ok", scoreReglo: 15 },
      { label: "On a des elements mais pas de plan complet", value: "partiel", scoreReglo: 7 },
      { label: "Non, aucun plan HACCP", value: "non", scoreReglo: 0 },
    ],
  },
  {
    id: "D2",
    bloc: "D",
    question: "Avez-vous un plan de nettoyage et desinfection formalise pour vos vehicules ?",
    options: [
      { label: "Oui, planning + fiches d'enregistrement", value: "ok", scoreReglo: 10 },
      { label: "On nettoie regulierement mais sans enregistrement", value: "sans_trace", scoreReglo: 5 },
      { label: "Pas de procedure formalisee", value: "non", scoreReglo: 0 },
    ],
  },
  {
    id: "D3",
    bloc: "D",
    question: "Le personnel en contact avec les denrees est-il forme a l'hygiene alimentaire ?",
    options: [
      { label: "Oui, formation tracee et renouvelee", value: "ok", scoreReglo: 10 },
      { label: "Formation realisee mais non tracee", value: "non_tracee", scoreReglo: 5 },
      { label: "Non, aucune formation hygiene", value: "non", scoreReglo: 0 },
    ],
  },
]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BLOC E — QSE / ISO branch
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const blocE: Question[] = [
  {
    id: "E1",
    bloc: "E",
    header: "Questions specifiques -- Systeme de Management Integre",
    headerSubtitle: "Audits, non-conformites et amelioration continue",
    question: "Realisez-vous des audits internes de votre systeme de management ?",
    options: [
      { label: "Oui, programme annuel avec rapports et plan d'actions", value: "ok", scoreExcellence: 40 },
      { label: "Oui mais de facon irreguliere et sans programme formel", value: "irregulier", scoreExcellence: 20 },
      { label: "On a prevu d'en faire mais pas encore demarre", value: "prevu", scoreExcellence: 5 },
      { label: "Non, aucun audit interne realise", value: "non", scoreExcellence: 0 },
    ],
  },
  {
    id: "E2",
    bloc: "E",
    question: "Comment gerez-vous vos non-conformites et actions correctives (CAPA) ?",
    options: [
      { label: "Registre informatise avec suivi delais et efficacite", value: "informatise", scoreExcellence: 30 },
      { label: "Tableau Excel de suivi des NC", value: "excel", scoreExcellence: 15 },
      { label: "Notes manuscrites ou emails ponctuels", value: "notes", scoreExcellence: 5 },
      { label: "Pas de systeme de gestion des NC", value: "non", scoreExcellence: 0 },
    ],
  },
  {
    id: "E3",
    bloc: "E",
    question: "Realisez-vous une revue de direction annuelle pour votre systeme de management ?",
    options: [
      { label: "Oui, reunion formalisee avec compte-rendu archive", value: "ok", scoreExcellence: 25 },
      { label: "Oui mais sans compte-rendu structure", value: "sans_cr", scoreExcellence: 10 },
      { label: "Non, jamais realise", value: "non", scoreExcellence: 0 },
    ],
  },
  {
    id: "E4",
    bloc: "E",
    question: "Mesurez-vous des indicateurs de performance qualite (KPIs) de facon reguliere ?",
    options: [
      { label: "Oui, tableau de bord mensuel avec objectifs chiffres", value: "ok", scoreExcellence: 25 },
      { label: "Quelques indicateurs suivis mais pas systematiquement", value: "parfois", scoreExcellence: 10 },
      { label: "On suit le CA et les marges, pas d'indicateurs qualite", value: "financier", scoreExcellence: 3 },
      { label: "Aucun indicateur de performance suivi", value: "non", scoreExcellence: 0 },
    ],
  },
]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BLOC F — Evenementiel branch
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const blocF: Question[] = [
  {
    id: "F1",
    bloc: "F",
    header: "Questions specifiques -- Transport evenementiel",
    headerSubtitle: "Logistique festivals, tournees, salons professionnels",
    question: "Vos clients organisateurs vous demandent-ils un bilan d'impact environnemental par evenement ?",
    options: [
      { label: "Oui, exigence contractuelle systematique", value: "systematique", scoreExcellence: 15 },
      { label: "Parfois, certains clients commencent a le demander", value: "parfois", scoreExcellence: 8 },
      { label: "Pas encore mais on anticipe la tendance", value: "anticipe", scoreExcellence: 3 },
      { label: "Non, jamais demande", value: "non", scoreExcellence: 0 },
    ],
  },
  {
    id: "F2",
    bloc: "F",
    question: "Avez-vous entendu parler de la norme ISO 20121 (Management des evenements durables) ?",
    options: [
      { label: "Oui, on est en cours de deploiement", value: "deploiement", scoreExcellence: 20 },
      { label: "Oui, on s'y interesse", value: "interesse", scoreExcellence: 8 },
      { label: "Non, premiere fois que j'en entends parler", value: "non", scoreExcellence: 0 },
    ],
  },
]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Diagnostic messages
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function getDiagnosticMessage(answers: Record<string, string | string[]>): string {
  const q6 = answers["Q6"] as string
  const q3 = answers["Q3"] as string
  const q7 = answers["Q7"] as string
  const q4 = answers["Q4"] as string
  const q9 = answers["Q9"] as string[]
  const q10 = answers["Q10"] as string[]
  const e1 = answers["E1"] as string

  if (q6 === "jamais" || q6 === "nsp") {
    return "Risque critique : Le defaut de telechargement des fichiers tachygraphes est une infraction lors des controles DRIEAT. C'est votre priorite absolue."
  }
  if (q3 === "sanctions") {
    return "Votre historique de controles signale des points de vigilance. ClearGo vous permet de documenter votre redressement aupres des autorites."
  }
  if (q7 === "aucun_dossier") {
    return "Vos affretes sans dossier de vigilance vous exposent a une responsabilite solidaire en cas de controle."
  }
  if (q4 === "memoire" || q4 === "aucun") {
    return "La gestion des qualifications conducteurs de memoire est votre risque principal. Un oubli de FIMO peut immobiliser un vehicule."
  }
  if (q9?.includes("aucune") && q10?.includes("contrats")) {
    return "Sans certification ISO 9001, vous repondez hors criteres sur 60% des AO transport grands comptes. C'est votre levier commercial numero 1."
  }
  if (e1 === "non") {
    return "Vous visez une certification ISO mais sans audits internes, l'organisme certificateur ne pourra pas valider votre systeme."
  }
  return "Votre profil presente des opportunites d'amelioration significatives. ClearGo peut vous aider a structurer votre conformite et votre performance."
}

export function getBadgeLevel(total: number): { level: string; color: string; bgColor: string } {
  if (total >= 851) return { level: "PLATINE", color: "#2B5BA8", bgColor: "bg-[var(--navy-light)]/10" }
  if (total >= 651) return { level: "OR", color: "#D4A017", bgColor: "bg-amber-50" }
  if (total >= 401) return { level: "ARGENT", color: "#71717A", bgColor: "bg-zinc-50" }
  return { level: "BRONZE", color: "#A67C52", bgColor: "bg-orange-50" }
}

export function getRecommendedModules(
  answers: Record<string, string | string[]>,
  scoreReglo: number,
  scoreExcellence: number,
): { name: string; description: string; pointsAdded: string }[] {
  const modules: { name: string; description: string; pointsAdded: string }[] = []
  const q1 = (answers["Q1"] as string[]) || []
  const q9 = (answers["Q9"] as string[]) || []
  const q10 = (answers["Q10"] as string[]) || []

  if (q1.includes("adr") && scoreReglo < 350) {
    modules.push({ name: "Module ADR", description: "Conseiller securite, rapports annuels, formation 1.3, agrements vehicules", pointsAdded: "+65 pts Reglo" })
  }
  if (q1.includes("gdp")) {
    modules.push({ name: "Module GDP -- Tracabilite temperature", description: "Qualification vehicules IQ/OQ/PQ, enregistreurs, gestion deviations", pointsAdded: "+50 pts Excellence" })
  }
  if (q9.includes("aucune") || q9.includes("en_cours")) {
    modules.push({ name: "Module ISO 9001 -- Premier certificat recommande", description: "Cartographie processus, KPIs qualite, audits internes, revue direction", pointsAdded: "+150 pts Excellence" })
  }
  if (q10.includes("rse")) {
    modules.push({ name: "Module ISO 14001 + RSE", description: "Bilan carbone, plan reduction CO2, rapport RSE automatique", pointsAdded: "+140 pts Excellence" })
  }
  if (modules.length === 0) {
    modules.push({ name: "Score REGLO -- Conformite DRIEAT", description: "Completez votre conformite reglementaire pour atteindre le niveau Argent", pointsAdded: `+${Math.max(0, 400 - scoreReglo)} pts Reglo` })
  }
  return modules.slice(0, 3)
}
