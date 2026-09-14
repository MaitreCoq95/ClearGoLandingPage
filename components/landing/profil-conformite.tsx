'use client'

import { ClearGoIcon, type ClearGoIconName } from '@/components/icons/cleargo-icon'
import { useReveal } from '@/hooks/use-reveal'

/**
 * Aperçu du profil de conformité ClearGo.
 * Ce document restitue un niveau de pratique observé sur le périmètre analysé :
 * il ne vaut ni attestation, ni délivrance par un organisme tiers.
 */

const CARACTERISTIQUES: {
  label: string
  sub: string
  icone: ClearGoIconName
}[] = [
  {
    label: 'Document PDF',
    sub: 'Téléchargeable et imprimable',
    icone: 'document-valide',
  },
  {
    label: 'Vérifiable par QR code',
    sub: 'Lien direct vers le profil à jour',
    icone: 'score-partageable',
  },
  {
    label: 'Mis à jour en continu',
    sub: 'Reflète votre score du jour',
    icone: 'cleargo-score',
  },
  {
    label: 'Horodaté et traçable',
    sub: 'Historique complet des évolutions',
    icone: 'plan-dactions',
  },
]

const DESTINATAIRES: { qui: string; pourquoi: string }[] = [
  { qui: 'Donneurs d’ordres', pourquoi: 'Lecture rapide de votre niveau' },
  { qui: 'Appels d’offres', pourquoi: 'Pièce à joindre à vos réponses' },
  {
    qui: 'Clients sous exigence sectorielle',
    pourquoi: 'Pharma, agroalimentaire, chimie',
  },
]

/** QR stylisé — motif déterministe, aucune librairie. */
function QrStylise({ size = 84 }: { size?: number }) {
  const modules = 21
  const cells: { x: number; y: number }[] = []

  const dansFinder = (x: number, y: number) =>
    (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12)

  for (let y = 0; y < modules; y++) {
    for (let x = 0; x < modules; x++) {
      if (dansFinder(x, y)) continue
      if ((x * 7 + y * 13 + x * y * 3) % 5 < 2) cells.push({ x, y })
    }
  }

  const Finder = ({ x, y }: { x: number; y: number }) => (
    <>
      <rect
        x={x} y={y} width="7" height="7"
        fill="none" stroke="var(--cleargo-navy)" strokeWidth="1"
      />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill="var(--cleargo-navy)" />
    </>
  )

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 21"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="21" height="21" fill="var(--white)" />
      <Finder x={0} y={0} />
      <Finder x={14} y={0} />
      <Finder x={0} y={14} />
      {cells.map((c) => (
        <rect
          key={`${c.x}-${c.y}`}
          x={c.x}
          y={c.y}
          width="1"
          height="1"
          fill="var(--cleargo-navy)"
        />
      ))}
    </svg>
  )
}

