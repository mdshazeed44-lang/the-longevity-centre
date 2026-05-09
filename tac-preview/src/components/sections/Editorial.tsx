import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export function Editorial() {
  const imgRef = useRef<HTMLImageElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    if (!imgRef.current || !sectionRef.current) return
    gsap.to(imgRef.current, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        // 0.8s scrub lerp — keeps the parallax glide buttery
        // rather than locked to the wheel.
        scrub: 0.8,
      },
    })
  }, [])

  return (
    <section
      id="editorial"
      ref={sectionRef}
      className="bg-white py-12 md:py-16 px-6 md:px-12"
    >
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
        <div className="aspect-[4/3] md:aspect-[5/4] overflow-hidden rounded-[20px] bg-mist">
          <img
            ref={imgRef}
            src="/longevity/diagnostics-lab.jpg"
            alt="Lab technician sampling a labelled blood vial — biomarker analysis"
            className="w-full h-[110%] object-cover"
          />
        </div>
        <div className="md:max-w-[480px]">
          <div className="text-[11px] tracking-[0.3em] text-stone uppercase font-medium mb-5">
            Diagnostics
          </div>
          <h2 className="font-display font-bold text-[30px] md:text-[42px] leading-[1.05] tracking-[-0.025em] text-ink mb-6">
            Measurement is medicine.
          </h2>
          <div className="space-y-4 text-[14.5px] md:text-[15.5px] leading-[1.65] text-graphite">
            <p>Most clinics treat symptoms. We treat the systems behind them.</p>
            <p>
              Our diagnostic stack — 163 blood parameters, full-genome analysis,
              microbiome sequencing, body composition, vascular function, and
              biological age — produces a complete picture of how your body is
              ageing and which interventions will move the needle.
            </p>
            <p>
              Every measurement is repeated through your programme. Progress is
              not a feeling. It is a number that has changed.
            </p>
          </div>
          <a
            href="#"
            data-cursor="hover"
            className="inline-flex items-center gap-2 mt-10 text-[11px] tracking-[0.25em] text-ink uppercase font-medium hover:text-rust transition-colors group"
          >
            View Diagnostics
            <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

// ---------- CTA Band ----------
