/**
 * Landing-page campaign config.
 *
 * AdLandingPage renders the same overall structure (hero · benefits ·
 * ambassador · reviews · results · founders · faq · final CTA) but
 * its hero copy + LSQ source tag + URL + `<title>` change per
 * campaign. This file centralises those overrides so we can add a
 * new ad LP by adding a new entry below + wiring its route — no
 * fork of the AdLandingPage component needed.
 */

export interface Campaign {
  /** Route path (mounted by routes.tsx + hidden chrome via App.tsx). */
  path: string
  /** <title> shown in the browser tab + Open Graph. */
  title: string
  /** <meta description> — 140-160 chars sweet spot for Google. */
  description: string
  /** Hero eyebrow microcopy (tracking-[0.42em] uppercase rust line). */
  eyebrow: string
  /** Hero headline line 1 (regular weight). */
  headlineLine1: string
  /** Hero headline line 2 (bold italic rust accent — the "hook"). */
  headlineLine2: string
  /** Hero sub-paragraph below the headline. */
  sub: string
  /** LSQ `Source` value, e.g. "Website - Longevity LP". Used to tag
   *  the lead so the clinic team can filter / report by campaign. */
  lsqSource: string
}

export const LONGEVITY_CAMPAIGN: Campaign = {
  path: '/longevity-programme-india-lp',
  title: 'Longevity Programme in India · Live Longer, Live Better · TLC',
  description:
    "Doctor-led 12-month longevity programme. 1000+ biomarkers, three biological-age clocks, eight centres across India. Get the e-brochure.",
  eyebrow: "India's First Doctor-Led Longevity Programme",
  headlineLine1: 'Live longer.',
  headlineLine2: 'Live measurably better.',
  sub:
    "A doctor-led 12-month programme that measures your biology with 1000+ diagnostics, corrects what's drifting, and verifies progress with three validated biological-age clocks.",
  lsqSource: 'Website - Longevity LP',
}

export const GUT_METABOLIC_CAMPAIGN: Campaign = {
  path: '/gut-metabolic-india-lp',
  title: 'Gut & Metabolic Programme in India · Heal Your Gut · TLC',
  description:
    'Doctor-led gut & metabolic programme. Microbiome sequencing, hormone correction, weight & inflammation reversal — across 8 TLC centres in India.',
  eyebrow: "India's Premier Gut & Metabolic Programme",
  headlineLine1: 'Heal your gut.',
  headlineLine2: 'Optimise your metabolism.',
  sub:
    "A doctor-led programme that maps your gut microbiome with whole-genomic sequencing, corrects metabolic and hormonal drift, and tracks weight, inflammation and energy outcomes month-on-month.",
  lsqSource: 'Website - Gut & Metabolic LP',
}
