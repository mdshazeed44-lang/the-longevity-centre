// Faq — homepage FAQ accordion. Sits between ClinicsBand and CtaBand
// so visitors with last-mile questions get answers before the final
// CTA. Mirrors the LongevityProgramPage accordion pattern (numbered
// rows, plus icon that rotates to a close mark on open) so the brand
// system stays consistent across pages.

import { useState } from 'react'
import { HOMEPAGE_FAQS as FAQS } from '../../lib/faqs'

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-cream/40 py-16 md:py-20 px-6 md:px-12">
      {/* FAQPage JSON-LD is pre-baked into the static <head> by
          scripts/inject-meta.cjs (for /, and the two ad LPs) from the same
          src/lib/faqs.ts source — so there's exactly ONE FAQPage node per
          page and it's visible to non-JS crawlers. Do NOT re-emit it here. */}

      <div className="max-w-[920px] mx-auto">
        <div className="text-center mb-12 md:mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-7 h-px bg-rust" />
            <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
              FAQ
            </span>
            <span className="w-7 h-px bg-rust" />
          </div>
          <h2 className="font-display font-bold text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.03em] text-ink">
            Things people ask us.
          </h2>
        </div>

        <ul className="border-t border-mist">
          {FAQS.map((f, i) => {
            const open = openIndex === i
            return (
              <li key={i} className="border-b border-mist">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={`home-faq-panel-${i}`}
                  data-cursor="hover"
                  className="w-full text-left py-5 md:py-6 flex items-start gap-4 md:gap-7 group"
                >
                  <span className="font-display font-bold text-[12px] md:text-[13px] text-rust tabular-nums tracking-tight pt-1 shrink-0 w-7">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 font-display font-semibold text-[16px] md:text-[18px] leading-[1.35] tracking-[-0.01em] text-ink group-hover:text-rust-deep transition-colors duration-300">
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
                      open
                        ? 'bg-ink text-white border-ink rotate-45'
                        : 'border-mist text-ink group-hover:border-rust/60'
                    }`}
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      focusable="false"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
                <div
                  id={`home-faq-panel-${i}`}
                  className="overflow-hidden transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] grid"
                  style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                >
                  <div className="min-h-0">
                    <div className="pb-6 md:pb-7 pl-11 md:pl-14 pr-2 md:pr-14 text-[14px] md:text-[15px] leading-[1.7] text-graphite font-light">
                      {f.a}
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
