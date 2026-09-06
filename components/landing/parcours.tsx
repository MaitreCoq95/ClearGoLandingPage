'use client'

import { ClearGoIcon, type ClearGoIconName } from '@/components/icons/cleargo-icon'
import { useReveal } from '@/hooks/use-reveal'

interface Etape {
  n: number
  icon: ClearGoIconName
  title: string
  sub: string
}

const ETAPES: Etape[] = [
  {
    n: 1,
    icon: 'upload',
    title: 'Je renseigne mon profil',
    sub: 'SIRET, activité, spécialités, zones de livraison.',
  },
  {
    n: 2,
    icon: 'core-acces-profession',
    title: 'ClearGo définit mon périmètre',
    sub: 'Les référentiels et les exigences qui s’appliquent réellement à mon activité.',
  },
  {
    n: 3,
    icon: 'core-flotte',
    title: 'Je déclare mon parc',
    sub: 'Combien de véhicules, de conducteurs, de sites. Pré-rempli depuis le registre national quand c’est possible.',
  },
  {
    n: 4,
    icon: 'controle-technique',
    title: 'ClearGo tire l’échantillon',
    sub: 'Nous sélectionnons les véhicules et conducteurs à contrôler. Vous ne choisissez pas — c’est ce qui rend l’évaluation crédible.',
  },
  {
    n: 5,
    icon: 'document-valide',
    title: 'Je dépose les pièces demandées',
    sub: 'Une liste nominative, pas un formulaire générique. 15 véhicules sur 200, pas 200.',
  },
  {
    n: 6,
    icon: 'cleargo-score',
    title: 'Je reçois mon score et mon plan d’actions',
    sub: 'Mon niveau sur 1000, le détail par domaine, mes priorités.',
  },
]

/** Délai d'allumage séquentiel du cercle, en secondes. */
const STEP_DELAY = 0.12

interface ParcoursProps {
  /** Conservé pour compatibilité d'appel — cette section ne porte pas de CTA. */
  onCta?: () => void
}

export function Parcours(_props: ParcoursProps = {}) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.12)

  const enter = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s var(--ease-apple) ${delay}s, transform .7s var(--ease-apple) ${delay}s`,
  })

  return (
    <section
      id="parcours"
      className="py-24 lg:py-32"
      style={{ background: 'var(--surface)' }}
    >
      <div ref={ref} className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        {/* En-tête */}
        <div className="mb-16 max-w-[620px] lg:mb-24">
          <div className="section-eyebrow mb-4" style={enter(0)}>
            Le parcours
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
            Comment ça se passe
          </h2>
          <p
            className="mt-5 text-[17px] italic leading-relaxed"
            style={{ color: 'var(--t3)', ...enter(0.2) }}
          >
            Six étapes. Vous savez exactement ce qui vous attend.
          </p>
        </div>

        {/* Workflow — 6 colonnes desktop, 3 tablette, 1 mobile */}
        <ol className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-3 md:gap-y-14 lg:grid-cols-6">
          {ETAPES.map((e, i) => {
            const delay = i * STEP_DELAY
            const lineDelay = delay + STEP_DELAY
            const isLast = i === ETAPES.length - 1
            // Fin de ligne en tablette (3 colonnes) : pas de connecteur horizontal.
            const endsRowOnTablet = i % 3 === 2

            return (
              <li
                key={e.n}
                className="relative flex gap-5 md:flex-col md:items-center md:gap-0 md:text-center"
              >
                {/* Connecteur vertical — mobile uniquement */}
                {!isLast && (
                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute md:hidden"
                    style={{ left: '23px', top: '56px', bottom: '-36px', width: '2px' }}
                    viewBox="0 0 2 100"
                    preserveAspectRatio="none"
                  >
                    <line
                      x1="1" y1="0" x2="1" y2="100"
                      stroke="var(--line)" strokeWidth="2"
                    />
                    <line
                      x1="1" y1="0" x2="1" y2="100"
                      stroke="var(--cleargo-navy)" strokeWidth="2" strokeLinecap="round"
                      strokeDasharray="100"
                      strokeDashoffset={visible ? 0 : 100}
                      style={{
                        transition: `stroke-dashoffset .55s var(--ease-apple) ${lineDelay}s`,
                      }}
                    />
                  </svg>
                )}

                {/* Connecteur horizontal — tablette et desktop */}
                {!isLast && (
                  <svg
                    aria-hidden="true"
                    className={
                      endsRowOnTablet
                        ? 'pointer-events-none absolute hidden lg:block'
                        : 'pointer-events-none absolute hidden md:block'
                    }
                    style={{
                      left: 'calc(50% + 30px)',
                      width: 'calc(100% - 36px)',
                      top: '23px',
                      height: '2px',
                    }}
                    viewBox="0 0 100 2"
                    preserveAspectRatio="none"
                  >
                    <line
                      x1="0" y1="1" x2="100" y2="1"
                      stroke="var(--line)" strokeWidth="2"
                    />
                    <line
                      x1="0" y1="1" x2="100" y2="1"
                      stroke="var(--cleargo-navy)" strokeWidth="2" strokeLinecap="round"
                      strokeDasharray="100"
                      strokeDashoffset={visible ? 0 : 100}
                      style={{
                        transition: `stroke-dashoffset .55s var(--ease-apple) ${lineDelay}s`,
                      }}
                    />
                  </svg>
                )}

                {/* Cercle numéroté — s'allume séquentiellement */}
                <div
                  className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: visible ? 'var(--cleargo-navy)' : 'var(--white)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: visible ? 'var(--cleargo-navy)' : 'var(--line)',
                    transition: `background-color .5s var(--ease-apple) ${delay}s, border-color .5s var(--ease-apple) ${delay}s`,
                  }}
                >
                  <span
                    className="num text-[15px] font-bold"
                    style={{
                      color: visible ? '#FFFFFF' : 'var(--t4)',
                      transition: `color .5s var(--ease-apple) ${delay}s`,
                    }}
                  >
                    {e.n}
                  </span>
                </div>

                {/* Contenu */}
                <div
                  className="min-w-0 md:mt-5 md:flex md:flex-col md:items-center"
                  style={enter(0.25 + delay)}
                >
                  <ClearGoIcon
                    name={e.icon}
                    size={28}
                    className="mb-3"
                    style={{ color: 'var(--cleargo-navy)' }}
                  />
                  <h3
                    className="text-[15px] font-bold leading-snug tracking-tight"
                    style={{ color: 'var(--t1)', letterSpacing: '-0.3px' }}
                  >
                    {e.title}
                  </h3>
                  <p
                    className="mt-1.5 text-[13.5px] leading-relaxed"
                    style={{ color: 'var(--t4)' }}
                  >
                    {e.sub}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
