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

/**
 * Marque la frontière entre ce qui sert à décider et ce qui sert à vérifier.
 * Sans elle, le lecteur qui dépasse le CTA croit que la page recommence.
 */
function SecondNiveau() {
  return (
    <section className="py-16 lg:py-20" style={{ background: 'var(--surface)' }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="section-eyebrow mb-3">Pour aller plus loin</div>
        <h2
          className="max-w-[640px] font-black tracking-tight"
          style={{
            fontSize: 'clamp(24px, 3vw, 36px)',
            lineHeight: 1.15,
            letterSpacing: '-1px',
            color: 'var(--cleargo-navy)',
          }}
        >
          Comment ClearGo travaille, en détail
        </h2>
        <p className="mt-4 max-w-[540px] text-[16px] leading-relaxed" style={{ color: 'var(--t3)' }}>
          Les référentiels couverts et les univers sectoriels. Rien
          d’indispensable pour commencer — utile si vous voulez comprendre avant de vous lancer.
        </p>
      </div>
    </section>
  )
}

function LandingContent() {
  const isKiosk = useKioskMode()
  const [funnelOpen, setFunnelOpen] = useState(false)

  const openFunnel = () => setFunnelOpen(true)
  const closeFunnel = () => setFunnelOpen(false)

  return (
    <main>
      {!isKiosk && <Navbar onCta={openFunnel} />}

      {/*
        Chemin critique — décider et commencer.
        Ordre issu de l'audit du 15/09 (§5) : je me reconnais, je comprends ce
        que j'obtiens, je vois que le produit existe, j'estime l'effort, j'entre.
        L'exemple de résultat remonte avant le fonctionnement : voir la sortie
        motive davantage que comprendre la mécanique.
      */}
      <Hero onCta={openFunnel} />
      <KeyFigure />
      <Problems />
      <Benefits />
      <ProfilConformite />
      <Parcours />
      <NiveauxExigence />
      <Accompagnement onCta={openFunnel} />
      <Inscription onStart={openFunnel} />

      {/*
        Second niveau de lecture — la preuve, pas la décision.
        Ces sections ne sont pas supprimées : elles servent la crédibilité, le
        référencement et l'argumentaire commercial. Elles cessent seulement de
        précéder la première action (audit §5.2).
      */}
      <SecondNiveau />
      <Referentiels />
      <UniversSectoriels />
      <Maturite />
      <CoutControle />
      <Team />

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
