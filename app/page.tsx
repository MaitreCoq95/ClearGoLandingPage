"use client"

import { Suspense, useState } from "react"
import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Problems } from "@/components/landing/problems"
import { Solution } from "@/components/landing/solution"
import { Parcours } from "@/components/landing/parcours"
import { Pricing } from "@/components/landing/pricing"
import { AbonnementSection } from "@/components/landing/abonnement-section"
import { Market } from "@/components/landing/market"
import { Certificate } from "@/components/landing/certificate"
import { Team } from "@/components/landing/team"
import { CtaFinal } from "@/components/landing/cta-final"
import { Footer } from "@/components/landing/footer"
import { StickyMobileCta } from "@/components/landing/sticky-mobile-cta"
import { KioskBanner, useKioskMode } from "@/components/landing/kiosk-banner"
import { PrequalFunnel } from "@/components/landing/prequal-funnel"
import { NameSemantics } from "@/components/landing/name-semantics"
import { TransformationCarousel } from "@/components/landing/transformation-carousel"

function LandingContent() {
  const isKiosk = useKioskMode()
  const [funnelOpen, setFunnelOpen] = useState(false)

  const openFunnel = () => setFunnelOpen(true)
  const closeFunnel = () => setFunnelOpen(false)

  return (
    <main>
      {!isKiosk && <Navbar onCta={openFunnel} />}

      <Hero onCta={openFunnel} />
      <NameSemantics />
      <Problems />
      <Solution />
      <Certificate />
      <TransformationCarousel onCta={openFunnel} />
      <Parcours onCta={openFunnel} />
      <Pricing onCta={openFunnel} />
      <AbonnementSection />
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
