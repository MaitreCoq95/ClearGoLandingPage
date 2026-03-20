"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function BadgePreview() {
  const [score, setScore] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let n = 0
          const step = 734 / (1800 / 16)
          const interval = setInterval(() => {
            n = Math.min(n + step, 734)
            setScore(Math.floor(n))
            if (n >= 734) clearInterval(interval)
          }, 16)
          obs.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const badgeChips = [
    { label: "REGLO", on: true },
    { label: "ISO 9001", on: true },
    { label: "ISO 45001", on: true },
    { label: "ISO 14001", on: false },
    { label: "GDP", on: false },
    { label: "RSE", on: false },
  ]

  return (
    <section className="bg-[var(--off-white)] py-24 text-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-[var(--green)]">
          <span className="h-0.5 w-4 rounded bg-[var(--green)]" />
          {"// LE BADGE CLEARGO"}
        </div>
        <h2 className="mx-auto mt-3 font-sans text-4xl font-black leading-none tracking-tight text-[var(--navy-dark)] lg:text-5xl">
          <span className="text-balance">
            {"Votre score devient"}
            <br />
            {"votre argument commercial"}
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl font-serif text-[17px] leading-relaxed text-[var(--text-secondary)]">
          Un QR code dans votre dossier AO. Le donneur d{"'"}ordre scanne et accede a votre TrustScore en temps reel. Verifiable. Infalsifiable. C{"'"}est votre passeport de credibilite aupres des plus grands comptes.
        </p>

        {/* Badge card */}
        <div
          ref={ref}
          className="relative mx-auto mt-11 inline-block max-w-[480px] w-full rounded-3xl border-2 border-border bg-[var(--background)] px-12 py-11 shadow-2xl"
        >
          <span className="absolute top-3.5 right-4 font-sans text-[10px] text-[var(--text-tertiary)]">
            cleargo.io/score/lme-transport
          </span>
          <Image
            src="/images/logo.png"
            alt="ClearGo"
            width={128}
            height={32}
            className="mx-auto mb-5"
            style={{ width: "auto", height: "32px" }}
          />
          <div className="font-sans text-[88px] font-black leading-none tracking-tighter text-[var(--navy)]">
            {score}
          </div>
          <div className="mt-1 font-sans text-xl font-extrabold text-amber-700">
            NIVEAU OR
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-1.5">
            {badgeChips.map((chip) => (
              <span
                key={chip.label}
                className={`rounded-md px-3 py-1 font-sans text-[11px] font-bold ${
                  chip.on
                    ? "border border-[var(--green)]/30 bg-[var(--green-light)] text-[var(--green)]"
                    : "border border-border bg-[var(--off-white)] text-[var(--text-tertiary)]"
                }`}
              >
                {chip.label} {chip.on ? "\u2713" : ""}
              </span>
            ))}
          </div>

          <div className="mt-3.5 font-sans text-[11px] text-[var(--text-tertiary)]">
            Calcule le 21/02/2026 - Mis a jour en temps reel
          </div>

          <div className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-lg bg-[var(--navy)] font-sans text-[10px] font-bold tracking-wider text-white">
            QR CODE
          </div>
        </div>

        <p className="mt-6 text-sm text-[var(--text-secondary)]">
          PDF horodate - Lien public verifiable - Integrable dans tout dossier AO
        </p>
      </div>
    </section>
  )
}
