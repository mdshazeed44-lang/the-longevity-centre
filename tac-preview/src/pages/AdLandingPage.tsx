/**
 * AdLandingPage — high-converting single-page landing for paid ads.
 *
 * Lives at /longevity-programme-india. Designed to maximise lead
 * conversion from Google / Meta ad clicks:
 *   - No site navigation (App.tsx skips <Header/> and <Footer/> on
 *     this route — fewer exits, higher form completion)
 *   - Lead form embedded above the fold AND repeated at the bottom
 *   - Multiple in-page CTAs all anchor-scroll to the same form
 *   - Trust signals (stats, ambassador, founders, press) front-loaded
 *   - Single conversion goal: submit form → LSQ + brochure (same
 *     wiring as the rest of the site)
 *
 * Brand palette matched (cream + rust) but layout is sales-oriented,
 * not editorial.
 */
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useDocumentMeta, breadcrumbList } from '../lib/seo'
import { submitToLeadSquared } from '../lib/leadsquared'
import { openBrochure, BROCHURE_URL, PHONE_TEL, PHONE_DISPLAY } from '../lib/contact'

const META = {
  title: 'Longevity Programme in India · Live Longer, Live Better · TLC',
  description:
    "Doctor-led 12-month longevity programme. 1000+ biomarkers, three biological-age clocks, eight centres across India. Get the e-brochure.",
  path: '/longevity-programme-india',
  ogImage: '/og/home.jpg',
  jsonLd: [
    breadcrumbList([
      { name: 'Home', url: '/' },
      { name: 'Longevity Programme', url: '/longevity-programme-india' },
    ]),
  ],
}

// Four headline stats — used in the trust strip directly below the hero
// and on the final CTA. Same source as the main site (CtaBand stats).
const STATS = [
  { k: '20+ Years', l: 'In Preventive Medicine' },
  { k: '8', l: 'Centres pan-India' },
  { k: '1000+', l: 'Biomarkers per patient' },
  { k: '18,500+', l: 'Successful procedures' },
]

const CITIES = [
  'Delhi',
  'Gurgaon',
  'Mumbai',
  'Pune',
  'Nagpur',
  'Goa',
  'Bangalore',
  'Hyderabad',
  'Other / Online',
]

const PROGRAMMES = [
  'Longevity Programme (Flagship)',
  'Metabolic & Weight Loss',
  'Gut & Metabolic',
  'Diabetes & Fatty Liver Reversal',
  'PCOD Correction',
  'Advanced Metabolomics',
  'Cancer Detection & Prevention',
  'Not sure — advise me',
]

const BENEFITS = [
  {
    h: 'Three validated clocks',
    p: 'Horvath, GrimAge and PhenoAge methylation analysis — your biological age, measured and tracked over 12 months.',
  },
  {
    h: 'Whole-genomic sequencing',
    p: '9 million CpG methylation sites plus full DNA — variants, disease risk, drug response, ancestry.',
  },
  {
    h: 'Gut microbiome mapping',
    p: 'Shotgun sequencing of your gut — bacterial diversity, inflammation markers, food intolerances.',
  },
  {
    h: 'Hormonal optimisation',
    p: 'Thyroid, cortisol, sex hormones, growth markers — corrected and monitored monthly.',
  },
  {
    h: 'Metabolic correction',
    p: 'Weight, insulin resistance, fatty liver, lipid profile — physician-guided protocols, not generic diets.',
  },
  {
    h: 'Continuous physician care',
    p: 'A multidisciplinary panel — not one doctor — that holds your complete biological picture and adjusts as you progress.',
  },
]

const PROCESS = [
  {
    n: '01',
    h: 'Assessment',
    p: 'Blood, genomic, body composition, microbiome and biological-age tests. Complete baseline in one visit.',
  },
  {
    n: '02',
    h: 'Analysis',
    p: 'Your specialist panel reads every marker against your goals and family history.',
  },
  {
    n: '03',
    h: 'Intervention',
    p: 'Personalised protocols — nutrition, supplementation, hormone correction, lifestyle, targeted therapeutics.',
  },
  {
    n: '04',
    h: 'Verification',
    p: 'Re-tested at programme completion. Progress made measurable — not promised.',
  },
]

