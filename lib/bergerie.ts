/**
 * En-têtes envoyés à La Bergerie par les routes proxy.
 *
 * Deux raisons d'exister :
 *
 * 1. Les appels sont serveur à serveur. Sans transmission de l'IP appelante,
 *    Django ne voit que les IP de sortie de Vercel — son throttle « 10/min par
 *    IP » devient alors « 10/min pour tous les visiteurs réunis ».
 *
 * 2. L'IP est reprise de `x-forwarded-for`, posé par l'edge Vercel. On ne relaie
 *    jamais l'en-tête brut du client : il est falsifiable. On envoie une valeur
 *    déjà normalisée, dans un en-tête dédié.
 *
 * La clé partagée n'est PAS un confort. Django est joignable publiquement : il
 * ne peut croire l'IP transmise que si l'appel prouve venir de la landing.
 * Sans clé, il retombe sur l'IP du proxy et le throttle reste étranglé — ou
 * pire, s'il faisait confiance sans vérifier, n'importe qui poserait une IP au
 * hasard à chaque requête pour n'être jamais limité.
 */

/** Valeur de repli quand aucune IP n'est déterminable. L'amont doit l'écarter. */
export const IP_INCONNUE = 'unknown'

export function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0]!.trim()
  return req.headers.get('x-real-ip') ?? IP_INCONNUE
}

let cleAbsenteSignalee = false

export function bergerieHeaders(req: Request, extra?: HeadersInit): Headers {
  const headers = new Headers(extra)
  headers.set('Accept', 'application/json')
  headers.set('X-ClearGo-Client-IP', clientIp(req))

  const key = process.env.BERGERIE_API_KEY
  if (key) {
    headers.set('X-ClearGo-Key', key)
  } else if (!cleAbsenteSignalee) {
    // Une seule fois par instance : cette configuration marche en apparence,
    // ce qui la rend d'autant plus facile à laisser traîner en production.
    cleAbsenteSignalee = true
    console.warn(
      'BERGERIE_API_KEY absente : La Bergerie ne pourra pas authentifier les ' +
        "appels de la landing et ignorera l'IP transmise. Le throttle retombera " +
        "sur l'IP de sortie Vercel, donc partagé entre tous les visiteurs.",
    )
  }

  return headers
}
