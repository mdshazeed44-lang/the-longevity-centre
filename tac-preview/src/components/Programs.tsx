import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export const PROGRAMS = [
  {
    cat: '01',
    title: '360° Optimisation',
    desc: 'A complete medical longevity protocol — biomarkers, hormones, body composition, and biological age — reset over 12 months.',
    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80',
  },
  {
    cat: '02',
    title: 'Weight Loss',
    desc: 'Doctor-supervised, body-composition based fat loss using metabolic testing and personalised nutrition.',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80',
  },
  {
    cat: '03',
    title: 'Hormone Balance',
    desc: 'Restore thyroid, adrenal, sex-hormone, and insulin balance — the foundation of long-term vitality.',
    img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=80',
  },
  {
    cat: '04',
    title: 'Regenerative Medicine',
    desc: 'Peptide therapy, NAD+, and cellular protocols designed to slow biological ageing at the systems level.',
    img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80',
  },
  {
    cat: '05',
    title: 'Heart Health',
    desc: 'Vascular function, EndoPAT, lipid sub-fractionation and cardiac risk stratification.',
    img: 'https://images.unsplash.com/photo-1559757175-7b21671636f0?w=900&q=80',
  },
  {
    cat: '06',
    title: 'Brain Health',
    desc: 'Cognitive performance, mood, sleep architecture, and neuro-protective protocols.',
    img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=80',
  },
  {
    cat: '07',
    title: 'Gut & Microbiome',
    desc: 'Microbiome sequencing, gut-correction protocols, and food-sensitivity mapping.',
    img: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=900&q=80',
  },
  {
    cat: '08',
    title: 'Skin & Aesthetics',
    desc: 'Dermatologist-led anti-ageing aesthetics rooted in collagen, micronutrient and hormonal health.',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
  },
  {
    cat: '09',
    title: 'Sexual Health',
    desc: 'Discreet, evidence-based protocols for libido, function and intimacy across both sexes.',
    img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80',
  },
  {
    cat: '10',
    title: 'Sleep Improvement',
    desc: 'Polysomnography-grade sleep diagnostics, circadian re-alignment and recovery protocols.',
    img: 'https://images.unsplash.com/photo-1520206183501-b80df61043c2?w=900&q=80',
  },
]

export function Programs() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const counter = useRef<HTMLSpanElement>(null)
  const progressBar = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduceMotion()) return
    const sectionEl = root.current
    const trackEl = track.current
    if (!sectionEl || !trackEl) return

    // Heading line reveal on enter
    const headingLines =
      heading.current?.querySelectorAll<HTMLElement>('.line-mask > span')
    let headingTween: gsap.core.Tween | undefined
    if (headingLines?.length) {
      gsap.set(headingLines, { yPercent: 110 })
      headingTween = gsap.to(headingLines, {
        yPercent: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: { trigger: heading.current, start: 'top 80%' },
      })
    }

    const getScrollDistance = () => trackEl.scrollWidth - window.innerWidth

    const tween = gsap.to(trackEl, {
      x: () => -getScrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top top',
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const total = PROGRAMS.length
          const idx = Math.min(total - 1, Math.floor(self.progress * total))
          setActive(idx)
          if (progressBar.current) {
            progressBar.current.style.transform = `scaleX(${self.progress})`
          }
        },
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      headingTween?.scrollTrigger?.kill()
      headingTween?.kill()
    }
  }, [])

  return (
    <section
      id="programs"
      ref={root}
      className="relative bg-cream overflow-hidden h-screen"
    >
      {/* Header strip */}
      <div className="absolute top-0 inset-x-0 z-10 px-6 md:px-12 pt-24 md:pt-28 pb-10 bg-gradient-to-b from-cream via-cream to-cream/0 pointer-events-none">
        <div className="max-w-[1500px] mx-auto flex items-end justify-between gap-8 pointer-events-auto">
          <div className="max-w-[640px]">
            <div className="text-[11px] tracking-[0.25em] text-rust font-semibold uppercase mb-4">
              Our Programs
            </div>
            <h2
              ref={heading}
              className="font-display font-bold text-[34px] md:text-[56px] leading-[1.05] tracking-[-0.025em] text-ink"
            >
              <span className="line-mask">
                <span>Ten medical specialities.</span>
              </span>
              <br />
              <span className="line-mask">
                <span>One coordinated plan.</span>
              </span>
            </h2>
          </div>
          <div className="hidden md:flex items-baseline gap-4 text-[12px] tracking-[0.25em] uppercase text-stone">
            <span ref={counter} className="font-display text-[44px] text-ink leading-none tabular-nums">
              {String(active + 1).padStart(2, '0')}
            </span>
            <span className="text-mist">/</span>
            <span>{String(PROGRAMS.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* Pinned horizontal track */}
      <div className="absolute inset-0 flex items-center pt-44 md:pt-56 pb-24">
        <div
          ref={track}
          className="flex gap-8 md:gap-12 pl-6 md:pl-24 pr-[40vw] will-change-transform"
        >
          {PROGRAMS.map((p, i) => {
            const isActive = i === active
            return (
              <article
                key={p.title}
                className="h-card relative flex-shrink-0 w-[78vw] md:w-[42vw] lg:w-[34vw] aspect-[3/4] bg-white overflow-hidden"
                style={{
                  transform: isActive ? 'scale(1)' : 'scale(0.94)',
                  filter: isActive ? 'none' : 'grayscale(0.3) brightness(0.95)',
                  opacity: isActive ? 1 : 0.55,
                }}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: isActive ? 'scale(1.04)' : 'scale(1)',
                    transition: 'transform 1.2s cubic-bezier(0.22,1,0.36,1)',
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(27,26,24,0.0) 40%, rgba(27,26,24,0.85) 100%)',
                  }}
                />
                <div className="absolute inset-0 p-7 md:p-10 flex flex-col justify-between text-white">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] tracking-[0.25em] font-semibold">
                      {p.cat}
                    </span>
                    <span className="h-px w-10 bg-rust-soft" />
                  </div>
                  <div>
                    <h3 className="font-display text-[26px] md:text-[36px] leading-[1.1] tracking-[-0.02em] mb-3">
                      {p.title}
                    </h3>
                    <p className="text-[14px] md:text-[15px] leading-[1.55] text-white/85 max-w-[440px] mb-6">
                      {p.desc}
                    </p>
                    <a
                      href="#"
                      data-cursor="hover"
                      className="inline-flex items-center gap-3 text-[11px] tracking-[0.25em] font-semibold uppercase text-white border-b border-white/40 pb-1 hover:border-rust-soft transition-colors duration-300"
                    >
                      Manage Treatment
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-12 inset-x-0 px-6 md:px-12 z-10">
        <div className="max-w-[1500px] mx-auto flex items-center gap-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-stone shrink-0">
            Progress
          </span>
          <div className="relative h-px flex-1 bg-mist overflow-hidden">
            <div
              ref={progressBar}
              className="absolute inset-0 bg-rust origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-stone shrink-0">
            {PROGRAMS[active].title}
          </span>
        </div>
      </div>
    </section>
  )
}