const FAQ = [
  {
    q: 'Who is the programme for?',
    a: 'Adults 25 and above who want to stay sharp, energetic and disease-free for longer. Whether you have a specific concern (weight, hormones, gut, fatigue) or simply want to optimise — the programme is built around your biology.',
  },
  {
    q: 'How long does it take?',
    a: 'The full programme is 12 months. You can start with a one-off diagnostic panel and decide afterwards — we do not pressure long commitments without data.',
  },
  {
    q: 'Do I have to visit a clinic in person?',
    a: 'Initial assessment happens at one of our 8 centres (Delhi, Gurgaon, Mumbai, Pune, Nagpur, Goa, Bangalore, Hyderabad). Follow-ups can be in-person or online based on your preference.',
  },
  {
    q: 'How is this different from a regular health check-up?',
    a: 'A standard panel tests ~30 markers; ours runs 1000+ across genomics, methylation, microbiome, hormones and metabolism — and pairs each result with a physician-guided intervention plan.',
  },
  {
    q: 'Who runs the clinics?',
    a: 'TLC is co-founded by Dr. Abhinav Sharma (MBBS, MS — 11,000+ surgeries) and Dr. Bhavna Sharma (IVF specialist — 8,000+ pregnancies), with a multidisciplinary panel of longevity physicians, endocrinologists and metabolic specialists.',
  },
  {
    q: 'What about cost?',
    a: 'Programmes start from a one-time diagnostic at ₹50,000 and scale up to the comprehensive 12-month flagship at ₹2.5L. Share your contact details below and our team will send the full pricing brochure.',
  },
]

// ──────────────────────────────────────────────────────────────────────
// FORM
// ──────────────────────────────────────────────────────────────────────

interface FormProps {
  /** Tracking label for LSQ Source so we can tell hero-form vs final-form. */
  variant: 'hero' | 'final'
  /** Optional dark-on-cream vs cream-on-dark theme. */
  theme?: 'light' | 'dark'
}

