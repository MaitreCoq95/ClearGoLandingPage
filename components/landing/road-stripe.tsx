export function RoadStripe() {
  return (
    <div
      className="h-1 w-full opacity-20"
      style={{
        background:
          "repeating-linear-gradient(90deg, var(--navy) 0px, var(--navy) 32px, transparent 32px, transparent 48px, var(--green) 48px, var(--green) 80px, transparent 80px, transparent 96px)",
      }}
    />
  )
}
