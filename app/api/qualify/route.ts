import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { bergerieHeaders } from '@/lib/bergerie'

/**
 * Qualification d'un prospect depuis la landing.
 *
 * Chemin nominal : POST vers le CRM, qui rapproche le SIRET du registre GRECO,
 * enrichit le prospect existant et notifie l'équipe commerciale.
 *
 * Repli : si le CRM est injoignable, le lead part par email — mais JAMAIS en
 * silence. Un repli muet fait croire que le CRM reçoit les leads alors qu'il
 * n'en voit aucun, et c'est le pire scénario : on ne découvre le trou qu'en
 * comparant les compteurs, des semaines plus tard.
 *
 * Le silence est supprimé à trois endroits : log serveur explicite, champ de
 * diagnostic dans la réponse, et bandeau d'alerte en tête de l'email de repli.
 */

const BERGERIE_API_URL = process.env.BERGERIE_API_URL
const RECIPIENT = 'contact@cleargo.fr'

/**
 * Chemin exposé par le backend.
 *
 * TODO(session-saas): à confirmer sur la branche du CRM. La documentation
 * annonce /api/crm/landing/qualify/ tandis que l'implémentation initiale
 * exposait /api/bergerie/landing/qualify/. Tant que l'écart n'est pas levé,
 * la valeur est pilotée par variable d'environnement pour être corrigée sans
 * redéploiement de code.
 */
const QUALIFY_PATH =
  process.env.BERGERIE_QUALIFY_PATH || '/api/crm/landing/qualify/'

type Degradation =
  | 'crm_non_configure'
  | 'crm_statut_inattendu'
  | 'crm_injoignable'

