// CentresPage — five clinics directory + online consultations.
// Addresses sourced verbatim from theantiagingcentre.com (Gurugram, Pune, Delhi).
// Bangalore branches kept at city/area level only (no street address verified).
//
// Photos: pulled from TAC's official site (theantiagingcentre.com).
// Four unique TAC clinic photos exist publicly:
//   - Gurugram exterior with neon "TAC … Block A1, Tikri Sec.48 Gurugram" sign
//     → only photo that visibly identifies a specific clinic
//   - Green-chairs lobby (TAC's own site labels this as Gurugram interior)
//   - Treatment room with line-art mural (TAC labels as Pune)
//   - Premium TAC-branded reception with archway corridor (TAC reuses this
//     for Delhi + both Bangalore branches on their own site)
//
// Alt text describes what's in each photo without claiming false specificity.
// TAC does not currently publish per-clinic photos for the Bangalore branches,
// so visual variety there is limited to architectural language across photos.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'
import { useDocumentMeta } from '../lib/seo'

gsap.registerPlugin(ScrollTrigger)

type Centre = {
  n: string
  city: string
  region: string
  area: string
  address: string
  phone: string
  email: string
  mapsUrl: string
  photo: string
  /** Honest alt text — describes what the photo actually shows, not necessarily this exact clinic. */
  photoAlt: string
  postalCode?: string
  /** When false, we don't emit MedicalClinic JSON-LD because we lack a verified street address */
  verified: boolean
}

const CENTRES: Centre[] = [
  {
    n: '01',
    city: 'Gurugram',
    region: 'Haryana · NCR',
    area: 'Sector 48',
    address:
      'Block A1, Tikri, Vipul World, Sohna Road, Near GD Goenka Public School, Sector 48, Gurugram, Haryana — 122018',
    phone: '+91 11 408 44848',
    email: 'info@theantiagingcentre.com',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=The+Anti-Aging+Centre+Sector+48+Gurugram',
    photo: '/tac-photos/gurugram-exterior.jpg',
    photoAlt: 'The TAC Gurugram clinic exterior with the neon TAC sign at Block A1, Tikri Sector 48',
    postalCode: '122018',
    verified: true,
  },
  {
    n: '02',
    city: 'Delhi',
    region: 'NCR',
    area: 'Greater Kailash-1',
    address: 'S-79, Ground Floor, Greater Kailash-1, New Delhi — 110048',
    phone: '+91 80 473 60047',
    email: 'info@theantiagingcentre.com',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=The+Anti-Aging+Centre+Greater+Kailash+Delhi',
    photo: '/tac-photos/delhi-bangalore-clinic.jpg',
    photoAlt: "TAC's signature reception with the TAC monogram and archway corridor",
    postalCode: '110048',
    verified: true,
  },
  {
    n: '03',
    city: 'Pune',
    region: 'Maharashtra',
    area: 'Hadapsar',
    address:
      '2nd Floor, Kumar Prism, Amanora Road, Opp. Fab India, Hadapsar, Pune — 411028',
    phone: '+91 11 408 44840',
    email: 'info@theantiagingcentre.com',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=The+Anti-Aging+Centre+Hadapsar+Pune',
    photo: '/tac-photos/pune-clinic.jpg',
    photoAlt: 'A TAC Pune Hadapsar treatment room with line-art mural and aesthetic equipment',
    postalCode: '411028',
    verified: true,
  },
  {
    n: '04',
    city: 'Bangalore',
    region: 'Karnataka',
    area: 'JP Nagar',
    address: 'JP Nagar, Bangalore, Karnataka',
    phone: '+91 88268 09123',
    email: 'info@theantiagingcentre.com',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=The+Anti-Aging+Centre+JP+Nagar+Bangalore',
    photo: '/tac-photos/delhi-bangalore-clinic.jpg',
    photoAlt: "TAC's signature reception with the TAC monogram and archway corridor",
    verified: false,
  },
  {
    n: '05',
    city: 'Bangalore',
    region: 'Karnataka',
    area: 'Sadashivnagar',
    address: 'Sadashivnagar, Bangalore, Karnataka',
    phone: '+91 88268 09123',
    email: 'info@theantiagingcentre.com',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=The+Anti-Aging+Centre+Sadashivnagar+Bangalore',
    photo: '/tac-photos/delhi-bangalore-clinic.jpg',
    photoAlt: "TAC's signature reception with the TAC monogram and archway corridor",
    verified: false,
  },
]

