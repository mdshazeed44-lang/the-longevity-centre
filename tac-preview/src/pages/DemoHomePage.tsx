// DemoHomePage — TLC brand exact replica per the official brochure.
// Route: /demo. Original homepage at / is untouched.
//
// Section order mirrors the 20-page brochure (TLC_Brochure_1.pdf):
//   1  Hero (Cover)
//   2  Who We Are
//   3  The Science of Cellular Aging
//   4  Why Longevity Medicine
//   5  A Word From Our Founders
//   6  Our Mission · Our Philosophy
//   7  Our Team — 4-quadrant layout, 9 doctors
//   8  Why Our Diagnostics Are Different — 6 categories (expandable)
//   9  How Old Is Your Biology — 3 clocks
//  10  Our European Partnership (Netherlands lab)
//  11  The TLC App
//  12  Testimonials — 6 cards, colour-coded by programme
//  13  Brand Ambassador — Milind Soman
//  14  Our Programmes — 6 cards
//  15  Final CTA / Contact
//
// Brand palette pulled directly from brochure:
//   - cream / nougat (warm beige)
//   - rust (#945455) — primary accent
//   - green (#323C31) — Tropical Green panels
//   - iguana (#A19B7B) — olive panels
//
// Code follows existing site patterns (Cabinet Grotesk, line-mask reveals,
// GSAP entrance animations, reduceMotion respect).

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'
import { useDocumentMeta } from '../lib/seo'

gsap.registerPlugin(ScrollTrigger)

// ----- Section 1 — HERO (Cover) ----------------------------------------------
function HeroCover() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    const el = root.current
    if (!el) return
    const lines = el.querySelectorAll<HTMLElement>('.line-mask > span')
    gsap.set(lines, { yPercent: 110 })
    const tl = gsap.timeline({ delay: 0.3 })
    tl.to(lines, { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.08 })
    gsap.fromTo(
      el.querySelectorAll('.hero-fade'),
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', stagger: 0.12, delay: 0.6 }
    )
  }, [])

  return (
    <section
      ref={root}
      className="relative min-h-[100vh] overflow-hidden flex items-center"
      style={{ backgroundColor: '#EDE5D6' }}
    >
      {/* Cream sculpture background — fills the hero */}
      <img
        src="/tlc-demo/page-cover.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-95"
      />
      {/* Subtle warm overlay so text reads cleanly */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(237,229,214,0.0) 30%, rgba(237,229,214,0.55) 75%, rgba(237,229,214,0.85) 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 pt-28 pb-12 md:pt-32 md:pb-16">
        {/* Eyebrow — Precision Longevity Medicine */}
        <div className="hero-fade mb-8 md:mb-12 text-center">
          <span className="text-[11px] md:text-[13px] tracking-[0.5em] uppercase text-graphite font-medium">
            Precision Longevity Medicine
          </span>
        </div>

        {/* Wordmark — TLC THE LONGEVITY CENTRE */}
        <div className="hero-fade mb-10 md:mb-14 text-center">
          <div className="inline-flex flex-col items-center gap-1.5">
            <div className="font-display font-bold text-[26px] md:text-[34px] leading-none tracking-[0.2em] text-ink">
              TLC
            </div>
            <div className="text-[10px] md:text-[11px] tracking-[0.42em] uppercase text-graphite font-medium">
              The Longevity Centre
            </div>
          </div>
        </div>

        {/* Headline — masked-line reveal */}
        <h1 className="font-display font-bold text-center leading-[1.05] tracking-[-0.025em] text-ink mb-12 md:mb-14">
          <span className="block text-[40px] sm:text-[58px] md:text-[78px] xl:text-[96px]">
            <span className="line-mask">
              <span>Age Is A Number.</span>
            </span>
          </span>
          <span className="block text-[28px] sm:text-[36px] md:text-[48px] xl:text-[56px] mt-2 md:mt-3 font-medium text-graphite">
            <span className="line-mask">
              <span>Your Biology Doesn't Have To Match It.</span>
            </span>
          </span>
        </h1>

        {/* Sub eyebrow */}
        <div className="hero-fade text-center mb-10 md:mb-14">
          <span className="text-[10.5px] md:text-[12px] tracking-[0.32em] uppercase text-rust font-semibold">
            India's First Doctor-Led Personalised Longevity Program
          </span>
        </div>

        {/* Locations strip */}
        <div className="hero-fade text-center">
          <div className="text-[12px] md:text-[14px] tracking-[0.18em] uppercase text-graphite font-medium">
            Delhi <span className="text-rust mx-2">·</span> Gurugram{' '}
            <span className="text-rust mx-2">·</span> Pune{' '}
            <span className="text-rust mx-2">·</span> Mumbai{' '}
            <span className="text-rust mx-2">·</span> Goa{' '}
            <span className="text-rust mx-2">·</span> Bengaluru
          </div>
        </div>

        {/* CTA pills */}
        <div className="hero-fade mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#contact"
            data-cursor="hover"
            className="group inline-flex items-center gap-2.5 pl-5 pr-6 py-3.5 bg-ink text-white rounded-full text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-rust transition-colors duration-500"
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
            </span>
            Book Initial Consultation
            <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="#programmes"
            data-cursor="hover"
            className="inline-flex items-center gap-2 px-5 py-3.5 border border-ink/25 text-ink rounded-full text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-ink hover:text-white transition-colors duration-500"
          >
            Explore Programmes
          </a>
        </div>
      </div>
    </section>
  )
}

