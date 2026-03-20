"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

type Consent = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const DEFAULT_CONSENT: Consent = {
  necessary: true,
  analytics: false,
  marketing: false,
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [consent, setConsent] = useState<Consent>(DEFAULT_CONSENT)

  useEffect(() => {
    const stored = localStorage.getItem("cleargo-cookie-consent")
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  function save(c: Consent) {
    localStorage.setItem("cleargo-cookie-consent", JSON.stringify(c))
    setVisible(false)
  }

  function acceptAll() {
    save({ necessary: true, analytics: true, marketing: true })
  }

  function refuseAll() {
    save({ necessary: true, analytics: false, marketing: false })
  }

  function saveCustom() {
    save(consent)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] p-4 lg:p-6" role="dialog" aria-label="Gestion des cookies">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-[var(--background)] p-6 shadow-2xl shadow-black/10 lg:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--green)]/10">
            <svg className="h-5 w-5 text-[var(--green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-sans text-base font-bold text-[var(--foreground)]">
              Gestion des cookies
            </h3>
            <p className="mt-1 font-serif text-sm leading-relaxed text-[var(--text-secondary)]">
              ClearGo utilise des cookies pour assurer le fonctionnement du site, ameliorer votre experience et mesurer l{"'"}audience.
              Vous pouvez accepter, refuser ou personnaliser vos choix.
              Consultez notre{" "}
              <Link href="/politique-cookies" className="font-semibold text-[var(--navy)] underline underline-offset-2 hover:text-[var(--green)]">
                politique cookies
              </Link>{" "}
              et notre{" "}
              <Link href="/politique-confidentialite" className="font-semibold text-[var(--navy)] underline underline-offset-2 hover:text-[var(--green)]">
                politique de confidentialite RGPD
              </Link>.
            </p>
          </div>
        </div>

        {showDetails && (
          <div className="mt-5 rounded-xl border border-border bg-[var(--off-white)] p-5">
            <div className="flex flex-col gap-4">
              <CookieToggle
                label="Cookies strictement necessaires"
                description="Indispensables au fonctionnement du site (session, securite, preferences cookies). Ne peuvent pas etre desactives."
                checked={true}
                disabled
              />
              <CookieToggle
                label="Cookies analytiques"
                description="Mesurent l'audience et le comportement de navigation pour ameliorer ClearGo (Vercel Analytics). Donnees anonymisees."
                checked={consent.analytics}
                onChange={(v) => setConsent({ ...consent, analytics: v })}
              />
              <CookieToggle
                label="Cookies marketing"
                description="Permettent de personnaliser les publicites et de mesurer leur efficacite. Actuellement non utilises par ClearGo."
                checked={consent.marketing}
                onChange={(v) => setConsent({ ...consent, marketing: v })}
              />
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="font-sans text-xs font-semibold text-[var(--text-secondary)] underline underline-offset-2 hover:text-[var(--navy)]"
          >
            {showDetails ? "Masquer les details" : "Personnaliser mes choix"}
          </button>

          <div className="flex gap-3">
            <button
              onClick={refuseAll}
              className="rounded-lg border border-border bg-[var(--background)] px-5 py-2.5 font-sans text-sm font-bold text-[var(--text-secondary)] transition-all hover:bg-[var(--off-white)]"
            >
              Tout refuser
            </button>
            {showDetails ? (
              <button
                onClick={saveCustom}
                className="rounded-lg bg-[var(--navy)] px-5 py-2.5 font-sans text-sm font-bold text-[var(--primary-foreground)] transition-all hover:bg-[var(--navy-light)]"
              >
                Enregistrer mes choix
              </button>
            ) : (
              <button
                onClick={acceptAll}
                className="rounded-lg bg-[var(--green)] px-5 py-2.5 font-sans text-sm font-bold text-[var(--accent-foreground)] transition-all hover:bg-[var(--green-hover)]"
              >
                Tout accepter
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function CookieToggle({
  label,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange?: (v: boolean) => void
}) {
  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`mt-0.5 flex h-6 w-11 flex-shrink-0 items-center rounded-full p-0.5 transition-colors ${
          checked ? "bg-[var(--green)]" : "bg-[var(--border)]"
        } ${disabled ? "opacity-60" : "cursor-pointer"}`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-[var(--background)] shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
      <div>
        <div className="font-sans text-sm font-bold text-[var(--foreground)]">
          {label}
          {disabled && (
            <span className="ml-2 rounded bg-[var(--navy)]/10 px-1.5 py-0.5 text-[10px] font-bold text-[var(--navy)]">
              Obligatoire
            </span>
          )}
        </div>
        <div className="mt-0.5 font-serif text-[12px] leading-relaxed text-[var(--text-secondary)]">
          {description}
        </div>
      </div>
    </div>
  )
}
