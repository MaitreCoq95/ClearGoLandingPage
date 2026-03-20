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
    <div className="fixed inset-x-0 bottom-0 z-40 flex h-[60px] items-center justify-between gap-3 bg-[#0D2B4E] px-4 lg:hidden">
      <span className="text-[12px] font-semibold text-white/70">
        50 accès fondateurs SITL · Offre limitée
      </span>
      <button
        onClick={onCta}
        data-cta
        className="flex-shrink-0 rounded-lg bg-[#00A896] px-4 py-2 text-[13px] font-bold text-white transition-all active:scale-95"
      >
        Démarrer →
      </button>
    </div>
  )
}
