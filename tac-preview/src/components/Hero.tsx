import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'

// Hero brand-reel — cross-fades between 4 themed clips on a 5.5s
// cycle to give the page the same multi-shot cinematic open as
// healthylongevity.clinic. All four clips are landscape Full-HD
// (1920x1080) MP4s downloaded from Pexels and bundled in
// /public/videos/hero-clips/ (~55 MB total, lazy-loaded after
// first paint so they don't compete with the LCP).
//
// Brand reel — four pillars of TLC's longevity proposition:
//   science (DNA helix) · vitality (cycling) · wellness (beach yoga
//   at sunrise) · clinical (clinic interior).
// All four sources are HD or higher (DNA is true 4K 3840×2160,
// wellness is 1080p 60fps for buttery motion, cycling and clinic
// are 1080p 30fps). The render treatment is tuned for sharpness
// (Ken Burns held to 1.02, gradients light, contrast/saturation
// lift on the <video>). Cache-bust `?v=4` because cellular.mp4
// and swimming.mp4 were retired this round in favour of dna.mp4
// and wellness.mp4.
const HERO_CLIPS = [
  '/videos/hero-clips/dna.mp4?v=4',      // DNA helix 4K — science
  '/videos/hero-clips/cycling.mp4?v=4',  // outdoor cycling — vitality
  '/videos/hero-clips/wellness.mp4?v=4', // beach yoga sunrise — wellness
  '/videos/hero-clips/clinic.mp4?v=4',   // premium clinic — clinical
] as const
const CLIP_DURATION_MS = 5500

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

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const eyebrow = useRef<HTMLDivElement>(null)
  const para = useRef<HTMLParagraphElement>(null)
  const ctas = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [activeClip, setActiveClip] = useState(0)

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

    // Very subtle Ken Burns — kept tight (1.02 → 1.0) so we don't
    // upscale 1080p source past native pixel density on the viewport,
    // which is what was making the footage read as soft. The scale
    // budget is intentionally small; cinematic depth comes from the
    // cross-fades, not the zoom.
    videoRefs.current.forEach((v) => {
      if (!v) return
      gsap.fromTo(
        v,
        { scale: 1.02 },
        {
          scale: 1.0,
          duration: 22,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        }
      )
    })

    // Lazy-load the hero clips AFTER first paint. preload="none" on
    // each <video> so bytes don't compete with the LCP; once the page
    // is interactive we kick all four off in parallel. Poster image
    // remains painted until the first clip can render.
    let idleHandle: number | null = null
    let timeoutHandle: number | null = null
    const startVideos = () => {
      videoRefs.current.forEach((v) => {
        if (!v) return
        v.load()
        v.play().catch(() => {
          /* autoplay blocked — fine, poster remains visible */
        })
      })
    }
    const ric =
      (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback
    if (typeof ric === 'function') {
      idleHandle = ric(startVideos)
    } else {
      timeoutHandle = window.setTimeout(startVideos, 800)
    }

    // Cross-fade rotation — advance to the next clip every CLIP_DURATION_MS
    const cycle = window.setInterval(() => {
      setActiveClip((i) => (i + 1) % HERO_CLIPS.length)
    }, CLIP_DURATION_MS)

    return () => {
      tl.kill()
      window.clearInterval(cycle)
      if (timeoutHandle !== null) window.clearTimeout(timeoutHandle)
      if (idleHandle !== null) {
        const cic = (
          window as unknown as { cancelIdleCallback?: (h: number) => void }
        ).cancelIdleCallback
        if (typeof cic === 'function') cic(idleHandle)
      }
    }
  }, [])

  return (
    <section
      id="hero"
      ref={root}
      className="relative w-full overflow-hidden min-h-screen min-h-[100svh] bg-ink text-white"
    >
      {/* Static poster — paints INSTANTLY (75 KB JPEG) so the LCP
          element is rendered before the 3.1 MB video bytes arrive.
          fetchPriority="high" + eager loading because this is the
          single most important image on the site. The video covers
          the poster as soon as it can play. */}
      <img
        src="/videos/hero-poster.jpg"
        alt=""
        aria-hidden="true"
        width={1280}
        height={720}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Background brand-reel — 4 clips stacked, only the active one
          is opacity:1; rest fade out via CSS transition. Each clip
          plays muted on loop and is lazy-loaded after first paint
          (see startVideos in useEffect). The poster <img> covers all
          four until the first one can render. */}
      {HERO_CLIPS.map((src, i) => (
        <video
          key={src}
          ref={(el) => { videoRefs.current[i] = el }}
          className="absolute inset-0 w-full h-full object-cover will-change-transform transition-opacity duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          poster="/videos/hero-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          style={{
            opacity: i === activeClip ? 1 : 0,
            zIndex: i === activeClip ? 2 : 1,
            // Tiny contrast + saturation lift makes HD source read as
            // crisp on viewports that upscale past native (1440p+).
            // Keep this conservative — anything above 1.08 starts to
            // posterise the swimming-pool tones.
            filter: 'contrast(1.06) saturate(1.08)',
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}

      {/* Cinematic overlays — kept light so the underlying footage
          stays sharp. Top + bottom darken just enough to hold the
          eyebrow / CTA contrast; left wash carries the headline. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,8,7,0.45) 0%, rgba(10,8,7,0.05) 28%, rgba(10,8,7,0.25) 72%, rgba(10,8,7,0.7) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,8,7,0.55) 0%, rgba(10,8,7,0.2) 45%, rgba(10,8,7,0.0) 70%)',
        }}
      />
      {/* Whisper-thin grain — was 0.06 with mix-blend-overlay which
          was visibly softening the footage; dropped to 0.025 so the
          film feel stays without eating sharpness. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.85'/></svg>\")",
        }}
      />

      {/* Content — left aligned, premium hero layout */}
      <div className="relative z-10 min-h-screen min-h-[100svh] flex flex-col justify-center md:justify-end pt-24 pb-10 md:pt-28 md:pb-16 px-6 md:px-14 lg:px-20 max-w-[1500px] mx-auto">
        {/* Eyebrow + phone pill row */}
        <div ref={eyebrow} className="flex flex-wrap items-center gap-3 md:gap-4 mb-3 md:mb-5">
          <span className="text-[10.5px] md:text-[12px] tracking-[0.32em] uppercase font-semibold text-white">
            Premium Longevity Clinics · India
          </span>
          <a
            href="tel:+918826809123"
            data-cursor="hover"
            className="inline-flex items-center gap-2 px-3.5 md:px-4 py-1.5 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-[11.5px] md:text-[12px] hover:bg-white/20 transition-colors duration-300"
          >
            <svg
              width="13"
              height="13"
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
        <h1 className="font-display font-bold text-[34px] sm:text-[50px] md:text-[68px] xl:text-[92px] leading-[1.0] md:leading-[0.98] tracking-[-0.04em] text-white max-w-[1100px] mb-4 md:mb-6">
          <MaskedReveal text="Age should" delay={0.55} charClassName="text-white/95" />
          <br />
          <MaskedReveal text="never define you." delay={0.7} charClassName="text-white" />
        </h1>

        {/* Description */}
        <p
          ref={para}
          className="text-[14px] md:text-[17px] leading-[1.55] md:leading-[1.6] text-white/80 max-w-[560px] mb-4 md:mb-6 font-light"
        >
          Explore TLC's innovative, personalised preventive medicine for a
          vibrant and fulfilling life — at any stage.
        </p>

        {/* Slim spec pills — anchor key facts inline above the CTAs */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-7">
          {[
            { k: 'Centres', v: '8 Pan-India' },
            { k: 'Experience', v: '20+ Years' },
            { k: 'Specialities', v: 'Longevity · Metabolic · Gut · Skin' },
          ].map((s) => (
            <div
              key={s.k}
              className="inline-flex items-center gap-2 md:gap-3 backdrop-blur-md bg-white/[0.06] hover:bg-white/[0.10] transition-colors duration-500 border border-white/15 rounded-full pl-3 pr-3.5 md:pl-4 md:pr-5 py-1.5 md:py-2.5 shadow-[0_18px_40px_-25px_rgba(0,0,0,0.6)]"
            >
              <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-rust-soft shrink-0" />
              <span className="text-[9px] md:text-[9.5px] tracking-[0.32em] uppercase text-white/60 font-semibold whitespace-nowrap">
                {s.k}
              </span>
              <span className="text-[11.5px] md:text-[13px] tracking-[-0.005em] text-white font-semibold whitespace-nowrap">
                {s.v}
              </span>
            </div>
          ))}
        </div>

        {/* CTA cards — like reference site */}
        <div ref={ctas} className="flex flex-wrap gap-3 md:gap-4">
          <a
            href="/contact"
            data-cursor="hover"
            data-magnetic
            className="group inline-flex items-center gap-3 md:gap-4 pl-5 pr-3 md:pl-6 md:pr-4 py-2.5 md:py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/20 transition-colors duration-300 min-w-[210px] md:min-w-[240px]"
          >
            <div className="text-left">
              <div className="text-[9.5px] md:text-[10px] tracking-[0.28em] uppercase text-white/60 font-medium mb-0.5 md:mb-1">
                Book Now
              </div>
              <div className="text-[13.5px] md:text-[15px] font-semibold text-white tracking-tight">
                Arrange a Consultation
              </div>
            </div>
            <span className="ml-auto w-8 h-8 md:w-9 md:h-9 rounded-full bg-white text-ink flex items-center justify-center group-hover:bg-rust group-hover:text-white transition-colors duration-300">
              →
            </span>
          </a>

          <a
            href="#clinics"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 md:gap-4 pl-5 pr-3 md:pl-6 md:pr-4 py-2.5 md:py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/20 transition-colors duration-300 min-w-[210px] md:min-w-[240px]"
          >
            <div className="text-left">
              <div className="text-[9.5px] md:text-[10px] tracking-[0.28em] uppercase text-white/60 font-medium mb-0.5 md:mb-1">
                Explore
              </div>
              <div className="text-[13.5px] md:text-[15px] font-semibold text-white tracking-tight">
                Our Eight Centres
              </div>
            </div>
            <span className="ml-auto w-8 h-8 md:w-9 md:h-9 rounded-full bg-white text-ink flex items-center justify-center group-hover:bg-rust group-hover:text-white transition-colors duration-300">
              →
            </span>
          </a>
        </div>

        {/* Scroll indicator — desktop only (mobile is too tight) */}
        <div className="hidden md:flex absolute left-6 md:left-14 lg:left-20 bottom-4 md:bottom-5 items-center gap-3 text-[11px] tracking-[0.28em] uppercase text-white/55">
          <span className="inline-block w-5 h-8 rounded-full border border-white/40 relative">
            <span className="absolute left-1/2 -translate-x-1/2 top-1.5 w-1 h-1.5 rounded-full bg-white/80 animate-bounce" />
          </span>
          Scroll to discover
        </div>
      </div>
    </section>
  )
}
