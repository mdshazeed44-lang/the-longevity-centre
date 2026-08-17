// SkinAestheticsDetailPage — single template that renders any of the
// 8 aesthetic treatments by slug. Reads slug from window.location.
//
// Sections:
//  1. Hero — eyebrow + title + description + CTAs + image
//  2. What it treats + Key benefits — 2-column hairline grid
//  3. Duration / sessions — single info card
//  4. Process — 4-step grid (dark band)
//  5. Other treatments — 6-card grid linking to siblings
//  6. CtaBand
import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { instantMotion } from '../lib/motion'
import { useDocumentMeta, breadcrumbList, SITE_URL } from '../lib/seo'
import { CtaBand } from '../components/sections/CtaBand'
import { BrandAmbassador } from '../components/sections/BrandAmbassador'
import {
  SKIN_TREATMENTS,
  getSkinTreatmentBySlug,
  skinFaqs,
} from '../lib/skin-treatments'
import { Faq } from '../components/sections/Faq'

gsap.registerPlugin(ScrollTrigger)

export function SkinAestheticsDetailPage() {
  const root = useRef<HTMLDivElement>(null)

  // Parse slug from URL
  const slug = window.location.pathname
    .replace(/\/$/, '')
    .replace(/^\/skin-aesthetics\//, '')
  const t = getSkinTreatmentBySlug(slug)

  // Per-page SEO. Called unconditionally — when slug is invalid we still
  // emit a coherent (non-rich) meta so search engines don't see homepage
  // metadata for a 404-shaped URL.
  useDocumentMeta(
    useMemo(
      () =>
        t
          ? {
              title: `${t.title} · TLC Skin & Aesthetics`,
              description:
                t.description.length > 158
                  ? t.description.slice(0, 155).trimEnd() + '…'
                  : t.description,
              path: `/skin-aesthetics/${t.slug}`,
              ogImage: t.image,
              jsonLd: [
                {
                  '@context': 'https://schema.org',
                  '@type': 'MedicalProcedure',
                  '@id': `${SITE_URL}/skin-aesthetics/${t.slug}#procedure`,
                  name: t.title,
                  description: t.description,
                  url: `${SITE_URL}/skin-aesthetics/${t.slug}`,
                  bodyLocation: 'Skin',
                  ...(t.process?.[0] && { preparation: t.process[0].body }),
                  ...(t.process?.[3] && { followup: t.process[3].body }),
                },
                breadcrumbList([
                  { name: 'Home', url: '/' },
                  { name: 'Skin & Aesthetics', url: '/skin-aesthetics' },
                  { name: t.shortName, url: `/skin-aesthetics/${t.slug}` },
                ]),
              ],
            }
          : {
              title: 'Treatment not found · TLC',
              description:
                'The skin treatment you were looking for could not be found. Browse all seven TLC aesthetic treatments.',
              path: '/skin-aesthetics',
            },
      [t]
    )
  )

  useEffect(() => {
    if (!t) return
    if (instantMotion()) return
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
        scrollTrigger: { trigger: mask, start: 'top 92%' },
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
  }, [t])

  if (!t) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-4">
          Not found
        </div>
        <h1 className="font-display font-light text-[34px] md:text-[50px] leading-[1.05] tracking-[-0.025em] text-ink mb-6">
          That treatment doesn't exist.
        </h1>
        <a
          href="/skin-aesthetics"
          data-cursor="hover"
          className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
        >
          Back to Skin & Aesthetics →
        </a>
      </div>
    )
  }

  const others = SKIN_TREATMENTS.filter((x) => x.slug !== t.slug)

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
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[10.5px] tracking-[0.32em] uppercase text-stone font-semibold mb-7"
          >
            <a
              href="/skin-aesthetics"
              data-cursor="hover"
              className="hover:text-rust transition-colors"
            >
              Skin & Aesthetics
            </a>
            <span aria-hidden className="text-rust/40">/</span>
            <span className="text-rust">{t.shortName}</span>
          </nav>

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
            {/* Copy */}
            <div>
              <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-5">
                {t.eyebrow}
              </div>
              <h1 className="font-display font-light text-[36px] md:text-[58px] xl:text-[68px] leading-[1.0] tracking-[-0.03em] text-ink mb-7 max-w-[780px]">
                <span className="line-mask inline-block overflow-hidden align-bottom">
                  <span className="inline-block font-bold text-rust">{t.title}</span>
                </span>
              </h1>
              <p className="text-[15px] md:text-[17px] leading-[1.7] text-graphite font-light max-w-[640px] mb-9">
                {t.description}
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
            </div>

            {/* Image */}
            <div className="relative aspect-[4/5] md:aspect-[5/6] rounded-[20px] overflow-hidden bg-mist">
              <img
                src={t.image}
                alt={`${t.title} treatment at TLC`}
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* TREATS + BENEFITS — 2-col hairline grid */}
      <section className="px-6 md:px-12 py-14 md:py-20 bg-cream/40">
        <div className="max-w-[1180px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/10 rounded-2xl overflow-hidden border border-ink/10">
            <article className="fade-up bg-white p-7 md:p-10">
              <div className="text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold mb-5">
                What it treats
              </div>
              <ul className="space-y-3.5">
                {t.treats.map((x) => (
                  <li
                    key={x}
                    className="flex items-start gap-3 text-[14.5px] md:text-[15px] leading-[1.65] text-ink font-light"
                  >
                    <span
                      aria-hidden
                      className="mt-2 w-1.5 h-1.5 rounded-full bg-rust shrink-0"
                    />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="fade-up bg-white p-7 md:p-10">
              <div className="text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold mb-5">
                Key benefits
              </div>
              <ul className="space-y-3.5">
                {t.benefits.map((x) => (
                  <li
                    key={x}
                    className="flex items-start gap-3 text-[14.5px] md:text-[15px] leading-[1.65] text-ink font-light"
                  >
                    <span
                      aria-hidden
                      className="mt-2 w-1.5 h-1.5 rounded-full bg-rust shrink-0"
                    />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          {/* Duration + note */}
          <div className="fade-up mt-px bg-white border border-ink/10 border-t-0 rounded-b-2xl px-7 md:px-10 py-6 -mt-px md:flex md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-3 mb-2 md:mb-0">
              <span aria-hidden className="text-rust">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <span className="text-[12px] tracking-[0.22em] uppercase text-ink font-semibold">
                {t.duration}
              </span>
            </div>
            {t.note && (
              <div className="text-[13px] md:text-[13.5px] leading-[1.6] text-stone font-light italic">
                {t.note}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PROCESS — dark band, 4-step grid */}
      {t.process && (
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
            <div className="flex items-center gap-3 mb-7">
              <span className="w-7 h-px bg-rust-soft" />
              <span className="text-[10.5px] tracking-[0.32em] text-rust-soft font-semibold uppercase">
                The Process
              </span>
            </div>
            <h2 className="font-display font-light text-[28px] md:text-[44px] leading-[1.05] tracking-[-0.025em] text-white mb-12 max-w-[820px]">
              Four steps from consult to recovery.{' '}
              <span className="font-bold text-rust-soft">
                Nothing booked you didn't agree to.
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
              {t.process.map((p) => (
                <article key={p.n} className="fade-up bg-ink p-6 md:p-7">
                  <div className="font-display font-bold text-[13px] text-rust-soft tabular-nums tracking-tight mb-4">
                    {p.n}
                  </div>
                  <h3 className="font-display font-bold text-[18px] md:text-[20px] leading-[1.2] tracking-[-0.015em] text-white mb-3">
                    {p.title}
                  </h3>
                  <p className="text-[13px] leading-[1.65] text-white/70 font-light">
                    {p.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OTHER TREATMENTS */}
      <section className="px-6 md:px-12 py-14 md:py-20 bg-white">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex items-center gap-3 mb-7">
            <span className="w-7 h-px bg-rust" />
            <span className="text-[10.5px] tracking-[0.32em] text-rust font-semibold uppercase">
              Other Treatments
            </span>
          </div>
          <h2 className="font-display font-light text-[26px] md:text-[40px] leading-[1.05] tracking-[-0.025em] text-ink mb-10 max-w-[820px]">
            Six more services in our{' '}
            <span className="font-bold text-rust">
              dermatology-led suite.
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {others.map((o) => (
              <a
                key={o.slug}
                href={`/skin-aesthetics/${o.slug}`}
                data-cursor="hover"
                className="group block relative aspect-[4/3] rounded-[16px] overflow-hidden bg-mist"
              >
                <img
                  src={o.image}
                  alt={`${o.title} at TLC`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.78) 100%)',
                  }}
                />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-[9.5px] tracking-[0.32em] uppercase text-white/70 font-semibold mb-1.5">
                    {o.eyebrow}
                  </div>
                  <div className="font-display font-bold text-[18px] md:text-[20px] leading-[1.15] tracking-[-0.02em] flex items-end justify-between gap-3">
                    <span>{o.title}</span>
                    <span
                      aria-hidden
                      className="text-rust-soft text-[18px] transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Faq
        faqs={skinFaqs(t)}
        heading={`Questions about ${t.shortName}`}
        idPrefix={`skin-${t.slug}-faq`}
      />
      <BrandAmbassador />
      <CtaBand />
    </div>
  )
}
