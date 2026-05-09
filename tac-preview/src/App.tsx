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
    // Lerp-based smoothing (each frame moves 9% toward the target
    // scroll position). Replaces the older duration:1.8 / easing:
    // function setup, which felt scripted and slow — the rate-based
    // lerp reads as a continuous, silky glide instead.
    //
    // wheelMultiplier 1.0 keeps the input feel exactly native; the
    // smoothing comes purely from the lerp interpolation. touch
    // smoothing is intentionally OFF — iOS Safari's native momentum
    // scroll is the gold standard, and Lenis's syncTouch can
    // interfere with it (jitter on flick scrolls). On mobile we get
    // native momentum; on desktop we get lerp-smoothed wheel scroll.
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      syncTouch: false,
      touchMultiplier: 1.5,
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
