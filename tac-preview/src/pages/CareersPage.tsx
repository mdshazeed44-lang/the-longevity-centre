// CareersPage — open roles + values + how we hire. Editorial design
// matching the rest of the site.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'
import { useDocumentMeta } from '../lib/seo'
import { CtaBand } from '../App'

gsap.registerPlugin(ScrollTrigger)

const ROLES = [
  {
    cat: 'Clinical',
    title: 'Senior Endocrinologist',
    location: 'Delhi · Gurgaon · Pune · Bangalore',
    type: 'Full-time',
    body: 'Lead diagnostics + protocol design for complex metabolic, hormonal and longevity cases. MBBS · MD/DM Endocrinology + 8 years post-MD experience.',
  },
  {
    cat: 'Clinical',
    title: 'Longevity Consultant',
    location: 'All Centres',
    type: 'Full-time',
    body: 'Patient-facing programme coordination, follow-up cadence, biomarker-trend interpretation. MBBS + 3 years general practice. Trained in-house on TLC longevity protocols.',
  },
  {
    cat: 'Diagnostics',
    title: 'Lab Liaison Physician',
    location: 'Delhi (HQ)',
    type: 'Full-time',
    body: 'Manage day-to-day relationships with our Netherlands genomic partner + Indian NABL labs. MBBS or MD Pathology + experience working with international diagnostic labs.',
  },
  {
    cat: 'Operations',
    title: 'Centre Operations Lead',
    location: 'Mumbai · Hyderabad · Goa (opening 2026)',
    type: 'Full-time',
    body: 'End-to-end ownership of opening a new TLC centre — site identification, fit-out coordination, hiring, and first-90-day operations. 5+ years premium-brand operations or hospitality.',
  },
  {
    cat: 'Engineering',
    title: 'Full-Stack Engineer · Patient Platform',
    location: 'Remote · India',
    type: 'Full-time',
    body: 'Build the TLC patient platform — biomarker dashboards, longitudinal tracking, physician notes interface. TypeScript + React + Postgres. Healthcare experience preferred.',
  },
  {
    cat: 'Design',
    title: 'Senior Brand Designer',
    location: 'Remote · India',
    type: 'Contract',
    body: 'Own visual identity across web, print, programme deliverables. 5+ years editorial / lifestyle brand experience. Portfolio of premium-care or wellness work.',
  },
]

const VALUES = [
  {
    n: '01',
    title: 'Practising medicine, not marketing.',
    body: 'Every decision — clinical, design, business — bends toward the patient outcome. Marketing-led healthcare companies do not need to apply.',
  },
  {
    n: '02',
    title: 'Measure first.',
    body: 'We measure before we recommend. Internally, externally, always. If you cannot show your work, this is not the place.',
  },
  {
    n: '03',
    title: 'Long view.',
    body: 'Longevity medicine is a 20-year practice, not a 12-month campaign. We hire people who think in decades, not quarters.',
  },
  {
    n: '04',
    title: 'High craft, no theatre.',
    body: 'Clean code. Clean prescriptions. Clean rooms. Premium without performance — the work speaks; we don\'t need to.',
  },
]

const META = {
  title: 'Careers · TLC — The Longevity Centre',
  description:
    'Open roles at TLC across clinical, diagnostics, operations, engineering and design. Building India\'s premier longevity-medicine practice.',
  path: '/careers',
}

