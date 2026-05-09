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
//   science (DNA helix) · vitality (cycling) · longevity (elderly
//   couple holding hands as they walk) · clinical (clinic interior).
// The longevity pillar replaced an earlier beach-yoga clip — the new
// clip is more directly on-message (it literally shows what living
// long together looks like) and ships as true 4K 3840×2160, matching
// the DNA clip's resolution.
// All four sources are HD or higher. Render treatment is tuned for
// sharpness (Ken Burns held to 1.02, light gradients, contrast +
// saturation lift on the <video>). Cache-bust `?v=5` because
// wellness.mp4 was retired this round in favour of longevity.mp4.
const HERO_CLIPS = [
  '/videos/hero-clips/dna.mp4?v=5',       // DNA helix 4K — science
  '/videos/hero-clips/cycling.mp4?v=5',   // outdoor cycling — vitality
  '/videos/hero-clips/longevity.mp4?v=5', // elderly couple walking 4K — longevity
  '/videos/hero-clips/clinic.mp4?v=5',    // premium clinic — clinical
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

  // ────────────────────────────────────────────────────────────
  // Mount-only effect: text reveal + start the rotation cycle.
  // The video playback / Ken Burns are handled in a SEPARATE
  // effect keyed on `activeClip` (further down) so that only the
  // visible video is actually decoding frames at any moment.
  // Decoding all four 4K/1080p clips in parallel was the cause of
  // the choppy hero playback.
  // ────────────────────────────────────────────────────────────
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

    // Cross-fade rotation — advance to the next clip every CLIP_DURATION_MS.
    const cycle = window.setInterval(() => {
      setActiveClip((i) => (i + 1) % HERO_CLIPS.length)
    }, CLIP_DURATION_MS)

    return () => {
      tl.kill()
      window.clearInterval(cycle)
    }
  }, [])

  // ────────────────────────────────────────────────────────────
  // Per-clip activation effect — runs on every activeClip change
  // AND once on mount.
  //
  // 1. Only the active clip is told to .load() + .play(); the other
  //    three are paused, which stops the browser from decoding
  //    their frames in the background. This was the single biggest
  //    perf win on the hero.
  // 2. Ken Burns scale runs ONLY on the active clip and is restarted
  //    each cycle, so we never have four parallel infinite tweens
  //    fighting for GPU.
  // 3. We also pre-warm the NEXT clip (load metadata only) so the
  //    cross-fade starts on a clip that already has some buffer.
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    const reduced = reduceMotion()
    const vids = videoRefs.current
    const nextIdx = (activeClip + 1) % HERO_CLIPS.length

    // Helper that asks the browser to start playing, and if that
    // fails (iOS Safari is picky — sometimes rejects the first
    // .play() because metadata isn't loaded yet), waits for the
    // `canplay` event and retries once. This is what makes the
    // hero auto-start on iPhone without a tap.
    const tryPlay = (v: HTMLVideoElement) => {
      // muted + playsInline must be set before play(). They are
      // set on the JSX, but we re-assert here in case React reused
      // a node and the attributes got out of sync.
      v.muted = true
      v.playsInline = true
      const p = v.play()
      if (p && typeof p.catch === 'function') {
        p.catch(() => {
          // Wait for the next 'canplay' tick and retry. We listen
          // once so we don't pile up handlers across clip changes.
          const onCanPlay = () => {
            v.removeEventListener('canplay', onCanPlay)
            v.play().catch(() => { /* still blocked — poster stays */ })
          }
          v.addEventListener('canplay', onCanPlay, { once: true })
        })
      }
    }

    vids.forEach((v, i) => {
      if (!v) return
      if (i === activeClip) {
        // Active: load + try to play. The retry-on-canplay logic
        // inside tryPlay() is what unblocks iOS Safari.
        try { v.load() } catch { /* noop */ }
        v.currentTime = 0
        tryPlay(v)
      } else if (i === nextIdx) {
        // Pre-warm the next clip's first frames so the cross-fade
        // doesn't start on a black/loading frame.
        try { v.load() } catch { /* noop */ }
        v.pause()
      } else {
        // Far-from-active clips: pause to stop frame decoding.
        v.pause()
      }
    })

    if (reduced) return
    const active = vids[activeClip]
    if (!active) return
    // Restart Ken Burns on the newly active clip; kill any existing
    // tween on it so we don't stack.
    gsap.killTweensOf(active)
    gsap.set(active, { scale: 1.02 })
    const kb = gsap.to(active, {
      scale: 1.0,
      // Slightly longer than CLIP_DURATION_MS so the zoom keeps moving
      // through the cross-fade tail.
      duration: (CLIP_DURATION_MS + 1500) / 1000,
      ease: 'sine.inOut',
    })
    return () => { kb.kill() }
  }, [activeClip])

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
          is opacity:1 AND playing. The other three are paused so the
          browser is not decoding their frames in the background; the
          activation useEffect above orchestrates load / play / pause
          on every activeClip change.
          We deliberately do NOT set `autoPlay` — earlier we did, and
          all four <video> elements would start decoding simultaneously
          which made the visible clip stutter on weaker GPUs. The
          contrast filter is also only painted on the active video for
          the same reason. */}
      {HERO_CLIPS.map((src, i) => {
        const isActive = i === activeClip
        const nextIdx = (activeClip + 1) % HERO_CLIPS.length
        const isNext = i === nextIdx
        return (
          <video
            key={src}
            ref={(el) => { videoRefs.current[i] = el }}
            className="absolute inset-0 w-full h-full object-cover will-change-transform transition-opacity duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            poster="/videos/hero-poster.jpg"
            // autoPlay + muted + playsInline is the ONLY combination
            // iOS Safari treats as "may autoplay without user gesture".
            // Removing autoPlay (we tried) made the hero need a tap on
            // iPhone — kept here as a belt-and-suspenders alongside the
            // imperative .play() in the activation effect.
            autoPlay
            loop
            muted
            playsInline
            // preload="metadata" gives iOS just enough to satisfy its
            // "video is playable" gate (without it, the first .play()
            // call rejects synchronously). It's only a few KB per clip
            // so the LCP impact is negligible — and the active clip
            // gets a proper preload="auto" since we want the bytes
            // ready before we cross-fade in.
            preload={isActive ? 'auto' : isNext ? 'metadata' : 'none'}
            aria-hidden="true"
            style={{
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 2 : 1,
              // Tiny contrast + saturation lift makes HD source read as
              // crisp on viewports that upscale past native (1440p+).
              // Keep this conservative — anything above 1.08 starts to
              // posterise the swimming-pool tones. Only applied to the
              // active video so the GPU isn't filtering hidden frames.
              filter: isActive ? 'contrast(1.06) saturate(1.08)' : 'none',
            }}
          >
            <source src={src} type="video/mp4" />
          </video>
        )
      })}

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
