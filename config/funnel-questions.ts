/**
 * Les six questions du parcours public — copie fidèle du SaaS.
 *
 * Source de vérité : dépôt Yo-TR/ClearGo,
 *   cleargo_frontend/src/constants/funnelQuestions.js (CORE_QUESTIONS)
 * Décisions B2/B3 du 22/09/2026 et options ajoutées après le test des
 * personas du 27/09/2026 (« Aucun véhicule en propre », « J’organise et je
 * sous-traite tout ou partie », « Un donneur d’ordre m’a demandé de passer par
 * ClearGo », « Je vous ai vus sur les réseaux sociaux »).
 *
 * Mêmes identifiants que le SaaS, pour que chaque brique de restitution garde
 * son déclencheur et que le jour de la bascule de cleargo.fr, rien ne change de
 * sens. Aucun libellé ne se modifie ici sans être modifié d’abord là-bas.
 *
 * Aucune donnée d’identité ici (décision B3 du 12/09) : le SIRET reste
 * facultatif et arrive à l’account gate.
 */

export type Answers = Record<string, string | string[]>

export interface FunnelOption {
  id: string
  label: string
}

export interface FunnelQuestion {
  id: string
  label: string
  /** Réponses multiples autorisées. */
  multiple?: boolean
  options: FunnelOption[]
}

export const FUNNEL_QUESTIONS: FunnelQuestion[] = [
  {
    id: 'marchandises',
    label: 'Que transportez-vous ?',
    multiple: true,
    options: [
      { id: 'generales', label: 'Marchandises générales' },
      { id: 'alimentaire', label: 'Alimentaire' },
      { id: 'pharma', label: 'Pharma / santé' },
      { id: 'adr', label: 'Matières dangereuses (ADR)' },
      { id: 'dechets', label: 'Déchets' },
      { id: 'vehicules', label: 'Véhicules' },
      { id: 'valeur', label: 'Marchandises de valeur' },
      { id: 'vrac', label: 'Vrac' },
      { id: 'autre', label: 'Autre' },
    ],
  },
  {
    id: 'role',
    label: 'Comment travaillez-vous ?',
    options: [
      { id: 'execute', label: 'Avec mes propres véhicules' },
      { id: 'mixte', label: 'Mes véhicules + de la sous-traitance' },
      { id: 'commissionnaire', label: 'J’organise, je sous-traite tout (commissionnaire / affréteur)' },
      { id: 'organisateur', label: 'J’organise et je sous-traite tout ou partie' },
      { id: 'autre', label: 'Autre' },
    ],
  },
  {
    id: 'flotte',
    label: 'Combien de véhicules ?',
    options: [
      { id: 'aucun', label: 'Aucun véhicule en propre' },
      { id: '1-5', label: '1 à 5' },
      { id: '6-20', label: '6 à 20' },
      { id: '21-50', label: '21 à 50' },
      { id: '51-200', label: '51 à 200' },
      { id: 'plus200', label: 'Plus de 200' },
    ],
  },
  {
    id: 'zones',
    label: 'Où roulez-vous ?',
    multiple: true,
    options: [
      { id: 'local', label: 'Local (département)' },
      { id: 'regional', label: 'Régional' },
      { id: 'national', label: 'National' },
      { id: 'frontalier', label: 'Frontalier' },
      { id: 'europe', label: 'Europe' },
      { id: 'hors_europe', label: 'Hors Europe' },
    ],
  },
  {
    id: 'disponibilite_dossiers',
    label: 'Un client vous demande votre dossier complet avant 16 h. Que se passe-t-il ?',
    options: [
      { id: 'immediat', label: 'Je l’envoie dans l’heure, tout est prêt' },
      { id: 'grande_partie_journee', label: 'Je le retrouve, mais ça me prend la journée' },
      { id: 'incomplet', label: 'Il manque des pièces, je cours après' },
      { id: 'ne_sait_pas_dossier', label: 'Je ne sais pas exactement ce qu’il faut fournir' },
    ],
  },
  {
    id: 'besoin',
    label: 'Qu’est-ce qui vous amène ?',
    options: [
      { id: 'donneur_ordre', label: 'Un client me demande un dossier ou des documents' },
      { id: 'envoye_par_donneur_ordre', label: 'Un donneur d’ordre m’a demandé de passer par ClearGo' },
      { id: 'appels_offres', label: 'Je réponds à un appel d’offres' },
      { id: 'controle', label: 'Je veux être prêt en cas de contrôle (DREAL, routier, URSSAF…)' },
      { id: 'savoir_ou_jen_suis', label: 'Je veux savoir ce qui s’applique à mon activité' },
      { id: 'prouver_qualite', label: 'Je veux prouver mon niveau pour décrocher de nouveaux clients' },
      { id: 'reseaux_sociaux', label: 'Je vous ai vus sur les réseaux sociaux' },
      { id: 'autre', label: 'Autre' },
    ],
  },
]

