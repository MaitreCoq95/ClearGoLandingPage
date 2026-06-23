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

function ScoreGauge({ visible }: { visible: boolean }) {
  const r = 80, circ = 2 * Math.PI * r
  const rInner = 58, circInner = 2 * Math.PI * rInner
  const reglo     = visible ? circ      * (1 - 0.84) : circ
  const excellence = visible ? circInner * (1 - 0.80) : circInner

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <circle cx="100" cy="100" r={r}      fill="none" stroke="#D5DFE5" strokeWidth="10" />
      <circle cx="100" cy="100" r={r}      fill="none" stroke="#1C2B35" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={reglo} transform="rotate(-90 100 100)"
        style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1)" }} />
      <circle cx="100" cy="100" r={rInner} fill="none" stroke="#D5DFE5" strokeWidth="8" />
      <circle cx="100" cy="100" r={rInner} fill="none" stroke="#4A7B8C" strokeWidth="8" strokeLinecap="round"
        strokeDasharray={circInner} strokeDashoffset={excellence} transform="rotate(-90 100 100)"
        style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1) 0.3s" }} />
      <text x="50%" y="44%" textAnchor="middle" dominantBaseline="middle"
        fill="#1C2B35" fontFamily="'Plus Jakarta Sans', system-ui" fontSize="38" fontWeight="800" letterSpacing="-2">820</text>
      <text x="50%" y="57%" textAnchor="middle" dominantBaseline="middle"
        fill="#8FA4B2" fontFamily="'Plus Jakarta Sans', system-ui" fontSize="10" fontWeight="600" letterSpacing="1.5">/ 1000 PTS</text>
    </svg>
  )
}