const HERO_STATS = [
  { k: 'Centres', v: '5' },
  { k: 'Reach', v: 'Pan-India' },
  { k: 'Online', v: 'Mumbai · Bangalore · Hyderabad' },
]

// Per-centre JSON-LD — only for centres with verified street addresses.
const CENTRES_JSONLD = CENTRES.filter((c) => c.verified).map((c) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  '@id': `https://theantiagingcentre.com/centres#${c.city.toLowerCase()}-${c.area.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  name: `TAC ${c.city} — ${c.area}`,
  parentOrganization: { '@id': 'https://theantiagingcentre.com/#organization' },
  telephone: c.phone.replace(/\s+/g, ''),
  email: c.email,
  url: 'https://theantiagingcentre.com/centres',
  address: {
    '@type': 'PostalAddress',
    streetAddress: c.address,
    addressLocality: c.city,
    addressRegion: c.region.split(' ·')[0],
    postalCode: c.postalCode,
    addressCountry: 'IN',
  },
  medicalSpecialty: ['PreventiveMedicine', 'Geriatric', 'Dermatology'],
}))

const CENTRES_META = {
  title: 'Our Centres — TAC Clinics in Gurugram, Delhi, Pune & Bangalore',
  description:
    'The Anti-Aging Centre operates five flagship clinics across India — Gurugram (Sector 48), Delhi (Greater Kailash-1), Pune (Hadapsar) and Bangalore (JP Nagar, Sadashivnagar) — plus online consultations in Mumbai, Bangalore and Hyderabad.',
  path: '/centres',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': 'https://theantiagingcentre.com/centres#webpage',
      url: 'https://theantiagingcentre.com/centres',
      name: 'Our Centres — TAC Clinics in Gurugram, Delhi, Pune & Bangalore',
      isPartOf: { '@id': 'https://theantiagingcentre.com/#organization' },
      about: { '@id': 'https://theantiagingcentre.com/#organization' },
      inLanguage: 'en-IN',
    },
    ...CENTRES_JSONLD,
  ],
}

export function CentresPage() {
  useDocumentMeta(CENTRES_META)
  const heroRef = useRef<HTMLHeadingElement>(null)
  const rowsRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    const cleanups: Array<() => void> = []

    // Hero heading masked-line reveal
    const heroLines = heroRef.current?.querySelectorAll<HTMLElement>('.line-mask > span')
    if (heroLines?.length) {
      gsap.set(heroLines, { yPercent: 110 })
      const t = gsap.to(heroLines, {
        yPercent: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.08,
        delay: 0.1,
      })
      cleanups.push(() => t.kill())
    }

    // Each centre row — image + content fade-up on scroll
    const rows = rowsRef.current?.querySelectorAll<HTMLElement>('.centre-row')
    rows?.forEach((row) => {
      const img = row.querySelector<HTMLElement>('.centre-img')
      const content = row.querySelector<HTMLElement>('.centre-content')
      if (img) {
        gsap.set(img, { y: 60, opacity: 0 })
        const t = gsap.to(img, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: row, start: 'top 78%' },
        })
        cleanups.push(() => {
          t.scrollTrigger?.kill()
          t.kill()
        })
      }
      if (content) {
        gsap.set(content, { y: 50, opacity: 0 })
        const t = gsap.to(content, {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'expo.out',
          delay: 0.1,
          scrollTrigger: { trigger: row, start: 'top 78%' },
        })
        cleanups.push(() => {
          t.scrollTrigger?.kill()
          t.kill()
        })
      }
    })

    // Gallery photos parallax
    const galleryImgs = galleryRef.current?.querySelectorAll<HTMLElement>('.gallery-img')
    galleryImgs?.forEach((img) => {
      const t = gsap.fromTo(
        img,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      )
      cleanups.push(() => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <div id="centres-page">
      {/* HERO — cinematic dark hero with cross-fading anti-aging montage:
          DNA helix → laboratory equipment → modern clinic corridor.
          Three short Pexels clips (~7 MB total) cross-fade on a 24s cycle. */}
      <section className="relative bg-ink text-white pt-28 md:pt-32 pb-12 md:pb-16 px-6 md:px-12 overflow-hidden min-h-[100vh] flex items-center">
        {/* Cross-fading clip stack */}
        <video
          className="hero-clip clip-1"
          src="/videos/centres-clips/dna.mp4"
          autoPlay loop muted playsInline preload="metadata"
          aria-hidden="true"
        />
        <video
          className="hero-clip clip-2"
          src="/videos/centres-clips/lab.mp4"
          autoPlay loop muted playsInline preload="metadata"
          aria-hidden="true"
        />
        <video
          className="hero-clip clip-3"
          src="/videos/centres-clips/clinic.mp4"
          autoPlay loop muted playsInline preload="metadata"
          aria-hidden="true"
        />

        {/* Cinematic overlays — dark gradient + warm rust glow + grain */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,8,7,0.65) 0%, rgba(10,8,7,0.35) 30%, rgba(10,8,7,0.55) 75%, rgba(10,8,7,0.85) 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(10,8,7,0.75) 0%, rgba(10,8,7,0.45) 45%, rgba(10,8,7,0.0) 70%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 600px at 80% 20%, rgba(178,122,123,0.20), transparent 60%), radial-gradient(700px 500px at 0% 80%, rgba(148,84,85,0.12), transparent 60%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay hero-grain"
        />

        <div className="relative max-w-[1280px] mx-auto w-full">
          <div className="flex items-center gap-3 mb-7">
            <span className="w-7 h-px bg-rust-soft" />
            <span className="text-[11px] tracking-[0.32em] text-rust-soft font-semibold uppercase">
              Our Centres
            </span>
          </div>
          <h1
            ref={heroRef}
            className="font-display font-bold text-[44px] md:text-[80px] xl:text-[96px] leading-[0.98] tracking-[-0.04em] text-white max-w-[1080px]"
          >
            <span className="line-mask">
              <span>Find us where</span>
            </span>
            <br />
            <span className="line-mask">
              <span>you live.</span>
            </span>
          </h1>

          <p className="mt-10 text-[16px] md:text-[19px] leading-[1.7] text-white/75 max-w-[640px] font-light">
            Five flagship clinics across India, plus online consultations in
            Mumbai, Bangalore and Hyderabad. One shared medical record across
            every centre — your care continues wherever you go.
          </p>

          {/* Slim spec pills — backdrop-blur chips matching About hero language */}
          <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-2.5 md:gap-3">
            {HERO_STATS.map((s) => (
              <div
                key={s.k}
                className="inline-flex items-center gap-2.5 md:gap-3 backdrop-blur-md bg-white/[0.06] hover:bg-white/[0.10] transition-colors duration-500 border border-white/15 rounded-full pl-3.5 pr-4 md:pl-4 md:pr-5 py-2 md:py-2.5 shadow-[0_18px_40px_-25px_rgba(0,0,0,0.6)]"
              >
                <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-rust-soft shrink-0" />
                <span className="text-[9.5px] tracking-[0.32em] uppercase text-white/60 font-semibold whitespace-nowrap">
                  {s.k}
                </span>
                <span className="text-[12.5px] md:text-[13px] tracking-[-0.005em] text-white font-semibold whitespace-nowrap">
                  {s.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CENTRES — alternating image/content rows */}
      <section className="bg-cream/40 py-16 md:py-20 px-6 md:px-12">
        <div ref={rowsRef} className="max-w-[1280px] mx-auto space-y-10 md:space-y-14">
          {CENTRES.map((c, idx) => {
            const reverse = idx % 2 === 1
            return (
              <article
                key={c.n}
                className="centre-row grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
              >
                {/* Photo — atmosphere, not labelled per-clinic */}
                <div
                  className={`centre-img relative aspect-[16/10] md:aspect-[3/2] md:max-h-[360px] rounded-[20px] overflow-hidden bg-mist ${
                    reverse ? 'md:order-2' : ''
                  }`}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <img
                    src={c.photo}
                    alt={c.photoAlt}
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
                  {/* Number badge */}
                  <div className="absolute top-5 left-5 backdrop-blur-md bg-white/15 border border-white/25 rounded-full px-3.5 py-1.5">
                    <span className="font-display font-bold text-[13px] text-white tabular-nums tracking-tight">
                      {c.n}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`centre-content ${reverse ? 'md:order-1' : ''}`}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-7 h-px bg-rust" />
                    <span className="text-[10.5px] tracking-[0.32em] text-rust font-semibold uppercase">
                      {c.region}
                    </span>
                  </div>

                  <h2 className="font-display font-bold text-[34px] md:text-[48px] lg:text-[56px] leading-[1.0] tracking-[-0.03em] text-ink mb-2">
                    {c.city}
                  </h2>
                  <div className="text-[13px] md:text-[14px] tracking-[0.22em] uppercase text-stone font-medium mb-7">
                    {c.area}
                  </div>

                  {/* Address */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 w-7 h-7 shrink-0 rounded-full border border-mist flex items-center justify-center text-rust">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </span>
                      <p className="text-[14.5px] leading-[1.65] text-graphite font-light max-w-[460px]">
                        {c.address}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 shrink-0 rounded-full border border-mist flex items-center justify-center text-rust">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </span>
                      <a
                        href={`tel:${c.phone.replace(/\s+/g, '')}`}
                        data-cursor="hover"
                        aria-label={`Call ${c.city} centre at ${c.phone}`}
                        className="text-[14.5px] tabular-nums tracking-tight text-graphite hover:text-rust-deep transition-colors"
                      >
                        {c.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 shrink-0 rounded-full border border-mist flex items-center justify-center text-rust">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </span>
                      <a
                        href={`mailto:${c.email}`}
                        data-cursor="hover"
                        className="text-[14.5px] tracking-tight text-graphite hover:text-rust-deep transition-colors"
                      >
                        {c.email}
                      </a>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="/#cta"
                      data-cursor="hover"
                      className="group inline-flex items-center gap-2.5 pl-5 pr-7 py-3.5 bg-ink text-white text-[12px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
                    >
                      <span className="relative flex h-2 w-2" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
                      </span>
                      Book Consultation
                      <span aria-hidden="true" className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                    <a
                      href={c.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      aria-label={`Get directions to TAC ${c.city} ${c.area}`}
                      className="inline-flex items-center gap-2 px-6 py-3.5 border border-ink/15 text-ink text-[12px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-ink hover:text-white transition-colors duration-500"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* ONLINE — emphasised callout for the sixth "centre" */}
      <section className="bg-ink text-white py-20 md:py-28 px-6 md:px-12 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 600px at 50% 50%, rgba(148,84,85,0.18), transparent 60%)',
          }}
        />
        <div className="relative max-w-[1180px] mx-auto grid md:grid-cols-[1fr_1fr] gap-10 md:gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-px bg-rust-soft" />
              <span className="text-[11px] tracking-[0.32em] text-rust-soft font-semibold uppercase">
                06 · Online · Pan-India
              </span>
            </div>
            <h2 className="font-display font-bold text-[34px] md:text-[52px] leading-[1.0] tracking-[-0.03em] text-white mb-6">
              Care that travels with you.
            </h2>
            <p className="text-[15px] md:text-[17px] text-white/70 leading-[1.7] font-light max-w-[480px] mb-8">
              Online consultations available in Mumbai, Bangalore and Hyderabad
              — with diagnostics dispatched to your home and follow-ups by
              video. The same coordinated team, no matter where you log in
              from.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/#cta"
                data-cursor="hover"
                className="group inline-flex items-center gap-2.5 pl-5 pr-7 py-3.5 bg-white text-ink text-[12px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust hover:text-white transition-colors duration-500"
              >
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
                </span>
                Book Online
                <span aria-hidden="true" className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="https://wa.me/918826809123"
                data-cursor="hover"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 text-white text-[12px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-white/10 transition-colors duration-500"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {['Mumbai', 'Bangalore', 'Hyderabad'].map((c, i) => (
              <div
                key={c}
                className="aspect-[4/5] rounded-[20px] border border-white/10 bg-white/[0.04] backdrop-blur-md p-5 md:p-6 flex flex-col justify-between"
              >
                <div className="text-[10px] tracking-[0.32em] uppercase text-white/45 font-semibold tabular-nums">
                  0{i + 4}
                </div>
                <div>
                  <div className="font-display font-bold text-[18px] md:text-[22px] leading-[1.05] tracking-[-0.02em] text-white mb-1">
                    {c}
                  </div>
                  <div className="text-[10px] tracking-[0.28em] uppercase text-white/55 font-medium">
                    Online
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE SPACES — parallax photo gallery */}
      <section ref={galleryRef} className="bg-white py-16 md:py-20 px-6 md:px-12 overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                The Spaces
              </span>
              <span className="w-7 h-px bg-rust" />
            </div>
            <h2 className="font-display font-bold text-[32px] md:text-[48px] leading-[1.0] tracking-[-0.03em] text-ink max-w-[760px] mx-auto">
              Clinical precision, hotel-quality calm.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
            {[
              { src: '/tac-photos/gurugram-exterior.jpg', label: 'Gurugram' },
              { src: '/tac-photos/pune-clinic.jpg', label: 'Pune Hadapsar' },
              { src: '/tac-photos/delhi-bangalore-clinic.jpg', label: 'Delhi · Bangalore' },
            ].map((g) => (
              <figure
                key={g.src}
                className="relative overflow-hidden rounded-[20px] bg-mist aspect-[4/3] md:aspect-[5/4]"
              >
                <img
                  src={g.src}
                  alt={`Inside the TAC ${g.label} clinic`}
                  loading="lazy"
                  className="gallery-img absolute inset-0 w-full h-[112%] object-cover"
                  style={{ willChange: 'transform' }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 100%)',
                  }}
                />
                <figcaption className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-[9.5px] tracking-[0.32em] uppercase text-white/70 font-semibold mb-1">
                    Inside
                  </div>
                  <div className="font-display font-bold text-[18px] md:text-[22px] leading-[1.1] tracking-[-0.02em]">
                    {g.label}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA — site signature dark band */}
      <section className="relative bg-ink py-24 md:py-36 px-6 md:px-12 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 600px at 20% 30%, rgba(148,84,85,0.18), transparent 60%), radial-gradient(800px 500px at 85% 70%, rgba(178,122,123,0.12), transparent 60%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay hero-grain"
        />
        <div className="relative z-10 max-w-[1180px] mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="w-7 h-px bg-rust-soft" />
            <span className="text-[11px] tracking-[0.32em] uppercase text-rust-soft font-semibold">
              Visit Us
            </span>
            <span className="w-7 h-px bg-rust-soft" />
          </div>
          <h2 className="font-display font-bold text-[40px] md:text-[72px] leading-[0.98] tracking-[-0.035em] text-white mb-8">
            Walk into your nearest centre.
          </h2>
          <p className="text-[16px] md:text-[19px] text-white/70 max-w-[600px] mx-auto leading-[1.7] mb-14 font-light">
            A 30-minute conversation with our specialists. No commitment. Just
            clarity on which programme suits your goals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/#cta"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 pl-6 pr-8 py-5 bg-white text-ink text-[12px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust hover:text-white transition-colors duration-500"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
              </span>
              Arrange a Consultation
              <span aria-hidden="true" className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="https://wa.me/918826809123"
              data-cursor="hover"
              className="inline-flex items-center gap-2 px-7 py-5 border border-white/20 text-white text-[12px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-white/10 transition-colors duration-500"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
