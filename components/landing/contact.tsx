"use client"

import { useState } from "react"
import Image from "next/image"
import { Check } from "lucide-react"

const priorities = [
  "Preparer une inspection DRIEAT",
  "Obtenir ISO 9001 pour des appels d'offres",
  "Structurer mon QSE complet",
  "Conformite conducteurs et vehicules",
  "Bilan carbone et RSE",
  "Veille reglementaire automatisee",
]

const fleetSizes = [
  "1 a 5 vehicules",
  "5 a 15 vehicules",
  "15 a 50 vehicules",
  "50 a 150 vehicules",
  "150+ vehicules",
]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "contact", ...data }),
      })
    } catch {
      // fail silently
    }
    setSending(false)
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--navy-dark)] py-24">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(45,155,78,0.1), transparent)" }} />

      {/* Background image */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src="/images/compliance-check.jpg"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-[#7FE8A0]">
              <span className="h-0.5 w-4 rounded bg-[#7FE8A0]" />
              {"// ACCES BETA SITL 2026"}
            </div>
            <h2 className="mt-3 font-sans text-4xl font-black leading-none tracking-tight text-white lg:text-5xl">
              <span className="text-balance">Rejoignez les 50 pionniers</span>
            </h2>
            <p className="mt-3 max-w-md font-serif text-[17px] leading-relaxed text-white/60">
              Acces prioritaire. Tarifs fondateurs. Onboarding personnalise.
              <br />
              <strong className="text-white">Les inscrits SITL sont prioritaires.</strong>
            </p>

            <div className="mt-10 flex flex-col gap-4">
              {[
                "3 mois d'acces offerts pour les beta-testeurs SITL",
                "Onboarding 2h avec un expert QHSE transport",
                "Tarif fondateur garanti a vie",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[var(--green)]/30 bg-[var(--green)]/20">
                    <Check className="h-4 w-4 text-[#7FE8A0]" />
                  </div>
                  <span className="text-sm text-white/60">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[var(--background)] p-8 shadow-2xl lg:p-11">
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField name="prenom" label="Prenom" placeholder="Jean" required />
                  <FormField name="nom" label="Nom" placeholder="Dupont" required />
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <FormField name="email" label="Email professionnel" placeholder="jean@transport.fr" type="email" required />
                  <FormField name="telephone" label="Telephone" placeholder="06 XX XX XX XX" type="tel" />
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <FormField name="entreprise" label="Entreprise" placeholder="Nom de votre societe" required />
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[13px] font-semibold text-[var(--foreground)]">
                      Taille de flotte
                    </label>
                    <select
                      name="flotte"
                      className="rounded-lg border border-border bg-[var(--off-white)] px-4 py-3 font-serif text-[15px] text-[var(--foreground)] outline-none transition-all focus:border-[var(--navy)] focus:bg-[var(--background)]"
                      required
                    >
                      <option value="" disabled>Choisir...</option>
                      {fleetSizes.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-1.5">
                  <label className="font-sans text-[13px] font-semibold text-[var(--foreground)]">
                    Votre priorite
                  </label>
                  <select
                    name="priorite"
                    className="rounded-lg border border-border bg-[var(--off-white)] px-4 py-3 font-serif text-[15px] text-[var(--foreground)] outline-none transition-all focus:border-[var(--navy)] focus:bg-[var(--background)]"
                    required
                  >
                    <option value="" disabled>Choisir...</option>
                    {priorities.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  data-cta
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--green)] px-6 py-4 font-sans text-base font-extrabold text-[var(--accent-foreground)] transition-all hover:bg-[var(--green-hover)] hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50"
                >
                  {sending ? "Envoi en cours..." : "Reserver mon acces Beta SITL 2026 \u2192"}
                </button>

                <div className="mt-5 flex flex-col gap-2">
                  {[
                    "3 mois d'acces offerts pour les beta-testeurs SITL",
                    "Onboarding 2h avec un expert QHSE transport",
                    "Tarif fondateur garanti a vie",
                  ].map((line) => (
                    <div key={line} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <span className="flex-shrink-0 font-bold text-[var(--green)]">{"\u2713"}</span>
                      {line}
                    </div>
                  ))}
                </div>
              </form>
            ) : (
              <div className="py-10 text-center" style={{ animation: "fadeUp 0.5s ease both" }}>
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--green)]" style={{ animation: "pulse-dot 1.5s ease 1" }}>
                  <Check className="h-10 w-10 text-[var(--accent-foreground)]" />
                </div>
                <h3 className="font-sans text-3xl font-black text-[var(--navy)]">
                  Vous etes sur la liste !
                </h3>
                <p className="mt-3 font-serif text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  Notre equipe vous contacte sous 48h.
                  <br />
                  <br />
                  <strong className="text-[var(--green)]">A bientot sur ClearGo.</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function FormField({
  label,
  placeholder,
  name,
  type = "text",
  required = false,
}: {
  label: string
  placeholder: string
  name?: string
  type?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-sans text-[13px] font-semibold text-[var(--foreground)]">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="rounded-lg border border-border bg-[var(--off-white)] px-4 py-3 font-serif text-[15px] text-[var(--foreground)] placeholder:text-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--navy)] focus:bg-[var(--background)] focus:ring-2 focus:ring-[var(--navy)]/8"
      />
    </div>
  )
}
