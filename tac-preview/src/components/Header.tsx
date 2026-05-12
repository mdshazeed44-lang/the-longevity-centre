// Header — floating pill nav (white bg) + mobile fullscreen overlay menu.
// Behaviour:
//  • Solid white pill with subtle border + shadow
//  • Hides on scroll-down past hero, reveals on scroll-up
//  • Mobile: hamburger opens fullscreen overlay with staggered slide-in nav,
//    Esc-to-close, body-scroll-lock
//  • "Programmes" item has a dropdown listing all 6 TLC programmes
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Logo } from './Logo'
import { reduceMotion } from '../lib/motion'
import { PROGRAMS } from '../lib/programs'
import { DIAGNOSTICS } from '../lib/diagnostics'
import { SKIN_TREATMENTS } from '../lib/skin-treatments'

type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string; tag?: string }[]
  // Dropdown panel header copy
  panelEyebrow?: string
  panelLine?: string
  panelCta?: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About Us', href: '/about-us' },
  {
    label: 'Programmes',
    href: '/programs',
    panelEyebrow: 'Six Programmes',
    panelLine: 'Diagnostics-led, physician-guided.',
    panelCta: 'View all programmes →',
    children: PROGRAMS.map((p) => ({
      label: p.shortTitle,
      href: `/programs/${p.slug}`,
      tag: p.duration,
    })),
  },
  {
    label: 'Diagnostics',
    href: '/diagnostics',
    panelEyebrow: 'Nine Diagnostics',
    panelLine: 'Measurement first, intervention second.',
    panelCta: 'View all diagnostics →',
    children: DIAGNOSTICS.map((d) => ({
      label: d.shortName,
      href: `/diagnostics/${d.slug}`,
      tag: d.category,
    })),
  },
  {
    label: 'Skin & Aesthetics',
    href: '/skin-aesthetics',
    panelEyebrow: 'Seven Treatments',
    panelLine: 'Dermatology-led, physician-performed.',
    panelCta: 'View all treatments →',
    children: SKIN_TREATMENTS.map((t) => ({
      label: t.shortName,
      href: `/skin-aesthetics/${t.slug}`,
      tag: t.category,
    })),
  },
  { label: 'Centres', href: '/centres' },
  { label: 'Contact', href: '/contact' },
]

