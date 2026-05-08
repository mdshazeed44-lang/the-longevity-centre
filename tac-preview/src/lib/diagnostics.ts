// Single source of truth for the 9 diagnostic services.
// Used by:
//   - DiagnosticsPage (list / index)
//   - DiagnosticDetailPage (per-test detail at /diagnostics/[slug])
//   - Header dropdown
//
// Content rewritten in TLC voice — rigour-led, physician-guided, measured.
// Source reference: theantiagingcentre.com/diagnostics/[name]/

export type Diagnostic = {
  slug: string
  name: string                  // Full clinical name
  shortName: string             // 1–2 words for nav / chips
  category: string              // e.g. "Cellular", "Genomic"
  duration: string              // "30 sec", "15 min", etc
  sampleType: string            // "Hand scan", "Saliva swab", etc
  heroImg: string               // /diagnostics/[name].jpg
  heroAlt: string
  tagline: string               // Short positioning tag (sub-headline)
  intro: string                 // 1-paragraph hero sub-copy
  whatItIs: { title: string; body: string[] }
  whySuperior: { title: string; intro: string; points: string[] }
  benefits: string[]            // 5–7 outcome bullets
  process: { n: string; title: string; body: string }[]   // 3 steps
  whoFor: string[]              // 4–6 audience lines
  technical: { k: string; v: string }[]   // technical specs
  related: string[]             // slugs of related tests
}

