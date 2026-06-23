"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

function ScoreRing({ animated = false }: { animated?: boolean }) {
  const r          = 88
  const cx         = 100
  const cy         = 100
  const circumference  = 2 * Math.PI * r
  const rInner     = 64
  const circInner  = 2 * Math.PI * rInner
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (animated) {
      const t = setTimeout(() => setStarted(true), 300)
      return () => clearTimeout(t)
    }
  }, [animated])

  const regloOffset     = circumference * (1 - (animated && started ? 0.84 : 0))
  const excellenceOffset = circInner   * (1 - (animated && started ? 0.80 : 0))

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Outer track */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#D5DFE5" strokeWidth="10" />
      {/* RÉGLO ring */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none" stroke="#1C2B35" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={regloOffset}
        transform="rotate(-90 100 100)"
        style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1)" }}
      />
      {/* Inner track */}
      <circle cx={cx} cy={cy} r={rInner} fill="none" stroke="#D5DFE5" strokeWidth="8" />
      {/* EXCELLENCE ring */}
      <circle
        cx={cx} cy={cy} r={rInner}
        fill="none" stroke="#4A7B8C" strokeWidth="8" strokeLinecap="round"
        strokeDasharray={circInner}
        strokeDashoffset={excellenceOffset}
        transform="rotate(-90 100 100)"
        style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1) 0.4s" }}
      />
      {/* Score text */}
      <text x="50%" y="44%" textAnchor="middle" dominantBaseline="middle"
        fill="#1C2B35" fontFamily="'Plus Jakarta Sans', system-ui" fontSize="40" fontWeight="800"
        letterSpacing="-2"
      >
        820
      </text>
      <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle"
        fill="#8FA4B2" fontFamily="'Plus Jakarta Sans', system-ui" fontSize="11" fontWeight="600"
        letterSpacing="2"
      >
        / 1000 PTS
      </text>
      {/* Niveau OR badge */}
      <rect x="58" y="68%" width="84" height="17" rx="8" fill="#4A7B8C" />
      <text x="50%" y="77%" textAnchor="middle" dominantBaseline="middle"
        fill="white" fontFamily="'Plus Jakarta Sans', system-ui" fontSize="7.5" fontWeight="800" letterSpacing="1.5"
      >
        NIVEAU OR
      </text>
    </svg>
  )
}

interface HeroProps {
  onCta: () => void
}

