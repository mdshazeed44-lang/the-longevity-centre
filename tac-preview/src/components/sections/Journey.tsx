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
  body: string
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
    body: 'Dr. Bhavna and Dr. Abhinav Sharma meet at Maulana Azad Medical College, Delhi — India’s premier teaching institution. Dr. Bhavna continues her postgraduation there; Dr. Abhinav completes his MS at PGI Chandigarh. The conviction is already clear: prevention will beat treatment, every time.',
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
    body: 'Dr. Abhinav becomes one of India’s most accomplished minimally-invasive surgeons — over 11,000 successful procedures. Dr. Bhavna emerges as a leading IVF specialist, credited with more than 8,000 successful pregnancies. The same conviction underwrites both: precision medicine, delivered with care.',
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
    body: 'The first Longevity Centre opens in Delhi. The model is unlike anything India has seen — a doctor-led clinic built on full-body diagnostics, hormone optimisation, microbiome work and biological-age tracking. The clinic was small. The ambition was not.',
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
    body: 'Centres open in Gurgaon, Pune, Bangalore, Mumbai, Nagpur, Goa and Hyderabad. Thousands of patients are now read at the molecular level for the first time. Programmes mature into six flagship offerings — longevity, metabolism, gut, weight, PCOD and metabolomics.',
    highlights: [
      'Eight centres across India',
      'Six flagship programmes',
      'A pan-India patient record',
    ],
    img: '/longevity/family-three-generations.jpg',
    caption: 'The families we serve',
  },
  {
    era: 'Today',
    year: '2026',
    headline: 'Where we stand.',
    lede: 'A thousand biomarkers. Three biological-age clocks. One promise.',
    body: 'TLC now runs the deepest diagnostic stack in Indian medicine — 1000+ biomarkers per patient, three biological-age clocks (epigenetic, blood, gut) and a partner laboratory in the Netherlands. Patients are measured, not managed.',
    highlights: [
      '1000+ biomarkers per patient',
      '3 age clocks · Epigenetic · Blood · Gut',
      'European laboratory partnership',
    ],
    img: '/longevity/vitality-mature-woman.jpg',
    caption: 'Indian Originals · the patients we measure',
  },
  {
    era: 'Tomorrow',
    year: '2030+',
    headline: 'Where we’re headed.',
    lede: 'A generation that ages on its own terms.',
    body: 'Twenty-five centres across South Asia. AI-personalised longevity protocols built on the region’s largest biological-age dataset. Population-scale prevention. Our mission — turn the longevity gap between India and the world into a longevity lead.',
    highlights: [
      '25+ centres across South Asia',
      'AI-personalised protocols',
      'A generation of active centenarians',
    ],
    img: '/longevity/milind-soman.jpg',
    caption: 'Milind Soman · 58 · what ageing well looks like',
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

        // Vertical scroll → horizontal translation. Scrub ties it
        // directly to the scrollbar so the user feels the conversion.
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

        // Per-card scale — recomputed each scroll tick from live
        // bounding rects so the centred card always sits at scale 1.0
        // while its neighbours sit at ~0.84. Reflows handled for free.
        const updateScales = () => {
          const vw = window.innerWidth
          const center = vw / 2
          cardsRef.current.forEach((card) => {
            if (!card) return
            const r = card.getBoundingClientRect()
            const cardCenter = r.left + r.width / 2
            const dist = Math.abs(center - cardCenter) / vw
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
        updateScales()

        // Progress rail + index counter — six acts, so the rail pill
        // is 1/6 wide and the label cycles 01 → 06.
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
      {/* Sticky pin on desktop; natural vertical stack on mobile.
          NOTE: overflow-hidden lives on the sticky element, NOT on
          this parent — a parent with `overflow: hidden` would break
          position:sticky. */}
      <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden flex flex-col">
        {/* Section header — eyebrow + heading row sits at the top of
            the pinned viewport, visible throughout the horizontal
            scroll so the user always has context. */}
        <div className="hidden md:block px-6 md:px-12 pt-10 md:pt-14 z-20 relative">
          <div className="max-w-[1240px] mx-auto grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-baseline">
            <div className="inline-flex items-center gap-3">
              <span className="w-9 h-px bg-rust" />
              <span className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold">
                The Journey
              </span>
            </div>
            <h2 className="font-display font-light text-[22px] md:text-[28px] xl:text-[34px] leading-[1.1] tracking-[-0.025em] text-ink md:text-right md:justify-self-end max-w-[640px]">
              From a single clinic to a{' '}
              <span className="font-bold text-rust italic">national mission.</span>
            </h2>
          </div>
        </div>

        {/* Mobile-only header — full title, normal flow, no pin. */}
        <div className="md:hidden px-6 mb-10">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-9 h-px bg-rust" />
            <span className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold">
              The Journey
            </span>
          </div>
          <h2 className="font-display font-light text-[30px] leading-[1.05] tracking-[-0.025em] text-ink">
            From a single clinic to a{' '}
            <span className="font-bold text-rust italic">national mission.</span>
          </h2>
        </div>

        {/* Horizontal filmstrip stage. On md+ it's a flex row of fixed-
            width cards; the parent translates it with GSAP. On mobile
            it collapses to a vertical stack. */}
        <div className="flex-1 flex md:items-center min-h-0">
          <div
            ref={stripRef}
            className="md:flex md:items-center md:gap-8 lg:gap-12 md:pl-[10vw] md:pr-[10vw] md:will-change-transform space-y-12 md:space-y-0 w-full md:w-auto px-6 md:px-0"
          >
            {ACTS.map((a, i) => (
              <article
                key={a.year}
                ref={setCardRef(i)}
                className="md:shrink-0 md:w-[68vw] lg:w-[58vw] xl:w-[52vw] will-change-transform"
              >
                <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 md:gap-10 lg:gap-14 items-center">
                  {/* Hero image plate — year + era + italic caption
                      overlaid on a soft bottom gradient. */}
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
                        style={{ fontSize: 'clamp(48px, 5.5vw, 84px)' }}
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

                  {/* Editorial copy — eyebrow + headline + italic lede
                      + body + 3 highlight bullets + numbered index. */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-7 h-px bg-rust" />
                      <span className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold">
                        {a.era}
                      </span>
                    </div>
                    <h3 className="font-display font-light text-[26px] md:text-[36px] xl:text-[42px] leading-[1.05] tracking-[-0.025em] text-ink mb-3">
                      {a.headline}
                    </h3>
                    <p className="font-display italic text-rust text-[15px] md:text-[18px] xl:text-[20px] leading-[1.35] mb-5 max-w-[480px]">
                      {a.lede}
                    </p>
                    <p className="text-[13.5px] md:text-[15px] text-graphite font-light leading-[1.7] mb-6 max-w-[480px]">
                      {a.body}
                    </p>
                    <ul className="space-y-2 mb-6 max-w-[440px]">
                      {a.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2.5 text-[12.5px] md:text-[13.5px] text-ink/85 font-medium"
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
                      <span className="font-display font-bold text-rust text-[26px] md:text-[30px] leading-none tabular-nums">
                        0{i + 1}
                      </span>
                      <span className="text-[10px] tracking-[0.32em] uppercase text-rust/70 font-semibold">
                        / 06
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom progress rail — desktop only, inside the sticky pin. */}
        <div className="hidden md:flex absolute bottom-8 left-12 right-12 items-center gap-6 pointer-events-none z-10">
          <div className="flex-1 relative h-px bg-rust/15">
            <div
              ref={indicatorRef}
              className="absolute -top-[5px] h-2.5 w-[16.66%] bg-rust/85 rounded-full transition-[left] duration-100"
              style={{ left: '0%' }}
            />
          </div>
          <div className="flex items-baseline gap-2 text-rust font-semibold font-display tabular-nums">
            <span ref={indexLabelRef} className="text-[24px] leading-none">
              01
            </span>
            <span className="text-[11px] tracking-[0.32em] uppercase opacity-70">
              / 06
            </span>
          </div>
        </div>

        {/* Top-right scroll cue — only visible while pinned */}
        <div className="hidden md:flex absolute top-14 right-12 items-center gap-3 text-[9.5px] tracking-[0.32em] uppercase text-stone font-semibold pointer-events-none z-10">
          <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-rust animate-pulse" />
          <span>Scroll &rarr; horizontal</span>
        </div>
      </div>
    </section>
  )
}
