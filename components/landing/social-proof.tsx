const ITEMS = [
  { icon: "⭐", text: "4,9 / 5 bêta-testeurs" },
  { icon: "🚛", text: "40 000+ PME transport en France" },
  { icon: "✅", text: "87 points DRIEAT couverts nativement" },
  { icon: "🔒", text: "Données hébergées en France" },
]

export function SocialProof() {
  return (
    <div className="border-y border-[#E2E8F0] bg-white py-4">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 lg:justify-between lg:px-12">
        {ITEMS.map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-2.5 text-[13px] font-semibold text-[#4A5A72]"
          >
            <span className="text-base">{item.icon}</span>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  )
}
