/**
 * PressStrip — pure-CSS marquee of publication names (no GSAP).
 * Scrolls infinitely via the `.marquee-track` keyframes in index.css.
 */
export function PressStrip() {
  const press = [
    'Times of India',
    'Hindustan Times',
    'Indian Express',
    'Economic Times',
  ]
  // Repeated enough times to keep the marquee track wide and the
  // loop seamless with only four publication names.
  const items = [...press, ...press, ...press, ...press]
  return (
    <section className="bg-white border-y border-mist py-10 marquee overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex items-center gap-10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-stone shrink-0">
          As featured in —
        </span>
        <div className="overflow-hidden flex-1">
          <div className="marquee-track">
            {items.map((p, i) => (
              <span
                key={i}
                className="font-display text-[18px] md:text-[20px] text-graphite/70 tracking-tight hover:text-ink transition-colors duration-300 whitespace-nowrap"
                style={{ fontVariant: 'small-caps' }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

