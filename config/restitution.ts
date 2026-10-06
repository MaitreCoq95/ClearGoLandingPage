/**
 * Restitution en trois blocs (décision B5) : choisir et assembler.
 *
 * Portage fidèle de `cleargo_frontend/src/utils/restitution.js` (SaaS). Ce
 * module ne rédige rien : tous les textes viennent de `restitution-textes.ts`,
 * copie générée des 18 textes validés par Vivien le 25/09/2026.
 *
 * Tout est calculé dans le navigateur, depuis les seules réponses : la session
 * reste anonyme jusqu'à l'account gate (décision B3). Aucun score, aucun
 * chiffre (arbitrage du 12/09).
 *
 * Écart assumé avec le SaaS : ni « types de véhicules » ni « forme du flux »
 * ne sont demandés ici, leurs segments sont donc omis — c'est la règle validée
 * du gabarit (« réponse manquante → segment omis »).
 */

import {
  ROLES_SOUS_TRAITANCE,
  ZONES_INTERNATIONALES,
  liste,
  texte,
  type Answers,
} from './funnel-questions'
import {
  BLOC1_GABARIT,
  BLOC1_MARCHANDISES,
  BLOC1_MODES,
  BLOC1_TRANCHES,
  BLOC1_ZONES,
  BLOC3,
  BRIQUES,
  OUVERTURES,
} from './restitution-textes'

// Miroir de SENSIBLES_MARCHANDISES (crm/funnel_engine.py). Vrac et Véhicules
// ne sont pas des périmètres sensibles (règles validées le 25/09).
const MARCHANDISES_SENSIBLES = ['alimentaire', 'pharma', 'adr', 'dechets']
// Besoins ajoutés après le test du 27/09 : même ouverture qu'un besoin validé.
const BESOINS_EQUIVALENTS: Record<string, string> = { envoye_par_donneur_ordre: 'donneur_ordre' }
const FLOTTE_AUCUNE = 'aucun'
const SEUIL_CUMUL_SENSIBLES = 3

// Palier 2 : la marchandise la plus spécifique gagne, dans cet ordre.
const BRIQUES_PAR_MARCHANDISE: [string, string][] = [
  ['pharma', 'R3'],
  ['adr', 'R4'],
  ['dechets', 'R5'],
  ['vrac', 'R7'],
  ['valeur', 'R6'],
  ['vehicules', 'VEHICULES'],
]

export interface Restitution {
  bloc1: string
  bloc2: { ouverture: string; code: string; paragraphes: string[] }
  bloc3: string
}

// `Object.hasOwn` : une clé héritée (`constructor`…) ne doit jamais répondre.
function lire(dictionnaire: Record<string, string>, cle: string | undefined): string {
  return typeof cle === 'string' && Object.hasOwn(dictionnaire, cle) ? dictionnaire[cle]! : ''
}

/** « a », « a et b », « a, b et c » ; chaîne vide pour une liste vide. */
function joindre(elements: string[]): string {
  if (elements.length <= 1) return elements.join('')
  return `${elements.slice(0, -1).join(', ')} ${BLOC1_GABARIT.et} ${elements[elements.length - 1]}`
}

/** Libellés connus, dans l'ordre des réponses, sans doublon. */
function libelles(dictionnaire: Record<string, string>, valeurs: string[]): string[] {
  return [...new Set(valeurs)].map((v) => lire(dictionnaire, v)).filter(Boolean)
}

function phraseActivite(a: Answers): string {
  const segments = [
    joindre(libelles(BLOC1_MARCHANDISES, liste(a, 'marchandises'))),
    joindre(libelles(BLOC1_ZONES, liste(a, 'zones'))),
    lire(BLOC1_MODES, texte(a, 'role')),
  ].filter(Boolean)
  if (segments.length === 0) return ''
  return `${BLOC1_GABARIT.debutActivite} ${segments.join(', ')}.`
}

function phraseFlotte(a: Answers): string {
  const flotte = texte(a, 'flotte')
  if (flotte === FLOTTE_AUCUNE) return BLOC1_GABARIT.sansFlotte
  const tranche = lire(BLOC1_TRANCHES, flotte)
  if (!tranche) return ''
  return `${BLOC1_GABARIT.debutFlotte} ${tranche} ${BLOC1_GABARIT.vehicules}.`
}

function estInternational(a: Answers): boolean {
  return liste(a, 'zones').some((z) => ZONES_INTERNATIONALES.includes(z))
}

function sousTraite(a: Answers): boolean {
  return ROLES_SOUS_TRAITANCE.includes(texte(a, 'role') ?? '')
}

function briqueDeCumul(a: Answers, marchandises: string[]): string | null {
  if (sousTraite(a) && estInternational(a)) return 'C2'
  const sensibles = new Set(marchandises.filter((m) => MARCHANDISES_SENSIBLES.includes(m)))
  return sensibles.size >= SEUIL_CUMUL_SENSIBLES ? 'C3' : null
}

function briqueDeMarchandise(marchandises: string[]): string | null {
  const presentes = new Set(marchandises)
  const trouvee = BRIQUES_PAR_MARCHANDISE.find(([m]) => presentes.has(m))
  return trouvee ? trouvee[1] : null
}

function briqueDeContexte(a: Answers, marchandises: string[]): string | null {
  if (marchandises.includes('alimentaire')) return 'R2'
  if (sousTraite(a)) return 'R8'
  if (estInternational(a)) return 'R9'
  return null
}

/**
 * Brique du bloc 2 : la plus spécifique gagne. Paliers validés le 25/09 :
 * (1) C2 puis C3, (2) marchandise spécifique, (3) alimentaire,
 * sous-traitance, international, (4) repli R1.
 */
export function choisirBrique(a: Answers): string {
  const marchandises = liste(a, 'marchandises')
  return (
    briqueDeCumul(a, marchandises) ||
    briqueDeMarchandise(marchandises) ||
    briqueDeContexte(a, marchandises) ||
    'R1'
  )
}

export function construireRestitution(a: Answers): Restitution {
  const code = choisirBrique(a)
  const besoinBrut = texte(a, 'besoin')
  const besoin = lire(BESOINS_EQUIVALENTS, besoinBrut) || besoinBrut
  return {
    bloc1: [phraseActivite(a), phraseFlotte(a)].filter(Boolean).join(' '),
    bloc2: {
      ouverture: lire(OUVERTURES, besoin) || OUVERTURES.savoir_ou_jen_suis!,
      code,
      paragraphes: BRIQUES[code]!,
    },
    // Le nombre de périmètres n'est connu qu'après l'appel au serveur, que la
    // session anonyme ne fait pas : repli validé « Plusieurs périmètres… ».
    bloc3: `${BLOC3.sansNombre} ${BLOC3.suite}`,
  }
}
