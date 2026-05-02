// Header — floating glassmorphic pill nav + mobile fullscreen overlay menu.
// Behaviour:
//  • Solid pill on scroll past 80px (more contrast over content)
//  • Hides on scroll-down past hero, reveals on scroll-up
//  • Mobile: hamburger opens fullscreen overlay with staggered slide-in nav,
//    Esc-to-close, body-scroll-lock
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Logo } from './Logo'
import { reduceMotion } from '../lib/motion'

const NAV_ITEMS = [
  { label: 'About', href: '/about' },
  { label: 'Longevity', href: '/longevity-program' },
  { label: 'Method', href: '/#method' },
  { label: 'Centres', href: '/centres' },
  { label: 'Contact', href: '/#cta' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastY = useRef(0)
  const navRef = useRef<HTMLElement>(null)

  // Scroll-direction aware: solid pill on scroll, hides on scroll-down past hero
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 80)
      if (y > 240 && y > lastY.current + 6) setHidden(true)
      else if (y < lastY.current - 6 || y < 200) setHidden(false)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Subtle entrance animation on first load
  useEffect(() => {
    if (reduceMotion()) return
    if (!navRef.current) return
    const el = navRef.current
    gsap.set(el, { y: -20, opacity: 0 })
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 1.0,
      ease: 'expo.out',
      delay: 0.15,
    })
  }, [])

  // Body scroll lock when mobile menu open
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Close menu on Escape key
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      <header
        ref={navRef}
        role="banner"
        className={`fixed inset-x-0 z-50 flex justify-center transition-all duration-500 px-3 md:px-5 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${scrolled ? 'top-2 md:top-3' : 'top-3 md:top-5'}`}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`w-full max-w-[1400px] flex items-center gap-4 md:gap-6 lg:gap-8 pl-2 pr-2 md:pl-3 md:pr-3 py-2 md:py-2.5 rounded-full transition-all duration-500 bg-ink ${
            scrolled
              ? 'shadow-[0_18px_50px_-15px_rgba(0,0,0,0.65)]'
              : 'shadow-[0_12px_40px_-15px_rgba(0,0,0,0.55)]'
          }`}
        >
          {/* Logo — clicks go to home from any page; smooth-scroll to top if already home */}
          <a
            href="/"
            data-cursor="hover"
            onClick={(e) => {
              const path = window.location.pathname.replace(/\/$/, '')
              if (path === '' || path === '/') {
                e.preventDefault()
                const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis
                if (lenis) lenis.scrollTo(0, { duration: 1.4 })
                else window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            className="text-white shrink-0 pl-2 md:pl-3"
            aria-label="The Anti-Aging Centre — home"
          >
            <Logo variant="light" />
          </a>

          {/* Desktop nav — UPPERCASE bold links, centered between logo and CTA */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-9 flex-1 justify-center" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                data-cursor="hover"
                className="group relative py-1.5 text-[11.5px] lg:text-[12px] tracking-[0.18em] font-bold uppercase text-white/85 hover:text-white transition-colors duration-300"
              >
                <span className="relative">{item.label}</span>
                <span
                  aria-hidden
                  className="absolute left-0 right-0 -bottom-0.5 mx-auto h-px w-0 bg-rust-soft group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
              </a>
            ))}
          </nav>

          {/* Right cluster — phone + primary CTA */}
          <div className="flex items-center gap-3 md:gap-4 ml-auto md:ml-0 shrink-0">
            {/* Phone — visible from lg+ to keep the bar premium-uncrowded */}
            <a
              href="tel:+918826809123"
              data-cursor="hover"
              aria-label="Call +91 88268 09123"
              className="hidden lg:inline-flex items-center gap-2 text-[12.5px] text-white/85 hover:text-white font-medium transition-colors duration-300 whitespace-nowrap"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust-soft" aria-hidden="true" focusable="false">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="tabular-nums tracking-tight">+91 88268 09123</span>
            </a>

            {/* Primary CTA — solid white pill with green ping dot */}
            <a
              href="#cta"
              data-cursor="hover"
              data-magnetic
              className="group inline-flex items-center gap-2.5 pl-4 pr-5 py-2.5 rounded-full bg-white text-ink text-[12px] lg:text-[12.5px] font-semibold tracking-tight hover:bg-rust hover:text-white transition-colors duration-500 whitespace-nowrap"
            >
              <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
              </span>
              <span className="hidden md:inline">Arrange a Consultation</span>
              <span className="md:hidden">Book</span>
            </a>

            {/* Hamburger button — mobile only */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white hover:bg-white/10 transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="13" x2="20" y2="13" />
                <line x1="4" y1="19" x2="20" y2="19" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal={menuOpen}
        aria-label="Mobile navigation menu"
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="absolute inset-0 bg-ink" />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              'radial-gradient(700px 500px at 80% 100%, rgba(178,122,123,0.18), transparent 60%)',
          }}
        />

        <div className="relative h-full flex flex-col px-6 pt-6 pb-10 text-white overflow-y-auto">
          <div className="flex items-center justify-between mb-12">
            <a
              href="/"
              onClick={() => setMenuOpen(false)}
              aria-label="The Anti-Aging Centre — home"
              className="text-white"
            >
              <Logo variant="light" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              className="w-10 h-10 rounded-full border border-white/20 hover:bg-white/10 flex items-center justify-center transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center -mt-4" aria-label="Mobile primary">
            {NAV_ITEMS.map((it, i) => (
              <a
                key={it.label}
                href={it.href}
                onClick={() => setMenuOpen(false)}
                className="group relative block py-3.5 border-b border-white/10 overflow-hidden"
                style={{
                  transition: `transform 700ms cubic-bezier(0.22,1,0.36,1) ${
                    menuOpen ? 80 + i * 70 : 0
                  }ms, opacity 600ms ease ${menuOpen ? 80 + i * 70 : 0}ms`,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(28px)',
                  opacity: menuOpen ? 1 : 0,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-[34px] sm:text-[40px] leading-[1.0] tracking-[-0.025em] text-white group-hover:text-rust-soft transition-colors duration-500">
                    {it.label}
                  </span>
                  <span className="text-[11px] tracking-[0.3em] uppercase text-white/45 tabular-nums font-medium">
                    0{i + 1}
                  </span>
                </div>
              </a>
            ))}
          </nav>

          <div
            className="mt-10 space-y-4"
            style={{
              transition: `transform 700ms cubic-bezier(0.22,1,0.36,1) ${
                menuOpen ? 500 : 0
              }ms, opacity 600ms ease ${menuOpen ? 500 : 0}ms`,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: menuOpen ? 1 : 0,
            }}
          >
            <a
              href="#cta"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between w-full pl-5 pr-2 py-3 bg-white text-ink rounded-full font-semibold text-[12px] tracking-[0.18em] uppercase"
            >
              <span className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
                </span>
                Arrange a Consultation
              </span>
              <span className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center" aria-hidden="true">
                →
              </span>
            </a>

            <div className="flex items-center justify-between text-[12.5px] text-white/75 pt-3 border-t border-white/10">
              <a href="tel:+918826809123" aria-label="Call +91 88268 09123" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust-soft" aria-hidden="true" focusable="false">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 88268 09123
              </a>
              <a href="https://wa.me/918826809123" aria-label="Chat on WhatsApp" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-rust-soft" aria-hidden="true" focusable="false">
                  <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.18 2.095 3.195 5.076 4.483.71.3 1.262.48 1.694.629.712.227 1.36.195 1.871.121.571-.091 1.758-.721 2.006-1.413.255-.69.255-1.29.18-1.414-.074-.124-.27-.21-.57-.345m-5.446 7.443h-.016a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
