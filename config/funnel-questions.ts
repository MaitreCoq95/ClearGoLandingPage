/**
 * Questions du funnel de pré-qualification ClearGo.
 *
 * TODO: formulation finale en attente de validation Laury (deadline 20/09).
 * L'audit du 15/09 orthographie « Laurie » — divergence à trancher.
 *
 * Ordre issu de l'audit du 15/09 : le déclencheur passe en première question.
 * Sa réponse oriente la restitution ET la route de sortie ; la demander en
 * cinquième position revenait à commencer par de la segmentation.
 *
 * Aucune donnée d'identité ici (décision B3 du 12/09) : ni SIRET, ni nom, ni
 * ville. L'identité arrive à l'account gate, après la première lecture.
 */

export interface FunnelQuestion {
  id: string
  label: string
  /** Réponses multiples autorisées. */
  multiple?: boolean
  options: string[]
  /** Réponse qui vaut refus de répondre : ne doit rien déclencher en aval. */
  optOut?: string
}

export const FUNNEL_QUESTIONS: FunnelQuestion[] = [
  {
    id: 'besoin_principal',
    label: "Qu'est-ce qui vous amène aujourd'hui ?",
    options: [
      "Savoir où j'en suis",
      'Préparer un contrôle ou une demande',
      "Répondre à des appels d'offres",
      "Satisfaire un donneur d'ordres",
      'Mieux suivre mes sous-traitants',
      'Je découvre ClearGo',
    ],
  },
  {
    id: 'type_marchandise',
    label: 'Que transportez-vous principalement ?',
    options: [
      'Marchandises générales',
      'Produits alimentaires',
      'Produits sous température dirigée',
      'Produits de santé et pharmaceutiques',
      'Matières dangereuses (ADR)',
      'Autre activité',
    ],
  },
  {
    id: 'zones_livraison',
    label: 'Où réalisez-vous vos transports ?',
    multiple: true,
    options: ['Régional', 'National', 'International'],
  },
  {
    id: 'taille_flotte',
    label: 'Sur combien de véhicules repose votre activité ?',
    options: ['1-5', '6-20', '21-50', 'Plus de 50', 'Je préfère ne pas répondre'],
    optOut: 'Je préfère ne pas répondre',
  },
  {
    id: 'role_transport',
    label: 'Qui réalise principalement vos transports ?',
    options: [
      'Nos propres conducteurs',
      'Nos conducteurs, avec un appui extérieur ponctuel',
      'Un équilibre entre nos moyens et la sous-traitance',
      'Principalement des partenaires ou sous-traitants',
    ],
  },
  {
    id: 'urgence',
    label: "C'est pour quand ?",
    options: ['Maintenant', 'Dans les 3 mois', 'Je me renseigne'],
  },
]

export type Answers = Record<string, string | string[]>

export interface FunnelBranch extends FunnelQuestion {
  /** La branche ne s'affiche que si cette condition est vraie. */
  condition: (a: Answers) => boolean
}

/**
 * Branches conditionnelles.
 *
 * Elles ne s'ajoutent jamais au socle : elles s'affichent après lui, et
 * seulement aux profils concernés. Le compteur les distingue explicitement
 * (« question complémentaire ») pour ne pas reproduire l'écart entre ce qui
 * est annoncé et ce qui est demandé.
 *
 * Une branche n'existe que si elle change la restitution. Celle-ci précise le
 * point à clarifier — sans elle, le profil sous-traitant recevrait une lecture
 * générique.
 */
export const FUNNEL_BRANCHES: FunnelBranch[] = [
  {
    id: 'suivi_sous_traitants',
    label: 'Comment suivez-vous aujourd’hui les documents de vos partenaires ?',
    // Question sensible : les intitulés décrivent une organisation, ils ne
    // jugent pas. « Pas encore systématique » est une réponse comme une autre.
    options: [
      'Tout est centralisé et suivi régulièrement',
      'Les informations sont réparties dans plusieurs outils',
      'Nous vérifions surtout lorsqu’une demande arrive',
      'Le suivi n’est pas encore systématique',
      'Je ne sais pas précisément',
    ],
    condition: (a) =>
      recourtALaSousTraitance(typeof a.role_transport === 'string' ? a.role_transport : undefined) ||
      a.besoin_principal === 'Mieux suivre mes sous-traitants',
  },
]

/** Branches applicables au profil, dans l'ordre de déclaration. */
export function branchesApplicables(a: Answers): FunnelBranch[] {
  return FUNNEL_BRANCHES.filter((b) => b.condition(a))
}

/**
 * Valeur envoyée au CRM pour `q_role_transport`.
 *
 * Les libellés sont passés du vocabulaire contractuel (« commissionnaire »)
 * au vocabulaire terrain, mais les codes transmis restent inchangés : le CRM
 * n'a pas à être redéployé pour un changement de formulation.
 */
export const ROLE_TRANSPORT_CODES: Record<string, string> = {
  'Nos propres conducteurs': 'executant',
  'Nos conducteurs, avec un appui extérieur ponctuel': 'executant',
  'Un équilibre entre nos moyens et la sous-traitance': 'hybride',
  'Principalement des partenaires ou sous-traitants': 'sous_traitant',
}

/** Vrai dès que le profil confie une part significative de ses flux. */
export function recourtALaSousTraitance(roleLabel: string | undefined): boolean {
  const code = roleLabel ? ROLE_TRANSPORT_CODES[roleLabel] : undefined
  return code === 'hybride' || code === 'sous_traitant'
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
      // Couvre aussi « Je préfère ne pas répondre » : un refus de répondre ne
      // doit jamais se transformer en estimation côté CRM.
      return null
  }
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
