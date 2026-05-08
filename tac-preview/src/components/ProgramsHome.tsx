// ProgramsHome — TLC's six flagship programmes presented in the
// signature stacking-deck pattern (mirrors src/components/Programs.tsx).
//
// Used on the demo page now; will replace the home Programs section
// once the user approves.
//
// Each card has two CTAs:
//   • Arrange a Consultation -> #contact
//   • Learn More -> /programs/[slug] (detail pages built separately)
//
// Source data: client brief + brochure pricing table.
// "Longevity Plus" is shown as ONE card with two tier prices (Starter
// + Complete) since both are 12-month versions of the same programme
// (this matches the brochure's 6-tab presentation on page 17).

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'
import { PROGRAMS } from '../lib/programs'

gsap.registerPlugin(ScrollTrigger)

// Use shared data from src/lib/programs.ts; map to the shape this card needs.
const TLC_PROGRAMMES = PROGRAMS.map((p) => ({
  slug: p.slug,
  cat: p.cat,
  title: p.shortTitle,
  tag: p.tag,
  desc: p.desc,
  img: p.cardImg,
}))

export function ProgramsHome() {
  const root = useRef<HTMLElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (reduceMotion()) return
    const sectionEl = root.current
    if (!sectionEl) return

    // Heading line reveal
    const headingLines = heading.current?.querySelectorAll<HTMLElement>(
      '.line-mask > span'
    )
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
    const isDesktop = window.innerWidth >= 768
    const pinTop = isDesktop ? 110 : 90

    cards.forEach((card, i) => {
      const inner = card.querySelector<HTMLElement>('.card-inner')
      const img = card.querySelector<HTMLElement>('.card-img')
      if (!inner) return

      const next = cards[i + 1]

      // Stacking pin — desktop only. On mobile the cards are tall (image
      // + content stacked vertically) and pinning produces overlap. We
      // let mobile flow naturally one card under the next.
      if (next && isDesktop) {
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
              start: 'top bottom-=80',
              end: `top top+=${pinTop + 20}`,
              scrub: 1.4,
            },
          }
        )
        cleanups.push(() => {
          depthTween.scrollTrigger?.kill()
          depthTween.kill()
        })
      }

      // Enter — gentle slide-up
      const enterTween = gsap.fromTo(
        inner,
        { y: 140, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        }
      )
      cleanups.push(() => {
        enterTween.scrollTrigger?.kill()
        enterTween.kill()
      })

      // Image parallax
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
      id="programmes"
      ref={root}
      className="relative bg-white py-20 md:py-28 px-6 md:px-12 overflow-hidden"
    >
      {/* Subtle ambient backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            'radial-gradient(900px 600px at 80% 0%, rgba(167,75,42,0.04), transparent 60%), radial-gradient(700px 500px at 0% 80%, rgba(54,73,68,0.03), transparent 60%)',
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
              className="font-display font-light text-[36px] md:text-[56px] xl:text-[68px] leading-[1.0] tracking-[-0.03em] text-ink"
            >
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block">Six programmes.</span>
              </span>{' '}
              <span className="line-mask inline-block overflow-hidden align-bottom">
                <span className="inline-block font-bold text-rust">
                  One foundation.
                </span>
              </span>
            </h2>
          </div>
          <p className="text-[15px] md:text-[17px] leading-[1.7] text-graphite md:pb-4 max-w-[440px] font-light">
            Each programme is led by a dedicated specialist, but all run inside
            one shared medical record — diagnostics-led, physician-guided, and
            continuously refined.
          </p>
        </div>
      </div>

      {/* Stacking deck */}
      <div className="relative max-w-[1240px] mx-auto">
        {TLC_PROGRAMMES.map((p, i) => (
          <div
            key={p.slug}
            id={`programme-${p.slug}`}
            ref={(el) => {
              cardsRef.current[i] = el
            }}
            className="programme-card relative mb-6 md:mb-[26vh] last:mb-0"
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
              <div className="grid md:grid-cols-[1.05fr_1fr] min-h-[400px] md:min-h-[460px]">
                {/* Content */}
                <div className="relative px-8 py-10 md:px-12 md:py-12 lg:px-14 lg:py-14 flex flex-col justify-between">
                  {/* Top row — number + tag + counter */}
                  <div className="flex items-center justify-between gap-4 md:gap-6">
                    <div className="flex items-center gap-3 md:gap-4 min-w-0">
                      <span className="shrink-0 font-display text-[18px] md:text-[20px] text-rust font-semibold tabular-nums tracking-tight whitespace-nowrap">
                        {p.cat}
                      </span>
                      <span aria-hidden className="shrink-0 h-px w-6 md:w-10 bg-rust/40" />
                      <span className="text-[10px] tracking-[0.3em] uppercase text-stone font-medium">
                        {p.tag}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 md:mt-0">
                    <h3 className="font-display font-light text-[28px] md:text-[40px] lg:text-[48px] leading-[1.05] tracking-[-0.025em] text-ink mb-5">
                      {p.title}
                    </h3>
                    <p className="text-[14px] md:text-[15.5px] leading-[1.65] text-graphite max-w-[480px] mb-7 font-light">
                      {p.desc}
                    </p>

                    {/* CTAs */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <a
                        href="#contact"
                        data-cursor="hover"
                        data-magnetic
                        className="group inline-flex items-center gap-2.5 pl-4 pr-6 py-3 bg-ink text-white text-[11px] tracking-[0.2em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
                      >
                        Arrange a Consultation
                        <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                      <a
                        href={`/programs/${p.slug}`}
                        data-cursor="hover"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-ink/15 text-ink text-[11px] tracking-[0.2em] font-semibold uppercase rounded-full hover:border-ink hover:bg-ink hover:text-white transition-colors duration-500"
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
                  {/* Soft top-left vignette to anchor against text */}
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
