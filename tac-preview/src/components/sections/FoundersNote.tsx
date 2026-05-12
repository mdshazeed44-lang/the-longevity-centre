// FoundersNote — homepage editorial open letter from Dr. Bhavna and
// Dr. Abhinav Sharma. Premium magazine-style treatment: large
// quotation-mark display, drop-cap opener, framed portrait with a
// rust offset card, pull-quote insert, and a handwritten-style
// sign-off. Sits between Editorial and VideoTestimonials in the
// homepage scroll — bridges the science-heavy upper half into the
// patient stories below by giving the brand a human voice.
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
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll('.line-mask > span')
        gsap.from(lines, {
          yPercent: 110,
          duration: 1.15,
          ease: 'expo.out',
          stagger: 0.13,
          scrollTrigger: { trigger: headingRef.current, start: 'top 82%' },
        })
      }

      if (bodyRef.current) {
        gsap.from(bodyRef.current.querySelectorAll('[data-reveal]'), {
          y: 24,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: bodyRef.current, start: 'top 78%' },
        })
      }

      if (portraitRef.current) {
        gsap.to(portraitRef.current.querySelector('img'), {
          yPercent: -7,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.9,
          },
        })
      }

      if (quoteRef.current) {
        gsap.from(quoteRef.current, {
          opacity: 0,
          y: 30,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: quoteRef.current, start: 'top 82%' },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="founders-note"
      className="relative bg-cream/55 py-24 md:py-36 px-6 md:px-12 overflow-hidden"
    >
      {/* Layered ambient washes — adds editorial warmth without
          competing with the portrait or copy. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(1000px 700px at 18% 12%, rgba(148,84,85,0.10), transparent 60%), radial-gradient(800px 600px at 92% 88%, rgba(178,122,123,0.07), transparent 60%)',
        }}
      />

      {/* Decorative oversize quotation mark — sits behind the heading
          like a magazine pull-quote. Tracked off-axis to feel
          editorial rather than centred. */}
      <div
        aria-hidden
        className="absolute top-12 md:top-20 left-4 md:left-[6%] pointer-events-none select-none"
      >
        <span
          className="font-display text-rust/8 leading-none"
          style={{
            fontSize: 'clamp(180px, 22vw, 380px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
          }}
        >
          &ldquo;
        </span>
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto">
        {/* Eyebrow row */}
        <div className="flex items-center gap-4 mb-8 md:mb-10">
          <span className="w-8 h-px bg-rust" />
          <span className="text-[11px] tracking-[0.42em] text-rust font-semibold uppercase">
            Founders&rsquo; Note
          </span>
          <span className="hidden md:inline-block flex-1 h-px bg-rust/15" />
          <span className="hidden md:inline text-[10.5px] tracking-[0.32em] uppercase text-stone/70 font-medium">
            An open letter
          </span>
        </div>

        {/* Heading — large editorial display */}
        <h2
          ref={headingRef}
          className="font-display font-light text-[34px] md:text-[56px] xl:text-[68px] leading-[1.02] tracking-[-0.03em] text-ink max-w-[980px] mb-14 md:mb-20"
        >
          <span className="line-mask">
            <span>India deserves more centenarians.</span>
          </span>
          <br />
          <span className="line-mask">
            <span className="font-bold italic text-rust">Active. Independent. Deeply alive.</span>
          </span>
        </h2>

        {/* Main grid — portrait left with offset rust card, letter right. */}
        <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-12 md:gap-20 items-start">
          {/* Portrait stack with offset accent card */}
          <div className="relative">
            {/* Offset rust accent card sits behind the portrait — gives
                the photo a framed editorial pop. */}
            <div
              aria-hidden
              className="absolute -top-3 -left-3 md:-top-5 md:-left-5 w-full h-full rounded-[20px] bg-rust/12 border border-rust/25"
            />
            <div
              ref={portraitRef}
              className="relative aspect-[4/5] rounded-[20px] overflow-hidden bg-cream shadow-[0_36px_70px_-32px_rgba(27,26,24,0.40)]"
            >
              <img
                src="/team/founderboth.jpg"
                alt="Dr. Bhavna Sharma and Dr. Abhinav Sharma, co-founders of The Longevity Centre"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-[110%] object-cover"
                style={{ objectPosition: 'center 28%' }}
              />
              {/* Caption gradient + name */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(27,26,24,0.70) 0%, rgba(27,26,24,0) 100%)',
                }}
              />
              <div className="absolute inset-x-0 bottom-0 px-6 md:px-8 pb-6 md:pb-7">
                <div className="text-[10.5px] tracking-[0.34em] uppercase text-white/85 font-semibold mb-2">
                  Co&#8209;Founders
                </div>
                <div className="font-display italic text-white text-[18px] md:text-[22px] leading-[1.2]">
                  Dr. Bhavna &amp; Dr. Abhinav Sharma
                </div>
              </div>
            </div>

            {/* Caption block below portrait — editorial caption rather
                than just a name tag. */}
            <div className="mt-7 md:mt-9 pl-1">
              <div className="text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold mb-2">
                Photographed at TLC, Delhi
              </div>
              <p className="text-[13px] md:text-[14px] leading-[1.6] text-stone/85 font-light italic max-w-[320px]">
                &ldquo;Our role is to be the bridge between ancient wisdom and
                modern medicine.&rdquo;
              </p>
            </div>
          </div>

          {/* Letter body */}
          <div ref={bodyRef} className="md:pt-2">
            {/* Drop-cap opener — magazine-quality first paragraph */}
            <p
              data-reveal
              className="text-[16px] md:text-[18px] leading-[1.7] text-ink font-light first-letter:font-display first-letter:font-bold first-letter:text-rust first-letter:text-[68px] md:first-letter:text-[88px] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-3 md:first-letter:mr-4 first-letter:mt-1.5"
            >
              We are <span className="text-ink font-medium">Dr. Bhavna Sharma</span>{' '}
              and <span className="text-ink font-medium">Dr. Abhinav Sharma</span>,
              and we started The Longevity Centre with a simple belief —{' '}
              <span className="font-medium">
                India deserves more centenarians who are active, independent and
                deeply alive.
              </span>
            </p>

            <div className="clear-both" />

            <div className="mt-6 space-y-5 md:space-y-6 text-[15px] md:text-[16.5px] leading-[1.78] text-graphite font-light">
              <p data-reveal>
                Our ancestors, our rishi&#8209;munis, and our traditional
                healing systems always spoke about long, purposeful living.
                Somewhere along the way, pollution of our air, water, soil and
                food — along with the stress of modern life — started stealing
                both our lifespan and our health span. We may have air
                purifiers and water filters today, but what most of us really
                need is a clear bridge back to healthy longevity in a modern
                world.
              </p>

              {/* Pull quote — editorial break between paragraphs */}
              <div
                ref={quoteRef}
                data-reveal
                className="my-8 md:my-10 pl-6 md:pl-8 border-l-[3px] border-rust/70 py-1"
              >
                <p className="font-display italic text-ink text-[20px] md:text-[26px] xl:text-[30px] leading-[1.3] tracking-[-0.01em]">
                  We want a future where grandchildren and great&#8209;grandchildren
                  learn directly from{' '}
                  <span className="text-rust">their grandparents.</span>
                </p>
              </div>

              <p data-reveal>
                Where the wisdom that comes only with age is valued — just as
                our Prime Minister, Shri Narendra Modi&nbsp;ji, continues to
                lead the country with experience built over decades. We
                believe our senior citizens should be able to contribute,
                mentor and serve all the way up to 100 and beyond.
              </p>

              <p data-reveal className="text-ink font-medium">
                At The Longevity Centre, we combine time&#8209;tested Indian
                practices and cutting&#8209;edge medical science to help you
                protect your body, brain, hormones, metabolism and immunity.
                Our role is to be that bridge between ancient wisdom and
                modern medicine, so you and your family can not only live
                longer, but{' '}
                <span className="text-rust italic font-display text-[17px] md:text-[19px]">
                  live better, together.
                </span>
              </p>
            </div>

            {/* Sign-off block */}
            <div data-reveal className="mt-12 md:mt-14 pt-8 md:pt-10 border-t border-rust/20">
              <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-5">
                With warmth
              </div>
              <div
                className="font-display italic text-ink leading-[1.15] tracking-[-0.015em]"
                style={{ fontSize: 'clamp(26px, 3.4vw, 38px)' }}
              >
                Dr. Bhavna Sharma
                <span className="text-rust mx-2.5 not-italic font-light">&amp;</span>
                Dr. Abhinav Sharma
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="w-6 h-px bg-rust/60" />
                <span className="text-[11px] tracking-[0.32em] uppercase text-stone font-medium">
                  Founders &middot; The Longevity Centre
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
