"use client"

import { useEffect, useRef, useState } from "react"

interface CtaFinalProps {
  onCta: () => void
}

export function CtaFinal({ onCta }: CtaFinalProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contact" className="bg-[#081B32] py-24 lg:py-36 overflow-hidden" ref={ref}>
      {/* Mesh gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,168,150,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 flex flex-col items-center text-center">

        {/* Headline */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.9s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <h2
            className="font-black text-white"
            style={{ fontSize: "clamp(36px, 5.5vw, 72px)", letterSpacing: "-3px", lineHeight: 1.02 }}
          >
            Votre camion parle.
            <br />
            <span style={{ color: "#00A896" }}>Faites-lui dire</span>
            <br />
            la vérité.
          </h2>
        </div>

        {/* Card */}
        <div
          className="mt-14 w-full max-w-lg rounded-3xl bg-white p-8 lg:p-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
            transition: "all 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.15s",
            boxShadow: "0 40px 80px -20px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        >
          <div className="mb-1 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#00A896]">
            <span className="h-px w-6 bg-[#00A896]" />
            Diagnostic
            <span className="h-px w-6 bg-[#00A896]" />
          </div>
          <h3 className="text-[22px] font-black text-[#0D2B4E] mb-1">
            Transporteurs : démarrez maintenant
          </h3>
          <p className="text-[14px] text-[#4A5A72] mb-6">
            Pré-qualification gratuite · Diagnostic 299 € HT · Abonnement CaaS 99 € HT/mois
          </p>

          <button
            onClick={onCta}
            data-cta
            className="btn-press w-full rounded-2xl bg-[#00A896] py-4 text-[17px] font-extrabold text-white mb-3"
            style={{ boxShadow: "0 8px 32px -4px rgba(0,168,150,0.45)" }}
          >
            Démarrer ma pré-qualification gratuite →
          </button>

          <p className="text-[12px] text-[#94A3B8]">Réservé aux transporteurs · Sans engagement · 5 minutes</p>

          {/* SITL badge */}
          <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
            <span className="text-base">🏆</span>
            <p className="text-[13px] font-semibold text-[#0D2B4E]">
              Offre SITL 2026 — 3 mois offerts + tarif fondateur à vie
            </p>
          </div>
        </div>

        {/* Transporteur proof points */}
        <div
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.35s",
          }}
        >
          {[
            { icon: "🚛", title: "Transporteurs TRM", desc: "Notre cible principale" },
            { icon: "📋", title: "Conformité terrain", desc: "Pas de jargon inutile" },
            { icon: "🔒", title: "Données sécurisées", desc: "Hébergées en France" },
          ].map((a) => (
            <div key={a.title} className="flex flex-col items-center gap-2 text-white/50">
              <span className="text-3xl">{a.icon}</span>
              <span className="font-bold text-white text-[15px]">{a.title}</span>
              <span className="text-[13px]">{a.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
