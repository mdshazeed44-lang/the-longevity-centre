// SkinAestheticsPage — /skin-aesthetics
// Editorial service page covering TLC's medical-aesthetics offering.
// Tone: skin/hair/body as biology, not vanity. Every protocol led by a
// physician, backed by diagnostics, and timed to skin's regeneration
// cycle. Sections: hero, philosophy, treatment categories, the TLC
// difference, process, CtaBand.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'
import { useDocumentMeta } from '../lib/seo'
import { CtaBand } from '../App'

gsap.registerPlugin(ScrollTrigger)

const META = {
  title: 'Skin & Aesthetics · TLC — The Longevity Centre',
  description:
    'Medical aesthetics at TLC — skin, hair and body protocols led by physicians, backed by diagnostics. Treatments timed to your skin\'s regeneration cycle, not the calendar.',
  path: '/skin-aesthetics',
}

const PHILOSOPHY = [
  {
    n: '01',
    title: 'Diagnostics first',
    body:
      'Every protocol begins with a clinical skin analysis — barrier function, pigmentation, vascular load, sebum profile. We treat what we measure, not what we assume.',
  },
  {
    n: '02',
    title: 'Doctor-led, always',
    body:
      'Every injectable, peel and laser session is performed by a qualified physician. No technicians on the wand. No "package deals" on the cell.',
  },
  {
    n: '03',
    title: 'Evidence over trend',
    body:
      'We don\'t chase the new device of the season. We use the protocols supported by clinical literature — and we discontinue what doesn\'t work for you.',
  },
]

const CATEGORIES = [
  {
    label: 'Skin',
    eyebrow: 'Face · Neck · Décolletage',
    image: '/longevity/brand/mood-rust-towels.jpg',
    treatments: [
      'Medical-grade hydrafacials (clinical, not spa)',
      'Chemical peels — glycolic, salicylic, TCA, Cosmelan',
      'Microneedling with PRP / radiofrequency',
      'Laser resurfacing — fractional CO₂, Erbium, picosecond',
      'IPL for pigmentation and vascular lesions',
      'Mesotherapy and skin-booster injections',
    ],
  },
  {
    label: 'Aesthetic injectables',
    eyebrow: 'Restorative · Preventive',
    image: '/longevity/brand/mood-terracotta.jpg',
    treatments: [
      'Botulinum toxin — preventive and therapeutic dosing',
      'Hyaluronic-acid fillers (FDA-approved brands only)',
      'Biostimulators — Profhilo, Sculptra, Radiesse',
      'PRP injections — face, neck, hair',
      'Anti-jowl and jawline contouring (non-surgical)',
      'Tear-trough and under-eye correction',
    ],
  },
  {
    label: 'Hair',
    eyebrow: 'Restoration · Preservation',
    image: '/longevity/brand/mood-iflow.jpg',
    treatments: [
      'Diagnostic trichoscopy + scalp biopsy when indicated',
      'PRP and GFC sessions for androgenetic alopecia',
      'Mesotherapy with clinical hair-loss cocktails',
      'Low-level laser therapy (LLLT) protocols',
      'Hair-transplant pre-assessment and post-care',
      'Hormonal and nutritional workup for hair loss',
    ],
  },
  {
    label: 'Body',
    eyebrow: 'Composition · Contour',
    image: '/longevity/brand/mood-yoga-duo.jpg',
    treatments: [
      'Cryolipolysis (medical fat freezing)',
      'Radiofrequency body tightening',
      'Laser hair reduction — diode, Nd:YAG',
      'Stretch-mark and scar revision protocols',
      'Cellulite reduction — combined modalities',
      'Pre- and post-pregnancy body protocols',
    ],
  },
]

const DIFFERENCE = [
  {
    k: 'Annual',
    l: 'protocols',
    body:
      'Treatments mapped to a 12-month calendar — not one-off sessions. Skin remodels on a cycle, so we plan for the cycle.',
  },
  {
    k: '163',
    l: 'biomarkers',
    body:
      'Internal health drives external skin. We screen the same panel as our longevity programmes — inflammation, hormones, micronutrients, gut markers.',
  },
  {
    k: 'FDA-only',
    l: 'products',
    body:
      'Every injectable, filler and topical we use is FDA- or CE-approved — no off-label substitutes, no compounded shortcuts.',
  },
  {
    k: '0',
    l: 'sales targets',
    body:
      'Our doctors are not paid on what they sell. If a treatment isn\'t indicated, we tell you — and we hold sessions if your skin needs rest.',
  },
]

