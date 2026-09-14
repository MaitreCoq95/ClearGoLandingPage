'use client'

import { useCallback, useEffect, useState } from 'react'
import { ClearGoIcon } from '@/components/icons/cleargo-icon'
import {
  FUNNEL_QUESTIONS,
  LICENCE_URGENCE_JOURS,
  ROLE_TRANSPORT_CODES,
  fleetBucketFromProxy,
  mapUrgence,
  parseFleetSize,
} from '@/config/funnel-questions'
import {
  APP_BASE_URL,
  CALENDLY_URL,
  ESPACE_CLEARGO_URL,
  GUIDE_CONFORMITE_URL,
  WEBINAIRE_DATE,
  WEBINAIRE_URL,
} from '@/config/site-links'

// ── Chrome SVG (aucune librairie d'icônes externe) ──────────────────────────

const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)
const IconBack = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M12 4L6 10l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Spinner = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="animate-spin">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity=".25" />
    <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

// ── SIRET ───────────────────────────────────────────────────────────────────

/** Masque de saisie 3-3-3-5 : 424 644 201 00032 */
function formatSiret(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 14)
  return [d.slice(0, 3), d.slice(3, 6), d.slice(6, 9), d.slice(9, 14)].filter(Boolean).join(' ')
}

/** Luhn — validation locale indicative, jamais bloquante côté serveur. */
function isLuhnValid(siret: string): boolean {
  if (siret.length !== 14) return false
  let sum = 0
  for (let i = 0; i < 14; i++) {
    let n = Number(siret[13 - i])
    if (i % 2 === 1) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
  }
  return sum % 10 === 0
}

interface RegistryData {
  raison_sociale?: string
  gestionnaire_transport?: string
  commune?: string
  departement?: string
  licence_active?: boolean
  fin_validite_lti?: string | null
  fin_validite_lc?: string | null
  jours_avant_expiration?: number | null
  proxy_flotte?: number | null
}

type SiretStatus = 'idle' | 'loading' | 'found' | 'not_found' | 'unavailable'

/** Réponse de /api/qualify — déjà assainie côté serveur. */
interface QualifyResult {
  status: string
  urgence_licence: number | null
  compte_cree: boolean
  redirect_url: string | null
  perimetre: { referentiels: string[]; nb_domaines: number } | null
}

// ── Composant ───────────────────────────────────────────────────────────────

interface PrequalFunnelProps {
  open: boolean
  onClose: () => void
  /** SIRET déjà saisi ailleurs sur la page, repris tel quel à l'ouverture. */
  initialSiret?: string
}

const TOTAL_Q = FUNNEL_QUESTIONS.length

