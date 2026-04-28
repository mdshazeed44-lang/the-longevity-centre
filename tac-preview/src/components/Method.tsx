import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

// Source: theantiagingcentre.com — "HOW WE IMPROVE LONGEVITY & AGING" 5-step framework.
const STEPS = [
  {
    n: '01',
    title: 'Assessment & Analysis',
    desc:
      'Detailed blood tests, body composition (BCA, BMD), cardiovascular risk (EndoPAT), DNA-based genetic testing and gut microbiome mapping.',
    img: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1600&q=85',
  },
  {
    n: '02',
    title: 'Personalised Intervention',
    desc:
      'Targeted protocols for weight loss, diabetes & PCOD control, gut repair, hormonal balance and skin/hair anti-aging — built around your reports.',
    img: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=1600&q=85',
  },
  {
    n: '03',
    title: '9-Month Recalibration',
    desc:
      'Repeat blood, BCA, BMD and genetic testing at month nine. Continued consultations, supplements and longevity support.',
    img: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=1600&q=85',
  },
  {
    n: '04',
    title: '12-Month Nourishment',
    desc:
      'Anti-aging, nutritionist and dermatologist follow-ups — virtual or in-person — with oral supplement maintenance.',
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&q=85',
  },
  {
    n: '05',
    title: 'A Reformed Life',
    desc:
      'After the 12-month programme our patients lead a reformed life — expanded lifespan, restored vitality and a measurably better quality of life.',
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=85',
  },
]

export function Method() {
  const root = useRef<HTMLElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const progressBar = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduceMotion()) return

    // Heading line reveal
    const lines = heading.current?.querySelectorAll<HTMLElement>('.line-mask > span')
    let headTween: gsap.core.Tween | undefined
    if (lines?.length) {
      gsap.set(lines, { yPercent: 110 })
      headTween = gsap.to(lines, {
        yPercent: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: heading.current, start: 'top 85%' },
      })
    }

    const cleanups: Array<() => void> = []

    // Per-step row reveal
    const rows = stepsRef.current?.querySelectorAll<HTMLElement>('.method-row')
    rows?.forEach((row, i) => {
      gsap.set(row, { y: 40, opacity: 0 })
      const t = gsap.to(row, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'expo.out',
        scrollTrigger: { trigger: row, start: 'top 85%', once: true },
      })
      cleanups.push(() => {
        t.scrollTrigger?.kill()
        t.kill()
      })

      // Active-state observer for the corresponding image swap
      const obsST = ScrollTrigger.create({
        trigger: row,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      })
      cleanups.push(() => obsST.kill())
    })

    // Progress bar — overall section scroll
    if (progressBar.current && stepsRef.current) {
      const pT = gsap.to(progressBar.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 50%',
          end: 'bottom 60%',
          scrub: true,
        },
      })
      cleanups.push(() => {
        pT.scrollTrigger?.kill()
        pT.kill()
      })
    }

    return () => {
      headTween?.scrollTrigger?.kill()
      headTween?.kill()
      cleanups.forEach((fn) => fn())
    }
  }, [])

  return (
    <section
      id="method"
      ref={root}
      className="bg-cream/40 py-16 md:py-24 px-6 md:px-12"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-20 mb-16 md:mb-24 items-end">
          <div>
            <div className="flex items-center gap-3 mb-7">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] uppercase text-rust font-semibold">
                The TAC Method
              </span>
            </div>
            <h2
              ref={heading}
              className="font-display font-bold text-[36px] md:text-[64px] leading-[1.0] tracking-[-0.03em] text-ink"
            >
              <span className="line-mask">
                <span>How we extend</span>
              </span>
              <br />
              <span className="line-mask">
                <span>healthy years.</span>
              </span>
            </h2>
          </div>
          <p className="text-[15px] md:text-[17px] leading-[1.7] text-graphite md:pb-4 max-w-[440px] font-light">
            A five-step protocol that maps your biology, intervenes precisely,
            and verifies progress with repeat diagnostics over twelve months.
          </p>
        </div>

        {/* Two-column layout: steps left, sticky image right */}
        <div className="grid md:grid-cols-[1.05fr_1fr] gap-12 md:gap-20 items-start">
          {/* LEFT — vertical step list with progress line */}
          <div className="relative" ref={stepsRef}>
            {/* Progress line track */}
            <span
              aria-hidden
              className="absolute left-[18px] md:left-[22px] top-2 bottom-2 w-px bg-mist"
            />
            {/* Progress fill (animated) */}
            <span
              aria-hidden
              ref={progressBar}
              className="absolute left-[18px] md:left-[22px] top-2 bottom-2 w-px bg-rust origin-top"
              style={{ transform: 'scaleY(0)' }}
            />

            {STEPS.map((s, i) => {
              const isActive = i === active
              return (
                <div
                  key={s.n}
                  className="method-row relative pl-12 md:pl-16 pb-16 md:pb-20 last:pb-0"
                >
                  {/* Numbered dot */}
                  <span
                    className={`absolute left-0 top-1 w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center font-display font-semibold text-[11.5px] md:text-[12.5px] tabular-nums tracking-tight transition-all duration-500 ${
                      isActive
                        ? 'bg-ink text-white scale-100'
                        : 'bg-white text-stone border border-mist scale-95'
                    }`}
                  >
                    {s.n}
                  </span>

                  <h3
                    className={`font-display font-bold text-[24px] md:text-[34px] leading-[1.1] tracking-[-0.025em] mb-4 transition-colors duration-500 ${
                      isActive ? 'text-ink' : 'text-ink/60'
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={`text-[14.5px] md:text-[16px] leading-[1.7] font-light max-w-[480px] transition-colors duration-500 ${
                      isActive ? 'text-graphite' : 'text-graphite/55'
                    }`}
                  >
                    {s.desc}
                  </p>

                  {/* Active accent line under step */}
                  <span
                    aria-hidden
                    className={`block h-px bg-rust mt-6 origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    style={{ width: '90px' }}
                  />
                </div>
              )
            })}
          </div>

          {/* RIGHT — sticky image with smooth cross-fade per active step */}
          <div className="hidden md:block sticky top-32">
            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-mist border border-mist/60 shadow-[0_30px_80px_-50px_rgba(27,26,24,0.18)]">
              {STEPS.map((s, i) => (
                <img
                  key={s.n}
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: i === active ? 'scale(1)' : 'scale(1.04)',
                    transition:
                      'opacity 900ms cubic-bezier(0.22,1,0.36,1), transform 1400ms cubic-bezier(0.22,1,0.36,1)',
                  }}
                />
              ))}

              {/* subtle gradient at bottom for caption legibility */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 60%, rgba(27,26,24,0.55) 100%)',
                }}
              />

              {/* Phase + active title caption */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-[10px] tracking-[0.3em] uppercase text-white/70 font-semibold mb-2">
                  Phase {STEPS[active].n}
                </div>
                <div className="font-display font-bold text-[20px] md:text-[24px] leading-[1.15] tracking-[-0.015em]">
                  {STEPS[active].title}
                </div>
              </div>
            </div>

            {/* Counter strip below image */}
            <div className="mt-6 flex items-center justify-between text-[10.5px] tracking-[0.28em] uppercase text-stone">
              <span>
                <span className="text-ink font-semibold tabular-nums">
                  {String(active + 1).padStart(2, '0')}
                </span>
                <span className="mx-2 text-mist">/</span>
                <span className="tabular-nums">{String(STEPS.length).padStart(2, '0')}</span>
              </span>
              <span>{STEPS[active].title}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
