"use client"

import { useEffect, useRef, useState } from "react"
import { FileCheck2, PackageSearch, ShieldCheck, Handshake, ClipboardCheck, Building2 } from "lucide-react"

const useCases = [
  {
    icon: FileCheck2,
    sector: "Grande distribution",
    company: "Responsable logistique -- Grand groupe retail",
    quote: "Avant on demandait 15 documents. Maintenant on scanne le QR code ClearGo et on voit le score en temps reel. Un transporteur en dessous de 600 points ne passe plus le premier filtre.",
    scoreMin: 600,
    label: "Seuil minimum exige",
    badgeLevel: "ARGENT",
  },
  {
    icon: PackageSearch,
    sector: "Industrie pharmaceutique",
    company: "Directeur Supply Chain -- Laboratoire pharma",
    quote: "La conformite GDP n'est pas negociable. Le TrustScore ClearGo nous permet de verifier instantanement si notre prestataire a les bonnes pratiques de distribution en place, avec un audit continu plutot qu'un certificat papier ponctuel.",
    scoreMin: 750,
    label: "Exigence GDP",
    badgeLevel: "OR",
  },
  {
    icon: ShieldCheck,
    sector: "BTP / Materiaux",
    company: "Acheteur Transport -- Leader materiaux construction",
    quote: "On a integre le score ClearGo dans notre grille de notation fournisseurs. Un transporteur OR ou PLATINE gagne automatiquement 20 points sur les criteres QSE de nos appels d'offres.",
    scoreMin: 650,
    label: "Bonus AO automatique",
    badgeLevel: "OR",
  },
  {
    icon: Handshake,
    sector: "Affretement",
    company: "Directeur General -- Commissionnaire de transport",
    quote: "Je refuse de sous-traiter a un transporteur sans TrustScore. La responsabilite solidaire m'impose de verifier la conformite de mes affretes. ClearGo me donne une preuve opposable en 2 secondes.",
    scoreMin: 500,
    label: "Vigilance sous-traitance",
    badgeLevel: "ARGENT",
  },
  {
    icon: ClipboardCheck,
    sector: "Collectivites territoriales",
    company: "Responsable Marches Publics -- Metropole",
    quote: "Nos cahiers des charges integrent desormais un critere RSE transport. Le score ClearGo est le seul outil qui agrege conformite reglementaire ET engagement environnemental en un seul indicateur verifiable.",
    scoreMin: 700,
    label: "Critere marche public",
    badgeLevel: "OR",
  },
  {
    icon: Building2,
    sector: "Logistique contractuelle",
    company: "Directeur Operations -- 3PL europeen",
    quote: "Quand on renouvelle nos contrats de sous-traitance, le TrustScore est devenu la premiere ligne de notre checklist. Un transporteur PLATINE est prolonge sans renegociation. En dessous d'ARGENT, on cherche un remplacant.",
    scoreMin: 850,
    label: "Renouvellement garanti",
    badgeLevel: "PLATINE",
  },
]

const badgeColors: Record<string, string> = {
  BRONZE: "bg-amber-700/10 text-amber-700 border-amber-700/20",
  ARGENT: "bg-slate-400/10 text-slate-500 border-slate-400/20",
  OR: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  PLATINE: "bg-[var(--navy)]/8 text-[var(--navy)] border-[var(--navy)]/20",
}

export function TrustScoreUseCases() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="bg-[var(--off-white)] py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-[var(--green)]">
            <span className="h-0.5 w-4 rounded bg-[var(--green)]" />
            {"// TRUSTSCORE EN ACTION"}
          </div>
          <h2 className="mt-3 font-sans text-4xl font-black leading-none tracking-tight text-[var(--navy-dark)] lg:text-5xl">
            <span className="text-balance">
              {"Les donneurs d'ordre l'exigent."}
              <br />
              {"Les transporteurs le prouvent."}
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-serif text-[17px] leading-relaxed text-[var(--text-secondary)]">
            Votre TrustScore ClearGo n{"'"}est pas un simple chiffre interne. C{"'"}est un indicateur de confiance verifie, partage et utilise par les acteurs majeurs de la supply chain pour selectionner leurs partenaires transport.
          </p>
        </div>

        {/* Use case grid */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((uc, i) => {
            const Icon = uc.icon
            return (
              <div
                key={i}
                className={`group flex flex-col rounded-2xl border border-border bg-[var(--background)] p-6 transition-all duration-500 hover:border-[var(--green)]/40 hover:shadow-lg ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--navy)]/6">
                      <Icon className="h-5 w-5 text-[var(--navy)]" />
                    </div>
                    <span className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--green)]">{uc.sector}</span>
                  </div>
                  <span className={`rounded-md border px-2.5 py-1 font-sans text-[10px] font-black uppercase tracking-wider ${badgeColors[uc.badgeLevel]}`}>
                    {uc.badgeLevel}
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="mt-4 flex-1 font-serif text-[14px] leading-relaxed text-[var(--text-secondary)]">
                  {"\u201C"}{uc.quote}{"\u201D"}
                </blockquote>

                {/* Source + score bar */}
                <div className="mt-5 border-t border-border pt-4">
                  <div className="font-sans text-[11px] font-semibold text-[var(--text-tertiary)]">{uc.company}</div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1">
                      <div className="h-2 overflow-hidden rounded-full bg-[var(--off-white)]">
                        <div
                          className="h-full rounded-full bg-[var(--green)] transition-all duration-1000"
                          style={{ width: visible ? `${(uc.scoreMin / 1000) * 100}%` : "0%" }}
                        />
                      </div>
                    </div>
                    <span className="font-sans text-sm font-black text-[var(--navy)]">{uc.scoreMin}</span>
                    <span className="font-sans text-[10px] text-[var(--text-tertiary)]">/1000</span>
                  </div>
                  <div className="mt-1.5 font-sans text-[11px] font-semibold text-[var(--green)]">{uc.label}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom summary */}
        <div className="mt-14 rounded-2xl border border-[var(--navy)]/10 bg-[var(--navy-dark)] p-8 text-center lg:p-10">
          <h3 className="font-sans text-2xl font-black text-white lg:text-3xl">
            {"Score eleve = portes ouvertes"}
          </h3>
          <p className="mx-auto mt-3 max-w-2xl font-serif text-[15px] leading-relaxed text-white/60">
            Les entreprises ayant un TrustScore superieur a 700 remportent en moyenne{" "}
            <strong className="text-[#7FE8A0]">3x plus d{"'"}appels d{"'"}offres</strong>{" "}
            que celles sans score verifiable. Le TrustScore est consulte avant la proposition tarifaire dans 72% des cas chez les grands donneurs d{"'"}ordre.
          </p>
          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:justify-center sm:gap-6">
            {[
              { num: "72%", desc: "consultent le score avant le prix" },
              { num: "3x", desc: "plus de contrats remportes" },
              { num: "-40%", desc: "de temps en due diligence" },
            ].map((stat) => (
              <div key={stat.num} className="flex flex-col items-center">
                <span className="font-sans text-3xl font-black text-[#7FE8A0]">{stat.num}</span>
                <span className="mt-1 font-serif text-[12px] text-white/50">{stat.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
