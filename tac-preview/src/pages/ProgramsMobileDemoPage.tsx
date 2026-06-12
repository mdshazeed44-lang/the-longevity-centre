/**
 * ProgramsMobileDemoPage — TEMP demo page at /programs-mobile-demo.
 *
 * The homepage "Seven programmes. One foundation." section renders
 * 7 large zig-zag cards which stack into a very long scroll on
 * mobile. This page shows SIX candidate mobile-only treatments so
 * the client can pick one — same decision flow we used for the
 * Benefits section (winner there: Story Card).
 *
 * Each option renders inside a 390px phone frame. Desktop layout
 * is NOT changing — the winning option will be implemented as the
 * `lg:hidden` / `sm:hidden` mobile branch inside ProgramsHome.tsx,
 * then this page gets deleted.
 *
 * NOT in sitemap.xml / inject-meta — intentionally unindexed temp page.
 */
import { useState } from 'react'
import { PROGRAMS } from '../lib/programs'

const ITEMS = PROGRAMS.map((p) => ({
  slug: p.slug,
  cat: p.cat,
  title: p.shortTitle,
  tag: p.tag,
  desc: p.desc,
  img: p.cardImg,
}))

function MiniHeader() {
  return (
    <div className="mb-6">
      <div className="text-[9.5px] tracking-[0.4em] uppercase text-rust font-semibold mb-3">
        — Our Programmes —
      </div>
      <h2 className="font-display font-light text-[26px] leading-[1.08] tracking-[-0.02em] text-ink">
        Seven programmes.
        <br />
        <span className="font-bold text-rust">One foundation.</span>
      </h2>
    </div>
  )
}

