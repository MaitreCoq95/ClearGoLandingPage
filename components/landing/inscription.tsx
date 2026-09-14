'use client'

import { useState } from 'react'
import { ClearGoIcon } from '@/components/icons/cleargo-icon'
import { useReveal } from '@/hooks/use-reveal'

const REASSURANCE = [
  'Gratuit et sans engagement',
  'Réservé aux transporteurs routiers',
  'Vos données restent en France',
  'Vous choisissez la suite',
]

function formatSiret(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 14)
  return [d.slice(0, 3), d.slice(3, 6), d.slice(6, 9), d.slice(9, 14)].filter(Boolean).join(' ')
}

interface InscriptionProps {
  /** Ouvre le parcours de pré-qualification, éventuellement pré-rempli. */
  onStart: (siret: string) => void
}

export function Inscription({ onStart }: InscriptionProps) {
  const { ref, visible } = useReveal()
  const [siret, setSiret] = useState('')
  const digits = siret.replace(/\D/g, '')

  const enter = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s var(--ease-apple) ${delay}s, transform .7s var(--ease-apple) ${delay}s`,
  })

  return (
    <section id="inscription" className="bg-white py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Réassurance ─────────────────────────────────────────────── */}
          <div style={enter(0)}>
            <div className="section-eyebrow mb-4">Commencer</div>
            <h2
              className="font-black tracking-tight"
              style={{
                fontSize: 'clamp(28px, 3.6vw, 44px)',
                lineHeight: 1.1,
                letterSpacing: '-1.5px',
                color: 'var(--cleargo-navy)',
              }}
            >
              Découvrez le périmètre qui s’applique à votre entreprise
            </h2>
            <p className="mt-5 max-w-[460px] text-[16px] leading-relaxed" style={{ color: 'var(--t3)' }}>
              En 6 questions, ClearGo identifie les exigences réellement applicables à votre
              activité et vous ouvre votre espace.
            </p>

            <ul className="mt-7 flex flex-col gap-3">
              {REASSURANCE.map((item, i) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[15px]"
                  style={{ color: 'var(--t2)', ...enter(0.1 + i * 0.06) }}
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                    style={{ background: 'var(--green-cta)' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3" style={enter(0.4)}>
              <ClearGoIcon name="reglo" size={44} className="shrink-0" />
              <p className="max-w-[300px] text-[12.5px] leading-snug" style={{ color: 'var(--t4)' }}>
                Réglo vous accompagne à chaque étape. Aucune question piège, aucun jargon.
              </p>
            </div>
          </div>

          {/* ── Entrée SIRET ────────────────────────────────────────────── */}
          <div className="cg-card p-7 lg:p-8" style={enter(0.15)}>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: 'var(--green-text)' }}>
              Étape 1 sur 7
            </p>
            <h3 className="mt-2 text-[21px] font-black leading-tight" style={{ color: 'var(--cleargo-navy)' }}>
              Votre numéro SIRET
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed" style={{ color: 'var(--t3)' }}>
              Nous vérifions votre inscription au registre national des transporteurs et
              pré-remplissons ce qui peut l’être.
            </p>

            <form
              className="mt-6"
              onSubmit={(e) => {
                e.preventDefault()
                onStart(digits)
              }}
            >
              <label
                htmlFor="siret-inscription"
                className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider"
                style={{ color: 'var(--cleargo-navy)' }}
              >
                SIRET
              </label>
              <input
                id="siret-inscription"
                inputMode="numeric"
                autoComplete="off"
                value={siret}
                onChange={(e) => setSiret(formatSiret(e.target.value))}
                placeholder="424 644 201 00032"
                className="num w-full rounded-xl border-2 px-4 py-3.5 text-[16px] outline-none"
                style={{
                  borderColor: digits.length === 14 ? 'var(--green)' : 'var(--line)',
                  background: 'var(--surface)',
                  color: 'var(--cleargo-navy)',
                }}
              />
              <p className="mt-1.5 text-[11.5px]" style={{ color: 'var(--t4)' }}>
                14 chiffres. Vous pouvez aussi continuer sans le renseigner.
              </p>

              <button
                type="submit"
                data-cta
                className="btn-press mt-5 w-full rounded-xl py-4 text-[15px] font-extrabold text-white"
                style={{ background: 'var(--green-cta)', boxShadow: '0 6px 20px -6px rgba(39,174,96,0.45)' }}
              >
                {digits.length === 14 ? 'Vérifier mon entreprise →' : 'Commencer l’évaluation →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
