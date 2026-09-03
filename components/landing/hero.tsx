'use client'

import { useEffect, useState } from 'react'
import { ClearGoIcon } from '@/components/icons/cleargo-icon'
import { useReveal } from '@/hooks/use-reveal'

/**
 * Anneau ClearGo Score.
 * Anneau extérieur = RÉGLO, anneau intérieur = EXCELLENCE.
 * Le palier affiché suit la grille officielle (Insuffisant / En construction /
 * Maîtrisé / Excellence) — jamais de métaux, jamais de mention "certifié".
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

  const regloRatio = 418 / 500
  const excellenceRatio = 402 / 500
  const outerOffset = circOuter * (1 - (started ? regloRatio : 0))
  const innerOffset = circInner * (1 - (started ? excellenceRatio : 0))

  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label="ClearGo Score : 820 sur 1000, niveau maîtrisé">
      {/* Pistes */}
      <circle cx="100" cy="100" r={rOuter} fill="none" stroke="#E2E8F0" strokeWidth="11" />
      <circle cx="100" cy="100" r={rInner} fill="none" stroke="#E2E8F0" strokeWidth="9" />

      {/* RÉGLO — navy */}
      <circle
        cx="100" cy="100" r={rOuter}
        fill="none" stroke="#0D2B5E" strokeWidth="11" strokeLinecap="round"
        strokeDasharray={circOuter} strokeDashoffset={outerOffset}
        transform="rotate(-90 100 100)"
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)' }}
      />
      {/* EXCELLENCE — vert */}
      <circle
        cx="100" cy="100" r={rInner}
        fill="none" stroke="#27AE60" strokeWidth="9" strokeLinecap="round"
        strokeDasharray={circInner} strokeDashoffset={innerOffset}
        transform="rotate(-90 100 100)"
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1) 0.15s' }}
      />

      <text
        x="50%" y="45%" textAnchor="middle" dominantBaseline="middle"
        fill="#0D2B5E" fontFamily="var(--font-jetbrains), monospace"
        fontSize="42" fontWeight="700" letterSpacing="-2"
      >
        820
      </text>
      <text
        x="50%" y="57%" textAnchor="middle" dominantBaseline="middle"
        fill="#64748B" fontFamily="var(--font-jetbrains), monospace"
        fontSize="11" fontWeight="500" letterSpacing="1.5"
      >
        / 1000
      </text>

      {/* Palier de maturité */}
      <rect x="62" y="128" width="76" height="19" rx="9.5" fill="#27AE60" />
      <text
        x="100" y="137.5" textAnchor="middle" dominantBaseline="middle"
        fill="#FFFFFF" fontFamily="var(--font-inter), system-ui"
        fontSize="9" fontWeight="800" letterSpacing="1.4"
      >
        MAÎTRISÉ
      </text>
    </svg>
  )
}

interface HeroProps {
  onCta: () => void
}

export function Hero({ onCta }: HeroProps) {
  const [loaded, setLoaded] = useState(false)
  const { ref: ringRef, visible: ringVisible } = useReveal<HTMLDivElement>(0.3)

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
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
      style={{ background: 'var(--surface)' }}
    >
      {/* Texture de grille très discrète */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            'linear-gradient(#0D2B5E 1px, transparent 1px), linear-gradient(90deg, #0D2B5E 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-32 pb-20 lg:px-12 lg:pt-40 lg:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* ── Colonne gauche ─────────────────────────────────────────────── */}
          <div>
            <div className="section-eyebrow mb-5" style={enter(0.04)}>
              Transporteurs routiers
            </div>

            <h1
              className="font-black tracking-tight"
              style={{
                fontSize: 'clamp(36px, 5vw, 62px)',
                lineHeight: 1.06,
                letterSpacing: '-2px',
                color: 'var(--cleargo-navy)',
                ...enter(0.08),
              }}
            >
              Être bon ne suffit pas.
              <br />
              <span style={{ color: 'var(--green-text)' }}>
                Encore faut-il pouvoir le prouver.
              </span>
            </h1>

            <p
              className="mt-6 max-w-[520px] text-[17px] leading-relaxed"
              style={{ color: 'var(--t3)', ...enter(0.16) }}
            >
              ClearGo vous aide à objectiver votre conformité, vos pratiques et vos
              savoir-faire — pour comprendre où vous en êtes, progresser, et mieux vous
              présenter aux donneurs d’ordres adaptés.
            </p>

            <div
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={enter(0.24)}
            >
              <button
                onClick={onCta}
                data-cta
                className="btn-press inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-[15px] font-bold text-white"
                style={{
                  background: 'var(--green)',
                  boxShadow: '0 6px 20px -6px rgba(39,174,96,0.45)',
                }}
              >
                Évaluer mon profil ClearGo
                <span aria-hidden="true">→</span>
              </button>
              <a
                href="/comment-ca-marche"
                className="btn-press inline-flex items-center justify-center rounded-xl border px-6 py-4 text-[15px] font-semibold"
                style={{ borderColor: 'var(--cleargo-navy)', color: 'var(--cleargo-navy)' }}
              >
                Voir comment ça marche
              </a>
            </div>

            <p className="mt-4 text-[13px]" style={{ color: 'var(--t4)', ...enter(0.3) }}>
              Gratuit · Sans engagement · Réservé aux transporteurs routiers
            </p>
          </div>

          {/* ── Colonne droite — ClearGo Score ─────────────────────────────── */}
          <div
            ref={ringRef}
            className="flex justify-center"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateX(0)' : 'translateX(28px)',
              transition: 'opacity .9s var(--ease-apple) .2s, transform .9s var(--ease-apple) .2s',
            }}
          >
            <div className="w-full max-w-[360px]">
              <div className="cg-card p-7">
                <div className="mb-1 flex items-center justify-between">
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: 'var(--t4)' }}
                  >
                    ClearGo Score
                  </span>
                  <ClearGoIcon
                    name="cleargo-score"
                    size={20}
                    style={{ color: 'var(--cleargo-navy)' }}
                  />
                </div>

                <div className="mx-auto" style={{ width: 250, height: 250 }}>
                  <ScoreRing animated={ringVisible} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div
                    className="rounded-xl px-4 py-3"
                    style={{ background: 'var(--surface)' }}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--cleargo-navy)' }} />
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--t4)' }}>
                        Réglo
                      </span>
                    </div>
                    <div className="num text-[17px] font-bold" style={{ color: 'var(--cleargo-navy)' }}>
                      418<span className="text-[11px] font-medium" style={{ color: 'var(--t4)' }}>/500</span>
                    </div>
                  </div>
                  <div
                    className="rounded-xl px-4 py-3"
                    style={{ background: 'var(--green-pale)' }}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--green)' }} />
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--green-text)' }}>
                        Excellence
                      </span>
                    </div>
                    <div className="num text-[17px] font-bold" style={{ color: 'var(--green-text)' }}>
                      402<span className="text-[11px] font-medium" style={{ color: 'var(--t4)' }}>/500</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Réglo — petit, en accompagnement, jamais dominant */}
              <div className="mt-4 flex items-center gap-3 px-1">
                <ClearGoIcon name="reglo" size={40} className="shrink-0" />
                <p className="text-[12.5px] leading-snug" style={{ color: 'var(--t4)' }}>
                  Exemple de restitution. Votre score dépend du périmètre réellement
                  applicable à votre activité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
