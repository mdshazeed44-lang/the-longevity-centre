// Faq — homepage FAQ accordion. Sits between ClinicsBand and CtaBand
// so visitors with last-mile questions get answers before the final
// CTA. Mirrors the LongevityProgramPage accordion pattern (numbered
// rows, plus icon that rotates to a close mark on open) so the brand
// system stays consistent across pages.

import { useState } from 'react'

type Faq = { q: string; a: string }

const FAQS: Faq[] = [
  {
    q: "How is TLC's approach different from a regular doctor or health checkup?",
    a: 'TLC goes beyond traditional health checkups — personalised, data-driven diagnostics across metabolic health, genetics, gut microbiome and biological-age clocks, supported by an in-house physician team. Measurement first, intervention second.',
  },
  {
    q: 'Will my plan be personalised, or is it a pre-made protocol?',
    a: 'Fully personalised. We use your own diagnostics — blood, body composition, gut microbiome, genetics, vascular function — to build a protocol tailored to your biology and goals. Two patients on the same programme will rarely follow the same plan.',
  },
  {
    q: 'How useful is TLC if I feel fine?',
    a: 'Most decline begins silently in the forties. Our diagnostics surface sub-clinical drift — early metabolic slowdown, inflammation, hormonal imbalance, genetic risks — so you can intervene years before symptoms appear.',
  },
  {
    q: 'How long does it take to see noticeable results?',
    a: 'Most patients see early shifts (energy, sleep, weight, glucose stability) within the first 4–6 weeks. Deeper biomarker improvements — biological-age, GrimAge, gut diversity — are tracked across re-tests at 6 and 12 months.',
  },
  {
    q: 'Is this in-person or virtual?',
    a: 'Both. We have eight clinics across India (Delhi, Gurgaon, Mumbai, Pune, Nagpur, Goa, Hyderabad, Bangalore) for in-person diagnostics and consultations. Follow-ups, reviews and protocol adjustments are also available virtually.',
  },
  {
    q: 'Is there a consultation fee for the first call?',
    a: 'No. The first 30-minute conversation with our medical team is complimentary. We discuss your goals, recommend the right programme, and walk you through diagnostics and pricing — no commitment.',
  },
  {
    q: "What if I don't see the improvements I expected?",
    a: 'Your protocol is reviewed at each diagnostic cycle. If markers aren\'t moving, the team adjusts the plan — interventions, supplements, hormonal support, or escalation to a deeper diagnostic. The whole programme is feedback-driven.',
  },
  {
    q: 'What happens after the 12-month programme ends?',
    a: 'Most patients move to a yearly review — annual diagnostics, a refreshed protocol, ongoing access to the medical team. Longevity is a long game; we stay on the journey with you for as long as you want us to.',
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-cream/40 py-16 md:py-20 px-6 md:px-12">
      {/* JSON-LD for FAQPage rich-result eligibility */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

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
