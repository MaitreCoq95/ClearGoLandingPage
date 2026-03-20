"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const stats = [
  { target: 45000, suffix: "+", color: "text-[#7FE8A0]", label: "entreprises de transport PME en France soumises DRIEAT/DREAL" },
  { target: 87, suffix: "", color: "text-white", label: "points de controle dans la checklist DRIEAT integree nativement" },
  { target: 2, suffix: "h", color: "text-[#93B4FF]", label: "pour preparer une inspection avec ClearGo (vs 2 jours sans)" },
  { target: 1000, suffix: "", color: "text-yellow-300", label: "points de score -- le Nutri-Score de la conformite transport" },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let n = 0
          const step = target / (1600 / 16)
          const interval = setInterval(() => {
            n = Math.min(n + step, target)
            setValue(Math.floor(n))
            if (n >= target) clearInterval(interval)
          }, 16)
          obs.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return (
    <div ref={ref}>
      {value.toLocaleString("fr-FR")}
      {suffix && <span className="text-3xl tracking-tight">{suffix}</span>}
    </div>
  )
}

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-[var(--navy)] py-20">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(45,155,78,0.1), transparent)" }} />

      {/* Background control room image */}
      <div className="absolute inset-0 opacity-[0.08]">
        <Image
          src="/images/hero-cleargo.png"
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid divide-y divide-white/7 overflow-hidden rounded-2xl md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="px-8 py-11 text-center">
              <div className={`font-sans text-6xl font-black leading-none tracking-tighter ${stat.color}`}>
                <Counter target={stat.target} suffix={stat.suffix} />
              </div>
              <p className="mt-2 font-serif text-sm leading-relaxed text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
