/**
 * BenefitsMobileDemoPage — TEMP demo page at /benefits-mobile-demo.
 *
 * Purpose: the homepage / LP Benefits section (8 cards) stacks
 * vertically on mobile and reads as one very long scroll. This page
 * shows SIX candidate mobile-only treatments side by side so the
 * client can pick one. Each option renders inside a 390px "phone
 * frame" so it can be previewed on desktop too.
 *
 * Once an option is picked, it will be implemented INSIDE
 * BenefitsHome.tsx as the `lg:hidden` mobile branch (desktop grid
 * stays exactly as-is), and this demo page gets deleted.
 *
 * NOT in sitemap.xml / inject-meta — intentionally unindexed temp page.
 */
import { useState } from 'react'

type Benefit = {
  n: string
  title: string
  body: string
  img: string
  alt: string
}

const BENEFITS: Benefit[] = [
  { n: '01', title: 'Lower biological age', body: 'Three validated epigenetic clocks tracked over time. Many patients see measurable reduction in biological age with sustained intervention.', img: '/longevity/brand/mood-forest-light.jpg', alt: 'Forest light' },
  { n: '02', title: 'Relieving stress', body: 'Lower cortisol, calmer nervous system. Targeted protocols restore equilibrium so daily pressure stops shaping your biology.', img: '/longevity/brand/mood-zen-sand.jpg', alt: 'Zen sand' },
  { n: '03', title: 'Ideal body composition', body: 'Optimised fat percentage, preserved lean mass. BCA-tracked, physician-guided — measured beyond the scale.', img: '/longevity/body-composition-pose.jpg', alt: 'Nutrition bowl' },
  { n: '04', title: 'Deeper, restorative sleep', body: 'The undisturbed sleep you deserve. We address circadian rhythm, hormonal balance, and gut health together.', img: '/longevity/brand/mood-water-ripple.jpg', alt: 'Water ripple' },
  { n: '05', title: 'Higher energy levels', body: 'Mitochondrial efficiency restored. Stop relying on caffeine — your cellular machinery does the work.', img: '/longevity/brand/mood-feet-moss.jpg', alt: 'Feet on moss' },
  { n: '06', title: 'Better performance', body: 'Stronger, more resilient performance. Personalised diagnostics turn training into measurable adaptation.', img: '/longevity/performance-cyclist-v2.jpg', alt: 'Cyclist' },
  { n: '07', title: 'Sharper memory & cognition', body: 'Brain biochemistry supported through nutrition, methylation, and gut–brain axis correction.', img: '/longevity/brand/mood-leaf-skeleton.jpg', alt: 'Skeleton leaf' },
  { n: '08', title: 'Enhanced sexual health', body: 'Hormonal balance restored — male and female. A measurable return of vitality, intimacy, and confidence.', img: '/longevity/brand/mood-hands-pose.jpg', alt: 'Hands pose' },
]

