"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

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

interface PhotoShowcaseProps {
  onCta: () => void
}

export function PhotoShowcase({ onCta }: PhotoShowcaseProps) {
  const { ref, visible } = useReveal()

  return (
    <section className="bg-white py-20 lg:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div
          className="mb-12 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#00A896]/40 bg-[#00A896]/8 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00A896]" />
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#00A896]">
              CaaS — Compliance as a Service
            </span>
          </div>
          <h2
            className="mt-3 font-black text-[#0D2B4E]"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-2px", lineHeight: 1.08 }}
          >
            La conformité, gérée pour vous.
            <br />
            <span style={{ color: "#00A896" }}>En continu. Pour les transporteurs.</span>
          </h2>
        </div>

        {/* Two-column photo grid */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Photo 1 — Dashboard compliance */}
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: "all 0.9s cubic-bezier(0.25,0.1,0.25,1) 0.1s",
            }}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/hero-dashboard.jpg"
                alt="Dashboard ClearGo — Score de conformité temps réel"
                fill
                className="object-cover"
              />
              {/* Overlay gradient */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(13,43,78,0.85) 0%, rgba(13,43,78,0.2) 50%, transparent 100%)" }}
              />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#00A896] px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" style={{ animation: "pulse-dot 2s infinite" }} />
                  <span className="text-[11px] font-bold text-white">Score en direct</span>
                </div>
                <h3 className="text-[18px] font-black text-white leading-tight">
                  Votre tableau de bord compliance
                </h3>
                <p className="mt-1 text-[13px] text-white/70">
                  Score global · Formation · Risques · Documents — tout en un coup d'œil
                </p>
              </div>
            </div>
          </div>

          {/* Photo 2 — Woman at trucking office */}
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: "all 0.9s cubic-bezier(0.25,0.1,0.25,1) 0.22s",
            }}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/transport-fleet.jpg"
                alt="Responsable conformité transporteur — ClearGo"
                fill
                className="object-cover"
              />
              {/* Overlay gradient */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(13,43,78,0.85) 0%, rgba(13,43,78,0.2) 50%, transparent 100%)" }}
              />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 backdrop-blur-sm">
                  <span className="text-[11px] font-bold text-white">✅ Compliance Certified</span>
                </div>
                <h3 className="text-[18px] font-black text-white leading-tight">
                  Certifié, sans effort supplémentaire
                </h3>
                <p className="mt-1 text-[13px] text-white/70">
                  Votre responsable conformité pilote tout depuis ClearGo
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CaaS Value proposition row */}
        <div
          className="mt-8 grid gap-4 sm:grid-cols-3"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.4s",
          }}
        >
          {[
            { icon: "📊", title: "Score en temps réel", desc: "Votre niveau de conformité mis à jour en continu — sans saisie manuelle." },
            { icon: "🔔", title: "Alertes proactives", desc: "Documents qui expirent, licences à renouveler : on vous prévient avant." },
            { icon: "📄", title: "Preuves partageables", desc: "Un lien ou un PDF. Votre donneur d'ordre vérifie en 10 secondes." },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6"
            >
              <span className="text-2xl">{icon}</span>
              <h4 className="mt-3 text-[15px] font-black text-[#0D2B4E]">{title}</h4>
              <p className="mt-1 text-[13px] leading-relaxed text-[#4A5A72]">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-10 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.55s",
          }}
        >
          <button
            onClick={onCta}
            data-cta
            className="btn-press inline-flex items-center gap-2 rounded-2xl bg-[#0D2B4E] px-8 py-4 text-[15px] font-bold text-white"
          >
            Je suis transporteur — pré-qualification gratuite →
          </button>
          <p className="mt-3 text-[13px] text-[#94A3B8]">Diagnostic disponible à partir de juin · 199 € SITL</p>
        </div>
      </div>
    </section>
  )
}
