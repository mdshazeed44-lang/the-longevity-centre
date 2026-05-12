// Journey — homepage horizontal-scroll story section. Six acts that
// tell the TLC arc from its MAMC roots in the early 2000s to a 2030+
// vision of population-scale longevity. Section pins to the viewport;
// vertical wheel scroll is converted into horizontal motion as a
// filmstrip of large image-led cards travels right → left. Each card
// scales up to hero size as it reaches the viewport centre.
//
// Lenis-friendly: uses CSS sticky (not ScrollTrigger.pin), so the
// site's smooth-scroll layer keeps working.
//
// Mobile: collapses to a natural vertical stack with no pin, no
// scroll-jacking, no transforms.

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../../lib/motion'

gsap.registerPlugin(ScrollTrigger)

type Act = {
  era: string
  year: string
  headline: string
  lede: string
  highlights: string[]
  img: string
  caption: string
}

const ACTS: Act[] = [
  {
    era: 'Roots',
    year: '~2000',
    headline: 'Where the story starts.',
    lede: 'Two doctors. One conviction — that India deserves more centenarians.',
    highlights: [
      'MBBS · Maulana Azad Medical College',
      'MS Surgery · PGI Chandigarh',
      'A shared vision takes root',
    ],
    img: '/team/founderboth.jpg',
    caption: 'Dr. Bhavna &amp; Dr. Abhinav Sharma',
  },
  {
    era: 'Mastery',
    year: '2005 – 17',
    headline: 'A craft, perfected.',
    lede: 'Two decades. Two of India’s most demanding specialties.',
    highlights: [
      '11,000+ minimally-invasive surgeries',
      '8,000+ IVF pregnancies',
      'Two decades of clinical leadership',
    ],
    img: '/longevity/microscope-analyst.jpg',
    caption: 'Two specialties. One philosophy.',
  },
  {
    era: 'The Pivot',
    year: '2018',
    headline: 'The Longevity Centre opens.',
    lede: 'Born from one belief — modern medicine waits too long.',
    highlights: [
      'First TLC centre · Delhi',
      'Diagnostics-first preventive model',
      'The brand is born',
    ],
    img: '/skin-aesthetics/08-hair-transplant.jpg',
    caption: 'Inside the first TLC clinic, Delhi',
  },
  {
    era: 'Network',
    year: '2019 – 24',
    headline: 'From Delhi, outward.',
    lede: 'Eight cities. One shared medical record.',
    highlights: [
      'Eight centres across India',
      'Six flagship programmes',
      'A pan-India patient record',
    ],
    // Gurgaon TLC centre interior — chosen here because Gurgaon was
    // among the first cities the model expanded to, and the photo
    // shows the actual clinic environment patients walk into.
    img: '/clinic-photos/gurgaon-centre.webp',
    caption: 'TLC Gurgaon · the network expands',
  },
  {
    era: 'Today',
    year: '2026',
    headline: 'Where we stand.',
    lede: 'A thousand biomarkers. Three biological-age clocks. One promise.',
    highlights: [
      '1000+ biomarkers per patient',
      '3 age clocks · Epigenetic · Blood · Gut',
      'European laboratory partnership',
    ],
    img: '/longevity/vitality-mature-woman.jpg',
    caption: 'The patients we measure',
  },
  {
    era: 'Tomorrow',
    year: '2030+',
    headline: 'Where we’re headed.',
    lede: 'A generation that ages on its own terms.',
    highlights: [
      '25+ centres across South Asia',
      'AI-personalised protocols',
      'A generation of active centenarians',
    ],
    img: '/longevity/milind-soman.jpg',
    caption: 'Milind Soman · 58 · ageing on his own terms',
  },
]

