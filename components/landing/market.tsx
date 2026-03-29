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
    <section id="market" className="bg-[#F0F4F8] py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div
          className={`text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="font-black text-4xl leading-tight tracking-tight text-[#0D2B4E] lg:text-5xl">
            Un marché de €2,1 Mrd — 83% non adressé.
          </h2>
        </div>

        {/* 3 stat cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">

          {/* Card 1 — Navy */}
          <div
            className={`rounded-2xl bg-[#0D2B4E] p-8 flex flex-col gap-4 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0ms" }}
          >
            <StatRow value="40 000+" label="PME transport routier en France" teal />
            <div className="h-px bg-white/10" />
            <StatRow value="83%" label="sans aucun outil de conformité" teal />
            <div className="h-px bg-white/10" />
            <StatRow value="10/jour" label="disparaissent faute de crédibilité" teal />
          </div>

          {/* Card 2 — White */}
          <div
            className={`rounded-2xl border-2 border-[#00A896] bg-white p-8 flex flex-col gap-4 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "120ms" }}
          >
            <StatRow value="€2,1 Mrd" label="Marché conformité transport EU" dark />
            <div className="h-px bg-[#DDE4F0]" />
            <StatRow value="€420 M" label="Segment France adressable 2026" dark />
            <div className="h-px bg-[#DDE4F0]" />
            <StatRow value="€0" label="Aucun scoring transporteur n'existe aujourd'hui" teal />
          </div>

          {/* Card 3 — Teal */}
          <div
            className={`rounded-2xl bg-[#00A896] p-8 flex flex-col gap-4 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "240ms" }}
          >
            <StatRowWhite value="299€ HT" label="Diagnostic d'entrée" />
            <div className="h-px bg-white/20" />
            <StatRowWhite value="99€ HT/mois" label="Abonnement CaaS" />
            <div className="h-px bg-white/20" />
            <StatRowWhite value="~200K€" label="MRR cible 2 000 clients 2026/2027" />
          </div>
        </div>

        {/* TAM/SAM/SOM footer */}
        <div
          className={`mt-10 rounded-2xl bg-[#0D2B4E] px-8 py-4 text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "380ms" }}
        >
          <p className="text-[14px] font-semibold text-white/70">
            <span className="text-white font-bold">TAM</span> — €2,1 Mrd EU
            {" · "}
            <span className="text-white font-bold">SAM</span> — €420 M France
            {" · "}
            <span className="text-white font-bold">SOM 2026</span> — 2 000 PME = 200 000€ MRR
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
        className={`text-4xl font-black leading-none tracking-tight ${
          teal ? "text-[#00A896]" : dark ? "text-[#0D2B4E]" : "text-white"
        }`}
      >
        {value}
      </div>
      <p className={`mt-1 text-[13px] ${dark ? "text-[#4A5A72]" : "text-white/55"}`}>{label}</p>
    </div>
  )
}

function StatRowWhite({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-black leading-none tracking-tight text-white">{value}</div>
      <p className="mt-1 text-[13px] text-white/70">{label}</p>
    </div>
  )
}
