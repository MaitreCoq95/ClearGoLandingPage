"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { DetailDrawer } from "./detail-drawer"
import {
  ScoringLogicContent,
  DocumentManagementContent,
  DrieatReadinessContent,
  WorkflowCapaContent,
  VeilleReglementaireContent,
  Iso9001DetailContent,
  Iso45001DetailContent,
  Iso14001DetailContent,
} from "./drawer-contents"

type ModuleKey = "reglo" | "9001" | "45001" | "14001" | "gdp" | "adr" | "rse" | "veille"
type DrawerKey = "scoring" | "documents" | "drieat-readiness" | "capa" | "veille-ia" | "iso9001" | "iso45001" | "iso14001" | null

interface KpiRow {
  name: string
  value: string
  status: "good" | "warn" | "bad"
  bar?: number
}

interface FeatureItem {
  text: string
  drawer?: DrawerKey
}

interface ModuleData {
  label: string
  title: string
  titleColor: string
  subtitle: string
  description: string
  checkColor: string
  checkBg: string
  features: FeatureItem[]
  visHeader: string
  kpis: KpiRow[]
}

const modules: Record<ModuleKey, ModuleData> = {
  reglo: {
    label: "REGLO",
    title: "Conformite DRIEAT",
    titleColor: "text-[var(--navy)]",
    subtitle: "Couche obligatoire -- Score REGLO 0-500 pts",
    description: "Le fondement de toute conformite transport. ClearGo couvre l'integralite des 87 points de controle d'une inspection DRIEAT et genere automatiquement votre dossier complet en 1 clic.",
    checkColor: "text-[var(--green)]",
    checkBg: "bg-[var(--green-light)]",
    features: [
      { text: "Conducteurs : FIMO/FCO, permis, carte tachygraphe, visite medicale, ADR", drawer: "scoring" },
      { text: "Vehicules : CT, assurances, calibration tachygraphes, certifications ADR/GDP", drawer: "scoring" },
      { text: "Fichiers tachygraphes : archivage classe par conducteur et periode", drawer: "documents" },
      { text: "Sous-traitants : dossiers vigilance, registre operations, Cerfa 14605 auto-calcule", drawer: "documents" },
      { text: "Dossier inspection ZIP auto-genere (87 points, 5 blocs) en 1 clic", drawer: "drieat-readiness" },
    ],
    visHeader: "Readiness Inspection",
    kpis: [
      { name: "Licence transport (interieur + communautaire)", value: "Valide", status: "good" },
      { name: "Gestionnaire de transport designe", value: "OK", status: "good" },
      { name: "Conducteurs conformes (FIMO/FCO)", value: "8 / 8", status: "good" },
      { name: "Vehicules CT a jour", value: "11 / 12", status: "warn" },
      { name: "Fichiers tachygraphes", value: "Uploades", status: "good" },
      { name: "Dossiers vigilance sous-traitants", value: "4 / 4", status: "good" },
    ],
  },
  "9001": {
    label: "ISO 9001",
    title: "ISO 9001:2015",
    titleColor: "text-[var(--navy-light)]",
    subtitle: "Management de la Qualite -- 150 pts Excellence",
    description: "Demande dans 60% des AO transport avec industriels et grande distribution. ClearGo construit votre systeme qualite aligne sur les 10 chapitres ISO 9001 appliques au transport.",
    checkColor: "text-[var(--navy-light)]",
    checkBg: "bg-[var(--navy-light)]/10",
    features: [
      { text: "Politique qualite signee + cartographie des processus transport", drawer: "iso9001" },
      { text: "KPIs : OTD, taux reclamations, taux conformite doc, satisfaction client", drawer: "iso9001" },
      { text: "Revue de direction assistee : ordre du jour auto, donnees pre-chargees", drawer: "iso9001" },
      { text: "Audits internes + gestion NC/CAPA avec analyse cause racine guidee", drawer: "capa" },
      { text: "Satisfaction clients : questionnaire integre + analyse de tendance", drawer: "iso9001" },
    ],
    visHeader: "KPIs Qualite Transport",
    kpis: [
      { name: "OTD -- Livraison a l'heure", value: "97.3%", status: "good", bar: 97 },
      { name: "Taux reclamations clients", value: "0.3%", status: "good", bar: 97 },
      { name: "Satisfaction client (NPS)", value: "4.6 / 5", status: "good", bar: 92 },
      { name: "Conformite documentaire", value: "88%", status: "warn", bar: 88 },
      { name: "Audits internes realises", value: "100%", status: "good", bar: 100 },
      { name: "NC closes dans les delais", value: "94%", status: "good", bar: 94 },
    ],
  },
  "45001": {
    label: "ISO 45001",
    title: "ISO 45001:2018",
    titleColor: "text-red-600",
    subtitle: "Sante et Securite au Travail -- 100 pts Excellence",
    description: "Le transport routier est un secteur a risque AT eleve. ISO 45001 est de plus en plus exige par les chargeurs premium. ClearGo gere l'integralite de votre systeme SST.",
    checkColor: "text-red-600",
    checkBg: "bg-red-500/8",
    features: [
      { text: "DUER : evaluation guidee par unite de travail (conducteur PL, agent de quai...)", drawer: "iso45001" },
      { text: "Accidents/presqu'accidents : declaration mobile, workflow investigation, CAPA", drawer: "capa" },
      { text: "Indicateurs SST auto : taux frequence, taux gravite, AT/MP", drawer: "iso45001" },
      { text: "Visites medicales tracees avec alertes de renouvellement par conducteur", drawer: "iso45001" },
      { text: "EPI traces par salarie, formations securite dans le TMS", drawer: "iso45001" },
    ],
    visHeader: "Tableau de Bord SST",
    kpis: [
      { name: "Accidents du travail avec arret", value: "0", status: "good" },
      { name: "Presqu'accidents declares", value: "7 (culture SST)", status: "good" },
      { name: "Taux de frequence AT", value: "0", status: "good" },
      { name: "Formation securite realisee", value: "85%", status: "warn" },
      { name: "DUER mis a jour", value: "Nov 2025", status: "good" },
      { name: "Visites medicales a jour", value: "8 / 8", status: "good" },
    ],
  },
  "14001": {
    label: "ISO 14001",
    title: "ISO 14001:2015",
    titleColor: "text-[var(--green)]",
    subtitle: "Management Environnemental -- 100 pts Excellence",
    description: "ZFE, taxe carbone, bilan GES -- la pression environnementale est croissante. ISO 14001 transforme cette contrainte en avantage demontrable aupres des grands comptes.",
    checkColor: "text-[var(--green)]",
    checkBg: "bg-[var(--green-light)]",
    features: [
      { text: "Bilan carbone automatique par vehicule (methode ADEME 2024)", drawer: "iso14001" },
      { text: "Suivi Crit'Air de la flotte + alertes ZFE par zone geographique", drawer: "iso14001" },
      { text: "Plan de reduction CO2 avec objectifs chiffres et suivi mensuel", drawer: "iso14001" },
      { text: "Gestion dechets reglementes : huiles, pneus, batteries -- tracabilite filieres", drawer: "iso14001" },
      { text: "Rapport carbone partageable avec donneurs d'ordre (PDF + lien public)", drawer: "documents" },
    ],
    visHeader: "Bilan Carbone Flotte -- 2025",
    kpis: [
      { name: "CO2 total YTD", value: "127.4 t", status: "warn" },
      { name: "Objectif annuel", value: "140 t", status: "good" },
      { name: "CO2 moyen / 100km", value: "96.7 kg", status: "good" },
      { name: "Vehicules Crit'Air <= 2", value: "3 / 12", status: "good" },
      { name: "Plan renouvellement GNV", value: "2 veh. 2026", status: "good" },
    ],
  },
  gdp: {
    label: "GDP",
    title: "GDP -- Pharmaceutique",
    titleColor: "text-[var(--navy-light)]",
    subtitle: "Good Distribution Practice -- 50 pts Excellence",
    description: "Pour les transporteurs pharmaceutiques et de la sante : GDP est une exigence contractuelle non negociable. ClearGo gere la qualification de vos vehicules et la tracabilite de la chaine du froid.",
    checkColor: "text-[var(--navy-light)]",
    checkBg: "bg-[var(--navy-light)]/10",
    features: [
      { text: "Qualification vehicules GDP : IQ/OQ/PQ documentee, validation annuelle" },
      { text: "Tracabilite temperatures : integration enregistreurs (Sensitech, Elpro, Corintech)" },
      { text: "Workflow deviations thermiques : alerte > analyse > decision > CAPA > rapport", drawer: "capa" },
      { text: "Revue qualite annuelle GDP generee automatiquement", drawer: "documents" },
    ],
    visHeader: "Suivi GDP -- Semaine en cours",
    kpis: [
      { name: "Vehicules qualifies GDP", value: "3 / 3", status: "good" },
      { name: "Deviations thermiques en cours", value: "0", status: "good" },
      { name: "Deviations traitees (30j)", value: "1 / 1", status: "good" },
      { name: "Plage 2-8C maintenue", value: "99.8%", status: "good" },
      { name: "Revue GDP annuelle", value: "Jan 2025", status: "good" },
    ],
  },
  adr: {
    label: "ADR",
    title: "Transport de Matieres Dangereuses",
    titleColor: "text-orange-600",
    subtitle: "Module ADR -- Score EXCELLENCE",
    description: "ClearGo structure votre conformite ADR sans remplacer votre conseiller a la securite. Nous vous donnons les bases documentaires et le suivi necessaires pour etre pret a tout moment.",
    checkColor: "text-orange-600",
    checkBg: "bg-orange-500/8",
    features: [
      { text: "Suivi des habilitations ADR conducteurs et dates d'expiration" },
      { text: "Gestion documentaire : certificats, declarations, fiches de securite", drawer: "documents" },
      { text: "Alertes automatiques avant expiration des qualifications" },
      { text: "Checklist pre-transport conforme a la reglementation en vigueur" },
    ],
    visHeader: "Suivi ADR -- Etat actuel",
    kpis: [
      { name: "Habilitations ADR conducteurs", value: "6 / 8", status: "warn" },
      { name: "Certificat conseiller securite", value: "Valide", status: "good" },
      { name: "Fiches matieres dangereuses", value: "Uploadees", status: "good" },
      { name: "Prochaine expiration", value: "47 jours", status: "warn" },
    ],
  },
  rse: {
    label: "RSE",
    title: "RSE -- Developpement Durable",
    titleColor: "text-[var(--green)]",
    subtitle: "Rapport RSE automatique -- 40 pts Excellence",
    description: "La RSE est devenue contractuelle dans les AO des grands comptes et collectivites. ClearGo genere automatiquement votre rapport RSE a partir des donnees deja dans la plateforme.",
    checkColor: "text-[var(--green)]",
    checkBg: "bg-[var(--green-light)]",
    features: [
      { text: "Rapport RSE annuel (3 piliers E-S-G) genere automatiquement", drawer: "documents" },
      { text: "Pilier Environnement : CO2, energie, dechets (source ISO 14001)", drawer: "iso14001" },
      { text: "Pilier Social : formation, AT, parite (source TMS + ISO 45001)", drawer: "iso45001" },
      { text: "Fiche RSE partageable (PDF + lien) pour dossiers AO" },
    ],
    visHeader: "Score RSE -- Rapport 2025",
    kpis: [
      { name: "CO2 reduit vs N-1", value: "-8.2%", status: "good" },
      { name: "Formation / salarie", value: "24h / an", status: "good" },
      { name: "Accidents du travail", value: "0", status: "good" },
      { name: "Certifications actives", value: "ISO 9001 + 45001", status: "good" },
    ],
  },
  veille: {
    label: "Veille IA",
    title: "Veille Reglementaire IA",
    titleColor: "text-amber-600",
    subtitle: "Intelligence Reglementaire -- Inclus tous plans",
    description: "Aucune PME de transport ne peut se payer un juriste. ClearGo surveille en continu toutes les sources officielles et vous alerte des changements qui impactent votre activite.",
    checkColor: "text-amber-600",
    checkBg: "bg-amber-500/8",
    features: [
      { text: "Sources : Legifrance, JOUE, DRIEAT, DREAL, ANTS, ADEME, ISO.org", drawer: "veille-ia" },
      { text: "Analyse IA : resume en langage simple, impact identifie, date d'entree en vigueur", drawer: "veille-ia" },
      { text: "Alertes personnalisees selon votre profil (marchandises, voyageurs, ADR...)", drawer: "veille-ia" },
      { text: "Creation de tache ou mise a jour document en 1 clic depuis l'alerte", drawer: "veille-ia" },
    ],
    visHeader: "Dernieres Alertes Reglementaires",
    kpis: [
      { name: "Revision ADR 2025 -- Ch. 1.3", value: "CRITIQUE", status: "bad" },
      { name: "ZFE Lyon -- Calendrier 2027", value: "IMPORTANT", status: "warn" },
      { name: "R(UE) 2025 -- Temps de conduite", value: "INFO", status: "good" },
    ],
  },
}

