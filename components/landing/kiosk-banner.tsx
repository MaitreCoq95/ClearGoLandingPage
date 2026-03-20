"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export function useKioskMode() {
  const searchParams = useSearchParams()
  const [isKiosk, setIsKiosk] = useState(false)

  useEffect(() => {
    if (searchParams.get("kiosk") === "true") {
      setIsKiosk(true)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" || e.key === "K") {
        setIsKiosk((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [searchParams])

  return isKiosk
}

export function KioskBanner() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-6 bg-[var(--navy-dark)] px-6 py-6 text-center">
      <div>
        <div className="font-sans text-xs font-bold uppercase tracking-widest text-[#7FE8A0]">SITL 2026</div>
        <div className="mt-1 font-sans text-xl font-black text-white">SCANNEZ POUR REJOINDRE LA BETA</div>
      </div>
      <a
        href="#contact"
        className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl border-2 border-white/20 bg-white"
      >
        {/* Placeholder QR code */}
        <svg viewBox="0 0 100 100" className="h-20 w-20">
          <rect x="5" y="5" width="30" height="30" fill="#1A3A6B" rx="3" />
          <rect x="10" y="10" width="20" height="20" fill="white" rx="1" />
          <rect x="14" y="14" width="12" height="12" fill="#1A3A6B" rx="1" />
          <rect x="65" y="5" width="30" height="30" fill="#1A3A6B" rx="3" />
          <rect x="70" y="10" width="20" height="20" fill="white" rx="1" />
          <rect x="74" y="14" width="12" height="12" fill="#1A3A6B" rx="1" />
          <rect x="5" y="65" width="30" height="30" fill="#1A3A6B" rx="3" />
          <rect x="10" y="70" width="20" height="20" fill="white" rx="1" />
          <rect x="14" y="74" width="12" height="12" fill="#1A3A6B" rx="1" />
          <rect x="42" y="5" width="8" height="8" fill="#2D9B4E" rx="1" />
          <rect x="42" y="18" width="8" height="8" fill="#1A3A6B" rx="1" />
          <rect x="42" y="42" width="8" height="8" fill="#2D9B4E" rx="1" />
          <rect x="55" y="42" width="8" height="8" fill="#1A3A6B" rx="1" />
          <rect x="42" y="55" width="8" height="8" fill="#1A3A6B" rx="1" />
          <rect x="68" y="55" width="8" height="8" fill="#2D9B4E" rx="1" />
          <rect x="80" y="55" width="8" height="8" fill="#1A3A6B" rx="1" />
          <rect x="68" y="68" width="8" height="8" fill="#1A3A6B" rx="1" />
          <rect x="80" y="68" width="8" height="8" fill="#2D9B4E" rx="1" />
          <rect x="68" y="80" width="20" height="8" fill="#1A3A6B" rx="1" />
          <rect x="55" y="80" width="8" height="8" fill="#2D9B4E" rx="1" />
        </svg>
      </a>
    </div>
  )
}
