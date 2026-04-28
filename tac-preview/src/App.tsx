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
    { city: 'Gurugram', region: 'NCR', addr: 'Sohna Road, Sector 48' },
    { city: 'Delhi', region: 'NCR', addr: 'Greater Kailash-1' },
    { city: 'Pune', region: 'Maharashtra', addr: 'Hadapsar · Kumar Prism' },
    { city: 'Bangalore', region: 'Karnataka', addr: 'JP Nagar · Sadashivnagar' },
  ]
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduceMotion()) return
    const cells = ref.current?.querySelectorAll<HTMLElement>('.clinic-cell')
    if (!cells) return
    gsap.set(cells, { opacity: 0, y: 24 })
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
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 py-20 md:py-28">
        {/* Header */}
        <div className="grid md:grid-cols-[1fr_1fr] gap-10 md:gap-20 mb-14 md:mb-20 items-end">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                Our Centres
              </span>
            </div>
            <h2 className="font-display font-bold text-[34px] md:text-[52px] leading-[1.0] tracking-[-0.03em] text-ink">
              Find us where{' '}
              <span className="font-script font-normal text-rust text-[1.4em] leading-[0.8]">
                you
              </span>{' '}
              live.
            </h2>
          </div>
          <div className="flex flex-col md:items-end gap-5">
            <p className="text-[14px] md:text-[15px] text-graphite leading-[1.7] font-light max-w-[440px] md:text-right">
              Four flagship centres across India, with online consultations
              everywhere else — including Mumbai and Hyderabad.
            </p>
            <a
              href="#clinics"
              data-cursor="hover"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] text-ink uppercase font-medium hover:text-rust transition-colors group self-start md:self-end"
            >
              See all clinics
              <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>
          </div>
        </div>

        {/* City grid */}
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-mist border border-mist"
        >
          {clinics.map((c, i) => (
            <a
              key={c.city}
              href="#clinics"
              data-cursor="hover"
              className="clinic-cell group relative bg-white p-7 md:p-10 hover:bg-cream transition-colors duration-500 overflow-hidden"
            >
              {/* Left rust rule on hover */}
              <span className="absolute left-0 top-0 bottom-0 w-px bg-rust origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />

              {/* Header row: index + region */}
              <div className="flex items-center justify-between mb-7">
                <span className="text-[10px] tracking-[0.3em] text-stone uppercase font-medium tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[10px] tracking-[0.25em] text-stone uppercase">
                  {c.region}
                </span>
              </div>

              {/* City name */}
              <h3 className="font-display font-bold text-[28px] md:text-[36px] leading-[1.0] tracking-[-0.02em] text-ink mb-4 group-hover:text-rust-deep transition-colors duration-300">
                {c.city}
              </h3>

              {/* Address */}
              <p className="text-[13px] md:text-[14px] text-graphite leading-[1.55] mb-8 min-h-[2.2em]">
                {c.addr}
              </p>

              {/* CTA */}
              <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] text-ink uppercase font-medium">
                <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                  View clinic
                </span>
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-300 text-rust">
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
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
      title: 'Feel and look great',
      desc: 'Stay active and enjoy your life into your late years.',
      img: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=1200&q=85',
    },
    {
      title: 'Prevent diseases',
      desc: 'Avoid age-related diseases, and extend your lifespan and health-span.',
      img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=85',
    },
    {
      title: 'Improve performance',
      desc: 'Strengthen your body and sharpen your mind to get better results in sport and business.',
      img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=85',
    },
  ]
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduceMotion()) return
    const cardsEls = ref.current?.querySelectorAll<HTMLElement>('.sci-card')
    if (!cardsEls) return
    gsap.set(cardsEls, { y: 40, opacity: 0 })
    gsap.to(cardsEls, {
      y: 0,
      opacity: 1,
      duration: 1.0,
      ease: 'expo.out',
      stagger: 0.12,
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    })
  }, [])

  return (
    <section
      id="science"
      className="bg-white pt-24 pb-24 md:pt-32 md:pb-32 px-6 md:px-12"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 mb-16 md:mb-20 items-start">
          <div>
            <div className="text-[11px] tracking-[0.3em] text-stone uppercase font-medium mb-6">
              Longevity Science
            </div>
            <h2 className="font-display font-bold text-[36px] md:text-[56px] leading-[1.05] tracking-[-0.025em] text-ink">
              Cutting-edge science
              <br />
              to reverse ageing.
            </h2>
          </div>
          <p className="text-[15px] md:text-[16px] leading-[1.7] text-graphite md:pt-3 max-w-[420px]">
            With the help of science, you can improve your biological age by 5
            to 15 years and slow down your rate of ageing.
          </p>
        </div>

        {/* Cards */}
        <div ref={ref} className="grid md:grid-cols-3 gap-6 md:gap-7">
          {cards.map((c) => (
            <article
              key={c.title}
              className="sci-card bg-cream/60 group overflow-hidden"
            >
              <div className="aspect-[5/4] overflow-hidden bg-mist">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
              </div>
              <div className="px-7 py-8 md:px-8 md:py-9">
                <h3 className="font-display font-bold text-[20px] md:text-[22px] leading-[1.25] tracking-[-0.01em] text-ink mb-3">
                  {c.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-graphite leading-[1.6]">
                  {c.desc}
                </p>
              </div>
            </article>
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
    <section id="results" className="bg-cream py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-stretch">
        <div ref={ref} className="flex flex-col justify-center">
          <div className="text-[11px] tracking-[0.3em] text-rust font-semibold uppercase mb-6">
            Outcomes
          </div>
          <h2 className="font-display font-bold text-[36px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink mb-10">
            You will{' '}
            <span className="font-script font-normal text-rust text-[1.4em] leading-[0.8]">
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

        <div className="relative bg-green text-white overflow-hidden md:h-full min-h-[460px] md:min-h-[520px] max-h-[640px]">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1100&q=85"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[100%_30%] opacity-85 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-green/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-green via-green/95 via-50% to-transparent" />
          <div className="relative h-full p-9 md:p-11 flex flex-col">
            <div className="text-[10px] tracking-[0.3em] uppercase text-rust-soft font-semibold mb-4">
              Top experts on longevity
            </div>
            <h3 className="font-display font-bold text-[26px] md:text-[32px] leading-[1.1] tracking-[-0.02em] mb-5 max-w-[320px]">
              Led by India's most senior preventive-medicine specialists.
            </h3>
            <p className="text-[14px] leading-[1.6] text-white/80 max-w-[340px] mb-auto">
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

// ---------- Benefits ----------
function Benefits() {
  const items = [
    {
      title: 'Relieving stress',
      desc: 'You will lower your cortisol levels and reduce stress.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8V3h5M21 8V3h-5M3 16v5h5M21 16v5h-5" />
        </svg>
      ),
    },
    {
      title: 'Ideal body composition',
      desc: 'Optimising your body fat percentage will make you feel and look fantastic.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12h3l3-9 4 18 3-9h7" />
        </svg>
      ),
    },
    {
      title: 'No more problems with sleep',
      desc: 'Get the deep, undisturbed sleep you deserve.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ),
    },
    {
      title: 'Higher energy levels',
      desc: "You won't get easily tired anymore.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="13" width="3.5" height="8" />
          <rect x="10.25" y="9" width="3.5" height="12" />
          <rect x="17.5" y="5" width="3.5" height="16" />
        </svg>
      ),
    },
    {
      title: 'Better sport results',
      desc: 'Increase your stamina and muscle strength to optimise sports or athletic performance.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8v8M3 10v4M18 8v8M21 10v4M6 12h12" />
        </svg>
      ),
    },
    {
      title: 'Lower biological age',
      desc: 'You will extend your lifespan and stay healthy into your late years.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      title: 'Improved memory',
      desc: 'Support your brain and cognitive functions.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: 'Enhanced sexual health',
      desc: 'Unlock your full sexual potential and increase your satisfaction.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
    },
  ]
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduceMotion()) return
    const cells = ref.current?.querySelectorAll<HTMLElement>('.benefit-cell')
    if (!cells) return
    gsap.set(cells, { y: 30, opacity: 0 })
    const tween = gsap.to(cells, {
      y: 0,
      opacity: 1,
      duration: 0.85,
      ease: 'expo.out',
      stagger: 0.06,
      scrollTrigger: { trigger: ref.current, start: 'top 82%' },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])
  return (
    <section className="bg-cream/40 py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-10 md:gap-16 mb-16 md:mb-20 items-start">
          <div>
            <div className="text-[11px] tracking-[0.3em] text-stone uppercase font-medium mb-6">
              Programs
            </div>
            <h2 className="font-display font-bold text-[34px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
              The most advanced health
              <br />
              improvement programmes
              <br />
              in India.
            </h2>
          </div>
          <p className="text-[15px] md:text-[16px] leading-[1.7] text-graphite md:pt-3 max-w-[420px]">
            We have early access to clinical trials and research studies on
            longevity. Our programmes are firmly grounded in scientifically-
            proven methods.
          </p>
        </div>

        {/* Benefits grid */}
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 md:gap-x-10"
        >
          {items.map((it) => (
            <div key={it.title} className="benefit-cell">
              <div className="w-7 h-7 text-ink mb-5">{it.icon}</div>
              <h3 className="font-display font-bold text-[16px] md:text-[17px] leading-[1.3] tracking-[-0.005em] text-ink mb-3">
                {it.title}
              </h3>
              <p className="text-[13px] md:text-[14px] text-graphite leading-[1.6]">
                {it.desc}
              </p>
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
      className="bg-white py-24 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="aspect-[4/5] md:aspect-[5/6] overflow-hidden bg-mist">
          <img
            ref={imgRef}
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&q=85"
            alt=""
            className="w-full h-[110%] object-cover"
          />
        </div>
        <div className="md:max-w-[480px]">
          <div className="text-[11px] tracking-[0.3em] text-stone uppercase font-medium mb-6">
            Diagnostics
          </div>
          <h2 className="font-display font-bold text-[36px] md:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink mb-8">
            Measurement is medicine.
          </h2>
          <div className="space-y-5 text-[15px] md:text-[16px] leading-[1.7] text-graphite">
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
            className="inline-flex items-center gap-2 mt-10 text-[11px] tracking-[0.25em] text-ink uppercase font-medium hover:text-rust transition-colors group"
          >
            View Diagnostics
            <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
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
      <Benefits />
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
