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

export interface Benefit {
  n: string
  title: string
  body: string
  img: string
  alt: string
}

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
  /** Optional Benefits-section overrides. If omitted, the default
   *  homepage BenefitsHome content (longevity-focused) is used. */
  benefitsEyebrow?: string
  benefitsHeadlineLine1?: string
  benefitsHeadlineLine2?: string
  benefitsBody?: string
  benefits?: Benefit[]
}

export const LONGEVITY_CAMPAIGN: Campaign = {
  path: '/longevity-programme-india-lp',
  title: 'Longevity Programme in India · Live Longer, Live Better · TLC',
  description:
    "Doctor-led 12-month longevity programme. 1000+ biomarkers, three biological-age clocks, eight centres across India. Book a free consultation.",
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

  // ── Benefits section override — gut/metabolic specific. Uses the
  // existing brand mood imagery from public/longevity/brand/ so we
  // don't have to ship new assets.
  benefitsEyebrow: '— Outcomes —',
  benefitsHeadlineLine1: 'Heal from within.',
  benefitsHeadlineLine2: 'Measurably better.',
  benefitsBody:
    'Every outcome is paired with a re-test at programme completion — your gut microbiome, metabolic markers and inflammation panel are measured before and after, not promised.',
  benefits: [
    {
      n: '01',
      title: 'Restored microbiome diversity',
      body:
        'Whole-genomic sequencing maps your gut. Targeted pre-/probiotic, fibre and polyphenol protocols rebuild bacterial diversity month over month.',
      img: '/longevity/brand/mood-leaf-skeleton.jpg',
      alt: 'Skeleton leaf — delicate microbial diversity',
    },
    {
      n: '02',
      title: 'Reduced gut inflammation',
      body:
        'Inflammation markers (CRP, calprotectin, leaky-gut panel) brought down by personalised gut-healing protocols and root-cause correction.',
      img: '/longevity/brand/mood-water-ripple.jpg',
      alt: 'Calm water ripple — reduced gut inflammation',
    },
    {
      n: '03',
      title: 'Less bloating &  better digestion',
      body:
        'Targeted food-sensitivity testing, enzyme support, and FODMAP-aware nutrition put an end to IBS-style discomfort and chronic bloating.',
      img: '/longevity/brand/mood-zen-sand.jpg',
      alt: 'Zen sand garden — calm digestion',
    },
    {
      n: '04',
      title: 'Ideal body composition',
      body:
        'Fat down, lean mass preserved. BCA-tracked, physician-guided — measured beyond the bathroom scale.',
      img: '/longevity/body-composition-pose.jpg',
      alt: 'Nutrition bowl — ideal body composition',
    },
    {
      n: '05',
      title: 'Stable blood sugar',
      body:
        'Fasting glucose, HbA1c and insulin sensitivity restored. Personalised nutrition + targeted therapeutics stop metabolic drift.',
      img: '/longevity/performance-cyclist-v2.jpg',
      alt: 'Cyclist — stable blood sugar and metabolism',
    },
    {
      n: '06',
      title: 'Hormonal balance restored',
      body:
        'Thyroid, cortisol, insulin, sex hormones — corrected, then monitored. Mood, energy and weight follow the panel.',
      img: '/longevity/brand/mood-hands-pose.jpg',
      alt: 'Elegant hands pose — hormonal balance',
    },
    {
      n: '07',
      title: 'Higher energy &  clearer mood',
      body:
        'A healthy gut and stable hormones translate to mitochondrial efficiency. Stop relying on caffeine — your biochemistry does the work.',
      img: '/longevity/brand/mood-forest-light.jpg',
      alt: 'Forest light — higher energy and clearer mood',
    },
    {
      n: '08',
      title: 'Healthier skin from within',
      body:
        'The gut–skin axis: cleared inflammation and balanced hormones show up as clearer, brighter, more resilient skin.',
      img: '/longevity/brand/mood-terracotta.jpg',
      alt: 'Terracotta texture — healthy skin from within',
    },
  ],
}
