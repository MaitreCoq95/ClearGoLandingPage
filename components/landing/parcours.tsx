"use client"

import { useEffect, useRef, useState } from "react"
import {
  FileCheck, CreditCard, FolderOpen, Users, BarChart2, Award, MessageSquare, ArrowRight,
} from "lucide-react"

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
    num: "01", icon: FileCheck, tag: "Gratuit", tagColor: "#8FA4B2",
    title: "Préqualification",
    time: "5 minutes · Avant tout engagement",
    description: "Vous entrez votre SIRET — on identifie automatiquement votre entreprise, votre secteur NAF et vos obligations réglementaires. Puis 5 questions pour confirmer votre profil.",
    livrable: "Confirmation d'éligibilité + récap de ce que vous allez obtenir.",
    accent: "#8FA4B2",
  },
  {
    num: "02", icon: CreditCard, tag: "Diagnostic", tagColor: "#A87055",
    title: "Engagement",
    time: "Accès immédiat · Tarif communiqué après pré-qualification",
    description: "Accès sécurisé à votre parcours ClearGo. Confirmation immédiate et ouverture de votre espace client.",
    livrable: "Email de confirmation + checklist de préparation des documents.",
    accent: "#A87055",
  },
  {
    num: "03", icon: FolderOpen, tag: "J+1 à J+3", tagColor: "#6B8FAA",
    title: "Préparation des documents",
    time: "À votre rythme, guidé",
    description: "Vous rassemblez vos pièces via une checklist guidée : licence de transport, Kbis, attestations URSSAF & impôts, FIMO/FCO conducteurs, cartes conducteur, contrôles techniques, attestations assurance, GDP/ADR si concerné.",
    livrable: "Espace de dépôt sécurisé + récap des documents reçus / manquants.",
    accent: "#6B8FAA",
  },
  {
    num: "04", icon: Users, tag: "60–90 min", tagColor: "#4A7B8C",
    title: "Session guidée",
    time: "Visio ou téléphone avec un expert",
    description: "Un expert ClearGo vous accompagne pour contextualiser chaque document, comprendre votre activité réelle (sous-traitance, chargeurs, certifications visées) et identifier vos points de vigilance métier.",
    livrable: "Compte-rendu de session + points clés identifiés.",
    accent: "#4A7B8C",
  },
  {
    num: "05", icon: BarChart2, tag: "48h", tagColor: "#3A4E5A",
    title: "Analyse ClearGo",
    time: "Traitement structuré — sans intervention de votre part",
    description: "Validité de chaque pièce (OK / expire bientôt / expiré / manquant), croisement avec les obligations réglementaires applicables à votre activité, calcul du TrustScore selon la grille de pondération ClearGo.",
    livrable: null,
    accent: "#3A4E5A",
  },
  {
    num: "06", icon: Award, tag: "Livrable principal", tagColor: "#4A7B8C",
    title: "Restitution : Score + Plan d'action",
    time: "PDF certifié + accès en ligne",
    description: "Votre TrustScore 0–1000 avec décomposition par catégorie, comparaison sectorielle, et QR code partageable. Plus un plan d'action Pareto 80/20 : les 3 à 5 actions qui font monter votre score de 80%, avec délai, impact et ressource pour chacune.",
    livrable: "PDF certifié + lien partageable donneur d'ordre + alertes documents expirant sous 90 jours.",
    accent: "#4A7B8C",
  },
  {
    num: "07", icon: MessageSquare, tag: "5 jours", tagColor: "#6B8FAA",
    title: "Fenêtre d'optimisation",
    time: "1 échange de suivi inclus (mail ou appel 30 min)",
    description: "Après la restitution, vous avez 5 jours pour poser vos questions, clarifier le plan, comprendre les priorités. L'objectif : repartir avec un plan que vous pouvez exécuter seul.",
    livrable: null,
    accent: "#6B8FAA",
  },
  {
    num: "08", icon: ArrowRight, tag: "Votre choix", tagColor: "#1C2B35",
    title: "Sortie : abonnement CaaS ou autonomie",
    time: "Deux chemins possibles",
    description: "Vous exécutez seul votre plan → votre score est recalculé gratuitement dans 30 jours. Ou vous souscrivez à l'abonnement ClearGo pour une conformité pilotée en continu. Pas de pression. Le diagnostic a créé la clarté — la décision vous appartient.",
    livrable: null,
    accent: "#1C2B35",
  },
]

