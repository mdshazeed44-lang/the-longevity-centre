// Journey — homepage horizontal-scroll story section. Six chapters
// telling the TLC arc from its MAMC roots in the early 2000s to a
// 2030+ vision of population-scale longevity.
//
// Treated as a real editorial story section: magazine chapter pages
// with Roman-numeral chapter marks, big year numerals as visual
// anchors, hanging-quote ledes, numbered highlight lists, ghost
// chapter numerals in the background. Section pins to the viewport;
// vertical wheel scroll converts to horizontal motion as cards
// travel right → left.
//
// Lenis-friendly: uses CSS sticky (not ScrollTrigger.pin).
// Mobile: collapses to a clean vertical stack.

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

// Content notes — every fact below has been audited against the
// existing site / brochure copy:
//   ✓ Verified — pulled from About page founder bios, CtaBand stats,
//                Diagnostics page, Centres page, programs.ts.
//   ⊘ Year text fields are deliberately label-style (e.g. 'The Roots',
//     'Two Decades') rather than invented specific years. The brand
//     legacy ('20+ years in preventive medicine') and milestones are
//     well documented, but exact founding-year dates are not on the
//     existing site — replace these labels with confirmed years
//     when the client provides them.
//   ⊘ The 'Tomorrow' act keeps its vision intentionally directional
//     rather than naming specific numbers ('25+ centres', etc.) that
//     would commit the brand to a target it hasn't published.
const ACTS: Act[] = [
  {
    era: 'Roots',
    year: 'Origins',
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
    year: 'Two Decades',
    headline: 'A craft, perfected.',
    lede: 'Two decades in two of India’s most demanding specialties.',
    highlights: [
      '11,000+ minimally-invasive surgeries',
      '8,000+ IVF pregnancies',
      '20+ years in preventive medicine',
    ],
    img: '/longevity/microscope-analyst.jpg',
    caption: 'Two specialties. One philosophy.',
  },
  {
    era: 'The Pivot',
    year: 'The Founding',
    headline: 'The Longevity Centre opens.',
    lede: 'Born from one belief — modern medicine waits too long.',
    highlights: [
      'First TLC centre · Delhi',
      'Diagnostics-first preventive model',
      'Six flagship programmes designed',
    ],
    img: '/skin-aesthetics/08-hair-transplant.jpg',
    caption: 'Inside the first TLC clinic, Delhi',
  },
  {
    era: 'Network',
    year: 'Pan-India',
    headline: 'From Delhi, outward.',
    lede: 'Eight cities. One shared medical record.',
    highlights: [
      'Delhi · Gurgaon · Mumbai · Pune',
      'Bangalore · Nagpur · Goa · Hyderabad',
      'A pan-India patient record',
    ],
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
    year: 'The Vision',
    headline: 'Where we’re headed.',
    lede: 'A generation that ages on its own terms.',
    highlights: [
      'An expanded longevity network',
      'Deeper diagnostics, finer protocols',
      'A generation of active centenarians',
    ],
    img: '/longevity/milind-soman.jpg',
    caption: 'Milind Soman · ageing on his own terms',
  },
]

