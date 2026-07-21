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
 * Skin & Aesthetics, Centres, About) keep their own tailored copy and
 * do NOT use this component. Home uses this shared block as its
 * "above the fold" brand-ambassador feature (slot #2, right after the
 * Hero), and CtaBand.withPortrait carries the bottom form-attached
 * portrait — two distinct contexts, not a duplicate.
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
        {/* Portrait — framed editorial card. The studio photo has a
            white backdrop, so it sits inside a soft light-gradient
            card with a hairline ring + a SOLID dark caption band
            beneath (no murky gradient bleeding over the white). Reads
            as a deliberate, premium framed portrait on any surface. */}
        <figure className="relative rounded-[22px] overflow-hidden ring-1 ring-ink/10 shadow-[0_40px_85px_-38px_rgba(27,26,24,0.4)] bg-gradient-to-b from-white to-[#efe7dd]">
          <div className="relative aspect-[16/11]">
            <img
              src="/longevity/milind-skin.webp?v=3"
              width={1000}
              height={660}
              alt="Milind Soman — Brand Ambassador, The Longevity Centre"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-rust text-white px-3.5 py-1.5 rounded-full shadow-[0_8px_22px_-10px_rgba(27,26,24,0.45)]">
              <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
              <span className="text-[9.5px] md:text-[10px] tracking-[0.26em] uppercase font-semibold">
                Brand Ambassador &middot; TLC
              </span>
            </div>
          </div>
          <figcaption className="flex items-center gap-4 bg-ink px-5 md:px-6 py-4 md:py-5 border-t border-white/10">
            <span aria-hidden className="w-8 h-px bg-rust-soft shrink-0" />
            <div>
              <div className="font-display italic text-white text-[17px] md:text-[21px] leading-[1.15]">
                Milind Soman
              </div>
              <div className="text-[9px] md:text-[9.5px] tracking-[0.3em] uppercase text-white/55 font-semibold mt-1.5">
                Actor &middot; Supermodel &middot; Ironman
              </div>
            </div>
          </figcaption>
        </figure>

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
            At 60, Milind Soman is the clearest proof of what TLC stands for —
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
