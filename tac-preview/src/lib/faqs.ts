/**
 * faqs.ts — single source of truth for the homepage FAQ.
 *
 * Both the visible FAQ accordion (src/components/sections/Faq.tsx) and the
 * pre-baked static FAQPage JSON-LD (scripts/inject-meta.cjs) read this list,
 * so the structured data always matches the questions a visitor actually
 * sees — and there is exactly one FAQ definition to maintain. Content is the
 * client's worksheet FAQ (Schema sheet).
 */
export interface Faq {
  q: string
  a: string
}

export const HOMEPAGE_FAQS: Faq[] = [
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
    a: 'Both. We have six clinics across India (Delhi, Gurgaon, Mumbai, Pune, Nagpur, Bangalore) for in-person diagnostics and consultations. Follow-ups, reviews and protocol adjustments are also available virtually.',
  },
  {
    q: 'What happens on the first consultation?',
    a: 'The first 30-minute conversation with our medical team is where we understand your goals, recommend the right programme, and walk you through the diagnostics and pricing involved — with no commitment to proceed.',
  },
  {
    q: "What if I don't see the improvements I expected?",
    a: "Your protocol is reviewed at each diagnostic cycle. If markers aren't moving, the team adjusts the plan — interventions, supplements, hormonal support, or escalation to a deeper diagnostic. The whole programme is feedback-driven.",
  },
  {
    q: 'What happens after the 12-month programme ends?',
    a: 'Most patients move to a yearly review — annual diagnostics, a refreshed protocol, ongoing access to the medical team. Longevity is a long game; we stay on the journey with you for as long as you want us to.',
  },
]

/** Build a schema.org FAQPage JSON-LD object from a FAQ list. */
export function faqPageSchema(faqs: Faq[] = HOMEPAGE_FAQS): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
