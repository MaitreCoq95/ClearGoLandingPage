import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Politique de Confidentialite RGPD - ClearGo",
  description: "Politique de confidentialite et protection des donnees personnelles de ClearGo, conforme au RGPD.",
}

export default function PolitiqueConfidentialite() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-border bg-[var(--off-white)]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Link href="/" className="font-sans text-lg font-black text-[var(--navy)]">
            {"<-"} ClearGo
          </Link>
          <span className="font-sans text-xs font-semibold text-[var(--text-tertiary)]">
            Derniere mise a jour : 21 fevrier 2026
          </span>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-12 lg:py-20">
        <h1 className="font-sans text-3xl font-black text-[var(--navy)] lg:text-4xl">
          Politique de Confidentialite
        </h1>
        <p className="mt-2 font-sans text-base font-semibold text-[var(--green)]">
          Reglement General sur la Protection des Donnees (RGPD)
        </p>
        <p className="mt-4 font-serif text-base leading-relaxed text-[var(--text-secondary)]">
          VYXO Consulting, editeur de ClearGo, s{"'"}engage a proteger vos donnees personnelles conformement au Reglement (UE) 2016/679 (RGPD) et a la loi Informatique et Libertes modifiee.
          Cette politique decrit comment nous collectons, utilisons, stockons et protegeons vos donnees.
        </p>

        <Section title="1. Responsable de traitement">
          <InfoCard
            lines={[
              { label: "Raison sociale", value: "VYXO Consulting" },
              { label: "Siege social", value: "Paris, France" },
              { label: "Email DPO", value: "dpo@cleargo.fr" },
              { label: "Site", value: "cleargo.fr" },
            ]}
          />
        </Section>

        <Section title="2. Donnees collectees">
          <p className="mb-4">ClearGo collecte les donnees personnelles suivantes, selon le contexte d{"'"}utilisation :</p>

          <DataCategory
            title="Donnees d'identification"
            items={[
              "Nom, prenom",
              "Adresse email professionnelle",
              "Numero de telephone",
              "Nom de l'entreprise",
              "Fonction / poste occupe",
            ]}
          />
          <DataCategory
            title="Donnees relatives a l'entreprise"
            items={[
              "Taille de la flotte",
              "Type d'activite transport",
              "Informations de conformite (licences, CT, certifications)",
              "Score ClearGo et historique de conformite",
            ]}
          />
          <DataCategory
            title="Donnees de navigation"
            items={[
              "Adresse IP (anonymisee)",
              "Pages visitees et duree de visite",
              "Type de navigateur et systeme d'exploitation",
              "Source de trafic (referrer)",
            ]}
          />
          <DataCategory
            title="Donnees du simulateur"
            items={[
              "Reponses au questionnaire de scoring",
              "Score estime calcule",
              "Email (si communique pour recevoir le rapport)",
            ]}
          />
        </Section>

        <Section title="3. Finalites et bases legales">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b-2 border-[var(--navy)]/10">
                  <Th>Finalite</Th>
                  <Th>Base legale (RGPD)</Th>
                  <Th>Conservation</Th>
                </tr>
              </thead>
              <tbody>
                <LegalRow
                  purpose="Inscription a la beta / formulaire de contact"
                  basis="Consentement (art. 6.1.a)"
                  retention="3 ans apres dernier contact"
                />
                <LegalRow
                  purpose="Fourniture du service ClearGo (plateforme SaaS)"
                  basis="Execution du contrat (art. 6.1.b)"
                  retention="Duree du contrat + 5 ans"
                />
                <LegalRow
                  purpose="Simulateur de scoring (sans email)"
                  basis="Interet legitime (art. 6.1.f)"
                  retention="Session uniquement"
                />
                <LegalRow
                  purpose="Simulateur de scoring (avec email)"
                  basis="Consentement (art. 6.1.a)"
                  retention="3 ans apres dernier contact"
                />
                <LegalRow
                  purpose="Mesure d'audience (Vercel Analytics)"
                  basis="Consentement (art. 6.1.a)"
                  retention="12 mois"
                />
                <LegalRow
                  purpose="Envoi de communications commerciales"
                  basis="Consentement (art. 6.1.a)"
                  retention="3 ans apres dernier contact"
                />
                <LegalRow
                  purpose="Obligations legales et fiscales"
                  basis="Obligation legale (art. 6.1.c)"
                  retention="Durees legales applicables"
                />
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="4. Destinataires des donnees">
          <p>Vos donnees peuvent etre communiquees aux destinataires suivants :</p>
          <div className="mt-4 flex flex-col gap-3">
            <Recipient
              name="Equipe interne VYXO Consulting"
              purpose="Gestion des comptes, support client, expertise QHSE"
            />
            <Recipient
              name="Vercel Inc."
              purpose="Hebergement de la plateforme et mesure d'audience"
            />
            <Recipient
              name="Sous-traitants techniques"
              purpose="Stockage de donnees (base de donnees), envoi d'emails transactionnels"
            />
          </div>
          <p className="mt-4">
            ClearGo ne vend, ne loue et ne cede jamais vos donnees personnelles a des tiers a des fins commerciales.
            Tous nos sous-traitants sont lies par des clauses contractuelles conformes au RGPD.
          </p>
        </Section>

        <Section title="5. Transfert hors UE">
          <p>
            Certaines donnees peuvent etre traitees par des sous-traitants situes aux Etats-Unis (Vercel Inc.).
            Ces transferts sont encadres par les mecanismes suivants :
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            <li className="flex items-start gap-2">
              <span className="mt-1 flex-shrink-0 font-bold text-[var(--green)]">{"\u2713"}</span>
              <span>Data Privacy Framework (DPF) UE-US -- decision d{"'"}adequation de la Commission europeenne</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 flex-shrink-0 font-bold text-[var(--green)]">{"\u2713"}</span>
              <span>Clauses Contractuelles Types (CCT) de la Commission europeenne</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 flex-shrink-0 font-bold text-[var(--green)]">{"\u2713"}</span>
              <span>Mesures supplementaires : chiffrement en transit et au repos</span>
            </li>
          </ul>
        </Section>

        <Section title="6. Securite des donnees">
          <p>ClearGo met en oeuvre des mesures techniques et organisationnelles appropriees pour proteger vos donnees :</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { title: "Chiffrement", desc: "TLS 1.3 en transit, AES-256 au repos" },
              { title: "Acces restreint", desc: "Authentification renforcee, principe du moindre privilege" },
              { title: "Sauvegardes", desc: "Sauvegardes quotidiennes chiffrees, retention 30 jours" },
              { title: "Audit", desc: "Journalisation des acces, revue periodique des droits" },
              { title: "Sensibilisation", desc: "Formation RGPD de l'equipe VYXO Consulting" },
              { title: "Incident", desc: "Procedure de notification CNIL sous 72h en cas de violation" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-[var(--off-white)] p-4">
                <div className="font-sans text-sm font-bold text-[var(--navy)]">{item.title}</div>
                <div className="mt-1 font-serif text-[12px] leading-relaxed text-[var(--text-secondary)]">{item.desc}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="7. Vos droits (RGPD - articles 15 a 22)">
          <p>Conformement au RGPD, vous disposez des droits suivants :</p>
          <div className="mt-4 flex flex-col gap-3">
            {[
              { right: "Droit d'acces (art. 15)", desc: "Obtenir la confirmation que vos donnees sont traitees et en recevoir une copie." },
              { right: "Droit de rectification (art. 16)", desc: "Faire corriger vos donnees inexactes ou incompletes." },
              { right: "Droit a l'effacement (art. 17)", desc: "Demander la suppression de vos donnees dans les cas prevus par le RGPD." },
              { right: "Droit a la limitation (art. 18)", desc: "Demander la limitation du traitement de vos donnees." },
              { right: "Droit a la portabilite (art. 20)", desc: "Recevoir vos donnees dans un format structure et lisible par machine." },
              { right: "Droit d'opposition (art. 21)", desc: "Vous opposer au traitement de vos donnees pour des motifs legitimes." },
              { right: "Droit de retrait du consentement", desc: "Retirer votre consentement a tout moment, sans que cela affecte la licite du traitement effectue avant le retrait." },
            ].map((item) => (
              <div key={item.right} className="flex items-start gap-3 rounded-xl border border-border p-4">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--green)]/10 font-sans text-[10px] font-black text-[var(--green)]">
                  {"\u2713"}
                </span>
                <div>
                  <div className="font-sans text-sm font-bold text-[var(--foreground)]">{item.right}</div>
                  <div className="mt-0.5 font-serif text-[12px] leading-relaxed text-[var(--text-secondary)]">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border-2 border-[var(--navy)]/15 bg-[var(--navy)]/5 p-5">
            <div className="font-sans text-sm font-bold text-[var(--navy)]">Comment exercer vos droits ?</div>
            <p className="mt-2 text-sm">
              Adressez votre demande par email a{" "}
              <strong className="text-[var(--navy)]">dpo@cleargo.fr</strong>{" "}
              en joignant un justificatif d{"'"}identite. Nous repondons sous 30 jours maximum.
            </p>
            <p className="mt-2 text-sm">
              En cas de reponse insatisfaisante, vous pouvez introduire une reclamation aupres de la{" "}
              <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--navy)] underline underline-offset-2">
                CNIL
              </a>{" "}
              (3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07).
            </p>
          </div>
        </Section>

        <Section title="8. Donnees des mineurs">
          <p>
            ClearGo est un service B2B destine aux professionnels du transport.
            Nous ne collectons pas intentionnellement de donnees concernant des personnes de moins de 16 ans.
            Si nous decouvrons que de telles donnees ont ete collectees, elles seront immediatement supprimees.
          </p>
        </Section>

        <Section title="9. Registre des traitements">
          <p>
            Conformement a l{"'"}article 30 du RGPD, VYXO Consulting tient un registre des activites de traitement.
            Ce registre est disponible sur demande aupres du DPO a dpo@cleargo.fr.
          </p>
        </Section>

        <Section title="10. Modification de la politique">
          <p>
            La presente politique peut etre modifiee a tout moment.
            Toute modification substantielle sera portee a votre connaissance par email ou par notification dans la plateforme ClearGo.
            La date de derniere mise a jour est toujours indiquee en haut de ce document.
          </p>
        </Section>

        <div className="mt-12 flex gap-4">
          <Link
            href="/politique-cookies"
            className="rounded-lg border border-border bg-[var(--off-white)] px-5 py-3 font-sans text-sm font-bold text-[var(--navy)] transition-all hover:bg-[var(--background)] hover:border-[var(--navy)]"
          >
            Politique Cookies {"->"}
          </Link>
          <Link
            href="/"
            className="rounded-lg bg-[var(--navy)] px-5 py-3 font-sans text-sm font-bold text-[var(--primary-foreground)] transition-all hover:bg-[var(--navy-light)]"
          >
            Retour a ClearGo
          </Link>
        </div>
      </article>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-sans text-xl font-black text-[var(--navy)]">{title}</h2>
      <div className="mt-3 font-serif text-[15px] leading-relaxed text-[var(--text-secondary)]">{children}</div>
    </section>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-[var(--navy)]">{children}</th>
}

