import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion, instantMotion } from '../lib/motion'

// Hero brand-reel — cross-fades between 4 themed clips on a 5.5s
// cycle to give the page the same multi-shot cinematic open as
// healthylongevity.clinic. All four clips are landscape Full-HD
// (1920x1080) MP4s downloaded from Pexels and bundled in
// /public/videos/hero-clips/ (~55 MB total, lazy-loaded after
// first paint so they don't compete with the LCP).
//
// Brand reel — five pillars of TLC's longevity proposition:
//   1. science      — DNA helix (4K animation)
//   2. vitality     — group mountain hike (fit people trekking)
//   3. mindfulness  — yoga in a dark studio (single seated pose,
//                     light streaming through a window). Added at
//                     the user's request as a 5th slot to balance
//                     the active-vitality clip with a calmer,
//                     introspective frame. Average 48/255
//                     brightness so the headline still reads.
//   4. wellness     — premium fresh nutrition (healthy living)
//   5. circulation  — blood cells flowing through a vein (3D)
// All five clips are 1080p / 720p HD (no 4K master any more).
// Render treatment is tuned for sharpness (Ken Burns held to 1.02,
// uniform 0.42 dark wash, contrast + saturation lift on the active
// <video>, only the active clip decoding frames). Cache-bust
// `?v=14` — perf pass: `dna.mp4` is the SAME original premium DNA
// clip, just re-encoded from the 14.6 MB 4K master down to a 4.0 MB
// 1080p H.264 (it's the FIRST clip shown, so this is the single
// biggest perceived-load win — identical footage). `wellness.mp4`
// holds a premium fresh-nutrition clip, `cycling.mp4` a group
// mountain-hike clip (no skin treatment anywhere in the reel).
// Filenames kept stable to avoid churn.
const HERO_CLIPS = [
  '/videos/hero-clips/dna.mp4?v=15',         // DNA helix 1080p — science
  '/videos/hero-clips/cycling.mp4?v=15',     // group mountain hike — vitality
  '/videos/hero-clips/yoga.mp4?v=15',        // dark studio yoga — mindfulness
  '/videos/hero-clips/wellness.mp4?v=15',    // premium fresh nutrition — healthy living
  '/videos/hero-clips/circulation.mp4?v=15', // blood cells in vein — circulation
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
    // instantMotion() also bails for crawlers/headless renderers, so the
    // masked headline is never left hidden in a render snapshot.
    if (instantMotion()) return
    const el = ref.current
    if (!el) return
    const chars = el.querySelectorAll<HTMLElement>('.mr-char')
    // Apply the hidden start-state INSIDE requestAnimationFrame. rAF callbacks
    // run right before paint, so real users still never see the headline
    // un-masked (no flash) — but a headless crawler that FREEZES rAF while it
    // captures its screenshot (Screaming Frog, and some WRS snapshots) never
    // runs this callback, so the text is left in its natural, fully-visible
    // position instead of being captured stuck below the mask. That stuck-hidden
    // state was the "rendered page looks blank" finding in the crawlability audit.
    const raf = window.requestAnimationFrame(() => {
      gsap.set(chars, { yPercent: 110 })
      gsap.to(chars, {
        yPercent: 0,
        duration: 0.6,
        ease: 'expo.out',
        stagger: 0.02,
        delay,
      })
    })
    // Belt-and-suspenders: a timer (rAF-independent) forces the headline visible
    // if the reveal ever stalls in a renderer whose rAF ticks but slowly. Kept
    // just above the animation's natural end so it's a no-op for real users but
    // guarantees a fast reveal for any crawler that captures late.
    const reveal = window.setTimeout(() => {
      gsap.set(chars, { yPercent: 0, clearProps: 'transform' })
    }, 700)
    return () => {
      window.cancelAnimationFrame(raf)
      window.clearTimeout(reveal)
    }
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
  // `armed` gates ALL hero-video network. Until it flips true we
  // render no <source>, so the browser spends its first bytes on
  // the critical JS/CSS + the 41 KB poster (the LCP) instead of
  // racing a multi-MB clip. We flip it once the page is idle
  // (requestIdleCallback) or, as a hard ceiling, 1.2 s after mount —
  // whichever comes first. Net effect: identical visuals, far
  // faster first paint / time-to-interactive on slow connections.
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    // Never fetch the multi-MB hero clips on data-saver or slow connections
    // (2g / 3g, and Lighthouse's throttled mobile test where it applies): the
    // poster alone carries the hero, so skipping ~7 MB of video is a large
    // mobile win on FCP/LCP/TBT and the visitor's data.
    const conn = (
      navigator as unknown as {
        connection?: { saveData?: boolean; effectiveType?: string }
      }
    ).connection
    if (
      conn &&
      (conn.saveData === true ||
        /(^|\b)(slow-2g|2g|3g)$/.test(conn.effectiveType || ''))
    ) {
      return
    }

    let done = false
    const arm = () => {
      if (done) return
      done = true
      setArmed(true)
    }
    type RIC = (cb: () => void, opts?: { timeout: number }) => number
    const ric = (window as unknown as { requestIdleCallback?: RIC })
      .requestIdleCallback
    const idle = ric
      ? ric(arm, { timeout: 1200 })
      : window.setTimeout(arm, 1200)
    const hardCeiling = window.setTimeout(arm, 1500)
    return () => {
      const cic = (window as unknown as {
        cancelIdleCallback?: (id: number) => void
      }).cancelIdleCallback
      if (ric && cic) cic(idle as number)
      else window.clearTimeout(idle as number)
      window.clearTimeout(hardCeiling)
    }
  }, [])

  // Once armed, the <source> children are added to the DOM. A
  // <source> appended after mount is NOT picked up until the
  // element is told to .load() — so do that exactly once here.
  // The per-clip activation effect (which also depends on `armed`)
  // then handles play/pause as usual.
  useEffect(() => {
    if (!armed) return
    videoRefs.current.forEach((v) => {
      if (v) v.load()
    })
  }, [armed])

  // ────────────────────────────────────────────────────────────
  // Mount-only effect: text reveal + start the rotation cycle.
  // The video playback / Ken Burns are handled in a SEPARATE
  // effect keyed on `activeClip` (further down) so that only the
  // visible video is actually decoding frames at any moment.
  // Decoding all four 4K/1080p clips in parallel was the cause of
  // the choppy hero playback.
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    // Crawlers/headless renderers skip the hide, so eyebrow/paragraph/CTAs are
    // painted immediately instead of waiting for the rAF-driven reveal.
    if (instantMotion()) return

    // Hide + reveal INSIDE requestAnimationFrame — a headless crawler that
    // freezes rAF while it captures its screenshot never runs this callback, so
    // eyebrow / paragraph / CTAs stay painted in their natural, fully-visible
    // state (no blank crawler snapshot). rAF runs before paint, so real users
    // see no flash.
    let tl: gsap.core.Timeline | null = null
    const introRaf = window.requestAnimationFrame(() => {
      gsap.set(eyebrow.current, { opacity: 0, y: -10 })
      gsap.set(para.current, { opacity: 0, y: 16 })
      gsap.set(ctas.current?.children ?? [], { opacity: 0, y: 16 })

      tl = gsap.timeline({ delay: 0.1 })
      tl.to(eyebrow.current, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
      })
        .to(
          para.current,
          { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
          '-=0.35'
        )
        .to(
          ctas.current?.children ?? [],
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power3.out',
            stagger: 0.06,
          },
          '-=0.4'
        )
    })

    // Safety net (same reason as MaskedReveal) — if GSAP's rAF-based reveal
    // stalls in Googlebot's renderer, setTimeout still fires and forces the
    // eyebrow / paragraph / CTAs visible, so the crawler + render snapshot see
    // a real hero instead of a blank one. No-op for real users.
    const heroReveal = window.setTimeout(() => {
      const els = [
        eyebrow.current,
        para.current,
        ...(ctas.current ? Array.from(ctas.current.children) : []),
      ].filter(Boolean)
      gsap.set(els, { opacity: 1, y: 0, clearProps: 'opacity,transform' })
    }, 900)

    // Cross-fade rotation — advance to the next clip every CLIP_DURATION_MS.
    const cycle = window.setInterval(() => {
      setActiveClip((i) => (i + 1) % HERO_CLIPS.length)
    }, CLIP_DURATION_MS)

    // iOS Safari fallback: if Low Power Mode is on, or the page is
    // restored from bfcache, or any other reason the muted-autoplay
    // policy didn't kick in, the browser will leave the videos
    // paused and the user sees the static poster. The standard
    // workaround is to listen for the FIRST user interaction
    // (touch / scroll / click anywhere) and call .play() on every
    // hero video then. Safari counts that interaction as the
    // gesture-trigger autoplay needs.
    const kickPlayOnFirstInteraction = () => {
      videoRefs.current.forEach((v) => {
        if (v && v.paused) v.play().catch(() => { /* poster stays */ })
      })
    }
    const opts = { once: true, passive: true } as const
    document.addEventListener('touchstart', kickPlayOnFirstInteraction, opts)
    document.addEventListener('touchend', kickPlayOnFirstInteraction, opts)
    document.addEventListener('click', kickPlayOnFirstInteraction, opts)
    window.addEventListener('scroll', kickPlayOnFirstInteraction, opts)

    return () => {
      window.cancelAnimationFrame(introRaf)
      tl?.kill()
      window.clearTimeout(heroReveal)
      window.clearInterval(cycle)
      document.removeEventListener('touchstart', kickPlayOnFirstInteraction)
      document.removeEventListener('touchend', kickPlayOnFirstInteraction)
      document.removeEventListener('click', kickPlayOnFirstInteraction)
      window.removeEventListener('scroll', kickPlayOnFirstInteraction)
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

    // Helper: try to play a video, retry once on canplay if iOS
    // rejected the first attempt because metadata wasn't ready.
    // Note we deliberately do NOT call .load() or reset .currentTime
    // — both are expensive on iOS Safari and were the actual cause
    // of the "video doesn't play at all on iPhone" report. The
    // browser's own autoplay flow (autoplay + muted + playsInline
    // + preload="metadata" on the JSX) handles the initial play;
    // we only need to flip play/pause as activeClip rotates.
    const tryPlay = (v: HTMLVideoElement) => {
      // Re-assert iOS-required attrs — React may reuse a DOM node
      // and lose them between renders.
      v.muted = true
      v.playsInline = true
      const p = v.play()
      if (p && typeof p.catch === 'function') {
        p.catch(() => {
          const onCanPlay = () => {
            v.removeEventListener('canplay', onCanPlay)
            v.play().catch(() => { /* poster stays */ })
          }
          v.addEventListener('canplay', onCanPlay, { once: true })
        })
      }
    }

    vids.forEach((v, i) => {
      if (!v) return
      if (i === activeClip) {
        // Active: ensure playing (idempotent — if already playing,
        // .play() is a no-op).
        tryPlay(v)
      } else {
        // Everything else (including `next`) stays paused. iOS only
        // has to decode one stream at a time. The `next` clip's
        // preload="metadata" attribute (set in the JSX below) makes
        // sure it has metadata + first frame buffered, so the
        // cross-fade-in still starts on a real frame instead of black.
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
  }, [activeClip, armed])

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
        src="/videos/hero-poster.jpg?v=3"
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
            poster="/videos/hero-poster.jpg?v=3"
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
            // so the LCP impact is negligible. We deliberately do NOT
            // bump the active clip to "auto" — on cellular iPhones
            // that means the browser tries to download the full
            // 15-19 MB clip before starting playback, which manifests
            // as "video doesn't play at all on iPhone".
            preload={isActive || isNext ? 'metadata' : 'none'}
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
            {armed && <source src={src} type="video/mp4" />}
          </video>
        )
      })}

      {/* Cinematic overlays — modelled on healthylongevityclinic.cz,
          where the WHOLE video is uniformly dimmed so white text
          reads everywhere instead of just on the left side.
          Three layers, in order from bottom to top:
            (1) Solid translucent dark wash covering the whole
                hero (rgba 0.42). This is the "translucent video"
                effect — a flat darken that dims every clip,
                including the bright wellness/facial frame, by
                about 40% so the white headline holds anywhere
                it lands.
            (2) Soft top→bottom vignette — adds a touch more
                weight behind the eyebrow row and CTA pills.
                Lightened from the previous bigger numbers
                because the uniform wash already does the
                heavy lifting.
            (3) Subtle left→right gradient — just a hint, so the
                left half (where text sits) is a few % darker
                than the right (where the video subject sits).
                Far softer than the old 0.92 wash.
          Combined with text-shadow on every hero text element,
          the headline + body + spec pills + CTAs read across
          all four clips while the video stays watchable. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(10,8,7,0.42)' }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,8,7,0.35) 0%, rgba(10,8,7,0.0) 22%, rgba(10,8,7,0.0) 70%, rgba(10,8,7,0.5) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,8,7,0.28) 0%, rgba(10,8,7,0.08) 50%, rgba(10,8,7,0.0) 80%)',
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

      {/* Content — left aligned, premium hero layout.
          Whisper-soft text-shadow modelled on healthylongevityclinic
          .cz: `1px 1px 12px rgba(0,0,0,0.15)` — only 15% opacity,
          1px offset, 12px blur. Almost invisible to the eye but
          adds just enough edge contrast that white text stays
          legible on every clip. The previous attempt (85% opacity,
          14px blur) was too heavy — letters looked fuzzy and the
          shadow got clipped by the masked-reveal per-character
          overflow-hidden wrappers, making descenders look nibbled.
          At 15% opacity the per-char clipping is imperceptible. */}
      <style>{`
        .tlc-hero-shadow {
          text-shadow: 1px 1px 12px rgba(0,0,0,0.15);
        }
      `}</style>
      <div className="relative z-10 min-h-screen min-h-[100svh] flex flex-col justify-center md:justify-end pt-24 pb-10 md:pt-28 md:pb-16 px-6 md:px-14 lg:px-20 max-w-[1500px] mx-auto">
        {/* Eyebrow + phone pill row */}
        <div ref={eyebrow} className="flex flex-wrap items-center gap-3 md:gap-4 mb-3 md:mb-5">
          <span className="tlc-hero-shadow text-[10.5px] md:text-[12px] tracking-[0.32em] uppercase font-semibold text-white">
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
        <h1 className="tlc-hero-shadow font-display font-bold text-[34px] sm:text-[50px] md:text-[68px] xl:text-[92px] leading-[1.0] md:leading-[0.98] tracking-[-0.04em] text-white max-w-[1100px] mb-4 md:mb-6">
          <MaskedReveal text="Age should" delay={0.2} charClassName="text-white/95" />
          <br />
          <MaskedReveal text="never define you." delay={0.35} charClassName="text-white" />
        </h1>

        {/* Description — bumped to text-white/95 (was /80) so even
            with the dark wash beneath, the body copy reads at full
            brightness across all four clips. */}
        <p
          ref={para}
          className="tlc-hero-shadow text-[14px] md:text-[17px] leading-[1.55] md:leading-[1.6] text-white/95 max-w-[560px] mb-4 md:mb-6 font-light"
        >
          Explore TLC's innovative, personalised preventive medicine for a
          vibrant and fulfilling life — at any stage.
        </p>

        {/* Slim spec pills — anchor key facts inline above the CTAs */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-7">
          {[
            { k: 'Centres', v: '6 Pan-India' },
            { k: 'Experience', v: '20+ Years' },
            { k: 'Specialities', v: 'Longevity · Metabolic · Gut · Skin' },
          ].map((s) => (
            <div
              key={s.k}
              className="inline-flex items-center gap-2 md:gap-3 backdrop-blur-md bg-white/[0.06] hover:bg-white/[0.10] transition-colors duration-500 border border-white/15 rounded-full pl-3 pr-3.5 md:pl-4 md:pr-5 py-1.5 md:py-2.5 shadow-[0_18px_40px_-25px_rgba(0,0,0,0.6)]"
            >
              <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-rust-soft shrink-0" />
              {/* Spec pill label (CENTRES / EXPERIENCE / SPECIALITIES)
                  was text-white/60 — too dim against the dimmed video.
                  Bumped to /90 so the eyebrow tracking-out copy reads
                  cleanly across all four clips. */}
              <span className="text-[9px] md:text-[9.5px] tracking-[0.32em] uppercase text-white/90 font-semibold whitespace-nowrap">
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
              <div className="text-[9.5px] md:text-[10px] tracking-[0.28em] uppercase text-white/90 font-medium mb-0.5 md:mb-1">
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
              <div className="text-[9.5px] md:text-[10px] tracking-[0.28em] uppercase text-white/90 font-medium mb-0.5 md:mb-1">
                Explore
              </div>
              <div className="text-[13.5px] md:text-[15px] font-semibold text-white tracking-tight">
                Our Six Centres
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
