import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Politique Cookies - ClearGo",
  description: "Politique de gestion des cookies de la plateforme ClearGo Compliance & Transport.",
}

export default function PolitiqueCookies() {
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
          Politique de Cookies
        </h1>
        <p className="mt-3 font-serif text-base leading-relaxed text-[var(--text-secondary)]">
          La presente politique detaille l{"'"}utilisation des cookies et traceurs sur le site cleargo.fr, edite par VYXO Consulting.
        </p>

        <Section title="1. Qu'est-ce qu'un cookie ?">
          <p>
            Un cookie est un petit fichier texte depose sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d{"'"}un site web.
            Il permet au site de memoriser des informations sur votre visite, comme votre langue preferee et d{"'"}autres parametres,
            facilitant ainsi votre prochaine visite et rendant le site plus utile pour vous.
          </p>
        </Section>

        <Section title="2. Cookies utilises par ClearGo">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b-2 border-[var(--navy)]/10">
                  <Th>Nom</Th>
                  <Th>Type</Th>
                  <Th>Finalite</Th>
                  <Th>Duree</Th>
                </tr>
              </thead>
              <tbody>
                <CookieRow name="cleargo-cookie-consent" type="Necessaire" purpose="Enregistre vos preferences de consentement cookies" duration="12 mois" />
                <CookieRow name="__vercel_live_token" type="Necessaire" purpose="Token de session pour le fonctionnement de la plateforme" duration="Session" />
                <CookieRow name="_vercel_analytics" type="Analytique" purpose="Mesure d'audience anonymisee (Vercel Analytics)" duration="12 mois" />
                <CookieRow name="va_*" type="Analytique" purpose="Identifiant de session analytique anonymise" duration="Session" />
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="3. Categories de cookies">
          <CookieCategory
            name="Cookies strictement necessaires"
            description="Ces cookies sont indispensables au fonctionnement du site et ne peuvent pas etre desactives. Ils incluent les cookies de session, de securite et de memorisation de vos preferences de consentement. Aucune donnee personnelle n'est collectee a des fins de suivi."
            legal="Base legale : interet legitime (art. 6.1.f RGPD)"
          />
          <CookieCategory
            name="Cookies analytiques (mesure d'audience)"
            description="Ces cookies nous permettent de mesurer l'audience du site et de comprendre comment les visiteurs naviguent, afin d'ameliorer ClearGo. Les donnees collectees sont anonymisees et ne permettent pas d'identifier un utilisateur. Nous utilisons Vercel Analytics qui ne pose pas de cookies tiers et respecte la vie privee."
            legal="Base legale : consentement (art. 6.1.a RGPD). Vous pouvez refuser ces cookies sans impact sur votre navigation."
          />
          <CookieCategory
            name="Cookies marketing / publicitaires"
            description="ClearGo n'utilise actuellement aucun cookie marketing ou publicitaire. Si cela venait a changer, cette politique serait mise a jour et votre consentement serait requis prealablement."
            legal="Base legale : consentement (art. 6.1.a RGPD)"
          />
        </Section>

        <Section title="4. Gestion de vos preferences">
          <p>
            Lors de votre premiere visite sur cleargo.fr, un bandeau de consentement vous permet d{"'"}accepter, refuser ou personnaliser vos choix cookie par cookie.
          </p>
          <p className="mt-3">
            Vous pouvez modifier vos preferences a tout moment en cliquant sur le lien "Gestion des cookies" present dans le pied de page du site.
            La modification prend effet immediatement.
          </p>
          <p className="mt-3">
            Vous pouvez egalement configurer votre navigateur pour accepter ou refuser tout ou partie des cookies.
            Voici les liens vers les pages d{"'"}aide des principaux navigateurs :
          </p>
          <ul className="mt-3 flex flex-col gap-1">
            <li>{"- "}<a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[var(--navy)] underline underline-offset-2">Google Chrome</a></li>
            <li>{"- "}<a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies" target="_blank" rel="noopener noreferrer" className="text-[var(--navy)] underline underline-offset-2">Mozilla Firefox</a></li>
            <li>{"- "}<a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[var(--navy)] underline underline-offset-2">Safari</a></li>
            <li>{"- "}<a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[var(--navy)] underline underline-offset-2">Microsoft Edge</a></li>
          </ul>
        </Section>

        <Section title="5. Transfert de donnees">
          <p>
            Les donnees collectees par les cookies analytiques (Vercel Analytics) sont traitees par Vercel Inc., dont les serveurs peuvent etre situes aux Etats-Unis.
            Vercel participe aux Data Privacy Framework (DPF) et assure un niveau de protection adequat conformement au RGPD.
          </p>
        </Section>

        <Section title="6. Duree de conservation">
          <p>
            Les cookies necessaires sont conserves pour la duree de votre session ou 12 mois maximum.
            Les cookies analytiques sont conserves 12 mois maximum.
            Les preferences de consentement sont conservees 12 mois. A l{"'"}expiration, le bandeau de consentement est de nouveau affiche.
          </p>
        </Section>

        <Section title="7. Contact">
          <p>
            Pour toute question relative a la gestion des cookies sur ClearGo, vous pouvez nous contacter :
          </p>
          <div className="mt-3 rounded-xl border border-border bg-[var(--off-white)] p-5">
            <div className="font-sans text-sm font-bold text-[var(--navy)]">VYXO Consulting</div>
            <div className="mt-1 font-serif text-sm text-[var(--text-secondary)]">
              Email : dpo@cleargo.fr
              <br />
              Adresse : Paris, France
            </div>
          </div>
          <p className="mt-4">
            Vous pouvez egalement exercer vos droits aupres de la{" "}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--navy)] underline underline-offset-2">CNIL</a> (Commission Nationale de l{"'"}Informatique et des Libertes).
          </p>
        </Section>

        <div className="mt-12 flex gap-4">
          <Link
            href="/politique-confidentialite"
            className="rounded-lg border border-border bg-[var(--off-white)] px-5 py-3 font-sans text-sm font-bold text-[var(--navy)] transition-all hover:bg-[var(--background)] hover:border-[var(--navy)]"
          >
            Politique de confidentialite RGPD {"->"}
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

function CookieRow({ name, type, purpose, duration }: { name: string; type: string; purpose: string; duration: string }) {
  const typeBg = type === "Necessaire" ? "bg-[var(--navy)]/10 text-[var(--navy)]" : "bg-[var(--green)]/10 text-[var(--green)]"
  return (
    <tr className="border-b border-border/50">
      <td className="px-3 py-3 font-mono text-xs font-semibold text-[var(--foreground)]">{name}</td>
      <td className="px-3 py-3"><span className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${typeBg}`}>{type}</span></td>
      <td className="px-3 py-3 text-sm text-[var(--text-secondary)]">{purpose}</td>
      <td className="px-3 py-3 text-sm font-semibold text-[var(--foreground)]">{duration}</td>
    </tr>
  )
}

function CookieCategory({ name, description, legal }: { name: string; description: string; legal: string }) {
  return (
    <div className="mt-5 rounded-xl border border-border bg-[var(--off-white)] p-5">
      <h3 className="font-sans text-base font-bold text-[var(--foreground)]">{name}</h3>
      <p className="mt-2 text-sm leading-relaxed">{description}</p>
      <p className="mt-2 text-xs font-semibold text-[var(--navy)]">{legal}</p>
    </div>
  )
}
