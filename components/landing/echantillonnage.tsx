'use client'

import { useReveal } from '@/hooks/use-reveal'

/**
 * L'échantillonnage expliqué.
 *
 * Répond frontalement à l'objection numéro un d'un patron de flotte :
 * « je n'ai pas le temps de rassembler tous mes papiers ».
 *
 * C'est aussi le point de différenciation le plus fort de la page — dire
 * « nous choisissons, pas vous » est contre-intuitif commercialement, et c'est
 * exactement ce qui rend le score défendable face à un donneur d'ordres.
 */

// TODO: barème à confirmer avec le moteur d'échantillonnage (Bloc 12).
const BAREME: { parc: string; controle: string }[] = [
  { parc: '1 – 5', controle: 'Tous' },
  { parc: '6 – 20', controle: '5' },
  { parc: '21 – 50', controle: '8' },
  { parc: '51 – 100', controle: '12' },
  { parc: '101 – 200', controle: '15' },
  { parc: '201 – 500', controle: '20' },
  { parc: '501 et plus', controle: '25' },
]

export function Echantillonnage() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15)

  const enter = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s var(--ease-apple) ${delay}s, transform .7s var(--ease-apple) ${delay}s`,
  })

  return (
    <section id="echantillonnage" className="bg-white py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Le texte ─────────────────────────────────────────────── */}
          <div style={enter(0)}>
            <div className="section-eyebrow mb-4">L’échantillonnage</div>

            <h2
              className="font-black tracking-tight"
              style={{
                fontSize: 'clamp(30px, 3.8vw, 46px)',
                lineHeight: 1.08,
                letterSpacing: '-1.6px',
                color: 'var(--cleargo-navy)',
              }}
            >
              Vous avez <span className="num">200</span> camions ?
              <br />
              <span style={{ color: 'var(--green-text)' }}>
                Nous en contrôlons <span className="num">15</span>.
              </span>
            </h2>

            <div className="mt-6 flex max-w-[520px] flex-col gap-4 text-[16px] leading-relaxed" style={{ color: 'var(--t3)' }}>
              <p>
                Personne ne scanne <span className="num">200</span> cartes grises. Alors nous
                appliquons la méthode des auditeurs : nous contrôlons assez pour conclure, et
                nous choisissons nous-mêmes ce que nous regardons.
              </p>
              <p>
                Notre sélection n’est pas aléatoire. Elle force la représentation des véhicules
                les plus anciens et des conducteurs les plus récents — là où les écarts se
                trouvent statistiquement.
              </p>
              <p style={{ color: 'var(--t2)', fontWeight: 600 }}>
                Et si nous trouvons une anomalie, nous élargissons.
              </p>
            </div>
          </div>

          {/* ── Le barème ────────────────────────────────────────────── */}
          <div style={enter(0.12)}>
            <div className="cg-card overflow-hidden">
              <div
                className="grid grid-cols-2 px-6 py-3.5"
                style={{ background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.13em]" style={{ color: 'var(--t4)' }}>
                  Votre parc
                </span>
                <span className="text-right text-[11px] font-bold uppercase tracking-[0.13em]" style={{ color: 'var(--green-text)' }}>
                  Nous contrôlons
                </span>
              </div>

              <div>
                {BAREME.map((ligne, i) => (
                  <div
                    key={ligne.parc}
                    className="grid grid-cols-2 items-baseline px-6 py-3"
                    style={{
                      borderBottom: i < BAREME.length - 1 ? '1px solid var(--line-l)' : undefined,
                    }}
                  >
                    <span className="num text-[14.5px]" style={{ color: 'var(--t2)' }}>
                      {ligne.parc}
                    </span>
                    <span
                      className="num text-right text-[16px] font-bold"
                      style={{ color: 'var(--cleargo-navy)' }}
                    >
                      {ligne.controle}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 text-[13.5px] leading-relaxed" style={{ color: 'var(--t4)' }}>
              Vous pouvez demander un contrôle élargi. C’est une démarche volontaire, et elle est
              valorisée dans votre score.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
