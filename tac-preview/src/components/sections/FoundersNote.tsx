// FoundersNote — homepage open letter from Dr. Bhavna and Dr. Abhinav
// Sharma. Deliberately minimal: clean cream background, restrained
// type scale, portrait left + letter right, signed off in italic.
// Matches the rest of the site's quiet, spacious editorial vibe.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export function FoundersNote() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll('.line-mask > span')
        gsap.from(lines, {
          yPercent: 110,
          duration: 1.0,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: { trigger: headingRef.current, start: 'top 82%' },
        })
      }

      if (bodyRef.current) {
        gsap.from(bodyRef.current.querySelectorAll('[data-reveal]'), {
          y: 18,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: bodyRef.current, start: 'top 80%' },
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="founders-note"
      className="relative bg-cream/50 py-16 md:py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Soft ambient warmth */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 600px at 18% 20%, rgba(148,84,85,0.05), transparent 60%), radial-gradient(800px 520px at 85% 85%, rgba(238,230,219,0.5), transparent 60%)',
        }}
      />
      {/* Editorial hairline framing */}
      <div aria-hidden className="absolute inset-x-6 md:inset-x-12 top-0 h-px bg-ink/8" />
      <div aria-hidden className="absolute inset-x-6 md:inset-x-12 bottom-0 h-px bg-ink/8" />

      <div className="relative z-10 max-w-[1120px] mx-auto">
        {/* Centred header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-5">
            <span className="w-7 h-px bg-rust" />
            <span className="text-[10.5px] md:text-[11px] tracking-[0.42em] text-rust font-semibold uppercase">
              Founders&rsquo; Note
            </span>
            <span className="w-7 h-px bg-rust" />
          </div>
          <h2
            ref={headingRef}
            className="font-display font-light text-[30px] md:text-[46px] xl:text-[54px] leading-[1.04] tracking-[-0.03em] text-ink"
          >
            <span className="line-mask inline-block overflow-hidden">
              <span className="inline-block">India deserves more</span>
            </span>
            <br />
            <span className="line-mask inline-block overflow-hidden">
              <span className="inline-block font-bold italic text-rust">
                centenarians.
              </span>
            </span>
          </h2>
        </div>

        {/* Shloka block removed per client — new one will be supplied. */}

        {/* Founders — premium unified card: portrait + letter */}
        <div className="relative bg-white/70 backdrop-blur-sm border border-ink/8 rounded-[24px] shadow-[0_40px_90px_-50px_rgba(27,26,24,0.35)] overflow-hidden">
          <div className="grid md:grid-cols-[0.82fr_1.18fr]">
            {/* Portrait */}
            <div className="relative min-h-[320px] md:min-h-full overflow-hidden bg-cream">
              <img
                src="/team/founderboth.jpg"
                alt="Dr. Bhavna Sharma and Dr. Abhinav Sharma, co-founders of The Longevity Centre"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: 'center 25%' }}
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(27,26,24,0.5) 0%, rgba(27,26,24,0) 100%)',
                }}
              />
              <div className="absolute bottom-5 left-6 right-6">
                <div className="font-display italic text-white text-[17px] md:text-[20px] leading-[1.15]">
                  Dr. Bhavna &amp; Dr. Abhinav Sharma
                </div>
                <div className="text-[9px] tracking-[0.3em] uppercase text-white/75 font-semibold mt-1.5">
                  Co-Founders &middot; The Longevity Centre
                </div>
              </div>
            </div>

            {/* Letter prose */}
            <div
              ref={bodyRef}
              className="px-7 md:px-11 lg:px-14 py-10 md:py-14"
            >
              <span
                aria-hidden
                className="block font-display text-rust/25 text-[64px] md:text-[88px] leading-[0.5] select-none mb-2"
              >
                &ldquo;
              </span>
              <div className="space-y-5 text-[14.5px] md:text-[16px] leading-[1.78] text-graphite font-light">
                <p data-reveal>
                  We are{' '}
                  <span className="text-ink font-medium">Dr. Bhavna Sharma</span>{' '}
                  and{' '}
                  <span className="text-ink font-medium">Dr. Abhinav Sharma</span>
                  , and we started The Longevity Centre with a simple belief —
                  India deserves more centenarians who are active, independent
                  and deeply alive.
                </p>
                <p data-reveal>
                  Our ancestors, our rishi&#8209;munis and our traditional
                  healing systems always spoke about long, purposeful living.
                  Somewhere along the way, pollution of our air, water, soil
                  and food — along with the stress of modern life — started
                  stealing both our lifespan and our health span. What most of
                  us really need is a clear bridge back to healthy longevity in
                  a modern world.
                </p>
                <p data-reveal>
                  We want a future where grandchildren and
                  great&#8209;grandchildren learn directly from their
                  grandparents, where the wisdom that comes only with age is
                  valued. We believe our senior citizens should be able to
                  contribute, mentor and serve all the way up to 100 and
                  beyond.
                </p>
                <p data-reveal className="text-ink font-medium">
                  At The Longevity Centre, we combine time&#8209;tested Indian
                  practices and cutting&#8209;edge medical science to help you
                  protect your body, brain, hormones, metabolism and immunity —
                  the bridge between ancient wisdom and modern medicine, so you
                  and your family can not only live longer, but live better,
                  together.
                </p>
              </div>

              {/* Sign-off */}
              <div
                data-reveal
                className="mt-8 md:mt-10 pt-6 border-t border-ink/8"
              >
                <p className="font-display italic text-rust text-[19px] md:text-[24px] leading-[1.3]">
                  Dr. Bhavna Sharma &amp; Dr. Abhinav Sharma
                </p>
                <p className="text-[10.5px] tracking-[0.32em] uppercase text-stone font-semibold mt-2">
                  Founders &middot; The Longevity Centre
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
