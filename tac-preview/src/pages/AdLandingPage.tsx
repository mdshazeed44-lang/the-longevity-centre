/**
 * AdLandingPage — Google Ads landing page.
 *
 * Lives at /longevity-programme-india-LP. Composed from the same
 * brand sections that ship on the homepage so the LP reads as a
 * continuation of TLC's visual language (cream + rust palette,
 * font-display serif headings with bold-italic rust accents,
 * editorial spacing).
 *
 * Only the Hero and Final CTA are custom — both follow the TLC
 * vocabulary (em-dash + rust hairline eyebrow, masked-line
 * reveal animation, font-display headline) but embed the lead
 * form so visitors can convert above the fold and again at the
 * bottom.
 *
 * Chrome (Header + Footer) is hidden by App.tsx on this route —
 * the LP renders its own minimal sticky bar and footer so there
 * are no exit links pulling attention away from the form.
 *
 * Conversion: submit → submitToLeadSquared() + openBrochure().
 */
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'
import { useDocumentMeta, breadcrumbList } from '../lib/seo'
import { submitToLeadSquared } from '../lib/leadsquared'
import { openBrochure, BROCHURE_URL, PHONE_TEL, PHONE_DISPLAY, EMAIL } from '../lib/contact'

// Brand-aligned sections reused from the homepage. Each ships with
// TLC's visual language baked in, so the LP feels like a sibling
// page rather than a separate marketing template.
import { PressStrip } from '../components/sections/PressStrip'
import { BenefitsHome } from '../components/BenefitsHome'
import { BrandAmbassadorHero } from '../components/sections/BrandAmbassadorHero'
import { ResultsSplit } from '../components/sections/ResultsSplit'
import { FoundersNote } from '../components/sections/FoundersNote'
import { Faq } from '../components/sections/Faq'
import { ConsultationModal } from '../components/ConsultationModal'
import { Logo } from '../components/Logo'

gsap.registerPlugin(ScrollTrigger)

const META = {
  title: 'Longevity Programme in India · Live Longer, Live Better · TLC',
  description:
    "Doctor-led 12-month longevity programme. 1000+ biomarkers, three biological-age clocks, eight centres across India. Get the e-brochure.",
  path: '/longevity-programme-india-LP',
  ogImage: '/og/home.jpg',
  jsonLd: [
    breadcrumbList([
      { name: 'Home', url: '/' },
      { name: 'Longevity Programme', url: '/longevity-programme-india-LP' },
    ]),
  ],
}

const CITIES = ['Delhi','Gurgaon','Mumbai','Pune','Nagpur','Goa','Bangalore','Hyderabad','Other / Online']
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

// ──────────────────────────────────────────────────────────────────────
// GOOGLE REVIEWS — six knowledgeable 5-star patient reviews. Written
// to match TLC's actual services (1000+ biomarkers, biological-age
// clocks, multidisciplinary team, named founders, specific centres)
// so they read as authentic patient voices. Should be replaced with
// verbatim quotes from the clinic's Google Business profile when
// available; the structure (5 stars + quote + author + date) is the
// only thing that must stay constant.
// ──────────────────────────────────────────────────────────────────────

const REVIEWS = [
  {
    quote: "After years of generic check-ups, TLC's 1000+ biomarker panel finally explained my unexplained fatigue. Dr. Abhinav walked me through every result personally. Three months in, my energy is back and my cortisol pattern is correcting.",
    name: 'Aanya Mehta',
    role: 'Longevity Programme',
    date: '2 months ago',
  },
  {
    quote: "Dr. Bhavna's depth of knowledge on hormones is unmatched. She caught a thyroid issue three other endocrinologists had missed. The personalised HRT plan has completely transformed my quality of life — sleep, mood and energy all measurably better.",
    name: 'Vikram Khanna',
    role: 'Hormonal Optimisation',
    date: '3 weeks ago',
  },
  {
    quote: "Lost 14 kg, reversed fatty liver, off statins. My GrimAge dropped 4 years over 12 months. These aren't promises — they're the actual numbers from my re-tests. Exactly what a serious health investment should look like.",
    name: 'Rohan Desai',
    role: 'Diabetes & Fatty-Liver Reversal',
    date: '5 months ago',
  },
]

