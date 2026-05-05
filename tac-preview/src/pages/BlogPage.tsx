// BlogPage — editorial coming-soon page. Premium "in development" treatment
// rather than a 404 — visitors get an honest preview of what's coming +
// can subscribe for launch notification.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'
import { useDocumentMeta } from '../lib/seo'
import { CtaBand } from '../App'

gsap.registerPlugin(ScrollTrigger)

const PLANNED_TOPICS = [
  {
    cat: 'Diagnostics',
    title: 'Why 30 blood markers tell you nothing',
    body: 'The clinical case for a 160-marker panel — what each cluster reveals about metabolism, hormones, and silent inflammation.',
  },
  {
    cat: 'Longevity Science',
    title: 'GrimAge vs PhenoAge — which clock matters',
    body: 'A working-physician walk-through of three validated epigenetic clocks, what they actually measure, and how to reverse them.',
  },
  {
    cat: 'Microbiome',
    title: 'Why 16S microbiome tests miss 80% of the story',
    body: 'Whole-genome shotgun sequencing vs partial 16S rRNA — a side-by-side of what each test reveals (and conceals).',
  },
  {
    cat: 'Metabolic Health',
    title: 'PCOD reversal: what 12 months of measurement looks like',
    body: 'Anonymised case data from our PCOD Correction programme — biomarker progression, body composition, and lifestyle change.',
  },
  {
    cat: 'Cellular Biology',
    title: 'Mitochondrial dysfunction and why your energy is gone',
    body: 'The cellular mechanism behind chronic fatigue, and the targeted interventions that restore mitochondrial function.',
  },
  {
    cat: 'Patient Stories',
    title: 'Reformed life: 14 kg, 7 years younger biologically',
    body: 'Mr. Saxena\'s 12-month Longevity Plus journey — the markers that changed, what surprised him, what stuck.',
  },
]

const META = {
  title: 'Blog · TLC — The Longevity Centre',
  description:
    'Long-form clinical writing from TLC physicians on longevity science, diagnostics, and patient outcomes. Launching 2026.',
  path: '/blog',
}

export function BlogPage() {
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
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-end">
            <div>
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold">
                  — Blog · Launching 2026 —
                </span>
              </div>
              <h1 className="font-display font-light text-[36px] md:text-[56px] xl:text-[68px] leading-[1.0] tracking-[-0.03em] text-ink mb-6">
                <span className="line-mask inline-block overflow-hidden align-bottom">
                  <span className="inline-block">The longevity</span>
                </span>
                <br />
                <span className="line-mask inline-block overflow-hidden align-bottom">
                  <span className="inline-block font-bold text-rust">notebook.</span>
                </span>
              </h1>
              <p className="text-[14.5px] md:text-[16px] leading-[1.65] text-graphite font-light max-w-[560px]">
                Long-form clinical writing from TLC physicians — diagnostics
                deep-dives, patient stories, the science behind the
                programmes. Slow journalism, not content marketing.
              </p>
            </div>

            {/* Notify form */}
            <div className="bg-cream/50 border border-mist rounded-[18px] p-6 md:p-7">
              <div className="text-[10px] tracking-[0.42em] uppercase text-rust font-semibold mb-3">
                Notify Me at Launch
              </div>
              <p className="text-[13.5px] leading-[1.55] text-graphite font-light mb-5">
                Be the first to read each piece. No marketing emails — just
                new posts when they're published.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-2.5"
              >
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white border border-ink/15 rounded-full text-[13px] text-ink placeholder-stone focus:outline-none focus:border-rust transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 px-5 py-3 bg-rust text-white text-[11px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-ink transition-colors duration-300"
                >
                  Notify Me
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* PLANNED TOPICS */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-cream/40">
        <div className="max-w-[1180px] mx-auto">
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 md:gap-14 items-end mb-12 md:mb-14">
            <div>
              <div className="fade-up text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-5">
                — On the Editorial Calendar —
              </div>
              <h2 className="font-display font-light text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.025em] text-ink">
                <span className="line-mask inline-block overflow-hidden align-bottom">
                  <span className="inline-block">First six pieces,{' '}
                    <span className="font-bold text-rust">already in draft.</span>
                  </span>
                </span>
              </h2>
            </div>
            <p className="fade-up text-[14px] leading-[1.7] text-graphite font-light max-w-[440px] md:pb-2">
              Each post is written by a TLC physician, peer-reviewed within
              the practice, and edited for clarity over jargon. Average read
              time: 8–12 minutes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10 rounded-[20px] overflow-hidden">
            {PLANNED_TOPICS.map((t, i) => (
              <article key={t.title} className="fade-up bg-white p-6 md:p-7 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold">
                    {t.cat}
                  </span>
                  <span className="font-display text-[12px] text-stone font-semibold tabular-nums tracking-tight">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display font-bold text-[18px] md:text-[20px] leading-[1.2] tracking-[-0.015em] text-ink mb-4">
                  {t.title}
                </h3>
                <span aria-hidden className="block h-px w-6 bg-rust mb-4" />
                <p className="text-[13.5px] leading-[1.6] text-graphite font-light flex-1">
                  {t.body}
                </p>
                <div className="mt-5 pt-4 border-t border-mist text-[10px] tracking-[0.28em] uppercase text-stone font-semibold">
                  Coming · 2026
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
