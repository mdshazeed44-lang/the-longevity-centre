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
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'h-[64px] bg-ink/95 backdrop-blur-lg border-b border-white/10'
          : 'h-[80px] bg-ink border-b border-white/10'
      }`}
    >
      <div className="h-full flex items-center justify-between px-6 md:px-12">
        <a href="#" data-cursor="hover" className="text-white">
          <Logo variant="light" />
        </a>
        <nav className="hidden md:flex gap-9">
          {['About', 'Programs', 'Diagnostics', 'Clinics', 'Blog', 'Contact'].map(
            (label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                data-cursor="hover"
                className="relative text-[14px] text-white/80 hover:text-white transition-colors duration-300 group"
              >
                {label}
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-rust-soft group-hover:w-full transition-all duration-500" />
              </a>
            )
          )}
        </nav>
        <a
          href="#cta"
          data-cursor="hover"
          data-magnetic
          className="hidden md:inline-flex items-center px-6 py-3 bg-white text-ink text-[13px] tracking-wide hover:bg-rust hover:text-white transition-colors duration-300"
        >
          Book a Consultation
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
      region: 'Haryana · NCR',
      area: 'Sector 48',
      addr: 'Block A1, Tikri, Vipul World, Sohna Road, near GD Goenka Public School.',
      phone: '+91 87701 95833',
    },
    {
      city: 'Delhi',
      region: 'NCR',
      area: 'Greater Kailash-1',
      addr: 'S-79, Ground Floor, Greater Kailash-1, New Delhi 110048.',
      phone: '+91 97171 46500',
    },
    {
      city: 'Pune',
      region: 'Maharashtra',
      area: 'Hadapsar',
      addr: '2nd Floor, Kumar Prism, Amanora Road, opposite Fab India.',
      phone: '+91 97623 86121',
    },
    {
      city: 'Bangalore',
      region: 'Karnataka',
      area: 'JP Nagar',
      addr: '2nd Floor, Kalyani Magnum, 87, 3rd Main Road, Dollars Colony, Phase 4.',
      phone: '+91 80767 19637',
    },
    {
      city: 'Bangalore',
      region: 'Karnataka',
      area: 'Sadashivnagar',
      addr: '1st Floor, 73, Railway Parallel Road, 4th Block, Kumara Park West.',
      phone: '+91 80767 19637',
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

    // Cell stagger reveal
    const cells = ref.current?.querySelectorAll<HTMLElement>('.clinic-cell')
    let cellTween: gsap.core.Tween | undefined
    if (cells?.length) {
      gsap.set(cells, { opacity: 0, y: 32 })
      cellTween = gsap.to(cells, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })
    }

    return () => {
      headTween?.scrollTrigger?.kill()
      headTween?.kill()
      cellTween?.scrollTrigger?.kill()
      cellTween?.kill()
    }
  }, [])

  return (
    <section id="clinics" className="bg-white">
      <div className="max-w-[1380px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Header */}
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-20 mb-16 md:mb-24 items-end">
          <div>
            <div className="flex items-center gap-3 mb-7">
              <span className="w-8 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                Our Centres
              </span>
            </div>
            <h2
              ref={headRef}
              className="font-display font-bold text-[36px] md:text-[64px] leading-[1.0] tracking-[-0.03em] text-ink"
            >
              <span className="line-mask">
                <span>Find us where</span>
              </span>
              <br />
              <span className="line-mask">
                <span>you live.</span>
              </span>
            </h2>
          </div>
          <div className="flex flex-col md:items-end gap-6">
            <p className="text-[15px] md:text-[16px] text-graphite leading-[1.7] font-light max-w-[440px] md:text-right">
              Five flagship centres across India, with online consultations
              available in Mumbai, Bangalore and Hyderabad.
            </p>
            <a
              href="#cta"
              data-cursor="hover"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] text-ink uppercase font-medium hover:text-rust transition-colors group self-start md:self-end"
            >
              Book a Consultation
              <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Centres — 3-up grid, 6th cell is the "Online" feature */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {clinics.map((c, i) => (
            <a
              key={c.city + c.area}
              href="#cta"
              data-cursor="hover"
              className="clinic-cell group relative bg-cream/40 hover:bg-cream rounded-[24px] p-8 md:p-10 overflow-hidden border border-mist/60 transition-colors duration-500"
            >
              {/* number / region */}
              <div className="flex items-center justify-between mb-10">
                <span className="font-display text-[18px] md:text-[20px] text-rust font-semibold tabular-nums tracking-tight">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[10px] tracking-[0.28em] text-stone uppercase font-medium">
                  {c.region}
                </span>
              </div>

              {/* city + area */}
              <div className="mb-6">
                <h3 className="font-display font-bold text-[32px] md:text-[40px] leading-[1.0] tracking-[-0.025em] text-ink group-hover:text-rust-deep transition-colors duration-500">
                  {c.city}
                </h3>
                <div className="mt-2 text-[12px] tracking-[0.22em] uppercase text-graphite font-medium">
                  {c.area}
                </div>
              </div>

              {/* address */}
              <p className="text-[13.5px] md:text-[14px] text-graphite leading-[1.65] font-light min-h-[3.8em] mb-7">
                {c.addr}
              </p>

              {/* phone + CTA */}
              <div className="flex items-center justify-between pt-6 border-t border-mist/80">
                <span className="text-[12px] text-ink font-medium tracking-tight tabular-nums">
                  {c.phone}
                </span>
                <span className="inline-flex items-center gap-2 text-[10.5px] tracking-[0.25em] text-ink uppercase font-semibold">
                  Visit
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-1 text-rust">
                    →
                  </span>
                </span>
              </div>

              {/* hover accent — soft rust glow at top-right */}
              <span
                aria-hidden
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-rust/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none"
              />
            </a>
          ))}

          {/* Online consultations card — accent treatment */}
          <a
            href="#cta"
            data-cursor="hover"
            className="clinic-cell group relative bg-ink text-white rounded-[24px] p-8 md:p-10 overflow-hidden transition-colors duration-500"
          >
            <div className="flex items-center justify-between mb-10">
              <span className="font-display text-[18px] md:text-[20px] text-rust-soft font-semibold tabular-nums tracking-tight">
                06
              </span>
              <span className="text-[10px] tracking-[0.28em] text-white/55 uppercase font-medium">
                Pan-India
              </span>
            </div>

            <div className="mb-6">
              <h3 className="font-display font-bold text-[32px] md:text-[40px] leading-[1.0] tracking-[-0.025em]">
                Online
              </h3>
              <div className="mt-2 text-[12px] tracking-[0.22em] uppercase text-white/65 font-medium">
                Mumbai · Bangalore · Hyderabad
              </div>
            </div>

            <p className="text-[13.5px] md:text-[14px] text-white/75 leading-[1.65] font-light min-h-[3.8em] mb-7">
              Virtual consultations with our anti-aging, metabolic and dermatology
              specialists — full programme delivery, anywhere in India.
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-white/15">
              <span className="text-[12px] text-white font-medium tracking-tight">
                +91 88268 09123
              </span>
              <span className="inline-flex items-center gap-2 text-[10.5px] tracking-[0.25em] text-white uppercase font-semibold">
                Book Online
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1 text-rust-soft">
                  →
                </span>
              </span>
            </div>

            {/* subtle ambient glow */}
            <span
              aria-hidden
              className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-rust/40 opacity-40 group-hover:opacity-70 transition-opacity duration-700 blur-3xl pointer-events-none"
            />
          </a>
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
  return (
    <section className="bg-cream py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto text-center">
        <div className="text-[11px] tracking-[0.2em] text-rust font-semibold uppercase mb-6">
          A Medical Practice, Rooted in Nature
        </div>
        <p className="font-display font-bold text-[28px] md:text-[40px] leading-[1.3] text-ink max-w-[820px] mx-auto">
          We measure what others guess.{' '}
          <span className="font-script text-rust text-[1.4em] leading-[0.8] inline-block">
            We change
          </span>{' '}
          what others manage.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-0 mt-24 md:divide-x md:divide-mist">
          {[
            { val: 60, suf: '+', label: 'Years experience in preventive medicine' },
            { val: 10000, suf: '+', label: 'Lives reformed by our team' },
            { val: 5, suf: '', label: 'Centres pan-India' },
            { val: 163, suf: '', label: 'Blood parameters per patient' },
          ].map((s) => (
            <div key={s.label} className="px-6 text-center">
              <div className="font-display font-bold text-[64px] md:text-[88px] text-ink leading-none mb-4">
                <Counter value={s.val} suffix={s.suf} />
              </div>
              <div className="text-[13px] text-stone max-w-[180px] mx-auto leading-snug">
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
              <span>
                reformed{' '}
                <span className="font-script font-normal text-rust text-[1.05em] leading-[0.8] italic">
                  life.
                </span>
              </span>
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
            Begin with a{' '}
            <span className="font-script font-normal text-rust text-[1.1em] leading-[0.8] italic">
              conversation.
            </span>
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
            Here's what our patients{' '}
            <span className="font-script text-rust text-[1.4em] leading-[0.8]">
              experienced
            </span>{' '}
            after visiting our longevity clinic.
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
            <blockquote className="font-editorial italic font-medium text-[22px] md:text-[28px] leading-[1.4] text-ink">
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
            Exceptional care in leading-edge{' '}
            <span className="font-script text-rust text-[1.4em] leading-[0.8]">
              centres
            </span>
            .
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
          Age should never{' '}
          <span className="font-script font-normal text-rust-soft text-[1.05em] leading-[0.8] italic">
            define
          </span>{' '}
          you.
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
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
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
      <ClinicsBand />
      <ScienceCards />
      <PressStrip />
      <ResultsSplit />
      <Benefits />
      <Programs />
      <Method />
      <TrustStrip />
      <Editorial />
      <BrochureCTA />
      <Testimonial />
      <CtaBand />
      <Footer />
      {!ready && null}
    </div>
  )
}

export default App
