/**
 * CtaBand — site signature bottom-of-page CTA surface used on every
 * page. Combines the "what ageing well looks like" Milind portrait
 * (was previously a separate MilindAnchor section sitting just above
 * this one — the two have been merged into a single editorial
 * close-out so the page doesn't end with two stacked dark/white
 * pieces saying the same headline).
 *
 * Layout
 *   - Eyebrow centred at top
 *   - 2-col grid: Milind portrait left + headline / body / CTA pills
 *     stack right
 *   - Stats grid (8 / 20+ / 1000+ / 3) full-width below
 *
 * No GSAP — entrance animations come from the global fade-up
 * observer in index.css. Keeping it static makes it a safe drop-in
 * footer-of-page component for every route.
 */
export function CtaBand() {
  return (
    <section
      id="cta"
      className="relative bg-white py-20 md:py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Soft ambient warmth — barely-there rust + nougat wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 600px at 18% 25%, rgba(148,84,85,0.05), transparent 60%), radial-gradient(800px 500px at 85% 75%, rgba(238,230,219,0.55), transparent 60%)',
        }}
      />
      {/* Hairline top + bottom rules — editorial framing */}
      <div aria-hidden className="absolute inset-x-6 md:inset-x-12 top-0 h-px bg-ink/8" />
      <div aria-hidden className="absolute inset-x-6 md:inset-x-12 bottom-0 h-px bg-ink/8" />

      <div className="relative z-10 max-w-[1240px] mx-auto">
        {/* Eyebrow centred above the 2-col grid */}
        <div className="flex items-center justify-center gap-3 mb-10 md:mb-14">
          <span className="w-7 h-px bg-rust" />
          <span className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold">
            Begin Your Programme
          </span>
          <span className="w-7 h-px bg-rust" />
        </div>

        {/* Main 2-col layout — Milind portrait left, CTA stack right.
            Mobile collapses to portrait-on-top, content-below. */}
        <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-14 lg:gap-20 items-center mb-14 md:mb-16">
          {/* Milind portrait card — the "what ageing well looks like"
              visual anchor. Caption sits at the bottom of the photo. */}
          <div className="relative aspect-[4/5] rounded-[18px] overflow-hidden bg-cream shadow-[0_28px_60px_-30px_rgba(27,26,24,0.30)]">
            <img
              src="/longevity/milind-soman.jpg"
              alt="Milind Soman — Indian icon of fitness and longevity"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center 22%' }}
            />
            {/* Soft bottom gradient keeps the caption legible. */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(27,26,24,0.55) 0%, rgba(27,26,24,0) 100%)',
              }}
            />
            <div className="absolute inset-x-0 bottom-0 px-6 md:px-8 pb-6 md:pb-7">
              <div className="text-[10px] tracking-[0.34em] uppercase text-white/85 font-semibold mb-1.5">
                What ageing well looks like
              </div>
              <div className="font-display italic text-white text-[18px] md:text-[22px] leading-[1.2]">
                Milind Soman
                <span className="text-white/65 not-italic font-light ml-2">
                  &middot; 58
                </span>
              </div>
            </div>
          </div>

          {/* Right column — headline, body, CTA pills */}
          <div className="text-center md:text-left">
            <h2 className="font-display font-light text-[32px] md:text-[48px] xl:text-[58px] leading-[1.04] tracking-[-0.03em] text-ink mb-5">
              Age should never{' '}
              <span className="font-bold italic text-rust">define you.</span>
            </h2>

            <p className="text-[14.5px] md:text-[16.5px] text-graphite leading-[1.7] max-w-[520px] mx-auto md:mx-0 mb-8 font-light">
              Strength, clarity and energy aren&rsquo;t the privileges of
              youth — they&rsquo;re the rewards of measurement, intention and
              the right medical partnership. Speak with our team for a
              30-minute personalised conversation. No commitment. Just
              clarity.
            </p>

            {/* CTA pills */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href="/contact"
                data-cursor="hover"
                data-magnetic
                className="group inline-flex items-center gap-3 pl-5 pr-7 py-3.5 bg-rust text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-ink transition-colors duration-500"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                Arrange a Consultation
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0"
                data-cursor="hover"
                className="inline-flex items-center gap-2 px-5 py-3.5 border border-ink/15 text-ink text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:border-rust hover:text-rust transition-colors duration-500"
              >
                WhatsApp
              </a>
              <a
                href="tel:+918826809123"
                data-cursor="hover"
                className="inline-flex items-center gap-2 px-5 py-3.5 border border-ink/15 text-ink text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:border-rust hover:text-rust transition-colors duration-500"
              >
                +91 88268 09123
              </a>
            </div>
          </div>
        </div>

        {/* Stats reassurance row — full-width below the 2-col block. */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-px bg-ink/10 max-w-[1080px] mx-auto rounded-2xl overflow-hidden border border-ink/10">
          {[
            { k: '8', l: 'Centres pan-India' },
            { k: '20+ years', l: 'In preventive medicine' },
            { k: '1000+', l: 'Biomarkers per patient' },
            { k: '3', l: 'Biological-age clocks' },
          ].map((s) => (
            <div
              key={s.l}
              className="bg-white px-5 py-6 text-center"
            >
              <div className="font-display font-bold text-[22px] md:text-[30px] text-rust leading-none mb-2 tabular-nums tracking-[-0.01em]">
                {s.k}
              </div>
              <div className="text-[10px] tracking-[0.28em] uppercase text-graphite font-semibold leading-[1.4]">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
