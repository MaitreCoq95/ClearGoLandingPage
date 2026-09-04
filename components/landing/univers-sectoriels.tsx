'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ClearGoIcon, type ClearGoIconName } from '@/components/icons/cleargo-icon'
import { useReveal } from '@/hooks/use-reveal'

/**
 * Univers sectoriels ClearGo.
 * Chaque univers décrit un contexte d'exploitation et les référentiels qui s'y
 * rattachent — jamais une promesse d'exhaustivité.
 */
type Univers = {
  id: string
  titre: string
  icone: ClearGoIconName
  description: string
  referentiels: string[]
  /** Absente tant que la photo du secteur n'est pas produite. */
  photo?: string
  alt?: string
}

const UNIVERS: Univers[] = [
  {
    id: 'agroalimentaire',
    photo: '/images/univers-agro.webp',
    alt: 'Quai de chargement frigorifique, vapeur froide séchappant de la remorque',
    titre: 'Température dirigée — Agroalimentaire',
    icone: 'ifs',
    description:
      "Les exigences propres aux flux alimentaires sous température contrôlée : chaîne du froid, traçabilité, HACCP, IFS Logistics.",
    referentiels: ['ATP', 'IFS Logistics', 'HACCP'],
  },
  {
    id: 'pharma',
    titre: 'Température dirigée — Pharma',
    icone: 'gdp',
    description:
      "Un niveau d'exigence distinct : GDP, qualification des équipements, traçabilité continue, gestion des excursions de température.",
    referentiels: ['GDP', 'ATP', 'ISO 9001'],
  },
  {
    id: 'dernier-kilometre',
    photo: '/images/univers-dernier-km.webp',
    alt: 'Livraison urbaine en double file dans une rue parisienne encombrée',
    titre: 'Dernier kilomètre & décarbonation',
    icone: 'critair-zfe',
    description:
      "Livraison urbaine, ZFE, Crit'Air, transition énergétique de la flotte, reporting CO2.",
    referentiels: ["ZFE / Crit'Air", 'ISO 14001', 'Reporting CO2'],
  },
  {
    id: 'international',
    photo: '/images/univers-international.webp',
    alt: 'Ensemble routier européen sur une cour de dépôt à l’heure bleue',
    titre: 'International',
    icone: 'oea-douane',
    description:
      'Cabotage, détachement, SIPSI, réglementations trans-frontalières, gestion des conducteurs en mobilité.',
    referentiels: ['Cabotage', 'SIPSI', 'OEA / AEO'],
  },
  // TODO: wording "Break bulk" à valider avec Wyssam
  {
    id: 'break-bulk',
    photo: '/images/univers-break-bulk.webp',
    alt: 'Convoi exceptionnel escorté sur une route secondaire',
    titre: 'Break bulk & opérations hors flux standard',
    icone: 'transport-exceptionnel',
    description:
      'Transport exceptionnel, marchandises hors gabarit, opérations nécessitant des compétences et des preuves spécifiques.',
    referentiels: ['Transport exceptionnel', 'Arrimage', 'ADR'],
  },
]

/**
 * Relevé de chaîne du froid.
 *
 * Tient la place du visuel pour le pharma, qui n'a pas de photo. Plutôt qu'une
 * icône seule dans un carré vide — qui se lirait comme une image manquante à
 * côté des quatre onglets illustrés — on reprend le langage des panneaux
 * maquettés déjà utilisés ailleurs sur la page. C'est aussi ce qui distingue le
 * mieux le pharma de l'agroalimentaire : l'instrumentation.
 */
