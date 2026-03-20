"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, CheckCircle2 } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

type Answers = Record<string, string>
type Profile = {
  hasUpcomingAudit: boolean
  hasLostContract: boolean
  wantsAO: boolean
  wantsCertif: boolean
}

// ─── Questions ───────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: "activite",
    label: "Quel type de transport exercez-vous ?",
    hint: "Chaque activité a ses propres obligations réglementaires.",
    options: ["Transport général (TRM)", "Température dirigée", "Pharma / GDP", "ADR — Matières dangereuses", "Messagerie / Colis"],
  },
  {
    id: "flotte",
    label: "Quelle est la taille de votre flotte ?",
    hint: "Chaque véhicule est un point de contrôle.",
    options: ["1 à 5 véhicules", "6 à 20 véhicules", "21 à 50 véhicules", "50+ véhicules"],
  },
  {
    id: "conducteurs",
    label: "Combien de conducteurs gérez-vous ?",
    hint: "FCO, FIMO, aptitudes médicales — c'est là que tout commence.",
    options: ["1 à 5", "6 à 20", "21 à 50", "50+"],
  },
  {
    id: "controle",
    label: "Avez-vous déjà eu un contrôle DRIEAT ou DREAL ?",
    hint: null,
    options: ["Non, jamais", "Oui, sans problème", "Oui, avec des sanctions", "Un contrôle est prévu dans les 6 mois"],
  },
  {
    id: "contratPerdu",
    label: "Avez-vous déjà perdu un contrat faute de pouvoir prouver votre conformité ?",
    hint: null,
    options: ["Oui, ça m'est arrivé", "Non, mais je le crains", "Non, pas mon problème", "Je ne sais pas"],
  },
  {
    id: "priorite",
    label: "Quelle est votre priorité n°1 aujourd'hui ?",
    hint: null,
    options: ["Passer un audit sans stress", "Décrocher de nouveaux appels d'offres", "Obtenir une certification ISO ou GDP", "Structurer ma conformité de A à Z"],
  },
  {
    id: "qse",
    label: "Avez-vous un responsable QSE en interne ?",
    hint: "Pour calibrer l'accompagnement selon votre organisation.",
    options: ["Oui, une personne dédiée", "Je partage la fonction", "Je gère moi-même", "Non, j'en ai besoin"],
  },
  {
    id: "docsAJour",
    label: "Vos documents de conformité sont-ils à jour ?",
    hint: null,
    options: ["Oui, complètement", "Partiellement", "Non, c'est désorganisé", "Je ne sais pas évaluer"],
  },
  {
    id: "certification",
    label: "Quelle certification visez-vous en priorité ?",
    hint: "Choisissez l'objectif le plus proche.",
    options: ["ISO 9001 (appels d'offres)", "GDP Pharma", "ADR (matières dangereuses)", "ISO 14001 / RSE", "Aucune pour l'instant"],
  },
  {
    id: "frein",
    label: "Quel est votre principal frein pour avancer ?",
    hint: null,
    options: ["Manque de temps", "Budget limité", "Manque de méthode", "Je ne sais pas par où commencer"],
  },
  {
    id: "delai",
    label: "Dans quel délai avez-vous besoin de résultats ?",
    hint: null,
    options: ["Dans le mois — c'est urgent", "1 à 3 mois", "3 à 6 mois", "Plus de 6 mois"],
  },
]

const TOTAL = QUESTIONS.length // 11 questions + contact = 12 étapes

// ─── Adaptive context messages ────────────────────────────────────────────────

function getContext(qIndex: number, profile: Profile): string | null {
  if (qIndex === 7 && profile.hasUpcomingAudit)
    return "⚠️ Votre contrôle approche — chaque document manquant est un risque immédiat."
  if (qIndex === 9 && profile.hasLostContract)
    return "💡 La perte de contrat commence par un manque de visibilité, pas de compétences."
  if (qIndex === 10 && profile.wantsAO)
    return "🏆 Les donneurs d'ordre exigent des preuves vérifiables. ClearGo vous les fournit."
  return null
}

function getPersonalized(profile: Profile, prenom: string): string {
  const n = prenom ? `, ${prenom}` : ""
  if (profile.hasUpcomingAudit)
    return `Votre contrôle approche${n}. Nous avons identifié les points critiques à sécuriser en priorité.`
  if (profile.hasLostContract)
    return `Ça ne doit plus se reproduire${n}. Voici comment prouver votre fiabilité à n'importe quel donneur d'ordre.`
  if (profile.wantsAO)
    return `Votre profil montre un fort potentiel pour décrocher de nouveaux marchés${n}. Le Trust Score est votre argument.`
  if (profile.wantsCertif)
    return `Votre certification est à portée${n}. ClearGo structure votre parcours étape par étape.`
  return `Votre diagnostic personnalisé est prêt${n}. Notre équipe vous recontacte sous 24h.`
}

