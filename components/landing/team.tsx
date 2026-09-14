'use client'

import { useReveal } from '@/hooks/use-reveal'

const FONDATEURS = [
  {
    initiale: 'V',
    prenom: 'Vivien',
    bio: '15 ans de terrain en conformité transport pharma et multi-sectoriel. Lean Six Sigma Black Belt.',
  },
  {
    initiale: 'W',
    prenom: 'Wyssam',
    bio: '20 ans de transport, de chauffeur à la direction. Réseau opérationnel de transporteurs en France.',
  },
]

export function Team() {
  const { ref, visible } = useReveal()

  const enter = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .7s var(--ease-apple) ${delay}s, transform .7s var(--ease-apple) ${delay}s`,
  })

  return (
    <section id="equipe" className="py-20 lg:py-24" style={{ background: 'var(--surface)' }} ref={ref}>
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        <div className="text-center" style={enter(0)}>
          <div className="section-eyebrow mb-4">L’équipe</div>
          <h2
            className="font-black tracking-tight"
            style={{
              fontSize: 'clamp(26px, 3.2vw, 38px)',
              lineHeight: 1.12,
              letterSpacing: '-1.2px',
              color: 'var(--cleargo-navy)',
            }}
          >
            Fondée par des professionnels du transport
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {FONDATEURS.map((f, i) => (
            <div key={f.prenom} className="cg-card p-6" style={enter(0.1 + i * 0.1)}>
              <div className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[17px] font-black text-white"
                  style={{ background: 'var(--cleargo-navy)' }}
                  aria-hidden="true"
                >
                  {f.initiale}
                </span>
                <span className="text-[17px] font-black" style={{ color: 'var(--cleargo-navy)' }}>
                  {f.prenom}
                </span>
              </div>
              <p className="mt-4 text-[14.5px] leading-relaxed" style={{ color: 'var(--t3)' }}>
                {f.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
