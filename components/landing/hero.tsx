'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface HeroProps {
  onCta: () => void
}

export function Hero({ onCta }: HeroProps) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60)
    return () => clearTimeout(t)
  }, [])

  const enter = (delay: number) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity .7s var(--ease-apple) ${delay}s, transform .7s var(--ease-apple) ${delay}s`,
  })

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ background: 'var(--surface)' }}
    >
      {/* Texture de grille, estompée avant d'atteindre la photo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(#0D2B5E 1px, transparent 1px), linear-gradient(90deg, #0D2B5E 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'linear-gradient(90deg, #000 0%, #000 42%, transparent 68%)',
          WebkitMaskImage: 'linear-gradient(90deg, #000 0%, #000 42%, transparent 68%)',
        }}
      />

      {/* ── Photo plein bord, jusqu'au bord droit de l'écran ─────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[54%] lg:block"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.1s var(--ease-apple) .15s',
        }}
      >
        <Image
          src="/images/hero-transporteur.webp"
          alt=""
          fill
          priority
          sizes="54vw"
          className="object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        {/* Fondu vers le fond de section : aucune couture visible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, var(--surface) 0%, rgba(244,246,250,0.92) 12%, rgba(244,246,250,0.45) 32%, rgba(244,246,250,0) 60%)',
          }}
        />
      </div>

      {/* ── Contenu ──────────────────────────────────────────────────────── */}
      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-10 pt-28 pb-16 lg:grid-cols-2 lg:gap-8 lg:pt-32 lg:pb-24">

          {/* Colonne texte */}
          <div className="lg:pr-6">
            <div className="section-eyebrow mb-5" style={enter(0.04)}>
              Transporteurs routiers
            </div>

            <h1
              className="font-black tracking-tight"
              style={{
                fontSize: 'clamp(40px, 5.6vw, 74px)',
                lineHeight: 1.02,
                letterSpacing: '-2.5px',
                color: 'var(--cleargo-navy)',
                ...enter(0.08),
              }}
            >
              Être bon
              <br />
              ne suffit pas.
              <br />
              <span style={{ color: 'var(--green-text)' }}>Encore faut-il</span>
              <br />
              <span style={{ color: 'var(--green-text)' }}>pouvoir le prouver.</span>
            </h1>

            <p
              className="mt-7 max-w-[470px] text-[17px] leading-relaxed"
              style={{ color: 'var(--t3)', ...enter(0.16) }}
            >
              ClearGo vous aide à objectiver votre conformité, vos pratiques et vos
              savoir-faire — pour comprendre où vous en êtes, progresser, et mieux vous
              présenter aux donneurs d’ordres adaptés.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={enter(0.24)}>
              <button
                onClick={onCta}
                data-cta
                className="btn-press inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-bold text-white"
                style={{
                  background: 'var(--green-cta)',
                  boxShadow: '0 6px 22px -6px rgba(39,174,96,0.5)',
                }}
              >
                Évaluer mon profil ClearGo
                <span aria-hidden="true">→</span>
              </button>
              <a
                href="/comment-ca-marche"
                className="btn-press inline-flex items-center justify-center rounded-full border-2 bg-white px-7 py-4 text-[15px] font-semibold"
                style={{ borderColor: 'var(--cleargo-navy)', color: 'var(--cleargo-navy)' }}
              >
                Voir comment ça marche
              </a>
            </div>

            <p className="mt-5 text-[13px]" style={{ color: 'var(--t4)', ...enter(0.3) }}>
              Gratuit · Sans engagement · Réservé aux transporteurs routiers
            </p>
          </div>

          {/* Colonne droite : photo sur mobile. La carte de score d'exemple (820)
              est retirée : aucun score fictif sur la landing (décision B9, 22/09). */}
          <div className="lg:flex lg:justify-end lg:self-end lg:pb-4">

            {/* Sur mobile la photo passe en pleine largeur — en desktop elle est en fond */}
            <div className="-mx-6 lg:hidden">
              <div className="relative h-[280px] w-full sm:h-[360px]">
                <Image
                  src="/images/hero-transporteur.webp"
                  alt="Dirigeante d’une entreprise de transport routier devant sa flotte"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: 'center 28%' }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