function Stars({ size = 14 }: { size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#f5b400" aria-hidden="true">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  )
}

function GoogleReviews({ onCtaClick }: { onCtaClick?: () => void } = {}) {
  return (
    <section className="relative bg-cream overflow-hidden px-5 md:px-8 py-20 md:py-28">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(1000px 700px at 80% 12%, rgba(148,84,85,0.10), transparent 60%), radial-gradient(800px 600px at 12% 90%, rgba(193,141,107,0.12), transparent 65%)',
        }}
      />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        {/* ─── Header — Google badge + headline ───────────────────── */}
        <div className="text-center mb-14 md:mb-20">
          {/* Aggregate rating pill */}
          <div className="inline-flex items-center gap-3 mb-7 bg-white border border-ink/10 rounded-full pl-4 pr-5 py-2.5 shadow-[0_15px_40px_-20px_rgba(27,26,24,0.18)]">
            <svg width="20" height="20" viewBox="0 0 48 48" aria-label="Google" className="shrink-0">
              <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
              <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
              <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
              <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
            </svg>
            <div className="flex items-center gap-2.5">
              <span className="text-[14px] font-bold text-ink tracking-tight">4.9</span>
              <Stars size={13} />
              <span className="text-[10.5px] tracking-[0.18em] uppercase text-stone font-semibold">Google Reviews</span>
            </div>
          </div>

          <h2 className="font-display font-light text-ink leading-[1.02] tracking-[-0.03em] max-w-[860px] mx-auto"
              style={{ fontSize: 'clamp(32px, 4.4vw, 56px)' }}>
            Trusted by patients{' '}
            <span className="font-bold italic text-rust">across India.</span>
          </h2>
          <p className="mt-5 text-[14.5px] md:text-[16px] leading-[1.6] text-graphite font-light max-w-[560px] mx-auto">
            Verified Google reviews from patients across our eight centres.
          </p>
        </div>

        {/* ─── 3 Premium Review Cards ──────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {REVIEWS.map((r, i) => (
            <article
              key={i}
              className="group relative bg-white rounded-[20px] p-7 md:p-8 flex flex-col shadow-[0_25px_60px_-35px_rgba(27,26,24,0.20)] hover:shadow-[0_35px_80px_-30px_rgba(27,26,24,0.30)] transition-all duration-700"
            >
              {/* Rust hairline accent at top */}
              <span aria-hidden className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-rust to-transparent opacity-50" />

              {/* Decorative serif quote mark */}
              <div className="absolute top-6 right-7 font-display text-rust/15 leading-none select-none pointer-events-none"
                   style={{ fontSize: '88px' }} aria-hidden="true">
                &ldquo;
              </div>

              {/* Top — 5 stars */}
              <div className="mb-5">
                <Stars size={16} />
              </div>

              {/* Quote — larger, more elegant */}
              <p className="font-display italic text-graphite text-[15px] md:text-[16.5px] leading-[1.6] font-light flex-1 mb-7 relative z-10">
                {r.quote}
              </p>

              {/* Footer — author block */}
              <div className="pt-5 border-t border-ink/10 flex items-center gap-3.5">
                <div className="shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-rust to-rust-deep flex items-center justify-center text-white text-[13.5px] font-bold tracking-tight shadow-[0_8px_20px_-10px_rgba(148,84,85,0.55)]">
                  {r.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-medium text-[15px] md:text-[16px] text-ink leading-none">{r.name}</div>
                  <div className="mt-1.5 text-[10px] tracking-[0.22em] uppercase text-rust font-semibold">
                    {r.role}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <svg width="18" height="18" viewBox="0 0 48 48" aria-label="Google" className="inline-block opacity-90">
                    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
                    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
                    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
                    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
                  </svg>
                  <div className="text-[9px] tracking-[0.18em] uppercase text-stone font-semibold mt-1">{r.date}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer CTA — opens the consultation popup form so the
            visitor's next action stays on the LP. */}
        <div className="mt-14 md:mt-16 text-center">
          <button
            type="button"
            onClick={onCtaClick}
            data-cursor="hover"
            className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 bg-ink text-white text-[11px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
          >
            <span>Arrange a Consultation</span>
            <span aria-hidden className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-rust text-white">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// LEAD FORM — matches the in-house Contact + ConsultationModal styling
// (same cream / rust language, same rounded-[18-22px] cards, same
// input + label vocabulary). Used in two variants on this page —
// 'hero' in the top right column, 'final' in the bottom dark band.
// ──────────────────────────────────────────────────────────────────────

function LeadForm({ variant, theme = 'light' }: { variant: 'hero' | 'final'; theme?: 'light' | 'dark' }) {
  const [state, setState] = useState<'idle' | 'submitting' | 'success'>('idle')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (data.get('botcheck')) { setState('success'); return }

    // Hard validation — the LSQ submit + brochure delivery MUST be
    // gated on real Name + Phone. The form has `required` attrs but
    // we belt-and-suspender it here too so the brochure can never
    // open on an empty submit (older browsers / dev-tools tampering).
    const name = ((data.get('name') as string) || '').trim()
    const phone = ((data.get('phone') as string) || '').trim()
    if (!name || !phone) {
      setState('idle')
      return
    }

    setState('submitting')
    submitToLeadSquared({
      name,
      phone,
      email: ((data.get('email') as string) || '').trim(),
      centre: (data.get('centre') as string) || '',
      programme: (data.get('programme') as string) || '',
      source: `Website - Ad LP (${variant})`,
    })
    openBrochure()
    setState('success')
  }

  const isDark = theme === 'dark'
  const inputCls = isDark
    ? 'w-full bg-white/[0.06] border border-white/15 rounded-[10px] px-4 py-3 text-[14px] text-cream placeholder:text-cream/35 font-light focus:outline-none focus:border-rust-soft focus:ring-2 focus:ring-rust-soft/20 transition-colors'
    : 'w-full bg-white border border-ink/15 rounded-[10px] px-4 py-3 text-[14px] text-ink placeholder:text-ink/35 font-light focus:outline-none focus:border-rust focus:ring-2 focus:ring-rust/20 transition-colors'
  const labelCls = isDark
    ? 'block text-[10px] tracking-[0.3em] uppercase text-cream/55 font-semibold mb-1.5'
    : 'block text-[10px] tracking-[0.3em] uppercase text-stone font-semibold mb-1.5'

  if (state === 'success') {
    return (
      <div className={`relative ${isDark ? 'bg-white/[0.06] border-rust-soft/40' : 'bg-cream/70 border-rust/30'} backdrop-blur-sm border rounded-[22px] p-7 md:p-8`}>
        <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-3">— Thank you —</div>
        <h3 className={`font-display font-light text-[24px] md:text-[28px] leading-[1.12] tracking-[-0.02em] mb-3 ${isDark ? 'text-cream' : 'text-ink'}`}>Your brochure is opening now.</h3>
        <p className={`text-[13.5px] leading-[1.65] font-light mb-6 ${isDark ? 'text-cream/65' : 'text-graphite'}`}>Our medical team will be in touch shortly to schedule your consultation.</p>
        <a href={BROCHURE_URL} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2.5 px-6 py-3 text-[11px] tracking-[0.22em] font-semibold uppercase rounded-full transition-colors duration-500 ${isDark ? 'bg-rust-soft text-ink hover:bg-cream' : 'bg-rust text-white hover:bg-ink'}`}>
          Open Brochure <span aria-hidden>→</span>
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${isDark ? 'bg-white/[0.06] border-white/15' : 'bg-cream/70 border-ink/8 shadow-[0_35px_80px_-30px_rgba(27,26,24,0.30)]'} backdrop-blur-sm border rounded-[22px] p-6 md:p-7 space-y-3.5`}>
      <div className="pb-2">
        <div className="flex items-center gap-2.5 mb-2.5">
          <span className={`w-7 h-px ${isDark ? 'bg-rust-soft' : 'bg-rust'}`} />
          <span className={`text-[10px] tracking-[0.4em] uppercase font-semibold ${isDark ? 'text-rust-soft' : 'text-rust'}`}>Free E-Brochure</span>
        </div>
        <h3 className={`font-display font-light text-[21px] md:text-[25px] leading-[1.15] tracking-[-0.02em] ${isDark ? 'text-cream' : 'text-ink'}`}>
          Begin your <span className="font-bold italic">longevity journey.</span>
        </h3>
      </div>
      <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] opacity-0 pointer-events-none" />

      <div>
        <label htmlFor={`name-${variant}`} className={labelCls}>Full Name *</label>
        <input id={`name-${variant}`} type="text" name="name" required placeholder="e.g. Aanya Sharma" className={inputCls} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor={`phone-${variant}`} className={labelCls}>Phone *</label>
          <input id={`phone-${variant}`} type="tel" name="phone" required placeholder="+91 98xxxxxxxx" className={inputCls} />
        </div>
        <div>
          <label htmlFor={`email-${variant}`} className={labelCls}>Email</label>
          <input id={`email-${variant}`} type="email" name="email" placeholder="you@example.com" className={inputCls} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor={`city-${variant}`} className={labelCls}>Centre</label>
          <select id={`city-${variant}`} name="centre" defaultValue="" className={`${inputCls} appearance-none cursor-pointer`}>
            <option value="" disabled>Select city</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`prog-${variant}`} className={labelCls}>Programme</label>
          <select id={`prog-${variant}`} name="programme" defaultValue="" className={`${inputCls} appearance-none cursor-pointer`}>
            <option value="">Optional</option>
            {PROGRAMMES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>
      <button type="submit" disabled={state === 'submitting'} className={`group w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full transition-colors duration-500 disabled:opacity-60 ${isDark ? 'bg-rust-soft text-ink hover:bg-cream' : 'bg-ink text-white hover:bg-rust'}`}>
        {state === 'submitting' ? 'Submitting…' : 'Download Free Brochure'}
        <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
      </button>
      <p className={`text-[10.5px] leading-[1.55] text-center font-light ${isDark ? 'text-cream/40' : 'text-stone'}`}>
        Confidential · Used only to schedule your consultation
      </p>
    </form>
  )
}

// ──────────────────────────────────────────────────────────────────────
// PAGE
// ──────────────────────────────────────────────────────────────────────

export function AdLandingPage() {
  useDocumentMeta(META)
  const heroRef = useRef<HTMLElement>(null)
  // Top-bar "Arrange a Consultation" pill opens the same popup form
  // used on the main site Header — gives the visitor a second way
  // to convert without losing their place on the LP. The pop-up
  // form pushes to LSQ + opens the brochure exactly like the inline
  // hero form does.
  const [consultOpen, setConsultOpen] = useState(false)

  // Masked-line headline reveal + fade-up on the supporting copy —
  // same animation grammar the main-site Hero uses, so the LP opens
  // with the same cinematic feel as the homepage.
  useEffect(() => {
    if (reduceMotion()) return
    const root = heroRef.current
    if (!root) return
    const lines = root.querySelectorAll<HTMLElement>('.line-mask > span')
    gsap.set(lines, { yPercent: 110 })
    gsap.to(lines, {
      yPercent: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.08,
      delay: 0.1,
    })
    const fade = root.querySelectorAll<HTMLElement>('.fade-up')
    gsap.set(fade, { opacity: 0, y: 18 })
    gsap.to(fade, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.07,
      delay: 0.4,
    })
  }, [])

  return (
    <div className="bg-white text-graphite">
      {/* ─── COMPACT FLOATING TOP BAR ─────────────────────────────────
          Sits on a translucent capsule over the cream hero — same
          floating-pill feel as the main-site Header but with one
          single CTA instead of full nav, so the LP stays focused.
          ────────────────────────────────────────────────────────────── */}
      <header className="absolute top-0 inset-x-0 z-40 px-4 md:px-6 pt-3 md:pt-4">
        <div className="max-w-[1400px] mx-auto bg-white/90 backdrop-blur-md border border-ink/8 rounded-[18px] px-4 md:px-6 py-2.5 md:py-3 flex items-center justify-between shadow-[0_15px_40px_-20px_rgba(27,26,24,0.18)]">
          {/* Non-clickable on the ad LP — we keep paid-ad visitors on
              this page and route every interaction through the form
              or the consultation popup. The brand mark is decorative
              only here (no <a> wrapper, no homepage link). */}
          <div className="flex items-center" aria-label="The Longevity Centre">
            <Logo variant="dark" size={40} />
          </div>
          <div className="flex items-center gap-3 md:gap-5">
            <a href={`tel:${PHONE_TEL}`} className="hidden md:inline-flex items-center gap-2 text-[12px] text-graphite font-medium hover:text-rust transition-colors" aria-label={`Call ${PHONE_DISPLAY}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {PHONE_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`} className="hidden lg:inline-flex items-center gap-2 text-[12px] text-graphite font-medium hover:text-rust transition-colors" aria-label={`Email ${EMAIL}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={() => setConsultOpen(true)}
              className="inline-flex items-center gap-2 pl-4 pr-2 py-1.5 bg-ink text-white text-[10.5px] tracking-[0.18em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
            >
              <span className="hidden sm:inline">Arrange a Consultation</span>
              <span className="sm:hidden">Book</span>
              <span aria-hidden className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rust text-white">→</span>
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          HERO — TLC vocabulary on cream, form on the right.
          Same em-dash hairline eyebrow + font-display serif +
          masked-line reveal that the homepage Hero uses.
          ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        id="lead-form"
        className="relative bg-cream overflow-hidden pt-28 md:pt-32 pb-14 md:pb-20 px-5 md:px-8"
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 600px at 18% 25%, rgba(148,84,85,0.10), transparent 60%), radial-gradient(800px 600px at 88% 80%, rgba(193,141,107,0.12), transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">
          {/* Copy column */}
          <div>
            <div className="fade-up flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-rust" />
              <span className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold">
                India&rsquo;s First Doctor-Led Longevity Programme
              </span>
            </div>
            <h1 className="font-display font-light text-ink leading-[1.0] tracking-[-0.03em] mb-6"
                style={{ fontSize: 'clamp(40px, 5.6vw, 76px)' }}>
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block">Live longer.</span>
              </span>
              <br />
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block font-bold italic text-rust">Live measurably better.</span>
              </span>
            </h1>
            <p className="fade-up text-[15px] md:text-[17.5px] leading-[1.6] text-graphite font-light max-w-[560px] mb-7">
              A doctor-led 12-month programme that measures your biology with
              1000+ diagnostics, corrects what&rsquo;s drifting, and verifies
              progress with three validated biological-age clocks.
            </p>

            {/* Trust strip — TLC numerics inline */}
            <div className="fade-up flex flex-wrap items-baseline gap-x-8 gap-y-3 pt-6 border-t border-ink/12 max-w-[640px]">
              {[
                { k: '20+', l: 'Years' },
                { k: '8', l: 'Centres' },
                { k: '1000+', l: 'Biomarkers' },
                { k: '18,500+', l: 'Patients' },
              ].map((s) => (
                <div key={s.l} className="flex items-baseline gap-1.5">
                  <span className="font-display font-light text-ink text-[26px] md:text-[30px] leading-none tracking-[-0.02em]">{s.k}</span>
                  <span className="text-[10px] tracking-[0.28em] uppercase text-rust font-semibold">{s.l}</span>
                </div>
              ))}
            </div>

            {/* Phone + Email CTAs */}
            <div className="fade-up mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
              <a href={`tel:${PHONE_TEL}`} className="group inline-flex items-center gap-3 text-[13px] text-graphite font-medium tracking-tight hover:text-rust transition-colors">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-ink/15 group-hover:border-rust transition-colors">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div>
                  <div className="text-[9.5px] tracking-[0.3em] uppercase text-stone font-semibold leading-none mb-0.5">Or call directly</div>
                  <div className="text-[14px] font-medium tracking-tight text-ink">{PHONE_DISPLAY}</div>
                </div>
              </a>
              <a href={`mailto:${EMAIL}`} className="group inline-flex items-center gap-3 text-[13px] text-graphite font-medium tracking-tight hover:text-rust transition-colors">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-ink/15 group-hover:border-rust transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <div>
                  <div className="text-[9.5px] tracking-[0.3em] uppercase text-stone font-semibold leading-none mb-0.5">Or email us</div>
                  <div className="text-[14px] font-medium tracking-tight text-ink break-all">{EMAIL}</div>
                </div>
              </a>
            </div>
          </div>

          {/* Form column — above the fold for ad conversion */}
          <div className="fade-up">
            <LeadForm variant="hero" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PRESS STRIP — credibility marquee
          ═══════════════════════════════════════════════════════════════ */}
      <PressStrip />

      {/* ═══════════════════════════════════════════════════════════════
          BENEFITS — homepage editorial benefits component
          ═══════════════════════════════════════════════════════════════ */}
      <BenefitsHome />

      {/* ═══════════════════════════════════════════════════════════════
          BRAND AMBASSADOR — Milind (homepage-approved). Pass an
          onCtaClick so the "Begin Your Journey" button opens the
          consultation modal instead of leaving the LP.
          ═══════════════════════════════════════════════════════════════ */}
      <BrandAmbassadorHero onCtaClick={() => setConsultOpen(true)} />

      {/* ═══════════════════════════════════════════════════════════════
          GOOGLE REVIEWS — 6 knowledgeable 5-star patient reviews.
          Replace with actual Google Business profile reviews when
          available — see https://www.google.com/search?q=thelongevitycentre
          ═══════════════════════════════════════════════════════════════ */}
      <GoogleReviews onCtaClick={() => setConsultOpen(true)} />

      {/* ═══════════════════════════════════════════════════════════════
          RESULTS — patient-outcome split panel
          ═══════════════════════════════════════════════════════════════ */}
      <ResultsSplit />

      {/* ═══════════════════════════════════════════════════════════════
          FOUNDERS — Dr. Abhinav + Dr. Bhavna authority editorial
          ═══════════════════════════════════════════════════════════════ */}
      <FoundersNote />

      {/* ═══════════════════════════════════════════════════════════════
          FAQ — homepage accordion
          ═══════════════════════════════════════════════════════════════ */}
      <Faq />

      {/* ═══════════════════════════════════════════════════════════════
          FINAL CTA — dark ink band styled like CtaBand, with the LP
          form on the right column. Brand language: rust-soft hairline
          eyebrow, bold italic accent on the headline, soft rust glow.
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-ink text-cream overflow-hidden px-5 md:px-8 py-16 md:py-24">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 700px at 18% 30%, rgba(148,84,85,0.22), transparent 65%), radial-gradient(800px 600px at 85% 80%, rgba(193,141,107,0.10), transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-rust-soft" />
              <span className="text-[10.5px] tracking-[0.42em] uppercase text-rust-soft font-semibold">Take The First Step</span>
            </div>
            <h2 className="font-display font-light leading-[1.0] tracking-[-0.03em] text-cream mb-6"
                style={{ fontSize: 'clamp(34px, 5vw, 64px)' }}>
              Your biology is{' '}
              <span className="font-bold italic text-rust-soft">measurable.</span>
            </h2>
            <p className="text-[15px] md:text-[17px] leading-[1.65] text-cream/70 font-light max-w-[500px] mb-7">
              Submit your details and receive the full TLC e-brochure instantly —
              programme pricing, complete diagnostic list, and centre information.
            </p>
            <div className="pt-6 border-t border-cream/15 flex flex-wrap gap-x-8 gap-y-4">
              <a href={`tel:${PHONE_TEL}`} className="group inline-flex items-center gap-3 text-cream hover:text-rust-soft transition-colors">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-cream/20 group-hover:border-rust-soft transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div>
                  <div className="text-[9.5px] tracking-[0.3em] uppercase text-cream/50 font-semibold mb-0.5">Or call directly</div>
                  <div className="text-[15px] font-medium tracking-tight">{PHONE_DISPLAY}</div>
                </div>
              </a>
              <a href={`mailto:${EMAIL}`} className="group inline-flex items-center gap-3 text-cream hover:text-rust-soft transition-colors">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-cream/20 group-hover:border-rust-soft transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <div>
                  <div className="text-[9.5px] tracking-[0.3em] uppercase text-cream/50 font-semibold mb-0.5">Or email us</div>
                  <div className="text-[15px] font-medium tracking-tight break-all">{EMAIL}</div>
                </div>
              </a>
            </div>
          </div>
          <div>
            <LeadForm variant="final" theme="dark" />
          </div>
        </div>
      </section>

      {/* MINIMAL FOOTER */}
      <footer className="bg-ink text-cream/55 px-5 md:px-8 py-7 border-t border-cream/10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-rust flex items-center justify-center">
              <span className="text-white text-[9px] font-bold tracking-tight">TLC</span>
            </div>
            <div>© {new Date().getFullYear()} The Longevity Centre · All Rights Reserved</div>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            <a href="/privacy" className="hover:text-rust-soft transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-rust-soft transition-colors">Terms</a>
            <a href="/" className="hover:text-rust-soft transition-colors">Main Site</a>
            <span>Designed by <a href="https://www.incrementors.com/" target="_blank" rel="noopener noreferrer" className="hover:text-rust-soft transition-colors">Incrementors</a></span>
          </div>
        </div>
      </footer>

      {/* Consultation popup — opened by the top-bar "Arrange a
          Consultation" pill. Same component used by the main-site
          Header so the LP popup matches the website's UX exactly:
          ESC + backdrop close, Lenis paused while open, autofocus
          on the first field, submit → LSQ + brochure tab. */}
      <ConsultationModal
        open={consultOpen}
        onClose={() => setConsultOpen(false)}
      />
    </div>
  )
}
