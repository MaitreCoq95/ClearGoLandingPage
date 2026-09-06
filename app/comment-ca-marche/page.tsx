import type { Metadata } from 'next'
import Link from 'next/link'
import { ClearGoIcon, type ClearGoIconName } from '@/components/icons/cleargo-icon'

export const metadata: Metadata = {
  title: 'Comment ça marche',
  description:
    'Le déroulé détaillé d’une évaluation ClearGo : périmètre applicable, dépôt des preuves, analyse, restitution du ClearGo Score et plan d’actions priorisé.',
  alternates: { canonical: 'https://cleargo.fr/comment-ca-marche' },
}

interface Etape {
  n: string
  titre: string
  delai: string
  icone: ClearGoIconName
  description: string
  livrable?: string
}

const ETAPES: Etape[] = [
  {
    n: '01',
    titre: 'Pré-qualification',
    delai: 'Immédiat · gratuit',
    icone: 'upload',
    description:
      'Vous renseignez votre SIRET et six informations sur votre activité. ClearGo vérifie votre inscription au registre national des transporteurs et identifie les grandes familles d’exigences qui vous concernent.',
    livrable: 'Aperçu du périmètre applicable et ouverture de votre espace.',
  },
  {
    n: '02',
    titre: 'Cadrage du périmètre',
    delai: 'J+1',
    icone: 'core-acces-profession',
    description:
      'À partir de votre activité, de vos zones de livraison et de vos spécialités, ClearGo construit la liste des exigences réellement applicables. Une entreprise de messagerie régionale et un transporteur pharma international ne sont pas évalués sur les mêmes points.',
    livrable: 'Votre périmètre d’évaluation détaillé, domaine par domaine.',
  },
  {
    n: '03',
    titre: 'Préparation des preuves',
    delai: 'J+1 à J+3',
    icone: 'document-valide',
    description:
      'Vous recevez une liste de pièces personnalisée — pas un formulaire générique. Chaque document demandé est rattaché à une exigence précise, avec la raison pour laquelle il est attendu.',
    livrable: 'Checklist personnalisée des pièces à réunir.',
  },
  {
    n: '04',
    titre: 'Session guidée',
    delai: '60 à 90 minutes',
    icone: 'donneur-ordres',
    description:
      'Un échange avec l’équipe ClearGo pour parcourir votre organisation, vos pratiques réelles et vos points de vigilance. C’est là que le savoir-faire non écrit se documente.',
  },
  {
    n: '05',
    titre: 'Analyse',
    delai: 'Sous 48 h',
    icone: 'controle-technique',
    description:
      'Chaque pièce et chaque déclaration est confrontée aux exigences applicables. Les écarts sont qualifiés : ce qui manque, ce qui est incomplet, ce qui est présent mais non démontrable.',
  },
  {
    n: '06',
    titre: 'Restitution',
    delai: 'Sur rendez-vous',
    icone: 'cleargo-score',
    description:
      'Votre ClearGo Score sur 1000, le détail par domaine, vos points forts et le palier de maturité atteint. La restitution est commentée, pas envoyée par email sans explication.',
    livrable: 'ClearGo Score détaillé et profil de conformité.',
  },
  {
    n: '07',
    titre: 'Fenêtre d’optimisation',
    delai: '5 jours',
    icone: 'plan-dactions',
    description:
      'Vous disposez d’un délai pour transmettre les pièces manquantes identifiées pendant l’analyse. Les écarts corrigés sont réintégrés au score.',
    livrable: 'Plan d’actions priorisé, avec preuves attendues et délais cibles.',
  },
  {
    n: '08',
    titre: 'Suite du parcours',
    delai: 'À votre rythme',
    icone: 'expiration',
    description:
      'Vous repartez avec votre plan d’actions et vous choisissez la suite : autonomie, ou suivi continu avec alertes avant expiration et mise à jour du score dans le temps.',
  },
]

export default function CommentCaMarche() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b" style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}>
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-[15px] font-black"
            style={{ color: 'var(--cleargo-navy)' }}
          >
            ← ClearGo
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-14 lg:py-20">
        <div className="section-eyebrow mb-4">Le parcours détaillé</div>
        <h1
          className="font-black tracking-tight"
          style={{
            fontSize: 'clamp(32px, 4.4vw, 52px)',
            lineHeight: 1.06,
            letterSpacing: '-2px',
            color: 'var(--cleargo-navy)',
          }}
        >
          Comment ça marche
        </h1>
        <p className="mt-5 max-w-2xl text-[17px] leading-relaxed" style={{ color: 'var(--t3)' }}>
          Le déroulé complet d’une évaluation ClearGo, étape par étape. Vous savez à chaque
          moment ce qui est attendu de vous et ce que vous recevez en retour.
        </p>

        <ol className="mt-14 flex flex-col gap-3">
          {ETAPES.map((e) => (
            <li key={e.n} className="cg-card p-6 lg:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <div className="flex shrink-0 items-start gap-4">
                  <span
                    className="num flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[14px] font-bold text-white"
                    style={{ background: 'var(--cleargo-navy)' }}
                  >
                    {e.n}
                  </span>
                  <ClearGoIcon
                    name={e.icone}
                    size={30}
                    className="mt-1 hidden sm:block"
                    style={{ color: 'var(--cleargo-navy)' }}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="text-[17px] font-black" style={{ color: 'var(--cleargo-navy)' }}>
                      {e.titre}
                    </h2>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold"
                      style={{ background: 'var(--surface)', color: 'var(--t4)' }}
                    >
                      {e.delai}
                    </span>
                  </div>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed" style={{ color: 'var(--t3)' }}>
                    {e.description}
                  </p>
                  {e.livrable && (
                    <p
                      className="mt-3 rounded-lg px-3.5 py-2.5 text-[13.5px]"
                      style={{ background: 'var(--green-pale)', color: 'var(--cleargo-navy)' }}
                    >
                      <span className="font-bold" style={{ color: 'var(--green-text)' }}>
                        Livrable ·{' '}
                      </span>
                      {e.livrable}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div
          className="mt-12 rounded-xl p-7 text-center"
          style={{ background: 'var(--surface)' }}
        >
          <p className="text-[17px] font-black" style={{ color: 'var(--cleargo-navy)' }}>
            Prêt à savoir où vous en êtes ?
          </p>
          <p className="mt-2 text-[14px]" style={{ color: 'var(--t3)' }}>
            La pré-qualification est gratuite et sans engagement.
          </p>
          <Link
            href="/#inscription"
            className="btn-press mt-5 inline-block rounded-xl px-7 py-3.5 text-[15px] font-bold text-white"
            style={{ background: 'var(--green)' }}
          >
            Évaluer mon profil ClearGo →
          </Link>
        </div>
      </article>
    </main>
  )
}
