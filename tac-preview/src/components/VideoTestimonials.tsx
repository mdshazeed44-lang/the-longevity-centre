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
    video: '/videos/testimonials/gomez-v2.mp4',
    poster: '/videos/testimonials/posters/gomez.png',
    // Source clip is actually 406×720 (9:16), not landscape — tagging
    // it horizontal made the lightbox open a 16:9 frame and letterbox
    // the portrait video small in the middle.
    orientation: 'vertical',
  },
  {
    id: 'abhinav',
    name: 'Mr. Abhinav Saxena',
    programme: 'Longevity Plus Programme',
    metric: '−14 kg',
    metricLabel: 'Plus liver health restored',
    quote:
      'I lost weight from around 85 kg to nearly 71 kg and feel healthier from within. My energy levels have improved, and I feel younger overall. The guidance also helped improve my liver health, making the whole journey practical and sustainable.',
    video: '/videos/testimonials/abhinav-v2.mp4',
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
    video: '/videos/testimonials/bhushan-v2.mp4',
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
    video: '/videos/testimonials/sadhna-v2.mp4',
    poster: '/videos/testimonials/posters/sadhna.png',
    orientation: 'vertical',
  },
]

export function VideoTestimonials() {
  const [activeIdx, setActiveIdx] = useState(0)
  // `isPlaying` toggles the play-button overlay on/off. The video
  // itself stays mounted; we just hide the overlay (and reveal the
  // native controls) once playback starts.
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const active = TESTIMONIALS[activeIdx]

  // When the active story changes, reset the inline video to the
  // poster frame in the paused state. The user explicitly tapped
  // prev / next, so they want to see the new story's poster — not
  // have the previous clip keep playing or the next one autoplay.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    try { v.currentTime = 0 } catch { /* metadata not ready yet */ }
    setIsPlaying(false)
  }, [activeIdx])

  // Keyboard nav (← / →) — works whether or not the inline video
  // is currently playing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setActiveIdx((i) => (i + 1) % TESTIMONIALS.length)
      if (e.key === 'ArrowLeft') setActiveIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Tap handler for the play disc — kicks off playback. Sound is
  // ON by default since the patient is speaking; if the browser
  // blocks unmuted autoplay we fall back to muted playback so the
  // user still sees the video (and can unmute with the controls).
  const handlePlayClick = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = false
    const p = v.play()
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        // Browser blocked unmuted play — retry muted so at least
        // the video is rolling. Native controls let the user unmute.
        v.muted = true
        v.play().catch(() => { /* nothing more we can do */ })
      })
    }
  }

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

            {/* Video frame — fixed aspect across all testimonials so
                heights never jump as the user switches stories.
                Vertical clips don't get ugly black bars: a blurred,
                desaturated copy of the poster fills the side gaps
                in a cream-toned ambient wash, with a subtle rust
                radial overlay to keep things on-brand.
                Clicking the play disc starts playback IN PLACE
                (no popup / lightbox — client preference). Once
                playback starts the overlay fades out and the
                video's native controls take over. */}
            <div
              className="group relative block w-full overflow-hidden rounded-[16px] border border-mist/60 max-h-[440px] mx-auto"
              style={{
                aspectRatio: '16/10',
                backgroundColor: '#EEE6DB',
                boxShadow:
                  '0 24px 50px -30px rgba(27,26,24,0.28), 0 10px 24px -20px rgba(27,26,24,0.12)',
              }}
            >
              {/* Blurred poster fill — covers the entire frame so
                  vertical videos don't sit on black. */}
              <img
                key={`backdrop-${active.id}`}
                src={active.poster}
                aria-hidden
                alt=""
                className="absolute inset-0 w-full h-full object-cover scale-[1.15] blur-2xl opacity-55 saturate-[0.85]"
              />
              {/* Soft cream-rust ambient wash on top of the blur */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(238,230,219,0.30), transparent 70%), radial-gradient(circle at 80% 90%, rgba(148,84,85,0.10), transparent 60%)',
                }}
              />

              {/* Inline <video> — plays in place. Keyed by active.id
                  so React mounts a fresh node when the user clicks
                  Previous / Next (which resets playback to the new
                  story's poster). `preload="metadata"` is enough for
                  the poster + duration without speculatively pulling
                  the whole 10-24 MB clip. Native controls appear once
                  playback starts. */}
              <video
                key={active.id}
                ref={videoRef}
                src={active.video}
                poster={active.poster}
                preload="metadata"
                playsInline
                controls={isPlaying}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                className="relative w-full h-full object-contain bg-black"
              />

              {/* Play-disc overlay — only shown while paused. Once
                  the user clicks, it fades out and the video's
                  native controls take over. */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={handlePlayClick}
                  aria-label={`Play ${active.name}'s story`}
                  data-cursor="hover"
                  className="absolute inset-0 flex items-end justify-end p-4 cursor-pointer"
                >
                  {/* Subtle bottom shade for play-button legibility */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
                    }}
                  />
                  {/* Play disc + hover label */}
                  <span className="relative flex items-center gap-3">
                    <span className="text-[10px] tracking-[0.28em] uppercase text-white/90 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Tap to play
                    </span>
                    <span className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-500 group-hover:bg-rust group-hover:border-rust group-hover:scale-105">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="white" className="ml-0.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </button>
              )}
            </div>

            {/* Inline prev / next navigation — sits directly under
                the video frame so the user can switch stories
                without scrolling to the thumbnail strip below.
                Story counter in the middle, arrow buttons on either
                side. Echoes the same setActiveIdx handlers as the
                thumbnail-strip navigation — both stay in sync. */}
            <div className="mt-5 md:mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                aria-label="Previous story"
                data-cursor="hover"
                className="group inline-flex items-center gap-2 pl-2 pr-4 py-2 rounded-full border border-mist hover:border-rust hover:bg-rust hover:text-white text-ink transition-colors duration-300"
              >
                <span className="w-8 h-8 rounded-full bg-cream/60 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </span>
                <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold">
                  Previous
                </span>
              </button>

              <div className="text-[10.5px] tracking-[0.32em] uppercase text-stone font-semibold tabular-nums">
                {String(activeIdx + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
              </div>

              <button
                type="button"
                onClick={() => setActiveIdx((i) => (i + 1) % TESTIMONIALS.length)}
                aria-label="Next story"
                data-cursor="hover"
                className="group inline-flex items-center gap-2 pl-4 pr-2 py-2 rounded-full border border-mist hover:border-rust hover:bg-rust hover:text-white text-ink transition-colors duration-300"
              >
                <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold">
                  Next
                </span>
                <span className="w-8 h-8 rounded-full bg-cream/60 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </span>
              </button>
            </div>
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
                  className="group relative text-left transition-all duration-500"
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

      {/* Lightbox modal removed — the client preferred in-place
          playback (no popup overlay). The inline <video> in the
          featured-story block above handles play / pause / native
          controls right where the poster used to be. */}
    </section>
  )
}
