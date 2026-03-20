"use client"

export function VideoShowcase() {
  return (
    <section className="relative bg-[#0D2B4E] py-20 lg:py-28 overflow-hidden">
      {/* Top fade */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-20"
        style={{ background: "linear-gradient(to bottom, #F8FAFC, #0D2B4E)" }}
      />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
        {/* Label */}
        <div className="mb-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#00A896]">
            <span className="h-px w-8 bg-[#00A896]" />
            Découvrir ClearGo
            <span className="h-px w-8 bg-[#00A896]" />
          </div>
          <h2
            className="font-black text-white"
            style={{ fontSize: "clamp(26px, 3.5vw, 40px)", letterSpacing: "-1.5px", lineHeight: 1.1 }}
          >
            Votre conformité, en un coup d'œil
          </h2>
        </div>

        {/* Video */}
        <div
          className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
          style={{
            aspectRatio: "16/9",
            boxShadow: "0 40px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          <video
            autoPlay loop muted playsInline
            className="absolute inset-0 h-full w-full object-cover"
            aria-label="Présentation ClearGo — plateforme de conformité transport"
          >
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VideoHeroLogo720p-NMmzlbyxopYpisSspsgViFCtQMA6sF.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
        style={{ background: "linear-gradient(to top, #F8FAFC, #0D2B4E)" }}
      />
    </section>
  )
}