const drawerData: Record<Exclude<DrawerKey, null>, { title: string; subtitle: string; color: string; Content: React.FC }> = {
  scoring: { title: "ClearGo Compliance Score", subtitle: "Algorithme de scoring detaille -- 0 a 1000 points", color: "var(--navy)", Content: ScoringLogicContent },
  documents: { title: "Gestion Documentaire", subtitle: "DMS certifie ISO + dossier inspection DRIEAT", color: "var(--navy-light)", Content: DocumentManagementContent },
  "drieat-readiness": { title: "Preparation Inspection DRIEAT", subtitle: "Workflow J-30 a J+7 -- 87 points de controle", color: "var(--green)", Content: DrieatReadinessContent },
  capa: { title: "Workflow NC / CAPA", subtitle: "Gestion non-conformites et actions correctives", color: "#DC2626", Content: WorkflowCapaContent },
  "veille-ia": { title: "Veille Reglementaire IA", subtitle: "Pipeline automatise de surveillance reglementaire", color: "#D97706", Content: VeilleReglementaireContent },
  iso9001: { title: "ISO 9001:2015 -- Detail", subtitle: "Systeme de Management de la Qualite pour le transport", color: "var(--navy-light)", Content: Iso9001DetailContent },
  iso45001: { title: "ISO 45001:2018 -- Detail", subtitle: "Sante et Securite au Travail dans le transport", color: "#DC2626", Content: Iso45001DetailContent },
  iso14001: { title: "ISO 14001:2015 -- Detail", subtitle: "Management Environnemental et bilan carbone", color: "var(--green)", Content: Iso14001DetailContent },
}

