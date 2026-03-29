"use client"

import { useEffect, useRef, useState } from "react"

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
            Vos obligations réglementaires,
            <br />
            <span style={{ color: "#00A896" }}>pilotées en continu.</span>
          </h2>
        </div>

        {/* Two-column photo grid */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Card 1 — Dashboard compliance */}
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: "all 0.9s cubic-bezier(0.25,0.1,0.25,1) 0.1s",
            }}
          >
            <div
              className="relative flex flex-col justify-between p-8"
              style={{
                aspectRatio: "4/3",
                background: "linear-gradient(135deg, #0D2B4E 0%, #0A3D62 60%, #0D4F52 100%)",
              }}
            >
              {/* Dot grid texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              {/* Mock score ring */}
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">Trust Score</p>
                  <p className="text-[64px] font-black leading-none text-white" style={{ letterSpacing: "-3px" }}>820</p>
                  <p className="text-[13px] text-white/50">/ 1000 pts</p>
                </div>
                <div className="rounded-2xl bg-[#00A896]/20 border border-[#00A896]/40 px-4 py-2">
                  <p className="text-[11px] font-bold text-[#00A896]">NIVEAU OR</p>
                </div>
              </div>
              <div className="relative z-10 mt-auto">
                <div className="mb-3 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/8 border border-white/10 px-3 py-2">
                    <p className="text-[10px] text-white/40 mb-0.5">RÉGLO</p>
                    <p className="text-[18px] font-black text-white">418<span className="text-[12px] font-normal text-white/40">/500</span></p>
                  </div>
                  <div className="rounded-xl bg-[#00A896]/15 border border-[#00A896]/30 px-3 py-2">
                    <p className="text-[10px] text-[#00A896]/70 mb-0.5">EXCELLENCE</p>
                    <p className="text-[18px] font-black text-[#00A896]">402<span className="text-[12px] font-normal text-[#00A896]/50">/500</span></p>
                  </div>
                </div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#00A896] px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" style={{ animation: "pulse-dot 2s infinite" }} />
                  <span className="text-[11px] font-bold text-white">Score en direct</span>
                </div>
                <h3 className="text-[18px] font-black text-white leading-tight">
                  Votre tableau de bord tout-en-un
                </h3>
                <p className="mt-1 text-[13px] text-white/60">
                  Score global · Formation · Risques · Documents
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 — Transporteur sur route */}
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: "all 0.9s cubic-bezier(0.25,0.1,0.25,1) 0.22s",
            }}
          >
            <div
              className="relative flex flex-col justify-between p-8"
              style={{
                aspectRatio: "4/3",
                background: "linear-gradient(135deg, #04111F 0%, #062038 50%, #00524A 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">Statut véhicule</p>
                  <p className="mt-1 text-[22px] font-black text-white leading-tight">En route.</p>
                  <p className="text-[14px] text-[#00A896]">Zéro anomalie détectée</p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00A896]/20 border border-[#00A896]/40 text-3xl">
                  🚛
                </div>
              </div>
              <div className="relative z-10 mt-auto">
                <div className="mb-4 flex flex-col gap-2">
                  {[
                    { label: "Licence transport", status: "✅ Valide" },
                    { label: "Contrôle technique", status: "✅ À jour" },
                    { label: "FCO conducteurs", status: "✅ Certifiés" },
                  ].map(({ label, status }) => (
                    <div key={label} className="flex items-center justify-between rounded-xl bg-white/6 border border-white/10 px-4 py-2.5">
                      <span className="text-[13px] text-white/70">{label}</span>
                      <span className="text-[12px] font-bold text-[#00A896]">{status}</span>
                    </div>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm">
                  <span className="text-[11px] font-bold text-white">✅ Certifié — Partageable en 1 clic</span>
                </div>
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
          <p className="mt-3 text-[13px] text-[#94A3B8]">Diagnostic disponible à partir de juin · 299 €</p>
        </div>
      </div>
    </section>
  )
}
