// ProgramDetailPage — single template that renders any TLC programme by slug.
// Routes: /programs/[slug]
//
// Sections in order:
//   1. Hero — full-bleed image with editorial overlay, perfect viewport height
//   2. Designed For — who it's for (numbered list, two-column)
//   3. (Optional) BMI Calculator — for weight-relevant programmes
//   4. Diagnostics — what's included + optional add-ons + diagnostics note
//   5. Care Model — physician/nutritionist/coaching cadence (dark band)
//   6. Outcomes — measurable results (hairline grid)
//   7. The TLC Difference — closing pull quote
//   8. Final CTA — book consultation
//
// Layout discipline: white BG with cream accents, rust accent only,
// hairline dividers, type-led restraint, perfect responsive heights.

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { instantMotion } from '../lib/motion'
import { useDocumentMeta, breadcrumbList } from '../lib/seo'
import { getProgramBySlug, PROGRAMS, programFaqs, type Program } from '../lib/programs'
import { BmiCalculator } from '../components/BmiCalculator'
import { BrandAmbassador } from '../components/sections/BrandAmbassador'
import { Faq } from '../components/sections/Faq'
gsap.registerPlugin(ScrollTrigger)

// Programmes where a BMI calculator adds direct decision value.
const BMI_RELEVANT_SLUGS = new Set([
  'metabolic-weight-loss',
  'diabetes-fatty-liver-reversal',
  'pcod-correction',
])

// NOTE: per-programme accent helpers (rust / iguana / green) were removed
// from this page. The detail page now uses RUST exclusively for accent
// colour — keeping the design system tight, ensuring legibility on the
// dark hero (green / iguana fade into the gradient), and simplifying
// the visual language so different programmes feel like one product.

// 404 page when slug doesn't match
function NotFound({ slug }: { slug: string }) {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-6 py-32">
      <div className="text-center max-w-[520px]">
        <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-4">
          Programme Not Found
        </div>
        <h1 className="font-display font-light text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.025em] text-ink mb-6">
          We couldn't find a programme called{' '}
          <span className="text-rust">"{slug}"</span>.
        </h1>
        <a
          href="/programs"
          data-cursor="hover"
          className="inline-flex items-center gap-2 px-6 py-3.5 border border-ink/20 text-ink rounded-full text-[11.5px] tracking-[0.22em] uppercase font-semibold hover:bg-ink hover:text-white transition-colors duration-500"
        >
          ← View All Programmes
        </a>
      </div>
    </div>
  )
}

// Section animation hook — fades up + line-mask reveals
function useSectionReveal(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (instantMotion()) return
    const el = rootRef.current
    if (!el) return
    const lines = el.querySelectorAll<HTMLElement>('.line-mask > span')
    gsap.set(lines, { yPercent: 110 })
    gsap.utils.toArray<HTMLElement>('.line-mask').forEach((mask) => {
      const span = mask.querySelector<HTMLElement>('span')
      if (!span) return
      gsap.to(span, {
        yPercent: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: mask, start: 'top 88%' },
      })
    })
    const fade = el.querySelectorAll<HTMLElement>('.fade-up')
    gsap.set(fade, { y: 18 })
    gsap.to(fade, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 78%' },
    })
  }, [rootRef])
}

