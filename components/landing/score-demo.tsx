"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import {
  ChevronRight,
  ChevronLeft,
  Check,
  AlertTriangle,
  Shield,
  Award,
  FileText,
  Lock,
  RotateCcw,
} from "lucide-react"
import {
  type Question,
  blocA,
  blocB,
  blocC,
  blocD,
  blocE,
  blocF,
  getDiagnosticMessage,
  getBadgeLevel,
  getRecommendedModules,
} from "./simulator-data"

// ─── helpers ──────────────────────────────────────────
function buildQuestionList(answers: Record<string, string | string[]>): Question[] {
  const list = [...blocA]
  const q1 = (answers["Q1"] as string[]) || []
  const q9 = (answers["Q9"] as string[]) || []

  if (q1.includes("adr")) list.push(...blocB)
  if (q1.includes("gdp")) list.push(...blocC)
  if (q1.includes("haccp")) list.push(...blocD)
  if (
    q9.includes("iso9001") ||
    q9.includes("iso45001") ||
    q9.includes("iso14001") ||
    q9.includes("en_cours") ||
    (answers["Q10"] as string[])?.includes("qse")
  ) {
    list.push(...blocE)
  }
  if (q1.includes("evenementiel")) list.push(...blocF)
  return list
}

function computeScores(
  answers: Record<string, string | string[]>,
  questions: Question[]
) {
  let reglo = 0
  let excellence = 0

  for (const q of questions) {
    const answer = answers[q.id]
    if (!answer) continue

    if (q.multiSelect && Array.isArray(answer)) {
      for (const val of answer) {
        const opt = q.options.find((o) => o.value === val)
        if (opt) {
          reglo += opt.scoreReglo ?? 0
          excellence += opt.scoreExcellence ?? 0
        }
      }
    } else if (typeof answer === "string") {
      const opt = q.options.find((o) => o.value === answer)
      if (opt) {
        reglo += opt.scoreReglo ?? 0
        excellence += opt.scoreExcellence ?? 0
      }
    }
  }

  reglo = Math.min(Math.max(reglo, 0), 500)
  excellence = Math.min(Math.max(excellence, 0), 500)
  return { reglo, excellence, total: reglo + excellence }
}

