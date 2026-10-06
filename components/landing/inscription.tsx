'use client'

import { useReveal } from '@/hooks/use-reveal'
import { FUNNEL_QUESTIONS } from '@/config/funnel-questions'
import { Reglo } from '@/components/landing/reglo'

const REASSURANCE = [
  'Gratuit et sans engagement',
  'Réservé aux transporteurs routiers',
  'Vos données restent en France',
  'Vous choisissez la suite',
]

interface InscriptionProps {
  /** Ouvre le parcours de pré-qualification. */
  onStart: () => void
}

export function Inscription({ onStart }: InscriptionProps) {
  const { ref, visible } = useReveal()

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
              <Reglo pose="pouce" height={76} className="shrink-0" />
              <p className="max-w-[300px] text-[12.5px] leading-snug" style={{ color: 'var(--t4)' }}>
                Réglo vous accompagne à chaque étape. Aucune question piège, aucun jargon.
              </p>
            </div>
          </div>

          {/* ── Contrat d'entrée ────────────────────────────────────────── */}
          <div className="cg-card p-7 lg:p-8" style={enter(0.15)}>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: 'var(--green-text)' }}>
              Ce qui vous attend
            </p>
            <h3 className="mt-2 text-[21px] font-black leading-tight" style={{ color: 'var(--cleargo-navy)' }}>
              {FUNNEL_QUESTIONS.length} questions, puis une première lecture
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed" style={{ color: 'var(--t3)' }}>
              Aucune ne porte sur votre identité. Vous recevez la lecture avant de laisser
              la moindre coordonnée.
            </p>

            <ul className="mt-6 flex flex-col gap-3.5">
              {[
                ['Ce que vous transportez, où, et avec quels moyens', 'Les questions posées'],
                ['Votre contexte, votre priorité, un premier point à clarifier', 'Ce que vous recevez'],
                ['Ouvrir votre espace, ou repartir', 'Ce que vous décidez ensuite'],
              ].map(([detail, label]) => (
                <li key={label} className="flex flex-col gap-0.5">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.13em]" style={{ color: 'var(--t4)' }}>
                    {label}
                  </span>
                  <span className="text-[14px] leading-snug" style={{ color: 'var(--t2)' }}>
                    {detail}
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              data-cta
              onClick={onStart}
              className="btn-press mt-7 w-full rounded-xl py-4 text-[15px] font-extrabold text-white"
              style={{ background: 'var(--green-cta)', boxShadow: '0 6px 20px -6px rgba(39,174,96,0.45)' }}
            >
              Évaluer mon profil →
            </button>
            <p className="mt-2.5 text-center text-[11.5px]" style={{ color: 'var(--t4)' }}>
              Sans SIRET · Sans compte · Vous pouvez arrêter à tout moment
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
