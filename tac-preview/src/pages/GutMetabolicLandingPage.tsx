/**
 * GutMetabolicLandingPage — paid-ad LP for the Gut & Metabolic
 * programme. Mounted at /gut-metabolic-india-lp.
 *
 * Thin wrapper around <AdLandingPage /> — same structure, layout,
 * components and form wiring as the Longevity LP, but with a
 * Gut-&-Metabolic-specific hero (eyebrow, headline, sub) and a
 * distinct LSQ Source tag so the clinic team can filter leads by
 * which campaign converted.
 *
 * Add more campaigns the same way: define the Campaign config in
 * src/lib/landing-campaigns.ts, register a route in routes.tsx,
 * add the path to CHROMELESS_ROUTES in App.tsx, and add a
 * staticPages entry in scripts/inject-meta.cjs.
 */
import { AdLandingPage } from './AdLandingPage'
import { GUT_METABOLIC_CAMPAIGN } from '../lib/landing-campaigns'

export function GutMetabolicLandingPage() {
  return <AdLandingPage campaign={GUT_METABOLIC_CAMPAIGN} />
}
