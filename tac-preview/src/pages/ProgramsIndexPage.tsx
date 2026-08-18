// ProgramsIndexPage — /programs landing page.
// Hero + grid of all 7 programmes (each card links to detail page).
// Mirrors the homepage Programmes flow but as a standalone page.

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Faq } from '../components/sections/Faq'
import { PROGRAMS_FAQS } from '../lib/faqs'
import { instantMotion } from '../lib/motion'
import { useDocumentMeta, breadcrumbList } from '../lib/seo'
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

// Hero — redesigned with motion. Cycling-word headline, cursor-tracked
// rust glow, animated stat counters and a slow programme-name marquee
// at the bottom give the page kinetic energy without breaking the
// site's editorial restraint.
const HERO_STATS = [
  { k: 'Programmes', v: '6', display: '6' },
  { k: 'Duration', v: '3-12 mo', display: '3-12 mo' },
  { k: 'Specialists', v: 'Per protocol', display: 'Per protocol' },
]

// Cycling words for the rotating headline — drawn from the 6 programme
// themes so the kinetic word actually reflects what the page sells.
const CYCLE_WORDS = [
  'longevity.',
  'metabolism.',
  'gut health.',
  'weight loss.',
  'PCOD care.',
  'metabolomics.',
]

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const cycleRef = useRef<HTMLSpanElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)

  // Cycling word — vertical mask flip through CYCLE_WORDS on a timed
  // loop. We render all words stacked, then GSAP shifts a y-translate
  // index every ~2.5s so the visible word changes with a smooth slide.
  useEffect(() => {
    if (instantMotion()) return
    const el = cycleRef.current
    if (!el) return
    const items = el.querySelectorAll<HTMLElement>('[data-word]')
    if (!items.length) return

    // Initial — first word in place, others below the mask.
    gsap.set(items[0], { yPercent: 0 })
    for (let i = 1; i < items.length; i++) {
      gsap.set(items[i], { yPercent: 110 })
    }

    let active = 0
    const tick = () => {
      const next = (active + 1) % items.length
      gsap.to(items[active], {
        yPercent: -110,
        duration: 0.85,
        ease: 'expo.inOut',
      })
      gsap.fromTo(
        items[next],
        { yPercent: 110 },
        { yPercent: 0, duration: 0.85, ease: 'expo.inOut' },
      )
      active = next
    }
    const id = window.setInterval(tick, 2400)
    return () => window.clearInterval(id)
  }, [])

  // Mouse-following soft rust glow — gives the white canvas a living,
  // breathing feel as the visitor moves. Lerp via gsap.quickTo so it
  // trails smoothly rather than locking to the cursor.
  useEffect(() => {
    if (instantMotion()) return
    const blob = blobRef.current
    const el = ref.current
    if (!blob || !el) return

    const x = gsap.quickTo(blob, 'x', { duration: 1.2, ease: 'power3.out' })
    const y = gsap.quickTo(blob, 'y', { duration: 1.2, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      x(e.clientX - r.left)
      y(e.clientY - r.top)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  // Headline + fade entrance + stat number count-up.
  useEffect(() => {
    if (instantMotion()) return
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
    gsap.set(fade, { y: 16 })
    gsap.to(fade, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      stagger: 0.08,
      delay: 0.6,
    })

    // Count-up on the "6" Programmes stat — the others are non-numeric.
    const counter = counterRef.current?.querySelector<HTMLElement>('[data-count]')
    if (counter) {
      const target = Number(counter.dataset.count ?? '0')
      const obj = { v: 0 }
      gsap.to(obj, {
        v: target,
        duration: 1.4,
        ease: 'power3.out',
        delay: 1.0,
        onUpdate: () => {
          counter.textContent = String(Math.round(obj.v))
        },
      })
    }
  }, [])

  return (
    <section
      ref={ref}
      className="relative bg-white text-ink pt-32 md:pt-40 pb-24 md:pb-28 px-6 md:px-12 overflow-hidden min-h-screen min-h-[100svh] flex flex-col justify-center"
    >
      {/* Mouse-following rust glow — sits behind everything else and
          softly trails the cursor. */}
      <div
        ref={blobRef}
        aria-hidden
        className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          left: 0,
          top: 0,
          width: '700px',
          height: '700px',
          background:
            'radial-gradient(circle at center, rgba(148,84,85,0.16) 0%, rgba(148,84,85,0.06) 35%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Soft static warm wash — keeps the canvas alive when no cursor
          motion is happening (touch devices, idle state). */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 600px at 12% 18%, rgba(148,84,85,0.05), transparent 60%), radial-gradient(800px 500px at 88% 82%, rgba(238,230,219,0.55), transparent 60%)',
        }}
      />

      {/* Diagonal pinstripe texture — barely-there editorial grain. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          background:
            'repeating-linear-gradient(135deg, transparent 0, transparent 2px, rgba(27,26,24,0.8) 2px, rgba(27,26,24,0.8) 3px)',
        }}
      />

      {/* Hairline editorial frame */}
      <div aria-hidden className="absolute inset-x-6 md:inset-x-12 top-[88px] md:top-[104px] h-px bg-ink/10" />
      <div aria-hidden className="absolute inset-x-6 md:inset-x-12 bottom-[68px] md:bottom-[72px] h-px bg-ink/10" />

      <div className="relative max-w-[1280px] mx-auto w-full grid lg:grid-cols-[1.55fr_1fr] gap-10 lg:gap-16 items-end">
        {/* Left — eyebrow + cycling-word headline */}
        <div>
          <div className="fade-up flex items-center gap-3 mb-8">
            <span className="w-9 h-px bg-rust" />
            <span className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold">
              Seven Flagship Programmes · One Promise
            </span>
            <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-rust animate-pulse" />
          </div>

          <h1 className="font-display text-[44px] sm:text-[60px] md:text-[80px] xl:text-[96px] leading-[0.98] tracking-[-0.04em] text-ink">
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block font-light">Designed for your</span>
            </span>
            <br />
            {/* Cycling word — fixed-width mask, vertical word flip. */}
            <span
              ref={cycleRef}
              aria-live="polite"
              className="relative inline-block overflow-hidden align-bottom font-bold text-rust italic"
              style={{ height: '1.05em', minWidth: '8ch' }}
            >
              {CYCLE_WORDS.map((w) => (
                <span
                  key={w}
                  data-word
                  className="absolute inset-0 whitespace-nowrap will-change-transform"
                >
                  {w}
                </span>
              ))}
            </span>
          </h1>

          <p className="fade-up mt-8 md:mt-10 text-[15px] md:text-[17px] lg:text-[18px] leading-[1.7] text-graphite font-light max-w-[560px]">
            Each programme is led by a dedicated specialist, but all run inside
            one shared medical record, diagnostics-led, physician-guided, and
            continuously refined.
          </p>
        </div>

        {/* Right — stat tiles with animated count-up and a kinetic
            programme list peeking through. Sits at the baseline of the
            headline column on desktop. */}
        <div className="lg:pb-4">
          <div
            ref={counterRef}
            className="fade-up grid grid-cols-1 sm:grid-cols-3 gap-px bg-ink/10 border border-ink/10 rounded-[18px] overflow-hidden max-w-[520px]"
          >
            {HERO_STATS.map((s) => {
              const isNumeric = /^\d+$/.test(s.v)
              return (
                <div
                  key={s.k}
                  className="bg-white px-4 py-4 sm:py-5 md:px-5 md:py-6 text-left transition-colors duration-500 hover:bg-cream/40"
                >
                  <div className="font-display font-bold text-[24px] sm:text-[22px] md:text-[28px] text-rust leading-none mb-2 tabular-nums tracking-[-0.01em]">
                    {isNumeric ? (
                      <span data-count={s.v}>0</span>
                    ) : (
                      s.display
                    )}
                  </div>
                  <div className="text-[9.5px] tracking-[0.26em] uppercase text-graphite font-semibold leading-[1.4]">
                    {s.k}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quick-jump programme dial — tiny clickable chips to each
              detail page right from the hero. Adds energy and gives
              the right column a second purpose beyond stats. */}
          <div className="fade-up mt-6 flex flex-wrap gap-1.5 max-w-[520px]">
            {PROGRAMS.map((p, i) => (
              <a
                key={p.slug}
                href={`/programs/${p.slug}`}
                data-cursor="hover"
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ink/12 hover:border-rust/60 hover:bg-rust/[0.04] transition-colors duration-500"
              >
                <span className="text-[9.5px] tracking-[0.22em] uppercase font-bold text-rust tabular-nums">
                  0{i + 1}
                </span>
                <span className="text-[11.5px] text-ink font-medium group-hover:text-rust transition-colors duration-500">
                  {p.shortTitle}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom ticker band — scroll cue + programme-name marquee
          combined into one cohesive, premium strip pinned to the
          hero's bottom edge. A blurred backdrop + top hairline keep
          it visually distinct from the section below (no divider
          bleed-through), and left/right gradient masks make the
          names fade in/out instead of hard-cutting at the edges. */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        {/* Scroll cue — sits cleanly above the band, desktop only */}
        <div className="fade-up hidden md:flex justify-center pb-3 pointer-events-none">
          <span className="inline-flex items-center gap-2.5 text-[10px] tracking-[0.34em] uppercase text-stone font-semibold">
            <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-rust" />
            Explore programmes
            <span aria-hidden className="animate-bounce">↓</span>
          </span>
        </div>

        {/* Ticker band */}
        <div
          aria-hidden
          className="relative overflow-hidden border-t border-ink/10 bg-cream/70 backdrop-blur-md py-3.5 select-none"
        >
          <div className="programs-hero-marquee flex gap-10 whitespace-nowrap text-[10.5px] md:text-[11.5px] tracking-[0.3em] uppercase text-graphite/70 font-semibold">
            {[...PROGRAMS, ...PROGRAMS].map((p, i) => (
              <span key={i} className="inline-flex items-center gap-3">
                <span className="text-rust text-[7px]">●</span>
                {p.shortTitle}
              </span>
            ))}
          </div>
          {/* Edge fade masks */}
          <div
            className="absolute inset-y-0 left-0 w-24 md:w-40 pointer-events-none"
            style={{ background: 'linear-gradient(to right, rgb(244 241 236 / 0.95), transparent)' }}
          />
          <div
            className="absolute inset-y-0 right-0 w-24 md:w-40 pointer-events-none"
            style={{ background: 'linear-gradient(to left, rgb(244 241 236 / 0.95), transparent)' }}
          />
        </div>
      </div>

      {/* Inline keyframes — marquee animation lives next to the
          component so all section-specific styles stay co-located. */}
      <style>{`
        .programs-hero-marquee {
          width: max-content;
          animation: programs-hero-marquee 38s linear infinite;
        }
        @keyframes programs-hero-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .programs-hero-marquee { animation: none; }
        }
      `}</style>
    </section>
  )
}

// Brand Ambassador — editorial feature on Milind Soman. Mandatory
// 'Brand Ambassador · TLC' attribution rendered on the portrait. Dark
// section so it sits as a distinct, premium beat between the
// programmes grid and the BMI selector.
function BrandAmbassador() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (instantMotion()) return
    const el = ref.current
    if (!el) return
    const items = el.querySelectorAll<HTMLElement>('[data-ba-anim]')
    gsap.set(items, { y: 28 })
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 78%' },
    })
  }, [])

  const FEATS = [
    { k: 'Ironman', v: 'Triathlon, age 50' },
    { k: 'Pinkathon', v: "India's biggest women's run" },
    { k: '60', v: 'Fitter than at 28' },
  ]

  return (
    <section
      ref={ref}
      className="relative bg-ink text-cream py-16 md:py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Ambient warm wash + faint grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 600px at 18% 22%, rgba(148,84,85,0.20), transparent 60%), radial-gradient(800px 500px at 88% 80%, rgba(178,122,123,0.12), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay hero-grain"
      />
      <div aria-hidden className="absolute inset-x-6 md:inset-x-12 top-0 h-px bg-white/10" />
      <div aria-hidden className="absolute inset-x-6 md:inset-x-12 bottom-0 h-px bg-white/10" />

      <div className="relative z-10 max-w-[1240px] mx-auto grid md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-16 lg:gap-20 items-center">
        {/* Portrait with mandatory brand-ambassador badge */}
        <div
          data-ba-anim
          className="relative aspect-[4/5] rounded-[20px] overflow-hidden bg-ink/40 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)] mx-auto w-full max-w-[460px]"
        >
          <img
            src="/longevity/milind-soman.jpg?v=3"
            width={1000}
            height={660}
            alt="Milind Soman, Brand Ambassador, The Longevity Centre"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Mandatory attribution badge */}
          <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-rust text-white px-3.5 py-1.5 rounded-full shadow-[0_8px_22px_-10px_rgba(0,0,0,0.6)]">
            <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
            <span className="text-[9.5px] md:text-[10px] tracking-[0.26em] uppercase font-semibold">
              Brand Ambassador &middot; TLC
            </span>
          </div>
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[42%] pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0) 100%)',
            }}
          />
          <div className="absolute inset-x-0 bottom-0 px-6 md:px-7 pb-6 md:pb-7">
            <div className="font-display italic text-white text-[19px] md:text-[24px] leading-[1.15]">
              Milind Soman
            </div>
            <div className="text-[10px] tracking-[0.32em] uppercase text-white/70 font-semibold mt-1.5">
              Actor &middot; Supermodel &middot; Ironman
            </div>
          </div>
        </div>

        {/* Copy */}
        <div>
          <div data-ba-anim className="inline-flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-rust-soft" />
            <span className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust-soft font-semibold">
              Our Brand Ambassador
            </span>
          </div>
          <h2
            data-ba-anim
            className="font-display font-light text-[30px] md:text-[44px] xl:text-[52px] leading-[1.05] tracking-[-0.03em] text-white mb-6"
          >
            The proof that age is{' '}
            <span className="font-bold italic text-rust-soft">a number, not a limit.</span>
          </h2>
          <p
            data-ba-anim
            className="text-[14.5px] md:text-[16.5px] leading-[1.75] text-cream/75 font-light max-w-[560px] mb-6"
          >
            At 50, Milind Soman finished an Ironman triathlon, a 3.8&nbsp;km
            swim, 180&nbsp;km cycle and a full marathon, inside 16 hours. At 60,
            he is measurably fitter than most men half his age. He runs
            barefoot, trains by feel, and built the Pinkathon to put a
            generation of Indian women on the start line.
          </p>
          <p
            data-ba-anim
            className="font-display italic text-rust-soft text-[16px] md:text-[20px] leading-[1.4] mb-8 max-w-[520px]"
          >
            “Strength isn’t something you lose with age, it’s something you
            choose to keep.”
          </p>

          {/* Feats strip */}
          <div
            data-ba-anim
            className="grid grid-cols-3 gap-px bg-white/12 rounded-2xl overflow-hidden border border-white/12 max-w-[560px]"
          >
            {FEATS.map((f) => (
              <div key={f.k} className="bg-ink px-3 py-4 md:px-4 md:py-5 text-center">
                <div className="font-display font-bold text-[16px] md:text-[20px] text-rust-soft leading-none mb-1.5 tracking-tight">
                  {f.k}
                </div>
                <div className="text-[9px] md:text-[9.5px] tracking-[0.18em] uppercase text-cream/65 font-semibold leading-[1.4]">
                  {f.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProgrammesGrid() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (instantMotion()) return
    const el = ref.current
    if (!el) return
    const cards = el.querySelectorAll<HTMLElement>('.prog-card')
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'expo.out',
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        }
      )
    })
  }, [])

  return (
    <section className="bg-white pb-24 md:pb-36 px-6 md:px-12">
      <div ref={ref} className="max-w-[1240px] mx-auto flex flex-col gap-16 md:gap-24">
        {PROGRAMS.map((p, i) => {
          const imageOnLeft = i % 2 === 0
          return (
            <article
              key={p.slug}
              className="prog-card group grid md:grid-cols-2 gap-8 md:gap-14 lg:gap-20 items-center"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Image — alternates side via md:order */}
              <a
                href={`/programs/${p.slug}`}
                data-cursor="hover"
                className={`relative aspect-[5/4] w-full overflow-hidden rounded-[22px] md:rounded-[28px] bg-mist block ${
                  imageOnLeft ? 'md:order-1' : 'md:order-2'
                }`}
                style={{
                  boxShadow:
                    '0 30px 60px -30px rgba(27,26,24,0.20), 0 10px 30px -20px rgba(27,26,24,0.08)',
                }}
              >
                <img
                  src={p.cardImg}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                {/* Number badge */}
                <div className="absolute top-4 left-4 backdrop-blur-md bg-white/85 border border-white rounded-full px-3 py-1.5">
                  <span
                    className={`text-[10px] tracking-[0.28em] uppercase font-semibold tabular-nums ${accentText(
                      p.accent
                    )}`}
                  >
                    {p.cat}
                  </span>
                </div>
              </a>

              {/* Content — alternates side */}
              <div className={imageOnLeft ? 'md:order-2' : 'md:order-1'}>
                {/* Tag */}
                <div
                  className={`text-[10.5px] tracking-[0.32em] uppercase font-semibold mb-4 ${accentText(
                    p.accent
                  )}`}
                >
                  {p.tag}
                </div>

                {/* Title */}
                <h3 className="font-display font-light text-[30px] md:text-[36px] lg:text-[44px] leading-[1.08] tracking-[-0.025em] text-ink mb-5">
                  {p.shortTitle}
                </h3>

                {/* Accent line */}
                <span
                  aria-hidden
                  className={`block h-px w-10 ${accentBg(
                    p.accent
                  )} mb-6 transition-all duration-700 group-hover:w-20`}
                />

                {/* Body */}
                <p className="text-[14.5px] md:text-[15.5px] leading-[1.7] text-graphite font-light mb-8 max-w-[520px]">
                  {p.desc}
                </p>

                {/* CTA row */}
                <div className="flex items-center gap-6 flex-wrap">
                  <a
                    href={`/programs/${p.slug}`}
                    data-cursor="hover"
                    className="group/cta inline-flex items-center gap-2.5 pl-5 pr-6 py-3 bg-ink text-white text-[11px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
                  >
                    Learn More
                    <span
                      aria-hidden
                      className="transition-transform duration-500 group-hover/cta:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                  <span className="text-[11px] tracking-[0.22em] uppercase text-stone/80 font-medium">
                    {p.duration}
                  </span>
                </div>
              </div>
            </article>
          )
        })}
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
          Not Sure Which One?
        </div>
        <h2 className="font-display font-light text-[32px] md:text-[48px] xl:text-[56px] leading-[1.1] tracking-[-0.03em] mb-10">
          Begin with a 30-minute consultation.
          <br />
          <span className="font-bold text-rust-soft">We'll guide you to the right protocol.</span>
        </h2>
        <a
          href="tel:+918826809123"
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

