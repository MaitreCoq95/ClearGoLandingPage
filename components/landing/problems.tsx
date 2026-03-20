"use client"

import { useEffect, useRef, useState } from "react"

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function AnimatedNumber({ value, suffix = "", delay = 0, visible }: {
  value: number; suffix?: string; delay?: number; visible: boolean
}) {
  const [displayed, setDisplayed] = useState(0)
  useEffect(() => {
    if (!visible) return
    let start = 0
    const duration = 1600
    const step = value / (duration / 16)
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        start = Math.min(start + step, value)
        setDisplayed(Math.floor(start))
        if (start >= value) clearInterval(interval)
      }, 16)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(t)
  }, [visible, value, delay])
  return <>{displayed}{suffix}</>
}

const STATS = [
  {
    number: 83,
    suffix: "%",
    label: "des PME transport sans aucun outil pour prouver leur fiabilité",
    color: "#00A896",
    delay: 0,
  },
  {
    number: 10,
    suffix: "/jour",
    label: "transporteurs qui disparaissent en France faute de crédibilité",
    color: "#1A4A7A",
    delay: 200,
  },
  {
    number: 2,
    suffix: "M€",
    label: "en amendes et contrats perdus évitables chaque année par une PME bien structurée",
    color: "#0D2B4E",
    delay: 400,
  },
]

export function Problems() {
  const { ref, visible } = useReveal()

  return (
    <section id="problems" ref={ref} className="bg-[#0D2B4E] py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div
          className="mb-20 max-w-3xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <div className="section-eyebrow mb-5" style={{ color: "#00A896" }}>
            <span style={{ background: "#00A896", height: "2px", width: "16px", borderRadius: "2px", display: "inline-block" }} />
            Le problème
          </div>
          <h2
            className="font-black leading-[1.04] text-white"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-2.5px" }}
          >
            10 transporteurs disparaissent
            <br />
            chaque jour en France.
          </h2>
          <p className="mt-5 text-[18px] font-light italic text-white/50">
            Pas parce qu'ils travaillent mal. Parce qu'ils ne peuvent pas le prouver.
          </p>
        </div>

        {/* Stats — number-first, enormous */}
        <div className="grid gap-0 md:grid-cols-3">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="relative flex flex-col justify-between border-t border-white/10 py-10 md:border-l md:border-t-0 md:px-10 first:border-t first:border-l-0 md:first:border-l-0 md:first:pl-0"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.8s cubic-bezier(0.25,0.1,0.25,1) ${i * 120}ms`,
              }}
            >
              {/* Big number */}
              <div
                className="font-black leading-none tracking-tight"
                style={{
                  fontSize: "clamp(72px, 10vw, 120px)",
                  color: stat.color === "#00A896" ? "#00A896" : "rgba(255,255,255,0.12)",
                  letterSpacing: "-4px",
                }}
              >
                {stat.color === "#00A896" ? (
                  <span style={{ color: "#00A896" }}>
                    <AnimatedNumber value={stat.number} suffix={stat.suffix} delay={stat.delay} visible={visible} />
                  </span>
                ) : (
                  <span className="text-white/20">
                    <AnimatedNumber value={stat.number} suffix={stat.suffix} delay={stat.delay} visible={visible} />
                  </span>
                )}
              </div>

              {/* Label */}
              <p className="mt-4 max-w-[260px] text-[15px] font-medium leading-relaxed text-white/50">
                {stat.label}
              </p>

              {/* Number indicator */}
              <div className="absolute top-10 right-0 text-[11px] font-bold tracking-widest text-white/15 uppercase">
                0{i + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <div
          className="mt-16 rounded-2xl border border-[#00A896]/20 bg-[#00A896]/10 px-8 py-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.5s",
          }}
        >
          <p className="text-center text-[17px] font-semibold text-white/70">
            Le sérieux ne se voit pas.{" "}
            <span className="text-white font-bold">Le prix devient l'arbitre.</span>{" "}
            Les bons perdent.
          </p>
        </div>
      </div>
    </section>
  )
}
