"use client"

import { useEffect, useRef, useState } from "react"

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ── Score gauge component ─────────────────────────────────────────────────

function ScoreGauge({ score = 820, visible }: { score?: number; visible: boolean }) {
  const r = 80
  const circ = 2 * Math.PI * r
  const rInner = 58
  const circInner = 2 * Math.PI * rInner
  const reglo    = visible ? circ * (1 - 0.84)    : circ
  const excellence = visible ? circInner * (1 - 0.80) : circInner

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Outer track */}
      <circle cx="100" cy="100" r={r} fill="none" stroke="#E2E8F0" strokeWidth="10" />
      {/* RÉGLO */}
      <circle
        cx="100" cy="100" r={r}
        fill="none" stroke="#0D2B4E" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={reglo}
        transform="rotate(-90 100 100)"
        style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1)" }}
      />
      {/* Inner track */}
      <circle cx="100" cy="100" r={rInner} fill="none" stroke="#E2E8F0" strokeWidth="8" />
      {/* EXCELLENCE */}
      <circle
        cx="100" cy="100" r={rInner}
        fill="none" stroke="#00A896" strokeWidth="8" strokeLinecap="round"
        strokeDasharray={circInner} strokeDashoffset={excellence}
        transform="rotate(-90 100 100)"
        style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1) 0.3s" }}
      />
      {/* Score */}
      <text x="50%" y="44%" textAnchor="middle" dominantBaseline="middle"
        fill="#0D2B4E" fontFamily="Inter, system-ui" fontSize="38" fontWeight="900" letterSpacing="-2">
        {score}
      </text>
      <text x="50%" y="57%" textAnchor="middle" dominantBaseline="middle"
        fill="#94A3B8" fontFamily="Inter, system-ui" fontSize="10" fontWeight="600" letterSpacing="1.5">
        / 1000 PTS
      </text>
    </svg>
  )
}

// ── Details ───────────────────────────────────────────────────────────────

const REGLO_ITEMS = [
  { label: "Licences & habilitations", pts: 150 },
  { label: "Qualifications conducteurs (FCO/FIMO)", pts: 150 },
  { label: "Conformité véhicules", pts: 120 },
  { label: "Conformité sociale & paie", pts: 80 },
]
const EXCELLENCE_ITEMS = [
  { label: "ISO 9001", pts: 175 },
  { label: "GDP Pharma", pts: 125 },
  { label: "ADR matières dangereuses", pts: 125 },
  { label: "RSE / Bilan carbone", pts: 75 },
]

