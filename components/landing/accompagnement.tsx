'use client'

import { ClearGoIcon, type ClearGoIconName } from '@/components/icons/cleargo-icon'
import { useReveal } from '@/hooks/use-reveal'

/**
 * Les trois niveaux d'accompagnement ClearGo.
 * Aucun montant n'est affiché : la tarification se discute lors de l'évaluation.
 */
// TODO: grille tarifaire en attente de validation Vivien
const OFFRES: {
  id: string
  nom: string
  mention: string
  description: string
  icone: ClearGoIconName
}[] = [
  {
    id: 'evaluation',
    nom: 'Évaluation',
    mention: 'Gratuit',
    description:
      'Vous découvrez le périmètre réglementaire applicable à votre activité et vous accédez à votre espace ClearGo.',
    icone: 'upload',
  },
  {
    id: 'clearscope',
    nom: 'ClearScope',
    mention: 'Diagnostic complet',
    description:
      'Votre ClearGo Score sur 1000, l’analyse détaillée de vos écarts, et votre plan d’actions priorisé.',
    icone: 'cleargo-score',
  },
  {
    id: 'cleargo',
    nom: 'ClearGo',
    mention: 'Suivi continu',
    description:
      'Votre score maintenu dans le temps, les alertes avant expiration, et vos documents générés automatiquement.',
    icone: 'expiration',
  },
]

interface AccompagnementProps {
  onCta: () => void
}

export function Accompagnement({ onCta }: AccompagnementProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()

  const enter = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s var(--ease-apple) ${delay}ms, transform .7s var(--ease-apple) ${delay}ms`,
  })

  return (
    <section
      id="accompagnement"
      className="py-24 lg:py-28"
      style={{ background: 'var(--white)' }}
    >
      <div ref={ref} className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="section-eyebrow mb-5" style={enter(0)}>
          Accompagnement
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
          Trois niveaux d’accompagnement
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {OFFRES.map((o, i) => (
            <div
              key={o.id}
              className="cg-card flex flex-col p-7"
              style={enter(200 + i * 100)}
            >
              <ClearGoIcon
                name={o.icone}
                size={32}
                style={{ color: 'var(--cleargo-navy)' }}
              />

              <h3
                className="mt-5 text-[19px] font-bold leading-tight"
                style={{ color: 'var(--t1)' }}
              >
                {o.nom}
              </h3>

              <span
                className="mt-3 inline-flex w-fit rounded-lg px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em]"
                style={{ background: 'var(--green-pale)', color: 'var(--green-text)' }}
              >
                {o.mention}
              </span>

              <p
                className="mt-5 text-[14.5px] leading-relaxed"
                style={{ color: 'var(--t3)' }}
              >
                {o.description}
              </p>
            </div>
          ))}
        </div>

        <p
          className="mt-8 text-[13px] italic"
          style={{ color: 'var(--t4)', ...enter(500) }}
        >
          Tarifs communiqués lors de votre évaluation.
        </p>

        <div className="mt-9" style={enter(600)}>
          <button
            onClick={onCta}
            data-cta
            className="btn-press inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-[15px] font-bold text-white"
            style={{
              background: 'var(--green-cta)',
              boxShadow: '0 6px 20px -6px rgba(39,174,96,0.45)',
            }}
          >
            Évaluer mon profil ClearGo
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
