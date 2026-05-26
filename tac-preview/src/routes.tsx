/**
 * Tiny path-based router. Lives in its own file so React Refresh's
 * "only-export-components" rule stays happy — main.tsx would otherwise
 * mix this with PageFallback and lose hot reload across every page.
 *
 * Pages are lazy-loaded — only the route the user lands on is downloaded
 * eagerly. Keeps initial bundle small (~45 kB gzipped) and the homepage
 * paints fast.
 */
import {
  lazy,
  useEffect,
  useState,
  type ComponentType,
  type LazyExoticComponent,
} from 'react'
import { HomePage } from './pages/HomePage'

const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
)
const CentresPage = lazy(() =>
  import('./pages/CentresPage').then((m) => ({ default: m.CentresPage }))
)
const CentreDetailPage = lazy(() =>
  import('./pages/CentreDetailPage').then((m) => ({ default: m.CentreDetailPage }))
)
const LongevityProgramPage = lazy(() =>
  import('./pages/LongevityProgramPage').then((m) => ({
    default: m.LongevityProgramPage,
  }))
)
const BenefitsDemoPage = lazy(() =>
  import('./pages/BenefitsDemoPage').then((m) => ({ default: m.BenefitsDemoPage }))
)
const ProgramsIndexPage = lazy(() =>
  import('./pages/ProgramsIndexPage').then((m) => ({ default: m.ProgramsIndexPage }))
)
const ProgramDetailPage = lazy(() =>
  import('./pages/ProgramDetailPage').then((m) => ({ default: m.ProgramDetailPage }))
)
const DiagnosticsPage = lazy(() =>
  import('./pages/DiagnosticsPage').then((m) => ({ default: m.DiagnosticsPage }))
)
const DiagnosticDetailPage = lazy(() =>
  import('./pages/DiagnosticDetailPage').then((m) => ({
    default: m.DiagnosticDetailPage,
  }))
)
const PrivacyPage = lazy(() =>
  import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage }))
)
const TermsPage = lazy(() =>
  import('./pages/TermsPage').then((m) => ({ default: m.TermsPage }))
)
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
)
const SkinAestheticsPage = lazy(() =>
  import('./pages/SkinAestheticsPage').then((m) => ({ default: m.SkinAestheticsPage }))
)
const SkinAestheticsDetailPage = lazy(() =>
  import('./pages/SkinAestheticsDetailPage').then((m) => ({
    default: m.SkinAestheticsDetailPage,
  }))
)
const BlogListPage = lazy(() =>
  import('./pages/BlogListPage').then((m) => ({ default: m.BlogListPage }))
)
const BlogDetailPage = lazy(() =>
  import('./pages/BlogDetailPage').then((m) => ({ default: m.BlogDetailPage }))
)

// Migrated blog slugs from legacy theantiagingcentre.com. Listed
// here as exact paths so the router maps them to the shared
// BlogDetailPage. Keep in lockstep with src/lib/blogs.ts.
const BLOG_SLUGS = [
  '10-tips-for-good-health',
  'healthy-body-mass-index',
  'botox-lips',
  'why-is-long-thick-hair-a-necessity',
  'worst-foods-for-gut-health',
  'body-sculpting-treatment',
  'can-hormones-affect-energy-levels',
  'low-energy-levels',
  'nd-yag-laser-vs-diode-best-for-lhr',
  'good-and-bad-habits',
  'hydrate-brighten-sunken-eyes-treatment',
  'types-of-acne-scars',
  'how-to-reverse-aging-with-diet',
  'pigmentation-and-dark-spots',
  'scalp-psoriasis-causes-symptoms-treatment',
  'reverse-aging',
  'morbid-obesity-class-3-obesity',
  'belly-fat-burner',
  'visceral-fat',
  'genetic-testing-in-india',
  'postpartum-hair-loss',
  'vitamin-deficiency-disease',
  'celebrity-like-flawless-skin',
  'full-body-laser-hair-removal-2',
  'prp-and-microneedling',
]

type AnyComponent = ComponentType | LazyExoticComponent<ComponentType>

interface RouteEntry {
  /** Either an exact path (e.g. '/about') or a prefix matched via startsWith. */
  match: { path: string; prefix?: boolean }
  Component: AnyComponent
}

/**
 * Legacy URL redirects from the old domain (theantiagingcentre.com).
 * Old indexed pages map to their new equivalents — preserves SEO and
 * makes inbound links from the old domain land on the right page.
 * Issued via window.history.replaceState so the browser URL updates
 * without an extra page navigation.
 *
 * Grouped by category for easy maintenance:
 *  - Programs (TAC's old programme URLs)
 *  - Diagnostics (slug renames between sites)
 *  - Skin aesthetics (old root-level URLs are now under /skin-aesthetics/)
 *  - Standalone service pages that don't have a 1:1 equivalent on the new
 *    site — sent to the closest contextual landing
 *  - SEO landing pages (location + intent targeted) — sent to the most
 *    relevant centre page or programme catalogue
 */
