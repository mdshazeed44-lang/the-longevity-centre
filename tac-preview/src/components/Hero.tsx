import { Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'
import { HeroDnaScene } from './HeroDnaScene'

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

    // Scroll exit: lift + fade content
    const exitST = ScrollTrigger.create({
      trigger: root.current,
      start: 'top top',
      end: '+=85%',
      scrub: 0.6,
      pin: false,
      onUpdate: (self) => {
        const p = self.progress
        if (inner.current) inner.current.style.setProperty('--p', String(p))
      },
    })

    return () => {
      tl.kill()
      exitST.kill()
    }
  }, [])

  return (
    <section
      id="hero"
      ref={root}
      className="relative w-full overflow-hidden pt-[80px] min-h-[100vh]"
      style={{
        background:
          'radial-gradient(ellipse 75% 60% at 50% 30%, #FFFFFF 0%, #FAF6EF 55%, #F1E8D8 100%)',
      }}
    >
      {/* 3D rotating DNA helix — premium ambient motion */}
      <div className="absolute inset-0 z-[1]">
        <Suspense fallback={null}>
          <HeroDnaScene />
        </Suspense>
      </div>

      {/* Soft radial spotlight — keeps headline readable above the helix */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 50% 50%, rgba(250,246,239,0.78) 0%, rgba(250,246,239,0.35) 40%, transparent 75%)',
        }}
      />

      {/* Faint film grain — analog texture */}
      <div className="absolute inset-0 z-[2] pointer-events-none mix-blend-multiply opacity-[0.18] hero-grain" />

      {/* Top + bottom gentle fades so canvas blends with sections above/below */}
      <div className="absolute inset-x-0 top-0 h-[120px] z-[2] bg-gradient-to-b from-white via-white/70 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[160px] z-[2] bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none" />

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
        style={
          {
            transform: 'translate3d(0, calc(var(--p, 0) * -30px), 0) scale(calc(1 - var(--p, 0) * 0.03))',
            opacity: 'calc(1 - var(--p, 0) * 0.85)',
            transformOrigin: 'center center',
            ['--p' as never]: '0',
          } as React.CSSProperties
        }
      >
        <div ref={eyebrow} className="flex items-center gap-4 mb-10">
          <span className="w-10 h-px bg-rust" />
          <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
            Premium Longevity Medicine — India
          </span>
          <span className="w-10 h-px bg-rust" />
        </div>

        <h1 className="font-display font-bold text-[44px] md:text-[80px] xl:text-[100px] leading-[1.0] tracking-[-0.03em] text-ink mb-10">
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

        <p
          ref={para}
          className="text-[16px] md:text-[19px] leading-[1.65] text-graphite max-w-[580px] mb-12"
        >
          Innovative, personalised preventive medicine to extend the years your
          body feels strong, sharp, and fully alive.
        </p>

        <div ref={ctas} className="flex flex-wrap gap-4 mb-16 justify-center">
          <a
            href="#cta"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-ink text-white text-[12px] tracking-[0.18em] font-medium hover:bg-rust-deep transition-colors duration-300"
          >
            BOOK CONSULTATION
            <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </a>
          <a
            href="#programs"
            data-cursor="hover"
            className="inline-flex items-center px-8 py-4 border border-ink text-ink text-[12px] tracking-[0.18em] font-medium hover:bg-ink hover:text-white transition-colors duration-300"
          >
            EXPLORE PROGRAMS
          </a>
        </div>

        {/* Centered biomarker ticker */}
        <div
          ref={ticker}
          className="grid grid-cols-3 gap-8 md:gap-16 max-w-[640px] w-full border-t border-mist pt-8"
        >
          {[
            { val: '163', label: 'Biomarkers measured' },
            { val: '12 mo', label: 'Supervised protocol' },
            { val: '5', label: 'Centres pan-India' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-[24px] md:text-[34px] leading-none text-ink mb-2 tabular-nums">
                {s.val}
              </div>
              <div className="text-[10px] tracking-[0.22em] text-stone uppercase leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[5] hidden md:flex flex-col items-center gap-3">
        <div className="text-[10px] tracking-[0.3em] text-stone uppercase">
          Scroll
        </div>
        <div className="relative w-px h-10 bg-mist overflow-hidden">
          <div
            className="absolute left-0 w-full bg-rust"
            style={{
              height: '50%',
              animation: 'scrollDot 2.4s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  )
}