function CtaPair({ slug }: { slug: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href="/contact"
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink text-white text-[9.5px] tracking-[0.2em] font-semibold uppercase rounded-full"
        onClick={(e) => e.preventDefault()}
      >
        Arrange a Consultation →
      </a>
      <a
        href={`/programs/${slug}`}
        className="inline-flex items-center px-4 py-2.5 border border-ink/15 text-ink text-[9.5px] tracking-[0.2em] font-semibold uppercase rounded-full"
        onClick={(e) => e.preventDefault()}
      >
        Learn More
      </a>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   OPTION 1 — STORY CARD (Benefits winner — consistency pick)
   Full-bleed image, text on bottom gradient, story bars on top,
   tap left/right. Same vocabulary as the approved Benefits card —
   the homepage would read as one continuous design system.
   ════════════════════════════════════════════════════════════════════ */
function Option1StoryCard() {
  const [i, setI] = useState(0)
  const p = ITEMS[i]
  return (
    <div>
      <MiniHeader />
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[18px] bg-ink">
        <img key={p.slug} src={p.img} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(27,26,24,0.35) 0%, transparent 28%, transparent 40%, rgba(27,26,24,0.92) 100%)' }} />
        <div className="absolute top-3 inset-x-3 flex gap-1">
          {ITEMS.map((x, d) => (
            <button key={x.slug} type="button" onClick={() => setI(d)} aria-label={`Programme ${d + 1}`}
              className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${d <= i ? 'bg-white' : 'bg-white/30'}`} />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="text-[9.5px] tracking-[0.3em] uppercase text-white/60 font-semibold mb-1.5">{p.cat} · {p.tag}</div>
          <h3 className="font-display font-bold text-white text-[21px] leading-[1.12] mb-2">{p.title}</h3>
          <p className="text-[12px] leading-[1.5] text-white/75 font-light mb-3 line-clamp-3">{p.desc}</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3.5 py-2 bg-white text-ink text-[9px] tracking-[0.2em] font-semibold uppercase rounded-full">Arrange a Consultation →</span>
            <span className="inline-flex items-center px-3.5 py-2 border border-white/40 text-white text-[9px] tracking-[0.2em] font-semibold uppercase rounded-full">Learn More</span>
          </div>
        </div>
        <button type="button" aria-label="Previous" onClick={() => setI((i - 1 + ITEMS.length) % ITEMS.length)} className="absolute inset-y-0 left-0 w-1/4" />
        <button type="button" aria-label="Next" onClick={() => setI((i + 1) % ITEMS.length)} className="absolute inset-y-0 right-0 w-1/4" />
      </div>
      <p className="mt-3 text-center text-[10px] tracking-[0.3em] uppercase text-stone font-semibold">Tap left / right to navigate</p>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   OPTION 2 — NATIVE SWIPE (next-card peek)
   Horizontal snap carousel — compact card with image top + content
   below. Next card peeks from the right so users know to swipe.
   ════════════════════════════════════════════════════════════════════ */
function Option2Swipe() {
  return (
    <div>
      <MiniHeader />
      <div className="-mx-5 px-5 flex gap-3 overflow-x-auto snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
        {ITEMS.map((p) => (
          <article key={p.slug} className="snap-start shrink-0 w-[82%] bg-white border border-ink/10 rounded-[16px] overflow-hidden">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-mist">
              <img src={p.img} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-rust text-[10px] font-display font-semibold px-2.5 py-1 rounded-full tabular-nums">{p.cat}</span>
            </div>
            <div className="p-4">
              <div className="text-[8.5px] tracking-[0.25em] uppercase text-stone font-semibold mb-1.5">{p.tag}</div>
              <h3 className="font-display font-bold text-[16px] leading-[1.2] text-ink mb-2">{p.title}</h3>
              <p className="text-[11.5px] leading-[1.5] text-graphite font-light mb-3 line-clamp-3">{p.desc}</p>
              <CtaPair slug={p.slug} />
            </div>
          </article>
        ))}
      </div>
      <p className="mt-4 text-center text-[10px] tracking-[0.3em] uppercase text-stone font-semibold">Swipe →</p>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   OPTION 3 — NUMBERED ACCORDION
   01-07 editorial rows: number + title + tag. Tap to expand desc +
   thumbnail + CTAs. Whole section = 7 slim rows. Most compact.
   ════════════════════════════════════════════════════════════════════ */
function Option3Accordion() {
  return (
    <div>
      <MiniHeader />
      <div className="divide-y divide-ink/10 border-y border-ink/10">
        {ITEMS.map((p) => (
          <details key={p.slug} className="group py-3.5">
            <summary className="cursor-pointer list-none flex items-center gap-3.5">
              <span className="font-display font-light text-rust text-[20px] leading-none tabular-nums tracking-tight shrink-0 w-7">{p.cat}</span>
              <span className="flex-1">
                <span className="block font-display font-semibold text-[14.5px] leading-[1.25] text-ink">{p.title}</span>
                <span className="block text-[9px] tracking-[0.22em] uppercase text-stone font-semibold mt-0.5">{p.tag}</span>
              </span>
              <span aria-hidden className="shrink-0 w-6 h-6 rounded-full border border-ink/20 flex items-center justify-center text-rust text-[12px] transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="mt-3 pl-[42px]">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[10px] bg-mist mb-2.5">
                <img src={p.img} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <p className="text-[12px] leading-[1.55] text-graphite font-light mb-3">{p.desc}</p>
              <CtaPair slug={p.slug} />
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   OPTION 4 — SLIM LIST ROWS (thumbnail left, tap-through)
   7 compact horizontal rows — square thumbnail, number, title, tag,
   chevron. Each row is a link to the programme detail page. No
   expand, no carousel — fastest to scan, native list feel.
   ════════════════════════════════════════════════════════════════════ */
function Option4ListRows() {
  return (
    <div>
      <MiniHeader />
      <div className="space-y-2.5">
        {ITEMS.map((p) => (
          <a key={p.slug} href={`/programs/${p.slug}`} onClick={(e) => e.preventDefault()}
            className="flex items-center gap-3.5 bg-white border border-ink/10 rounded-[14px] p-3 hover:border-rust/40 transition-colors">
            <span className="relative w-16 h-16 shrink-0 overflow-hidden rounded-[10px] bg-mist">
              <img src={p.img} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-[8.5px] tracking-[0.22em] uppercase text-rust font-semibold mb-0.5">{p.cat} · {p.tag}</span>
              <span className="block font-display font-semibold text-[14px] leading-[1.2] text-ink truncate">{p.title}</span>
            </span>
            <span aria-hidden className="shrink-0 text-rust text-[16px]">→</span>
          </a>
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   OPTION 5 — CHIP TABS + SINGLE CARD
   Horizontal scrollable chip row (01-07 short names). Selected
   programme renders below as one full card. Direct access to any
   programme without stepping through a carousel.
   ════════════════════════════════════════════════════════════════════ */
function Option5ChipTabs() {
  const [i, setI] = useState(0)
  const p = ITEMS[i]
  return (
    <div>
      <MiniHeader />
      <div className="-mx-5 px-5 flex gap-2 overflow-x-auto pb-1 mb-4" style={{ scrollbarWidth: 'none' }}>
        {ITEMS.map((x, d) => (
          <button key={x.slug} type="button" onClick={() => setI(d)}
            className={`shrink-0 px-3.5 py-2 rounded-full text-[10px] tracking-[0.14em] font-semibold uppercase transition-colors ${d === i ? 'bg-rust text-white' : 'bg-white border border-ink/15 text-graphite'}`}>
            {x.cat} · {x.title.length > 14 ? x.title.slice(0, 13) + '…' : x.title}
          </button>
        ))}
      </div>
      <article key={p.slug} className="bg-white border border-ink/10 rounded-[16px] overflow-hidden">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-mist">
          <img src={p.img} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="p-4">
          <div className="text-[8.5px] tracking-[0.25em] uppercase text-stone font-semibold mb-1.5">{p.tag}</div>
          <h3 className="font-display font-bold text-[17px] leading-[1.2] text-ink mb-2">{p.title}</h3>
          <p className="text-[12px] leading-[1.55] text-graphite font-light mb-3">{p.desc}</p>
          <CtaPair slug={p.slug} />
        </div>
      </article>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   OPTION 6 — SINGLE CARD + ARROWS (Benefits demo Option 1 pattern)
   One compact card at a time — image top, content below — with cute
   minimal ← → pills and dot indicators. Tap-driven.
   ════════════════════════════════════════════════════════════════════ */
function Option6Arrows() {
  const [i, setI] = useState(0)
  const p = ITEMS[i]
  const prev = () => setI((i - 1 + ITEMS.length) % ITEMS.length)
  const next = () => setI((i + 1) % ITEMS.length)
  return (
    <div>
      <MiniHeader />
      <article key={p.slug}>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] bg-mist mb-4">
          <img src={p.img} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-rust text-[10px] font-display font-semibold px-2.5 py-1 rounded-full tabular-nums">{p.cat} / 07</span>
        </div>
        <div className="text-[9px] tracking-[0.25em] uppercase text-stone font-semibold mb-1.5">{p.tag}</div>
        <h3 className="font-display font-bold text-[18px] leading-[1.2] text-ink mb-2">{p.title}</h3>
        <span aria-hidden className="block h-px w-6 bg-rust mb-2.5" />
        <p className="text-[12.5px] leading-[1.55] text-graphite font-light mb-3 min-h-[78px] line-clamp-4">{p.desc}</p>
        <CtaPair slug={p.slug} />
      </article>
      <div className="mt-5 flex items-center justify-between">
        <button type="button" onClick={prev} aria-label="Previous programme"
          className="w-9 h-9 rounded-full border border-ink/15 bg-white flex items-center justify-center text-ink hover:border-rust hover:text-rust transition-colors">
          <span aria-hidden className="text-[14px] leading-none">←</span>
        </button>
        <div className="flex items-center gap-1.5">
          {ITEMS.map((x, d) => (
            <button key={x.slug} type="button" onClick={() => setI(d)} aria-label={`Programme ${d + 1}`}
              className={`rounded-full transition-all duration-300 ${d === i ? 'w-4 h-1.5 bg-rust' : 'w-1.5 h-1.5 bg-ink/20'}`} />
          ))}
        </div>
        <button type="button" onClick={next} aria-label="Next programme"
          className="w-9 h-9 rounded-full border border-ink/15 bg-white flex items-center justify-center text-ink hover:border-rust hover:text-rust transition-colors">
          <span aria-hidden className="text-[14px] leading-none">→</span>
        </button>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════════ */

const OPTIONS: { id: string; label: string; note: string; Comp: () => React.ReactElement }[] = [
  { id: '1', label: 'Option 1 — Story Card (Benefits jaisa hi)', note: 'Full-bleed image + bottom gradient text + stories bars + tap zones. Benefits wale ke saath perfect match — pura homepage ek design system lagega.', Comp: Option1StoryCard },
  { id: '2', label: 'Option 2 — Native Swipe (next-card peek)', note: 'Instagram jaisa thumb-swipe. Compact card — image upar, content + CTAs neeche. Agla card peek karta hai.', Comp: Option2Swipe },
  { id: '3', label: 'Option 3 — Numbered Accordion (01-07)', note: 'Saare 7 programmes ek nazar mein — number + title + tag rows. Tap karke image + desc + CTAs khulti hai. Sabse compact.', Comp: Option3Accordion },
  { id: '4', label: 'Option 4 — Slim List Rows (tap-through)', note: 'Chhoti square thumbnail + title + tag rows. Har row programme detail page ka link. App-jaisa native list feel.', Comp: Option4ListRows },
  { id: '5', label: 'Option 5 — Chip Tabs + Single Card', note: 'Upar scrollable chips (01-07), neeche selected programme ka full card. Kisi bhi programme pe direct jump.', Comp: Option5ChipTabs },
  { id: '6', label: 'Option 6 — Single Card + Arrows', note: 'Ek card at a time, neeche chote cute ← → pills + dots. (Benefits demo ke Option 1 jaisa pattern.)', Comp: Option6Arrows },
]

export function ProgramsMobileDemoPage() {
  return (
    <main className="bg-[#efeae2] min-h-screen px-4 py-10 md:py-16">
      <div className="max-w-[1400px] mx-auto">
        <header className="text-center mb-10 md:mb-14">
          <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-4">
            — Temp Demo · Mobile Programmes Section —
          </div>
          <h1 className="font-display font-light text-[28px] md:text-[40px] leading-[1.1] tracking-[-0.02em] text-ink max-w-[760px] mx-auto">
            6 mobile treatments.{' '}
            <span className="font-bold italic text-rust">Pick one.</span>
          </h1>
          <p className="mt-4 text-[13.5px] md:text-[15px] leading-[1.6] text-graphite font-light max-w-[560px] mx-auto">
            "Seven programmes. One foundation." section ke liye — har option
            390px phone-frame mein. Jo pasand aaye uska number bata do.
            Desktop ka zig-zag layout untouched rahega.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 items-start">
          {OPTIONS.map(({ id, label, note, Comp }) => (
            <section key={id} className="flex flex-col items-center">
              <div className="w-full max-w-[420px] mb-4">
                <h2 className="font-display font-semibold text-[15px] md:text-[16px] leading-[1.3] text-ink mb-1">{label}</h2>
                <p className="text-[12px] leading-[1.55] text-graphite font-light">{note}</p>
              </div>
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
