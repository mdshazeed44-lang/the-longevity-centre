import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import { Preloader } from './components/Preloader'
import { Cursor } from './components/Cursor'
import { ScrollProgress } from './components/ScrollProgress'
import { Hero } from './components/Hero'
import { Programs, PROGRAMS } from './components/Programs'
import { Method } from './components/Method'
import { Logo } from './components/Logo'
import { reduceMotion } from './lib/motion'

gsap.registerPlugin(ScrollTrigger)

// ---------- Header ----------
function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const navRef = useRef<HTMLElement>(null)

  // Scroll-direction aware: solid pill on scroll, hides on scroll-down past hero
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 80)
      // hide on scroll down past 240px, show on scroll up
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

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Programs', href: '#programs' },
    { label: 'Method', href: '#method' },
    { label: 'Centres', href: '#clinics' },
    { label: 'Contact', href: '#cta' },
  ]

  return (
    <header
      ref={navRef}
      className={`fixed inset-x-0 z-50 flex justify-center transition-all duration-500 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${scrolled ? 'top-3 md:top-4' : 'top-4 md:top-6'}`}
      style={{ willChange: 'transform' }}
    >
      <div
        className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-ink/85 backdrop-blur-xl border border-white/15 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.5)]'
            : 'bg-ink/70 backdrop-blur-md border border-white/10'
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          data-cursor="hover"
          className="text-white pl-2 pr-3 md:pr-4 border-r border-white/10 mr-1"
          aria-label="The Anti-Aging Centre — home"
        >
          <Logo variant="light" />
        </a>

        {/* Nav — pill links with animated indicator */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              data-cursor="hover"
              className="group relative px-4 py-2 text-[13px] tracking-tight font-medium text-white/75 hover:text-white transition-colors duration-300 rounded-full"
            >
              <span className="relative z-10">{item.label}</span>
              {/* hover bg pill */}
              <span
                aria-hidden
                className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors duration-500"
              />
              {/* hover dot */}
              <span
                aria-hidden
                className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-1 h-1 rounded-full bg-rust-soft opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"
              />
            </a>
          ))}
        </nav>

        {/* Phone pill — visible on md+ */}
        <a
          href="tel:+918826809123"
          data-cursor="hover"
          className="hidden lg:inline-flex items-center gap-2 px-4 py-2 ml-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[12px] text-white/90 transition-colors duration-300"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-rust-soft"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="tabular-nums tracking-tight">+91 88268 09123</span>
        </a>

        {/* Primary CTA — magnetic pill with green ping dot */}
        <a
          href="#cta"
          data-cursor="hover"
          data-magnetic
          className="group inline-flex items-center gap-2.5 pl-4 pr-5 py-2.5 ml-1 rounded-full bg-white text-ink text-[12.5px] font-semibold tracking-tight hover:bg-rust hover:text-white transition-colors duration-500"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
          </span>
          <span className="hidden sm:inline">Arrange a Consultation</span>
          <span className="sm:hidden">Book</span>
          <span className="inline-block transition-transform duration-500 group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </div>
    </header>
  )
}