function ReleveTemperature() {
  // Tracé fictif, borné entre 2 et 8 °C.
  const points = [5.1, 4.8, 5.4, 5.0, 4.6, 5.2, 5.6, 5.3, 4.9, 5.1, 4.7, 5.0]
  const toY = (t: number) => 62 - ((t - 2) / 6) * 52
  const path = points
    .map((t, i) => `${i === 0 ? 'M' : 'L'} ${8 + (i * 184) / (points.length - 1)} ${toY(t).toFixed(1)}`)
    .join(' ')

  return (
    <div
      className="flex flex-col overflow-hidden rounded-xl"
      style={{ aspectRatio: '1 / 1', border: '1px solid var(--line)', background: 'var(--white)' }}
    >
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ background: 'var(--cleargo-navy)' }}
      >
        <span className="text-[12px] font-bold text-white">Chaîne du froid</span>
        <span className="num text-[11px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
          04 h 20
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center px-4 py-5">
        <svg viewBox="0 0 200 70" className="w-full" role="img" aria-label="Relevé de température stable entre 2 et 8 degrés">
          {/* Plage autorisée */}
          <rect x="8" y={toY(8)} width="184" height={toY(2) - toY(8)} fill="var(--green-pale)" />
          <line x1="8" y1={toY(8)} x2="192" y2={toY(8)} stroke="var(--green)" strokeWidth="0.8" strokeDasharray="3 2" opacity=".5" />
          <line x1="8" y1={toY(2)} x2="192" y2={toY(2)} stroke="var(--green)" strokeWidth="0.8" strokeDasharray="3 2" opacity=".5" />
          <path d={path} fill="none" stroke="var(--cleargo-navy)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div className="mt-4 flex items-baseline justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--t4)' }}>
            Plage cible
          </span>
          <span className="num text-[15px] font-bold" style={{ color: 'var(--cleargo-navy)' }}>
            2 – 8 °C
          </span>
        </div>
      </div>

      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ background: 'var(--green-pale)', borderTop: '1px solid var(--line)' }}
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8.5L6.5 12L13 4.5" stroke="var(--green-text)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[12.5px] font-bold" style={{ color: 'var(--green-text)' }}>
          Aucune excursion sur le trajet
        </span>
      </div>
    </div>
  )
}