export function Journey() {
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

        const getDistance = () =>
          Math.max(0, strip.scrollWidth - window.innerWidth)

        // Vertical scroll → horizontal translation.
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

        // Per-card scale — centred card sits at 1.0, neighbours at
        // ~0.86. Recomputed each scroll tick from live rects.
        const updateScales = () => {
          const vw = window.innerWidth
          const center = vw / 2
          cardsRef.current.forEach((card) => {
            if (!card) return
            const r = card.getBoundingClientRect()
            const cardCenter = r.left + r.width / 2
            const dist = Math.abs(center - cardCenter) / vw
            const scale = Math.max(0.86, 1 - dist * 0.28)
            gsap.set(card, { scale })
          })
        }
        const updater = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: updateScales,
        })
        updateScales()

        // Progress rail + index counter.
        const n = ACTS.length
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (st) => {
            const p = st.progress
            const idx = Math.min(n - 1, Math.floor(p * n))
            const label = `0${idx + 1}`
            if (indexLabelRef.current && indexLabelRef.current.textContent !== label) {
              indexLabelRef.current.textContent = label
            }
            if (indicatorRef.current) {
              indicatorRef.current.style.left = `${p * ((n - 1) / n) * 100}%`
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
      id="journey"
      className="relative bg-cream/40 md:h-[420vh] py-14 md:py-0"
    >
      {/* Subtle ambient wash — keeps the cream canvas alive without
          competing with the cards. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 600px at 18% 15%, rgba(148,84,85,0.05), transparent 60%), radial-gradient(800px 500px at 85% 85%, rgba(238,230,219,0.4), transparent 60%)',
        }}
      />

      {/* Sticky pin on desktop; natural vertical stack on mobile. */}
      <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden flex flex-col relative z-10">
        {/* Section header — minimal centred eyebrow only. Lets the
            cards carry the story. */}
        <div className="hidden md:flex pt-14 lg:pt-16 px-12 z-20 relative justify-center">
          <div className="inline-flex items-center gap-4">
            <span className="w-10 h-px bg-rust/40" />
            <span className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold">
              The Journey &middot; A Story in Six Acts
            </span>
            <span className="w-10 h-px bg-rust/40" />
          </div>
        </div>

        {/* Mobile header */}
        <div className="md:hidden px-6 mb-10 text-center">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-9 h-px bg-rust" />
            <span className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold">
              The Journey
            </span>
            <span className="w-9 h-px bg-rust" />
          </div>
          <h2 className="font-display font-light text-[28px] leading-[1.1] tracking-[-0.025em] text-ink">
            From a single clinic to a{' '}
            <span className="font-bold text-rust italic">national mission.</span>
          </h2>
        </div>

        {/* Horizontal filmstrip stage. Cards are vertically centred in
            the remaining viewport space. */}
        <div className="flex-1 flex md:items-center min-h-0 md:pt-2">
          <div
            ref={stripRef}
            className="md:flex md:items-center md:gap-10 lg:gap-14 md:pl-[12vw] md:pr-[12vw] md:will-change-transform space-y-12 md:space-y-0 w-full md:w-auto px-6 md:px-0"
          >
            {ACTS.map((a, i) => (
              <article
                key={a.year}
                ref={setCardRef(i)}
                className="md:shrink-0 md:w-[70vw] lg:w-[60vw] xl:w-[52vw] will-change-transform"
              >
                <div className="grid md:grid-cols-[1fr_1fr] gap-8 md:gap-12 lg:gap-16 items-center">
                  {/* Hero image plate — minimal overlay (era + year +
                      caption only) on a soft bottom gradient. */}
                  <div className="relative aspect-[4/5] rounded-[18px] overflow-hidden bg-mist shadow-[0_24px_60px_-30px_rgba(27,26,24,0.35)]">
                    <img
                      src={a.img}
                      alt={a.era}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Softer gradient — lighter touch, lower opacity
                        so the image stays the star of the plate. */}
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-[38%] pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(27,26,24,0.55) 0%, rgba(27,26,24,0) 100%)',
                      }}
                    />
                    {/* Overlay text — deliberately thinner / quieter
                        than before. Era is a fine tracked label, year
                        is a light-weight display numeral (was bold),
                        caption sits below a hairline. */}
                    <div className="absolute bottom-6 left-6 right-6 md:bottom-7 md:left-7 md:right-7">
                      <div className="text-[9px] tracking-[0.42em] uppercase text-white/65 font-medium mb-2.5">
                        {a.era}
                      </div>
                      <div
                        className="font-display font-light text-white/95 tabular-nums leading-[0.95] tracking-[-0.025em]"
                        style={{ fontSize: 'clamp(34px, 3.8vw, 54px)' }}
                      >
                        {a.year}
                      </div>
                      <div className="mt-3 flex items-center gap-2.5">
                        <span aria-hidden className="w-4 h-px bg-white/40" />
                        <span
                          className="font-display italic text-white/65 text-[11px] md:text-[12.5px] leading-[1.25] font-light"
                          dangerouslySetInnerHTML={{ __html: a.caption }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text — eyebrow + headline + italic lede + 3
                      highlights + numbered index. Body paragraph
                      removed for breathing room; the lede + bullets
                      together carry the full message. */}
                  <div className="md:py-2">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-7 h-px bg-rust" />
                      <span className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold">
                        {a.era}
                      </span>
                    </div>
                    <h3 className="font-display font-light text-[28px] md:text-[36px] xl:text-[44px] leading-[1.05] tracking-[-0.025em] text-ink mb-4">
                      {a.headline}
                    </h3>
                    <p className="font-display italic text-rust text-[16px] md:text-[19px] xl:text-[21px] leading-[1.4] mb-7 max-w-[440px]">
                      {a.lede}
                    </p>
                    <ul className="space-y-2.5 mb-8 max-w-[400px]">
                      {a.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-3 text-[13px] md:text-[14.5px] text-graphite font-light leading-[1.5]"
                        >
                          <span
                            aria-hidden
                            className="mt-[8px] w-1 h-1 rounded-full bg-rust shrink-0"
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="inline-flex items-baseline gap-2">
                      <span className="font-display font-bold text-rust text-[24px] md:text-[28px] leading-none tabular-nums">
                        0{i + 1}
                      </span>
                      <span className="text-[10px] tracking-[0.32em] uppercase text-rust/60 font-semibold">
                        / 06
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom progress rail — desktop only. Single, calm
            horizontal track with a travelling rust pill and a tiny
            01 / 06 index on the right. */}
        <div className="hidden md:flex absolute bottom-10 left-12 right-12 items-center gap-8 pointer-events-none z-10">
          <div className="flex-1 relative h-px bg-ink/10">
            <div
              ref={indicatorRef}
              className="absolute -top-[5px] h-2.5 w-[16.66%] bg-rust/85 rounded-full transition-[left] duration-100"
              style={{ left: '0%' }}
            />
          </div>
          <div className="flex items-baseline gap-2 text-rust font-semibold font-display tabular-nums">
            <span ref={indexLabelRef} className="text-[22px] leading-none">
              01
            </span>
            <span className="text-[10px] tracking-[0.32em] uppercase opacity-60">
              / 06
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
