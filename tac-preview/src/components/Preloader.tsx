import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { reduceMotion } from '../lib/motion'
import { LogoMark } from './Logo'

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
    gsap.set(q('.pre-mark-icon'), { opacity: 0, scale: 0.7 })
    gsap.set(q('.pre-mark span'), { y: '110%' })
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
    tl.to(q('.pre-mark-icon'), {
      opacity: 1,
      scale: 1,
      duration: 0.9,
      ease: 'expo.out',
    })
      .to(
        q('.pre-mark span'),
        {
          y: '0%',
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.06,
        },
        '-=0.5'
      )
      .to(
        q('.pre-tag'),
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.5'
      )
      .to(
        q('.pre-bar-fill'),
        { scaleX: 1, duration: 1.0, ease: 'power3.inOut' },
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
      <div className="absolute inset-0 flex flex-col">
        <div className="pre-curtain bg-cream flex-1" />
        <div className="pre-curtain bg-cream flex-1" />
      </div>

      <div className="pre-content absolute inset-0 flex flex-col items-center justify-center">
        <div className="pre-mark-icon mb-6">
          <LogoMark size={48} />
        </div>
        <div className="pre-mark flex items-baseline gap-2 overflow-hidden">
          <span className="inline-block font-display font-medium text-[36px] md:text-[44px] leading-none tracking-[0.42em] uppercase text-ink">
            T
          </span>
          <span className="inline-block font-display font-medium text-[36px] md:text-[44px] leading-none tracking-[0.42em] uppercase text-ink">
            L
          </span>
          <span className="inline-block font-display font-medium text-[36px] md:text-[44px] leading-none tracking-[0.42em] uppercase text-ink">
            C
          </span>
        </div>
        <div className="pre-tag mt-5 text-[10px] tracking-[0.4em] uppercase text-stone">
          The Longevity Centre
        </div>
        <div className="mt-10 h-px w-[200px] bg-mist overflow-hidden">
          <div className="pre-bar-fill h-full w-full bg-rust" />
        </div>
      </div>
    </div>
  )
}
