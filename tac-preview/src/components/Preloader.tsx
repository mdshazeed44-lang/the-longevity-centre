import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { reduceMotion } from '../lib/motion'

// Editorial title-card preloader. Background #1e212f, type-led, restrained,
// confident pacing. References: Loro Piana, Aesop, Saint Laurent fashion-
// film opening titles. NOT: rings, stars, counters, glows.

export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (reduceMotion()) {
      setHidden(true)
      onDone()
      return
    }
    const el = root.current
    if (!el) return
    const q = (sel: string) => el.querySelectorAll<HTMLElement>(sel)

    // Initial states — everything hidden, ready for cinematic entrance
    gsap.set(q('.pre-corner'), { opacity: 0, y: -8 })
    gsap.set(q('.pre-eyebrow-letter'), { opacity: 0, y: 14 })
    gsap.set(q('.pre-display-mask'), { clipPath: 'inset(0 100% 0 0)' })
    gsap.set(q('.pre-rule'), { scaleX: 0, transformOrigin: 'center center' })
    gsap.set(q('.pre-tag-letter'), {
      opacity: 0,
      letterSpacing: '0.05em',
    })
    gsap.set(q('.pre-bottom-bar'), { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(q('.pre-bottom-meta'), { opacity: 0 })
    gsap.set(q('.pre-finale-line'), { scaleX: 0, transformOrigin: 'left center' })

    const tl = gsap.timeline({
      onComplete: () => {
        setHidden(true)
        onDone()
      },
    })

    // 1. Corner stamps fade in — sets the "production credit" frame
    tl.to(q('.pre-corner'), {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
    })
      // 2. Eyebrow "01" + rust dot — letter rise
      .to(
        q('.pre-eyebrow-letter'),
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'expo.out',
          stagger: 0.04,
        },
        '-=0.4'
      )
      // 3. Logo wipe — clip-path slides open from left, like a paper unfolding
      .to(
        q('.pre-display-mask'),
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.4,
          ease: 'expo.inOut',
        },
        '-=0.3'
      )
      // 4. Thin rust rule draws across, anchored to centre
      .to(
        q('.pre-rule'),
        {
          scaleX: 1,
          duration: 0.9,
          ease: 'expo.inOut',
        },
        '-=0.7'
      )
      // 5. Tagline letterspacing OPENS from tight 0.05em → set 0.42em while
      //    each letter fades in — Loro Piana / Aesop signature reveal.
      .to(
        q('.pre-tag-letter'),
        {
          opacity: 1,
          letterSpacing: '0.42em',
          duration: 1.4,
          ease: 'expo.out',
          stagger: 0.02,
        },
        '-=0.5'
      )
      // 6. Bottom credits bar + label fill in
      .to(
        q('.pre-bottom-meta'),
        { opacity: 1, duration: 0.4, ease: 'power3.out' },
        '-=0.6'
      )
      .to(
        q('.pre-bottom-bar'),
        { scaleX: 1, duration: 1.0, ease: 'power2.inOut' },
        '<'
      )
      // 7. Hold a confident beat — luxury timing
      .to({}, { duration: 0.35 })
      // 8. EXIT — content scales subtly + fades; finale rust line draws
      //    across the meridian.
      .to(
        q('.pre-content'),
        {
          y: -8,
          opacity: 0,
          scale: 1.02,
          duration: 0.7,
          ease: 'power3.in',
        }
      )
      .to(
        q('.pre-corner, .pre-bottom'),
        { opacity: 0, duration: 0.4, ease: 'power2.in' },
        '<'
      )
      .to(
        q('.pre-finale-line'),
        { scaleX: 1, duration: 0.6, ease: 'expo.out' },
        '-=0.4'
      )
      // 9. Single confident curtain peel — heavy cubic-bezier(0.87,0,0.13,1)
      //    feel via expo.inOut
      .to(
        q('.pre-curtain'),
        {
          yPercent: -100,
          duration: 1.0,
          ease: 'expo.inOut',
        },
        '+=0.05'
      )
      .to(
        q('.pre-finale-line'),
        { opacity: 0, duration: 0.4, ease: 'power2.out' },
        '<0.3'
      )

    return () => {
      tl.kill()
    }
  }, [onDone])

  if (hidden) return null

  const TAGLINE = 'PREMIUM LONGEVITY MEDICINE · INDIA'

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ background: '#1e212f' }}
    >
      {/* Single curtain — peels straight up at the end with one bold gesture */}
      <div className="pre-curtain absolute inset-0" style={{ background: '#1e212f' }} />

      {/* Production-credit corner stamps */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left: chapter mark + brand abbreviation */}
        <div className="pre-corner absolute top-6 left-6 md:top-8 md:left-10 flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-white/55 font-medium">
          <span className="tabular-nums">01</span>
          <span className="w-6 h-px bg-rust-soft/70" />
          <span>TAC</span>
        </div>
        {/* Top-right: roman year stamp */}
        <div className="pre-corner absolute top-6 right-6 md:top-8 md:right-10 text-[10px] tracking-[0.32em] uppercase text-white/45 font-medium tabular-nums">
          MMXXVI
        </div>
        {/* Bottom-left: subtle "now playing" label */}
        <div className="pre-corner absolute bottom-6 left-6 md:bottom-8 md:left-10 flex items-center gap-2.5 text-[10px] tracking-[0.3em] uppercase text-white/45 font-medium">
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full rounded-full bg-rust-soft opacity-70 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rust-soft" />
          </span>
          <span>Now Boarding</span>
        </div>
        {/* Bottom-right: tiny serial */}
        <div className="pre-corner absolute bottom-6 right-6 md:bottom-8 md:right-10 text-[10px] tracking-[0.3em] uppercase text-white/35 font-medium tabular-nums">
          № 0001
        </div>
      </div>

      {/* Centred title-card content */}
      <div className="pre-content absolute inset-0 flex flex-col items-center justify-center px-6">
        {/* Eyebrow — small letter-rise reveal */}
        <div className="flex items-center justify-center mb-10 md:mb-14 overflow-hidden">
          {Array.from('— A LONGEVITY PRACTICE —').map((c, i) => (
            <span
              key={i}
              className="pre-eyebrow-letter inline-block text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-rust-soft font-semibold"
              style={{ willChange: 'transform, opacity' }}
            >
              {c === ' ' ? ' ' : c}
            </span>
          ))}
        </div>

        {/* Logo — clip-path wipes open from left like a paper letterhead */}
        <div className="pre-display-mask" style={{ willChange: 'clip-path' }}>
          <img
            src="/new-logo-white.webp"
            alt="The Anti-Aging Centre"
            className="h-[60px] md:h-[80px] w-auto object-contain block"
          />
        </div>

        {/* Thin rust rule under logo — draws across from centre */}
        <div className="pre-rule mt-8 md:mt-10 h-px w-[200px] md:w-[260px] bg-rust-soft/80" style={{ willChange: 'transform' }} />

        {/* Tagline — letterspacing OPENS from tight to wide while letters fade in */}
        <div className="mt-6 md:mt-8 flex justify-center">
          {Array.from(TAGLINE).map((c, i) => (
            <span
              key={i}
              className="pre-tag-letter inline-block text-[10px] md:text-[11px] uppercase text-white/60 font-medium"
              style={{ willChange: 'opacity, letter-spacing' }}
            >
              {c === ' ' ? ' ' : c}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom credits — thin line + minimal label, like a movie poster */}
      <div className="pre-bottom absolute left-0 right-0 bottom-0 px-6 md:px-10 pb-3.5 md:pb-4">
        <div className="pre-bottom-meta flex items-center justify-between text-[9.5px] tracking-[0.32em] uppercase text-white/35 font-medium mb-2">
          <span>Loading</span>
          <span className="tabular-nums">India · 2026</span>
        </div>
        <div className="h-px w-full bg-white/8 overflow-hidden">
          <div className="pre-bottom-bar h-full w-full bg-white/35" style={{ willChange: 'transform' }} />
        </div>
      </div>

      {/* Finale rust hairline — drawn across the meridian during exit */}
      <div
        className="pre-finale-line absolute left-0 right-0 top-1/2 h-px bg-rust-soft"
        style={{ willChange: 'transform, opacity' }}
      />
    </div>
  )
}
