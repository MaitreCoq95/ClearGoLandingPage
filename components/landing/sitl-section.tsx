"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { MapPin, Calendar, Trophy, Users, ArrowRight } from "lucide-react"

export function SitlSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="sitl"
      className="relative overflow-hidden bg-[var(--background)] py-20 lg:py-28"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(var(--navy) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
        {/* Eyebrow */}
        <div
          className={`text-center transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <div className="mx-auto inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-[#E91E7B]">
            <span className="h-0.5 w-4 rounded bg-[#E91E7B]" />
            {"// SITL 2026 -- START-UP CONTEST"}
          </div>
        </div>

        {/* Main heading */}
        <div
          className={`mt-5 text-center transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ transitionDelay: "100ms" }}
        >
          <h2 className="font-sans text-3xl font-black text-[var(--navy-dark)] lg:text-4xl xl:text-5xl">
            <span className="text-balance">ClearGo est{" "}
              <span className="text-[#E91E7B]">nomine</span>{" "}
              au Start-up Contest SITL 2026
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-serif text-[17px] leading-relaxed text-[var(--text-secondary)]">
            Notre plateforme de conformite transport a ete selectionnee parmi les finalistes du concours d{"'"}innovation
            du Salon International du Transport et de la Logistique.
            Venez nous rencontrer a Paris Nord Villepinte.
          </p>
        </div>

        {/* Official banner */}
        <div
          className={`mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-border shadow-lg transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-[0.97]"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <Image
            src="/images/sitl-banner.png"
            alt="SITL 2026 -- ClearGo nomine au Start-up Contest -- Du 31 mars au 2 avril 2026 a Paris Nord Villepinte"
            width={1500}
            height={200}
            className="w-full"
            priority={false}
          />
        </div>

        {/* Info cards */}
        <div
          className={`mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "350ms" }}
        >
          {[
            {
              icon: Calendar,
              label: "Dates",
              value: "31 mars -- 2 avril 2026",
              detail: "3 jours d'innovation transport & logistique",
            },
            {
              icon: MapPin,
              label: "Lieu",
              value: "Paris Nord Villepinte",
              detail: "Parc des Expositions, Hall 1",
            },
            {
              icon: Trophy,
              label: "Distinction",
              value: "Finaliste Start-up Contest",
              detail: "Selectionne parmi des centaines de candidatures",
            },
            {
              icon: Users,
              label: "Rencontrons-nous",
              value: "Demo live sur stand",
              detail: "Score DRIEAT en direct, Q&A avec nos experts",
            },
          ].map((item, i) => (
            <div
              key={item.label}
              className="group rounded-2xl border border-border bg-[var(--off-white)] p-6 transition-all hover:border-[#E91E7B]/30 hover:shadow-md"
              style={{ transitionDelay: `${350 + i * 80}ms` }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E91E7B]/10 text-[#E91E7B] transition-colors group-hover:bg-[#E91E7B] group-hover:text-[var(--background)]">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="mt-3 font-sans text-[11px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">
                {item.label}
              </div>
              <div className="mt-1 font-sans text-base font-extrabold text-[var(--navy)]">
                {item.value}
              </div>
              <div className="mt-1 font-serif text-[13px] leading-relaxed text-[var(--text-secondary)]">
                {item.detail}
              </div>
            </div>
          ))}
        </div>

        {/* CTA block */}
        <div
          className={`mt-12 text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="mx-auto max-w-2xl rounded-2xl border-2 border-[#E91E7B]/20 bg-[#E91E7B]/5 px-8 py-8">
            <h3 className="font-sans text-xl font-black text-[var(--navy-dark)] lg:text-2xl">
              Reservez votre demo privee au SITL
            </h3>
            <p className="mt-2 font-serif text-[15px] leading-relaxed text-[var(--text-secondary)]">
              30 minutes avec un expert ClearGo pour decouvrir votre score de conformite en direct
              et explorer les modules adaptes a votre activite.
            </p>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#E91E7B] px-8 py-3.5 font-sans text-sm font-extrabold text-[var(--background)] transition-all hover:bg-[#D0196C] hover:-translate-y-0.5 hover:shadow-lg"
            >
              {"Prendre rendez-vous"}
              <ArrowRight className="h-4 w-4" />
            </a>
            <div className="mt-4 flex items-center justify-center gap-4 font-serif text-xs text-[var(--text-tertiary)]">
              <span>{"Gratuit & sans engagement"}</span>
              <span className="h-0.5 w-0.5 rounded-full bg-[var(--text-tertiary)]" />
              <span>{"Sur place ou en visio"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
