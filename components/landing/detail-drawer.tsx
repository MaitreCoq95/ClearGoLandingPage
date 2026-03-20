"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

interface DetailDrawerProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  accentColor?: string
  children: React.ReactNode
}

export function DetailDrawer({ open, onClose, title, subtitle, accentColor = "var(--navy)", children }: DetailDrawerProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-end justify-end"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--navy-dark)]/50 backdrop-blur-sm"
        style={{ animation: "fadeUp 0.2s ease both" }}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className="relative z-10 flex h-full w-full max-w-2xl flex-col bg-[var(--background)] shadow-2xl md:rounded-l-3xl"
        style={{ animation: "fadeRight 0.3s ease both" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border px-8 pt-8 pb-5">
          <div>
            <div
              className="mb-1 inline-block rounded-full px-2.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--background)]"
              style={{ backgroundColor: accentColor }}
            >
              Detail
            </div>
            <h3 className="font-sans text-2xl font-black tracking-tight text-[var(--navy-dark)]">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-1 font-serif text-sm text-[var(--text-secondary)]">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--off-white)] text-[var(--text-secondary)] transition-colors hover:bg-border"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  )
}

/* Reusable sub-components for drawer content */

export function DrawerSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h4 className="mb-3 font-sans text-sm font-bold uppercase tracking-wider text-[var(--navy)]">{title}</h4>
      {children}
    </div>
  )
}

export function DrawerTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-[var(--off-white)]">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-2.5 font-sans text-[11px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-[var(--off-white)]/50 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 font-serif text-[13px] text-[var(--text-secondary)]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DrawerAlgo({ lines }: { lines: { label: string; detail: string; points?: string }[] }) {
  return (
    <div className="flex flex-col gap-2">
      {lines.map((line, i) => (
        <div key={i} className="flex items-start gap-3 rounded-xl bg-[var(--off-white)] p-3.5">
          <div className="flex-1">
            <div className="font-sans text-[13px] font-bold text-[var(--foreground)]">{line.label}</div>
            <div className="mt-0.5 font-serif text-[12px] leading-relaxed text-[var(--text-secondary)]">{line.detail}</div>
          </div>
          {line.points && (
            <span className="flex-shrink-0 rounded-lg bg-[var(--navy)]/8 px-2 py-1 font-sans text-[11px] font-bold text-[var(--navy)]">
              {line.points}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export function DrawerCodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-[var(--navy-dark)] p-5 font-mono text-[12px] leading-relaxed text-white/80">
      <code>{code}</code>
    </pre>
  )
}
