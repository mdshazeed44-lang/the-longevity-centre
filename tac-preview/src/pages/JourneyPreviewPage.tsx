// JourneyPreviewPage — temporary preview at /journey-preview.
//
// Six different design directions for a Past · Present · Future story
// section that the client can scroll through and pick from. Each option
// is sized small (~500-600px) so all six fit on a single preview page.
//
// Story arc — three acts that map to the brand's real journey:
//   Past    — Founders open the first TLC clinic in Delhi (founderboth.jpg)
//   Present — Eight centres, thousands of biomarkers, families served
//             (family-three-generations.jpg)
//   Future  — A generation that ages on its own terms — represented by
//             Milind Soman, India's icon of healthy ageing
//             (milind-soman.jpg)
//
// Not linked from nav — direct URL only.
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

const ACTS = [
  {
    era: 'Origins',
    year: '2018',
    headline: 'Where it began.',
    lede: 'A single clinic. A twenty-year clinical legacy carried forward.',
    body: 'Dr. Bhavna and Dr. Abhinav Sharma open the first Longevity Centre in Delhi — born from one conviction: that modern medicine waits too long, and India deserves more centenarians. The clinic was small. The ambition was not.',
    highlights: [
      'First TLC centre opens in Delhi',
      'Diagnostics-first preventive philosophy',
      'Founders’ 20-year clinical legacy',
    ],
    img: '/team/founderboth.jpg',
    caption: 'Dr. Bhavna &amp; Dr. Abhinav Sharma · co-founders',
  },
  {
    era: 'Today',
    year: '2026',
    headline: 'Where we stand.',
    lede: 'Eight centres. A thousand biomarkers. One promise.',
    body: 'Patients across Delhi, Gurgaon, Pune, Bangalore, Mumbai, Nagpur, Goa and Hyderabad are now measured — not managed. Three biological-age clocks. A partner laboratory in the Netherlands. Six flagship programmes designed by doctors, refined by data.',
    highlights: [
      '8 centres pan-India',
      '1000+ biomarkers · 3 age clocks',
      'European laboratory partnership',
    ],
    img: '/longevity/family-three-generations.jpg',
    caption: 'Three generations · the families we serve today',
  },
  {
    era: 'Tomorrow',
    year: '2030+',
    headline: 'Where we’re headed.',
    lede: 'A generation that ages on its own terms.',
    body: 'Twenty-five centres across South Asia. AI-personalised longevity protocols built on the region’s largest biological-age dataset. Our mission — turn the longevity gap between India and the world into a longevity lead.',
    highlights: [
      '25+ centres across South Asia',
      'AI-personalised protocols',
      'Active centenarians, at scale',
    ],
    img: '/longevity/milind-soman.jpg',
    caption: 'Milind Soman · 58 · what ageing well looks like',
  },
]

// ────────────────────────────────────────────────────────────────────
// Shared helpers
// ────────────────────────────────────────────────────────────────────