function UniversContenu({ univers }: { univers: Univers }) {
  return (
    <div className="grid gap-7 md:grid-cols-[minmax(0,300px)_1fr] md:items-start">
      {univers.photo ? (
        <div
          className="relative overflow-hidden rounded-xl"
          style={{ aspectRatio: '1 / 1', border: '1px solid var(--line)' }}
        >
          <Image
            src={univers.photo}
            alt={univers.alt ?? ''}
            fill
            sizes="(max-width: 768px) 92vw, 300px"
            className="object-cover"
          />
        </div>
      ) : (
        <ReleveTemperature />
      )}

      <div>
      <div className="flex items-start gap-4">
        <ClearGoIcon
          name={univers.icone}
          size={36}
          className="shrink-0"
          style={{ color: 'var(--cleargo-navy)' }}
        />
        <div>
          <h3
            className="text-[19px] font-bold leading-snug"
            style={{ color: 'var(--t1)' }}
          >
            {univers.titre}
          </h3>
          <p
            className="mt-3 max-w-[620px] text-[15px] leading-relaxed"
            style={{ color: 'var(--t3)' }}
          >
            {univers.description}
          </p>
        </div>
      </div>

      <div className="mt-6 border-t pt-5" style={{ borderColor: 'var(--line)' }}>
        <div
          className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em]"
          style={{ color: 'var(--t4)' }}
        >
          Référentiels concernés
        </div>
        <div className="flex flex-wrap gap-2">
          {univers.referentiels.map((r) => (
            <span
              key={r}
              className="rounded-lg px-3 py-1.5 text-[13px] font-semibold"
              style={{ background: 'var(--green-pale)', color: 'var(--green-text)' }}
            >
              {r}
            </span>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}

export function UniversSectoriels() {
  const { ref, visible } = useReveal<HTMLDivElement>()
  const [actif, setActif] = useState(0)
  const [ouvert, setOuvert] = useState<number | null>(0)

  const enter = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s var(--ease-apple) ${delay}ms, transform .7s var(--ease-apple) ${delay}ms`,
  })

  return (
    <section
      id="univers-sectoriels"
      className="py-24 lg:py-28"
      style={{ background: 'var(--white)' }}
    >
      <div ref={ref} className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="section-eyebrow mb-5" style={enter(0)}>
          Univers sectoriels
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
          Votre spécialité compte
        </h2>

        {/* ── Desktop ≥ 768px : onglets ──────────────────────────────────── */}
        <div className="mt-12 hidden md:block" style={enter(200)}>
          <div
            role="tablist"
            aria-label="Univers sectoriels"
            className="flex flex-wrap gap-2 border-b pb-4"
            style={{ borderColor: 'var(--line)' }}
          >
            {UNIVERS.map((u, i) => {
              const on = i === actif
              return (
                <button
                  key={u.id}
                  role="tab"
                  id={`univers-tab-${u.id}`}
                  aria-selected={on}
                  aria-controls={`univers-panel-${u.id}`}
                  onClick={() => setActif(i)}
                  className="btn-press inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-left text-[13.5px] font-semibold"
                  style={{
                    borderColor: on ? 'var(--cleargo-navy)' : 'var(--line)',
                    background: on ? 'var(--cleargo-navy)' : 'var(--white)',
                    color: on ? '#FFFFFF' : 'var(--t3)',
                  }}
                >
                  <ClearGoIcon
                    name={u.icone}
                    size={18}
                    className="shrink-0"
                    style={{ color: on ? '#FFFFFF' : 'var(--cleargo-navy)' }}
                  />
                  {u.titre}
                </button>
              )
            })}
          </div>

          <div
            key={UNIVERS[actif].id}
            role="tabpanel"
            id={`univers-panel-${UNIVERS[actif].id}`}
            aria-labelledby={`univers-tab-${UNIVERS[actif].id}`}
            className="cg-card mt-8 p-7 lg:p-9"
            style={{ animation: 'fadeIn .2s var(--ease-apple)' }}
          >
            <UniversContenu univers={UNIVERS[actif]} />
          </div>
        </div>

        {/* ── Mobile < 768px : accordéon ─────────────────────────────────── */}
        <div className="mt-10 flex flex-col gap-3 md:hidden" style={enter(200)}>
          {UNIVERS.map((u, i) => {
            const on = i === ouvert
            return (
              <div key={u.id} className="cg-card overflow-hidden">
                <button
                  onClick={() => setOuvert(on ? null : i)}
                  aria-expanded={on}
                  aria-controls={`univers-acc-${u.id}`}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left"
                >
                  <ClearGoIcon
                    name={u.icone}
                    size={22}
                    className="shrink-0"
                    style={{ color: 'var(--cleargo-navy)' }}
                  />
                  <span
                    className="flex-1 text-[14.5px] font-bold leading-snug"
                    style={{ color: 'var(--t1)' }}
                  >
                    {u.titre}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-[15px] font-bold"
                    style={{
                      color: 'var(--t4)',
                      transform: on ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform .2s var(--ease-apple)',
                    }}
                  >
                    ⌄
                  </span>
                </button>

                {on ? (
                  <div
                    id={`univers-acc-${u.id}`}
                    className="border-t px-5 pt-5 pb-6"
                    style={{
                      borderColor: 'var(--line)',
                      animation: 'fadeIn .2s var(--ease-apple)',
                    }}
                  >
                    <p
                      className="text-[14.5px] leading-relaxed"
                      style={{ color: 'var(--t3)' }}
                    >
                      {u.description}
                    </p>
                    <div
                      className="mt-4 mb-2 text-[11px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: 'var(--t4)' }}
                    >
                      Référentiels concernés
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {u.referentiels.map((r) => (
                        <span
                          key={r}
                          className="rounded-lg px-3 py-1.5 text-[12.5px] font-semibold"
                          style={{
                            background: 'var(--green-pale)',
                            color: 'var(--green-text)',
                          }}
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
