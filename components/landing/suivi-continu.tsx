'use client'

import { ClearGoIcon, type ClearGoIconName } from '@/components/icons/cleargo-icon'
import { useReveal } from '@/hooks/use-reveal'

/**
 * Le suivi continu.
 *
 * Montre la vérification mensuelle telle qu'un transporteur la reçoit : trois
 * éléments tirés de son parc, sept jours pour répondre. C'est ce qui distingue
 * un profil vivant d'une photo datée.
 */

interface Element {
  categorie: string
  nom: string
  piece: string
  icon: ClearGoIconName
}

// Exemple de restitution — données fictives, jamais présentées comme réelles.
const ELEMENTS: Element[] = [
  {
    categorie: 'Véhicule',
    nom: 'EF-456-GH',
    piece: 'Contrôle technique',
    icon: 'core-flotte',
  },
  {
    categorie: 'Conducteur',
    nom: 'MARTIN Sophie',
    piece: 'Carte conducteur',
    icon: 'core-fco',
  },
  {
    categorie: 'Sous-traitant',
    nom: 'TRANS EXPRESS',
    piece: 'Attestation de vigilance',
    icon: 'core-sous-traitance',
  },
]

export function SuiviContinu() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15)

  const enter = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s var(--ease-apple) ${delay}s, transform .7s var(--ease-apple) ${delay}s`,
  })

  return (
    <section
      id="suivi-continu"
      className="py-24 lg:py-32"
      style={{ background: 'var(--surface)' }}
      ref={ref}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Le texte ─────────────────────────────────────────────── */}
          <div style={enter(0)}>
            <div className="section-eyebrow mb-4">Le suivi continu</div>

            <h2
              className="font-black tracking-tight"
              style={{
                fontSize: 'clamp(28px, 3.6vw, 44px)',
                lineHeight: 1.1,
                letterSpacing: '-1.5px',
                color: 'var(--cleargo-navy)',
              }}
            >
              Un score qui ne bouge pas
              <br />
              <span style={{ color: 'var(--green-text)' }}>ne vaut rien.</span>
            </h2>

            <div className="mt-6 flex max-w-[520px] flex-col gap-4 text-[16px] leading-relaxed" style={{ color: 'var(--t3)' }}>
              <p>
                Chaque mois, ClearGo tire quelques éléments de votre parc et vous demande la
                preuve à jour. Trois camions, deux conducteurs, un sous-traitant. Vous avez sept
                jours.
              </p>
              <p>
                C’est ce qui fait la différence entre une photo datée et un profil vivant. Quand
                un donneur d’ordres consulte votre profil, il ne voit pas seulement votre
                score — <span style={{ color: 'var(--t2)', fontWeight: 600 }}>il voit que vous répondez.</span>
              </p>
            </div>
          </div>

          {/* ── La vérification mensuelle ────────────────────────────── */}
          <div style={enter(0.12)}>
            <div className="cg-card overflow-hidden">
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ background: 'var(--cleargo-navy)' }}
              >
                <span className="text-[13px] font-bold text-white">
                  Vérification mensuelle
                </span>
                <span className="num text-[12.5px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Mars 2026
                </span>
              </div>

              <div>
                {ELEMENTS.map((el, i) => (
                  <div
                    key={el.nom}
                    className="flex items-center gap-4 px-6 py-4"
                    style={{
                      borderBottom: i < ELEMENTS.length - 1 ? '1px solid var(--line-l)' : undefined,
                    }}
                  >
                    <ClearGoIcon
                      name={el.icon}
                      size={26}
                      className="shrink-0"
                      style={{ color: 'var(--cleargo-navy)' }}
                    />
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-[10.5px] font-bold uppercase tracking-[0.12em]"
                        style={{ color: 'var(--t4)' }}
                      >
                        {el.categorie}
                      </p>
                      <p className="num text-[14.5px] font-semibold" style={{ color: 'var(--cleargo-navy)' }}>
                        {el.nom}
                      </p>
                      <p className="text-[13px]" style={{ color: 'var(--t3)' }}>
                        {el.piece}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="flex items-center gap-2.5 px-6 py-3.5"
                style={{ background: 'var(--green-pale)', borderTop: '1px solid var(--line-l)' }}
              >
                <ClearGoIcon name="expiration" size={18} className="shrink-0" />
                <span className="text-[13px] font-bold" style={{ color: 'var(--cleargo-navy)' }}>
                  <span className="num">7</span> jours pour répondre
                </span>
              </div>
            </div>

            <p className="mt-4 text-[12.5px]" style={{ color: 'var(--t4)' }}>
              Exemple de vérification. Les éléments tirés dépendent de votre parc réel.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
