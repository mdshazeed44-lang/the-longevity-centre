// DemoHomePage — TLC web-native homepage at /demo.
// Original / homepage untouched.
//
// Brief: capture the BRAND LANGUAGE of the official TLC brochure
// (palette, typography, mood, photography) but design WEB-NATIVE sections.
// Brochure pages are print magazine layouts; one-to-one translation
// produces clutter. This version takes only the language and arranges
// it into a confident editorial flow.
//
// References: Loro Piana, Aesop, Hermès, Forward Health.
//
// Section flow (story arc):
//   01  HERO          — Single bold provocation
//   02  MANIFESTO     — Full-bleed dark conviction band
//   03  CLOCKS        — Three biological age clocks, type-led stat moment
//   04  DIAGNOSTICS   — Large interactive accordion explorer
//   05  PROGRAMS      — Six programs as a horizontal editorial deck
//   06  METHOD        — Three principles, sticky reveal
//   07  THE TLC APP   — Full-bleed dark moment with phone
//   08  TESTIMONIALS  — Six patient stories with verified outcomes
//   09  TEAM          — Nine doctors as an elegant grid
//   10  AMBASSADOR    — Single cinematic Milind Soman moment
//   11  FINAL CTA     — Minimal closing invitation

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'
import { useDocumentMeta } from '../lib/seo'

gsap.registerPlugin(ScrollTrigger)

// =============================================================================
// SECTION 01 — HERO
// =============================================================================
// One image. One thin oversized headline. One eyebrow. One locations strip.
// Letterspacing-opening tagline reveal (Loro Piana signature).
// =============================================================================

