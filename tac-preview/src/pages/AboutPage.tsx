// AboutPage — content sourced verbatim from theantiagingcentre.com/about
// Sections: Hero · Marquee · Mission · Founders · Specialist Team · Clinics band · Stats · Final CTA
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'
import { useDocumentMeta } from '../lib/seo'

gsap.registerPlugin(ScrollTrigger)

const ABOUT_META = {
  title: 'About TLC — The Longevity Centre · Precision Longevity Medicine, India',
  description:
    'Meet the founders of The Longevity Centre — Dr. Abhinav Sharma (MBBS, MS, 11,000+ surgeries) and Dr. Bhavna Sharma (IVF specialist, 7,500+ procedures). Twenty-plus years of preventive medicine experience. Five centres pan-India.',
  path: '/about',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': 'https://theantiagingcentre.com/about#webpage',
      url: 'https://theantiagingcentre.com/about',
      name: 'About TAC — Leaders in Preventive & Anti-Aging Medicine, India',
      isPartOf: { '@id': 'https://theantiagingcentre.com/#organization' },
      about: { '@id': 'https://theantiagingcentre.com/#organization' },
      inLanguage: 'en-IN',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://theantiagingcentre.com/about#dr-abhinav-sharma',
      name: 'Dr. Abhinav Sharma',
      honorificPrefix: 'Dr.',
      honorificSuffix: 'MBBS, MS',
      jobTitle: 'Co-Founder · Anti-Aging & Preventive Medicine',
      description:
        'Accomplished minimally invasive surgeon with over 11,000 successful surgeries. A visionary health entrepreneur who pioneers advancements in anti-aging, preventive medicine and wellness.',
      image: 'https://theantiagingcentre.com/team/dr-abhinav.webp',
      worksFor: { '@id': 'https://theantiagingcentre.com/#organization' },
      knowsAbout: [
        'Anti-Aging Medicine',
        'Preventive Medicine',
        'Minimally Invasive Surgery',
        'Wellness',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://theantiagingcentre.com/about#dr-bhavna-sharma',
      name: 'Dr. Bhavna Sharma',
      honorificPrefix: 'Dr.',
      jobTitle: 'Co-Founder · Reproductive & Sexual Anti-Aging',
      description:
        "Leading IVF specialist with over 7,500 successful procedures. Specialises in reproductive and sexual anti-aging, women's health, oocyte preservation and HRT.",
      image: 'https://theantiagingcentre.com/team/dr-bhavna.jpg',
      worksFor: { '@id': 'https://theantiagingcentre.com/#organization' },
      knowsAbout: [
        'IVF',
        "Women's Health",
        'Oocyte Preservation',
        'Hormone Replacement Therapy',
        'Reproductive Anti-Aging',
      ],
    },
  ],
}

const FOUNDERS = [
  {
    name: 'Dr. Abhinav Sharma',
    creds: 'MBBS · MS',
    role: 'Co-Founder · Anti-Aging & Preventive Medicine',
    bio: 'Accomplished minimally invasive surgeon with over 11,000 successful surgeries. A visionary health entrepreneur who pioneers advancements in anti-aging, preventive medicine and wellness — blending expertise with innovation for holistic care.',
    img: '/team/dr-abhinav.webp',
    stat: '11,000+',
    statLabel: 'Successful Surgeries',
  },
  {
    name: 'Dr. Bhavna Sharma',
    creds: 'IVF Specialist',
    role: 'Co-Founder · Reproductive & Sexual Anti-Aging',
    bio: "Leading IVF specialist with over 7,500 successful procedures. Specialises in reproductive and sexual anti-aging, women's health, oocyte preservation and HRT — blending compassion with cutting-edge fertility solutions, empowering women on their unique health journeys.",
    img: '/team/dr-bhavna.jpg',
    stat: '7,500+',
    statLabel: 'IVF Procedures',
  },
]

