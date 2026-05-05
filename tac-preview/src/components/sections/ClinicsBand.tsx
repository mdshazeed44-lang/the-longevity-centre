import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../../lib/motion'

gsap.registerPlugin(ScrollTrigger)

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
