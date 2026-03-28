"use client"

import { useEffect, useRef, useState } from "react"
import {
  ClipboardList,
  Stethoscope,
  FolderOpen,
  Users,
  Award,
  RefreshCw,
} from "lucide-react"
import { FeatureCarousel } from "@/components/ui/feature-carousel"

const SLIDES = [
  {
    step: "01",
    badge: "Gratuit",
    badgeColor: "#94A3B8",
    title: "Pré-qualification",
    description: "5 minutes pour savoir où vous en êtes. On identifie vos vraies obligations réglementaires.",
    items: [
      "Questions clés sur votre activité",
      "Identification de vos obligations réelles",
      "Premier aperçu de votre niveau de conformité",
    ],
    note: "Gratuit. Sans engagement. Résultat immédiat.",
    accent: "#94A3B8",
    icon: <ClipboardList className="h-6 w-6" style={{ color: "#94A3B8" }} strokeWidth={2.5} />,
  },
  {
    step: "02",
    badge: "199 € SITL",
    badgeColor: "#F97316",
    title: "Diagnostic complet",
    description: "Le diagnostic approfondi de votre conformité. Disponible à partir de juin — 299 € en standard.",
    items: [
      "Audit complet de vos documents et process",
      "Identification de tous vos écarts réglementaires",
      "Préparation documentaire guidée en amont",
    ],
    note: "Diagnostic offert si engagement accompagnement (offre SITL).",
    accent: "#F97316",
    icon: <Stethoscope className="h-6 w-6" style={{ color: "#F97316" }} strokeWidth={2.5} />,
  },
  {
    step: "03",
    badge: "Inclus",
    badgeColor: "#A78BFA",
    title: "Préparation documentaire",
    description: "Avant la session, on vous guide pour rassembler et organiser tous vos documents.",
    items: [
      "Checklist personnalisée selon votre profil",
      "Accès aux templates de documents conformes",
      "Fenêtre de préparation de 5 à 7 jours",
    ],
    note: "Plus vous êtes préparé, plus la session est efficace.",
    accent: "#A78BFA",
    icon: <FolderOpen className="h-6 w-6" style={{ color: "#A78BFA" }} strokeWidth={2.5} />,
  },
  {
    step: "04",
    badge: "45 min",
    badgeColor: "#00A896",
    title: "Session accompagnée",
    description: "45 minutes en live avec un expert ClearGo. On remplit ensemble, correctement, sans jargon.",
    items: [
      "Session en visio avec un expert terrain",
      "Remplissage guidé document par document",
      "Accompagnement humain, pas automatisé",
    ],
    note: "Inclus dans le diagnostic. Pas de frais cachés.",
    accent: "#00A896",
    icon: <Users className="h-6 w-6" style={{ color: "#00A896" }} strokeWidth={2.5} />,
  },
  {
    step: "05",
    badge: "24h",
    badgeColor: "#1A4A7A",
    title: "Trust Score + Rapport",
    description: "Votre Trust Score 0–1000 calculé. Rapport PDF certifié + plan d'action priorisé sous 24h.",
    items: [
      "Score RÉGLO + EXCELLENCE détaillé",
      "Rapport PDF certifié partageable",
      "Plan d'action priorisé et personnalisé",
    ],
    note: "Preuve commerciale utilisable immédiatement sur vos AO.",
    accent: "#1A4A7A",
    icon: <Award className="h-6 w-6" style={{ color: "#7EB5E0" }} strokeWidth={2.5} />,
  },
  {
    step: "06",
    badge: "99 €/mois",
    badgeColor: "#00A896",
    title: "Abonnement CaaS",
    description: "La conformité tourne en continu. Alertes, mises à jour, chatbot. Vous roulez, on surveille.",
    items: [
      "Score mis à jour en temps réel",
      "Alertes proactives avant expiration",
      "Chatbot compliance disponible 24h/24",
    ],
    note: "Compliance as a Service — pas un one-shot.",
    accent: "#00A896",
    icon: <RefreshCw className="h-6 w-6" style={{ color: "#00A896" }} strokeWidth={2.5} />,
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
      style={{ background: "linear-gradient(180deg, #081B32 0%, #04111F 100%)" }}
      ref={ref}
    >
      {/* Subtle mesh */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,168,150,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.9s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <FeatureCarousel
            title={
              <>
                De zéro à{" "}
                <span style={{ color: "#00A896" }}>conforme</span>
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
            opacity: visible ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.4s",
          }}
        >
          <button
            onClick={onCta}
            data-cta
            className="btn-press inline-flex items-center gap-2 rounded-2xl bg-[#00A896] px-8 py-4 text-[15px] font-bold text-white"
            style={{ boxShadow: "0 8px 32px -4px rgba(0,168,150,0.4)" }}
          >
            Commencer l'étape 01 — c'est gratuit →
          </button>
          <p className="text-[13px] text-white/30">Transporteurs uniquement · Pré-qualification immédiate</p>
        </div>
      </div>
    </section>
  )
}
