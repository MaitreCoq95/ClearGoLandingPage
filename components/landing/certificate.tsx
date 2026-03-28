"use client"

import { useEffect, useRef, useState } from "react"
import { Check, QrCode, Download, RefreshCw, Clock } from "lucide-react"

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
  }, [])
  return { ref, visible }
}

const FEATURES = [
  { icon: Download,    label: "PDF certifié",           sub: "Téléchargeable & imprimable" },
  { icon: QrCode,      label: "QR code vérifiable",     sub: "Lien direct vers le score live" },
  { icon: RefreshCw,   label: "Mis à jour en continu",  sub: "Reflète votre score du jour" },
  { icon: Clock,       label: "Horodaté & traçable",    sub: "Audit trail complet" },
]

export function Certificate() {
  const { ref, visible } = useReveal()

  return (
    <section id="certificate" className="bg-[#F8FAFC] py-24 lg:py-32" ref={ref}>
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
          <div className="section-eyebrow mb-4" style={{ justifyContent: "center" }}>Le ClearGo Certificate</div>
          <h2
            className="font-black text-[#0D2B4E]"
            style={{ fontSize: "clamp(30px, 4vw, 52px)", letterSpacing: "-2px", lineHeight: 1.06 }}
          >
            Votre preuve de conformité.
            <br />
            <span style={{ color: "#00A896" }}>En 1 document. 1 QR code.</span>
          </h2>
          <p className="mt-4 text-[16px] text-[#4A5A72] max-w-xl mx-auto">
            Généré pour les transporteurs en accompagnement CaaS. Partageable instantanément avec n&apos;importe quel donneur d&apos;ordre ou auditeur.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-orange-300 bg-orange-50 px-4 py-1.5">
            <span className="text-[12px] font-bold text-orange-600">🏆 Réservé aux clients accompagnement — non inclus dans le diagnostic seul</span>
          </div>
        </div>

        {/* Main layout */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center">

          {/* LEFT — Mock certificate */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: "all 0.9s cubic-bezier(0.25,0.1,0.25,1) 80ms",
            }}
          >
            <div
              className="relative rounded-3xl bg-white border border-[#E2E8F0] p-8 lg:p-10"
              style={{ boxShadow: "0 24px 60px -12px rgba(13,43,78,0.12)" }}
            >
              {/* Certificate header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-2 w-2 rounded-full bg-[#00A896]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#00A896]">Certificat ClearGo</span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8]">Émis le 20/03/2026 · Valide 12 mois</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0D2B4E]">
                  <QrCode className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Company block */}
              <div className="mb-6 rounded-xl bg-[#F8FAFC] px-5 py-4">
                <p className="text-[12px] text-[#94A3B8] mb-1">Transporteur certifié</p>
                <p className="text-[18px] font-black text-[#0D2B4E]">Transports Dupont & Fils</p>
                <p className="text-[12px] text-[#4A5A72]">N° SIREN : 823 456 789 · Île-de-France</p>
              </div>

              {/* Scores */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="rounded-xl bg-[#0D2B4E] px-4 py-4 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">Score RÉGLO</p>
                  <p className="text-[32px] font-black leading-none text-white" style={{ letterSpacing: "-1px" }}>418</p>
                  <p className="text-[11px] text-white/40">/ 500 pts</p>
                </div>
                <div className="rounded-xl border-2 border-[#00A896] bg-white px-4 py-4 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#00A896] mb-1">Score EXCELLENCE</p>
                  <p className="text-[32px] font-black leading-none text-[#00A896]" style={{ letterSpacing: "-1px" }}>402</p>
                  <p className="text-[11px] text-[#94A3B8]">/ 500 pts</p>
                </div>
              </div>

              {/* Trust badge */}
              <div className="flex items-center gap-3 rounded-xl bg-[#00A896]/8 border border-[#00A896]/20 px-4 py-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#00A896]">
                  <Check className="h-4 w-4 text-white" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-[#0D2B4E]">Trust Score : 820 / 1000 — Niveau OR</p>
                  <p className="text-[11px] text-[#4A5A72]">Vérifiable par QR code · cleargo.fr/verify/TRP-8204</p>
                </div>
              </div>

              {/* Stamp */}
              <div className="absolute -right-3 -bottom-3 flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#00A896] bg-white shadow-lg">
                <div className="text-center">
                  <p className="text-[8px] font-black uppercase tracking-wide text-[#00A896] leading-tight">ClearGo</p>
                  <p className="text-[7px] text-[#4A5A72] leading-tight">Certifié</p>
                  <p className="text-[7px] font-bold text-[#0D2B4E] leading-tight">2026</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Features */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: "all 0.9s cubic-bezier(0.25,0.1,0.25,1) 200ms",
            }}
          >
            <div className="flex flex-col gap-5">
              {FEATURES.map(({ icon: Icon, label, sub }, i) => (
                <div
                  key={label}
                  className="flex items-start gap-4"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(16px)",
                    transition: `all 0.7s cubic-bezier(0.25,0.1,0.25,1) ${300 + i * 80}ms`,
                  }}
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#0D2B4E]">
                    <Icon className="h-5 w-5 text-[#00A896]" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-[#0D2B4E]">{label}</p>
                    <p className="text-[13px] text-[#4A5A72]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Use cases */}
            <div className="mt-10 rounded-2xl border border-[#E2E8F0] bg-white p-6">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8] mb-4">À qui le montrer ?</p>
              <div className="flex flex-col gap-3">
                {[
                  { who: "Donneurs d'ordre", why: "Preuve de fiabilité avant signature" },
                  { who: "Auditeurs DRIEAT", why: "Document officiel horodaté" },
                  { who: "Appels d'offres", why: "Joindre en annexe automatiquement" },
                  { who: "Clients pharmaceutiques", why: "GDP compliance documentée" },
                ].map(({ who, why }) => (
                  <div key={who} className="flex items-center gap-3">
                    <Check className="h-4 w-4 flex-shrink-0 text-[#00A896]" strokeWidth={2.5} />
                    <div>
                      <span className="text-[13px] font-bold text-[#0D2B4E]">{who}</span>
                      <span className="text-[13px] text-[#4A5A72]"> — {why}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
