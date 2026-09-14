/**
 * Questions du funnel de pré-qualification ClearGo.
 *
 * TODO: formulation finale en attente de validation Laury (deadline 20/09).
 * Ce fichier est volontairement isolé pour que les questions puissent être
 * ajustées sans toucher au composant.
 *
 * L'étape 0 (SIRET) est gérée séparément dans prequal-funnel.tsx : elle
 * interroge le registre national et pré-remplit ce qui peut l'être.
 */

export interface FunnelQuestion {
  id: string
  label: string
  /** Réponses multiples autorisées. */
  multiple?: boolean
  options: string[]
  /** Affiché sous la question quand la valeur vient du registre. */
  prefillHint?: string
}

export const FUNNEL_QUESTIONS: FunnelQuestion[] = [
  {
    id: 'type_marchandise',
    label: 'Quel type de marchandises transportez-vous ?',
    options: ['Générales', 'Pharma & température dirigée', 'ADR', 'Alimentaire', 'Autre'],
  },
  {
    id: 'zones_livraison',
    label: 'Sur quelles zones livrez-vous ?',
    multiple: true,
    options: ['Régional', 'National', 'International'],
  },
  {
    id: 'taille_flotte',
    label: 'Combien de véhicules dans votre flotte ?',
    options: ['1-5', '6-20', '21-50', 'Plus de 50'],
    prefillHint: 'Estimé depuis le registre. Corrigez si nécessaire.',
  },
  {
    id: 'role_transport',
    label: 'Quel est votre rôle dans la chaîne ?',
    options: [
      "J'exécute mes transports",
      'Je sous-traite une partie de mes flux',
      'Je suis commissionnaire',
      "Les deux — j'exécute et je sous-traite",
    ],
  },
  {
    id: 'besoin_principal',
    label: 'Quel est votre besoin principal ?',
    options: [
      "Répondre à des appels d'offres",
      'Préparer un contrôle',
      "Satisfaire un donneur d'ordres",
      "Savoir où j'en suis",
    ],
  },
  {
    id: 'urgence',
    label: "C'est pour quand ?",
    options: ['Maintenant', 'Dans les 3 mois', 'Je me renseigne'],
  },
]

/** Valeur envoyée au CRM pour `q_role_transport`. */
export const ROLE_TRANSPORT_CODES: Record<string, string> = {
  "J'exécute mes transports": 'executant',
  'Je sous-traite une partie de mes flux': 'sous_traitant',
  'Je suis commissionnaire': 'commissionnaire',
  "Les deux — j'exécute et je sous-traite": 'hybride',
}

/** Convertit la tranche de flotte en nombre exploitable côté CRM. */
export function parseFleetSize(label: string | undefined): number | null {
  switch (label) {
    case '1-5':
      return 5
    case '6-20':
      return 20
    case '21-50':
      return 50
    case 'Plus de 50':
      return 51
    default:
      return null
  }
}

/** Déduit la tranche de flotte la plus probable depuis le proxy du registre. */
export function fleetBucketFromProxy(proxyFlotte: number | null | undefined): string | null {
  if (proxyFlotte == null || Number.isNaN(proxyFlotte)) return null
  if (proxyFlotte <= 5) return '1-5'
  if (proxyFlotte <= 20) return '6-20'
  if (proxyFlotte <= 50) return '21-50'
  return 'Plus de 50'
}

export type UrgenceLevel = 'urgent_chaud' | 'tiede' | 'froid'

export function mapUrgence(urgence: string | undefined): UrgenceLevel {
  switch (urgence) {
    case 'Maintenant':
      return 'urgent_chaud'
    case 'Dans les 3 mois':
      return 'tiede'
    default:
      return 'froid'
  }
}

/** Seuil (en jours) en dessous duquel une licence proche de l'expiration prime. */
export const LICENCE_URGENCE_JOURS = 30
