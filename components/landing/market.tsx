"use client"

import { useEffect, useRef, useState } from "react"

export function Market() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="market" className="py-24" ref={ref} style={{ background: "#EEF2F4" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Stats ticker */}
        <div
          className="mb-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3"
          style={{
            opacity:   visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          {[
            { icon: "⭐", text: "4,9 / 5 bêta-testeurs" },
            { icon: "🚛", text: "40 000+ PME transport en France" },
            { icon: "✅", text: "87 points DRIEAT couverts nativement" },
            { icon: "🔒", text: "Données hébergées en France" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-[13px] font-semibold" style={{ color: "#5E7485" }}>
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Header */}
        <div
          className="text-center"
          style={{
            opacity:   visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.25,0.1,0.25,1) 80ms",
          }}
        >
          <div className="section-eyebrow mb-4" style={{ justifyContent: "center" }}>Le marché</div>
          <h2
            className="font-black"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-1.8px", lineHeight: 1.06, color: "#1C2B35" }}
          >
            Un marché de €2,1 Mrd —{" "}
            <span style={{ color: "#4A7B8C" }}>83% non adressé.</span>
          </h2>
        </div>

        {/* 3 stat cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">

          {/* Card 1 — Dark navy */}
          <div
            className="rounded-2xl p-8 flex flex-col gap-4"
            style={{
              background: "#1C2B35",
              opacity:    visible ? 1 : 0,
              transform:  visible ? "translateY(0)" : "translateY(32px)",
              transition: "all 0.7s cubic-bezier(0.25,0.1,0.25,1) 0ms",
            }}
          >
            <StatRow value="40 000+" label="PME transport routier en France" teal />
            <div className="h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
            <StatRow value="83%" label="sans aucun outil de conformité" teal />
            <div className="h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
            <StatRow value="10/jour" label="disparaissent faute de crédibilité" teal />
          </div>

          {/* Card 2 — White */}
          <div
            className="rounded-2xl border-2 bg-white p-8 flex flex-col gap-4"
            style={{
              borderColor: "#4A7B8C",
              opacity:     visible ? 1 : 0,
              transform:   visible ? "translateY(0)" : "translateY(32px)",
              transition:  "all 0.7s cubic-bezier(0.25,0.1,0.25,1) 120ms",
            }}
          >
            <StatRow value="€2,1 Mrd" label="Marché conformité transport EU" dark />
            <div className="h-px" style={{ background: "#D5DFE5" }} />
            <StatRow value="€420 M" label="Segment France adressable 2026" dark />
            <div className="h-px" style={{ background: "#D5DFE5" }} />
            <StatRow value="€0" label="Aucun scoring transporteur n'existe aujourd'hui" teal />
          </div>

          {/* Card 3 — Innovation / opportunity (replaces pricing card) */}
          <div
            className="rounded-2xl p-8 flex flex-col gap-4"
            style={{
              background: "#4A7B8C",
              opacity:    visible ? 1 : 0,
              transform:  visible ? "translateY(0)" : "translateY(32px)",
              transition: "all 0.7s cubic-bezier(0.25,0.1,0.25,1) 240ms",
            }}
          >
            <StatRowWhite value="1er" label="Outil de scoring transporteur en France" />
            <div className="h-px" style={{ background: "rgba(255,255,255,0.2)" }} />
            <StatRowWhite value="< 8 min" label="De l'identification SIRET au premier résultat" />
            <div className="h-px" style={{ background: "rgba(255,255,255,0.2)" }} />
            <StatRowWhite value="100%" label="Des obligations réglementaires couvertes nativement" />
          </div>
        </div>

        {/* TAM/SAM/SOM footer */}
        <div
          className="mt-10 rounded-2xl px-8 py-4 text-center"
          style={{
            background: "#1C2B35",
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.25,0.1,0.25,1) 380ms",
          }}
        >
          <p className="text-[14px] font-semibold text-white/70">
            <span className="text-white font-bold">TAM</span> — €2,1 Mrd EU
            {" · "}
            <span className="text-white font-bold">SAM</span> — €420 M France
            {" · "}
            <span className="text-white font-bold">Opportunité</span> — Premier acteur à structurer ce marché
          </p>
        </div>
      </div>
    </section>
  )
}

function StatRow({
  value,
  label,
  teal,
  dark,
}: {
  value: string
  label: string
  teal?: boolean
  dark?: boolean
}) {
  return (
    <div>
      <div
        className="text-4xl font-black leading-none tracking-tight"
        style={{
          color: teal ? "#4A7B8C" : dark ? "#1C2B35" : "white",
          letterSpacing: "-2px",
        }}
      >
        {value}
      </div>
      <p className="mt-1 text-[13px]" style={{ color: dark ? "#5E7485" : "rgba(255,255,255,0.55)" }}>{label}</p>
    </div>
  )
}

function StatRowWhite({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-black leading-none tracking-tight text-white" style={{ letterSpacing: "-2px" }}>{value}</div>
      <p className="mt-1 text-[13px] text-white/70">{label}</p>
    </div>
  )
}