function PreviewLabel({
  n,
  name,
  desc,
}: {
  n: number
  name: string
  desc: string
}) {
  return (
    <div className="max-w-[1240px] mx-auto px-6 md:px-12 pt-20 pb-6 md:pt-28 md:pb-8">
      <div className="flex items-baseline gap-4 mb-3">
        <span className="font-display font-bold text-rust text-[42px] md:text-[60px] leading-none tabular-nums tracking-[-0.04em]">
          0{n}
        </span>
        <h2 className="font-display font-bold text-[24px] md:text-[34px] leading-[1.05] tracking-[-0.02em] text-ink">
          {name}
        </h2>
      </div>
      <p className="text-[13.5px] md:text-[15px] text-graphite/85 font-light leading-[1.65] max-w-[680px]">
        {desc}
      </p>
      <div className="mt-5 h-px bg-rust/25" />
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
// 01 — Filmstrip Horizontal
// 3 cards in a row. Each card lifts + image scales on hover, slides in
// with stagger on scroll. Simple, scannable, photo-led.
// ────────────────────────────────────────────────────────────────────

function FilmstripVariant() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduceMotion()) return
    if (!ref.current) return
    const cards = ref.current.querySelectorAll('.fs-card')
    gsap.from(cards, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.12,
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    })
  }, [])
  return (
    <section className="bg-cream/30 py-12 md:py-16 px-6 md:px-12">
      <div ref={ref} className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-5 md:gap-6">
        {ACTS.map((a) => (
          <article
            key={a.year}
            className="fs-card group bg-white rounded-[18px] overflow-hidden border border-mist/70 shadow-[0_18px_36px_-24px_rgba(27,26,24,0.20)] transition-transform duration-500 hover:-translate-y-1.5"
          >
            <div className="relative aspect-[5/4] overflow-hidden bg-mist">
              <img
                src={a.img}
                alt={a.era}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
              />
              <div className="absolute top-3 left-3 backdrop-blur-md bg-white/85 border border-white rounded-full px-3 py-1">
                <span className="text-[9.5px] tracking-[0.28em] uppercase font-bold text-rust tabular-nums">
                  {a.year}
                </span>
              </div>
            </div>
            <div className="p-5 md:p-6">
              <div className="text-[10px] tracking-[0.32em] uppercase text-rust font-semibold mb-2">
                {a.era}
              </div>
              <h3 className="font-display font-light text-[20px] md:text-[22px] leading-[1.15] text-ink mb-2">
                {a.headline}
              </h3>
              <p className="text-[13px] md:text-[14px] text-graphite font-light leading-[1.6]">
                {a.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────
// 02 — Cinematic Sticky Crossfade
// Vertical timeline with a sticky image column that crossfades between
// the 3 acts as you scroll past markers. Cinematic, premium.
// ────────────────────────────────────────────────────────────────────

function StickyCrossfadeVariant() {
  const sectionRef = useRef<HTMLElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const setImgRef = (i: number) => (el: HTMLImageElement | null) => {
    if (el) imagesRef.current[i] = el
  }
  useEffect(() => {
    if (reduceMotion()) return
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.set(imagesRef.current[1], { autoAlpha: 0 })
      gsap.set(imagesRef.current[2], { autoAlpha: 0 })
      const triggers = sectionRef.current!.querySelectorAll('.sx-act')
      triggers.forEach((t, i) => {
        ScrollTrigger.create({
          trigger: t,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => crossfadeTo(i),
          onEnterBack: () => crossfadeTo(i),
        })
      })
      function crossfadeTo(idx: number) {
        imagesRef.current.forEach((img, i) => {
          gsap.to(img, { autoAlpha: i === idx ? 1 : 0, duration: 0.8, ease: 'power3.out' })
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])
  return (
    <section
      ref={sectionRef}
      className="bg-white py-12 md:py-16 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-[1180px] mx-auto grid md:grid-cols-[1fr_1fr] gap-10 md:gap-16">
        {/* Sticky image stack */}
        <div className="md:sticky md:top-24 md:self-start">
          <div className="relative aspect-[4/5] rounded-[18px] overflow-hidden bg-mist shadow-[0_28px_60px_-30px_rgba(27,26,24,0.32)]">
            {ACTS.map((a, i) => (
              <img
                key={a.year}
                ref={setImgRef(i)}
                src={a.img}
                alt={a.era}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: i === 0 ? 1 : 0 }}
              />
            ))}
          </div>
        </div>

        {/* Scrolling acts */}
        <div className="space-y-12 md:space-y-20">
          {ACTS.map((a) => (
            <div key={a.year} className="sx-act">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-display font-bold text-rust text-[42px] md:text-[64px] leading-none tabular-nums tracking-[-0.03em]">
                  {a.year}
                </span>
                <span className="text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold">
                  {a.era}
                </span>
              </div>
              <h3 className="font-display font-light text-[26px] md:text-[34px] leading-[1.08] text-ink mb-3">
                {a.headline}
              </h3>
              <p className="text-[14px] md:text-[15.5px] text-graphite font-light leading-[1.7] max-w-[420px]">
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────
// 03 — Polaroid Wall
// 3 tilted polaroid-style cards. Hover untilts the focused card and
// gently fans the others. Playful, "cute".
// ────────────────────────────────────────────────────────────────────

function PolaroidVariant() {
  return (
    <section className="bg-[#F3EDE2] py-16 md:py-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        <div className="polaroid-group flex flex-col md:flex-row items-center justify-center gap-6 md:gap-3">
          {ACTS.map((a, i) => (
            <article
              key={a.year}
              className="polaroid-card group relative bg-white p-3 pb-4 shadow-[0_18px_40px_-18px_rgba(27,26,24,0.30)] transition-transform duration-500 cursor-default"
              style={{
                width: '260px',
                transform: `rotate(${[-6, 3, -2][i]}deg)`,
                zIndex: 10 - i,
              }}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-mist">
                <img
                  src={a.img}
                  alt={a.era}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter,transform] duration-700 group-hover:scale-105"
                />
              </div>
              <div className="px-1 pt-3 text-center">
                <div className="font-display italic text-ink text-[18px] leading-[1.1]">
                  {a.era} &middot; {a.year}
                </div>
                <div className="text-[10.5px] tracking-[0.28em] uppercase text-stone font-semibold mt-1">
                  {a.headline}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .polaroid-card { transition: transform 500ms cubic-bezier(0.22,1,0.36,1); }
        .polaroid-group:hover .polaroid-card { transform: rotate(0deg) translateY(0); }
        .polaroid-card:hover { transform: rotate(0deg) translateY(-10px) scale(1.04) !important; z-index: 30; }
      `}</style>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────
// 04 — Tab Carousel
// Single big hero image with 3 era tabs underneath. Click a tab — the
// hero image and headline morph. Compact, interactive, image-led.
// ────────────────────────────────────────────────────────────────────

function TabCarouselVariant() {
  const [active, setActive] = useState(0)
  const imgRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const a = ACTS[active]

  useEffect(() => {
    if (reduceMotion()) return
    if (imgRef.current) {
      gsap.fromTo(imgRef.current, { scale: 1.06, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' })
    }
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08 },
      )
    }
  }, [active])

  return (
    <section className="bg-ink text-cream py-14 md:py-20 px-6 md:px-12">
      <div className="max-w-[1180px] mx-auto grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-14 items-center">
        {/* Hero image */}
        <div className="relative aspect-[4/5] md:aspect-auto md:h-[460px] rounded-[18px] overflow-hidden bg-ink/40">
          <img
            key={a.year}
            ref={imgRef}
            src={a.img}
            alt={a.era}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)',
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 font-display font-bold text-[44px] md:text-[80px] leading-none text-rust-soft tabular-nums tracking-[-0.04em]">
            {a.year}
          </div>
        </div>

        {/* Text + tabs */}
        <div>
          <div ref={textRef} className="mb-8">
            <div className="text-[11px] tracking-[0.42em] uppercase text-rust-soft font-semibold mb-4">
              {a.era}
            </div>
            <h3 className="font-display font-light text-[28px] md:text-[40px] leading-[1.08] text-cream mb-4">
              {a.headline}
            </h3>
            <p className="text-[14.5px] md:text-[16px] text-cream/75 font-light leading-[1.7] max-w-[440px]">
              {a.body}
            </p>
          </div>

          {/* Tab nav */}
          <div className="grid grid-cols-3 gap-px bg-cream/15 rounded-[14px] overflow-hidden">
            {ACTS.map((t, i) => (
              <button
                key={t.year}
                onClick={() => setActive(i)}
                className={`px-3 py-3 md:px-4 md:py-4 text-left transition-colors duration-500 ${
                  active === i ? 'bg-rust text-white' : 'bg-ink hover:bg-cream/[0.08] text-cream'
                }`}
              >
                <div className="font-display font-bold text-[16px] md:text-[18px] tabular-nums leading-none mb-1">
                  {t.year}
                </div>
                <div className="text-[9.5px] tracking-[0.28em] uppercase font-semibold opacity-85">
                  {t.era}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────
// 05 — Staircase Stagger
// 3 cards diagonally offset. Each rises into place on scroll with a
// slight tilt. Editorial, magazine-spread vibe.
// ────────────────────────────────────────────────────────────────────

function StaircaseVariant() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduceMotion()) return
    if (!ref.current) return
    const cards = ref.current.querySelectorAll('.stair-card')
    gsap.from(cards, {
      y: 50,
      rotation: (i) => [-3, 2, -1.5][i] ?? 0,
      opacity: 0,
      duration: 1.0,
      ease: 'expo.out',
      stagger: 0.15,
      scrollTrigger: { trigger: ref.current, start: 'top 75%' },
    })
  }, [])
  return (
    <section className="bg-white py-14 md:py-20 px-6 md:px-12">
      <div
        ref={ref}
        className="relative max-w-[1100px] mx-auto h-[640px] md:h-[560px]"
      >
        {ACTS.map((a, i) => {
          const positions = [
            { left: '0%', top: '0%', rot: '-2deg' },
            { left: '28%', top: '14%', rot: '1.5deg' },
            { left: '54%', top: '4%', rot: '-1deg' },
          ]
          const p = positions[i]
          return (
            <article
              key={a.year}
              className="stair-card absolute w-[300px] md:w-[380px] bg-white rounded-[18px] overflow-hidden shadow-[0_30px_60px_-30px_rgba(27,26,24,0.30)] border border-mist/70 hover:z-20 hover:scale-[1.03] transition-transform duration-500"
              style={{ left: p.left, top: p.top, transform: `rotate(${p.rot})`, zIndex: 10 - i }}
            >
              <div className="relative aspect-[5/3] bg-mist overflow-hidden">
                <img src={a.img} alt={a.era} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display font-bold text-rust text-[24px] md:text-[28px] leading-none tabular-nums tracking-[-0.02em]">
                    {a.year}
                  </span>
                  <span className="text-[9.5px] tracking-[0.28em] uppercase text-rust font-semibold">
                    {a.era}
                  </span>
                </div>
                <h3 className="font-display font-light text-[18px] md:text-[20px] leading-[1.15] text-ink mb-2">
                  {a.headline}
                </h3>
                <p className="text-[12.5px] md:text-[13px] text-graphite font-light leading-[1.55]">
                  {a.body}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────
// 06 — True Horizontal Scroll Filmstrip
// Section pins to the viewport. As the user scrolls DOWN, the page-
// scroll is converted into HORIZONTAL movement inside the section: a
// filmstrip of three large cards translates from right to left. Each
// card scales UP when it reaches viewport centre and shrinks slightly
// when it drifts to the edges, so the active image always feels like
// the hero. Once the strip has fully translated, the page unpins and
// continues normally below.
// ────────────────────────────────────────────────────────────────────

function VerticalTimelineVariant() {
  const sectionRef = useRef<HTMLElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const indicatorRef = useRef<HTMLDivElement>(null)
  const indexLabelRef = useRef<HTMLSpanElement>(null)

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el
  }

  useEffect(() => {
    if (reduceMotion()) return
    if (!sectionRef.current || !stripRef.current) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        const strip = stripRef.current!

        // Total horizontal distance the strip needs to travel so the
        // last card ends flush with the viewport right edge.
        const getDistance = () =>
          Math.max(0, strip.scrollWidth - window.innerWidth)

        // MAIN — convert vertical page scroll into horizontal strip
        // translation. `scrub` ties it directly to the scrollbar so
        // the user feels their scroll wheel drive horizontal motion.
        gsap.to(strip, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })

        // SCALE — each card scales up as it approaches viewport
        // centre, scales down as it drifts away. We recompute on
        // every scroll tick from the live bounding rect rather than
        // pre-baking a timeline; this stays in sync with the strip
        // animation no matter how the layout reflows.
        const updateScales = () => {
          const vw = window.innerWidth
          const center = vw / 2
          cardsRef.current.forEach((card) => {
            if (!card) return
            const r = card.getBoundingClientRect()
            const cardCenter = r.left + r.width / 2
            const dist = Math.abs(center - cardCenter) / vw
            // dist 0 → scale 1.0, dist 0.5 → scale 0.86, capped.
            const scale = Math.max(0.84, 1 - dist * 0.32)
            gsap.set(card, { scale })
          })
        }
        const updater = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: updateScales,
        })
        // Run once for the initial state so card 0 starts at scale 1.
        updateScales()

        // PROGRESS RAIL — rust pill travels left → right.
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (st) => {
            const p = st.progress
            const idx = p < 0.34 ? 0 : p < 0.68 ? 1 : 2
            if (indexLabelRef.current && indexLabelRef.current.textContent !== `0${idx + 1}`) {
              indexLabelRef.current.textContent = `0${idx + 1}`
            }
            if (indicatorRef.current) {
              indicatorRef.current.style.left = `${p * 66.66}%`
            }
          },
        })

        return () => {
          updater.kill()
        }
      }, sectionRef)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream/40 md:h-[300vh] py-12 md:py-0"
    >
      {/* Sticky pin on desktop. Mobile gets natural vertical stack.
          NOTE: overflow-hidden lives here, NOT on the parent section —
          a parent with `overflow: hidden` breaks position:sticky. The
          sticky container clips the wide horizontal strip on its own. */}
      <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden flex md:items-center relative">
        {/* The horizontal filmstrip. md:flex makes it a row of fixed-
            width cards; on mobile it collapses to a normal vertical
            stack via space-y. */}
        <div
          ref={stripRef}
          className="md:flex md:items-center md:gap-10 lg:gap-14 md:pl-[12vw] md:pr-[12vw] md:will-change-transform space-y-12 md:space-y-0 w-full md:w-auto"
        >
          {ACTS.map((a, i) => (
            <article
              key={a.year}
              ref={setCardRef(i)}
              className="md:shrink-0 md:w-[78vw] lg:w-[72vw] xl:w-[66vw] will-change-transform"
            >
              <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 lg:gap-16 items-center">
                {/* Hero image — large, dominant. Year + era overlaid
                    bottom-left, with a thin rust hairline + italic
                    photo caption above so each image reads as an
                    editorial plate, not just a stock shot. */}
                <div className="relative aspect-[5/6] md:aspect-[4/5] rounded-[20px] overflow-hidden bg-mist shadow-[0_30px_70px_-30px_rgba(27,26,24,0.40)]">
                  <img
                    src={a.img}
                    alt={a.era}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(27,26,24,0.70) 0%, rgba(27,26,24,0) 100%)',
                    }}
                  />
                  <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 right-6 md:right-8">
                    <div className="text-[10px] tracking-[0.34em] uppercase text-white/85 font-semibold mb-1.5">
                      {a.era}
                    </div>
                    <div
                      className="font-display font-bold text-white tabular-nums leading-none tracking-[-0.04em]"
                      style={{ fontSize: 'clamp(52px, 6.5vw, 92px)' }}
                    >
                      {a.year}
                    </div>
                    <div className="mt-3 flex items-center gap-2.5">
                      <span aria-hidden className="w-6 h-px bg-rust-soft" />
                      <span
                        className="font-display italic text-white/85 text-[12px] md:text-[14px] leading-[1.25]"
                        dangerouslySetInnerHTML={{ __html: a.caption }}
                      />
                    </div>
                  </div>
                </div>

                {/* Text block — eyebrow + headline + italic lede +
                    body + highlight bullets + numbered index. */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-7 h-px bg-rust" />
                    <span className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold">
                      {a.era}
                    </span>
                  </div>
                  <h3 className="font-display font-light text-[28px] md:text-[40px] xl:text-[48px] leading-[1.04] tracking-[-0.025em] text-ink mb-3">
                    {a.headline}
                  </h3>
                  <p className="font-display italic text-rust text-[16px] md:text-[20px] xl:text-[22px] leading-[1.35] mb-5 max-w-[480px]">
                    {a.lede}
                  </p>
                  <p className="text-[14px] md:text-[15.5px] text-graphite font-light leading-[1.7] mb-6 max-w-[480px]">
                    {a.body}
                  </p>
                  <ul className="space-y-2 mb-7 max-w-[440px]">
                    {a.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2.5 text-[12.5px] md:text-[14px] text-ink/85 font-medium"
                      >
                        <span
                          aria-hidden
                          className="mt-[7px] w-1.5 h-1.5 rounded-full bg-rust shrink-0"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="inline-flex items-baseline gap-2">
                    <span className="font-display font-bold text-rust text-[28px] md:text-[34px] leading-none tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="text-[10px] tracking-[0.32em] uppercase text-rust/70 font-semibold">
                      / 03
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom progress rail — fixed inside the sticky pin */}
        <div className="hidden md:flex absolute bottom-6 left-12 right-12 items-center gap-6 pointer-events-none z-10">
          <div className="flex-1 relative h-px bg-rust/15">
            <div
              ref={indicatorRef}
              className="absolute -top-[5px] h-2.5 w-[33.33%] bg-rust/85 rounded-full transition-[left] duration-100"
              style={{ left: '0%' }}
            />
          </div>
          <div className="flex items-baseline gap-2 text-rust font-semibold font-display tabular-nums">
            <span ref={indexLabelRef} className="text-[24px] leading-none">
              01
            </span>
            <span className="text-[11px] tracking-[0.32em] uppercase opacity-70">
              / 03
            </span>
          </div>
        </div>

        {/* Top-right scroll cue */}
        <div className="hidden md:flex absolute top-6 right-12 items-center gap-3 text-[9.5px] tracking-[0.32em] uppercase text-stone font-semibold pointer-events-none z-10">
          <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-rust" />
          <span>Scroll &rarr; horizontal</span>
          <span aria-hidden className="animate-pulse">→</span>
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────
// 07 — Card Flip 3D
// 3 cards. Front shows era + big year, back reveals story + image.
// Click/hover flips the card on Y axis. Playful, novel.
// ────────────────────────────────────────────────────────────────────

function CardFlipVariant() {
  return (
    <section className="bg-white py-14 md:py-20 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-5 md:gap-6">
        {ACTS.map((a, i) => (
          <div
            key={a.year}
            className="flip-card group cursor-pointer"
            style={{ perspective: '1400px' }}
            onClick={(e) => {
              const card = (e.currentTarget.querySelector('.flip-inner') as HTMLElement | null)
              if (!card) return
              card.classList.toggle('is-flipped')
            }}
          >
            <div
              className="flip-inner relative w-full aspect-[3/4] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
            >
              {/* Front */}
              <div
                className="absolute inset-0 rounded-[18px] flex flex-col justify-between p-6 md:p-7 [backface-visibility:hidden] overflow-hidden"
                style={{
                  background: i === 1
                    ? 'linear-gradient(160deg, #945455 0%, #6E3C3D 100%)'
                    : 'linear-gradient(160deg, #1B1A18 0%, #2A2826 100%)',
                  color: '#EEE6DB',
                }}
              >
                <div className="text-[10.5px] tracking-[0.34em] uppercase font-semibold opacity-85">
                  {a.era}
                </div>
                <div>
                  <div className="font-display font-bold leading-[0.85] tabular-nums tracking-[-0.04em]" style={{ fontSize: 'clamp(80px, 14vw, 130px)' }}>
                    {a.year}
                  </div>
                  <div className="text-[10.5px] tracking-[0.28em] uppercase font-semibold mt-3 opacity-70">
                    Hover to reveal
                  </div>
                </div>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 rounded-[18px] overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] bg-mist"
              >
                <img src={a.img} alt={a.era} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.78) 100%)' }} />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-white">
                  <h3 className="font-display font-light text-[20px] md:text-[24px] leading-[1.15] mb-2">
                    {a.headline}
                  </h3>
                  <p className="text-[12.5px] md:text-[13.5px] font-light leading-[1.6] text-white/85">
                    {a.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .flip-card .flip-inner.is-flipped { transform: rotateY(180deg); }
      `}</style>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────
// Page shell
// ────────────────────────────────────────────────────────────────────

export function JourneyPreviewPage() {
  // No useDocumentMeta — temp page, default <title> is fine
  return (
    <div className="bg-white text-ink">
      {/* Header */}
      <header className="bg-ink text-cream pt-24 md:pt-32 pb-12 md:pb-14 px-6 md:px-12">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-9 h-px bg-rust-soft" />
            <span className="text-[11px] tracking-[0.42em] uppercase text-rust-soft font-semibold">
              Internal · Journey Section Preview
            </span>
          </div>
          <h1 className="font-display font-light text-[36px] md:text-[56px] xl:text-[68px] leading-[1.02] tracking-[-0.035em] mb-4">
            Pick your{' '}
            <span className="font-bold italic text-rust-soft">favourite.</span>
          </h1>
          <p className="text-[14.5px] md:text-[16.5px] text-cream/75 font-light leading-[1.7] max-w-[680px]">
            Six design directions for the Past · Present · Future story
            section on the homepage. Same content, same triad of images —
            different compositions and motion. Scroll through, screenshot the
            one you love, and we&rsquo;ll ship it.
          </p>
          <div className="mt-7 text-[10.5px] tracking-[0.32em] uppercase text-cream/55 font-semibold">
            Six options &middot; ~5 minutes to scroll
          </div>
        </div>
      </header>

      {/* Variants */}
      <PreviewLabel
        n={1}
        name="The Filmstrip"
        desc="Three editorial cards in a row, photos on top, story below. Soft lift on hover, stagger-in on scroll. Quietly confident — works on every device."
      />
      <FilmstripVariant />

      <PreviewLabel
        n={2}
        name="The Cinematic"
        desc="Sticky image column on the left crossfades between eras as you scroll past each act. Premium and immersive — feels like a documentary."
      />
      <StickyCrossfadeVariant />

      <PreviewLabel
        n={3}
        name="The Polaroid Wall"
        desc="Three tilted polaroid cards on cream. Greyscale photos that pop into colour on hover; the focused card straightens up while siblings keep their tilt. Cute, brand-warm."
      />
      <PolaroidVariant />

      <PreviewLabel
        n={4}
        name="The Tab Carousel"
        desc="One big hero image, three era tabs underneath. Click an era — photo, year, headline morph in. Tight, interactive, very mobile-friendly."
      />
      <TabCarouselVariant />

      <PreviewLabel
        n={5}
        name="The Staircase"
        desc="Three cards diagonally offset, each entering with a slight tilt. Reads like a magazine spread. Bold and editorial."
      />
      <StaircaseVariant />

      <PreviewLabel
        n={6}
        name="The Timeline (True Horizontal Scroll)"
        desc="Section pins. Your vertical scroll is converted into horizontal motion — a filmstrip of three large cards travels from right to left inside the section. Each card scales UP when it reaches viewport centre (hero size) and shrinks slightly at the edges. The page only continues vertically once the strip has finished its run."
      />
      <VerticalTimelineVariant />

      <PreviewLabel
        n={7}
        name="The Flip"
        desc="Three 3-D cards. Front is a giant year on a dark/rust panel; hover or tap flips to reveal the photo and the story. Most surprising, most playful."
      />
      <CardFlipVariant />

      {/* Footer */}
      <footer className="bg-ink text-cream py-14 md:py-20 px-6 md:px-12 mt-16">
        <div className="max-w-[1240px] mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-7 h-px bg-rust-soft" />
            <span className="text-[10.5px] tracking-[0.42em] uppercase text-rust-soft font-semibold">
              Pick one
            </span>
            <span className="w-7 h-px bg-rust-soft" />
          </div>
          <h2 className="font-display font-light text-[26px] md:text-[40px] leading-[1.1] tracking-[-0.025em] mb-4">
            Reply with the number you like &mdash; we&rsquo;ll wire it into{' '}
            <span className="italic text-rust-soft">/about-us</span> or the
            homepage by tonight.
          </h2>
          <p className="text-[13px] md:text-[14.5px] text-cream/65 font-light max-w-[560px] mx-auto">
            Content, year markers and images are placeholders — final copy
            comes from the client. Section can be made shorter or taller, dark
            or cream, full-bleed or contained, once a direction is locked.
          </p>
        </div>
      </footer>
    </div>
  )
}
