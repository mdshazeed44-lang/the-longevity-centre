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
  // Client request: Mr. Abhinav Saxena leads the testimonials.
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
  // Two newer patient clips. Details (programme / metric / verbatim
  // quote) not yet supplied, so these intentionally carry NO
  // fabricated numbers or quote — they show the verified video with
  // a neutral label until the real outcome data is provided.
  {
    id: 'anand',
    name: 'Mr. Anand Patil',
    programme: 'TLC Patient · Verified Outcome',
    metric: 'Verified Outcome',
    metricLabel: '',
    quote: '',
    video: '/videos/testimonials/anand-patil.mp4',
    poster: '/videos/testimonials/posters/anand-patil.jpg',
    orientation: 'vertical',
  },
  {
    id: 'patient-2',
    name: 'TLC Patient',
    programme: 'TLC Patient · Verified Outcome',
    metric: 'Verified Outcome',
    metricLabel: '',
    quote: '',
    video: '/videos/testimonials/new1.mp4',
    poster: '/videos/testimonials/posters/new1.jpg',
    orientation: 'horizontal',
  },
]

export function VideoTestimonials() {
  const [activeIdx, setActiveIdx] = useState(0)
  // `isPlaying` toggles the play-button overlay on/off. The video
  // itself stays mounted; we just hide the overlay (and reveal the
  // native controls) once playback starts.
  const [isPlaying, setIsPlaying] = useState(false)
  // Auto-slider pauses while the cursor is over the rail so a viewer
  // browsing the stories isn't yanked to the next one.
  const [railHover, setRailHover] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  // Horizontal thumbnail rail — single sliding row. We keep the
  // active tile scrolled into view when prev / next is used.
  const stripRef = useRef<HTMLDivElement>(null)
  const active = TESTIMONIALS[activeIdx]

  // Slide the active thumbnail into view whenever the story changes
  // (arrow nav, keyboard, or tile tap on a partly-hidden card).
  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    const tile = strip.querySelector<HTMLElement>(`[data-idx="${activeIdx}"]`)
    if (!tile) return
    const left =
      tile.offsetLeft - strip.clientWidth / 2 + tile.clientWidth / 2
    strip.scrollTo({ left, behavior: 'smooth' })
  }, [activeIdx])

  // Auto-slider — advances every 4.5 s. Pauses while a video is
  // playing (so we never interrupt a patient's story) or while the
  // cursor is over the rail.
  useEffect(() => {
    if (isPlaying || railHover) return
    const id = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % TESTIMONIALS.length)
    }, 4500)
    return () => window.clearInterval(id)
  }, [isPlaying, railHover])

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
            {/* Video frame — fixed aspect across all testimonials so
                heights never jump as the user switches stories.
                Vertical clips don't get ugly black bars: a blurred,
                desaturated copy of the poster fills the side gaps
                in a cream-toned ambient wash, with a subtle rust
                radial overlay to keep things on-brand.
                Clicking the play disc starts playback IN PLACE
                (no popup / lightbox — client preference). Once
                playback starts the overlay fades out and the
                video's native controls take over.
                The outcome metric chip is nested INSIDE this frame
                so its `bottom-3 left-3` positioning is relative to
                the video frame, not the outer LEFT column (which
                would push the chip out into the prev/next nav row
                below). */}
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
              {/* No `bg-black` on the <video> — that was painting the
                  side gaps (for vertical 9:16 clips in a 16:10 frame)
                  solid black. We want the blurred poster backdrop
                  layered behind to bleed through instead. */}
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
                className="relative w-full h-full object-contain"
              />

              {/* Outcome metric chip removed per client feedback — it
                  sat in the blurred backdrop area of the video frame
                  and read as a half-cropped artefact rather than a
                  clean stat. The metric is still presented as the
                  hero stat in the right-hand column. */}

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

            {/* Inline prev / next navigation — minimal arrow-only
                pattern per client preference. Just two circular icon
                buttons either side of the story counter — no PREVIOUS
                / NEXT labels. Stays in sync with the thumbnail strip
                below via the shared setActiveIdx handlers. */}
            <div className="mt-5 md:mt-6 flex items-center justify-center gap-6 md:gap-8">
              <button
                type="button"
                onClick={() => setActiveIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                aria-label="Previous story"
                data-cursor="hover"
                className="w-11 h-11 rounded-full border border-mist text-ink hover:border-rust hover:bg-rust hover:text-white flex items-center justify-center transition-colors duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div className="text-[10.5px] tracking-[0.32em] uppercase text-stone font-semibold tabular-nums">
                {String(activeIdx + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
              </div>

              <button
                type="button"
                onClick={() => setActiveIdx((i) => (i + 1) % TESTIMONIALS.length)}
                aria-label="Next story"
                data-cursor="hover"
                className="w-11 h-11 rounded-full border border-mist text-ink hover:border-rust hover:bg-rust hover:text-white flex items-center justify-center transition-colors duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* RIGHT — Pull quote + attribution */}
          <div>
            <div className="text-[10px] tracking-[0.32em] uppercase text-rust font-semibold mb-4">
              {active.programme}
            </div>

            {/* Quote glyph — large editorial open quote (only when a
                verbatim quote exists; the newer clips have none yet). */}
            {active.quote ? (
              <>
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
              </>
            ) : (
              <p
                key={active.id}
                className="relative font-display font-light text-[17px] md:text-[20px] xl:text-[22px] leading-[1.4] tracking-[-0.01em] text-ink mb-7 max-w-[480px]"
                style={{ animation: 'tac-quote-in 0.8s cubic-bezier(0.22,1,0.36,1) both' }}
              >
                {active.name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s/, '')} shares
                their experience with The Longevity Centre — watch the full
                story.
              </p>
            )}

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
          <div className="flex items-center justify-between mb-5 max-w-[940px] mx-auto">
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

          {/* Thumbnail rail — single horizontal sliding row. Scroll /
              swipe to browse; arrows + tile taps keep the active card
              snapped into view. Scrollbar hidden for a clean look. */}
          <div
            ref={stripRef}
            onMouseEnter={() => setRailHover(true)}
            onMouseLeave={() => setRailHover(false)}
            className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory pb-2 max-w-[940px] mx-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {TESTIMONIALS.map((t, i) => {
              const isActive = i === activeIdx
              return (
                <button
                  key={t.id}
                  type="button"
                  data-idx={i}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`View ${t.name}'s story`}
                  aria-current={isActive}
                  data-cursor="hover"
                  className="group relative shrink-0 w-[180px] sm:w-[210px] md:w-[235px] snap-center text-left cursor-pointer outline-none transition-all duration-500 hover:-translate-y-1.5"
                >
                  <div
                    className={`relative aspect-[4/5] w-full overflow-hidden rounded-[18px] bg-mist transition-all duration-500 ring-1 ${
                      isActive
                        ? 'ring-2 ring-rust shadow-[0_26px_46px_-22px_rgba(148,84,85,0.5)]'
                        : 'ring-ink/8 group-hover:ring-rust/50 shadow-[0_14px_30px_-22px_rgba(27,26,24,0.35)] group-hover:shadow-[0_22px_40px_-20px_rgba(148,84,85,0.4)]'
                    }`}
                  >
                    <img
                      src={t.poster}
                      alt=""
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] ${
                        isActive ? '' : 'grayscale-[0.15] group-hover:grayscale-0'
                      }`}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, transparent 38%, transparent 50%, rgba(0,0,0,0.78) 100%)',
                      }}
                    />

                    {/* Play affordance — soft disc, brightens on hover /
                        active so it's obvious each tile opens a video. */}
                    <span
                      aria-hidden
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-500 ${
                        isActive
                          ? 'bg-rust border-rust scale-100 opacity-100'
                          : 'bg-white/15 border-white/40 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'
                      }`}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="white" className="ml-0.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 backdrop-blur-md bg-rust/90 rounded-full px-2.5 py-1">
                        <span className="relative flex h-1 w-1" aria-hidden>
                          <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
                          <span className="relative inline-flex rounded-full h-1 w-1 bg-white" />
                        </span>
                        <span className="text-[8.5px] tracking-[0.24em] uppercase text-white font-semibold">
                          Now Playing
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="font-display font-bold text-[14px] md:text-[15px] leading-tight tracking-tight truncate">
                        {t.name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s/, '')}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span aria-hidden className="w-3 h-px bg-rust-soft" />
                        <span className="text-[8.5px] tracking-[0.22em] uppercase text-white/80 font-semibold truncate">
                          {t.metric}
                        </span>
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