// ─── Component ────────────────────────────────────────────────────────────────

interface PrequalFunnelProps {
  open: boolean
  onClose: () => void
}

export function PrequalFunnel({ open, onClose }: PrequalFunnelProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [direction, setDirection] = useState<"forward" | "back">("forward")
  const [animating, setAnimating] = useState(false)
  const [prenom, setPrenom] = useState("")
  const [email, setEmail]   = useState("")
  const [sending, setSending] = useState(false)

  const profile: Profile = {
    hasUpcomingAudit: answers.controle === "Un contrôle est prévu dans les 6 mois",
    hasLostContract:  answers.contratPerdu === "Oui, ça m'est arrivé",
    wantsAO:          answers.priorite === "Décrocher de nouveaux appels d'offres",
    wantsCertif:      answers.priorite === "Obtenir une certification ISO ou GDP",
  }

  const isDone = step === TOTAL + 1
  const isContact = step === TOTAL
  const progress = isDone ? 100 : Math.round((step / (TOTAL + 1)) * 100)

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    if (!open) {
      setTimeout(() => {
        setStep(0); setAnswers({}); setPrenom(""); setEmail("")
      }, 300)
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  // Esc key
  const close = useCallback(() => onClose(), [onClose])
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") close() }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [close])

  function go(n: number, dir: "forward" | "back") {
    if (animating) return
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setStep(n)
      setAnimating(false)
    }, 180)
  }

  function selectOption(option: string) {
    const q = QUESTIONS[step]
    if (!q) return
    setAnswers((prev) => ({ ...prev, [q.id]: option }))
    go(step + 1, "forward")
  }

  function goBack() {
    if (step > 0) go(step - 1, "back")
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "funnel",
          prenom, email,
          activite: answers.activite,
          flotte: answers.flotte,
          conducteurs: answers.conducteurs,
          controle_drieat: answers.controle,
          contrat_perdu: answers.contratPerdu,
          priorite: answers.priorite,
          responsable_qse: answers.qse,
          docs_a_jour: answers.docsAJour,
          certification_visee: answers.certification,
          frein_principal: answers.frein,
          delai_souhaite: answers.delai,
          profil_audit: profile.hasUpcomingAudit ? "Oui" : "Non",
          profil_contrat_perdu: profile.hasLostContract ? "Oui" : "Non",
        }),
      })
    } catch { /* fail silently */ }
    setSending(false)
    go(TOTAL + 1, "forward")
  }

  if (!open) return null

  const currentQ = step < QUESTIONS.length ? QUESTIONS[step] : null
  const currentAnswer = currentQ ? answers[currentQ.id] : ""
  const contextMsg = currentQ ? getContext(step, profile) : null

  const slideStyle: React.CSSProperties = animating
    ? {
        opacity: 0,
        transform: direction === "forward" ? "translateX(20px)" : "translateX(-20px)",
        transition: "all 0.18s ease",
      }
    : {
        opacity: 1,
        transform: "translateX(0)",
        transition: "all 0.28s cubic-bezier(0.25,0.1,0.25,1) 0.02s",
      }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#081B32]/75 backdrop-blur-md"
        onClick={close}
        style={{ animation: "fadeIn 0.2s ease both" }}
      />

      {/* Modal — bottom sheet on mobile, centered on desktop */}
      <div
        className="relative w-full sm:max-w-lg flex flex-col bg-white sm:rounded-3xl overflow-hidden shadow-2xl"
        style={{
          maxHeight: "92vh",
          borderRadius: "24px 24px 0 0",
          animation: "slideDownModal 0.3s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        {/* ── Header ── */}
        <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-[#F0F4F8]">
          <button
            onClick={goBack}
            className={`p-2 rounded-xl hover:bg-[#F0F4F8] text-[#94A3B8] transition-all ${step === 0 || isDone ? "invisible" : ""}`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#00A896]">
              Pré-qualification gratuite
            </p>
            {!isDone && (
              <p className="text-[11px] text-[#94A3B8] mt-0.5">
                {isContact ? "Dernière étape" : `${step + 1} sur ${TOTAL + 1}`}
              </p>
            )}
          </div>
          <button onClick={close} className="p-2 rounded-xl hover:bg-[#F0F4F8] text-[#94A3B8] transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Progress bar ── */}
        {!isDone && (
          <div className="h-[3px] bg-[#F0F4F8]">
            <div
              className="h-full bg-[#00A896]"
              style={{ width: `${progress}%`, transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)" }}
            />
          </div>
        )}

        {/* ── Content ── */}
        <div className="overflow-y-auto flex-1 px-6 py-6">

          {/* SUCCESS */}
          {isDone && (
            <div className="py-8 text-center" style={{ animation: "scaleUp 0.5s cubic-bezier(0.34,1.56,0.64,1) both" }}>
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#00A896]"
                style={{ animation: "scaleUp 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.1s both" }}>
                <CheckCircle2 className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-black text-[#0D2B4E] mb-2">Vous êtes sur la liste !</h3>
              <p className="text-[15px] text-[#4A5A72] leading-relaxed mb-6">
                {getPersonalized(profile, prenom)}
              </p>
              <div className="rounded-2xl bg-[#F0F4F8] p-5 text-left mb-6">
                <p className="text-[12px] font-bold uppercase tracking-widest text-[#94A3B8] mb-3">Ce qui vous attend</p>
                {[
                  "Résultat de pré-qualification sous 24h",
                  "Accès au diagnostic complet à 199€ (offre SITL)",
                  "Trust Score 0-1000 + plan d'action personnalisé",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 py-2 border-b border-[#E2E8F0] last:border-0">
                    <span className="h-5 w-5 flex-shrink-0 rounded-full bg-[#00A896] flex items-center justify-center text-white text-[10px] font-black">✓</span>
                    <span className="text-[13px] font-medium text-[#0D2B4E]">{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={close} className="btn-press w-full rounded-2xl bg-[#0D2B4E] text-white font-bold py-4 text-[15px]">
                Fermer
              </button>
            </div>
          )}

          {/* CONTACT */}
          {!isDone && isContact && (
            <div style={slideStyle}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#00A896] mb-2">Étape finale</p>
              <h3 className="text-[22px] font-black text-[#0D2B4E] leading-tight mb-2">
                Où envoyer votre diagnostic ?
              </h3>
              <p className="text-[14px] text-[#4A5A72] mb-7 leading-relaxed">
                {getPersonalized(profile, "")}
              </p>
              <form onSubmit={submit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-[#0D2B4E] mb-1.5 uppercase tracking-wider">
                    Prénom
                  </label>
                  <input
                    type="text" required value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Jean"
                    className="w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3.5 text-[15px] font-medium text-[#0D2B4E] placeholder:text-[#94A3B8] outline-none focus:border-[#00A896] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#0D2B4E] mb-1.5 uppercase tracking-wider">
                    Email professionnel
                  </label>
                  <input
                    type="email" required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jean@transport.fr"
                    className="w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3.5 text-[15px] font-medium text-[#0D2B4E] placeholder:text-[#94A3B8] outline-none focus:border-[#00A896] focus:bg-white transition-all"
                  />
                </div>
                <button
                  type="submit" disabled={sending}
                  className="btn-press mt-2 w-full rounded-2xl bg-[#00A896] py-4 text-[16px] font-extrabold text-white disabled:opacity-50 disabled:pointer-events-none"
                  style={{ boxShadow: "0 8px 32px -4px rgba(0,168,150,0.4)" }}
                >
                  {sending ? "Envoi…" : "Recevoir mon diagnostic gratuit →"}
                </button>
                <p className="text-center text-[11px] text-[#94A3B8]">
                  Pas de spam · Aucun engagement · Réponse sous 24h
                </p>
              </form>
            </div>
          )}

          {/* QUESTIONS */}
          {!isDone && currentQ && (
            <div style={slideStyle}>
              {contextMsg && (
                <div className="mb-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                  <span className="text-base flex-shrink-0 mt-0.5">⚡</span>
                  <p className="text-[13px] font-medium text-amber-800">{contextMsg}</p>
                </div>
              )}
              <h3
                className="font-black text-[#0D2B4E] leading-tight mb-2"
                style={{ fontSize: "clamp(18px, 3.5vw, 22px)" }}
              >
                {currentQ.label}
              </h3>
              {currentQ.hint && (
                <p className="text-[13px] text-[#94A3B8] mb-6">{currentQ.hint}</p>
              )}
              <div className={`flex flex-col gap-2.5 ${!currentQ.hint ? "mt-5" : ""}`}>
                {currentQ.options.map((opt) => {
                  const selected = currentAnswer === opt
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => selectOption(opt)}
                      className="w-full text-left rounded-2xl border-2 px-5 py-4 text-[14px] font-semibold transition-all"
                      style={{
                        borderColor: selected ? "#00A896" : "#E2E8F0",
                        background: selected ? "#E6F7F5" : "#FAFBFC",
                        color: selected ? "#0D2B4E" : "#4A5A72",
                        transform: selected ? "scale(1.01)" : "scale(1)",
                      }}
                    >
                      <span className="flex items-center gap-4">
                        <span
                          className="flex-shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all"
                          style={{
                            borderColor: selected ? "#00A896" : "#CBD5E1",
                            background: selected ? "#00A896" : "transparent",
                          }}
                        >
                          {selected && <span className="h-2 w-2 rounded-full bg-white" />}
                        </span>
                        {opt}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Teal bottom stripe */}
        <div className="h-1 bg-[#00A896] flex-shrink-0" />
      </div>
    </div>
  )
}
