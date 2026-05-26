// skin-treatments.ts — single source of truth for the 7 aesthetic
// treatments. Used by:
//   • Header.tsx                   — dropdown panel
//   • pages/SkinAestheticsPage     — /skin-aesthetics index
//   • pages/SkinAestheticsDetailPage — /skin-aesthetics/[slug] detail
//
// Content sourced from theantiagingcentre.com individual treatment
// pages (Skin PRP, Chemical Peels, Hydrafacial, Microneedling with
// Dermapen, Laser Hair Reduction, Hair Loss Solutions, Fillers/Botox/
// Skin Boosters).

export type SkinTreatment = {
  /** URL slug — /skin-aesthetics/[slug] */
  slug: string
  /** Header dropdown label */
  shortName: string
  /** Right-aligned dropdown tag */
  category: string
  /** Full title for detail page */
  title: string
  /** Eyebrow above the detail-page H1 (e.g. "Platelet-Rich Plasma") */
  eyebrow: string
  /** Hero image (also used on the index list) */
  image: string
  /** 1-2 paragraph description */
  description: string
  /** Conditions / concerns the treatment addresses */
  treats: string[]
  /** Outcomes / what the patient gets */
  benefits: string[]
  /** Sessions, intervals, durations */
  duration: string
  /** Optional clinical caveat or visible note */
  note?: string
  /** 4-step "How it works" — used on the detail page */
  process?: { n: string; title: string; body: string }[]
}