export function PrequalFunnel({ open, onClose, initialSiret }: PrequalFunnelProps) {
  // phase : 'siret' → 'questions' → 'contact' → 'sortie'
  const [phase, setPhase] = useState<'siret' | 'questions' | 'contact' | 'sortie'>('siret')
  const [step, setStep] = useState(0)

  const [siret, setSiret] = useState('')
  const [siretStatus, setSiretStatus] = useState<SiretStatus>('idle')
  const [registry, setRegistry] = useState<RegistryData | null>(null)

  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [email, setEmail] = useState('')
  const [prenom, setPrenom] = useState('')
  const [telephone, setTelephone] = useState('')
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)
  const [qualification, setQualification] = useState<QualifyResult | null>(null)

  const digits = siret.replace(/\D/g, '')
  const joursAvantExpiration = registry?.jours_avant_expiration ?? null
  const licenceUrgente =
    joursAvantExpiration !== null && joursAvantExpiration < LICENCE_URGENCE_JOURS

  const urgenceDeclaree = typeof answers.urgence === 'string' ? answers.urgence : undefined
  // L'expiration de licence prime sur l'urgence déclarée.
  const niveauUrgence = licenceUrgente ? 'urgent_chaud' : mapUrgence(urgenceDeclaree)

  const reset = useCallback(() => {
    setPhase('siret')
    setStep(0)
    setSiret('')
    setSiretStatus('idle')
    setRegistry(null)
    setAnswers({})
    setEmail('')
    setPrenom('')
    setTelephone('')
    setSending(false)
    setSendError(false)
    setQualification(null)
  }, [])

  // Verrouille le scroll pendant l'ouverture
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) {
      const t = setTimeout(reset, 300)
      return () => {
        clearTimeout(t)
        document.body.style.overflow = ''
      }
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, reset])

  // Reprend le SIRET déjà saisi dans la section d'inscription
  useEffect(() => {
    if (open && initialSiret) setSiret(formatSiret(initialSiret))
  }, [open, initialSiret])

  // Échap ferme
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  // Vérification au registre dès 14 chiffres saisis
  useEffect(() => {
    if (digits.length !== 14) {
      setSiretStatus('idle')
      setRegistry(null)
      return
    }

    let cancelled = false
    setSiretStatus('loading')

    fetch(`/api/verify-siret/${digits}`)
      .then((r) => r.json())
      .then((data: RegistryData & { found?: boolean; reason?: string }) => {
        if (cancelled) return
        if (data.found) {
          setRegistry(data)
          setSiretStatus('found')
          // Pré-remplissage de la taille de flotte depuis le registre
          const bucket = fleetBucketFromProxy(data.proxy_flotte)
          if (bucket) setAnswers((prev) => ({ ...prev, taille_flotte: bucket }))
        } else {
          setRegistry(null)
          setSiretStatus(data.reason === 'registry_unavailable' ? 'unavailable' : 'not_found')
        }
      })
      .catch(() => {
        if (!cancelled) setSiretStatus('unavailable')
      })

    return () => {
      cancelled = true
    }
  }, [digits])

  function answer(id: string, value: string, multiple?: boolean) {
    if (multiple) {
      setAnswers((prev) => {
        const cur = Array.isArray(prev[id]) ? (prev[id] as string[]) : []
        return {
          ...prev,
          [id]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value],
        }
      })
      return
    }
    setAnswers((prev) => ({ ...prev, [id]: value }))
    if (step < TOTAL_Q - 1) setStep(step + 1)
    else setPhase('contact')
  }

  function goBack() {
    if (phase === 'contact') {
      setPhase('questions')
      setStep(TOTAL_Q - 1)
      return
    }
    if (phase === 'questions') {
      if (step === 0) setPhase('siret')
      else setStep(step - 1)
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setSendError(false)

    const zones = Array.isArray(answers.zones_livraison) ? (answers.zones_livraison as string[]) : []
    const roleLabel = typeof answers.role_transport === 'string' ? answers.role_transport : ''

    try {
      const res = await fetch('/api/qualify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siret: digits || null,
          siret_non_verifie: siretStatus !== 'found',
          raison_sociale: registry?.raison_sociale ?? '',
          email,
          prenom,
          telephone,
          q_type_marchandise: answers.type_marchandise ?? '',
          q_zones_livraison: zones,
          q_nb_vehicules_declare: parseFleetSize(answers.taille_flotte as string | undefined),
          q_role_transport: ROLE_TRANSPORT_CODES[roleLabel] ?? '',
          q_besoin_principal: answers.besoin_principal ?? '',
          q_urgence: answers.urgence ?? '',
        }),
      })
      const json = (await res.json()) as QualifyResult
      if (json.status !== 'ok') throw new Error('refused')
      setQualification(json)
      setPhase('sortie')
    } catch {
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  if (!open) return null

  const q = FUNNEL_QUESTIONS[step]
  const currentValue = q ? answers[q.id] : undefined
  const multiSelection = Array.isArray(currentValue) ? currentValue : []

  const headerLabel =
    phase === 'siret'
      ? 'Votre entreprise'
      : phase === 'questions'
        ? `Question ${step + 1} sur ${TOTAL_Q}`
        : phase === 'contact'
          ? 'Dernière étape'
          : 'Votre prochain pas'

  const progress =
    phase === 'siret' ? 0 : phase === 'questions' ? ((step + 1) / (TOTAL_Q + 1)) * 100 : 100

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Pré-qualification ClearGo"
    >
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(13,43,94,0.6)', animation: 'fadeIn .2s ease both' }}
        onClick={onClose}
      />

      <div
        className="relative flex w-full flex-col overflow-hidden bg-white shadow-2xl sm:max-w-lg sm:rounded-2xl"
        style={{
          maxHeight: '92vh',
          borderRadius: '20px 20px 0 0',
          animation: 'slideDownModal .3s var(--ease-spring) both',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b px-5 pt-4 pb-3" style={{ borderColor: 'var(--line-l)' }}>
          <button
            onClick={goBack}
            aria-label="Revenir à l'étape précédente"
            className="rounded-lg p-2"
            style={{
              visibility: phase === 'questions' || phase === 'contact' ? 'visible' : 'hidden',
              color: 'var(--t4)',
            }}
          >
            <IconBack />
          </button>
          <p className="flex-1 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: 'var(--green-text)' }}>
            {headerLabel}
          </p>
          <button onClick={onClose} aria-label="Fermer" className="rounded-lg p-2" style={{ color: 'var(--t4)' }}>
            <IconClose />
          </button>
        </div>

        {/* Progression */}
        {phase !== 'sortie' && (
          <div className="h-[3px]" style={{ background: 'var(--line-l)' }}>
            <div
              className="h-full"
              style={{
                width: `${progress}%`,
                background: 'var(--green-cta)',
                transition: 'width .45s var(--ease-smooth)',
              }}
            />
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">

          {/* ═══ Étape 0 — SIRET ═══════════════════════════════════════════ */}
          {phase === 'siret' && (
            <div>
              <h3 className="mb-2 text-[22px] font-black leading-tight" style={{ color: 'var(--cleargo-navy)' }}>
                Votre numéro SIRET
              </h3>
              <p className="mb-5 text-[14px] leading-relaxed" style={{ color: 'var(--t3)' }}>
                Nous vérifions votre inscription au registre national des transporteurs.
              </p>

              <label htmlFor="siret" className="mb-1.5 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider" style={{ color: 'var(--cleargo-navy)' }}>
                SIRET
                {siretStatus === 'loading' && <span style={{ color: 'var(--green)' }}><Spinner /></span>}
              </label>
              <input
                id="siret"
                inputMode="numeric"
                autoComplete="off"
                value={siret}
                onChange={(e) => setSiret(formatSiret(e.target.value))}
                placeholder="424 644 201 00032"
                className="num w-full rounded-xl border-2 px-4 py-3.5 text-[16px] font-medium outline-none"
                style={{
                  borderColor:
                    siretStatus === 'found'
                      ? 'var(--green)'
                      : siretStatus === 'not_found'
                        ? 'var(--reglo-orange)'
                        : 'var(--line)',
                  background: siretStatus === 'found' ? 'var(--green-pale)' : 'var(--surface)',
                  color: 'var(--cleargo-navy)',
                }}
                autoFocus
              />
              <p className="mt-1.5 text-[11px]" style={{ color: 'var(--t4)' }}>
                14 chiffres
                {digits.length === 14 && !isLuhnValid(digits) && (
                  <span style={{ color: 'var(--reglo-orange)' }}> · ce numéro semble comporter une erreur de saisie</span>
                )}
              </p>

              {/* Cas 1 & 2 — trouvé */}
              {siretStatus === 'found' && registry && (
                <div className="mt-5">
                  <div
                    className="rounded-xl border p-4"
                    style={{ borderColor: 'rgba(39,174,96,0.35)', background: 'var(--green-pale)' }}
                  >
                    <p className="mb-2 flex items-center gap-2 text-[12px] font-bold" style={{ color: 'var(--green-text)' }}>
                      <IconCheck />
                      Nous avons trouvé votre entreprise
                    </p>
                    <p className="text-[15px] font-black" style={{ color: 'var(--cleargo-navy)' }}>
                      {registry.raison_sociale}
                    </p>
                    <div className="mt-2 flex flex-col gap-1 text-[12.5px]" style={{ color: 'var(--t3)' }}>
                      {registry.gestionnaire_transport && (
                        <span>Gestionnaire : {registry.gestionnaire_transport}</span>
                      )}
                      {registry.commune && (
                        <span>
                          {registry.commune}
                          {registry.departement ? ` (${registry.departement})` : ''}
                        </span>
                      )}
                      {registry.fin_validite_lti && (
                        <span>Licence de transport valide jusqu’au {registry.fin_validite_lti}</span>
                      )}
                      {registry.proxy_flotte != null && (
                        <span>
                          <span className="num">{registry.proxy_flotte}</span> copies conformes déclarées
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Cas 2 — licence proche de l'expiration. Ton factuel, pas alarmiste. */}
                  {licenceUrgente && (
                    <div
                      className="mt-3 flex gap-3 rounded-xl border p-4"
                      style={{ borderColor: 'rgba(249,115,22,0.4)', background: 'rgba(249,115,22,0.07)' }}
                    >
                      <ClearGoIcon name="expiration" size={22} className="mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[13px] font-bold" style={{ color: 'var(--cleargo-navy)' }}>
                          Votre licence de transport expire dans{' '}
                          <span className="num">{joursAvantExpiration}</span> jours.
                        </p>
                        <p className="mt-1 text-[12.5px]" style={{ color: 'var(--t3)' }}>
                          Le renouvellement se fait auprès de la DREAL. Si ce n’est pas encore
                          engagé, c’est la priorité absolue.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        setSiret('')
                        setRegistry(null)
                        setSiretStatus('idle')
                      }}
                      className="rounded-xl border px-4 py-3 text-[13px] font-semibold sm:flex-1"
                      style={{ borderColor: 'var(--line)', color: 'var(--t3)' }}
                    >
                      Ce n’est pas mon entreprise
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhase('questions')}
                      className="btn-press rounded-xl px-5 py-3 text-[14px] font-bold text-white sm:flex-1"
                      style={{ background: 'var(--green-cta)' }}
                    >
                      Continuer →
                    </button>
                  </div>
                </div>
              )}

              {/* Cas 3 — non trouvé. On n'accuse pas, on ne bloque pas. */}
              {(siretStatus === 'not_found' || siretStatus === 'unavailable') && (
                <div className="mt-5">
                  <div className="rounded-xl border p-4" style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}>
                    <p className="text-[13.5px] font-semibold" style={{ color: 'var(--cleargo-navy)' }}>
                      {siretStatus === 'not_found'
                        ? 'Ce SIRET n’apparaît pas au registre national des transporteurs.'
                        : 'La vérification au registre est momentanément indisponible.'}
                    </p>
                    {siretStatus === 'not_found' && (
                      <ul className="mt-2 flex flex-col gap-1 text-[12.5px]" style={{ color: 'var(--t3)' }}>
                        <li>· Une erreur de saisie</li>
                        <li>· Votre inscription est très récente et pas encore publiée</li>
                        <li>· Votre activité ne relève pas du transport routier de marchandises</li>
                      </ul>
                    )}
                  </div>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        setSiret('')
                        setSiretStatus('idle')
                      }}
                      className="rounded-xl border px-4 py-3 text-[13px] font-semibold sm:flex-1"
                      style={{ borderColor: 'var(--line)', color: 'var(--t3)' }}
                    >
                      Corriger le SIRET
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhase('questions')}
                      className="btn-press rounded-xl px-5 py-3 text-[14px] font-bold text-white sm:flex-1"
                      style={{ background: 'var(--cleargo-navy)' }}
                    >
                      Continuer quand même →
                    </button>
                  </div>
                </div>
              )}

              <p className="mt-5 text-center text-[11.5px]" style={{ color: 'var(--t4)' }}>
                Gratuit · Sans engagement · Réservé aux transporteurs routiers
              </p>
            </div>
          )}

          {/* ═══ Questions ═════════════════════════════════════════════════ */}
          {phase === 'questions' && q && (
            <div key={q.id} style={{ animation: 'fadeUp .3s var(--ease-apple) both' }}>
              <h3 className="mb-1 text-[20px] font-black leading-tight" style={{ color: 'var(--cleargo-navy)' }}>
                {q.label}
              </h3>
              {q.multiple && (
                <p className="mb-4 text-[12.5px]" style={{ color: 'var(--t4)' }}>
                  Plusieurs réponses possibles.
                </p>
              )}

              <div className={`flex flex-col gap-2.5 ${q.multiple ? '' : 'mt-4'}`}>
                {q.options.map((opt) => {
                  const selected = q.multiple ? multiSelection.includes(opt) : currentValue === opt
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => answer(q.id, opt, q.multiple)}
                      className="btn-press w-full rounded-xl border-2 px-5 py-4 text-left text-[14.5px] font-semibold"
                      style={{
                        borderColor: selected ? 'var(--green)' : 'var(--line)',
                        background: selected ? 'var(--green-pale)' : 'var(--surface)',
                        color: selected ? 'var(--cleargo-navy)' : 'var(--t3)',
                      }}
                    >
                      <span className="flex items-center gap-3.5">
                        <span
                          className="flex h-5 w-5 shrink-0 items-center justify-center border-2 text-white"
                          style={{
                            borderRadius: q.multiple ? 6 : 999,
                            borderColor: selected ? 'var(--green)' : 'var(--line)',
                            background: selected ? 'var(--green)' : 'transparent',
                          }}
                        >
                          {selected && <IconCheck />}
                        </span>
                        {opt}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Valeur pré-remplie depuis le registre */}
              {q.prefillHint && registry?.proxy_flotte != null && (
                <p className="mt-3 text-[12px]" style={{ color: 'var(--t4)' }}>
                  {q.prefillHint} Registre : <span className="num">{registry.proxy_flotte}</span> copies
                  conformes déclarées.
                </p>
              )}

              {q.multiple && (
                <button
                  type="button"
                  disabled={multiSelection.length === 0}
                  onClick={() => (step < TOTAL_Q - 1 ? setStep(step + 1) : setPhase('contact'))}
                  className="btn-press mt-4 w-full rounded-xl py-3.5 text-[15px] font-bold text-white disabled:pointer-events-none disabled:opacity-40"
                  style={{ background: 'var(--green-cta)' }}
                >
                  Continuer →
                </button>
              )}
            </div>
          )}

          {/* ═══ Contact ═══════════════════════════════════════════════════ */}
          {phase === 'contact' && (
            <form onSubmit={submit} style={{ animation: 'fadeUp .3s var(--ease-apple) both' }}>
              <h3 className="mb-2 text-[20px] font-black leading-tight" style={{ color: 'var(--cleargo-navy)' }}>
                Où vous joindre ?
              </h3>
              <p className="mb-5 text-[14px]" style={{ color: 'var(--t3)' }}>
                Nous vous ouvrons votre espace et vous proposons la suite adaptée à votre situation.
              </p>

              <div className="flex flex-col gap-3.5">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider" style={{ color: 'var(--cleargo-navy)' }}>
                    Email professionnel
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jean@transports-dupont.fr"
                    className="w-full rounded-xl border-2 px-4 py-3.5 text-[15px] outline-none"
                    style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--cleargo-navy)' }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="prenom" className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider" style={{ color: 'var(--cleargo-navy)' }}>
                      Prénom
                    </label>
                    <input
                      id="prenom"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      className="w-full rounded-xl border-2 px-4 py-3 text-[15px] outline-none"
                      style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--cleargo-navy)' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="tel" className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider" style={{ color: 'var(--cleargo-navy)' }}>
                      Téléphone
                    </label>
                    <input
                      id="tel"
                      type="tel"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      className="num w-full rounded-xl border-2 px-4 py-3 text-[15px] outline-none"
                      style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--cleargo-navy)' }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="btn-press mt-5 w-full rounded-xl py-4 text-[15px] font-extrabold text-white disabled:pointer-events-none disabled:opacity-50"
                style={{ background: 'var(--green-cta)' }}
              >
                {sending ? 'Envoi…' : 'Voir ma suite →'}
              </button>
              {sendError && (
                <p className="mt-2 text-center text-[12px]" style={{ color: 'var(--score-insuffisant)' }}>
                  L’envoi a échoué. Réessayez dans un instant.
                </p>
              )}
              <p className="mt-3 text-center text-[11.5px]" style={{ color: 'var(--t4)' }}>
                Vos données restent en France · Sans engagement
              </p>
            </form>
          )}

          {/* ═══ Sortie conditionnelle ═════════════════════════════════════ */}
          {phase === 'sortie' && (
            <SortieConditionnelle
              niveau={niveauUrgence}
              // Le registre peut n'avoir rien renvoyé alors que La Bergerie a
              // retrouvé le prospect au moment de la qualification : on prend
              // alors l'échéance qu'elle nous remonte.
              jours={joursAvantExpiration ?? qualification?.urgence_licence ?? null}
              result={qualification}
              onClose={onClose}
            />
          )}
        </div>

        <div className="h-1 shrink-0" style={{ background: 'var(--green-cta)' }} />
      </div>
    </div>
  )
}

