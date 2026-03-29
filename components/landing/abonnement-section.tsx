"use client"

import { useEffect, useRef, useState } from "react"
import { RefreshCw, Bell, ShieldCheck, TrendingUp, Clock, Euro } from "lucide-react"

function useReveal(threshold = 0.08) {
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

const REASONS = [
  {
    icon: RefreshCw,
    title: "La réglementation évolue en continu",
    desc: "FCO, FIMO, licences transport, contrôles techniques — les délais bougent, les textes aussi. ClearGo surveille à votre place et met votre score à jour automatiquement.",
  },
  {
    icon: Bell,
    title: "Alertes avant les problèmes",
    desc: "Un document expire dans 30 jours ? Un contrôle DRIEAT approche ? Vous êtes prévenu avant, pas après. Zéro mauvaise surprise sur la route.",
  },
  {
    icon: ShieldCheck,
    title: "Un Trust Score toujours actuel",
    desc: "Votre donneur d'ordre vérifie en temps réel. Un score obsolète, c'est une opportunité perdue. L'abonnement garantit que votre score reflète votre réalité du jour.",
  },
]

const ROI_ROWS = [
  {
    label: "Temps mensuel conformité",
    without: "8 – 12 h/mois",
    with: "< 1 h/mois",
    highlight: false,
  },
  {
    label: "Risque de contrôle raté",
    without: "Élevé — amendes, immobilisation",
    with: "Faible — score surveillé en continu",
    highlight: false,
  },
  {
    label: "Coût d'un contrôle DRIEAT hors conformité",
    without: "5 000 € – 15 000 € + mise hors route",
    with: "0 € (anomalies détectées avant)",
    highlight: true,
  },
  {
    label: "Appels d'offres remportés",
    without: "Score non partageable",
    with: "+2 à 4 AO/an en moyenne (bêta)",
    highlight: false,
  },
  {
    label: "Coût annuel",
    without: "0 € (coût caché : temps + risques)",
    with: "1 188 € HT/an",
    highlight: false,
  },
  {
    label: "Retour sur investissement estimé",
    without: "—",
    with: "× 8 minimum (1 contrôle évité = ROI)",
    highlight: true,
  },
]

export function AbonnementSection() {
  const { ref, visible } = useReveal()

  return (
    <section id="abonnement" className="bg-[#F0F4F8] py-24 lg:py-32" ref={ref}>
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00A896]/40 bg-[#00A896]/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00A896]" />
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#00A896]">
              Abonnement CaaS · 99 € HT/mois
            </span>
          </div>
          <h2
            className="mt-3 font-black text-[#0D2B4E]"
            style={{ fontSize: "clamp(30px, 4vw, 52px)", letterSpacing: "-2px", lineHeight: 1.06 }}
          >
            Pourquoi 99 € HT par mois ?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-[17px] text-[#4A5A72]">
            La réglementation transport ne s'arrête jamais. Votre service ClearGo non plus.
            Voici pourquoi l'abonnement est rentable dès le premier mois.
          </p>
        </div>

        {/* 3 reasons */}
        <div
          className="grid gap-6 md:grid-cols-3 mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.1s",
          }}
        >
          {REASONS.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="rounded-2xl bg-white border border-[#E2E8F0] p-7"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `all 0.7s cubic-bezier(0.25,0.1,0.25,1) ${150 + i * 80}ms`,
              }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00A896]/10">
                <Icon className="h-6 w-6 text-[#00A896]" strokeWidth={2} />
              </div>
              <h3 className="text-[16px] font-black text-[#0D2B4E] mb-2">{title}</h3>
              <p className="text-[13px] leading-relaxed text-[#4A5A72]">{desc}</p>
            </div>
          ))}
        </div>

        {/* ROI Table */}
        <div
          className="rounded-3xl bg-white border border-[#E2E8F0] overflow-hidden"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.9s cubic-bezier(0.25,0.1,0.25,1) 0.3s",
            boxShadow: "0 24px 60px -12px rgba(13,43,78,0.08)",
          }}
        >
          {/* Table header */}
          <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-[#0D2B4E] px-6 py-4">
            <div className="text-[12px] font-bold uppercase tracking-widest text-white/50">Critère</div>
            <div className="text-[12px] font-bold uppercase tracking-widest text-white/50">Sans ClearGo</div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00A896]" />
              <span className="text-[12px] font-bold uppercase tracking-widest text-[#00A896]">Avec ClearGo</span>
            </div>
          </div>

          {/* Rows */}
          {ROI_ROWS.map(({ label, without, with: withVal, highlight }, i) => (
            <div
              key={label}
              className={`grid grid-cols-[1.5fr_1fr_1fr] px-6 py-4 gap-4 items-center ${
                highlight ? "bg-[#00A896]/5 border-l-4 border-[#00A896]" : i % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"
              }`}
            >
              <div className={`text-[13px] font-semibold ${highlight ? "text-[#0D2B4E] font-bold" : "text-[#0D2B4E]"}`}>
                {label}
              </div>
              <div className="text-[13px] text-[#94A3B8]">{without}</div>
              <div className={`text-[13px] font-bold ${highlight ? "text-[#00A896]" : "text-[#0D2B4E]"}`}>
                {withVal}
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E2E8F0] bg-[#F8FAFC] px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D2B4E]">
                <TrendingUp className="h-5 w-5 text-[#00A896]" />
              </div>
              <p className="text-[14px] font-bold text-[#0D2B4E]">
                1 contrôle DRIEAT évité = abonnement rentabilisé pour <span className="text-[#00A896]">10 ans</span>
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-[#00A896] px-5 py-2.5">
              <Euro className="h-4 w-4 text-white" />
              <span className="text-[14px] font-black text-white">99 € HT/mois</span>
            </div>
          </div>
        </div>

        {/* Bottom callout */}
        <div
          className="mt-8 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.5s",
          }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-5 py-2.5">
            <Clock className="h-4 w-4 text-[#94A3B8]" />
            <span className="text-[13px] text-[#4A5A72]">
              Sans engagement · Résiliable à tout moment · Inclus dans le tarif fondateur SITL
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
