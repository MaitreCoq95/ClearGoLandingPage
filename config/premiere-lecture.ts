/**
 * Première lecture ClearGo — la valeur rendue avant toute coordonnée.
 *
 * Deux règles encadrent ce fichier, et elles viennent de deux sources qui
 * disent la même chose :
 *
 * 1. Audit du 15/09, §11.3 — interdit d'afficher un score réglementaire à
 *    partir de quelques réponses déclaratives, interdit de déclarer une
 *    entreprise conforme ou non conforme, interdit de produire la même
 *    restitution avec seulement quelques mots variables.
 * 2. Arbitrage du 12/09 — aucun chiffre de score, tendance seulement, et
 *    jamais une affirmation non vérifiée : si le profil ne déclenche aucune
 *    brique sourcée, on affiche la variante neutre.
 *
 * D'où le registre retenu pour le point d'attention : une CLARIFICATION, pas
 * un constat. « Un premier point à clarifier concerne X » n'affirme rien sur
 * l'entreprise — contrairement à « il vous manque X », qui serait une
 * affirmation invérifiable à ce stade.
 *
 * Les obligations citées ci-dessous sont des exigences générales du transport
 * routier, pas un diagnostic du visiteur. Quand les briques sourcées R2 et R4
 * à R9 seront disponibles, elles remplaceront ces formulations — la structure
 * ne bougera pas.
 *
 * Tout est calculé ici, côté navigateur. Rien n'est envoyé pour obtenir cette
 * lecture : la session reste anonyme jusqu'à l'account gate (décision B3).
 */

import { recourtALaSousTraitance, type Answers } from './funnel-questions'

export interface PremiereLecture {
  /** Reformulation fidèle de ce que le visiteur vient de déclarer. */
  miroir: string
  /** Sa priorité, reprise dans ses propres termes. */
  priorite: string
  /** Point à clarifier, rattaché à une réponse précise. */
  attention: { titre: string; detail: string; origine: string }
  /** Vrai quand aucune réponse ne permet mieux que la variante neutre. */
  neutre: boolean
}

function texte(a: Answers, id: string): string | undefined {
  const v = a[id]
  return typeof v === 'string' && v.length > 0 ? v : undefined
}

function liste(a: Answers, id: string): string[] {
  const v = a[id]
  return Array.isArray(v) ? v : []
}

/** « Régional », « National » → « régional et national ». */
function joindre(items: string[]): string {
  const bas = items.map((i) => i.toLowerCase())
  if (bas.length === 0) return ''
  if (bas.length === 1) return bas[0]!
  return `${bas.slice(0, -1).join(', ')} et ${bas[bas.length - 1]}`
}

const MODELE: Record<string, string> = {
  'Nos propres conducteurs': 'avec vos propres conducteurs',
  'Nos conducteurs, avec un appui extérieur ponctuel':
    'avec vos conducteurs et un appui extérieur ponctuel',
  'Un équilibre entre nos moyens et la sous-traitance':
    'entre vos moyens propres et la sous-traitance',
  'Principalement des partenaires ou sous-traitants':
    'principalement via des partenaires',
}

const ACTIVITE: Record<string, string> = {
  'Marchandises générales': 'le transport de marchandises générales',
  'Produits alimentaires': 'le transport de produits alimentaires',
  'Produits sous température dirigée': 'le transport sous température dirigée',
  'Produits de santé et pharmaceutiques': 'le transport de produits de santé',
  'Matières dangereuses (ADR)': 'le transport de matières dangereuses',
  'Autre activité': 'votre activité de transport',
}

/** Les tranches sont des libellés de bouton ; en prose elles doivent s'écrire. */
const PARC: Record<string, string> = {
  '1-5': 'sur un parc de 1 à 5 véhicules',
  '6-20': 'sur un parc de 6 à 20 véhicules',
  '21-50': 'sur un parc de 21 à 50 véhicules',
  'Plus de 50': 'sur un parc de plus de 50 véhicules',
}

const PRIORITE: Record<string, string> = {
  "Savoir où j'en suis": 'faire le point sur votre situation',
  'Préparer un contrôle ou une demande': 'préparer un contrôle ou une demande',
  "Répondre à des appels d'offres": "répondre à des appels d'offres",
  "Satisfaire un donneur d'ordres": "répondre aux attentes d'un donneur d'ordres",
  'Mieux suivre mes sous-traitants': 'mieux suivre vos sous-traitants',
  'Je découvre ClearGo': 'découvrir ce que ClearGo peut vous apporter',
}

/**
 * Variante neutre. Elle ne suppose rien de l'entreprise : elle nomme une
 * question que se pose n'importe quel transporteur, et c'est tout.
 */
const NEUTRE = {
  titre: 'Où sont vos preuves, et qui les maintient à jour',
  detail:
    "La plupart des difficultés ne viennent pas d'un document manquant, mais d'un " +
    "document qu'on ne retrouve pas au moment où on le demande. C'est le premier " +
    'point que ClearGo regarde.',
  origine: 'Point commun à tous les profils',
}

/**
 * Point d'attention du profil sous-traitant.
 *
 * La réponse à la branche précise le point, elle ne le juge pas : un suivi
 * « pas encore systématique » n'est pas une faute, c'est l'état ordinaire de
 * la plupart des entreprises. L'audit met explicitement en garde contre le
 * jugement immédiat sur cette question (§9, Q5b).
 */
