import { HelixE } from './scenes/HelixE'
import { HelixF } from './scenes/HelixF'
import { HelixG } from './scenes/HelixG'
import { HelixH } from './scenes/HelixH'

const OPTIONS = [
  {
    key: 'E',
    title: 'Horizontal Drift Helix',
    desc:
      'Long DNA strand laying horizontally — slowly drifts and rotates along its long axis. Cursor tilts the strand. Most editorial / wide-cinematic.',
    Scene: HelixE,
    accent: '#c46e5d',
  },
  {
    key: 'F',
    title: 'Wide Particle Wave Field',
    desc:
      '5,000+ particles forming a flat double-strand pattern across the hero. Cursor sends ripples through the field. Very ambient and alive.',
    Scene: HelixF,
    accent: '#e09578',
  },
  {
    key: 'G',
    title: 'DNA Tunnel · Fly-Through',
    desc:
      "Camera flies through the inside of a long helix — endless depth tunnel. Cursor steers the flight. Most immersive / 'sci-fi' premium.",
    Scene: HelixG,
    accent: '#f7c8af',
  },
  {
    key: 'H',
    title: 'Liquid Wave · Cursor Distort',
    desc:
      'Mirror-finish copper DNA wave undulating across the hero like a river. Cursor distorts the wave shape in real time. Boldest luxury.',
    Scene: HelixH,
    accent: '#ed9c7c',
  },
]

export function DnaPreviewPage() {
  return (
    <div className="min-h-screen bg-[#0a0606] text-white">
      <header className="px-6 md:px-10 py-7 border-b border-white/10 flex items-center justify-between">
        <div>
          <div className="text-[10px] tracking-[0.32em] text-rose-300/80 uppercase font-semibold mb-1">
            DNA Background — Wide Hero Options
          </div>
          <h1 className="text-[20px] md:text-[26px] font-semibold tracking-tight">
            Choose your hero motion
          </h1>
        </div>
        <a
          href="/"
          className="text-[11px] tracking-[0.25em] uppercase text-white/70 hover:text-white border border-white/20 hover:border-white/60 rounded-full px-5 py-2.5 transition-colors"
        >
          ← Back to site
        </a>
      </header>

      {/* Stacked wide cards (one per row) so each scene gets full hero proportions */}
      <main className="flex flex-col gap-6 p-4 md:p-6">
        {OPTIONS.map((opt) => (
          <article
            key={opt.key}
            className="relative bg-[#13090a] rounded-2xl overflow-hidden border border-white/10"
          >
            <div className="grid md:grid-cols-[1fr_320px]">
              {/* Wide live scene — hero-like proportion */}
              <div className="relative aspect-[21/9] md:aspect-auto md:h-[440px] w-full">
                <opt.Scene />
                <div
                  className="absolute top-5 left-6 font-display text-[64px] md:text-[88px] font-bold leading-none tracking-tight pointer-events-none mix-blend-screen"
                  style={{ color: opt.accent }}
                >
                  {opt.key}
                </div>
              </div>
              {/* Meta side panel */}
              <div className="p-7 md:p-8 border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-between">
                <div>
                  <h3 className="text-[18px] md:text-[20px] font-semibold tracking-tight mb-3">
                    Option {opt.key}
                    <br />
                    <span className="text-white/70 font-normal">{opt.title}</span>
                  </h3>
                  <p className="text-[13.5px] md:text-[14px] text-white/65 leading-[1.65] font-light">
                    {opt.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-[10.5px] tracking-[0.28em] uppercase text-white/55">
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ background: opt.accent }}
                  />
                  Hover the canvas to interact
                </div>
              </div>
            </div>
          </article>
        ))}
      </main>

      <footer className="px-6 md:px-10 py-8 border-t border-white/10 text-center text-[12px] text-white/55">
        Hover / move cursor inside each wide canvas → see the interactivity. Pick
        E, F, G or H and tell me — I'll integrate it as the actual hero
        background with overlay so headline stays sharp.
      </footer>
    </div>
  )
}
