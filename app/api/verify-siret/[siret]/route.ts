import { NextResponse } from 'next/server'

/**
 * Vérification d'un SIRET au registre national des transporteurs (GRECO).
 *
 * Proxy vers La Bergerie. Ne renvoie QUE des données publiques du registre.
 *
 * Règle de sécurité : la réponse est reconstruite champ par champ depuis une
 * liste blanche. Même si l'API amont renvoyait un jour des données internes
 * (score estimé, exposition, stage CRM, CSM assigné, interactions), elles ne
 * peuvent pas traverser ce proxy.
 */

const BERGERIE_API_URL = process.env.BERGERIE_API_URL

/** Champs publics du registre — rien d'autre ne sort d'ici. */
const PUBLIC_FIELDS = [
  'raison_sociale',
  'gestionnaire_transport',
  'commune',
  'departement',
  'licence_active',
  'fin_validite_lti',
  'fin_validite_lc',
  'jours_avant_expiration',
  'proxy_flotte',
] as const

// ── Rate limiting ───────────────────────────────────────────────────────────
// En mémoire, donc par instance serverless : c'est un garde-fou contre le
// scraping trivial, pas une protection forte. Le vrai throttle est côté Django.
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 10
const hits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)

  // Purge opportuniste pour éviter que la map ne grossisse indéfiniment.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key)
    }
  }

  return recent.length > MAX_PER_WINDOW
}

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0]!.trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ siret: string }> },
) {
  const { siret: rawSiret } = await params
  const siret = rawSiret.replace(/\D/g, '')

  if (siret.length !== 14) {
    return NextResponse.json({ found: false, reason: 'format' }, { status: 400 })
  }

  if (isRateLimited(clientIp(req))) {
    return NextResponse.json({ found: false, reason: 'rate_limited' }, { status: 429 })
  }

  // Tant que le backend n'est pas branché, on ne bloque personne : le funnel
  // laisse continuer avec siret_non_verifie = true.
  if (!BERGERIE_API_URL) {
    return NextResponse.json({ found: false, reason: 'registry_unavailable' })
  }

  try {
    const upstream = await fetch(
      `${BERGERIE_API_URL.replace(/\/$/, '')}/api/bergerie/landing/verify-siret/${siret}/`,
      {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(6000),
        cache: 'no-store',
      },
    )

    if (upstream.status === 404) {
      return NextResponse.json({ found: false, reason: 'not_in_registry' })
    }
    if (!upstream.ok) {
      return NextResponse.json({ found: false, reason: 'registry_unavailable' })
    }

    const data = (await upstream.json()) as Record<string, unknown>

    if (!data?.found) {
      return NextResponse.json({
        found: false,
        reason: typeof data?.reason === 'string' ? data.reason : 'not_in_registry',
      })
    }

    // Reconstruction depuis la liste blanche uniquement.
    const safe: Record<string, unknown> = { found: true }
    for (const field of PUBLIC_FIELDS) {
      if (field in data) safe[field] = data[field]
    }

    return NextResponse.json(safe)
  } catch {
    return NextResponse.json({ found: false, reason: 'registry_unavailable' })
  }
}
