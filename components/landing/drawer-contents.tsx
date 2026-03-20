"use client"

import { DrawerSection, DrawerTable, DrawerAlgo, DrawerCodeBlock } from "./detail-drawer"

/* =========================================
   SCORING LOGIC DRAWER
   ========================================= */
export function ScoringLogicContent() {
  return (
    <>
      <DrawerSection title="Structure du Score 0 - 1000">
        <p className="mb-4 font-serif text-[14px] leading-relaxed text-[var(--text-secondary)]">
          Le ClearGo Compliance Score est un score unique entre 0 et 1000 points qui traduit en signal commercial exploitable la performance reglementaire et manageriale d{"'"}une entreprise de transport. C{"'"}est le Nutri-Score de la conformite transport.
        </p>
        <DrawerTable
          headers={["Composant", "Points max", "Ce qu'il mesure", "Qui le regarde"]}
          rows={[
            ["Score REGLO", "500 pts", "Conformite DRIEAT obligatoire : conducteurs, vehicules, documents, tachygraphes, sous-traitants", "Inspecteur DRIEAT, assureur, juriste"],
            ["Score EXCELLENCE", "500 pts", "Maturite QSE : ISO actifs, processus qualite, SST, bilan carbone, RSE", "Donneur d'ordre, client grand compte, acheteur logistique"],
          ]}
        />
      </DrawerSection>

      <DrawerSection title="Niveaux de Certification">
        <DrawerTable
          headers={["Niveau", "Score", "Signification"]}
          rows={[
            ["BRONZE", "0 - 400", "Conformite de base. Survie reglementaire."],
            ["ARGENT", "401 - 650", "Conformite maitrisee + debut structuration QSE."],
            ["OR", "651 - 850", "QSE actif, audit-ready, donneurs d'ordre premium."],
            ["PLATINE", "851 - 1000", "Excellence totale. Score differenciateur marche."],
          ]}
        />
      </DrawerSection>

      <DrawerSection title="Algorithme Score REGLO (0-500)">
        <DrawerAlgo
          lines={[
            { label: "Licences & Agrements", detail: "Licence valide, capacite financiere, GT designe, Kbis < 3 mois", points: "75 pts" },
            { label: "Conformite Conducteurs", detail: "Permis valides, FIMO/FCO a jour, cartes tachygraphes, visites medicales, ADR", points: "125 pts" },
            { label: "Conformite Vehicules", detail: "CT en cours, assurances valides, calibration tachygraphes, fichiers uploades", points: "125 pts" },
            { label: "Documentation Legale", detail: "Documents obligatoires approuves et a jour (CMR, registres, LIC)", points: "75 pts" },
            { label: "Gestion Sous-traitants", detail: "Dossiers de vigilance, registre affretes, Cerfa 14605", points: "50 pts" },
            { label: "NC/Incidents Ouverts", detail: "Penalite basee sur le nombre et l'anciennete des NC non closes", points: "50 pts" },
          ]}
        />
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="font-sans text-[12px] font-bold text-red-700">Planchers critiques</div>
          <ul className="mt-2 flex flex-col gap-1 font-serif text-[12px] text-red-600">
            <li>{"Vehicule non assure => Score plafonne a 200/500"}</li>
            <li>{"Licence expiree => Score plafonne a 100/500"}</li>
            <li>{"Conducteur sans FIMO => Score plafonne a 300/500"}</li>
          </ul>
        </div>
      </DrawerSection>

      <DrawerSection title="Algorithme Score EXCELLENCE (0-500)">
        <DrawerAlgo
          lines={[
            { label: "ISO 9001 - Qualite", detail: "Politique qualite, processus, KPIs, revue direction, audits internes, satisfaction clients", points: "150 pts" },
            { label: "ISO 45001 - SST", detail: "DUER, plan preventif, indicateurs AT, culture presqu'accidents, visites medicales", points: "100 pts" },
            { label: "ISO 14001 - Environnement", detail: "Aspects environnementaux, bilan carbone, objectifs CO2, Crit'Air, dechets", points: "100 pts" },
            { label: "GDP - Pharmaceutique", detail: "Qualification vehicules, tracabilite temperatures, revue GDP annuelle", points: "50 pts" },
            { label: "HACCP - Alimentaire", detail: "Plan HACCP transport, CCP identifies, enregistrements", points: "30 pts" },
            { label: "ISO 20121 - Evenementiel", detail: "Politique durabilite, indicateurs CO2 par evenement", points: "30 pts" },
            { label: "RSE - Dev. Durable", detail: "Rapport RSE annuel, indicateurs GRI, engagement bilan carbone", points: "40 pts" },
          ]}
        />
      </DrawerSection>

      <DrawerSection title="Recalcul automatique">
        <p className="font-serif text-[13px] leading-relaxed text-[var(--text-secondary)]">
          Le score est recalcule automatiquement toutes les heures via un Edge Function Supabase. Chaque changement (upload de document, expiration, NC close) declenche un recalcul en temps reel via Redis pub/sub. L{"'"}historique du score est conserve sur 12 mois pour la page publique.
        </p>
      </DrawerSection>
    </>
  )
}