function LegalRow({ purpose, basis, retention }: { purpose: string; basis: string; retention: string }) {
  return (
    <tr className="border-b border-border/50">
      <td className="px-3 py-3 text-sm text-[var(--foreground)]">{purpose}</td>
      <td className="px-3 py-3"><span className="rounded-md bg-[var(--navy)]/10 px-2 py-0.5 text-[11px] font-bold text-[var(--navy)]">{basis}</span></td>
      <td className="px-3 py-3 text-sm text-[var(--text-secondary)]">{retention}</td>
    </tr>
  )
}

function InfoCard({ lines }: { lines: { label: string; value: string }[] }) {
  return (
    <div className="rounded-xl border border-border bg-[var(--off-white)] p-5">
      {lines.map((line) => (
        <div key={line.label} className="flex gap-3 py-1.5">
          <span className="w-36 flex-shrink-0 font-sans text-sm font-bold text-[var(--navy)]">{line.label}</span>
          <span className="text-sm">{line.value}</span>
        </div>
      ))}
    </div>
  )
}

function DataCategory({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-4 rounded-xl border border-border bg-[var(--off-white)] p-5">
      <h3 className="font-sans text-sm font-bold text-[var(--navy)]">{title}</h3>
      <ul className="mt-2 flex flex-col gap-1">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm">
            <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[var(--green)]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Recipient({ name, purpose }: { name: string; purpose: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border p-4">
      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--navy)]/10 font-sans text-xs font-black text-[var(--navy)]">
        {"->"}
      </span>
      <div>
        <div className="font-sans text-sm font-bold text-[var(--foreground)]">{name}</div>
        <div className="mt-0.5 font-serif text-[12px] text-[var(--text-secondary)]">{purpose}</div>
      </div>
    </div>
  )
}
