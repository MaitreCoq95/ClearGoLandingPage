"use client"

import { useState, useEffect } from "react"

const navLinks = [
  { href: "#solution",       label: "Solution" },
  { href: "#parcours",       label: "Parcours" },
  { href: "#team",           label: "À propos" },
  { href: "#contact",        label: "Contact" },
]

interface NavbarProps {
  onCta: () => void
}

export function Navbar({ onCta }: NavbarProps) {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/96 backdrop-blur-lg border-b border-[#D5DFE5] shadow-sm"
            : "bg-[#FAFBFC]/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <a href="#hero" className="flex-shrink-0 overflow-hidden rounded-lg h-11 w-[170px] lg:h-12 lg:w-[200px]">
            <video
              autoPlay loop muted playsInline
              className="h-full w-full object-cover"
              aria-label="ClearGo — Compliance & Transport"
            >
              <source
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VideoHeroLogo-7qJLxNGkkaQHeFQ9dV18GPXuLdieET.mp4"
                type="video/mp4"
              />
            </video>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[13px] font-medium px-3.5 py-2 rounded-md transition-all hover:text-[#1C2B35] hover:bg-[#EEF2F4]"
                  style={{ color: "#5E7485" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={onCta}
                data-cta
                className="btn-press ml-2 inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-[13px] font-bold text-white transition-all hover:-translate-y-0.5"
                style={{ background: "#4A7B8C" }}
              >
                Identifier mon entreprise →
              </button>
            </li>
          </ul>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} style={{ background: "#1C2B35" }} />
            <span className={`block h-0.5 w-6 transition-all ${mobileOpen ? "opacity-0" : ""}`}            style={{ background: "#1C2B35" }} />
            <span className={`block h-0.5 w-6 transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} style={{ background: "#1C2B35" }} />
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-b border-[#D5DFE5] px-6 pb-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-[14px] font-medium border-b border-[#EEF2F4] transition-colors hover:text-[#1C2B35]"
                style={{ color: "#5E7485" }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMobileOpen(false); onCta() }}
              data-cta
              className="mt-4 block w-full rounded-lg py-3 text-center text-[14px] font-bold text-white"
              style={{ background: "#4A7B8C" }}
            >
              Identifier mon entreprise →
            </button>
          </div>
        )}
      </nav>
    </>
  )
}
