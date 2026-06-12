// BenefitsHome — homepage Benefits section between Hero and Programs.
// 8 benefit cards in a 4x2 grid, each with image-on-top + title + rust
// accent line + body. White BG, hairline grid pattern between cards.
// Brand mood imagery already in /public/longevity/brand/.

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export type Benefit = {
  n: string
  title: string
  body: string
  img: string
  alt: string
}

interface BenefitsHomeProps {
  /** Override the default 8 longevity benefits. */
  benefits?: Benefit[]
  /** Eyebrow microcopy above the headline. Defaults to "— Benefits —". */
  eyebrow?: string
  /** Headline line 1 (regular weight). */
  headlineLine1?: string
  /** Headline line 2 (bold rust accent — the hook). */
  headlineLine2?: string
  /** Sub-paragraph in the right column of the header. */
  body?: string
}

const BENEFITS: Benefit[] = [
  {
    n: '01',
    title: 'Lower biological age',
    body:
      'Three validated epigenetic clocks tracked over time. Many patients see measurable reduction in biological age with sustained intervention.',
    img: '/longevity/brand/mood-forest-light.jpg',
    alt: 'Forest light — longevity and vitality',
  },
  {
    n: '02',
    title: 'Relieving stress',
    body:
      'Lower cortisol, calmer nervous system. Targeted protocols restore equilibrium so daily pressure stops shaping your biology.',
    img: '/longevity/brand/mood-zen-sand.jpg',
    alt: 'Zen sand garden — calm and balance',
  },
  {
    n: '03',
    title: 'Ideal body composition',
    body:
      'Optimised fat percentage, preserved lean mass. BCA-tracked, physician-guided — measured beyond the scale.',
    img: '/longevity/body-composition-pose.jpg',
    alt: 'Editorial nutrition bowl — fresh vegetables, egg and seeds on a rustic wood surface',
  },
  {
    n: '04',
    title: 'Deeper, restorative sleep',
    body:
      'The undisturbed sleep you deserve. We address circadian rhythm, hormonal balance, and gut health together.',
    img: '/longevity/brand/mood-water-ripple.jpg',
    alt: 'Water ripple — calm restorative sleep',
  },
  {
    n: '05',
    title: 'Higher energy levels',
    body:
      'Mitochondrial efficiency restored. Stop relying on caffeine — your cellular machinery does the work.',
    img: '/longevity/brand/mood-feet-moss.jpg',
    alt: 'Bare feet on moss — vitality and grounding',
  },
  {
    n: '06',
    title: 'Better performance',
    body:
      'Stronger, more resilient performance. Personalised diagnostics turn training into measurable adaptation.',
    img: '/longevity/performance-cyclist-v2.jpg',
    alt: 'Cyclist on a country road at golden hour — peak performance',
  },
  {
    n: '07',
    title: 'Sharper memory & cognition',
    body:
      'Brain biochemistry supported through nutrition, methylation, and gut–brain axis correction.',
    img: '/longevity/brand/mood-leaf-skeleton.jpg',
    alt: 'Skeleton leaf — cognitive precision and memory',
  },
  {
    n: '08',
    title: 'Enhanced sexual health',
    body:
      'Hormonal balance restored — male and female. A measurable return of vitality, intimacy, and confidence.',
    img: '/longevity/brand/mood-hands-pose.jpg',
    alt: 'Elegant hands pose — intimate balance',
  },
]