function LeadForm({ variant, theme = 'light' }: FormProps) {
  const [state, setState] = useState<'idle' | 'submitting' | 'success'>('idle')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')

    const data = new FormData(e.currentTarget)
    if (data.get('botcheck')) {
      setState('success')
      return
    }

    const name = (data.get('name') as string) || ''
    const phone = (data.get('phone') as string) || ''
    const email = (data.get('email') as string) || ''
    const centre = (data.get('centre') as string) || ''
    const programme = (data.get('programme') as string) || ''

    submitToLeadSquared({
      name,
      phone,
      email,
      centre,
      programme,
      source: `Website - Ad LP (${variant})`,
    })
    openBrochure()
    setState('success')
  }

  const isDark = theme === 'dark'
  const inputBase = isDark
    ? 'w-full bg-white/10 border border-white/20 rounded-[10px] px-4 py-3 text-[14px] text-white placeholder:text-white/40 font-light focus:outline-none focus:border-rust-soft focus:ring-2 focus:ring-rust-soft/30 transition-colors'
    : 'w-full bg-white border border-ink/15 rounded-[10px] px-4 py-3 text-[14px] text-ink placeholder:text-ink/35 font-light focus:outline-none focus:border-rust focus:ring-2 focus:ring-rust/20 transition-colors'
  const labelCls = isDark
    ? 'block text-[10px] tracking-[0.3em] uppercase text-white/55 font-semibold mb-1.5'
    : 'block text-[10px] tracking-[0.3em] uppercase text-stone font-semibold mb-1.5'

  if (state === 'success') {
    return (
      <div
        className={`rounded-[16px] p-6 md:p-7 ${isDark ? 'bg-white/10 border border-rust-soft/40' : 'bg-cream border border-rust/30'}`}
      >
        <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-3">
          — Thank you —
        </div>
        <h3
          className={`font-display font-light text-[22px] md:text-[26px] leading-[1.15] mb-3 ${isDark ? 'text-white' : 'text-ink'}`}
        >
          Your brochure is opening now.
        </h3>
        <p
          className={`text-[13.5px] leading-[1.6] font-light mb-5 ${isDark ? 'text-white/70' : 'text-graphite'}`}
        >
          Our medical team will be in touch shortly to schedule your consultation.
          If the brochure tab didn&rsquo;t open, tap below.
        </p>
        <a
          href={BROCHURE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 bg-rust text-white text-[11px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-ink transition-colors duration-500"
        >
          Open Brochure
        </a>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`rounded-[16px] p-6 md:p-7 space-y-3.5 ${isDark ? 'bg-white/[0.06] border border-white/15' : 'bg-cream border border-ink/8 shadow-[0_25px_60px_-30px_rgba(27,26,24,0.25)]'}`}
    >
      <div
        className={`text-[10px] tracking-[0.42em] uppercase font-semibold mb-1 ${isDark ? 'text-rust-soft' : 'text-rust'}`}
      >
        Get your free brochure
      </div>
      <h3
        className={`font-display font-light text-[20px] md:text-[24px] leading-[1.15] tracking-[-0.02em] mb-3 ${isDark ? 'text-white' : 'text-ink'}`}
      >
        Start your longevity journey today.
      </h3>

      {/* Honeypot */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] opacity-0 pointer-events-none"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor={`name-${variant}`} className={labelCls}>
            Full Name *
          </label>
          <input
            id={`name-${variant}`}
            type="text"
            name="name"
            required
            placeholder="e.g. Aanya Sharma"
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor={`phone-${variant}`} className={labelCls}>
            Phone *
          </label>
          <input
            id={`phone-${variant}`}
            type="tel"
            name="phone"
            required
            placeholder="+91 98xxxxxxxx"
            className={inputBase}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`email-${variant}`} className={labelCls}>
          Email
        </label>
        <input
          id={`email-${variant}`}
          type="email"
          name="email"
          placeholder="you@example.com"
          className={inputBase}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor={`city-${variant}`} className={labelCls}>
            Preferred Centre
          </label>
          <select
            id={`city-${variant}`}
            name="centre"
            defaultValue=""
            className={`${inputBase} appearance-none pr-9`}
          >
            <option value="" disabled>
              Select city
            </option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`prog-${variant}`} className={labelCls}>
            Programme
          </label>
          <select
            id={`prog-${variant}`}
            name="programme"
            defaultValue=""
            className={`${inputBase} appearance-none pr-9`}
          >
            <option value="">Select (optional)</option>
            {PROGRAMMES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="group w-full inline-flex items-center justify-center gap-3 pl-5 pr-6 py-4 bg-rust text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-ink transition-colors duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === 'submitting' ? 'Submitting…' : 'Download Brochure'}
        <span
          aria-hidden
          className="inline-block transition-transform duration-500 group-hover:translate-x-1"
        >
          →
        </span>
      </button>

      <p
        className={`text-[10.5px] leading-[1.5] font-light pt-1 ${isDark ? 'text-white/40' : 'text-stone'}`}
      >
        Your details are kept confidential — only used to schedule your
        consultation. No spam, ever.
      </p>
    </form>
  )
}

// ──────────────────────────────────────────────────────────────────────
// PAGE
// ──────────────────────────────────────────────────────────────────────

