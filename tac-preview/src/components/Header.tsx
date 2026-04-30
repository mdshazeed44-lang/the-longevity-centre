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
  { label: 'Programs', href: '/#programs' },
  { label: 'Method', href: '/#method' },
  { label: 'Centres', href: '/#clinics' },
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
        className={`fixed inset-x-0 z-50 flex justify-center transition-all duration-500 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${scrolled ? 'top-2 md:top-4' : 'top-3 md:top-6'}`}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`flex items-center gap-2 md:gap-3 px-2.5 md:px-4 py-2 md:py-3 rounded-full transition-all duration-500 max-w-[calc(100vw-1rem)] ${
            scrolled
              ? 'bg-ink/85 backdrop-blur-xl border border-white/15 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.5)]'
              : 'bg-ink/70 backdrop-blur-md border border-white/10'
          }`}
        >
          {/* Logo — clicks go to home from any page; smooth-scroll to top if already home */}
          <a
            href="/"
            data-cursor="hover"
            onClick={(e) => {
              const path = window.location.pathname.replace(/\/$/, '')
              if (path === '' || path === '/') {
                // Already on home — prevent reload, smooth-scroll to top instead
                e.preventDefault()
                const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis
                if (lenis) lenis.scrollTo(0, { duration: 1.4 })
                else window.scrollTo({ top: 0, behavior: 'smooth' })
              }
              // Otherwise let the browser navigate to "/" naturally
            }}
            className="text-white pl-1.5 md:pl-2 pr-2 md:pr-4 md:border-r border-white/10 mr-0 md:mr-1"
            aria-label="The Anti-Aging Centre — home"
          >
            <Logo variant="light" />
          </a>

          {/* Desktop nav — pill links with animated indicator */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                data-cursor="hover"
                className="group relative px-4 py-2 text-[13px] tracking-tight font-medium text-white/80 hover:text-white transition-colors duration-300 rounded-full"
              >
                <span className="relative z-10">{item.label}</span>
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors duration-500"
                />
                <span
                  aria-hidden
                  className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-1 h-1 rounded-full bg-rust-soft opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"
                />
              </a>
            ))}
          </nav>

          {/* Phone pill — visible on lg+ only (saves space) */}
          <a
            href="tel:+918826809123"
            data-cursor="hover"
            aria-label="Call +91 88268 09123"
            className="hidden lg:inline-flex items-center gap-2 px-4 py-2 ml-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[12px] text-white/90 transition-colors duration-300"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust-soft" aria-hidden="true" focusable="false">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="tabular-nums tracking-tight">+91 88268 09123</span>
          </a>

          {/* Primary CTA — magnetic pill with green ping dot */}
          <a
            href="#cta"
            data-cursor="hover"
            data-magnetic
            className="group inline-flex items-center gap-2 md:gap-2.5 pl-3 md:pl-4 pr-3.5 md:pr-5 py-2 md:py-2.5 ml-0.5 md:ml-1 rounded-full bg-white text-ink text-[11.5px] md:text-[12.5px] font-semibold tracking-tight hover:bg-rust hover:text-white transition-colors duration-500 whitespace-nowrap"
          >
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
            </span>
            <span className="hidden lg:inline">Arrange a Consultation</span>
            <span className="lg:hidden">Book</span>
            <span className="hidden md:inline-block transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </a>

          {/* Hamburger button — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden inline-flex items-center justify-center w-9 h-9 ml-0.5 rounded-full border border-white/15 text-white hover:bg-white/10 transition-colors duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="13" x2="20" y2="13" />
              <line x1="4" y1="19" x2="20" y2="19" />
            </svg>
          </button>
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