const REDIRECTS: Record<string, string> = {
  // ── Programmes ───────────────────────────────────────────────────────
  '/longevity-plus-program': '/programs/longevity-plus',
  '/metabolic': '/programs/metabolic-weight-loss',
  '/gut-correction-program': '/programs/gut-metabolic',
  '/pcod-treatment': '/programs/pcod-correction',
  '/fat-weight-loss': '/programs/metabolic-weight-loss',
  '/landing': '/programs',

  // ── Diagnostics (slug renames) ───────────────────────────────────────
  '/diagnostics/bca': '/diagnostics/body-composition',
  '/diagnostics/bmd': '/diagnostics/bone-mineral-density',
  '/diagnostics/genetic-test': '/diagnostics/genetic-testing',

  // ── Skin aesthetics (old root → new nested) ──────────────────────────
  '/chemical-peels': '/skin-aesthetics/chemical-peels',
  '/hydrafacial': '/skin-aesthetics/hydrafacial',
  '/microneedling': '/skin-aesthetics/microneedling-with-dermapen',
  '/laser-hair-reduction': '/skin-aesthetics/laser-hair-reduction',
  '/hair-loss-solutions': '/skin-aesthetics/hair-loss-solutions',
  '/skin-prp': '/skin-aesthetics/skin-prp',
  '/fillers-botox-and-skin-boosters': '/skin-aesthetics/fillers-botox-skin-boosters',

  // ── Standalone services now offered via skin-aesthetics ──────────────
  '/cool-sculpting': '/skin-aesthetics/cool-sculpting',
  '/viora-rf': '/skin-aesthetics/viora-rf',
  '/wonder-muscle': '/skin-aesthetics/wonder-muscle',

  // ── SEO landing pages (location-targeted) ────────────────────────────
  '/best-anti-aging-treatment-pune': '/centres/pune',
  '/laser-hair-removal-delhi': '/centres/delhi',
  '/best-dermatologist-in-gurgaon-for-your-skin': '/centres/gurgaon',

  // ── SEO landing pages (intent-targeted) ──────────────────────────────
  '/best-longevity-clinic-in-india': '/',
  '/longevity-clinic-in-india': '/',
  '/anti-aging-treatment-cost-in-india': '/programs',
  '/non-surgical-anti-aging-treatments-india': '/skin-aesthetics',
  '/non-surgical-face-lift-treatment-in-india': '/skin-aesthetics',
}

/**
 * Ordered route table. The first match wins, so place exact paths
 * before their prefix variants (e.g. '/centres' before '/centres/').
 */
const ROUTES: RouteEntry[] = [
  { match: { path: '/about-us' }, Component: AboutPage },
  // Legacy redirect target — old /about path still resolves to AboutPage so
  // existing inbound links / bookmarks keep working.
  { match: { path: '/about' }, Component: AboutPage },
  { match: { path: '/centres' }, Component: CentresPage },
  { match: { path: '/centres/', prefix: true }, Component: CentreDetailPage },
  { match: { path: '/privacy' }, Component: PrivacyPage },
  { match: { path: '/terms' }, Component: TermsPage },
  { match: { path: '/contact' }, Component: ContactPage },
  { match: { path: '/skin-aesthetics' }, Component: SkinAestheticsPage },
  {
    match: { path: '/skin-aesthetics/', prefix: true },
    Component: SkinAestheticsDetailPage,
  },
  { match: { path: '/longevity-program' }, Component: LongevityProgramPage },
  { match: { path: '/demo' }, Component: BenefitsDemoPage },
  { match: { path: '/programs' }, Component: ProgramsIndexPage },
  { match: { path: '/programs/', prefix: true }, Component: ProgramDetailPage },
  { match: { path: '/diagnostics' }, Component: DiagnosticsPage },
  { match: { path: '/diagnostics/', prefix: true }, Component: DiagnosticDetailPage },
  { match: { path: '/blog' }, Component: BlogListPage },
  ...BLOG_SLUGS.map((slug) => ({
    match: { path: `/${slug}` },
    Component: BlogDetailPage,
  })),
]

/**
 * Resolves the current `window.location.pathname` to a page component
 * and renders it. Unmatched paths fall back to <HomePage /> — a
 * deliberate choice while there is no dedicated 404 page.
 *
 * Subscribes to `popstate` so browser back/forward (and any
 * programmatic history.pushState followed by a popstate dispatch) flip
 * to the correct route. Without this, the router only resolved on
 * initial mount — back-button URL changes left the previous page
 * rendered.
 */
export function Router() {
  const [path, setPath] = useState(() => {
    const initial = window.location.pathname.replace(/\/$/, '')
    // Apply legacy redirects on initial mount so old indexed URLs
    // (from theantiagingcentre.com) land on the correct new page
    // without an extra render cycle.
    const redirectTo = REDIRECTS[initial]
    if (redirectTo) {
      window.history.replaceState(null, '', redirectTo)
      return redirectTo
    }
    return initial
  })
  useEffect(() => {
    const onPop = () => {
      const current = window.location.pathname.replace(/\/$/, '')
      const redirectTo = REDIRECTS[current]
      if (redirectTo) {
        window.history.replaceState(null, '', redirectTo)
        setPath(redirectTo)
      } else {
        setPath(current)
      }
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  for (const r of ROUTES) {
    const { path: p, prefix } = r.match
    if (prefix ? path.startsWith(p) : path === p) {
      const C = r.Component
      return <C />
    }
  }
  return <HomePage />
}