function Hero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    const el = root.current
    if (!el) return

    gsap.set(el.querySelectorAll('.hero-fade'), { opacity: 0, y: 16 })
    gsap.set(el.querySelectorAll('.hero-letter'), {
      opacity: 0,
      letterSpacing: '0.08em',
    })
    gsap.set(el.querySelectorAll('.hero-line > span'), { yPercent: 110 })

    const tl = gsap.timeline({ delay: 0.45 })
    tl.to(el.querySelectorAll('.hero-fade.eyebrow'), {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
    })
      .to(
        el.querySelectorAll('.hero-line > span'),
        { yPercent: 0, duration: 1.4, ease: 'expo.out', stagger: 0.1 },
        '-=0.4'
      )
      .to(
        el.querySelectorAll('.hero-letter'),
        {
          opacity: 1,
          letterSpacing: '0.46em',
          duration: 1.6,
          ease: 'expo.out',
          stagger: 0.018,
        },
        '-=0.6'
      )
      .to(
        el.querySelectorAll('.hero-fade.locations'),
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.9'
      )
      .to(
        el.querySelectorAll('.hero-fade.cta'),
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        },
        '-=0.7'
      )
  }, [])

  const TAGLINE = 'PRECISION LONGEVITY MEDICINE'

  return (
    <section
      ref={root}
      className="relative min-h-[100vh] w-full overflow-hidden flex items-center justify-center text-ink"
      style={{ backgroundColor: '#EAE0CC' }}
    >
      {/* Cinematic cover sculpture — full bleed, no overlay clutter */}
      <img
        src="/tlc-demo/page-cover.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center' }}
      />
      {/* Soft warm vignette + bottom fade so type rests on imagery */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(234,224,204,0) 30%, rgba(234,224,204,0.45) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            'linear-gradient(180deg, rgba(234,224,204,0) 0%, rgba(234,224,204,0.85) 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-32 md:py-36 flex flex-col items-center text-center">
        {/* Tiny eyebrow — Loro-Piana letter-tracked */}
        <div className="hero-fade eyebrow mb-12 md:mb-16 flex justify-center overflow-hidden">
          {Array.from(TAGLINE).map((c, i) => (
            <span
              key={i}
              className="hero-letter inline-block text-[10px] md:text-[11px] uppercase text-graphite font-medium"
              style={{ willChange: 'opacity, letter-spacing' }}
            >
              {c === ' ' ? ' ' : c}
            </span>
          ))}
        </div>

        {/* MASSIVE THIN HEADLINE — confident, restrained */}
        <h1 className="font-display text-ink mb-12 md:mb-14 leading-[0.96] tracking-[-0.04em]">
          <span className="block text-[44px] sm:text-[68px] md:text-[92px] xl:text-[120px] font-light">
            <span className="hero-line inline-block overflow-hidden align-bottom">
              <span className="inline-block">Age Is A Number.</span>
            </span>
          </span>
          <span className="block text-[28px] sm:text-[40px] md:text-[56px] xl:text-[72px] font-bold mt-2 md:mt-4 text-rust">
            <span className="hero-line inline-block overflow-hidden align-bottom">
              <span className="inline-block">Your biology doesn't have to be.</span>
            </span>
          </span>
        </h1>

        {/* Sub eyebrow */}
        <div className="hero-fade locations text-center mb-10 md:mb-14">
          <span className="text-[10px] md:text-[11px] tracking-[0.42em] uppercase text-graphite/85 font-medium">
            India's First Doctor-Led Personalised Longevity Programme
          </span>
        </div>

        {/* Locations as a thin elegant strip */}
        <div className="hero-fade locations text-center mb-14 md:mb-16">
          <div className="text-[11px] md:text-[12px] tracking-[0.4em] uppercase text-graphite/70 font-medium">
            Delhi <span className="mx-2 text-rust">·</span> Gurugram{' '}
            <span className="mx-2 text-rust">·</span> Pune{' '}
            <span className="mx-2 text-rust">·</span> Mumbai{' '}
            <span className="mx-2 text-rust">·</span> Goa{' '}
            <span className="mx-2 text-rust">·</span> Bengaluru
          </div>
        </div>

        {/* CTAs — minimal pair */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#contact"
            data-cursor="hover"
            className="hero-fade cta group inline-flex items-center gap-3 pl-6 pr-7 py-4 bg-ink text-white rounded-full text-[11.5px] tracking-[0.22em] uppercase font-semibold hover:bg-rust transition-colors duration-700"
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full rounded-full bg-rust-soft opacity-70 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rust-soft" />
            </span>
            Begin Your Journey
            <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="#programs"
            data-cursor="hover"
            className="hero-fade cta inline-flex items-center gap-2 px-6 py-4 text-ink rounded-full text-[11.5px] tracking-[0.22em] uppercase font-semibold border border-ink/15 hover:bg-ink hover:text-white transition-colors duration-700"
          >
            Explore Programmes
          </a>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// SECTION 02 — MANIFESTO
// =============================================================================
// Single dark band. One conviction. No images. Pure type.
// =============================================================================

function Manifesto() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    if (reduceMotion()) return
    const el = root.current
    if (!el) return
    const lines = el.querySelectorAll<HTMLElement>('.line-mask > span')
    gsap.set(lines, { yPercent: 110 })
    gsap.to(lines, {
      yPercent: 0,
      duration: 1.4,
      ease: 'expo.out',
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })
    const fade = el.querySelectorAll<HTMLElement>('.fade-up')
    gsap.set(fade, { opacity: 0, y: 16 })
    gsap.to(fade, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 70%' },
    })
  }, [])

  return (
    <section
      ref={root}
      className="relative bg-green text-white py-32 md:py-44 px-6 md:px-12 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(800px 600px at 80% 20%, rgba(178,122,123,0.12), transparent 60%), radial-gradient(700px 500px at 0% 80%, rgba(161,155,123,0.08), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[1180px] mx-auto">
        <div className="fade-up text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust-soft font-semibold mb-10 md:mb-12 text-center">
          — Our Conviction —
        </div>

        <h2 className="font-display font-light text-center leading-[1.05] tracking-[-0.03em] mb-14 md:mb-20">
          <span className="block text-[40px] sm:text-[58px] md:text-[78px] xl:text-[92px]">
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block">Treat the biology.</span>
            </span>
          </span>
          <span className="block text-[40px] sm:text-[58px] md:text-[78px] xl:text-[92px] font-bold text-rust-soft">
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block">Not the symptom.</span>
            </span>
          </span>
        </h2>

        <div className="fade-up max-w-[640px] mx-auto text-center">
          <p className="text-[15px] md:text-[17px] leading-[1.75] text-white/80 font-light">
            Modern medicine waits for disease to declare itself. The biology of illness, however, begins years — sometimes decades — earlier. We meet you in those years, before the diagnosis, when the trajectory can still be read, understood, and changed.
          </p>
          <div className="h-px w-16 bg-rust-soft mx-auto mt-12" />
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// SECTION 03 — THE THREE BIOLOGICAL AGE CLOCKS
// =============================================================================
// Type-led stat moment. Three big numerals + small descriptions.
// Counter animation on scroll.
// =============================================================================

function Clocks() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    const el = root.current
    if (!el) return
    const fade = el.querySelectorAll<HTMLElement>('.fade-up')
    gsap.set(fade, { opacity: 0, y: 24 })
    gsap.to(fade, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.12,
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })
    const numbers = el.querySelectorAll<HTMLElement>('.clock-num')
    numbers.forEach((n) => {
      const target = parseInt(n.dataset.target || '0', 10)
      const obj = { v: 0 }
      gsap.to(obj, {
        v: target,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 70%' },
        onUpdate: () => {
          n.textContent = String(Math.round(obj.v))
        },
      })
    })
  }, [])

  const CLOCKS = [
    {
      tag: 'Blood Biological Age',
      n: 160,
      suffix: '+',
      label: 'biomarkers',
      body: 'Comprehensive metabolic, hormonal, inflammatory, and organ-function blood panel — the functional age of your systemic health.',
    },
    {
      tag: 'Epigenetic Age',
      n: 9,
      suffix: 'M',
      label: 'base pairs',
      body: 'GrimAge + PhenoAge methylation analysis — the most validated predictor of healthspan and lifespan in clinical medicine.',
    },
    {
      tag: 'Gut Age',
      n: 38,
      suffix: 'T',
      label: 'microbes',
      body: 'Whole-genomic sequencing of every microbial species — gut age is an independent predictor of systemic inflammation and immunity.',
    },
  ]

  return (
    <section
      ref={root}
      className="py-24 md:py-36 px-6 md:px-12"
      style={{ backgroundColor: '#EAE0CC' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="fade-up text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold mb-6">
            Three Biological Age Clocks
          </div>
          <h2 className="fade-up font-display font-light text-[34px] md:text-[52px] xl:text-[64px] leading-[1.05] tracking-[-0.03em] text-ink max-w-[820px] mx-auto">
            Chronological age is fixed.
            <br />
            <span className="font-bold text-rust">Biological age is not.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mt-20">
          {CLOCKS.map((c, i) => (
            <div key={c.tag} className="fade-up text-center md:text-left">
              <div className="text-[10px] tracking-[0.32em] uppercase text-rust/70 font-semibold tabular-nums mb-4">
                0{i + 1}
              </div>
              <div className="font-display font-light text-[80px] md:text-[100px] xl:text-[120px] leading-[0.9] tracking-[-0.05em] text-ink tabular-nums">
                <span className="clock-num" data-target={c.n}>0</span>
                <span className="text-rust">{c.suffix}</span>
              </div>
              <div className="text-[11px] tracking-[0.32em] uppercase text-graphite/70 font-medium mt-1 mb-6">
                {c.label}
              </div>
              <div className="font-display font-bold text-[18px] md:text-[20px] tracking-tight text-ink mb-3">
                {c.tag}
              </div>
              <p className="text-[14px] md:text-[14.5px] leading-[1.65] text-graphite font-light max-w-[320px] mx-auto md:mx-0">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// SECTION 04 — DIAGNOSTICS EXPLORER
// =============================================================================
// Elegant accordion. Hidden by default, opens on click (per client brief).
// Cream BG, single moment per row, generous spacing.
// =============================================================================

function Diagnostics() {
  const [open, setOpen] = useState<number | null>(0)
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    const el = root.current
    if (!el) return
    const fade = el.querySelectorAll<HTMLElement>('.fade-up')
    gsap.set(fade, { opacity: 0, y: 20 })
    gsap.to(fade, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'expo.out',
      stagger: 0.05,
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })
  }, [])

  const D = [
    {
      n: '01',
      title: 'Blood Biomarkers',
      tag: '160+ Markers · Home Collection',
      body: 'A comprehensive panel spanning metabolic health, hormonal balance, inflammation, cardiovascular risk, and organ function. The most complete baseline picture of your internal biology.',
    },
    {
      n: '02',
      title: 'Body Composition Analysis',
      tag: 'BCA · Segmental Mapping',
      body: 'Fat mass, lean muscle, visceral fat, and hydration measured at the segmental level. Tracked progressively across your programme — your body\'s true composition, mapped over time.',
    },
    {
      n: '03',
      title: 'Oligoscan — Cell Scan',
      tag: 'Spectrophotometric · No Needle',
      body: 'A non-invasive scan measuring intracellular mineral concentrations and heavy metal burden in real time. Reveals cellular-level deficiencies and toxicities that standard panels miss entirely.',
    },
    {
      n: '04',
      title: 'Epigenetic Age',
      tag: 'GrimAge + PhenoAge',
      body: 'DNA methylation analysed across 9 million base pairs using the gold-standard GrimAge clock — the most accurate predictor of biological age and mortality risk in clinical medicine.',
    },
    {
      n: '05',
      title: 'Genetic Testing',
      tag: '323 Genes & SNPs',
      body: 'Your permanent genetic blueprint — 323 genes governing metabolism, hormonal pathways, cardiovascular risk, and longevity. Most clinics test fewer than 99. We test the full picture.',
    },
    {
      n: '06',
      title: 'Gut Microbiome',
      tag: 'Whole Genomic Sequencing',
      body: 'Every microbial species mapped — diversity index, compromised pathways, imbalanced species, inflammation markers. Most clinics use partial 16S rRNA. We do the complete genomic read.',
    },
  ]

  return (
    <section
      ref={root}
      id="diagnostics"
      className="py-24 md:py-36 px-6 md:px-12"
      style={{ backgroundColor: '#EAE0CC' }}
    >
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="fade-up text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold mb-6">
            — Our Diagnostics —
          </div>
          <h2 className="fade-up font-display font-light text-[34px] md:text-[52px] xl:text-[64px] leading-[1.05] tracking-[-0.03em] text-ink max-w-[820px] mx-auto">
            We don't just test.
            <br />
            <span className="font-bold text-rust">We decode your biology.</span>
          </h2>
          <p className="fade-up text-[14px] md:text-[15px] text-graphite font-light leading-[1.7] max-w-[540px] mx-auto mt-8">
            Six diagnostic domains, used together — to give you a picture of your health that standard medicine cannot access.
          </p>
        </div>

        {/* Elegant accordion list */}
        <div className="border-t border-ink/12">
          {D.map((d, i) => {
            const isOpen = open === i
            return (
              <div key={d.n} className="fade-up border-b border-ink/12">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group w-full flex items-baseline justify-between gap-6 py-7 md:py-9 text-left hover:opacity-80 transition-opacity duration-500"
                >
                  <div className="flex items-baseline gap-6 md:gap-10 flex-1 min-w-0">
                    <span className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-rust font-semibold tabular-nums shrink-0">
                      {d.n}
                    </span>
                    <h3 className="font-display font-light text-[24px] sm:text-[32px] md:text-[42px] tracking-[-0.025em] text-ink leading-none">
                      {d.title}
                    </h3>
                  </div>
                  <span
                    aria-hidden
                    className={`text-[24px] md:text-[28px] leading-none text-rust transition-transform duration-700 shrink-0 ${
                      isOpen ? 'rotate-45' : 'rotate-0'
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="pb-9 md:pb-12 pl-[60px] md:pl-[120px] pr-12 max-w-[840px]">
                      <div className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-rust/70 font-semibold mb-4">
                        {d.tag}
                      </div>
                      <p className="text-[15px] md:text-[16px] leading-[1.7] text-graphite font-light">
                        {d.body}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Lab partnership callout */}
        <div className="fade-up mt-20 md:mt-24 max-w-[680px] mx-auto text-center">
          <div className="text-[10px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold mb-4">
            European Partnership
          </div>
          <p className="font-display font-light text-[20px] md:text-[26px] leading-[1.4] tracking-[-0.015em] text-ink">
            Our most advanced diagnostics are processed at a specialist laboratory in <span className="font-bold">the Netherlands</span> — gold-standard testing delivered from one of Europe's foremost centres for genomic and epigenomic science.
          </p>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// SECTION 05 — PROGRAMMES (six)
// =============================================================================
// Editorial cards in a 2x3 grid. Generous breathing room. Each card big.
// Pricing visible.
// =============================================================================

function Programmes() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    const el = root.current
    if (!el) return
    const cards = el.querySelectorAll<HTMLElement>('.prog-card')
    gsap.set(cards, { opacity: 0, y: 30 })
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })
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

  const P = [
    { n: '01', title: 'Metabolic & Weight Loss', dur: '3 months', mrp: '₹45,000', accent: 'rust',
      body: 'A precision reset for metabolic health. Diagnostics-led, physician-guided weight transformation that addresses biological drivers — not behaviour alone.' },
    { n: '02', title: 'Gut & Metabolic', dur: '4 months', mrp: '₹80,000', accent: 'iguana',
      body: 'Whole-genomic gut microbiome restoration paired with metabolic correction. The gut–metabolism axis treated together over six months.' },
    { n: '03', title: 'Longevity Plus', dur: '12 months', mrp: '₹1,80,000', accent: 'green',
      body: 'Our flagship 12-month transformation. Three biological age clocks, 323 genes, GrimAge + PhenoAge, whole-genomic gut sequencing — every pillar of aging.' },
    { n: '04', title: 'Advanced Metabolomics', dur: 'Bespoke', mrp: '₹75,000', accent: 'rust',
      body: 'Thousands of metabolites analysed — sub-clinical dysfunction revealed long before standard panels flag concern. The deepest diagnostic lens.' },
    { n: '05', title: 'Diabetes / Fatty Liver Reversal', dur: '6 months', mrp: '₹45,000', accent: 'iguana',
      body: 'Root-cause precision medicine for prediabetes, type 2 diabetes, and NAFLD. Reversal pathway — not symptomatic management.' },
    { n: '06', title: 'PCOD Correction', dur: '6 months', mrp: '₹45,000', accent: 'green',
      body: 'Multi-system restoration — metabolic, hormonal, and microbiome correction together. The most comprehensive PCOD programme in India.' },
  ]

  const accentClass = (a: string) => {
    if (a === 'rust') return 'text-rust'
    if (a === 'iguana') return 'text-iguana'
    return 'text-green'
  }
  const accentLine = (a: string) => {
    if (a === 'rust') return 'bg-rust'
    if (a === 'iguana') return 'bg-iguana'
    return 'bg-green'
  }

  return (
    <section
      ref={root}
      id="programs"
      className="py-24 md:py-36 px-6 md:px-12 bg-white"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold mb-6">
            — Six Programmes —
          </div>
          <h2 className="font-display font-light text-[34px] md:text-[52px] xl:text-[64px] leading-[1.05] tracking-[-0.03em] text-ink max-w-[820px] mx-auto">
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block">One foundation.</span>
            </span>{' '}
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block font-bold text-rust">Six pathways.</span>
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10">
          {P.map((p) => (
            <a
              key={p.n}
              href="#contact"
              data-cursor="hover"
              className="prog-card group relative bg-white p-8 md:p-10 flex flex-col min-h-[340px] hover:bg-[#EAE0CC] transition-colors duration-700"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className={`text-[11px] tracking-[0.32em] uppercase font-semibold tabular-nums ${accentClass(p.accent)}`}>
                  {p.n}
                </span>
                <span className="text-[10px] tracking-[0.28em] uppercase text-graphite/60 font-medium">
                  {p.dur}
                </span>
              </div>

              <h3 className="font-display font-light text-[24px] md:text-[28px] leading-[1.15] tracking-[-0.02em] text-ink mb-4">
                {p.title}
              </h3>
              <span aria-hidden className={`block h-px w-10 ${accentLine(p.accent)} mb-5`} />
              <p className="text-[14px] leading-[1.65] text-graphite font-light mb-auto">
                {p.body}
              </p>

              <div className="flex items-end justify-between mt-8 pt-6 border-t border-ink/10">
                <div>
                  <div className="text-[9.5px] tracking-[0.32em] uppercase text-graphite/60 font-semibold mb-1">From</div>
                  <div className={`font-display font-bold text-[22px] tracking-tight ${accentClass(p.accent)}`}>{p.mrp}</div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10.5px] tracking-[0.28em] uppercase text-ink font-semibold group-hover:text-rust transition-colors duration-500">
                  Explore <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// SECTION 06 — METHOD (3 principles)
// =============================================================================
// Vertical scroll-revealed list, sticky number indicator on the side.
// =============================================================================

function Method() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    const el = root.current
    if (!el) return
    const items = el.querySelectorAll<HTMLElement>('.method-item')
    gsap.set(items, { opacity: 0, x: -20 })
    items.forEach((item) => {
      gsap.to(item, {
        opacity: 1,
        x: 0,
        duration: 1.0,
        ease: 'expo.out',
        scrollTrigger: { trigger: item, start: 'top 80%' },
      })
    })
  }, [])

  const PRINCIPLES = [
    { n: '01', title: 'Measure first.', body: 'Nothing is assumed. Everything is tested — across genetic, epigenetic, cellular, gut, and metabolic levels — before a single recommendation is made.' },
    { n: '02', title: 'Personalise completely.', body: 'Your biology is unlike anyone else\'s. Your diagnostics, protocol, nutrition, and tracking are built entirely around you — never a template.' },
    { n: '03', title: 'Optimise continuously.', body: 'Longevity is a practice, not a destination. Your programme evolves with your data — refined at every visit, tracked every day.' },
  ]

  return (
    <section
      ref={root}
      className="py-24 md:py-36 px-6 md:px-12 bg-ink text-white"
    >
      <div className="max-w-[1180px] mx-auto">
        <div className="mb-20 md:mb-24 max-w-[760px]">
          <div className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust-soft font-semibold mb-6">
            — The TLC Method —
          </div>
          <h2 className="font-display font-light text-[34px] md:text-[56px] xl:text-[68px] leading-[1.05] tracking-[-0.03em]">
            Three principles.
            <br />
            <span className="font-bold text-rust-soft">One discipline.</span>
          </h2>
        </div>

        <div className="space-y-16 md:space-y-24">
          {PRINCIPLES.map((p) => (
            <div key={p.n} className="method-item grid md:grid-cols-[140px_1fr] gap-6 md:gap-12 items-baseline">
              <div className="text-[11px] tracking-[0.42em] uppercase text-rust-soft font-semibold tabular-nums">
                {p.n}
              </div>
              <div className="max-w-[680px]">
                <h3 className="font-display font-light text-[28px] md:text-[44px] xl:text-[56px] leading-[1.1] tracking-[-0.025em] text-white mb-5">
                  {p.title}
                </h3>
                <p className="text-[15px] md:text-[16px] leading-[1.7] text-white/70 font-light">
                  {p.body}
                </p>
                <div className="h-px w-full bg-white/15 mt-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// SECTION 07 — THE TLC APP
// =============================================================================
// Full-bleed dark moment. Phone mockup. Generous space. One callout.
// =============================================================================

function TlcApp() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    const el = root.current
    if (!el) return
    const fade = el.querySelectorAll<HTMLElement>('.fade-up')
    gsap.set(fade, { opacity: 0, y: 20 })
    gsap.to(fade, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'expo.out',
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })
    gsap.fromTo(
      el.querySelector('.phone'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 75%' },
      }
    )
  }, [])

  return (
    <section
      ref={root}
      className="relative py-28 md:py-40 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: '#1A1F1A' }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(900px 700px at 70% 50%, rgba(178,122,123,0.18), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-20 items-center">
        <div className="text-white">
          <div className="fade-up text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust-soft font-semibold mb-6">
            The TLC App
          </div>
          <h2 className="fade-up font-display font-light text-[36px] md:text-[56px] xl:text-[68px] leading-[1.05] tracking-[-0.03em] mb-10">
            Your biology.
            <br />
            <span className="font-bold">Tracked. Decoded. Optimised.</span>
          </h2>
          <p className="fade-up text-[15px] md:text-[16px] leading-[1.75] text-white/75 font-light mb-12 max-w-[460px]">
            Included in every TLC programme — a proprietary longitudinal health intelligence platform. Not a wellness tracker. Your biology, visualised between clinical visits.
          </p>

          <ul className="fade-up space-y-4 max-w-[400px]">
            {[
              'Three biological-age clocks, real-time',
              '1,000+ biomarkers visualised over time',
              'Body composition trends, charted',
              'Every physician recommendation, accessible',
              'Personalised supplements, nutrition, lifestyle',
            ].map((line) => (
              <li key={line} className="flex items-start gap-3 text-[14px] md:text-[15px] leading-[1.6] text-white/85 font-light">
                <span aria-hidden className="block w-4 h-px bg-rust-soft mt-2.5 shrink-0" />
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="phone relative flex items-center justify-center">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(178,122,123,0.20), transparent 65%)',
              filter: 'blur(40px)',
            }}
          />
          <img
            src="/tlc-demo/tlc-app-mockup.jpg"
            alt="TLC App interface"
            className="relative z-10 w-full max-w-[440px] h-auto object-contain"
          />
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// SECTION 08 — TESTIMONIALS
// =============================================================================
// 6 patient stories. Type-led, outcome metric front and centre.
// 3-column grid on desktop, stacked on mobile.
// =============================================================================

function Testimonials() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    const el = root.current
    if (!el) return
    const cards = el.querySelectorAll<HTMLElement>('.test-card')
    gsap.set(cards, { opacity: 0, y: 24 })
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })
  }, [])

  const T = [
    { id: 'shaun', name: 'Shaun Gomez', programme: 'Advanced Metabolic',
      metric: '−15 kg', metricLabel: 'In programme',
      quote: 'I reduced my weight from 87 kg to 72 kg. Beyond weight loss, I feel more focused and active. The personalised approach made it sustainable.' },
    { id: 'abhinav-s', name: 'Abhinav Saxena', programme: 'Longevity Plus',
      metric: '−14 kg', metricLabel: 'Plus liver health',
      quote: 'Lost weight from 85 kg to nearly 71 kg and feel healthier from within. My energy improved, and the guidance helped my liver health too.' },
    { id: 'anand', name: 'Anand Patil', programme: 'Diabetes Reversal',
      metric: '7.4 → 5.7', metricLabel: 'HbA1c, 4 months',
      quote: 'My sugar levels and insulin improved significantly within four months. HbA1c dropped from 7.4 to 5.7 — a big change for me.' },
    { id: 'bhushan', name: 'Bhushan Kamble', programme: 'Metabolic',
      metric: 'Diabetic → Normal', metricLabel: 'Glucose normalised',
      quote: 'I reduced 9–10 kg and my glucose moved from diabetic to normal. The progress came faster than expected — easy to follow long-term.' },
    { id: 'prem', name: 'Prem Pathak', programme: 'Gut & Metabolic',
      metric: '7.8 → 5.7', metricLabel: 'HbA1c, 2 months',
      quote: 'My HbA1c dropped from 7.8 to 5.7 within just two months. I lost weight, feel lighter, and more in control of my health.' },
    { id: 'sadhna', name: 'Sadhna Gupta', programme: 'Diabetes Reversal',
      metric: '170s → 110', metricLabel: 'Fasting glucose',
      quote: "I've had diabetes for years. My fasting dropped from around 170–180 to nearly 110, and my medications have reduced. I feel more energetic." },
  ]

  return (
    <section
      ref={root}
      className="py-24 md:py-36 px-6 md:px-12"
      style={{ backgroundColor: '#EAE0CC' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold mb-6">
            — Patient Outcomes —
          </div>
          <h2 className="font-display font-light text-[34px] md:text-[52px] xl:text-[64px] leading-[1.05] tracking-[-0.03em] text-ink max-w-[820px] mx-auto">
            Verified.
            <br />
            <span className="font-bold text-rust">Measurable.</span>
          </h2>
          <p className="text-[14px] md:text-[15px] text-graphite font-light leading-[1.7] max-w-[520px] mx-auto mt-8">
            Every outcome below is documented through repeat diagnostics — not memory.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10">
          {T.map((t) => (
            <article key={t.id} className="test-card relative bg-white p-8 md:p-10 flex flex-col min-h-[400px]">
              {/* Metric - the headline number */}
              <div className="mb-2">
                <div className="font-display font-light text-[32px] md:text-[40px] leading-[1.0] tracking-[-0.025em] text-rust tabular-nums">
                  {t.metric}
                </div>
                <div className="text-[10px] tracking-[0.32em] uppercase text-graphite/65 font-semibold mt-2">
                  {t.metricLabel}
                </div>
              </div>

              <span aria-hidden className="block h-px w-12 bg-rust/40 my-6" />

              <blockquote className="text-[14.5px] md:text-[15px] leading-[1.7] text-graphite font-light italic mb-auto">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-ink/10">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-mist shrink-0">
                  <img src={`/tlc-demo/test-${t.id}.png`} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="font-display font-bold text-[13.5px] tracking-tight text-ink leading-tight">{t.name}</div>
                  <div className="text-[10px] tracking-[0.22em] uppercase text-graphite/65 font-medium mt-0.5">{t.programme}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// SECTION 09 — TEAM
// =============================================================================
// 9 doctors as a clean editorial grid. Hover reveals credentials.
// =============================================================================

function Team() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    const el = root.current
    if (!el) return
    const cards = el.querySelectorAll<HTMLElement>('.doc-card')
    gsap.set(cards, { opacity: 0, y: 20 })
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.05,
      scrollTrigger: { trigger: el, start: 'top 78%' },
    })
  }, [])

  const TEAM = [
    { key: 'dr-abhinav', name: 'Dr Abhinav Sharma', creds: 'MBBS · MS', role: 'Founder · Director' },
    { key: 'dr-bhavna', name: 'Dr Bhavna Sharma', creds: 'MBBS · MS · IVF Specialist', role: 'Co-Founder · Director' },
    { key: 'dr-karan', name: 'Dr Karan Mane', creds: 'MBBS · MS', role: 'Director' },
    { key: 'dr-rahul', name: 'Dr Rahul Chaube', creds: 'MD Medicine', role: 'Physician & Diabetologist' },
    { key: 'dr-vaibhav', name: 'Dr Vaibhav Bhisikar', creds: 'MBBS · MS · MCh', role: 'Plastic & Hair Surgeon' },
    { key: 'dr-ankit', name: 'Dr Ankit Agrawal', creds: 'MBBS · CPS', role: 'Dermatologist & Trichologist' },
    { key: 'dr-surekha', name: 'Dr Surekha Sawant', creds: '', role: 'Longevity Consultant' },
    { key: 'dr-pooja', name: 'Dr Pooja Dahiya', creds: '', role: 'Longevity Consultant' },
    { key: 'dr-niloufar', name: 'Dr Niloufar Hayat', creds: '', role: 'Longevity Consultant' },
  ]

  return (
    <section
      ref={root}
      className="py-24 md:py-36 px-6 md:px-12 bg-white"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold mb-6">
            — Our Team —
          </div>
          <h2 className="font-display font-light text-[34px] md:text-[52px] xl:text-[64px] leading-[1.05] tracking-[-0.03em] text-ink max-w-[820px] mx-auto">
            Doctors dedicated to
            <br />
            <span className="font-bold text-rust">your longevity.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-x-12 md:gap-y-16">
          {TEAM.map((d) => (
            <div key={d.key} className="doc-card group text-center">
              <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-5 rounded-full overflow-hidden bg-[#EAE0CC] transition-transform duration-700 group-hover:scale-[1.04]">
                <img
                  src={`/tlc-demo/team-${d.key}.png`}
                  alt={d.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-display font-bold text-[14px] md:text-[15px] tracking-tight text-ink mb-1.5">
                {d.name}
              </div>
              {d.creds && (
                <div className="text-[10.5px] tracking-[0.22em] uppercase text-rust font-semibold mb-1">
                  {d.creds}
                </div>
              )}
              <div className="text-[11px] tracking-[0.22em] uppercase text-graphite/70 font-medium">
                {d.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// SECTION 10 — BRAND AMBASSADOR
// =============================================================================
// Cinematic split — single bold Milind moment.
// =============================================================================

function Ambassador() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    const el = root.current
    if (!el) return
    const fade = el.querySelectorAll<HTMLElement>('.fade-up')
    gsap.set(fade, { opacity: 0, y: 20 })
    gsap.to(fade, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'expo.out',
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })
  }, [])

  return (
    <section
      ref={root}
      className="grid md:grid-cols-[1fr_1.1fr] min-h-[80vh]"
      style={{ backgroundColor: '#EAE0CC' }}
    >
      {/* LEFT — Milind portrait, full bleed */}
      <div className="relative overflow-hidden bg-ink min-h-[480px] md:min-h-full">
        <img
          src="/tlc-demo/milind-soman.jpg"
          alt="Milind Soman — Brand Ambassador, The Longevity Centre"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)' }}
        />
        <div className="absolute left-0 right-0 bottom-0 px-6 md:px-10 py-10 md:py-12 text-white">
          <div className="font-display font-bold text-[20px] md:text-[26px] tracking-tight mb-1">Milind Soman</div>
          <div className="text-[10.5px] tracking-[0.32em] uppercase text-rust-soft font-semibold">Brand Ambassador · The Longevity Centre</div>
        </div>
      </div>

      {/* RIGHT — copy */}
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-24 flex items-center">
        <div className="max-w-[520px]">
          <div className="fade-up text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold mb-6">
            — Partnership —
          </div>
          <h2 className="fade-up font-display font-light text-[32px] md:text-[48px] xl:text-[60px] leading-[1.05] tracking-[-0.03em] text-ink mb-10">
            A living testament
            <br />
            <span className="font-bold text-rust">to longevity.</span>
          </h2>
          <p className="fade-up text-[14.5px] md:text-[16px] leading-[1.75] text-graphite font-light mb-5">
            At 60, Milind Soman's Ironman achievements and unwavering vitality exemplify what's possible when biology meets dedication.
          </p>
          <p className="fade-up text-[14.5px] md:text-[16px] leading-[1.75] text-graphite font-light">
            Together, we're redefining aging — proving that optimal health isn't just achievable. It's sustainable, measurable, and transformative.
          </p>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// SECTION 11 — FINAL CTA
// =============================================================================
// Minimal closing. One sentence. One button. Done.
// =============================================================================

function FinalCta() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    const el = root.current
    if (!el) return
    const lines = el.querySelectorAll<HTMLElement>('.line-mask > span')
    gsap.set(lines, { yPercent: 110 })
    gsap.to(lines, {
      yPercent: 0,
      duration: 1.4,
      ease: 'expo.out',
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })
    const fade = el.querySelectorAll<HTMLElement>('.fade-up')
    gsap.set(fade, { opacity: 0, y: 16 })
    gsap.to(fade, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })
  }, [])

  return (
    <section
      ref={root}
      id="contact"
      className="relative py-32 md:py-44 px-6 md:px-12 overflow-hidden bg-ink text-white"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(900px 700px at 50% 30%, rgba(178,122,123,0.18), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[1080px] mx-auto text-center">
        <div className="fade-up text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust-soft font-semibold mb-10 md:mb-14">
          — Begin —
        </div>

        <h2 className="font-display font-light text-[40px] sm:text-[60px] md:text-[80px] xl:text-[100px] leading-[1.0] tracking-[-0.04em] mb-16 md:mb-20">
          <span className="line-mask inline-block overflow-hidden align-bottom">
            <span className="inline-block">Your biology</span>
          </span>{' '}
          <span className="line-mask inline-block overflow-hidden align-bottom">
            <span className="inline-block">has a story.</span>
          </span>
          <br />
          <span className="font-bold text-rust-soft">
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block">We help you rewrite it.</span>
            </span>
          </span>
        </h2>

        <div className="fade-up flex flex-wrap items-center justify-center gap-3 mb-16 md:mb-20">
          <a
            href="tel:+911140844840"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 pl-6 pr-7 py-4 bg-white text-ink rounded-full text-[11.5px] tracking-[0.22em] uppercase font-semibold hover:bg-rust hover:text-white transition-colors duration-700"
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full rounded-full bg-rust opacity-70 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rust" />
            </span>
            Book Initial Consultation
            <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="https://wa.me/918826809123"
            data-cursor="hover"
            className="inline-flex items-center gap-2 px-6 py-4 border border-white/25 text-white rounded-full text-[11.5px] tracking-[0.22em] uppercase font-semibold hover:bg-white/10 transition-colors duration-700"
          >
            WhatsApp
          </a>
        </div>

        <div className="fade-up text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-white/55 font-medium">
          Delhi <span className="mx-2 text-rust-soft">·</span> Gurugram{' '}
          <span className="mx-2 text-rust-soft">·</span> Pune{' '}
          <span className="mx-2 text-rust-soft">·</span> Mumbai{' '}
          <span className="mx-2 text-rust-soft">·</span> Goa{' '}
          <span className="mx-2 text-rust-soft">·</span> Bengaluru
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// PAGE COMPOSITION
// =============================================================================

export function DemoHomePage() {
  useDocumentMeta({
    title: 'TLC — Precision Longevity Medicine · Demo',
    description:
      "TLC — The Longevity Centre. India's first doctor-led personalised longevity programme. Diagnostics-led, physician-guided, continuously refined.",
    path: '/demo',
  })

  return (
    <>
      <Hero />
      <Manifesto />
      <Clocks />
      <Diagnostics />
      <Programmes />
      <Method />
      <TlcApp />
      <Testimonials />
      <Team />
      <Ambassador />
      <FinalCta />
    </>
  )
}
