/**
 * Suspense fallback shown while a lazy-loaded page chunk is fetched.
 * Reserves full viewport height so the layout doesn't jump when the
 * page mounts, and keeps the brand voice (rust eyebrow, tracked caps).
 */
export function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold animate-pulse">
        — Loading —
      </div>
    </div>
  )
}
