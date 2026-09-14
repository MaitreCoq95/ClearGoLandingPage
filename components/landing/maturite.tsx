'use client'

import { useReveal } from '@/hooks/use-reveal'

/**
 * Les 4 paliers de maturité ClearGo, en progression gauche → droite.
 * Les descriptions qualifient un niveau de pratique observé sur le périmètre
 * analysé — jamais un statut juridique.
 */
const PALIERS: {
  nom: string
  plage: string
  description: string
  couleur: string
  /** Teinte assombrie : les couleurs de palier ne passent pas AA en typo. */
  couleurTexte: string
}[] = [
  {
    nom: 'Insuffisant',
    plage: '0–300',
    description: 'Exposition forte, écarts prioritaires à traiter',
    couleur: 'var(--score-insuffisant)',
    couleurTexte: 'var(--score-insuffisant-text)',
  },
  {
    nom: 'En construction',
    plage: '301–600',
    description: 'Plusieurs briques présentes, des écarts subsistent',
    couleur: 'var(--score-construction)',
    couleurTexte: 'var(--score-construction-text)',
  },
  {
    nom: 'Maîtrisé',
    plage: '601–900',
    description: 'Niveau solide sur le périmètre analysé',
    couleur: 'var(--score-maitrise)',
    couleurTexte: 'var(--score-maitrise-text)',
  },
  {
    nom: 'Excellence',
    plage: '901–1000',
    description: 'Niveau différenciant, savoir-faire démontrables',
    couleur: 'var(--score-excellence)',
    couleurTexte: 'var(--score-excellence-text)',
  },
]

export function Maturite() {
  const { ref, visible } = useReveal<HTMLDivElement>()

  const enter = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s var(--ease-apple) ${delay}ms, transform .7s var(--ease-apple) ${delay}ms`,
  })

  return (
    <section id="maturite" className="py-24 lg:py-28" style={{ background: 'var(--white)' }}>
      <div ref={ref} className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="section-eyebrow mb-5" style={enter(0)}>
          Paliers de maturité
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
          Où en êtes-vous ?
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PALIERS.map((p, i) => (
            <div
              key={p.nom}
              className="cg-card flex flex-col p-6"
              style={enter(200 + i * 100)}
            >
              <span
                aria-hidden="true"
                className="block h-1.5 w-full rounded-full"
                style={{ background: p.couleur }}
              />

              <div className="mt-5 flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: p.couleur }}
                />
                <h3
                  className="text-[17px] font-bold leading-tight"
                  style={{ color: 'var(--t1)' }}
                >
                  {p.nom}
                </h3>
              </div>

              <div
                className="num mt-2 text-[22px] font-bold"
                style={{ color: p.couleurTexte, letterSpacing: '-1px' }}
              >
                {p.plage}
                <span className="text-[12px] font-medium" style={{ color: 'var(--t4)' }}>
                  {' '}/ 1000
                </span>
              </div>

              <p className="mt-3 text-[14px] leading-relaxed" style={{ color: 'var(--t3)' }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
