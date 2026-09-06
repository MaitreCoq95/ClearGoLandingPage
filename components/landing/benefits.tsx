'use client'

import { ClearGoIcon, type ClearGoIconName } from '@/components/icons/cleargo-icon'
import { useReveal } from '@/hooks/use-reveal'

interface Benefit {
  icon: ClearGoIconName
  title: string
  body: string
}

const BENEFITS: Benefit[] = [
  {
    icon: 'cleargo-score',
    title: 'Une lecture claire de votre niveau',
    body: 'ClearGo évalue votre entreprise sur les exigences réellement applicables à votre activité, et vous restitue un score sur 1000 avec le détail par domaine.',
  },
  {
    icon: 'plan-dactions',
    title: 'Comprendre où progresser',
    body: 'Identifiez vos écarts, vos priorités, et les domaines sur lesquels votre entreprise peut monter en compétence. Chaque écart vient avec l’action corrective, la preuve attendue et le délai cible.',
  },
  {
    icon: 'score-partageable',
    title: 'Rendre votre savoir-faire visible et partageable',
    body: 'Valorisez les éléments que vous êtes réellement capable de démontrer auprès de vos clients et futurs donneurs d’ordres.',
  },
]

export function Benefits() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15)

  const enter = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s var(--ease-apple) ${delay}s, transform .7s var(--ease-apple) ${delay}s`,
  })

  return (
    <section
      id="benefits"
      className="py-24 lg:py-32"
      style={{ background: 'var(--white)' }}
    >
      <div ref={ref} className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        {/* En-tête */}
        <div className="mb-14 max-w-[620px] lg:mb-20">
          <div className="section-eyebrow mb-4" style={enter(0)}>
            La réponse
          </div>
          <h2
            className="font-black tracking-tight"
            style={{
              fontSize: 'clamp(28px, 4vw, 46px)',
              lineHeight: 1.08,
              letterSpacing: '-1.6px',
              color: 'var(--t1)',
              ...enter(0.1),
            }}
          >
            Ce que ClearGo vous apporte.
          </h2>
          <p
            className="mt-5 text-[17px] leading-relaxed"
            style={{ color: 'var(--t3)', ...enter(0.2) }}
          >
            Une lecture objective de votre entreprise, des priorités claires, et de quoi
            montrer ce que vous savez faire.
          </p>
        </div>

        {/* 3 cartes */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              className="cg-card cg-card--lift flex flex-col p-7 lg:p-8"
              style={enter(0.3 + i * 0.1)}
            >
              <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl"
                style={{ background: 'var(--green-pale)' }}
              >
                <ClearGoIcon
                  name={b.icon}
                  size={30}
                  style={{ color: 'var(--cleargo-navy)' }}
                />
              </div>

              <h3
                className="text-[19px] font-bold leading-snug tracking-tight"
                style={{ color: 'var(--t1)', letterSpacing: '-0.4px' }}
              >
                {b.title}
              </h3>

              <p
                className="mt-3 text-[15px] leading-relaxed"
                style={{ color: 'var(--t3)' }}
              >
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