export function CareersPage() {
  useDocumentMeta(META)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    const el = root.current
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
    gsap.set(fade, { opacity: 0, y: 18 })
    gsap.to(fade, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      stagger: 0.07,
      scrollTrigger: { trigger: el, start: 'top 78%' },
    })
  }, [])

  return (
    <div ref={root}>
      {/* HERO */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 px-6 md:px-12 bg-white overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 500px at 18% 20%, rgba(148,84,85,0.05), transparent 60%), radial-gradient(700px 400px at 85% 80%, rgba(238,230,219,0.5), transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-16 items-end">
            <div>
              <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-5">
                — Careers —
              </div>
              <h1 className="font-display font-light text-[36px] md:text-[56px] xl:text-[68px] leading-[1.0] tracking-[-0.03em] text-ink mb-6">
                <span className="line-mask inline-block overflow-hidden align-bottom">
                  <span className="inline-block">Build the practice</span>
                </span>
                <br />
                <span className="line-mask inline-block overflow-hidden align-bottom">
                  <span className="inline-block font-bold text-rust">that builds the next twenty years.</span>
                </span>
              </h1>
              <p className="text-[14.5px] md:text-[16px] leading-[1.65] text-graphite font-light max-w-[560px]">
                We are hiring physicians, scientists, operators, engineers
                and designers who want to do the most rigorous longevity
                medicine in India — and stay around long enough to see the
                outcomes.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-ink/10 border border-ink/10 rounded-[18px] overflow-hidden">
              {[
                { k: '8', l: 'Centres pan-India' },
                { k: '20+', l: 'Years experience' },
                { k: '6', l: 'Open roles' },
                { k: '20-yr', l: 'Practice horizon' },
              ].map((s) => (
                <div key={s.l} className="bg-white px-4 py-5 text-center">
                  <div className="font-display font-bold text-[22px] md:text-[26px] text-rust leading-none mb-1.5 tabular-nums tracking-tight">
                    {s.k}
                  </div>
                  <div className="text-[9.5px] tracking-[0.28em] uppercase text-graphite font-semibold">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-cream/40">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center max-w-[680px] mx-auto mb-12 md:mb-14">
            <div className="fade-up text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-5">
              — How We Work —
            </div>
            <h2 className="font-display font-light text-[28px] md:text-[40px] leading-[1.1] tracking-[-0.025em] text-ink">
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block">Four operating principles.</span>
              </span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-ink/10 border border-ink/10 rounded-[20px] overflow-hidden">
            {VALUES.map((v) => (
              <article key={v.n} className="fade-up bg-white p-6 md:p-7 flex flex-col">
                <div className="font-display text-[20px] md:text-[24px] text-rust font-bold tabular-nums tracking-tight mb-4">
                  {v.n}
                </div>
                <span aria-hidden className="block h-px w-8 bg-rust mb-4" />
                <h3 className="font-display font-bold text-[18px] md:text-[20px] leading-[1.2] tracking-[-0.015em] text-ink mb-3">
                  {v.title}
                </h3>
                <p className="text-[13.5px] md:text-[14.5px] leading-[1.65] text-graphite font-light">
                  {v.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-white">
        <div className="max-w-[1180px] mx-auto">
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 md:gap-14 items-end mb-12 md:mb-14">
            <div>
              <div className="fade-up text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-5">
                — Open Roles —
              </div>
              <h2 className="font-display font-light text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.025em] text-ink">
                <span className="line-mask inline-block overflow-hidden align-bottom">
                  <span className="inline-block">Six positions{' '}
                    <span className="font-bold text-rust">currently hiring.</span>
                  </span>
                </span>
              </h2>
            </div>
            <p className="fade-up text-[14px] leading-[1.7] text-graphite font-light max-w-[420px] md:pb-2">
              We hire slowly and keep people. Average tenure on the founding
              team — eight years and counting.
            </p>
          </div>

          <div className="space-y-px bg-ink/10 border border-ink/10 rounded-[18px] overflow-hidden">
            {ROLES.map((r) => (
              <article
                key={r.title}
                className="fade-up bg-white hover:bg-cream/40 p-5 md:p-6 grid sm:grid-cols-[auto_1fr_auto] gap-4 sm:gap-6 items-start sm:items-center transition-colors duration-500"
              >
                <div className="text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold sm:w-[110px]">
                  {r.cat}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-[17px] md:text-[19px] leading-[1.2] tracking-[-0.015em] text-ink mb-1.5">
                    {r.title}
                  </h3>
                  <p className="text-[13px] md:text-[13.5px] leading-[1.55] text-graphite font-light mb-2">
                    {r.body}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] tracking-[0.22em] uppercase text-stone font-semibold">
                    <span>{r.location}</span>
                    <span aria-hidden className="text-stone/50">·</span>
                    <span>{r.type}</span>
                  </div>
                </div>
                <a
                  href="mailto:careers@thelongevitycentre.com?subject=Application%20-%20"
                  data-cursor="hover"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-white text-[10.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-300 shrink-0"
                >
                  Apply
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
                </a>
              </article>
            ))}
          </div>

          <div className="mt-12 max-w-[760px] mx-auto text-center bg-cream/50 border border-mist rounded-[18px] p-6 md:p-7">
            <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-3">
              Don't See Your Role?
            </div>
            <p className="text-[14px] leading-[1.65] text-graphite font-light mb-5">
              We are always open to remarkable people who don't fit existing
              boxes. Send a paragraph about what you do well + a short note on
              why TLC interests you.
            </p>
            <a
              href="mailto:careers@thelongevitycentre.com?subject=General%20Application"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 px-6 py-3.5 bg-rust text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-ink transition-colors duration-500"
            >
              Email Us Anyway
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