/** Miroir de ZONES_INTERNATIONALES (SaaS). `international` : ancienne valeur. */
export const ZONES_INTERNATIONALES = ['frontalier', 'europe', 'hors_europe', 'international']

/** Miroir de ROLES_SOUS_TRAITANCE (SaaS, utils/restitution.js). */
export const ROLES_SOUS_TRAITANCE = ['mixte', 'commissionnaire', 'soustraite_partie', 'organisateur']

/**
 * Codes acceptés par le CRM pour `q_role_transport`
 * (Prospect.ROLE_TRANSPORT_CHOICES). Un code hors nomenclature y est vidé.
 * `organisateur` est traité en sous-traitant, comme dans le moteur du SaaS.
 */
export const ROLE_TRANSPORT_CODES: Record<string, string> = {
  execute: 'executant',
  mixte: 'hybride',
  commissionnaire: 'commissionnaire',
  organisateur: 'sous_traitant',
}

export function texte(a: Answers, id: string): string | undefined {
  const v = a[id]
  return typeof v === 'string' && v.length > 0 ? v : undefined
}

export function liste(a: Answers, id: string): string[] {
  const v = a[id]
  return Array.isArray(v) ? v : []
}

/** Libellé d’une option, pour un affichage ou un résumé lisible. */
export function libelleOption(questionId: string, optionId: string): string {
  const q = FUNNEL_QUESTIONS.find((x) => x.id === questionId)
  return q?.options.find((o) => o.id === optionId)?.label ?? optionId
}

/** Tranche de flotte → nombre exploitable par le CRM (borne haute). */
export function parseFleetSize(flotte: string | undefined): number | null {
  switch (flotte) {
    case 'aucun':
      return 0
    case '1-5':
      return 5
    case '6-20':
      return 20
    case '21-50':
      return 50
    case '51-200':
      return 200
    case 'plus200':
      return 201
    default:
      return null
  }
}

export type UrgenceLevel = 'urgent_chaud' | 'tiede' | 'froid'

/*
 * Niveau d’urgence, d’après les règles du moteur validées par Vivien le
 * 25/09/2026 (Landing V0 — production) :
 *  - R4 urgence = besoin concret (contrôle, dossier client, appel d’offres)
 *    ET dossier difficile (« il manque des pièces » / « je ne sais pas ») ;
 *  - R1 veille = besoin « savoir ce qui s’applique » ET dossier prêt ou
 *    retrouvable dans la journée.
 * Être envoyé par un donneur d’ordre est un besoin concret ; venir des
 * réseaux sociaux relève de la veille (moteur du SaaS, PR #25).
 */
const BESOINS_OPERATIONNELS = ['controle', 'donneur_ordre', 'envoye_par_donneur_ordre', 'appels_offres']
const BESOINS_VEILLE = ['savoir_ou_jen_suis', 'reseaux_sociaux']
const DOSSIERS_DIFFICILES = ['incomplet', 'ne_sait_pas_dossier']
const DOSSIERS_MOBILISABLES = ['immediat', 'grande_partie_journee']

export function niveauUrgence(a: Answers): UrgenceLevel {
  const besoin = texte(a, 'besoin') ?? ''
  const dossier = texte(a, 'disponibilite_dossiers') ?? ''
  if (BESOINS_OPERATIONNELS.includes(besoin) && DOSSIERS_DIFFICILES.includes(dossier)) {
    return 'urgent_chaud'
  }
  if (BESOINS_VEILLE.includes(besoin) && DOSSIERS_MOBILISABLES.includes(dossier)) {
    return 'froid'
  }
  return 'tiede'
}

/** Seuil (en jours) en dessous duquel une licence proche de l'expiration prime. */
export const LICENCE_URGENCE_JOURS = 30
