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
import { useEffect, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import { Cursor } from './components/Cursor'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { reduceMotion } from './lib/motion'

gsap.registerPlugin(ScrollTrigger)

// Routes that opt OUT of the site chrome (Header + Footer). Ad landing
// pages want a single conversion goal with zero navigation distractions,
// so they render their own minimal top bar and footer inside the page
// component itself.
const CHROMELESS_ROUTES = new Set<string>([
  '/longevity-programme-india',
])

function isChromelessRoute(pathname: string): boolean {
  const normalised = pathname.replace(/\/$/, '') || '/'
  return CHROMELESS_ROUTES.has(normalised)
}

function App({ children }: { children: ReactNode }) {
  // Track pathname so the layout responds to client-side route changes
  // (popstate / pushState) without remounting App. Init from the current
  // pathname for SSR-safety + first-render correctness.
  const [pathname, setPathname] = useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const sync = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  const chromeless = isChromelessRoute(pathname)

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
      {!chromeless && <Header />}
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      {!chromeless && <Footer />}
    </div>
  )
}

export default App
