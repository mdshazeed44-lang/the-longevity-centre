// AboutPage — content sourced verbatim from theantiagingcentre.com/about
// Sections: Hero · Mission · Founders · Trust strip · Final CTA
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

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

const STATS = [
  { val: '20+', label: 'Years in Preventive Medicine' },
  { val: '18,500+', label: 'Successful Procedures' },
  { val: '5', label: 'Centres Pan-India' },
  { val: '4', label: 'Specialities, One Team' },
]

export function AboutPage() {
  const heroRef = useRef<HTMLHeadingElement>(null)
  const missionRef = useRef<HTMLHeadingElement>(null)
  const foundersRef = useRef<HTMLDivElement>(null)
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
    }

    // Stats fade-up
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

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <div id="about">
      {/* HERO — page header with cinematic lab video background */}
      <section className="relative bg-ink text-white pt-32 md:pt-40 pb-20 md:pb-28 px-6 md:px-12 overflow-hidden min-h-[88vh] flex items-center">
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

        {/* Cinematic overlays — dark gradient + warm glow + grain */}
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

        <div className="relative max-w-[1280px] mx-auto">
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
          <div className="text-center mb-14 md:mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                Meet the Founders
              </span>
              <span className="w-7 h-px bg-rust" />
            </div>
            <h2 className="font-display font-bold text-[32px] md:text-[48px] leading-[1.0] tracking-[-0.03em] text-ink max-w-[760px] mx-auto">
              The doctors behind the science.
            </h2>
          </div>

          <div ref={foundersRef} className="grid md:grid-cols-2 gap-6 md:gap-8">
            {FOUNDERS.map((f) => (
              <article
                key={f.name}
                className="founder-card group bg-cream/40 hover:bg-cream rounded-[24px] overflow-hidden border border-mist/70 transition-colors duration-500"
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Portrait — aspect-square fits the source headshots from TAC */}
                <div className="relative aspect-square overflow-hidden bg-mist">
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
                        'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)',
                    }}
                  />
                  {/* Stat badge */}
                  <div className="absolute top-4 left-4 backdrop-blur-md bg-white/15 border border-white/25 rounded-full px-3.5 py-2">
                    <div className="font-display font-bold text-[15px] text-white tabular-nums tracking-tight leading-none">
                      {f.stat}
                    </div>
                    <div className="text-[8.5px] tracking-[0.22em] uppercase text-white/85 font-medium mt-0.5">
                      {f.statLabel}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 md:p-9">
                  <div className="text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold mb-3">
                    {f.role}
                  </div>
                  <h3 className="font-display font-bold text-[26px] md:text-[32px] leading-[1.0] tracking-[-0.025em] text-ink mb-2">
                    {f.name}
                  </h3>
                  <div className="text-[12px] tracking-[0.22em] uppercase text-stone font-medium mb-5">
                    {f.creds}
                  </div>
                  <p className="text-[14.5px] md:text-[15px] leading-[1.65] text-graphite font-light">
                    {f.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STATS strip */}
      <section className="bg-cream/40 py-16 md:py-20 px-6 md:px-12">
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
              <div className="font-display font-bold text-[42px] md:text-[60px] lg:text-[68px] text-ink leading-none mb-3 tabular-nums tracking-[-0.025em]">
                {s.val}
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

      {/* FINAL CTA */}
      <section className="relative bg-ink py-24 md:py-32 px-6 md:px-12 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 600px at 50% 50%, rgba(148,84,85,0.20), transparent 60%)',
          }}
        />
        <div className="relative max-w-[900px] mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-7">
            <span className="w-7 h-px bg-rust-soft" />
            <span className="text-[11px] tracking-[0.32em] text-rust-soft font-semibold uppercase">
              Begin Your Journey
            </span>
            <span className="w-7 h-px bg-rust-soft" />
          </div>
          <h2 className="font-display font-bold text-[36px] md:text-[64px] leading-[1.0] tracking-[-0.03em] text-white mb-8">
            Speak with our team.
          </h2>
          <p className="text-[15px] md:text-[17px] text-white/65 leading-[1.7] max-w-[560px] mx-auto mb-12 font-light">
            A 30-minute conversation with our specialists. No commitment. Just
            clarity on which programme suits your goals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/#cta"
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
              className="inline-flex items-center gap-2 px-7 py-5 border border-white/20 text-white text-[12px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-white/10 transition-colors duration-500"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
