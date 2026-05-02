import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { reduceMotion } from '../lib/motion'

// Premium animated preloader — aurora ambient + orbiting rings around logo +
// per-letter tagline reveal + animated counter + shimmer-fill bar + 3-slice
// curtain peel with a rust hairline drawn across.
// Background is the brand-handover colour #1e212f (dark midnight blue-grey).

const TAGLINE = 'PREMIUM LONGEVITY MEDICINE · INDIA'

// Pre-computed star positions so they're stable across renders.
const STARS = [
  { l: 8, t: 18, d: 0.0 }, { l: 18, t: 72, d: 0.4 }, { l: 27, t: 38, d: 1.1 },
  { l: 35, t: 86, d: 0.7 }, { l: 46, t: 12, d: 1.4 }, { l: 54, t: 64, d: 0.2 },
  { l: 63, t: 28, d: 0.9 }, { l: 72, t: 78, d: 1.6 }, { l: 80, t: 42, d: 0.5 },
  { l: 88, t: 18, d: 1.2 }, { l: 92, t: 70, d: 0.3 }, { l: 14, t: 56, d: 0.8 },
]

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

    // Initial states
    gsap.set(q('.pre-logo'), { opacity: 0, y: 20, scale: 0.85, rotateY: 18, transformPerspective: 800 })
    gsap.set(q('.pre-glow'), { opacity: 0, scale: 0.7 })
    gsap.set(q('.pre-ring'), { opacity: 0, scale: 0.85 })
    gsap.set(q('.pre-letter'), { yPercent: 110, opacity: 0 })
    gsap.set(q('.pre-counter'), { opacity: 0, y: 6 })
    gsap.set(q('.pre-bar'), { opacity: 0 })
    gsap.set(q('.pre-bar-fill'), { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(q('.pre-finale-line'), { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(q('.pre-star'), { opacity: 0, scale: 0.4 })

    const counterEl = el.querySelector<HTMLElement>('.pre-counter-num')
    const counterObj = { v: 0 }

    const tl = gsap.timeline({
      onComplete: () => {
        setHidden(true)
        onDone()
      },
    })

    // 1. Stars twinkle in
    tl.to(q('.pre-star'), {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out',
      stagger: { each: 0.04, from: 'random' },
    })
      // 2. Glow halo blooms
      .to(
        q('.pre-glow'),
        { opacity: 1, scale: 1, duration: 1.0, ease: 'expo.out' },
        '-=0.6'
      )
      // 3. Orbiting rings pop in
      .to(
        q('.pre-ring'),
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.08,
        },
        '-=0.7'
      )
      // 4. Logo lands with 3D flip
      .to(
        q('.pre-logo'),
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 1.1,
          ease: 'expo.out',
        },
        '-=0.6'
      )
      // 5. Per-letter tagline reveal
      .to(
        q('.pre-letter'),
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'expo.out',
          stagger: 0.022,
        },
        '-=0.5'
      )
      // 6. Counter + bar appear, count from 0 → 100
      .to(
        q('.pre-counter'),
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
        '-=0.3'
      )
      .to(
        q('.pre-bar'),
        { opacity: 1, duration: 0.3, ease: 'power3.out' },
        '<'
      )
      .to(
        counterObj,
        {
          v: 100,
          duration: 1.4,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counterEl) counterEl.textContent = String(Math.round(counterObj.v)).padStart(2, '0')
          },
        },
        '<'
      )
      .to(
        q('.pre-bar-fill'),
        { scaleX: 1, duration: 1.4, ease: 'power2.inOut' },
        '<'
      )
      // 7. Hold a beat, then collapse content
      .to(
        q('.pre-content'),
        {
          y: -16,
          opacity: 0,
          scale: 1.04,
          duration: 0.55,
          ease: 'power3.in',
        },
        '+=0.25'
      )
      // 8. Rust hairline draws across the meridian
      .to(
        q('.pre-finale-line'),
        { scaleX: 1, duration: 0.7, ease: 'expo.out' },
        '-=0.4'
      )
      // 9. Three-slice curtain peel — top up, middle hold, bottom down
      .to(
        q('.pre-curtain-top'),
        { yPercent: -100, duration: 0.95, ease: 'expo.inOut' },
        '+=0.05'
      )
      .to(
        q('.pre-curtain-mid'),
        { scaleY: 0, transformOrigin: 'center center', duration: 0.9, ease: 'expo.inOut' },
        '<0.05'
      )
      .to(
        q('.pre-curtain-bot'),
        { yPercent: 100, duration: 0.95, ease: 'expo.inOut' },
        '<'
      )
      .to(
        q('.pre-finale-line'),
        { opacity: 0, duration: 0.4, ease: 'power2.out' },
        '<0.2'
      )

    return () => {
      tl.kill()
    }
  }, [onDone])

  if (hidden) return null

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ background: '#1e212f' }}
    >
      <style>{`
        @keyframes pre-aurora {
          0%   { transform: translate(0%, 0%) scale(1); opacity: 0.55; }
          50%  { transform: translate(6%, -4%) scale(1.06); opacity: 0.75; }
          100% { transform: translate(0%, 0%) scale(1); opacity: 0.55; }
        }
        @keyframes pre-aurora-2 {
          0%   { transform: translate(0%, 0%); opacity: 0.4; }
          50%  { transform: translate(-7%, 5%); opacity: 0.6; }
          100% { transform: translate(0%, 0%); opacity: 0.4; }
        }
        @keyframes pre-spin-cw  { 0% { transform: rotate(0deg);    } 100% { transform: rotate(360deg);  } }
        @keyframes pre-spin-ccw { 0% { transform: rotate(0deg);    } 100% { transform: rotate(-360deg); } }
        @keyframes pre-pulse-glow {
          0%, 100% { transform: scale(1);    opacity: 1;   }
          50%      { transform: scale(1.08); opacity: 0.8; }
        }
        @keyframes pre-twinkle {
          0%, 100% { opacity: 0.25; transform: scale(0.8); }
          50%      { opacity: 1;    transform: scale(1.3); }
        }
        @keyframes pre-shimmer {
          0%   { background-position:   0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .pre-aurora-1 { animation: pre-aurora    14s ease-in-out infinite; will-change: transform, opacity; }
        .pre-aurora-2 { animation: pre-aurora-2  18s ease-in-out infinite; will-change: transform, opacity; }
        .pre-ring-outer { animation: pre-spin-cw  60s linear infinite; }
        .pre-ring-mid   { animation: pre-spin-ccw 45s linear infinite; }
        .pre-ring-inner { animation: pre-spin-cw  30s linear infinite; }
        .pre-glow-pulse { animation: pre-pulse-glow 3.5s ease-in-out infinite; }
        .pre-star { animation: pre-twinkle 4s ease-in-out infinite; will-change: opacity, transform; }
        .pre-bar-fill {
          background: linear-gradient(90deg,
            rgba(178,122,123,0.25) 0%,
            rgba(178,122,123,0.95) 50%,
            rgba(178,122,123,0.25) 100%);
          background-size: 200% 100%;
          animation: pre-shimmer 1.6s linear infinite;
          will-change: background-position;
        }
      `}</style>

      {/* Three-slice curtain — peel top-up, middle-collapse, bottom-down */}
      <div className="absolute inset-0 flex flex-col">
        <div className="pre-curtain-top flex-1" style={{ background: '#1e212f' }} />
        <div className="pre-curtain-mid flex-1" style={{ background: '#1e212f' }} />
        <div className="pre-curtain-bot flex-1" style={{ background: '#1e212f' }} />
      </div>

      {/* Aurora ambient — two drifting radial blobs (rust + soft blue) */}
      <div
        aria-hidden
        className="pre-aurora-1 absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(700px 500px at 30% 35%, rgba(178,122,123,0.20), transparent 65%)',
        }}
      />
      <div
        aria-hidden
        className="pre-aurora-2 absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(800px 600px at 75% 70%, rgba(120,140,180,0.12), transparent 60%)',
        }}
      />

      {/* Constellation — twinkling stars */}
      <div className="absolute inset-0 pointer-events-none">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="pre-star absolute w-[3px] h-[3px] rounded-full bg-white/70"
            style={{
              left: `${s.l}%`,
              top: `${s.t}%`,
              animationDelay: `${s.d}s`,
              boxShadow: '0 0 6px rgba(255,255,255,0.7), 0 0 12px rgba(178,122,123,0.4)',
            }}
          />
        ))}
      </div>

      {/* Centered content */}
      <div className="pre-content absolute inset-0 flex flex-col items-center justify-center">
        {/* Logo with orbiting rings + glow halo */}
        <div className="relative flex items-center justify-center">
          {/* Rust glow halo */}
          <div
            className="pre-glow pre-glow-pulse absolute -inset-16 md:-inset-20 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(178,122,123,0.35) 0%, rgba(178,122,123,0) 70%)',
              filter: 'blur(20px)',
              willChange: 'transform, opacity',
            }}
          />

          {/* Outer ring with rust dot accent */}
          <div className="pre-ring pre-ring-outer absolute -inset-20 md:-inset-24 rounded-full border border-rust-soft/25 will-change-transform">
            <span aria-hidden className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rust-soft" style={{ boxShadow: '0 0 8px rgba(178,122,123,0.8)' }} />
          </div>

          {/* Mid ring (counter-spin) */}
          <div className="pre-ring pre-ring-mid absolute -inset-14 md:-inset-16 rounded-full border border-white/10 will-change-transform">
            <span aria-hidden className="absolute top-1/2 -right-0.5 -translate-y-1/2 w-1 h-1 rounded-full bg-white/70" />
            <span aria-hidden className="absolute top-1/2 -left-0.5 -translate-y-1/2 w-1 h-1 rounded-full bg-white/40" />
          </div>

          {/* Inner ring */}
          <div className="pre-ring pre-ring-inner absolute -inset-10 md:-inset-11 rounded-full border border-rust-soft/15 will-change-transform" />

          {/* Logo */}
          <img
            src="/new-logo-white.webp"
            alt="The Anti-Aging Centre"
            className="pre-logo relative z-10 h-[60px] md:h-[72px] w-auto object-contain"
            style={{ willChange: 'transform, opacity' }}
          />
        </div>

        {/* Per-letter tagline */}
        <div className="mt-12 md:mt-14 overflow-hidden">
          <div className="flex justify-center text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-white/65 font-medium">
            {Array.from(TAGLINE).map((c, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <span className="pre-letter inline-block" style={{ willChange: 'transform, opacity' }}>
                  {c === ' ' ? ' ' : c}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Counter + bar */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div
            className="pre-counter text-[10px] tracking-[0.32em] uppercase text-white/45 tabular-nums font-medium"
            style={{ willChange: 'transform, opacity' }}
          >
            <span className="pre-counter-num">00</span>
            <span className="text-white/25 mx-1">/</span>
            <span>100</span>
          </div>
          <div className="pre-bar h-px w-[240px] md:w-[280px] bg-white/10 overflow-hidden" style={{ willChange: 'opacity' }}>
            <div className="pre-bar-fill h-full w-full" style={{ willChange: 'transform' }} />
          </div>
        </div>
      </div>

      {/* Rust hairline drawn across the meridian as the curtains part */}
      <div
        className="pre-finale-line absolute left-0 right-0 top-1/2 h-px bg-rust-soft will-change-transform"
        style={{ boxShadow: '0 0 12px rgba(178,122,123,0.7)' }}
      />
    </div>
  )
}
