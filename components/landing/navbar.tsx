"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const navLinks = [
  { href: "#solution", label: "Solution" },
  { href: "#parcours", label: "Parcours" },
  { href: "#pricing", label: "Tarifs" },
  { href: "#team", label: "À propos" },
]

interface NavbarProps {
  onCta: () => void
}

export function Navbar({ onCta }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* SITL 2026 Top Banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-[#0D2B4E]">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-center gap-4 px-5 text-center lg:h-14">
          <div className="overflow-hidden rounded-lg flex-shrink-0" style={{ width: 220, height: 34 }}>
            <Image
              src="/images/sitl-badge.jpg"
              alt="Start-up Contest SITL 2026 — Nominé"
              width={1300}
              height={200}
              className="h-full w-full object-cover object-left"
              priority
            />
          </div>
          <span className="font-sans text-[13px] font-semibold text-white/80 hidden sm:block">
            31 mars au 2 avril 2026 — Paris Nord Villepinte
          </span>
          <button
            onClick={onCta}
            className="hidden rounded-md bg-white/15 px-4 py-1.5 font-sans text-[12px] font-bold text-white transition-colors hover:bg-white/25 lg:inline-block"
          >
            Démarrer gratuitement →
          </button>
        </div>
      </div>

      {/* Navbar */}
      <nav
        className={`fixed top-12 left-0 right-0 z-50 transition-all duration-300 lg:top-14 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg border-b border-[#DDE4F0] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
          {/* Logo video */}
          <a href="#hero" className="flex-shrink-0 overflow-hidden rounded-lg h-12 w-[180px] lg:h-14 lg:w-[230px]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
              aria-label="ClearGo - Compliance & Transport"
            >
              <source
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VideoHeroLogo-7qJLxNGkkaQHeFQ9dV18GPXuLdieET.mp4"
                type="video/mp4"
              />
            </video>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[14px] font-semibold text-[#4A5A72] px-3.5 py-2 rounded-lg transition-all hover:text-[#0D2B4E] hover:bg-[#F0F4F8]"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={onCta}
                data-cta
                className="ml-2 inline-flex items-center gap-2 rounded-lg bg-[#00A896] px-5 py-2.5 text-[14px] font-bold text-white transition-all hover:bg-[#008F7E] hover:-translate-y-0.5 hover:shadow-lg"
              >
                Pré-qualification gratuite →
              </button>
            </li>
          </ul>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-[#0D2B4E] transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-[#0D2B4E] transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-[#0D2B4E] transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-b border-[#DDE4F0] px-6 pb-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-[14px] font-semibold text-[#4A5A72] hover:text-[#0D2B4E] border-b border-[#F0F4F8]"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMobileOpen(false); onCta() }}
              data-cta
              className="mt-3 block w-full rounded-lg bg-[#00A896] px-5 py-3 text-center text-[14px] font-bold text-white"
            >
              Pré-qualification gratuite →
            </button>
          </div>
        )}
      </nav>
    </>
  )
}