function ScoreBar({ pts, max, color, visible, delay }: {
  pts: number; max: number; color: string; visible: boolean; delay: number
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#D5DFE5" }}>
        <div
          className="h-full rounded-full"
          style={{
            width:      visible ? `${(pts / max) * 100}%` : "0%",
            background: color,
            transition: `width 1.4s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
          }}
        />
      </div>
      <span className="text-[12px] font-bold w-10 text-right" style={{ color: "#8FA4B2" }}>{pts}</span>
    </div>
  )
}

const REGLO_ITEMS = [
  { label: "Licences & habilitations",           pts: 150 },
  { label: "Qualifications conducteurs (FCO/FIMO)", pts: 150 },
  { label: "Conformité véhicules",               pts: 120 },
  { label: "Conformité sociale & paie",           pts: 80  },
]
const EXCELLENCE_ITEMS = [
  { label: "ISO 9001",              pts: 175 },
  { label: "GDP Pharma",            pts: 125 },
  { label: "ADR matières dangereuses", pts: 125 },
  { label: "RSE / Bilan carbone",   pts: 75  },
]

export function Solution() {
  const { ref, visible } = useReveal(0.1)

  return (
    <section id="solution" className="py-24 lg:py-32" ref={ref} style={{ background: "#FAFBFC" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div
          className="mb-16 text-center"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="h-px w-8" style={{ background: "#4A7B8C" }} />
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#4A7B8C" }}>CaaS — Compliance as a Service</span>
            <span className="h-px w-8" style={{ background: "#4A7B8C" }} />
          </div>
          <h2
            className="font-black"
            style={{ fontSize: "clamp(30px, 4.2vw, 52px)", letterSpacing: "-2px", lineHeight: 1.06, color: "#1C2B35" }}
          >
            Vos documents entrent.
            <br />
            Un score de confiance en sort.
          </h2>
          <p className="mt-4 text-[16px]" style={{ color: "#5E7485" }}>
            Un seul chiffre. Lisible par n'importe quel donneur d'ordre, auditeur ou inspecteur DRIEAT.
          </p>
        </div>

        {/* Layout */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] items-start">

          {/* LEFT — gauge */}
          <div
            className="flex flex-col items-center"
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? "translateX(0)" : "translateX(-32px)",
              transition: "all 0.9s cubic-bezier(0.25,0.1,0.25,1) 0.1s",
            }}
          >
            <div className="w-full rounded-2xl border p-8 flex flex-col items-center" style={{ background: "#FFFFFF", borderColor: "#D5DFE5" }}>
              <div style={{ width: "220px", height: "220px" }}>
                <ScoreGauge visible={visible} />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 w-full">
                <div className="rounded-lg border p-3" style={{ borderColor: "#D5DFE5" }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#1C2B35" }} />
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#8FA4B2" }}>Réglo</span>
                  </div>
                  <div className="text-[18px] font-black" style={{ color: "#1C2B35" }}>
                    418<span className="text-[12px] font-semibold" style={{ color: "#8FA4B2" }}>/500</span>
                  </div>
                </div>
                <div className="rounded-lg border p-3" style={{ borderColor: "#D5DFE5" }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#4A7B8C" }} />
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#8FA4B2" }}>Excellence</span>
                  </div>
                  <div className="text-[18px] font-black" style={{ color: "#4A7B8C" }}>
                    402<span className="text-[12px] font-semibold" style={{ color: "#8FA4B2" }}>/500</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3" style={{ background: "#4A7B8C" }}>
                <span className="text-sm">✅</span>
                <span className="text-[13px] font-bold text-white">Certifié — Partageable en 1 clic</span>
              </div>
            </div>

            <div className="mt-4 w-full rounded-xl border p-5" style={{ background: "#F5F7F8", borderColor: "#D5DFE5" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "#8FA4B2" }}>Utilisable sur</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { icon: "🚛", label: "Vos véhicules — QR code scannable" },
                  { icon: "📋", label: "Vos appels d'offres" },
                  { icon: "📱", label: "Lien partageable en 3 secondes" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-[13px] font-medium" style={{ color: "#3A4E5A" }}>
                    <span>{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — breakdown */}
          <div
            className="flex flex-col gap-5"
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? "translateX(0)" : "translateX(32px)",
              transition: "all 0.9s cubic-bezier(0.25,0.1,0.25,1) 0.2s",
            }}
          >
            {/* RÉGLO */}
            <div className="rounded-2xl p-7 lg:p-8" style={{ background: "#1C2B35" }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🛡</span>
                <h3 className="text-[17px] font-black text-white">Score RÉGLO</h3>
                <span className="ml-auto font-black text-[17px]" style={{ color: "#4A7B8C" }}>500 pts</span>
              </div>
              <p className="text-[12px] italic mb-5" style={{ color: "#6AABB8" }}>La base non négociable — obligatoire pour circuler</p>
              <div className="flex flex-col gap-3.5">
                {REGLO_ITEMS.map((item, i) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.65)" }}>{item.label}</span>
                      <span className="text-[12px] font-bold" style={{ color: "rgba(255,255,255,0.35)" }}>{item.pts} pts</span>
                    </div>
                    <ScoreBar pts={item.pts} max={150} color="#4A7B8C" visible={visible} delay={300 + i * 80} />
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between rounded-lg px-4 py-2.5" style={{ background: "rgba(255,255,255,0.08)" }}>
                <span className="text-[12px] font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>Niveau actuel</span>
                <span className="text-[15px] font-black text-white">95%</span>
              </div>
            </div>

            {/* EXCELLENCE */}
            <div className="rounded-2xl border-2 p-7 lg:p-8" style={{ borderColor: "#4A7B8C", background: "#F5F7F8" }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">⭐</span>
                <h3 className="text-[17px] font-black" style={{ color: "#1C2B35" }}>Score EXCELLENCE</h3>
                <span className="ml-auto font-black text-[17px]" style={{ color: "#4A7B8C" }}>500 pts</span>
              </div>
              <p className="text-[12px] italic mb-5" style={{ color: "#4A7B8C" }}>L'avantage concurrentiel — pour gagner les AO</p>
              <div className="flex flex-col gap-3.5">
                {EXCELLENCE_ITEMS.map((item, i) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[13px]" style={{ color: "#3A4E5A" }}>{item.label}</span>
                      <span className="text-[12px] font-bold" style={{ color: "#8FA4B2" }}>{item.pts} pts</span>
                    </div>
                    <ScoreBar pts={item.pts} max={175} color="#4A7B8C" visible={visible} delay={500 + i * 80} />
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between rounded-lg px-4 py-2.5" style={{ background: "rgba(74,123,140,0.1)" }}>
                <span className="text-[12px] font-semibold" style={{ color: "rgba(74,123,140,0.7)" }}>Progression possible</span>
                <span className="text-[15px] font-black" style={{ color: "#4A7B8C" }}>78%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