/* =========================================
   DOCUMENT MANAGEMENT DRAWER
   ========================================= */
export function DocumentManagementContent() {
  return (
    <>
      <DrawerSection title="Gestion Documentaire (DMS)">
        <p className="mb-4 font-serif text-[14px] leading-relaxed text-[var(--text-secondary)]">
          ClearGo integre un DMS complet conforme aux exigences ISO (maitrise documentaire) et DRIEAT (archivage tracable). Chaque document est versionne, approuve et distribue avec un audit trail complet.
        </p>
        <DrawerTable
          headers={["Fonctionnalite", "Detail"]}
          rows={[
            ["Versioning", "Historique complet immuable avec hash SHA-256 par version"],
            ["Workflow d'approbation", "Soumission > Revue > Approbation / Rejet > Distribution"],
            ["Categories", "Procedures (PRO), Instructions (INS), Formulaires (FOR), Enregistrements (ENR), Manuels (MAN)"],
            ["Numerotation", "Automatique : PRO-QUA-001, INS-SST-003..."],
            ["Revue periodique", "Alerte automatique selon le cycle de revue defini (6, 12, 24 mois)"],
            ["Audit trail", "Horodatage, IP, user-agent, signature hash non-repudiable"],
            ["Distribution", "Liste de destinataires avec accuse de reception electronique"],
          ]}
        />
      </DrawerSection>

      <DrawerSection title="Documents Transport Operationnels">
        <DrawerTable
          headers={["Document", "Archivage", "Recherche par periode"]}
          rows={[
            ["CMR / Lettres de voiture", "Upload + OCR", "Filtrable J1 a J2"],
            ["Bordereaux transport dechets", "Upload + classification", "Oui"],
            ["Registre operations commissionnees", "Base de donnees native", "Export Excel/PDF"],
            ["Registre delivrance horaires (LIC)", "Saisie + archivage", "Oui"],
            ["Resume types d'activite", "Genere automatiquement", "Rapport sur periode"],
          ]}
        />
      </DrawerSection>

      <DrawerSection title="Documents Administratifs Obligatoires">
        <DrawerAlgo
          lines={[
            { label: "Extrait Kbis < 3 mois", detail: "Alerte J-90 / J-30 / J-7. Verification Papiers.fr API (cible)." },
            { label: "Licence transport", detail: "Alerte 6 mois avant expiration. Registre DRIEAT (cible)." },
            { label: "3 dernieres liasses fiscales", detail: "Alerte annuelle. Upload manuel + DMS." },
            { label: "Capacite financiere Cerfa 11416", detail: "Verification annuelle. Calcul assiste dans ClearGo." },
            { label: "Autorisation prefectorale dechets", detail: "Alerte 3 mois avant expiration. Upload + suivi DMS." },
            { label: "Delegation responsabilite penale", detail: "Verification a chaque changement. Document signe dans DMS." },
          ]}
        />
      </DrawerSection>

      <DrawerSection title="Generation de Dossier Inspection">
        <p className="mb-3 font-serif text-[13px] leading-relaxed text-[var(--text-secondary)]">
          En 1 clic, ClearGo genere un dossier ZIP complet organise en 5 blocs couvrant les 87 points de controle DRIEAT :
        </p>
        <DrawerCodeBlock
          code={`DOSSIER INSPECTION ZIP
├── Bloc A - Licences & Agrements
│   ├── Licence transport (interieur + communautaire)
│   ├── Kbis < 3 mois
│   ├── Capacite financiere Cerfa 11416
│   └── Designation Gestionnaire de Transport
├── Bloc B - Fiches Vehicules
│   ├── Carte grise + CT + Assurance par vehicule
│   ├── Calibration tachygraphes
│   └── Certificats ADR (si applicable)
├── Bloc C - Attestations Conducteurs
│   ├── FIMO/FCO + Permis + Medical par conducteur
│   ├── Cartes tachygraphes
│   └── Attestations pays tiers (si applicable)
├── Bloc D - Documentation Operationnelle
│   ├── CMR / Lettres de voiture (periode)
│   ├── Registre operations commissionnees
│   └── Registre horaires LIC
└── Bloc E - Sous-traitants
    ├── Registre affretes avec SIREN
    ├── Dossiers vigilance (URSSAF, RC Pro, Kbis)
    └── Cerfa 14605 pre-rempli`}
        />
      </DrawerSection>
    </>
  )
}

