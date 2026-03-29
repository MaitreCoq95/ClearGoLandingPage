"use client"

import { useEffect, useRef, useState } from "react"

const PRODUCTS = [
  {
    emoji: "🚛",
    name: "ClearGo",
    status: "Actif",
    statusColor: "bg-[#00A896] text-white",
    desc: "Conformité & Trust Score transporteurs",
  },
  {
    emoji: "💊",
    name: "Gaby",
    status: "En dev",
    statusColor: "bg-orange-100 text-orange-700",
    desc: "Livraison pharmaceutique GDP-native",
  },
  {
    emoji: "🎬",
    name: "TurtleRun",
    status: "En dev",
    statusColor: "bg-orange-100 text-orange-700",
    desc: "Transport B2B événementiel & cinéma",
  },
  {
    emoji: "🔒",
    name: "Projet confidentiel",
    status: "2027",
    statusColor: "bg-gray-100 text-gray-600",
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
    <section id="team" className="bg-white py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div
          className={`text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="font-black text-4xl leading-tight tracking-tight text-[#0D2B4E] lg:text-5xl">
            L'équipe derrière ClearGo
          </h2>
          <p className="mt-3 text-xl italic text-[#00A896]">15 ans terrain. Fondée par des professionnels du transport.</p>
        </div>

        {/* 2-col layout */}
        <div
          className={`mt-14 grid gap-10 lg:grid-cols-2 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          {/* LEFT — Little Flock */}
          <div>
            <div className="mb-5">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#00A896]/30 bg-[#00A896]/8 px-3 py-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A896]">Little Flock</span>
              </div>
              <p className="text-[15px] font-bold text-[#0D2B4E] mb-1">Studio parisien de produits SaaS dédiés au transport & à la conformité</p>
              <p className="text-[13px] text-[#4A5A72] mb-3">ClearGo est le premier produit du studio. D'autres suivront pour d'autres verticales transport.</p>
              <ul className="space-y-2">
                {[
                  "50+ projets terrain communs — Eurotranspharma, leader EU transport pharmaceutique",
                  "Rencontrés chez Eurotranspharma — 15 ans compliance, 20 ans transport",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[14px] text-[#4A5A72]">
                    <span className="text-[#00A896] font-bold flex-shrink-0 mt-0.5">•</span>
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
                  className="flex items-center gap-3 rounded-xl border border-[#DDE4F0] bg-[#F8FAFC] px-4 py-3"
                >
                  <span className="text-xl">{p.emoji}</span>
                  <div className="flex-1">
                    <span className="font-bold text-[#0D2B4E] text-[14px]">{p.name}</span>
                    <span className="text-[12px] text-[#4A5A72] ml-2">— {p.desc}</span>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${p.statusColor}`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Founders */}
          <div className="flex flex-col gap-4">
            {/* Vivien */}
            <div className="rounded-2xl border-2 border-[#DDE4F0] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#0D2B4E] font-black text-lg text-white">
                  V
                </div>
                <div>
                  <div className="font-black text-[#0D2B4E] text-base">Vivien</div>
                  <div className="text-[#00A896] text-[12px] font-semibold">
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
                  <li key={item} className="flex items-start gap-2 text-[13px] text-[#4A5A72]">
                    <span className="text-[#00A896] font-bold flex-shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Wyssam */}
            <div className="rounded-2xl border-2 border-[#DDE4F0] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#0D2B4E] font-black text-lg text-white">
                  W
                </div>
                <div>
                  <div className="font-black text-[#0D2B4E] text-base">Wyssam</div>
                  <div className="text-[#00A896] text-[12px] font-semibold">
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
                  <li key={item} className="flex items-start gap-2 text-[13px] text-[#4A5A72]">
                    <span className="text-[#00A896] font-bold flex-shrink-0">•</span>
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
