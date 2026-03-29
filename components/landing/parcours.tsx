"use client"

import { useEffect, useRef, useState } from "react"
import { FileCheck, CreditCard, FolderOpen, Users, BarChart2, Award, MessageSquare, ArrowRight } from "lucide-react"

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

const ETAPES = [
  {
    num: "01",
    icon: FileCheck,
    tag: "Gratuit",
    tagColor: "#64748B",
    title: "Préqualification",
    time: "5 minutes · Avant tout paiement",
    description: "Vous répondez à 5 questions sur votre activité (type de transport, effectif, certifications existantes). On vérifie que vous êtes dans le bon segment.",
    livrable: "Confirmation d'éligibilité + récap de ce que vous allez obtenir.",
    accent: "#64748B",
  },
  {
    num: "02",
    icon: CreditCard,
    tag: "299 € HT",
    tagColor: "#F97316",
    title: "Paiement",
    time: "Accès immédiat",
    description: "Accès sécurisé à votre parcours ClearGo. Confirmation immédiate et ouverture de votre espace client.",
    livrable: "Email de confirmation + checklist de préparation des documents.",
    accent: "#F97316",
  },
  {
    num: "03",
    icon: FolderOpen,
    tag: "J+1 à J+3",
    tagColor: "#A78BFA",
    title: "Préparation des documents",
    time: "À votre rythme, guidé",
    description: "Vous rassemblez vos pièces via une checklist guidée : licence de transport, Kbis, attestations URSSAF & impôts, FIMO/FCO conducteurs, cartes conducteur, contrôles techniques, attestations assurance, GDP/ADR si concerné.",
    livrable: "Espace de dépôt sécurisé + récap des documents reçus / manquants.",
    accent: "#A78BFA",
  },
  {
    num: "04",
    icon: Users,
    tag: "60–90 min",
    tagColor: "#00A896",
    title: "Session guidée",
    time: "Visio ou téléphone avec un expert",
    description: "Un expert ClearGo vous accompagne pour contextualiser chaque document, comprendre votre activité réelle (sous-traitance, chargeurs, certifications visées) et identifier vos points de vigilance métier. C'est ici que la valeur se construit.",
    livrable: "Compte-rendu de session + points clés identifiés.",
    accent: "#00A896",
  },
  {
    num: "05",
    icon: BarChart2,
    tag: "48h",
    tagColor: "#1A4A7A",
    title: "Analyse ClearGo",
    time: "Traitement structuré — sans intervention de votre part",
    description: "Validité de chaque pièce (OK / expire bientôt / expiré / manquant), croisement avec les obligations réglementaires applicables à votre activité, calcul du TrustScore selon la grille de pondération ClearGo.",
    livrable: null,
    accent: "#1A4A7A",
  },
  {
    num: "06",
    icon: Award,
    tag: "Livrable principal",
    tagColor: "#00A896",
    title: "Restitution : Score + Plan d'action",
    time: "PDF certifié + accès en ligne",
    description: "Votre TrustScore 0–1000 avec décomposition par catégorie (Social, Réglementaire, Véhicules, Formations, Qualité), comparaison sectorielle, et QR code partageable. Plus un plan d'action Pareto 80/20 : les 3 à 5 actions qui font monter votre score de 80%, avec délai, impact et ressource pour chacune.",
    livrable: "PDF certifié + lien partageable donneur d'ordre + alertes documents expirant sous 90 jours.",
    accent: "#00A896",
  },
  {
    num: "07",
    icon: MessageSquare,
    tag: "5 jours",
    tagColor: "#6366F1",
    title: "Fenêtre d'optimisation",
    time: "1 échange de suivi inclus (mail ou appel 30 min)",
    description: "Après la restitution, vous avez 5 jours pour poser vos questions, clarifier le plan, comprendre les priorités. L'objectif : repartir avec un plan que vous pouvez exécuter seul.",
    livrable: null,
    accent: "#6366F1",
  },
  {
    num: "08",
    icon: ArrowRight,
    tag: "Votre choix",
    tagColor: "#0D2B4E",
    title: "Sortie : abonnement ou autonomie",
    time: "Deux chemins possibles",
    description: "Vous exécutez seul votre plan → votre score est recalculé gratuitement dans 30 jours. Ou vous souscrivez à l'abonnement ClearGo pour une conformité pilotée en continu. Pas de pression. Le diagnostic a créé la clarté — la décision vous appartient.",
    livrable: null,
    accent: "#0D2B4E",
  },
]