/* =========================================
   DRIEAT READINESS DRAWER
   ========================================= */
export function DrieatReadinessContent() {
  return (
    <>
      <DrawerSection title="Workflow Preparation Inspection">
        <p className="mb-4 font-serif text-[14px] leading-relaxed text-[var(--text-secondary)]">
          ClearGo automatise entierement la preparation d{"'"}une inspection DRIEAT avec un workflow en 6 etapes, de J-30 a J+7.
        </p>
        <DrawerAlgo
          lines={[
            { label: "J-30 : Alerte + Diagnostic", detail: "Lancement readiness check complet (87 points). Rapport des gaps critiques avec priorite et delai. Plan d'action automatique cree." },
            { label: "J-15 : Verification Documentaire", detail: "Audit interne documentaire lance. Verification conformite chaque document obligatoire. Mise a jour documents en retard." },
            { label: "J-7 : Verification Flotte + Conducteurs", detail: "Check CT, assurances, tachygraphes tous vehicules. Verification uploads fichiers. Check FIMO/FCO/ADR/medical." },
            { label: "J-3 : Constitution Dossier", detail: "Generation dossier ZIP telecharger. Score readiness final affiche. Briefing equipe genere." },
            { label: "J0 : Inspection Active", detail: "Mode 'Inspection Active' dans l'app. QR codes par document/vehicule (scan instantane). Acces horodates et traces." },
            { label: "J+7 : Post-Inspection", detail: "Saisie des constats dans ClearGo. Creation NC automatique pour chaque point souleve. Plan CAPA lance." },
          ]}
        />
      </DrawerSection>

      <DrawerSection title="Moteur de Readiness (87 points)">
        <DrawerTable
          headers={["Bloc", "Points", "Verification"]}
          rows={[
            ["A - Licences & agrements", "12 points", "Licence, GT, Kbis, capacite financiere, autorisation dechets"],
            ["B - Conducteurs", "18 points", "Permis, FIMO/FCO, carte tachy, medical, pays tiers"],
            ["C - Vehicules & tachygraphes", "22 points", "CT, assurance, calibration tachygraphes, fichiers conducteurs/vehicules, ADR"],
            ["D - Documentation operationnelle", "6 points", "CMR, registre operations, registre horaires"],
            ["E - Sous-traitants", "8 points", "Dossiers vigilance, Cerfa 14605"],
            ["F - ADR (si applicable)", "Variable", "Conseiller securite, rapports annuels"],
          ]}
        />
        <div className="mt-4 rounded-xl bg-[var(--green-light)] p-4">
          <div className="font-sans text-[12px] font-bold text-[var(--green)]">Seuil de readiness</div>
          <p className="mt-1 font-serif text-[12px] text-[var(--text-secondary)]">
            {"Readiness >= 80% ET 0 gaps critiques => Inspection-ready. Dossier generatable a partir de 60%."}
          </p>
        </div>
      </DrawerSection>
    </>
  )
}

/* =========================================
   WORKFLOW CAPA DRAWER
   ========================================= */
