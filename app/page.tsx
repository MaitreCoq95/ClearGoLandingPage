'use client'

import { Suspense, useState } from 'react'
import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { KeyFigure } from '@/components/landing/key-figure'
import { Problems } from '@/components/landing/problems'
import { Benefits } from '@/components/landing/benefits'
import { Parcours } from '@/components/landing/parcours'
import { CoutControle } from '@/components/landing/cout-controle'
import { Maturite } from '@/components/landing/maturite'
import { NiveauxExigence } from '@/components/landing/niveaux-exigence'
import { UniversSectoriels } from '@/components/landing/univers-sectoriels'
import { Referentiels } from '@/components/landing/referentiels'
import { ProfilConformite } from '@/components/landing/profil-conformite'
import { Accompagnement } from '@/components/landing/accompagnement'
import { Inscription } from '@/components/landing/inscription'
import { Team } from '@/components/landing/team'
import { Footer } from '@/components/landing/footer'
import { StickyMobileCta } from '@/components/landing/sticky-mobile-cta'
import { KioskBanner, useKioskMode } from '@/components/landing/kiosk-banner'
import { PrequalFunnel } from '@/components/landing/prequal-funnel'

function LandingContent() {
  const isKiosk = useKioskMode()
  const [funnelOpen, setFunnelOpen] = useState(false)
  const [initialSiret, setInitialSiret] = useState('')

  const openFunnel = () => {
    setInitialSiret('')
    setFunnelOpen(true)
  }
  const openFunnelWithSiret = (siret: string) => {
    setInitialSiret(siret)
    setFunnelOpen(true)
  }
  const closeFunnel = () => setFunnelOpen(false)

  return (
    <main>
      {!isKiosk && <Navbar onCta={openFunnel} />}

      <Hero onCta={openFunnel} />
      <KeyFigure />
      <Problems />
      <Benefits />
      <Parcours />
      <CoutControle />
      <Maturite />
      <NiveauxExigence />
      <UniversSectoriels />
      <Referentiels />
      <ProfilConformite />
      <Accompagnement onCta={openFunnel} />
      <Inscription onStart={openFunnelWithSiret} />
      <Team />

      {!isKiosk && <Footer />}
      {!isKiosk && <StickyMobileCta onCta={openFunnel} />}
      {isKiosk && <KioskBanner />}

      <PrequalFunnel open={funnelOpen} onClose={closeFunnel} initialSiret={initialSiret} />
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
