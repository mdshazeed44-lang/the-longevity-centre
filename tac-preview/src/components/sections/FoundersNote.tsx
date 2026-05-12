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
  const shlokaRef = useRef<HTMLElement>(null)

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

      // Shloka block fades up gently — quiet, no horizontal motion.
      if (shlokaRef.current) {
        gsap.from(shlokaRef.current, {
          y: 22,
          opacity: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: { trigger: shlokaRef.current, start: 'top 84%' },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="founders-note"
      className="relative bg-cream/40 py-14 md:py-20 px-6 md:px-12"
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Eyebrow + heading row — matches the rest of the site's
            section header rhythm. */}
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 items-start mb-12 md:mb-16">
          <div>
            <div className="text-[11px] tracking-[0.42em] text-rust font-semibold uppercase mb-5">
              Founders&rsquo; Note
            </div>
            <h2
              ref={headingRef}
              className="font-display font-light text-[30px] md:text-[44px] xl:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink"
            >
              <span className="line-mask">
                <span>India deserves more</span>
              </span>
              <br />
              <span className="line-mask">
                <span className="font-bold text-rust">centenarians.</span>
              </span>
            </h2>
          </div>
          <p className="text-[14.5px] md:text-[16.5px] leading-[1.7] text-graphite font-light md:pt-2">
            An open letter from the doctors who founded The Longevity Centre —
            on bridging Indian wisdom and modern medicine, so families can
            live longer and live better, together.
          </p>
        </div>

        {/* Shloka block — Atharvaveda Prithvi Sukta verse invoked by
            PM Modi, used here as the spiritual anchor of the brand's
            "ancient wisdom + modern medicine" thesis. Restrained
            treatment: thin rust hairlines top/bottom, devanagari in
            serif display, italic English meaning, single-line
            attribution. Sits between the heading and the letter so
            it reads as a quiet epigraph. */}
        <figure
          ref={shlokaRef}
          className="mb-12 md:mb-16 mx-auto max-w-[820px] text-center border-y border-rust/15 py-10 md:py-12"
        >
          <p
            lang="sa"
            className="font-display text-ink text-[19px] md:text-[24px] xl:text-[26px] leading-[1.55] tracking-[-0.005em]"
            style={{ fontFeatureSettings: '"liga", "calt"' }}
          >
            उपस्थास्ते अनमीवा अयक्ष्मा अस्मभ्यं सन्तु पृथिवि प्रसूताः।
            <br />
            दीर्घं न आयुः प्रतिबुध्यमाना वयं तुभ्यं बलिहृतः स्याम॥
          </p>
          <p className="mt-5 md:mt-6 font-display italic text-graphite text-[14.5px] md:text-[16px] leading-[1.6] max-w-[640px] mx-auto">
            &ldquo;May we rise from this Earth free from disease and free from
            sickness; may we, awakening, attain a long life and offer
            ourselves in service to thee.&rdquo;
          </p>
          <figcaption className="mt-5 text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold">
            Atharvaveda &middot; Prithvi Sukta &middot; Invoked by Prime
            Minister Shri Narendra Modi
          </figcaption>
        </figure>

        {/* Portrait + letter — quiet two-column layout */}
        <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-16 items-start">
          {/* Portrait — clean rounded card, no decorative frame */}
          <div className="relative aspect-[4/5] rounded-[14px] overflow-hidden bg-cream shadow-[0_22px_50px_-28px_rgba(27,26,24,0.28)]">
            <img
              src="/team/founderboth.jpg"
              alt="Dr. Bhavna Sharma and Dr. Abhinav Sharma, co-founders of The Longevity Centre"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center 28%' }}
            />
          </div>

          {/* Letter prose */}
          <div
            ref={bodyRef}
            className="space-y-5 text-[14.5px] md:text-[16px] leading-[1.75] text-graphite font-light"
          >
            <p data-reveal>
              We are <span className="text-ink font-medium">Dr. Bhavna Sharma</span>{' '}
              and <span className="text-ink font-medium">Dr. Abhinav Sharma</span>,
              and we started The Longevity Centre with a simple belief — India
              deserves more centenarians who are active, independent and deeply
              alive.
            </p>
            <p data-reveal>
              Our ancestors, our rishi&#8209;munis and our traditional healing
              systems always spoke about long, purposeful living. Somewhere
              along the way, pollution of our air, water, soil and food — along
              with the stress of modern life — started stealing both our
              lifespan and our health span. We may have air purifiers and water
              filters today, but what most of us really need is a clear bridge
              back to healthy longevity in a modern world.
            </p>
            <p data-reveal>
              We want a future where grandchildren and great&#8209;grandchildren
              learn directly from their grandparents, where the wisdom that
              comes only with age is valued — just as our Prime Minister, Shri
              Narendra Modi&nbsp;ji, continues to lead the country with
              experience built over decades. We believe our senior citizens
              should be able to contribute, mentor and serve all the way up to
              100 and beyond.
            </p>
            <p data-reveal className="text-ink font-medium">
              At The Longevity Centre, we combine time&#8209;tested Indian
              practices and cutting&#8209;edge medical science to help you
              protect your body, brain, hormones, metabolism and immunity. Our
              role is to be that bridge between ancient wisdom and modern
              medicine, so you and your family can not only live longer, but
              live better, together.
            </p>

            {/* Sign-off — quiet italic close */}
            <div data-reveal className="pt-6 md:pt-8">
              <p className="font-display italic text-rust text-[18px] md:text-[22px] leading-[1.35]">
                Dr. Bhavna Sharma &amp; Dr. Abhinav Sharma
              </p>
              <p className="text-[11px] tracking-[0.32em] uppercase text-stone font-medium mt-2">
                Founders &middot; The Longevity Centre
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
