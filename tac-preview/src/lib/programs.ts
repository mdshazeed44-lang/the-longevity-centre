// programs.ts — single source of truth for TLC's six flagship programmes.
// Used by:
//   - components/Header.tsx (nav dropdown)
//   - components/ProgramsHome.tsx (homepage stacking deck)
//   - pages/ProgramsIndexPage.tsx (/programs)
//   - pages/ProgramDetailPage.tsx (/programs/[slug])
//
// Data sourced from the client's program brief + brochure pricing table.
// Note: "Longevity Plus" is presented as ONE programme with two tier
// prices (Starter ₹1.8L · Complete ₹2.5L), per the brochure's 6-tab
// presentation on page 17.

export type Diagnostic = string

export type Program = {
  slug: string
  cat: string
  title: string
  shortTitle: string  // for header dropdown
  tag: string
  duration: string
  price: string
  priceNote?: string
  /**
   * Headline biomarker count shown on the bottom info strip of
   * each programme detail page. Falls back to '160+ biomarkers'
   * when omitted (the standard panel size). Programmes that ship
   * additional panels (gut microbiome, epigenetic clocks, etc.)
   * override with a higher number — keep the format
   * '<number>+ biomarkers' so the cell width stays consistent.
   */
  biomarkers?: string
  focus: string       // one-line focus statement
  desc: string        // 2-3 sentence description
  cardImg: string     // image used on home stacking deck + index grid
  heroImg: string     // image used on detail page hero (can be same)
  designedFor: string[]
  diagnostics: Diagnostic[]
  diagnosticsNote?: string  // optional callout (e.g., "Whole genomic vs 16S rRNA")
  careModel: string[]
  optionalAddons?: string[]
  outcomes: string[]
  difference: string  // "The TLC Difference" closer
  accent: 'rust' | 'iguana' | 'green'  // brochure colour code per programme
}

