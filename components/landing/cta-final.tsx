"use client"

import { useEffect, useRef, useState } from "react"

interface CtaFinalProps {
  onCta: () => void
}

function LeadForm() {
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")
  const [societe, setSociete] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus("loading")
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "contact", prenom, email, societe }),
      })
      const json = await res.json()
      setStatus(json.ok ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center gap-3 rounded-2xl border px-6 py-8 text-center"
        style={{ borderColor: "rgba(74,123,140,0.3)", background: "rgba(74,123,140,0.1)" }}
      >
        <span className="text-3xl">✅</span>
        <p className="text-[17px] font-black text-white">Inscription enregistrée !</p>
        <p className="text-[14px] text-white/60">On revient vers vous très vite. Merci {prenom} !</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          className="rounded-xl border px-4 py-3 text-[14px] text-white placeholder-white/35 focus:outline-none"
          style={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)" }}
        />
        <input
          type="text"
          placeholder="Société de transport"
          value={societe}
          onChange={(e) => setSociete(e.target.value)}
          className="rounded-xl border px-4 py-3 text-[14px] text-white placeholder-white/35 focus:outline-none"
          style={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)" }}
        />
      </div>
      <input
        type="email"
        placeholder="Email professionnel *"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-xl border px-4 py-3 text-[14px] text-white placeholder-white/35 focus:outline-none"
        style={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)" }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-press rounded-xl py-3.5 text-[15px] font-extrabold text-white disabled:opacity-60"
        style={{ background: "#4A7B8C", boxShadow: "0 8px 32px -4px rgba(74,123,140,0.4)" }}
      >
        {status === "loading" ? "Envoi…" : "Je veux être contacté →"}
      </button>
      {status === "error" && (
        <p className="text-center text-[12px] text-red-400">Une erreur est survenue, réessayez.</p>
      )}
      <p className="text-center text-[11px] text-white/30">Sans engagement · Données protégées · Réponse sous 24h</p>
    </form>
  )
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
    <section
      id="contact"
      className="relative py-24 lg:py-36 overflow-hidden"
      ref={ref}
      style={{ background: "#1C2B35" }}
    >
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(74,123,140,0.10) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 flex flex-col items-center text-center">

        {/* Headline */}
        <div
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.9s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
            style={{ borderColor: "rgba(74,123,140,0.4)", background: "rgba(74,123,140,0.1)" }}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "#6AABB8" }}>Commencer maintenant</span>
          </div>
          <h2
            className="font-black text-white"
            style={{ fontSize: "clamp(36px, 5.5vw, 72px)", letterSpacing: "-3px", lineHeight: 1.02 }}
          >
            Vos camions parlent.
            <br />
            <span style={{ color: "#4A7B8C" }}>Faites-leur dire</span>
            <br />
            la vérité.
          </h2>
          <p className="mt-5 text-[17px] text-white/50 max-w-lg mx-auto">
            Identifiez votre entreprise par SIRET. Pré-qualification gratuite en 5 minutes.
          </p>
        </div>

        {/* Two-column cards */}
        <div
          className="mt-14 w-full max-w-3xl grid gap-6 lg:grid-cols-2"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
            transition: "all 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.15s",
          }}
        >
          {/* Primary CTA — Transporteurs */}
          <div
            className="rounded-3xl bg-white p-8 text-left"
            style={{ boxShadow: "0 40px 80px -20px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)" }}
          >
            <div className="mb-1 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: "#4A7B8C" }}>
              <span className="h-px w-6" style={{ background: "#4A7B8C" }} />
              Transporteurs
            </div>
            <h3 className="text-[20px] font-black mb-1" style={{ color: "#1C2B35" }}>
              Pré-qualification gratuite
            </h3>
            <p className="text-[13px] mb-6" style={{ color: "#5E7485" }}>
              SIRET · 5 minutes · Résultat immédiat · Sans engagement
            </p>

            <button
              onClick={onCta}
              data-cta
              className="btn-press w-full rounded-2xl py-4 text-[16px] font-extrabold text-white mb-3"
              style={{ background: "#4A7B8C", boxShadow: "0 8px 32px -4px rgba(74,123,140,0.45)" }}
            >
              Identifier mon entreprise →
            </button>

            <div
              className="mt-4 flex items-center gap-2 rounded-xl border px-4 py-3"
              style={{ borderColor: "#D5DFE5", background: "#F5F7F8" }}
            >
              <span className="text-base">🚛</span>
              <p className="text-[12px] font-semibold" style={{ color: "#1C2B35" }}>
                Transporteurs routiers uniquement · PME &amp; TPE
              </p>
            </div>
          </div>

          {/* Secondary — Donneurs d'ordre / Contact */}
          <div
            className="rounded-3xl p-8 text-left"
            style={{
              background: "linear-gradient(135deg, #2A3D4A 0%, #1C2B35 100%)",
              boxShadow: "0 40px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            <div className="mb-1 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: "#A87055" }}>
              <span className="h-px w-6" style={{ background: "#A87055" }} />
              Donneurs d'ordre / Contact
            </div>
            <h3 className="text-[20px] font-black text-white mb-1">
              On vous rappelle
            </h3>
            <p className="text-[13px] text-white/50 mb-5">Réponse sous 24h · Toutes demandes</p>
            <LeadForm />
          </div>
        </div>

        {/* Proof points */}
        <div
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-10"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(24px)",
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