// ---------- Clinics band ----------
function ClinicsBand() {
  // Source: theantiagingcentre.com — the five physical centres, verbatim.
  const clinics = [
    {
      city: 'Gurugram',
      region: 'NCR',
      area: 'Sector 48',
      phone: '+91 87701 95833',
    },
    {
      city: 'Delhi',
      region: 'NCR',
      area: 'Greater Kailash-1',
      phone: '+91 97171 46500',
    },
    {
      city: 'Pune',
      region: 'Maharashtra',
      area: 'Hadapsar',
      phone: '+91 97623 86121',
    },
    {
      city: 'Bangalore',
      region: 'Karnataka',
      area: 'JP Nagar',
      phone: '+91 80767 19637',
    },
    {
      city: 'Bangalore',
      region: 'Karnataka',
      area: 'Sadashivnagar',
      phone: '+91 80767 19637',
    },
    {
      city: 'Online',
      region: 'Pan-India',
      area: 'Mumbai · Bangalore · Hyderabad',
      phone: '+91 88268 09123',
      featured: true,
    },
  ]

  const ref = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLHeadingElement>(null)
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion()) return

    // Heading line reveal
    const lines = headRef.current?.querySelectorAll<HTMLElement>('.line-mask > span')
    let headTween: gsap.core.Tween | undefined
    if (lines?.length) {
      gsap.set(lines, { yPercent: 110 })
      headTween = gsap.to(lines, {
        yPercent: 0,
        duration: 1.0,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
      })
    }

    // Row stagger — each row slides in from the left with subtle skew
    const rows = railRef.current?.querySelectorAll<HTMLElement>('.clinic-row')
    let rowTween: gsap.core.Tween | undefined
    if (rows?.length) {
      gsap.set(rows, { opacity: 0, x: -40, skewY: 1 })
      rowTween = gsap.to(rows, {
        opacity: 1,
        x: 0,
        skewY: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: railRef.current, start: 'top 80%' },
      })
    }

    // Drawing baseline divider
    const divider = ref.current?.querySelector<HTMLElement>('.clinic-divider')
    let divTween: gsap.core.Tween | undefined
    if (divider) {
      gsap.set(divider, { scaleX: 0, transformOrigin: 'left center' })
      divTween = gsap.to(divider, {
        scaleX: 1,
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: { trigger: divider, start: 'top 90%' },
      })
    }

    return () => {
      headTween?.scrollTrigger?.kill()
      headTween?.kill()
      rowTween?.scrollTrigger?.kill()
      rowTween?.kill()
      divTween?.scrollTrigger?.kill()
      divTween?.kill()
    }
  }, [])

  return (
    <section id="clinics" ref={ref} className="bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-14 md:py-20">
        {/* Compact header — 2 col */}
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-16 items-end mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                Our Centres
              </span>
            </div>
            <h2
              ref={headRef}
              className="font-display font-bold text-[34px] md:text-[52px] leading-[1.0] tracking-[-0.03em] text-ink"
            >
              <span className="line-mask">
                <span>Find us where</span>
              </span>{' '}
              <span className="line-mask">
                <span>you live.</span>
              </span>
            </h2>
          </div>
          <p className="text-[14px] md:text-[15px] text-graphite leading-[1.7] font-light max-w-[440px] md:text-right md:pb-2">
            Five flagship centres across India + online consultations in Mumbai,
            Bangalore and Hyderabad.
          </p>
        </div>

        {/* Compact directory rows — each row reveals from left with skew */}
        <div ref={railRef} className="border-t border-mist">
          {clinics.map((c, i) => {
            const isFeatured = !!c.featured
            return (
              <a
                key={c.city + c.area}
                href={isFeatured ? '#cta' : '#cta'}
                data-cursor="hover"
                className={`clinic-row group relative grid grid-cols-[40px_1fr_1.1fr_1fr_auto] md:grid-cols-[60px_1fr_1.4fr_1fr_140px] gap-3 md:gap-6 items-center px-2 md:px-4 py-5 md:py-6 border-b border-mist transition-colors duration-500 ${
                  isFeatured ? 'bg-ink/95 text-white -mx-2 md:-mx-4 px-4 md:px-8 rounded-xl' : 'hover:bg-cream/50'
                }`}
              >
                {/* number */}
                <span
                  className={`font-display text-[14px] md:text-[16px] tabular-nums tracking-tight font-semibold ${
                    isFeatured ? 'text-rust-soft' : 'text-rust'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* city */}
                <div className="flex items-center gap-3 min-w-0">
                  <h3
                    className={`font-display font-bold text-[20px] md:text-[28px] leading-[1.0] tracking-[-0.02em] truncate transition-colors duration-500 ${
                      isFeatured ? 'text-white' : 'text-ink group-hover:text-rust-deep'
                    }`}
                  >
                    {c.city}
                  </h3>
                </div>

                {/* area */}
                <div className="hidden md:block">
                  <div
                    className={`text-[12px] tracking-[0.22em] uppercase font-medium leading-tight ${
                      isFeatured ? 'text-white/70' : 'text-graphite'
                    }`}
                  >
                    {c.area}
                  </div>
                  <div
                    className={`text-[10.5px] tracking-[0.25em] uppercase mt-1 ${
                      isFeatured ? 'text-white/50' : 'text-stone'
                    }`}
                  >
                    {c.region}
                  </div>
                </div>

                {/* phone */}
                <div
                  className={`text-[12.5px] md:text-[13.5px] tabular-nums tracking-tight font-medium hidden md:block ${
                    isFeatured ? 'text-white' : 'text-ink'
                  }`}
                >
                  {c.phone}
                </div>

                {/* CTA arrow with line — animated underline */}
                <div className="flex items-center justify-end gap-2.5 relative">
                  <span
                    className={`text-[10.5px] tracking-[0.28em] uppercase font-semibold hidden md:inline ${
                      isFeatured ? 'text-white' : 'text-ink'
                    }`}
                  >
                    {isFeatured ? 'Book Online' : 'Visit'}
                  </span>
                  <span
                    aria-hidden
                    className={`relative inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full transition-all duration-500 ${
                      isFeatured
                        ? 'bg-rust-soft/20 text-rust-soft group-hover:bg-rust-soft/30'
                        : 'bg-cream group-hover:bg-ink group-hover:text-white text-ink'
                    }`}
                  >
                    →
                  </span>
                </div>

                {/* hover-fill accent line under row */}
                <span
                  aria-hidden
                  className={`absolute left-0 right-0 bottom-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isFeatured ? 'bg-rust-soft/40' : 'bg-rust'
                  }`}
                />
              </a>
            )
          })}

          {/* drawn baseline */}
          <div className="clinic-divider h-px bg-ink/20 mt-2" />
        </div>
      </div>
    </section>
  )
}

// ---------- Trust counter ----------
function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { duration: 2000, bounce: 0 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView) mv.set(value)
    return spring.on('change', (v) => setDisplay(Math.round(v)))
  }, [inView, value, mv, spring])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

function TrustStrip() {
  const ref = useRef<HTMLElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion()) return

    // Heading line-mask reveal
    const lines = heading.current?.querySelectorAll<HTMLElement>('.line-mask > span')
    let headTween: gsap.core.Tween | undefined
    if (lines?.length) {
      gsap.set(lines, { yPercent: 110 })
      headTween = gsap.to(lines, {
        yPercent: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: heading.current, start: 'top 85%' },
      })
    }

    // Stat cells reveal — fade up + scale in with stagger
    const stats = statsRef.current?.querySelectorAll<HTMLElement>('.stat-cell')
    let statTween: gsap.core.Tween | undefined
    if (stats?.length) {
      gsap.set(stats, { y: 50, opacity: 0, scale: 0.96 })
      statTween = gsap.to(stats, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
      })
    }

    return () => {
      headTween?.scrollTrigger?.kill()
      headTween?.kill()
      statTween?.scrollTrigger?.kill()
      statTween?.kill()
    }
  }, [])

  return (
    <section ref={ref} className="relative bg-cream/40 py-20 md:py-28 px-6 md:px-12 overflow-hidden">
      {/* Soft ambient backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            'radial-gradient(800px 500px at 50% 0%, rgba(148,84,85,0.06), transparent 60%)',
        }}
      />

      <div className="relative max-w-[1280px] mx-auto text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-7">
          <span className="w-7 h-px bg-rust" />
          <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
            A Medical Practice, Rooted in Nature
          </span>
          <span className="w-7 h-px bg-rust" />
        </div>

        {/* Headline with line-mask reveal */}
        <h2
          ref={heading}
          className="font-display font-bold text-[30px] md:text-[48px] lg:text-[56px] leading-[1.15] tracking-[-0.025em] text-ink max-w-[920px] mx-auto"
        >
          <span className="line-mask">
            <span>We measure what others guess.</span>
          </span>
          <br />
          <span className="line-mask">
            <span>We change what others manage.</span>
          </span>
        </h2>

        {/* Stats — refined card grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-20 md:mt-24"
        >
          {[
            { val: 60, suf: '+', label: 'Years experience in preventive medicine' },
            { val: 10000, suf: '+', label: 'Lives reformed by our team' },
            { val: 5, suf: '', label: 'Centres pan-India' },
            { val: 163, suf: '', label: 'Biomarkers per patient' },
          ].map((s, i) => (
            <div
              key={s.label}
              className="stat-cell group relative bg-white rounded-2xl border border-mist/70 px-6 py-9 md:px-7 md:py-12 overflow-hidden hover:border-rust/30 transition-colors duration-500"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Index */}
              <div className="absolute top-4 right-5 text-[10px] tracking-[0.28em] uppercase text-stone/55 tabular-nums font-medium">
                0{i + 1}
              </div>

              {/* Counter */}
              <div className="font-display font-bold text-[52px] md:text-[68px] lg:text-[76px] text-ink leading-none mb-4 tabular-nums tracking-[-0.025em]">
                <Counter value={s.val} suffix={s.suf} />
              </div>

              {/* Accent line */}
              <span
                aria-hidden
                className="block h-px w-9 bg-rust mb-4 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              />

              {/* Label */}
              <div className="text-[12.5px] md:text-[13px] text-graphite leading-snug font-light max-w-[200px] mx-auto">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- Cutting-edge science ----------
function ScienceCards() {
  const cards = [
    {
      title: 'Feel and look great',
      desc: 'Stay active and enjoy your life into your late years.',
      img: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=1200&q=85',
    },
    {
      title: 'Prevent diseases',
      desc: 'Avoid age-related diseases, and extend your lifespan and health-span.',
      img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=85',
    },
    {
      title: 'Improve performance',
      desc: 'Strengthen your body and sharpen your mind to get better results in sport and business.',
      img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=85',
    },
  ]
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduceMotion()) return
    const cardsEls = ref.current?.querySelectorAll<HTMLElement>('.sci-card')
    if (!cardsEls) return
    gsap.set(cardsEls, { y: 40, opacity: 0 })
    gsap.to(cardsEls, {
      y: 0,
      opacity: 1,
      duration: 1.0,
      ease: 'expo.out',
      stagger: 0.12,
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    })
  }, [])

  return (
    <section
      id="science"
      className="bg-white py-16 md:py-24 px-6 md:px-12"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 mb-16 md:mb-20 items-start">
          <div>
            <div className="text-[11px] tracking-[0.3em] text-stone uppercase font-medium mb-6">
              Longevity Science
            </div>
            <h2 className="font-display font-bold text-[36px] md:text-[56px] leading-[1.05] tracking-[-0.025em] text-ink">
              Cutting-edge science
              <br />
              to reverse ageing.
            </h2>
          </div>
          <p className="text-[15px] md:text-[16px] leading-[1.7] text-graphite md:pt-3 max-w-[420px]">
            With the help of science, you can improve your biological age by 5
            to 15 years and slow down your rate of ageing.
          </p>
        </div>

        {/* Cards */}
        <div ref={ref} className="grid md:grid-cols-3 gap-6 md:gap-7">
          {cards.map((c) => (
            <article
              key={c.title}
              className="sci-card bg-cream/60 group overflow-hidden"
            >
              <div className="aspect-[5/4] overflow-hidden bg-mist">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
              </div>
              <div className="px-7 py-8 md:px-8 md:py-9">
                <h3 className="font-display font-bold text-[20px] md:text-[22px] leading-[1.25] tracking-[-0.01em] text-ink mb-3">
                  {c.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-graphite leading-[1.6]">
                  {c.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- Press marquee ----------
function PressStrip() {
  const press = [
    'Forbes India',
    'Vogue',
    'GQ',
    'Conde Nast',
    'The Hindu',
    'Mint Lounge',
    'Harper’s Bazaar',
    'Architectural Digest',
  ]
  const items = [...press, ...press]
  return (
    <section className="bg-white border-y border-mist py-10 marquee overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex items-center gap-10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-stone shrink-0">
          As featured in —
        </span>
        <div className="overflow-hidden flex-1">
          <div className="marquee-track">
            {items.map((p, i) => (
              <span
                key={i}
                className="font-display text-[18px] md:text-[20px] text-graphite/70 tracking-tight hover:text-ink transition-colors duration-300 whitespace-nowrap"
                style={{ fontVariant: 'small-caps' }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- Results split ----------
function ResultsSplit() {
  // Source: theantiagingcentre.com — "Way to a New Reformed Life" + Intervention copy.
  const outcomes = [
    {
      label: 'Reversed metabolic risk',
      detail: 'Diabetes, prediabetes, cholesterol, fatty liver',
    },
    {
      label: 'PCOD & hormonal balance',
      detail: 'Thyroid, insulin resistance, sex hormones',
    },
    {
      label: 'Targeted fat loss',
      detail: 'Body composition, not just the number on the scale',
    },
    {
      label: 'Gut & microbiome restored',
      detail: 'Bloating, IBS-like symptoms, food sensitivities resolved',
    },
    {
      label: 'Skin & hair anti-aging',
      detail: 'Dermatology-led, rooted in nutrient and hormonal health',
    },
    {
      label: 'Expanded lifespan, restored vitality',
      detail: 'A measurably longer, healthier, more vibrant life',
    },
  ]

  const ref = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (reduceMotion()) return

    // Heading line reveal
    const lines = headRef.current?.querySelectorAll<HTMLElement>('.line-mask > span')
    let headTween: gsap.core.Tween | undefined
    if (lines?.length) {
      gsap.set(lines, { yPercent: 110 })
      headTween = gsap.to(lines, {
        yPercent: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
      })
    }

    // Row reveal
    const items = ref.current?.querySelectorAll<HTMLElement>('.result-row')
    let rowTween: gsap.core.Tween | undefined
    if (items?.length) {
      gsap.set(items, { y: 24, opacity: 0 })
      rowTween = gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'expo.out',
        stagger: 0.07,
        scrollTrigger: { trigger: ref.current, start: 'top 78%' },
      })
    }

    return () => {
      headTween?.scrollTrigger?.kill()
      headTween?.kill()
      rowTween?.scrollTrigger?.kill()
      rowTween?.kill()
    }
  }, [])

  return (
    <section id="results" className="bg-cream/50 py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-[1.05fr_1fr] gap-12 md:gap-20 items-start">
        {/* LEFT — outcomes list */}
        <div className="md:pt-2">
          <div className="flex items-center gap-3 mb-7">
            <span className="w-8 h-px bg-rust" />
            <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
              What 12 Months Brings
            </span>
          </div>
          <h2
            ref={headRef}
            className="font-display font-bold text-[40px] md:text-[64px] leading-[1.0] tracking-[-0.03em] text-ink mb-8"
          >
            <span className="line-mask">
              <span>A new,</span>
            </span>
            <br />
            <span className="line-mask">
              <span>reformed life.</span>
            </span>
          </h2>
          <p className="text-[15px] md:text-[17px] leading-[1.7] text-graphite font-light max-w-[520px] mb-12">
            After the thorough 12-month programme, our patients describe a
            reformed life — restored vitality, measurably better health, and a
            sense of well-being that wasn't there before.
          </p>

          <ul ref={ref} className="border-t border-mist">
            {outcomes.map((o, i) => (
              <li
                key={o.label}
                className="result-row group flex items-baseline gap-6 md:gap-8 py-5 border-b border-mist"
              >
                <span className="font-display text-[14px] text-rust font-semibold tabular-nums tracking-tight w-8 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-[18px] md:text-[20px] leading-[1.25] tracking-[-0.01em] text-ink group-hover:text-rust-deep transition-colors duration-300">
                    {o.label}
                  </div>
                  <div className="mt-1.5 text-[13px] md:text-[14px] text-stone leading-[1.55] font-light">
                    {o.detail}
                  </div>
                </div>
                <span className="hidden md:inline-block text-rust opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-500 text-lg">
                  →
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — clean image, no text overlay */}
        <div className="md:sticky md:top-28 flex flex-col gap-6">
          <div className="relative aspect-[4/5] md:aspect-[5/6] overflow-hidden rounded-[24px] bg-mist">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=85"
              alt="A patient in restored health"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Caption block — separate from image, not overlaid */}
          <div className="bg-white rounded-[20px] border border-mist p-7 md:p-8">
            <div className="text-[10px] tracking-[0.3em] uppercase text-rust font-semibold mb-3">
              One Coordinated Team
            </div>
            <p className="text-[14px] md:text-[15px] leading-[1.65] text-graphite font-light mb-6">
              Internal medicine, endocrinology, dermatology and gastroenterology —
              under one shared medical record, one programme, one team.
            </p>
            <a
              href="#cta"
              data-cursor="hover"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.25em] text-ink uppercase font-semibold group hover:text-rust transition-colors duration-300"
            >
              Meet the team
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1 text-rust">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- Benefits ----------
function Benefits() {
  const items = [
    {
      title: 'Relieving stress',
      desc: 'You will lower your cortisol levels and reduce stress.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8V3h5M21 8V3h-5M3 16v5h5M21 16v5h-5" />
        </svg>
      ),
    },
    {
      title: 'Ideal body composition',
      desc: 'Optimising your body fat percentage will make you feel and look fantastic.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12h3l3-9 4 18 3-9h7" />
        </svg>
      ),
    },
    {
      title: 'No more problems with sleep',
      desc: 'Get the deep, undisturbed sleep you deserve.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ),
    },
    {
      title: 'Higher energy levels',
      desc: "You won't get easily tired anymore.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="13" width="3.5" height="8" />
          <rect x="10.25" y="9" width="3.5" height="12" />
          <rect x="17.5" y="5" width="3.5" height="16" />
        </svg>
      ),
    },
    {
      title: 'Better sport results',
      desc: 'Increase your stamina and muscle strength to optimise sports or athletic performance.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8v8M3 10v4M18 8v8M21 10v4M6 12h12" />
        </svg>
      ),
    },
    {
      title: 'Lower biological age',
      desc: 'You will extend your lifespan and stay healthy into your late years.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      title: 'Improved memory',
      desc: 'Support your brain and cognitive functions.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: 'Enhanced sexual health',
      desc: 'Unlock your full sexual potential and increase your satisfaction.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
    },
  ]
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduceMotion()) return
    const cells = ref.current?.querySelectorAll<HTMLElement>('.benefit-cell')
    if (!cells) return
    gsap.set(cells, { y: 30, opacity: 0 })
    const tween = gsap.to(cells, {
      y: 0,
      opacity: 1,
      duration: 0.85,
      ease: 'expo.out',
      stagger: 0.06,
      scrollTrigger: { trigger: ref.current, start: 'top 82%' },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])
  return (
    <section className="bg-cream/40 py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-10 md:gap-16 mb-16 md:mb-20 items-start">
          <div>
            <div className="text-[11px] tracking-[0.3em] text-stone uppercase font-medium mb-6">
              Programs
            </div>
            <h2 className="font-display font-bold text-[34px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
              The most advanced health
              <br />
              improvement programmes
              <br />
              in India.
            </h2>
          </div>
          <p className="text-[15px] md:text-[16px] leading-[1.7] text-graphite md:pt-3 max-w-[420px]">
            We have early access to clinical trials and research studies on
            longevity. Our programmes are firmly grounded in scientifically-
            proven methods.
          </p>
        </div>

        {/* Benefits grid */}
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 md:gap-x-10"
        >
          {items.map((it) => (
            <div key={it.title} className="benefit-cell">
              <div className="w-7 h-7 text-ink mb-5">{it.icon}</div>
              <h3 className="font-display font-bold text-[16px] md:text-[17px] leading-[1.3] tracking-[-0.005em] text-ink mb-3">
                {it.title}
              </h3>
              <p className="text-[13px] md:text-[14px] text-graphite leading-[1.6]">
                {it.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- Brochure / Callback CTA ----------
function BrochureCTA() {
  // Source: theantiagingcentre.com — "BOOK AN APPOINTMENT" form & callback CTA.
  return (
    <section className="bg-cream/40 py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto bg-white text-ink grid md:grid-cols-[1.05fr_1fr] items-stretch overflow-hidden rounded-[28px] border border-mist shadow-[0_30px_80px_-50px_rgba(27,26,24,0.20)]">
        {/* Image side — clean, no overlay text */}
        <div className="relative aspect-[5/4] md:aspect-auto md:h-full bg-mist overflow-hidden md:m-3 md:rounded-[20px]">
          <img
            src="https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=1200&q=85"
            alt="A specialist conversation at TAC"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Content side */}
        <div className="p-9 md:p-14 lg:p-16 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-7 h-px bg-rust" />
            <span className="text-[11px] tracking-[0.32em] uppercase text-rust font-semibold">
              Request a Callback
            </span>
          </div>

          <h3 className="font-display font-bold text-[32px] md:text-[44px] lg:text-[52px] leading-[1.0] tracking-[-0.025em] text-ink mb-6">
            Begin with a conversation.
          </h3>

          <p className="text-[15px] md:text-[16px] leading-[1.7] text-graphite font-light max-w-[460px] mb-10">
            Speak with our anti-aging, metabolic or dermatology specialists about
            your goals. No commitment. We'll call you back at a time that suits.
          </p>

          {/* Trust strip — three pills */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {['30-minute call', 'No commitment', 'Specialist-led'].map((p) => (
              <span
                key={p}
                className="inline-flex items-center text-[10.5px] tracking-[0.22em] uppercase text-graphite font-medium px-3.5 py-2 rounded-full bg-cream border border-mist"
              >
                {p}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#cta"
              data-cursor="hover"
              data-magnetic
              className="group inline-flex items-center gap-3 pl-5 pr-7 py-4 bg-ink text-white text-[11.5px] tracking-[0.2em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
              </span>
              Request a Callback
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="https://wa.me/918826809123"
              data-cursor="hover"
              className="inline-flex items-center gap-2 px-6 py-4 border border-ink/15 text-ink text-[11.5px] tracking-[0.2em] font-semibold uppercase rounded-full hover:border-ink hover:bg-ink hover:text-white transition-colors duration-500"
            >
              WhatsApp
            </a>
          </div>

          <div className="mt-7 text-[12px] text-stone tracking-tight">
            Or call directly:{' '}
            <a
              href="tel:+918826809123"
              data-cursor="hover"
              className="text-ink font-medium hover:text-rust transition-colors duration-300"
            >
              +91 88268 09123
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- Editorial parallax ----------
function Editorial() {
  const imgRef = useRef<HTMLImageElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    if (!imgRef.current || !sectionRef.current) return
    gsap.to(imgRef.current, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [])

  return (
    <section
      id="editorial"
      ref={sectionRef}
      className="bg-white py-16 md:py-24 px-6 md:px-12"
    >
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="aspect-[4/5] md:aspect-[5/6] overflow-hidden bg-mist">
          <img
            ref={imgRef}
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&q=85"
            alt=""
            className="w-full h-[110%] object-cover"
          />
        </div>
        <div className="md:max-w-[480px]">
          <div className="text-[11px] tracking-[0.3em] text-stone uppercase font-medium mb-6">
            Diagnostics
          </div>
          <h2 className="font-display font-bold text-[36px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink mb-8">
            Measurement is medicine.
          </h2>
          <div className="space-y-5 text-[15px] md:text-[16px] leading-[1.7] text-graphite">
            <p>Most clinics treat symptoms. We treat the systems behind them.</p>
            <p>
              Our diagnostic stack — 163 blood parameters, full-genome analysis,
              microbiome sequencing, body composition, vascular function, and
              biological age — produces a complete picture of how your body is
              ageing and which interventions will move the needle.
            </p>
            <p>
              Every measurement is repeated at month 9. Progress is not a feeling.
              It is a number that has changed.
            </p>
          </div>
          <a
            href="#"
            data-cursor="hover"
            className="inline-flex items-center gap-2 mt-10 text-[11px] tracking-[0.25em] text-ink uppercase font-medium hover:text-rust transition-colors group"
          >
            View Diagnostics
            <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

// ---------- Testimonial ----------
function Testimonial() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const words =
    "Their personalised recommendations have significantly improved my mental clarity and physical health. The depth of testing was unlike anything I've experienced before.".split(
      ' '
    )

  return (
    <section ref={ref} className="bg-white py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-16">
          <div className="text-[11px] tracking-[0.25em] text-rust font-semibold uppercase mb-5">
            Patient Stories
          </div>
          <h2 className="font-display font-bold text-[30px] md:text-[44px] leading-[1.1] tracking-[-0.025em] text-ink max-w-[820px] mx-auto">
            Here's what our patients experienced after visiting our longevity
            clinic.
          </h2>
        </div>

        <div className="grid md:grid-cols-[260px_1fr] gap-10 md:gap-16 items-center max-w-[920px] mx-auto">
          <div className="aspect-[4/5] overflow-hidden bg-nougat">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80"
              alt="Vikas — Longevity Plus patient"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <blockquote className="font-editorial font-medium text-[22px] md:text-[28px] leading-[1.4] text-ink">
              "
              {words.map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="inline"
                >
                  {w}{' '}
                </motion.span>
              ))}
              "
            </blockquote>
            <div className="w-[60px] h-px bg-rust mt-8 mb-4" />
            <div className="text-[13px] tracking-[0.2em] text-ink font-semibold uppercase">
              Vikas Mehra
            </div>
            <div className="text-[13px] text-stone mt-1">
              Longevity Plus · 12-month patient
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- Locations ----------
function LocationsLarge() {
  const locs = [
    {
      city: 'Gurugram',
      addr: 'DLF Phase 4 · Sohna Road, Sector 48',
      img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80',
    },
    {
      city: 'Delhi',
      addr: 'Greater Kailash-1 · S-79',
      img: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=900&q=80',
    },
    {
      city: 'Bangalore',
      addr: 'Sadashivnagar & JP Nagar',
      img: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=900&q=80',
    },
  ]
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduceMotion()) return
    const cards = ref.current?.querySelectorAll<HTMLElement>('.loc-card')
    if (!cards) return
    gsap.set(cards, { y: 60, opacity: 0, clipPath: 'inset(0 0 100% 0)' })
    gsap.to(cards, {
      y: 0,
      opacity: 1,
      clipPath: 'inset(0 0 0% 0)',
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.12,
      scrollTrigger: { trigger: ref.current, start: 'top 75%' },
    })
  }, [])
  return (
    <section id="clinics" className="bg-white py-28 md:py-40 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <div className="text-[11px] tracking-[0.25em] text-rust font-semibold uppercase mb-5">
            Visit Us
          </div>
          <h2 className="font-display font-bold text-[34px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
            Exceptional care in leading-edge centres.
          </h2>
        </div>
        <div ref={ref} className="grid md:grid-cols-3 gap-6 md:gap-8">
          {locs.map((l) => (
            <a
              key={l.city}
              href="#"
              data-cursor="hover"
              className="loc-card group block"
            >
              <div className="aspect-[4/5] overflow-hidden bg-nougat mb-5">
                <img
                  src={l.img}
                  alt={l.city}
                  className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
              </div>
              <div className="flex items-baseline justify-between gap-3 border-b border-mist pb-4 group-hover:border-ink transition-colors">
                <div>
                  <h3 className="font-display text-[22px] md:text-[26px] text-ink mb-1">
                    {l.city}
                  </h3>
                  <p className="text-[13px] text-stone">{l.addr}</p>
                </div>
                <span className="text-rust text-xl group-hover:translate-x-2 transition-transform duration-500">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>
        <p className="text-center text-[13px] text-stone mt-10">
          Also in Pune. Online consultations available across India and from Mumbai
          &amp; Hyderabad.
        </p>
      </div>
    </section>
  )
}

// ---------- CTA Band ----------
function CtaBand() {
  return (
    <section
      id="cta"
      className="relative bg-ink py-24 md:py-36 px-6 md:px-12 overflow-hidden"
    >
      {/* Ambient warm glow + soft grain — premium dark luxury */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 600px at 20% 30%, rgba(148,84,85,0.18), transparent 60%), radial-gradient(800px 500px at 85% 70%, rgba(178,122,123,0.12), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay hero-grain"
      />

      <div className="relative z-10 max-w-[1180px] mx-auto">
        {/* Eyebrow row */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="w-7 h-px bg-rust-soft" />
          <span className="text-[11px] tracking-[0.32em] uppercase text-rust-soft font-semibold">
            Begin Your Programme
          </span>
          <span className="w-7 h-px bg-rust-soft" />
        </div>

        {/* Headline — TAC voice */}
        <h2 className="font-display font-bold text-[40px] md:text-[72px] xl:text-[88px] leading-[0.98] tracking-[-0.035em] text-white text-center mb-8 max-w-[1080px] mx-auto">
          Age should never define you.
        </h2>

        {/* Sub */}
        <p className="text-[16px] md:text-[19px] text-white/70 max-w-[640px] mx-auto leading-[1.7] mb-14 text-center font-light">
          Speak with our medical team for a 30-minute personalised conversation.
          No commitment. Just clarity. Available across our five clinics and
          online in Mumbai, Bangalore and Hyderabad.
        </p>

        {/* CTA — three contact paths in pill form */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <a
            href="#cta"
            data-cursor="hover"
            data-magnetic
            className="group inline-flex items-center gap-3 pl-6 pr-8 py-5 bg-white text-ink text-[12px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust hover:text-white transition-colors duration-500"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
            </span>
            Arrange a Consultation
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="https://wa.me/918826809123"
            data-cursor="hover"
            className="inline-flex items-center gap-2 px-7 py-5 border border-white/20 text-white text-[12px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-white/10 transition-colors duration-500"
          >
            WhatsApp
          </a>
          <a
            href="tel:+918826809123"
            data-cursor="hover"
            className="inline-flex items-center gap-2 px-7 py-5 border border-white/20 text-white text-[12px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-white/10 transition-colors duration-500"
          >
            +91 88268 09123
          </a>
        </div>

        {/* Reassurance row — three trust pills */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/10 max-w-[920px] mx-auto rounded-2xl overflow-hidden border border-white/10">
          {[
            { k: '5', l: 'Centres pan-India' },
            { k: '60+ yrs', l: 'In preventive medicine' },
            { k: '163', l: 'Biomarkers per patient' },
          ].map((s) => (
            <div
              key={s.l}
              className="bg-ink px-6 py-7 text-center"
            >
              <div className="font-display font-bold text-[26px] md:text-[34px] text-white leading-none mb-2 tabular-nums tracking-[-0.01em]">
                {s.k}
              </div>
              <div className="text-[10.5px] tracking-[0.25em] uppercase text-white/55 font-medium">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="bg-green text-white pt-16 pb-10 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 md:gap-16">
          <div>
            <div className="mb-5">
              <Logo variant="light" showTagline={false} />
            </div>
            <div className="text-[11px] tracking-[0.28em] uppercase text-white/55 mb-5">
              The Longevity Centre
            </div>
            <p className="text-[14px] text-white/75 leading-[1.65] max-w-[300px] mb-6">
              A medical practice, rooted in nature. Premium preventive medicine for
              the long view.
            </p>
            <a
              href="#cta"
              data-cursor="hover"
              className="inline-flex items-center gap-3 px-6 py-3 bg-rust text-white text-[11px] tracking-[0.2em] font-semibold uppercase hover:bg-rust-deep transition-colors duration-300"
            >
              Book a Consultation <span>→</span>
            </a>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.25em] text-rust-soft font-semibold uppercase mb-5">
              Programmes
            </div>
            <ul className="space-y-3 text-[14px]">
              {PROGRAMS.slice(0, 6).map((p) => (
                <li key={p.title}>
                  <a
                    href="#"
                    data-cursor="hover"
                    className="text-white/80 hover:text-white transition-colors duration-300"
                  >
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.25em] text-rust-soft font-semibold uppercase mb-5">
              Clinics
            </div>
            <ul className="space-y-3 text-[14px]">
              {[
                'Gurugram',
                'Delhi',
                'Pune',
                'Bangalore JP',
                'Bangalore Sadashivnagar',
                'Online (Mumbai · Hyderabad)',
              ].map((c) => (
                <li key={c}>
                  <a
                    href="#"
                    data-cursor="hover"
                    className="text-white/80 hover:text-white transition-colors duration-300"
                  >
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.25em] text-rust-soft font-semibold uppercase mb-5">
              Company
            </div>
            <ul className="space-y-3 text-[14px]">
              {['About', 'Diagnostics', 'Blog', 'Press', 'Careers', 'Privacy'].map(
                (c) => (
                  <li key={c}>
                    <a
                      href="#"
                      data-cursor="hover"
                      className="text-white/80 hover:text-white transition-colors duration-300"
                    >
                      {c}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/15 mt-20 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-[12px] text-white/55">© 2026 The Longevity Centre</p>
          <p className="text-[12px] text-white/55">
            Designed in India · Practising medicine, not marketing.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ---------- App ----------
function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (reduceMotion()) return
    const lenis = new Lenis({
      // longer duration + softer easing = buttery scroll feel,
      // makes scroll-tied scrub animations glide instead of snap
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
    })
    // expose for in-page anchor scroll + debug
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis
    lenis.on('scroll', () => {
      ScrollTrigger.update()
    })
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="bg-white text-graphite">
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <ScrollProgress />
      <Header />
      <Hero />
      <PressStrip />
      <ScienceCards />
      <Programs />
      <Method />
      <ResultsSplit />
      <Editorial />
      <Benefits />
      <Testimonial />
      <ClinicsBand />
      <BrochureCTA />
      <CtaBand />
      <Footer />
      {!ready && null}
    </div>
  )
}

export default App
