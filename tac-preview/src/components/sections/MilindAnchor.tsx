// MilindAnchor — site-wide brand-muse section. Milind Soman as the
// visual anchor of "what ageing well looks like" with a short italic
// brand line on the right. Drops in once per page, right before the
// final CTA section, so every page closes with the same recurring
// inspiration beat. No CTA buttons inside — the existing CTA below
// owns the action; this section owns the feeling.
export function MilindAnchor() {
  return (
    <section
      id="milind-anchor"
      className="relative bg-cream/40 py-14 md:py-20 px-6 md:px-12 overflow-hidden"
    >
      {/* Soft ambient warmth — barely-there rust + nougat wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 600px at 20% 25%, rgba(148,84,85,0.06), transparent 60%), radial-gradient(800px 500px at 85% 75%, rgba(238,230,219,0.55), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[1180px] mx-auto">
        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-14 lg:gap-20 items-center">
          {/* Portrait card — same scale and treatment as the homepage
              CTA version so the section reads identically across the
              site. */}
          <div className="relative rounded-[18px] overflow-hidden bg-cream shadow-[0_30px_60px_-30px_rgba(27,26,24,0.32)] aspect-[4/5] md:aspect-auto md:min-h-[480px]">
            <img
              src="/longevity/milind-soman.jpg"
              alt="Milind Soman — Indian icon of fitness and longevity"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center 22%' }}
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(27,26,24,0.55) 0%, rgba(27,26,24,0) 100%)',
              }}
            />
            <div className="absolute inset-x-0 bottom-0 px-6 md:px-8 pb-6 md:pb-7">
              <div className="text-[10.5px] tracking-[0.34em] uppercase text-white/85 font-semibold mb-2">
                What ageing well looks like
              </div>
              <div className="font-display italic text-white text-[20px] md:text-[26px] leading-[1.2]">
                Milind Soman
                <span className="text-white/65 not-italic font-light ml-2">
                  &middot; 58
                </span>
              </div>
            </div>
          </div>

          {/* Right column — brand voice, no CTA. Lets the section
              right below it own the action. */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-5">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold">
                Why we exist
              </span>
            </div>
            <h2 className="font-display font-light text-[30px] md:text-[44px] xl:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink mb-6">
              Age should never{' '}
              <span className="font-bold text-rust italic">define you.</span>
            </h2>
            <p className="text-[15px] md:text-[16.5px] text-graphite leading-[1.7] max-w-[520px] mx-auto md:mx-0 font-light">
              Strength, clarity and energy aren&rsquo;t the privileges of
              youth — they&rsquo;re the rewards of measurement, intention and
              the right medical partnership. The proof walks among us.
            </p>
            <div className="mt-7 flex items-center justify-center md:justify-start gap-3">
              <span className="w-9 h-px bg-rust/60" />
              <span className="text-[10.5px] tracking-[0.32em] uppercase text-stone font-medium">
                An Indian Original &middot; 58 &amp; counting
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
