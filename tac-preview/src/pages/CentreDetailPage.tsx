// CentreDetailPage — single template renders any city by slug.
// Routes: /centres/[slug]
//
// Sections:
//   1. Hero (full-bleed image, dark overlay, city name + area)
//   2. About this Centre — editorial 2-col with description
//   3. Address + Google Maps embed (visual map + click-through link)
//   4. Highlights (4-card hairline grid)
//   5. Other centres (cross-link to other cities)
//   6. CTA Band (white shared component)

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'
import { useDocumentMeta } from '../lib/seo'
import { CENTRES, getCentreBySlug } from '../lib/centres'
import { CtaBand } from '../App'

gsap.registerPlugin(ScrollTrigger)

function NotFound({ slug }: { slug: string }) {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6 py-32 bg-white">
      <div className="text-center max-w-[560px]">
        <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-5">
          — Centre Not Found —
        </div>
        <h1 className="font-display font-bold text-[34px] md:text-[48px] leading-[1.05] tracking-[-0.025em] text-ink mb-5">
          We couldn't find a centre at <span className="text-rust">"{slug}"</span>.
        </h1>
        <a
          href="/centres"
          data-cursor="hover"
          className="inline-flex items-center gap-3 px-6 py-3.5 bg-rust text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-ink transition-colors duration-500"
        >
          ← View All Centres
        </a>
      </div>
    </main>
  )
}

