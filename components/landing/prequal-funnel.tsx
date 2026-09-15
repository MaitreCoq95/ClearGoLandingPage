'use client'

import { useCallback, useEffect, useState } from 'react'
import { ClearGoIcon } from '@/components/icons/cleargo-icon'
import {
  FUNNEL_QUESTIONS,
  LICENCE_URGENCE_JOURS,
  ROLE_TRANSPORT_CODES,
  mapUrgence,
  parseFleetSize,
} from '@/config/funnel-questions'
import { construireLecture, type PremiereLecture } from '@/config/premiere-lecture'
import {
  APP_BASE_URL,
  CALENDLY_URL,
  ESPACE_CLEARGO_URL,
  GUIDE_CONFORMITE_URL,
  WEBINAIRE_DATE,
  WEBINAIRE_URL,
} from '@/config/site-links'

/**
 * Parcours de pré-qualification.
 *
 * Ordre des phases : contrat → questions → lecture → compte → sortie.
 *
 * Deux principes le structurent, et ils viennent de deux documents qui se
 * rejoignent sans se citer :
 *
 * - La première valeur précède toute coordonnée (audit du 15/09, §11.3 ;
 *   arbitrage B3 du 12/09, l'identité arrive à l'account gate).
 * - Aucun écran n'est une impasse (audit §6.3). Chaque phase offre une sortie.
 *
 * Le SIRET a quitté ce parcours. Il ne demandait rien d'utile au visiteur à ce
 * stade et bloquait l'entrée : tant qu'il n'était pas saisi, aucun bouton de
 * continuation n'était rendu. Sa réintroduction facultative à l'account gate
 * est en attente d'arbitrage ; le proxy de vérification reste en place.
 */

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

/** Réponse de /api/qualify — déjà assainie côté serveur. */
interface QualifyResult {
  status: string
  urgence_licence: number | null
  compte_cree: boolean
  redirect_url: string | null
  perimetre: { referentiels: string[]; nb_domaines: number } | null
}

type Phase = 'contrat' | 'questions' | 'lecture' | 'compte' | 'sortie'

interface PrequalFunnelProps {
  open: boolean
  onClose: () => void
}

const TOTAL_Q = FUNNEL_QUESTIONS.length

