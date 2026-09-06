import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CookieBanner } from '@/components/cookie-banner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const BASE_URL = 'https://cleargo.fr'

const DESCRIPTION =
  'ClearGo aide les transporteurs routiers à comprendre leur niveau de conformité, ' +
  'identifier leurs axes de progression et démontrer leur savoir-faire auprès des donneurs d’ordres.'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'ClearGo — Évaluez et prouvez votre conformité transport',
    template: '%s | ClearGo',
  },
  description: DESCRIPTION,
  keywords: [
    'conformité transport routier',
    'ClearGo Score',
    'évaluation conformité transporteur',
    'registre transporteurs GRECO',
    'licence de transport',
    'FCO FIMO conducteur',
    'temps de conduite tachygraphe',
    'ADR ATP GDP transport',
    'ISO 9001 transport routier',
    'appel d’offres transport',
    'ClearGo',
  ],
  authors: [{ name: 'ClearGo', url: BASE_URL }],
  creator: 'ClearGo',
  publisher: 'ClearGo',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'ClearGo — Évaluez et prouvez votre conformité transport',
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: 'ClearGo',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/og-cleargo.webp',
        width: 1200,
        height: 630,
        alt: 'ClearGo — évaluation de la conformité des transporteurs routiers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClearGo — Évaluez et prouvez votre conformité transport',
    description: DESCRIPTION,
    images: ['/images/og-cleargo.webp'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0D2B5E',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ClearGo',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: BASE_URL,
  description: DESCRIPTION,
  inLanguage: 'fr-FR',
  provider: {
    '@type': 'Organization',
    name: 'ClearGo',
    url: BASE_URL,
    areaServed: 'FR',
    knowsAbout: [
      'Transport routier de marchandises',
      'Réglementation transport',
      'Licence de transport',
      'Temps de conduite',
      'FCO',
      'ADR',
      'ATP',
      'GDP',
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}
