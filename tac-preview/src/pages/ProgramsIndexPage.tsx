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
import { MilindAnchor } from '../components/sections/MilindAnchor'

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

// Hero — premium white-background editorial hero. Magazine-masthead
// register: hairline eyebrow, big display type with a rust-accented
// emphasis word, restrained paragraph, three stat tiles in a hairline
// grid. Subtle warm radial gradients (rust + cream) keep the canvas
// from feeling sterile. min-h-screen so it commands the viewport.
const HERO_STATS = [
  { k: 'Programmes', v: '6' },
  { k: 'Duration', v: '3–12 mo' },
  { k: 'Specialists', v: 'Per protocol' },
]

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
      stagger: 0.08,
      delay: 0.6,
    })
  }, [])
  return (
    <section
      ref={ref}
      className="relative bg-white text-ink pt-32 md:pt-40 pb-16 md:pb-20 px-6 md:px-12 overflow-hidden min-h-screen min-h-[100svh] flex items-center"
    >
      {/* Soft warm wash — barely-there rust + cream radial gradients
          so the white canvas has depth without going clinical. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 600px at 12% 18%, rgba(148,84,85,0.06), transparent 60%), radial-gradient(800px 500px at 88% 82%, rgba(238,230,219,0.55), transparent 60%)',
        }}
      />
      {/* Hairline frame — top + bottom rule pulls the section into a
          quiet editorial frame. */}
      <div aria-hidden className="absolute inset-x-6 md:inset-x-12 top-[88px] md:top-[104px] h-px bg-ink/10" />
      <div aria-hidden className="absolute inset-x-6 md:inset-x-12 bottom-0 h-px bg-ink/10" />

      <div className="relative max-w-[1280px] mx-auto w-full grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-end">
        {/* Left — eyebrow + headline */}
        <div>
          <div className="fade-up flex items-center gap-3 mb-8">
            <span className="w-9 h-px bg-rust" />
            <span className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold">
              Six Flagship Programmes
            </span>
          </div>
          <h1 className="font-display text-[44px] sm:text-[60px] md:text-[80px] xl:text-[96px] leading-[0.98] tracking-[-0.04em] text-ink">
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block font-light">A programme</span>
            </span>
            <br />
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block font-bold text-rust">
                for every chapter.
              </span>
            </span>
          </h1>
        </div>

        {/* Right — paragraph + stat tiles. Sits at the baseline of the
            headline on desktop for that magazine-spread alignment. */}
        <div className="lg:pb-3">
          <p className="fade-up text-[15px] md:text-[17px] lg:text-[18px] leading-[1.7] text-graphite font-light max-w-[440px]">
            Each programme is led by a dedicated specialist, but all run
            inside one shared medical record — diagnostics-led,
            physician-guided, and continuously refined.
          </p>

          {/* Stat tiles — hairline grid (no backdrop-blur; this is white
              bg). Editorial tile pattern with rust accent number on top
              + uppercase tracking-out label below. */}
          <div className="fade-up mt-10 grid grid-cols-3 gap-px bg-ink/10 border border-ink/10 rounded-[18px] overflow-hidden max-w-[480px]">
            {HERO_STATS.map((s) => (
              <div
                key={s.k}
                className="bg-white px-4 py-5 md:px-5 md:py-6 text-left"
              >
                <div className="font-display font-bold text-[20px] md:text-[24px] text-rust leading-none mb-2 tabular-nums tracking-[-0.01em]">
                  {s.v}
                </div>
                <div className="text-[9.5px] tracking-[0.26em] uppercase text-graphite font-semibold leading-[1.4]">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll-to-explore indicator — desktop only, sits between the
          hairline rule and the section content baseline. */}
      <div className="fade-up hidden md:flex absolute bottom-7 left-1/2 -translate-x-1/2 items-center gap-3 text-[10px] tracking-[0.32em] uppercase text-stone font-semibold">
        <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-rust" />
        <span>Explore programmes</span>
        <span aria-hidden>↓</span>
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
      <MilindAnchor />
      <CtaBand />
    </>
  )
}