// === SECTION 1 — HERO =======================================================
// Full-bleed image with editorial dark overlay. ALL programmes use this
// pattern (consistency across the site).
//
// Visual hierarchy:
//   1. Eyebrow row (programme number + duration)
//   2. RUST PRICE PILL — prominent, immediately visible
//   3. Big bold headline + period accent
//   4. Italic rust-soft tagline (catchy hook)
//   5. Focus statement
//   6. CTA pair
//   7. Bottom info strip (3 cells: investment / duration / care model)
//
// Colour discipline: rust-soft is the only accent on white text. Per-programme
// accents are reserved for light-bg sections where they have enough contrast.
function Hero({ p }: { p: Program }) {
  const ref = useRef<HTMLElement>(null)
  useSectionReveal(ref)
  return (
    <section
      ref={ref}
      className="relative min-h-[560px] sm:min-h-[580px] md:min-h-[620px] lg:min-h-[640px] flex items-center overflow-hidden bg-ink"
    >
      {/* Full-bleed background image */}
      <img
        src={p.heroImg}
        alt={p.title}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Editorial dark gradient — heavy on left, fades right so image breathes */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(100deg, rgba(20,16,16,0.94) 0%, rgba(20,16,16,0.78) 42%, rgba(20,16,16,0.40) 70%, rgba(20,16,16,0.15) 100%)',
        }}
      />
      {/* Rust ambient wash — bottom-left, brand colour signature */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-multiply"
        style={{
          background:
            'radial-gradient(700px 500px at 15% 85%, rgba(148,84,85,0.35), transparent 60%)',
        }}
      />
      {/* Bottom hairline */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-24 md:pt-28 pb-10 md:pb-12">
        <div className="max-w-[760px]">
          {/* Breadcrumb + programme number */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5">
            <a
              href="/programs"
              data-cursor="hover"
              className="inline-flex items-center gap-2 text-[10.5px] tracking-[0.3em] uppercase text-white/65 hover:text-white font-semibold transition-colors duration-300"
            >
              ← Programmes
            </a>
            <span className="text-white/25">/</span>
            <div className="inline-flex items-center gap-2.5">
              <span className="w-7 h-px bg-rust-soft" />
              <span className="text-[10.5px] tracking-[0.42em] uppercase font-semibold text-rust-soft">
                Programme {p.cat} · {p.duration}
              </span>
            </div>
          </div>

          {/* Price pill removed per client — programmes no longer
              display any cost on the site. */}

          {/* Headline — bold, well-sized, doesn't dominate the screen */}
          <h1 className="font-display font-bold text-[36px] md:text-[54px] xl:text-[68px] leading-[1.0] tracking-[-0.035em] text-white mb-5">
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block">{p.shortTitle}</span>
            </span>
            <span className="text-rust-soft">.</span>
          </h1>

          {/* Italic tagline — punchy hook */}
          <p className="text-[14px] md:text-[16px] leading-[1.45] text-rust-soft font-light italic max-w-[560px] mb-4">
            {p.tag}
          </p>

          {/* Focus statement */}
          <p className="text-[14px] md:text-[15.5px] leading-[1.6] text-white/80 max-w-[580px] font-light mb-7">
            {p.focus}
          </p>

          {/* CTAs + inline meta strip on desktop */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <a
              href="#contact"
              data-cursor="hover"
              data-magnetic
              className="group inline-flex items-center gap-3 pl-5 pr-6 py-3.5 bg-white text-ink text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust hover:text-white transition-colors duration-500"
            >
              Book Consultation
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#designed-for"
              data-cursor="hover"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/30 text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-white/10 hover:border-white transition-colors duration-500"
            >
              Programme Details
            </a>
          </div>

          {/* Compact inline meta strip — tiny, sits under CTAs, doesn't add height */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-white/65 font-medium">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-rust-soft" />
              <span className="tracking-[0.18em] uppercase">{p.duration}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-rust-soft" />
              <span className="tracking-[0.18em] uppercase">Physician-led</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-rust-soft" />
              <span className="tracking-[0.18em] uppercase">
                {/* Biomarker count is per-programme — set as the
                    optional `biomarkers` field on the programme
                    record in src/lib/programs.ts. Falls back to
                    160+ (the standard blood panel) when omitted. */}
                {p.biomarkers ?? '160+ biomarkers'}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// === SECTION 2 — DESIGNED FOR ===============================================
// Editorial 2-col with title left, hairline numbered list right.
function DesignedFor({ p }: { p: Program }) {
  const ref = useRef<HTMLElement>(null)
  useSectionReveal(ref)
  return (
    <section
      id="designed-for"
      ref={ref}
      className="relative py-20 md:py-28 px-6 md:px-12 bg-cream/40 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1180px] mx-auto grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 items-start">
        <div>
          <div className="fade-up text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-6">
            Designed For
          </div>
          <h2 className="font-display font-light text-[30px] md:text-[44px] xl:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block">Built for those</span>
            </span>
            <br />
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block font-bold text-rust">who are ready.</span>
            </span>
          </h2>
        </div>
        <ul className="space-y-px bg-ink/10 border border-ink/10 rounded-[18px] overflow-hidden">
          {p.designedFor.map((item, i) => (
            <li
              key={i}
              className="fade-up bg-white p-5 md:p-6 flex items-start gap-4"
            >
              <span className="font-display text-[14px] text-rust font-semibold tabular-nums tracking-tight w-7 shrink-0 pt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-[14px] md:text-[15px] leading-[1.6] text-ink font-medium">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// === SECTION 3 — DIAGNOSTICS ================================================
// Centered eyebrow + headline, hairline 2-col grid of diagnostics,
// optional add-ons chips, optional callout note.
function Diagnostics({ p }: { p: Program }) {
  const ref = useRef<HTMLElement>(null)
  useSectionReveal(ref)
  return (
    <section ref={ref} className="bg-white py-20 md:py-28 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-14 md:mb-16 max-w-[760px] mx-auto">
          <div className="fade-up text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-6">
            Comprehensive Diagnostics
          </div>
          <h2 className="font-display font-light text-[30px] md:text-[44px] xl:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block">Decode first.</span>
            </span>
            <br />
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block font-bold text-rust">Intervene precisely.</span>
            </span>
          </h2>
        </div>

        {/* Hairline 2-col diagnostics grid. `last:sm:col-span-2` makes
            the orphan item in the last row span both columns when the
            count is odd — kills the awkward empty grey cell that
            appears when sm:grid-cols-2 has an odd item count. */}
        <div className="grid sm:grid-cols-2 gap-px bg-ink/10 border border-ink/10 rounded-[18px] overflow-hidden max-w-[960px] mx-auto">
          {p.diagnostics.map((d, i) => (
            <div
              key={i}
              className="fade-up bg-white p-5 md:p-6 flex items-start gap-4 last:[&:nth-child(odd)]:sm:col-span-2"
            >
              <span className="font-display text-[12px] text-rust font-semibold tabular-nums tracking-tight w-6 shrink-0 pt-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-[13.5px] md:text-[14.5px] leading-[1.55] text-ink font-medium">
                {d}
              </p>
            </div>
          ))}
        </div>

        {/* Optional add-ons */}
        {p.optionalAddons && p.optionalAddons.length > 0 && (
          <div className="fade-up mt-12 max-w-[920px] mx-auto text-center">
            <div className="text-[10px] tracking-[0.32em] uppercase text-iguana font-semibold mb-4">
              Optional Add-ons
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {p.optionalAddons.map((a, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 bg-iguana/10 border border-iguana/25 rounded-full px-4 py-2 text-[12px] text-graphite font-medium"
                >
                  <span aria-hidden className="w-1 h-1 rounded-full bg-iguana" />
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Diagnostics note callout */}
        {p.diagnosticsNote && (
          <div className="fade-up mt-14 md:mt-16 max-w-[760px] mx-auto text-center px-6">
            <div className="h-px w-12 bg-rust mx-auto mb-7" />
            <p className="font-display font-light text-[20px] md:text-[26px] leading-[1.45] tracking-[-0.015em] text-ink italic">
              {p.diagnosticsNote}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

// === SECTION 4 — CARE MODEL =================================================
// Dark band — physician-led cadence with rust ambient wash.
function CareModel({ p }: { p: Program }) {
  const ref = useRef<HTMLElement>(null)
  useSectionReveal(ref)
  return (
    <section ref={ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-ink text-white overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            'radial-gradient(900px 500px at 20% 0%, rgba(148,84,85,0.18), transparent 60%), radial-gradient(700px 400px at 90% 100%, rgba(178,122,123,0.12), transparent 60%)',
        }}
      />
      <div className="relative z-10 max-w-[1180px] mx-auto grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 items-start">
        <div>
          <div className="fade-up text-[10.5px] tracking-[0.42em] uppercase text-rust-soft font-semibold mb-6">
            Care Model
          </div>
          <h2 className="font-display font-light text-[30px] md:text-[44px] xl:text-[52px] leading-[1.05] tracking-[-0.025em] text-white">
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block">Physician-led.</span>
            </span>
            <br />
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block font-bold text-rust-soft">Continuously refined.</span>
            </span>
          </h2>
        </div>
        <ul className="space-y-px bg-white/5 border border-white/10 rounded-[18px] overflow-hidden backdrop-blur-sm">
          {p.careModel.map((c, i) => (
            <li key={i} className="fade-up bg-white/[0.03] p-5 md:p-6 flex items-start gap-4">
              <span className="font-display text-[14px] text-rust-soft font-semibold tabular-nums tracking-tight w-7 shrink-0 pt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-[14px] md:text-[15px] leading-[1.6] text-white/85 font-light">
                {c}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// === SECTION 5 — OUTCOMES ===================================================
// Centered eyebrow + headline, 3-col hairline grid of outcome cards.
function Outcomes({ p }: { p: Program }) {
  const ref = useRef<HTMLElement>(null)
  useSectionReveal(ref)
  return (
    <section ref={ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-cream/40 overflow-hidden">
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="text-center mb-14 md:mb-16 max-w-[760px] mx-auto">
          <div className="fade-up text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-6">
            Expected Outcomes
          </div>
          <h2 className="font-display font-light text-[30px] md:text-[44px] xl:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block">Measurable.</span>
            </span>
            <br />
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block font-bold text-rust">Documented.</span>
            </span>
          </h2>
        </div>

        {/* 2-col on all sizes — outcomes lists across programmes are
            consistently even-numbered (typically 10), and `lg:grid-cols-3`
            was leaving orphan items as awkward empty grey cells.
            `last:sm:col-span-2` is a belt-and-suspenders fix for any
            programme that does have an odd outcome count. */}
        <div className="grid sm:grid-cols-2 gap-px bg-ink/10 border border-ink/10 rounded-[20px] overflow-hidden">
          {p.outcomes.map((o, i) => (
            <article key={i} className="fade-up bg-white p-6 md:p-7 flex flex-col last:[&:nth-child(odd)]:sm:col-span-2">
              <div className="font-display text-[20px] md:text-[22px] text-rust font-semibold tabular-nums tracking-tight mb-3">
                {String(i + 1).padStart(2, '0')}
              </div>
              <span aria-hidden className="block h-px w-6 bg-rust mb-4" />
              <p className="text-[14px] md:text-[15px] leading-[1.6] text-ink font-medium">
                {o}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// === SECTION 6 — THE TLC DIFFERENCE =========================================
// Centered editorial pull-quote on white.
function Difference({ p }: { p: Program }) {
  const ref = useRef<HTMLElement>(null)
  useSectionReveal(ref)
  return (
    <section ref={ref} className="py-24 md:py-36 px-6 md:px-12 bg-white">
      <div className="max-w-[920px] mx-auto text-center">
        <div className="fade-up text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-8">
          The TLC Difference
        </div>
        <p className="font-display font-light text-[24px] md:text-[36px] xl:text-[44px] leading-[1.25] tracking-[-0.02em] text-ink">
          <span className="line-mask inline-block overflow-hidden align-bottom">
            <span className="inline-block">{p.difference}</span>
          </span>
        </p>
        <div className="fade-up h-px w-16 bg-rust mx-auto mt-12" />
      </div>
    </section>
  )
}

// === SECTION 7 — RELATED PROGRAMMES =========================================
// 3 other programmes the visitor might consider — keeps them in the funnel.
function Related({ p }: { p: Program }) {
  const others = PROGRAMS.filter((x) => x.slug !== p.slug).slice(0, 3)
  const ref = useRef<HTMLElement>(null)
  useSectionReveal(ref)
  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-12 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-end mb-12 md:mb-14">
          <div>
            <div className="fade-up text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-6">
              Other Programmes
            </div>
            <h2 className="font-display font-light text-[30px] md:text-[44px] leading-[1.05] tracking-[-0.025em] text-ink">
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block">
                  Adjacent paths,{' '}
                  <span className="font-bold text-rust">same rigour.</span>
                </span>
              </span>
            </h2>
          </div>
          <p className="fade-up text-[14px] leading-[1.7] text-graphite font-light max-w-[420px] md:pb-2">
            Many patients combine programmes for compounding benefit. These three pair naturally with {p.shortTitle}.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10 rounded-[20px] overflow-hidden">
          {others.map((r) => (
            <a
              key={r.slug}
              href={`/programs/${r.slug}`}
              data-cursor="hover"
              className="group bg-white p-6 md:p-7 flex flex-col hover:bg-cream/40 transition-colors duration-500"
            >
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[14px] bg-mist mb-6">
                <img
                  src={r.cardImg}
                  alt={r.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
              </div>
              <div className="text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold mb-2">
                Programme {r.cat}
              </div>
              <h3 className="font-display font-bold text-[18px] md:text-[20px] leading-[1.2] tracking-[-0.015em] text-ink group-hover:text-rust transition-colors duration-500 mb-3">
                {r.shortTitle}
              </h3>
              <span aria-hidden className="block h-px w-6 bg-rust mb-3.5 transition-all duration-700 group-hover:w-12" />
              <p className="text-[13px] md:text-[13.5px] leading-[1.55] text-graphite font-light mb-5 flex-1">
                {r.focus}
              </p>
              <span className="inline-flex items-center gap-2 text-[10.5px] tracking-[0.28em] uppercase text-ink font-semibold mt-auto">
                Explore
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1 text-rust">
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// === SECTION 8 — FINAL CTA ==================================================
// Dark band — closing call to action with three contact paths.
function FinalCta({ p }: { p: Program }) {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 px-6 md:px-12 bg-ink text-white overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(900px 700px at 50% 30%, rgba(178,122,123,0.18), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[920px] mx-auto text-center">
        <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust-soft font-semibold mb-8">
          Begin
        </div>
        <h2 className="font-display font-light text-[30px] md:text-[52px] xl:text-[64px] leading-[1.05] tracking-[-0.03em] mb-7">
          Begin with a comprehensive{' '}
          <span className="font-bold text-rust-soft">assessment.</span>
        </h2>
        <p className="text-[14.5px] md:text-[16px] leading-[1.7] text-white/75 font-light max-w-[560px] mx-auto mb-12">
          A 30-minute conversation with a senior physician, no commitment. Decide whether the {p.shortTitle} programme is right for you.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="tel:+918826809123"
            data-cursor="hover"
            data-magnetic
            className="group inline-flex items-center gap-3 pl-5 pr-7 py-4 bg-white text-ink rounded-full text-[11.5px] tracking-[0.22em] uppercase font-semibold hover:bg-rust hover:text-white transition-colors duration-500"
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full rounded-full bg-rust opacity-70 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rust" />
            </span>
            Book Initial Consultation
            <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0"
            data-cursor="hover"
            className="inline-flex items-center gap-2 px-6 py-4 border border-white/25 text-white rounded-full text-[11.5px] tracking-[0.22em] uppercase font-semibold hover:bg-white/10 hover:border-white transition-colors duration-500"
          >
            WhatsApp
          </a>
          <a
            href="/programs"
            data-cursor="hover"
            className="inline-flex items-center gap-2 px-6 py-4 text-white/80 hover:text-white rounded-full text-[11.5px] tracking-[0.22em] uppercase font-semibold transition-colors duration-500"
          >
            ← All Programmes
          </a>
        </div>
      </div>
    </section>
  )
}

// === PAGE COMPOSITION =======================================================
export function ProgramDetailPage() {
  const slug = window.location.pathname.replace(/\/$/, '').split('/').pop() || ''
  const program = getProgramBySlug(slug)

  // Always call hooks before any return — useDocumentMeta must run unconditionally
  useDocumentMeta({
    title: program
      ? `${program.shortTitle} · TLC Programme`
      : 'Programme · TLC',
    description: program
      ? program.focus
      : 'Programme details, The Longevity Centre.',
    path: `/programs/${slug}`,
    jsonLd: program
      ? [
          breadcrumbList([
            { name: 'Home', url: '/' },
            { name: 'Programmes', url: '/programs' },
            { name: program.shortTitle, url: `/programs/${slug}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'MedicalProcedure',
            name: program.title,
            description: program.focus,
            procedureType: 'TherapeuticProcedure',
            followup: program.duration,
            performer: { '@id': 'https://thelongevitycentre.co/#organization' },
          },
        ]
      : undefined,
  })

  if (!program) return <NotFound slug={slug} />

  const showBmi = BMI_RELEVANT_SLUGS.has(program.slug)

  return (
    <>
      <Hero p={program} />
      <DesignedFor p={program} />
      {showBmi && (
        <BmiCalculator
          variant="program"
          currentProgramName={program.shortTitle}
          hideGender={program.slug === 'pcod-correction'}
        />
      )}
      <Diagnostics p={program} />
      <CareModel p={program} />
      <Outcomes p={program} />
      <Difference p={program} />
      <Faq
        faqs={programFaqs(program)}
        heading="Questions about this programme"
        idPrefix={`prog-${program.slug}-faq`}
      />
      <Related p={program} />
      <BrandAmbassador />
      <FinalCta p={program} />
    </>
  )
}

// Export PROGRAMS for convenience (used by index page, header dropdown)
export { PROGRAMS }
