'use client'

import Image from 'next/image'
import { useReveal } from '@/hooks/use-reveal'

/**
 * Ce qu'un contrôle peut coûter.
 * Section sur fond navy — contraste volontaire avec le reste de la page.
 *
 * RÈGLE ABSOLUE : les montants sont présentés unitairement, tels que prévus par
 * la réglementation. Aucun total, aucun cumul, aucune « exposition estimée ».
 * Ton factuel, pas de CTA.
 */
// Montants vérifiés sur Légifrance le 25/09/2026 (versions en vigueur).
// Une ligne sans article source ne doit pas être publiée.
//   R3452-44 C. transports  : LEGIARTI000048629445
//   L3452-6 C. transports   : LEGIARTI000044192224
//   L1221-11 / L8224-1 C. trav. : LEGIARTI000006900850 / LEGIARTI000006904833
//   R1227-7 C. trav.        : LEGIARTI000030422217
//   L3315-5 C. transports   : LEGIARTI000038312305
//   R3315-10 / R3315-11 C. transports : LEGIARTI000046177522 / LEGIARTI000046177527
const SANCTIONS: { libelle: string; montant: string }[] = [
  {
    libelle: 'Copie conforme de la licence absente à bord',
    montant: 'Jusqu’à 1 500 € (contravention de 5e classe) — art. R3452-44 C. transports',
  },
  {
    libelle: 'Transport sans licence valide',
    montant: 'Délit : jusqu’à 15 000 € et 1 an d’emprisonnement, immobilisation possible — art. L3452-6 C. transports',
  },
  {
    libelle: 'DPAE non effectuée',
    montant: 'Pénalité de 300 fois le minimum garanti (art. L1221-11 C. trav.) ; jusqu’à 45 000 € et 3 ans en cas de travail dissimulé (art. L8224-1 C. trav.)',
  },
  {
    libelle: 'Registre du personnel incomplet',
    montant: 'Jusqu’à 750 € par salarié concerné (contravention de 4e classe) — art. R1227-7 C. trav.',
  },
  {
    libelle: 'Défaut de carte conducteur',
    montant: 'Délit : jusqu’à 3 750 € et 6 mois d’emprisonnement (amende forfaitaire 800 €) — art. L3315-5 C. transports',
  },
  {
    libelle: 'Non-respect des temps de conduite et de repos',
    montant: 'De 750 € (4e classe) à 1 500 € (5e classe) par infraction selon l’ampleur — art. R3315-10 et R3315-11 C. transports',
  },
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
      className="relative py-24 lg:py-28"
      style={{ background: 'var(--cleargo-navy)' }}
    >
      {/* La photo est ancrée à droite : le carré 1:1 recadré en pleine largeur
          ne lisait plus comme une image. Le texte reste sur du navy plein. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-full sm:w-[68%]">
          <Image
            src="/images/controle-nuit.webp"
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 68vw"
            className="object-cover"
            style={{ objectPosition: 'center 62%', opacity: 0.55 }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, var(--cleargo-navy) 0%, var(--cleargo-navy) 26%, rgba(13,43,94,.88) 48%, rgba(13,43,94,.62) 100%)',
          }}
        />
      </div>
      <div ref={ref} className="relative mx-auto w-full max-w-4xl px-6 lg:px-12">
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
              // Deux colonnes qui reviennent à la ligne : les libellés sourcés
              // (art. et classe de contravention) sont des phrases, pas des
              // montants courts. En `shrink-0` ils débordaient de 770 px à
              // 1440 px de large et la page défilait de côté.
              className="flex flex-col gap-1.5 py-5 sm:grid sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] sm:items-baseline sm:gap-10"
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
                className="min-w-0 break-words font-bold leading-snug text-white"
                style={{ fontSize: 'clamp(15px, 1.5vw, 17px)' }}
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
          Maxima prévus par les textes cités, en vigueur au 25/09/2026, pour une personne physique. Jusqu’à cinq fois plus pour une personne morale (art. 131-38 et 131-41 C. pénal).
        </p>
      </div>
    </section>
  )
}
