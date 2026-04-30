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
  const root = useRef<HTMLElement>(null)
  const eyebrow = useRef<HTMLDivElement>(null)
  const para = useRef<HTMLParagraphElement>(null)
  const ctas = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (reduceMotion()) return

    gsap.set(eyebrow.current, { opacity: 0, y: -10 })
    gsap.set(para.current, { opacity: 0, y: 16 })
    gsap.set(ctas.current?.children ?? [], { opacity: 0, y: 16 })

    const tl = gsap.timeline({ delay: 0.4 })
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

    // Subtle Ken Burns scale on the video for cinematic depth
    if (videoRef.current) {
      gsap.fromTo(
        videoRef.current,
        { scale: 1.06 },
        {
          scale: 1.0,
          duration: 18,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        }
      )
    }

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      id="hero"
      ref={root}
      className="relative w-full overflow-hidden min-h-[100vh] bg-ink text-white"
    >
      {/* Background video — full bleed cinematic, plays muted on loop.
          preload="metadata" lets the browser show the poster instantly while
          the video streams in progressively, improving LCP. */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        src="/videos/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />

      {/* Cinematic overlays — vignette + bottom gradient + left text gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,8,7,0.65) 0%, rgba(10,8,7,0.2) 30%, rgba(10,8,7,0.45) 75%, rgba(10,8,7,0.85) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,8,7,0.7) 0%, rgba(10,8,7,0.35) 45%, rgba(10,8,7,0.0) 70%)',
        }}
      />
      {/* Subtle grain for premium film feel */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.85'/></svg>\")",
        }}
      />

      {/* Content — left aligned, premium hero layout */}
      <div className="relative z-10 min-h-[100vh] flex flex-col justify-end pt-32 pb-20 md:pb-28 px-6 md:px-14 lg:px-20 max-w-[1500px] mx-auto">
        {/* Eyebrow + phone pill row */}
        <div ref={eyebrow} className="flex flex-wrap items-center gap-4 mb-8">
          <span className="text-[11px] md:text-[12px] tracking-[0.32em] uppercase font-semibold text-white">
            Premium Longevity Clinics · India
          </span>
          <a
            href="tel:+918826809123"
            data-cursor="hover"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-[12px] hover:bg-white/20 transition-colors duration-300"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-rust-soft"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +91 88268 09123
          </a>
        </div>

        {/* Headline */}
        <h1 className="font-display font-bold text-[44px] sm:text-[64px] md:text-[88px] xl:text-[120px] leading-[0.98] tracking-[-0.04em] text-white max-w-[1100px] mb-8">
          <MaskedReveal text="Age should" delay={0.55} charClassName="text-white/95" />
          <br />
          <MaskedReveal text="never define you." delay={0.7} charClassName="text-white" />
        </h1>

        {/* Description */}
        <p
          ref={para}
          className="text-[16px] md:text-[19px] leading-[1.65] text-white/80 max-w-[560px] mb-12 font-light"
        >
          Explore TAC's innovative, personalised preventive medicine for a
          vibrant and fulfilling life — at any stage. Now available online in
          Mumbai, Bangalore and Hyderabad.
        </p>

        {/* CTA cards — like reference site */}
        <div ref={ctas} className="flex flex-wrap gap-4">
          <a
            href="#cta"
            data-cursor="hover"
            data-magnetic
            className="group inline-flex items-center gap-4 pl-7 pr-5 py-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/20 transition-colors duration-300 min-w-[260px]"
          >
            <div className="text-left">
              <div className="text-[10px] tracking-[0.28em] uppercase text-white/60 font-medium mb-1">
                Book Now
              </div>
              <div className="text-[15px] font-semibold text-white tracking-tight">
                Arrange a Consultation
              </div>
            </div>
            <span className="ml-auto w-10 h-10 rounded-full bg-white text-ink flex items-center justify-center group-hover:bg-rust group-hover:text-white transition-colors duration-300">
              →
            </span>
          </a>

          <a
            href="#clinics"
            data-cursor="hover"
            className="group inline-flex items-center gap-4 pl-7 pr-5 py-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/20 transition-colors duration-300 min-w-[260px]"
          >
            <div className="text-left">
              <div className="text-[10px] tracking-[0.28em] uppercase text-white/60 font-medium mb-1">
                Explore
              </div>
              <div className="text-[15px] font-semibold text-white tracking-tight">
                Our Five Centres
              </div>
            </div>
            <span className="ml-auto w-10 h-10 rounded-full bg-white text-ink flex items-center justify-center group-hover:bg-rust group-hover:text-white transition-colors duration-300">
              →
            </span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute left-6 md:left-14 lg:left-20 bottom-6 md:bottom-8 flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase text-white/55">
          <span className="inline-block w-5 h-8 rounded-full border border-white/40 relative">
            <span className="absolute left-1/2 -translate-x-1/2 top-1.5 w-1 h-1.5 rounded-full bg-white/80 animate-bounce" />
          </span>
          Scroll to discover
        </div>
      </div>
    </section>
  )
}