function pointSousTraitance(suivi: string | undefined): PremiereLecture['attention'] {
  const DETAIL: Record<string, string> = {
    'Tout est centralisé et suivi régulièrement':
      'Votre organisation est en place. Le point à clarifier devient la preuve : ' +
      'pouvoir montrer, à une date donnée, que chaque pièce était valide.',
    'Les informations sont réparties dans plusieurs outils':
      'Quand les pièces vivent dans plusieurs outils, elles sont rarement perdues — ' +
      'elles sont longues à rassembler. C’est ce délai qui pose problème le jour d’une demande.',
    'Nous vérifions surtout lorsqu’une demande arrive':
      'Vérifier à la demande fonctionne tant que la demande arrive avec du délai. ' +
      'Le point à clarifier est ce qui se passe quand elle arrive sans délai.',
    'Le suivi n’est pas encore systématique':
      'C’est le cas de la majorité des entreprises qui sous-traitent. Le point à ' +
      'clarifier n’est pas le retard, c’est par quel partenaire commencer.',
    'Je ne sais pas précisément':
      'Ne pas savoir où en est le suivi est déjà une information utile : c’est le ' +
      'premier point que l’analyse permet de fixer.',
  }

  return {
    titre: 'Ce que vous détenez sur vos partenaires',
    detail:
      (suivi && DETAIL[suivi]) ||
      'Faire appel à des partenaires ne transfère pas la responsabilité : licence, ' +
        'attestations sociales et assurances doivent être à jour et récupérables. ' +
        'Le point à clarifier est la fréquence à laquelle vous les actualisez.',
    origine: suivi
      ? 'D’après la façon dont vous suivez vos partenaires'
      : 'Parce qu’une partie de vos flux passe par des partenaires',
  }
}

/**
 * Point d'attention. L'ordre des tests est l'ordre de spécificité : une
 * marchandise réglementée passe avant une zone.
 */
function pointAttention(a: Answers): PremiereLecture['attention'] {
  const marchandise = texte(a, 'type_marchandise')
  const zones = liste(a, 'zones_livraison')
  const role = texte(a, 'role_transport')
  const suivi = texte(a, 'suivi_sous_traitants')

  /*
   * La branche passe avant tout le reste dès qu'elle a été posée. Une question
   * complémentaire qui ne changerait pas la restitution serait du temps demandé
   * sans contrepartie — c'est précisément ce que le test de légitimité de
   * l'audit (§10) interdit. Un profil pharma ET sous-traitant recevrait sinon
   * le point pharma, et la branche n'aurait servi à rien.
   */
  if (suivi || recourtALaSousTraitance(role)) return pointSousTraitance(suivi)

  if (marchandise === 'Matières dangereuses (ADR)') {
    return {
      titre: 'Les habilitations liées à l’ADR',
      detail:
        'Le transport de matières dangereuses suppose des conducteurs formés, un ' +
        'conseiller à la sécurité désigné et des équipements suivis. Ces trois ' +
        'éléments ont des échéances distinctes, et c’est souvent là que le suivi se perd.',
      origine: 'Parce que vous transportez des matières dangereuses',
    }
  }

  if (marchandise === 'Produits de santé et pharmaceutiques') {
    return {
      titre: 'La traçabilité de la chaîne du froid',
      detail:
        'Le transport de produits de santé demande de pouvoir démontrer la maîtrise ' +
        'des températures : relevés, qualification des équipements, conduite à tenir ' +
        'en cas d’écart. La question n’est pas de les maîtriser, mais de pouvoir le prouver.',
      origine: 'Parce que vous transportez des produits de santé',
    }
  }

  if (marchandise === 'Produits sous température dirigée' || marchandise === 'Produits alimentaires') {
    return {
      titre: 'Ce que vous pouvez démontrer sur la chaîne du froid',
      detail:
        'Relevés de température, entretien des groupes froid, réaction en cas d’écart : ' +
        'ces éléments sont demandés lors d’un audit client comme lors d’un contrôle. ' +
        'Le point à clarifier est où ils sont conservés, et pendant combien de temps.',
      origine: 'Parce que vous transportez sous température dirigée',
    }
  }


  if (zones.includes('International')) {
    return {
      titre: 'Ce que l’international ajoute à votre dossier',
      detail:
        'Sortir du territoire ajoute des pièces propres au détachement et à ' +
        'l’autorisation de circuler. Elles s’ajoutent au dossier national, elles ne le ' +
        'remplacent pas — c’est le point que ClearGo vérifie en premier sur ces profils.',
      origine: 'Parce que vous livrez à l’international',
    }
  }

  return NEUTRE
}

export function construireLecture(a: Answers): PremiereLecture {
  const marchandise = texte(a, 'type_marchandise')
  const zones = liste(a, 'zones_livraison')
  const role = texte(a, 'role_transport')
  const flotte = texte(a, 'taille_flotte')
  const besoin = texte(a, 'besoin_principal')

  const activite = (marchandise && ACTIVITE[marchandise]) || 'votre activité de transport'
  const modele = (role && MODELE[role]) || ''
  // « Je préfère ne pas répondre » n'est pas dans PARC : un refus de répondre
  // ne doit rien produire dans le miroir.
  const parc = (flotte && PARC[flotte]) || null

  const fragments = [
    `Vous exercez ${activite}`,
    parc,
    modele || null,
    zones.length > 0 ? `sur un périmètre ${joindre(zones)}` : null,
  ].filter(Boolean)

  const attention = pointAttention(a)

  return {
    miroir: `${fragments.join(', ')}.`,
    priorite: (besoin && PRIORITE[besoin]) || 'faire le point sur votre situation',
    attention,
    neutre: attention === NEUTRE,
  }
}
