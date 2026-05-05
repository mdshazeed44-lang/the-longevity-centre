import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export function ResultsSplit() {
  // Source: theantiagingcentre.com — "Way to a New Reformed Life" + Intervention copy.
  const outcomes = [
    {
      label: 'Reversed metabolic risk',
      detail: 'Diabetes, prediabetes, cholesterol, fatty liver',
    },
    {
      label: 'PCOD & hormonal balance',
      detail: 'Thyroid, insulin resistance, sex hormones',
    },
    {
      label: 'Targeted fat loss',
      detail: 'Body composition, not just the number on the scale',
    },
    {
      label: 'Gut & microbiome restored',
      detail: 'Bloating, IBS-like symptoms, food sensitivities resolved',
    },
    {
      label: 'Skin & hair anti-aging',
      detail: 'Dermatology-led, rooted in nutrient and hormonal health',
    },
    {
      label: 'Expanded lifespan, restored vitality',
      detail: 'A measurably longer, healthier, more vibrant life',
    },
  ]

  const ref = useRef<HTMLUListElement>(null)
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

    // Row reveal
    const items = ref.current?.querySelectorAll<HTMLElement>('.result-row')
    let rowTween: gsap.core.Tween | undefined
    if (items?.length) {
      gsap.set(items, { y: 24, opacity: 0 })
      rowTween = gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'expo.out',
        stagger: 0.07,
        scrollTrigger: { trigger: ref.current, start: 'top 78%' },
      })
    }

    return () => {
      headTween?.scrollTrigger?.kill()
      headTween?.kill()
      rowTween?.scrollTrigger?.kill()
      rowTween?.kill()
    }
  }, [])

  return (
    <section id="results" className="bg-cream/50 py-10 md:py-14 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-start">
        {/* LEFT — outcomes list (compact) */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-7 h-px bg-rust" />
            <span className="text-[10.5px] tracking-[0.32em] text-rust font-semibold uppercase">
              What 12 Months Brings
            </span>
          </div>
          <h2
            ref={headRef}
            className="font-display font-bold text-[26px] md:text-[36px] xl:text-[42px] leading-[1.0] tracking-[-0.03em] text-ink mb-3.5"
          >
            <span className="line-mask">
              <span>A new,</span>
            </span>
            <br />
            <span className="line-mask">
              <span>reformed life.</span>
            </span>
          </h2>
          <p className="text-[13.5px] md:text-[14.5px] leading-[1.55] text-graphite font-light max-w-[520px] mb-5">
            After the 12-month programme, patients describe a reformed life —
            restored vitality, measurably better health.
          </p>

          <ul ref={ref} className="border-t border-mist">
            {outcomes.map((o, i) => (
              <li
                key={o.label}
                className="result-row group flex items-baseline gap-5 md:gap-6 py-3 border-b border-mist"
              >
                <span className="font-display text-[12.5px] text-rust font-semibold tabular-nums tracking-tight w-7 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-[15px] md:text-[16.5px] leading-[1.25] tracking-[-0.01em] text-ink group-hover:text-rust-deep transition-colors duration-300">
                    {o.label}
                  </div>
                  <div className="mt-0.5 text-[12px] md:text-[12.5px] text-stone leading-[1.45] font-light">
                    {o.detail}
                  </div>
                </div>
                <span className="hidden md:inline-block text-rust opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-500 text-base">
                  →
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — editorial brand imagery only */}
        <div className="md:sticky md:top-28">
          <div className="relative aspect-[4/5] sm:aspect-[1/1] md:aspect-[4/5] overflow-hidden rounded-[18px] bg-mist max-h-[560px]">
            <img
              src="/longevity/reformed-life.jpg"
              alt="Restored vitality — strength and capability returned"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

