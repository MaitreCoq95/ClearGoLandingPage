"use client"

import { useEffect, useState } from "react"

interface StickyMobileCtaProps {
  onCta: () => void
}

export function StickyMobileCta({ onCta }: StickyMobileCtaProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const contactSection = document.getElementById("contact")
    if (!contactSection) return
    const obs = new IntersectionObserver(
      (entries) => setVisible(!entries.some((e) => e.isIntersecting)),
      { threshold: 0.1 }
    )
    obs.observe(contactSection)
    return () => obs.disconnect()
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex h-[60px] items-center justify-between gap-3 px-4 lg:hidden"
      style={{ background: "#1C2B35" }}
    >
      <span className="text-[12px] font-semibold text-white/70">
        Identification SIRET · Gratuit · Sans engagement
      </span>
      <button
        onClick={onCta}
        data-cta
        className="flex-shrink-0 rounded-lg px-4 py-2 text-[13px] font-bold text-white transition-all active:scale-95"
        style={{ background: "#4A7B8C" }}
      >
        Démarrer →
      </button>
    </div>
  )
}
