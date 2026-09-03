'use client'

import { useReveal } from '@/hooks/use-reveal'

/**
 * Ce qu'un contrôle peut coûter.
 * Section sur fond navy — contraste volontaire avec le reste de la page.
 *
 * RÈGLE ABSOLUE : les montants sont présentés unitairement, tels que prévus par
 * la réglementation. Aucun total, aucun cumul, aucune « exposition estimée ».
 * Ton factuel, pas de CTA.
 */
const SANCTIONS: { libelle: string; montant: string }[] = [
  { libelle: 'Copie conforme manquante', montant: '750 € par véhicule contrôlé' },
  { libelle: 'Licence de transport non valide', montant: '15 000 € et immobilisation' },
  { libelle: 'DPAE non effectuée', montant: '45 000 € et 3 ans d’emprisonnement' },
  { libelle: 'Registre du personnel incomplet', montant: '750 € par salarié non inscrit' },
  { libelle: 'Défaut de carte conducteur', montant: '1 500 € et immobilisation' },
  { libelle: 'Non-respect temps de conduite', montant: '750 € par infraction constatée' },
]

export function CoutControle() {
  const { ref, visible } = useReveal<HTMLDivElement>()

  const enter = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s var(--ease-apple) ${delay}ms, transform .7s var(--ease-apple) ${delay}ms`,
  })

  return (
    <section
      id="cout-controle"
      className="py-24 lg:py-28"
      style={{ background: 'var(--cleargo-navy)' }}
    >
      <div ref={ref} className="mx-auto w-full max-w-4xl px-6 lg:px-12">
        <div className="section-eyebrow section-eyebrow--on-navy mb-5" style={enter(0)}>
          Contrôle en entreprise ou sur route
        </div>

        <h2
          className="font-black tracking-tight text-white"
          style={{
            fontSize: 'clamp(28px, 4vw, 46px)',
            lineHeight: 1.08,
            letterSpacing: '-1.6px',
            ...enter(100),
          }}
        >
          Ce qu’un contrôle peut coûter
        </h2>

        <ul className="mt-12 list-none">
          {SANCTIONS.map((s, i) => (
            <li
              key={s.libelle}
              className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              style={{
                borderTop: i === 0 ? '1px solid rgba(255,255,255,0.1)' : undefined,
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                ...enter(200 + i * 100),
              }}
            >
              <span
                className="text-[15px] font-semibold sm:text-[16px]"
                style={{ color: 'rgba(255,255,255,0.72)' }}
              >
                {s.libelle}
              </span>
              <span
                className="num shrink-0 font-bold text-white sm:text-right"
                style={{ fontSize: 'clamp(17px, 2.2vw, 22px)', letterSpacing: '-0.8px' }}
              >
                {s.montant}
              </span>
            </li>
          ))}
        </ul>

        <p
          className="mt-8 text-[13px]"
          style={{ color: 'rgba(255,255,255,0.45)', ...enter(900) }}
        >
          Montants prévus par la réglementation en vigueur.
        </p>
      </div>
    </section>
  )
}