// Programme comparison table — an at-a-glance, side-by-side of all seven
// programmes (duration · price · focus). Scannable for visitors deciding
// between protocols, and a highly citable structured asset for AI/GEO
// engines answering "which TLC programme is shortest / most affordable /
// for X". Data-driven from PROGRAMS — no hand-maintained duplication.
function ProgrammesCompare() {
  return (
    <section className="bg-cream/40 py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-7 h-px bg-rust" />
            <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
              Compare
            </span>
            <span className="w-7 h-px bg-rust" />
          </div>
          <h2 className="font-display font-bold text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.03em] text-ink">
            All seven programmes, side by side.
          </h2>
        </div>

        <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-ink/15">
                <th className="py-4 pr-4 font-display font-semibold text-[13px] md:text-[14px] text-ink">
                  Programme
                </th>
                <th className="py-4 px-4 font-display font-semibold text-[13px] md:text-[14px] text-ink whitespace-nowrap">
                  Duration
                </th>
                <th className="py-4 px-4 font-display font-semibold text-[13px] md:text-[14px] text-ink whitespace-nowrap">
                  From
                </th>
                <th className="py-4 pl-4 font-display font-semibold text-[13px] md:text-[14px] text-ink">
                  Best for
                </th>
              </tr>
            </thead>
            <tbody>
              {PROGRAMS.map((p) => (
                <tr key={p.slug} className="border-b border-mist align-top">
                  <td className="py-4 pr-4">
                    <a
                      href={`/programs/${p.slug}`}
                      data-cursor="hover"
                      className="font-display font-semibold text-[14px] md:text-[15px] text-ink hover:text-rust transition-colors"
                    >
                      {p.shortTitle}
                    </a>
                  </td>
                  <td className="py-4 px-4 text-[13px] md:text-[14px] text-graphite whitespace-nowrap">
                    {p.duration}
                  </td>
                  <td className="py-4 px-4 text-[13px] md:text-[14px] text-graphite tabular-nums whitespace-nowrap">
                    {p.price}
                  </td>
                  <td className="py-4 pl-4 text-[13px] md:text-[14px] leading-[1.6] text-graphite font-light">
                    {p.focus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-[12px] text-graphite/70 font-light">
          Prices are starting points; final protocols are tailored after your
          diagnostic assessment. All programmes are physician-led.
        </p>
      </div>
    </section>
  )
}

export function ProgramsIndexPage() {
  useDocumentMeta({
    title: 'Programmes · TLC, Diagnostics-Led Longevity & Metabolic Care',
    description:
      "TLC's seven flagship longevity and metabolic programmes, physician-led, diagnostics-rooted, continuously refined.",
    path: '/programs',
    ogImage: '/og/programmes.jpg',
    jsonLd: [
      breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'Programmes', url: '/programs' },
      ]),
    ],
  })

  return (
    <>
      <Hero />
      <ProgrammesGrid />
      <ProgrammesCompare />
      <BrandAmbassador />
      <BmiCalculator variant="selector" />
      <Faq faqs={PROGRAMS_FAQS} heading="Questions about our programmes" idPrefix="programs-faq" />
      <CtaBand />
    </>
  )
}
