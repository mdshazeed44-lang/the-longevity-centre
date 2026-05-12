// Journey — homepage scroll-pinned 3-act story section. Past · Present
// · Future, told as a single cinematic moment: section is 220vh tall,
// inner content uses CSS sticky to pin against the viewport while the
// outer section scrolls, and a GSAP timeline crossfades the three acts
// as scroll progress advances. A horizontal timeline at the top tracks
// the user's position; a giant era numeral morphs between acts.
//
// Reduced motion: acts are rendered as a clean stacked layout, no pin,
// no crossfade — every act fully readable in document order.
//
// Lenis-friendly: we don't use ScrollTrigger's `pin` (which can fight
// virtual-scroll libraries). Instead the outer section is tall and the
// inner container is CSS-sticky — ScrollTrigger just reads progress.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../../lib/motion'

gsap.registerPlugin(ScrollTrigger)

type Act = {
  era: string
  year: string
  headline: string
  lede: string
  body: string
  bullets: string[]
}

const ACTS: Act[] = [
  {
    era: 'Origins',
    year: '2019',
    headline: 'Where it began.',
    lede: 'India deserves more centenarians.',
    body: 'We opened our first centre with one conviction — that modern medicine was arriving too late. We built India’s first doctor-led longevity clinic to read the body in full, before symptoms ever spoke.',
    bullets: [
      'First TLC centre opens in Delhi',
      'Diagnostics-first preventive philosophy',
      'Bridging ancient Indian wisdom with modern medicine',
    ],
  },
  {
    era: 'Today',
    year: '2026',
    headline: 'Where we stand.',
    lede: 'Eight centres. A thousand biomarkers. One promise.',
    body: 'TLC operates pan-India with eight clinics, 1000+ biomarkers per patient and three biological-age clocks. Patients across Delhi, Gurgaon, Pune, Bangalore, Mumbai, Nagpur, Goa and Hyderabad are now measured, not managed.',
    bullets: [
      '8 centres across India',
      '1000+ biomarkers per patient',
      '3 biological-age clocks · Epigenetic · Blood · Gut',
      'European laboratory partnership (Netherlands)',
    ],
  },
  {
    era: 'Tomorrow',
    year: '2030+',
    headline: 'Where we’re headed.',
    lede: 'A generation that ages on its own terms.',
    body: 'AI-personalised longevity protocols. Twenty-five centres across South Asia. A national database of biological-age data that lets us prevent disease at the population level — and turn the longevity gap between India and the world into a longevity lead.',
    bullets: [
      '25+ centres across South Asia',
      'AI-personalised longevity protocols',
      'Population-scale biological-age research',
      'A generation of active centenarians',
    ],
  },
]

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const actsRef = useRef<HTMLDivElement[]>([])
  const numeralRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement[]>([])
  const eraLabelRef = useRef<HTMLDivElement>(null)

  // Attach refs to each act node — used by GSAP for cross-fading.
  const setActRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) actsRef.current[i] = el
  }
  const setDotRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) dotsRef.current[i] = el
  }

  useEffect(() => {
    if (!sectionRef.current) return

    // Reduced-motion / mobile: no pin, no crossfade — show all acts
    // statically stacked in document order. The CSS handles this via
    // the `md:` breakpoint and the `reduce-motion` data attribute.
    if (reduceMotion()) return

    const mm = gsap.matchMedia()
    // Only run the cinematic pin on tablet/desktop where the user has
    // viewport height to spare. Mobile gets the stacked fallback.
    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        // Initial state — only act 0 visible, act 1+2 below the fold.
        gsap.set(actsRef.current[1], { autoAlpha: 0, y: 40 })
        gsap.set(actsRef.current[2], { autoAlpha: 0, y: 40 })
        gsap.set(dotsRef.current[1], { scale: 0.4, opacity: 0.4 })
        gsap.set(dotsRef.current[2], { scale: 0.4, opacity: 0.4 })

        // One scrubbed timeline driven by the outer section's
        // scroll progress (0 → 1 over its full 220vh height).
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
          },
          defaults: { ease: 'power2.inOut' },
        })

        // Acts 1 → 2 (between 30% and 45% of scroll)
        tl.to(actsRef.current[0], { autoAlpha: 0, y: -40, duration: 0.12 }, 0.30)
          .to(actsRef.current[1], { autoAlpha: 1, y: 0, duration: 0.14 }, 0.32)
          .to(numeralRef.current, {
            innerHTML: ACTS[1].year,
            duration: 0,
          }, 0.36)
          .to(eraLabelRef.current, {
            innerHTML: ACTS[1].era,
            duration: 0,
          }, 0.36)
          .to(dotsRef.current[0], { scale: 0.4, opacity: 0.4, duration: 0.1 }, 0.32)
          .to(dotsRef.current[1], { scale: 1, opacity: 1, duration: 0.12 }, 0.32)

        // Acts 2 → 3 (between 65% and 80%)
        tl.to(actsRef.current[1], { autoAlpha: 0, y: -40, duration: 0.12 }, 0.65)
          .to(actsRef.current[2], { autoAlpha: 1, y: 0, duration: 0.14 }, 0.67)
          .to(numeralRef.current, {
            innerHTML: ACTS[2].year,
            duration: 0,
          }, 0.71)
          .to(eraLabelRef.current, {
            innerHTML: ACTS[2].era,
            duration: 0,
          }, 0.71)
          .to(dotsRef.current[1], { scale: 0.4, opacity: 0.4, duration: 0.1 }, 0.67)
          .to(dotsRef.current[2], { scale: 1, opacity: 1, duration: 0.12 }, 0.67)

        // Progress bar grows linearly from 0 to 100% across the
        // full scroll — sits at the top of the pinned content.
        tl.fromTo(
          progressBarRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'none' },
          0,
        )

        // Background “breathing” — a subtle blob drifts as we
        // scroll, giving the static dark surface a sense of life.
        const blob = sectionRef.current?.querySelector('[data-bg-blob]')
        if (blob) {
          tl.fromTo(
            blob,
            { xPercent: -10, yPercent: -5 },
            { xPercent: 10, yPercent: 5, duration: 1, ease: 'none' },
            0,
          )
        }
      }, sectionRef)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative bg-ink text-cream overflow-hidden md:h-[220vh] py-16 md:py-0"
    >
      {/* Layered ambient gradients — give the dark canvas depth without
          competing with the editorial typography. */}
      <div
        data-bg-blob
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(800px 600px at 25% 30%, rgba(148,84,85,0.18), transparent 60%), radial-gradient(700px 500px at 80% 75%, rgba(178,122,123,0.10), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          background:
            'repeating-linear-gradient(135deg, transparent 0, transparent 2px, rgba(238,230,219,0.6) 2px, rgba(238,230,219,0.6) 3px)',
        }}
      />

      {/* Inner pin — CSS sticky keeps it locked while the outer
          section scrolls through the GSAP timeline. Only sticky on
          md+ — mobile gets a natural stacked layout. */}
      <div className="md:sticky md:top-0 md:h-screen flex flex-col">
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12">
          <div className="max-w-[1240px] mx-auto w-full">
            {/* Section header */}
            <div className="mb-10 md:mb-14">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-rust-soft" />
                <span className="text-[11px] tracking-[0.42em] uppercase text-rust-soft font-semibold">
                  The Journey
                </span>
              </div>
              <h2 className="font-display font-light text-[30px] md:text-[44px] xl:text-[54px] leading-[1.05] tracking-[-0.025em] text-cream max-w-[820px]">
                From ancient wisdom to a{' '}
                <span className="font-bold italic text-rust-soft">longer tomorrow.</span>
              </h2>
            </div>

            {/* Horizontal progress timeline */}
            <div className="relative mb-12 md:mb-16 max-w-[680px]">
              {/* Track */}
              <div className="relative h-px bg-cream/15">
                <div
                  ref={progressBarRef}
                  className="absolute inset-y-0 left-0 right-0 bg-rust origin-left"
                  style={{ transform: 'scaleX(0)' }}
                />
              </div>
              {/* Dots */}
              <div className="absolute inset-x-0 -top-2 flex justify-between">
                {ACTS.map((a, i) => (
                  <div key={a.year} className="flex flex-col items-center">
                    <div
                      ref={setDotRef(i)}
                      className="w-4 h-4 rounded-full bg-rust ring-4 ring-ink"
                    />
                    <div className="mt-3 text-[10px] tracking-[0.32em] uppercase text-cream/60 font-semibold whitespace-nowrap">
                      {a.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main grid — era numeral left, act content right */}
            <div className="grid md:grid-cols-[0.7fr_1.3fr] gap-10 md:gap-16 items-start">
              {/* Era numeral + label — large display, morphs between
                  acts on desktop. Hidden on mobile where each act
                  block carries its own small era + year header. */}
              <div className="hidden md:block md:pt-2">
                <div
                  ref={eraLabelRef}
                  className="text-[11px] tracking-[0.42em] uppercase text-rust-soft font-semibold mb-3"
                >
                  {ACTS[0].era}
                </div>
                <div
                  ref={numeralRef}
                  className="font-display font-bold text-rust-soft leading-[0.85] tracking-[-0.04em] tabular-nums"
                  style={{ fontSize: 'clamp(80px, 12vw, 168px)' }}
                >
                  {ACTS[0].year}
                </div>
              </div>

              {/* Act content stack — all three acts are rendered in
                  the same grid cell. On md+ they are absolutely
                  positioned on top of each other and GSAP toggles
                  visibility/opacity. On mobile they sit in normal
                  document flow, stacked with spacing, all visible. */}
              <div className="relative space-y-12 md:space-y-0 md:min-h-[360px]">
                {ACTS.map((act, i) => (
                  <div
                    key={act.year}
                    ref={setActRef(i)}
                    className={`md:absolute md:inset-0 ${
                      // On md+ only — hide non-first acts until GSAP
                      // runs. Mobile keeps them all visible/stacked.
                      i > 0 ? 'md:invisible md:opacity-0' : ''
                    }`}
                  >
                    {/* Mobile-only era badge — gives each act its own
                        era anchor since the giant numeral column is
                        desktop-only. */}
                    <div className="md:hidden flex items-baseline gap-3 mb-4">
                      <span className="font-display font-bold text-rust-soft text-[42px] leading-none tabular-nums">
                        {act.year}
                      </span>
                      <span className="text-[10.5px] tracking-[0.32em] uppercase text-rust-soft font-semibold">
                        {act.era}
                      </span>
                    </div>
                    <h3 className="font-display font-light text-[28px] md:text-[36px] xl:text-[42px] leading-[1.1] tracking-[-0.025em] text-cream mb-3">
                      {act.headline}
                    </h3>
                    <p className="font-display italic text-rust-soft text-[18px] md:text-[22px] leading-[1.35] mb-5">
                      {act.lede}
                    </p>
                    <p className="text-[14.5px] md:text-[15.5px] leading-[1.75] text-cream/75 font-light max-w-[620px] mb-6">
                      {act.body}
                    </p>
                    <ul className="space-y-2">
                      {act.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 text-[13.5px] md:text-[14.5px] text-cream/80 font-light"
                        >
                          <span
                            aria-hidden
                            className="mt-[7px] w-1.5 h-1.5 rounded-full bg-rust-soft shrink-0"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue — desktop only, while we're inside the pin.
            Subtle reminder that there's more story. */}
        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-60">
          <span className="text-[9.5px] tracking-[0.32em] uppercase text-cream/55 font-medium">
            Scroll
          </span>
          <span aria-hidden className="w-px h-8 bg-cream/30 origin-top journey-scroll-cue" />
        </div>
      </div>

      {/* Mobile fallback — acts shown stacked below the sticky pin.
          On md+ this is hidden because the sticky pin contains all
          three acts with crossfade animation. */}
      <noscript>
        <div className="px-6 py-12 space-y-12 text-cream">
          {ACTS.map((act) => (
            <div key={act.year}>
              <div className="text-[11px] tracking-[0.32em] uppercase text-rust-soft font-semibold mb-2">
                {act.era} · {act.year}
              </div>
              <h3 className="font-display font-light text-[28px] mb-3">
                {act.headline}
              </h3>
              <p className="italic text-rust-soft mb-3">{act.lede}</p>
              <p className="text-cream/75 mb-4">{act.body}</p>
              <ul className="space-y-2">
                {act.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </noscript>

      {/* Subtle blink animation for the scroll cue — sits in the
          component to keep all section-specific styles co-located. */}
      <style>{`
        .journey-scroll-cue {
          animation: journey-scroll-cue 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes journey-scroll-cue {
          0% { transform: scaleY(0); transform-origin: top; }
          45% { transform: scaleY(1); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  )
}
