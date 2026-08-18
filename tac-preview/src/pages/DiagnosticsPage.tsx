// DiagnosticsPage — /diagnostics index. Premium editorial layout for
// TLC's nine-service diagnostic stack. Content rewritten in TLC voice
// (rigour-led, physician-guided, measured). Reuses CtaBand from App.tsx.
import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { instantMotion } from '../lib/motion'
import { useDocumentMeta, breadcrumbList, SITE_URL } from '../lib/seo'
import { CtaBand } from '../components/sections/CtaBand'
import { Faq } from '../components/sections/Faq'
import { DIAGNOSTICS_FAQS } from '../lib/faqs'
import { BrandAmbassador } from '../components/sections/BrandAmbassador'
import { DIAGNOSTICS } from '../lib/diagnostics'

gsap.registerPlugin(ScrollTrigger)

// ---------- Data ----------
type DiagnosticService = {
  n: string
  name: string
  short: string
  body: string
  what: string
  img: string
  alt: string
}

const SERVICES: DiagnosticService[] = [
  {
    n: '01',
    name: 'Oligoscan',
    short: 'Cell-level mineral & metals scan',
    body: 'A non-invasive optical scan that quantifies intracellular minerals and heavy metals in real time, surfacing cellular imbalances that blood tests cannot reach.',
    what: 'Spectrophotometric assay · 30-second hand scan · 20 minerals + 14 toxic metals',
    img: '/diagnostics/oligoscan-spectrum.jpg',
    alt: 'Light spectrum refraction, visualising the Oligoscan spectrophotometric scan principle',
  },
  {
    n: '02',
    name: 'Genetic Testing',
    short: '323 genes · lifelong blueprint',
    body: 'Single-nucleotide-polymorphism analysis across 323 genes covering metabolism, hormones, cardiovascular risk and longevity pathways. Read once, used for life.',
    what: 'Saliva sample · whole-genome SNP panel · physician-interpreted',
    img: '/diagnostics/dna-helix.jpg',
    alt: 'DNA double helix illustration',
  },
  {
    n: '03',
    name: 'Gut Microbiota',
    short: 'Whole-genome microbiome sequencing',
    body: 'Complete sequencing of every microbial species in your gut, diversity, imbalances, compromised pathways and inflammation, far beyond the partial 16S panel most clinics use.',
    what: 'Stool sample · shotgun metagenomic sequencing · Netherlands-lab analysed',
    img: '/diagnostics/microbiome.jpg',
    alt: 'Microbiome bacteria under electron microscope',
  },
  {
    n: '04',
    name: 'Face Scan',
    short: 'Skin hydration · elasticity · pigmentation',
    body: 'High-resolution dermatological imaging that measures skin hydration, elasticity, pigmentation depth and surface texture, quantitative inputs for an aesthetic-medicine plan.',
    what: 'Multi-spectral imaging · 7 dermal layers · tracked over time',
    img: '/diagnostics/face-scan-device.jpg',
    alt: 'Laser facial mapping during a Face Scan dermal-imaging diagnostic',
  },
  {
    n: '05',
    name: 'EndoPAT',
    short: 'Endothelial / vascular function',
    body: 'A 15-minute non-invasive test of endothelial reactivity, the earliest measurable signal of cardiovascular disease, often years before standard markers shift.',
    what: 'Fingertip cuff plethysmography · arterial stiffness index · vascular age',
    img: '/diagnostics/endopat-device.webp',
    alt: 'ECG heart-rhythm trace on clinical paper, cardiovascular waveform',
  },
  {
    n: '06',
    name: 'Blood Tests',
    short: '160+ biomarkers · complete internal baseline',
    body: 'A 160-marker panel covering metabolic, hormonal, inflammatory, cardiovascular, nutritional and organ health, collected at home for the most complete internal picture.',
    what: 'At-home phlebotomy · NABL-accredited lab · physician walk-through of every marker',
    img: '/diagnostics/blood-vials.jpg',
    alt: 'Lab technician handling labelled blood vial',
  },
  {
    n: '07',
    name: 'Body Composition (BCA)',
    short: 'Fat · muscle · visceral · hydration',
    body: 'Segmental body composition fat percentage, lean mass, visceral fat, hydration status tracked across the programme so transformation is measured beyond the scale.',
    what: 'Multi-frequency bioimpedance · per-limb analysis · re-measured monthly',
    img: '/diagnostics/bca-tape.jpg',
    alt: 'Body composition silhouette',
  },
  {
    n: '08',
    name: 'Bone Mineral Density (Ultrasound BMD)',
    short: 'Skeletal health · radiation-free',
    body: 'Quantitative ultrasound assessment of bone strength at the heel, a fast, radiation-free screening that flags early bone loss and tracks the impact of strength, nutrition and hormonal interventions over time.',
    what: 'Calcaneal quantitative ultrasound · SOS · BUA · Stiffness Index · estimated T-score',
    img: '/longevity/brand/mood-feet-roots.jpg',
    alt: 'Skeletal density imagery',
  },
  {
    n: '09',
    name: 'Biological Clock',
    short: 'Three validated epigenetic clocks',
    body: 'GrimAge and PhenoAge analysis of DNA methylation across 9 million base pairs, the most accurate measure of true biological age and remaining healthspan.',
    what: 'Methylation array · GrimAge + PhenoAge + Horvath · whole-methylome analysis',
    img: '/diagnostics/face-treatment.jpg',
    alt: 'Epigenetic age testing imagery',
  },
]

