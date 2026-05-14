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

// Content notes — every fact below has been audited against:
//   1. The existing TLC brand site (programs.ts, centres.ts, CtaBand,
//      About founder bios, Diagnostics page)
//   2. The existing TAC brand site (theantiagingcentre.com — landing,
//      about, contact), which confirmed:
//         - 50,000+ lives reformed (landing-page stat)
//         - TAC currently undergoing the rebrand to TLC (public note)
//         - TAC physical clinic signage in Gurugram (the image used
//           in the third act, /clinic-photos/gurugram-exterior.jpg)
//
//   ⊘ Year text fields stay label-style ('Origins', 'Two Decades',
//     etc.) for acts where no specific year is published on either
//     brand site. Replace with confirmed dates when the client
//     provides them.
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
      '50,000+ lives reformed by the team',
    ],
    img: '/longevity/microscope-analyst.jpg',
    caption: 'Two specialties. One philosophy.',
  },
  {
    era: 'The Anti-Aging Centre',
    year: 'TAC Opens',
    headline: 'India’s first dedicated anti-aging clinic.',
    lede: 'Born from one belief — modern medicine waits too long.',
    highlights: [
      'TAC opens · Delhi NCR',
      'Diagnostics-first preventive model',
      '20+ years of preventive-medicine practice',
    ],
    img: '/clinic-photos/delhi-bangalore-clinic.jpg',
    caption: 'TAC reception · Delhi flagship',
  },
  {
    era: 'Network',
    year: 'Pan-India',
    headline: 'From Delhi, outward.',
    lede: 'Eight cities. One shared medical record.',
    highlights: [
      'Delhi · Gurgaon · Mumbai · Pune',
      'Bangalore · Nagpur · Goa · Hyderabad',
      'Seven open · Hyderabad opening 2026',
    ],
    img: '/clinic-photos/gurgaon-centre.webp',
    caption: 'TLC Gurgaon · the network expands',
  },
  {
    era: 'The Longevity Centre',
    year: '2026',
    headline: 'A new brand. A deeper science.',
    lede: 'The Anti-Aging Centre becomes The Longevity Centre.',
    highlights: [
      '1000+ biomarkers · 3 biological-age clocks',
      '6 flagship programmes · 9 diagnostic services',
      'European laboratory partnership · Netherlands',
    ],
    img: '/skin-aesthetics/08-hair-transplant.jpg',
    caption: 'Inside TLC · the next chapter',
  },
  {
    era: 'Tomorrow',
    year: 'The Vision',
    headline: 'Where we’re headed.',
    lede: 'A generation that ages on its own terms.',
    highlights: [
      'A deeper national longevity network',
      'AI-augmented personalised protocols',
      'A generation of active centenarians',
    ],
    img: '/longevity/milind-soman.jpg',
    caption: 'Milind Soman · ageing on his own terms',
  },
]

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const indicatorRef = useRef<HTMLDivElement>(null)
  const eraLabelRef = useRef<HTMLSpanElement>(null)
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

        // Progress rail + dot tracker + active-era label update.
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
            if (eraLabelRef.current && eraLabelRef.current.textContent !== act.era) {
              eraLabelRef.current.textContent = act.era
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
      className="relative bg-cream/50 md:h-[380vh] py-14 md:py-0"
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
        {/* Section header — compact centred opener. */}
        <div className="hidden md:flex pt-10 lg:pt-12 px-12 z-20 relative justify-center">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-2.5">
              <span className="w-1 h-1 rounded-full bg-rust" />
              <span className="text-[9.5px] tracking-[0.42em] uppercase text-rust font-medium">
                Our Story
              </span>
            </div>
            <h2 className="font-display italic font-light text-ink text-[20px] lg:text-[24px] xl:text-[26px] leading-[1.1] tracking-[-0.015em] mb-1.5">
              The Journey.
            </h2>
            <p className="text-[10.5px] md:text-[11.5px] tracking-[0.04em] text-stone/70 font-light max-w-[440px] mx-auto leading-[1.55]">
              Six chapters. One conviction —{' '}
              <span className="italic text-rust/85">
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
            className="md:flex md:items-center md:gap-10 lg:gap-14 md:pl-[15vw] md:pr-[15vw] md:will-change-transform space-y-16 md:space-y-0 w-full md:w-auto px-6 md:px-0"
          >
            {ACTS.map((a, i) => (
              <article
                key={a.year}
                ref={setCardRef(i)}
                className="md:shrink-0 md:w-[60vw] lg:w-[50vw] xl:w-[44vw] will-change-transform"
              >
                <div className="grid md:grid-cols-[1fr_1fr] gap-6 md:gap-10 lg:gap-14 items-center">
                  {/* Image plate — bottom-gradient caption only. */}
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

                  {/* Editorial right column — era marker, year, body.
                      All type held at quiet weights so the section
                      reads as a refined caption page, not a banner. */}
                  <div className="relative">
                    {/* Era marker — hairline rule + small tracked label */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="w-6 h-px bg-rust/55" />
                      <span className="text-[9.5px] tracking-[0.42em] uppercase text-rust font-medium">
                        {a.era}
                      </span>
                    </div>

                    {/* Year — light serif, restrained scale */}
                    <div
                      className="font-display font-light text-rust tabular-nums leading-[0.95] tracking-[-0.025em] mb-4"
                      style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}
                    >
                      {a.year}
                    </div>

                    {/* Headline — thinner, smaller */}
                    <h3 className="font-display font-light text-ink text-[18px] md:text-[22px] xl:text-[26px] leading-[1.2] tracking-[-0.015em] mb-4">
                      {a.headline}
                    </h3>

                    {/* Lede — italic, compact, no oversize hanging quote */}
                    <p className="font-display italic text-graphite/85 text-[13px] md:text-[14.5px] xl:text-[15.5px] leading-[1.5] mb-6 max-w-[400px] pl-3 border-l-2 border-rust/30">
                      {a.lede}
                    </p>

                    {/* Highlights — numbered list, small + thin */}
                    <ol className="space-y-2 max-w-[400px]">
                      {a.highlights.map((h, idx) => (
                        <li key={h} className="flex items-start gap-3">
                          <span className="text-[9px] tracking-[0.3em] uppercase text-rust/65 font-medium tabular-nums shrink-0 mt-[5px]">
                            0{idx + 1}
                          </span>
                          <span className="text-[12px] md:text-[12.5px] text-graphite/85 font-light leading-[1.55]">
                            {h}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom progress rail — active era label on the left, a
            hairline track with six dot markers, current dot
            highlighted. Clean and minimal, no counter clutter. */}
        <div className="hidden md:flex absolute bottom-10 left-12 right-12 items-center gap-8 pointer-events-none z-10">
          {/* Active era label */}
          <div className="min-w-[160px]">
            <span
              ref={eraLabelRef}
              className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-medium"
            >
              Roots
            </span>
          </div>

          {/* Rail with travelling pill + dot markers */}
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
        </div>
      </div>
    </section>
  )
}
