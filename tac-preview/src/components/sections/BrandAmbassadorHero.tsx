/**
 * BrandAmbassadorHero — homepage-only premium showcase of Milind Soman.
 *
 * Sits in the homepage's site palette (warm cream + rust accents),
 * NOT a dark/cinematic break. Designed to read as a refined editorial
 * feature — magazine spread on the brand's existing cream surface —
 * rather than a loud celebrity-billboard moment.
 *
 * Sized to fit within a single viewport (min-h-[100svh]) so the user
 * sees the full ambassador moment without scrolling. Uses flex
 * centering so the content sits in the middle of the available
 * height regardless of viewport size.
 *
 * Used ONLY on HomePage. The shared <BrandAmbassador /> remains the
 * supporting block on Skin Aesthetics, Centres, Programs, About.
 */
interface Props {
  /** Optional click handler for the "Begin Your Journey" CTA. When
   *  provided, the CTA renders as a <button> calling onCtaClick
   *  AND a secondary "Call Now" pill is added next to it (used by
   *  the ad LP to offer both form + phone channels). When omitted
   *  (homepage usage), the CTA renders as the original
   *  <a href="/contact"> only — no phone pill. */
  onCtaClick?: () => void
}

// Ad-LP phone number — only rendered when this component is used
// in callback mode (onCtaClick passed). Hardcoded here so the
// shared component doesn't have to depend on lib/contact when
// the homepage uses it.
const PHONE_TEL = '+918826809123'
const PHONE_DISPLAY = '+91 88268 09123'

