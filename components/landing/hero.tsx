'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ClearGoIcon } from '@/components/icons/cleargo-icon'
import { useReveal } from '@/hooks/use-reveal'

/**
 * Anneau ClearGo Score.
 * Anneau extérieur = RÉGLO, anneau intérieur = EXCELLENCE.
 * Le palier suit la grille officielle (Insuffisant / En construction /
 * Maîtrisé / Excellence) — jamais de métaux, jamais de mention « certifié ».
 */
function ScoreRing({ animated }: { animated: boolean }) {
  const rOuter = 88
  const rInner = 64
  const circOuter = 2 * Math.PI * rOuter
  const circInner = 2 * Math.PI * rInner

  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!animated) return
    const t = setTimeout(() => setStarted(true), 200)
    return () => clearTimeout(t)
  }, [animated])

  const outerOffset = circOuter * (1 - (started ? 418 / 500 : 0))
  const innerOffset = circInner * (1 - (started ? 402 / 500 : 0))

  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      role="img"
      aria-label="ClearGo Score : 820 sur 1000, niveau maîtrisé"
    >
      <circle cx="100" cy="100" r={rOuter} fill="none" stroke="#E2E8F0" strokeWidth="12" />
      <circle cx="100" cy="100" r={rInner} fill="none" stroke="#E2E8F0" strokeWidth="10" />

      <circle
        cx="100" cy="100" r={rOuter}
        fill="none" stroke="#0D2B5E" strokeWidth="12" strokeLinecap="round"
        strokeDasharray={circOuter} strokeDashoffset={outerOffset}
        transform="rotate(-90 100 100)"
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)' }}
      />
      <circle
        cx="100" cy="100" r={rInner}
        fill="none" stroke="#27AE60" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={circInner} strokeDashoffset={innerOffset}
        transform="rotate(-90 100 100)"
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1) 0.15s' }}
      />

      <text
        x="50%" y="48%" textAnchor="middle" dominantBaseline="middle"
        fill="#0D2B5E" fontFamily="var(--font-jetbrains), monospace"
        fontSize="46" fontWeight="700" letterSpacing="-2"
      >
        820
      </text>
      <text
        x="50%" y="62%" textAnchor="middle" dominantBaseline="middle"
        fill="#64748B" fontFamily="var(--font-jetbrains), monospace"
        fontSize="12" fontWeight="500" letterSpacing="1.5"
      >
        / 1000
      </text>
    </svg>
  )
}

interface HeroProps {
  onCta: () => void
}

export function Hero({ onCta }: HeroProps) {
  const [loaded, setLoaded] = useState(false)
  const { ref: cardRef, visible: cardVisible } = useReveal<HTMLDivElement>(0.25)

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
                  background: 'var(--green)',
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

          {/* Colonne droite : photo sur mobile, carte de score flottante sur desktop */}
          <div className="lg:flex lg:justify-end">

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

            {/* Carte de score — posée sur la photo en desktop */}
            <div
              ref={cardRef}
              className="mx-auto mt-8 w-full max-w-[330px] lg:mx-0 lg:mt-0"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity .9s var(--ease-apple) .35s, transform .9s var(--ease-apple) .35s',
              }}
            >
              <div
                className="rounded-2xl bg-white p-6"
                style={{ boxShadow: '0 24px 60px -20px rgba(13,43,94,0.28), 0 0 0 1px rgba(13,43,94,0.05)' }}
              >
                <div className="flex items-center gap-5">
                  <div className="shrink-0" style={{ width: 112, height: 112 }}>
                    <ScoreRing animated={cardVisible} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: 'var(--t4)' }}
                    >
                      ClearGo Score
                    </p>
                    <p
                      className="mt-1.5 inline-block rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.1em] text-white"
                      style={{ background: 'var(--green)' }}
                    >
                      Maîtrisé
                    </p>

                    <div className="mt-3 flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: 'var(--cleargo-navy)' }} />
                        <span className="text-[11.5px]" style={{ color: 'var(--t4)' }}>Réglo</span>
                        <span className="num ml-auto text-[13px] font-bold" style={{ color: 'var(--cleargo-navy)' }}>
                          418
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: 'var(--green)' }} />
                        <span className="text-[11.5px]" style={{ color: 'var(--t4)' }}>Excellence</span>
                        <span className="num ml-auto text-[13px] font-bold" style={{ color: 'var(--green-text)' }}>
                          402
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Réglo — dans la carte : posé sur la photo, le texte gris était illisible */}
                <div
                  className="mt-5 flex items-center gap-3 border-t pt-4"
                  style={{ borderColor: 'var(--line-l)' }}
                >
                  <ClearGoIcon name="reglo" size={30} className="shrink-0" />
                  <p className="text-[11.5px] leading-snug" style={{ color: 'var(--t4)' }}>
                    Exemple de restitution. Votre score dépend du périmètre applicable à votre
                    activité.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