export function PrequalFunnel({ open, onClose }: PrequalFunnelProps) {
  const [phase, setPhase] = useState<Phase>('contrat')
  const [step, setStep] = useState(0)

  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [lecture, setLecture] = useState<PremiereLecture | null>(null)

  const [email, setEmail] = useState('')
  const [prenom, setPrenom] = useState('')
  const [telephone, setTelephone] = useState('')
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)
  const [qualification, setQualification] = useState<QualifyResult | null>(null)

  const urgenceDeclaree = typeof answers.urgence === 'string' ? answers.urgence : undefined
  const joursAvantExpiration = qualification?.urgence_licence ?? null
  const licenceUrgente =
    joursAvantExpiration !== null && joursAvantExpiration < LICENCE_URGENCE_JOURS
  const niveauUrgence = licenceUrgente ? 'urgent_chaud' : mapUrgence(urgenceDeclaree)

  const reset = useCallback(() => {
    setPhase('contrat')
    setStep(0)
    setAnswers({})
    setLecture(null)
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

  // Échap ferme
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  /** Fin du socle : la lecture est construite localement, rien n'est envoyé. */
  function terminerQuestions(finales: Record<string, string | string[]>) {
    setLecture(construireLecture(finales))
    setPhase('lecture')
  }

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

    const next = { ...answers, [id]: value }
    setAnswers(next)
    if (step < TOTAL_Q - 1) setStep(step + 1)
    else terminerQuestions(next)
  }

  function goBack() {
    if (phase === 'compte') {
      setPhase('lecture')
      return
    }
    if (phase === 'lecture') {
      setPhase('questions')
      setStep(TOTAL_Q - 1)
      return
    }
    if (phase === 'questions') {
      if (step === 0) setPhase('contrat')
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
        // Aucune donnée d'identité d'entreprise : le proxy les écarterait de
        // toute façon, mais les émettre les ferait quand même quitter le
        // navigateur pour rien.
        body: JSON.stringify({
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
    phase === 'contrat'
      ? 'Avant de commencer'
      : phase === 'questions'
        ? `Question ${step + 1} sur ${TOTAL_Q}`
        : phase === 'lecture'
          ? 'Votre première lecture'
          : phase === 'compte'
            ? 'Ouvrir votre espace'
            : 'Votre prochain pas'

  // Le compteur et la barre décrivent la même chose : six questions, six pas.
  const progress =
    phase === 'contrat' ? 0 : phase === 'questions' ? ((step + 1) / TOTAL_Q) * 100 : 100

  const peutRevenir = phase === 'questions' || phase === 'lecture' || phase === 'compte'

  return (
    <div
      // Au-dessus de la bannière cookies (z-9999) : elle s'affiche 1,5 s après
      // le chargement et atterrissait sinon sur le bouton principal d'une
      // modale déjà ouverte. Elle reste accessible une fois le parcours fermé.
      className="fixed inset-0 z-[10000] flex items-end justify-center sm:items-center"
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
            style={{ visibility: peutRevenir ? 'visible' : 'hidden', color: 'var(--t4)' }}
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

          {/* ═══ Contrat d'entrée ══════════════════════════════════════════ */}
          {phase === 'contrat' && <ContratEntree onStart={() => setPhase('questions')} onClose={onClose} />}

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
                  const estRetrait = opt === q.optOut
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => answer(q.id, opt, q.multiple)}
                      className="btn-press w-full rounded-xl border-2 px-5 py-4 text-left text-[14.5px] font-semibold"
                      style={{
                        borderColor: selected ? 'var(--green)' : 'var(--line)',
                        background: selected ? 'var(--green-pale)' : 'var(--surface)',
                        color: selected ? 'var(--cleargo-navy)' : estRetrait ? 'var(--t4)' : 'var(--t3)',
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

              {q.multiple && (
                <button
                  type="button"
                  disabled={multiSelection.length === 0}
                  onClick={() =>
                    step < TOTAL_Q - 1 ? setStep(step + 1) : terminerQuestions(answers)
                  }
                  className="btn-press mt-4 w-full rounded-xl py-3.5 text-[15px] font-bold text-white disabled:pointer-events-none disabled:opacity-40"
                  style={{ background: 'var(--green-cta)' }}
                >
                  Continuer →
                </button>
              )}
            </div>
          )}

          {/* ═══ Première lecture — avant toute coordonnée ═════════════════ */}
          {phase === 'lecture' && lecture && (
            <PremiereLectureEcran
              lecture={lecture}
              onContinue={() => setPhase('compte')}
              onClose={onClose}
            />
          )}

          {/* ═══ Account gate ══════════════════════════════════════════════ */}
          {phase === 'compte' && (
            <form onSubmit={submit} style={{ animation: 'fadeUp .3s var(--ease-apple) both' }}>
              <h3 className="mb-2 text-[20px] font-black leading-tight" style={{ color: 'var(--cleargo-navy)' }}>
                Où vous envoyer votre analyse ?
              </h3>
              <p className="mb-5 text-[14px] leading-relaxed" style={{ color: 'var(--t3)' }}>
                Nous ouvrons votre espace et y déposons le périmètre applicable à votre activité.
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
                {sending ? 'Envoi…' : 'Ouvrir mon espace →'}
              </button>
              {sendError && (
                <p className="mt-2 text-center text-[12px]" style={{ color: 'var(--score-insuffisant-text)' }}>
                  L’envoi a échoué. Réessayez dans un instant.
                </p>
              )}

              <button
                type="button"
                onClick={onClose}
                className="mt-2 w-full rounded-xl py-3 text-[13px] font-semibold"
                style={{ color: 'var(--t4)' }}
              >
                Pas maintenant
              </button>
              <p className="mt-1 text-center text-[11.5px]" style={{ color: 'var(--t4)' }}>
                Vos données restent en France · Sans engagement
              </p>
            </form>
          )}

          {/* ═══ Sortie conditionnelle ═════════════════════════════════════ */}
          {phase === 'sortie' && (
            <SortieConditionnelle
              niveau={niveauUrgence}
              jours={joursAvantExpiration}
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

// ── Contrat d'entrée ────────────────────────────────────────────────────────

/**
 * Ce que le visiteur doit savoir avant la première question : l'effort, le
 * résultat, et le fait qu'il peut partir. Sans SIRET, sans coordonnées.
 */
function ContratEntree({ onStart, onClose }: { onStart: () => void; onClose: () => void }) {
  const POINTS = [
    {
      icone: 'expiration' as const,
      titre: `${TOTAL_Q} questions sur votre activité`,
      detail: 'Aucune ne porte sur votre identité ni sur celle de votre entreprise.',
    },
    {
      icone: 'reglo' as const,
      titre: 'Une première lecture à la fin',
      detail: 'Ce que vous déclarez, votre priorité, et un premier point à clarifier.',
    },
    {
      icone: 'reglo' as const,
      titre: 'Vous décidez ensuite',
      detail: 'Ouvrir votre espace, ou repartir. Personne ne vous rappelle sans que vous le demandiez.',
    },
  ]

  return (
    <div style={{ animation: 'fadeUp .3s var(--ease-apple) both' }}>
      <h3 className="mb-2 text-[22px] font-black leading-tight" style={{ color: 'var(--cleargo-navy)' }}>
        Faisons un premier point sur votre situation.
      </h3>
      <p className="mb-6 text-[14.5px] leading-relaxed" style={{ color: 'var(--t3)' }}>
        Quelques questions nous permettent de comprendre votre activité et votre priorité. Vous
        recevrez une première lecture, puis vous choisirez la suite.
      </p>

      <ul className="flex flex-col gap-3">
        {POINTS.map((p) => (
          <li
            key={p.titre}
            className="flex gap-3.5 rounded-xl px-4 py-3.5"
            style={{ background: 'var(--surface)' }}
          >
            <span
              aria-hidden="true"
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: 'var(--green-cta)' }}
            />
            <div>
              <p className="text-[14px] font-bold" style={{ color: 'var(--cleargo-navy)' }}>
                {p.titre}
              </p>
              <p className="mt-0.5 text-[12.5px] leading-snug" style={{ color: 'var(--t3)' }}>
                {p.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onStart}
        className="btn-press mt-6 w-full rounded-xl py-4 text-[15px] font-extrabold text-white"
        style={{ background: 'var(--green-cta)' }}
        autoFocus
      >
        Commencer →
      </button>
      <button
        type="button"
        onClick={onClose}
        className="mt-2 w-full rounded-xl py-3 text-[13px] font-semibold"
        style={{ color: 'var(--t4)' }}
      >
        Revenir au site
      </button>

      <p className="mt-3 text-center text-[11.5px]" style={{ color: 'var(--t4)' }}>
        Gratuit · Sans engagement · Réservé aux transporteurs routiers
      </p>
    </div>
  )
}

// ── Première lecture ────────────────────────────────────────────────────────

/**
 * La valeur rendue avant toute coordonnée. Trois éléments seulement, et chacun
 * est rattachable à une réponse : c'est la condition posée par l'audit pour
 * qu'une restitution ne soit pas une personnalisation de façade.
 */
function PremiereLectureEcran({
  lecture,
  onContinue,
  onClose,
}: {
  lecture: PremiereLecture
  onContinue: () => void
  onClose: () => void
}) {
  return (
    <div style={{ animation: 'fadeUp .35s var(--ease-apple) both' }}>
      <h3 className="mb-4 text-[21px] font-black leading-tight" style={{ color: 'var(--cleargo-navy)' }}>
        Voici ce que nous avons compris.
      </h3>

      <div className="flex flex-col gap-3">
        <div className="rounded-xl px-4 py-3.5" style={{ background: 'var(--surface)' }}>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.13em]" style={{ color: 'var(--t4)' }}>
            Votre contexte
          </p>
          <p className="mt-1.5 text-[14.5px] leading-relaxed" style={{ color: 'var(--cleargo-navy)' }}>
            {lecture.miroir}
          </p>
        </div>

        <div className="rounded-xl px-4 py-3.5" style={{ background: 'var(--surface)' }}>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.13em]" style={{ color: 'var(--t4)' }}>
            Votre priorité
          </p>
          <p className="mt-1.5 text-[14.5px] leading-relaxed" style={{ color: 'var(--cleargo-navy)' }}>
            Vous cherchez à {lecture.priorite}.
          </p>
        </div>

        <div
          className="rounded-xl border px-4 py-3.5"
          style={{ borderColor: 'rgba(39,174,96,0.3)', background: 'var(--green-pale)' }}
        >
          <p className="text-[10.5px] font-bold uppercase tracking-[0.13em]" style={{ color: 'var(--green-text)' }}>
            Un premier point à clarifier
          </p>
          <p className="mt-1.5 text-[15px] font-bold leading-snug" style={{ color: 'var(--cleargo-navy)' }}>
            {lecture.attention.titre}
          </p>
          <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: 'var(--t3)' }}>
            {lecture.attention.detail}
          </p>
          <p className="mt-2.5 text-[11.5px] italic" style={{ color: 'var(--t4)' }}>
            {lecture.attention.origine}
          </p>
        </div>
      </div>

      <p className="mt-5 text-[13.5px] leading-relaxed" style={{ color: 'var(--t3)' }}>
        Ce n’est pas un diagnostic : c’est ce qui se déduit de vos réponses. L’analyse complète
        identifie les exigences réellement applicables à votre activité.
      </p>

      <button
        type="button"
        onClick={onContinue}
        className="btn-press mt-5 w-full rounded-xl py-4 text-[15px] font-extrabold text-white"
        style={{ background: 'var(--green-cta)' }}
      >
        Voir mon périmètre complet →
      </button>
      <button
        type="button"
        onClick={onClose}
        className="mt-2 w-full rounded-xl py-3 text-[13px] font-semibold"
        style={{ color: 'var(--t4)' }}
      >
        J’en reste là pour aujourd’hui
      </button>
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
          Votre espace est en cours d’ouverture.
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