export function BrandAmbassadorHero({ onCtaClick }: Props = {}) {
  return (
    <section className="relative bg-cream overflow-hidden min-h-[100svh] flex items-center">
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

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 md:px-12 py-8 md:py-10">
        {/* Eyebrow — sits above the whole spread, magazine-section
            style. */}
        <div className="flex items-center gap-3 mb-6 md:mb-7">
          <span className="w-9 h-px bg-rust" />
          <span className="text-[10px] md:text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold">
            Our Brand Ambassador
          </span>
        </div>

        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Portrait — editorial framed card. Aspect 3:4 (was 4:5) so
              it stays compact vertically — fits in viewport. */}
          <figure className="relative">
            {/* Thin rust hairline at the top — premium magazine cue */}
            <span
              aria-hidden
              className="absolute -top-2.5 left-0 w-10 h-px bg-rust"
            />
            <div className="relative rounded-[16px] overflow-hidden ring-1 ring-ink/10 shadow-[0_35px_75px_-38px_rgba(27,26,24,0.32)] bg-gradient-to-b from-white to-[#efe7dd]">
              {/* Aspect 16:11 matches the source image (1000×660) — using
                  any portrait ratio would leave Milind cropped to one
                  side of the frame and show empty studio backdrop. */}
              <div className="relative aspect-[16/11]">
                <img
                  src="/longevity/milind-skin.webp?v=3"
                  width={1000}
                  height={660}
                  alt="Milind Soman — Brand Ambassador, The Longevity Centre"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* Mandatory brand-ambassador badge — bottom-left,
                    same rust pill used site-wide for consistency. */}
                <div className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-2 bg-rust text-white px-3 py-1.5 rounded-full shadow-[0_8px_22px_-10px_rgba(27,26,24,0.45)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
                  <span className="text-[9px] md:text-[9.5px] tracking-[0.26em] uppercase font-semibold">
                    Brand Ambassador &middot; TLC
                  </span>
                </div>
              </div>
              {/* Caption strip — dark ink band beneath the portrait
                  carries the name + role typography. Compact padding
                  so the figure stays short overall. */}
              <figcaption className="flex items-center gap-3 bg-ink px-4 md:px-5 py-3 md:py-3.5">
                <span aria-hidden className="w-6 h-px bg-rust-soft shrink-0" />
                <div>
                  <div className="font-display italic text-white text-[15px] md:text-[18px] leading-[1.15]">
                    Milind Soman
                  </div>
                  <div className="text-[8.5px] md:text-[9px] tracking-[0.3em] uppercase text-white/55 font-semibold mt-1">
                    Actor &middot; Supermodel &middot; Ironman
                  </div>
                </div>
              </figcaption>
            </div>
          </figure>

          {/* Copy — editorial typography, scaled down so the whole
              section fits viewport. */}
          <div>
            <h2 className="font-display font-light text-[26px] md:text-[36px] xl:text-[44px] leading-[1.04] tracking-[-0.025em] text-ink mb-4 md:mb-5">
              Age is a number,{' '}
              <span className="font-bold italic text-rust">not a limit.</span>
            </h2>

            <p className="text-[13.5px] md:text-[15px] leading-[1.7] text-graphite font-light max-w-[500px] mb-4 md:mb-5">
              At 60, Milind Soman is the clearest proof of what TLC stands
              for — strength, clarity and vitality are not surrendered to
              age, they are maintained by intention.
            </p>

            <blockquote className="relative pl-4 md:pl-5 border-l-2 border-rust mb-5 md:mb-6">
              <p className="font-display italic text-rust text-[14.5px] md:text-[17px] leading-[1.45] max-w-[460px]">
                &ldquo;Strength isn&rsquo;t something you lose with age — it&rsquo;s
                something you choose to keep.&rdquo;
              </p>
            </blockquote>

            {onCtaClick ? (
              // Ad LP — twin pills: form (primary) + phone (secondary)
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onCtaClick}
                  data-cursor="hover"
                  data-magnetic
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-ink text-white text-[10.5px] md:text-[11px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
                >
                  <span>Begin Your Journey</span>
                  <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                </button>
                <a
                  href={`tel:${PHONE_TEL}`}
                  data-cursor="hover"
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white border border-ink/15 text-ink text-[10.5px] md:text-[11px] tracking-[0.22em] font-semibold uppercase rounded-full hover:border-rust hover:text-rust transition-colors duration-500"
                  aria-label={`Call ${PHONE_DISPLAY}`}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Call Now</span>
                </a>
              </div>
            ) : (
              <a
                href="/contact"
                data-cursor="hover"
                data-magnetic
                className="group inline-flex items-center gap-3 pl-4 pr-6 py-3 bg-ink text-white text-[10.5px] md:text-[11px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
              >
                Begin Your Journey
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            )}
          </div>
        </div>

        {/* Stats strip — compact 4-stat credibility row, sits tight
            beneath the spread so the whole section fits in one
            viewport. Hairline rust/ink divider on top. */}
        <div className="mt-8 md:mt-9 pt-6 md:pt-7 border-t border-ink/12">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-5">
            <div>
              <dt className="font-display font-light text-rust text-[26px] md:text-[34px] leading-none tracking-[-0.02em]">
                60
              </dt>
              <dd className="mt-1.5 text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-graphite/75 font-semibold">
                Age Today
              </dd>
            </div>
            <div>
              <dt className="font-display font-light text-rust text-[26px] md:text-[34px] leading-none tracking-[-0.02em]">
                50
              </dt>
              <dd className="mt-1.5 text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-graphite/75 font-semibold">
                First Ironman At
              </dd>
            </div>
            <div>
              <dt className="font-display font-light text-rust text-[26px] md:text-[34px] leading-none tracking-[-0.02em]">
                1995
              </dt>
              <dd className="mt-1.5 text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-graphite/75 font-semibold">
                Mr. India
              </dd>
            </div>
            <div>
              <dt className="font-display italic font-light text-rust text-[20px] md:text-[24px] leading-[1.05] tracking-[-0.01em] pt-1 md:pt-2">
                TLC
              </dt>
              <dd className="mt-1.5 text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-graphite/75 font-semibold">
                Brand Ambassador
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
