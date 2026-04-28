import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    n: '01',
    title: 'Assessment & Analysis',
    desc: 'Comprehensive blood panels, body composition, genetic and microbiome testing.',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=85',
  },
  {
    n: '02',
    title: 'Personalised Intervention',
    desc: 'Targeted protocols built around your specific metabolic and longevity profile.',
    img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=85',
  },
  {
    n: '03',
    title: '9-Month Recalibration',
    desc: 'Repeat diagnostics. Adjust the protocol. Track real change.',
    img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=85',
  },
  {
    n: '04',
    title: '12-Month Nourishment',
    desc: 'Ongoing consultations and supplement optimisation.',
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=85',
  },
  {
    n: '05',
    title: 'A Reformed Life',
    desc: 'Measurably younger. Measurably better.',
    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=85',
  },
]

export function Method() {
  const root = useRef<HTMLElement>(null)
  const grid = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    const cards = grid.current?.querySelectorAll<HTMLElement>('.step-card')
    if (!cards) return
    gsap.set(cards, { opacity: 0, y: 40 })
    const tween = gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'expo.out',
      stagger: 0.1,
      scrollTrigger: { trigger: grid.current, start: 'top 80%' },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section
      id="method"
      ref={root}
      className="bg-cream/40 py-24 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-[1320px] mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-16 mb-16 md:mb-20 items-start">
          <div>
            <div className="text-[11px] tracking-[0.3em] text-stone uppercase font-medium mb-6">
              The TLC Method
            </div>
            <h2 className="font-display font-bold text-[36px] md:text-[56px] leading-[1.05] tracking-[-0.025em] text-ink">
              How we extend
              <br />
              healthy years.
            </h2>
          </div>
          <p className="text-[15px] md:text-[16px] leading-[1.7] text-graphite md:pt-3 max-w-[440px]">
            A five-step protocol that maps your biology, intervenes precisely,
            and verifies progress with repeat diagnostics.
          </p>
        </div>

        {/* Steps grid */}
        <div
          ref={grid}
          className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-6"
        >
          {STEPS.map((s) => (
            <article key={s.n} className="step-card group">
              <div className="relative aspect-[3/4] overflow-hidden bg-mist mb-5">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                <span className="absolute top-4 left-4 text-[10px] tracking-[0.3em] font-semibold uppercase text-white/95 tabular-nums bg-black/30 backdrop-blur-sm px-2.5 py-1">
                  Phase {s.n}
                </span>
              </div>
              <h3 className="font-display font-bold text-[18px] md:text-[20px] leading-[1.2] tracking-[-0.01em] text-ink mb-3">
                {s.title}
              </h3>
              <p className="text-[13px] md:text-[14px] text-graphite leading-[1.6]">
                {s.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
