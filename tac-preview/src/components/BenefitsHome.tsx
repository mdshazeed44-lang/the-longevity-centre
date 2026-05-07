// BenefitsHome — homepage Benefits section between Hero and Programs.
// 8 benefit cards in a 4x2 grid, each with image-on-top + title + rust
// accent line + body. White BG, hairline grid pattern between cards.
// Brand mood imagery already in /public/longevity/brand/.

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

type Benefit = {
  n: string
  title: string
  body: string
  img: string
  alt: string
}

const BENEFITS: Benefit[] = [
  {
    n: '01',
    title: 'Relieving stress',
    body:
      'Lower cortisol, calmer nervous system. Targeted protocols restore equilibrium so daily pressure stops shaping your biology.',
    img: '/longevity/brand/mood-zen-sand.jpg',
    alt: 'Zen sand garden — calm and balance',
  },
  {
    n: '02',
    title: 'Ideal body composition',
    body:
      'Optimised fat percentage, preserved lean mass. BCA-tracked, physician-guided — measured beyond the scale.',
    img: '/longevity/body-composition-pose.jpg',
    alt: 'Editorial yoga camel pose — lean body composition in motion',
  },
  {
    n: '03',
    title: 'Deeper, restorative sleep',
    body:
      'The undisturbed sleep you deserve. We address circadian rhythm, hormonal balance, and gut health together.',
    img: '/longevity/brand/mood-water-ripple.jpg',
    alt: 'Water ripple — calm restorative sleep',
  },
  {
    n: '04',
    title: 'Higher energy levels',
    body:
      'Mitochondrial efficiency restored. Stop relying on caffeine — your cellular machinery does the work.',
    img: '/longevity/brand/mood-feet-moss.jpg',
    alt: 'Bare feet on moss — vitality and grounding',
  },
  {
    n: '05',
    title: 'Better sport results',
    body:
      'Stronger, more resilient performance. Personalised diagnostics turn training into measurable adaptation.',
    img: '/longevity/fitness-running.jpg',
    alt: 'Marathon runner on the road — athletic performance',
  },
  {
    n: '06',
    title: 'Lower biological age',
    body:
      'Three validated clocks tracked over time. Most patients reverse their biological age by 5–15 years.',
    img: '/longevity/brand/mood-forest-light.jpg',
    alt: 'Forest light — longevity and vitality',
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

export function BenefitsHome() {
  const root = useRef<HTMLElement>(null)

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
              — Benefits —
            </div>
            <h2 className="font-display font-light text-[34px] md:text-[52px] xl:text-[64px] leading-[1.05] tracking-[-0.03em] text-ink">
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block">More than longer life.</span>
              </span>
              <br />
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block font-bold text-rust">Better life, measurably.</span>
              </span>
            </h2>
          </div>
          <p className="fade-up text-[14px] md:text-[15px] leading-[1.7] text-graphite font-light max-w-[420px] md:pb-3">
            We have early access to clinical trials and longevity research. Every programme is built on scientifically-proven protocols — diagnostics-led, physician-guided, measured.
          </p>
        </div>

        {/* 8 BENEFIT CARDS — 4x2 grid with hairline borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10">
          {BENEFITS.map((b) => (
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