const DOMAINS = [
  'Genomic',
  'Epigenomic',
  'Metabolic',
  'Hormonal',
  'Cardiovascular',
  'Microbiome',
  'Nutritional',
  'Body Composition',
  'Skeletal',
]

// ---------- Page ----------
export function DiagnosticsPage() {
  const root = useRef<HTMLDivElement>(null)

  // SEO — title, description, canonical, JSON-LD (MedicalBusiness with
  // an OfferCatalog of every diagnostic, plus an ItemList for crawl).
  useDocumentMeta(
    useMemo(
      () => ({
        title: 'Diagnostics · TLC, Genomic, Metabolic & Microbiome Testing',
        description:
          "Nine validated diagnostic protocols at TLC, genomic, epigenomic, metabolic, microbiome and cellular. Measurement first, intervention second.",
        path: '/diagnostics',
        ogImage: '/og/diagnostics.jpg',
        jsonLd: [
          breadcrumbList([
            { name: 'Home', url: '/' },
            { name: 'Diagnostics', url: '/diagnostics' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'MedicalBusiness',
            '@id': `${SITE_URL}/diagnostics#service`,
            name: 'The Longevity Centre, Diagnostics',
            description:
              'Diagnostics-led, physician-guided longevity medicine. Nine validated diagnostic protocols across genomic, epigenomic, metabolic and microbiome domains.',
            url: `${SITE_URL}/diagnostics`,
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Diagnostic Services',
              itemListElement: SERVICES.map((s, i) => ({
                '@type': 'Offer',
                position: i + 1,
                itemOffered: {
                  '@type': 'MedicalProcedure',
                  name: s.name,
                  description: s.body,
                },
              })),
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            '@id': `${SITE_URL}/diagnostics#item-list`,
            itemListElement: DIAGNOSTICS.map((d, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: d.name,
              url: `${SITE_URL}/diagnostics/${d.slug}`,
            })),
          },
        ],
      }),
      []
    )
  )

  useEffect(() => {
    if (instantMotion()) return
    const el = root.current
    if (!el) return

    // Line-mask reveal headlines
    const lines = el.querySelectorAll<HTMLElement>('.line-mask > span')
    gsap.set(lines, { yPercent: 110 })
    gsap.utils.toArray<HTMLElement>('.line-mask').forEach((mask) => {
      const span = mask.querySelector<HTMLElement>('span')
      if (!span) return
      gsap.to(span, {
        yPercent: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: mask, start: 'top 85%' },
      })
    })

    // Fade-up blocks
    const fades = el.querySelectorAll<HTMLElement>('.fade-up')
    gsap.set(fades, { y: 18 })
    gsap.to(fades, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })

    // Service cards stagger
    const cards = el.querySelectorAll<HTMLElement>('.svc-card')
    gsap.set(cards, { y: 28 })
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'expo.out',
      stagger: { each: 0.06, from: 'start' },
      scrollTrigger: { trigger: cards[0], start: 'top 82%' },
    })

    // Process steps stagger
    const steps = el.querySelectorAll<HTMLElement>('.proc-step')
    gsap.set(steps, { y: 24 })
    gsap.to(steps, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'expo.out',
      stagger: 0.12,
      scrollTrigger: { trigger: steps[0], start: 'top 80%' },
    })
  }, [])

  return (
    <div ref={root}>
      {/* ============================ HERO ============================ */}
      {/* Responsive viewport heights — capped on mobile so users land
          on text without burning a full screen on the image alone. */}
      <section
        id="diagnostics-hero"
        className="relative min-h-[560px] sm:min-h-[600px] md:min-h-[680px] lg:h-screen lg:min-h-[700px] flex items-center overflow-hidden bg-ink"
      >
        {/* Background image — dark DNA helix, full bleed (LCP) */}
        <img
          src="/diagnostics/hero-dna.jpg"
          width={2400}
          height={1344}
          alt="DNA double helix, decoding your biology"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark gradient — heavier on left where text sits, fades right so DNA stays visible */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(100deg, rgba(20,16,16,0.78) 0%, rgba(20,16,16,0.55) 45%, rgba(20,16,16,0.20) 75%, rgba(20,16,16,0.05) 100%)',
          }}
        />
        {/* Bottom hairline */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

        {/* Content — left-aligned, vertically centered, compact */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-24 md:pt-28">
          <div className="max-w-[680px]">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-px bg-rust-soft" />
              <span className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust-soft font-semibold">
                Diagnostics
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-light text-[40px] md:text-[60px] xl:text-[76px] leading-[1.0] tracking-[-0.035em] text-white mb-6">
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block">We don't just test.</span>
              </span>
              <br />
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block font-bold text-rust-soft">We decode your biology.</span>
              </span>
            </h1>

            {/* Sub-copy */}
            <p className="text-[14.5px] md:text-[17px] leading-[1.65] text-white/80 max-w-[540px] font-light mb-9">
              Nine clinical-grade protocols across six biological domains, 
              the depth standard medicine doesn't reach.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/contact"
                data-cursor="hover"
                data-magnetic
                className="group inline-flex items-center gap-3 pl-5 pr-6 py-3.5 bg-white text-ink text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust hover:text-white transition-colors duration-500"
              >
                Book Diagnostics
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#nine-protocols"
                data-cursor="hover"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/30 text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-white/10 hover:border-white transition-colors duration-500"
              >
                See the Nine Tests
              </a>
            </div>
          </div>

          {/* Floating credential chip — bottom-right (md+) */}
          <div className="hidden md:flex absolute bottom-10 right-6 md:right-12 items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] tracking-[0.28em] uppercase text-white font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-rust-soft animate-pulse" />
            9 M Base Pairs · 323 Genes · 1000+ Biomarkers
          </div>
        </div>
      </section>

      {/* ====================== STATS + DOMAIN STRIP ====================== */}
      <section className="relative py-16 md:py-20 px-6 md:px-12 bg-white overflow-hidden">
        <div className="relative z-10 max-w-[1280px] mx-auto">
          {/* 4-stat grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 border border-ink/10 rounded-[18px] overflow-hidden">
            {[
              { k: '1000+', l: 'Biomarkers per patient' },
              { k: '9 M', l: 'DNA base pairs analysed' },
              { k: '323', l: 'Genes tested' },
              { k: '6', l: 'Diagnostic domains' },
            ].map((s) => (
              <div key={s.l} className="bg-white px-5 py-7 text-center">
                <div className="font-display font-bold text-[28px] md:text-[34px] text-rust leading-none mb-2 tabular-nums tracking-[-0.01em]">
                  {s.k}
                </div>
                <div className="text-[10px] tracking-[0.28em] uppercase text-graphite font-semibold">
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          {/* Domain chips row */}
          <div className="mt-10 md:mt-12 flex flex-wrap gap-2">
            {DOMAINS.map((d) => (
              <span
                key={d}
                className="fade-up inline-flex items-center gap-2 px-4 py-1.5 bg-cream border border-mist rounded-full text-[11px] tracking-[0.18em] uppercase text-graphite font-semibold"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rust" />
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== APPROACH / EDITORIAL ====================== */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 bg-cream/40 overflow-hidden">
        <div className="relative z-10 max-w-[1280px] mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <div className="relative aspect-[5/4] overflow-hidden rounded-[20px] bg-mist">
            <img
              src="/diagnostics/blood-vials.jpg"
              width={662}
              height={686}
              alt="Lab technician sampling a labelled blood vial"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div>
            <div className="fade-up text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-6">
              Why Diagnostics-Led
            </div>
            <h2 className="font-display font-light text-[30px] md:text-[44px] leading-[1.1] tracking-[-0.025em] text-ink mb-8">
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block">Most clinics treat symptoms.</span>
              </span>
              <br />
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block font-bold text-rust">We treat the systems behind them.</span>
              </span>
            </h2>
            <div className="space-y-5 text-[14.5px] md:text-[15.5px] leading-[1.7] text-graphite font-light">
              <p>
                A 30-marker blood panel cannot tell you why you're tired, why
                you've gained 4 kg, why your sleep is broken. The signal is in
                the systems, methylation, microbiome, mitochondria,
                endothelium, and standard medicine doesn't measure them.
              </p>
              <p>
                Our diagnostic stack, 1000+ biomarkers, 323 genes, 9 M
                base pairs of methylation, complete metagenomic microbiome, 
                produces a picture of how your body is ageing and exactly which
                interventions will move the needle.
              </p>
              <p className="text-ink font-medium">
                Every measurement is repeated through your programme. Progress
                is not a feeling. It is a number that has changed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== SERVICES GRID ====================== */}
      <section
        id="nine-protocols"
        className="relative py-20 md:py-28 px-6 md:px-12 bg-white overflow-hidden"
      >
        <div className="relative z-10 max-w-[1280px] mx-auto">
          {/* Header */}
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-end mb-16 md:mb-20">
            <div>
              <div className="fade-up text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold mb-6">
                Nine Diagnostic Protocols
              </div>
              <h2 className="font-display font-light text-[34px] md:text-[52px] xl:text-[60px] leading-[1.05] tracking-[-0.03em] text-ink">
                <span className="line-mask inline-block overflow-hidden align-bottom">
                  <span className="inline-block">Measurement first.</span>
                </span>
                <br />
                <span className="line-mask inline-block overflow-hidden align-bottom">
                  <span className="inline-block font-bold text-rust">Intervention second.</span>
                </span>
              </h2>
            </div>
            <p className="fade-up text-[14px] md:text-[15px] leading-[1.7] text-graphite font-light max-w-[420px] md:pb-3">
              Every patient is offered the full diagnostic stack at baseline.
              Each test below is selected, performed and interpreted by
              physicians, not technicians.
            </p>
          </div>

          {/* 9 services — hairline grid, each card links to its detail page */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10">
            {DIAGNOSTICS.map((d, i) => (
              <a
                key={d.slug}
                href={`/diagnostics/${d.slug}`}
                data-cursor="hover"
                className="svc-card group relative bg-white p-6 md:p-7 flex flex-col hover:bg-cream/40 transition-colors duration-500"
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Image — aspect 5/4 */}
                <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[14px] bg-mist mb-6">
                  <img
                    src={d.heroImg}
                    alt={d.heroAlt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                </div>

                {/* Number + name */}
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-display text-[12px] text-rust font-semibold tabular-nums tracking-tight">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display font-bold text-[18px] md:text-[20px] leading-[1.2] tracking-[-0.015em] text-ink group-hover:text-rust transition-colors duration-500">
                    {d.shortName}
                  </h3>
                </div>

                {/* Short tag */}
                <div className="text-[10.5px] tracking-[0.22em] uppercase text-graphite font-semibold mb-3">
                  {d.tagline}
                </div>

                {/* Rust accent line */}
                <span
                  aria-hidden
                  className="block h-px w-6 bg-rust mb-3.5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-12"
                />

                {/* Body */}
                <p className="text-[13.5px] md:text-[14px] leading-[1.6] text-graphite font-light mb-4">
                  {d.intro}
                </p>

                {/* Footer: duration + sample + arrow */}
                <div className="mt-auto pt-4 border-t border-mist flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] tracking-[0.28em] uppercase text-rust font-semibold mb-1">
                      {d.category}
                    </div>
                    <p className="text-[12px] leading-[1.4] text-stone font-light">
                      {d.duration} · {d.sampleType}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="shrink-0 w-9 h-9 rounded-full border border-ink/15 group-hover:border-rust group-hover:bg-rust group-hover:text-white text-ink flex items-center justify-center transition-all duration-500"
                  >
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== PROCESS — 3 STEPS ====================== */}
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
          <div className="text-center mb-16 md:mb-20">
            <div className="fade-up text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust-soft font-semibold mb-5">
              The Process
            </div>
            <h2 className="font-display font-light text-[34px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-white max-w-[760px] mx-auto">
              From baseline to{' '}
              <span className="font-bold text-rust-soft">protocol, in nine weeks.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                n: '01',
                title: 'Baseline',
                duration: 'Day 1-7',
                body: 'At-home phlebotomy, saliva and stool collection, plus on-site Oligoscan, EndoPAT, BCA and BMD scans. Total time: under three hours of your week.',
              },
              {
                n: '02',
                title: 'Decode',
                duration: 'Day 3-60',
                body: 'Samples processed across our partner laboratories, including the Netherlands genomic lab. Two physicians independently review every result before your report is built.',
              },
              {
                n: '03',
                title: 'Protocol',
                duration: 'Day 7-65',
                body: 'A 90-minute walk-through with your lead physician. Every marker explained, every intervention prioritised. You leave with a written protocol you actually understand.',
              },
            ].map((p) => (
              <div
                key={p.n}
                className="proc-step relative p-7 md:p-8 bg-white/[0.03] border border-white/10 rounded-[18px] backdrop-blur-sm"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="flex items-baseline justify-between mb-7">
                  <span className="font-display text-[28px] md:text-[34px] font-bold text-rust-soft tabular-nums tracking-tight">
                    {p.n}
                  </span>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/55 font-semibold">
                    {p.duration}
                  </span>
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

      {/* ====================== TRUST POINTS ====================== */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 bg-white overflow-hidden">
        <div className="relative z-10 max-w-[1280px] mx-auto">
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-12 md:gap-20 items-start">
            <div>
              <div className="fade-up text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold mb-6">
                Why TLC Diagnostics
              </div>
              <h2 className="font-display font-light text-[30px] md:text-[44px] leading-[1.1] tracking-[-0.025em] text-ink">
                <span className="line-mask inline-block overflow-hidden align-bottom">
                  <span className="inline-block">Built for</span>
                </span>
                <br />
                <span className="line-mask inline-block overflow-hidden align-bottom">
                  <span className="inline-block font-bold text-rust">decisions, not reports.</span>
                </span>
              </h2>
            </div>
            <ul className="space-y-px bg-ink/10 border border-ink/10 rounded-[18px] overflow-hidden">
              {[
                {
                  k: 'Gold-standard labs',
                  v: 'Genomic and epigenomic samples processed by our partner laboratory in the Netherlands, one of Europe\'s leading centres for SNP and methylation analysis.',
                },
                {
                  k: 'Physician-interpreted',
                  v: 'Two physicians independently review every result before it reaches you. No automated reports, no template summaries.',
                },
                {
                  k: 'Progress, measured',
                  v: 'Diagnostics are repeated through your programme, so progress is measured, not felt. The number that has changed is the proof.',
                },
                {
                  k: 'At-home collection',
                  v: 'Phlebotomy, saliva and stool kits delivered to your door across India. Under three hours of your week for the full baseline.',
                },
              ].map((t) => (
                <li key={t.k} className="fade-up bg-white p-6 md:p-7 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8">
                  <div className="md:w-[200px] shrink-0 font-display font-bold text-[16px] md:text-[18px] text-ink tracking-[-0.01em]">
                    {t.k}
                  </div>
                  <p className="text-[13.5px] md:text-[14.5px] leading-[1.65] text-graphite font-light flex-1">
                    {t.v}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ====================== CTA ====================== */}
      <Faq faqs={DIAGNOSTICS_FAQS} heading="Questions about our diagnostics" idPrefix="diagnostics-faq" />
      <BrandAmbassador />
      <CtaBand />
    </div>
  )
}
