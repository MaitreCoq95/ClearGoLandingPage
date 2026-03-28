"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

// ── Animated score ring (SVG) ─────────────────────────────────────────────

function ScoreRing({ score = 820, animated = false }: { score?: number; animated?: boolean }) {
  const r = 88
  const cx = 100
  const cy = 100
  const circumference = 2 * Math.PI * r
  const regloRatio = 0.84   // 418/500
  const excellenceRatio = 0.80  // 402/500
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (animated) {
      const t = setTimeout(() => setStarted(true), 300)
      return () => clearTimeout(t)
    }
  }, [animated])

  const regloOffset    = circumference * (1 - (animated && started ? regloRatio : 0))
  const excellenceR   = 64
  const excellenceCirc = 2 * Math.PI * excellenceR
  const excellenceOff  = excellenceCirc * (1 - (animated && started ? excellenceRatio : 0))

  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 24px 48px rgba(0,168,150,0.18))" }}
    >
      {/* Outer track */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
      {/* Outer progress — RÉGLO (navy) */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="#1A4A7A"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={regloOffset}
        transform="rotate(-90 100 100)"
        style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1)" }}
      />

      {/* Inner track */}
      <circle cx={cx} cy={cy} r={excellenceR} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
      {/* Inner progress — EXCELLENCE (teal) */}
      <circle
        cx={cx} cy={cy} r={excellenceR}
        fill="none"
        stroke="#00A896"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={excellenceCirc}
        strokeDashoffset={excellenceOff}
        transform="rotate(-90 100 100)"
        style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1) 0.4s" }}
      />

      {/* Score text */}
      <text x="50%" y="46%" textAnchor="middle" dominantBaseline="middle"
        fill="white" fontFamily="Inter, system-ui" fontSize="42" fontWeight="900"
        letterSpacing="-2"
        style={{ animation: animated && started ? "countUp 0.6s ease 0.8s both" : "none" }}
      >
        {score}
      </text>
      <text x="50%" y="62%" textAnchor="middle" dominantBaseline="middle"
        fill="rgba(255,255,255,0.45)" fontFamily="Inter, system-ui" fontSize="12" fontWeight="600"
        letterSpacing="2"
      >
        / 1000 PTS
      </text>

      {/* NIVEAU OR badge */}
      <rect x="60" y="72%" width="80" height="18" rx="9" fill="#00A896" fillOpacity="0.9" />
      <text x="50%" y="80%" textAnchor="middle" dominantBaseline="middle"
        fill="white" fontFamily="Inter, system-ui" fontSize="8" fontWeight="800" letterSpacing="1.5"
      >
        NIVEAU OR
      </text>
    </svg>
  )
}

// ── Main Hero ────────────────────────────────────────────────────────────

interface HeroProps {
  onCta: () => void
}

