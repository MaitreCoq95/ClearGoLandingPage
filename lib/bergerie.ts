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
 *    déjà normalisée, dans un en-tête dédié que Django est libre de croire ou non.
 *
 * La clé partagée, si elle est définie, permet à Django de distinguer un appel
 * de la landing d'un scrapeur qui taperait l'endpoint public en direct.
 */

export function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0]!.trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

export function bergerieHeaders(req: Request, extra?: HeadersInit): Headers {
  const headers = new Headers(extra)
  headers.set('Accept', 'application/json')
  headers.set('X-ClearGo-Client-IP', clientIp(req))

  const key = process.env.BERGERIE_API_KEY
  if (key) headers.set('X-ClearGo-Key', key)

  return headers
}
