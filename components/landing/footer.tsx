'use client'

import Link from 'next/link'
import { CONTACT_EMAIL, ESPACE_CLEARGO_URL } from '@/config/site-links'
import { Reglo } from '@/components/landing/reglo'

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
            {/*
              Même repli que dans la navbar. La plaque blanche est indispensable
              ici : le logotype est bleu marine et vert, invisible sur le navy.
              La vidéo étant opaque et en object-cover, elle la recouvre
              entièrement tant qu'elle se charge — la plaque ne se voit que si
              le blob tombe.
            */}
            <div className="relative h-11 w-[180px] overflow-hidden rounded-lg bg-white">
              <img
                src="/images/cleargo-logo.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-contain p-1"
              />
              <video autoPlay loop muted playsInline className="relative h-full w-full object-cover" aria-hidden="true">
                <source
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VideoHeroLogo-ric3FQikb28mJ4nhqJHFkPpijnJAaG.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <div className="mt-4 flex items-center gap-2.5">
              <Reglo pose="gilet-pointe" height={48} className="shrink-0" />
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
          {/*
            Le logotype LittleFlock est bleu et gris anthracite : sur le navy du
            pied de page il disparaîtrait. Il est donc posé sur une plaque
            claire — traitement habituel d'un logo d'éditeur sur fond sombre.
          */}
          {/* TODO: lier vers le site LittleFlock quand son URL sera arrêtée. */}
          <div className="flex items-center gap-3.5">
            <span className="rounded-md bg-white px-2.5 py-1.5">
              <img
                src="/images/littleflock-logo.png"
                alt="LittleFlock"
                width={112}
                height={33}
                className="h-[22px] w-auto"
              />
            </span>
            <p className="text-[12px] text-white/30">Éditeur du site · © 2026 LittleFlock SAS</p>
          </div>
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