// Shared section header used inside each phone frame so every option
// looks like the real section, not a bare widget.
function MiniHeader() {
  return (
    <div className="mb-6">
      <div className="text-[9.5px] tracking-[0.4em] uppercase text-rust font-semibold mb-3">
        — Benefits —
      </div>
      <h2 className="font-display font-light text-[26px] leading-[1.08] tracking-[-0.02em] text-ink">
        More than longer life.
        <br />
        <span className="font-bold text-rust">Better life, measurably.</span>
      </h2>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   OPTION 1 — CLIENT'S PICK: single card + tiny left/right buttons
   One image + benefit at a time. Small, cute, minimal arrow pills
   below the card. Dot indicators between the arrows.
   ════════════════════════════════════════════════════════════════════ */
function Option1Carousel() {
  const [i, setI] = useState(0)
  const b = BENEFITS[i]
  const prev = () => setI((i - 1 + BENEFITS.length) % BENEFITS.length)
  const next = () => setI((i + 1) % BENEFITS.length)
  return (
    <div>
      <MiniHeader />
      <article key={b.n}>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[14px] bg-mist mb-5">
          <img src={b.img} alt={b.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-rust text-[10px] font-display font-semibold px-2.5 py-1 rounded-full tabular-nums">
            {b.n} / 08
          </span>
        </div>
        <h3 className="font-display font-bold text-[19px] leading-[1.2] tracking-[-0.015em] text-ink mb-2.5">{b.title}</h3>
        <span aria-hidden className="block h-px w-6 bg-rust mb-3" />
        <p className="text-[13.5px] leading-[1.6] text-graphite font-light min-h-[84px]">{b.body}</p>
      </article>

      {/* Tiny cute arrows + dots */}
      <div className="mt-5 flex items-center justify-between">
        <button type="button" onClick={prev} aria-label="Previous benefit"
          className="w-9 h-9 rounded-full border border-ink/15 bg-white flex items-center justify-center text-ink hover:border-rust hover:text-rust transition-colors">
          <span aria-hidden className="text-[14px] leading-none">←</span>
        </button>
        <div className="flex items-center gap-1.5">
          {BENEFITS.map((_, d) => (
            <button key={d} type="button" onClick={() => setI(d)} aria-label={`Go to benefit ${d + 1}`}
              className={`rounded-full transition-all duration-300 ${d === i ? 'w-4 h-1.5 bg-rust' : 'w-1.5 h-1.5 bg-ink/20'}`} />
          ))}
        </div>
        <button type="button" onClick={next} aria-label="Next benefit"
          className="w-9 h-9 rounded-full border border-ink/15 bg-white flex items-center justify-center text-ink hover:border-rust hover:text-rust transition-colors">
          <span aria-hidden className="text-[14px] leading-none">→</span>
        </button>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   OPTION 2 — NATIVE SWIPE CAROUSEL (scroll-snap, next-card peek)
   No buttons — thumb-swipe like Instagram. The next card peeks in
   from the right edge so users instantly know it scrolls.
   ════════════════════════════════════════════════════════════════════ */
function Option2Swipe() {
  return (
    <div>
      <MiniHeader />
      <div className="-mx-5 px-5 flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none" style={{ scrollbarWidth: 'none' }}>
        {BENEFITS.map((b) => (
          <article key={b.n} className="snap-start shrink-0 w-[78%]">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[14px] bg-mist mb-4">
              <img src={b.img} alt={b.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <h3 className="font-display font-bold text-[16.5px] leading-[1.2] text-ink mb-2">{b.title}</h3>
            <span aria-hidden className="block h-px w-6 bg-rust mb-2.5" />
            <p className="text-[12.5px] leading-[1.55] text-graphite font-light">{b.body}</p>
          </article>
        ))}
      </div>
      <p className="mt-4 text-center text-[10px] tracking-[0.3em] uppercase text-stone font-semibold">
        Swipe →
      </p>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   OPTION 3 — COMPACT 2-COLUMN MINI GRID
   Same 8 cards but half-size: square thumbnails, title only, body
   hidden. Total section height ≈ 1/3 of the current stack.
   ════════════════════════════════════════════════════════════════════ */
function Option3MiniGrid() {
  return (
    <div>
      <MiniHeader />
      <div className="grid grid-cols-2 gap-3">
        {BENEFITS.map((b) => (
          <article key={b.n}>
            <div className="relative aspect-square w-full overflow-hidden rounded-[12px] bg-mist mb-2.5">
              <img src={b.img} alt={b.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <h3 className="font-display font-semibold text-[13px] leading-[1.25] text-ink">{b.title}</h3>
          </article>
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   OPTION 4 — ACCORDION LIST (thumbnail + title rows, tap to expand)
   Editorial list — tiny round thumbnail, title, plus icon. Tap any
   row to reveal the body. Whole section is ~8 compact rows tall.
   ════════════════════════════════════════════════════════════════════ */
function Option4Accordion() {
  return (
    <div>
      <MiniHeader />
      <div className="divide-y divide-ink/10 border-y border-ink/10">
        {BENEFITS.map((b) => (
          <details key={b.n} className="group py-3.5">
            <summary className="cursor-pointer list-none flex items-center gap-3.5">
              <span className="relative w-11 h-11 shrink-0 overflow-hidden rounded-full bg-mist">
                <img src={b.img} alt={b.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              </span>
              <span className="flex-1 font-display font-semibold text-[14.5px] leading-[1.25] text-ink">{b.title}</span>
              <span aria-hidden className="shrink-0 w-6 h-6 rounded-full border border-ink/20 flex items-center justify-center text-rust text-[12px] transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 pl-[58px] text-[12.5px] leading-[1.6] text-graphite font-light">{b.body}</p>
          </details>
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   OPTION 5 — NUMBERED EDITORIAL LIST (no images)
   Pure typography — rust numerals 01-08 + title + one-line body.
   Fastest to scan, smallest height, magazine index feel.
   ════════════════════════════════════════════════════════════════════ */
function Option5NumberedList() {
  return (
    <div>
      <MiniHeader />
      <ol className="divide-y divide-ink/10 border-y border-ink/10">
        {BENEFITS.map((b) => (
          <li key={b.n} className="py-4 flex items-start gap-4">
            <span className="font-display font-light text-rust text-[22px] leading-none tabular-nums tracking-tight pt-0.5 shrink-0">{b.n}</span>
            <div>
              <h3 className="font-display font-semibold text-[14.5px] leading-[1.25] text-ink mb-1">{b.title}</h3>
              <p className="text-[12px] leading-[1.55] text-graphite font-light line-clamp-2">{b.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   OPTION 6 — HERO CARD + STORY DOTS (tap dots, image-led)
   One tall full-bleed image card with the text overlaid on a dark
   gradient at the bottom. Instagram-stories-style segmented bars at
   the top — tap any bar to jump. Most visual, premium feel.
   ════════════════════════════════════════════════════════════════════ */
function Option6StoryCard() {
  const [i, setI] = useState(0)
  const b = BENEFITS[i]
  return (
    <div>
      <MiniHeader />
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[18px] bg-ink">
        <img key={b.n} src={b.img} alt={b.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(27,26,24,0.35) 0%, transparent 30%, transparent 45%, rgba(27,26,24,0.88) 100%)' }} />
        {/* Story bars */}
        <div className="absolute top-3 inset-x-3 flex gap-1">
          {BENEFITS.map((_, d) => (
            <button key={d} type="button" onClick={() => setI(d)} aria-label={`Benefit ${d + 1}`}
              className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${d <= i ? 'bg-white' : 'bg-white/30'}`} />
          ))}
        </div>
        {/* Overlay copy */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="text-[10px] tracking-[0.32em] uppercase text-white/60 font-semibold mb-1.5">{b.n} / 08</div>
          <h3 className="font-display font-bold text-white text-[20px] leading-[1.15] mb-2">{b.title}</h3>
          <p className="text-[12.5px] leading-[1.55] text-white/75 font-light">{b.body}</p>
        </div>
        {/* Invisible tap zones — left third = prev, right two-thirds = next */}
        <button type="button" aria-label="Previous" onClick={() => setI((i - 1 + BENEFITS.length) % BENEFITS.length)} className="absolute inset-y-0 left-0 w-1/3" />
        <button type="button" aria-label="Next" onClick={() => setI((i + 1) % BENEFITS.length)} className="absolute inset-y-0 right-0 w-1/3" />
      </div>
      <p className="mt-3 text-center text-[10px] tracking-[0.3em] uppercase text-stone font-semibold">
        Tap left / right to navigate
      </p>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   PAGE — all six options inside phone frames
   ════════════════════════════════════════════════════════════════════ */

const OPTIONS: { id: string; label: string; note: string; Comp: () => React.ReactElement }[] = [
  { id: '1', label: 'Option 1 — Single Card + Arrows (aapka idea)', note: '1 image + benefit, neeche chote cute ← → buttons + dots. Tap-driven, ekdum minimal.', Comp: Option1Carousel },
  { id: '2', label: 'Option 2 — Native Swipe (next-card peek)', note: 'Instagram jaisa thumb-swipe. Agla card right edge se jhaank-ta hai — koi button nahi chahiye.', Comp: Option2Swipe },
  { id: '3', label: 'Option 3 — Compact 2-Column Mini Grid', note: 'Same 8 cards, half-size square images, sirf title. Section height ~1/3 ho jaati hai.', Comp: Option3MiniGrid },
  { id: '4', label: 'Option 4 — Accordion List (tap to expand)', note: 'Chhoti round thumbnail + title rows. Tap karke description khulti hai. Bahut compact.', Comp: Option4Accordion },
  { id: '5', label: 'Option 5 — Numbered Editorial List (no images)', note: 'Pure typography — rust 01-08 numerals + title + 2-line body. Sabse chhota, magazine-index feel.', Comp: Option5NumberedList },
  { id: '6', label: 'Option 6 — Story Card (tap dots, image-led)', note: 'Ek full-bleed image card, text neeche dark gradient pe. Upar Instagram-stories bars. Sabse premium visual.', Comp: Option6StoryCard },
]

export function BenefitsMobileDemoPage() {
  return (
    <main className="bg-[#efeae2] min-h-screen px-4 py-10 md:py-16">
      <div className="max-w-[1400px] mx-auto">
        <header className="text-center mb-10 md:mb-14">
          <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-4">
            — Temp Demo · Mobile Benefits Section —
          </div>
          <h1 className="font-display font-light text-[28px] md:text-[40px] leading-[1.1] tracking-[-0.02em] text-ink max-w-[760px] mx-auto">
            6 mobile treatments.{' '}
            <span className="font-bold italic text-rust">Pick one.</span>
          </h1>
          <p className="mt-4 text-[13.5px] md:text-[15px] leading-[1.6] text-graphite font-light max-w-[560px] mx-auto">
            Har option ek 390px phone-frame mein render ho raha hai. Jo pasand
            aaye uska number bata do — wahi mobile view mein implement hoga.
            Desktop ka 4-column grid bilkul untouched rahega.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 items-start">
          {OPTIONS.map(({ id, label, note, Comp }) => (
            <section key={id} className="flex flex-col items-center">
              <div className="w-full max-w-[420px] mb-4">
                <h2 className="font-display font-semibold text-[15px] md:text-[16px] leading-[1.3] text-ink mb-1">{label}</h2>
                <p className="text-[12px] leading-[1.55] text-graphite font-light">{note}</p>
              </div>
              {/* Phone frame */}
              <div className="w-full max-w-[390px] bg-white rounded-[28px] border border-ink/15 shadow-[0_30px_70px_-30px_rgba(27,26,24,0.35)] overflow-hidden">
                <div aria-hidden className="h-7 bg-ink flex items-center justify-center">
                  <span className="w-16 h-[5px] rounded-full bg-white/25" />
                </div>
                <div className="p-5">
                  <Comp />
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
