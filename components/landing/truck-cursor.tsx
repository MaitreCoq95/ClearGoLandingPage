"use client"

import { useEffect, useRef, useState, useCallback } from "react"

export function TruckCursor() {
  const truckRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const truckPos = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)
  const [puffs, setPuffs] = useState<{ id: number; x: number; y: number }[]>([])
  const puffIdRef = useRef(0)
  const lastPuffTime = useRef(0)
  const [isTouch, setIsTouch] = useState(true)
  const [hoveredCta, setHoveredCta] = useState(false)

  const addPuff = useCallback((x: number, y: number) => {
    const now = Date.now()
    if (now - lastPuffTime.current > 100) {
      lastPuffTime.current = now
      const id = puffIdRef.current++
      setPuffs((p) => [...p.slice(-6), { id, x: x - 24, y: y + 4 }])
      setTimeout(() => {
        setPuffs((p) => p.filter((pf) => pf.id !== id))
      }, 500)
    }
  }, [])

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    setIsTouch(isTouchDevice)
    if (isTouchDevice) return

    const handleMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      const target = e.target as HTMLElement
      const isCta =
        target.closest("a[href='#contact']") !== null ||
        target.closest("a[href='#demo']") !== null ||
        target.closest("button[type='submit']") !== null ||
        target.closest("[data-cta]") !== null
      setHoveredCta(isCta)

      addPuff(e.clientX, e.clientY)
    }

    window.addEventListener("mousemove", handleMove)

    const animate = () => {
      const dx = mousePos.current.x - truckPos.current.x
      const dy = mousePos.current.y - truckPos.current.y
      truckPos.current.x += dx * 0.18
      truckPos.current.y += dy * 0.18
      if (truckRef.current) {
        truckRef.current.style.transform = `translate(${truckPos.current.x - 16}px, ${truckPos.current.y - 10}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isTouch, addPuff])

  if (isTouch) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Exhaust puffs */}
      {puffs.map((puff) => (
        <div
          key={puff.id}
          className="absolute rounded-full"
          style={{
            left: puff.x,
            top: puff.y,
            width: 6,
            height: 6,
            background: "rgba(45,155,78,0.5)",
            animation: "puffFade 0.5s ease-out forwards",
          }}
        />
      ))}

      {/* Green Truck */}
      <div ref={truckRef} className="absolute top-0 left-0 will-change-transform">
        <svg
          width={hoveredCta ? "44" : "36"}
          height={hoveredCta ? "28" : "22"}
          viewBox="0 0 36 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: hoveredCta
              ? "drop-shadow(0 0 8px rgba(45,155,78,0.7))"
              : "drop-shadow(0 1px 3px rgba(0,0,0,0.25))",
            transition: "all 0.2s ease",
          }}
        >
          {/* Trailer body */}
          <rect x="0" y="1" width="20" height="13" rx="1.5" fill="#2D9B4E" />
          {/* Trailer stripe */}
          <rect x="0" y="7" width="20" height="1.5" fill="#26843F" />
          {/* ClearGo text on trailer */}
          <text x="2.5" y="6" fontSize="3.5" fontWeight="800" fill="white" fontFamily="sans-serif">CG</text>

          {/* Cab */}
          <path d="M20 4.5 H28 C30.5 4.5 33 6.5 33 9 V14 H20 V4.5Z" fill="#3DB562" />
          {/* Windshield */}
          <path d="M25 5.5 H28 C30 5.5 31.5 7 31.5 9 V12 H25 V5.5Z" fill="rgba(255,255,255,0.45)" />

          {/* Bumper */}
          <rect x="33" y="9" width="2" height="5" rx="0.5" fill="#26843F" />
          {/* Headlight */}
          <rect x="33.5" y="10" width="1.5" height="1.5" rx="0.5" fill="#FCD34D" />

          {/* Chassis */}
          <rect x="0" y="14" width="34" height="1.5" rx="0.75" fill="#1A5C30" />

          {/* Back wheel */}
          <circle cx="7" cy="18" r="3.2" fill="#1A2233" />
          <circle cx="7" cy="18" r="1.8" fill="#2D9B4E" />
          <circle cx="7" cy="18" r="0.6" fill="#1A5C30" />
          {/* Wheel spokes animation */}
          <g>
            <line x1="7" y1="15.5" x2="7" y2="16.8" stroke="#1A5C30" strokeWidth="0.4">
              <animateTransform attributeName="transform" type="rotate" from="0 7 18" to="360 7 18" dur="0.4s" repeatCount="indefinite" />
            </line>
            <line x1="4.5" y1="18" x2="5.8" y2="18" stroke="#1A5C30" strokeWidth="0.4">
              <animateTransform attributeName="transform" type="rotate" from="0 7 18" to="360 7 18" dur="0.4s" repeatCount="indefinite" />
            </line>
          </g>

          {/* Front wheel */}
          <circle cx="27" cy="18" r="3.2" fill="#1A2233" />
          <circle cx="27" cy="18" r="1.8" fill="#2D9B4E" />
          <circle cx="27" cy="18" r="0.6" fill="#1A5C30" />
          <g>
            <line x1="27" y1="15.5" x2="27" y2="16.8" stroke="#1A5C30" strokeWidth="0.4">
              <animateTransform attributeName="transform" type="rotate" from="0 27 18" to="360 27 18" dur="0.4s" repeatCount="indefinite" />
            </line>
            <line x1="24.5" y1="18" x2="25.8" y2="18" stroke="#1A5C30" strokeWidth="0.4">
              <animateTransform attributeName="transform" type="rotate" from="0 27 18" to="360 27 18" dur="0.4s" repeatCount="indefinite" />
            </line>
          </g>
        </svg>
      </div>
    </div>
  )
}
