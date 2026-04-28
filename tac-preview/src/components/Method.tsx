import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    n: '01',
    title: 'Assessment & Analysis',
    desc: 'Comprehensive blood panels, body composition, genetic and microbiome testing.',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80',
  },
  {
    n: '02',
    title: 'Personalised Intervention',
    desc: 'Targeted protocols built around your specific metabolic and longevity profile.',
    img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=80',
  },
  {
    n: '03',
    title: '9-Month Recalibration',
    desc: 'Repeat diagnostics. Adjust the protocol. Track real change.',
    img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80',
  },
  {
    n: '04',
    title: '12-Month Nourishment',
    desc: 'Ongoing consultations and supplement optimisation.',
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=80',
  },
  {
    n: '05',
    title: 'A Reformed Life',
    desc: 'Measurably younger. Measurably better.',
    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80',
  },
]

// Odometer-style digit roller (single digit column).
function Digit({ value }: { value: number }) {
  return (
    <span className="odo">
      <span
        className="odo-col"
        style={{ transform: `translateY(-${value * 1}em)` }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i}>{i}</span>
        ))}
      </span>
    </span>
  )
}

function OdometerNumber({ n }: { n: string }) {
  // n like "01", "02"... we render two digits
  const a = Number(n[0])
  const b = Number(n[1])
  return (
    <span className="font-display font-bold text-[110px] md:text-[200px] leading-[0.85] text-rust tabular-nums shrink-0 inline-flex">
      <Digit value={a} />
      <Digit value={b} />
    </span>
  )
}

export function Method() {
  const root = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const path = useRef<SVGPathElement>(null)
  const [active, setActive] = useState(0)
  const prev = useRef(0)

  useEffect(() => {
    if (reduceMotion()) return
    const el = root.current
    if (!el) return

    const lines =
      headingRef.current?.querySelectorAll<HTMLElement>('.line-mask > span')
    let headingTween: gsap.core.Tween | undefined
    if (lines?.length) {
      gsap.set(lines, { yPercent: 110 })
      headingTween = gsap.to(lines, {
        yPercent: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
      })
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: `+=${STEPS.length * 90}%`,
      pin: true,
      scrub: 0.4,
      onUpdate: (self) => {
        const idx = Math.min(
          STEPS.length - 1,
          Math.floor(self.progress * STEPS.length)
        )
        if (idx !== prev.current) {
          prev.current = idx
          setActive(idx)
        }
        if (path.current) {
          const totalLen = path.current.getTotalLength()
          path.current.style.strokeDasharray = `${totalLen}`
          path.current.style.strokeDashoffset = `${totalLen * (1 - self.progress)}`
        }
      },
    })

    return () => {
      st.kill()
      headingTween?.scrollTrigger?.kill()
      headingTween?.kill()
    }
  }, [])

  return (
    <section
      id="method"
      ref={root}
      className="bg-white min-h-screen px-6 md:px-12 py-20 flex flex-col"
    >
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="text-[11px] tracking-[0.25em] text-rust font-semibold uppercase mb-5">
              The TLC Method
            </div>
            <h2
              ref={headingRef}
              className="font-display font-bold text-[36px] md:text-[60px] leading-[1.05] tracking-[-0.025em] text-ink"
            >
              <span className="line-mask">
                <span>How we extend</span>
              </span>{' '}
              <span className="line-mask">
                <span className="font-script text-rust text-[1.4em] leading-[0.8]">
                  healthy
                </span>
              </span>{' '}
              <span className="line-mask">
                <span>years.</span>
              </span>
            </h2>
          </div>
          <div className="text-[12px] tracking-[0.2em] text-stone uppercase font-medium flex items-baseline gap-3">
            <span className="text-rust font-display text-[28px] tabular-nums">
              {String(active + 1).padStart(2, '0')}
            </span>
            <span className="text-mist">/</span>
            <span>{String(STEPS.length).padStart(2, '0')}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* LEFT */}
          <div className="relative">
            <div className="flex items-start gap-6 md:gap-10">
              <OdometerNumber n={STEPS[active].n} />

              <div className="relative h-[300px] md:h-[420px] flex-1 overflow-hidden">
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
                  style={{ transform: `translateY(-${active * 84}px)` }}
                >
                  {STEPS.map((s, i) => (
                    <div
                      key={s.n}
                      className={`h-[84px] flex flex-col justify-center transition-opacity duration-500 ${
                        i === active ? 'opacity-100' : 'opacity-15'
                      }`}
                    >
                      <h3 className="font-display text-[22px] md:text-[34px] text-ink leading-[1.15] tracking-[-0.02em]">
                        {s.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-2 md:mt-4 max-w-[480px] relative h-[100px] overflow-hidden">
              {STEPS.map((s, i) => (
                <p
                  key={s.n}
                  className="absolute inset-0 text-[15px] md:text-[17px] text-graphite leading-[1.6] transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
                  style={{
                    transform:
                      i === active
                        ? 'translateY(0)'
                        : i < active
                        ? 'translateY(-30px)'
                        : 'translateY(30px)',
                    opacity: i === active ? 1 : 0,
                  }}
                >
                  {s.desc}
                </p>
              ))}
            </div>

            {/* SVG draw path connecting steps */}
            <svg
              className="absolute -left-4 top-[120px] hidden md:block pointer-events-none"
              width="60"
              height="320"
              viewBox="0 0 60 320"
              fill="none"
            >
              <path
                ref={path}
                d="M30 0 C 50 60, 10 110, 30 160 S 50 260, 30 320"
                stroke="#945455"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* RIGHT — image clip-path wipe */}
          <div className="relative aspect-[4/5] md:aspect-[5/6] overflow-hidden bg-nougat">
            {STEPS.map((s, i) => {
              const state =
                i === active ? 'is-active' : i < active ? 'is-leaving' : 'is-entering'
              return (
                <div
                  key={s.n}
                  className={`absolute inset-0 method-img ${state}`}
                  style={{ zIndex: i === active ? 2 : 1 }}
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover"
                    style={{
                      transform: i === active ? 'scale(1.05)' : 'scale(1.0)',
                      transition: 'transform 1.6s cubic-bezier(0.22,1,0.36,1)',
                    }}
                  />
                </div>
              )
            })}

            <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2">
              <span className="text-[10px] tracking-[0.25em] text-rust font-semibold uppercase">
                Phase {STEPS[active].n}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 z-10">
              <div
                className="h-full bg-rust transition-all duration-700 ease-out"
                style={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-5 gap-3 md:gap-4">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex flex-col gap-2">
              <div
                className={`transition-all duration-500 ${
                  i <= active ? 'bg-rust' : 'bg-mist'
                }`}
                style={{ height: i === active ? 2 : 1 }}
              />
              <div
                className={`text-[11px] tracking-[0.2em] font-semibold uppercase transition-colors duration-500 ${
                  i === active ? 'text-rust' : 'text-stone'
                }`}
              >
                {s.n}
              </div>
              <div
                className={`text-[11px] leading-[1.4] transition-colors duration-500 hidden md:block ${
                  i === active ? 'text-ink' : 'text-stone/70'
                }`}
              >
                {s.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
