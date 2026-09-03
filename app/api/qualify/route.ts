import { NextResponse } from 'next/server'
import { Resend } from 'resend'

/**
 * Qualification d'un prospect depuis la landing.
 *
 * Chemin nominal : POST vers La Bergerie, qui rapproche le SIRET du registre
 * GRECO, enrichit le prospect existant et notifie l'équipe commerciale.
 *
 * Filet de sécurité : si La Bergerie n'est pas configurée ou ne répond pas,
 * le lead part par email plutôt que d'être perdu.
 */

const BERGERIE_API_URL = process.env.BERGERIE_API_URL
const RECIPIENT = 'contact@cleargo.fr'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

async function notifyByEmail(payload: Record<string, unknown>, reason: string) {
  if (!process.env.RESEND_API_KEY) return

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
    to: RECIPIENT,
    subject: `[ClearGo] Qualification landing — ${escapeHtml(String(payload.raison_sociale || payload.email || 'nouveau prospect'))}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#0D2B5E;padding:24px 32px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;font-size:20px;margin:0">Qualification depuis la landing</h1>
          <p style="color:#2ECC71;font-size:13px;margin:6px 0 0">Envoi par email — ${escapeHtml(reason)}</p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:24px 0">
          <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
        </div>
      </div>
    `,
  })
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

  const siret = String(body.siret ?? '').replace(/\D/g, '')
  const zones = Array.isArray(body.q_zones_livraison) ? (body.q_zones_livraison as string[]) : []

  const payload = {
    siret: siret || null,
    siret_non_verifie: Boolean(body.siret_non_verifie),
    raison_sociale: body.raison_sociale ?? '',
    email: body.email ?? '',
    telephone: body.telephone ?? '',
    prenom: body.prenom ?? '',
    q_type_marchandise: body.q_type_marchandise ?? '',
    q_zones_livraison: zones,
    q_has_international: zones.includes('International'),
    q_nb_vehicules_declare: body.q_nb_vehicules_declare ?? null,
    q_role_transport: body.q_role_transport ?? '',
    q_besoin_principal: body.q_besoin_principal ?? '',
    q_urgence: body.q_urgence ?? '',
    source: 'landing',
  }

  if (BERGERIE_API_URL) {
    try {
      const upstream = await fetch(
        `${BERGERIE_API_URL.replace(/\/$/, '')}/api/bergerie/landing/qualify/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(8000),
        },
      )

      if (upstream.ok) {
        const data = (await upstream.json().catch(() => ({}))) as Record<string, unknown>
        return NextResponse.json({
          status: 'ok',
          urgence_licence:
            typeof data.urgence_licence === 'number' ? data.urgence_licence : null,
        })
      }
    } catch {
      // On bascule sur l'email plutôt que de perdre le lead.
    }
  }

  try {
    await notifyByEmail(payload, BERGERIE_API_URL ? 'La Bergerie injoignable' : 'La Bergerie non configurée')
  } catch (err) {
    console.error('Notification du lead impossible :', err)
    return NextResponse.json({ status: 'error', error: 'Erreur interne' }, { status: 500 })
  }

  return NextResponse.json({ status: 'ok', urgence_licence: null })
}
