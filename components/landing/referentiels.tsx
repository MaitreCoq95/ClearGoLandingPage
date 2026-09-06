'use client'

import { ClearGoIcon, type ClearGoIconName } from '@/components/icons/cleargo-icon'
import { useReveal } from '@/hooks/use-reveal'

/**
 * Les référentiels lus par ClearGo, présentés en trois blocs distincts.
 * Obligations réglementaires, référentiels sectoriels et normes volontaires sont
 * des objets juridiques de nature différente : ils ne sont jamais mélangés.
 */
type Bloc = {
  id: string
  titre: string
  entrees: { label: string; icone: ClearGoIconName }[]
}

const BLOCS: Bloc[] = [
  {
    id: 'obligations',
    titre: 'Obligations réglementaires',
    entrees: [
      { label: 'Accès à la profession', icone: 'core-acces-profession' },
      { label: 'Temps de conduite', icone: 'core-temps-conduite' },
      { label: 'Tachygraphe', icone: 'core-tachygraphe' },
      { label: 'Contrôle technique', icone: 'controle-technique' },
      { label: 'Formation conducteurs', icone: 'core-fco' },
      { label: 'Obligations sociales', icone: 'core-urssaf' },
    ],
  },
  {
    id: 'sectoriels',
    titre: 'Référentiels sectoriels',
    entrees: [
      { label: 'ADR — matières dangereuses', icone: 'adr' },
      { label: 'ATP — température dirigée', icone: 'atp-frigo' },
      { label: 'GDP — distribution pharmaceutique', icone: 'gdp' },
      { label: 'IFS — sécurité alimentaire', icone: 'ifs' },
    ],
  },
  {
    id: 'normes',
    titre: 'Normes volontaires',
    entrees: [
      { label: 'ISO 9001', icone: 'iso-9001' },
      { label: 'ISO 14001', icone: 'iso-14001' },
      { label: 'ISO 45001', icone: 'iso-45001' },
      { label: 'ISO 39001', icone: 'iso-39001' },
    ],
  },
]

export function Referentiels() {
  const { ref, visible } = useReveal<HTMLDivElement>()

  const enter = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s var(--ease-apple) ${delay}ms, transform .7s var(--ease-apple) ${delay}ms`,
  })

  return (
    <section
      id="referentiels"
      className="py-24 lg:py-28"
      style={{ background: 'var(--surface)' }}
    >
      <div ref={ref} className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="section-eyebrow mb-5" style={enter(0)}>
          Périmètre d’analyse
        </div>

        <h2
          className="font-black tracking-tight"
          style={{
            fontSize: 'clamp(28px, 4vw, 46px)',
            lineHeight: 1.08,
            letterSpacing: '-1.6px',
            color: 'var(--t1)',
            ...enter(100),
          }}
        >
          Les référentiels
        </h2>

        <p
          className="mt-5 max-w-[620px] text-[16px] leading-relaxed"
          style={{ color: 'var(--t3)', ...enter(200) }}
        >
          ClearGo adapte son analyse aux exigences applicables à votre activité,
          votre organisation et vos spécialités.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {BLOCS.map((bloc, i) => (
            <div
              key={bloc.id}
              className="cg-card flex flex-col p-7"
              style={enter(300 + i * 100)}
            >
              <h3
                className="text-[17px] font-bold leading-tight"
                style={{ color: 'var(--t1)' }}
              >
                {bloc.titre}
              </h3>

              <span
                aria-hidden="true"
                className="mt-4 mb-5 block h-px w-full"
                style={{ background: 'var(--line)' }}
              />

              <ul className="flex flex-col gap-3.5">
                {bloc.entrees.map((e) => (
                  <li key={e.label} className="flex items-center gap-3">
                    <ClearGoIcon
                      name={e.icone}
                      size={24}
                      className="shrink-0"
                      style={{ color: 'var(--cleargo-navy)' }}
                    />
                    <span
                      className="text-[14.5px] leading-snug"
                      style={{ color: 'var(--t3)' }}
                    >
                      {e.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
