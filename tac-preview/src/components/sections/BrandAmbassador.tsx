/**
 * BrandAmbassador — shared Milind Soman feature section.
 *
 * Single reusable block so the mandatory '· BRAND AMBASSADOR · TLC'
 * attribution and the editorial Milind feature can sit on every page
 * without duplicating markup. Light cream surface that reads cleanly
 * whether it follows light or dark content; drop it in just before a
 * page's final CTA / footer.
 *
 * Pages with a bespoke page-specific Milind section (Programmes index,
 * Skin & Aesthetics, Centres, About, Home/Journey) keep their own
 * tailored copy and do NOT use this component.
 */
export function BrandAmbassador() {
  return (
    <section className="relative bg-cream/50 px-6 md:px-12 py-16 md:py-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 600px at 20% 25%, rgba(148,84,85,0.06), transparent 60%), radial-gradient(800px 500px at 85% 80%, rgba(238,230,219,0.6), transparent 60%)',
        }}
      />
      <div className="relative z-10 max-w-[1240px] mx-auto grid md:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-16 lg:gap-20 items-center">
        {/* Portrait card with mandatory attribution badge.
            object-cover at the image's near-native ~16:10 ratio: the
            source is a 16:9 white-studio shot with Milind centred and
            wide white margins, so cover only trims the empty side
            margin — he is never clipped — and there's no pillarbox.
            A soft dark bottom scrim keeps the white caption legible
            over his (navy) jacket. */}
        <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-white shadow-[0_30px_70px_-32px_rgba(27,26,24,0.30)]">
          <img
            src="/longevity/milind-skin.webp"
            alt="Milind Soman — Brand Ambassador, The Longevity Centre"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-rust text-white px-3.5 py-1.5 rounded-full shadow-[0_8px_22px_-10px_rgba(27,26,24,0.45)]">
            <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
            <span className="text-[9.5px] md:text-[10px] tracking-[0.26em] uppercase font-semibold">
              Brand Ambassador &middot; TLC
            </span>
          </div>
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(27,26,24,0.55) 0%, rgba(27,26,24,0) 100%)',
            }}
          />
          <div className="absolute bottom-4 left-5 right-5">
            <div className="font-display italic text-white text-[18px] md:text-[22px] leading-[1.15]">
              Milind Soman
            </div>
            <div className="text-[9.5px] tracking-[0.3em] uppercase text-white/75 font-semibold mt-1">
              Actor &middot; Supermodel &middot; Ironman
            </div>
          </div>
        </div>

        {/* Copy */}
        <div>
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-rust" />
            <span className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold">
              Our Brand Ambassador
            </span>
          </div>
          <h2 className="font-display font-light text-[28px] md:text-[42px] xl:text-[50px] leading-[1.06] tracking-[-0.03em] text-ink mb-5">
            Age is a number,{' '}
            <span className="font-bold italic text-rust">not a limit.</span>
          </h2>
          <p className="text-[14.5px] md:text-[16px] leading-[1.75] text-graphite font-light max-w-[540px] mb-5">
            At 58, Milind Soman is the clearest proof of what TLC stands for —
            that strength, clarity and vitality are not surrendered to age,
            they are maintained by intention. He completed an Ironman triathlon
            at 50 and remains measurably fitter than most men half his age.
          </p>
          <p className="font-display italic text-rust text-[16px] md:text-[19px] leading-[1.45] mb-7 max-w-[500px]">
            &ldquo;Strength isn&rsquo;t something you lose with age — it&rsquo;s
            something you choose to keep.&rdquo;
          </p>
          <a
            href="/contact"
            data-cursor="hover"
            data-magnetic
            className="group inline-flex items-center gap-3 pl-5 pr-7 py-3.5 bg-ink text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
          >
            Begin Your Journey
            <span
              aria-hidden
              className="inline-block transition-transform duration-500 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