export const PROGRAMS: Program[] = [
  // 01 — METABOLIC & WEIGHT LOSS
  {
    slug: 'metabolic-weight-loss',
    cat: '01',
    title: 'Metabolic & Weight Loss Programme',
    shortTitle: 'Metabolic & Weight Loss',
    tag: '3 Months · Precision Reset',
    duration: '3 Months',
    price: '₹45,000',
    focus:
      'Precision metabolic reset for sustainable fat loss — biology-led, not behaviour-led.',
    desc:
      'A precision metabolic reset for sustainable fat loss. We identify the biological drivers of stubborn weight gain — insulin resistance, hormonal imbalance, cellular inefficiency — and address them with diagnostics-led, physician-guided care.',
    cardImg: '/clinic-photos/medical-weight-loss.webp',
    heroImg: '/clinic-photos/medical-weight-loss.webp',
    designedFor: [
      'Stubborn weight gain that resists conventional methods',
      'Low energy and metabolic sluggishness',
      'Insulin resistance and unfavourable body composition',
      'Repeated short-term results from diet-only attempts',
      'Men and women seeking a more sophisticated solution for weight loss',
    ],
    diagnostics: [
      'Comprehensive metabolic blood panel — 160+ markers',
      'Body Composition Analysis (BCA)',
      'Oligoscan cellular health assessment',
      'Hormonal screening',
      'TLC App interface',
    ],
    careModel: [
      'Monthly consultations with your dedicated longevity physician',
      'Weekly sessions with your nutritionist',
      'Physical activity coaching',
      'Nutritional plan recalibrated every 2–4 weeks',
      'Continuous support throughout the programme',
    ],
    outcomes: [
      'Sustainable, medically guided fat loss',
      'Improved metabolic efficiency and insulin sensitivity',
      'Reduction in visceral fat',
      'Better body composition with lean mass preserved',
      'Identification and correction of hormonal imbalance',
      'Improvement in blood biological age markers',
      'Correction of all nutrient deficiencies',
    ],
    difference:
      'This is not a diet. It is a precision-led metabolic intervention created for those who want to improve not only how they look, but how they function, age, and live.',
    accent: 'rust',
  },

  // 02 — GUT & METABOLIC
  {
    slug: 'gut-metabolic',
    cat: '02',
    title: 'Gut & Metabolic Programme',
    shortTitle: 'Gut & Metabolic',
    tag: '4–6 Months · Microbiome + Metabolic',
    duration: '4–6 Months',
    price: '₹80,000',
    // Standard ~160 blood markers + the full whole-genomic gut
    // microbiome panel = 600+ data points reported.
    biomarkers: '600+ biomarkers',
    focus:
      'Genomic-level gut microbiome restoration paired with metabolic correction — the gut–metabolism axis treated together.',
    desc:
      'Whole-genomic gut microbiome restoration paired with metabolic correction. The gut–metabolism axis treated together — addressing IBS, bloating, unexplained weight gain, brain fog, and food sensitivities at the source.',
    cardImg: '/clinic-photos/gut-health.webp',
    heroImg: '/clinic-photos/gut-health.webp',
    designedFor: [
      'Chronic bloating, IBS, or persistent digestive discomfort',
      'Unexplained weight gain or difficulty losing weight',
      'Fatigue, brain fog, or poor cognitive clarity',
      'Frequent illness or weakened immunity',
      'Food intolerances or sensitivities',
      'Skin conditions linked to inflammation',
      'Metabolic disorders with a possible gut connection',
    ],
    diagnostics: [
      'Comprehensive metabolic blood panel — 160+ markers',
      'Gut Microbiome Analysis — Whole Genomic Sequencing',
      'Body Composition Analysis (BCA)',
      'Oligoscan cellular health assessment',
      'Hormonal screening',
      'Inflammatory marker panel',
      'TLC App interface',
    ],
    diagnosticsNote:
      'Most clinics use 16S rRNA sequencing — a partial read. We do whole genomic sequencing of every microbial species in your gut — the gold standard. The difference is between a glimpse and a complete picture.',
    optionalAddons: [
      'Gut Inflammation Testing',
      'Food Allergy & Sensitivity Testing',
    ],
    careModel: [
      'Monthly consultations with your dedicated longevity physician',
      'Weekly sessions with your nutritionist',
      'Physical activity coaching',
      'Anti-inflammatory, gut-supportive nutritional plan, recalibrated every 2–4 weeks',
      'Physician-designed gut restoration protocol',
      'Continuous support throughout the programme',
    ],
    outcomes: [
      'Restored microbiome diversity and microbial balance',
      'Measurably improved gut age',
      'Reduced gut inflammation and intestinal permeability',
      'Relief from bloating, IBS, and digestive dysfunction',
      'Improved energy, mental clarity, and mood',
      'Stronger, more resilient immune function',
      'Healthier skin from within',
      'Significant weight loss and improved body composition',
      'Nutrient deficiency correction',
      'Sustainable metabolic improvement through the gut–metabolism axis',
    ],
    difference:
      'This is not a probiotic supplement nor a generic diet plan. It is a genomics-informed, physician-led restoration of the biological system that underpins nearly every aspect of your health — measured, tracked, and optimised.',
    accent: 'iguana',
  },

  // 03 — LONGEVITY PLUS
  {
    // Longevity Plus is the flagship 12-month programme: full
    // metabolomics + gut + GrimAge / PhenoAge clocks + 323-gene
    // genomic decode = 1000+ data points reported.
    slug: 'longevity-plus',
    cat: '03',
    title: 'Longevity Plus Programme',
    shortTitle: 'Longevity Plus',
    tag: '12 Months · Flagship Transformation',
    duration: '12 Months',
    price: 'From ₹1,80,000',
    priceNote: 'Starter ₹1,80,000 · Complete ₹2,50,000',
    biomarkers: '1000+ biomarkers',
    focus:
      'Full biological transformation across metabolism, gut, hormones, genes, and epigenetics — measured across three validated biological age clocks.',
    desc:
      'Our flagship 12-month protocol. Three biological age clocks tracked, 323 genes decoded, GrimAge + PhenoAge epigenetic analysis, whole-genomic gut sequencing — every measurable pillar of aging, addressed together.',
    // Image journey on this slot:
    //   1. stillness-meditation.jpg (yoga tree pose) — retired
    //   2. mood-forest-light.jpg (misty forest sun-shafts) — retired
    //   3. longevity-plus-tree.jpg (single iconic tree) — retired
    //   4. longevity-plus-fitness.jpg ← current
    //      Editorial side view of a woman in orange leggings doing
    //      core work, backlit window, low-angle from the gym floor.
    //      Warm orange ties to TLC's rust palette; the magazine-
    //      cover framing matches the editorial register elsewhere
    //      on the site.
    cardImg: '/longevity/longevity-plus-fitness.jpg',
    heroImg: '/longevity/longevity-plus-fitness.jpg',
    designedFor: [
      'Those seeking measurable reduction in biological age',
      'Men experiencing fatigue, hormonal decline, loss of vitality, or metabolic shift',
      'Women navigating perimenopause, menopause, hormonal imbalance, or metabolic change',
      'Those committed to longevity, prevention, and peak function',
      'Individuals who want their genetic and epigenetic blueprint decoded — and acted upon',
    ],
    diagnostics: [
      'Comprehensive blood panel — 160+ markers, home collection',
      'Body Composition Analysis (BCA)',
      'Oligoscan cellular health assessment',
      'Face Scan — AI-powered skin biological age',
      'Bone Mineral Density (BMD)',
      'Hormonal screening',
      'Whole Genomic Gut Microbiome Sequencing',
      'Genetic Testing — 323 genes & SNPs',
      'Epigenetic Age Testing — GrimAge + PhenoAge',
      'Three biological age clocks tracked: Blood, Gut, Epigenetic',
    ],
    diagnosticsNote:
      'Most clinics test fewer than 99 genes. We test 323. Most do partial 16S rRNA gut analysis — we do whole genomic. Most don\'t offer epigenetic testing — we use both gold-standard clocks together. Decoded once, informing your health for life.',
    careModel: [
      'Monthly consultations with your dedicated longevity physician',
      'Weekly sessions with your nutritionist',
      'Physical activity coaching',
      'Nutritional plan recalibrated every 2–4 weeks, informed by your genetic and metabolic profile',
      'Continuous support and protocol refinement throughout the year',
    ],
    outcomes: [
      'Measurably reduced biological age — across all three clocks',
      'Optimised hormonal balance — male and female',
      'Restored gut microbiome — gut age improved and documented',
      'Reduction in epigenetic age',
      'Genetic blueprint decoded — informing lifelong decisions',
      'Reduced systemic inflammation and chronic disease risk',
      'Enhanced energy, cognitive clarity, sleep quality, and skin health',
      'Sustainable improvements across 160+ biomarkers',
      'A complete picture of your biology, continuously refined for life',
    ],
    difference:
      'Most programmes measure outcomes. The Longevity Plus Programme measures biology — at the cellular, genetic, epigenetic, and microbial level — and changes it.',
    accent: 'green',
  },

  // 04 — ADVANCED METABOLOMICS
  {
    slug: 'advanced-metabolomics',
    cat: '04',
    title: 'Advanced Metabolomics Programme',
    shortTitle: 'Advanced Metabolomics',
    tag: 'High-Resolution Biochemistry',
    duration: 'Bespoke',
    price: '₹75,000',
    // Single high-resolution metabolite panel reports 300+ analytes.
    biomarkers: '300+ biomarkers',
    focus:
      'High-resolution biochemical profiling — analysing thousands of metabolites to surface sub-clinical dysfunction long before disease declares itself.',
    desc:
      'Thousands of metabolites analysed in a single panel — sub-clinical dysfunction surfaced years before standard tests flag concern. The deepest diagnostic lens available, designed for those whose normal tests don\'t match how they feel.',
    cardImg: '/longevity/microscope-analyst.jpg',
    heroImg: '/longevity/microscope-analyst.jpg',
    designedFor: [
      'High-performance individuals optimising function — not just avoiding disease',
      'Those with unresolved health concerns standard testing has failed to explain',
      'Individuals with significant family histories of cardiovascular, metabolic, or neurological disease',
      'Existing Longevity Plus patients seeking a deeper analytical layer',
      'Anyone committed to the most advanced form of preventive medicine',
    ],
    diagnostics: [
      'Advanced metabolomics panel — blood and/or urine (specialist laboratory)',
      'Body Composition Analysis (BCA)',
      'Oligoscan cellular health assessment',
      'TLC App interface',
    ],
    diagnosticsNote:
      'What metabolomics reveals: mitochondrial energy production · systemic inflammation at metabolite level · advanced cardiovascular risk · hormonal metabolic pathways · gut-derived metabolites · functional vitamin & mineral status · neurotransmitter precursors · biological aging signatures.',
    careModel: [
      'Monthly consultations with your dedicated longevity physician',
      'Physician interpretation of metabolomics findings — translated into a personalised intervention protocol',
      'Weekly sessions with your nutritionist',
      'Physical activity coaching',
      'Precision nutritional plan aligned to your metabolomic profile, recalibrated every 2–4 weeks',
    ],
    outcomes: [
      'The most complete picture of your metabolic health currently available',
      'Sub-clinical dysfunction identified before it presents as disease',
      'Peak cognitive, physical, and metabolic performance',
      'Precision intervention matched to your actual biochemistry — not population averages',
      'Advanced prevention of cardiovascular, metabolic, and cognitive decline',
      'A biological roadmap that is entirely, uniquely yours',
    ],
    difference:
      'Standard tests show you what has already gone wrong. Metabolomics shows you what is beginning to shift — and gives us the precision to correct it before it does.',
    accent: 'rust',
  },

  // 05 — DIABETES / FATTY LIVER REVERSAL
  {
    slug: 'diabetes-fatty-liver-reversal',
    cat: '05',
    title: 'Diabetes & Fatty Liver Reversal Programme',
    shortTitle: 'Diabetes & Fatty Liver Reversal',
    tag: 'Root-Cause Reversal',
    duration: '6 Months',
    price: '₹45,000',
    focus:
      'Root-cause precision medicine for prediabetes, type 2 diabetes, and NAFLD. A reversal pathway — not symptomatic management.',
    desc:
      'Root-cause precision medicine for prediabetes, type 2 diabetes, and NAFLD. A reversal pathway — not symptomatic management. Designed for those seeking medication reduction under physician supervision.',
    cardImg: '/clinic-photos/metabolic-diabetes.webp',
    heroImg: '/clinic-photos/metabolic-diabetes.webp',
    designedFor: [
      'Prediabetes — elevated fasting blood glucose or HbA1c',
      'Type 2 Diabetes — seeking root-cause treatment and medication reduction',
      'Non-Alcoholic Fatty Liver Disease (NAFLD / MASLD)',
      'Metabolic syndrome',
      'Elevated insulin resistance (high HOMA-IR)',
      'Those wanting a medically supervised path toward reducing medication dependency',
    ],
    diagnostics: [
      'Comprehensive metabolic blood panel',
      'Body Composition Analysis (BCA) — with specific visceral fat quantification',
      'Oligoscan cellular health assessment',
      'Hormonal screening',
      'Biological age mapping',
      'TLC App interface',
    ],
    careModel: [
      'Monthly consultations with your dedicated longevity physician / endocrinologist — metabolic review at every visit',
      'Weekly sessions with your nutritionist',
      'Physical activity coaching',
      'Anti-inflammatory, low-glycaemic nutritional plan, recalibrated every 2–4 weeks',
      'Physician-designed reversal protocol personalised to your metabolic profile',
      'Continuous clinical support throughout the programme',
    ],
    outcomes: [
      'Measurable reduction in HbA1c and fasting blood glucose',
      'Improved insulin sensitivity — reflected in HOMA-IR',
      'Normalisation of liver enzymes and reduction in hepatic fat',
      'Reduction in visceral fat — the primary metabolic risk driver',
      'Reduced systemic inflammation',
      'Improvement in blood biological age markers',
      'A structured, medically supervised pathway toward reduced medication dependency (where clinically appropriate)',
      'A sustainable protocol — a permanent biological reset, not a temporary intervention',
    ],
    difference:
      'Most approaches to diabetes and fatty liver focus on control. At TLC, our focus is reversal — through a precision understanding of why your metabolism is failing, and a clinically guided programme to correct it.',
    accent: 'iguana',
  },

  // 06 — PCOD CORRECTION
  {
    slug: 'pcod-correction',
    cat: '06',
    title: 'PCOD Correction Programme',
    shortTitle: 'PCOD Correction',
    tag: 'Multi-System Restoration',
    duration: '3–6 Months',
    price: '₹45,000',
    focus:
      'Multi-system correction — metabolic, hormonal, and microbiome addressed together. The most comprehensive PCOD programme in India.',
    desc:
      'PCOD addressed across the three systems that sustain it — metabolic, hormonal, and microbiome. The most comprehensive PCOD programme in India, with multi-disciplinary care from endocrinology to dermatology to gynaecology.',
    cardImg: '/longevity/pcod-ultrasound.jpg',
    heroImg: '/longevity/pcod-ultrasound.jpg',
    designedFor: [
      'Women diagnosed with PCOD or PCOS',
      'Irregular or absent menstrual cycles',
      'Weight gain, acne, excessive hair growth, or hair thinning',
      'Fertility challenges related to PCOD',
      'Those seeking an alternative to long-term hormonal contraception',
      'Anyone wanting a root-cause approach to restoring hormonal and metabolic balance',
    ],
    diagnostics: [
      'Comprehensive hormonal panel',
      'Full metabolic blood panel',
      'Body Composition Analysis (BCA) — including visceral fat mapping',
      'Oligoscan cellular health assessment',
      'Gut Microbiome Analysis — Whole Genomic Sequencing (optional)',
      'TLC App interface',
    ],
    diagnosticsNote:
      'Emerging research has established a direct relationship between gut dysbiosis and PCOD — affecting oestrogen and androgen metabolism, insulin signalling, and systemic inflammation. We integrate gut testing as a clinical pillar, not an afterthought.',
    careModel: [
      'Monthly consultations with your dedicated longevity physician',
      'Weekly sessions with your nutritionist',
      'Physical activity coaching — designed around hormonal and metabolic needs',
      'Personalised nutritional plan, recalibrated every 2–4 weeks',
      'Dermatologist consultation — for androgen-related skin and hair concerns',
      'Senior gynaecologist consultation for hormonal rebalancing',
      'Continuous clinical support throughout the programme',
    ],
    outcomes: [
      'Regulated and restored menstrual cycle',
      'Improved insulin sensitivity and metabolic function',
      'Restored gut microbiome — gut age measurably improved',
      'Reduction in androgen excess — improved acne, hair growth, hair thinning',
      'Improved fertility markers for those seeking to conceive',
      'Sustainable, biologically supported weight management',
      'Hormonal balance restored from the inside — not suppressed from the outside',
    ],
    difference:
      'PCOD management, as it is typically practised, manages the condition. At TLC, we work to correct it — by addressing the metabolic dysfunction, the microbiome imbalance, and the hormonal dysregulation that sustain it.',
    accent: 'green',
  },
]

// Helper — find a programme by slug
export function getProgramBySlug(slug: string): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug)
}
