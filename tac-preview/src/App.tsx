import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import { Cursor } from './components/Cursor'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { reduceMotion } from './lib/motion'

gsap.registerPlugin(ScrollTrigger)

// ---------- Clinics band ----------
export function ClinicsBand() {
  // The eight TLC clinic locations across India.
  type Clinic = {
    city: string
    region: string
    area: string
    phone: string
    featured?: boolean
  }
  const clinics: Clinic[] = [
    {
      city: 'Delhi',
      region: 'NCR',
      area: 'Greater Kailash-1',
      phone: '+91 97171 46500',
    },
    {
      city: 'Gurgaon',
      region: 'NCR',
      area: 'Sector 48',
      phone: '+91 87701 95833',
    },
    {
      city: 'Mumbai',
      region: 'Maharashtra',
      area: 'Opening soon',
      phone: '+91 88268 09123',
    },
    {
      city: 'Pune',
      region: 'Maharashtra',
      area: 'Hadapsar',
      phone: '+91 97623 86121',
    },
    {
      city: 'Nagpur',
      region: 'Maharashtra',
      area: 'Opening soon',
      phone: '+91 88268 09123',
    },
    {
      city: 'Goa',
      region: 'Goa',
      area: 'Opening soon',
      phone: '+91 88268 09123',
    },
    {
      city: 'Hyderabad',
      region: 'Telangana',
      area: 'Opening soon',
      phone: '+91 88268 09123',
    },
    {
      city: 'Bangalore',
      region: 'Karnataka',
      area: 'JP Nagar · Sadashivnagar',
      phone: '+91 80767 19637',
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

    // City card stagger — fade up + slight lift
    const rows = railRef.current?.querySelectorAll<HTMLElement>('.clinic-row')
    let rowTween: gsap.core.Tween | undefined
    if (rows?.length) {
      gsap.set(rows, { opacity: 0, y: 28 })
      rowTween = gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: { trigger: railRef.current, start: 'top 82%' },
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

  // Pin coordinates as % of the map image's box (left, top).
  // 'side' decides where the city label sits — chosen per pin to avoid
  // overlapping with neighbours (Mumbai/Pune/Hyderabad/Goa cluster).
  const pinCoords: Record<
    string,
    { left: string; top: string; side: 'top' | 'bottom' | 'left' | 'right' }
  > = {
    Delhi:     { left: '46%', top: '32%', side: 'top' },
    Gurgaon:   { left: '43%', top: '36%', side: 'left' },
    Nagpur:    { left: '48%', top: '58%', side: 'right' },
    Mumbai:    { left: '34%', top: '63%', side: 'left' },
    Pune:      { left: '40%', top: '67%', side: 'right' },
    Hyderabad: { left: '48%', top: '69%', side: 'right' },
    Goa:       { left: '36%', top: '74%', side: 'left' },
    Bangalore: { left: '44%', top: '80%', side: 'bottom' },
  }

  return (
    <section id="clinics" ref={ref} className="relative bg-white overflow-hidden">
      {/* Soft warm wash — barely-there cream + rust */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background:
            'radial-gradient(900px 600px at 18% 20%, rgba(148,84,85,0.04), transparent 60%), radial-gradient(800px 500px at 82% 80%, rgba(238,230,219,0.55), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Header */}
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 md:gap-12 items-end mb-12 md:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[10.5px] md:text-[11px] tracking-[0.42em] text-rust font-semibold uppercase">
                Our Centres
              </span>
            </div>
            <h2
              ref={headRef}
              className="font-display font-light text-[30px] md:text-[44px] xl:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink"
            >
              <span className="line-mask">
                <span>Find us where</span>
              </span>{' '}
              <span className="line-mask">
                <span className="font-bold text-rust">you live.</span>
              </span>
            </h2>
          </div>
          <p className="text-[14px] md:text-[15px] text-graphite leading-[1.7] font-light max-w-[440px] md:text-right md:pb-2">
            Eight clinics across India — Delhi, Gurgaon, Mumbai, Pune, Nagpur,
            Goa, Hyderabad and Bangalore. One shared medical record across
            every centre.
          </p>
        </div>

        {/* MAIN — city grid (left) + India map (right) */}
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-start">
          {/* CITY DIRECTORY ROWS — clean horizontal list.
              Each row: number · city · area+region · phone · arrow.
              Compact single-line layout, hairline dividers between rows. */}
          <div ref={railRef} className="border-t border-mist">
            {clinics.map((c, i) => (
              <a
                key={c.city + c.area}
                href="/contact"
                data-cursor="hover"
                className="clinic-row group relative grid grid-cols-[28px_1fr_auto] md:grid-cols-[40px_1.1fr_1.4fr_1.2fr_36px] gap-3 md:gap-5 items-center px-1 md:px-2 py-3.5 md:py-4 border-b border-mist hover:bg-cream/40 transition-colors duration-500"
              >
                {/* Number */}
                <span className="font-display text-[12px] md:text-[13px] text-rust font-semibold tabular-nums tracking-tight">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* City */}
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-[16px] md:text-[19px] leading-[1.1] tracking-[-0.02em] text-ink group-hover:text-rust transition-colors duration-500 truncate">
                    {c.city}
                  </h3>
                  {/* Mobile-only meta */}
                  <div className="md:hidden text-[10px] tracking-[0.22em] uppercase text-stone font-medium mt-1 truncate">
                    {c.area} · {c.region}
                  </div>
                </div>

                {/* Area + region (desktop only) */}
                <div className="hidden md:block min-w-0">
                  <div className="text-[11px] tracking-[0.22em] uppercase text-graphite font-semibold leading-tight truncate">
                    {c.area}
                  </div>
                  <div className="text-[10px] tracking-[0.22em] uppercase text-stone font-medium mt-0.5 truncate">
                    {c.region}
                  </div>
                </div>

                {/* Phone (desktop only) */}
                <div className="hidden md:block text-[12.5px] tabular-nums tracking-tight text-ink font-medium truncate">
                  {c.phone}
                </div>

                {/* Arrow chip */}
                <span
                  aria-hidden
                  className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-cream group-hover:bg-rust text-ink group-hover:text-white transition-colors duration-500 text-[13px] shrink-0"
                >
                  →
                </span>

                {/* Hover-fill rust line under row */}
                <span
                  aria-hidden
                  className="absolute left-0 right-0 bottom-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] bg-rust"
                />
              </a>
            ))}
          </div>

          {/* INDIA MAP — sticky on desktop, full visual on mobile */}
          <div className="lg:sticky lg:top-28">
            <div className="relative bg-[#FAF6EE] border border-mist rounded-[24px] p-6 md:p-8 overflow-hidden">
              {/* Subtle ambient wash */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-60"
                style={{
                  background:
                    'radial-gradient(500px 400px at 50% 30%, rgba(148,84,85,0.06), transparent 70%)',
                }}
              />

              {/* Header strip */}
              <div className="relative flex items-center justify-between mb-5">
                <div className="text-[10px] tracking-[0.32em] uppercase text-rust font-semibold">
                  Pan-India Network
                </div>
                <div className="font-display font-bold text-[14px] text-ink tabular-nums">
                  8 Cities
                </div>
              </div>

              {/* India map — uses uploaded line-art map asset, with rust
                  pins positioned on top via absolute coordinates. */}
              <div
                className="relative w-full"
                style={{ aspectRatio: '1 / 1' }}
                aria-label="Map of India with TLC clinic locations"
                role="img"
              >
                <img
                  src="/main-map.png"
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
                />

                {/* Pins overlay — Google-Maps-style teardrop markers.
                    Each pin is a rust teardrop shape with a white core dot
                    and a vibrating glow halo behind it. The pin anchors
                    from its bottom point (which lands exactly on the city
                    coordinate). Labels float beside each pin. */}
                {clinics.map((c, i) => {
                  const p = pinCoords[c.city]
                  if (!p) return null

                  const labelPos: Record<string, string> = {
                    top: 'left-1/2 bottom-full mb-1 -translate-x-1/2',
                    bottom: 'left-1/2 top-full mt-2 -translate-x-1/2',
                    left: 'right-full top-1/2 mr-2 -translate-y-1/2',
                    right: 'left-full top-1/2 ml-2 -translate-y-1/2',
                  }

                  return (
                    <div
                      key={c.city + c.area}
                      className="clinic-pin absolute group"
                      style={{
                        // Anchor pin's bottom-center on the city coord
                        left: p.left,
                        top: p.top,
                        transform: 'translate(-50%, -100%)',
                      }}
                    >
                      {/* Vibrating glow halo — radiating soft rust pulse */}
                      <span
                        aria-hidden
                        className="pin-glow absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[20%] w-10 h-10 rounded-full"
                        style={{
                          background:
                            'radial-gradient(circle, rgba(148,84,85,0.55) 0%, rgba(148,84,85,0.20) 45%, transparent 75%)',
                          animationDelay: `${i * 0.18}s`,
                          filter: 'blur(2px)',
                        }}
                      />

                      {/* Teardrop pin — SVG with rust fill + white core */}
                      <svg
                        width="26"
                        height="34"
                        viewBox="0 0 26 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="pin-bob relative block drop-shadow-[0_4px_8px_rgba(27,26,24,0.35)] group-hover:drop-shadow-[0_6px_12px_rgba(148,84,85,0.55)] transition-all duration-300"
                        style={{ animationDelay: `${i * 0.18}s` }}
                      >
                        {/* Outer subtle ring around pin head for definition */}
                        <path
                          d="M13 0C5.82 0 0 5.82 0 13c0 9.5 13 21 13 21s13-11.5 13-21c0-7.18-5.82-13-13-13z"
                          fill="#945455"
                          stroke="#FFFFFF"
                          strokeWidth="1.6"
                        />
                        {/* Inner gradient glow on the pin head */}
                        <circle cx="13" cy="13" r="10" fill="#7A4344" opacity="0.45" />
                        {/* Center white dot */}
                        <circle
                          cx="13"
                          cy="13"
                          r="4.5"
                          fill="#FFFFFF"
                        />
                        {/* Tiny rust dot in white core for depth */}
                        <circle cx="13" cy="13" r="1.6" fill="#945455" />
                      </svg>

                      {/* Label pill */}
                      <span
                        className={`absolute ${labelPos[p.side]} px-2 py-[3px] bg-white border border-rust/25 rounded-full text-[9px] tracking-[0.16em] uppercase text-ink font-bold whitespace-nowrap shadow-[0_4px_10px_-3px_rgba(27,26,24,0.15)] group-hover:bg-rust group-hover:text-white group-hover:border-rust transition-colors duration-300`}
                      >
                        {c.city}
                      </span>
                    </div>
                  )
                })}

                <style>{`
                  /* Vibrating glow — quick pulse + scale */
                  @keyframes clinicPinGlow {
                    0%   { opacity: 0.85; transform: translate(-50%, 20%) scale(1); }
                    50%  { opacity: 0.35; transform: translate(-50%, 20%) scale(1.45); }
                    100% { opacity: 0.85; transform: translate(-50%, 20%) scale(1); }
                  }
                  .pin-glow {
                    animation: clinicPinGlow 1.6s ease-in-out infinite;
                  }

                  /* Subtle vertical bob on the pin itself */
                  @keyframes clinicPinBob {
                    0%, 100% { transform: translateY(0); }
                    50%      { transform: translateY(-2px); }
                  }
                  .pin-bob {
                    animation: clinicPinBob 2.4s ease-in-out infinite;
                  }

                  @media (prefers-reduced-motion: reduce) {
                    .pin-glow, .pin-bob { animation: none; }
                  }
                `}</style>
              </div>

              {/* Footer strip — quick stat */}
              <div className="relative mt-5 pt-5 border-t border-mist text-center">
                <div className="text-[10px] tracking-[0.3em] uppercase text-rust font-semibold mb-1">
                  Shared Medical Record
                </div>
                <p className="text-[12.5px] leading-[1.5] text-graphite font-light">
                  Your care continues across every centre — one team, one
                  programme, one record.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* drawn baseline divider */}
        <div className="clinic-divider h-px bg-ink/15 mt-12 md:mt-16" />
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
    <section id="results" className="bg-cream/50 py-10 md:py-14 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-start">
        {/* LEFT — outcomes list (compact) */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-7 h-px bg-rust" />
            <span className="text-[10.5px] tracking-[0.32em] text-rust font-semibold uppercase">
              What 12 Months Brings
            </span>
          </div>
          <h2
            ref={headRef}
            className="font-display font-bold text-[26px] md:text-[36px] xl:text-[42px] leading-[1.0] tracking-[-0.03em] text-ink mb-3.5"
          >
            <span className="line-mask">
              <span>A new,</span>
            </span>
            <br />
            <span className="line-mask">
              <span>reformed life.</span>
            </span>
          </h2>
          <p className="text-[13.5px] md:text-[14.5px] leading-[1.55] text-graphite font-light max-w-[520px] mb-5">
            After the 12-month programme, patients describe a reformed life —
            restored vitality, measurably better health.
          </p>

          <ul ref={ref} className="border-t border-mist">
            {outcomes.map((o, i) => (
              <li
                key={o.label}
                className="result-row group flex items-baseline gap-5 md:gap-6 py-3 border-b border-mist"
              >
                <span className="font-display text-[12.5px] text-rust font-semibold tabular-nums tracking-tight w-7 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-[15px] md:text-[16.5px] leading-[1.25] tracking-[-0.01em] text-ink group-hover:text-rust-deep transition-colors duration-300">
                    {o.label}
                  </div>
                  <div className="mt-0.5 text-[12px] md:text-[12.5px] text-stone leading-[1.45] font-light">
                    {o.detail}
                  </div>
                </div>
                <span className="hidden md:inline-block text-rust opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-500 text-base">
                  →
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — editorial brand imagery only */}
        <div className="md:sticky md:top-28">
          <div className="relative aspect-[4/5] sm:aspect-[1/1] md:aspect-[4/5] overflow-hidden rounded-[18px] bg-mist max-h-[560px]">
            <img
              src="/longevity/reformed-life.jpg"
              alt="Restored vitality — strength and capability returned"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
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
              href="/contact"
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
              href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0"
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
            src="/longevity/diagnostics-lab.jpg"
            alt="Lab technician sampling a labelled blood vial — biomarker analysis"
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
// Editorial CTA on white. Rust accents, ink headline with rust accent.
// Three contact paths + 3-stat reassurance grid with hairline borders.
export function CtaBand() {
  return (
    <section
      id="cta"
      className="relative bg-white py-20 md:py-28 px-6 md:px-12 overflow-hidden"
    >
      {/* Soft ambient warmth — barely-there rust + nougat wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 600px at 18% 25%, rgba(148,84,85,0.05), transparent 60%), radial-gradient(800px 500px at 85% 75%, rgba(238,230,219,0.55), transparent 60%)',
        }}
      />
      {/* Hairline top + bottom rules — editorial framing */}
      <div aria-hidden className="absolute inset-x-6 md:inset-x-12 top-0 h-px bg-ink/8" />
      <div aria-hidden className="absolute inset-x-6 md:inset-x-12 bottom-0 h-px bg-ink/8" />

      <div className="relative z-10 max-w-[1180px] mx-auto">
        {/* Eyebrow row */}
        <div className="flex items-center justify-center gap-3 mb-7">
          <span className="w-7 h-px bg-rust" />
          <span className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold">
            Begin Your Programme
          </span>
          <span className="w-7 h-px bg-rust" />
        </div>

        {/* Headline — ink with rust accent on the verb */}
        <h2 className="font-display font-light text-[34px] md:text-[56px] xl:text-[68px] leading-[1.02] tracking-[-0.035em] text-ink text-center mb-6 max-w-[1080px] mx-auto">
          Age should never{' '}
          <span className="font-bold text-rust">define you.</span>
        </h2>

        {/* Sub */}
        <p className="text-[15px] md:text-[17px] text-graphite max-w-[620px] mx-auto leading-[1.7] mb-10 text-center font-light">
          Speak with our medical team for a 30-minute personalised conversation.
          No commitment. Just clarity. Available across our eight clinics in
          Delhi, Gurgaon, Mumbai, Pune, Nagpur, Goa, Hyderabad and Bangalore.
        </p>

        {/* CTA — three contact paths in pill form */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          <a
            href="/contact"
            data-cursor="hover"
            data-magnetic
            className="group inline-flex items-center gap-3 pl-5 pr-7 py-4 bg-rust text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-ink transition-colors duration-500"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            Arrange a Consultation
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0"
            data-cursor="hover"
            className="inline-flex items-center gap-2 px-6 py-4 border border-ink/15 text-ink text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:border-rust hover:text-rust transition-colors duration-500"
          >
            WhatsApp
          </a>
          <a
            href="tel:+918826809123"
            data-cursor="hover"
            className="inline-flex items-center gap-2 px-6 py-4 border border-ink/15 text-ink text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:border-rust hover:text-rust transition-colors duration-500"
          >
            +91 88268 09123
          </a>
        </div>

        {/* Reassurance row — stacks on mobile so 3 cells don't compress
            below 110px each. Hairline grid pattern on tablet and up. */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-ink/10 max-w-[860px] mx-auto rounded-2xl overflow-hidden border border-ink/10">
          {[
            { k: '8', l: 'Centres pan-India' },
            { k: '60+ yrs', l: 'In preventive medicine' },
            { k: '163', l: 'Biomarkers per patient' },
          ].map((s) => (
            <div
              key={s.l}
              className="bg-white px-5 py-6 text-center"
            >
              <div className="font-display font-bold text-[22px] md:text-[30px] text-rust leading-none mb-2 tabular-nums tracking-[-0.01em]">
                {s.k}
              </div>
              <div className="text-[10px] tracking-[0.28em] uppercase text-graphite font-semibold">
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
// App is the chrome shell — Cursor · Header · {children} · Footer
// + Lenis smooth-scroll lifecycle. Pages are passed in as children from main.tsx.
function App({ children }: { children: ReactNode }) {
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
    // expose for in-page anchor scroll + debug (typed via src/types/globals.d.ts)
    window.__lenis = lenis
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