export function Hero({ onCta }: HeroProps) {
  const [loaded, setLoaded] = useState(false)
  const ringRef = useRef<HTMLDivElement>(null)
  const [ringVisible, setRingVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const el = ringRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRingVisible(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0D2B4E 0%, #081B32 55%, #04111F 100%)" }}
    >
      {/* Subtle mesh gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 60% 40%, rgba(0,168,150,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Fine grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Padding for navbar */}
      <div className="relative mx-auto w-full max-w-7xl px-6 pt-36 pb-24 lg:px-12 lg:pt-44 lg:pb-32">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">

          {/* ── LEFT ─────────────────────────────────────────────────── */}
          <div>
            {/* SITL Badge */}
            <div
              className="mb-8 inline-block"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.7s cubic-bezier(0.25,0.1,0.25,1)",
              }}
            >
              <div className="overflow-hidden rounded-2xl shadow-lg" style={{ width: 320, height: 50 }}>
                <Image
                  src="/images/sitl-badge.jpg"
                  alt="Start-up Contest SITL 2026 — Nominé"
                  width={1300}
                  height={200}
                  className="h-full w-full object-cover object-left"
                  priority
                />
              </div>
            </div>

            {/* CaaS badge */}
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00A896]/40 bg-[#00A896]/10 px-4 py-1.5"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.7s cubic-bezier(0.25,0.1,0.25,1) 0.04s",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#00A896]" />
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#00A896]">
                Compliance as a Service · Réservé aux transporteurs
              </span>
            </div>

            {/* H1 */}
            <h1
              className="font-black leading-[1.02] tracking-tight text-white"
              style={{
                fontSize: "clamp(44px, 6vw, 80px)",
                letterSpacing: "-3px",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(24px)",
                transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.08s",
              }}
            >
              Votre camion parle.
              <br />
              <span style={{ color: "#00A896" }}>Faites-lui</span>
              <br />
              dire la vérité.
            </h1>

            {/* Subtitle */}
            <p
              className="mt-6 max-w-md text-[17px] font-normal leading-relaxed text-white/55"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(24px)",
                transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.16s",
              }}
            >
              ClearGo est un service de conformité à la demande (CaaS) pour transporteurs routiers.
              Vos obligations réglementaires deviennent un{" "}
              <span className="font-semibold text-white/80">Trust Score partageable</span>{" "}
              — crédible face à n'importe quel donneur d'ordre.
            </p>

            {/* CTA */}
            <div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(24px)",
                transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.24s",
              }}
            >
              <button
                onClick={onCta}
                data-cta
                className="btn-press inline-flex items-center justify-center gap-2 rounded-2xl bg-[#00A896] px-8 py-4 text-[16px] font-bold text-white"
                style={{ boxShadow: "0 0 0 0 rgba(0,168,150,0.5), 0 8px 32px -4px rgba(0,168,150,0.4)" }}
              >
                Démarrer ma pré-qualification gratuite
                <span className="text-[18px]">→</span>
              </button>
              <a
                href="#pricing"
                className="btn-press inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-6 py-4 text-[15px] font-semibold text-white/70 hover:border-white/40 hover:text-white"
              >
                Voir le diagnostic 199€
              </a>
            </div>

            <p
              className="mt-4 text-[13px] text-white/35"
              style={{
                opacity: loaded ? 1 : 0,
                transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.32s",
              }}
            >
              Pré-qualification immédiate · Diagnostic disponible à partir de juin · Sans engagement
            </p>

            {/* Trust row */}
            <div
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
              style={{
                opacity: loaded ? 1 : 0,
                transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.4s",
              }}
            >
              {[
                { label: "23 transporteurs bêta", icon: "🚛" },
                { label: "DRIEAT compliant", icon: "✅" },
                { label: "Données en France", icon: "🔒" },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-2 text-[13px] text-white/45">
                  <span>{t.icon}</span>
                  <span className="font-medium">{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Score ring ───────────────────────────────────── */}
          <div
            ref={ringRef}
            className="flex justify-center"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateX(0)" : "translateX(40px)",
              transition: "all 1s cubic-bezier(0.25,0.1,0.25,1) 0.2s",
            }}
          >
            <div className="relative w-full max-w-[340px]">
              {/* Live indicator */}
              <div className="absolute -top-4 right-0 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span
                  className="h-2 w-2 rounded-full bg-[#00A896]"
                  style={{ animation: "pulse-dot 2s infinite" }}
                />
                <span className="text-[12px] font-semibold text-white/70">
                  Mise à jour en direct
                </span>
              </div>

              {/* Ring */}
              <div
                className="mx-auto"
                style={{ width: "280px", height: "280px" }}
              >
                <ScoreRing score={820} animated={ringVisible} />
              </div>

              {/* Legend */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="h-3 w-3 flex-shrink-0 rounded-full bg-[#1A4A7A]" />
                  <div>
                    <div className="text-[11px] font-bold text-white/40 uppercase tracking-wider">RÉGLO</div>
                    <div className="text-[14px] font-black text-white">418 / 500</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="h-3 w-3 flex-shrink-0 rounded-full bg-[#00A896]" />
                  <div>
                    <div className="text-[11px] font-bold text-white/40 uppercase tracking-wider">EXCELLENCE</div>
                    <div className="text-[14px] font-black text-white">402 / 500</div>
                  </div>
                </div>
              </div>

              {/* Share pill */}
              <div className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-[#00A896]/30 bg-[#00A896]/10 px-4 py-2.5">
                <span className="text-[13px]">📋</span>
                <span className="text-[13px] font-semibold text-[#00A896]">
                  Partageable en 1 clic sur vos AO
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[11px] font-semibold tracking-widest text-white uppercase">Découvrir</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4v12M4 10l6 6 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Teal bottom stripe */}
      <div className="teal-stripe absolute bottom-0 left-0 right-0" />
    </section>
  )
}
