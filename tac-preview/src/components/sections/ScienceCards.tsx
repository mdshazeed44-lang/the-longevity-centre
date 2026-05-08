import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../../lib/motion'

gsap.registerPlugin(ScrollTrigger)

/**
 * ScienceCards — Longevity Science section on the homepage.
 *
 * Layout the client signed off on (referenced from earlier iteration):
 *   - Eyebrow: "LONGEVITY SCIENCE"
 *   - Big headline: "Cutting edge science to reverse aging"
 *   - Right-aligned intro paragraph
 *   - Three image-on-top cards with title + short outcome-focused body
 *
 * The cards lead with lifestyle outcomes (vitality / prevention /
 * performance) rather than the underlying tests — visitors see what
 * TLC delivers before they read the diagnostic depth elsewhere on
 * the page.
 */
export function ScienceCards() {
  const cards = [
    {
      tag: 'Vitality',
      title: 'Feel and look great',
      desc:
        'Stay active and energetic well into your later years — measurably stronger, sharper and more resilient with each year.',
      img: '/longevity/vitality-mature-woman.jpg',
    },
    {
      tag: 'Prevention',
      title: 'Prevent disease',
      desc:
        'Catch age-related disease decades early. Extend your lifespan and your healthspan together — not just years added, but quality years.',
      img: '/longevity/prevention-clinical-care.jpg',
    },
    {
      tag: 'Performance',
      title: 'Improve performance',
      desc:
        'Strengthen your body, sharpen your mind. Better outcomes in sport, work and the decisions that compound over a lifetime.',
      img: '/longevity/performance-swimmer.jpg',
    },
  ]
  const ref = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (reduceMotion()) return

    // Heading line reveal
    const lines = headRef.current?.querySelectorAll<HTMLElement>('.line-mask > span')
    let headTween: gsap.core.Tween | undefined
    if (lines?.length) {
      gsap.set(lines, { yPercent: 110 })
      headTween = gsap.to(lines, {
        yPercent: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
      })
    }

    // Card stagger with subtle scale
    const cardsEls = ref.current?.querySelectorAll<HTMLElement>('.sci-card')
    let cardTween: gsap.core.Tween | undefined
    if (cardsEls?.length) {
      gsap.set(cardsEls, { y: 60, opacity: 0, scale: 0.97 })
      cardTween = gsap.to(cardsEls, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: 'top 82%' },
      })
    }

    return () => {
      headTween?.scrollTrigger?.kill()
      headTween?.kill()
      cardTween?.scrollTrigger?.kill()
      cardTween?.kill()
    }
  }, [])

  return (
    <section
      id="science"
      className="relative bg-white py-12 md:py-16 px-6 md:px-12 overflow-hidden"
    >
      {/* Soft ambient backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            'radial-gradient(800px 500px at 90% 10%, rgba(148,84,85,0.04), transparent 60%)',
        }}
      />

      <div className="relative max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 md:gap-14 mb-10 md:mb-14 items-end">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                Longevity Science
              </span>
            </div>
            <h2
              ref={headRef}
              className="font-display font-bold text-[32px] md:text-[48px] leading-[1.0] tracking-[-0.03em] text-ink"
            >
              <span className="line-mask">
                <span>Decline isn't destiny.</span>
              </span>
              <br />
              <span className="line-mask">
                <span className="text-rust">It's a setting we can change.</span>
              </span>
            </h2>
          </div>
          <p className="text-[15px] md:text-[16px] leading-[1.7] text-graphite md:pb-3 max-w-[440px] font-light">
            With evidence-based protocols you can drop your biological age by
            5 to 15 years and meaningfully slow the rate at which you age.
          </p>
        </div>

        {/* Premium cards — image with overlay tag, content with hover line */}
        <div ref={ref} className="grid md:grid-cols-3 gap-5 md:gap-6">
          {cards.map((c) => (
            <article
              key={c.title}
              className="sci-card group relative bg-cream/40 hover:bg-cream rounded-[24px] overflow-hidden border border-mist/60 transition-colors duration-500"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Image — object-cover fills the aspect-[4/3] frame edge to
                  edge (acceptable crop for decorative card art). Avoids the
                  letterbox white-space we'd get with object-contain when
                  source ratios don't match the card. */}
              <div className="relative aspect-[4/3] overflow-hidden bg-cream/60">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                {/* Soft top-left shade for tag legibility */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(27,26,24,0.30) 0%, rgba(27,26,24,0) 35%)',
                  }}
                />
                {/* Tag pill (top-left) — VITALITY / PREVENTION / PERFORMANCE */}
                <div className="absolute top-4 left-4 backdrop-blur-md bg-white/15 border border-white/25 rounded-full px-3.5 py-1.5">
                  <span className="text-[9.5px] tracking-[0.28em] uppercase text-white/90 font-medium">
                    {c.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-5 md:px-7 md:py-6">
                <h3 className="font-display font-bold text-[20px] md:text-[22px] leading-[1.2] tracking-[-0.015em] text-ink mb-2 group-hover:text-rust-deep transition-colors duration-500">
                  {c.title}
                </h3>
                <p className="text-[14px] md:text-[14.5px] text-graphite leading-[1.6] font-light">
                  {c.desc}
                </p>
                {/* Animated bottom rust line on hover */}
                <span
                  aria-hidden
                  className="block h-px w-10 bg-rust mt-5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