export const SKIN_TREATMENTS: SkinTreatment[] = [
  {
    slug: 'skin-prp',
    shortName: 'Skin PRP',
    category: 'Plasma',
    title: 'Skin PRP',
    eyebrow: 'Platelet-Rich Plasma',
    image: '/skin-aesthetics/01-prp-acp.jpg',
    description:
      "PRP (Platelet-Rich Plasma) therapy utilises your own blood platelets, rich in growth factors, to stimulate cellular renewal and tissue regeneration. We extract growth factors from a small blood sample through centrifugation, then concentrate them and inject the plasma into the skin for targeted rejuvenation — natural, autologous, minimal-risk.",
    treats: [
      'Facial wrinkles and fine lines',
      'Acne scars',
      'Hair loss',
      'Skin rejuvenation',
    ],
    benefits: [
      'Stimulates collagen production',
      'Improves skin texture and tone',
      'Minimises pores',
      'Enhances skin elasticity',
    ],
    duration: '1–3 sessions, 4–6 weeks apart',
    note: 'Visible improvement within 2–4 weeks. Long-lasting results.',
    process: [
      {
        n: '01',
        title: 'Blood draw',
        body: 'A small sample of your own blood is drawn from the arm under sterile conditions — typically 10–20 ml.',
      },
      {
        n: '02',
        title: 'Centrifugation',
        body: 'The sample is spun at high speed in a closed system, separating concentrated platelets and growth factors from the rest of the blood.',
      },
      {
        n: '03',
        title: 'Targeted injection',
        body: 'The platelet-rich layer is injected into the treatment areas using a fine needle — face, scalp or scar tissue, depending on the goal.',
      },
      {
        n: '04',
        title: 'Recovery & review',
        body: 'Mild redness for a day or two. Photographic comparison and a clinical review at the next session decide whether to continue or stop.',
      },
    ],
  },
  {
    slug: 'chemical-peels',
    shortName: 'Chemical Peels',
    category: 'Peels',
    title: 'Chemical Peels',
    eyebrow: 'Cellular Renewal',
    image: '/skin-aesthetics/02-peels.jpg',
    description:
      "A carefully formulated solution applied to exfoliate the top layer of skin, revealing fresher, smoother skin underneath. The treatment stimulates cellular turnover — addressing concerns like uneven texture, fine lines, and pigmentation. Depth and active ingredients are matched to your skin's tolerance.",
    treats: [
      'Uneven skin tone from excess tanning',
      'Irregular pigmentation and dark patches',
      'Fine lines and rough texture',
      'Dullness and loss of radiance',
    ],
    benefits: [
      'Removes dead skin for a fresh, smooth canvas',
      'Stimulates collagen to soften lines',
      'Lightens dark spots and hyperpigmentation',
      'Improves overall texture',
    ],
    duration: 'Series of 4–6 sessions, depending on depth',
    process: [
      {
        n: '01',
        title: 'Skin assessment',
        body: 'Fitzpatrick skin type, sensitivity, and concern mapping. We pick the chemistry — glycolic, salicylic, TCA or Cosmelan — to match.',
      },
      {
        n: '02',
        title: 'Prep',
        body: 'Skin is cleansed, degreased, and a barrier cream applied to sensitive perimeters. Eyes and lips are protected.',
      },
      {
        n: '03',
        title: 'Application',
        body: 'The solution is applied evenly with a brush and timed precisely — typically 3–10 minutes depending on agent and depth.',
      },
      {
        n: '04',
        title: 'Neutralise & post-care',
        body: 'The peel is neutralised, soothing serums are applied, and you leave with a written post-care routine — sunscreen and moisturiser are non-negotiable.',
      },
    ],
  },
  {
    slug: 'hydrafacial',
    shortName: 'Hydrafacial',
    category: 'Facial',
    title: 'Hydrafacial',
    eyebrow: 'Multi-Step Rejuvenation',
    image: '/skin-aesthetics/03-hydrafacial.jpg',
    description:
      "A multi-step skincare treatment that integrates cleansing, exfoliation, extraction, hydration, and antioxidant infusion through a specialised device — in a single sitting. Quenches your skin's thirst with painless extraction and nourishing serums infused deep into the pores.",
    treats: [
      'Acne and congested pores',
      'Fine lines',
      'Uneven tone',
      'Dehydrated, dull skin',
    ],
    benefits: [
      'Deep cleansing + impurity extraction',
      'Hydration boost with nourishing serums',
      'Plump, dewy appearance',
      'Immediate visible improvement',
    ],
    duration: '30–60 minutes · no downtime',
    note: 'Perfect for events — visible glow same-day.',
    process: [
      {
        n: '01',
        title: 'Cleanse',
        body: 'A vortex tip lifts away dirt, makeup and dead cells while the skin is hydrated.',
      },
      {
        n: '02',
        title: 'Peel',
        body: 'A gentle glycolic-salicylic mix loosens debris in the pores without irritation.',
      },
      {
        n: '03',
        title: 'Extract',
        body: 'Painless vacuum extraction clears blackheads and congestion — the part traditional facials hurt during.',
      },
      {
        n: '04',
        title: 'Hydrate & infuse',
        body: 'Antioxidants, peptides and hyaluronic acid are infused into freshly cleansed skin. You leave glowing.',
      },
    ],
  },
  {
    slug: 'microneedling-with-dermapen',
    shortName: 'Microneedling',
    category: 'Collagen',
    title: 'Microneedling with Dermapen',
    eyebrow: 'Collagen Induction',
    image: '/skin-aesthetics/04-microneedling-v2.jpg',
    description:
      "A minimally invasive procedure using tiny needles to create micro-injuries, triggering the skin's natural healing process and stimulating collagen production. The Dermapen 4 offers advanced automated needling with adjustable depth and speed — tailored to each area of your face.",
    treats: [
      'Fine lines and wrinkles',
      'Acne scars',
      'Hyperpigmentation',
      'Uneven texture and tone',
      'Stretch marks',
    ],
    benefits: [
      'Improves skin texture and tone',
      'Reduces fine lines and wrinkles',
      'Minimises pores',
      'Fades scars and stretch marks',
      'Enhances elasticity',
    ],
    duration: '3–6 sessions, 4–6 weeks apart',
    note:
      'Topical numbing cream applied — relatively painless. Suitable for sensitive skin.',
    process: [
      {
        n: '01',
        title: 'Numbing',
        body: 'A topical anaesthetic cream is applied for 20–30 minutes — most patients describe the procedure as comfortable.',
      },
      {
        n: '02',
        title: 'Needling pass',
        body: 'The Dermapen 4 glides over the area, creating microscopic channels at depths matched to each zone — finer around the eyes, deeper for scarring.',
      },
      {
        n: '03',
        title: 'Serum infusion',
        body: 'A clinical serum (hyaluronic acid, growth factors, or PRP) is driven into the open channels for amplified results.',
      },
      {
        n: '04',
        title: 'Recovery',
        body: 'Mild redness for 24–48 hours, like a sunburn. Strict sun protection for 7 days. Visible improvement at 2–4 weeks, full results at 3–6 months.',
      },
    ],
  },
  {
    slug: 'laser-hair-reduction',
    shortName: 'Laser Hair Reduction',
    category: 'Laser',
    title: 'Laser Hair Reduction',
    eyebrow: 'Quanta Long Pulse · Italy',
    image: '/skin-aesthetics/05-laser-v2.jpg',
    description:
      'Permanent hair reduction using the Quanta Long Pulse Laser from Italy — CE (Europe) and FDA approved. Each pulse treats multiple hairs in seconds. Universal compatibility across all skin types (I–VI) and hair types — including fine, coarse, and ingrown hair. No gel required, no risk of burns across skin tones.',
    treats: [
      'Unwanted hair on all body areas',
      'Ingrown hairs',
      'Patchy or paradoxical hair growth',
    ],
    benefits: [
      'Long-lasting, permanent reduction',
      'Precision targeting in sensitive areas',
      'Fewer ingrown hairs than shaving / waxing',
      'No gel required · immediate return to work',
      'Safe across all skin tones',
    ],
    duration: 'Fewer sessions than conventional diode lasers',
    note: 'CE + FDA approved · Made in Italy.',
    process: [
      {
        n: '01',
        title: 'Patch test',
        body: 'A test pulse on a discreet area confirms your skin\'s response and lets us calibrate energy precisely for your skin tone.',
      },
      {
        n: '02',
        title: 'Pre-shave',
        body: 'You arrive with the area shaved. The laser targets follicles below the skin — surface hair is not what we treat.',
      },
      {
        n: '03',
        title: 'Treatment',
        body: 'Eye protection on, the Quanta head sweeps the area in pulses. Most patients describe it as warm rubber band snaps.',
      },
      {
        n: '04',
        title: 'Cycle through sessions',
        body: 'Hair grows in cycles — we treat across 6–8 sessions spaced 4–6 weeks apart to catch all follicles in their active phase.',
      },
    ],
  },
  {
    slug: 'hair-loss-solutions',
    shortName: 'Hair Loss Solutions',
    category: 'Hair',
    title: 'Hair Loss Solutions',
    eyebrow: 'Diagnosis-First · 360° Care',
    image: '/skin-aesthetics/06-hair.jpg',
    description:
      'A 360-degree approach to hair loss — we diagnose and treat micronutrient deficiencies, perform PRP, and offer Hair Transplantation under one roof. Conditions addressed include androgenetic alopecia (male/female pattern), alopecia areata, and telogen effluvium.',
    treats: [
      'Androgenetic alopecia (male / female pattern)',
      'Alopecia areata (patchy hair loss)',
      'Telogen effluvium (excessive shedding)',
    ],
    benefits: [
      'Cellscan Spectrophotometry · micronutrient assessment',
      'State-of-the-art PRP with maximum growth factors',
      'Advanced Hair Transplant',
      'Plant-based supplementation',
      'Minimal scarring · permanent, natural results',
    ],
    duration: 'Tiered protocol — assessment through maintenance',
    process: [
      {
        n: '01',
        title: 'Diagnose',
        body: 'Trichoscopy of the scalp, hormonal panels (DHT, ferritin, thyroid), and Cellscan Spectrophotometry to identify micronutrient gaps.',
      },
      {
        n: '02',
        title: 'Correct the deficiency',
        body: 'Plant-based supplementation tailored to what your assessment revealed. Many cases stabilise on this step alone.',
      },
      {
        n: '03',
        title: 'Stimulate regrowth',
        body: 'PRP sessions with maximum growth-factor concentration, optionally combined with mesotherapy and LLLT (low-level laser therapy).',
      },
      {
        n: '04',
        title: 'Restore (when indicated)',
        body: 'For genetic pattern baldness past stabilisation, we offer advanced Hair Transplant with minimal scarring.',
      },
    ],
  },
  {
    // Hair Transplant — the surgical tier of TLC's hair-loss
    // protocol. Hair Loss Solutions (above) handles diagnosis +
    // PRP + supplementation; this page is the dedicated detail
    // page for the transplant procedure itself. Slot 08 follows
    // the existing 01-07 numeric image naming pattern.
    slug: 'hair-transplant',
    shortName: 'Hair Transplant',
    category: 'Hair',
    title: 'Hair Transplant',
    eyebrow: 'Advanced FUE · Permanent Restoration',
    image: '/skin-aesthetics/08-hair-transplant.jpg',
    description:
      'A doctor-led hair-transplant programme for permanent restoration of androgenetic hair loss. Advanced follicular-unit extraction (FUE) with minimal scarring, natural hairline design, and the same diagnostics-led workup that anchors every TLC protocol — micronutrient correction, hormonal screen, scalp trichoscopy — before a single graft is harvested.',
    treats: [
      'Androgenetic alopecia (male-pattern baldness, Norwood II–VI)',
      'Female-pattern hair thinning (Ludwig I–III)',
      'Receding hairline · temple recession · crown thinning',
      'Eyebrow / beard / moustache restoration',
      'Scar revision (post-surgical or post-trauma)',
    ],
    benefits: [
      'Permanent, natural-looking results — transplanted follicles are genetically resistant to DHT',
      'Minimal scarring — punctate FUE marks, no linear strip scar',
      'Out-patient procedure under local anaesthesia',
      'Hairline designed in consultation, frame-accurate to your face',
      'Lifetime growth — most patients see full coverage by month 9–12',
    ],
    duration: 'Single-day procedure · Visible growth by month 4 · Final result month 9–12',
    note:
      'Transplant is offered only after diagnostics confirm pattern baldness has stabilised. We don\'t operate on active shedding — that\'s what the Hair Loss Solutions protocol corrects first.',
    process: [
      {
        n: '01',
        title: 'Assess',
        body: 'Trichoscopy, hormonal panels (DHT, ferritin, thyroid), Cellscan Spectrophotometry and Norwood / Ludwig scaling. We confirm pattern baldness has stabilised — and rule out reversible causes like deficiency or telogen effluvium — before recommending surgery.',
      },
      {
        n: '02',
        title: 'Design',
        body: 'Hairline drawn in consultation. We use facial proportion landmarks (frontal hairline 7–9 cm above the glabella, temple-point geometry) so the result looks natural at 25 and at 65 — never a thick artificial line.',
      },
      {
        n: '03',
        title: 'Extract & implant',
        body: 'Single-day FUE under local anaesthesia. Donor follicles harvested from the occipital scalp with sub-millimetre punches, then implanted graft-by-graft into recipient sites at angles matched to surrounding native hair. No linear scar, no stitches.',
      },
      {
        n: '04',
        title: 'Recover',
        body: 'Scabs shed by day 10. Transplanted hair sheds at week 2–4 (this is expected — the follicle stays, only the visible shaft falls). Regrowth begins month 3, density visible by month 6, final density by month 9–12.',
      },
    ],
  },
  {
    slug: 'fillers-botox-skin-boosters',
    shortName: 'Fillers, Botox & Boosters',
    category: 'Injectables',
    title: 'Fillers, Botox & Skin Boosters',
    eyebrow: 'Restorative Injectables',
    image: '/skin-aesthetics/07-mesotherapy-v3.jpg',
    description:
      'Three complementary injectable treatments — Botox to relax muscle-driven wrinkles, Dermal Fillers to restore lost volume, and Skin Boosters with hyaluronic acid to deeply hydrate and revitalise. All three can be combined for comprehensive facial rejuvenation. FDA-approved products only.',
    treats: [
      "Forehead lines, frown lines, crow's feet (Botox)",
      'Nasolabial folds, lip enhancement, cheek contouring (Fillers)',
      'Dehydration, dullness, fine lines (Skin Boosters)',
    ],
    benefits: [
      'FDA-approved products only',
      'Quick procedure with minimal downtime',
      'Natural-looking, customised results',
      'Long-lasting effects',
      'Combinable for full-face rejuvenation',
    ],
    duration: 'In-clinic · effects last 4–12 months by product',
    note: 'Administered only by qualified physicians.',
    process: [
      {
        n: '01',
        title: 'Consult & map',
        body: 'A physician examines facial dynamics — animation lines vs static creases — and maps a plan that respects your natural anatomy.',
      },
      {
        n: '02',
        title: 'Prep',
        body: 'Skin cleansed, photographs taken, points marked. Topical anaesthetic for filler areas; injection-grade prep for Botox.',
      },
      {
        n: '03',
        title: 'Inject',
        body: 'Botox into muscle bellies, fillers into the deeper plane to restore volume, boosters into the dermis for hydration. Precise dosing, slow technique.',
      },
      {
        n: '04',
        title: 'Two-week review',
        body: 'Botox effect peaks at 14 days — that\'s when we review symmetry and add micro-corrections if needed. Filler is reviewed at 4 weeks.',
      },
    ],
  },
]

export function getSkinTreatmentBySlug(
  slug: string
): SkinTreatment | undefined {
  return SKIN_TREATMENTS.find((t) => t.slug === slug)
}
