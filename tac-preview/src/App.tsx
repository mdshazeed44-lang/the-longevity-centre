import { useEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import { Preloader } from './components/Preloader'
import { Cursor } from './components/Cursor'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { reduceMotion } from './lib/motion'

gsap.registerPlugin(ScrollTrigger)

// ---------- Clinics band ----------
export function ClinicsBand() {
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
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Compact header — 2 col */}
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 md:gap-12 items-end mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                Our Centres
              </span>
            </div>
            <h2
              ref={headRef}
              className="font-display font-bold text-[28px] md:text-[42px] leading-[1.0] tracking-[-0.03em] text-ink"
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
                className={`clinic-row group relative grid grid-cols-[36px_1fr_auto] md:grid-cols-[60px_1fr_1.4fr_1fr_140px] gap-3 md:gap-6 items-center px-2 md:px-4 py-3.5 md:py-4 border-b border-mist transition-colors duration-500 ${
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

                {/* city — on mobile shows area+region inline since other cells are hidden */}
                <div className="min-w-0">
                  <h3
                    className={`font-display font-bold text-[19px] md:text-[28px] leading-[1.0] tracking-[-0.02em] truncate transition-colors duration-500 ${
                      isFeatured ? 'text-white' : 'text-ink group-hover:text-rust-deep'
                    }`}
                  >
                    {c.city}
                  </h3>
                  {/* area shown under city on mobile only */}
                  <div
                    className={`md:hidden text-[10px] tracking-[0.22em] uppercase font-medium mt-1 truncate ${
                      isFeatured ? 'text-white/70' : 'text-stone'
                    }`}
                  >
                    {c.area}
                  </div>
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



// ---------- Cutting-edge science ----------
export function ScienceCards() {
  // Source-aligned: TAC's positioning around longevity, prevention & performance.
  const cards = [
    {
      n: '01',
      tag: 'Vitality',
      title: 'Feel and look great',
      desc:
        'Stay active and enjoy your life well into your late years — measurably energetic, sharp and resilient.',
      img: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=1400&q=85',
    },
    {
      n: '02',
      tag: 'Prevention',
      title: 'Prevent disease',
      desc:
        'Avoid age-related diseases through early detection. Extend your lifespan AND your healthspan together.',
      img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1400&q=85',
    },
    {
      n: '03',
      tag: 'Performance',
      title: 'Improve performance',
      desc:
        'Strengthen your body and sharpen your mind for better results in sport, work and life decisions.',
      img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1400&q=85',
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

    // Card stagger with subtle scale
    const cardsEls = ref.current?.querySelectorAll<HTMLElement>('.sci-card')
    let cardTween: gsap.core.Tween | undefined
    if (cardsEls?.length) {
      gsap.set(cardsEls, { y: 60, opacity: 0, scale: 0.97 })
      cardTween = gsap.to(cardsEls, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: 'top 82%' },
      })
    }

    return () => {
      headTween?.scrollTrigger?.kill()
      headTween?.kill()
      cardTween?.scrollTrigger?.kill()
      cardTween?.kill()
    }
  }, [])

  return (
    <section
      id="science"
      className="relative bg-white py-12 md:py-16 px-6 md:px-12 overflow-hidden"
    >
      {/* Soft ambient backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            'radial-gradient(800px 500px at 90% 10%, rgba(148,84,85,0.04), transparent 60%)',
        }}
      />

      <div className="relative max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 md:gap-14 mb-10 md:mb-14 items-end">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                Longevity Science
              </span>
            </div>
            <h2
              ref={headRef}
              className="font-display font-bold text-[32px] md:text-[48px] leading-[1.0] tracking-[-0.03em] text-ink"
            >
              <span className="line-mask">
                <span>Cutting-edge science</span>
              </span>
              <br />
              <span className="line-mask">
                <span>to reverse ageing.</span>
              </span>
            </h2>
          </div>
          <p className="text-[15px] md:text-[16px] leading-[1.7] text-graphite md:pb-3 max-w-[440px] font-light">
            With evidence-based protocols, you can improve your biological age
            by 5 to 15 years and meaningfully slow your rate of ageing.
          </p>
        </div>

        {/* Premium cards — image with overlay tag, content with hover line */}
        <div ref={ref} className="grid md:grid-cols-3 gap-5 md:gap-6">
          {cards.map((c) => (
            <article
              key={c.title}
              className="sci-card group relative bg-cream/40 hover:bg-cream rounded-[24px] overflow-hidden border border-mist/60 transition-colors duration-500"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                {/* Soft top-left shade for tag legibility */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(27,26,24,0.30) 0%, rgba(27,26,24,0) 35%)',
                  }}
                />
                {/* Number + Tag pill (top-left) */}
                <div className="absolute top-4 left-4 flex items-center gap-2.5 backdrop-blur-md bg-white/15 border border-white/25 rounded-full px-3 py-1.5">
                  <span className="font-display text-[11px] font-semibold text-white tabular-nums tracking-tight">
                    {c.n}
                  </span>
                  <span className="text-[9.5px] tracking-[0.28em] uppercase text-white/90 font-medium">
                    {c.tag}
                  </span>
                </div>
                {/* Hover arrow circle (bottom-right) */}
                <span
                  aria-hidden
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/0 backdrop-blur-md border border-white/0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:bg-white/15 group-hover:border-white/30 transition-all duration-500"
                >
                  →
                </span>
              </div>

              {/* Content */}
              <div className="px-6 py-5 md:px-7 md:py-6">
                <h3 className="font-display font-bold text-[20px] md:text-[22px] leading-[1.2] tracking-[-0.015em] text-ink mb-2 group-hover:text-rust-deep transition-colors duration-500">
                  {c.title}
                </h3>
                <p className="text-[14px] md:text-[14.5px] text-graphite leading-[1.6] font-light">
                  {c.desc}
                </p>
                {/* Animated bottom rust line on hover */}
                <span
                  aria-hidden
                  className="block h-px w-10 bg-rust mt-5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- Press marquee ----------
export function PressStrip() {
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
export function ResultsSplit() {
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

  const ref = useRef<HTMLUListElement>(null)
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
    <section id="results" className="bg-cream/50 py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-[1.05fr_1fr] gap-10 md:gap-16 items-start">
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
            className="font-display font-bold text-[32px] md:text-[48px] leading-[1.0] tracking-[-0.03em] text-ink mb-5"
          >
            <span className="line-mask">
              <span>A new,</span>
            </span>
            <br />
            <span className="line-mask">
              <span>reformed life.</span>
            </span>
          </h2>
          <p className="text-[14.5px] md:text-[16px] leading-[1.65] text-graphite font-light max-w-[520px] mb-8">
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

        {/* RIGHT — clean image, no text overlay. Real TAC clinic interior. */}
        <div className="md:sticky md:top-28 flex flex-col gap-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-mist">
            <img
              src="/tac-photos/gurugram-clinic.jpg"
              alt="Inside a TAC clinic"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Caption block — separate from image, not overlaid */}
          <div className="bg-white rounded-[20px] border border-mist p-6 md:p-7">
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
export function Benefits() {
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
    <section className="bg-cream/40 py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-10 md:gap-14 mb-12 md:mb-16 items-start">
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
export function BrochureCTA() {
  // Source: theantiagingcentre.com — "BOOK AN APPOINTMENT" form & callback CTA.
  return (
    <section className="bg-cream/40 py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto bg-white text-ink grid md:grid-cols-[1.05fr_1fr] items-stretch overflow-hidden rounded-[28px] border border-mist shadow-[0_30px_80px_-50px_rgba(27,26,24,0.20)]">
        {/* Image side — clean, no overlay text */}
        <div className="relative aspect-[5/4] md:aspect-auto md:h-full bg-mist overflow-hidden md:m-3 md:rounded-[20px]">
          <img
            src="/tac-photos/clinic-interior-1.jpg"
            alt="Inside a TAC clinic"
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
export function Editorial() {
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
      className="bg-white py-12 md:py-16 px-6 md:px-12"
    >
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
        <div className="aspect-[4/3] md:aspect-[5/4] overflow-hidden rounded-[20px] bg-mist">
          <img
            ref={imgRef}
            src="/tac-photos/clinic-interior-2.jpg"
            alt="Diagnostics at TAC"
            className="w-full h-[110%] object-cover"
          />
        </div>
        <div className="md:max-w-[480px]">
          <div className="text-[11px] tracking-[0.3em] text-stone uppercase font-medium mb-5">
            Diagnostics
          </div>
          <h2 className="font-display font-bold text-[30px] md:text-[42px] leading-[1.05] tracking-[-0.025em] text-ink mb-6">
            Measurement is medicine.
          </h2>
          <div className="space-y-4 text-[14.5px] md:text-[15.5px] leading-[1.65] text-graphite">
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

// ---------- CTA Band ----------
export function CtaBand() {
  return (
    <section
      id="cta"
      className="relative bg-ink py-16 md:py-24 px-6 md:px-12 overflow-hidden"
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
// ---------- App ----------
// App is the chrome shell — Preloader · Cursor · Header · {children} · Footer
// + Lenis smooth-scroll lifecycle. Pages are passed in as children from main.tsx.
function App({ children }: { children: ReactNode }) {
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
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      {!ready && null}
    </div>
  )
}

export default App