const RAISON_LISIBLE: Record<Degradation, string> = {
  crm_non_configure: "BERGERIE_API_URL n'est pas renseignée",
  crm_statut_inattendu: 'le CRM a répondu un statut inattendu',
  crm_injoignable: 'le CRM est injoignable (timeout ou erreur réseau)',
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

/** Log serveur volontairement bruyant : c'est le premier signal d'alerte. */
function alerterDegradation(motif: Degradation, detail: string) {
  console.error(
    `[ClearGo][ALERTE] Lead NON transmis au CRM — ${RAISON_LISIBLE[motif]}. ` +
      `${detail} Le lead est parti par email ; il n'est PAS dans le CRM.`,
  )
}

async function notifyByEmail(
  payload: Record<string, unknown>,
  motif: Degradation,
  detail: string,
) {
  if (!process.env.RESEND_API_KEY) {
    console.error(
      "[ClearGo][ALERTE] RESEND_API_KEY absente : le repli email est lui aussi " +
        'hors service. Ce lead est PERDU.',
    )
    throw new Error('Aucun canal de collecte disponible')
  }

  const rows = Object.entries(payload)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([key, value]) => {
      const label = escapeHtml(key.replace(/^q_/, '').replace(/_/g, ' '))
      const val = escapeHtml(Array.isArray(value) ? value.join(', ') : String(value))
      return `<tr>
        <td style="padding:8px 12px;font-weight:600;color:#0D2B5E;border-bottom:1px solid #eee;text-transform:capitalize;white-space:nowrap">${label}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee">${val}</td>
      </tr>`
    })
    .join('')

  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: 'ClearGo <onboarding@resend.dev>',
    // Le sujet dit l'anomalie : un email qui ressemble à la normale se noie.
    subject: `[ACTION REQUISE] Lead hors CRM — ${escapeHtml(String(payload.email || 'prospect'))}`,
    to: RECIPIENT,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#C0392B;padding:18px 24px;border-radius:12px 12px 0 0">
          <p style="color:#fff;font-size:15px;font-weight:700;margin:0">
            Ce lead n'est PAS enregistré dans le CRM.
          </p>
          <p style="color:rgba(255,255,255,.9);font-size:13px;margin:8px 0 0">
            Raison : ${escapeHtml(RAISON_LISIBLE[motif])}. ${escapeHtml(detail)}
          </p>
          <p style="color:rgba(255,255,255,.9);font-size:13px;margin:8px 0 0">
            À saisir manuellement, et à corriger côté configuration.
          </p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:24px 0">
          <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
        </div>
      </div>
    `,
  })
}

/**
 * N'accepte qu'un chemin interne. Une URL absolue renvoyée par l'amont — ou un
 * `//evil.com` que le navigateur traite comme protocol-relative — ouvrirait une
 * redirection arbitraire depuis notre domaine.
 */
function safeRedirect(value: unknown): string | null {
  if (typeof value !== 'string') return null
  if (!value.startsWith('/')) return null
  if (value.startsWith('//') || value.startsWith('/\\')) return null
  return value
}

/** Périmètre d'analyse, reconstruit champ par champ et borné. */
function safePerimetre(value: unknown): { referentiels: string[]; nb_domaines: number } | null {
  if (typeof value !== 'object' || value === null) return null
  const p = value as Record<string, unknown>

  const referentiels = Array.isArray(p.referentiels)
    ? p.referentiels.filter((r): r is string => typeof r === 'string').slice(0, 12)
    : []
  const nbDomaines = typeof p.nb_domaines === 'number' ? p.nb_domaines : 0

  if (referentiels.length === 0 && nbDomaines === 0) return null
  return { referentiels, nb_domaines: nbDomaines }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ status: 'error', error: 'Requête invalide' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return NextResponse.json({ status: 'error', error: 'Requête invalide' }, { status: 400 })
  }

  const zones = Array.isArray(body.q_zones_livraison) ? (body.q_zones_livraison as string[]) : []

  /*
   * La session publique est anonyme (décision B3/B12) : les six questions ne
   * transportent aucune donnée d'identité. Cet appel n'a lieu qu'à l'account
   * gate, où le visiteur donne volontairement ses coordonnées — le SIRET y est
   * admis, s'il l'a saisi.
   *
   * Il reste facultatif et n'est jamais affiché publiquement : il contient le
   * SIREN, donnée personnelle sur une entreprise individuelle.
   */
  const siret = typeof body.siret === 'string' ? body.siret.replace(/\D/g, '') : ''

  const payload = {
    email: body.email ?? '',
    prenom: body.prenom ?? '',
    telephone: body.telephone ?? '',
    siret: siret.length === 14 ? siret : null,
    siret_non_verifie: siret.length === 14 ? body.siret_non_verifie === true : null,
    q_type_marchandise: body.q_type_marchandise ?? '',
    q_zones_livraison: zones,
    // Identifiants de zones du SaaS (ZONES_INTERNATIONALES) : le libellé
    // « International » n'existe plus.
    q_has_international:
      typeof body.q_has_international === 'boolean'
        ? body.q_has_international
        : zones.some((z) => ['frontalier', 'europe', 'hors_europe', 'international'].includes(z)),
    q_nb_vehicules_declare: body.q_nb_vehicules_declare ?? null,
    q_role_transport: body.q_role_transport ?? '',
    q_besoin_principal: body.q_besoin_principal ?? '',
    q_urgence: body.q_urgence ?? '',
    source: 'landing',
  }

  let motif: Degradation = 'crm_non_configure'
  let detail = ''

  if (BERGERIE_API_URL) {
    const url = `${BERGERIE_API_URL.replace(/\/$/, '')}${QUALIFY_PATH}`
    try {
      const upstream = await fetch(url, {
        method: 'POST',
        headers: bergerieHeaders(req, { 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      })

      if (upstream.ok) {
        const data = (await upstream.json().catch(() => ({}))) as Record<string, unknown>
        return NextResponse.json({
          status: 'ok',
          transport: 'crm',
          degraded: false,
          urgence_licence:
            typeof data.urgence_licence === 'number' ? data.urgence_licence : null,
          compte_cree: data.compte_cree === true,
          redirect_url: safeRedirect(data.redirect_url),
          perimetre: safePerimetre(data.perimetre),
        })
      }

      // Un 404 ici signifie très probablement que QUALIFY_PATH ne correspond
      // pas au chemin réellement exposé par le backend.
      motif = 'crm_statut_inattendu'
      detail =
        `HTTP ${upstream.status} sur ${url}.` +
        (upstream.status === 404
          ? ' Un 404 indique un chemin d’API erroné : vérifier BERGERIE_QUALIFY_PATH.'
          : '')
    } catch (err) {
      motif = 'crm_injoignable'
      detail = `Appel de ${url} : ${err instanceof Error ? err.message : 'erreur inconnue'}.`
    }
  } else {
    detail = 'Aucun appel tenté.'
  }

  alerterDegradation(motif, detail)

  try {
    await notifyByEmail(payload, motif, detail)
  } catch (err) {
    console.error('[ClearGo][ALERTE] Repli email en échec :', err)
    return NextResponse.json(
      { status: 'error', error: 'Erreur interne', transport: 'aucun', degraded: true, motif },
      { status: 500 },
    )
  }

  // Le visiteur voit un succès — sa demande est bien collectée. La dégradation
  // est signalée dans la réponse pour l'admin et la télémétrie, pas affichée.
  return NextResponse.json({
    status: 'ok',
    transport: 'email',
    degraded: true,
    motif,
    urgence_licence: null,
    compte_cree: false,
    redirect_url: null,
    perimetre: null,
  })
}
