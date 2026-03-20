import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

const RECIPIENT = "contact@cleargo.fr"

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
}

const VALID_SOURCES = ["hero", "contact", "simulator", "funnel"] as const

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 })
    }

    const { source, ...fields } = body as Record<string, unknown>

    const safeSource = VALID_SOURCES.includes(source as typeof VALID_SOURCES[number])
      ? (source as string)
      : "landing"

    const rows = Object.entries(fields)
      .filter(([, v]) => v !== undefined && v !== "")
      .map(([key, value]) => {
        const safeKey = escapeHtml(String(key).replace(/_/g, " "))
        const safeValue = escapeHtml(String(value))
        return `<tr>
          <td style="padding:8px 12px;font-weight:600;color:#0D2B4E;border-bottom:1px solid #eee;text-transform:capitalize;white-space:nowrap">${safeKey}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee">${safeValue}</td>
        </tr>`
      })
      .join("")

    const sourceLabel =
      safeSource === "hero"
        ? "Formulaire Hero (Diagnostic gratuit)"
        : safeSource === "contact"
          ? "Formulaire Contact (Beta SITL)"
          : safeSource === "simulator"
            ? "Simulateur Score (Rapport)"
            : safeSource === "funnel"
              ? "Funnel Pré-qualification 12 questions"
              : "Landing Page"

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#0D2B4E;padding:24px 32px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;font-size:20px;margin:0">Nouvelle inscription ClearGo</h1>
          <p style="color:#00A896;font-size:14px;margin:6px 0 0">Source : ${escapeHtml(sourceLabel)}</p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:24px 0">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            ${rows}
          </table>
        </div>
        <p style="color:#999;font-size:11px;margin-top:16px;text-align:center">
          Email automatique envoy&eacute; depuis cleargo.fr &mdash; ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}
        </p>
      </div>
    `

    const emailField = typeof fields.email === "string" ? fields.email : ""
    const prenomField = typeof fields.prenom === "string" ? fields.prenom : ""
    const subject = `[ClearGo Lead] ${sourceLabel} — ${escapeHtml(emailField || prenomField || "Nouveau prospect")}`

    const { error } = await resend.emails.send({
      from: "ClearGo <onboarding@resend.dev>",
      to: RECIPIENT,
      subject,
      html,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("API /api/lead error:", err)
    return NextResponse.json({ ok: false, error: "Erreur interne" }, { status: 500 })
  }
}
