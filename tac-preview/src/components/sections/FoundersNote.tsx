// FoundersNote — homepage editorial-letter section from Dr. Bhavna and
// Dr. Abhinav Sharma. Sits between Editorial (science depth) and
// VideoTestimonials (patient voices) as the human "why we built this"
// handoff. Distinct visual treatment from the dark "A Word From Our
// Founders" block on the About page — here we use warm cream, an
// asymmetric portrait + letter layout, and a hand-signed sign-off so
// the homepage version reads as an open letter rather than a manifesto.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export function FoundersNote() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Heading rises into place with a soft mask reveal.
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll('.line-mask > span')
        gsap.from(lines, {
          yPercent: 110,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          },
        })
      }

      // Body paragraphs fade up with a tight stagger.
      if (bodyRef.current) {
        gsap.from(bodyRef.current.querySelectorAll('p'), {
          y: 22,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 78%',
          },
        })
      }

      // Portrait gets a subtle parallax — keeps the letter feeling alive
      // as the reader scrolls past.
      if (portraitRef.current) {
        gsap.to(portraitRef.current.querySelector('img'), {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="founders-note"
      className="relative bg-cream/50 py-20 md:py-28 px-6 md:px-12 overflow-hidden"
    >
      {/* Soft radial wash — warms the cream without competing with
          the portrait. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 600px at 22% 18%, rgba(148,84,85,0.08), transparent 60%), radial-gradient(700px 500px at 88% 90%, rgba(178,122,123,0.06), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[1180px] mx-auto">
        {/* Eyebrow + heading — letter opener */}
        <div className="grid md:grid-cols-[1fr_1.3fr] gap-10 md:gap-16 items-end mb-10 md:mb-14">
          <div>
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                Founders&rsquo; Note
              </span>
            </div>
            <h2
              ref={headingRef}
              className="font-display font-light text-[30px] md:text-[44px] xl:text-[52px] leading-[1.04] tracking-[-0.025em] text-ink"
            >
              <span className="line-mask">
                <span>India deserves more centenarians.</span>
              </span>
              <br />
              <span className="line-mask">
                <span className="font-bold text-rust italic">Active. Independent. Deeply alive.</span>
              </span>
            </h2>
          </div>
          <p className="text-[14px] md:text-[15.5px] leading-[1.75] text-graphite/85 font-light md:max-w-[480px] md:pb-2">
            An open letter from the doctors who built The Longevity Centre — on
            why ancient wisdom and modern medicine belong together, and what
            that means for your family.
          </p>
        </div>

        {/* Letter body — asymmetric grid: portrait left, prose right. */}
        <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-16 items-start">
          {/* Portrait card */}
          <div
            ref={portraitRef}
            className="relative aspect-[3/4] md:aspect-[4/5] rounded-[18px] overflow-hidden bg-cream shadow-[0_28px_60px_-30px_rgba(27,26,24,0.30)]"
          >
            <img
              src="/team/founderboth.jpg"
              alt="Dr. Bhavna Sharma and Dr. Abhinav Sharma, co-founders of The Longevity Centre"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-[110%] object-cover"
              style={{ objectPosition: 'center 30%' }}
            />
            {/* Subtle bottom tint — gives the engraved-style caption
                room to breathe without competing with the portrait. */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(27,26,24,0.55) 0%, rgba(27,26,24,0) 100%)',
              }}
            />
            <div className="absolute inset-x-0 bottom-0 px-6 md:px-7 pb-5 md:pb-6">
              <div className="text-[10.5px] tracking-[0.32em] uppercase text-white/85 font-semibold mb-1.5">
                Founders
              </div>
              <div className="font-display italic text-white text-[16px] md:text-[19px] leading-[1.25]">
                Dr. Bhavna &amp; Dr. Abhinav Sharma
              </div>
            </div>
          </div>

          {/* Letter prose */}
          <div
            ref={bodyRef}
            className="space-y-5 md:space-y-6 text-[15px] md:text-[16.5px] leading-[1.78] text-graphite font-light"
          >
            <p>
              We are <span className="text-ink font-medium">Dr. Bhavna Sharma</span>{' '}
              and <span className="text-ink font-medium">Dr. Abhinav Sharma</span>,
              and we started The Longevity Centre with a simple belief:{' '}
              <span className="text-ink font-medium">
                India deserves more centenarians who are active, independent, and
                deeply alive.
              </span>
            </p>
            <p>
              Our ancestors, our rishi&#8209;munis, and our traditional healing
              systems always spoke about long, purposeful living. Somewhere along
              the way, pollution of our air, water, soil and food — along with
              the stress of modern life — started stealing both our lifespan and
              our health span. We may have air purifiers and water filters today,
              but what most of us really need is a clear bridge back to healthy
              longevity in a modern world.
            </p>
            <p>
              We want a future where grandchildren and great&#8209;grandchildren
              learn directly from their grandparents, where the wisdom that
              comes only with age is valued — just as our Prime Minister, Shri
              Narendra Modi&nbsp;ji, continues to lead the country with
              experience built over decades. We believe our senior citizens
              should be able to contribute, mentor and serve all the way up to
              100 and beyond.
            </p>
            <p className="text-ink font-medium">
              At The Longevity Centre, we combine time&#8209;tested Indian
              practices and cutting&#8209;edge medical science to help you
              protect your body, brain, hormones, metabolism and immunity. Our
              role is to be that bridge between ancient wisdom and modern
              medicine, so you and your family can not only live longer, but{' '}
              <span className="text-rust italic">live better, together.</span>
            </p>

            {/* Sign-off — thin rust rule then italic display names */}
            <div className="pt-6 md:pt-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="w-9 h-px bg-rust/70" />
                <span className="text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold">
                  With warmth
                </span>
              </div>
              <div className="font-display italic text-ink text-[20px] md:text-[26px] leading-[1.25] tracking-[-0.01em]">
                Dr. Bhavna Sharma &amp; Dr. Abhinav Sharma
              </div>
              <div className="text-[11px] tracking-[0.32em] uppercase text-stone font-medium mt-2">
                Founders &middot; The Longevity Centre
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
