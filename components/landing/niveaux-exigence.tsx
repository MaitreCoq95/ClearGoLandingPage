'use client'

import { ClearGoIcon } from '@/components/icons/cleargo-icon'
import { useReveal } from '@/hooks/use-reveal'

/**
 * Les trois niveaux d'exigence ClearGo, empilés de haut en bas et reliés par un
 * connecteur vertical : réglementaire → excellence opérationnelle → expertise
 * sectorielle.
 */
const NIVEAUX: {
  numero: string
  titre: string
  question: string
  icone: 'core-acces-profession' | 'iso-9001' | 'gdp'
}[] = [
  {
    numero: '1',
    titre: 'Réglementaire',
    question:
      'Votre entreprise maîtrise-t-elle les exigences qui lui sont applicables, et peut-elle le démontrer ?',
    icone: 'core-acces-profession',
  },
  {
    numero: '2',
    titre: 'Excellence opérationnelle',
    question: 'Au-delà du minimum réglementaire, sait-elle réellement bien opérer ?',
    icone: 'iso-9001',
  },
  {
    numero: '3',
    titre: 'Expertise sectorielle',
    question: 'Est-elle réellement performante dans la spécialité qu’elle veut vendre ?',
    icone: 'gdp',
  },
]

export function NiveauxExigence() {
  const { ref, visible } = useReveal<HTMLDivElement>()

  const enter = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s var(--ease-apple) ${delay}ms, transform .7s var(--ease-apple) ${delay}ms`,
  })

  return (
    <section
      id="niveaux-exigence"
      className="py-24 lg:py-28"
      style={{ background: 'var(--surface)' }}
    >
      <div ref={ref} className="mx-auto w-full max-w-4xl px-6 lg:px-12">
        <div className="section-eyebrow mb-5" style={enter(0)}>
          Ce que ClearGo mesure
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
          Trois niveaux d’exigence
        </h2>

        <p
          className="mt-5 max-w-[620px] text-[17px] leading-relaxed"
          style={{ color: 'var(--t3)', ...enter(200) }}
        >
          Être très bon en pharma ne signifie pas être excellent en dernier kilomètre.
          ClearGo montre où vous êtes réellement fort.
        </p>

        <div className="mt-14">
          {NIVEAUX.map((n, i) => (
            <div key={n.numero} className="flex gap-5" style={enter(300 + i * 100)}>
              {/* Rail — numéro + connecteur vertical */}
              <div className="flex shrink-0 flex-col items-center" aria-hidden="true">
                <span
                  className="num flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-bold text-white"
                  style={{ background: 'var(--cleargo-navy)' }}
                >
                  {n.numero}
                </span>
                {i < NIVEAUX.length - 1 && (
                  <span
                    className="w-px flex-1"
                    style={{ background: 'var(--line)', minHeight: 24 }}
                  />
                )}
              </div>

              {/* Étage */}
              <div className={i < NIVEAUX.length - 1 ? 'pb-6' : ''} style={{ flex: 1 }}>
                <div className="cg-card flex items-start gap-4 p-6">
                  <ClearGoIcon
                    name={n.icone}
                    size={36}
                    className="shrink-0"
                    style={{ color: 'var(--cleargo-navy)' }}
                  />
                  <div>
                    <div
                      className="text-[11px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: 'var(--t4)' }}
                    >
                      Niveau <span className="num">{n.numero}</span>
                    </div>
                    <h3
                      className="mt-1 text-[19px] font-bold leading-tight"
                      style={{ color: 'var(--t1)' }}
                    >
                      {n.titre}
                    </h3>
                    <p
                      className="mt-2 text-[15px] leading-relaxed"
                      style={{ color: 'var(--t3)' }}
                    >
                      {n.question}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