export function ProfilConformite() {
  const { ref, visible } = useReveal<HTMLDivElement>()

  const enter = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s var(--ease-apple) ${delay}ms, transform .7s var(--ease-apple) ${delay}ms`,
  })

  return (
    <section
      id="profil-conformite"
      className="py-24 lg:py-28"
      style={{ background: 'var(--surface)' }}
    >
      <div ref={ref} className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="section-eyebrow mb-5" style={enter(0)}>
          Restitution
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
          Votre profil de conformité
        </h2>

        <p
          className="mt-5 max-w-[620px] text-[16px] leading-relaxed"
          style={{ color: 'var(--t3)', ...enter(200) }}
        >
          Un document lisible, vérifiable, que vous partagez avec vos clients et
          donneurs d’ordres.
        </p>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">

          {/* ── Aperçu du document ───────────────────────────────────────── */}
          <div style={enter(300)}>
            <div className="cg-card p-7 lg:p-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-1.5 flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full"
                      style={{ background: 'var(--green-cta)' }}
                    />
                    <span
                      className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: 'var(--t4)' }}
                    >
                      Profil de conformité ClearGo
                    </span>
                  </div>
                  <p className="text-[12px]" style={{ color: 'var(--t4)' }}>
                    Généré le <span className="num">03/09/2026</span> · Mis à jour en
                    continu
                  </p>
                </div>
                <ClearGoIcon
                  name="cleargo-score"
                  size={28}
                  className="shrink-0"
                  style={{ color: 'var(--cleargo-navy)' }}
                />
              </div>

              {/* Entreprise */}
              <div
                className="mt-6 rounded-xl px-5 py-4"
                style={{ background: 'var(--surface)' }}
              >
                <p className="mb-1 text-[11px]" style={{ color: 'var(--t4)' }}>
                  Entreprise
                </p>
                <p className="text-[17px] font-bold" style={{ color: 'var(--t1)' }}>
                  Transports Dupont &amp; Fils
                </p>
                <p className="mt-0.5 text-[12.5px]" style={{ color: 'var(--t3)' }}>
                  SIREN <span className="num">823 456 789</span> · Île-de-France
                </p>
              </div>

              {/* ClearGo Score */}
              <div
                className="mt-4 flex items-center justify-between gap-4 rounded-xl border px-5 py-4"
                style={{ borderColor: 'var(--line)' }}
              >
                <div>
                  <p
                    className="mb-1 text-[10.5px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: 'var(--t4)' }}
                  >
                    ClearGo Score
                  </p>
                  <p
                    className="num text-[34px] font-bold leading-none"
                    style={{ color: 'var(--cleargo-navy)', letterSpacing: '-1.5px' }}
                  >
                    820
                    <span
                      className="text-[13px] font-medium"
                      style={{ color: 'var(--t4)' }}
                    >
                      {' '}/ 1000
                    </span>
                  </p>
                </div>
                <span
                  className="shrink-0 rounded-full px-4 py-2 text-[11.5px] font-bold uppercase tracking-[0.1em] text-white"
                  style={{ background: 'var(--score-maitrise-text)' }}
                >
                  Maîtrisé
                </span>
              </div>

              {/* Sous-scores */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div
                  className="rounded-xl px-4 py-3"
                  style={{ background: 'var(--surface)' }}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: 'var(--cleargo-navy)' }}
                    />
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: 'var(--t4)' }}
                    >
                      Réglo
                    </span>
                  </div>
                  <div
                    className="num text-[17px] font-bold"
                    style={{ color: 'var(--cleargo-navy)' }}
                  >
                    418
                    <span
                      className="text-[11px] font-medium"
                      style={{ color: 'var(--t4)' }}
                    >
                      /500
                    </span>
                  </div>
                </div>

                <div
                  className="rounded-xl px-4 py-3"
                  style={{ background: 'var(--green-pale)' }}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: 'var(--green-cta)' }}
                    />
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: 'var(--green-text)' }}
                    >
                      Excellence
                    </span>
                  </div>
                  <div
                    className="num text-[17px] font-bold"
                    style={{ color: 'var(--green-text)' }}
                  >
                    402
                    <span
                      className="text-[11px] font-medium"
                      style={{ color: 'var(--t4)' }}
                    >
                      /500
                    </span>
                  </div>
                </div>
              </div>

              {/* Profil vérifié + QR */}
              <div
                className="mt-4 flex items-center gap-4 rounded-xl border px-4 py-4"
                style={{
                  borderColor: 'var(--line)',
                  background: 'var(--white)',
                }}
              >
                <div
                  className="shrink-0 rounded-lg border p-1.5"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <QrStylise size={72} />
                </div>
                <div>
                  <p className="text-[13.5px] font-bold" style={{ color: 'var(--t1)' }}>
                    Profil vérifié
                  </p>
                  <p
                    className="mt-1 text-[12.5px] leading-snug"
                    style={{ color: 'var(--t3)' }}
                  >
                    Scannez le QR code pour consulter le profil à jour sur
                    cleargo.fr/verifier
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 px-1 text-[12.5px] leading-snug" style={{ color: 'var(--t4)' }}>
              Exemple de restitution. Votre profil dépend du périmètre réellement
              applicable à votre activité.
            </p>
          </div>

          {/* ── Caractéristiques + destinataires ─────────────────────────── */}
          <div>
            <div className="flex flex-col gap-5">
              {CARACTERISTIQUES.map((c, i) => (
                <div
                  key={c.label}
                  className="flex items-start gap-4"
                  style={enter(400 + i * 100)}
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: 'var(--white)', border: '1px solid var(--line)' }}
                  >
                    <ClearGoIcon
                      name={c.icone}
                      size={22}
                      style={{ color: 'var(--cleargo-navy)' }}
                    />
                  </div>
                  <div>
                    <p className="text-[15px] font-bold" style={{ color: 'var(--t1)' }}>
                      {c.label}
                    </p>
                    <p className="mt-0.5 text-[13.5px]" style={{ color: 'var(--t3)' }}>
                      {c.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="cg-card mt-10 p-6" style={enter(800)}>
              <p
                className="mb-4 text-[10.5px] font-bold uppercase tracking-[0.14em]"
                style={{ color: 'var(--t4)' }}
              >
                À qui le montrer ?
              </p>
              <div className="flex flex-col gap-3.5">
                {DESTINATAIRES.map((d) => (
                  <div key={d.qui} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: 'var(--green-cta)' }}
                    />
                    <p className="text-[13.5px] leading-snug">
                      <span className="font-bold" style={{ color: 'var(--t1)' }}>
                        {d.qui}
                      </span>
                      <span style={{ color: 'var(--t3)' }}> — {d.pourquoi}</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Ce qui sort du profil, et ce qui n'en sort jamais. */}
              <div
                className="mt-6 grid gap-px overflow-hidden rounded-lg sm:grid-cols-2"
                style={{ background: 'var(--line)', border: '1px solid var(--line)' }}
              >
                <div className="bg-white p-4">
                  <p
                    className="mb-2.5 text-[10.5px] font-bold uppercase tracking-[0.12em]"
                    style={{ color: 'var(--green-text)' }}
                  >
                    Ce qu’ils voient
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {[
                      'Votre score et votre palier',
                      'La date de votre dernière évaluation',
                      'Votre taux de réponse aux vérifications',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] leading-snug" style={{ color: 'var(--t3)' }}>
                        <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ background: 'var(--green-cta)' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-4">
                  <p
                    className="mb-2.5 text-[10.5px] font-bold uppercase tracking-[0.12em]"
                    style={{ color: 'var(--t4)' }}
                  >
                    Ce qu’ils ne voient jamais
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {[
                      'Le détail de vos écarts',
                      'Vos documents',
                      'Vos actions en cours',
                      'Vos conducteurs et vos immatriculations',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] leading-snug" style={{ color: 'var(--t3)' }}>
                        <span aria-hidden="true" className="mt-[9px] h-px w-2.5 shrink-0" style={{ background: 'var(--t5, #94A3B8)' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-3.5 text-[13px]" style={{ color: 'var(--t4)' }}>
                Vous pouvez couper le partage à tout moment depuis vos paramètres.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
