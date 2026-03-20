const tickerItems = [
  { tag: "DRIEAT", text: "Inspection-ready en permanence" },
  { tag: "ISO 9001", text: "Management de la Qualite" },
  { tag: "ISO 45001", text: "Sante & Securite au Travail" },
  { tag: "ISO 14001", text: "Management Environnemental" },
  { tag: "GDP", text: "Bonnes Pratiques Pharmaceutiques" },
  { tag: "RSE", text: "Developpement Durable" },
  { tag: "VEILLE IA", text: "Reglementaire Automatisee" },
  { tag: "HACCP", text: "Transport Alimentaire" },
]

export function Ticker() {
  const doubled = [...tickerItems, ...tickerItems]

  return (
    <div className="overflow-hidden border-t-[3px] border-[var(--green)] bg-[var(--navy-dark)] py-3">
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ animation: "ticker 28s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex flex-shrink-0 items-center gap-2 font-sans text-xs font-medium text-white/70"
          >
            <span className="rounded bg-[var(--green)]/25 px-2 py-0.5 text-[11px] font-bold text-[#7FE8A0]">
              {item.tag}
            </span>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  )
}
