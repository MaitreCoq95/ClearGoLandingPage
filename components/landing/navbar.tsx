'use client'

import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '/comment-ca-marche', label: 'Comment ça marche' },
  { href: '#referentiels', label: 'Référentiels' },
  { href: '#equipe', label: 'À propos' },
  { href: '#inscription', label: 'Contact' },
]

interface NavbarProps {
  onCta: () => void
}

export function Navbar({ onCta }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(244,246,250,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
        <a
          href="#hero"
          className="h-11 w-[170px] shrink-0 overflow-hidden rounded-lg lg:h-12 lg:w-[200px]"
          aria-label="ClearGo — accueil"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
            aria-hidden="true"
          >
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VideoHeroLogo-7qJLxNGkkaQHeFQ9dV18GPXuLdieET.mp4"
              type="video/mp4"
            />
          </video>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-md px-3.5 py-2 text-[13.5px] font-medium transition-colors"
                style={{ color: 'var(--t3)' }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={onCta}
              data-cta
              className="btn-press ml-2 rounded-lg px-5 py-2.5 text-[13.5px] font-bold text-white"
              style={{ background: 'var(--green)' }}
            >
              Évaluer mon profil →
            </button>
          </li>
        </ul>

        {/* Burger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 p-2 lg:hidden"
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileOpen}
        >
          <span
            className={`block h-0.5 w-6 transition-all ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`}
            style={{ background: 'var(--cleargo-navy)' }}
          />
          <span
            className={`block h-0.5 w-6 transition-all ${mobileOpen ? 'opacity-0' : ''}`}
            style={{ background: 'var(--cleargo-navy)' }}
          />
          <span
            className={`block h-0.5 w-6 transition-all ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`}
            style={{ background: 'var(--cleargo-navy)' }}
          />
        </button>
      </div>

      {mobileOpen && (
        <div className="border-b bg-white px-6 pb-6 lg:hidden" style={{ borderColor: 'var(--line)' }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block border-b py-3 text-[14.5px] font-medium"
              style={{ color: 'var(--t3)', borderColor: 'var(--line-l)' }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false)
              onCta()
            }}
            data-cta
            className="mt-4 block w-full rounded-lg py-3.5 text-center text-[14.5px] font-bold text-white"
            style={{ background: 'var(--green)' }}
          >
            Évaluer mon profil →
          </button>
        </div>
      )}
    </nav>
  )
}
