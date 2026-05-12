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
        {/* Inspiration block — Milind Soman as an editorial visual
            anchor for the "Age should never define you" headline below.
            Small framed portrait, centred, with a single italic line
            tying him to the CTA. Site-wide consistency: this is the
            one and only celebrity face on the site, appearing once
            per page through the shared CtaBand. */}
        <div className="flex flex-col items-center mb-10 md:mb-12">
          <div className="relative w-[112px] h-[112px] md:w-[128px] md:h-[128px] rounded-full overflow-hidden ring-1 ring-rust/30 shadow-[0_18px_40px_-22px_rgba(27,26,24,0.30)]">
            <img
              src="/longevity/milind-soman.jpg"
              alt="Milind Soman — Indian icon of fitness and longevity"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center 22%' }}
            />
          </div>
          <div className="mt-4 text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold">
            What ageing well looks like
          </div>
          <p className="mt-2 font-display italic text-ink text-[15px] md:text-[17px] leading-[1.4]">
            Milind Soman <span className="text-stone/70 not-italic font-light">&middot; 58</span>
          </p>
        </div>

        {/* Eyebrow row */}
        <div className="flex items-center justify-center gap-3 mb-7">
          <span className="w-7 h-px bg-rust" />
          <span className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold">
            Begin Your Programme
          </span>
          <span className="w-7 h-px bg-rust" />
        </div>

        {/* Headline — ink with rust accent on the verb */}
        <h2 className="font-display font-light text-[34px] md:text-[56px] xl:text-[68px] leading-[1.02] tracking-[-0.035em] text-ink text-center mb-6 max-w-[1080px] mx-auto">
          Age should never{' '}
          <span className="font-bold text-rust">define you.</span>
        </h2>

        {/* Sub */}
        <p className="text-[15px] md:text-[17px] text-graphite max-w-[620px] mx-auto leading-[1.7] mb-10 text-center font-light">
          Speak with our medical team for a 30-minute personalised conversation.
          No commitment. Just clarity. Available across our eight clinics in
          Delhi, Gurgaon, Mumbai, Pune, Nagpur, Goa, Hyderabad and Bangalore.
        </p>

        {/* CTA — three contact paths in pill form */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
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
