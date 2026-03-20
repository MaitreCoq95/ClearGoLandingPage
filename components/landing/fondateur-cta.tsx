"use client"

import { useEffect, useRef, useState } from "react"
import { Gift, Handshake, BadgeEuro } from "lucide-react"

const avantages = [
  {
    icon: Gift,
    title: "3 mois offerts",
    desc: "Acces complet a la plateforme pendant 90 jours",
  },
  {
    icon: Handshake,
    title: "Onboarding personnalise",
    desc: "Setup avec notre equipe, adapte a votre activite",
  },
  {
    icon: BadgeEuro,
    title: "Tarif fondateur garanti",
    desc: "Entre 100 et 300\u20AC/mois selon vos modules, bloque a vie",
  },
]

export function FondateurCta() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="fondateur"
      className="relative overflow-hidden py-24"
      style={{
        background: "linear-gradient(160deg, #0f3d1f 0%, #0a2a15 50%, #0f2548 100%)",
      }}
      ref={ref}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-12">
        {/* Badge */}
        <div
          className={`mb-6 inline-flex items-center gap-2 rounded-full bg-[#E5007D] px-5 py-2 font-sans text-sm font-black uppercase tracking-wider text-white transition-all duration-600 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Offre Fondateur SITL 2026
        </div>

        {/* Title */}
        <h2
          className={`font-sans text-4xl font-black leading-none tracking-tight text-white lg:text-5xl transition-all duration-600 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <span className="text-balance">
            {"Ils utilisent deja ClearGo."}
            <br />
            {"Rejoignez-les."}
          </span>
        </h2>

        {/* Subtitle */}
        <p
          className={`mx-auto mt-4 max-w-2xl font-serif text-[17px] leading-relaxed text-white/60 transition-all duration-600 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          ClearGo est en production avec des transporteurs actifs en France.
          Nous ouvrons 50 acces supplementaires au tarif fondateur pour le SITL.
        </p>

        {/* Avantages cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {avantages.map((a, i) => {
            const Icon = a.icon
            return (
              <div
                key={a.title}
                className={`rounded-2xl border border-white/10 bg-white/5 p-7 text-left transition-all duration-600 hover:border-[var(--green)]/40 hover:bg-white/8 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--green)]/20">
                  <Icon className="h-6 w-6 text-[#7FE8A0]" />
                </div>
                <div className="font-sans text-lg font-extrabold text-white">{a.title}</div>
                <div className="mt-1.5 font-serif text-sm leading-relaxed text-white/50">{a.desc}</div>
              </div>
            )
          })}
        </div>

        {/* Social proof */}
        <div
          className={`mt-10 font-sans text-sm font-semibold text-[#7FE8A0] transition-all duration-600 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#7FE8A0]" style={{ animation: "pulse-dot 2s infinite" }} />
          {"Deja actif chez des transporteurs en France \u00B7 50 acces fondateurs ouverts au SITL"}
        </div>

        {/* CTA */}
        <div
          className={`mt-8 transition-all duration-600 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--green)] px-10 py-4 font-sans text-base font-extrabold text-[var(--accent-foreground)] transition-all hover:bg-[var(--green-hover)] hover:-translate-y-0.5 hover:shadow-xl"
            style={{ boxShadow: "0 4px 24px rgba(45,155,78,0.35)" }}
          >
            {"Je reserve mon acces fondateur \u2192"}
          </a>
        </div>
      </div>
    </section>
  )
}
