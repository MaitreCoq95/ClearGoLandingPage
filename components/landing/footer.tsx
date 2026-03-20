"use client"

import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-[#081B32]">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-12">

        {/* 3-column grid */}
        <div className="grid gap-10 md:grid-cols-3">

          {/* Col 1 — Brand */}
          <div>
            {/* Video logo */}
            <div className="overflow-hidden rounded-xl w-[200px] h-[70px] mb-3">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
                aria-label="ClearGo"
              >
                <source
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VideoHeroLogo-ric3FQikb28mJ4nhqJHFkPpijnJAaG.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <p className="text-[13px] text-white/50 leading-relaxed">
              Compliance & Transport
            </p>
            {/* Little Flock logo */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-2">Un produit</p>
              <div className="inline-block rounded-xl bg-white px-3 py-2 opacity-80 hover:opacity-100 transition-opacity">
                <Image
                  src="/images/little-flock-logo.png"
                  alt="Little Flock"
                  width={130}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Col 2 — Links */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/30 mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {[
                { label: "Diagnostic", href: "#pricing" },
                { label: "Tarifs", href: "#pricing" },
                { label: "Parcours", href: "#parcours" },
                { label: "À propos", href: "#team" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[14px] text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact + badges */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/30 mb-4">
              Contact
            </p>
            <div className="space-y-2 mb-5">
              <a
                href="mailto:contact@cleargo.fr"
                className="flex items-center gap-2 text-[14px] text-white/50 hover:text-white transition-colors"
              >
                ✉ contact@cleargo.fr
              </a>
              <p className="text-[14px] text-white/50">cleargo.fr</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/60">
                🔒 RGPD
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/60">
                🛡 Données sécurisées
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px bg-white/5" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-[12px] text-white/25">
            © 2026 Little Flock — ClearGo. Tous droits réservés.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link
              href="/politique-cookies"
              className="text-[12px] text-white/30 underline underline-offset-2 hover:text-white/60 transition-colors"
            >
              Politique Cookies
            </Link>
            <span className="text-white/10">|</span>
            <Link
              href="/politique-confidentialite"
              className="text-[12px] text-white/30 underline underline-offset-2 hover:text-white/60 transition-colors"
            >
              Politique de Confidentialité RGPD
            </Link>
            <span className="text-white/10">|</span>
            <button
              onClick={() => {
                localStorage.removeItem("cleargo-cookie-consent")
                window.location.reload()
              }}
              className="text-[12px] text-white/30 underline underline-offset-2 hover:text-white/60 transition-colors"
            >
              Gestion des cookies
            </button>
          </div>

          <div className="rounded-lg border border-yellow-400/30 bg-yellow-400/15 px-3.5 py-1.5 text-[11px] font-bold text-yellow-400">
            ★ SITL 2026
          </div>
        </div>
      </div>
    </footer>
  )
}
