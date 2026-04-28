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

  useEffect(() => {
    if (reduceMotion()) return

    gsap.set(eyebrow.current, { opacity: 0, y: -10 })
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
        para.current,
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '+=0.7'
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
      <div
        ref={inner}
        className="relative z-[5] flex flex-col items-center justify-center text-center min-h-[100vh] md:min-h-[92vh] px-6 md:px-12 max-w-[1100px] mx-auto pt-[60px] pb-[60px]"
      >
        {/* Simple eyebrow — small caps, no rules */}
        <div
          ref={eyebrow}
          className="text-[11px] tracking-[0.4em] text-rust font-semibold uppercase mb-14"
        >
          Premium Longevity Medicine · India
        </div>

        {/* Headline */}
        <h1 className="font-display font-bold text-[48px] md:text-[88px] xl:text-[112px] leading-[0.98] tracking-[-0.04em] text-ink mb-12">
          <MaskedReveal text="Age should" delay={0.45} />
          <br />
          <MaskedReveal text="never define" delay={0.6} />
          <br />
          <MaskedReveal
            text="your story."
            delay={0.85}
            className="font-script font-normal text-rust text-[1.35em] leading-[0.85] inline-block translate-y-[0.08em]"
          />
        </h1>

        {/* Description */}
        <p
          ref={para}
          className="text-[17px] md:text-[19px] leading-[1.7] text-graphite max-w-[560px] mb-14 font-light"
        >
          Innovative, personalised preventive medicine to extend the years your
          body feels strong, sharp, and fully alive.
        </p>

        {/* CTAs */}
        <div ref={ctas} className="flex flex-wrap gap-4 mb-24 justify-center">
          <a
            href="#cta"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 px-10 py-[18px] bg-ink text-white text-[12px] tracking-[0.2em] font-medium hover:bg-rust-deep transition-colors duration-300"
          >
            BOOK CONSULTATION
            <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </a>
          <a
            href="#programs"
            data-cursor="hover"
            className="inline-flex items-center px-10 py-[18px] border border-ink text-ink text-[12px] tracking-[0.2em] font-medium hover:bg-ink hover:text-white transition-colors duration-300"
          >
            EXPLORE PROGRAMS
          </a>
        </div>

        {/* Stats ticker */}
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
