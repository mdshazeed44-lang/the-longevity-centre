/**
 * BrandAmbassadorHero — homepage-only premium showcase of Milind Soman.
 *
 * Sits in the homepage's site palette (warm cream + rust accents),
 * NOT a dark/cinematic break. Designed to read as a refined editorial
 * feature — magazine spread on the brand's existing cream surface —
 * rather than a loud celebrity-billboard moment.
 *
 * Differences from the shared <BrandAmbassador />:
 *   - Slightly larger portrait card with warm cream/tan gradient
 *   - Hairline rust ornaments and rust-toned numerals
 *   - 4-stat credibility strip (Age · First Ironman · Mr. India ·
 *     TLC Ambassador) sitting on cream with thin rust hairline
 *   - Editorial pull-quote in display serif italic
 *   - Tighter typographic scale (no 70px headlines) so it stays in
 *     proportion with Hero above and BenefitsHome below
 *
 * Used ONLY on HomePage. The shared <BrandAmbassador /> remains the
 * supporting block on Skin Aesthetics, Centres, Programs, About.
 */
export function BrandAmbassadorHero() {
  return (
    <section className="relative bg-cream overflow-hidden">
      {/* Soft warm tinted glow — cream warming to a faint rust tint at
          one corner. Stays in the site palette, no dark break. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 600px at 18% 25%, rgba(148,84,85,0.07), transparent 60%), radial-gradient(700px 500px at 88% 85%, rgba(193,141,107,0.10), transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Eyebrow — sits above the whole spread, magazine-section
            style. Centered on mobile, left-aligned on desktop. */}
        <div className="flex items-center gap-3 mb-10 md:mb-12">
          <span className="w-10 h-px bg-rust" />
          <span className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold">
            Our Brand Ambassador
          </span>
        </div>

        <div className="grid md:grid-cols-[0.95fr_1.05fr] gap-10 md:gap-14 lg:gap-20 items-center">
          {/* Portrait — editorial framed card, slightly more refined
              than the shared component (deeper shadow, warmer gradient,
              thinner ornament strip on top). The studio photo sits on
              a white→tan gradient so the white backdrop doesn't read
              as a hard rectangle. */}
          <figure className="relative">
            {/* Thin rust hairline at the top — premium magazine cue */}
            <span
              aria-hidden
              className="absolute -top-3 left-0 w-12 h-px bg-rust"
            />
            <div className="relative rounded-[18px] overflow-hidden ring-1 ring-ink/10 shadow-[0_45px_90px_-40px_rgba(27,26,24,0.32)] bg-gradient-to-b from-white via-[#f6ede1] to-[#ead9c5]">
              <div className="relative aspect-[4/5]">
                <img
                  src="/longevity/milind-skin.webp?v=3"
                  width={1000}
                  height={1250}
                  alt="Milind Soman — Brand Ambassador, The Longevity Centre"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* Mandatory brand-ambassador badge — bottom-left,
                    same rust pill used site-wide for consistency. */}
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-rust text-white px-3.5 py-1.5 rounded-full shadow-[0_8px_22px_-10px_rgba(27,26,24,0.45)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
                  <span className="text-[9.5px] md:text-[10px] tracking-[0.26em] uppercase font-semibold">
                    Brand Ambassador &middot; TLC
                  </span>
                </div>
              </div>
              {/* Caption strip — dark ink band beneath the portrait
                  carries the name + role typography. */}
              <figcaption className="flex items-center gap-4 bg-ink px-5 md:px-6 py-4 md:py-5">
                <span aria-hidden className="w-8 h-px bg-rust-soft shrink-0" />
                <div>
                  <div className="font-display italic text-white text-[17px] md:text-[20px] leading-[1.15]">
                    Milind Soman
                  </div>
                  <div className="text-[9px] md:text-[9.5px] tracking-[0.3em] uppercase text-white/55 font-semibold mt-1.5">
                    Actor &middot; Supermodel &middot; Ironman
                  </div>
                </div>
              </figcaption>
            </div>
          </figure>

          {/* Copy — editorial typography in site scale */}
          <div>
            <h2 className="font-display font-light text-[30px] md:text-[42px] xl:text-[50px] leading-[1.04] tracking-[-0.025em] text-ink mb-6">
              Age is a number,{' '}
              <span className="font-bold italic text-rust">not a limit.</span>
            </h2>

            <p className="text-[14.5px] md:text-[16px] leading-[1.75] text-graphite font-light max-w-[520px] mb-6">
              At 58, Milind Soman is the clearest proof of what TLC stands
              for — that strength, clarity and vitality are not surrendered
              to age, they are maintained by intention. He completed an
              Ironman triathlon at 50 and remains measurably fitter than
              most men half his age.
            </p>

            <blockquote className="relative pl-5 md:pl-6 border-l-2 border-rust mb-7">
              <p className="font-display italic text-rust text-[16px] md:text-[19px] leading-[1.45] max-w-[480px]">
                &ldquo;Strength isn&rsquo;t something you lose with age — it&rsquo;s
                something you choose to keep.&rdquo;
              </p>
            </blockquote>

            <a
              href="/contact"
              data-cursor="hover"
              data-magnetic
              className="group inline-flex items-center gap-3 pl-5 pr-7 py-3.5 bg-ink text-white text-[11px] md:text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
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

        {/* Stats strip — 4 credibility markers spanning full width on
            cream, hairline rust divider on top, rust numerals. Stays
            in the editorial vocabulary, no dark break. */}
        <div className="mt-14 md:mt-16 pt-9 md:pt-10 border-t border-ink/12">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
            <div>
              <dt className="font-display font-light text-rust text-[34px] md:text-[44px] leading-none tracking-[-0.02em]">
                58
              </dt>
              <dd className="mt-2.5 text-[9.5px] md:text-[10.5px] tracking-[0.3em] uppercase text-graphite/75 font-semibold">
                Age Today
              </dd>
            </div>
            <div>
              <dt className="font-display font-light text-rust text-[34px] md:text-[44px] leading-none tracking-[-0.02em]">
                50
              </dt>
              <dd className="mt-2.5 text-[9.5px] md:text-[10.5px] tracking-[0.3em] uppercase text-graphite/75 font-semibold">
                First Ironman At
              </dd>
            </div>
            <div>
              <dt className="font-display font-light text-rust text-[34px] md:text-[44px] leading-none tracking-[-0.02em]">
                1995
              </dt>
              <dd className="mt-2.5 text-[9.5px] md:text-[10.5px] tracking-[0.3em] uppercase text-graphite/75 font-semibold">
                Mr. India
              </dd>
            </div>
            <div>
              <dt className="font-display italic font-light text-rust text-[24px] md:text-[30px] leading-[1.05] tracking-[-0.01em] pt-2 md:pt-3">
                TLC
              </dt>
              <dd className="mt-2.5 text-[9.5px] md:text-[10.5px] tracking-[0.3em] uppercase text-graphite/75 font-semibold">
                Brand Ambassador
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
