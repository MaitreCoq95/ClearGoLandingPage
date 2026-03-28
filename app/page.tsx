"use client"

import { Suspense, useState } from "react"
import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { VideoShowcase } from "@/components/landing/video-showcase"
import { SocialProof } from "@/components/landing/social-proof"
import { Problems } from "@/components/landing/problems"
import { Solution } from "@/components/landing/solution"
import { Parcours } from "@/components/landing/parcours"
import { Pricing } from "@/components/landing/pricing"
import { Market } from "@/components/landing/market"
import { Certificate } from "@/components/landing/certificate"
import { Team } from "@/components/landing/team"
import { CtaFinal } from "@/components/landing/cta-final"
import { Footer } from "@/components/landing/footer"
import { StickyMobileCta } from "@/components/landing/sticky-mobile-cta"
import { KioskBanner, useKioskMode } from "@/components/landing/kiosk-banner"
import { PrequalFunnel } from "@/components/landing/prequal-funnel"
import { PhotoShowcase } from "@/components/landing/photo-showcase"

function LandingContent() {
  const isKiosk = useKioskMode()
  const [funnelOpen, setFunnelOpen] = useState(false)

  const openFunnel = () => setFunnelOpen(true)
  const closeFunnel = () => setFunnelOpen(false)

  return (
    <main>
      {!isKiosk && <Navbar onCta={openFunnel} />}

      <Hero onCta={openFunnel} />
      <VideoShowcase />
      <PhotoShowcase onCta={openFunnel} />
      <SocialProof />
      <Problems />
      <Solution />
      <Certificate />
      <Parcours onCta={openFunnel} />
      <Pricing onCta={openFunnel} />
      <Market />
      <Team />
      <CtaFinal onCta={openFunnel} />

      {!isKiosk && <Footer />}
      {!isKiosk && <StickyMobileCta onCta={openFunnel} />}
      {isKiosk && <KioskBanner />}

      <PrequalFunnel open={funnelOpen} onClose={closeFunnel} />
    </main>
  )
}

export default function Page() {
  return (
    <Suspense>
      <LandingContent />
    </Suspense>
  )
}