export function Hero({ onCta }: HeroProps) {
  const [loaded, setLoaded]       = useState(false)
  const ringRef                   = useRef<HTMLDivElement>(null)
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
      style={{ background: "#FAFBFC" }}
    >
      {/* Fine grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,123,140,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,123,140,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 65% 55% at 65% 45%, rgba(74,123,140,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-36 pb-24 lg:px-12 lg:pt-44 lg:pb-32">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">

          {/* ── LEFT ─────────────────────────────────────────────────── */}
          <div>
            {/* CaaS chip */}
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
              style={{
                borderColor: "rgba(74,123,140,0.35)",
                background:  "rgba(74,123,140,0.07)",
                opacity:     loaded ? 1 : 0,
                transform:   loaded ? "translateY(0)" : "translateY(14px)",
                transition:  "all 0.7s cubic-bezier(0.25,0.1,0.25,1) 0.05s",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#4A7B8C" }} />
              <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "#4A7B8C" }}>
                CaaS — Compliance as a Service · Transporteurs TRM
              </span>
            </div>

            {/* H1 */}
            <h1
              className="font-black leading-[1.04] tracking-tight"
              style={{
                fontSize:   "clamp(40px, 5.5vw, 72px)",
                letterSpacing: "-2.5px",
                color:      "#1C2B35",
                opacity:    loaded ? 1 : 0,
                transform:  loaded ? "translateY(0)" : "translateY(22px)",
                transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.08s",
              }}
            >
              Être choisi autrement
              <br />
              que par le <em style={{ fontStyle: "normal", color: "#4A7B8C" }}>prix.</em>
            </h1>

            {/* Subtitle */}
            <p
              className="mt-6 max-w-[480px] text-[17px] leading-relaxed"
              style={{
                color:      "#5E7485",
                opacity:    loaded ? 1 : 0,
                transform:  loaded ? "translateY(0)" : "translateY(22px)",
                transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.16s",
              }}
            >
              ClearGo transforme vos obligations réglementaires en un{" "}
              <strong style={{ color: "#3A4E5A", fontWeight: 600 }}>Trust Score partageable</strong>{" "}
              — crédible face à n'importe quel donneur d'ordre, en continu.
            </p>

            {/* CTAs */}
            <div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{
                opacity:    loaded ? 1 : 0,
                transform:  loaded ? "translateY(0)" : "translateY(22px)",
                transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.24s",
              }}
            >
              <button
                onClick={onCta}
                data-cta
                className="btn-press inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-[15px] font-bold text-white"
                style={{
                  background:  "#4A7B8C",
                  boxShadow:   "0 6px 28px -4px rgba(74,123,140,0.35)",
                }}
              >
                Identifier mon entreprise →
              </button>
              <a
                href="#donneurs-ordre"
                className="btn-press inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-4 text-[14px] font-semibold transition-colors"
                style={{
                  borderColor: "#D5DFE5",
                  color:       "#A87055",
                }}
              >
                Je suis donneur d'ordre
              </a>
            </div>

            <p
              className="mt-4 text-[12px]"
              style={{
                color:      "#8FA4B2",
                opacity:    loaded ? 1 : 0,
                transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.32s",
              }}
            >
              Identification par SIRET · Pré-qualification immédiate · Sans engagement
            </p>

            {/* Trust row */}
            <div
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
              style={{
                opacity:    loaded ? 1 : 0,
                transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.4s",
              }}
            >
              {[
                { label: "23 transporteurs bêta",  icon: "🚛" },
                { label: "DRIEAT compliant",        icon: "✅" },
                { label: "Données hébergées en France", icon: "🔒" },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-2 text-[12px]" style={{ color: "#8FA4B2" }}>
                  <span>{t.icon}</span>
                  <span className="font-medium">{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Score card ───────────────────────────────────── */}
          <div
            ref={ringRef}
            className="flex justify-center"
            style={{
              opacity:    loaded ? 1 : 0,
              transform:  loaded ? "translateX(0)" : "translateX(36px)",
              transition: "all 1s cubic-bezier(0.25,0.1,0.25,1) 0.2s",
            }}
          >
            <div className="relative w-full max-w-[340px]">
              {/* Live indicator */}
              <div
                className="absolute -top-4 right-0 z-10 flex items-center gap-2 rounded-full border px-4 py-2"
                style={{
                  borderColor: "#D5DFE5",
                  background:  "#FFFFFF",
                  boxShadow:   "0 2px 12px rgba(74,123,140,0.08)",
                }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: "#4A7B8C", animation: "pulse-dot 2s infinite" }}
                />
                <span className="text-[11px] font-semibold" style={{ color: "#5E7485" }}>
                  Mise à jour en direct
                </span>
              </div>

              {/* Ring card */}
              <div
                className="rounded-2xl border p-6"
                style={{
                  background:   "#FFFFFF",
                  borderColor:  "#D5DFE5",
                  boxShadow:    "0 16px 60px -12px rgba(74,123,140,0.12)",
                }}
              >
                <div className="mx-auto" style={{ width: "260px", height: "260px" }}>
                  <ScoreRing animated={ringVisible} />
                </div>

                {/* Legend */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2.5 rounded-lg border p-3" style={{ borderColor: "#D5DFE5" }}>
                    <span className="h-3 w-3 flex-shrink-0 rounded-full" style={{ background: "#1C2B35" }} />
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#8FA4B2" }}>RÉGLO</div>
                      <div className="text-[14px] font-black" style={{ color: "#1C2B35" }}>418 / 500</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-lg border p-3" style={{ borderColor: "#D5DFE5" }}>
                    <span className="h-3 w-3 flex-shrink-0 rounded-full" style={{ background: "#4A7B8C" }} />
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#8FA4B2" }}>EXCELLENCE</div>
                      <div className="text-[14px] font-black" style={{ color: "#4A7B8C" }}>402 / 500</div>
                    </div>
                  </div>
                </div>

                {/* Share pill */}
                <div
                  className="mt-3 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5"
                  style={{ background: "rgba(74,123,140,0.08)", border: "1px solid rgba(74,123,140,0.25)" }}
                >
                  <span className="text-[13px]">📋</span>
                  <span className="text-[13px] font-semibold" style={{ color: "#4A7B8C" }}>
                    Partageable en 1 clic sur vos AO
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#5E7485" }}>Découvrir</span>
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M10 4v12M4 10l6 6 6-6" stroke="#5E7485" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Bottom stripe */}
      <div className="blue-stripe absolute bottom-0 left-0 right-0" />
    </section>
  )
}
