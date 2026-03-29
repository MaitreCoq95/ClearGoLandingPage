"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

const ClearGoSemantics = dynamic(
  () => import("@/components/ui/spatial-product-showcase"),
  { ssr: false }
)

function useReveal(threshold = 0.06) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

export function NameSemantics() {
  const { ref, visible } = useReveal()

  return (
    <section className="bg-[#04111F] py-12 lg:py-16" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.9s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <ClearGoSemantics />
        </div>
      </div>
    </section>
  )
}
