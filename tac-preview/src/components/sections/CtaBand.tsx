/**
 * CtaBand — site signature CTA band on white. Editorial bottom-of-page
 * "Begin your programme" surface used across every page.
 *
 * No GSAP — animations on this section come from the global fade-up
 * observer in index.css. Keeping it static makes it a safe drop-in
 * footer-of-page component for every route.
 */
export function CtaBand() {
  return (
    <section
      id="cta"
      className="relative bg-white py-20 md:py-28 px-6 md:px-12 overflow-hidden"
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

      <div className="relative z-10 max-w-[1180px] mx-auto">
        {/* Editorial two-column block — Milind portrait left as a
            full-height visual anchor, CTA content right. On mobile
            the portrait stacks above the content. */}
        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-14 lg:gap-20 items-stretch mb-14 md:mb-16">
          {/* Milind portrait — large editorial card */}
          <div className="relative rounded-[18px] overflow-hidden bg-cream shadow-[0_30px_60px_-30px_rgba(27,26,24,0.32)] aspect-[4/5] md:aspect-auto md:min-h-[520px]">
            <img
              src="/longevity/milind-soman.jpg"
              alt="Milind Soman — Indian icon of fitness and longevity"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center 22%' }}
            />
            {/* Soft bottom shade — keeps the caption legible without
                heavy black ink across the portrait. */}
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

          {/* CTA content column */}
          <div className="flex flex-col justify-center text-center md:text-left">
            {/* Eyebrow */}
            <div className="flex items-center justify-center md:justify-start gap-3 mb-5">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold">
                Begin Your Programme
              </span>
            </div>

            {/* Headline — slightly tighter scale than before so it
                sits comfortably alongside the portrait. */}
            <h2 className="font-display font-light text-[34px] md:text-[48px] xl:text-[58px] leading-[1.02] tracking-[-0.03em] text-ink mb-5 md:mb-6">
              Age should never{' '}
              <span className="font-bold text-rust">define you.</span>
            </h2>

            {/* Sub */}
            <p className="text-[15px] md:text-[16.5px] text-graphite max-w-[520px] mx-auto md:mx-0 leading-[1.7] mb-8 md:mb-10 font-light">
              Speak with our medical team for a 30-minute personalised
              conversation. No commitment. Just clarity. Available across our
              eight clinics in Delhi, Gurgaon, Mumbai, Pune, Nagpur, Goa,
              Hyderabad and Bangalore.
            </p>

            {/* CTA — three contact paths in pill form */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href="/contact"
                data-cursor="hover"
                data-magnetic
                className="group inline-flex items-center gap-3 pl-5 pr-7 py-4 bg-rust text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-ink transition-colors duration-500"
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
                className="inline-flex items-center gap-2 px-6 py-4 border border-ink/15 text-ink text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:border-rust hover:text-rust transition-colors duration-500"
              >
                WhatsApp
              </a>
              <a
                href="tel:+918826809123"
                data-cursor="hover"
                className="inline-flex items-center gap-2 px-6 py-4 border border-ink/15 text-ink text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:border-rust hover:text-rust transition-colors duration-500"
              >
                +91 88268 09123
              </a>
            </div>
          </div>
        </div>

        {/* Reassurance row — stacks on mobile so 3 cells don't compress
            below 110px each. Hairline grid pattern on tablet and up. */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-px bg-ink/10 max-w-[1080px] mx-auto rounded-2xl overflow-hidden border border-ink/10">
          {[
            { k: '8', l: 'Centres pan-India' },
            { k: '20+ years', l: 'In preventive medicine' },
            { k: '1000+', l: 'Biomarkers per patient' },
            { k: '3', l: 'Biological ages — Epigenetic · Blood · Gut' },
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