// ── Écran de sortie ─────────────────────────────────────────────────────────

function ActionButton({
  href,
  label,
  primary,
  disabledNote,
}: {
  href: string | null
  label: string
  primary?: boolean
  disabledNote?: string
}) {
  const base = 'btn-press block w-full rounded-xl px-5 py-3.5 text-center text-[14px] font-bold'

  if (!href) {
    return (
      <div>
        <span
          className={`${base} cursor-not-allowed opacity-55`}
          style={{
            background: primary ? 'var(--green)' : 'transparent',
            border: primary ? 'none' : '1px solid var(--line)',
            color: primary ? '#fff' : 'var(--t3)',
          }}
        >
          {label}
        </span>
        {disabledNote && (
          <p className="mt-1 text-center text-[11px]" style={{ color: 'var(--t4)' }}>
            {disabledNote}
          </p>
        )}
      </div>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={base}
      style={{
        background: primary ? 'var(--green)' : 'transparent',
        border: primary ? 'none' : '1px solid var(--line)',
        color: primary ? '#fff' : 'var(--cleargo-navy)',
      }}
    >
      {label}
    </a>
  )
}

function SortieConditionnelle({
  niveau,
  jours,
  result,
  onClose,
}: {
  niveau: 'urgent_chaud' | 'tiede' | 'froid'
  jours: number | null
  result: QualifyResult | null
  onClose: () => void
}) {
  const perimetre = result?.perimetre ?? null

  /*
   * La Bergerie renvoie un chemin relatif — le proxy refuse toute URL absolue.
   * Mais l'onboarding vit sur l'espace client, pas sur la landing : sans base
   * configurée, « /onboarding/populations » tomberait sur notre 404.
   */
  const redirectPath = result?.redirect_url ?? null
  const redirectUrl = redirectPath && APP_BASE_URL ? `${APP_BASE_URL}${redirectPath}` : null
  const licenceUrgente = jours !== null && jours < LICENCE_URGENCE_JOURS

  // Première preuve concrète : ClearGo montre qu'il sait de quoi il parle
  // avant de demander quoi que ce soit de plus.
  if (perimetre) {
    return (
      <div style={{ animation: 'fadeUp .35s var(--ease-apple) both' }}>
        <div
          className="mb-5 flex items-center gap-3 rounded-xl p-4"
          style={{ background: 'var(--green-pale)' }}
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
            style={{ background: 'var(--green-cta)' }}
          >
            <IconCheck />
          </span>
          <p className="text-[13.5px] font-semibold" style={{ color: 'var(--cleargo-navy)' }}>
            Votre périmètre est défini.
          </p>
        </div>

        <p className="text-[15px] leading-relaxed" style={{ color: 'var(--t3)' }}>
          ClearGo analysera votre entreprise sur{' '}
          <span className="num font-bold" style={{ color: 'var(--cleargo-navy)' }}>
            {perimetre.nb_domaines}
          </span>{' '}
          domaines réglementaires, répartis sur{' '}
          <span className="num font-bold" style={{ color: 'var(--cleargo-navy)' }}>
            {perimetre.referentiels.length}
          </span>{' '}
          {perimetre.referentiels.length > 1 ? 'référentiels' : 'référentiel'} :
        </p>

        <ul className="mt-4 flex flex-col gap-2">
          {perimetre.referentiels.map((r) => (
            <li
              key={r}
              className="flex items-center gap-3 rounded-lg px-4 py-3"
              style={{ background: 'var(--surface)' }}
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: 'var(--green-cta)' }}
              />
              <span className="text-[14px] font-semibold" style={{ color: 'var(--cleargo-navy)' }}>
                {r}
              </span>
            </li>
          ))}
        </ul>

        {licenceUrgente && jours !== null && (
          <div
            className="mt-4 flex gap-3 rounded-xl border p-4"
            style={{ borderColor: 'rgba(249,115,22,0.4)', background: 'rgba(249,115,22,0.07)' }}
          >
            <ClearGoIcon name="expiration" size={20} className="mt-0.5 shrink-0" />
            <p className="text-[13px]" style={{ color: 'var(--t3)' }}>
              Votre licence de transport expire dans{' '}
              <span className="num font-bold" style={{ color: 'var(--cleargo-navy)' }}>{jours}</span>{' '}
              jours : nous traitons votre demande en priorité.
            </p>
          </div>
        )}

        <p className="mt-5 text-[14px] leading-relaxed" style={{ color: 'var(--t3)' }}>
          Prochaine étape : nous avons besoin de connaître la taille de votre parc pour préparer
          votre liste de documents.
        </p>

        {redirectUrl ? (
          <a
            href={redirectUrl}
            className="btn-press mt-5 block w-full rounded-xl px-5 py-3.5 text-center text-[15px] font-extrabold text-white"
            style={{ background: 'var(--green-cta)' }}
          >
            Continuer →
          </a>
        ) : (
          <p className="mt-5 rounded-xl px-4 py-3 text-[13px]" style={{ background: 'var(--surface)', color: 'var(--t3)' }}>
            Votre espace est en cours d’ouverture. Nous vous envoyons le lien par email.
          </p>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full rounded-xl py-3 text-[13px] font-semibold"
          style={{ color: 'var(--t4)' }}
        >
          Fermer
        </button>
      </div>
    )
  }

  const titre =
    niveau === 'urgent_chaud'
      ? 'Votre profil correspond à un besoin immédiat.'
      : niveau === 'tiede'
        ? 'Voici ce que ClearGo peut analyser chez vous.'
        : 'Prenez le temps de découvrir.'

  return (
    <div style={{ animation: 'fadeUp .35s var(--ease-apple) both' }}>
      <div
        className="mb-5 flex items-center gap-3 rounded-xl p-4"
        style={{ background: 'var(--green-pale)' }}
      >
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
          style={{ background: 'var(--green-cta)' }}
        >
          <IconCheck />
        </span>
        <p className="text-[13.5px] font-semibold" style={{ color: 'var(--cleargo-navy)' }}>
          Votre demande est enregistrée.
        </p>
      </div>

      <h3 className="mb-2 text-[20px] font-black leading-tight" style={{ color: 'var(--cleargo-navy)' }}>
        {titre}
      </h3>

      {licenceUrgente && jours !== null && (
        <p className="mb-4 text-[13.5px]" style={{ color: 'var(--t3)' }}>
          Votre licence de transport expire dans <span className="num">{jours}</span> jours : nous
          traitons votre demande en priorité.
        </p>
      )}

      <div className="mt-4 flex flex-col gap-2.5">
        {niveau === 'urgent_chaud' && (
          <>
            <ActionButton
              href={CALENDLY_URL}
              label="Réserver un échange de 30 minutes"
              primary
              disabledNote="Créneaux bientôt disponibles — nous vous recontactons."
            />
            <ActionButton href={ESPACE_CLEARGO_URL} label="Découvrir mon espace ClearGo" />
          </>
        )}

        {niveau === 'tiede' && (
          <>
            <ActionButton
              href={WEBINAIRE_URL}
              label={WEBINAIRE_DATE ? `Voir le webinaire du ${WEBINAIRE_DATE}` : 'Voir le prochain webinaire'}
              primary
              disabledNote="Prochaine date en cours de programmation."
            />
            <ActionButton href={ESPACE_CLEARGO_URL} label="Découvrir mon espace ClearGo" />
            <button
              type="button"
              onClick={onClose}
              className="btn-press w-full rounded-xl border px-5 py-3.5 text-[14px] font-bold"
              style={{ borderColor: 'var(--line)', color: 'var(--t3)' }}
            >
              Être recontacté plus tard
            </button>
          </>
        )}

        {niveau === 'froid' && (
          <>
            <ActionButton
              href={GUIDE_CONFORMITE_URL}
              label="Recevoir le guide conformité"
              primary
              disabledNote="Guide en cours de finalisation — nous vous l’enverrons."
            />
            <ActionButton
              href={WEBINAIRE_URL}
              label="Voir le prochain webinaire"
              disabledNote="Prochaine date en cours de programmation."
            />
            <ActionButton href={ESPACE_CLEARGO_URL} label="Créer mon espace gratuit" />
          </>
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mt-5 w-full rounded-xl py-3 text-[13px] font-semibold"
        style={{ color: 'var(--t4)' }}
      >
        Fermer
      </button>
    </div>
  )
}