export function WorkflowCapaContent() {
  return (
    <>
      <DrawerSection title="Workflow NC / CAPA">
        <p className="mb-4 font-serif text-[14px] leading-relaxed text-[var(--text-secondary)]">
          Le cycle de vie complet des non-conformites et actions correctives/preventives, de la detection a la verification d{"'"}efficacite.
        </p>
        <DrawerCodeBlock
          code={`[DETECTION]
  Sources: audit / inspection / incident / autodetect / salarie
      |
[ENREGISTREMENT]
  Ref auto NC-AAAA-NNN, severite, owner, notification
      |
[ANALYSE CAUSE RACINE]
  SLA: 24h (critique) / 3j (majeure) / 5j (mineure)
  Methodes: 5 Pourquoi / Ishikawa / FMEA
      |
[PLAN CAPA]
  Actions correctives + preventives + responsables + delais
      |
[VALIDATION]
  Approbation Compliance Manager
      |
[EXECUTION]
  SLA: 30j / 60j / 90j selon severite
  Rappels auto J-7, J-3, J0 (n8n)
  Escalade si depassement => N+1 + impact score
      |
[VERIFICATION EFFICACITE]
  J+30 apres cloture
  Si EFFICACE => cloture definitive + score recalcule
  Si INEFFICACE => reouverture + escalade + risque eleve`}
        />
      </DrawerSection>

      <DrawerSection title="Outils d'Analyse">
        <DrawerAlgo
          lines={[
            { label: "5 Pourquoi", detail: "Methode iterative pour remonter a la cause racine. Chaque 'Pourquoi' est enregistre avec preuves." },
            { label: "Ishikawa (5M)", detail: "Diagramme causes-effets : Main d'oeuvre, Materiel, Methode, Milieu, Matiere. Adapte au transport." },
            { label: "FMEA", detail: "Analyse des modes de defaillance. Calcul RPN (Risk Priority Number) = Severite x Occurrence x Detection." },
          ]}
        />
      </DrawerSection>
    </>
  )
}

/* =========================================
   VEILLE REGLEMENTAIRE DRAWER
   ========================================= */
export function VeilleReglementaireContent() {
  return (
    <>
      <DrawerSection title="Pipeline de Traitement IA">
        <DrawerCodeBlock
          code={`1. COLLECTE (quotidienne 06h00)
   ├── Scraping des sources officielles
   ├── Deduplication (hash du contenu)
   └── Stockage brut dans regulatory_watch

2. ANALYSE IA (Claude API)
   ├── Resume en langage simple (max 300 mots)
   ├── Classification : impact_level (critique/important/informatif)
   ├── Extraction : date d'entree en vigueur, delai de transition
   ├── Tagging : secteurs impactes (marchandises, voyageurs, ADR...)
   └── Modules ClearGo impactes (reglo, iso14001...)

3. PERSONNALISATION (par organisation)
   ├── Matching profil org vs tags du texte reglementaire
   ├── Si match : creation org_watch_alert
   ├── Generation recommandation d'action specifique
   └── Niveau d'urgence base sur date effective - today

4. NOTIFICATION
   ├── Email digest hebdomadaire (textes informatifs)
   ├── Notification in-app immediate (textes importants)
   └── SMS + email (textes critiques < 30j)

5. ACTION POSSIBLE
   ├── Bouton "Marquer comme traite"
   ├── Bouton "Creer une tache" => task_management
   └── Bouton "Mettre a jour un document" => DMS workflow`}
        />
      </DrawerSection>

      <DrawerSection title="Interface Veille dans ClearGo">
        <p className="mb-4 font-serif text-[14px] leading-relaxed text-[var(--text-secondary)]">
          L{"'"}onglet "Veille Reglementaire" dans ClearGo offre une experience complete de suivi reglementaire personnalise, directement integree a la plateforme.
        </p>
        <DrawerAlgo
          lines={[
            { label: "Fil d'actualite personnalise", detail: "Flux de textes reglementaires filtre automatiquement selon le profil d'activite de votre entreprise (marchandises generales, ADR, frigorifique, dechets, voyageurs...)." },
            { label: "Filtre par urgence", detail: "3 niveaux d'urgence visuels : CRITIQUE (rouge, delai < 30j), IMPORTANT (orange, action requise), INFORMATIF (bleu, pour information). Tri et filtre en 1 clic." },
            { label: "Filtre par module impacte", detail: "Filtrez par module ClearGo concerne : DRIEAT, ISO 9001, ISO 45001, ISO 14001, GDP, HACCP, RSE. Affichez uniquement les textes qui impactent vos referentiels actifs." },
            { label: "Compteur textes non lus", detail: "Badge numerique visible en permanence dans la navigation principale de ClearGo. Indique le nombre de textes non lus/non traites pour ne jamais manquer une echeance." },
            { label: "Historique complet", detail: "Tous les textes depuis le debut d'utilisation de ClearGo sont archives et consultables. Recherche full-text, filtres par date, par source, par module." },
            { label: "Base de connaissances", detail: "Chaque texte reglementaire est enrichi progressivement de fiches pratiques redigees par les experts ClearGo (Vyxo Consulting) : impact concret, actions a mener, delais, exemples." },
          ]}
        />
        <div className="mt-4 rounded-xl bg-[var(--off-white)] border border-border p-4">
          <div className="font-sans text-[12px] font-bold text-[var(--navy)]">Actions depuis un texte</div>
          <ul className="mt-2 flex flex-col gap-1.5 font-serif text-[12px] text-[var(--text-secondary)]">
            <li>{"\"Marquer comme traite\" => retire du compteur non lus"}</li>
            <li>{"\"Creer une tache\" => genere une action dans le module task_management"}</li>
            <li>{"\"Mettre a jour un document\" => lance le workflow DMS de revision"}</li>
          </ul>
        </div>
      </DrawerSection>

      <DrawerSection title="Sources Surveillees">
        <DrawerTable
          headers={["Source", "Contenu", "Frequence"]}
          rows={[
            ["Legifrance", "Decrets, arretes, lois transport", "Quotidienne"],
            ["JOUE", "Reglements europeens, directives", "Hebdomadaire"],
            ["DRIEAT IDF", "Circulaires, instructions controle", "Hebdomadaire"],
            ["DREAL (toutes regions)", "Publications regionales", "Hebdomadaire"],
            ["ANTS", "Evolutions tachygraphes, cartes", "Mensuelle"],
            ["ADEME", "Bilan carbone, reglementation GES", "Mensuelle"],
            ["ISO.org", "Revisions et amendements normes ISO", "Trimestrielle"],
            ["INRS", "Fiches SST, prevention", "Mensuelle"],
            ["Ministere Transports", "Reformes, plans gouvernementaux", "Hebdomadaire"],
          ]}
        />
      </DrawerSection>
    </>
  )
}

