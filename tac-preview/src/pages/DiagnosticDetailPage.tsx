// DiagnosticDetailPage — single template that renders any of the 9 diagnostic
// services by slug. Reads slug from window.location.pathname.
//
// Sections:
//  1. Hero (full-screen, dark image, eyebrow + headline + intro + CTAs)
//  2. What it is — editorial 2-col with image
//  3. Why it's superior — checkmark list with intro
//  4. Benefits — 6 outcome cards
//  5. Process — 3 step grid (dark band)
//  6. Technical specs — 5 hairline rows
//  7. Who it's for — bullet list
//  8. Related diagnostics — 3-card grid linking to other tests
//  9. CTA Band (reused from App)

import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'
import { useDocumentMeta, breadcrumbList, SITE_URL } from '../lib/seo'
import { CtaBand } from '../components/sections/CtaBand'
import { MilindAnchor } from '../components/sections/MilindAnchor'
import { DIAGNOSTICS, getDiagnosticBySlug } from '../lib/diagnostics'

gsap.registerPlugin(ScrollTrigger)

export function DiagnosticDetailPage() {
  const root = useRef<HTMLDivElement>(null)

  // Parse slug from URL
  const slug = window.location.pathname
    .replace(/\/$/, '')
    .replace(/^\/diagnostics\//, '')
  const test = getDiagnosticBySlug(slug)

  // Per-page SEO. Called unconditionally (hooks rules) — when the slug
  // is invalid we still emit a generic 404-shaped meta so search engines
  // see a coherent (non-indexed) page rather than the homepage's title.
  useDocumentMeta(
    useMemo(
      () =>
        test
          ? {
              title: `${test.name} · TLC Diagnostics`,
              description:
                test.intro.length > 158
                  ? test.intro.slice(0, 155).trimEnd() + '…'
                  : test.intro,
              path: `/diagnostics/${test.slug}`,
              jsonLd: [
                {
                  '@context': 'https://schema.org',
                  '@type': 'MedicalProcedure',
                  '@id': `${SITE_URL}/diagnostics/${test.slug}#procedure`,
                  name: test.name,
                  alternateName: test.shortName,
                  description: test.intro,
                  url: `${SITE_URL}/diagnostics/${test.slug}`,
                  bodyLocation: 'Body',
                  preparation: test.process[0]?.body,
                  followup: test.process[2]?.body,
                },
                breadcrumbList([
                  { name: 'Home', url: '/' },
                  { name: 'Diagnostics', url: '/diagnostics' },
                  { name: test.shortName, url: `/diagnostics/${test.slug}` },
                ]),
              ],
            }
          : {
              title: 'Diagnostic not found · TLC',
              description:
                'The diagnostic you were looking for could not be found. View all nine TLC diagnostic protocols.',
              path: '/diagnostics',
            },
      [test]
    )
  )

  useEffect(() => {
    if (!test) return
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
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })
  }, [test])

  // 404 — slug not found
  if (!test) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="text-center max-w-[560px]">
          <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-5">
            — Not Found —
          </div>
          <h1 className="font-display font-bold text-[34px] md:text-[48px] leading-[1.05] tracking-[-0.025em] text-ink mb-5">
            That diagnostic isn't here.
          </h1>
          <p className="text-[15px] text-graphite font-light mb-8">
            The page you're looking for doesn't exist. View all nine diagnostic protocols on our diagnostics page.
          </p>
          <a
            href="/diagnostics"
            className="inline-flex items-center gap-3 px-6 py-3.5 bg-rust text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-ink transition-colors duration-500"
          >
            View All Diagnostics →
          </a>
        </div>
      </main>
    )
  }

  const related = test.related
    .map((s) => getDiagnosticBySlug(s))
    .filter((d): d is NonNullable<typeof d> => Boolean(d))

  return (
    <div ref={root}>
      {/* ============================ HERO ============================ */}
      {/* Responsive heights — smaller on mobile so content above-the-fold
          stays visible without users having to scroll past a wall of image. */}
      <section
        className="relative min-h-[560px] sm:min-h-[600px] md:min-h-[680px] lg:h-screen lg:min-h-[700px] flex items-center overflow-hidden bg-ink"
      >
        <img
          src={test.heroImg}
          alt={test.heroAlt}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(100deg, rgba(20,16,16,0.85) 0%, rgba(20,16,16,0.62) 45%, rgba(20,16,16,0.30) 75%, rgba(20,16,16,0.10) 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none mix-blend-multiply"
          style={{
            background:
              'radial-gradient(700px 500px at 15% 85%, rgba(148,84,85,0.30), transparent 60%)',
          }}
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-24 md:pt-28">
          <div className="max-w-[820px]">
            {/* Breadcrumb + category eyebrow */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <a
                href="/diagnostics"
                data-cursor="hover"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-white/70 hover:text-white font-semibold transition-colors duration-300"
              >
                ← Diagnostics
              </a>
              <span className="text-white/30">·</span>
              <span className="text-[10.5px] tracking-[0.42em] uppercase text-rust-soft font-semibold">
                {test.category}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-light text-[40px] md:text-[60px] xl:text-[74px] leading-[1.0] tracking-[-0.035em] text-white mb-6">
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block">{test.name.split(' — ')[0]}</span>
              </span>
              {test.name.includes(' — ') && (
                <>
                  <br />
                  <span className="line-mask inline-block overflow-hidden align-bottom">
                    <span className="inline-block font-bold text-rust-soft">
                      {test.name.split(' — ')[1]}
                    </span>
                  </span>
                </>
              )}
            </h1>

            {/* Tagline */}
            <p className="text-[15.5px] md:text-[20px] leading-[1.45] text-white max-w-[640px] font-light mb-5 italic">
              {test.tagline}
            </p>

            {/* Intro */}
            <p className="text-[14.5px] md:text-[16px] leading-[1.65] text-white/75 max-w-[600px] font-light mb-9">
              {test.intro}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/contact"
                data-cursor="hover"
                data-magnetic
                className="group inline-flex items-center gap-3 pl-5 pr-6 py-3.5 bg-white text-ink text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust hover:text-white transition-colors duration-500"
              >
                Book This Test
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#what"
                data-cursor="hover"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/30 text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-white/10 hover:border-white transition-colors duration-500"
              >
                Learn How It Works
              </a>
            </div>
          </div>

          {/* Floating spec chip — bottom-right (lg+ only, text is too long for mobile) */}
          <div className="hidden lg:flex absolute bottom-10 right-12 items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] tracking-[0.28em] uppercase text-white font-semibold max-w-[420px]">
            <span className="w-1.5 h-1.5 rounded-full bg-rust-soft animate-pulse shrink-0" />
            <span className="truncate">{test.duration} · {test.sampleType}</span>
          </div>
        </div>
      </section>

      {/* ============================ WHAT IT IS ============================ */}
      <section id="what" className="relative py-20 md:py-28 px-6 md:px-12 bg-white overflow-hidden">
        <div className="relative z-10 max-w-[1280px] mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <div className="fade-up text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-6">
              — What It Is —
            </div>
            <h2 className="font-display font-light text-[30px] md:text-[44px] leading-[1.1] tracking-[-0.025em] text-ink mb-8">
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block">{test.whatItIs.title}</span>
              </span>
            </h2>
            <div className="space-y-5 text-[14.5px] md:text-[15.5px] leading-[1.7] text-graphite font-light">
              {test.whatItIs.body.map((p, i) => (
                <p key={i} className={i === test.whatItIs.body.length - 1 ? 'text-ink font-medium' : ''}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Spec card */}
          <div className="md:sticky md:top-28 bg-cream rounded-[20px] border border-mist p-7 md:p-9">
            <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-6">
              — Quick Facts —
            </div>
            <ul className="divide-y divide-mist">
              {test.technical.map((t) => (
                <li key={t.k} className="py-4 grid grid-cols-[110px_1fr] md:grid-cols-[140px_1fr] gap-3 md:gap-5">
                  <div className="text-[10px] tracking-[0.28em] uppercase text-stone font-semibold pt-0.5">
                    {t.k}
                  </div>
                  <div className="text-[13.5px] md:text-[14.5px] text-ink font-medium leading-[1.5]">
                    {t.v}
                  </div>
                </li>
              ))}
            </ul>
            <a
              href="/contact"
              data-cursor="hover"
              className="mt-7 group inline-flex items-center gap-3 pl-5 pr-6 py-3.5 bg-rust text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-ink transition-colors duration-500"
            >
              Book This Test
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================ WHY SUPERIOR ============================ */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 bg-cream/40 overflow-hidden">
        {/* Soft ambient backdrop */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              'radial-gradient(900px 500px at 12% 0%, rgba(167,75,42,0.06), transparent 60%), radial-gradient(700px 450px at 92% 100%, rgba(54,73,68,0.04), transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-[1180px] mx-auto">
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 items-end mb-14 md:mb-16">
            <div>
              <div className="fade-up flex items-center gap-3 mb-6">
                <span className="w-7 h-px bg-rust" />
                <span className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold">
                  Why It's Different
                </span>
              </div>
              <h2 className="font-display font-light text-[30px] md:text-[44px] xl:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
                <span className="line-mask inline-block overflow-hidden align-bottom">
                  <span className="inline-block font-bold text-rust">{test.whySuperior.title}</span>
                </span>
              </h2>
            </div>
            <p className="fade-up text-[14.5px] md:text-[16px] leading-[1.7] text-graphite font-light max-w-[480px] md:pb-3">
              {test.whySuperior.intro}
            </p>
          </div>

          {/* Numbered feature cards — 1col phone, 2col tablet, 3col desktop.
              Each card has a tabular rust number, hover lift, and subtle accent
              border that strengthens on hover. Adapts to any number of points. */}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {test.whySuperior.points.map((point, i) => (
              <li
                key={i}
                className="fade-up group relative bg-white border border-mist rounded-[20px] p-6 md:p-7 transition-all duration-500 hover:border-rust/40 hover:-translate-y-0.5"
                style={{
                  boxShadow:
                    '0 1px 0 rgba(255,255,255,0.7) inset, 0 24px 50px -40px rgba(27,26,24,0.18)',
                }}
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-display text-[28px] md:text-[32px] font-bold text-rust tabular-nums leading-none tracking-tight">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-mist group-hover:bg-rust/30 transition-colors duration-500" />
                </div>
                <p className="text-[14px] md:text-[15px] leading-[1.6] text-ink font-medium">
                  {point}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ BENEFITS ============================ */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 bg-white overflow-hidden">
        <div className="relative z-10 max-w-[1280px] mx-auto">
          <div className="text-center max-w-[760px] mx-auto mb-14 md:mb-16">
            <div className="fade-up text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-6">
              — Benefits —
            </div>
            <h2 className="font-display font-light text-[30px] md:text-[44px] xl:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block">What you walk away with.</span>
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10 rounded-[20px] overflow-hidden">
            {test.benefits.map((b, i) => (
              <article key={i} className="fade-up bg-white p-6 md:p-7">
                <div className="font-display text-[20px] md:text-[22px] text-rust font-semibold tabular-nums tracking-tight mb-3">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <span aria-hidden className="block h-px w-6 bg-rust mb-4" />
                <p className="text-[14px] md:text-[15px] leading-[1.6] text-ink font-medium">
                  {b}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ PROCESS ============================ */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 bg-ink text-white overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              'radial-gradient(900px 500px at 20% 0%, rgba(148,84,85,0.18), transparent 60%), radial-gradient(700px 400px at 90% 100%, rgba(178,122,123,0.12), transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-[1280px] mx-auto">
          <div className="text-center mb-14 md:mb-20">
            <div className="fade-up text-[10.5px] tracking-[0.42em] uppercase text-rust-soft font-semibold mb-5">
              — The Process —
            </div>
            <h2 className="font-display font-light text-[30px] md:text-[48px] leading-[1.1] tracking-[-0.025em] text-white max-w-[760px] mx-auto">
              From sample to{' '}
              <span className="font-bold text-rust-soft">protocol — in three steps.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {test.process.map((p) => (
              <div
                key={p.n}
                className="fade-up relative p-7 md:p-8 bg-white/[0.03] border border-white/10 rounded-[18px] backdrop-blur-sm"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="font-display text-[28px] md:text-[34px] font-bold text-rust-soft tabular-nums tracking-tight mb-7">
                  {p.n}
                </div>
                <h3 className="font-display font-bold text-[22px] md:text-[26px] tracking-[-0.015em] text-white mb-4">
                  {p.title}
                </h3>
                <span aria-hidden className="block h-px w-8 bg-rust-soft mb-5" />
                <p className="text-[14px] leading-[1.65] text-white/75 font-light">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ WHO IT'S FOR ============================ */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 bg-white overflow-hidden">
        <div className="relative z-10 max-w-[1180px] mx-auto grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 items-start">
          <div>
            <div className="fade-up text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-6">
              — Who It's For —
            </div>
            <h2 className="font-display font-light text-[30px] md:text-[44px] leading-[1.1] tracking-[-0.025em] text-ink">
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block">Is this</span>
              </span>
              <br />
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block font-bold text-rust">your test?</span>
              </span>
            </h2>
          </div>
          <ul className="space-y-px bg-ink/10 border border-ink/10 rounded-[18px] overflow-hidden">
            {test.whoFor.map((w, i) => (
              <li key={i} className="fade-up bg-white p-5 md:p-6 flex items-start gap-4">
                <span className="font-display text-[14px] text-rust font-semibold tabular-nums tracking-tight w-7 shrink-0 pt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[14px] md:text-[15px] leading-[1.6] text-ink font-medium">
                  {w}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ RELATED ============================ */}
      {related.length > 0 && (
        <section className="relative py-20 md:py-28 px-6 md:px-12 bg-cream/40 overflow-hidden">
          <div className="relative z-10 max-w-[1280px] mx-auto">
            <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-end mb-14 md:mb-16">
              <div>
                <div className="fade-up text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-6">
                  — Related Diagnostics —
                </div>
                <h2 className="font-display font-light text-[30px] md:text-[44px] leading-[1.05] tracking-[-0.025em] text-ink">
                  <span className="line-mask inline-block overflow-hidden align-bottom">
                    <span className="inline-block">Often paired with{' '}
                      <span className="font-bold text-rust">{test.shortName}.</span>
                    </span>
                  </span>
                </h2>
              </div>
              <p className="fade-up text-[14.5px] leading-[1.7] text-graphite font-light max-w-[420px] md:pb-3">
                Diagnostics work best in combination. These tests cover adjacent biological domains and add depth to a {test.shortName} reading.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10 rounded-[20px] overflow-hidden">
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={`/diagnostics/${r.slug}`}
                  data-cursor="hover"
                  className="group bg-white p-6 md:p-7 flex flex-col hover:bg-cream/50 transition-colors duration-500"
                >
                  <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[14px] bg-mist mb-6">
                    <img
                      src={r.heroImg}
                      alt={r.heroAlt}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold mb-2">
                    {r.category}
                  </div>
                  <h3 className="font-display font-bold text-[18px] md:text-[20px] leading-[1.2] tracking-[-0.015em] text-ink group-hover:text-rust transition-colors duration-500 mb-3">
                    {r.shortName}
                  </h3>
                  <span aria-hidden className="block h-px w-6 bg-rust mb-3.5 transition-all duration-700 group-hover:w-12" />
                  <p className="text-[13px] md:text-[13.5px] leading-[1.55] text-graphite font-light mb-5 flex-1">
                    {r.tagline}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[10.5px] tracking-[0.28em] uppercase text-ink font-semibold mt-auto">
                    Learn more
                    <span className="inline-block transition-transform duration-500 group-hover:translate-x-1 text-rust">
                      →
                    </span>
                  </span>
                </a>
              ))}
            </div>

            {/* All diagnostics link */}
            <div className="mt-12 text-center">
              <a
                href="/diagnostics"
                data-cursor="hover"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-rust font-semibold hover:text-ink transition-colors duration-300"
              >
                ← View All Nine Diagnostics
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ============================ CTA ============================ */}
      <MilindAnchor />
      <CtaBand />
    </div>
  )
}

// Export DIAGNOSTICS for the index page (not strictly needed but convenient)
export { DIAGNOSTICS }
