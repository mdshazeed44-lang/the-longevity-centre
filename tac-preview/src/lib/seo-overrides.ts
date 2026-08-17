/**
 * seo-overrides.ts — per-page SEO overrides sourced from the client's
 * "The Longevity Centre Work Sheet.xlsx" (Meta Tags + Schema sheets),
 * implemented 2026-07-21 per client request.
 *
 * META_OVERRIDES is keyed by route path (no trailing slash; home = '/').
 * useDocumentMeta (src/lib/seo.ts) and scripts/inject-meta.cjs both read
 * this map, so a page's <title>, <meta description> and <meta keywords>
 * come from here whenever an entry exists — otherwise the page keeps its
 * own defaults. Goa + Hyderabad rows from the sheet are intentionally
 * omitted (those centres were removed on 2026-07-21).
 */
export interface SeoOverride {
  title: string
  description: string
  keywords: string
}

export const META_OVERRIDES: Record<string, SeoOverride> = {
  "/": {
    title: "Best Longevity Clinic Across 6 Cities - The Longevity Centre",
    description: "The Longevity Centre is the India's first doctor-led longevity clinic offering diagnostics-led metabolic, gut, weight & biological-age care across 6 centres.",
    keywords: "longevity clinic",
  },
  "/about-us": {
    title: "About Us | Best Longevity Doctor - The Longevity Centre",
    description: "Meet longevity doctor founders Dr. Abhinav Sharma, (MBBS, MS, 11,000+ surgeries) & Dr. Bhavna Sharma \n(IVF, 8,000+ pregnancies) & 20+ years of preventive medicine.",
    keywords: "Longevity doctor",
  },
  "/programs": {
    title: "Top 7 Longevity Treatment Programs - The Longevity Centre",
    description: "TLC's seven flagship longevity and metabolic programmes offer physician-led longevity treatment, rooted in diagnostics and continuously refined. Consult now.",
    keywords: "longevity treatment",
  },
  "/programs/metabolic-weight-loss": {
    title: "Weight Loss Clinic | Metabolic Syndrome - The Longevity Centre",
    description: "Struggling with stubborn weight gain? Our metabolic syndrome treatment and weight loss clinic uses 165 biomarkers and hormone testing to find the root cause.",
    keywords: "weight loss clinic, metabolic syndrome treatment",
  },
  "/programs/gut-metabolic": {
    title: "Gut Restoration | Metabolic Disorders - The Longevity Centre",
    description: "Complete shotgun metagenomic sequencing of your Gut Microbiome for diversity, imbalances and inflammation, gut restoration and metabolic disorder treatment.",
    keywords: "gut restoration, metabolic disorder treatment",
  },
  "/programs/longevity-plus": {
    title: "Gut Health and Metabolism Treatment - The Longevity Centre",
    description: "Longevity Plus delivers biological transformation across gut health and metabolism, hormones, genes, and epigenetics, measured by three biological age clocks.",
    keywords: "gut health and metabolism",
  },
  "/programs/advanced-metabolomics": {
    title: "Book The Best Metabolomics Testing - The Longevity Centre",
    description: "High-resolution metabolomics testing analysing thousands of metabolites to identify sub-clinical dysfunction long before disease declares itself. Consult today",
    keywords: "metabolomics testing",
  },
  "/programs/diabetes-fatty-liver-reversal": {
    title: "Type 2 Diabetes & Fatty Liver Reversal - The Longevity Centre",
    description: "Root-cause precision medicine for prediabetes, type 2 diabetes reversal, and Fatty Liver Reversal. A reversal pathway, not symptomatic management. Consult now!",
    keywords: "type 2 diabetes reversal, Fatty Liver Reversal",
  },
  "/programs/pcod-correction": {
    title: "PCOD Treatment | PCOD Symptoms - The Longevity Centre",
    description: "Multi-system correction for PCOD treatment, addressing PCOD symptoms, metabolic, hormonal, and microbiome health in a comprehensive programme in India.",
    keywords: "PCOD treatment, pcod symptoms",
  },
  "/programs/cancer-prevention": {
    title: "Cancer Risk & Prevention & Risk Factors - The Longevity Centre",
    description: "Cancer Risk and Prevention need early action. Track cancer risk factors precisely and choose an early cancer detection centre before disease takes control.",
    keywords: "Cancer Risk and Prevention, cancer risk factors",
  },
  "/diagnostics": {
    title: "Best Longevity Medical Clinic - The Longevity Centre",
    description: "Longevity medical clinic with nine validated diagnostic protocols, genomic, epigenomic, metabolic, microbiome and cellular. Measure first, intervene second.",
    keywords: "Longevity medical clinic",
  },
  "/diagnostics/oligoscan": {
    title: "Book Your Oligoscan Test Online - The Longevity Centre",
    description: "OligoScan test is a non-invasive optical scan that measures intracellular minerals and heavy metals in real time, revealing cellular-level imbalances.",
    keywords: "oligoscan test",
  },
  "/diagnostics/genetic-testing": {
    title: "Book a Genetic Testing for Longevity - The Longevity Centre",
    description: "Genetic testing for longevity analyses 323 genes covering metabolism, hormones, cardiovascular risk and longevity pathways. Sampled once, used for life.",
    keywords: "genetic testing for longevity",
  },
  "/diagnostics/gut-microbiota": {
    title: "Gut Microbiome Test | Whole Genome Sequencing - The Longevity Centre",
    description: "Gut microbiome test with whole genome sequencing test to assess diversity, imbalances, compromised pathways and inflammation beyond partial 16S panels.",
    keywords: "gut microbiome test , Whole genome sequencing test",
  },
  "/diagnostics/face-scan": {
    title: "Book Your Face Analysis Test - The Longevity Centre",
    description: "High-resolution face analysis test measuring skin hydration, elasticity, pigmentation depth and surface texture for a quantitative aesthetic medicine plan.",
    keywords: "face analysis test,",
  },
  "/diagnostics/endopat": {
    title: "Book Your EndoPAT Test Onine - The Longevity Centre",
    description: "EndoPAT test is a 15-minute non-invasive test of endothelial reactivity, detecting early cardiovascular risk before cholesterol or blood pressure shifts.",
    keywords: "endopat test",
  },
  "/diagnostics/blood-tests": {
    title: "Book Advanced Longevity Blood Test - The Longevity Centre",
    description: "Get an advanced longevity blood test with 160 markers covering metabolic, hormonal, inflammatory, heart, nutritional and organ health for complete insights.",
    keywords: "advanced longevity blood test",
  },
  "/diagnostics/body-composition": {
    title: "Body Composition Analysis Test - The Longevity Centre",
    description: "Segmental body composition analysis test for fat percentage, lean mass, visceral fat and water balance, tracked monthly beyond what a scale can show. Consult now.",
    keywords: "body composition analysis test",
  },
  "/diagnostics/bone-mineral-density": {
    title: "Bone Mineral Density Scan | DEXA Scan - The Longevity Centre",
    description: "Quantitative ultrasound bone mineral density scan at the heel offers fast, radiation-free screening to detect early bone loss and complement a DEXA scan.",
    keywords: "bone mineral density scan, DEXA scan",
  },
  "/diagnostics/biological-clock": {
    title: "Book Your Biological Age Test - The Longevity Centre",
    description: "Biological Age Test with GrimAge, PhenoAge and Horvath analysis of DNA methylation across 9 million base pairs to measure true biological age and healthspan.",
    keywords: "Biological Age Test",
  },
  "/skin-aesthetics": {
    title: "Best Skin Treatment Clinic - The Longevity Centre",
    description: "Dermatology-led anti-aging skin treatment clinic at TLC for pigmentation, acne, dullness, fine lines and wrinkles. Lasers, peels and facials by physicians.",
    keywords: "skin treatment clinic",
  },
  "/skin-aesthetics/skin-prp": {
    title: "Book a Advanced Skin PRP Treatment - The Longevity Centre",
    description: "Skin PRP treatment uses your own blood platelets, rich in growth factors, to stimulate cellular renewal naturally through autologous therapy with minimal risk.",
    keywords: "skin prp treatment",
  },
  "/skin-aesthetics/hydrafacial": {
    title: "Advanced Hydrafacial Treatment - The Longevity Centre",
    description: "Advanced hydrafacial treatment combines cleansing, exfoliation, painless extraction and antioxidant infusion for plump, glowing, hydrated skin with no downtime.",
    keywords: "advanced hydrafacial",
  },
  "/skin-aesthetics/laser-hair-reduction": {
    title: "Best Clinic for Laser Hair Reduction - The Longevity Centre",
    description: "Visit the best clinic for Laser Hair Reduction with Quanta Long Pulse Laser from Italy, CE and FDA approved, safe for all skin types (I-VI), with no gel & risk.",
    keywords: "clinic for Laser Hair Reduction",
  },
  "/skin-aesthetics/hair-transplant": {
    title: "Best FUE Hair Transplant Clinic - The Longevity Centre",
    description: "Best FUE hair transplant clinic offering doctor-led restoration for androgenetic hair loss, minimal scarring, natural hairline design and diagnostic workup.",
    keywords: "hair transplant clinic",
  },
  "/skin-aesthetics/chemical-peels": {
    title: "Chemical Peel for Pigmentation - The Longevity Centre",
    description: "The best chemical peel for pigmentation exfoliates the top skin layer to reveal fresher skin, improving uneven texture and fine lines through cellular renewal.",
    keywords: "chemical peel for pigmentation",
  },
  "/skin-aesthetics/microneedling-with-dermapen": {
    title: "Dermapen Microneedling Treatment - The Longevity Centre",
    description: "Dermapen microneedling treatment creates micro-injuries to boost natural collagen production, improving skin texture, scars, fine lines and tone across your face..",
    keywords: "Microneedling Treatment",
  },
  "/skin-aesthetics/hair-loss-solutions": {
    title: "Best Hair Loss Treatment Clinic- The Longevity Centre",
    description: "A 360° approach to hair loss at our hair loss treatment clinic. We diagnose deficiencies, perform PRP and offer Hair Transplant for multiple hair loss types.",
    keywords: "hair loss treatment clinic",
  },
  "/skin-aesthetics/fillers-botox-skin-boosters": {
    title: "Best Botox and Fillers Treatment - The Longevity Centre",
    description: "Botox and fillers treatment to relax wrinkles and restore volume, plus Skin Boosters for hydration. Combinable treatments using FDA-approved products. Book now.",
    keywords: "botox and fillers treatment",
  },
  "/centres": {
    title: "Best Longevity Medical Centre - The Longevity Centre",
    description: "TLC operates 6 longevity medical centre in Delhi, Gurgaon, Mumbai, Pune, Nagpur, & Bangalore. Diagnostics-led, physician-guided preventive medicine, one record.",
    keywords: "longevity medical centre",
  },
  "/centres/delhi": {
    title: "Best Longevity Clinic in New Delhi - The Longevity Centre",
    description: "Visit our Longevity clinic Greater Kailash 1 New Delhi for personalized preventive healthcare, diagnostics, and healthy aging programs. Book your consultation now.",
    keywords: "Longevity clinic Greater Kailash New Delhi",
  },
  "/centres/gurgaon": {
    title: "Best Longevity Clinic in Gurgaon - The Longevity Centre",
    description: "Visit our Longevity clinic Sohna Road Gurgaon for advanced diagnostics, preventive healthcare, and personalized longevity programs. Book your consultation.",
    keywords: "Longevity clinic Sohna Road Gurgaon",
  },
  "/centres/mumbai": {
    title: "Best Longevity Clinic in Mumbai - The Longevity Centre",
    description: "Book an appointment at our Longevity clinic Bandra Mumbai for preventive healthcare, advanced diagnostics, and personalized wellness programs. Consult today.",
    keywords: "Longevity clinic Bandra Mumbai",
  },
  "/centres/pune": {
    title: "Best Longevity Clinic in Pune - The Longevity Centre",
    description: "Visit our Longevity clinic Hadapsar Pune for expert diagnostics, personalized preventive healthcare, and healthy aging solutions. Schedule your visit today.",
    keywords: "Longevity clinic Hadapsar Pune",
  },
  "/centres/nagpur": {
    title: "Best Longevity Clinic in Nagpur - The Longevity Centre",
    description: "Choose our Longevity clinic Dharampeth Nagpur for advanced health assessments, preventive care, and personalized longevity programs. Book your consultation now.",
    keywords: "Longevity clinic Dharampeth Nagpur",
  },
  "/centres/bangalore": {
    title: "Longevity Clinic in Bangalore - The Longevity Centre",
    description: "Visit our Longevity clinic Sadashivanagar Bangalore for preventive healthcare, expert diagnostics, and customized longevity solutions. Book a consultation now",
    keywords: "Longevity clinic Sadashivanagar Bangalore",
  },
  "/contact": {
    title: "Contact our Longevity Health Center - The Longevity Centre",
    description: "Speak with our longevity health center medical team via WhatsApp. Get a 30-minute personalised consultation across six clinics in India with no commitment.",
    keywords: "longevity health center",
  },
}
