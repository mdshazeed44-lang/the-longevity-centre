// Video testimonials — "Infinite Cinema Marquee"
// Continuous horizontal marquee of vertical video cards (auto-scrolls slowly).
// Hover any card → marquee pauses + card grows + plays inline (muted).
// Click → fullscreen lightbox modal with controls.
// Background: dark with sweeping film-projector light beams.
//
// Source videos: TAC's own patient testimonials, downloaded + compressed
// (~60 MB total, premium quality preserved with bitrate caps).
import { useEffect, useRef, useState } from 'react'

type Testimonial = {
  id: string
  name: string
  short: string
  video: string
  poster: string
  orientation: 'vertical' | 'horizontal'
}

// Source: theantiagingcentre.com — 4 actual patient video testimonials
const TESTIMONIALS: Testimonial[] = [
  {
    id: 'abhinav',
    name: 'Mr. Abhinav Saxena',
    short: 'Patient Story',
    video: '/videos/testimonials/abhinav.mp4',
    poster: '/videos/testimonials/posters/abhinav.webp',
    orientation: 'vertical',
  },
  {
    id: 'bhushan',
    name: 'Mr. Bhushan Kamble',
    short: 'Patient Story',
    video: '/videos/testimonials/bhushan.mp4',
    poster: '/videos/testimonials/posters/bhushan.png',
    orientation: 'vertical',
  },
  {
    id: 'gomez',
    name: 'Mr. Shaun Gomez',
    short: 'Patient Story',
    video: '/videos/testimonials/gomez.mp4',
    poster: '/videos/testimonials/posters/gomez.png',
    orientation: 'horizontal',
  },
  {
    id: 'sadhna',
    name: 'Mrs. Sadhna Gupta',
    short: 'Patient Story',
    video: '/videos/testimonials/sadhna.mp4',
    poster: '/videos/testimonials/posters/sadhna.png',
    orientation: 'vertical',
  },
]

export function VideoTestimonials() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const cardRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Lock body scroll when modal open
  useEffect(() => {
    if (openIdx !== null) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [openIdx])

  // Cards duplicated 2x for seamless infinite marquee
  const items = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 50% 0%, #1d1614 0%, #0d0908 70%)',
      }}
    >
      {/* Sweeping projector light beams */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div
          className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] opacity-40"
          style={{
            background:
              'conic-gradient(from 70deg at 50% 0%, transparent 0deg, rgba(178,122,123,0.18) 18deg, transparent 30deg, transparent 100deg, rgba(178,122,123,0.10) 110deg, transparent 130deg)',
            animation: 'tac-projector-sweep 22s ease-in-out infinite alternate',
          }}
        />
      </div>
      <style>{`
        @keyframes tac-projector-sweep {
          0% { transform: translateX(-50%) rotate(0deg); }
          100% { transform: translateX(-50%) rotate(20deg); }
        }
        @keyframes tac-marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .tac-cinema-track {
          animation: tac-marquee-scroll 40s linear infinite;
        }
        .tac-cinema-wrap:hover .tac-cinema-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-12 mb-12 md:mb-16 text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="w-7 h-px bg-rust-soft" />
          <span className="text-[11px] tracking-[0.32em] text-rust-soft font-semibold uppercase">
            Patient Stories
          </span>
          <span className="w-7 h-px bg-rust-soft" />
        </div>
        <h2 className="font-display font-bold text-[36px] md:text-[56px] leading-[1.0] tracking-[-0.03em] text-white">
          Here's what our patients say.
        </h2>
        <p className="mt-5 text-[14px] md:text-[15px] text-white/55 font-light max-w-[460px] mx-auto">
          Hover any card to preview · click to watch the full story.
        </p>
      </div>

      {/* Marquee */}
      <div className="tac-cinema-wrap relative w-full overflow-hidden">
        {/* Edge fade gradients */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(13,9,8,1) 0%, rgba(13,9,8,0) 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(-90deg, rgba(13,9,8,1) 0%, rgba(13,9,8,0) 100%)',
          }}
        />

        {/* The scrolling track */}
        <div
          className="tac-cinema-track flex items-center gap-6 md:gap-8 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {items.map((t, idx) => {
            const realIdx = idx % TESTIMONIALS.length
            return (
              <div
                key={`${t.id}-${idx}`}
                className="group relative shrink-0 cursor-pointer transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.06]"
                style={{ width: '280px' }}
                onMouseEnter={() => {
                  const v = cardRefs.current[idx]
                  if (v) {
                    v.muted = true
                    v.currentTime = 0
                    v.play().catch(() => {})
                  }
                }}
                onMouseLeave={() => {
                  const v = cardRefs.current[idx]
                  if (v) v.pause()
                }}
                onClick={() => setOpenIdx(realIdx)}
              >
                <div
                  className="relative rounded-[20px] overflow-hidden bg-black border border-white/10 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)]"
                  style={{ aspectRatio: '9/14' }}
                >
                  <video
                    ref={(el) => {
                      cardRefs.current[idx] = el
                    }}
                    src={t.video}
                    poster={t.poster}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Bottom shade */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.85) 100%)',
                    }}
                  />

                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-500 group-hover:bg-rust group-hover:border-rust group-hover:scale-110">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom name */}
                  <div className="absolute inset-x-0 bottom-0 px-4 py-3.5 text-white">
                    <div className="text-[13px] font-semibold tracking-tight leading-tight">
                      {t.name}
                    </div>
                    <div className="text-[9.5px] tracking-[0.22em] uppercase text-white/60 mt-0.5 font-medium">
                      {t.short}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox modal */}
      {openIdx !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/85 backdrop-blur-md"
          onClick={() => setOpenIdx(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIdx(null)}
            aria-label="Close testimonial"
            className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/30 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div
            className="relative max-w-[480px] w-full"
            onClick={(e) => e.stopPropagation()}
            style={{
              aspectRatio:
                TESTIMONIALS[openIdx].orientation === 'horizontal'
                  ? '16/9'
                  : '9/16',
            }}
          >
            <video
              src={TESTIMONIALS[openIdx].video}
              poster={TESTIMONIALS[openIdx].poster}
              controls
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full rounded-[20px] bg-black object-cover"
            />
            <div className="absolute -bottom-12 left-0 right-0 text-center text-white">
              <div className="font-display font-bold text-[20px] md:text-[24px] tracking-tight">
                {TESTIMONIALS[openIdx].name}
              </div>
              <div className="text-[10px] tracking-[0.28em] uppercase text-white/60 font-medium mt-1">
                The Anti-Aging Centre · Patient
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
