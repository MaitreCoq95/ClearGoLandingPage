'use client'

import { useCountUp } from '@/hooks/use-reveal'

/**
 * Le seul chiffre de marché affiché sur la landing, et il est vérifiable.
 * Volontairement seul : la sobriété fait la crédibilité.
 */
export function KeyFigure() {
  const { ref, current } = useCountUp<HTMLDivElement>(62968)

  return (
    <section className="bg-white py-24 lg:py-32">
      <div ref={ref} className="mx-auto max-w-3xl px-6 text-center lg:px-12">
        <div
          className="num font-bold leading-none"
          style={{
            fontSize: 'clamp(56px, 11vw, 132px)',
            letterSpacing: '-0.045em',
            color: 'var(--cleargo-navy)',
          }}
        >
          {current.toLocaleString('fr-FR').replace(/ | /g, ' ')}
        </div>

        <p
          className="mt-5 text-[19px] font-semibold sm:text-[22px]"
          style={{ color: 'var(--t2)' }}
        >
          transporteurs routiers actifs en France
        </p>

        <p className="mt-3 text-[13px]" style={{ color: 'var(--t4)' }}>
          Source : registre électronique national des entreprises de transport par route
          (GRECO) — données publiques.
        </p>
      </div>
    </section>
  )
}