function ScoreBar({ pts, max, color, visible, delay }: {
  pts: number; max: number; color: string; visible: boolean; delay: number
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: visible ? `${(pts / max) * 100}%` : "0%",
            background: color,
            transition: `width 1.4s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
          }}
        />
      </div>
      <span className="text-[12px] font-bold text-[#94A3B8] w-10 text-right">{pts}</span>
    </div>
  )
}

export function Solution() {
  const { ref, visible } = useReveal(0.1)

  return (
    <section id="solution" className="bg-white py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div
          className="mb-16 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <div className="mb-4 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#00A896]">
            <span className="h-px w-8 bg-[#00A896]" />
            La solution
            <span className="h-px w-8 bg-[#00A896]" />
          </div>
          <h2
            className="font-black text-[#0D2B4E]"
            style={{ fontSize: "clamp(32px, 4.5vw, 56px)", letterSpacing: "-2px", lineHeight: 1.05 }}
          >
            Vos documents entrent.
            <br />
            Un score de confiance en sort.
          </h2>
          <p className="mt-4 text-[17px] text-[#4A5A72]">
            Un seul chiffre. Lisible par n'importe quel donneur d'ordre, auditeur ou inspecteur.
          </p>
        </div>

        {/* Layout */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] items-start">

          {/* LEFT — gauge + badge */}
          <div
            className="flex flex-col items-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-32px)",
              transition: "all 0.9s cubic-bezier(0.25,0.1,0.25,1) 0.1s",
            }}
          >
            {/* Gauge card */}
            <div className="w-full rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] p-8 flex flex-col items-center">
              <div style={{ width: "220px", height: "220px" }}>
                <ScoreGauge visible={visible} />
              </div>

              {/* Legend pills */}
              <div className="mt-6 grid grid-cols-2 gap-3 w-full">
                <div className="rounded-xl border border-[#E2E8F0] bg-white px-4 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0D2B4E]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">Réglo</span>
                  </div>
                  <div className="text-[18px] font-black text-[#0D2B4E]">418<span className="text-[12px] font-semibold text-[#94A3B8]">/500</span></div>
                </div>
                <div className="rounded-xl border border-[#E2E8F0] bg-white px-4 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#00A896]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">Excellence</span>
                  </div>
                  <div className="text-[18px] font-black text-[#00A896]">402<span className="text-[12px] font-semibold text-[#94A3B8]">/500</span></div>
                </div>
              </div>

              {/* Certified badge */}
              <div className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-[#00A896] px-4 py-3">
                <span className="text-sm">✅</span>
                <span className="text-[13px] font-bold text-white">Certifié — Partageable en 1 clic</span>
              </div>
            </div>

            {/* Where to share */}
            <div className="mt-4 w-full rounded-2xl bg-[#F0F4F8] border border-[#E2E8F0] p-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8] mb-3">Utilisable sur</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { icon: "🚛", label: "Vos véhicules — QR code scannable" },
                  { icon: "📋", label: "Vos appels d'offres" },
                  { icon: "📱", label: "Lien partageable en 3 secondes" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-[14px] font-medium text-[#0D2B4E]">
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — score breakdown */}
          <div
            className="flex flex-col gap-5"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(32px)",
              transition: "all 0.9s cubic-bezier(0.25,0.1,0.25,1) 0.2s",
            }}
          >
            {/* RÉGLO */}
            <div className="rounded-3xl bg-[#0D2B4E] p-7 lg:p-8">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🛡</span>
                <h3 className="text-[18px] font-black text-white">Score RÉGLO</h3>
                <span className="ml-auto text-[#00A896] font-black text-[18px]">500 pts</span>
              </div>
              <p className="text-[13px] italic text-[#00A896] mb-5">La base non négociable — obligatoire pour circuler</p>
              <div className="flex flex-col gap-3.5">
                {REGLO_ITEMS.map((item, i) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[13px] text-white/70">{item.label}</span>
                      <span className="text-[12px] font-bold text-white/40">{item.pts} pts</span>
                    </div>
                    <ScoreBar pts={item.pts} max={150} color="#1A4A7A" visible={visible} delay={300 + i * 80} />
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between rounded-xl bg-white/10 px-4 py-2.5">
                <span className="text-[12px] font-semibold text-white/50">Niveau actuel</span>
                <span className="text-[15px] font-black text-white">95%</span>
              </div>
            </div>

            {/* EXCELLENCE */}
            <div className="rounded-3xl border-2 border-[#00A896] bg-[#E6F7F5] p-7 lg:p-8">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">⭐</span>
                <h3 className="text-[18px] font-black text-[#0D2B4E]">Score EXCELLENCE</h3>
                <span className="ml-auto text-[#00A896] font-black text-[18px]">500 pts</span>
              </div>
              <p className="text-[13px] italic text-[#00A896] mb-5">L'avantage concurrentiel — pour gagner les AO</p>
              <div className="flex flex-col gap-3.5">
                {EXCELLENCE_ITEMS.map((item, i) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[13px] text-[#0D2B4E]/70">{item.label}</span>
                      <span className="text-[12px] font-bold text-[#0D2B4E]/40">{item.pts} pts</span>
                    </div>
                    <ScoreBar pts={item.pts} max={175} color="#00A896" visible={visible} delay={500 + i * 80} />
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between rounded-xl bg-[#00A896]/15 px-4 py-2.5">
                <span className="text-[12px] font-semibold text-[#00A896]/70">Progression possible</span>
                <span className="text-[15px] font-black text-[#00A896]">78%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