interface ParcoursProps {
  onCta: () => void
}

export function Parcours({ onCta }: ParcoursProps) {
  const { ref, visible } = useReveal()

  return (
    <section id="parcours" className="py-24 lg:py-32" ref={ref} style={{ background: "#FAFBFC" }}>
      <div className="mx-auto max-w-4xl px-6 lg:px-12">

        {/* Header */}
        <div
          className="mb-16"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <div className="section-eyebrow mb-4">Comment ça marche</div>
          <h2
            className="font-black"
            style={{ fontSize: "clamp(30px, 4.2vw, 50px)", letterSpacing: "-1.8px", lineHeight: 1.06, color: "#1C2B35" }}
          >
            Les 8 étapes du diagnostic.
            <br />
            <span style={{ color: "#4A7B8C" }}>Aucune question sans réponse.</span>
          </h2>
          <p className="mt-3 text-[16px]" style={{ color: "#5E7485" }}>De l'identification par SIRET à votre plan d'action — voici exactement ce qui se passe.</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div
            className="absolute left-[19px] top-0 bottom-0 w-px lg:left-[23px]"
            style={{ background: "linear-gradient(to bottom, #4A7B8C, #D5DFE5)" }}
          />

          <div className="flex flex-col gap-0">
            {ETAPES.map((e, i) => {
              const Icon = e.icon
              return (
                <div
                  key={e.num}
                  className="relative flex gap-8 pb-10"
                  style={{
                    opacity:    visible ? 1 : 0,
                    transform:  visible ? "translateX(0)" : "translateX(-16px)",
                    transition: `all 0.7s cubic-bezier(0.25,0.1,0.25,1) ${i * 60}ms`,
                  }}
                >
                  {/* Step circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white shadow-sm lg:h-12 lg:w-12"
                      style={{ background: e.accent }}
                    >
                      <Icon className="h-4 w-4 text-white lg:h-5 lg:w-5" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-black tracking-[0.2em]" style={{ color: "#B5C5CF" }}>{e.num}</span>
                      <span
                        className="rounded-full px-3 py-0.5 text-[11px] font-black"
                        style={{ background: `${e.accent}18`, color: e.accent, border: `1px solid ${e.accent}35` }}
                      >
                        {e.tag}
                      </span>
                    </div>
                    <h3 className="text-[16px] font-black leading-tight" style={{ color: "#1C2B35" }}>{e.title}</h3>
                    <p className="mt-0.5 text-[12px] font-semibold" style={{ color: e.accent }}>{e.time}</p>
                    <p className="mt-2 text-[13px] leading-relaxed" style={{ color: "#5E7485" }}>{e.description}</p>

                    {e.livrable && (
                      <div
                        className="mt-3 inline-flex items-start gap-2 rounded-lg border px-4 py-2.5"
                        style={{ borderColor: `${e.accent}30`, background: `${e.accent}0C` }}
                      >
                        <span className="mt-0.5 flex-shrink-0 text-[10px] font-black uppercase tracking-wider" style={{ color: e.accent }}>
                          Livrable
                        </span>
                        <span className="text-[12px] leading-relaxed" style={{ color: "#5E7485" }}>{e.livrable}</span>
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
          className="mt-8 rounded-2xl px-8 py-8 lg:px-12 text-center"
          style={{
            background: "#1C2B35",
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.55s",
          }}
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5" style={{ borderColor: "rgba(74,123,140,0.4)", background: "rgba(74,123,140,0.1)" }}>
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "#6AABB8" }}>Compliance as a Service</span>
          </div>
          <p className="text-[17px] font-bold mb-2 text-white/70">
            La préqualification, c'est maintenant — c'est gratuit.
          </p>
          <p className="text-[16px] font-bold text-white mb-6">
            Identifiez votre entreprise par SIRET et démarrez en 5 minutes.
          </p>
          <button
            onClick={onCta}
            data-cta
            className="btn-press inline-flex items-center gap-2 rounded-lg px-8 py-4 text-[15px] font-bold text-white"
            style={{ background: "#4A7B8C", boxShadow: "0 6px 28px -4px rgba(74,123,140,0.4)" }}
          >
            Identifier mon entreprise →
          </button>
          <p className="mt-3 text-[12px] text-white/35">Transporteurs uniquement · Sans engagement</p>
        </div>
      </div>
    </section>
  )
}