/* =========================================
   ISO 9001 DETAIL DRAWER
   ========================================= */
export function Iso9001DetailContent() {
  return (
    <>
      <DrawerSection title="Les 10 chapitres ISO 9001 dans ClearGo">
        <DrawerTable
          headers={["Ch.", "Titre", "Fonctionnalites ClearGo"]}
          rows={[
            ["4", "Contexte de l'organisme", "Assistant parties interessees, SWOT/PESTEL guide, domaine d'application"],
            ["5", "Leadership", "Politique qualite formalisee + signature, objectifs qualite mesurables (KPIs)"],
            ["6", "Planification", "Registre risques/opportunites, plan d'actions amelioration, gestion des changements"],
            ["7", "Support", "DMS complet, TMS complet, gestion infrastructures"],
            ["8", "Operations", "Maitrise processus transport, gestion sous-traitants, tracabilite operations"],
            ["9", "Evaluation des performances", "Satisfaction clients, tableau de bord KPI, audits internes, revue direction"],
            ["10", "Amelioration", "NC + CAPA, amelioration continue, apprentissage incidents"],
          ]}
        />
      </DrawerSection>

      <DrawerSection title="Cartographie des processus transport">
        <DrawerCodeBlock
          code={`PROCESSUS PILOTAGE
  P1 - Management strategique (direction)
  P2 - Gestion de la conformite (responsable conformite)
  P3 - Amelioration continue (QM)

PROCESSUS REALISATION
  R1 - Gestion des commandes et affretement
  R2 - Organisation et planification des tournees
  R3 - Execution du transport
  R4 - Gestion de la relation client
  R5 - Gestion des sous-traitants

PROCESSUS SUPPORT
  S1 - Gestion des ressources humaines et formation
  S2 - Gestion de la flotte et maintenance
  S3 - Achats et fournisseurs
  S4 - Systemes d'information
  S5 - Gestion financiere`}
        />
      </DrawerSection>

      <DrawerSection title="KPIs Qualite Transport (recommandes)">
        <DrawerAlgo
          lines={[
            { label: "OTD (On Time Delivery)", detail: "Taux de livraison a l'heure", points: "> 96%" },
            { label: "Taux reclamations clients", detail: "Reclamations / expeditions", points: "< 0.5%" },
            { label: "Taux casse / avaries", detail: "Marchandises endommagees", points: "< 0.1%" },
            { label: "Delai traitement reclamations", detail: "De la reception a la resolution", points: "< 5 jours" },
            { label: "Conformite documentaire", detail: "Documents approuves / total", points: "> 95%" },
            { label: "Audits internes realises", detail: "Realises dans les delais prevus", points: "100%" },
          ]}
        />
      </DrawerSection>
    </>
  )
}