// ─── Component ────────────────────────────────────────
export function ScoreDemo() {
  const [step, setStep] = useState<"intro" | "quiz" | "results">("intro")
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [animScore, setAnimScore] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const questions = useMemo(() => buildQuestionList(answers), [answers])
  const currentQ = questions[currentIdx]

  const { reglo, excellence, total } = useMemo(
    () => computeScores(answers, questions),
    [answers, questions]
  )
  const badge = getBadgeLevel(total)

  // Animate score on results
  useEffect(() => {
    if (step !== "results") return
    const duration = 1200
    const start = Date.now()
    function tick() {
      const t = Math.min((Date.now() - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setAnimScore(Math.round(total * eased))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [step, total])

  // Scroll to top of section on step changes
  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [step])

  const handleSelect = useCallback(
    (qId: string, value: string, multi: boolean, maxSelect?: number) => {
      setAnswers((prev) => {
        if (!multi) return { ...prev, [qId]: value }
        const current = (prev[qId] as string[]) || []
        if (current.includes(value)) {
          return { ...prev, [qId]: current.filter((v) => v !== value) }
        }
        if (maxSelect && current.length >= maxSelect) return prev
        return { ...prev, [qId]: [...current, value] }
      })
    },
    []
  )

  const canAdvance = currentQ
    ? currentQ.multiSelect
      ? ((answers[currentQ.id] as string[]) || []).length > 0
      : !!answers[currentQ.id]
    : false

  const advance = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1)
    } else {
      setStep("results")
    }
  }

  const goBack = () => {
    if (currentIdx > 0) setCurrentIdx((i) => i - 1)
  }

  const reset = () => {
    setAnswers({})
    setCurrentIdx(0)
    setAnimScore(0)
    setStep("intro")
  }

  // Current bloc label
  const blocLabels: Record<string, string> = {
    A: "Profil transport",
    B: "Transport ADR",
    C: "Transport GDP",
    D: "Transport HACCP",
    E: "Systeme Management Integre",
    F: "Transport evenementiel",
  }

  const progress = step === "quiz" ? ((currentIdx + 1) / questions.length) * 100 : 0

  return (
    <section
      id="demo"
      ref={containerRef}
      className="relative overflow-hidden bg-[var(--off-white)] py-24"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-[var(--green)]">
          <span className="h-0.5 w-4 rounded bg-[var(--green)]" />
          {"// SIMULATEUR DE SCORING"}
        </div>
        <h2 className="mt-3 font-sans text-4xl font-black leading-none tracking-tight text-[var(--navy-dark)] lg:text-5xl text-balance">
          {"Evaluez votre ClearGo Score\u2122"}
        </h2>
        <p className="mt-3 max-w-xl font-serif text-[17px] leading-relaxed text-[var(--text-secondary)]">
          Repondez a quelques questions sur votre activite transport et obtenez
          une estimation de votre score de conformite et d{"'"}excellence.
        </p>

        {/* ── INTRO ── */}
        {step === "intro" && (
          <div
            className="mt-12 rounded-2xl border-2 border-border bg-[var(--background)] p-8 shadow-lg md:p-12"
            style={{ animation: "fadeUp 0.5s ease both" }}
          >
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-sans text-2xl font-black text-[var(--navy)]">
                  Diagnostic conformite gratuit
                </h3>
                <p className="mt-3 font-serif text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  En 5 a 8 minutes, evaluez la conformite reglementaire de votre
                  entreprise de transport et decouvrez votre score sur 1000 points.
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {[
                    { icon: Shield, text: "Score REGLO (0-500) -- conformite reglementaire obligatoire" },
                    { icon: Award, text: "Score EXCELLENCE (0-500) -- certifications ISO, RSE, GDP" },
                    { icon: FileText, text: "Recommandations personnalisees pour chaque module" },
                    { icon: AlertTriangle, text: "Points de vigilance identifies pour la DRIEAT" },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-[var(--green-light)]">
                        <Icon className="h-3.5 w-3.5 text-[var(--green)]" />
                      </span>
                      <span className="font-serif text-sm leading-relaxed text-[var(--text-secondary)]">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-center justify-center rounded-2xl bg-[var(--off-white)] p-8">
                <div className="text-center">
                  <div className="font-sans text-[64px] font-black leading-none text-[var(--navy)]">
                    1000
                  </div>
                  <div className="mt-1 font-sans text-xs font-bold uppercase tracking-widest text-[var(--text-tertiary)]">
                    points maximum
                  </div>
                </div>
                <div className="mt-6 grid w-full grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[var(--navy)]/8 p-3 text-center">
                    <div className="font-sans text-lg font-black text-[var(--navy)]">500</div>
                    <div className="font-sans text-[10px] font-bold uppercase tracking-wider text-[var(--navy)]">
                      REGLO
                    </div>
                  </div>
                  <div className="rounded-xl bg-[var(--green)]/8 p-3 text-center">
                    <div className="font-sans text-lg font-black text-[var(--green)]">500</div>
                    <div className="font-sans text-[10px] font-bold uppercase tracking-wider text-[var(--green)]">
                      EXCELLENCE
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  {["BRONZE", "ARGENT", "OR", "PLATINE"].map((lv) => (
                    <span
                      key={lv}
                      className="rounded-md border border-border px-2 py-1 font-sans text-[10px] font-bold text-[var(--text-tertiary)]"
                    >
                      {lv}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep("quiz")}
              data-cta
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--green)] px-8 py-4 font-sans text-base font-extrabold text-[var(--accent-foreground)] transition-all hover:bg-[var(--green-hover)] hover:-translate-y-0.5 hover:shadow-xl md:w-auto"
            >
              {"Lancer le diagnostic gratuit"}
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* ── QUIZ ── */}
        {step === "quiz" && currentQ && (
          <div
            className="mt-12"
            style={{ animation: "fadeUp 0.3s ease both" }}
          >
            {/* Progress bar */}
            <div className="mb-6 flex items-center gap-4">
              <div className="flex-1 overflow-hidden rounded-full bg-[var(--border)]">
                <div
                  className="h-1.5 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${progress}%`,
                    background:
                      "linear-gradient(90deg, var(--navy-light), var(--green))",
                  }}
                />
              </div>
              <span className="font-sans text-xs font-bold text-[var(--text-tertiary)]">
                {currentIdx + 1} / {questions.length}
              </span>
            </div>

            {/* Bloc header */}
            {currentQ.header && (
              <div
                className="mb-6 rounded-xl border border-[var(--navy)]/15 bg-[var(--navy)]/5 px-5 py-3"
                style={{ animation: "fadeUp 0.3s ease both" }}
              >
                <div className="font-sans text-sm font-bold text-[var(--navy)]">
                  {currentQ.header}
                </div>
                {currentQ.headerSubtitle && (
                  <div className="mt-0.5 font-serif text-xs text-[var(--text-secondary)]">
                    {currentQ.headerSubtitle}
                  </div>
                )}
              </div>
            )}

            {/* Bloc label */}
            <div className="mb-2 font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">
              Bloc {currentQ.bloc} -- {blocLabels[currentQ.bloc] || ""}
            </div>

            {/* Question card */}
            <div className="rounded-2xl border-2 border-border bg-[var(--background)] p-6 shadow-lg md:p-8">
              <h3 className="font-sans text-xl font-black leading-snug text-[var(--navy-dark)] md:text-2xl">
                {currentQ.question}
              </h3>
              {currentQ.multiSelect && (
                <p className="mt-1 font-serif text-xs text-[var(--text-tertiary)]">
                  {"Plusieurs reponses possibles"}
                  {currentQ.maxSelect
                    ? ` (max ${currentQ.maxSelect})`
                    : ""}
                </p>
              )}

              {/* Options */}
              <div className="mt-6 flex flex-col gap-2.5">
                {currentQ.options.map((opt) => {
                  const isSelected = currentQ.multiSelect
                    ? ((answers[currentQ.id] as string[]) || []).includes(
                        opt.value
                      )
                    : answers[currentQ.id] === opt.value

                  return (
                    <button
                      key={opt.value}
                      onClick={() =>
                        handleSelect(
                          currentQ.id,
                          opt.value,
                          !!currentQ.multiSelect,
                          currentQ.maxSelect
                        )
                      }
                      className={`group flex items-center gap-3 rounded-xl border-2 px-5 py-3.5 text-left font-serif text-[15px] transition-all ${
                        isSelected
                          ? "border-[var(--green)] bg-[var(--green-light)] text-[var(--foreground)]"
                          : "border-border bg-[var(--background)] text-[var(--text-secondary)] hover:border-[var(--navy-light)]/40 hover:bg-[var(--off-white)]"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border text-[11px] font-bold transition-all ${
                          isSelected
                            ? "border-[var(--green)] bg-[var(--green)] text-[var(--accent-foreground)]"
                            : "border-[var(--border-light)] bg-[var(--background)] group-hover:border-[var(--navy-light)]/50"
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                      </span>
                      {opt.label}
                    </button>
                  )
                })}
              </div>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={goBack}
                  disabled={currentIdx === 0}
                  className="flex items-center gap-1.5 rounded-lg px-4 py-2.5 font-sans text-sm font-semibold text-[var(--text-secondary)] transition-all hover:bg-[var(--off-white)] disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Retour
                </button>
                <button
                  onClick={advance}
                  disabled={!canAdvance}
                  data-cta
                  className="flex items-center gap-2 rounded-xl bg-[var(--green)] px-6 py-3 font-sans text-sm font-extrabold text-[var(--accent-foreground)] transition-all hover:bg-[var(--green-hover)] disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5 hover:enabled:shadow-lg"
                >
                  {currentIdx < questions.length - 1
                    ? "Question suivante"
                    : "Voir mes resultats"}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Live score mini panel */}
            <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-[var(--background)] px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 font-sans text-[10px] font-bold text-[var(--green)]">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[var(--green)]"
                    style={{ animation: "pulse-dot 2s infinite" }}
                  />
                  LIVE
                </span>
                <span className="font-sans text-sm font-black text-[var(--navy)]">
                  {total}
                </span>
                <span className="font-sans text-xs text-[var(--text-tertiary)]">
                  / 1000
                </span>
              </div>
              <div className="flex gap-2">
                <span className="rounded-md bg-[var(--navy)]/8 px-2 py-1 font-sans text-[10px] font-bold text-[var(--navy)]">
                  REGLO {reglo}
                </span>
                <span className="rounded-md bg-[var(--green)]/8 px-2 py-1 font-sans text-[10px] font-bold text-[var(--green)]">
                  EXCEL. {excellence}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {step === "results" && (
          <ResultsPanel
            total={total}
            reglo={reglo}
            excellence={excellence}
            animScore={animScore}
            badge={badge}
            answers={answers}
            questions={questions}
            onReset={reset}
          />
        )}
      </div>
    </section>
  )
}

// ─── Results Panel ────────────────────────────────────
function ResultsPanel({
  total,
  reglo,
  excellence,
  animScore,
  badge,
  answers,
  questions,
  onReset,
}: {
  total: number
  reglo: number
  excellence: number
  animScore: number
  badge: ReturnType<typeof getBadgeLevel>
  answers: Record<string, string | string[]>
  questions: Question[]
  onReset: () => void
}) {
  const diagnostic = getDiagnosticMessage(answers)
  const recommended = getRecommendedModules(answers, reglo, excellence)
  const [leadEmail, setLeadEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "simulator",
          email: leadEmail,
          score_total: total,
          score_reglo: reglo,
          score_excellence: excellence,
          niveau_badge: badge.level,
          diagnostic,
          modules_recommandes: recommended.map((m) => m.name).join(", "),
        }),
      })
    } catch {
      // fail silently
    }
    setSending(false)
    setSubmitted(true)
  }

  return (
    <div
      className="mt-12 flex flex-col gap-6"
      style={{ animation: "fadeUp 0.5s ease both" }}
    >
      {/* Score card */}
      <div className="rounded-2xl border-2 border-border bg-[var(--background)] p-8 shadow-xl md:p-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-1.5 font-sans text-[10px] font-bold text-[var(--green)]">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[var(--green)]"
              style={{ animation: "pulse-dot 2s infinite" }}
            />
            RESULTAT FINAL
          </div>
          <div className="font-sans text-[96px] font-black leading-none tracking-tighter text-[var(--navy)]">
            {animScore}
          </div>
          <div className="font-sans text-sm text-[var(--text-tertiary)]">
            / 1000 points
          </div>
          <div
            className={`mt-3 inline-flex items-center gap-2 rounded-xl border-2 px-6 py-2.5 font-sans text-base font-extrabold ${badge.bgColor} text-[var(--foreground)]`}
            style={{ borderColor: badge.color }}
          >
            <Award className="h-5 w-5" style={{ color: badge.color }} />
            <span style={{ color: badge.color }}>NIVEAU {badge.level}</span>
          </div>
        </div>

        {/* Score bars */}
        <div className="mx-auto mt-8 max-w-md flex flex-col gap-5">
          <ScoreBar
            label="Score REGLO"
            sublabel="Conformite reglementaire"
            value={reglo}
            max={500}
            gradient="linear-gradient(90deg, var(--navy-light), var(--navy))"
            color="var(--navy)"
          />
          <ScoreBar
            label="Score EXCELLENCE"
            sublabel="Certifications & amelioration continue"
            value={excellence}
            max={500}
            gradient="linear-gradient(90deg, var(--green-hover), var(--green))"
            color="var(--green)"
          />
        </div>
      </div>

      {/* Diagnostic */}
      <div className="rounded-2xl border-2 border-amber-400/30 bg-amber-50 p-6 md:p-8">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-amber-400/20">
            <AlertTriangle className="h-4 w-4 text-amber-700" />
          </div>
          <div>
            <h4 className="font-sans text-sm font-black uppercase tracking-wide text-amber-900">
              Point de vigilance prioritaire
            </h4>
            <p className="mt-1.5 font-serif text-[15px] leading-relaxed text-amber-800">
              {diagnostic}
            </p>
          </div>
        </div>
      </div>

      {/* Recommended modules */}
      {recommended.length > 0 && (
        <div className="rounded-2xl border-2 border-border bg-[var(--background)] p-6 md:p-8">
          <h4 className="font-sans text-lg font-black text-[var(--navy-dark)]">
            Modules ClearGo recommandes pour vous
          </h4>
          <p className="mt-1 font-serif text-sm text-[var(--text-secondary)]">
            Basé sur vos reponses, voici les modules qui auraient le plus
            d{"'"}impact sur votre score.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            {recommended.map((mod) => (
              <div
                key={mod.name}
                className="flex items-start gap-4 rounded-xl border border-border bg-[var(--off-white)] p-4 transition-all hover:border-[var(--green)]/40"
              >
                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--green-light)]">
                  <FileText className="h-4 w-4 text-[var(--green)]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-sm font-bold text-[var(--foreground)]">
                      {mod.name}
                    </span>
                    <span className="rounded-md bg-[var(--green)]/10 px-2 py-0.5 font-sans text-[10px] font-bold text-[var(--green)]">
                      {mod.pointsAdded}
                    </span>
                  </div>
                  <p className="mt-0.5 font-serif text-xs text-[var(--text-secondary)]">
                    {mod.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lead capture */}
      <div className="rounded-2xl border-2 border-[var(--green)]/30 bg-[var(--background)] p-6 md:p-8">
        {!submitted ? (
          <>
            <h4 className="font-sans text-lg font-black text-[var(--navy-dark)]">
              Recevez votre rapport complet par email
            </h4>
            <p className="mt-1 font-serif text-sm text-[var(--text-secondary)]">
              Score detaille, points de vigilance, modules recommandes
              et plan d{"'"}action personnalise.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <input
                type="email"
                required
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                placeholder="votre@email.fr"
                className="flex-1 rounded-lg border border-border bg-[var(--off-white)] px-4 py-3 font-serif text-[15px] outline-none transition-all focus:border-[var(--navy)] focus:bg-[var(--background)]"
              />
              <button
                type="submit"
                disabled={sending}
                data-cta
                className="flex-shrink-0 rounded-lg bg-[var(--green)] px-6 py-3 font-sans text-sm font-bold text-[var(--accent-foreground)] transition-all hover:bg-[var(--green-hover)] disabled:opacity-50"
              >
                {sending ? "Envoi..." : "Envoyer \u2192"}
              </button>
            </form>
            <div className="mt-2 flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
              <Lock className="h-3 w-3" />
              Aucun spam. Donnees hebergees en France.
            </div>
          </>
        ) : (
          <div className="py-4 text-center" style={{ animation: "fadeUp 0.4s ease both" }}>
            <div
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--green)]"
            >
              <Check className="h-7 w-7 text-[var(--accent-foreground)]" />
            </div>
            <h4 className="font-sans text-xl font-black text-[var(--navy)]">
              Rapport envoye !
            </h4>
            <p className="mt-1 font-serif text-sm text-[var(--text-secondary)]">
              Vous recevrez votre rapport de conformite detaille sous 5 minutes.
            </p>
          </div>
        )}
      </div>

      {/* Restart */}
      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-lg px-5 py-2.5 font-sans text-sm font-semibold text-[var(--text-secondary)] transition-all hover:bg-[var(--off-white)]"
        >
          <RotateCcw className="h-4 w-4" />
          Recommencer le diagnostic
        </button>
      </div>
    </div>
  )
}

// ─── Score Bar ─────────────────────────────────────────
function ScoreBar({
  label,
  sublabel,
  value,
  max,
  gradient,
  color,
}: {
  label: string
  sublabel: string
  value: number
  max: number
  gradient: string
  color: string
}) {
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <div className="font-sans text-xs font-bold" style={{ color }}>
            {label}
          </div>
          <div className="font-serif text-[10px] text-[var(--text-tertiary)]">
            {sublabel}
          </div>
        </div>
        <div className="font-sans text-lg font-black" style={{ color }}>
          {value}{" "}
          <span className="text-xs font-semibold text-[var(--text-tertiary)]">
            / {max}
          </span>
        </div>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-[var(--off-white)]">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${(value / max) * 100}%`,
            background: gradient,
          }}
        />
      </div>
    </div>
  )
}