// Specialist team — actual doctors with real portraits cropped from
// the TAC brochure PDF (pages 10–12). Founders shown in the dedicated
// Founders section above; this list is the wider physician panel.
const SPECIALISTS = [
  {
    name: 'Dr. Karan Mane',
    creds: 'MBBS · MS',
    role: 'Director',
    photo: '', // No photo available in brochure
  },
  {
    name: 'Dr. Rahul Chaube',
    creds: 'MD Medicine',
    role: 'Physician & Diabetologist',
    photo: '/team/dr-rahul-chaube.jpg',
  },
  {
    name: 'Dr. Vaibhav Bhisikar',
    creds: 'MBBS · MS · MCh',
    role: 'Plastic & Hair Surgeon',
    photo: '/team/dr-vaibhav-bhisikar.jpg',
  },
  {
    name: 'Dr. Aniket Agarwal',
    creds: 'MBBS · CPS',
    role: 'Dermatologist & Trichologist',
    photo: '/team/dr-aniket-agarwal.jpg',
  },
  {
    name: 'Dr. Surekha Sawant',
    creds: 'Longevity Consultant',
    role: 'Patient Care · Programme Coordination',
    photo: '/team/dr-surekha-sawant.jpg',
  },
  {
    name: 'Dr. Pooja Dahiya',
    creds: 'Longevity Consultant',
    role: 'Patient Care · Programme Coordination',
    photo: '/team/dr-pooja-dahiya.jpg',
  },
  {
    name: 'Dr. Niloufar Hayat',
    creds: 'Longevity Consultant',
    role: 'Patient Care · Programme Coordination',
    photo: '/team/dr-niloufar-hayat.jpg',
  },
]

const HERO_CHIPS = [
  { k: 'Experience', v: '20+ Years' },
  { k: 'Centres', v: '8 Pan-India' },
  { k: 'Procedures', v: '18,500+' },
]

const MARQUEE_LINES = [
  'Measure what others guess.',
  'Change what others manage.',
  'Medicine, not marketing.',
  'Real outcomes. Real data.',
  'Twenty years of preventive medicine.',
  'Eight centres pan-India.',
]

const STATS = [
  { val: 20, suffix: '+', label: 'Years in Preventive Medicine' },
  { val: 18500, suffix: '+', label: 'Successful Procedures' },
  { val: 5, suffix: '', label: 'Centres Pan-India' },
  { val: 4, suffix: '', label: 'Specialities, One Team' },
]