/* =========================================
   ISO 45001 DETAIL DRAWER
   ========================================= */
export function Iso45001DetailContent() {
  return (
    <>
      <DrawerSection title="Fonctionnalites ISO 45001 Transport">
        <DrawerAlgo
          lines={[
            { label: "DUER", detail: "Evaluation guidee par unite de travail (conducteur PL, agent de quai, chef de parc). Matrice probabilite x gravite. Plan de maitrise avec dates et responsables." },
            { label: "Identification dangers", detail: "Conduite prolongee, fatigue, manutention, conditions meteo, stress, travail de nuit, arrimage charges." },
            { label: "Programme prevention SST", detail: "Formation conduite preventive, EPI traces par salarie, campagnes sensibilisation." },
            { label: "Gestion AT/MP", detail: "Workflow complet : declaration, investigation, CAPA et retour d'experience. Declarations legales CPAM/CARSAT assistees." },
            { label: "Indicateurs SST automatiques", detail: "Taux de frequence, taux de gravite, indice de frequence, nombre presqu'accidents declares." },
            { label: "Visites medicales", detail: "Suivi par conducteur avec alertes renouvellement, gestion restrictions et inaptitudes." },
          ]}
        />
      </DrawerSection>

      <DrawerSection title="KPIs ISO 45001 Transport">
        <DrawerTable
          headers={["Indicateur", "Calcul", "Cible"]}
          rows={[
            ["Taux de frequence (TF)", "(Nb AT avec arret x 10^6) / Heures travaillees", "< ref secteur INRS"],
            ["Taux de gravite (TG)", "(Nb jours d'arret x 1000) / Heures travaillees", "< ref secteur INRS"],
            ["Presqu'accidents declares", "Comptage mensuel", "> 5/trimestre (culture SST)"],
            ["% formation securite", "(Formes / Prevus) x 100", "> 95%"],
            ["DUER mis a jour", "Verification date MAJ", "100% annuel"],
          ]}
        />
      </DrawerSection>
    </>
  )
}

/* =========================================
   ISO 14001 DETAIL DRAWER
   ========================================= */
export function Iso14001DetailContent() {
  return (
    <>
      <DrawerSection title="Fonctionnalites ISO 14001 Transport">
        <DrawerAlgo
          lines={[
            { label: "Analyse environnementale", detail: "Identification aspects environnementaux significatifs (carburant, AdBlue, huiles, pneus, bruit, lavages). Evaluation impact, obligations legales." },
            { label: "Bilan carbone automatique", detail: "Calcul mensuel du CO2 par vehicule base sur consommation carburant (methode ADEME 2024). Agregation par flotte, benchmark vs objectif annuel." },
            { label: "Suivi Crit'Air", detail: "Classement automatique de la flotte, alertes ZFE par zone geographique, planning renouvellement motorisations propres." },
            { label: "Gestion dechets reglementes", detail: "Huiles usagees, pneus, batteries -- tracabilite des filieres d'elimination, BSDD." },
            { label: "Plan d'actions environnemental", detail: "Objectifs chiffres annuels (ex: -5% CO2/km d'ici 24 mois), responsables et dates." },
            { label: "Situations d'urgence", detail: "Procedures deversement accidentel, fiches reflexe, autorisation prefectorale dechets." },
          ]}
        />
      </DrawerSection>

      <DrawerSection title="Tableau de Bord Carbone (exemple)">
        <DrawerTable
          headers={["Vehicule", "km", "L carburant", "CO2 (t)", "g CO2/km", "vs objectif"]}
          rows={[
            ["AB-123-CD", "12 450", "4 800 L", "12.7 t", "1 020", "+2%"],
            ["EF-456-GH", "8 200", "2 950 L", "7.8 t", "951", "-5% OK"],
            ["IJ-789-KL", "15 800", "5 960 L", "15.7 t", "994", "-0.6% OK"],
          ]}
        />
      </DrawerSection>
    </>
  )
}
