import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { reduceMotion } from '../lib/motion'

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
    const q = (sel: string) => el.querySelectorAll(sel)
    gsap.set(q('.pre-logo'), { opacity: 0, y: 12, scale: 0.96 })
    gsap.set(q('.pre-tag'), { opacity: 0, y: 8 })
    gsap.set(q('.pre-bar-fill'), {
      scaleX: 0,
      transformOrigin: 'left center',
    })
    const tl = gsap.timeline({
      onComplete: () => {
        setHidden(true)
        onDone()
      },
    })
    tl.to(q('.pre-logo'), {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.9,
      ease: 'expo.out',
    })
      .to(
        q('.pre-tag'),
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      .to(
        q('.pre-bar-fill'),
        { scaleX: 1, duration: 1.1, ease: 'power3.inOut' },
        '-=0.4'
      )
      .to(q('.pre-content'), {
        y: -24,
        opacity: 0,
        duration: 0.55,
        ease: 'power3.in',
      })
      .to(
        q('.pre-curtain'),
        {
          yPercent: -100,
          duration: 1.0,
          ease: 'expo.inOut',
          stagger: 0.08,
        },
        '-=0.3'
      )
    return () => {
      tl.kill()
    }
  }, [onDone])

  if (hidden) return null

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] pointer-events-none"
      aria-hidden="true"
    >
      {/* Two-curtain reveal */}
      <div className="absolute inset-0 flex flex-col">
        <div className="pre-curtain bg-ink flex-1" />
        <div className="pre-curtain bg-ink flex-1" />
      </div>

      {/* Centered TAC logo + tagline + progress line */}
      <div className="pre-content absolute inset-0 flex flex-col items-center justify-center">
        <img
          src="/new-logo-white.webp"
          alt="The Anti-Aging Centre"
          className="pre-logo h-[60px] md:h-[72px] w-auto object-contain"
          style={{ willChange: 'transform, opacity' }}
        />
        <div className="pre-tag mt-8 text-[10px] tracking-[0.4em] uppercase text-white/55 font-medium">
          Premium Longevity Medicine · India
        </div>
        <div className="mt-10 h-px w-[220px] bg-white/15 overflow-hidden">
          <div className="pre-bar-fill h-full w-full bg-rust-soft" />
        </div>
      </div>
    </div>
  )
}
