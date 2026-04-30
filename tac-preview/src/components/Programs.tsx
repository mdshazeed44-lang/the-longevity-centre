import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

// Source: theantiagingcentre.com — TAC's 5 official programmes (verbatim).
export const PROGRAMS = [
  {
    cat: '01',
    title: 'Longevity Plus Program',
    tag: 'Flagship · 12 mo',
    desc:
      'A 12-month medical longevity protocol — comprehensive blood panels, body composition, DNA-based genetic testing and gut microbiome mapping, with personalised interventions and ongoing follow-ups under one coordinated team.',
    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1400&q=85',
  },
  {
    cat: '02',
    title: 'Metabolic & Diabetes Clinic',
    tag: 'Metabolic Health',
    desc:
      'Dedicated clinic for diabetes, prediabetes, insulin resistance, PCOD, thyroid disorders and fatty liver — using continuous monitoring, advanced blood tests and body composition analysis to reverse metabolic risk.',
    img: '/tac-photos/metabolic-diabetes.webp',
  },
  {
    cat: '03',
    title: 'Gut Correction Program',
    tag: 'Digestive · Microbiome',
    desc:
      'Comprehensive gut health and microbiome testing to uncover causes of bloating, IBS-like symptoms and food sensitivities — followed by targeted nutrition, probiotics and lifestyle interventions.',
    img: '/tac-photos/gut-health.webp',
  },
  {
    cat: '04',
    title: 'Medical Weight Loss & Body Composition',
    tag: 'Weight & Composition',
    desc:
      'Doctor-supervised weight loss using body composition analysis (BCA), metabolic markers and hormonal testing to target fat loss — not just the number on the scale. Ideal for obesity, diabetes and PCOD-related weight gain.',
    img: '/tac-photos/medical-weight-loss.webp',
  },
  {
    cat: '05',
    title: 'Skin & Aesthetics',
    tag: 'Dermatology',
    desc:
      'Dermatologist-led anti-ageing aesthetics rooted in collagen, micronutrient and hormonal health — not just topical fixes. Includes laser hair reduction, hair-loss treatment and skin rejuvenation protocols.',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1400&q=85',
  },
]