interface ParcoursProps {
  onCta: () => void
}

export function Parcours({ onCta }: ParcoursProps) {
  const { ref, visible } = useReveal()

  return (
    <section id="parcours" className="bg-[#F0F4F8] py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-4xl px-6 lg:px-12">

        {/* Header */}
        <div
          className="mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <div className="section-eyebrow mb-4">Comment ça marche</div>
          <h2
            className="font-black text-[#0D2B4E]"
            style={{ fontSize: "clamp(32px, 4.5vw, 52px)", letterSpacing: "-2px", lineHeight: 1.05 }}
          >
            Les 8 étapes du diagnostic.
            <br />
            <span style={{ color: "#00A896" }}>Aucune question sans réponse.</span>
          </h2>
          <p className="mt-3 text-[17px] text-[#4A5A72]">De la préqualification gratuite à votre plan d'action — voici exactement ce qui se passe.</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[19px] top-0 bottom-0 w-px lg:left-[23px]"
            style={{ background: "linear-gradient(to bottom, #00A896, #E2E8F0)" }}
          />

          <div className="flex flex-col gap-0">
            {ETAPES.map((e, i) => {
              const Icon = e.icon
              return (
                <div
                  key={e.num}
                  className="relative flex gap-8 pb-10"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-16px)",
                    transition: `all 0.7s cubic-bezier(0.25,0.1,0.25,1) ${i * 60}ms`,
                  }}
                >
                  {/* Step circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white shadow-md lg:h-12 lg:w-12"
                      style={{ background: e.accent }}
                    >
                      <Icon className="h-4 w-4 text-white lg:h-5 lg:w-5" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    {/* Step number + tag */}
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-black tracking-[0.2em] text-[#CBD5E1]">{e.num}</span>
                      <span
                        className="rounded-full px-3 py-0.5 text-[11px] font-black"
                        style={{ background: `${e.accent}18`, color: e.accent, border: `1px solid ${e.accent}35` }}
                      >
                        {e.tag}
                      </span>
                    </div>

                    {/* Title + time */}
                    <h3 className="text-[17px] font-black text-[#0D2B4E] leading-tight">{e.title}</h3>
                    <p className="mt-0.5 text-[12px] font-semibold" style={{ color: e.accent }}>{e.time}</p>

                    {/* Description */}
                    <p className="mt-2 text-[14px] leading-relaxed text-[#4A5A72]">{e.description}</p>

                    {/* Livrable badge */}
                    {e.livrable && (
                      <div
                        className="mt-3 inline-flex items-start gap-2 rounded-xl border px-4 py-2.5"
                        style={{ borderColor: `${e.accent}30`, background: `${e.accent}0C` }}
                      >
                        <span className="mt-0.5 flex-shrink-0 text-[11px] font-black uppercase tracking-wider" style={{ color: e.accent }}>
                          Livrable
                        </span>
                        <span className="text-[12px] leading-relaxed text-[#4A5A72]">{e.livrable}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA banner */}
        <div
          className="mt-8 rounded-2xl bg-[#0D2B4E] px-8 py-8 lg:px-12 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.55s",
          }}
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#00A896]/40 bg-[#00A896]/10 px-4 py-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A896]">Compliance as a Service</span>
          </div>
          <p className="text-[18px] font-bold text-white/70 mb-2">
            La préqualification, c'est maintenant — c'est gratuit.
          </p>
          <p className="text-[17px] font-bold text-white mb-6">
            Le diagnostic complet vous attend. 299 € HT. Résultat sous 48h.
          </p>
          <button
            onClick={onCta}
            data-cta
            className="btn-press inline-flex items-center gap-2 rounded-2xl bg-[#00A896] px-8 py-4 text-[16px] font-bold text-white"
            style={{ boxShadow: "0 8px 32px -4px rgba(0,168,150,0.4)" }}
          >
            Démarrer ma préqualification →
          </button>
          <p className="mt-3 text-[13px] text-white/35">Transporteurs uniquement · Sans engagement</p>
        </div>
      </div>
    </section>
  )
}
