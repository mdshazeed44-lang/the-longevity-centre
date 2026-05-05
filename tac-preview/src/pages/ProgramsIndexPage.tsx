// ProgramsIndexPage — /programs landing page.
// Hero + grid of all 6 programmes (each card links to detail page).
// Mirrors the homepage Programmes flow but as a standalone page.

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'
import { useDocumentMeta } from '../lib/seo'
import { PROGRAMS, type Program } from '../lib/programs'
import { BmiCalculator } from '../components/BmiCalculator'

gsap.registerPlugin(ScrollTrigger)

function accentText(a: Program['accent']) {
  if (a === 'rust') return 'text-rust'
  if (a === 'iguana') return 'text-iguana'
  return 'text-green'
}
function accentBg(a: Program['accent']) {
  if (a === 'rust') return 'bg-rust'
  if (a === 'iguana') return 'bg-iguana'
  return 'bg-green'
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (reduceMotion()) return
    const el = ref.current
    if (!el) return
    const lines = el.querySelectorAll<HTMLElement>('.line-mask > span')
    gsap.set(lines, { yPercent: 110 })
    gsap.to(lines, {
      yPercent: 0,
      duration: 1.3,
      ease: 'expo.out',
      stagger: 0.1,
      delay: 0.3,
    })
    const fade = el.querySelectorAll<HTMLElement>('.fade-up')
    gsap.set(fade, { opacity: 0, y: 16 })
    gsap.to(fade, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      stagger: 0.1,
      delay: 0.6,
    })
  }, [])
  return (
    <section
      ref={ref}
      className="relative pt-36 md:pt-44 pb-16 md:pb-20 px-6 md:px-12 bg-white overflow-hidden"
    >
      <div className="max-w-[1180px] mx-auto text-center">
        <div className="fade-up text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold mb-7">
          — Six Flagship Programmes —
        </div>
        <h1 className="font-display font-light text-[40px] sm:text-[58px] md:text-[78px] xl:text-[92px] leading-[1.0] tracking-[-0.035em] text-ink mb-7">
          <span className="line-mask inline-block overflow-hidden align-bottom">
            <span className="inline-block">A programme</span>
          </span>{' '}
          <span className="line-mask inline-block overflow-hidden align-bottom">
            <span className="inline-block font-bold text-rust">for every chapter.</span>
          </span>
        </h1>
        <p className="fade-up text-[15px] md:text-[17px] leading-[1.7] text-graphite font-light max-w-[620px] mx-auto">
          Each programme is led by a dedicated specialist, but all run inside one shared medical record — diagnostics-led, physician-guided, and continuously refined.
        </p>
      </div>
    </section>
  )
}

function ProgrammesGrid() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduceMotion()) return
    const el = ref.current
    if (!el) return
    const cards = el.querySelectorAll<HTMLElement>('.prog-card')
    gsap.set(cards, { opacity: 0, y: 30 })
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'expo.out',
      stagger: { each: 0.08, from: 'start' },
      scrollTrigger: { trigger: el, start: 'top 80%' },
    })
  }, [])

  return (
    <section className="bg-white pb-24 md:pb-36 px-6 md:px-12">
      <div ref={ref} className="max-w-[1280px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10">
        {PROGRAMS.map((p) => (
          <a
            key={p.slug}
            href={`/programs/${p.slug}`}
            data-cursor="hover"
            className="prog-card group relative bg-white p-7 md:p-8 flex flex-col min-h-[460px] hover:bg-[#FAF6EF] transition-colors duration-700"
          >
            {/* Image */}
            <div className="relative aspect-[5/3] w-full overflow-hidden rounded-[14px] bg-mist mb-7">
              <img
                src={p.cardImg}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
              {/* Number badge */}
              <div className="absolute top-3 left-3 backdrop-blur-md bg-white/85 border border-white rounded-full px-2.5 py-1">
                <span className={`text-[9.5px] tracking-[0.28em] uppercase font-semibold tabular-nums ${accentText(p.accent)}`}>
                  {p.cat}
                </span>
              </div>
            </div>

            {/* Tag */}
            <div className={`text-[10px] tracking-[0.3em] uppercase font-semibold mb-3 ${accentText(p.accent)}`}>
              {p.tag}
            </div>

            {/* Title */}
            <h3 className="font-display font-light text-[22px] md:text-[24px] leading-[1.15] tracking-[-0.02em] text-ink mb-4">
              {p.shortTitle}
            </h3>

            {/* Accent line */}
            <span aria-hidden className={`block h-px w-8 ${accentBg(p.accent)} mb-4 transition-all duration-700 group-hover:w-16`} />

            {/* Body */}
            <p className="text-[13.5px] md:text-[14px] leading-[1.6] text-graphite font-light mb-7 flex-1">
              {p.desc}
            </p>

            {/* CTA row */}
            <div className="flex items-center justify-between mt-auto">
              <span className="inline-flex items-center gap-1.5 text-[10.5px] tracking-[0.28em] uppercase text-ink font-semibold group-hover:text-rust transition-colors duration-500">
                Learn More
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-0.5">→</span>
              </span>
              <span className="text-[11px] tracking-[0.22em] uppercase text-stone/70 font-medium">
                {p.duration}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

function CtaBand() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 px-6 md:px-12 bg-ink text-white overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(900px 700px at 50% 30%, rgba(178,122,123,0.18), transparent 60%)',
        }}
      />
      <div className="relative z-10 max-w-[820px] mx-auto text-center">
        <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust-soft font-semibold mb-7">
          — Not Sure Which One? —
        </div>
        <h2 className="font-display font-light text-[32px] md:text-[48px] xl:text-[56px] leading-[1.1] tracking-[-0.03em] mb-10">
          Begin with a 30-minute consultation.
          <br />
          <span className="font-bold text-rust-soft">We'll guide you to the right protocol.</span>
        </h2>
        <a
          href="tel:+911140844840"
          data-cursor="hover"
          className="group inline-flex items-center gap-3 pl-6 pr-7 py-4 bg-white text-ink rounded-full text-[11.5px] tracking-[0.22em] uppercase font-semibold hover:bg-rust hover:text-white transition-colors duration-500"
        >
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full rounded-full bg-rust opacity-70 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rust" />
          </span>
          Book Free Assessment
          <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </section>
  )
}

export function ProgramsIndexPage() {
  useDocumentMeta({
    title: 'Programmes · TLC — Diagnostics-Led Longevity & Metabolic Care',
    description:
      "TLC's six flagship longevity and metabolic programmes — physician-led, diagnostics-rooted, continuously refined.",
    path: '/programs',
    ogImage: '/og/programmes.jpg',
  })

  return (
    <>
      <Hero />
      <ProgrammesGrid />
      <BmiCalculator variant="selector" />
      <CtaBand />
    </>
  )
}