const tabKeys: ModuleKey[] = ["reglo", "9001", "45001", "14001", "gdp", "adr", "rse", "veille"]

export function Modules({ autoCycle = false }: { autoCycle?: boolean }) {
  const [active, setActive] = useState<ModuleKey>("reglo")
  const [openDrawer, setOpenDrawer] = useState<DrawerKey>(null)
  const mod = modules[active]

  useEffect(() => {
    if (!autoCycle) return
    const interval = setInterval(() => {
      setActive((prev) => {
        const idx = tabKeys.indexOf(prev)
        return tabKeys[(idx + 1) % tabKeys.length]
      })
    }, 8000)
    return () => clearInterval(interval)
  }, [autoCycle])

  const statusColor = {
    good: "text-[var(--green)]",
    warn: "text-amber-600",
    bad: "text-red-600",
  }

  return (
    <>
      <section id="modules" className="bg-[var(--background)] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-[var(--green)]">
            <span className="h-0.5 w-4 rounded bg-[var(--green)]" />
            {"// MODULES QSE"}
          </div>
          <h2 className="mt-3 font-sans text-4xl font-black leading-none tracking-tight text-[var(--navy-dark)] lg:text-5xl">
            Choisissez votre niveau d{"'"}excellence
          </h2>
          <p className="mt-3 max-w-2xl font-serif text-[15px] leading-relaxed text-[var(--text-secondary)]">
            Cliquez sur chaque fonctionnalite pour decouvrir les details : logique de scoring, generation de documents, workflows automatises.
          </p>

          {/* Legal disclaimer */}
          <div className="mt-6 flex items-start gap-3 rounded-lg border-l-[3px] border-[var(--green)] bg-[#f5f5f5] px-4 py-3 max-w-3xl">
            <span className="mt-0.5 flex-shrink-0 text-sm" aria-hidden="true">{"i"}</span>
            <p className="font-serif text-[13px] leading-relaxed text-[#444]">
              ClearGo n{"'"}est pas un organisme certificateur et ne delivre aucune certification. Nos modules vous apportent les bases structurelles, les outils et la documentation necessaires pour engager votre entreprise dans la bonne direction vis-a-vis de ces referentiels. La certification reste delivree par un organisme accredite de votre choix.
            </p>
          </div>

          {/* Tabs */}
          <div className="mt-12 mb-10 flex gap-1 overflow-x-auto rounded-[14px] border border-border bg-[var(--off-white)] p-1.5">
            {tabKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`flex-1 min-w-[80px] whitespace-nowrap rounded-xl px-3.5 py-2.5 font-sans text-[13px] font-bold transition-all ${
                  active === key
                    ? "bg-[var(--background)] text-[var(--navy)] shadow-sm"
                    : "text-[var(--text-tertiary)] hover:text-[var(--navy)]"
                }`}
              >
                {modules[key].label}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <h3 className={`font-sans text-3xl font-black tracking-tight ${mod.titleColor}`}>{mod.title}</h3>
              <div className="mt-1.5 font-sans text-[13px] font-semibold text-[var(--text-tertiary)]">{mod.subtitle}</div>
              <p className="mt-4 font-serif text-[15px] leading-relaxed text-[var(--text-secondary)]">{mod.description}</p>
              <div className="mt-5 flex flex-col gap-2.5">
                {mod.features.map((feat, i) => (
                  <button
                    key={i}
                    onClick={() => feat.drawer && setOpenDrawer(feat.drawer)}
                    className={`group flex items-start gap-2.5 rounded-xl p-2.5 text-left text-sm leading-relaxed transition-all ${
                      feat.drawer
                        ? "text-[var(--foreground)] hover:bg-[var(--off-white)] cursor-pointer"
                        : "text-[var(--foreground)] cursor-default"
                    }`}
                  >
                    <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${mod.checkBg} ${mod.checkColor}`}>
                      {"\u2713"}
                    </div>
                    <span className="flex-1">{feat.text}</span>
                    {feat.drawer && (
                      <ExternalLink className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[var(--text-tertiary)] opacity-0 transition-opacity group-hover:opacity-100" />
                    )}
                  </button>
                ))}
              </div>

              {/* Quick links to scoring / docs */}
              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  onClick={() => setOpenDrawer("scoring")}
                  className="rounded-lg border border-[var(--navy)]/15 bg-[var(--navy)]/5 px-3 py-1.5 font-sans text-[11px] font-bold text-[var(--navy)] transition-colors hover:bg-[var(--navy)]/10"
                >
                  Logique de Scoring
                </button>
                <button
                  onClick={() => setOpenDrawer("documents")}
                  className="rounded-lg border border-[var(--navy)]/15 bg-[var(--navy)]/5 px-3 py-1.5 font-sans text-[11px] font-bold text-[var(--navy)] transition-colors hover:bg-[var(--navy)]/10"
                >
                  Gestion Documentaire
                </button>
                <button
                  onClick={() => setOpenDrawer("drieat-readiness")}
                  className="rounded-lg border border-[var(--green)]/15 bg-[var(--green)]/5 px-3 py-1.5 font-sans text-[11px] font-bold text-[var(--green)] transition-colors hover:bg-[var(--green)]/10"
                >
                  Inspection DRIEAT
                </button>
                <button
                  onClick={() => setOpenDrawer("capa")}
                  className="rounded-lg border border-red-500/15 bg-red-500/5 px-3 py-1.5 font-sans text-[11px] font-bold text-red-600 transition-colors hover:bg-red-500/10"
                >
                  Workflow NC/CAPA
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-[var(--off-white)] p-7 shadow-sm">
              <div className="mb-4 flex items-center justify-between font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">
                <span>{mod.visHeader}</span>
                {active === "reglo" && <span className="font-bold text-[var(--green)]">94%</span>}
              </div>
              <div className="flex flex-col divide-y divide-border">
                {mod.kpis.map((kpi, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5">
                    <span className="flex-1 font-serif text-[13px] text-[var(--text-secondary)]">{kpi.name}</span>
                    <span className={`font-sans text-sm font-bold ${statusColor[kpi.status]}`}>{kpi.value}</span>
                    {kpi.bar !== undefined && (
                      <div className="w-[72px] h-1 overflow-hidden rounded-full bg-border">
                        <div
                          className={`h-full rounded-full ${kpi.status === "good" ? "bg-[var(--green)]" : kpi.status === "warn" ? "bg-amber-500" : "bg-red-500"}`}
                          style={{ width: `${kpi.bar}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5 overflow-hidden rounded-xl">
                <Image
                  src="/images/compliance-check.jpg"
                  alt="Verification de conformite transport"
                  width={500}
                  height={200}
                  className="w-full h-32 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail drawers */}
      {openDrawer && (
        <DetailDrawer
          open={!!openDrawer}
          onClose={() => setOpenDrawer(null)}
          title={drawerData[openDrawer].title}
          subtitle={drawerData[openDrawer].subtitle}
          accentColor={drawerData[openDrawer].color}
        >
          {(() => {
            const C = drawerData[openDrawer].Content
            return <C />
          })()}
        </DetailDrawer>
      )}
    </>
  )
}
