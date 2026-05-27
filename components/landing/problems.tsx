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
    const step = value / (1600 / 16)
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
  { number: 83,  suffix: "%",     label: "des PME transport sans aucun outil pour prouver leur fiabilité", isAccent: true,  delay: 0 },
  { number: 10,  suffix: "/jour", label: "transporteurs qui disparaissent en France faute de crédibilité", isAccent: false, delay: 200 },
  { number: 2,   suffix: "M€",   label: "en sanctions et contrats perdus évitables chaque année",          isAccent: false, delay: 400 },
]

const TENSIONS = [
  { title: "Conformité administrative ≠ organisation maîtrisée",    desc: "Documents à jour ne veut pas dire organisation solide. La conformité apparente masque souvent des fragilités opérationnelles réelles." },
  { title: "Le déclaratif ne reflète pas la réalité terrain",       desc: "Les RFI et dossiers capturent ce qui est déclaré, rarement ce qui est pratiqué. L'écart peut coûter un contrat." },
  { title: "Le prix devient l'arbitre quand rien ne se voit",       desc: "Sans preuve de fiabilité, les donneurs d'ordre décident sur le tarif. Les bons transporteurs perdent face aux moins-disants." },
  { title: "La conformité évolue — les outils, non",                desc: "FCO, FIMO, licences, contrôles techniques : les délais bougent, les textes aussi. La veille manuelle ne suffit plus." },
]

export function Problems() {
  const { ref, visible } = useReveal()

  return (
    <section id="problems" ref={ref} className="py-24 lg:py-32 overflow-hidden" style={{ background: "#EEF2F4" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div
          className="mb-20 max-w-3xl"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <div className="section-eyebrow mb-5">Le constat</div>
          <h2
            className="font-black leading-[1.04]"
            style={{ fontSize: "clamp(34px, 4.8vw, 58px)", letterSpacing: "-2px", color: "#1C2B35" }}
          >
            10 transporteurs disparaissent
            <br />
            chaque jour en France.
          </h2>
          <p className="mt-5 text-[18px] font-light italic" style={{ color: "#8FA4B2" }}>
            Pas parce qu'ils travaillent mal. Parce qu'ils ne peuvent pas le prouver.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-0 md:grid-cols-3 mb-20">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="relative flex flex-col justify-between border-t py-10 md:border-l md:border-t-0 md:px-10 first:border-t first:border-l-0 md:first:border-l-0 md:first:pl-0"
              style={{
                borderColor: "#D5DFE5",
                opacity:     visible ? 1 : 0,
                transform:   visible ? "translateY(0)" : "translateY(40px)",
                transition:  `all 0.8s cubic-bezier(0.25,0.1,0.25,1) ${i * 120}ms`,
              }}
            >
              <div
                className="font-black leading-none tracking-tight"
                style={{
                  fontSize:     "clamp(64px, 9vw, 108px)",
                  color:        stat.isAccent ? "#4A7B8C" : "rgba(28,43,53,0.12)",
                  letterSpacing:"-3px",
                }}
              >
                <AnimatedNumber value={stat.number} suffix={stat.suffix} delay={stat.delay} visible={visible} />
              </div>
              <p className="mt-4 max-w-[260px] text-[14px] font-medium leading-relaxed" style={{ color: "#5E7485" }}>
                {stat.label}
              </p>
              <div className="absolute top-10 right-0 text-[10px] font-bold tracking-widest uppercase" style={{ color: "#B5C5CF" }}>
                0{i + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Tensions */}
        <div
          className="grid gap-4 md:grid-cols-2"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(28px)",
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.45s",
          }}
        >
          {TENSIONS.map((t) => (
            <div
              key={t.title}
              className="rounded-xl p-6"
              style={{ background: "#FFFFFF", borderLeft: "3px solid #4A7B8C" }}
            >
              <h4 className="text-[14px] font-bold mb-2" style={{ color: "#1C2B35" }}>{t.title}</h4>
              <p className="text-[13px] leading-relaxed" style={{ color: "#5E7485" }}>{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <div
          className="mt-10 rounded-xl border px-8 py-5"
          style={{
            borderColor: "rgba(74,123,140,0.25)",
            background:  "rgba(74,123,140,0.06)",
            opacity:     visible ? 1 : 0,
            transform:   visible ? "translateY(0)" : "translateY(24px)",
            transition:  "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.6s",
          }}
        >
          <p className="text-center text-[16px] font-semibold" style={{ color: "#3A4E5A" }}>
            Le sérieux ne se voit pas.{" "}
            <span style={{ color: "#1C2B35", fontWeight: 700 }}>Le prix devient l'arbitre.</span>{" "}
            Les bons perdent.
          </p>
        </div>
      </div>
    </section>
  )
}
