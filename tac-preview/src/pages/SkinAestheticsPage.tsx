// SkinAestheticsPage — /skin-aesthetics
// Editorial INDEX page covering TLC's seven aesthetic treatments.
// Each row is a teaser linking to its dedicated detail page at
// /skin-aesthetics/[slug]. Content sourced from
// theantiagingcentre.com via the shared lib/skin-treatments module.
//
// Sections:
//   1. Hero (with anchor chip strip — clicks scroll the index page;
//      "View" CTA per row goes to the detail page)
//   2. Seven treatment teasers (alternating image + content rows)
//   3. Why Choose TLC (5-card dark band)
//   4. CtaBand
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'
import { useDocumentMeta } from '../lib/seo'
import { CtaBand } from '../components/sections/CtaBand'
import { SKIN_TREATMENTS } from '../lib/skin-treatments'

gsap.registerPlugin(ScrollTrigger)

const META = {
  title: 'Skin & Aesthetics · TLC — The Longevity Centre',
  description:
    'Dermatology-led anti-aging skin clinic at TLC — pigmentation, acne and scars, dullness, fine lines and wrinkles. Lasers, peels, injectables and advanced facials, performed by physicians.',
  path: '/skin-aesthetics',
  ogImage: '/og/skin-aesthetics.jpg',
}

// Numbered list (01 → 07) for display purposes
const TREATMENTS = SKIN_TREATMENTS.map((t, i) => ({
  ...t,
  n: String(i + 1).padStart(2, '0'),
}))

