import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { reduceMotion } from '../lib/motion'

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const glow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    // Three layers, three speeds — gives a smooth lerp/trail feel
    const xDot = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power3.out' })
    const yDot = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power3.out' })
    const xRing = gsap.quickTo(ring.current, 'x', { duration: 0.32, ease: 'power3.out' })
    const yRing = gsap.quickTo(ring.current, 'y', { duration: 0.32, ease: 'power3.out' })
    const xGlow = gsap.quickTo(glow.current, 'x', { duration: 0.55, ease: 'power3.out' })
    const yGlow = gsap.quickTo(glow.current, 'y', { duration: 0.55, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
      xGlow(e.clientX)
      yGlow(e.clientY)
    }

    const grow = () => {
      gsap.to(ring.current, {
        scale: 1.5,
        borderColor: 'rgba(255,255,255,0.85)',
        duration: 0.45,
        ease: 'power3.out',
      })
      gsap.to(dot.current, { scale: 0, duration: 0.3, ease: 'power3.out' })
      gsap.to(glow.current, { opacity: 0.4, scale: 1.1, duration: 0.45, ease: 'power3.out' })
    }
    const shrink = () => {
      gsap.to(ring.current, {
        scale: 1,
        borderColor: 'rgba(255,255,255,0.6)',
        duration: 0.45,
        ease: 'power3.out',
      })
      gsap.to(dot.current, { scale: 1, duration: 0.35, ease: 'back.out(2)' })
      gsap.to(glow.current, { opacity: 0.35, scale: 1, duration: 0.45, ease: 'power3.out' })
    }
    const press = () =>
      gsap.to(ring.current, { scale: 0.78, duration: 0.18, ease: 'power3.out' })
    const release = () =>
      gsap.to(ring.current, { scale: 1, duration: 0.25, ease: 'power3.out' })

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', press)
    window.addEventListener('mouseup', release)

    const interactive = 'a, button, [data-cursor="hover"], input, textarea, select'
    const enter = (e: Event) => {
      if ((e.target as HTMLElement).closest(interactive)) grow()
    }
    const leave = (e: Event) => {
      if ((e.target as HTMLElement).closest(interactive)) shrink()
    }
    document.addEventListener('mouseover', enter, true)
    document.addEventListener('mouseout', leave, true)

    document.body.classList.add('has-custom-cursor')

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', press)
      window.removeEventListener('mouseup', release)
      document.removeEventListener('mouseover', enter, true)
      document.removeEventListener('mouseout', leave, true)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      {/* Soft glow halo — slowest layer, large blur, low opacity */}
      <div
        ref={glow}
        className="fixed top-0 left-0 z-[149] pointer-events-none w-20 h-20 -ml-10 -mt-10 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(178,122,123,0.5) 0%, rgba(178,122,123,0) 70%)',
          opacity: 0.35,
          willChange: 'transform, opacity',
          mixBlendMode: 'screen',
        }}
      />

      {/* Outer ring — middle speed, mix-blend so it inverts on dark/light */}
      <div
        ref={ring}
        className="cursor-ring fixed top-0 left-0 z-[150] pointer-events-none w-10 h-10 -ml-5 -mt-5 rounded-full border"
        style={{
          borderColor: 'rgba(255,255,255,0.6)',
          mixBlendMode: 'difference',
          willChange: 'transform, border-color',
          boxShadow: '0 0 24px rgba(255,255,255,0.12), inset 0 0 12px rgba(255,255,255,0.08)',
        }}
      />

      {/* Inner dot — fastest layer, follows cursor closely */}
      <div
        ref={dot}
        className="cursor-dot fixed top-0 left-0 z-[151] pointer-events-none w-[5px] h-[5px] -ml-[2.5px] -mt-[2.5px] rounded-full"
        style={{
          background: '#945455',
          willChange: 'transform',
          boxShadow: '0 0 8px rgba(148,84,85,0.6), 0 0 16px rgba(148,84,85,0.3)',
        }}
      />
    </>
  )
}
