'use client'

import Link from 'next/link'
import { ClearGoIcon } from '@/components/icons/cleargo-icon'
import { CONTACT_EMAIL, ESPACE_CLEARGO_URL } from '@/config/site-links'

const NAV = [
  { href: '/comment-ca-marche', label: 'Comment ça marche' },
  { href: '/#referentiels', label: 'Référentiels' },
  { href: '/#inscription', label: 'Contact' },
]

const LEGAL = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/politique-confidentialite', label: 'Politique de confidentialité' },
  { href: '/politique-cookies', label: 'Cookies' },
]

export function Footer() {
  return (
    <footer style={{ background: 'var(--cleargo-navy)' }}>
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">

          {/* Marque */}
          <div>
            <div className="h-11 w-[180px] overflow-hidden rounded-lg">
              <video autoPlay loop muted playsInline className="h-full w-full object-cover" aria-hidden="true">
                <source
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VideoHeroLogo-ric3FQikb28mJ4nhqJHFkPpijnJAaG.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <div className="mt-4 flex items-center gap-2.5">
              <ClearGoIcon name="reglo" size={28} className="shrink-0" />
              <p className="text-[12.5px] text-white/45">
                L’évaluation de conformité des transporteurs routiers.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Pied de page">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/35">
              Navigation
            </p>
            <ul className="flex flex-col gap-2.5">
              {NAV.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[14px] text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                {ESPACE_CLEARGO_URL ? (
                  <a
                    href={ESPACE_CLEARGO_URL}
                    className="text-[14px] text-white/60 transition-colors hover:text-white"
                  >
                    Se connecter
                  </a>
                ) : (
                  // TODO: brancher sur l'espace ClearGo une fois l'application en ligne.
                  <span className="text-[14px] text-white/25">Se connecter — bientôt</span>
                )}
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/35">
              Contact
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[14px] text-white/60 transition-colors hover:text-white"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="mt-10 h-px" style={{ background: 'rgba(255,255,255,0.09)' }} />

        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-[12px] text-white/30">© 2026 LittleFlock SAS</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {LEGAL.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] text-white/30 underline underline-offset-2 transition-colors hover:text-white/60"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                localStorage.removeItem('cleargo-cookie-consent')
                window.location.reload()
              }}
              className="text-[12px] text-white/30 underline underline-offset-2 transition-colors hover:text-white/60"
            >
              Gestion des cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