const WHY_CHOOSE = [
  {
    n: '01',
    title: 'Expert team',
    body:
      'Dermatologist-led care with extensive clinical experience — every procedure performed by a qualified physician, never a technician.',
  },
  {
    n: '02',
    title: 'World-class facilities',
    body:
      'Luxurious clinical environments designed for comfort and privacy — across our centres in Delhi, Gurgaon, Pune and Bangalore.',
  },
  {
    n: '03',
    title: 'Personalised care',
    body:
      'No package deals on the cell. Treatment plans are customised to your skin, your goals, and your timeline — and revised as your skin responds.',
  },
  {
    n: '04',
    title: 'Authentic equipment',
    body:
      'CE-certified machines, FDA-approved injectables, no compounded shortcuts. Quanta laser from Italy. Dermapen 4 for microneedling.',
  },
  {
    n: '05',
    title: 'Proven outcomes',
    body:
      'A track record of successful treatments — backed by photographic comparison, clinical scoring, and ongoing review at every visit.',
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
    gsap.utils.toArray<HTMLElement>('.fade-up').forEach((node) => {
      gsap.to(node, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: { trigger: node, start: 'top 86%' },
      })
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
          <h1 className="font-display font-light text-[40px] md:text-[64px] xl:text-[78px] leading-[1.0] tracking-[-0.03em] text-ink mb-8 max-w-[1000px]">
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block">Dermatology-led</span>
            </span>{' '}
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block font-bold text-rust">
                anti-aging skin clinic.
              </span>
            </span>
          </h1>
          <p className="text-[15px] md:text-[17.5px] leading-[1.7] text-graphite font-light max-w-[700px] mb-10">
            Treatments for pigmentation, acne and acne scars, dullness, fine
            lines and wrinkles — using lasers, peels, injectables and advanced
            facials. Every protocol led by a physician, backed by diagnostics,
            and timed to your skin's regeneration cycle.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/contact"
              data-cursor="hover"
              data-magnetic
              className="group inline-flex items-center gap-3 pl-5 pr-7 py-4 bg-ink text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
            >
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

          {/* Treatment quick-list — links to detail pages */}
          <div className="mt-12 md:mt-16 flex flex-wrap gap-2">
            {TREATMENTS.map((t) => (
              <a
                key={t.slug}
                href={`/skin-aesthetics/${t.slug}`}
                data-cursor="hover"
                className="inline-flex items-center gap-2 px-3.5 py-2 border border-ink/12 rounded-full text-[10.5px] tracking-[0.22em] uppercase font-semibold text-graphite hover:border-rust hover:text-rust transition-colors duration-300"
              >
                <span className="text-rust tabular-nums">{t.n}</span>
                {t.shortName}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TREATMENTS — alternating image + content rows */}
      <section className="px-6 md:px-12 py-14 md:py-20 bg-white">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-7 h-px bg-rust" />
            <span className="text-[10.5px] tracking-[0.32em] text-rust font-semibold uppercase">
              Our Treatments
            </span>
          </div>
          <h2 className="font-display font-light text-[28px] md:text-[44px] leading-[1.05] tracking-[-0.025em] text-ink mb-12 max-w-[840px]">
            Seven specialist treatments.{' '}
            <span className="font-bold text-rust">One standard of care.</span>
          </h2>

          <div className="space-y-12 md:space-y-16">
            {TREATMENTS.map((t, idx) => {
              const reverse = idx % 2 === 1
              const detailHref = `/skin-aesthetics/${t.slug}`
              return (
                <article
                  key={t.slug}
                  id={t.slug}
                  className="fade-up grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-14 items-center scroll-mt-24"
                >
                  {/* Image — clickable, links to detail */}
                  <a
                    href={detailHref}
                    data-cursor="hover"
                    aria-label={`Open the ${t.title} detail page`}
                    className={`group relative block aspect-[4/3] md:aspect-[5/4] rounded-[20px] overflow-hidden bg-mist ${
                      reverse ? 'md:order-2' : ''
                    }`}
                  >
                    <img
                      src={t.image}
                      alt={`${t.title} treatment at TLC`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)',
                      }}
                    />
                    <div className="absolute top-5 left-5 backdrop-blur-md bg-white/15 border border-white/25 rounded-full px-3.5 py-1.5">
                      <span className="font-display font-bold text-[13px] text-white tabular-nums tracking-tight">
                        {t.n}
                      </span>
                    </div>
                  </a>

                  {/* Content */}
                  <div className={reverse ? 'md:order-1' : ''}>
                    <div className="text-[10.5px] tracking-[0.32em] text-rust font-semibold uppercase mb-4">
                      {t.eyebrow}
                    </div>
                    <a
                      href={detailHref}
                      data-cursor="hover"
                      className="block group/title"
                    >
                      <h3 className="font-display font-bold text-[28px] md:text-[40px] leading-[1.0] tracking-[-0.025em] text-ink mb-5 transition-colors duration-500 group-hover/title:text-rust">
                        {t.title}
                      </h3>
                    </a>
                    <p className="text-[14.5px] md:text-[15px] leading-[1.7] text-graphite font-light mb-6">
                      {t.description}
                    </p>

                    {/* Treats + Benefits — two compact columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                      <div>
                        <div className="text-[9.5px] tracking-[0.32em] uppercase text-stone font-semibold mb-3">
                          What it treats
                        </div>
                        <ul className="space-y-2">
                          {t.treats.map((x) => (
                            <li
                              key={x}
                              className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-graphite font-light"
                            >
                              <span
                                aria-hidden
                                className="mt-2 w-1.5 h-1.5 rounded-full bg-rust shrink-0"
                              />
                              <span>{x}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-[9.5px] tracking-[0.32em] uppercase text-stone font-semibold mb-3">
                          Key benefits
                        </div>
                        <ul className="space-y-2">
                          {t.benefits.map((x) => (
                            <li
                              key={x}
                              className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-graphite font-light"
                            >
                              <span
                                aria-hidden
                                className="mt-2 w-1.5 h-1.5 rounded-full bg-rust shrink-0"
                              />
                              <span>{x}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Duration + Read more CTA */}
                    <div className="border-t border-ink/10 pt-5 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span aria-hidden className="text-rust">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        </span>
                        <span className="text-[12px] tracking-[0.18em] uppercase text-ink font-semibold">
                          {t.duration}
                        </span>
                      </div>
                      <a
                        href={detailHref}
                        data-cursor="hover"
                        className="group/cta inline-flex items-center gap-2 text-[11px] tracking-[0.32em] uppercase text-rust hover:text-ink font-semibold transition-colors"
                      >
                        Read more
                        <span
                          aria-hidden
                          className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1"
                        >
                          →
                        </span>
                      </a>
                    </div>
                    {t.note && (
                      <div className="mt-3 text-[12.5px] text-stone leading-[1.5] font-light italic">
                        {t.note}
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE TLC — dark band, 5 cards */}
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
              Why TLC
            </span>
          </div>
          <h2 className="font-display font-light text-[28px] md:text-[44px] leading-[1.05] tracking-[-0.025em] text-white mb-12 max-w-[840px]">
            Why patients trust us with their{' '}
            <span className="font-bold text-rust-soft">most personal care.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {WHY_CHOOSE.map((w) => (
              <article
                key={w.n}
                className="fade-up bg-ink p-6 md:p-7"
              >
                <div className="font-display font-bold text-[13px] text-rust-soft tabular-nums tracking-tight mb-4">
                  {w.n}
                </div>
                <h3 className="font-display font-bold text-[17px] md:text-[19px] leading-[1.2] tracking-[-0.015em] text-white mb-3">
                  {w.title}
                </h3>
                <p className="text-[13px] leading-[1.65] text-white/70 font-light">
                  {w.body}
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
