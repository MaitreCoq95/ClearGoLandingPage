import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales du site ClearGo — éditeur, hébergeur, propriété intellectuelle et responsabilité.",
  alternates: { canonical: "https://cleargo.fr/mentions-legales" },
  robots: { index: false, follow: false },
}

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-border bg-[var(--off-white)]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Link href="/" className="font-sans text-lg font-black text-[var(--navy)]">
            {"<-"} ClearGo
          </Link>
          <span className="font-sans text-xs font-semibold text-[var(--text-tertiary)]">
            Mise à jour : mars 2026
          </span>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-12 lg:py-20">
        <h1 className="font-sans text-3xl font-black text-[var(--navy)] lg:text-4xl">
          Mentions Légales
        </h1>
        <p className="mt-2 font-sans text-base font-semibold text-[var(--green)]">
          Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l{"'"}économie numérique (LCEN)
        </p>

        <Section title="1. Éditeur du site">
          <InfoCard
            lines={[
              { label: "Raison sociale", value: "VYXO Consulting" },
              { label: "Forme juridique", value: "SAS — Société par Actions Simplifiée" },
              { label: "Siège social", value: "Paris, France" },
              { label: "SIREN", value: "À compléter" },
              { label: "SIRET", value: "À compléter" },
              { label: "Capital social", value: "À compléter" },
              { label: "Email", value: "contact@cleargo.fr" },
              { label: "Site web", value: "cleargo.fr" },
            ]}
          />
        </Section>

        <Section title="2. Directeur de la publication">
          <p>
            Le directeur de la publication du site <strong>cleargo.fr</strong> est le représentant légal de
            VYXO Consulting. Pour toute question relative à la publication du contenu, vous pouvez contacter :{" "}
            <a href="mailto:contact@cleargo.fr" className="font-semibold text-[var(--navy)] underline underline-offset-2">
              contact@cleargo.fr
            </a>
          </p>
        </Section>

        <Section title="3. Hébergeur">
          <InfoCard
            lines={[
              { label: "Société", value: "Vercel Inc." },
              { label: "Adresse", value: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis" },
              { label: "Site web", value: "vercel.com" },
              { label: "Contact", value: "privacy@vercel.com" },
            ]}
          />
          <p className="mt-3">
            Les données de navigation sont traitées par Vercel dans le cadre du Data Privacy Framework (DPF) UE-US,
            décision d{"'"}adéquation de la Commission européenne du 10 juillet 2023.
          </p>
        </Section>

        <Section title="4. Propriété intellectuelle">
          <p>
            L{"'"}ensemble du contenu du site <strong>cleargo.fr</strong> — textes, graphismes, logos, images, vidéos,
            icônes, interface, architecture — est la propriété exclusive de VYXO Consulting ou de ses partenaires
            et est protégé par les dispositions du Code de la propriété intellectuelle (articles L.111-1 et suivants).
          </p>
          <p className="mt-3">
            Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments
            du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l{"'"}autorisation écrite
            préalable de VYXO Consulting.
          </p>
          <p className="mt-3">
            Le nom <strong>ClearGo</strong>, le logotype, la marque et les éléments de communication sont des marques
            déposées ou en cours de dépôt. Toute utilisation non autorisée constitue une contrefaçon sanctionnée
            par les articles L.716-1 et suivants du Code de la propriété intellectuelle.
          </p>
        </Section>

        <Section title="5. Liens hypertextes">
          <p>
            Le site cleargo.fr peut contenir des liens vers des sites tiers. VYXO Consulting n{"'"}exerce aucun
            contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leur disponibilité ou
            leur politique de confidentialité.
          </p>
          <p className="mt-3">
            Tout lien hypertexte pointant vers cleargo.fr doit faire l{"'"}objet d{"'"}une autorisation écrite préalable
            de VYXO Consulting. La demande peut être adressée à{" "}
            <a href="mailto:contact@cleargo.fr" className="font-semibold text-[var(--navy)] underline underline-offset-2">
              contact@cleargo.fr
            </a>.
          </p>
        </Section>

        <Section title="6. Limitation de responsabilité">
          <p>
            VYXO Consulting s{"'"}efforce de maintenir les informations publiées sur cleargo.fr exactes et à jour.
            Toutefois, la société ne saurait garantir l{"'"}exhaustivité, la précision ou l{"'"}actualité des informations
            diffusées sur ce site.
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {[
              {
                title: "Disponibilité",
                desc: "VYXO Consulting ne garantit pas que le site sera accessible sans interruption. Des maintenances ou incidents techniques peuvent temporairement affecter l'accès.",
              },
              {
                title: "Contenu informatif",
                desc: "Les informations publiées sur cleargo.fr ont un caractère informatif et général. Elles ne constituent pas un conseil juridique ou réglementaire personnalisé.",
              },
              {
                title: "Évolution réglementaire",
                desc: "La réglementation transport étant susceptible d'évoluer, les informations présentées doivent être vérifiées auprès des autorités compétentes (DRIEAT, DREAL, etc.).",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-[var(--off-white)] p-4">
                <div className="font-sans text-sm font-bold text-[var(--navy)]">{item.title}</div>
                <div className="mt-1 font-serif text-[13px] leading-relaxed text-[var(--text-secondary)]">{item.desc}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="7. Données personnelles et cookies">
          <p>
            Le traitement des données personnelles collectées via cleargo.fr est régi par notre{" "}
            <Link href="/politique-confidentialite" className="font-semibold text-[var(--navy)] underline underline-offset-2">
              Politique de Confidentialité RGPD
            </Link>{" "}
            et notre{" "}
            <Link href="/politique-cookies" className="font-semibold text-[var(--navy)] underline underline-offset-2">
              Politique Cookies
            </Link>.
          </p>
          <p className="mt-3">
            Conformément au Règlement (UE) 2016/679 (RGPD), vous disposez de droits sur vos données personnelles
            (accès, rectification, effacement, portabilité, opposition). Pour exercer ces droits, contactez notre
            DPO à{" "}
            <a href="mailto:dpo@cleargo.fr" className="font-semibold text-[var(--navy)] underline underline-offset-2">
              dpo@cleargo.fr
            </a>.
          </p>
        </Section>

        <Section title="8. Droit applicable et juridiction compétente">
          <p>
            Les présentes mentions légales sont régies par le droit français. Tout litige relatif à l{"'"}utilisation
            du site cleargo.fr relève de la compétence exclusive des tribunaux du ressort de Paris,
            nonobstant pluralité de défendeurs ou appel en garantie.
          </p>
          <div className="mt-4 rounded-xl border-2 border-[var(--navy)]/15 bg-[var(--navy)]/5 p-5">
            <div className="font-sans text-sm font-bold text-[var(--navy)]">Médiation de la consommation</div>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Conformément à l{"'"}article L.616-1 du Code de la consommation, en cas de litige, vous pouvez recourir
              gratuitement à un médiateur de la consommation. Coordonnées disponibles sur demande auprès de
              VYXO Consulting.
            </p>
          </div>
        </Section>

        <Section title="9. Accessibilité">
          <p>
            VYXO Consulting s{"'"}engage à améliorer progressivement l{"'"}accessibilité de cleargo.fr
            conformément au Référentiel Général d{"'"}Amélioration de l{"'"}Accessibilité (RGAA 4.1).
            Pour signaler une difficulté d{"'"}accessibilité, contactez{" "}
            <a href="mailto:contact@cleargo.fr" className="font-semibold text-[var(--navy)] underline underline-offset-2">
              contact@cleargo.fr
            </a>.
          </p>
        </Section>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/politique-confidentialite"
            className="rounded-lg border border-border bg-[var(--off-white)] px-5 py-3 font-sans text-sm font-bold text-[var(--navy)] transition-all hover:bg-[var(--background)] hover:border-[var(--navy)]"
          >
            Politique Confidentialité {"->"}
          </Link>
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
            Retour à ClearGo
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

function InfoCard({ lines }: { lines: { label: string; value: string }[] }) {
  return (
    <div className="rounded-xl border border-border bg-[var(--off-white)] p-5">
      {lines.map((line) => (
        <div key={line.label} className="flex gap-3 py-1.5">
          <span className="w-36 flex-shrink-0 font-sans text-sm font-bold text-[var(--navy)]">{line.label}</span>
          <span className="text-sm text-[var(--text-secondary)]">{line.value}</span>
        </div>
      ))}
    </div>
  )
}
