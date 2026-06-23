"use client"

import { useEffect, useRef, useState } from "react"
import {
  ClipboardList, Stethoscope, FolderOpen, Users, Award, RefreshCw,
} from "lucide-react"
import { FeatureCarousel } from "@/components/ui/feature-carousel"

const SLIDES = [
  {
    step: "01",
    badge: "Gratuit",
    badgeColor: "#8FA4B2",
    title: "Pré-qualification",
    description: "5 minutes pour savoir où vous en êtes. On identifie vos vraies obligations réglementaires à partir de votre SIRET.",
    items: [
      "Identification automatique par SIRET",
      "Cartographie de vos obligations réelles",
      "Premier aperçu de votre niveau de conformité",
    ],
    note: "Gratuit. Sans engagement. Résultat immédiat.",
    accent: "#8FA4B2",
    icon: <ClipboardList className="h-6 w-6" style={{ color: "#8FA4B2" }} strokeWidth={2.5} />,
    image: "/images/steps/step-01.jpg",
  },
  {
    step: "02",
    badge: "Diagnostic",
    badgeColor: "#A87055",
    title: "Diagnostic complet",
    description: "Le diagnostic approfondi de votre conformité. Audit documentaire structuré, session accompagnée incluse.",
    items: [
      "Audit complet de vos documents et process",
      "Identification de tous vos écarts réglementaires",
      "Préparation documentaire guidée en amont",
    ],
    note: "Tarif communiqué après pré-qualification.",
    accent: "#A87055",
    icon: <Stethoscope className="h-6 w-6" style={{ color: "#A87055" }} strokeWidth={2.5} />,
    image: "/images/steps/step-02.jpg",
  },
  {
    step: "03",
    badge: "Inclus",
    badgeColor: "#6B8FAA",
    title: "Préparation documentaire",
    description: "Avant la session, on vous guide pour rassembler et organiser tous vos documents.",
    items: [
      "Checklist personnalisée selon votre profil",
      "Accès aux templates de documents conformes",
      "Fenêtre de préparation de 5 à 7 jours",
    ],
    note: "Plus vous êtes préparé, plus la session est efficace.",
    accent: "#6B8FAA",
    icon: <FolderOpen className="h-6 w-6" style={{ color: "#6B8FAA" }} strokeWidth={2.5} />,
    image: "/images/steps/step-03.jpg",
  },
  {
    step: "04",
    badge: "45 min",
    badgeColor: "#4A7B8C",
    title: "Session accompagnée",
    description: "45 minutes en live avec un expert ClearGo. On remplit ensemble, correctement, sans jargon.",
    items: [
      "Session en visio avec un expert terrain",
      "Remplissage guidé document par document",
      "Accompagnement humain, pas automatisé",
    ],
    note: "Inclus dans le diagnostic. Pas de frais cachés.",
    accent: "#4A7B8C",
    icon: <Users className="h-6 w-6" style={{ color: "#4A7B8C" }} strokeWidth={2.5} />,
    image: "/images/steps/step-04.jpg",
  },
  {
    step: "05",
    badge: "48h",
    badgeColor: "#3A4E5A",
    title: "Trust Score + Rapport",
    description: "Votre Trust Score 0–1000 calculé. Rapport PDF certifié + plan d'action priorisé.",
    items: [
      "Score RÉGLO + EXCELLENCE détaillé",
      "Rapport PDF certifié partageable",
      "Plan d'action priorisé et personnalisé",
    ],
    note: "Preuve commerciale utilisable immédiatement sur vos AO.",
    accent: "#6AABB8",
    icon: <Award className="h-6 w-6" style={{ color: "#6AABB8" }} strokeWidth={2.5} />,
    image: "/images/steps/step-05.jpg",
  },
  {
    step: "06",
    badge: "CaaS",
    badgeColor: "#4A7B8C",
    title: "Abonnement CaaS",
    description: "La conformité tourne en continu. Alertes, mises à jour, chatbot. Vous roulez, on surveille.",
    items: [
      "Score mis à jour en temps réel",
      "Alertes proactives avant expiration",
      "Chatbot compliance disponible 24h/24",
    ],
    note: "Compliance as a Service — pas un one-shot.",
    accent: "#4A7B8C",
    icon: <RefreshCw className="h-6 w-6" style={{ color: "#4A7B8C" }} strokeWidth={2.5} />,
    image: "/images/steps/step-06.jpg",
  },
]

function useReveal(threshold = 0.06) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

interface TransformationCarouselProps {
  onCta: () => void
}

export function TransformationCarousel({ onCta }: TransformationCarouselProps) {
  const { ref, visible } = useReveal()

  return (
    <section
      id="transformation"
      className="relative overflow-hidden py-20 lg:py-28"
      style={{ background: "#EEF2F4" }}
      ref={ref}
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.9s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <FeatureCarousel
            title={
              <>
                De zéro à{" "}
                <span style={{ color: "#4A7B8C" }}>conforme</span>
                {" "}— étape par étape.
              </>
            }
            subtitle="La transformation complète d'un transporteur. Du diagnostic initial à l'abonnement CaaS."
            slides={SLIDES}
          />
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-12 flex flex-col items-center gap-4"
          style={{
            opacity:    visible ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.4s",
          }}
        >
          <button
            onClick={onCta}
            data-cta
            className="btn-press inline-flex items-center gap-2 rounded-lg px-8 py-4 text-[15px] font-bold text-white"
            style={{ background: "#4A7B8C", boxShadow: "0 6px 28px -4px rgba(74,123,140,0.35)" }}
          >
            Commencer l'étape 01 — c'est gratuit →
          </button>
          <p className="text-[12px]" style={{ color: "#8FA4B2" }}>Identification par SIRET · Pré-qualification immédiate</p>
        </div>
      </div>
    </section>
  )
}