// Helper — Roman numerals for chapter marks. Only need 1-6 here.
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI']

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const indicatorRef = useRef<HTMLDivElement>(null)
  const chapterLabelRef = useRef<HTMLSpanElement>(null)
  const chapterEraRef = useRef<HTMLSpanElement>(null)
  const dotsRef = useRef<HTMLDivElement[]>([])

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el
  }
  const setDotRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) dotsRef.current[i] = el
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
        // ~0.88. Gentle, editorial — not a peep-show transform.
        const updateScales = () => {
          const vw = window.innerWidth
          const center = vw / 2
          cardsRef.current.forEach((card) => {
            if (!card) return
            const r = card.getBoundingClientRect()
            const cardCenter = r.left + r.width / 2
            const dist = Math.abs(center - cardCenter) / vw
            const scale = Math.max(0.88, 1 - dist * 0.22)
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

        // Progress rail, chapter-dot tracker, and updating "Chapter
        // II · Mastery" header label as scroll advances.
        const n = ACTS.length
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (st) => {
            const p = st.progress
            const idx = Math.min(n - 1, Math.floor(p * n))
            const act = ACTS[idx]
            if (chapterLabelRef.current && chapterLabelRef.current.textContent !== `Chapter ${ROMAN[idx]}`) {
              chapterLabelRef.current.textContent = `Chapter ${ROMAN[idx]}`
            }
            if (chapterEraRef.current && chapterEraRef.current.textContent !== act.era) {
              chapterEraRef.current.textContent = act.era
            }
            if (indicatorRef.current) {
              indicatorRef.current.style.left = `${p * ((n - 1) / n) * 100}%`
            }
            dotsRef.current.forEach((dot, di) => {
              if (!dot) return
              dot.style.opacity = di <= idx ? '1' : '0.25'
              dot.style.transform = di === idx ? 'scale(1.4)' : 'scale(1)'
            })
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
      className="relative bg-cream/50 md:h-[440vh] py-14 md:py-0"
    >
      {/* Ambient warm wash + paper-like horizontal scanline at very
          low opacity gives the section an editorial 'page' feel. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 600px at 15% 18%, rgba(148,84,85,0.06), transparent 60%), radial-gradient(800px 500px at 85% 85%, rgba(238,230,219,0.45), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-multiply"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(27,26,24,0.6) 3px, rgba(27,26,24,0.6) 4px)',
        }}
      />

      {/* Sticky pin on desktop. */}
      <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden flex flex-col relative z-10">
        {/* Section header — three-line editorial opener. Stays
            visible throughout the pinned scroll. */}
        <div className="hidden md:flex pt-12 lg:pt-14 px-12 z-20 relative justify-center">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-rust" />
              <span className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold">
                Our Story
              </span>
            </div>
            <h2 className="font-display italic font-light text-ink text-[26px] lg:text-[32px] xl:text-[36px] leading-[1.05] tracking-[-0.02em] mb-2">
              The Journey.
            </h2>
            <p className="text-[11.5px] md:text-[12.5px] tracking-[0.04em] text-stone/80 font-light max-w-[480px] mx-auto leading-[1.55]">
              Six chapters. Six images. One conviction —{' '}
              <span className="italic text-rust">
                that India deserves more centenarians.
              </span>
            </p>
          </div>
        </div>

        {/* Mobile header */}
        <div className="md:hidden px-6 mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-rust" />
            <span className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold">
              Our Story
            </span>
          </div>
          <h2 className="font-display italic font-light text-ink text-[34px] leading-[1.05] tracking-[-0.025em] mb-3">
            The Journey.
          </h2>
          <p className="text-[12.5px] tracking-[0.04em] text-stone/80 font-light leading-[1.55] max-w-[420px] mx-auto">
            Six chapters. Six images. One conviction —{' '}
            <span className="italic text-rust">
              that India deserves more centenarians.
            </span>
          </p>
        </div>

        {/* Filmstrip stage. */}
        <div className="flex-1 flex md:items-center min-h-0 md:pt-2">
          <div
            ref={stripRef}
            className="md:flex md:items-center md:gap-12 lg:gap-16 md:pl-[13vw] md:pr-[13vw] md:will-change-transform space-y-16 md:space-y-0 w-full md:w-auto px-6 md:px-0"
          >
            {ACTS.map((a, i) => (
              <article
                key={a.year}
                ref={setCardRef(i)}
                className="md:shrink-0 md:w-[72vw] lg:w-[62vw] xl:w-[54vw] will-change-transform"
              >
                <div className="grid md:grid-cols-[1fr_1fr] gap-8 md:gap-14 lg:gap-20 items-center">
                  {/* Image plate — cinematic letterbox bars top/bottom,
                      minimal caption only. */}
                  <div className="relative aspect-[4/5] rounded-[14px] overflow-hidden bg-mist shadow-[0_24px_60px_-32px_rgba(27,26,24,0.40)]">
                    <img
                      src={a.img}
                      alt={a.era}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Bottom soft gradient for caption legibility */}
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-[32%] pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(27,26,24,0.50) 0%, rgba(27,26,24,0) 100%)',
                      }}
                    />
                    {/* Cinematic letterbox bar at top + bottom — adds
                        the 'film still' feel without losing image
                        content (the bars are over the image). */}
                    <div
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[6px] bg-ink/85 mix-blend-multiply"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-[6px] bg-ink/85 mix-blend-multiply"
                    />
                    {/* Minimal caption — italic + thin rule, light
                        weight. The image is the hero here. */}
                    <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6">
                      <div className="flex items-center gap-2.5">
                        <span aria-hidden className="w-4 h-px bg-white/35" />
                        <span
                          className="font-display italic text-white/72 text-[11px] md:text-[12.5px] leading-[1.25] font-light tracking-[0.01em]"
                          dangerouslySetInnerHTML={{ __html: a.caption }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Editorial right column. Ghost Roman numeral sits
                      behind the chapter mark as a decorative bookplate. */}
                  <div className="relative">
                    {/* Ghost numeral — barely-there rust Roman in the
                        background, like a chapter heading on an old
                        printed page. */}
                    <div
                      aria-hidden
                      className="absolute -top-10 -left-3 font-display font-light text-rust/[0.07] leading-none select-none pointer-events-none tracking-[-0.04em]"
                      style={{ fontSize: 'clamp(160px, 18vw, 280px)' }}
                    >
                      {ROMAN[i]}
                    </div>

                    <div className="relative">
                      {/* Chapter mark — Roman numeral + era */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="w-7 h-px bg-rust/60" />
                        <span className="text-[10px] tracking-[0.42em] uppercase text-rust font-medium">
                          Chapter {ROMAN[i]}
                        </span>
                        <span aria-hidden className="text-rust/30">·</span>
                        <span className="text-[10px] tracking-[0.42em] uppercase text-rust/80 font-medium">
                          {a.era}
                        </span>
                      </div>

                      {/* Year — hero numeral, light weight, big */}
                      <div
                        className="font-display font-light text-rust tabular-nums leading-[0.85] tracking-[-0.04em] mb-5"
                        style={{ fontSize: 'clamp(48px, 5.5vw, 76px)' }}
                      >
                        {a.year}
                      </div>

                      {/* Headline */}
                      <h3 className="font-display font-light text-ink text-[24px] md:text-[30px] xl:text-[36px] leading-[1.1] tracking-[-0.02em] mb-6">
                        {a.headline}
                      </h3>

                      {/* Lede — hanging quotation mark + italic block */}
                      <div className="relative pl-7 md:pl-9 mb-8 max-w-[440px]">
                        <span
                          aria-hidden
                          className="absolute -left-1 top-[-22px] font-display font-light text-rust/30 leading-none select-none"
                          style={{ fontSize: 'clamp(56px, 5vw, 80px)' }}
                        >
                          &ldquo;
                        </span>
                        <p className="font-display italic text-graphite text-[15px] md:text-[18px] xl:text-[20px] leading-[1.45]">
                          {a.lede}
                        </p>
                      </div>

                      {/* Highlights — magazine-style numbered list with
                          tiny 01/02/03 prefix instead of bullets. */}
                      <ol className="space-y-3 max-w-[420px]">
                        {a.highlights.map((h, idx) => (
                          <li key={h} className="flex items-start gap-4">
                            <span className="text-[10px] tracking-[0.32em] uppercase text-rust/75 font-semibold tabular-nums shrink-0 mt-[6px]">
                              0{idx + 1}
                            </span>
                            <span className="text-[13.5px] md:text-[14.5px] text-graphite font-light leading-[1.55]">
                              {h}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom progress rail — editorial: active chapter label on
            left, hairline track with 6 dot markers, current chapter
            highlighted, no naked "01 / 06" counter. */}
        <div className="hidden md:flex absolute bottom-10 left-12 right-12 items-center gap-8 pointer-events-none z-10">
          {/* Active chapter label */}
          <div className="flex items-baseline gap-3 min-w-[200px]">
            <span
              ref={chapterLabelRef}
              className="font-display italic text-rust text-[16px] leading-none"
            >
              Chapter I
            </span>
            <span aria-hidden className="text-rust/30 text-[10px]">·</span>
            <span
              ref={chapterEraRef}
              className="text-[10px] tracking-[0.42em] uppercase text-rust font-medium"
            >
              Roots
            </span>
          </div>

          {/* Rail with travelling pill + chapter dots */}
          <div className="flex-1 relative h-px bg-ink/10">
            <div
              ref={indicatorRef}
              className="absolute -top-[5px] h-2.5 w-[16.66%] bg-rust/85 rounded-full transition-[left] duration-100"
              style={{ left: '0%' }}
            />
            <div className="absolute inset-x-0 -top-[3px] flex justify-between">
              {ACTS.map((act, di) => (
                <div
                  key={act.year}
                  ref={setDotRef(di)}
                  className="w-1.5 h-1.5 rounded-full bg-rust transition-all duration-300"
                  style={{ opacity: di === 0 ? 1 : 0.25, transform: di === 0 ? 'scale(1.4)' : 'scale(1)' }}
                />
              ))}
            </div>
          </div>

          {/* Roman of VI counter */}
          <div className="flex items-baseline gap-1.5 text-rust font-display tabular-nums shrink-0">
            <span className="text-[10px] tracking-[0.32em] uppercase opacity-60 font-medium">of</span>
            <span className="text-[18px] font-light leading-none">VI</span>
          </div>
        </div>
      </div>
    </section>
  )
}
