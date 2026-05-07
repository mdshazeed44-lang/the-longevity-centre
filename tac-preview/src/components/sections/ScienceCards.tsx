import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export function ScienceCards() {
  // The three pillars that separate TLC from a generic longevity clinic:
  // genomic depth (323 genes vs the 99-gene panels most clinics use),
  // epigenetic measurement (GrimAge + PhenoAge across 9M base pairs),
  // and whole-genome microbiome sequencing. All three diagnostics are
  // run through our Netherlands partner laboratory.
  const cards = [
    {
      n: '01',
      tag: '323 Genes',
      title: 'Your genetic blueprint, in full',
      desc:
        'A 323-gene panel covering metabolism, hormones, cardiovascular risk and longevity pathways. Most clinics test fewer than 99 — we read the whole map.',
      img: '/diagnostics/dna-helix.jpg',
    },
    {
      n: '02',
      tag: 'Epigenetic Clocks',
      title: "Your true age, not your birthday",
      desc:
        'GrimAge and PhenoAge analyse DNA methylation across 9 million base pairs — the most accurate measure of biological age, re-tested at month 9 to prove the drop.',
      img: '/diagnostics/biological-clock.jpg',
    },
    {
      n: '03',
      tag: 'Whole-Genome Microbiome',
      title: 'Every microbe in your gut, sequenced',
      desc:
        'Shotgun metagenomic sequencing of every microbial species — diversity, imbalances, inflammation pathways. Far beyond the partial 16S panel most clinics rely on.',
      img: '/diagnostics/microbiome.jpg',
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
                The TLC Diagnostic Stack
              </span>
            </div>
            <h2
              ref={headRef}
              className="font-display font-bold text-[32px] md:text-[48px] leading-[1.0] tracking-[-0.03em] text-ink"
            >
              <span className="line-mask">
                <span>Three diagnostics</span>
              </span>
              <br />
              <span className="line-mask">
                <span>most clinics don't run.</span>
              </span>
            </h2>
          </div>
          <p className="text-[15px] md:text-[16px] leading-[1.7] text-graphite md:pb-3 max-w-[440px] font-light">
            Genomic depth, epigenetic age, whole-genome microbiome — all
            processed through our Netherlands partner laboratory. The three
            tests that separate a longevity programme from a wellness routine.
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
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
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
                {/* Number + Tag pill (top-left) */}
                <div className="absolute top-4 left-4 flex items-center gap-2.5 backdrop-blur-md bg-white/15 border border-white/25 rounded-full px-3 py-1.5">
                  <span className="font-display text-[11px] font-semibold text-white tabular-nums tracking-tight">
                    {c.n}
                  </span>
                  <span className="text-[9.5px] tracking-[0.28em] uppercase text-white/90 font-medium">
                    {c.tag}
                  </span>
                </div>
                {/* Hover arrow circle (bottom-right) */}
                <span
                  aria-hidden
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/0 backdrop-blur-md border border-white/0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:bg-white/15 group-hover:border-white/30 transition-all duration-500"
                >
                  →
                </span>
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

