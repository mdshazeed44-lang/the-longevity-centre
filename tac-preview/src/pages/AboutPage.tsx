// AboutPage — content sourced verbatim from theantiagingcentre.com/about
// Sections: Hero · Marquee · Mission · Founders · Specialist Team · Clinics band · Stats · Final CTA
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'
import { useDocumentMeta } from '../lib/seo'

gsap.registerPlugin(ScrollTrigger)

const ABOUT_META = {
  title: 'About TAC — Leaders in Preventive & Anti-Aging Medicine, India',
  description:
    'Meet the founders of The Anti-Aging Centre — Dr. Abhinav Sharma (MBBS, MS, 11,000+ surgeries) and Dr. Bhavna Sharma (IVF specialist, 7,500+ procedures). Twenty-plus years of preventive medicine experience. Five centres pan-India.',
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

// Specialist team — sourced verbatim from theantiagingcentre.com
// Verified as the 4 specialities TAC explicitly lists beyond the founders.
const SPECIALITIES = [
  {
    n: '01',
    title: 'Dermatologists',
    tag: 'Skin & Aesthetics',
    body: 'Elegant anti-aging aesthetics — clinical-grade dermatology under the longevity programme.',
  },
  {
    n: '02',
    title: 'Nutritionists',
    tag: 'Diet & Microbiome',
    body: 'Personalised nutrition aligned with biomarkers, body composition and gut health.',
  },
  {
    n: '03',
    title: 'Anti-Aging Specialists',
    tag: 'Preventive Medicine',
    body: 'Twenty-plus years of preventive-medicine experience — longevity protocols and biomarker tracking.',
  },
  {
    n: '04',
    title: 'Metabolic Specialists',
    tag: 'Diabetes · Thyroid · Gut',
    body: 'Diabetes, prediabetes, PCOD, thyroid, fatty liver — the metabolic side of healthspan.',
  },
]

const HERO_CHIPS = [
  { k: 'Experience', v: '20+ Years' },
  { k: 'Centres', v: '5 Pan-India' },
  { k: 'Procedures', v: '18,500+' },
]

const MARQUEE_LINES = [
  'Measure what others guess.',
  'Change what others manage.',
  'Medicine, not marketing.',
  'Real outcomes. Real data.',
  'Twenty years of preventive medicine.',
  'Five centres pan-India.',
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
  const interiorsRef = useRef<HTMLDivElement>(null)
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

    // Clinic interiors band — parallax shift
    const interiorImgs = interiorsRef.current?.querySelectorAll<HTMLElement>('.interior-img')
    interiorImgs?.forEach((img, i) => {
      const t = gsap.fromTo(
        img,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: interiorsRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      )
      cleanups.push(() => {
        t.scrollTrigger?.kill()
        t.kill()
      })
      // also offset second image's stagger entrance
      void i
    })

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
      <section className="relative bg-ink text-white pt-32 md:pt-40 pb-20 md:pb-28 px-6 md:px-12 overflow-hidden min-h-[92vh] flex items-center">
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
          <div className="flex items-center gap-3 mb-7">
            <span className="w-7 h-px bg-rust-soft" />
            <span className="text-[11px] tracking-[0.32em] text-rust-soft font-semibold uppercase">
              About TAC
            </span>
          </div>
          <h1
            ref={heroRef}
            className="font-display font-bold text-[44px] md:text-[80px] xl:text-[100px] leading-[0.98] tracking-[-0.04em] text-white max-w-[1080px]"
          >
            <span className="line-mask">
              <span>Leaders in preventive</span>
            </span>
            <br />
            <span className="line-mask">
              <span>and anti-aging medicine.</span>
            </span>
          </h1>

          <p className="mt-10 text-[16px] md:text-[19px] leading-[1.7] text-white/70 max-w-[640px] font-light">
            Where serenity, aesthetics and sophistication meet — TAC is built
            around personalised care for longevity, metabolic health, gut
            balance, weight loss and elegant anti-aging treatments. Led by a
            team with over twenty years of preventive-medicine experience.
          </p>

          {/* Inline contact strip */}
          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 text-[12.5px] text-white/65">
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
              Gurugram · Delhi · Pune · Bangalore
            </span>
          </div>
        </div>

        {/* Floating spec chips — top-right cluster */}
        <div
          ref={heroChipsRef}
          aria-hidden
          className="hidden lg:flex absolute top-32 right-12 xl:right-20 flex-col gap-3 z-10"
        >
          {HERO_CHIPS.map((c) => (
            <div
              key={c.k}
              className="spec-chip backdrop-blur-md bg-white/[0.06] border border-white/15 rounded-full pl-4 pr-5 py-2.5 flex items-center gap-3 shadow-[0_18px_40px_-25px_rgba(0,0,0,0.6)]"
              style={{ willChange: 'transform' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rust-soft" />
              <span className="text-[9.5px] tracking-[0.32em] uppercase text-white/55 font-semibold">
                {c.k}
              </span>
              <span className="text-[12.5px] tracking-[-0.01em] text-white font-semibold tabular-nums">
                {c.v}
              </span>
            </div>
          ))}
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

      {/* MARQUEE — editorial brand-line ribbon */}
      <section
        aria-hidden
        className="relative bg-cream border-y border-mist/60 py-7 md:py-9 overflow-hidden marquee"
      >
        <div className="marquee-track items-center text-ink">
          {[...MARQUEE_LINES, ...MARQUEE_LINES].map((line, i) => (
            <span key={i} className="flex items-center gap-16 shrink-0">
              <span className="font-display text-[24px] md:text-[34px] tracking-[-0.02em] font-semibold whitespace-nowrap">
                {line}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-rust shrink-0" />
            </span>
          ))}
        </div>
      </section>

      {/* MISSION — editorial intro */}
      <section className="bg-cream/40 py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 items-start">
            <div>
              <div className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase mb-5">
                Our Mission
              </div>
              <h2
                ref={missionRef}
                className="font-display font-bold text-[34px] md:text-[52px] leading-[1.0] tracking-[-0.03em] text-ink"
              >
                <span className="line-mask">
                  <span>A medical practice,</span>
                </span>
                <br />
                <span className="line-mask">
                  <span>rooted in nature.</span>
                </span>
              </h2>
            </div>
            <div className="space-y-6 text-[15.5px] md:text-[17px] leading-[1.7] text-graphite font-light">
              <p>
                We measure what others guess — and we change what others manage.
                TAC was built on the conviction that ageing isn't a fate to be
                accepted, but a process that can be measured, slowed and even
                reversed with the right science.
              </p>
              <p>
                Our team integrates twenty-plus years of clinical expertise
                with cutting-edge diagnostics — biomarker panels, genetic
                analysis, gut microbiome sequencing, body composition and
                vascular function — to design programmes uniquely yours. One
                shared medical record. One coordinated team. Every intervention
                backed by data, every outcome verified by repeat tests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-12">
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

          <div ref={foundersRef} className="grid gap-5 md:gap-6 max-w-[1180px] mx-auto" style={{ perspective: '1200px' }}>
            {FOUNDERS.map((f, idx) => {
              const reverse = idx % 2 === 1
              return (
                <article
                  key={f.name}
                  className="founder-card group bg-white hover:bg-cream rounded-[24px] overflow-hidden border border-mist/70 transition-colors duration-500 grid md:grid-cols-[5fr_7fr] items-stretch"
                  style={{ willChange: 'transform, opacity', transformStyle: 'preserve-3d' }}
                >
                  {/* Portrait */}
                  <div
                    className={`relative aspect-[4/5] md:aspect-auto md:min-h-[420px] overflow-hidden bg-mist ${reverse ? 'md:order-2' : ''}`}
                  >
                    <img
                      src={f.img}
                      alt={f.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)',
                      }}
                    />
                    {/* Stat badge */}
                    <div className="absolute top-4 left-4 backdrop-blur-md bg-white/15 border border-white/25 rounded-full px-3.5 py-2 transition-transform duration-700 group-hover:-translate-y-0.5">
                      <div className="font-display font-bold text-[15px] text-white tabular-nums tracking-tight leading-none">
                        {f.stat}
                      </div>
                      <div className="text-[8.5px] tracking-[0.22em] uppercase text-white/85 font-medium mt-0.5">
                        {f.statLabel}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`p-7 md:p-10 lg:p-12 flex flex-col justify-center ${reverse ? 'md:order-1' : ''}`}
                  >
                    <div className="text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold mb-3">
                      {f.role}
                    </div>
                    <h3 className="font-display font-bold text-[28px] md:text-[36px] lg:text-[42px] leading-[1.0] tracking-[-0.025em] text-ink mb-2">
                      {f.name}
                    </h3>
                    <div className="text-[12px] tracking-[0.22em] uppercase text-stone font-medium mb-5">
                      {f.creds}
                    </div>
                    <p className="text-[14.5px] md:text-[15.5px] leading-[1.7] text-graphite font-light max-w-[520px]">
                      {f.bio}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* SPECIALIST TEAM — beyond the founders. Sourced verbatim from theantiagingcentre.com */}
      <section className="bg-cream/40 py-20 md:py-28 px-6 md:px-12">
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
              className="font-display font-bold text-[32px] md:text-[48px] leading-[1.0] tracking-[-0.03em] text-ink max-w-[820px] mx-auto"
            >
              <span className="line-mask">
                <span>Four specialities.</span>
              </span>
              <br />
              <span className="line-mask">
                <span>One coordinated team.</span>
              </span>
            </h2>
            <p className="mt-7 text-[15.5px] md:text-[17px] leading-[1.7] text-graphite/80 font-light max-w-[640px] mx-auto">
              The founders are joined by a wider team of specialists — every
              protocol coordinated under one shared medical record.
            </p>
          </div>

          <div ref={teamRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {SPECIALITIES.map((s) => (
              <article
                key={s.title}
                className="team-card group relative bg-white hover:bg-cream rounded-[20px] border border-mist/70 hover:border-rust/30 p-6 md:p-7 lg:p-8 overflow-hidden transition-colors duration-500"
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Soft ghost numeral */}
                <span
                  aria-hidden
                  className="absolute -right-1 -bottom-3 font-display font-bold text-[110px] md:text-[140px] leading-none text-ink/[0.04] tabular-nums tracking-[-0.04em] pointer-events-none select-none transition-all duration-700 group-hover:text-rust/[0.08]"
                >
                  {s.n}
                </span>
                <div className="relative">
                  <div className="text-[10px] tracking-[0.28em] uppercase text-stone/55 font-medium mb-4 tabular-nums">
                    0{s.n.replace(/^0/, '')}
                  </div>
                  <h3 className="font-display font-bold text-[20px] md:text-[24px] leading-[1.05] tracking-[-0.02em] text-ink mb-2">
                    {s.title}
                  </h3>
                  <div className="text-[10.5px] tracking-[0.28em] uppercase text-rust font-semibold mb-4">
                    {s.tag}
                  </div>
                  <p className="text-[13.5px] leading-[1.65] text-graphite font-light">
                    {s.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CLINIC INTERIORS — parallax duo band with editorial caption */}
      <section ref={interiorsRef} className="relative bg-white py-20 md:py-28 px-6 md:px-12 overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-14 md:mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                Our Clinics
              </span>
              <span className="w-7 h-px bg-rust" />
            </div>
            <h2 className="font-display font-bold text-[32px] md:text-[48px] leading-[1.0] tracking-[-0.03em] text-ink max-w-[760px] mx-auto">
              Premium spaces, pan-India.
            </h2>
          </div>
          <div className="grid md:grid-cols-[1fr_1fr] gap-5 md:gap-6 items-stretch">
            <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-[24px] overflow-hidden bg-mist">
              <img
                src="/tac-photos/clinic-interior-1.jpg"
                alt="TAC clinic interior"
                loading="lazy"
                className="interior-img absolute inset-0 w-full h-[120%] object-cover"
                style={{ willChange: 'transform' }}
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 100%)',
                }}
              />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-[10px] tracking-[0.32em] uppercase text-white/70 font-semibold mb-2">
                  The Space
                </div>
                <div className="font-display font-bold text-[20px] md:text-[26px] leading-[1.1] tracking-[-0.02em]">
                  Clinical precision, hotel-quality calm.
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 md:gap-6">
              <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden bg-mist">
                <img
                  src="/tac-photos/clinic-interior-2.jpg"
                  alt="TAC consultation room"
                  loading="lazy"
                  className="interior-img absolute inset-0 w-full h-[120%] object-cover"
                  style={{ willChange: 'transform' }}
                />
              </div>
              <div className="relative bg-cream rounded-[24px] border border-mist/70 p-7 md:p-9 flex-1 flex flex-col justify-between min-h-[180px]">
                <div className="text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold mb-4">
                  Where We Practise
                </div>
                <div className="font-display font-bold text-[22px] md:text-[26px] leading-[1.15] tracking-[-0.02em] text-ink mb-5">
                  Five centres designed around the patient — not the protocol.
                </div>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[13px] text-graphite font-light">
                  <li>Gurugram</li>
                  <li>Pune Hadapsar</li>
                  <li>Delhi GK-1</li>
                  <li>Bangalore JP Nagar</li>
                  <li>Bangalore Sadashivnagar</li>
                  <li className="text-stone">Online · Pan-India</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS strip */}
      <section className="bg-cream/40 py-20 md:py-28 px-6 md:px-12">
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
          <div className="grid grid-cols-3 gap-px bg-white/10 max-w-[920px] mx-auto rounded-2xl overflow-hidden border border-white/10">
            {[
              { k: '30 min', l: 'Specialist conversation' },
              { k: 'No fee', l: 'No commitment, no charge' },
              { k: '5 clinics', l: 'Or online, pan-India' },
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
