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

// ── Hub-page FAQs ────────────────────────────────────────────────────────
// Answer-first Q&A blocks for the section index pages. These pages are
// card/link layouts with little prose, so AI/GEO auditors scored them 0 on
// "citability". Each FAQ is a short, self-contained, quotable answer — shown
// on the page (via <Faq />) AND pre-baked into the static <head> (FAQPage
// schema) + <noscript> body by scripts/inject-meta.cjs.

export const PROGRAMS_FAQS: Faq[] = [
  {
    q: 'What longevity programmes does The Longevity Centre offer?',
    a: 'TLC offers seven physician-led programmes: Longevity Plus, Metabolic & Weight Loss, Gut & Metabolic, Diabetes & Fatty-Liver Reversal, PCOD Correction, Advanced Metabolomics, and Cancer Detection & Prevention. Each one is diagnostics-led and tailored to your biology rather than a fixed template.',
  },
  {
    q: 'How do I know which programme is right for me?',
    a: 'Every programme starts with a 30-minute consultation and baseline diagnostics. Based on your biomarkers, goals and medical history, our physician team recommends the programme that fits — there is no one-size-fits-all plan.',
  },
  {
    q: 'How long does a longevity programme run?',
    a: 'Most programmes run between 3 and 12 months depending on the goal — Metabolic & Weight Loss is about 3 months, while Longevity Plus is a 12-month plan — usually followed by an annual review to sustain results.',
  },
  {
    q: 'Are the programmes doctor-led?',
    a: 'Yes. Every programme is designed and supervised by TLC’s in-house physician panel — endocrinologists, metabolic and longevity specialists — not generic health coaches.',
  },
]

export const DIAGNOSTICS_FAQS: Faq[] = [
  {
    q: 'What diagnostic tests does The Longevity Centre offer?',
    a: 'TLC runs nine validated diagnostic protocols: comprehensive blood panels (160+ biomarkers), body composition analysis (BCA), bone mineral density, EndoPAT vascular testing, DNA/genetic testing, gut-microbiome mapping, biological-age clocks, Oligoscan, and dermal face scan.',
  },
  {
    q: 'Why does TLC measure so many biomarkers?',
    a: 'Longevity medicine is measurement-first. Testing 1000+ markers surfaces sub-clinical drift — early metabolic, hormonal, cardiovascular and genetic risks — often years before symptoms appear, so any intervention is precise rather than guesswork.',
  },
  {
    q: 'How is biological age measured?',
    a: 'Biological age is measured with DNA-methylation clocks — GrimAge, PhenoAge and Horvath — analysed across millions of base pairs, giving your true biological age compared with your chronological age.',
  },
  {
    q: 'Do I need to enrol in a programme to get diagnostics?',
    a: 'No. Diagnostics can be booked on their own or as part of a programme. Either way, every result is interpreted by a physician in the context of your full health picture — not just handed over as numbers.',
  },
]

export const SKIN_FAQS: Faq[] = [
  {
    q: 'What skin and aesthetic treatments does The Longevity Centre offer?',
    a: 'TLC offers eight dermatology-led treatments: Skin PRP, chemical peels, Hydrafacial, microneedling with Dermapen, laser hair reduction, hair-loss solutions, hair transplant, and fillers, botox & skin boosters.',
  },
  {
    q: 'Are the skin treatments performed by doctors?',
    a: 'Yes. Every treatment is physician-performed or dermatologist-supervised, with a plan customised to your skin type, concerns and timeline rather than a fixed package.',
  },
  {
    q: 'How are skin and aesthetic treatments personalised?',
    a: 'Treatment plans are built from a proper skin analysis and revised as your skin responds over time. There are no fixed package deals — the protocol adapts to your skin, goals and schedule.',
  },
]

export const CENTRES_FAQS: Faq[] = [
  {
    q: 'Where are The Longevity Centre clinics located?',
    a: 'TLC operates six centres across India — Delhi (Greater Kailash-1), Gurgaon (Sector 48), Mumbai (Bandra West), Pune (Hadapsar), Nagpur (Dharampeth) and Bangalore (Sadashivanagar).',
  },
  {
    q: 'Do all centres offer the same programmes and diagnostics?',
    a: 'Yes. Every centre runs the same diagnostic protocol and shares one medical record, so your care continues seamlessly if you move between cities.',
  },
  {
    q: 'Can I consult virtually if there is no centre in my city?',
    a: 'Yes. In-person diagnostics are done at the nearest centre, while follow-ups, reviews and protocol adjustments are available virtually — so distance is not a barrier to starting.',
  },
]

/** Map of route path → its FAQ list, for the section index (hub) pages. */
export const HUB_FAQS: Record<string, Faq[]> = {
  '/programs': PROGRAMS_FAQS,
  '/diagnostics': DIAGNOSTICS_FAQS,
  '/skin-aesthetics': SKIN_FAQS,
  '/centres': CENTRES_FAQS,
}
