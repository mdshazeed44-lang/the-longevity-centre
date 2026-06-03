/**
 * BrandAmbassadorHero — homepage-only premium showcase of Milind Soman.
 *
 * The shared <BrandAmbassador /> in this folder is a "between sections"
 * supporting block used on Skin Aesthetics / Centres / Programs / About.
 * This component is the CINEMATIC DARK SHOWCASE variant — designed to
 * sit immediately after the Hero on the homepage, treating Milind as a
 * proper celebrity endorsement moment rather than just another card.
 *
 * Differences from the shared component:
 *   - Full-width dark ink (#1B1A18) section, not cream
 *   - Edge-bleeding portrait, no framed card, no border-radius on image
 *   - Larger typography (48–80px headline)
 *   - Stats strip across the bottom (Age · First Ironman · Mr. India ·
 *     TLC Ambassador) — four credibility markers
 *   - Premium magazine-cover feel, not editorial-card feel
 *
 * The mandatory "BRAND AMBASSADOR · TLC" attribution badge is preserved.
 * Used ONLY on HomePage.
 */
export function BrandAmbassadorHero() {
  return (
    <section className="relative bg-ink text-cream overflow-hidden">
      {/* Subtle rust glow + film grain texture so the dark section
          reads as cinematic rather than flat. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(1000px 700px at 18% 30%, rgba(148,84,85,0.18), transparent 65%), radial-gradient(900px 600px at 85% 80%, rgba(193,141,107,0.08), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 lg:gap-24 items-center">
          {/* Portrait — edge-bleeding, no card frame. Sits on the dark
              section as a magazine-style portrait. Soft inset gradient
              on the bottom edge marries it to the section bg. */}
          <figure className="relative">
            <div className="relative aspect-[5/6] md:aspect-[4/5] rounded-[2px] overflow-hidden">
              <img
                src="/longevity/milind-skin.webp?v=3"
                width={1200}
                height={1500}
                alt="Milind Soman — Brand Ambassador, The Longevity Centre"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              {/* Bottom-fade so the portrait melts into the dark bg */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent 0%, rgba(27,26,24,0.85) 100%)',
                }}
              />
              {/* Mandatory attribution badge */}
              <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 bg-rust text-white px-4 py-2 rounded-full shadow-[0_8px_22px_-10px_rgba(0,0,0,0.7)]">
                <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
                <span className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase font-semibold">
                  Brand Ambassador &middot; TLC
                </span>
              </div>
              {/* Subtle name overlay bottom-right — magazine credit style */}
              <div className="absolute bottom-5 right-5 text-right">
                <div className="font-display italic text-white text-[18px] md:text-[22px] leading-none">
                  Milind Soman
                </div>
                <div className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-white/65 font-semibold mt-1.5">
                  Actor &middot; Supermodel &middot; Ironman
                </div>
              </div>
            </div>
          </figure>

          {/* Copy — bigger editorial typography for the homepage spot */}
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-rust" />
              <span className="text-[10.5px] md:text-[11.5px] tracking-[0.45em] uppercase text-rust font-semibold">
                Our Brand Ambassador
              </span>
            </div>

            <h2 className="font-display font-light text-[40px] md:text-[64px] xl:text-[78px] leading-[0.98] tracking-[-0.035em] text-cream mb-7">
              Age is a number,{' '}
              <span className="font-bold italic text-rust-soft">
                not a limit.
              </span>
            </h2>

            <p className="text-[15px] md:text-[17px] leading-[1.75] text-cream/75 font-light max-w-[540px] mb-7">
              At 58, Milind Soman is the clearest proof of what TLC stands
              for — that strength, clarity and vitality are not surrendered
              to age, they are maintained by intention. He completed an
              Ironman triathlon at 50 and remains measurably fitter than
              most men half his age.
            </p>

            <p className="font-display italic text-rust-soft text-[18px] md:text-[22px] leading-[1.4] mb-8 max-w-[520px]">
              &ldquo;Strength isn&rsquo;t something you lose with age — it&rsquo;s
              something you choose to keep.&rdquo;
            </p>

            <a
              href="/contact"
              data-cursor="hover"
              data-magnetic
              className="group inline-flex items-center gap-3 pl-6 pr-8 py-4 bg-rust text-white text-[11.5px] md:text-[12px] tracking-[0.24em] font-semibold uppercase rounded-full hover:bg-cream hover:text-ink transition-colors duration-500"
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

        {/* Stats strip — 4 credibility markers spanning full width.
            Hairline rust divider on top so it reads as a separate band
            without breaking the section. */}
        <div className="mt-14 md:mt-20 pt-10 md:pt-12 border-t border-cream/12">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
            <div>
              <dt className="font-display font-light text-cream text-[44px] md:text-[60px] leading-none tracking-[-0.02em]">
                58
              </dt>
              <dd className="mt-3 text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-cream/55 font-semibold">
                Age Today
              </dd>
            </div>
            <div>
              <dt className="font-display font-light text-cream text-[44px] md:text-[60px] leading-none tracking-[-0.02em]">
                50
              </dt>
              <dd className="mt-3 text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-cream/55 font-semibold">
                First Ironman At
              </dd>
            </div>
            <div>
              <dt className="font-display font-light text-cream text-[44px] md:text-[60px] leading-none tracking-[-0.02em]">
                1995
              </dt>
              <dd className="mt-3 text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-cream/55 font-semibold">
                Mr. India
              </dd>
            </div>
            <div>
              <dt className="font-display font-light text-rust-soft text-[28px] md:text-[36px] leading-[1] tracking-[-0.01em] pt-3 md:pt-5">
                TLC
              </dt>
              <dd className="mt-3 text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-cream/55 font-semibold">
                Brand Ambassador
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
