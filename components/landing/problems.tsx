'use client'

import { ClearGoIcon, type ClearGoIconName } from '@/components/icons/cleargo-icon'
import { useReveal } from '@/hooks/use-reveal'

interface Douleur {
  icon: ClearGoIconName
  title: string
  body: string
}

const DOULEURS: Douleur[] = [
  {
    icon: 'niveau',
    title: 'Vous naviguez à l’aveugle',
    body: 'Vous avez des documents, des pratiques et des habitudes de travail. Mais pas de vision d’ensemble de ce qui est réellement maîtrisé, de ce qui doit être corrigé, et de ce que vous pouvez valoriser.',
  },
  {
    icon: 'donneur-ordres',
    title: 'Votre savoir-faire reste invisible',
    body: 'Vous savez travailler. Mais votre niveau réel est difficile à lire depuis l’extérieur. Vous restez parfois cantonné à des relations de sous-traitance alors que vos compétences pourraient vous permettre d’aller plus loin.',
  },
  {
    icon: 'controleur-dreal',
    title: 'Vous subissez les contrôles au lieu de les anticiper',
    body: 'Chaque contrôle est une surprise. Les documents sont cherchés dans l’urgence. Ce qui manque se découvre trop tard.',
  },
]

/** Une douleur : texte et visuel alternent gauche / droite sur desktop. */
function DouleurRow({ douleur, index }: { douleur: Douleur; index: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15)
  const reversed = index % 2 === 1

  const enter = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s var(--ease-apple) ${delay}s, transform .7s var(--ease-apple) ${delay}s`,
  })

  return (
    <div
      ref={ref}
      className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
    >
      {/* Texte */}
      <div
        className={reversed ? 'lg:order-2' : 'lg:order-1'}
        style={enter(0.04)}
      >
        <div className="mb-3 flex items-center gap-3">
          <span
            className="num text-[13px] font-bold"
            style={{ color: 'var(--t4)' }}
          >
            0{index + 1}
          </span>
          <span
            className="block h-px w-8"
            style={{ background: 'var(--line)' }}
            aria-hidden="true"
          />
        </div>

        <h3
          className="font-bold tracking-tight"
          style={{
            fontSize: 'clamp(21px, 2.4vw, 27px)',
            lineHeight: 1.18,
            letterSpacing: '-0.6px',
            color: 'var(--t1)',
          }}
        >
          {douleur.title}
        </h3>

        <p
          className="mt-4 max-w-[520px] text-[16px] leading-relaxed"
          style={{ color: 'var(--t3)' }}
        >
          {douleur.body}
        </p>
      </div>

      {/* Visuel */}
      <div
        className={reversed ? 'lg:order-1' : 'lg:order-2'}
        style={enter(0.14)}
      >
        <div className="cg-card flex items-center justify-center px-8 py-12 lg:py-16">
          <ClearGoIcon
            name={douleur.icon}
            size={104}
            style={{ color: 'var(--cleargo-navy)' }}
          />
        </div>
      </div>
    </div>
  )
}

export function Problems() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2)

  const enter = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s var(--ease-apple) ${delay}s, transform .7s var(--ease-apple) ${delay}s`,
  })

  return (
    <section
      id="problems"
      className="py-24 lg:py-32"
      style={{ background: 'var(--surface)' }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        {/* En-tête */}
        <div ref={ref} className="mb-16 max-w-[620px] lg:mb-24">
          <div className="section-eyebrow mb-4" style={enter(0)}>
            Le point de départ
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
            Ce que vivent aujourd’hui la plupart des transporteurs.
          </h2>
          <p
            className="mt-5 text-[17px] leading-relaxed"
            style={{ color: 'var(--t3)', ...enter(0.2) }}
          >
            Le problème n’est presque jamais le manque de sérieux. C’est le manque de
            lecture.
          </p>
        </div>

        {/* Les 3 douleurs */}
        <div className="flex flex-col gap-16 lg:gap-24">
          {DOULEURS.map((d, i) => (
            <DouleurRow key={d.title} douleur={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
