// BenefitsDemoPage — local-only demo at /demo. Previews the new
// homepage sections (Benefits + Programmes) in sequence so the user
// can review the flow before approving for the live homepage.
// Original homepage at / unaffected.

import { BenefitsHome } from '../components/BenefitsHome'
import { ProgramsHome } from '../components/ProgramsHome'
import { useDocumentMeta } from '../lib/seo'

export function BenefitsDemoPage() {
  useDocumentMeta({
    title: 'Demo · Benefits + Programmes — TLC',
    description: 'Demo preview of the new homepage sections.',
    path: '/demo',
  })

  return (
    <div className="bg-white">
      {/* Spacer so the section sits below the existing fixed header */}
      <div style={{ height: '80px' }} />

      {/* Tiny demo label so we know we're on the demo */}
      <div className="text-center py-4 px-6 bg-white">
        <div className="inline-flex items-center gap-2 text-[9.5px] tracking-[0.32em] uppercase text-rust font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-rust animate-pulse" aria-hidden />
          Demo · Benefits + Programmes preview
        </div>
      </div>

      {/* Section 1 — Benefits (image cards, 4x2) */}
      <BenefitsHome />

      {/* Section divider hint — small label so the two sections feel distinct */}
      <div className="text-center py-3 bg-white border-t border-mist/60">
        <span className="text-[9.5px] tracking-[0.32em] uppercase text-rust/70 font-semibold">
          ↓ Programmes section follows ↓
        </span>
      </div>

      {/* Section 2 — Programmes (stacking deck, 6 cards) */}
      <ProgramsHome />

      {/* End-of-demo footer note */}
      <div className="py-12 px-6 text-center bg-white border-t border-mist/60">
        <p className="text-[12px] text-graphite/65 font-light max-w-[520px] mx-auto leading-[1.6]">
          On the live homepage these two sections will sit after the Hero, in this order.
          <br />
          <span className="text-stone/70">
            Each "Learn More" will link to a dedicated programme detail page (built next).
          </span>
        </p>
      </div>
    </div>
  )
}
