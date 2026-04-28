import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

function MaskedReveal({
  text,
  className,
  charClassName,
  delay = 0,
}: {
  text: string
  className?: string
  charClassName?: string
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    const el = ref.current
    if (!el) return
    const chars = el.querySelectorAll<HTMLElement>('.mr-char')
    gsap.set(chars, { yPercent: 110 })
    gsap.to(chars, {
      yPercent: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.025,
      delay,
    })
  }, [delay])

  const words = text.split(' ')
  return (
    <span ref={ref} className={className}>
      {words.map((w, wi) => (
        <span key={wi} className="inline-block mr-[0.2em] last:mr-0">
          {Array.from(w).map((c, ci) => (
            <span
              key={ci}
              className="inline-block overflow-hidden align-bottom"
              aria-hidden="true"
            >
              <span className={`mr-char inline-block ${charClassName ?? ''}`}>
                {c}
              </span>
            </span>
          ))}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </span>
  )
}

export function Hero(_: { scrollRef?: React.MutableRefObject<number> }) {
  const root = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const eyebrow = useRef<HTMLDivElement>(null)
  const para = useRef<HTMLParagraphElement>(null)
  const ctas = useRef<HTMLDivElement>(null)
  const ticker = useRef<HTMLDivElement>(null)
  const ornament = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion()) return

    gsap.set(eyebrow.current, { opacity: 0, y: -10 })
    gsap.set(ornament.current, { opacity: 0, scaleX: 0 })
    gsap.set(para.current, { opacity: 0, y: 16 })
    gsap.set(ctas.current?.children ?? [], { opacity: 0, y: 16 })
    gsap.set(ticker.current?.children ?? [], { opacity: 0, y: 10 })

    const tl = gsap.timeline({ delay: 0.25 })
    tl.to(eyebrow.current, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
    })
      .to(
        ornament.current,
        { opacity: 1, scaleX: 1, duration: 1.4, ease: 'expo.out' },
        '+=0.25'
      )
      .to(
        para.current,
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '+=0.45'
      )
      .to(
        ctas.current?.children ?? [],
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
        },
        '-=0.5'
      )
      .to(
        ticker.current?.children ?? [],
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.05,
        },
        '-=0.4'
      )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      id="hero"
      ref={root}
      className="relative w-full overflow-hidden pt-[80px] min-h-[100vh] bg-white"
    >
      {/* Vertical decorative index — left edge */}
      <div className="hidden xl:flex absolute left-10 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-[3]">
        <div
          className="text-[10px] tracking-[0.4em] text-stone uppercase rotate-180"
          style={{ writingMode: 'vertical-rl' }}
        >
          The Longevity Centre · Est. 1965
        </div>
        <div className="w-px h-24 bg-mist" />
        <div className="text-[10px] tracking-[0.25em] text-rust font-medium tabular-nums">
          01 — 09
        </div>
      </div>

      {/* Right edge — Volume marker (mirrors left rail) */}
      <div className="hidden xl:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-[3]">
        <div className="text-[10px] tracking-[0.25em] text-stone uppercase tabular-nums">
          Volume I · 2026
        </div>
        <div className="w-px h-24 bg-mist" />
        <div
          className="text-[10px] tracking-[0.4em] text-stone uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          Premium Preventive Medicine
        </div>
      </div>

      {/* Centered content */}
      <div
        ref={inner}
        className="relative z-[5] flex flex-col items-center justify-center text-center min-h-[100vh] md:min-h-[92vh] px-6 md:px-12 max-w-[1100px] mx-auto pt-[80px] pb-[80px]"
      >
        <div ref={eyebrow} className="flex items-center gap-4 mb-12">
          <span className="w-10 h-px bg-rust" />
          <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
            Premium Longevity Medicine — India
          </span>
          <span className="w-10 h-px bg-rust" />
        </div>

        <h1 className="font-display font-bold text-[44px] md:text-[80px] xl:text-[104px] leading-[1.0] tracking-[-0.035em] text-ink mb-8">
          <MaskedReveal text="Age should" delay={0.45} />
          <br />
          <MaskedReveal text="never define" delay={0.6} />
          <br />
          <MaskedReveal
            text="your story."
            delay={0.85}
            className="font-script font-normal text-rust text-[1.4em] leading-[0.85] inline-block translate-y-[0.08em]"
          />
        </h1>

        {/* Editorial ornament — hairline + diamond */}
        <div ref={ornament} className="flex items-center gap-3 mb-10 origin-center">
          <span className="w-16 h-px bg-mist" />
          <span className="w-1.5 h-1.5 rotate-45 border border-rust" />
          <span className="w-16 h-px bg-mist" />
        </div>

        <p
          ref={para}
          className="text-[16px] md:text-[19px] leading-[1.7] text-graphite max-w-[580px] mb-12 font-light"
        >
          Innovative, personalised preventive medicine to extend the years your
          body feels strong, sharp, and fully alive.
        </p>

        <div ref={ctas} className="flex flex-wrap gap-4 mb-20 justify-center">
          <a
            href="#cta"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 px-9 py-[18px] bg-ink text-white text-[12px] tracking-[0.18em] font-medium hover:bg-rust-deep transition-colors duration-300"
          >
            BOOK CONSULTATION
            <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </a>
          <a
            href="#programs"
            data-cursor="hover"
            className="inline-flex items-center px-9 py-[18px] border border-ink text-ink text-[12px] tracking-[0.18em] font-medium hover:bg-ink hover:text-white transition-colors duration-300"
          >
            EXPLORE PROGRAMS
          </a>
        </div>

        {/* Centered biomarker ticker */}
        <div
          ref={ticker}
          className="grid grid-cols-3 max-w-[760px] w-full border-y border-mist divide-x divide-mist"
        >
          {[
            { val: '163', label: 'Biomarkers measured' },
            { val: '12 mo', label: 'Supervised protocol' },
            { val: '5', label: 'Centres pan-India' },
          ].map((s) => (
            <div key={s.label} className="text-center px-4 py-7">
              <div className="font-display font-bold text-[34px] md:text-[48px] leading-none text-ink mb-3 tabular-nums tracking-[-0.02em]">
                {s.val}
              </div>
              <div className="text-[10px] md:text-[11px] tracking-[0.25em] text-graphite uppercase font-medium leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