export function Programs() {
  const root = useRef<HTMLElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (reduceMotion()) return
    const sectionEl = root.current
    if (!sectionEl) return

    // Heading line reveal
    const headingLines =
      heading.current?.querySelectorAll<HTMLElement>('.line-mask > span')
    let headingTween: gsap.core.Tween | undefined
    if (headingLines?.length) {
      gsap.set(headingLines, { yPercent: 110 })
      headingTween = gsap.to(headingLines, {
        yPercent: 0,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: heading.current, start: 'top 82%' },
      })
    }

    const cleanups: Array<() => void> = []
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]
    const pinTop = window.innerWidth >= 768 ? 110 : 90

    cards.forEach((card, i) => {
      const inner = card.querySelector<HTMLElement>('.card-inner')
      const img = card.querySelector<HTMLElement>('.card-img')
      if (!inner) return

      const next = cards[i + 1]

      // STACKING PIN — each card pins at top while next slides up over it.
      // Larger pin distance + smoother release = less snap, more glide.
      if (next) {
        const pinST = ScrollTrigger.create({
          trigger: card,
          start: `top top+=${pinTop}`,
          endTrigger: next,
          end: `top top+=${pinTop + 60}`,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        })
        cleanups.push(() => pinST.kill())

        // Behind-card depth: glide UP smoothly with longer travel + buttery scrub.
        // We animate the INNER so transform doesn't fight the pin.
        const depthTween = gsap.fromTo(
          inner,
          { scale: 1, opacity: 1, y: 0 },
          {
            scale: 0.94,
            opacity: 0,
            y: -90,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: next,
              // start the exit much earlier so it feels like a deliberate glide
              start: 'top bottom-=80',
              end: `top top+=${pinTop + 20}`,
              // higher scrub = smoother lerp follow on the scroll position
              scrub: 1.4,
            },
          }
        )
        cleanups.push(() => {
          depthTween.scrollTrigger?.kill()
          depthTween.kill()
        })
      }

      // ENTER — gentle slide-up. Longer travel + softer easing = buttery glide.
      const enterTween = gsap.fromTo(
        inner,
        { y: 140, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            once: true,
          },
        }
      )
      cleanups.push(() => {
        enterTween.scrollTrigger?.kill()
        enterTween.kill()
      })


      // Image parallax — gentle, slow drift inside the card
      if (img) {
        const imgTween = gsap.fromTo(
          img,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )
        cleanups.push(() => {
          imgTween.scrollTrigger?.kill()
          imgTween.kill()
        })
      }
    })

    return () => {
      headingTween?.scrollTrigger?.kill()
      headingTween?.kill()
      cleanups.forEach((fn) => fn())
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <section
      id="programs"
      ref={root}
      className="relative bg-cream/40 py-20 md:py-28 px-6 md:px-12 overflow-hidden"
    >
      {/* ambient backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            'radial-gradient(900px 600px at 80% 0%, rgba(167,75,42,0.05), transparent 60%), radial-gradient(700px 500px at 0% 80%, rgba(54,73,68,0.04), transparent 60%)',
        }}
      />

      {/* Header */}
      <div className="relative max-w-[1280px] mx-auto mb-20 md:mb-28">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-end">
          <div>
            <div className="flex items-center gap-3 mb-7">
              <span className="w-8 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                Our Programmes
              </span>
            </div>
            <h2
              ref={heading}
              className="font-display font-bold text-[36px] md:text-[64px] leading-[1.0] tracking-[-0.03em] text-ink"
            >
              <span className="line-mask">
                <span>Five flagship programmes.</span>
              </span>
              <br />
              <span className="line-mask">
                <span>One coordinated plan.</span>
              </span>
            </h2>
          </div>
          <p className="text-[15px] md:text-[17px] leading-[1.7] text-graphite md:pb-4 max-w-[440px] font-light">
            Each programme is led by a dedicated specialist, but all run inside
            one shared medical record — so nothing is treated in isolation.
          </p>
        </div>
      </div>

      {/* Stacking deck */}
      <div className="relative max-w-[1240px] mx-auto">
        {PROGRAMS.map((p, i) => (
          <div
            key={p.title}
            id={`program-${i}`}
            ref={(el) => {
              cardsRef.current[i] = el
            }}
            className="program-card relative mb-[18vh] md:mb-[26vh] last:mb-0"
            style={{
              transformOrigin: 'center top',
              willChange: 'transform, opacity',
            }}
          >
            <div
              className="card-inner relative bg-white rounded-[28px] md:rounded-[36px] border border-mist/70 overflow-hidden"
              style={{
                boxShadow:
                  '0 1px 0 rgba(255,255,255,0.7) inset, 0 40px 80px -50px rgba(27,26,24,0.22), 0 12px 30px -20px rgba(27,26,24,0.10)',
                willChange: 'transform, opacity',
              }}
            >
              <div className="grid md:grid-cols-[1.05fr_1fr] min-h-[480px] md:min-h-[560px]">
                {/* Content */}
                <div className="relative px-9 py-12 md:px-14 md:py-16 lg:px-16 lg:py-20 flex flex-col justify-between">
                  {/* top row — number + tag */}
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <span className="font-display text-[20px] md:text-[22px] text-rust font-semibold tabular-nums tracking-tight">
                        {p.cat}
                      </span>
                      <span className="h-px w-10 bg-rust/40" />
                      <span className="text-[10.5px] tracking-[0.3em] uppercase text-stone font-medium">
                        {p.tag}
                      </span>
                    </div>
                    <span className="text-[10.5px] tracking-[0.28em] uppercase text-stone/70 hidden md:inline">
                      {String(i + 1).padStart(2, '0')} / {String(PROGRAMS.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="mt-12 md:mt-0">
                    <h3 className="font-display font-bold text-[34px] md:text-[48px] lg:text-[58px] leading-[1.02] tracking-[-0.03em] text-ink mb-7">
                      {p.title}
                    </h3>
                    <p className="text-[15px] md:text-[17px] leading-[1.7] text-graphite max-w-[480px] mb-12 font-light">
                      {p.desc}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <a
                        href="#cta"
                        data-cursor="hover"
                        data-magnetic
                        className="group inline-flex items-center gap-3 pl-5 pr-7 py-4 bg-ink text-white text-[11.5px] tracking-[0.2em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
                      >
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
                        </span>
                        Arrange a Consultation
                        <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
                      </a>
                      <a
                        href="#"
                        data-cursor="hover"
                        className="inline-flex items-center gap-2 px-7 py-4 border border-ink/15 text-ink text-[11.5px] tracking-[0.2em] font-semibold uppercase rounded-full hover:border-ink hover:bg-ink hover:text-white transition-colors duration-500"
                      >
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>

                {/* Image — taller frame, soft inner radius, parallax */}
                <div className="relative overflow-hidden bg-mist min-h-[300px] md:min-h-full md:m-3 md:rounded-[24px]">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="card-img absolute inset-0 w-full h-[112%] -top-[6%] object-cover"
                  />
                  {/* soft top-left vignette to anchor against text */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.0) 50%, rgba(27,26,24,0.18) 100%)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
