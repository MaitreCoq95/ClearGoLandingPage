"use client"

import { useEffect, useRef, useState } from "react"

const PRODUCTS = [
  {
    emoji: "🚛",
    name: "ClearGo",
    status: "Actif",
    statusStyle: { background: "#4A7B8C", color: "white" },
    desc: "Conformité & Trust Score transporteurs",
  },
  {
    emoji: "💊",
    name: "Gaby",
    status: "En dev",
    statusStyle: { background: "#FEF3C7", color: "#92400E" },
    desc: "Livraison pharmaceutique GDP-native",
  },
  {
    emoji: "🎬",
    name: "TurtleRun",
    status: "En dev",
    statusStyle: { background: "#FEF3C7", color: "#92400E" },
    desc: "Transport B2B événementiel & cinéma",
  },
  {
    emoji: "🔒",
    name: "Projet confidentiel",
    status: "2027",
    statusStyle: { background: "#F0F0F0", color: "#6B7280" },
    desc: "Marketplace compliance T° dirigée",
  },
]


export function Team() {
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
    <section id="team" className="py-24" ref={ref} style={{ background: "#FAFBFC" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div
          className="text-center"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <div className="section-eyebrow mb-4" style={{ justifyContent: "center" }}>L'équipe</div>
          <h2
            className="font-black"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-1.8px", lineHeight: 1.06, color: "#1C2B35" }}
          >
            Fondée par des professionnels du transport.
          </h2>
          <p className="mt-3 text-[17px] italic" style={{ color: "#4A7B8C" }}>15 ans terrain. La conformité vue de l'intérieur.</p>
        </div>

        {/* 2-col layout */}
        <div
          className="mt-14 grid gap-10 lg:grid-cols-2"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.7s cubic-bezier(0.25,0.1,0.25,1) 150ms",
          }}
        >
          {/* LEFT — Little Flock */}
          <div>
            <div className="mb-5">
              <div
                className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1"
                style={{ borderColor: "rgba(74,123,140,0.3)", background: "rgba(74,123,140,0.08)" }}
              >
                <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "#4A7B8C" }}>Little Flock</span>
              </div>
              <p className="text-[15px] font-bold mb-1" style={{ color: "#1C2B35" }}>Studio parisien de produits SaaS dédiés au transport & à la conformité</p>
              <p className="text-[13px] mb-3" style={{ color: "#5E7485" }}>ClearGo est le premier produit du studio. D'autres suivront pour d'autres verticales transport.</p>
              <ul className="space-y-2">
                {[
                  "50+ projets terrain communs — Eurotranspharma, leader EU transport pharmaceutique",
                  "Rencontrés chez Eurotranspharma — 15 ans compliance, 20 ans transport",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[14px]" style={{ color: "#5E7485" }}>
                    <span className="font-bold flex-shrink-0 mt-0.5" style={{ color: "#4A7B8C" }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div className="flex flex-col gap-2.5 mt-6">
              {PRODUCTS.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center gap-3 rounded-xl border px-4 py-3"
                  style={{ borderColor: "#D5DFE5", background: "#F5F7F8" }}
                >
                  <span className="text-xl">{p.emoji}</span>
                  <div className="flex-1">
                    <span className="font-bold text-[14px]" style={{ color: "#1C2B35" }}>{p.name}</span>
                    <span className="text-[12px] ml-2" style={{ color: "#5E7485" }}>— {p.desc}</span>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                    style={p.statusStyle}
                  >
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Founders */}
          <div className="flex flex-col gap-4">
            {/* Vivien */}
            <div className="rounded-2xl border-2 p-6" style={{ borderColor: "#D5DFE5" }}>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full font-black text-lg text-white"
                  style={{ background: "#1C2B35" }}
                >
                  V
                </div>
                <div>
                  <div className="font-black text-base" style={{ color: "#1C2B35" }}>Vivien</div>
                  <div className="text-[12px] font-semibold" style={{ color: "#4A7B8C" }}>
                    Co-fondateur — Produit & Compliance
                  </div>
                </div>
              </div>
              <ul className="space-y-1">
                {[
                  "Lean Six Sigma Black Belt — Expert QHSE",
                  "ISO 9001, GDP, ADR, 14001, 45001",
                  "15 ans terrain transport pharma & multi-sectoriel",
                  "Fondateur VYXO Consulting",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px]" style={{ color: "#5E7485" }}>
                    <span className="font-bold flex-shrink-0" style={{ color: "#4A7B8C" }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Wyssam */}
            <div className="rounded-2xl border-2 p-6" style={{ borderColor: "#D5DFE5" }}>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full font-black text-lg text-white"
                  style={{ background: "#1C2B35" }}
                >
                  W
                </div>
                <div>
                  <div className="font-black text-base" style={{ color: "#1C2B35" }}>Wyssam</div>
                  <div className="text-[12px] font-semibold" style={{ color: "#4A7B8C" }}>
                    Co-fondateur — Métier & Réseau
                  </div>
                </div>
              </div>
              <ul className="space-y-1">
                {[
                  "20 ans transport — Chauffeur → Direction",
                  "Réseau opérationnel transporteurs France",
                  "Vision terrain du problème ClearGo adresse",
                  "Fondateur ArtTrans — événementiel & cinéma",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px]" style={{ color: "#5E7485" }}>
                    <span className="font-bold flex-shrink-0" style={{ color: "#4A7B8C" }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
