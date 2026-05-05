// VideoTestimonials — editorial featured-story pattern.
// One story shown large with the OUTCOME METRIC as the hero.
// Below: thumbnail selector to switch between stories.
// Smooth fade transition. White BG, rust accents — brand-aligned.
//
// Source: TLC brochure page 15 — 4 patient videos with verified outcome
// metrics (HbA1c drops, kg lost). Quotes are verbatim.

import { useEffect, useRef, useState } from 'react'

type Testimonial = {
  id: string
  name: string
  programme: string
  metric: string         // big headline number (e.g., "−15 kg" or "7.4 → 5.7")
  metricLabel: string    // small caption (e.g., "in programme" or "HbA1c, 4 months")
  quote: string          // verbatim patient quote
  video: string
  poster: string
  orientation: 'vertical' | 'horizontal'
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'shaun',
    name: 'Mr. Shaun Gomez',
    programme: 'Advanced Metabolic Programme',
    metric: '−15 kg',
    metricLabel: 'In Programme',
    quote:
      'I reduced my weight from 87 kg to 72 kg through this programme. Beyond weight loss, I feel more focused and active in my daily life. The personalised approach based on my body and vitals made it easy to follow and effective.',
    video: '/videos/testimonials/gomez.mp4',
    poster: '/videos/testimonials/posters/gomez.png',
    orientation: 'horizontal',
  },
  {
    id: 'abhinav',
    name: 'Mr. Abhinav Saxena',
    programme: 'Longevity Plus Programme',
    metric: '−14 kg',
    metricLabel: 'Plus liver health restored',
    quote:
      'I lost weight from around 85 kg to nearly 71 kg and feel healthier from within. My energy levels have improved, and I feel younger overall. The guidance also helped improve my liver health, making the whole journey practical and sustainable.',
    video: '/videos/testimonials/abhinav.mp4',
    poster: '/videos/testimonials/posters/abhinav.webp',
    orientation: 'vertical',
  },
  {
    id: 'bhushan',
    name: 'Mr. Bhushan Kamble',
    programme: 'Metabolic Programme',
    metric: 'Diabetic → Normal',
    metricLabel: 'Glucose normalised, −10 kg',
    quote:
      'I reduced around 9–10 kg and my glucose levels improved from diabetic to normal. The progress came faster than I expected. The customised plan and continuous support made it easy to follow and maintain long-term results.',
    video: '/videos/testimonials/bhushan.mp4',
    poster: '/videos/testimonials/posters/bhushan.png',
    orientation: 'vertical',
  },
  {
    id: 'sadhna',
    name: 'Mrs. Sadhna Gupta',
    programme: 'Diabetes Reversal Programme',
    metric: '170s → 110',
    metricLabel: 'Fasting glucose',
    quote:
      "I've had diabetes for many years, and my sugar levels are now much better controlled. My fasting dropped from around 170–180 to nearly 110, and my medications have reduced. I feel more energetic, and managing my diet and daily health has become much easier and more consistent.",
    video: '/videos/testimonials/sadhna.mp4',
    poster: '/videos/testimonials/posters/sadhna.png',
    orientation: 'vertical',
  },
]

