/**
 * BrochureCTA — split editorial card pairing a clinic photo with a
 * BOOK AN APPOINTMENT panel. Static (no GSAP) — fade-in handled by
 * the global IntersectionObserver in index.css.
 *
 * Source reference: theantiagingcentre.com "BOOK AN APPOINTMENT" form.
 */
export function BrochureCTA() {
  return (
    <section className="bg-cream/40 py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto bg-white text-ink grid md:grid-cols-[1.05fr_1fr] items-stretch overflow-hidden rounded-[28px] border border-mist shadow-[0_30px_80px_-50px_rgba(27,26,24,0.20)]">
        {/* Image side — clean, no overlay text */}
        <div className="relative aspect-[5/4] md:aspect-auto md:h-full bg-mist overflow-hidden md:m-3 md:rounded-[20px]">
          <img
            src="/clinic-photos/clinic-interior-1.jpg"
            alt="Inside a TLC clinic"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Content side */}
        <div className="p-9 md:p-14 lg:p-16 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-7 h-px bg-rust" />
            <span className="text-[11px] tracking-[0.32em] uppercase text-rust font-semibold">
              Request a Callback
            </span>
          </div>

          <h3 className="font-display font-bold text-[32px] md:text-[44px] lg:text-[52px] leading-[1.0] tracking-[-0.025em] text-ink mb-6">
            Begin with a conversation.
          </h3>

          <p className="text-[15px] md:text-[16px] leading-[1.7] text-graphite font-light max-w-[460px] mb-10">
            Speak with our anti-aging, metabolic or dermatology specialists about
            your goals. No commitment. We'll call you back at a time that suits.
          </p>

          {/* Trust strip — three pills */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {['30-minute call', 'No commitment', 'Specialist-led'].map((p) => (
              <span
                key={p}
                className="inline-flex items-center text-[10.5px] tracking-[0.22em] uppercase text-graphite font-medium px-3.5 py-2 rounded-full bg-cream border border-mist"
              >
                {p}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/contact"
              data-cursor="hover"
              data-magnetic
              className="group inline-flex items-center gap-3 pl-5 pr-7 py-4 bg-ink text-white text-[11.5px] tracking-[0.2em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
              </span>
              Request a Callback
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0"
              data-cursor="hover"
              className="inline-flex items-center gap-2 px-6 py-4 border border-ink/15 text-ink text-[11.5px] tracking-[0.2em] font-semibold uppercase rounded-full hover:border-ink hover:bg-ink hover:text-white transition-colors duration-500"
            >
              WhatsApp
            </a>
          </div>

          <div className="mt-7 text-[12px] text-stone tracking-tight">
            Or call directly:{' '}
            <a
              href="tel:+918826809123"
              data-cursor="hover"
              className="text-ink font-medium hover:text-rust transition-colors duration-300"
            >
              +91 88268 09123
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