export function CentreDetailPage() {
  const slug = window.location.pathname
    .replace(/\/$/, '')
    .replace(/^\/centres\//, '')
  const centre = getCentreBySlug(slug)

  useDocumentMeta({
    title: centre
      ? `${centre.city} Centre · TLC — The Longevity Centre`
      : 'Centre · TLC',
    description: centre
      ? `${centre.city}: ${centre.description.substring(0, 155)}…`
      : 'TLC clinic location.',
    path: `/centres/${slug}`,
    jsonLd: centre && centre.verified
      ? {
          '@context': 'https://schema.org',
          '@type': 'MedicalClinic',
          '@id': `https://thelongevitycentre.com/centres/${centre.slug}#clinic`,
          name: `TLC ${centre.city}`,
          parentOrganization: { '@id': 'https://thelongevitycentre.com/#organization' },
          address: {
            '@type': 'PostalAddress',
            streetAddress: centre.address,
            addressLocality: centre.city,
            addressRegion: centre.state,
            addressCountry: 'IN',
          },
          telephone: centre.phone.replace(/\s+/g, ''),
          email: centre.email,
          url: `https://thelongevitycentre.com/centres/${centre.slug}`,
          openingHours: 'Mo-Sa 09:00-20:00',
        }
      : undefined,
  })

  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!centre || reduceMotion()) return
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
  }, [centre])

  if (!centre) return <NotFound slug={slug} />

  const others = CENTRES.filter((c) => c.slug !== centre.slug).slice(0, 3)
  const isOpen = centre.status === 'open'

  return (
    <div ref={root}>
      {/* ============================ HERO ============================ */}
      <section className="relative min-h-[520px] sm:min-h-[560px] md:min-h-[600px] lg:min-h-[640px] flex items-center overflow-hidden bg-ink">
        <img
          src={centre.hero}
          alt={`TLC ${centre.city} centre`}
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
              'linear-gradient(100deg, rgba(20,16,16,0.92) 0%, rgba(20,16,16,0.72) 42%, rgba(20,16,16,0.35) 70%, rgba(20,16,16,0.10) 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none mix-blend-multiply"
          style={{
            background:
              'radial-gradient(700px 500px at 15% 85%, rgba(148,84,85,0.32), transparent 60%)',
          }}
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-24 md:pt-28 pb-10">
          <div className="max-w-[760px]">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
              <a
                href="/centres"
                data-cursor="hover"
                className="inline-flex items-center gap-2 text-[10.5px] tracking-[0.3em] uppercase text-white/65 hover:text-white font-semibold transition-colors duration-300"
              >
                ← All Centres
              </a>
              <span className="text-white/25">/</span>
              <div className="inline-flex items-center gap-2.5">
                <span className="w-7 h-px bg-rust-soft" />
                <span className="text-[10.5px] tracking-[0.42em] uppercase font-semibold text-rust-soft">
                  {centre.region}
                </span>
              </div>
              {!isOpen && (
                <>
                  <span className="text-white/25">/</span>
                  <span className="text-[10.5px] tracking-[0.32em] uppercase font-semibold text-rust px-2.5 py-1 bg-rust/15 border border-rust/30 rounded-full">
                    Opening 2026
                  </span>
                </>
              )}
            </div>

            <h1 className="font-display font-bold text-[44px] md:text-[64px] xl:text-[76px] leading-[1.0] tracking-[-0.04em] text-white mb-5">
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block">{centre.city}</span>
              </span>
              <span className="text-rust-soft">.</span>
            </h1>

            <p className="text-[14px] md:text-[17px] leading-[1.5] text-rust-soft font-light italic max-w-[600px] mb-6">
              {centre.area}
            </p>

            <p className="text-[14.5px] md:text-[16.5px] leading-[1.65] text-white/85 max-w-[620px] font-light mb-9">
              Premium preventive medicine, diagnostics-led care, and the same
              physician panel that anchors the entire TLC network — now in{' '}
              {centre.city}.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/contact"
                data-cursor="hover"
                data-magnetic
                className="group inline-flex items-center gap-3 pl-5 pr-6 py-3.5 bg-white text-ink text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust hover:text-white transition-colors duration-500"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
                </span>
                Book Consultation
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
              </a>
              <a
                href={`tel:${centre.phone.replace(/\s+/g, '')}`}
                data-cursor="hover"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/30 text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-white/10 hover:border-white transition-colors duration-500"
              >
                {centre.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ ABOUT ============================ */}
      <section className="relative py-16 md:py-20 px-6 md:px-12 bg-white overflow-hidden">
        <div className="relative z-10 max-w-[1180px] mx-auto grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-start">
          <div>
            <div className="fade-up text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-5">
              — About This Centre —
            </div>
            <h2 className="font-display font-light text-[28px] md:text-[40px] xl:text-[44px] leading-[1.1] tracking-[-0.025em] text-ink">
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block">Built for</span>
              </span>
              <br />
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block font-bold text-rust">{centre.city} patients.</span>
              </span>
            </h2>
          </div>
          <div className="text-[14.5px] md:text-[15.5px] leading-[1.7] text-graphite font-light space-y-5">
            <p>{centre.description}</p>
            <div className="pt-3 border-t border-mist flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] tracking-[0.32em] uppercase text-rust font-semibold mb-1">
                  Operating Hours
                </div>
                <div className="text-[14px] text-ink font-medium">
                  {centre.timings}
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-[0.22em] uppercase font-semibold ${
                  isOpen
                    ? 'bg-green-soft/15 text-green border border-green-soft/30'
                    : 'bg-rust/10 text-rust border border-rust/25'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-soft animate-pulse' : 'bg-rust'}`} />
                {isOpen ? 'Open Now' : 'Opening 2026'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ LOCATION + MAP ============================ */}
      <section className="relative py-16 md:py-20 px-6 md:px-12 bg-cream/40 overflow-hidden">
        <div className="relative z-10 max-w-[1280px] mx-auto">
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-14 items-end mb-10 md:mb-12">
            <div>
              <div className="fade-up text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-5">
                — Location · Address —
              </div>
              <h2 className="font-display font-light text-[28px] md:text-[40px] xl:text-[44px] leading-[1.05] tracking-[-0.025em] text-ink">
                <span className="line-mask inline-block overflow-hidden align-bottom">
                  <span className="inline-block">Find us in</span>
                </span>{' '}
                <span className="line-mask inline-block overflow-hidden align-bottom">
                  <span className="inline-block font-bold text-rust">{centre.city}.</span>
                </span>
              </h2>
            </div>
            <p className="fade-up text-[14px] leading-[1.7] text-graphite font-light max-w-[420px] md:pb-2">
              Drop in for your first consultation, or call ahead — our team
              will arrange parking, paperwork, and a private waiting area
              before you arrive.
            </p>
          </div>

          {/* Map + Address card grid */}
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6 lg:gap-8 items-stretch">
            {/* Google Maps embed */}
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] rounded-[20px] overflow-hidden border border-mist shadow-[0_24px_50px_-30px_rgba(27,26,24,0.25)]">
              <iframe
                src={centre.mapsEmbed}
                title={`Map showing ${centre.city} centre location`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Address card */}
            <div className="bg-white border border-mist rounded-[20px] p-6 md:p-7 flex flex-col">
              {/* Full address */}
              <div className="text-[10px] tracking-[0.42em] uppercase text-rust font-semibold mb-3">
                Full Address
              </div>
              <p className="text-[14px] md:text-[15px] leading-[1.6] text-ink font-medium mb-6">
                {centre.address}
              </p>

              {/* Phone */}
              <div className="pt-5 mb-5 border-t border-mist">
                <div className="text-[10px] tracking-[0.32em] uppercase text-rust font-semibold mb-1.5">
                  Direct Line
                </div>
                <a
                  href={`tel:${centre.phone.replace(/\s+/g, '')}`}
                  className="font-display font-bold text-[18px] text-ink tabular-nums tracking-tight hover:text-rust transition-colors duration-300"
                >
                  {centre.phone}
                </a>
              </div>

              {/* Email */}
              <div className="pt-5 mb-7 border-t border-mist">
                <div className="text-[10px] tracking-[0.32em] uppercase text-rust font-semibold mb-1.5">
                  Email
                </div>
                <a
                  href={`mailto:${centre.email}`}
                  className="text-[14px] text-ink font-medium hover:text-rust transition-colors duration-300 break-all"
                >
                  {centre.email}
                </a>
              </div>

              {/* Open in Maps CTA */}
              <a
                href={centre.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="mt-auto group inline-flex items-center justify-center gap-2 px-5 py-3 bg-rust text-white text-[11px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-ink transition-colors duration-500"
              >
                Open in Google Maps
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ HIGHLIGHTS ============================ */}
      <section className="relative py-16 md:py-20 px-6 md:px-12 bg-white overflow-hidden">
        <div className="relative z-10 max-w-[1180px] mx-auto">
          <div className="text-center max-w-[680px] mx-auto mb-10 md:mb-12">
            <div className="fade-up text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-5">
              — What's Inside —
            </div>
            <h2 className="font-display font-light text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.025em] text-ink">
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block">{centre.city} centre,{' '}
                  <span className="font-bold text-rust">at a glance.</span>
                </span>
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-px bg-ink/10 border border-ink/10 rounded-[20px] overflow-hidden">
            {centre.highlights.map((h, i) => (
              <div key={i} className="fade-up bg-white p-5 md:p-6 flex items-start gap-4">
                <span className="font-display text-[14px] text-rust font-semibold tabular-nums tracking-tight w-7 shrink-0 pt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[13.5px] md:text-[14.5px] leading-[1.6] text-ink font-medium">
                  {h}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ OTHER CENTRES ============================ */}
      <section className="relative py-16 md:py-20 px-6 md:px-12 bg-cream/40 overflow-hidden">
        <div className="relative z-10 max-w-[1280px] mx-auto">
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 md:gap-12 items-end mb-10 md:mb-12">
            <div>
              <div className="fade-up text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-5">
                — Other Centres —
              </div>
              <h2 className="font-display font-light text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.025em] text-ink">
                <span className="line-mask inline-block overflow-hidden align-bottom">
                  <span className="inline-block">Eight clinics,{' '}
                    <span className="font-bold text-rust">one shared record.</span>
                  </span>
                </span>
              </h2>
            </div>
            <p className="fade-up text-[14px] leading-[1.7] text-graphite font-light max-w-[420px] md:pb-2">
              Travel, relocate, or seek a second opinion — your full medical
              record moves with you across every TLC centre.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10 rounded-[20px] overflow-hidden">
            {others.map((c) => (
              <a
                key={c.slug}
                href={`/centres/${c.slug}`}
                data-cursor="hover"
                className="group bg-white p-5 md:p-6 flex flex-col hover:bg-cream/40 transition-colors duration-500"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold">
                    {c.region}
                  </span>
                  {c.status === 'opening-soon' && (
                    <span className="text-[9px] tracking-[0.22em] uppercase text-rust font-semibold px-2 py-0.5 bg-rust/10 border border-rust/20 rounded-full">
                      Soon
                    </span>
                  )}
                </div>
                <h3 className="font-display font-bold text-[20px] md:text-[22px] leading-[1.15] tracking-[-0.015em] text-ink group-hover:text-rust transition-colors duration-500 mb-2">
                  {c.city}
                </h3>
                <span aria-hidden className="block h-px w-6 bg-rust mb-3 transition-all duration-700 group-hover:w-12" />
                <p className="text-[12.5px] tracking-[0.18em] uppercase text-graphite font-semibold mb-4">
                  {c.area}
                </p>
                <span className="inline-flex items-center gap-2 text-[10.5px] tracking-[0.28em] uppercase text-ink font-semibold mt-auto">
                  Visit Centre
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-1 text-rust">→</span>
                </span>
              </a>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="/centres"
              data-cursor="hover"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-rust font-semibold hover:text-ink transition-colors duration-300"
            >
              ← View All Eight Centres
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBand />
    </div>
  )
}

// Re-export for convenience
export { CENTRES }