// Desktop nav dropdown — hover or focus to open.
function NavDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<number | null>(null)

  const openNow = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setOpen(true)
  }
  const closeSoon = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpen(false), 200)
  }

  return (
    <div
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) closeSoon()
      }}
    >
      <a
        href={item.href}
        data-cursor="hover"
        aria-haspopup="true"
        aria-expanded={open}
        className="group relative inline-flex items-center gap-1.5 py-1.5 text-[11.5px] lg:text-[12px] tracking-[0.18em] font-bold uppercase text-ink/80 hover:text-ink transition-colors duration-300"
      >
        <span className="relative">{item.label}</span>
        <svg
          width="9"
          height="9"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M3 4.5 L6 7.5 L9 4.5" />
        </svg>
        <span
          aria-hidden
          className="absolute left-0 right-0 -bottom-0.5 mx-auto h-px w-0 bg-rust group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        />
      </a>

      {/* Dropdown panel */}
      <div
        className={`absolute left-1/2 top-full -translate-x-1/2 pt-4 z-50 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
        role="menu"
      >
        <div className="w-[440px] bg-white rounded-[18px] border border-mist/70 shadow-[0_30px_60px_-25px_rgba(27,26,24,0.35)] overflow-hidden">
          <div className="px-6 pt-5 pb-4 border-b border-mist/60">
            <div className="text-[10px] tracking-[0.32em] uppercase text-rust font-semibold mb-1">
              {item.panelEyebrow ?? 'Menu'}
            </div>
            <div className="text-[12px] text-graphite font-light">
              {item.panelLine ?? ''}
            </div>
          </div>
          <div className="py-2 max-h-[60vh] overflow-y-auto">
            {item.children?.map((c) => (
              <a
                key={c.href}
                href={c.href}
                role="menuitem"
                data-cursor="hover"
                className="group flex items-baseline justify-between gap-4 px-6 py-2.5 hover:bg-cream transition-colors duration-300"
              >
                <span className="text-[13.5px] font-display font-medium text-ink group-hover:text-rust transition-colors duration-300 tracking-tight">
                  {c.label}
                </span>
                {c.tag && (
                  <span className="text-[10px] tracking-[0.22em] uppercase text-stone/70 font-medium whitespace-nowrap">
                    {c.tag}
                  </span>
                )}
              </a>
            ))}
          </div>
          <a
            href={item.href}
            data-cursor="hover"
            role="menuitem"
            className="block px-6 py-3.5 bg-cream/60 hover:bg-rust hover:text-white text-[10.5px] tracking-[0.28em] uppercase text-rust font-semibold border-t border-mist/60 transition-colors duration-300"
          >
            {item.panelCta ?? 'View all →'}
          </a>
        </div>
      </div>
    </div>
  )
}

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
        {/* Shape: editorial rectangle with a soft 18-22px radius across
              all viewports (per user request). On mobile we hold the
              radius slightly tighter (rounded-[18px]) so the bar stays
              compact next to the iPhone notch / dynamic island; lg+
              expands to rounded-[22px] for the wider desktop bar.
            Padding scales with viewport so the rectangle has consistent
            presence at every size and the internal spacing never crowds
            the corners. */}
        <div
          className={`w-full max-w-[1400px] flex items-center gap-4 md:gap-6 lg:gap-8 pl-2 pr-2 md:pl-3 md:pr-3 lg:pl-5 lg:pr-4 py-2 md:py-2.5 lg:py-3 rounded-[18px] lg:rounded-[22px] transition-all duration-500 bg-white border border-mist/60 ${
            scrolled
              ? 'shadow-[0_18px_50px_-15px_rgba(27,26,24,0.18)]'
              : 'shadow-[0_12px_40px_-15px_rgba(27,26,24,0.12)]'
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
                if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.4 })
                else window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            className="shrink-0 pl-2 md:pl-3 flex items-center"
            aria-label="The Longevity Centre — home"
          >
            <Logo variant="dark" size={36} />
          </a>

          {/* Desktop nav — UPPERCASE bold links, centered between logo and CTA.
              Shown from lg+ only (1024px+). On tablet (md / 768–1023px) the
              hamburger menu is used instead — six nav items + dropdown
              chevrons + CTA + phone don't fit comfortably below 1024px. */}
          <nav className="hidden lg:flex items-center gap-6 lg:gap-9 flex-1 justify-center" aria-label="Primary">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <NavDropdown key={item.label} item={item} />
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  data-cursor="hover"
                  className="group relative py-1.5 text-[11.5px] lg:text-[12px] tracking-[0.18em] font-bold uppercase text-ink/80 hover:text-ink transition-colors duration-300"
                >
                  <span className="relative">{item.label}</span>
                  <span
                    aria-hidden
                    className="absolute left-0 right-0 -bottom-0.5 mx-auto h-px w-0 bg-rust group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                </a>
              )
            )}
          </nav>

          {/* Right cluster — phone + primary CTA */}
          <div className="flex items-center gap-3 md:gap-4 ml-auto md:ml-0 shrink-0">
            {/* Phone — visible from lg+ to keep the bar premium-uncrowded */}
            <a
              href="tel:+918826809123"
              data-cursor="hover"
              aria-label="Call +91 88268 09123"
              className="hidden xl:inline-flex items-center gap-2 text-[12.5px] text-ink/80 hover:text-ink font-medium transition-colors duration-300 whitespace-nowrap"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust" aria-hidden="true" focusable="false">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="tabular-nums tracking-tight">+91 88268 09123</span>
            </a>

            {/* Primary CTA — solid ink (dark) pill on the white header */}
            <a
              href="/contact"
              data-cursor="hover"
              data-magnetic
              className="group inline-flex items-center gap-2.5 pl-4 pr-5 py-2.5 rounded-full bg-ink text-white text-[12px] lg:text-[12.5px] font-semibold tracking-tight hover:bg-rust transition-colors duration-500 whitespace-nowrap"
            >
              <span className="hidden lg:inline">Arrange a Consultation</span>
              <span className="lg:hidden">Book</span>
            </a>

            {/* Hamburger button — mobile only */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-ink/15 text-ink hover:bg-ink/5 transition-colors duration-300"
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

      {/* MOBILE MENU OVERLAY — white theme matching the rest of the site */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal={menuOpen}
        aria-label="Mobile navigation menu"
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="absolute inset-0 bg-white" />
        {/* Soft warm wash — barely-there rust + nougat */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 600px at 18% 20%, rgba(148,84,85,0.06), transparent 60%), radial-gradient(800px 500px at 82% 90%, rgba(238,230,219,0.55), transparent 60%)',
          }}
        />

        <div className="relative h-full flex flex-col px-6 pt-6 pb-10 text-ink overflow-y-auto">
          <div className="flex items-center justify-between mb-12">
            <a
              href="/"
              onClick={() => setMenuOpen(false)}
              aria-label="The Longevity Centre — home"
              className="text-ink"
            >
              <Logo variant="dark" size={40} />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              className="w-11 h-11 rounded-full border border-ink/15 text-ink hover:bg-ink/5 hover:border-rust hover:text-rust flex items-center justify-center transition-colors duration-300"
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
                className="group relative block py-3.5 border-b border-ink/10 overflow-hidden"
                style={{
                  transition: `transform 700ms cubic-bezier(0.22,1,0.36,1) ${
                    menuOpen ? 80 + i * 70 : 0
                  }ms, opacity 600ms ease ${menuOpen ? 80 + i * 70 : 0}ms`,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(28px)',
                  opacity: menuOpen ? 1 : 0,
                }}
              >
                <div className="flex items-center justify-between">
                  {/* Mobile-menu item — moved from font-bold to
                      font-light. Cabinet Grotesk at 300 weight reads
                      as an editorial / magazine display rather than
                      a heavy nav-bar shout. Tracking tightened a
                      hair (-0.03em) so the lighter weight still
                      feels grounded. */}
                  <span className="font-display font-light text-[34px] sm:text-[40px] leading-[1.05] tracking-[-0.03em] text-ink group-hover:text-rust transition-colors duration-500">
                    {it.label}
                  </span>
                  <span className="text-[11px] tracking-[0.3em] uppercase text-stone tabular-nums font-medium">
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
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between w-full pl-5 pr-2 py-3 bg-rust text-white rounded-full font-semibold text-[12px] tracking-[0.18em] uppercase shadow-[0_12px_30px_-12px_rgba(148,84,85,0.55)]"
            >
              <span className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                Arrange a Consultation
              </span>
              <span className="w-9 h-9 rounded-full bg-white text-rust flex items-center justify-center" aria-hidden="true">
                →
              </span>
            </a>

            <div className="flex items-center justify-between text-[12.5px] text-graphite pt-3 border-t border-ink/10">
              <a href="tel:+918826809123" aria-label="Call +91 88268 09123" className="inline-flex items-center gap-2 hover:text-rust transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust" aria-hidden="true" focusable="false">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 88268 09123
              </a>
              <a href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0" aria-label="Chat on WhatsApp" className="inline-flex items-center gap-2 hover:text-rust transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-rust" aria-hidden="true" focusable="false">
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
