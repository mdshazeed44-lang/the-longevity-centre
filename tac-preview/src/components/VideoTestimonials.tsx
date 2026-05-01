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
  index: string
  name: string
  tag: string          // TAC programme category (no fabricated metrics)
  video: string
  poster: string
  orientation: 'vertical' | 'horizontal'
}

// Source: theantiagingcentre.com — 4 actual patient video testimonials.
// `tag` maps each story to one of TAC's five flagship programmes — never
// invent specific outcome numbers (weight lost, biomarker drops, etc.).
const TESTIMONIALS: Testimonial[] = [
  {
    id: 'abhinav',
    index: '01',
    name: 'Mr. Abhinav Saxena',
    tag: 'Metabolic Health',
    video: '/videos/testimonials/abhinav.mp4',
    poster: '/videos/testimonials/posters/abhinav.webp',
    orientation: 'vertical',
  },
  {
    id: 'bhushan',
    index: '02',
    name: 'Mr. Bhushan Kamble',
    tag: 'Weight & Composition',
    video: '/videos/testimonials/bhushan.mp4',
    poster: '/videos/testimonials/posters/bhushan.png',
    orientation: 'vertical',
  },
  {
    id: 'gomez',
    index: '03',
    name: 'Mr. Shaun Gomez',
    tag: 'Vitality',
    video: '/videos/testimonials/gomez.mp4',
    poster: '/videos/testimonials/posters/gomez.png',
    orientation: 'horizontal',
  },
  {
    id: 'sadhna',
    index: '04',
    name: 'Mrs. Sadhna Gupta',
    tag: 'Longevity Plus',
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
      className="relative py-12 md:py-14 overflow-hidden"
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
          animation: tac-marquee-scroll 50s linear infinite;
        }
        .tac-cinema-wrap:hover .tac-cinema-track {
          animation-play-state: paused;
        }
        /* Dim non-hovered cards when track is hovered, lift the active one */
        .tac-cinema-wrap:hover .tac-cinema-card { opacity: 0.55; transform: scale(0.97); }
        .tac-cinema-card { transition: opacity 600ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1); }
        .tac-cinema-card:hover { opacity: 1 !important; transform: scale(1.04) !important; }
        .tac-cinema-card:hover .tac-card-frame {
          border-color: rgba(178,122,123,0.45);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.06) inset,
            0 0 0 1px rgba(178,122,123,0.18),
            0 50px 90px -40px rgba(148,84,85,0.55),
            0 30px 60px -25px rgba(0,0,0,0.7);
        }
        .tac-cinema-card:hover .tac-card-glow { opacity: 1; }
        .tac-cinema-card:hover .tac-card-cta { opacity: 1; transform: translateX(0); }
        .tac-cinema-card:hover .tac-card-meta-line { width: 36px; }
      `}</style>

      {/* Header */}
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-12 mb-9 md:mb-12 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="w-7 h-px bg-rust-soft" />
          <span className="text-[11px] tracking-[0.32em] text-rust-soft font-semibold uppercase">
            Patient Stories · Unscripted
          </span>
          <span className="w-7 h-px bg-rust-soft" />
        </div>
        <h2 className="font-display font-bold text-[28px] md:text-[40px] xl:text-[44px] leading-[1.05] tracking-[-0.03em] text-white">
          In their <span className="italic font-medium text-rust-soft">own</span> words.
        </h2>
        <p className="mt-3 text-[13px] md:text-[14px] text-white/65 font-light max-w-[460px] mx-auto leading-[1.55]">
          No scripts, no actors. Real TAC patients, recorded in our clinics.
          Hover to preview · click for the full story.
        </p>
        {/* Spec row — small editorial credits */}
        <div className="mt-5 inline-flex items-center gap-4 text-[10px] md:text-[10.5px] tracking-[0.28em] uppercase text-white/40 font-medium">
          <span>04 Stories</span>
          <span aria-hidden className="w-1 h-1 rounded-full bg-white/30" />
          <span>Verified TAC Patients</span>
          <span aria-hidden className="w-1 h-1 rounded-full bg-white/30" />
          <span>Filmed On Location</span>
        </div>
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
          className="tac-cinema-track flex items-center gap-5 md:gap-6 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {items.map((t, idx) => {
            const realIdx = idx % TESTIMONIALS.length
            // First name for compact display badge; e.g. "Mr. Abhinav Saxena" → "ABHINAV"
            const firstName = t.name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s/, '').split(' ')[0]
            return (
              <div
                key={`${t.id}-${idx}`}
                className="tac-cinema-card group relative shrink-0 cursor-pointer"
                style={{ width: '244px' }}
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
                {/* Rust ambient glow behind card — only on hover */}
                <div
                  aria-hidden
                  className="tac-card-glow absolute -inset-3 rounded-[24px] opacity-0 transition-opacity duration-700 pointer-events-none -z-0"
                  style={{
                    background:
                      'radial-gradient(60% 60% at 50% 50%, rgba(178,122,123,0.25), transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                />

                <div
                  className="tac-card-frame relative rounded-[18px] overflow-hidden bg-black border border-white/12 transition-all duration-700"
                  style={{
                    aspectRatio: '9/13',
                    boxShadow:
                      '0 1px 0 rgba(255,255,255,0.05) inset, 0 30px 60px -25px rgba(0,0,0,0.7)',
                  }}
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

                  {/* Subtle inner highlight at top — gives the frame a glossy ridge */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
                    }}
                  />

                  {/* Top-left film slate corner — index + status dot */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 backdrop-blur-md bg-black/35 border border-white/12 rounded-full pl-2 pr-3 py-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span aria-hidden className="absolute inline-flex h-full w-full rounded-full bg-rust-soft opacity-70 animate-ping" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rust-soft" />
                    </span>
                    <span className="font-display font-bold text-[10px] text-white/90 tabular-nums tracking-[0.18em]">
                      {t.index} / {String(TESTIMONIALS.length).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Top-right quote glyph — editorial detail */}
                  <div
                    aria-hidden
                    className="absolute top-3 right-3 font-display text-[28px] leading-none text-white/30 group-hover:text-rust-soft/80 transition-colors duration-700 select-none"
                  >
                    “
                  </div>

                  {/* Vignette + bottom shade for legibility of overlay text */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.0) 22%, rgba(0,0,0,0.0) 55%, rgba(0,0,0,0.92) 100%)',
                    }}
                  />

                  {/* Centre play disc — refined: glass + rust ring on hover */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative">
                      {/* Pulsing ring (only animated on hover via group) */}
                      <div
                        aria-hidden
                        className="absolute inset-0 rounded-full border border-rust-soft/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-ping"
                      />
                      <div className="relative w-12 h-12 rounded-full bg-white/12 backdrop-blur-md border border-white/35 flex items-center justify-center transition-all duration-500 group-hover:bg-rust group-hover:border-rust group-hover:scale-105 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="white" className="ml-0.5">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Bottom info card — overlay with structure */}
                  <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-10 text-white">
                    {/* Programme tag chip */}
                    <div className="inline-flex items-center gap-1.5 backdrop-blur-md bg-white/[0.08] border border-white/15 rounded-full px-2.5 py-1 mb-2.5">
                      <span aria-hidden className="w-1 h-1 rounded-full bg-rust-soft" />
                      <span className="text-[8.5px] tracking-[0.28em] uppercase text-white/85 font-semibold">
                        {t.tag}
                      </span>
                    </div>
                    {/* Display name — first name in larger display, full name as caption */}
                    <div className="font-display font-bold text-[20px] leading-[1.0] tracking-[-0.015em] text-white uppercase">
                      {firstName}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span aria-hidden className="tac-card-meta-line block h-px w-3 bg-rust-soft transition-all duration-500" />
                      <span className="text-[9.5px] tracking-[0.22em] uppercase text-white/65 font-medium leading-none">
                        {t.name}
                      </span>
                    </div>

                    {/* Hover-revealed CTA — slides in from left */}
                    <div className="tac-card-cta mt-3 flex items-center gap-1.5 opacity-0 -translate-x-1 transition-all duration-500 text-[9.5px] tracking-[0.28em] uppercase text-rust-soft font-semibold">
                      Watch full story
                      <span aria-hidden>→</span>
                    </div>
                  </div>

                  {/* Top-right corner — runtime label, only on hover */}
                  <div className="absolute top-3 right-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="text-[9px] tracking-[0.28em] uppercase text-white/55 font-medium">
                      Verbatim
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
