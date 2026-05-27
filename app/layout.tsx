import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CookieBanner } from '@/components/cookie-banner'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const BASE_URL = "https://cleargo.fr"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'ClearGo — Compliance as a Service pour transporteurs',
    template: '%s | ClearGo',
  },
  description:
    'ClearGo est le service de conformité à la demande (CaaS) pour transporteurs routiers. Trust Score 0-1000, rapport PDF certifié, partageable en 1 clic avec vos donneurs d\'ordre.',
  keywords: [
    'conformité transport routier',
    'compliance transporteur',
    'trust score transport',
    'CaaS compliance',
    'diagnostic conformité TRM',
    'DRIEAT conformité',
    'licence transport conformité',
    'FCO FIMO conformité',
    'audit transport routier',
    'certification transporteur',
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
    title: 'ClearGo — Compliance as a Service pour transporteurs',
    description:
      "Pré-qualification gratuite. Diagnostic conformité 199€. Trust Score partageable avec vos donneurs d'ordre. Réservé aux transporteurs routiers.",
    url: BASE_URL,
    siteName: 'ClearGo',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/sitl-banner.png',
        width: 1200,
        height: 630,
        alt: 'ClearGo — Compliance as a Service pour transporteurs routiers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClearGo — Compliance as a Service pour transporteurs',
    description:
      'Pré-qualification gratuite. Diagnostic conformité 199€. Trust Score partageable en 1 clic.',
    images: ['/images/sitl-banner.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#4A7B8C',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ClearGo',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: BASE_URL,
  description:
    'Service de conformité à la demande (CaaS) pour transporteurs routiers. Trust Score 0-1000, diagnostic complet, rapport PDF certifié.',
  provider: {
    '@type': 'Organization',
    name: 'ClearGo',
    url: BASE_URL,
    areaServed: 'FR',
    knowsAbout: ['Transport routier', 'Conformité réglementaire', 'DRIEAT', 'FCO', 'FIMO', 'ADR'],
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
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}