export function BenefitsHome({
  benefits,
  eyebrow = '— Benefits —',
  headlineLine1 = 'More than longer life.',
  headlineLine2 = 'Better life, measurably.',
  body = 'Our team actively follows clinical trials and the latest longevity research. Every programme is grounded in evidence-based protocols — diagnostics-led, physician-guided, measured.',
}: BenefitsHomeProps = {}) {
  const items = benefits ?? BENEFITS
  const root = useRef<HTMLElement>(null)
  // Mobile-only "story card" index — which benefit the single
  // full-bleed card is showing. Desktop ignores this entirely.
  const [storyIdx, setStoryIdx] = useState(0)
  const story = items[storyIdx] ?? items[0]

  useEffect(() => {
    if (reduceMotion()) return
    const el = root.current
    if (!el) return

    const lines = el.querySelectorAll<HTMLElement>('.line-mask > span')
    gsap.set(lines, { yPercent: 110 })
    gsap.to(lines, {
      yPercent: 0,
      duration: 1.3,
      ease: 'expo.out',
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 78%' },
    })

    const fade = el.querySelectorAll<HTMLElement>('.fade-up')
    gsap.set(fade, { opacity: 0, y: 16 })
    gsap.to(fade, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })

    const cards = el.querySelectorAll<HTMLElement>('.benefit-card')
    gsap.set(cards, { opacity: 0, y: 28 })
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'expo.out',
      stagger: { each: 0.07, from: 'start' },
      scrollTrigger: { trigger: cards[0], start: 'top 82%' },
    })
  }, [])

  return (
    <section
      ref={root}
      id="benefits"
      className="relative py-20 md:py-32 px-6 md:px-12 overflow-hidden bg-white"
    >
      <div className="relative z-10 max-w-[1280px] mx-auto">
        {/* HEADER — 2-col split */}
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-end mb-16 md:mb-20">
          <div>
            <div className="fade-up text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold mb-6">
              {eyebrow}
            </div>
            <h2 className="font-display font-light text-[34px] md:text-[52px] xl:text-[64px] leading-[1.05] tracking-[-0.03em] text-ink">
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block">{headlineLine1}</span>
              </span>
              <br />
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block font-bold text-rust">{headlineLine2}</span>
              </span>
            </h2>
          </div>
          <p className="fade-up text-[14px] md:text-[15px] leading-[1.7] text-graphite font-light max-w-[420px] md:pb-3">
            {body}
          </p>
        </div>

        {/* ── MOBILE ONLY — story card ─────────────────────────────
            On phones the 8-card stack read as one very long scroll,
            so below the sm breakpoint we show ONE full-bleed image
            card with the copy overlaid on a bottom gradient and
            Instagram-stories segment bars on top. Tap the bars to
            jump, or tap the left / right thirds of the card to step
            through. Desktop (sm+) never sees this. */}
        <div className="sm:hidden">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[18px] bg-ink">
            <img
              key={story.n}
              src={story.img}
              alt={story.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(27,26,24,0.35) 0%, transparent 30%, transparent 45%, rgba(27,26,24,0.88) 100%)',
              }}
            />
            {/* Story segment bars — tap any bar to jump */}
            <div className="absolute top-3 inset-x-3 flex gap-1">
              {items.map((b, d) => (
                <button
                  key={b.n}
                  type="button"
                  onClick={() => setStoryIdx(d)}
                  aria-label={`Benefit ${d + 1}: ${b.title}`}
                  className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${d <= storyIdx ? 'bg-white' : 'bg-white/30'}`}
                />
              ))}
            </div>
            {/* Overlay copy */}
            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="text-[10px] tracking-[0.32em] uppercase text-white/60 font-semibold mb-1.5">
                {story.n} / {String(items.length).padStart(2, '0')}
              </div>
              <h3 className="font-display font-bold text-white text-[20px] leading-[1.15] mb-2">
                {story.title}
              </h3>
              <p className="text-[12.5px] leading-[1.55] text-white/75 font-light">
                {story.body}
              </p>
            </div>
            {/* Invisible tap zones — left third = previous, right third = next */}
            <button
              type="button"
              aria-label="Previous benefit"
              onClick={() => setStoryIdx((storyIdx - 1 + items.length) % items.length)}
              className="absolute inset-y-0 left-0 w-1/3"
            />
            <button
              type="button"
              aria-label="Next benefit"
              onClick={() => setStoryIdx((storyIdx + 1) % items.length)}
              className="absolute inset-y-0 right-0 w-1/3"
            />
          </div>
          <p className="mt-3 text-center text-[10px] tracking-[0.3em] uppercase text-stone font-semibold">
            Tap left / right to navigate
          </p>
        </div>

        {/* 8 BENEFIT CARDS — 4x2 grid with hairline borders (sm+ only) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10">
          {items.map((b) => (
            <article
              key={b.n}
              className="benefit-card group relative bg-white p-5 md:p-6 flex flex-col"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Image — aspect 4/5 portrait */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[14px] bg-mist mb-6">
                <img
                  src={b.img}
                  alt={b.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                {/* Soft top sheen */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                  }}
                />
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-[18px] md:text-[20px] leading-[1.2] tracking-[-0.015em] text-ink mb-3">
                {b.title}
              </h3>

              {/* Rust accent line — grows on hover */}
              <span
                aria-hidden
                className="block h-px w-6 bg-rust mb-3.5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-12"
              />

              {/* Body */}
              <p className="text-[13.5px] md:text-[14px] leading-[1.6] text-graphite font-light">
                {b.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