const PROCESS = [
  {
    n: '01',
    title: 'Consultation',
    body:
      'A physician-led 45-minute conversation — your concerns, your goals, your medical history. Photographs and clinical scoring of skin condition.',
  },
  {
    n: '02',
    title: 'Diagnostics',
    body:
      'When indicated — bloodwork, hormonal panels, trichoscopy, allergy testing. We treat the cause, not just the surface.',
  },
  {
    n: '03',
    title: 'Protocol',
    body:
      'A written plan with the schedule, the products, the costs and the expected milestones. Nothing booked you didn\'t agree to.',
  },
  {
    n: '04',
    title: 'Maintenance',
    body:
      'Quarterly reviews. Photo comparison. Protocol revisions based on what your skin actually responds to. No assumed "course" of sessions.',
  },
]

export function SkinAestheticsPage() {
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
      stagger: 0.05,
      scrollTrigger: { trigger: el, start: 'top 82%' },
    })
  }, [])

  return (
    <div ref={root}>
      {/* HERO */}
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-20 px-6 md:px-12 bg-white overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 500px at 18% 20%, rgba(148,84,85,0.05), transparent 60%), radial-gradient(700px 400px at 85% 80%, rgba(238,230,219,0.5), transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-[1180px] mx-auto">
          <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-5">
            — Skin & Aesthetics —
          </div>
          <h1 className="font-display font-light text-[40px] md:text-[68px] xl:text-[80px] leading-[1.0] tracking-[-0.03em] text-ink mb-8 max-w-[980px]">
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block">Medical aesthetics.</span>
            </span>
            <br />
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block font-bold text-rust">
                Without the gimmicks.
              </span>
            </span>
          </h1>
          <p className="text-[15px] md:text-[17.5px] leading-[1.7] text-graphite font-light max-w-[680px] mb-10">
            We treat skin, hair and body composition as biology — not vanity.
            Every protocol is led by a physician, backed by diagnostics, and
            timed to your skin's regeneration cycle. No technicians on the
            wand. No package deals on the cell.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/contact"
              data-cursor="hover"
              data-magnetic
              className="group inline-flex items-center gap-3 pl-5 pr-7 py-4 bg-ink text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
            >
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
              </span>
              Book a Consultation
              <span
                aria-hidden
                className="inline-block transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0"
              data-cursor="hover"
              className="inline-flex items-center gap-2 px-6 py-4 border border-ink/15 text-ink text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:border-rust hover:text-rust transition-colors duration-500"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY — 3-card hairline grid */}
      <section className="px-6 md:px-12 py-14 md:py-20 bg-cream/40">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-7 h-px bg-rust" />
            <span className="text-[10.5px] tracking-[0.32em] text-rust font-semibold uppercase">
              The Philosophy
            </span>
          </div>
          <h2 className="font-display font-light text-[28px] md:text-[44px] leading-[1.05] tracking-[-0.025em] text-ink mb-12 max-w-[840px]">
            Three rules that change everything about how aesthetic medicine{' '}
            <span className="font-bold text-rust">should be practised.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/10 rounded-2xl overflow-hidden border border-ink/10">
            {PHILOSOPHY.map((p) => (
              <article
                key={p.n}
                className="fade-up bg-white p-7 md:p-9"
              >
                <div className="font-display font-bold text-[15px] text-rust tabular-nums tracking-tight mb-5">
                  {p.n}
                </div>
                <h3 className="font-display font-bold text-[20px] md:text-[24px] leading-[1.15] tracking-[-0.02em] text-ink mb-3">
                  {p.title}
                </h3>
                <p className="text-[14.5px] leading-[1.7] text-graphite font-light">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TREATMENTS — 4 categories with image + treatment list */}
      <section className="px-6 md:px-12 py-14 md:py-20 bg-white">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-7 h-px bg-rust" />
            <span className="text-[10.5px] tracking-[0.32em] text-rust font-semibold uppercase">
              What We Treat
            </span>
          </div>
          <h2 className="font-display font-light text-[28px] md:text-[44px] leading-[1.05] tracking-[-0.025em] text-ink mb-12 max-w-[840px]">
            Four categories. <span className="font-bold text-rust">One standard of care.</span>
          </h2>

          <div className="space-y-10 md:space-y-14">
            {CATEGORIES.map((cat, idx) => {
              const reverse = idx % 2 === 1
              return (
                <article
                  key={cat.label}
                  className="fade-up grid md:grid-cols-2 gap-8 md:gap-12 items-center"
                >
                  <div
                    className={`relative aspect-[4/3] md:aspect-[5/4] rounded-[20px] overflow-hidden bg-mist ${
                      reverse ? 'md:order-2' : ''
                    }`}
                  >
                    <img
                      src={cat.image}
                      alt={`${cat.label} treatments at TLC`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%)',
                      }}
                    />
                  </div>

                  <div className={reverse ? 'md:order-1' : ''}>
                    <div className="text-[10.5px] tracking-[0.32em] text-rust font-semibold uppercase mb-4">
                      {cat.eyebrow}
                    </div>
                    <h3 className="font-display font-bold text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.03em] text-ink mb-6">
                      {cat.label}
                    </h3>
                    <ul className="space-y-3">
                      {cat.treatments.map((t) => (
                        <li
                          key={t}
                          className="flex items-start gap-3 text-[14.5px] leading-[1.6] text-graphite font-light"
                        >
                          <span
                            aria-hidden
                            className="mt-2 w-1.5 h-1.5 rounded-full bg-rust shrink-0"
                          />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* THE TLC DIFFERENCE — 4-card grid with stat + body */}
      <section className="px-6 md:px-12 py-14 md:py-20 bg-ink text-white relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay hero-grain"
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(800px 500px at 18% 25%, rgba(148,84,85,0.20), transparent 60%), radial-gradient(700px 400px at 85% 75%, rgba(178,122,123,0.10), transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-[1180px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-7 h-px bg-rust-soft" />
            <span className="text-[10.5px] tracking-[0.32em] text-rust-soft font-semibold uppercase">
              The TLC Difference
            </span>
          </div>
          <h2 className="font-display font-light text-[28px] md:text-[44px] leading-[1.05] tracking-[-0.025em] text-white mb-12 max-w-[840px]">
            Why patients choose us for their{' '}
            <span className="font-bold text-rust-soft">most personal protocols.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {DIFFERENCE.map((d) => (
              <article
                key={d.l}
                className="fade-up bg-ink p-7 md:p-8"
              >
                <div className="font-display font-bold text-[36px] md:text-[44px] leading-none tracking-[-0.025em] text-rust-soft mb-1">
                  {d.k}
                </div>
                <div className="text-[10px] tracking-[0.32em] uppercase text-white/60 font-semibold mb-5">
                  {d.l}
                </div>
                <p className="text-[13.5px] leading-[1.65] text-white/75 font-light">
                  {d.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS — 4-step horizontal */}
      <section className="px-6 md:px-12 py-14 md:py-20 bg-white">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-7 h-px bg-rust" />
            <span className="text-[10.5px] tracking-[0.32em] text-rust font-semibold uppercase">
              The Process
            </span>
          </div>
          <h2 className="font-display font-light text-[28px] md:text-[44px] leading-[1.05] tracking-[-0.025em] text-ink mb-12 max-w-[840px]">
            From first conversation to long-term plan —{' '}
            <span className="font-bold text-rust">four steps, no surprises.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 rounded-2xl overflow-hidden border border-ink/10">
            {PROCESS.map((p) => (
              <article
                key={p.n}
                className="fade-up bg-white p-7 md:p-8 relative"
              >
                <div className="font-display font-bold text-[13px] text-rust tabular-nums tracking-tight mb-5">
                  {p.n}
                </div>
                <h3 className="font-display font-bold text-[19px] md:text-[22px] leading-[1.15] tracking-[-0.02em] text-ink mb-3">
                  {p.title}
                </h3>
                <p className="text-[13.5px] leading-[1.65] text-graphite font-light">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