export const DIAGNOSTICS: Diagnostic[] = [
  {
    slug: 'oligoscan',
    name: 'Oligoscan — Cell Scan',
    shortName: 'Oligoscan',
    category: 'Cellular',
    duration: '30 seconds',
    sampleType: 'Hand scan (non-invasive)',
    heroImg: '/diagnostics/oligoscan-spectrum.jpg',
    heroAlt: 'Light spectrum refraction — visualising the spectrophotometric scan principle',
    tagline: 'Cellular mineral & heavy-metal scan, in 30 seconds.',
    intro:
      'A non-invasive optical scan that quantifies intracellular minerals and heavy metals in real time — surfacing imbalances at the cellular level that blood tests cannot reach.',
    whatItIs: {
      title: 'What Oligoscan does — and why it matters',
      body: [
        'Oligoscan is a spectrophotometric device that reads the optical density of tissue at four points on the palm. In under thirty seconds, it returns a quantitative reading of 20 essential minerals and 14 toxic heavy metals — measured at the cellular level, not the bloodstream.',
        'This matters because your blood is constantly buffered by your body to maintain homeostasis. A "normal" blood reading does not mean cellular sufficiency. Oligoscan reads what your cells are actually holding — which is the level that determines how you feel and function.',
      ],
    },
    whySuperior: {
      title: 'Why Oligoscan beats a standard mineral panel',
      intro:
        'A typical mineral blood panel measures circulating levels — what is in transit, not what is bioavailable inside your tissues. Oligoscan inverts the question.',
      points: [
        'Reads intracellular mineral status, not extracellular',
        'Detects heavy-metal accumulation years before symptoms appear',
        'Instant results — no lab wait, no fasting, no needle',
        'Repeatable monthly, so we can track supplementation response',
        'No risk of contamination, false positives, or sample degradation',
      ],
    },
    benefits: [
      'Identify the exact mineral deficiencies driving fatigue, brain-fog, or low immunity',
      'Detect heavy-metal toxicity from environmental and dietary sources',
      'Personalise supplementation — stop guessing with multivitamins',
      'Monitor progress and recalibrate protocols at every review',
      'Catch silent imbalances long before they become chronic disease',
      'Improve skin clarity, hair growth and sleep quality at the source',
    ],
    process: [
      {
        n: '01',
        title: 'Scan',
        body: 'Four-point optical reading on your palm. No fasting, no preparation, no discomfort. Total time: under one minute.',
      },
      {
        n: '02',
        title: 'Decode',
        body: 'Spectral data analysed against population norms and your individual history. Two physicians review results before they reach you.',
      },
      {
        n: '03',
        title: 'Protocol',
        body: 'A precise supplementation and chelation plan — only the minerals you actually need, at the doses your body can absorb.',
      },
    ],
    whoFor: [
      'Anyone with persistent fatigue, brain-fog, or unexplained low energy',
      'Patients suspecting heavy-metal exposure (occupational, environmental, dental amalgam)',
      'Athletes optimising recovery and performance at the cellular level',
      'Patients on long-term supplementation who want to verify it is working',
      'Anyone serious about preventive medicine, not symptomatic management',
    ],
    technical: [
      { k: 'Method', v: 'Spectrophotometric assay (4-point palm scan)' },
      { k: 'Markers measured', v: '20 minerals + 14 heavy metals' },
      { k: 'Sample', v: 'No blood / no fluids — optical only' },
      { k: 'Duration', v: '30 seconds' },
      { k: 'Repeatability', v: 'Monthly safe; recommended quarterly during a programme' },
    ],
    related: ['blood-tests', 'genetic-testing', 'biological-clock'],
  },
  {
    slug: 'genetic-testing',
    name: 'Genetic Testing — 323 Genes',
    shortName: 'Genetic Testing',
    category: 'Genomic',
    duration: '5 min collection · 14-day report',
    sampleType: 'Saliva swab',
    heroImg: '/diagnostics/genetic-testing.jpg',
    heroAlt: 'DNA double helix on dark rust backdrop — genetic testing',
    tagline: 'Your lifelong genetic blueprint, read once.',
    intro:
      'Single-nucleotide-polymorphism analysis across 323 genes covering metabolism, hormones, cardiovascular risk and longevity pathways. Sampled once, used for life.',
    whatItIs: {
      title: 'What we sequence — and what it tells us',
      body: [
        'Your genome is fixed. The way it expresses itself is not. Our 323-gene SNP panel reads the variants that matter most for longevity medicine — across metabolism, methylation, hormone regulation, cardiovascular risk, neurodegeneration risk, drug response, and nutrient handling.',
        'These results are read once and used for a lifetime. Every protocol you receive at TLC — diet, supplementation, exercise prescription, medication choice — is built on top of your genetic foundation.',
      ],
    },
    whySuperior: {
      title: 'Why 323 genes — not 23',
      intro:
        'Direct-to-consumer genetic kits typically cover 20–60 wellness markers. Clinical-grade panels cover 100+. Ours covers 323 — selected for actionable longevity-medicine relevance.',
      points: [
        'Whole-genome SNP coverage of all major longevity pathways',
        'Clinical-grade lab analysis (Netherlands genomic partner)',
        'Physician-interpreted — every variant explained in plain language',
        'Pharmacogenomic results that inform medication choices for life',
        'Privacy-first — your data never leaves clinical custody',
      ],
    },
    benefits: [
      'Understand your true cardiovascular, metabolic and neurological risk profile',
      'Personalise nutrition based on genetic variants in nutrient handling',
      'Choose medications and dosages your body can actually metabolise',
      'Identify predisposition to inflammation, oxidative stress and ageing acceleration',
      'Inform family planning with carrier-status insights where relevant',
      'Build a longevity protocol that works with your biology, not against it',
    ],
    process: [
      {
        n: '01',
        title: 'Collect',
        body: 'A simple saliva swab in clinic or at home. No fasting, no needles, no preparation.',
      },
      {
        n: '02',
        title: 'Sequence',
        body: 'Sample shipped to our partner laboratory in the Netherlands for whole-panel SNP analysis.',
      },
      {
        n: '03',
        title: 'Interpret',
        body: 'Two-physician walkthrough of every clinically significant variant — what it means, what it changes, what we do about it.',
      },
    ],
    whoFor: [
      'Anyone serious about preventive medicine, before symptoms emerge',
      'Patients with strong family history of cardiovascular disease, diabetes, or cancer',
      'Patients with unpredictable medication responses or side-effects',
      'Athletes and high-performers optimising for long-term resilience',
      'Anyone planning a longevity programme they want personalised to their biology',
    ],
    technical: [
      { k: 'Method', v: 'Single-nucleotide-polymorphism (SNP) array' },
      { k: 'Genes covered', v: '323 (longevity-relevant panel)' },
      { k: 'Lab', v: 'Netherlands partner laboratory (CE-IVD certified)' },
      { k: 'Sample', v: 'Saliva swab — non-invasive' },
      { k: 'Re-test', v: 'Never — your genome does not change' },
    ],
    related: ['biological-clock', 'oligoscan', 'blood-tests'],
  },
  {
    slug: 'gut-microbiota',
    name: 'Gut Microbiota — Whole-Genome Sequencing',
    shortName: 'Gut Microbiota',
    category: 'Microbiome',
    duration: '10 min collection · 8-week report',
    sampleType: 'Stool sample (at-home kit)',
    heroImg: '/diagnostics/gut-microbiota.jpg',
    heroAlt: 'Microbiome bacteria under electron microscope',
    tagline: 'Every microbial species in your gut, sequenced.',
    intro:
      'Complete shotgun metagenomic sequencing of your gut microbiome — diversity, imbalances, compromised pathways and inflammation, far beyond the partial 16S panel most clinics use.',
    whatItIs: {
      title: 'Why your microbiome is the second genome',
      body: [
        'You carry roughly as many microbial cells as human cells. They produce neurotransmitters, train your immune system, regulate inflammation, and synthesise vitamins. They also drive — or block — recovery from almost every chronic condition.',
        'Most clinics test the microbiome with 16S rRNA sequencing, which identifies bacteria only at the genus level. Our shotgun metagenomic test reads every species, every functional pathway, every inflammatory marker — the resolution actually needed to intervene.',
      ],
    },
    whySuperior: {
      title: 'Whole-genome microbiome vs 16S rRNA',
      intro:
        '16S testing is fast and cheap. Whole-genome shotgun sequencing is rigorous and actionable.',
      points: [
        'Species-level identification — not just genus',
        'Functional pathway analysis — what your microbes are actually doing',
        'Detection of viruses, fungi, archaea — not just bacteria',
        'Direct measurement of inflammation, leaky-gut and SIBO markers',
        'Tracking of antibiotic resistance genes — important for chronic care',
      ],
    },
    benefits: [
      'Resolve bloating, IBS, constipation and food sensitivities at the source',
      'Restore microbial diversity — the strongest single predictor of long-term health',
      'Identify inflammation-driving species before they become disease',
      'Personalise probiotics, prebiotics and diet to your unique flora',
      'Improve mood, sleep and energy via the gut-brain axis',
      'Strengthen immune resilience by repairing the gut barrier',
    ],
    process: [
      {
        n: '01',
        title: 'Collect',
        body: 'At-home stool kit delivered to your door. Easy collection, sealed shipping, ten minutes total.',
      },
      {
        n: '02',
        title: 'Sequence',
        body: 'Sample shipped to our genomic partner for full shotgun metagenomic sequencing — every microbial species mapped.',
      },
      {
        n: '03',
        title: 'Rebuild',
        body: 'A precise nutrition, prebiotic, probiotic and lifestyle protocol — built around your specific microbial signature.',
      },
    ],
    whoFor: [
      'Anyone with bloating, IBS, IBD, food sensitivities, or chronic GI distress',
      'Patients with autoimmune conditions or unexplained inflammation',
      'Patients with mood disorders, anxiety, brain-fog or chronic fatigue',
      'Anyone post-antibiotic, post-illness, or post-major dietary change',
      'Anyone serious about long-term immune resilience',
    ],
    technical: [
      { k: 'Method', v: 'Shotgun metagenomic sequencing (whole-genome)' },
      { k: 'Resolution', v: 'Species level + functional pathways' },
      { k: 'Sample', v: 'Stool — at-home collection kit' },
      { k: 'Lab', v: 'Netherlands genomic partner laboratory' },
      { k: 'Re-test', v: 'Recommended every 6–12 months during a programme' },
    ],
    related: ['blood-tests', 'oligoscan', 'biological-clock'],
  },
  {
    slug: 'face-scan',
    name: 'Face Scan — Dermal Imaging',
    shortName: 'Face Scan',
    category: 'Dermal',
    duration: '5 minutes',
    sampleType: 'Multi-spectral imaging (in-clinic)',
    heroImg: '/diagnostics/face-scan-device.jpg',
    heroAlt: 'Dermal imaging — laser facial mapping during a Face Scan',
    tagline: 'Skin hydration, elasticity, pigmentation — quantified.',
    intro:
      'High-resolution dermatological imaging that measures skin hydration, elasticity, pigmentation depth and surface texture — the quantitative inputs for an aesthetic-medicine plan.',
    whatItIs: {
      title: 'Skin science, made measurable',
      body: [
        'Most aesthetic consultations rely on visual inspection. Face Scan adds the data: multi-spectral imaging across seven dermal layers, returning numerical scores for hydration, elasticity, melanin distribution, vascular health, pore size, sebum, and surface texture.',
        'These scores establish a baseline — and the only honest way to track whether a serum, peel, laser or injection is actually working over time.',
      ],
    },
    whySuperior: {
      title: 'Why imaging beats inspection',
      intro:
        'A trained eye can see two skins look different. Only data can tell you which one is healthier, by how much, and where to intervene.',
      points: [
        'Multi-spectral imaging across 7 dermal layers',
        'Quantitative scores for hydration, elasticity, pigmentation, vascular health',
        'Side-by-side tracking month-over-month',
        'Catches sub-clinical changes — UV damage, dehydration, early elastin loss',
        'Honest measurement of treatment outcomes — no marketing, no guesswork',
      ],
    },
    benefits: [
      'Build an aesthetic-medicine plan from data, not assumptions',
      'Identify the dermal layer driving your specific concern',
      'Track treatment outcomes objectively — peel, laser, microneedling, injectable',
      'Catch early signs of photo-ageing and pigmentation depth',
      'Personalise topical regimens to what your skin actually lacks',
      'Avoid spending on treatments that do not move your numbers',
    ],
    process: [
      {
        n: '01',
        title: 'Capture',
        body: 'Five-minute multi-spectral imaging session in clinic. No preparation needed beyond clean, makeup-free skin.',
      },
      {
        n: '02',
        title: 'Analyse',
        body: 'Algorithmic scoring of seven dermal layers, cross-referenced with population norms and your previous scans if any.',
      },
      {
        n: '03',
        title: 'Plan',
        body: 'A precision aesthetic-medicine protocol — topicals, in-clinic treatments, lifestyle inputs — sequenced to address the specific layers showing change.',
      },
    ],
    whoFor: [
      'Anyone considering injectables, lasers, peels or other aesthetic interventions',
      'Patients who want to track whether their skincare regimen is actually working',
      'Patients with pigmentation, melasma, persistent acne or sensitive skin',
      'Anyone serious about prevention rather than correction',
      'Anyone in an active longevity programme who wants outcomes visible at the surface',
    ],
    technical: [
      { k: 'Method', v: 'Multi-spectral high-resolution imaging' },
      { k: 'Layers analysed', v: '7 dermal strata' },
      { k: 'Scores returned', v: 'Hydration, elasticity, melanin, vascular, pore, sebum, texture' },
      { k: 'Sample', v: 'Imaging only — no contact, no chemicals' },
      { k: 'Re-test', v: 'Quarterly during active treatment; annual otherwise' },
    ],
    related: ['oligoscan', 'biological-clock', 'blood-tests'],
  },
  {
    slug: 'endopat',
    name: 'EndoPAT — Vascular Function',
    shortName: 'EndoPAT',
    category: 'Cardiovascular',
    duration: '15 minutes',
    sampleType: 'Fingertip cuff (in-clinic)',
    heroImg: '/diagnostics/endopat-device.webp',
    heroAlt: 'Leaf vein macro — vascular network metaphor',
    tagline: 'The earliest cardiovascular warning signal — years ahead.',
    intro:
      'A 15-minute non-invasive test of endothelial reactivity — the earliest measurable signal of cardiovascular disease, often years before standard markers like cholesterol or blood pressure shift.',
    whatItIs: {
      title: 'Why endothelial function is the first signal',
      body: [
        'Your endothelium is the single-cell layer lining every blood vessel in your body. It is the first tissue to lose function in cardiovascular disease — typically a decade before plaque, hypertension or arrhythmia appears on standard tests.',
        'EndoPAT measures how well your endothelium dilates in response to a brief flow restriction. The result — a Reactive Hyperaemia Index (RHI) — is a validated early-warning signal that lets us intervene a decade before conventional medicine would notice.',
      ],
    },
    whySuperior: {
      title: 'Why EndoPAT precedes the cholesterol test',
      intro:
        'A normal cholesterol panel does not rule out cardiovascular disease. EndoPAT often catches what cholesterol misses.',
      points: [
        'Detects endothelial dysfunction up to 10 years before plaque appears',
        '15-minute non-invasive test — fingertip cuff only',
        'Validated by 200+ peer-reviewed clinical studies',
        'Tracks response to lifestyle and medication interventions in months',
        'Returns a single, repeatable RHI score — no interpretation drift',
      ],
    },
    benefits: [
      'Catch cardiovascular risk a decade before standard medicine would',
      'Track the actual vascular impact of diet, exercise and supplementation',
      'Quantify the benefit of medication adjustments objectively',
      'Identify hidden vascular damage in patients with "normal" cholesterol',
      'Reassure low-risk patients with hard data, not vague advice',
      'Build a precision cardio-protective protocol around your numbers',
    ],
    process: [
      {
        n: '01',
        title: 'Test',
        body: 'Fingertip cuffs applied on both hands. A short flow-restriction phase, then release. Total time: 15 minutes seated.',
      },
      {
        n: '02',
        title: 'Score',
        body: 'Reactive Hyperaemia Index (RHI) calculated automatically — the validated measure of endothelial reactivity.',
      },
      {
        n: '03',
        title: 'Intervene',
        body: 'A precision cardio-protective protocol — nutrition, supplementation, exercise prescription, medication if indicated — built around your RHI.',
      },
    ],
    whoFor: [
      'Anyone with family history of cardiovascular disease',
      'Patients with hypertension, dyslipidaemia, or metabolic syndrome',
      'Patients with diabetes or insulin resistance',
      'Smokers, ex-smokers, or anyone with significant air-pollution exposure',
      'Anyone over 35 who has never had a vascular function test',
      'Athletes and high-performers wanting an objective vascular baseline',
    ],
    technical: [
      { k: 'Method', v: 'Fingertip plethysmography (Reactive Hyperaemia Index)' },
      { k: 'Validation', v: '200+ peer-reviewed studies' },
      { k: 'Sample', v: 'Non-invasive — fingertip cuffs only' },
      { k: 'Duration', v: '15 minutes' },
      { k: 'Re-test', v: 'Every 6–12 months during active intervention' },
    ],
    related: ['blood-tests', 'oligoscan', 'biological-clock'],
  },
  {
    slug: 'blood-tests',
    name: 'Blood Tests — 160+ Biomarkers',
    shortName: 'Blood Tests',
    category: 'Metabolic',
    duration: '20 min collection · 24-hour report',
    sampleType: 'At-home phlebotomy',
    heroImg: '/diagnostics/blood-tests.jpg',
    heroAlt: 'Lab technician sampling a labelled blood vial',
    tagline: 'A complete internal baseline — 160+ markers in one panel.',
    intro:
      'A 160-marker panel covering metabolic, hormonal, inflammatory, cardiovascular, nutritional and organ health — collected at home for the most complete internal picture standard medicine offers.',
    whatItIs: {
      title: 'What 160 markers tell us that 30 cannot',
      body: [
        'A standard annual physical orders roughly 30 blood markers. Useful for ruling out gross disease, but blind to the subtle imbalances that drive how you feel, sleep, recover and age.',
        'Our 160-marker panel covers thyroid in full, sex and adrenal hormones, complete iron and B-vitamin handling, liver and kidney function in detail, inflammation markers, lipid sub-fractions, insulin and glucose dynamics, and longevity-specific markers like homocysteine and uric acid.',
      ],
    },
    whySuperior: {
      title: 'Why this is the panel that should be standard',
      intro:
        'Standard panels are designed to catch disease. Our panel is designed to read your physiology before disease arrives.',
      points: [
        '160+ markers — 3–4 times a typical annual physical',
        'At-home phlebotomy — no clinic visit, no early-morning queue',
        'NABL-accredited laboratory processing',
        'Physician walk-through of every result — not a portal upload',
        'Re-tested as clinically indicated to verify intervention impact',
      ],
    },
    benefits: [
      'Identify the precise metabolic, hormonal or nutritional imbalance behind your symptoms',
      'Catch silent inflammation, insulin resistance, sub-clinical thyroid years before standard medicine flags them',
      'Optimise diet, supplementation and medication based on actual deficiency patterns',
      'Track recovery and progress in numbers, not in feelings',
      'Establish a complete internal baseline that informs every future intervention',
      'Spot warning signals long before they become diagnoses',
    ],
    process: [
      {
        n: '01',
        title: 'Collect',
        body: 'A trained phlebotomist comes to your home or office. Fasted draw, sealed tubes, courier shipped to lab. Total time: 20 minutes.',
      },
      {
        n: '02',
        title: 'Process',
        body: 'Samples processed at NABL-accredited laboratory. All 160+ markers run on one collection — no repeat draws.',
      },
      {
        n: '03',
        title: 'Walk-through',
        body: 'A 60-minute physician consultation reviewing every clinically relevant marker — what is in range, what needs intervention, what we will do about it.',
      },
    ],
    whoFor: [
      'Anyone over 30 who has not had a comprehensive panel in 12+ months',
      'Patients with persistent symptoms despite "normal" routine bloodwork',
      'Patients with thyroid, hormonal, metabolic, or autoimmune concerns',
      'Anyone starting a longevity, weight-loss, hormonal or athletic-performance programme',
      'Anyone serious about preventive medicine — not just disease management',
    ],
    technical: [
      { k: 'Method', v: 'Multi-tube at-home phlebotomy' },
      { k: 'Markers', v: '160+ across 6 systems (metabolic / hormonal / cardio / nutritional / inflammation / organ)' },
      { k: 'Lab', v: 'NABL-accredited Indian laboratory' },
      { k: 'Sample', v: 'Venous blood — fasted draw' },
      { k: 'Re-test', v: 'As clinically indicated during a programme' },
    ],
    related: ['oligoscan', 'genetic-testing', 'endopat'],
  },
  {
    slug: 'body-composition',
    name: 'Body Composition Analysis (BCA)',
    shortName: 'BCA',
    category: 'Composition',
    duration: '5 minutes',
    sampleType: 'Bioimpedance scan (in-clinic)',
    heroImg: '/diagnostics/bca-tape.jpg',
    heroAlt: 'Torso with measuring tape — body composition analysis',
    tagline: 'Fat, muscle, visceral, hydration — measured beyond the scale.',
    intro:
      'Segmental body composition — fat percentage, lean mass, visceral fat, water balance — tracked monthly so transformation is measured beyond what a scale can show.',
    whatItIs: {
      title: 'Why the scale is the wrong instrument',
      body: [
        'A scale tells you nothing about whether you have lost fat or muscle. It cannot see visceral fat — the metabolically dangerous fat around your organs. It cannot tell you if you are dehydrated, sarcopenic, or simply retaining water.',
        'Multi-frequency bioimpedance can. Our BCA returns segmental readings — for each arm, each leg, your trunk separately — across fat mass, muscle mass, visceral adiposity, intracellular and extracellular water, and phase angle (a marker of cellular health).',
      ],
    },
    whySuperior: {
      title: 'Why BCA is the right way to track progress',
      intro:
        'Body recomposition is invisible to a bathroom scale. BCA makes it measurable.',
      points: [
        'Segmental — per-limb fat and muscle, not just total',
        'Visceral fat measured directly, not estimated from waist size',
        'Hydration status tracked across intra- and extracellular compartments',
        'Phase angle — an emerging marker of cellular vitality',
        'Repeatable monthly — perfect for tracking programme progress',
      ],
    },
    benefits: [
      'See whether weight changes are fat loss or muscle loss — and adjust',
      'Track visceral fat reduction, the most metabolically valuable change',
      'Catch dehydration, sarcopenia and oedema early',
      'Personalise resistance training based on per-limb muscle imbalances',
      'Validate that nutrition and exercise interventions are actually working',
      'Build long-term recomposition, not short-term scale wins',
    ],
    process: [
      {
        n: '01',
        title: 'Measure',
        body: 'Stand on the analyser, grip the handles. Multi-frequency current measures resistance across your body. Five minutes total.',
      },
      {
        n: '02',
        title: 'Read',
        body: 'Fat, muscle, water and visceral readings returned segmentally. Compared against your last scan and population norms.',
      },
      {
        n: '03',
        title: 'Adjust',
        body: 'Nutrition macros, training prescription, recovery protocols — recalibrated monthly to keep recomposition on track.',
      },
    ],
    whoFor: [
      'Anyone in a weight-loss or recomposition programme',
      'Patients with metabolic syndrome, type-2 diabetes, or fatty liver',
      'Older adults concerned about sarcopenia or muscle preservation',
      'Athletes optimising lean mass and hydration for performance',
      'Anyone tracking the impact of GLP-1 medications, fasting protocols or diet shifts',
    ],
    technical: [
      { k: 'Method', v: 'Multi-frequency bioimpedance analysis (MF-BIA)' },
      { k: 'Output', v: 'Segmental fat / muscle / water / visceral / phase angle' },
      { k: 'Sample', v: 'Non-invasive — current passes through the body' },
      { k: 'Duration', v: '5 minutes' },
      { k: 'Re-test', v: 'Monthly during a programme' },
    ],
    related: ['blood-tests', 'oligoscan', 'biological-clock'],
  },
  {
    slug: 'bone-mineral-density',
    name: 'Bone Mineral Density (Ultrasound BMD)',
    shortName: 'Ultrasound BMD',
    category: 'Skeletal',
    duration: '5–10 minutes',
    sampleType: 'Ultrasound bone scan (in-clinic)',
    heroImg: '/diagnostics/bone-mineral-density.jpg',
    heroAlt: 'Skeletal posture — bone health imagery',
    tagline: 'Skeletal health screening — radiation-free, fast, repeatable.',
    intro:
      'Quantitative ultrasound assessment of bone strength at the heel — a fast, radiation-free screening that flags early bone loss and tracks the impact of strength, nutrition and hormonal interventions over time.',
    whatItIs: {
      title: 'Why bone is a longevity organ',
      body: [
        'Bone is not inert. It is metabolically active tissue that secretes hormones, regulates glucose, and shapes long-term frailty risk. Loss of bone mineral density is one of the strongest predictors of decline after sixty — and the loss begins, silently, in your forties.',
        'Quantitative ultrasound (QUS) measures bone strength at the calcaneus — the heel bone — using sound waves rather than X-rays. It returns Speed of Sound, Broadband Ultrasound Attenuation, a Stiffness Index, and an estimated T-score that have been validated against fracture risk in adults.',
      ],
    },
    whySuperior: {
      title: 'Why ultrasound, for ongoing skeletal tracking',
      intro:
        'Quantitative ultrasound is the right tool for repeat, radiation-free skeletal monitoring across a multi-year longevity programme. It is a screening and tracking instrument — when results flag concern, we refer you for a hospital DEXA to confirm.',
      points: [
        'Zero ionising radiation — safe to repeat as often as the protocol needs',
        'Fast — under ten minutes per scan, no preparation, no contrast',
        'Validated for fracture-risk prediction in postmenopausal women and older adults',
        'Trackable year-over-year so you can see the protocol working',
        'No fasting, no IV, no fixed posture — accessible for every age and mobility',
        'If QUS flags concern, we coordinate hospital-grade DEXA confirmation',
      ],
    },
    benefits: [
      'Flag early bone-density decline before fragility fractures occur',
      'Track the effect of strength training, vitamin D, K2 and calcium interventions',
      'Quantify the benefit of HRT or other bone-protective therapy',
      'Re-test as often as needed — radiation-free across the entire programme',
      'Build a skeletal-preservation protocol you can verify is working',
      'Catch sub-clinical loss in early menopause, GLP-1 use, or chronic steroid therapy',
    ],
    process: [
      {
        n: '01',
        title: 'Scan',
        body: 'You sit comfortably with your foot positioned in the ultrasound device. Sound waves pass through your heel for a non-invasive bone-strength reading. Total time: under 10 minutes.',
      },
      {
        n: '02',
        title: 'Score',
        body: 'Speed of Sound, Broadband Ultrasound Attenuation, a Stiffness Index, and an estimated T-score relative to peak adult bone are returned alongside your fracture-risk band.',
      },
      {
        n: '03',
        title: 'Protect',
        body: 'A precision bone-preservation protocol — strength training, micronutrient repletion, hormonal support if indicated. If results warrant a definitive diagnosis, we coordinate a hospital DEXA referral.',
      },
    ],
    whoFor: [
      'Women in peri-menopause, menopause or post-menopause',
      'Men over 50, especially with low testosterone or prior fragility fracture',
      'Patients on long-term steroid, GLP-1 or aromatase-inhibitor therapy',
      'Patients with thyroid disorders, coeliac disease, or chronic kidney disease',
      'Anyone with a parent or sibling who has had an osteoporotic fracture',
      'Athletes, especially endurance athletes and those with low energy availability',
    ],
    technical: [
      { k: 'Method', v: 'Quantitative ultrasound (QUS) — calcaneal' },
      { k: 'Sites measured', v: 'Calcaneus (heel bone)' },
      { k: 'Output', v: 'SOS · BUA · Stiffness Index · estimated T-score · fracture-risk band' },
      { k: 'Radiation', v: 'Zero — no ionising radiation' },
      { k: 'Re-test', v: 'Every 6–12 months — safe to repeat as protocol needs' },
    ],
    related: ['blood-tests', 'body-composition', 'biological-clock'],
  },
  {
    slug: 'biological-clock',
    name: 'Biological Clock — Epigenetic Age',
    shortName: 'Biological Clock',
    category: 'Epigenomic',
    duration: '5 min collection · 28-day report',
    sampleType: 'Saliva or blood spot',
    heroImg: '/diagnostics/biological-clock.jpg',
    heroAlt: 'Man with clock and world-map tattoo — biological age',
    tagline: 'Three validated clocks. Your true biological age.',
    intro:
      'GrimAge, PhenoAge and Horvath analysis of DNA methylation across 9 million base pairs — the most accurate measure of true biological age and remaining healthspan available today.',
    whatItIs: {
      title: 'Why your birthday is the wrong number',
      body: [
        'Chronological age is fixed — the number of years since you were born. Biological age is dynamic — how old your body actually is, measured by how your DNA is being expressed. Two people with the same birthday can have biological ages a decade apart.',
        'Our test runs three of the most validated epigenetic clocks — GrimAge, PhenoAge, and Horvath — across 9 million DNA methylation sites. The result is a single number that predicts mortality risk, healthspan, and the rate at which you are ageing right now.',
      ],
    },
    whySuperior: {
      title: 'Why three clocks, not one',
      intro:
        'Different clocks capture different signals. GrimAge predicts mortality. PhenoAge predicts disease. Horvath captures cellular ageing. Together they triangulate truth.',
      points: [
        'Three peer-reviewed clocks (GrimAge / PhenoAge / Horvath)',
        '9 million CpG methylation sites analysed',
        'Validated against mortality and disease risk in 100,000+ subjects',
        'Re-tested at programme completion — progress made measurable',
        'Most patients reverse biological age by 5–15 years over 12 months',
      ],
    },
    benefits: [
      'Establish how old your body actually is — independent of your birthday',
      'Track the precise rate at which you are ageing — and whether interventions are reversing it',
      'Stratify your mortality and disease risk over the next decade',
      'Validate longevity protocols (sleep, nutrition, exercise, supplementation) with hard data',
      'Make ageing visible, measurable, and reversible',
      'Catch accelerated ageing early — when intervention still works',
    ],
    process: [
      {
        n: '01',
        title: 'Collect',
        body: 'A simple saliva swab or finger-prick blood spot at home. Five minutes total.',
      },
      {
        n: '02',
        title: 'Sequence',
        body: 'Sample shipped for whole-methylome analysis — 9 million CpG sites read across the genome.',
      },
      {
        n: '03',
        title: 'Reverse',
        body: 'A precision longevity protocol built around the specific drivers of your accelerated ageing — re-tested at programme completion to confirm reversal.',
      },
    ],
    whoFor: [
      'Anyone over 30 who wants to know their true biological age',
      'Patients in a longevity programme — for objective progress measurement',
      'Patients with a family history of accelerated decline or premature death',
      'Patients tracking the impact of HRT, peptides, or major lifestyle interventions',
      'Anyone serious about ageing as a measurable, modifiable process',
    ],
    technical: [
      { k: 'Method', v: 'DNA methylation array (whole methylome)' },
      { k: 'Clocks run', v: 'GrimAge + PhenoAge + Horvath' },
      { k: 'Sites analysed', v: '9 million CpG methylation sites' },
      { k: 'Sample', v: 'Saliva swab or capillary blood spot' },
      { k: 'Re-test', v: 'At programme completion to confirm reversal' },
    ],
    related: ['genetic-testing', 'gut-microbiota', 'blood-tests'],
  },
]

export function getDiagnosticBySlug(slug: string): Diagnostic | undefined {
  return DIAGNOSTICS.find((d) => d.slug === slug)
}