// ----- Section 2 — WHO WE ARE ------------------------------------------------
function WhoWeAre() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    if (reduceMotion()) return
    const el = root.current
    if (!el) return
    const lines = el.querySelectorAll<HTMLElement>('.line-mask > span')
    gsap.set(lines, { yPercent: 110 })
    gsap.to(lines, {
      yPercent: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 80%' },
    })
    const stats = el.querySelectorAll<HTMLElement>('.stat-circle')
    gsap.set(stats, { scale: 0.8, opacity: 0 })
    gsap.to(stats, {
      scale: 1,
      opacity: 1,
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.1,
      scrollTrigger: { trigger: stats[0], start: 'top 85%' },
    })
  }, [])

  const STATS = [
    { v: '20+', l: 'Years Experience', bg: 'bg-rust', text: 'text-white' },
    { v: '1000+', l: 'Biomarkers', bg: 'bg-iguana', text: 'text-ink' },
    { v: '06', l: 'Programmes', bg: 'bg-rust', text: 'text-white' },
    { v: '06', l: 'Centres', bg: 'bg-iguana', text: 'text-ink' },
  ]

  return (
    <section ref={root} className="grid md:grid-cols-2 min-h-[80vh]">
      {/* LEFT — DNA imagery + brand voice quote */}
      <div className="relative bg-ink text-white px-6 md:px-12 lg:px-16 py-16 md:py-24 flex items-center overflow-hidden">
        <img
          src="/tlc-demo/page-who-we-are.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          style={{ objectPosition: 'left center' }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(20,15,12,0.7) 0%, rgba(20,15,12,0.35) 100%)' }}
        />
        <div className="relative z-10 max-w-[480px]">
          <h2 className="font-display font-bold text-[34px] md:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.025em]">
            <span className="line-mask"><span>A sanctuary where</span></span>
            <br />
            <span className="line-mask"><span>science meets serenity.</span></span>
          </h2>
        </div>
      </div>

      {/* RIGHT — cream content panel */}
      <div className="relative px-6 md:px-12 lg:px-16 py-16 md:py-24 flex flex-col justify-center" style={{ backgroundColor: '#EDE5D6' }}>
        <div className="max-w-[520px]">
          <h3 className="font-display font-bold text-[32px] md:text-[40px] tracking-[-0.025em] text-rust mb-6">
            Who We Are
          </h3>
          <p className="text-[15px] md:text-[16px] leading-[1.65] text-graphite font-light mb-5">
            TLC is India's premier longevity and metabolic medicine clinic — a precision medicine center where every protocol begins with diagnostics and every program is built around one patient: you.
          </p>
          <p className="text-[15px] md:text-[16px] leading-[1.65] text-graphite font-light mb-10">
            Our physicians bring together expertise in endocrinology, metabolic medicine, gut health, regenerative science, and anti-aging — each with more than 20 years of clinical experience.
          </p>

          <div className="h-px w-full bg-iguana/60 mb-8" />

          {/* Stats — alternating rust/iguana circles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
            {STATS.map((s) => (
              <div key={s.l} className="stat-circle flex flex-col items-center text-center">
                <div className={`${s.bg} ${s.text} w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center font-display font-bold text-[18px] md:text-[22px] tracking-tight tabular-nums shadow-[0_18px_30px_-15px_rgba(27,26,24,0.25)]`}>
                  {s.v}
                </div>
                <div className="mt-3 text-[9px] md:text-[10px] tracking-[0.28em] uppercase text-rust font-semibold">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ----- Section 3 — THE SCIENCE OF CELLULAR AGING -----------------------------
function CellularAging() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    if (reduceMotion()) return
    const el = root.current
    if (!el) return
    const lines = el.querySelectorAll<HTMLElement>('.line-mask > span')
    gsap.set(lines, { yPercent: 110 })
    gsap.to(lines, {
      yPercent: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 80%' },
    })
  }, [])

  return (
    <section ref={root} className="grid md:grid-cols-2 min-h-[70vh]">
      {/* LEFT — forest green content */}
      <div className="bg-green text-white px-6 md:px-12 lg:px-16 py-16 md:py-20 flex items-center">
        <div className="max-w-[480px]">
          <div className="h-px w-16 bg-iguana/70 mb-8" />
          <h2 className="font-display font-bold text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.02em] mb-6">
            <span className="line-mask"><span>The Science of</span></span>
            <br />
            <span className="line-mask"><span>Cellular Aging</span></span>
          </h2>
          <p className="text-[14.5px] md:text-[15px] leading-[1.65] text-white/85 font-light">
            Aging begins at the cellular level, where molecular damage accumulates over time. Key processes include telomere shortening with each cell division, genomic instability, loss of protein quality control, and mitochondrial dysfunction. These changes trigger cellular senescence — when cells stop dividing and release inflammatory signals that accelerate aging.
          </p>
          <div className="h-px w-16 bg-iguana/70 mt-10" />
        </div>
      </div>

      {/* RIGHT — bubbles imagery + overlay quote */}
      <div className="relative overflow-hidden bg-graphite">
        <img
          src="/tlc-demo/page-cellular-aging.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'right center' }}
        />
        <div className="relative z-10 px-6 md:px-12 lg:px-14 py-16 md:py-20 flex items-center min-h-[70vh]">
          <div className="max-w-[480px]">
            <p className="font-display font-bold text-[24px] md:text-[32px] lg:text-[38px] leading-[1.15] tracking-[-0.02em] text-white">
              At TLC, we measure and target these cellular mechanisms — using advanced diagnostics and interventions to restore cellular health and extend your healthspan.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ----- Section 4 — WHY LONGEVITY MEDICINE ------------------------------------
function WhyLongevityMedicine() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    if (reduceMotion()) return
    const el = root.current
    if (!el) return
    const lines = el.querySelectorAll<HTMLElement>('.line-mask > span')
    gsap.set(lines, { yPercent: 110 })
    gsap.to(lines, {
      yPercent: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 80%' },
    })
  }, [])

  return (
    <section ref={root} className="grid md:grid-cols-2 min-h-[70vh]" style={{ backgroundColor: '#EDE5D6' }}>
      {/* LEFT — circular text overlaid on imagery grid (per page 7) */}
      <div className="relative overflow-hidden bg-ink min-h-[400px] md:min-h-[600px]">
        <img
          src="/tlc-demo/page-why-longevity.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'left center' }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="font-display font-bold text-white text-[14px] md:text-[18px] tracking-[0.18em] uppercase"
            style={{
              animation: 'tac-spin-slow 50s linear infinite',
            }}
          >
            <svg viewBox="0 0 400 400" className="w-[280px] md:w-[340px] h-[280px] md:h-[340px]">
              <defs>
                <path id="circular-path" d="M 200,200 m -160,0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0" />
              </defs>
              <text fill="currentColor" fontSize="22" fontWeight="700" letterSpacing="3">
                <textPath href="#circular-path" startOffset="0">
                  AGING IS A PROCESS · WE CAN REWRITE IT · AGING IS A PROCESS · WE CAN REWRITE IT ·
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* RIGHT — content */}
      <div className="px-6 md:px-12 lg:px-16 py-16 md:py-20 flex items-center">
        <div className="max-w-[520px]">
          <h2 className="font-display font-bold text-[32px] md:text-[40px] tracking-[-0.025em] text-rust mb-7">
            Why Longevity Medicine
          </h2>
          <p className="text-[15px] md:text-[16px] leading-[1.65] text-graphite font-light mb-6">
            <strong className="font-semibold text-ink">Your biological age</strong> — how old your cells and metabolism actually are — can differ significantly from your chronological age. And unlike your birth year, it can be changed.
          </p>
          <p className="text-[15px] md:text-[16px] leading-[1.65] text-graphite font-light mb-8">
            At TLC, we measure biological age across three validated clocks, identify what is accelerating your aging, and intervene with precision medicine to reverse it.
          </p>
          <div className="h-px w-full bg-iguana/60 mb-6" />
          <div className="space-y-2 text-[14px] md:text-[15px] text-ink">
            <div><strong className="text-rust font-semibold">Chronological Age:</strong> <span className="text-graphite">Fixed.</span></div>
            <div><strong className="text-rust font-semibold">Biological Age:</strong> <span className="text-graphite">Measurable, Modifiable, Reducible.</span></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tac-spin-slow { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
      `}</style>
    </section>
  )
}

// ----- Section 5 — A WORD FROM OUR FOUNDERS ----------------------------------
function FoundersWord() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    if (reduceMotion()) return
    const el = root.current
    if (!el) return
    const lines = el.querySelectorAll<HTMLElement>('.line-mask > span')
    gsap.set(lines, { yPercent: 110 })
    gsap.to(lines, {
      yPercent: 0,
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 80%' },
    })
  }, [])

  return (
    <section ref={root} className="grid md:grid-cols-2" style={{ backgroundColor: '#EDE5D6' }}>
      {/* LEFT — quote */}
      <div className="px-6 md:px-12 lg:px-16 py-16 md:py-24 flex items-center">
        <div className="max-w-[520px]">
          <h2 className="font-display font-bold text-[32px] md:text-[40px] tracking-[-0.025em] text-rust mb-8">
            A Word From Our Founders
          </h2>
          <p className="font-semibold text-[15px] md:text-[16px] text-ink mb-5 leading-[1.55]">
            We founded TLC with one conviction: that modern medicine arrives too late.
          </p>
          <p className="text-[14.5px] md:text-[15px] leading-[1.65] text-graphite font-light mb-4">
            We wait for disease to declare itself — and then we treat it. But the biology of illness begins years, sometimes decades, before any symptom appears. By then, precious time has already been lost.
          </p>
          <p className="text-[14.5px] md:text-[15px] leading-[1.65] text-graphite font-light mb-4">
            We wanted to build something different. A place where science meets you before disease does. Where your biology is read in full — at the genetic, cellular, and microbial level — and where the finest tools of longevity medicine are used not to manage decline, but to prevent it entirely.
          </p>
          <p className="font-semibold text-[14.5px] md:text-[15px] text-ink leading-[1.6]">
            At TLC, we do not treat patients. We partner with individuals who have decided that aging on their own terms is not a luxury — it is a right. That conviction is the foundation of everything we do.
          </p>
          <div className="h-px w-20 bg-iguana mt-10 mb-5" />
          <div className="text-[13px] md:text-[14px] text-rust font-semibold tracking-tight">
            Dr. Abhinav Sharma <span className="text-graphite/70 mx-2">&</span> Dr. Bhavna Sharma
          </div>
        </div>
      </div>

      {/* RIGHT — founders photo + headline */}
      <div className="relative bg-graphite overflow-hidden min-h-[400px] md:min-h-full">
        <img
          src="/tlc-demo/page-founders.jpg"
          alt="Dr. Abhinav Sharma and Dr. Bhavna Sharma"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'right center' }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.85) 100%)' }}
        />
        <div className="relative z-10 h-full min-h-[400px] md:min-h-full flex items-end px-6 md:px-12 lg:px-14 py-12">
          <h3 className="font-display font-bold text-[28px] md:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.025em] text-white">
            <span className="line-mask"><span>The Best Years of Your Life</span></span>
            <br />
            <span className="line-mask"><span>Should Still Be Ahead of You.</span></span>
          </h3>
        </div>
      </div>
    </section>
  )
}

// ----- Section 6 — OUR MISSION + OUR PHILOSOPHY ------------------------------
function MissionPhilosophy() {
  return (
    <section className="grid md:grid-cols-2 min-h-[70vh]">
      {/* LEFT — Mission with rust overlay */}
      <div className="relative overflow-hidden bg-rust">
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-multiply opacity-90"
          style={{ background: '#945455' }}
        />
        <div className="relative z-10 px-6 md:px-12 lg:px-14 py-16 md:py-20 text-white min-h-[70vh] flex flex-col justify-center">
          <div className="text-[10.5px] tracking-[0.32em] uppercase text-white/80 font-semibold mb-3">
            Our Mission
          </div>
          <div className="h-px w-20 bg-white/40 mb-8" />
          <h2 className="font-display font-bold text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.02em] mb-7">
            To Help You Live Well — All The Way To One Hundred.
          </h2>
          <p className="text-[14px] md:text-[15px] leading-[1.65] text-white/85 font-light mb-4">
            In some parts of the world, living to one hundred isn't exceptional. It's ordinary.
          </p>
          <p className="text-[14px] md:text-[15px] leading-[1.65] text-white/85 font-light mb-4">
            The Blue Zones — Sardinia, Okinawa, Ikaria, Loma Linda, Nicoya — have the highest concentrations of centenarians. They don't get there by chance, but through ways of living that keep their biology young.
          </p>
          <p className="text-[14px] md:text-[15px] leading-[1.65] text-white/95 font-medium mb-3">
            At TLC, our mission is to bring that possibility to you — through science, not luck.
          </p>
          <p className="text-[14px] md:text-[15px] leading-[1.65] text-white/95 font-semibold">
            Not just more years. A well-lived hundred.
          </p>
        </div>
      </div>

      {/* RIGHT — Philosophy with iguana/olive overlay */}
      <div className="relative overflow-hidden bg-iguana">
        <div className="relative z-10 px-6 md:px-12 lg:px-14 py-16 md:py-20 text-white min-h-[70vh] flex flex-col justify-center">
          <div className="text-[10.5px] tracking-[0.32em] uppercase text-white/80 font-semibold mb-3">
            Our Philosophy
          </div>
          <div className="h-px w-20 bg-white/40 mb-8" />
          <h2 className="font-display font-bold text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.02em] mb-7">
            Treat the Biology. Not the Symptom.
          </h2>
          <p className="text-[14px] md:text-[15px] leading-[1.65] text-white/85 font-light mb-6">
            We don't believe in waiting. At TLC, the most powerful moment in medicine isn't the diagnosis — it's the years before, when disease can still be read, understood, and changed at its source.
          </p>

          <div className="space-y-4">
            <div>
              <div className="font-semibold text-[14px] md:text-[15px] text-white mb-1">Measure first</div>
              <div className="text-[13.5px] text-white/80 leading-[1.55] font-light">Nothing is assumed. Everything is tested — across genetic, epigenetic, cellular, gut, and metabolic levels.</div>
            </div>
            <div>
              <div className="font-semibold text-[14px] md:text-[15px] text-white mb-1">Personalise completely</div>
              <div className="text-[13.5px] text-white/80 leading-[1.55] font-light">Your biology is unique. Your program — diagnostics, protocol, nutrition, tracking — is built entirely around you.</div>
            </div>
            <div>
              <div className="font-semibold text-[14px] md:text-[15px] text-white mb-1">Optimise continuously</div>
              <div className="text-[13.5px] text-white/80 leading-[1.55] font-light">Longevity isn't a destination — it's a practice. Your program evolves with your data, refined at every step.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ----- Section 7 — OUR TEAM (4-quadrant) -------------------------------------
function OurTeam() {
  const FOUNDERS = [
    { key: 'dr-abhinav', name: 'Dr Abhinav Sharma', creds: 'MBBS MS', role: 'Founder / Director' },
    { key: 'dr-bhavna', name: 'Dr Bhavna Sharma', creds: 'MBBS MS · IVF Specialist', role: 'Co-Founder / Director' },
    { key: 'dr-karan', name: 'Dr Karan Mane', creds: 'MBBS MS', role: 'Director' },
  ]
  const TEAM_TOP = [
    { key: 'dr-rahul', name: 'Dr Rahul Chaube', creds: 'MD Medicine', role: 'Physician & Diabetologist' },
    { key: 'dr-vaibhav', name: 'Dr Vaibhav Bhisikar', creds: 'MBBS MS · MCh', role: 'Plastic & Hair Surgeon' },
    { key: 'dr-ankit', name: 'Dr Ankit Agrawal', creds: 'MBBS CPS', role: 'Dermatologist & Trichologist' },
  ]
  const TEAM_BOT = [
    { key: 'dr-surekha', name: 'Dr Surekha Sawant', role: 'Longevity Consultant' },
    { key: 'dr-pooja', name: 'Dr Pooja Dahiya', role: 'Longevity Consultant' },
    { key: 'dr-niloufar', name: 'Dr Niloufar Hayat', role: 'Longevity Consultant' },
  ]

  const Card = ({ d, textColor = 'text-ink' }: { d: { key: string; name: string; creds?: string; role: string }; textColor?: string }) => (
    <div className="flex flex-col items-center text-center">
      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-white/40 mb-3.5 shadow-[0_18px_30px_-15px_rgba(27,26,24,0.25)]">
        <img src={`/tlc-demo/team-${d.key}.png`} alt={d.name} className="w-full h-full object-cover" />
      </div>
      <div className={`font-display font-bold text-[13px] md:text-[14px] tracking-tight ${textColor}`}>{d.name}</div>
      {d.creds && <div className={`text-[10.5px] mt-0.5 ${textColor === 'text-white' ? 'text-white/70' : 'text-graphite/80'}`}>{d.creds}</div>}
      <div className={`text-[10.5px] mt-0.5 ${textColor === 'text-white' ? 'text-white/70' : 'text-graphite/80'}`}>{d.role}</div>
    </div>
  )

  return (
    <section className="grid md:grid-cols-2">
      {/* TOP-LEFT — Founders & Directors (cream) */}
      <div className="px-6 md:px-12 lg:px-14 py-14 md:py-16" style={{ backgroundColor: '#EDE5D6' }}>
        <div className="text-[11px] tracking-[0.32em] uppercase text-rust font-semibold mb-2">
          Founders and Directors
        </div>
        <div className="h-px w-full bg-iguana/60 mb-10" />
        <div className="grid grid-cols-3 gap-4">
          {FOUNDERS.map((d) => <Card key={d.key} d={d} />)}
        </div>
      </div>

      {/* TOP-RIGHT — Team of Doctors (iguana) */}
      <div className="bg-iguana px-6 md:px-12 lg:px-14 py-14 md:py-16">
        <div className="text-[11px] tracking-[0.32em] uppercase text-white font-semibold mb-2">
          Team of Doctors
        </div>
        <div className="h-px w-full bg-white/30 mb-10" />
        <div className="grid grid-cols-3 gap-4">
          {TEAM_TOP.map((d) => <Card key={d.key} d={d} textColor="text-white" />)}
        </div>
      </div>

      {/* BOTTOM-LEFT — "Our Team" copy block (rust) */}
      <div className="bg-rust text-white px-6 md:px-12 lg:px-14 py-14 md:py-16 flex flex-col justify-center">
        <div className="text-[11px] tracking-[0.32em] uppercase text-white/80 font-semibold mb-2">
          Our Team
        </div>
        <div className="h-px w-full bg-white/30 mb-8" />
        <h3 className="font-display font-bold text-[28px] md:text-[34px] leading-[1.1] tracking-[-0.02em] mb-6">
          Doctors Dedicated to Your Longevity.
        </h3>
        <p className="text-[14px] md:text-[15px] leading-[1.65] text-white/85 font-light">
          A multidisciplinary panel of longevity physicians, endocrinologists, metabolic specialists, and nutritionists. Every patient is cared for by a team — not a single doctor — that holds your complete biological picture.
        </p>
      </div>

      {/* BOTTOM-RIGHT — Longevity Consultants (cream) */}
      <div className="px-6 md:px-12 lg:px-14 py-14 md:py-16" style={{ backgroundColor: '#EDE5D6' }}>
        <div className="text-[11px] tracking-[0.32em] uppercase text-rust font-semibold mb-2">
          Team of Doctors
        </div>
        <div className="h-px w-full bg-iguana/60 mb-10" />
        <div className="grid grid-cols-3 gap-4">
          {TEAM_BOT.map((d) => <Card key={d.key} d={d} />)}
        </div>
      </div>
    </section>
  )
}

// ----- Section 8 — DIAGNOSTICS (expandable) ----------------------------------
function Diagnostics() {
  const [open, setOpen] = useState<number | null>(null)

  const DIAGNOSTICS = [
    {
      title: 'Blood Biomarkers',
      tag: '160+ Markers',
      body: 'A comprehensive panel of 160+ blood markers — spanning metabolic health, hormonal balance, inflammatory status, cardiovascular risk, nutritional sufficiency, and organ function. Collected from the comfort of your home.',
      hi: 'The most complete baseline picture of your internal biology.',
    },
    {
      title: 'Body Composition Analysis',
      tag: 'BCA · Segmental',
      body: 'Measures fat mass, lean muscle mass, visceral fat, and hydration at the segmental level. Tracked progressively throughout your program to document and guide your physical transformation with precision.',
      hi: 'Not just your weight — your body\'s true composition, measured and mapped.',
    },
    {
      title: 'Oligoscan — Cell Scan',
      tag: 'Spectrophotometric',
      body: 'A non-invasive spectrophotometric scan of the skin that measures intracellular mineral concentrations and heavy metal burden in real time — without blood. Reveals cellular-level deficiencies and toxicities that standard panels miss entirely.',
      hi: 'Cellular truth — without a needle.',
    },
    {
      title: 'Epigenetic Age Testing',
      tag: 'GrimAge + PhenoAge',
      body: 'Performed using the gold-standard GrimAge epigenetic clock — widely regarded as the most accurate predictor of biological age and mortality risk — combined with PhenoAge testing. Together, these analyse DNA methylation across 9 million base pairs.',
      hi: 'While most clinics estimate, we measure — at 9 million base pairs.',
    },
    {
      title: 'Genetic Testing',
      tag: '323 Genes & SNPs',
      body: 'We analyse 323 genes and SNPs (Single Nucleotide Polymorphisms) that govern your metabolic, hormonal, cardiovascular, and longevity pathways. This is your permanent genetic blueprint — informing every intervention we make.',
      hi: 'Most clinics test fewer than 99 genes. We test 323.',
    },
    {
      title: 'Gut Microbiome Testing',
      tag: 'Whole Genomic Sequencing',
      body: 'TLC uses whole genomic sequencing of every microbial species in your gut — the most comprehensive microbiome analysis available. Reveals diversity index, compromised pathways, imbalanced species, and inflammation markers.',
      hi: 'Most clinics use 16S rRNA — a partial read. We do whole genomic — the complete picture.',
    },
  ]

  return (
    <section className="bg-green text-white px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-end mb-14 md:mb-16">
          <div>
            <div className="text-[10.5px] tracking-[0.32em] uppercase text-iguana font-semibold mb-3">
              Why Our Diagnostics Are Different
            </div>
            <h2 className="font-display font-bold text-[32px] md:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.025em] mb-2">
              We Don't Just Test.
            </h2>
            <h2 className="font-display font-bold text-[32px] md:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.025em] text-iguana-soft">
              We Decode Your Biology.
            </h2>
          </div>
          <p className="text-[14.5px] md:text-[15px] text-white/80 leading-[1.7] font-light max-w-[420px] md:pb-3">
            At TLC, diagnostics are not a formality — they are the foundation of everything. We use the world's most advanced testing protocols across six domains, giving you a picture of your health that standard medicine cannot access.
          </p>
        </div>

        {/* 6 expandable cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {DIAGNOSTICS.map((d, i) => {
            const isOpen = open === i
            return (
              <button
                key={d.title}
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={`text-left p-6 md:p-7 rounded-[16px] border transition-all duration-500 group ${
                  isOpen ? 'bg-iguana/15 border-iguana/50' : 'bg-white/[0.04] border-white/12 hover:bg-white/[0.07] hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="text-[10px] tracking-[0.28em] uppercase text-iguana-soft font-semibold tabular-nums">
                    0{i + 1}
                  </div>
                  <span aria-hidden className={`text-[18px] leading-none transition-transform duration-500 ${isOpen ? 'rotate-45 text-iguana-soft' : 'text-white/50'}`}>+</span>
                </div>
                <h3 className="font-display font-bold text-[19px] md:text-[20px] tracking-[-0.015em] text-white mb-1.5">
                  {d.title}
                </h3>
                <div className="text-[10.5px] tracking-[0.22em] uppercase text-iguana-soft font-semibold mb-3">
                  {d.tag}
                </div>
                <div
                  className="grid transition-all duration-500"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="text-[13.5px] leading-[1.6] text-white/80 font-light mb-3 pt-1">
                      {d.body}
                    </p>
                    <p className="text-[12.5px] italic text-iguana-soft font-medium">
                      {d.hi}
                    </p>
                  </div>
                </div>
                {!isOpen && (
                  <div className="text-[11px] tracking-[0.22em] uppercase text-white/55 font-medium mt-1 group-hover:text-white/75 transition-colors">
                    Tap to read more →
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ----- Section 9 — HOW OLD IS YOUR BIOLOGY -----------------------------------
function BioAgeClocks() {
  const CLOCKS = [
    { tag: 'Blood Biological Age', body: 'Derived from your biomarker panel, reflecting your body\'s functional age — tracked over time to measure reversal.' },
    { tag: 'Epigenetic Age', body: 'Measured via GrimAge + PhenoAge DNA methylation analysis (9M base pairs) — the most validated predictor of healthspan and lifespan.' },
    { tag: 'Gut Age', body: 'Derived from whole genomic microbiome sequencing — reflecting inflammation, immunity, and metabolic health, tracked over time.' },
  ]

  return (
    <section className="grid md:grid-cols-2 min-h-[70vh]" style={{ backgroundColor: '#EDE5D6' }}>
      {/* LEFT — clock head image */}
      <div className="relative overflow-hidden bg-graphite min-h-[400px] md:min-h-full">
        <img
          src="/tlc-demo/page-bio-age.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'left center' }}
        />
      </div>

      {/* RIGHT — 3 clocks */}
      <div className="px-6 md:px-12 lg:px-14 py-16 md:py-20 flex items-center">
        <div className="max-w-[520px]">
          <h2 className="font-display font-bold text-[30px] md:text-[40px] tracking-[-0.025em] text-rust mb-6 leading-[1.1]">
            How Old Is Your Biology — Really?
          </h2>
          <div className="h-px w-full bg-iguana/60 mb-8" />
          <div className="space-y-7">
            {CLOCKS.map((c, i) => (
              <div key={c.tag} className="flex gap-4">
                <div className="text-[11px] tracking-[0.28em] uppercase text-rust font-semibold tabular-nums shrink-0 pt-1">
                  0{i + 1}
                </div>
                <div>
                  <div className="font-display font-bold text-[15.5px] md:text-[16.5px] uppercase tracking-tight text-ink mb-1.5">
                    {c.tag}
                  </div>
                  <p className="text-[13.5px] md:text-[14px] leading-[1.6] text-graphite font-light">
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ----- Section 10 — EUROPEAN PARTNERSHIP -------------------------------------
function EuropeanPartnership() {
  return (
    <section className="grid md:grid-cols-2 min-h-[70vh]" style={{ backgroundColor: '#EDE5D6' }}>
      {/* LEFT — content */}
      <div className="px-6 md:px-12 lg:px-14 py-16 md:py-20 flex items-center">
        <div className="max-w-[520px]">
          <div className="text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold mb-3">
            The Science Behind The Science
          </div>
          <h2 className="font-display font-bold text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.025em] text-rust mb-3">
            Gold Standard Testing.
          </h2>
          <h3 className="font-display font-semibold text-[20px] md:text-[24px] leading-[1.2] tracking-[-0.015em] text-ink mb-7">
            Delivered from the World's Finest Laboratories.
          </h3>

          <p className="text-[14px] md:text-[15px] leading-[1.65] text-graphite font-light mb-5">
            For our most advanced diagnostics, TLC partners exclusively with a specialist laboratory in the Netherlands — one of Europe's foremost centres for genomic and epigenomic science.
          </p>
          <div className="space-y-3 mb-6">
            <div className="text-[13.5px] leading-[1.6] text-graphite">
              <strong className="text-ink font-semibold">323 genes & SNPs</strong> — your complete genetic blueprint, not a partial panel.
            </div>
            <div className="text-[13.5px] leading-[1.6] text-graphite">
              <strong className="text-ink font-semibold">GrimAge + PhenoAge</strong> — DNA methylation across 9 million base pairs.
            </div>
            <div className="text-[13.5px] leading-[1.6] text-graphite">
              <strong className="text-ink font-semibold">Whole genomic gut sequencing</strong> — beyond the partial 16S rRNA used by most clinics globally.
            </div>
          </div>
          <p className="text-[13px] italic text-rust font-medium">
            When it comes to your biology, there is no acceptable margin for a partial picture.
          </p>
        </div>
      </div>

      {/* RIGHT — Netherlands street imagery */}
      <div className="relative overflow-hidden min-h-[400px] md:min-h-full">
        <img
          src="/tlc-demo/page-european.jpg"
          alt="The Netherlands laboratory partnership"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'right center' }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.0) 50%, rgba(20,15,12,0.45) 100%)' }}
        />
        <div className="relative z-10 h-full min-h-[400px] md:min-h-full flex items-end px-6 md:px-12 lg:px-14 py-12">
          <h3 className="font-display font-bold text-[26px] md:text-[36px] leading-[1.1] tracking-[-0.025em] text-white">
            Our European Partnership —<br />The Netherlands Laboratory
          </h3>
        </div>
      </div>
    </section>
  )
}

// ----- Section 11 — THE TLC APP ----------------------------------------------
function TlcApp() {
  const FEATURES = [
    { t: 'Biological Age Clocks', d: 'Blood, epigenetic & gut age tracked in real time' },
    { t: 'Biomarker Dashboard', d: '1000+ markers visualised over time' },
    { t: 'Body Composition', d: 'BCA trends charted progressively' },
    { t: 'Consultation Notes', d: 'Every physician recommendation accessible' },
    { t: 'Recommendations', d: 'Supplements, nutrition, activities, lifestyle' },
  ]

  return (
    <section className="grid md:grid-cols-2 min-h-[70vh]" style={{ backgroundColor: '#EDE5D6' }}>
      {/* LEFT — content */}
      <div className="px-6 md:px-12 lg:px-14 py-16 md:py-20 flex items-center">
        <div className="max-w-[480px]">
          <h2 className="font-display font-bold text-[34px] md:text-[44px] tracking-[-0.025em] text-rust mb-5">
            The TLC App.
          </h2>
          <p className="text-[14px] md:text-[15px] leading-[1.65] text-graphite font-light mb-8">
            Included in every TLC program. The TLC App is a proprietary longitudinal health intelligence platform — not a wellness tracker. It continuously visualises your biological transformation between clinical visits.
          </p>
          <div className="h-px w-full bg-iguana/60 mb-7" />
          <div className="space-y-4">
            {FEATURES.map((f) => (
              <div key={f.t}>
                <div className="font-semibold text-[14px] md:text-[15px] text-ink mb-0.5">{f.t}</div>
                <div className="text-[13px] text-graphite/85 leading-[1.55]">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — phone mockup */}
      <div className="relative overflow-hidden bg-graphite min-h-[400px] md:min-h-full flex items-center justify-center">
        <img
          src="/tlc-demo/tlc-app-mockup.jpg"
          alt="TLC App interface"
          className="relative z-10 h-[80%] w-auto object-contain"
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(178,122,123,0.08), transparent 60%)' }}
        />
        <div className="absolute right-6 md:right-10 bottom-10 md:bottom-12 text-right pointer-events-none">
          <div className="font-display font-bold text-[20px] md:text-[28px] leading-[1.1] text-white">
            Your Biology.<br />
            Tracked. Decoded. Optimised.
          </div>
        </div>
      </div>
    </section>
  )
}

// ----- Section 12 — TESTIMONIALS ---------------------------------------------
function Testimonials() {
  const T = [
    { id: 'shaun', name: 'Shaun Gomez', programme: 'Advanced Metabolic', tone: 'rust' as const,
      quote: 'I reduced my weight from 87 kg to 72 kg through this program. Beyond weight loss, I feel more focused and active in my daily life. The personalised approach made it effective.' },
    { id: 'abhinav-s', name: 'Abhinav Saxena', programme: 'Longevity Plus', tone: 'green' as const,
      quote: 'I lost weight from 85 kg to nearly 71 kg and feel healthier from within. My energy improved, and I feel younger overall. The guidance also helped my liver health.' },
    { id: 'anand', name: 'Anand Patil', programme: 'Diabetes Reversal', tone: 'rust' as const,
      quote: 'My HbA1c dropped from 7.4 to 5.7 within four months. I feel more in control of my health now, and the routine is easy to follow.' },
    { id: 'bhushan', name: 'Bhushan Kamble', programme: 'Metabolic', tone: 'green' as const,
      quote: 'I reduced 9–10 kg and my glucose moved from diabetic to normal. The progress came faster than I expected. Customised support made it easy to maintain.' },
    { id: 'prem', name: 'Prem Pathak', programme: 'Gut & Metabolic', tone: 'rust' as const,
      quote: 'My HbA1c dropped from 7.8 to 5.7 within just two months. I also lost weight and feel much lighter. I feel more in control of my health.' },
    { id: 'sadhna', name: 'Sadhna Gupta', programme: 'Diabetes Reversal', tone: 'green' as const,
      quote: 'My fasting dropped from around 170–180 to nearly 110, and my medications have reduced. I feel more energetic, and managing my diet has become much easier.' },
  ]

  const toneClasses = {
    rust: { ribbon: 'bg-rust', text: 'text-white' },
    green: { ribbon: 'bg-green', text: 'text-white' },
  }

  return (
    <section className="px-6 md:px-12 lg:px-16 py-16 md:py-24" style={{ backgroundColor: '#EDE5D6' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-12 md:mb-16">
          <h2 className="font-display font-bold text-[32px] md:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.025em] text-rust">
            Testimonials By Our Clients
          </h2>
          <div className="h-px w-32 bg-iguana mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {T.map((t) => {
            const c = toneClasses[t.tone]
            return (
              <article key={t.id} className="bg-white rounded-[16px] overflow-hidden shadow-[0_24px_50px_-30px_rgba(27,26,24,0.25)]">
                {/* Coloured ribbon header with portrait */}
                <div className={`relative ${c.ribbon} px-5 pt-7 pb-5`}>
                  <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-cream bg-white shadow-[0_18px_30px_-15px_rgba(0,0,0,0.4)]">
                    <img src={`/tlc-demo/test-${t.id}.png`} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-12 text-center">
                    <div className={`font-display font-bold text-[16px] md:text-[17px] tracking-tight ${c.text}`}>{t.name}</div>
                    <div className={`text-[11px] mt-0.5 tracking-[0.22em] uppercase ${c.text} opacity-80 font-medium`}>{t.programme}</div>
                  </div>
                </div>
                {/* Quote body */}
                <div className="px-5 py-5 md:px-6 md:py-6">
                  <p className="text-[13.5px] md:text-[14px] leading-[1.65] text-graphite font-light italic">
                    "{t.quote}"
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ----- Section 13 — BRAND AMBASSADOR -----------------------------------------
function BrandAmbassador() {
  return (
    <section className="grid md:grid-cols-2 min-h-[60vh]" style={{ backgroundColor: '#EDE5D6' }}>
      {/* LEFT — Milind portrait */}
      <div className="relative overflow-hidden min-h-[400px] md:min-h-full flex items-end justify-center" style={{ backgroundColor: '#EDE5D6' }}>
        <img
          src="/tlc-demo/milind-soman.jpg"
          alt="Milind Soman — Brand Ambassador, The Longevity Centre"
          className="relative z-10 max-h-[85%] w-auto object-contain"
        />
        <div className="absolute inset-x-6 bottom-6 z-20 text-center">
          <div className="font-display font-bold text-[18px] md:text-[20px] tracking-tight text-ink">Milind Soman</div>
          <div className="text-[10.5px] mt-0.5 tracking-[0.22em] uppercase text-rust font-semibold">Brand Ambassador · The Longevity Centre</div>
        </div>
      </div>

      {/* RIGHT — copy */}
      <div className="px-6 md:px-12 lg:px-14 py-16 md:py-20 flex items-center">
        <div className="max-w-[520px]">
          <h2 className="font-display font-bold text-[30px] md:text-[40px] tracking-[-0.025em] text-rust mb-7">
            Partnering with Excellence
          </h2>
          <div className="h-px w-full bg-iguana/60 mb-7" />
          <p className="text-[14px] md:text-[15px] leading-[1.7] text-graphite font-light mb-5">
            TLC proudly collaborates with Milind Soman, our brand ambassador and a living testament to longevity. At 60, his Ironman achievements and unwavering vitality exemplify what's possible when biology meets dedication.
          </p>
          <p className="text-[14px] md:text-[15px] leading-[1.7] text-graphite font-light">
            At TLC, we believe longevity must lead the future of healthcare — where preventive and functional medicine replace reactive treatment. Together with Milind, we're redefining aging — proving that optimal health isn't just achievable. It's sustainable, measurable, and transformative.
          </p>
        </div>
      </div>
    </section>
  )
}

// ----- Section 14 — OUR PROGRAMMES -------------------------------------------
function OurProgrammes() {
  const PROGRAMMES = [
    { n: '01', title: 'Metabolic & Weight Loss', dur: '3 months', mrp: '₹45,000', tone: 'rust' as const,
      blurb: 'A precision reset for metabolic health — diagnostics-led, physician-guided weight loss that addresses biological drivers, not just behaviour.' },
    { n: '02', title: 'Gut & Metabolic', dur: '4 months', mrp: '₹80,000', tone: 'iguana' as const,
      blurb: 'Whole-genomic gut microbiome restoration paired with metabolic correction — the gut–metabolism axis treated together over six months.' },
    { n: '03', title: 'Longevity Plus', dur: '12 months', mrp: '₹1,80,000+', tone: 'green' as const,
      blurb: 'Our flagship 12-month transformation. Three biological age clocks, 323 genes, GrimAge + PhenoAge, whole-genomic gut sequencing — every pillar of aging.' },
    { n: '04', title: 'Advanced Metabolomics', dur: '—', mrp: '₹75,000', tone: 'rust' as const,
      blurb: 'Thousands of metabolites analysed — sub-clinical dysfunction revealed long before standard panels flag concern. The deepest diagnostic lens.' },
    { n: '05', title: 'Diabetes / Fatty Liver Reversal', dur: '—', mrp: '₹45,000', tone: 'iguana' as const,
      blurb: 'Root-cause precision medicine for prediabetes, type 2 diabetes, and NAFLD. Reversal pathway, not symptomatic management.' },
    { n: '06', title: 'PCOD Correction', dur: '—', mrp: '₹45,000', tone: 'green' as const,
      blurb: 'Multi-system restoration — metabolic, hormonal, and microbiome correction together. The most comprehensive PCOD program in India.' },
  ]

  const toneClasses = {
    rust: { tab: 'bg-rust', text: 'text-white' },
    iguana: { tab: 'bg-iguana', text: 'text-white' },
    green: { tab: 'bg-green', text: 'text-white' },
  }

  return (
    <section id="programmes" className="bg-rust text-white px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-12 md:mb-14">
          <div className="text-[10.5px] tracking-[0.32em] uppercase text-white/70 font-semibold mb-3">
            Our Programmes
          </div>
          <h2 className="font-display font-bold text-[34px] md:text-[48px] lg:text-[56px] leading-[1.05] tracking-[-0.025em] mb-4">
            Six Programmes. One Foundation.
          </h2>
          <p className="text-[15px] md:text-[16px] text-white/80 leading-[1.65] font-light max-w-[600px]">
            Whichever season of life you're in, there is a programme here that was built for you — physician-led, diagnostics-rooted, and continuously refined.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {PROGRAMMES.map((p) => {
            const c = toneClasses[p.tone]
            return (
              <a
                key={p.n}
                href="#contact"
                data-cursor="hover"
                className="group bg-white text-ink rounded-[18px] overflow-hidden flex flex-col shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-transform duration-500"
              >
                <div className={`${c.tab} ${c.text} px-5 py-3 flex items-center justify-between`}>
                  <span className="text-[10px] tracking-[0.28em] uppercase font-semibold tabular-nums">{p.n}</span>
                  <span className="text-[10px] tracking-[0.22em] uppercase font-semibold opacity-90">{p.dur}</span>
                </div>
                <div className="px-6 py-6 flex-1 flex flex-col">
                  <h3 className="font-display font-bold text-[20px] md:text-[22px] leading-[1.15] tracking-[-0.015em] text-ink mb-3">
                    {p.title}
                  </h3>
                  <p className="text-[13.5px] leading-[1.6] text-graphite font-light mb-6 flex-1">
                    {p.blurb}
                  </p>
                  <div className="pt-4 border-t border-mist flex items-center justify-between">
                    <div>
                      <div className="text-[9.5px] tracking-[0.28em] uppercase text-stone font-semibold">From</div>
                      <div className="font-display font-bold text-[18px] tracking-tight text-rust">{p.mrp}</div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.22em] uppercase text-ink font-semibold group-hover:text-rust transition-colors">
                      Explore <span aria-hidden>→</span>
                    </span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ----- Section 15 — FINAL CTA / CONTACT --------------------------------------
function FinalContact() {
  return (
    <section id="contact" className="grid md:grid-cols-2" style={{ backgroundColor: '#EDE5D6' }}>
      {/* LEFT — tagline + brand */}
      <div className="px-6 md:px-12 lg:px-14 py-16 md:py-24 flex items-center">
        <div className="max-w-[520px]">
          <div className="mb-10">
            <div className="font-display font-bold text-[26px] tracking-[0.18em] text-rust mb-1">TLC</div>
            <div className="text-[11px] tracking-[0.4em] uppercase text-graphite font-medium">The Longevity Centre</div>
            <div className="text-[10.5px] tracking-[0.32em] uppercase text-graphite/70 font-medium mt-1">Precision Longevity Medicine</div>
          </div>
          <div className="h-px w-full bg-iguana/60 mb-8" />
          <h2 className="font-display font-bold text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.025em] text-rust mb-5">
            Your Biology Has a Story.<br />We Help You Rewrite It.
          </h2>
          <p className="text-[14px] md:text-[15px] leading-[1.65] text-graphite font-light">
            Whether you are managing a diagnosis, optimising your health, or simply refusing to accept the default pace of aging — there is a programme here that was built for you.
          </p>
        </div>
      </div>

      {/* RIGHT — clinic photo + contact */}
      <div className="relative overflow-hidden bg-green min-h-[400px] md:min-h-full">
        <img
          src="/tlc-demo/page-back-cover.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          style={{ objectPosition: 'right center' }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(50,60,49,0.4) 0%, rgba(50,60,49,0.85) 100%)' }}
        />
        <div className="relative z-10 px-6 md:px-12 lg:px-14 py-16 md:py-24 text-white min-h-[400px] md:min-h-full flex flex-col justify-center">
          <div className="text-[10.5px] tracking-[0.32em] uppercase text-iguana-soft font-semibold mb-3">
            Our Clinics
          </div>
          <div className="text-[15px] md:text-[16px] tracking-[0.18em] uppercase text-white/90 font-medium mb-10">
            Delhi · Gurugram · Pune · Mumbai · Goa · Bengaluru
          </div>

          <div className="h-px w-24 bg-white/40 mb-8" />

          <h3 className="font-display font-bold text-[22px] md:text-[28px] mb-7 leading-[1.15] tracking-[-0.015em]">
            Book your initial consultation today.
          </h3>

          <div className="space-y-3.5">
            <div>
              <div className="text-[10.5px] tracking-[0.28em] uppercase text-iguana-soft font-semibold mb-0.5">Phone</div>
              <a href="tel:+911140844840" className="text-[15px] md:text-[16px] text-white hover:text-iguana-soft transition-colors">+91 11408 44840</a>
            </div>
            <div>
              <div className="text-[10.5px] tracking-[0.28em] uppercase text-iguana-soft font-semibold mb-0.5">Email</div>
              <a href="mailto:info@thelongevitycentre.co" className="text-[15px] md:text-[16px] text-white hover:text-iguana-soft transition-colors">info@thelongevitycentre.co</a>
            </div>
            <div>
              <div className="text-[10.5px] tracking-[0.28em] uppercase text-iguana-soft font-semibold mb-0.5">Website</div>
              <a href="/" className="text-[15px] md:text-[16px] text-white hover:text-iguana-soft transition-colors">www.thelongevitycentre.co</a>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#" data-cursor="hover" className="inline-flex items-center gap-2.5 pl-5 pr-6 py-3.5 bg-white text-ink rounded-full text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-rust hover:text-white transition-colors duration-500">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
              </span>
              Book Consultation
              <span aria-hidden>→</span>
            </a>
            <a href="https://wa.me/918826809123" data-cursor="hover" className="inline-flex items-center gap-2 px-5 py-3.5 border border-white/30 text-white rounded-full text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-white/10 transition-colors duration-500">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// PAGE COMPOSITION
// ============================================================================
export function DemoHomePage() {
  useDocumentMeta({
    title: 'TLC — Precision Longevity Medicine · Demo',
    description:
      "TLC — The Longevity Centre. India's first doctor-led personalised longevity program. Diagnostics-led, physician-guided, and continuously refined.",
    path: '/demo',
  })

  return (
    <>
      <HeroCover />
      <WhoWeAre />
      <CellularAging />
      <WhyLongevityMedicine />
      <FoundersWord />
      <MissionPhilosophy />
      <OurTeam />
      <Diagnostics />
      <BioAgeClocks />
      <EuropeanPartnership />
      <TlcApp />
      <Testimonials />
      <BrandAmbassador />
      <OurProgrammes />
      <FinalContact />
    </>
  )
}