export function VideoTestimonials() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [openLightbox, setOpenLightbox] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const active = TESTIMONIALS[activeIdx]

  // When active story changes, reset video element
  useEffect(() => {
    const v = videoRef.current
    if (v) {
      v.muted = true
      v.currentTime = 0
      v.play().catch(() => {})
    }
  }, [activeIdx])

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (openLightbox) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [openLightbox])

  // Keyboard nav (← / →)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openLightbox) {
        if (e.key === 'Escape') setOpenLightbox(false)
        return
      }
      if (e.key === 'ArrowRight') setActiveIdx((i) => (i + 1) % TESTIMONIALS.length)
      if (e.key === 'ArrowLeft') setActiveIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openLightbox])

  return (
    <section
      id="testimonials"
      className="relative bg-white py-10 md:py-14 px-6 md:px-12 overflow-hidden"
    >
      {/* Subtle ambient warmth */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            'radial-gradient(900px 500px at 50% 0%, rgba(148,84,85,0.06), transparent 65%)',
        }}
      />

      <div className="relative max-w-[1280px] mx-auto">
        {/* HEADER */}
        <div className="text-center mb-8 md:mb-10 max-w-[680px] mx-auto">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-7 h-px bg-rust" />
            <span className="text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold">
              Patient Outcomes · Verified
            </span>
            <span className="w-7 h-px bg-rust" />
          </div>
          <h2 className="font-display font-light text-[26px] md:text-[36px] xl:text-[42px] leading-[1.1] tracking-[-0.025em] text-ink">
            Real results.
            <span className="font-bold text-rust"> Real measurements.</span>
          </h2>
          <p className="mt-4 text-[13px] md:text-[14px] leading-[1.6] text-graphite font-light max-w-[480px] mx-auto">
            Every outcome below is documented through repeat diagnostics — not memory. These are TLC patients in their own words.
          </p>
        </div>

        {/* FEATURED STORY — 2-col editorial spread */}
        <div className="grid md:grid-cols-[1fr_1fr] gap-8 md:gap-12 items-center">
          {/* LEFT — Video frame with outcome metric chip */}
          <div className="relative">
            {/* Outcome metric chip — floats top-left, smaller and tighter */}
            <div className="absolute -top-3 -left-2 md:-top-4 md:-left-3 z-20 bg-white rounded-[14px] px-4 py-3 md:px-5 md:py-3.5 shadow-[0_18px_36px_-20px_rgba(148,84,85,0.40)] border border-mist/60">
              <div className="text-[9px] md:text-[9.5px] tracking-[0.32em] uppercase text-rust font-semibold mb-1">
                {active.metricLabel}
              </div>
              <div className="font-display font-bold text-[22px] md:text-[28px] leading-[1.0] tracking-[-0.02em] text-rust tabular-nums">
                {active.metric}
              </div>
            </div>

            {/* Video frame — fixed aspect across all testimonials so heights
                never jump as the user switches stories.
                Vertical clips no longer show ugly black bars: a blurred,
                desaturated copy of the poster fills the side gaps in a
                cream-toned ambient wash, with a subtle rust radial overlay
                to keep things on-brand. Horizontal videos fill the frame. */}
            <button
              type="button"
              onClick={() => setOpenLightbox(true)}
              aria-label={`Watch ${active.name}'s full story`}
              className="group relative block w-full overflow-hidden rounded-[16px] border border-mist/60 cursor-pointer max-h-[440px] mx-auto"
              style={{
                aspectRatio: '16/10',
                backgroundColor: '#EEE6DB', // nougat fallback
                boxShadow:
                  '0 24px 50px -30px rgba(27,26,24,0.28), 0 10px 24px -20px rgba(27,26,24,0.12)',
              }}
            >
              {/* Blurred poster fill — covers the entire frame so vertical
                  videos don't sit on black. */}
              <img
                key={`backdrop-${active.id}`}
                src={active.poster}
                aria-hidden
                alt=""
                className="absolute inset-0 w-full h-full object-cover scale-[1.15] blur-2xl opacity-55 saturate-[0.85]"
              />
              {/* Soft cream-rust ambient wash on top of the blur — keeps
                  the brand colour signature even when the poster is cool-toned. */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(238,230,219,0.30), transparent 70%), radial-gradient(circle at 80% 90%, rgba(148,84,85,0.10), transparent 60%)',
                }}
              />
              <video
                ref={videoRef}
                key={active.id}
                src={active.video}
                poster={active.poster}
                muted
                loop
                playsInline
                preload="metadata"
                className="relative w-full h-full object-contain"
              />
              {/* Subtle bottom shade for play-button legibility (smaller area) */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
                }}
              />
              {/* Play disc — bottom-right of video */}
              <div className="absolute bottom-4 right-4 flex items-center gap-3">
                <span className="text-[10px] tracking-[0.28em] uppercase text-white/90 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Watch full story
                </span>
                <span className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-500 group-hover:bg-rust group-hover:border-rust group-hover:scale-105">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="white" className="ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </button>
          </div>

          {/* RIGHT — Pull quote + attribution */}
          <div>
            <div className="text-[10px] tracking-[0.32em] uppercase text-rust font-semibold mb-4">
              {active.programme}
            </div>

            {/* Quote glyph — large editorial open quote */}
            <div className="font-display text-[60px] md:text-[80px] leading-none text-rust/15 mb-[-20px] md:mb-[-30px] select-none" aria-hidden>
              "
            </div>

            <blockquote
              key={active.id}
              className="relative font-display font-light text-[17px] md:text-[20px] xl:text-[22px] leading-[1.4] tracking-[-0.01em] text-ink mb-7 max-w-[480px]"
              style={{ animation: 'tac-quote-in 0.8s cubic-bezier(0.22,1,0.36,1) both' }}
            >
              {active.quote}
            </blockquote>

            <div className="flex items-baseline gap-3 mb-1.5">
              <span aria-hidden className="block w-7 h-px bg-rust" />
              <div className="font-display font-bold text-[16px] md:text-[17px] tracking-tight text-ink">
                {active.name}
              </div>
            </div>
            <div className="pl-10 text-[10px] tracking-[0.22em] uppercase text-graphite/65 font-medium">
              The Longevity Centre · Patient
            </div>
          </div>
        </div>

        {/* THUMBNAIL SELECTOR — switch between stories */}
        <div className="mt-10 md:mt-14">
          <div className="flex items-center justify-between mb-5 max-w-[760px] mx-auto">
            <div className="text-[10.5px] tracking-[0.32em] uppercase text-stone font-semibold">
              {String(activeIdx + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')} Stories
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                aria-label="Previous story"
                className="w-10 h-10 rounded-full border border-mist hover:border-rust hover:bg-rust hover:text-white text-ink flex items-center justify-center transition-colors duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setActiveIdx((i) => (i + 1) % TESTIMONIALS.length)}
                aria-label="Next story"
                className="w-10 h-10 rounded-full border border-mist hover:border-rust hover:bg-rust hover:text-white text-ink flex items-center justify-center transition-colors duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-3.5 max-w-[760px] mx-auto">
            {TESTIMONIALS.map((t, i) => {
              const isActive = i === activeIdx
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  aria-label={`View ${t.name}'s story`}
                  aria-current={isActive}
                  className={`group relative text-left transition-all duration-500 ${
                    isActive ? 'scale-100' : 'scale-95 opacity-70 hover:opacity-100 hover:scale-100'
                  }`}
                >
                  <div
                    className={`relative aspect-[4/5] w-full overflow-hidden rounded-[12px] bg-mist border-2 transition-all duration-500 ${
                      isActive ? 'border-rust shadow-[0_18px_30px_-18px_rgba(148,84,85,0.45)]' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={t.poster}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.7) 100%)',
                      }}
                    />
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute top-2 left-2 flex items-center gap-1.5 backdrop-blur-md bg-rust/90 rounded-full px-2 py-0.5">
                        <span className="relative flex h-1 w-1" aria-hidden>
                          <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
                          <span className="relative inline-flex rounded-full h-1 w-1 bg-white" />
                        </span>
                        <span className="text-[8.5px] tracking-[0.22em] uppercase text-white font-semibold">Active</span>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 right-2 text-white">
                      <div className="font-display font-bold text-[12.5px] md:text-[13px] leading-tight tracking-tight truncate">
                        {t.name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s/, '')}
                      </div>
                      <div className="text-[8.5px] tracking-[0.22em] uppercase text-white/75 font-medium mt-0.5 truncate">
                        {t.metric}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Quote fade-in keyframe */}
      <style>{`
        @keyframes tac-quote-in {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* LIGHTBOX MODAL */}
      {openLightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/85 backdrop-blur-md"
          onClick={() => setOpenLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setOpenLightbox(false)}
            aria-label="Close testimonial"
            className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/30 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div
            className="relative max-w-[640px] w-full"
            onClick={(e) => e.stopPropagation()}
            style={{
              aspectRatio: active.orientation === 'horizontal' ? '16/9' : '9/16',
            }}
          >
            <video
              src={active.video}
              poster={active.poster}
              controls
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full rounded-[20px] bg-black object-cover"
            />
            <div className="absolute -bottom-14 left-0 right-0 text-center text-white">
              <div className="font-display font-bold text-[20px] md:text-[24px] tracking-tight">
                {active.name}
              </div>
              <div className="text-[10px] tracking-[0.28em] uppercase text-white/65 font-medium mt-1">
                {active.programme} · {active.metric}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
