import { useEffect, useRef, useState, Suspense } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import { ParticleCanvas } from './DnaHelix'
import { Preloader } from './components/Preloader'
import { Cursor } from './components/Cursor'
import { ScrollProgress } from './components/ScrollProgress'
import { Hero } from './components/Hero'
import { Programs, PROGRAMS } from './components/Programs'
import { Method } from './components/Method'
import { Logo } from './components/Logo'
import { reduceMotion } from './lib/motion'

gsap.registerPlugin(ScrollTrigger)

// ---------- Header ----------
function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'h-[64px] bg-white/85 backdrop-blur-lg border-b border-mist'
          : 'h-[80px] bg-transparent border-b border-transparent'
      }`}
    >
      <div className="h-full flex items-center justify-between px-6 md:px-12">
        <a href="#" data-cursor="hover" className="text-ink">
          <Logo variant="dark" />
        </a>
        <nav className="hidden md:flex gap-9">
          {['About', 'Programs', 'Diagnostics', 'Clinics', 'Blog', 'Contact'].map(
            (label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                data-cursor="hover"
                className="relative text-[14px] text-ink hover:text-rust transition-colors duration-300 group"
              >
                {label}
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-rust group-hover:w-full transition-all duration-500" />
              </a>
            )
          )}
        </nav>
        <a
          href="#cta"
          data-cursor="hover"
          data-magnetic
          className="hidden md:inline-flex items-center px-6 py-3 bg-ink text-white text-[13px] tracking-wide hover:bg-rust transition-colors duration-300"
        >
          Book a Consultation
        </a>
      </div>
    </header>
  )
}

// ---------- Clinics band ----------
function ClinicsBand() {
  const clinics = [
    { city: 'GURUGRAM', addr: 'Sohna Road, Sector 48' },
    { city: 'DELHI', addr: 'Greater Kailash-1' },
    { city: 'PUNE', addr: 'Hadapsar, Kumar Prism' },
    { city: 'BANGALORE', addr: 'JP Nagar · Sadashivnagar' },
  ]
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduceMotion()) return
    const cells = ref.current?.querySelectorAll<HTMLElement>('.clinic-cell')
    if (!cells) return
    gsap.set(cells, { opacity: 0, y: 18 })
    gsap.to(cells, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: ref.current, start: 'top 85%' },
    })
  }, [])
  return (
    <section className="bg-white border-y border-mist">
      <div
        ref={ref}
        className="max-w-[1500px] mx-auto px-6 md:px-12 py-8 grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-6 items-center"
      >
        <div className="clinic-cell md:col-span-1">
          <div className="text-[10px] tracking-[0.25em] text-rust font-semibold uppercase mb-1">
            Our Centres
          </div>
          <div className="text-[13px] text-stone">
            Now also online — Mumbai, Hyderabad
          </div>
        </div>
        {clinics.map((c) => (
          <a
            key={c.city}
            href="#clinics"
            data-cursor="hover"
            className="clinic-cell group flex flex-col py-2 border-l border-mist pl-5 hover:border-rust transition-colors duration-300"
          >
            <span className="text-[10px] tracking-[0.25em] text-ink font-semibold mb-1 group-hover:text-rust transition-colors duration-300">
              {c.city}
            </span>
            <span className="text-[13px] text-graphite">{c.addr}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

// ---------- Trust counter ----------
function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { duration: 2000, bounce: 0 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView) mv.set(value)
    return spring.on('change', (v) => setDisplay(Math.round(v)))
  }, [inView, value, mv, spring])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

function TrustStrip() {
  return (
    <section className="bg-cream py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto text-center">
        <div className="text-[11px] tracking-[0.2em] text-rust font-semibold uppercase mb-6">
          A Medical Practice, Rooted in Nature
        </div>
        <p className="font-display font-bold text-[28px] md:text-[40px] leading-[1.3] text-ink max-w-[820px] mx-auto">
          We measure what others guess.{' '}
          <span className="font-script text-rust text-[1.4em] leading-[0.8] inline-block">
            We change
          </span>{' '}
          what others manage.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-0 mt-24 md:divide-x md:divide-mist">
          {[
            { val: 60, suf: '+', label: 'Years experience in preventive medicine' },
            { val: 10000, suf: '+', label: 'Lives reformed by our team' },
            { val: 5, suf: '', label: 'Centres pan-India' },
            { val: 163, suf: '', label: 'Blood parameters per patient' },
          ].map((s) => (
            <div key={s.label} className="px-6 text-center">
              <div className="font-display font-bold text-[64px] md:text-[88px] text-ink leading-none mb-4">
                <Counter value={s.val} suffix={s.suf} />
              </div>
              <div className="text-[13px] text-stone max-w-[180px] mx-auto leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- Cutting-edge science ----------
function ScienceCards() {
  const cards = [
    {
      idx: '01',
      tag: 'Genomics',
      title: 'First DNA-guided longevity protocols in India',
      desc: 'Genome-informed dosing for everything from antioxidants to cardiovascular drugs.',
      img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=85',
      meta: 'Research note · 6 min read',
    },
    {
      idx: '02',
      tag: 'Peptides',
      title: 'Peptide therapy for cellular repair',
      desc: 'Targeted peptides for tissue regeneration, immune balance and metabolic recovery.',
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=85',
      meta: 'Clinical brief · 4 min read',
    },
    {
      idx: '03',
      tag: 'Biological Age',
      title: 'Reverse biological age with measurable change',
      desc: 'Quarterly retesting of methylation age, telomere length and inflammation markers.',
      img: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=1200&q=85',
      meta: 'Method paper · 5 min read',
    },
  ]
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduceMotion()) return
    const cardsEls = ref.current?.querySelectorAll<HTMLElement>('.sci-card')
    if (!cardsEls) return
    gsap.set(cardsEls, { y: 60, opacity: 0 })
    gsap.to(cardsEls, {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.14,
      scrollTrigger: { trigger: ref.current, start: 'top 78%' },
    })
  }, [])

  return (
    <section
      id="science"
      className="bg-white pt-28 pb-28 md:pt-40 md:pb-36 px-6 md:px-12"
    >
      <div className="max-w-[1320px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-20">
          <div className="max-w-[680px]">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                First-Class Longevity
              </span>
            </div>
            <h2 className="font-display font-bold text-[36px] md:text-[60px] leading-[1.0] tracking-[-0.03em] text-ink">
              Cutting-edge science to{' '}
              <span className="font-script font-normal text-rust text-[1.4em] leading-[0.8]">
                reverse
              </span>{' '}
              ageing.
            </h2>
          </div>
          <div className="md:max-w-[440px] md:pb-2 flex flex-col gap-6">
            <p className="text-[15px] md:text-[16px] leading-[1.7] text-graphite font-light">
              We bring lab-grade preventive medicine to India — built on
              diagnostics, biology, and a long view of what makes a body well.
            </p>
            <a
              href="#"
              data-cursor="hover"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] text-ink uppercase font-medium hover:text-rust transition-colors group self-start"
            >
              View all research
              <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Cards */}
        <div ref={ref} className="grid md:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-16">
          {cards.map((c) => (
            <a
              key={c.title}
              href="#"
              data-cursor="hover"
              className="sci-card group block"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-nougat mb-7">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                {/* Subtle bottom gradient for index legibility */}
                <span className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent pointer-events-none" />
                {/* Card index */}
                <span className="absolute top-5 left-5 text-[11px] tracking-[0.3em] text-white/95 font-semibold uppercase tabular-nums">
                  {c.idx}
                </span>
                {/* Meta — top right */}
                <span className="absolute top-5 right-5 text-[10px] tracking-[0.18em] text-white/80 uppercase">
                  {c.meta}
                </span>
                {/* Reveal underline on hover */}
                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-rust scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[700ms]" />
              </div>

              {/* Body */}
              <div className="px-0.5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] tracking-[0.3em] text-rust font-semibold uppercase">
                    {c.tag}
                  </span>
                  <span className="flex-1 h-px bg-mist" />
                </div>
                <h3 className="font-display text-[22px] md:text-[26px] leading-[1.18] tracking-[-0.01em] text-ink mb-4 group-hover:text-rust-deep transition-colors duration-300">
                  {c.title}
                </h3>
                <p className="text-[14px] text-graphite leading-[1.65] font-light mb-6">
                  {c.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] text-ink uppercase font-medium group-hover:text-rust transition-colors">
                  Read the science
                  <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- Press marquee ----------
function PressStrip() {
  const press = [
    'Forbes India',
    'Vogue',
    'GQ',
    'Conde Nast',
    'The Hindu',
    'Mint Lounge',
    'Harper’s Bazaar',
    'Architectural Digest',
  ]
  const items = [...press, ...press]
  return (
    <section className="bg-white border-y border-mist py-10 marquee overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex items-center gap-10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-stone shrink-0">
          As featured in —
        </span>
        <div className="overflow-hidden flex-1">
          <div className="marquee-track">
            {items.map((p, i) => (
              <span
                key={i}
                className="font-display text-[18px] md:text-[20px] text-graphite/70 tracking-tight hover:text-ink transition-colors duration-300 whitespace-nowrap"
                style={{ fontVariant: 'small-caps' }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- Results split ----------
function ResultsSplit() {
  const bullets = [
    'Lower biological age',
    'Improved energy & clarity',
    'Better sleep & recovery',
    'Reduced cardiometabolic risk',
    'Healthier skin & body composition',
  ]
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduceMotion()) return
    const items = ref.current?.querySelectorAll<HTMLElement>('.result-row')
    if (!items) return
    gsap.set(items, { x: -20, opacity: 0 })
    gsap.to(items, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: ref.current, start: 'top 78%' },
    })
  }, [])

  return (
    <section id="results" className="bg-cream py-28 md:py-40 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div ref={ref}>
          <div className="text-[11px] tracking-[0.25em] text-rust font-semibold uppercase mb-5">
            Outcomes
          </div>
          <h2 className="font-display font-bold text-[36px] md:text-[56px] leading-[1.05] tracking-[-0.025em] text-ink mb-10">
            You will{' '}
            <span className="font-script text-rust text-[1.4em] leading-[0.8]">
              feel
            </span>{' '}
            the results.
          </h2>
          <ul className="space-y-4">
            {bullets.map((b) => (
              <li
                key={b}
                className="result-row flex items-start gap-4 border-b border-mist pb-4 last:border-0"
              >
                <span className="mt-2 w-2 h-2 bg-rust shrink-0" />
                <span className="text-[16px] md:text-[17px] text-graphite leading-[1.5]">
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative bg-green text-white aspect-[4/5] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-green/40" />
          <div className="relative h-full p-10 md:p-12 flex flex-col">
            <div className="text-[10px] tracking-[0.3em] uppercase text-rust-soft font-semibold mb-4">
              Top experts on longevity
            </div>
            <h3 className="font-display font-bold text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.02em] mb-6 max-w-[300px]">
              Led by India's most senior preventive-medicine specialists.
            </h3>
            <p className="text-[14px] leading-[1.6] text-white/80 max-w-[320px] mb-auto">
              Internal medicine, endocrinology, dermatology, gastroenterology —
              coordinated under one programme, one record, one team.
            </p>
            <a
              href="#"
              data-cursor="hover"
              className="mt-8 inline-flex items-center gap-3 self-start px-5 py-3 bg-white text-green text-[11px] tracking-[0.2em] font-semibold uppercase hover:bg-rust hover:text-white transition-colors duration-300"
            >
              Meet The Team <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- Program features ----------
function ProgramFeatures() {
  const features = [
    {
      title: 'Refining sleep',
      bullets: ['Polysomnography', 'Circadian reset', 'Recovery protocols'],
    },
    {
      title: 'Body composition',
      bullets: ['DEXA scans', 'Visceral fat tracking', 'Muscle preservation'],
    },
    {
      title: 'Boosting immunity',
      bullets: ['Cytokine panels', 'Gut–immune axis', 'Targeted supplements'],
    },
    {
      title: 'Higher energy',
      bullets: ['Mitochondrial support', 'Iron & B12', 'Stress-axis recalibration'],
    },
  ]
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduceMotion()) return
    const cells = ref.current?.querySelectorAll<HTMLElement>('.feat-cell')
    if (!cells) return
    gsap.set(cells, { y: 40, opacity: 0 })
    gsap.to(cells, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    })
  }, [])
  return (
    <section className="bg-white py-28 md:py-40 px-6 md:px-12 border-t border-mist">
      <div className="max-w-[1280px] mx-auto">
        <div className="max-w-[820px] mb-16">
          <div className="text-[11px] tracking-[0.25em] text-rust font-semibold uppercase mb-5">
            Why TLC
          </div>
          <h2 className="font-display font-bold text-[34px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
            The most advanced health-improvement programmes in India.
          </h2>
        </div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-4 gap-px bg-mist">
          {features.map((f) => (
            <div
              key={f.title}
              className="feat-cell bg-white p-8 hover:bg-cream transition-colors duration-500 relative group"
            >
              <span className="absolute left-0 top-0 bottom-0 w-px bg-rust origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700" />
              <h3 className="font-display text-[22px] text-ink mb-4">{f.title}</h3>
              <ul className="space-y-2">
                {f.bullets.map((b) => (
                  <li
                    key={b}
                    className="text-[14px] text-graphite flex items-start gap-2"
                  >
                    <span className="text-rust mt-[2px]">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- Brochure CTA ----------
function BrochureCTA() {
  return (
    <section className="bg-cream py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto bg-green text-white grid md:grid-cols-[1.1fr_1fr] items-center overflow-hidden">
        <div className="relative aspect-[5/4] md:aspect-auto md:h-full bg-green-soft">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1100&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green/60 to-transparent" />
        </div>
        <div className="p-10 md:p-16">
          <div className="text-[10px] tracking-[0.3em] uppercase text-rust-soft font-semibold mb-4">
            The Longevity Brochure
          </div>
          <h3 className="font-display font-bold text-[30px] md:text-[44px] leading-[1.05] tracking-[-0.02em] mb-6">
            Learn what we can{' '}
            <span className="font-script text-rust-soft text-[1.4em] leading-[0.8]">
              do
            </span>{' '}
            for you.
          </h3>
          <p className="text-[14px] md:text-[15px] leading-[1.65] text-white/80 max-w-[420px] mb-8">
            A 32-page guide to our diagnostics, programmes, clinics and outcomes.
            Free, no commitment.
          </p>
          <a
            href="#"
            data-cursor="hover"
            className="inline-flex items-center gap-3 px-7 py-4 bg-rust text-white text-[11px] tracking-[0.2em] font-semibold uppercase hover:bg-rust-deep transition-colors duration-300"
          >
            Download Brochure <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

// ---------- Editorial parallax ----------
function Editorial() {
  const imgRef = useRef<HTMLImageElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    if (!imgRef.current || !sectionRef.current) return
    gsap.to(imgRef.current, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [])

  return (
    <section
      id="editorial"
      ref={sectionRef}
      className="bg-nougat py-32 md:py-48 px-6 md:px-12"
    >
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-12 md:gap-24 items-center">
        <div className="aspect-[4/5] overflow-hidden">
          <img
            ref={imgRef}
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&q=80"
            alt=""
            className="w-full h-[110%] object-cover"
          />
        </div>
        <div>
          <div className="text-[11px] tracking-[0.2em] text-rust font-medium uppercase mb-6">
            Diagnostics
          </div>
          <h2 className="font-display font-bold text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.025em] text-ink mb-8">
            <span className="font-script text-rust text-[1.4em] leading-[0.8]">
              Measurement
            </span>{' '}
            is medicine.
          </h2>
          <div className="space-y-6 text-[17px] leading-[1.7] text-graphite max-w-[520px]">
            <p>Most clinics treat symptoms. We treat the systems behind them.</p>
            <p>
              Our diagnostic stack — 163 blood parameters, full-genome analysis,
              microbiome sequencing, body composition, vascular function, and
              biological age — produces a complete picture of how your body is
              ageing and which interventions will move the needle.
            </p>
            <p>
              Every measurement is repeated at month 9. Progress is not a feeling.
              It is a number that has changed.
            </p>
          </div>
          <a
            href="#"
            data-cursor="hover"
            className="inline-flex items-center gap-2 mt-8 text-[13px] tracking-[0.1em] text-ink group"
          >
            VIEW DIAGNOSTICS{' '}
            <span className="text-rust inline-block group-hover:translate-x-2 transition-transform duration-300">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

// ---------- Testimonial ----------
function Testimonial() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const words =
    "Their personalised recommendations have significantly improved my mental clarity and physical health. The depth of testing was unlike anything I've experienced before.".split(
      ' '
    )

  return (
    <section ref={ref} className="bg-white py-28 md:py-40 px-6 md:px-12">
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-16">
          <div className="text-[11px] tracking-[0.25em] text-rust font-semibold uppercase mb-5">
            Patient Stories
          </div>
          <h2 className="font-display font-bold text-[30px] md:text-[44px] leading-[1.1] tracking-[-0.025em] text-ink max-w-[820px] mx-auto">
            Here's what our patients{' '}
            <span className="font-script text-rust text-[1.4em] leading-[0.8]">
              experienced
            </span>{' '}
            after visiting our longevity clinic.
          </h2>
        </div>

        <div className="grid md:grid-cols-[260px_1fr] gap-10 md:gap-16 items-center max-w-[920px] mx-auto">
          <div className="aspect-[4/5] overflow-hidden bg-nougat">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80"
              alt="Vikas — Longevity Plus patient"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <blockquote className="font-editorial italic font-medium text-[22px] md:text-[28px] leading-[1.4] text-ink">
              "
              {words.map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="inline"
                >
                  {w}{' '}
                </motion.span>
              ))}
              "
            </blockquote>
            <div className="w-[60px] h-px bg-rust mt-8 mb-4" />
            <div className="text-[13px] tracking-[0.2em] text-ink font-semibold uppercase">
              Vikas Mehra
            </div>
            <div className="text-[13px] text-stone mt-1">
              Longevity Plus · 12-month patient
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- Locations ----------
function LocationsLarge() {
  const locs = [
    {
      city: 'Gurugram',
      addr: 'DLF Phase 4 · Sohna Road, Sector 48',
      img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80',
    },
    {
      city: 'Delhi',
      addr: 'Greater Kailash-1 · S-79',
      img: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=900&q=80',
    },
    {
      city: 'Bangalore',
      addr: 'Sadashivnagar & JP Nagar',
      img: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=900&q=80',
    },
  ]
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduceMotion()) return
    const cards = ref.current?.querySelectorAll<HTMLElement>('.loc-card')
    if (!cards) return
    gsap.set(cards, { y: 60, opacity: 0, clipPath: 'inset(0 0 100% 0)' })
    gsap.to(cards, {
      y: 0,
      opacity: 1,
      clipPath: 'inset(0 0 0% 0)',
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.12,
      scrollTrigger: { trigger: ref.current, start: 'top 75%' },
    })
  }, [])
  return (
    <section id="clinics" className="bg-white py-28 md:py-40 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <div className="text-[11px] tracking-[0.25em] text-rust font-semibold uppercase mb-5">
            Visit Us
          </div>
          <h2 className="font-display font-bold text-[34px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
            Exceptional care in leading-edge{' '}
            <span className="font-script text-rust text-[1.4em] leading-[0.8]">
              centres
            </span>
            .
          </h2>
        </div>
        <div ref={ref} className="grid md:grid-cols-3 gap-6 md:gap-8">
          {locs.map((l) => (
            <a
              key={l.city}
              href="#"
              data-cursor="hover"
              className="loc-card group block"
            >
              <div className="aspect-[4/5] overflow-hidden bg-nougat mb-5">
                <img
                  src={l.img}
                  alt={l.city}
                  className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
              </div>
              <div className="flex items-baseline justify-between gap-3 border-b border-mist pb-4 group-hover:border-ink transition-colors">
                <div>
                  <h3 className="font-display text-[22px] md:text-[26px] text-ink mb-1">
                    {l.city}
                  </h3>
                  <p className="text-[13px] text-stone">{l.addr}</p>
                </div>
                <span className="text-rust text-xl group-hover:translate-x-2 transition-transform duration-500">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>
        <p className="text-center text-[13px] text-stone mt-10">
          Also in Pune. Online consultations available across India and from Mumbai
          &amp; Hyderabad.
        </p>
      </div>
    </section>
  )
}

// ---------- CTA Band ----------
function CtaBand() {
  return (
    <section
      id="cta"
      className="relative bg-green py-32 md:py-40 px-6 md:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-70">
        <Suspense fallback={null}>
          <ParticleCanvas />
        </Suspense>
      </div>
      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        <div className="text-[11px] tracking-[0.2em] text-rust font-medium uppercase mb-8">
          Begin
        </div>
        <h2 className="font-display font-bold text-[40px] md:text-[64px] leading-[1.1] tracking-[-0.025em] text-white mb-8">
          Your{' '}
          <span className="font-script text-rust-soft text-[1.4em] leading-[0.8]">
            longevity
          </span>{' '}
          starts with one consultation.
        </h2>
        <p className="text-[17px] md:text-[18px] text-pearl/80 max-w-[600px] mx-auto leading-[1.6] mb-12">
          A 30-minute conversation with our medical team. No commitment. Just
          clarity.
        </p>
        <a
          href="#"
          data-cursor="hover"
          data-magnetic
          className="inline-flex items-center gap-3 px-9 py-5 bg-rust text-white text-[12px] tracking-[0.2em] font-semibold hover:bg-rust-deep transition-colors duration-300"
        >
          BOOK A CONSULTATION
          <span>→</span>
        </a>
      </div>
    </section>
  )
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="bg-green text-white pt-24 pb-10 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 md:gap-16">
          <div>
            <div className="mb-5">
              <Logo variant="light" showTagline={false} />
            </div>
            <div className="text-[11px] tracking-[0.28em] uppercase text-white/55 mb-5">
              The Longevity Centre
            </div>
            <p className="text-[14px] text-white/75 leading-[1.65] max-w-[300px] mb-6">
              A medical practice, rooted in nature. Premium preventive medicine for
              the long view.
            </p>
            <a
              href="#cta"
              data-cursor="hover"
              className="inline-flex items-center gap-3 px-6 py-3 bg-rust text-white text-[11px] tracking-[0.2em] font-semibold uppercase hover:bg-rust-deep transition-colors duration-300"
            >
              Book a Consultation <span>→</span>
            </a>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.25em] text-rust-soft font-semibold uppercase mb-5">
              Programmes
            </div>
            <ul className="space-y-3 text-[14px]">
              {PROGRAMS.slice(0, 6).map((p) => (
                <li key={p.title}>
                  <a
                    href="#"
                    data-cursor="hover"
                    className="text-white/80 hover:text-white transition-colors duration-300"
                  >
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.25em] text-rust-soft font-semibold uppercase mb-5">
              Clinics
            </div>
            <ul className="space-y-3 text-[14px]">
              {[
                'Gurugram',
                'Delhi',
                'Pune',
                'Bangalore JP',
                'Bangalore Sadashivnagar',
                'Online (Mumbai · Hyderabad)',
              ].map((c) => (
                <li key={c}>
                  <a
                    href="#"
                    data-cursor="hover"
                    className="text-white/80 hover:text-white transition-colors duration-300"
                  >
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.25em] text-rust-soft font-semibold uppercase mb-5">
              Company
            </div>
            <ul className="space-y-3 text-[14px]">
              {['About', 'Diagnostics', 'Blog', 'Press', 'Careers', 'Privacy'].map(
                (c) => (
                  <li key={c}>
                    <a
                      href="#"
                      data-cursor="hover"
                      className="text-white/80 hover:text-white transition-colors duration-300"
                    >
                      {c}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/15 mt-20 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-[12px] text-white/55">© 2026 The Longevity Centre</p>
          <p className="text-[12px] text-white/55">
            Designed in India · Practising medicine, not marketing.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ---------- App ----------
function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (reduceMotion()) return
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    })
    // expose for in-page anchor scroll + debug
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis
    lenis.on('scroll', () => {
      ScrollTrigger.update()
    })
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="bg-white text-graphite">
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <ScrollProgress />
      <Header />
      <Hero />
      <ClinicsBand />
      <ScienceCards />
      <PressStrip />
      <ResultsSplit />
      <ProgramFeatures />
      <Programs />
      <Method />
      <TrustStrip />
      <Editorial />
      <BrochureCTA />
      <Testimonial />
      <LocationsLarge />
      <CtaBand />
      <Footer />
      {!ready && null}
    </div>
  )
}

export default App
