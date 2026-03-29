"use client"

import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"

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

interface PricingProps {
  onCta: () => void
}

export function Pricing({ onCta }: PricingProps) {
  const { ref, visible } = useReveal()

  return (
    <section id="pricing" className="bg-white py-24 lg:py-32" ref={ref}>
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
          <div className="section-eyebrow mb-4" style={{ justifyContent: "center" }}>Tarifs CaaS</div>
          <h2
            className="font-black text-[#0D2B4E]"
            style={{ fontSize: "clamp(32px, 4.5vw, 56px)", letterSpacing: "-2px", lineHeight: 1.05 }}
          >
            Diagnostic d'abord. Abonnement ensuite.
          </h2>
          <p className="mt-3 text-[16px] text-[#4A5A72]">
            Une amende DRIEAT couvre un an d'abonnement. Commencez par la pré-qualification gratuite.
          </p>
        </div>

        {/* SITL Promo Banner */}
        <div
          className="mb-8 rounded-2xl border-2 border-[#F97316] bg-[#FFF7ED] px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.1s",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#F97316]/15 text-2xl">🏆</div>
            <div>
              <div className="text-[12px] font-black uppercase tracking-wider text-[#F97316]">Offre SITL 2026 — Tarif fondateur</div>
              <p className="mt-0.5 text-[15px] font-bold text-[#0D2B4E]">
                Diagnostic complet à <span className="text-[#F97316]">199 € HT</span> au lieu de 299 € HT — engagement accompagnement CaaS requis
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 text-center">
            <div className="rounded-xl bg-[#F97316] px-5 py-2 text-[13px] font-black text-white">
              Offre limitée · SITL
            </div>
            <p className="mt-1 text-[11px] text-[#94A3B8]">Valable jusqu'au 30 juin 2026</p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          {/* ① Diagnostic */}
          <div
            className="card-lift relative flex flex-col rounded-3xl border-2 border-[#00A896] bg-white p-7"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0ms",
            }}
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#00A896] px-4 py-1.5 text-[11px] font-black text-white">
              Recommandé
            </div>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">Diagnostic</p>
            <div className="mt-3 flex items-baseline">
              <span className="text-[52px] font-black leading-none text-[#00A896]" style={{ letterSpacing: "-3px" }}>299</span>
              <span className="ml-1 text-[20px] font-bold text-[#00A896]">€</span>
            </div>
            <p className="text-[12px] italic text-[#94A3B8] mt-0.5">Paiement unique HT — résultat sous 48h</p>
            <ul className="mt-6 flex-1 flex flex-col gap-2.5">
              {[
                "Pré-qualification gratuite incluse",
                "Préparation documentaire guidée",
                "Session accompagnée 45 min incluse",
                "Trust Score 0–1000 + rapport PDF + plan d'action",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[13px] text-[#4A5A72]">
                  <Check className="h-4 w-4 text-[#00A896] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] text-[#E65100] font-semibold">🎁 Diagnostic offert si engagement accompagnement (SITL)</p>
            <button
              onClick={onCta}
              data-cta
              className="btn-press mt-3 w-full rounded-2xl bg-[#00A896] py-3.5 text-[14px] font-bold text-white"
              style={{ boxShadow: "0 4px 16px -4px rgba(0,168,150,0.4)" }}
            >
              Démarrer ma pré-qualification →
            </button>
          </div>

          {/* ② Abonnement CaaS */}
          <div
            className="card-lift flex flex-col rounded-3xl border-2 border-[#E2E8F0] bg-white p-7"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 80ms",
            }}
          >
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">Abonnement CaaS</p>
            <div className="mt-3 flex items-baseline">
              <span className="text-[42px] font-black leading-none text-[#0D2B4E]" style={{ letterSpacing: "-2px" }}>99</span>
              <span className="ml-1 text-[16px] font-bold text-[#0D2B4E]">€</span>
              <span className="ml-1 text-[13px] text-[#94A3B8]">HT/mois</span>
            </div>
            <p className="text-[12px] italic text-[#94A3B8] mt-0.5">Compliance as a Service · À partir de · HT</p>
            <ul className="mt-6 flex-1 flex flex-col gap-2.5">
              {["Score RÉGLO en continu", "Chatbot compliance intégré", "Accès templates & outils de base"].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[13px] text-[#4A5A72]">
                  <Check className="h-4 w-4 text-[#0D2B4E] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="btn-press mt-7 block w-full rounded-2xl border-2 border-[#0D2B4E] py-3.5 text-center text-[14px] font-bold text-[#0D2B4E] hover:bg-[#0D2B4E] hover:text-white transition-colors"
            >
              En savoir plus
            </a>
          </div>

          {/* ③ Pro */}
          <div
            className="card-lift relative flex flex-col rounded-3xl border-2 border-[#00A896] bg-white p-7 shadow-xl lg:scale-[1.03]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 160ms",
            }}
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#00A896] px-4 py-1.5 text-[11px] font-black text-white">
              Populaire
            </div>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">Pro</p>
            <div className="mt-3">
              <span className="text-[36px] font-black leading-none text-[#00A896]" style={{ letterSpacing: "-1px" }}>À venir</span>
            </div>
            <p className="text-[12px] italic text-[#94A3B8] mt-0.5">Tarif en cours de calibrage</p>
            <ul className="mt-6 flex-1 flex flex-col gap-2.5">
              {["Score RÉGLO + EXCELLENCE", "Modules ISO 9001, ADR", "Partage client PDF + lien", "Alertes proactives IA"].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[13px] text-[#4A5A72]">
                  <Check className="h-4 w-4 text-[#00A896] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  {f}
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn-press mt-7 block w-full rounded-2xl border-2 border-[#00A896] py-3.5 text-center text-[14px] font-bold text-[#00A896] hover:bg-[#00A896] hover:text-white transition-colors">
              Être notifié
            </a>
          </div>

          {/* ④ Complet */}
          <div
            className="card-lift flex flex-col rounded-3xl border-2 border-[#E2E8F0] bg-white p-7"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 240ms",
            }}
          >
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">Complet</p>
            <div className="mt-3">
              <span className="text-[36px] font-black leading-none text-[#0D2B4E]" style={{ letterSpacing: "-1px" }}>À venir</span>
            </div>
            <p className="text-[12px] italic text-[#94A3B8] mt-0.5">Tarif en cours de calibrage</p>
            <ul className="mt-6 flex-1 flex flex-col gap-2.5">
              {["Tous modules GDP, ADR, CSR", "IA avancée + multi-clients", "OPCO / financement à venir", "Utilisateurs illimités"].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[13px] text-[#4A5A72]">
                  <Check className="h-4 w-4 text-[#0D2B4E] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  {f}
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn-press mt-7 block w-full rounded-2xl border-2 border-[#0D2B4E] py-3.5 text-center text-[14px] font-bold text-[#0D2B4E] hover:bg-[#0D2B4E] hover:text-white transition-colors">
              Être notifié
            </a>
          </div>
        </div>

        {/* Legal note */}
        <div
          className="mt-8 mx-auto max-w-2xl flex items-start gap-3 rounded-xl border-l-[3px] border-[#00A896] bg-[#F8FAFC] px-5 py-4"
          style={{
            opacity: visible ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 380ms",
          }}
        >
          <span className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-[#00A896]/15 flex items-center justify-center text-[10px] font-black text-[#00A896]">i</span>
          <p className="text-[12px] leading-relaxed text-[#4A5A72]">
            ClearGo n'est pas un organisme certificateur. Nos modules vous donnent les bases documentaires pour engager votre conformité. La certification reste délivrée par un organisme accrédité de votre choix.
          </p>
        </div>

        {/* Module badges */}
        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          style={{
            opacity: visible ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 450ms",
          }}
        >
          {[["🚛", "Transport"], ["💊", "GDP Pharma"], ["⚠️", "ADR"], ["📋", "ISO 9001"], ["🌿", "RSE / CSR"], ["🦺", "QHSE"]].map(([icon, label]) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-[13px] font-semibold text-[#0D2B4E]"
            >
              <span>{icon}</span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
