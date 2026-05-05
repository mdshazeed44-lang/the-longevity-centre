/**
 * App — chrome shell for every page.
 *
 * Renders the cross-page furniture:
 *   • <Cursor>         custom cursor follower (auto-disables on touch)
 *   • <Header>         floating pill nav with mobile overlay
 *   • <main>{children} the route-specific page (passed in from main.tsx)
 *   • <Footer>         site footer
 *
 * Also owns the Lenis smooth-scroll lifecycle and wires it to GSAP
 * ScrollTrigger so scrub-tied animations glide instead of snap.
 *
 * Marketing sections (CtaBand, ClinicsBand, etc.) used to live in this
 * file — they're now in src/components/sections/ and imported directly
 * by the pages that need them.
 */
import { useEffect, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import { Cursor } from './components/Cursor'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { reduceMotion } from './lib/motion'

gsap.registerPlugin(ScrollTrigger)

function App({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (reduceMotion()) return
    // Longer duration + softer easing = buttery scroll feel; makes
    // scroll-tied scrub animations glide instead of snap.
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
    })
    // Expose for in-page anchor scroll + debug (typed in src/types/globals.d.ts)
    window.__lenis = lenis
    lenis.on('scroll', () => ScrollTrigger.update())
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="bg-white text-graphite">
      <Cursor />
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default App
