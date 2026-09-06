import type { Metadata } from 'next'
import Link from 'next/link'
import { ClearGoIcon } from '@/components/icons/cleargo-icon'

export const metadata: Metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: true },
}

const PISTES = [
  { href: '/', label: 'Accueil', sub: 'Évaluer votre profil ClearGo' },
  { href: '/comment-ca-marche', label: 'Comment ça marche', sub: 'Le parcours détaillé, étape par étape' },
  { href: '/#referentiels', label: 'Les référentiels', sub: 'Ce sur quoi ClearGo vous évalue' },
  { href: '/#inscription', label: 'Nous contacter', sub: 'Commencer votre évaluation' },
]

export default function NotFound() {
  return (
    <main
      className="flex min-h-screen items-center py-20"
      style={{ background: 'var(--surface)' }}
    >
      <div className="mx-auto w-full max-w-3xl px-6">
        <p
          className="num text-[15px] font-bold tracking-[0.2em]"
          style={{ color: 'var(--t4)' }}
        >
          ERREUR 404
        </p>

        <h1
          className="mt-4 font-black tracking-tight"
          style={{
            fontSize: 'clamp(32px, 5vw, 54px)',
            lineHeight: 1.04,
            letterSpacing: '-2px',
            color: 'var(--cleargo-navy)',
          }}
        >
          Cette page n’existe pas.
        </h1>

        <p className="mt-5 max-w-[520px] text-[17px] leading-relaxed" style={{ color: 'var(--t3)' }}>
          Le lien est peut-être erroné, ou la page a été déplacée. Voici où aller.
        </p>

        <nav className="mt-10 grid gap-3 sm:grid-cols-2" aria-label="Pages principales">
          {PISTES.map((piste) => (
            <Link
              key={piste.href}
              href={piste.href}
              className="cg-card cg-card--lift block p-5"
            >
              <span className="block text-[15px] font-bold" style={{ color: 'var(--cleargo-navy)' }}>
                {piste.label}
              </span>
              <span className="mt-1 block text-[13.5px]" style={{ color: 'var(--t3)' }}>
                {piste.sub}
              </span>
            </Link>
          ))}
        </nav>

        <div className="mt-10 flex items-center gap-3">
          <ClearGoIcon name="reglo" size={34} className="shrink-0" />
          <p className="text-[13px]" style={{ color: 'var(--t4)' }}>
            Un lien cassé quelque part ? Écrivez-nous à{' '}
            <a
              href="mailto:contact@cleargo.fr"
              className="font-semibold underline underline-offset-2"
              style={{ color: 'var(--green-text)' }}
            >
              contact@cleargo.fr
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
