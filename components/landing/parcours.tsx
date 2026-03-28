"use client"

import { useEffect, useRef, useState } from "react"

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

const ETAPES = [
  {
    num: "01",
    badge: "Gratuit",
    badgeBg: "#F0F4F8",
    badgeColor: "#4A5A72",
    title: "Pré-qualification",
    time: "5 minutes",
    items: [
      "Questions clés sur votre activité",
      "Identification de vos obligations réelles",
      "Prise de conscience de votre niveau",
    ],
    note: "Gratuite. De qualité. Elle donne envie d'aller plus loin.",
    accent: "#E2E8F0",
  },
  {
    num: "02",
    badge: "199 €",
    badgeBg: "#FFF3E0",
    badgeColor: "#E65100",
    title: "Diagnostic complet",
    time: "Dispo à partir de juin · 299 € standard",
    items: [
      "Préparation documentaire guidée en amont",
      "Paiement à cette étape uniquement",
      "Diagnostic offert si engagement accompagnement (offre SITL)",
    ],
    note: "Fenêtre active : 5 à 7 jours",
    accent: "#FFCC80",
  },
  {
    num: "03",
    badge: "45 min",
    badgeBg: "#E6F7F5",
    badgeColor: "#00A896",
    title: "Session accompagnée",
    time: "En live avec vous — incluse dans le diagnostic",
    items: [
      "Documents préparés en amont par vous",
      "Session de 45 min pour remplir correctement",
      "Accompagnement humain concret",
    ],
    note: "Pas juste technique. De la vraie valeur humaine.",
    accent: "#00A896",
  },
  {
    num: "04",
    badge: "24h",
    badgeBg: "#EEF2FF",
    badgeColor: "#0D2B4E",
    title: "Score + Plan d'action",
    time: "Résultat garanti sous 24h",
    items: [
      "Trust Score 0–1000 calculé",
      "Rapport PDF certifié partageable",
      "Plan d'action priorisé personnalisé",
    ],
    note: "Preuve commerciale immédiatement utilisable.",
    accent: "#0D2B4E",
  },
  {
    num: "05",
    badge: "99 €/mois",
    badgeBg: "#E6F7F5",
    badgeColor: "#00A896",
    title: "Abonnement CaaS",
    time: "Suivi continu",
    items: [
      "Score mis à jour en temps réel",
      "Chatbot compliance intégré",
      "Templates & outils de progression",
    ],
    note: "Progression dans le temps. Pas un one-shot.",
    accent: "#00A896",
  },
]

interface ParcoursProps {
  onCta: () => void
}

export function Parcours({ onCta }: ParcoursProps) {
  const { ref, visible } = useReveal()

  return (
    <section id="parcours" className="bg-[#F0F4F8] py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div
          className="mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <div className="section-eyebrow mb-4">Le parcours CaaS</div>
          <h2
            className="font-black text-[#0D2B4E]"
            style={{ fontSize: "clamp(32px, 4.5vw, 56px)", letterSpacing: "-2px", lineHeight: 1.05 }}
          >
            Un parcours humain,
            <br />
            progressif et actionnable.
          </h2>
          <p className="mt-3 text-[17px] italic text-[#00A896]">Réservé aux transporteurs. Pas une usine à gaz.</p>
        </div>

        {/* Steps — vertical on mobile, horizontal table on desktop */}
        <div className="flex flex-col gap-0 lg:overflow-x-auto">
          {/* Desktop: row layout */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-px bg-[#E2E8F0] rounded-2xl overflow-hidden">
            {ETAPES.map((e, i) => (
              <div
                key={e.num}
                className="bg-white p-7 flex flex-col gap-4"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(32px)",
                  transition: `all 0.8s cubic-bezier(0.25,0.1,0.25,1) ${i * 100}ms`,
                }}
              >
                {/* Number + badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black tracking-widest text-[#E2E8F0]">{e.num}</span>
                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-black"
                    style={{ background: e.badgeBg, color: e.badgeColor }}
                  >
                    {e.badge}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-[15px] font-black text-[#0D2B4E] leading-tight">{e.title}</h3>
                  <p className="mt-0.5 text-[11px] text-[#00A896] font-semibold">{e.time}</p>
                </div>

                {/* Items */}
                <ul className="flex-1 flex flex-col gap-2">
                  {e.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[12px] text-[#4A5A72] leading-relaxed">
                      <span className="mt-0.5 flex-shrink-0 h-3.5 w-3.5 rounded-full bg-[#F0F4F8] flex items-center justify-center">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: e.accent }} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Note */}
                <div
                  className="mt-auto rounded-lg px-3 py-2 text-[11px] font-medium leading-relaxed"
                  style={{ background: e.badgeBg, color: e.badgeColor }}
                >
                  → {e.note}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: vertical stack */}
          <div className="lg:hidden flex flex-col gap-3">
            {ETAPES.map((e, i) => (
              <div
                key={e.num}
                className="bg-white rounded-2xl p-6"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transition: `all 0.8s cubic-bezier(0.25,0.1,0.25,1) ${i * 80}ms`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-black tracking-widest text-[#E2E8F0]">{e.num}</span>
                  <span className="rounded-full px-3 py-1 text-[11px] font-black" style={{ background: e.badgeBg, color: e.badgeColor }}>
                    {e.badge}
                  </span>
                </div>
                <h3 className="text-[16px] font-black text-[#0D2B4E]">{e.title}</h3>
                <p className="text-[12px] text-[#00A896] font-semibold mb-3">{e.time}</p>
                <ul className="flex flex-col gap-1.5 mb-3">
                  {e.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13px] text-[#4A5A72]">
                      <span className="mt-1 flex-shrink-0 h-2 w-2 rounded-full" style={{ background: e.accent }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="rounded-lg px-3 py-2 text-[12px] font-medium" style={{ background: e.badgeBg, color: e.badgeColor }}>
                  → {e.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <div
          className="mt-12 rounded-2xl bg-[#0D2B4E] px-8 py-8 lg:px-12 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.55s",
          }}
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#00A896]/40 bg-[#00A896]/10 px-4 py-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A896]">Compliance as a Service</span>
          </div>
          <p className="text-[18px] font-bold text-white/70 mb-2">
            La pré-qualification, c'est maintenant — c'est gratuit.
          </p>
          <p className="text-[18px] font-bold text-white mb-6">
            Le diagnostic complet vous attend à partir de juin.
          </p>
          <button
            onClick={onCta}
            data-cta
            className="btn-press inline-flex items-center gap-2 rounded-2xl bg-[#00A896] px-8 py-4 text-[16px] font-bold text-white"
            style={{ boxShadow: "0 8px 32px -4px rgba(0,168,150,0.4)" }}
          >
            Démarrer ma pré-qualification →
          </button>
          <p className="mt-3 text-[13px] text-white/35">Transporteurs uniquement · Sans engagement</p>
        </div>
      </div>
    </section>
  )
}
