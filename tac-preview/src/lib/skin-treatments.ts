// skin-treatments.ts — short index of the seven aesthetic treatments
// listed on /skin-aesthetics. Used by the Header dropdown.
//
// Slugs MUST match the anchor IDs generated inside SkinAestheticsPage —
// title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
//
// Unlike /diagnostics or /programs, skin treatments don't have separate
// detail pages — they're anchored sections on /skin-aesthetics. So the
// dropdown links use #anchor rather than /[slug] paths.

export type SkinTreatment = {
  /** Anchor ID on /skin-aesthetics page */
  slug: string
  /** Short label for the header dropdown */
  shortName: string
  /** Small right-side tag in the dropdown row */
  category: string
}

export const SKIN_TREATMENTS: SkinTreatment[] = [
  { slug: 'skin-prp', shortName: 'Skin PRP', category: 'Plasma' },
  { slug: 'chemical-peels', shortName: 'Chemical Peels', category: 'Peels' },
  { slug: 'hydrafacial', shortName: 'Hydrafacial', category: 'Facial' },
  {
    slug: 'microneedling-with-dermapen',
    shortName: 'Microneedling',
    category: 'Collagen',
  },
  {
    slug: 'laser-hair-reduction',
    shortName: 'Laser Hair Reduction',
    category: 'Laser',
  },
  {
    slug: 'hair-loss-solutions',
    shortName: 'Hair Loss Solutions',
    category: 'Hair',
  },
  {
    slug: 'fillers-botox-skin-boosters',
    shortName: 'Fillers, Botox & Boosters',
    category: 'Injectables',
  },
]