export function AboutPage() {
  useDocumentMeta(ABOUT_META)
  const heroRef = useRef<HTMLHeadingElement>(null)
  const heroChipsRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLHeadingElement>(null)
  const teamHeadingRef = useRef<HTMLHeadingElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const foundersRef = useRef<HTMLDivElement>(null)
  // interiorsRef removed — Clinic Interiors section deleted (lived on /centres)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    const cleanups: Array<() => void> = []

    // Heading masked-line reveals
    const reveal = (el: HTMLElement | null) => {
      if (!el) return
      const lines = el.querySelectorAll<HTMLElement>('.line-mask > span')
      if (!lines.length) return
      gsap.set(lines, { yPercent: 110 })
      const t = gsap.to(lines, {
        yPercent: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 85%' },
      })
      cleanups.push(() => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }
    reveal(heroRef.current)
    reveal(missionRef.current)
    reveal(teamHeadingRef.current)

    // Hero spec chips — entrance + perpetual subtle Y bob
    const chips = heroChipsRef.current?.querySelectorAll<HTMLElement>('.spec-chip')
    if (chips?.length) {
      gsap.set(chips, { y: 24, opacity: 0 })
      const t = gsap.to(chips, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'expo.out',
        stagger: 0.12,
        delay: 0.6,
      })
      cleanups.push(() => t.kill())
      chips.forEach((chip, i) => {
        const bob = gsap.to(chip, {
          y: '-=6',
          duration: 2.6 + i * 0.3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 1.4 + i * 0.2,
        })
        cleanups.push(() => bob.kill())
      })
    }

    // Specialist team cards — staggered fade-up
    const teamCards = teamRef.current?.querySelectorAll<HTMLElement>('.team-card')
    if (teamCards?.length) {
      gsap.set(teamCards, { y: 50, opacity: 0 })
      const t = gsap.to(teamCards, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: teamRef.current, start: 'top 82%' },
      })
      cleanups.push(() => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }

    // Founder cards stagger
    const cards = foundersRef.current?.querySelectorAll<HTMLElement>('.founder-card')
    if (cards?.length) {
      gsap.set(cards, { y: 60, opacity: 0, scale: 0.97 })
      const t = gsap.to(cards, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.15,
        scrollTrigger: { trigger: foundersRef.current, start: 'top 80%' },
      })
      cleanups.push(() => {
        t.scrollTrigger?.kill()
        t.kill()
      })

      // 3D tilt-on-hover for founder cards
      cards.forEach((card) => {
        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect()
          const x = (e.clientX - rect.left) / rect.width - 0.5
          const y = (e.clientY - rect.top) / rect.height - 0.5
          gsap.to(card, {
            rotateY: x * 6,
            rotateX: -y * 6,
            duration: 0.6,
            ease: 'power3.out',
            transformPerspective: 1000,
            transformOrigin: 'center',
          })
        }
        const onLeave = () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.9,
            ease: 'expo.out',
          })
        }
        card.addEventListener('mousemove', onMove)
        card.addEventListener('mouseleave', onLeave)
        cleanups.push(() => {
          card.removeEventListener('mousemove', onMove)
          card.removeEventListener('mouseleave', onLeave)
        })
      })
    }

    // Clinic interiors parallax — section removed; ref kept harmless

    // Stats — count-up + cell fade-up
    const cells = statsRef.current?.querySelectorAll<HTMLElement>('.stat-cell')
    if (cells?.length) {
      gsap.set(cells, { y: 40, opacity: 0 })
      const t = gsap.to(cells, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
      })
      cleanups.push(() => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }
    const nums = statsRef.current?.querySelectorAll<HTMLElement>('.stat-num')
    nums?.forEach((n) => {
      const target = Number(n.dataset.target || 0)
      const suffix = n.dataset.suffix || ''
      const obj = { v: 0 }
      const t = gsap.to(obj, {
        v: target,
        duration: 1.8,
        ease: 'expo.out',
        scrollTrigger: { trigger: n, start: 'top 85%' },
        onUpdate: () => {
          const rounded = Math.round(obj.v)
          n.textContent = rounded.toLocaleString('en-IN') + suffix
        },
      })
      cleanups.push(() => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <div id="about">
      {/* HERO — page header with cinematic lab video background */}
      <section className="relative bg-ink text-white pt-28 md:pt-32 pb-12 md:pb-16 px-6 md:px-12 overflow-hidden min-h-[100vh] flex items-center">
        {/* Background video — full bleed cinematic lab/science footage */}
        <video
          className="absolute inset-0 w-full h-full object-cover hero-video"
          src="/videos/about-candidates/lab-pipette.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />

        {/* Cinematic overlays */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,8,7,0.65) 0%, rgba(10,8,7,0.35) 30%, rgba(10,8,7,0.55) 75%, rgba(10,8,7,0.85) 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(10,8,7,0.75) 0%, rgba(10,8,7,0.45) 45%, rgba(10,8,7,0.0) 70%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 600px at 80% 20%, rgba(178,122,123,0.20), transparent 60%), radial-gradient(700px 500px at 0% 80%, rgba(148,84,85,0.12), transparent 60%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay hero-grain"
        />

        <div className="relative max-w-[1280px] mx-auto w-full">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-px bg-rust-soft" />
            <span className="text-[11px] tracking-[0.32em] text-rust-soft font-semibold uppercase">
              About TAC
            </span>
          </div>
          <h1
            ref={heroRef}
            className="font-display font-bold text-[38px] md:text-[64px] xl:text-[84px] leading-[0.98] tracking-[-0.04em] text-white max-w-[1080px]"
          >
            <span className="line-mask">
              <span>Leaders in preventive</span>
            </span>
            <br />
            <span className="line-mask">
              <span>and anti-aging medicine.</span>
            </span>
          </h1>

          <p className="mt-6 text-[15px] md:text-[17px] leading-[1.65] text-white/75 max-w-[640px] font-light">
            Where serenity, aesthetics and sophistication meet — TAC is built
            around personalised care for longevity, metabolic health, gut
            balance, weight loss and elegant anti-aging treatments. Led by a
            team with over twenty years of preventive-medicine experience.
          </p>

          {/* Slim spec pills — inline horizontal row matching Centres + Home heroes */}
          <div ref={heroChipsRef} className="mt-7 flex flex-wrap items-center gap-2.5 md:gap-3">
            {HERO_CHIPS.map((c) => (
              <div
                key={c.k}
                className="spec-chip inline-flex items-center gap-2.5 md:gap-3 backdrop-blur-md bg-white/[0.06] hover:bg-white/[0.10] transition-colors duration-500 border border-white/15 rounded-full pl-3.5 pr-4 md:pl-4 md:pr-5 py-2 md:py-2.5 shadow-[0_18px_40px_-25px_rgba(0,0,0,0.6)]"
                style={{ willChange: 'transform' }}
              >
                <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-rust-soft shrink-0" />
                <span className="text-[9.5px] tracking-[0.32em] uppercase text-white/60 font-semibold whitespace-nowrap">
                  {c.k}
                </span>
                <span className="text-[12.5px] md:text-[13px] tracking-[-0.005em] text-white font-semibold tabular-nums whitespace-nowrap">
                  {c.v}
                </span>
              </div>
            ))}
          </div>

          {/* Inline contact strip */}
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-[12.5px] text-white/70">
            <a
              href="mailto:info@theantiagingcentre.com"
              className="inline-flex items-center gap-2.5 hover:text-white transition-colors"
            >
              <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-rust-soft">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              info@theantiagingcentre.com
            </a>
            <a
              href="tel:+918826809123"
              className="inline-flex items-center gap-2.5 hover:text-white transition-colors"
            >
              <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-rust-soft">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              +91 88268 09123
            </a>
            <span className="inline-flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-rust-soft">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              Delhi · Gurgaon · Mumbai · Pune · Nagpur · Goa · Hyderabad · Bangalore
            </span>
          </div>
        </div>

        {/* Scroll-down indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 text-white/55">
          <span className="text-[9.5px] tracking-[0.32em] uppercase font-semibold">Scroll</span>
          <span className="relative w-px h-10 bg-white/20 overflow-hidden">
            <span
              className="absolute left-0 top-0 w-full h-1/3 bg-rust-soft"
              style={{ animation: 'scrollDot 2.6s cubic-bezier(0.65,0,0.35,1) infinite' }}
            />
          </span>
        </div>
      </section>

      {/* MARQUEE — slim editorial brand-line ribbon.
          Compact, low-key: small uppercase eyebrow type, rust dot
          separators, soft cream BG with hairline border. */}
      <section
        aria-hidden
        className="relative bg-cream/70 border-y border-mist/60 py-3 md:py-4 overflow-hidden marquee"
      >
        <div className="marquee-track items-center text-graphite">
          {[...MARQUEE_LINES, ...MARQUEE_LINES].map((line, i) => (
            <span key={i} className="flex items-center gap-7 md:gap-10 shrink-0">
              <span className="text-[10.5px] md:text-[11.5px] tracking-[0.32em] uppercase font-semibold whitespace-nowrap">
                {line}
              </span>
              <span className="w-1 h-1 rounded-full bg-rust shrink-0" />
            </span>
          ))}
        </div>
      </section>

      {/* OUR VISION — sanctuary where science meets serenity (brochure verbatim) */}
      <section className="bg-white py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 items-start">
            <div>
              <div className="text-[11px] tracking-[0.42em] text-rust font-semibold uppercase mb-5">
                Our Vision
              </div>
              <h2 className="font-display font-light text-[30px] md:text-[44px] xl:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
                <span className="line-mask">
                  <span>A sanctuary where</span>
                </span>
                <br />
                <span className="line-mask">
                  <span className="font-bold text-rust">science meets serenity.</span>
                </span>
              </h2>
            </div>
            <div className="space-y-5 text-[15px] md:text-[16.5px] leading-[1.7] text-graphite font-light">
              <p>
                TLC is India's premier longevity and metabolic medicine clinic
                — a precision-medicine centre where every protocol begins with
                diagnostics and every program is built around one patient: you.
              </p>
              <p>
                Our physicians bring together expertise in endocrinology,
                metabolic medicine, gut health, regenerative science, and
                anti-aging — each with more than twenty years of clinical
                experience.
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 pt-3 mt-3 border-t border-mist/70">
                {[
                  { k: '20+', v: 'Years experience' },
                  { k: '1000+', v: 'Biomarkers tracked' },
                  { k: '6', v: 'Programmes' },
                  { k: '8', v: 'Centres pan-India' },
                ].map((s) => (
                  <li key={s.v} className="flex items-baseline gap-3">
                    <span className="font-display font-bold text-[20px] md:text-[24px] text-rust tabular-nums tracking-tight">
                      {s.k}
                    </span>
                    <span className="text-[12.5px] tracking-[0.18em] uppercase text-graphite font-semibold">
                      {s.v}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION — Blue Zones / live well to one hundred (brochure verbatim) */}
      <section className="bg-cream/40 py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 items-start">
            <div>
              <div className="text-[11px] tracking-[0.42em] text-rust font-semibold uppercase mb-5">
                Our Mission
              </div>
              <h2
                ref={missionRef}
                className="font-display font-light text-[30px] md:text-[44px] xl:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink"
              >
                <span className="line-mask">
                  <span>To help you live well</span>
                </span>
                <br />
                <span className="line-mask">
                  <span className="font-bold text-rust">all the way to one hundred.</span>
                </span>
              </h2>
            </div>
            <div className="space-y-5 text-[15px] md:text-[16.5px] leading-[1.7] text-graphite font-light">
              <p>
                There are places in the world where living to one hundred is
                not exceptional. It is ordinary. The Blue Zones — Sardinia,
                Okinawa, Ikaria, Loma Linda, Nicoya — are home to the highest
                concentrations of centenarians on earth.
              </p>
              <p>
                They do not reach one hundred through luck. They reach it
                through a way of living that keeps their biology young.
              </p>
              <p className="text-ink font-medium">
                At TLC, our mission is to bring that possibility to you — not
                through chance, but through science. We combine the most
                advanced tools of longevity medicine with deeply personalised
                clinical care to help our patients achieve what the Blue Zones
                demonstrate is possible: a long life, fully lived.
              </p>
              <p className="font-display italic text-rust text-[18px] md:text-[22px] leading-[1.4] pt-3">
                Not just more years. A well-lived hundred.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR PHILOSOPHY — treat the biology, not the symptom (brochure verbatim) */}
      <section className="bg-white py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center max-w-[760px] mx-auto mb-14 md:mb-16">
            <div className="text-[11px] tracking-[0.42em] text-rust font-semibold uppercase mb-5">
              Our Philosophy
            </div>
            <h2 className="font-display font-light text-[30px] md:text-[44px] xl:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink mb-7">
              <span className="line-mask">
                <span>Treat the biology.</span>
              </span>
              <br />
              <span className="line-mask">
                <span className="font-bold text-rust">Not the symptom.</span>
              </span>
            </h2>
            <p className="text-[14.5px] md:text-[16px] leading-[1.7] text-graphite font-light">
              The most powerful moment in medicine is not when disease is
              diagnosed — it is the years before, when the biology that will
              eventually produce that disease can still be read, understood,
              and changed. Every TLC programme is built on three principles.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10 rounded-[20px] overflow-hidden">
            {[
              {
                n: '01',
                title: 'Measure first',
                body: 'Nothing is assumed. Everything is tested. We read your biology at the genetic, epigenetic, cellular, gut, and metabolic level before a single recommendation is made.',
              },
              {
                n: '02',
                title: 'Personalise completely',
                body: "Your biology is unlike anyone else's. Your programme — your diagnostics, your protocol, your nutrition, your tracking — is designed entirely around you.",
              },
              {
                n: '03',
                title: 'Optimise continuously',
                body: 'Longevity is not a destination. It is a practice. Your programme evolves as your data does — refined at every visit, tracked every day.',
              },
            ].map((p) => (
              <article key={p.n} className="bg-white p-7 md:p-8 flex flex-col">
                <div className="font-display text-[22px] md:text-[26px] text-rust font-bold tabular-nums tracking-tight mb-4">
                  {p.n}
                </div>
                <span aria-hidden className="block h-px w-8 bg-rust mb-5" />
                <h3 className="font-display font-bold text-[20px] md:text-[22px] tracking-[-0.015em] text-ink mb-4">
                  {p.title}
                </h3>
                <p className="text-[13.5px] md:text-[14.5px] leading-[1.65] text-graphite font-light">
                  {p.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 max-w-[760px] mx-auto text-center">
            <p className="font-display italic text-[18px] md:text-[22px] leading-[1.45] text-ink">
              This is not conventional medicine. It is medicine as it should
              always have been —{' '}
              <span className="text-rust font-bold not-italic">
                proactive, precise, and built around the person in front of us.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* FOUNDER'S NOTE — pull-quote on dark band */}
      <section className="relative bg-ink text-white py-16 md:py-24 px-6 md:px-12 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              'radial-gradient(900px 600px at 20% 0%, rgba(148,84,85,0.20), transparent 60%), radial-gradient(800px 500px at 90% 100%, rgba(178,122,123,0.14), transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-[920px] mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <div className="text-[11px] tracking-[0.42em] text-rust-soft font-semibold uppercase mb-5">
              A Word From Our Founders
            </div>
            <h2 className="font-display font-light text-[30px] md:text-[48px] xl:text-[56px] leading-[1.1] tracking-[-0.025em] text-white">
              <span className="line-mask">
                <span>The best years of your life</span>
              </span>
              <br />
              <span className="line-mask">
                <span className="font-bold text-rust-soft">should still be ahead of you.</span>
              </span>
            </h2>
          </div>
          <div className="space-y-5 text-[14.5px] md:text-[16.5px] leading-[1.75] text-white/80 font-light max-w-[720px] mx-auto">
            <p>
              We founded TLC with one conviction: that modern medicine arrives
              too late. We wait for disease to declare itself — and then we
              treat it. But the biology of illness begins years, sometimes
              decades, before any symptom appears. By then, precious time has
              already been lost.
            </p>
            <p>
              We wanted to build something different. A place where science
              meets you before disease does. Where your biology is read in
              full — at the genetic, cellular, and microbial level — and where
              the finest tools of longevity medicine are used not to manage
              decline, but to prevent it entirely.
            </p>
            <p className="text-white font-medium">
              At TLC, we do not treat patients. We partner with individuals who
              have decided that aging on their own terms is not a luxury — it
              is a right. That conviction is the foundation of everything we do.
            </p>
          </div>
          <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            <div className="text-center">
              <div className="font-display italic text-[20px] md:text-[24px] text-rust-soft">
                Dr. Abhinav Sharma
              </div>
              <div className="text-[10.5px] tracking-[0.32em] uppercase text-white/55 font-semibold mt-1">
                Co-Founder
              </div>
            </div>
            <span aria-hidden className="hidden md:inline-block w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="font-display italic text-[20px] md:text-[24px] text-rust-soft">
                Dr. Bhavna Sharma
              </div>
              <div className="text-[10.5px] tracking-[0.32em] uppercase text-white/55 font-semibold mt-1">
                Co-Founder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="bg-white py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-[1280px] mx-auto">
          {/* Magazine-style pull quote header */}
          <div className="mb-14 md:mb-20 grid md:grid-cols-[auto_1fr] gap-8 md:gap-14 items-end max-w-[1080px]">
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-7 h-px bg-rust" />
                <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                  Meet the Founders
                </span>
              </div>
              <h2 className="font-display font-bold text-[32px] md:text-[48px] leading-[1.0] tracking-[-0.03em] text-ink max-w-[420px]">
                The doctors behind the science.
              </h2>
            </div>
            <p className="text-[15px] md:text-[17px] leading-[1.7] text-graphite/80 font-light md:max-w-[460px] md:pb-2">
              Two decades of clinical practice. Eighteen-thousand procedures
              between them. One conviction — that ageing should be measured,
              not managed.
            </p>
          </div>

          {/* Founder cards — refined profile-card layout. Smaller round
              portrait avoids any pixel-fattening from the brochure source,
              gives both founders a consistent premium look regardless of
              their source image resolution. */}
          <div ref={foundersRef} className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-[1180px] mx-auto" style={{ perspective: '1200px' }}>
            {FOUNDERS.map((f) => (
              <article
                key={f.name}
                className="founder-card group relative bg-white hover:bg-cream rounded-[24px] overflow-hidden border border-mist/70 transition-colors duration-500 p-7 md:p-9 flex flex-col"
                style={{ willChange: 'transform, opacity', transformStyle: 'preserve-3d' }}
              >
                {/* Portrait + stat badge row */}
                <div className="flex items-start gap-5 mb-6">
                  <div className="relative shrink-0 w-[120px] md:w-[140px] aspect-square rounded-full overflow-hidden bg-mist border-4 border-white shadow-[0_18px_40px_-20px_rgba(27,26,24,0.30)] group-hover:shadow-[0_22px_50px_-15px_rgba(148,84,85,0.40)] transition-shadow duration-500">
                    <img
                      src={f.img}
                      alt={f.name}
                      loading="lazy"
                      width={280}
                      height={280}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      style={{ objectPosition: 'center' }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full ring-1 ring-inset ring-rust/0 group-hover:ring-rust/30 transition-all duration-500"
                    />
                  </div>

                  {/* Stat block beside portrait */}
                  <div className="flex-1 min-w-0 pt-2">
                    <div className="text-[10px] tracking-[0.32em] uppercase text-stone font-semibold mb-1">
                      Track Record
                    </div>
                    <div className="font-display font-bold text-[26px] md:text-[32px] text-rust tabular-nums tracking-tight leading-none mb-1.5">
                      {f.stat}
                    </div>
                    <div className="text-[10.5px] tracking-[0.22em] uppercase text-graphite font-medium">
                      {f.statLabel}
                    </div>
                  </div>
                </div>

                {/* Hairline divider */}
                <span aria-hidden className="block h-px w-full bg-mist mb-6" />

                {/* Role · name · creds · bio */}
                <div className="text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold mb-3">
                  {f.role}
                </div>
                <h3 className="font-display font-bold text-[24px] md:text-[28px] lg:text-[32px] leading-[1.05] tracking-[-0.02em] text-ink mb-2">
                  {f.name}
                </h3>
                <div className="text-[11px] tracking-[0.22em] uppercase text-stone font-medium mb-5">
                  {f.creds}
                </div>
                <p className="text-[14px] md:text-[14.5px] leading-[1.7] text-graphite font-light">
                  {f.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EUROPEAN PARTNERSHIP — Netherlands laboratory (brochure verbatim) */}
      <section className="relative bg-white py-14 md:py-20 px-6 md:px-12 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-70"
          style={{
            background:
              'radial-gradient(900px 500px at 18% 20%, rgba(238,230,219,0.55), transparent 60%), radial-gradient(700px 400px at 90% 90%, rgba(148,84,85,0.05), transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-[1180px] mx-auto">
          <div className="grid md:grid-cols-[1.15fr_1fr] gap-10 md:gap-16 items-end mb-12 md:mb-14">
            <div>
              <div className="text-[11px] tracking-[0.42em] text-rust font-semibold uppercase mb-5">
                — Our European Partnership · The Netherlands Laboratory —
              </div>
              <h2 className="font-display font-light text-[30px] md:text-[44px] xl:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
                <span className="line-mask">
                  <span>Gold-standard testing,</span>
                </span>
                <br />
                <span className="line-mask">
                  <span className="font-bold text-rust">delivered from the world's finest labs.</span>
                </span>
              </h2>
            </div>
            <p className="text-[14.5px] md:text-[16px] leading-[1.7] text-graphite font-light max-w-[440px] md:pb-2">
              For our most advanced diagnostics, TLC partners exclusively with
              a specialist laboratory in the Netherlands — one of Europe's
              foremost centres for genomic and epigenomic science.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10 rounded-[20px] overflow-hidden">
            {[
              {
                tag: '323 Genes & SNPs',
                title: 'Complete Genetic Blueprint',
                body: 'Genetic profile across metabolism, longevity, hormonal health and cardiovascular risk. Not a partial panel — the full picture. Most clinics test fewer than 99 genes; we test 323.',
              },
              {
                tag: 'Epigenetic Age',
                title: 'GrimAge + PhenoAge',
                body: 'The two most scientifically validated epigenetic clocks in clinical medicine — analysing DNA methylation across 9 million base pairs. The most accurate measure of biological age available anywhere.',
              },
              {
                tag: 'Whole-Genome Microbiome',
                title: 'Every Microbial Species, Sequenced',
                body: 'Complete sequencing of every microbial species in your gut — the gold standard, as opposed to the partial 16S rRNA sequencing used by most clinics globally.',
              },
            ].map((p, i) => (
              <article key={p.title} className="bg-white p-7 md:p-8 flex flex-col">
                <div className="font-display text-[14px] text-rust font-semibold tabular-nums tracking-tight mb-3">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold mb-2">
                  {p.tag}
                </div>
                <h3 className="font-display font-bold text-[19px] md:text-[22px] leading-[1.2] tracking-[-0.015em] text-ink mb-4">
                  {p.title}
                </h3>
                <span aria-hidden className="block h-px w-8 bg-rust mb-4" />
                <p className="text-[13.5px] md:text-[14.5px] leading-[1.65] text-graphite font-light">
                  {p.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 md:mt-14 max-w-[820px] mx-auto text-center">
            <p className="font-display italic text-[18px] md:text-[22px] leading-[1.5] text-ink">
              Most longevity clinics in India work with domestic labs offering
              limited genomic capability. At TLC, our European partnership
              ensures the science underpinning your programme is held to the{' '}
              <span className="text-rust font-bold not-italic">highest global standard</span>{' '}
              — because when it comes to your biology, there is no acceptable
              margin for a partial picture.
            </p>
          </div>
        </div>
      </section>

      {/* SPECIALIST TEAM — beyond the founders. Sourced verbatim from theantiagingcentre.com */}
      <section className="bg-cream/40 py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-14 md:mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                Our Team
              </span>
              <span className="w-7 h-px bg-rust" />
            </div>
            <h2
              ref={teamHeadingRef}
              className="font-display font-light text-[30px] md:text-[44px] xl:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink max-w-[820px] mx-auto"
            >
              <span className="line-mask">
                <span>Doctors dedicated</span>
              </span>{' '}
              <span className="line-mask">
                <span className="font-bold text-rust">to your longevity.</span>
              </span>
            </h2>
            <p className="mt-7 text-[14.5px] md:text-[16px] leading-[1.7] text-graphite font-light max-w-[640px] mx-auto">
              A multidisciplinary panel of longevity physicians,
              endocrinologists, metabolic specialists and consultants. Every
              patient is cared for by a team — not a single doctor — that
              holds your complete biological picture.
            </p>
          </div>

          <div ref={teamRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
            {SPECIALISTS.map((s) => (
              <article
                key={s.name}
                className="team-card group flex flex-col items-center text-center"
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Round portrait */}
                <div className="relative w-full aspect-square rounded-full overflow-hidden bg-mist border-4 border-white shadow-[0_18px_40px_-20px_rgba(27,26,24,0.25)] mb-4 group-hover:shadow-[0_22px_50px_-15px_rgba(148,84,85,0.35)] transition-shadow duration-500">
                  {s.photo ? (
                    <img
                      src={s.photo}
                      alt={s.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      style={{ objectPosition: 'center' }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-cream">
                      <span className="font-display font-bold text-[28px] text-rust/40 tracking-tight">
                        {s.name.split(' ').slice(-1)[0][0]}
                      </span>
                    </div>
                  )}
                  {/* subtle inner ring on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full ring-1 ring-inset ring-rust/0 group-hover:ring-rust/30 transition-all duration-500"
                  />
                </div>

                {/* Name */}
                <h3 className="font-display font-bold text-[14.5px] md:text-[16px] leading-[1.2] tracking-[-0.015em] text-ink group-hover:text-rust transition-colors duration-500 mb-1">
                  {s.name}
                </h3>
                {/* Credentials */}
                <div className="text-[10px] tracking-[0.22em] uppercase text-rust font-semibold mb-1.5">
                  {s.creds}
                </div>
                {/* Role */}
                <div className="text-[11.5px] leading-[1.45] text-graphite font-light px-1">
                  {s.role}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CLINIC INTERIORS section removed — Centres detail now lives on
          /centres + the Clinics band on the homepage. Avoiding duplication
          on the About page keeps the narrative focused on team + philosophy. */}

      {/* STATS strip */}
      <section className="bg-cream/40 py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-14 md:mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                By the Numbers
              </span>
              <span className="w-7 h-px bg-rust" />
            </div>
            <h2 className="font-display font-bold text-[32px] md:text-[48px] leading-[1.0] tracking-[-0.03em] text-ink max-w-[760px] mx-auto">
              Two decades of measured care.
            </h2>
          </div>
        </div>
        <div
          ref={statsRef}
          className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="stat-cell group relative bg-white rounded-2xl border border-mist/70 px-5 py-8 md:px-7 md:py-12 overflow-hidden hover:border-rust/30 transition-colors duration-500"
            >
              <div className="absolute top-3 right-4 text-[10px] tracking-[0.28em] uppercase text-stone/55 tabular-nums font-medium">
                0{i + 1}
              </div>
              <div
                className="stat-num font-display font-bold text-[42px] md:text-[60px] lg:text-[68px] text-ink leading-none mb-3 tabular-nums tracking-[-0.025em]"
                data-target={s.val}
                data-suffix={s.suffix}
              >
                0{s.suffix}
              </div>
              <span
                aria-hidden
                className="block h-px w-9 bg-rust mb-3 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              />
              <div className="text-[11.5px] md:text-[12.5px] text-graphite leading-snug font-light">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA — matches site's signature CtaBand pattern (dark ink + ambient rust glow + grain) */}
      <section className="relative bg-ink py-24 md:py-36 px-6 md:px-12 overflow-hidden">
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
              Begin Your Journey
            </span>
            <span className="w-7 h-px bg-rust-soft" />
          </div>

          {/* Headline */}
          <h2 className="font-display font-bold text-[40px] md:text-[72px] xl:text-[84px] leading-[0.98] tracking-[-0.035em] text-white text-center mb-8 max-w-[980px] mx-auto">
            Speak with our team.
          </h2>

          {/* Sub */}
          <p className="text-[16px] md:text-[19px] text-white/70 max-w-[600px] mx-auto leading-[1.7] mb-14 text-center font-light">
            A 30-minute conversation with our specialists. No commitment. Just
            clarity on which programme suits your goals.
          </p>

          {/* CTA — three contact paths in pill form */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <a
              href="/#cta"
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
              href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0"
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
          <div className="grid grid-cols-3 gap-px bg-white/10 max-w-[920px] mx-auto rounded-2xl overflow-hidden border border-white/10">
            {[
              { k: '30 min', l: 'Specialist conversation' },
              { k: 'No fee', l: 'No commitment, no charge' },
              { k: '5 clinics', l: 'Across India' },
            ].map((s) => (
              <div key={s.l} className="bg-ink px-4 md:px-6 py-7 text-center">
                <div className="font-display font-bold text-[20px] md:text-[28px] lg:text-[32px] text-white leading-none mb-2 tabular-nums tracking-[-0.01em]">
                  {s.k}
                </div>
                <div className="text-[9.5px] md:text-[10.5px] tracking-[0.25em] uppercase text-white/55 font-medium">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
