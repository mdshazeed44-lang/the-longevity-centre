import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { reduceMotion } from '../lib/motion'

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const xDot = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3.out' })
    const yDot = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3.out' })
    const xRing = gsap.quickTo(ring.current, 'x', { duration: 0.4, ease: 'power3.out' })
    const yRing = gsap.quickTo(ring.current, 'y', { duration: 0.4, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
    }

    const grow = () => gsap.to(ring.current, { scale: 1.8, duration: 0.35, ease: 'power3.out' })
    const shrink = () => gsap.to(ring.current, { scale: 1, duration: 0.35, ease: 'power3.out' })
    const press = () => gsap.to(ring.current, { scale: 0.85, duration: 0.2, ease: 'power3.out' })
    const release = () => gsap.to(ring.current, { scale: 1, duration: 0.2, ease: 'power3.out' })

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
      <div
        ref={ring}
        className="cursor-ring fixed top-0 left-0 z-[150] pointer-events-none w-9 h-9 -ml-[18px] -mt-[18px] border border-ink rounded-full mix-blend-difference"
        style={{ borderColor: '#fff' }}
      />
      <div
        ref={dot}
        className="cursor-dot fixed top-0 left-0 z-[151] pointer-events-none w-[6px] h-[6px] -ml-[3px] -mt-[3px] bg-rust rounded-full"
      />
    </>
  )
}