export function AdLandingPage() {
  useDocumentMeta(META)

  return (
    <div className="bg-cream text-graphite">
      {/* ─── COMPACT TOP BAR — logo + phone only, no nav ─────────────── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-ink/8">
        <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-3.5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-rust flex items-center justify-center">
              <span className="text-white text-[11px] font-bold tracking-tight">TLC</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-[13px] leading-none tracking-[0.04em] text-ink">
                THE LONGEVITY
              </div>
              <div className="font-display text-[13px] leading-none tracking-[0.04em] text-ink">
                CENTRE
              </div>
            </div>
          </a>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${PHONE_TEL}`}
              className="hidden md:inline-flex items-center gap-2 text-[12px] text-graphite font-medium hover:text-rust transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {PHONE_DISPLAY}
            </a>
            <a
              href="#lead-form"
              className="inline-flex items-center gap-2 pl-4 pr-5 py-2.5 bg-ink text-white text-[11px] tracking-tight font-semibold rounded-full hover:bg-rust transition-colors duration-300"
            >
              Get Brochure
            </a>
          </div>
        </div>
      </header>

      {/* ─── HERO — emotional headline + inline form ──────────────────── */}
      <section
        id="lead-form"
        className="relative px-6 md:px-12 pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 600px at 18% 25%, rgba(148,84,85,0.10), transparent 60%), radial-gradient(800px 600px at 85% 80%, rgba(193,141,107,0.10), transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-[1240px] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
          {/* Copy column */}
          <div>
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-rust animate-pulse" />
              <span className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold">
                India&rsquo;s First Doctor-Led Longevity Programme
              </span>
            </div>
            <h1 className="font-display font-light text-[36px] md:text-[56px] xl:text-[68px] leading-[1.02] tracking-[-0.03em] text-ink mb-5">
              Live longer.{' '}
              <span className="font-bold italic text-rust">Live measurably better.</span>
            </h1>
            <p className="text-[15px] md:text-[17px] leading-[1.65] text-graphite font-light max-w-[560px] mb-7">
              A 12-month, doctor-led programme that measures your biology with
              1000+ diagnostics, corrects what&rsquo;s drifting, and verifies
              progress with three validated biological-age clocks.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-7">
              <a
                href="#lead-form"
                className="group inline-flex items-center gap-3 pl-5 pr-7 py-4 bg-ink text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
              >
                Get Free Brochure
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="group inline-flex items-center gap-2.5 text-[12px] text-graphite font-semibold tracking-tight hover:text-rust transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call {PHONE_DISPLAY}
              </a>
            </div>

            {/* Mini trust row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11.5px] text-stone">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rust" />
                <span>20+ Years of Preventive Medicine</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rust" />
                <span>8 Centres Pan-India</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rust" />
                <span>1000+ Biomarkers Tested</span>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div>
            <LeadForm variant="hero" theme="light" />
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ──────────────────────────────────────────────── */}
      <section className="bg-ink text-cream px-6 md:px-12 py-10 md:py-12">
        <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.l}>
              <div className="font-display font-light text-[28px] md:text-[40px] leading-none tracking-[-0.02em] text-rust-soft">
                {s.k}
              </div>
              <div className="mt-2 text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-cream/65 font-semibold">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BRAND AMBASSADOR — MILIND ────────────────────────────────── */}
      <section className="px-6 md:px-12 py-16 md:py-24 bg-cream">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-[0.95fr_1.05fr] gap-10 md:gap-14 items-center">
          <figure className="relative">
            <div className="relative rounded-[16px] overflow-hidden ring-1 ring-ink/10 shadow-[0_35px_75px_-38px_rgba(27,26,24,0.32)] bg-gradient-to-b from-white to-[#efe7dd]">
              <div className="relative aspect-[16/11]">
                <img
                  src="/longevity/milind-skin.webp?v=3"
                  width={1000}
                  height={660}
                  alt="Milind Soman — Brand Ambassador, The Longevity Centre"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-2 bg-rust text-white px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
                  <span className="text-[9.5px] tracking-[0.26em] uppercase font-semibold">
                    Brand Ambassador · TLC
                  </span>
                </div>
              </div>
              <figcaption className="flex items-center gap-3 bg-ink px-5 py-3.5">
                <span aria-hidden className="w-6 h-px bg-rust-soft shrink-0" />
                <div>
                  <div className="font-display italic text-white text-[18px] leading-[1.15]">
                    Milind Soman
                  </div>
                  <div className="text-[9px] tracking-[0.3em] uppercase text-white/55 font-semibold mt-1">
                    Actor · Supermodel · Ironman
                  </div>
                </div>
              </figcaption>
            </div>
          </figure>
          <div>
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-9 h-px bg-rust" />
              <span className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold">
                Our Brand Ambassador
              </span>
            </div>
            <h2 className="font-display font-light text-[30px] md:text-[44px] leading-[1.06] tracking-[-0.025em] text-ink mb-5">
              Age is a number,{' '}
              <span className="font-bold italic text-rust">not a limit.</span>
            </h2>
            <p className="text-[14.5px] md:text-[16px] leading-[1.7] text-graphite font-light max-w-[520px] mb-5">
              At 58, Milind Soman is the clearest proof of what TLC stands for —
              that strength, clarity and vitality are not surrendered to age,
              they are maintained by intention.
            </p>
            <blockquote className="relative pl-5 border-l-2 border-rust">
              <p className="font-display italic text-rust text-[16px] md:text-[19px] leading-[1.45] max-w-[480px]">
                &ldquo;Strength isn&rsquo;t something you lose with age — it&rsquo;s
                something you choose to keep.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS — what's inside the programme ──────────────────── */}
      <section className="px-6 md:px-12 py-16 md:py-24 bg-white">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-9 h-px bg-rust" />
              <span className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold">
                What&rsquo;s Inside The Programme
              </span>
              <span className="w-9 h-px bg-rust" />
            </div>
            <h2 className="font-display font-light text-[32px] md:text-[48px] leading-[1.05] tracking-[-0.025em] text-ink max-w-[820px] mx-auto">
              Measured care.{' '}
              <span className="font-bold italic text-rust">Not guessed care.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {BENEFITS.map((b) => (
              <div
                key={b.h}
                className="bg-cream/50 border border-ink/8 rounded-[18px] p-6 md:p-7 hover:border-rust/40 transition-colors duration-500"
              >
                <h3 className="font-display font-medium text-[18px] md:text-[20px] leading-[1.2] text-ink mb-3">
                  {b.h}
                </h3>
                <p className="text-[13.5px] md:text-[14.5px] leading-[1.65] text-graphite font-light">
                  {b.p}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="#lead-form"
              className="group inline-flex items-center gap-3 pl-5 pr-7 py-4 bg-ink text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
            >
              Download Brochure
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── PROCESS — 4-step how it works ─────────────────────────────── */}
      <section className="px-6 md:px-12 py-16 md:py-24 bg-cream">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-9 h-px bg-rust" />
              <span className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold">
                How It Works
              </span>
              <span className="w-9 h-px bg-rust" />
            </div>
            <h2 className="font-display font-light text-[32px] md:text-[44px] leading-[1.05] tracking-[-0.025em] text-ink max-w-[700px] mx-auto">
              Four phases. <span className="font-bold italic text-rust">One full year.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((s) => (
              <div key={s.n} className="relative">
                <div className="font-display font-light text-[44px] md:text-[56px] leading-none text-rust/30 mb-2">
                  {s.n}
                </div>
                <h3 className="font-display font-medium text-[18px] md:text-[20px] leading-[1.2] text-ink mb-3">
                  {s.h}
                </h3>
                <p className="text-[13.5px] md:text-[14.5px] leading-[1.65] text-graphite font-light">
                  {s.p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOUNDERS ─────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-16 md:py-24 bg-white">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-9 h-px bg-rust" />
              <span className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold">
                Founders
              </span>
              <span className="w-9 h-px bg-rust" />
            </div>
            <h2 className="font-display font-light text-[30px] md:text-[42px] leading-[1.06] tracking-[-0.025em] text-ink max-w-[700px] mx-auto">
              Twenty years of clinical excellence.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 md:gap-14">
            {[
              {
                name: 'Dr. Abhinav Sharma',
                creds: 'MBBS, MS · 11,000+ Surgeries',
                role: 'Co-Founder · Anti-Aging & Preventive Medicine',
                img: '/team/dr-abhinav.jpg?v=2',
              },
              {
                name: 'Dr. Bhavna Sharma',
                creds: 'IVF Specialist · 8,000+ Pregnancies',
                role: 'Co-Founder · Reproductive & Sexual Anti-Aging',
                img: '/team/dr-bhavna-2026.jpg?v=2',
              },
            ].map((f) => (
              <div key={f.name} className="text-center">
                <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-5 rounded-full overflow-hidden ring-1 ring-ink/10 bg-gradient-to-b from-white to-[#efe7dd]">
                  <img
                    src={f.img}
                    width={400}
                    height={400}
                    alt={f.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>
                <h3 className="font-display font-medium text-[20px] md:text-[24px] leading-[1.15] text-ink mb-2">
                  {f.name}
                </h3>
                <div className="text-[11px] tracking-[0.28em] uppercase text-rust font-semibold mb-2">
                  {f.creds}
                </div>
                <p className="text-[13.5px] leading-[1.55] text-graphite font-light max-w-[320px] mx-auto">
                  {f.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-16 md:py-24 bg-cream">
        <div className="max-w-[920px] mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-9 h-px bg-rust" />
              <span className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold">
                Common Questions
              </span>
              <span className="w-9 h-px bg-rust" />
            </div>
            <h2 className="font-display font-light text-[32px] md:text-[42px] leading-[1.05] tracking-[-0.025em] text-ink">
              Answered <span className="font-bold italic text-rust">honestly.</span>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <details
                key={i}
                className="group bg-white border border-ink/10 rounded-[14px] px-5 md:px-7 py-4 md:py-5 hover:border-rust/40 transition-colors duration-300"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                  <h3 className="font-display font-medium text-[15px] md:text-[17px] leading-[1.3] text-ink">
                    {item.q}
                  </h3>
                  <span
                    aria-hidden
                    className="shrink-0 w-7 h-7 rounded-full border border-ink/20 flex items-center justify-center text-rust text-[14px] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[13.5px] md:text-[14.5px] leading-[1.7] text-graphite font-light">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA — dark band with form ──────────────────────────── */}
      <section className="px-6 md:px-12 py-16 md:py-24 bg-ink text-cream overflow-hidden relative">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 600px at 18% 25%, rgba(148,84,85,0.20), transparent 60%), radial-gradient(800px 600px at 85% 80%, rgba(193,141,107,0.10), transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-[1240px] mx-auto grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-9 h-px bg-rust-soft" />
              <span className="text-[10.5px] tracking-[0.42em] uppercase text-rust-soft font-semibold">
                Take The First Step
              </span>
            </div>
            <h2 className="font-display font-light text-[34px] md:text-[52px] leading-[1.02] tracking-[-0.03em] text-cream mb-5">
              Your biology is{' '}
              <span className="font-bold italic text-rust-soft">measurable.</span>
            </h2>
            <p className="text-[15px] md:text-[16px] leading-[1.7] text-cream/65 font-light max-w-[480px] mb-7">
              Share your details and our medical team will be in touch shortly.
              You&rsquo;ll receive the full TLC e-brochure instantly — including
              programme pricing, complete diagnostic list and centre information.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <a
                href={`tel:${PHONE_TEL}`}
                className="group inline-flex items-center gap-2.5 text-[13px] text-cream font-semibold hover:text-rust-soft transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Or call directly · {PHONE_DISPLAY}
              </a>
            </div>
          </div>
          <div>
            <LeadForm variant="final" theme="dark" />
          </div>
        </div>
      </section>

      {/* ─── MINIMAL FOOTER ───────────────────────────────────────────── */}
      <footer className="bg-ink text-cream/60 px-6 md:px-12 py-10 border-t border-cream/10">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-5 text-[11.5px]">
          <div>
            © {new Date().getFullYear()} The Longevity Centre. All Rights Reserved.
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="/privacy" className="hover:text-rust-soft transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-rust-soft transition-colors">
              Terms
            </a>
            <a href="/" className="hover:text-rust-soft transition-colors">
              Main Site
            </a>
            <span>
              Designed by{' '}
              <a
                href="https://www.incrementors.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rust-soft transition-colors"
              >
                Incrementors
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
