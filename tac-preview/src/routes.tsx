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
const SitemapPage = lazy(() =>
  import('./pages/SitemapPage').then((m) => ({ default: m.SitemapPage }))
)
const AdLandingPage = lazy(() =>
  import('./pages/AdLandingPage').then((m) => ({ default: m.AdLandingPage }))
)
const GutMetabolicLandingPage = lazy(() =>
  import('./pages/GutMetabolicLandingPage').then((m) => ({ default: m.GutMetabolicLandingPage }))
)
const BlogDetailPage = lazy(() =>
  import('./pages/BlogDetailPage').then((m) => ({ default: m.BlogDetailPage }))
)
const LandingPage = lazy(() =>
  import('./pages/LandingPage').then((m) => ({ default: m.LandingPage }))
)

// SEO landing pages migrated from theantiagingcentre.com as full content
// pages (not redirects). Slugs match the legacy paths exactly so Google
// ranking transfers. Update src/lib/landings.ts in lockstep.
const LANDING_SLUGS = [
  'best-longevity-clinic-in-india',
  'longevity-clinic-in-india',
  'non-surgical-face-lift-treatment-in-india',
  'anti-aging-treatment-cost-in-india',
  'non-surgical-anti-aging-treatments-india',
]

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

  // ── Legacy standalone services (CoolSculpting / Viora RF / Wonder
  //    Muscle were briefly added as individual pages, then removed.
  //    Old URLs land on the skin-aesthetics index instead.) ─────────────
  '/cool-sculpting': '/skin-aesthetics',
  '/viora-rf': '/skin-aesthetics',
  '/wonder-muscle': '/skin-aesthetics',

  // ── SEO landing pages (location-targeted) ────────────────────────────
  '/best-anti-aging-treatment-pune': '/centres/pune',
  '/laser-hair-removal-delhi': '/centres/delhi',
  '/best-dermatologist-in-gurgaon-for-your-skin': '/centres/gurgaon',

  // NOTE: Five intent-targeted SEO landing pages (best-longevity-clinic-in-
  // india, longevity-clinic-in-india, anti-aging-treatment-cost-in-india,
  // non-surgical-anti-aging-treatments-india, non-surgical-face-lift-
  // treatment-in-india) are NOT redirected — they exist as full content
  // pages under src/lib/landings.ts so the original SEO content is
  // preserved verbatim on the new domain.

  // ── Legacy blog/topic pages (0-traffic per Semrush but preserved for
  // SEO completeness — bookmarks, future backlinks, search index health).
  // Grouped by topical destination on the new site.

  // Hair-related → /skin-aesthetics/hair-loss-solutions or hair-transplant
  '/fue-hair-transplant': '/skin-aesthetics/hair-transplant',
  '/prp-hair-treatment': '/skin-aesthetics/skin-prp',
  '/prp-hair-treatment-debunking-myths': '/skin-aesthetics/skin-prp',
  '/hair-loss-stages': '/skin-aesthetics/hair-loss-solutions',
  '/hair-loss-treatment-receding-hairline': '/skin-aesthetics/hair-loss-solutions',
  '/hair-growth-tips': '/skin-aesthetics/hair-loss-solutions',
  '/female-pattern-baldness-in-20s': '/skin-aesthetics/hair-loss-solutions',
  '/alopecia-areata-self-care': '/skin-aesthetics/hair-loss-solutions',
  '/how-to-get-thicker-hair-naturally': '/skin-aesthetics/hair-loss-solutions',
  '/laser-hair-removal': '/skin-aesthetics/laser-hair-reduction',
  '/full-body-laser-hair-removal': '/skin-aesthetics/laser-hair-reduction',
  '/painless-effective-underarm-hair-removal': '/skin-aesthetics/laser-hair-reduction',
  '/understand-science-behind-laser-toning': '/skin-aesthetics/laser-hair-reduction',

  // Skin treatments → /skin-aesthetics/[specific] or /skin-aesthetics
  '/hifu-facial-treatment': '/skin-aesthetics',
  '/chin-fillers': '/skin-aesthetics/fillers-botox-skin-boosters',
  '/lip-fillers-cost': '/skin-aesthetics/fillers-botox-skin-boosters',
  '/get-fuller-lips': '/skin-aesthetics/fillers-botox-skin-boosters',
  '/under-eye-filler': '/skin-aesthetics/fillers-botox-skin-boosters',
  '/hyaluronic-acid-injections': '/skin-aesthetics/fillers-botox-skin-boosters',
  '/5-treatments-to-fix-under-eye-wrinkles': '/skin-aesthetics/fillers-botox-skin-boosters',
  '/the-culprits-behind-forehead-wrinkles': '/skin-aesthetics/fillers-botox-skin-boosters',
  '/coolsculpting-cost': '/skin-aesthetics',
  '/fat-freezing-treatment': '/skin-aesthetics',
  '/body-sculpting-treatments': '/skin-aesthetics',
  '/hydrafacial-sessions': '/skin-aesthetics/hydrafacial',
  '/hydrafacial-before-and-after': '/skin-aesthetics/hydrafacial',
  '/top-12-vampire-facial-benefits': '/skin-aesthetics/skin-prp',
  '/7-amazing-microneedling-benefits-on-skin': '/skin-aesthetics/microneedling-with-dermapen',
  '/laser-treatment-for-stretch-mark-removal': '/skin-aesthetics',
  '/how-to-tighten-face-skin': '/skin-aesthetics',
  '/how-to-tighten-face-skin-2': '/skin-aesthetics',
  '/lip-pigmentation-treatment': '/skin-aesthetics',
  '/how-to-restore-collagen-in-face': '/skin-aesthetics',
  '/open-pores-treatment-101': '/skin-aesthetics',
  '/tips-for-glowing-skin': '/skin-aesthetics',
  '/myths-about-skin-whitening-treatments': '/skin-aesthetics',
  '/understand-uneven-skin-tone': '/skin-aesthetics',
  '/how-to-reduce-melanin': '/skin-aesthetics',
  '/how-to-keep-skin-hydrated': '/skin-aesthetics',
  '/skincare-routine-for-summer': '/skin-aesthetics',
  '/skincare-routine-for-dry-skin-in-winter': '/skin-aesthetics',
  '/treatments-for-maintaining-fair-skin-tone': '/skin-aesthetics',
  '/do-you-have-a-dusky-skin-tone': '/skin-aesthetics',
  '/8-tips-for-managing-oily-skin-in-summer': '/skin-aesthetics',
  '/blackhead-removal': '/skin-aesthetics',

  // Diagnostic-related → /diagnostics/[specific] or /diagnostics
  '/body-composition-analysis': '/diagnostics/body-composition',
  '/bone-density-test-bmd': '/diagnostics/bone-mineral-density',
  '/dna-test': '/diagnostics/genetic-testing',
  '/gut-microbiome-testing': '/diagnostics/gut-microbiota',
  '/skin-analysis': '/diagnostics/face-scan',
  '/complete-health-checkup': '/diagnostics',
  '/fatigue-test': '/diagnostics',
  '/health-screenings': '/diagnostics',

  // Weight / Body composition → /programs/metabolic-weight-loss
  '/how-to-get-rid-of-love-handles-unlock-weight-loss-potential': '/programs/metabolic-weight-loss',
  '/fat-burner-for-women': '/programs/metabolic-weight-loss',
  '/exercises-to-lose-face-fat': '/programs/metabolic-weight-loss',
  '/how-to-reduce-neck-fat': '/programs/metabolic-weight-loss',
  '/sudden-weight-gain': '/programs/metabolic-weight-loss',
  '/sudden-weight-loss': '/programs/metabolic-weight-loss',
  '/different-body-fat-types': '/programs/metabolic-weight-loss',
  '/what-body-fat-percentage-is-healthy': '/programs/metabolic-weight-loss',
  '/how-can-we-increase-metabolism': '/programs/metabolic-weight-loss',
  '/loss-of-appetite': '/programs/metabolic-weight-loss',
  '/obesity-rate-in-india-is-killing-longevity': '/programs/metabolic-weight-loss',

  // Hormonal / Metabolic → /programs
  '/hormonal-changes-in-men': '/programs',
  '/hormonal-changes': '/programs',
  '/hormonal-therapy-means': '/programs',
  '/hormonal-imbalance-symptoms': '/programs',
  '/hormonal-imbalance-in-women': '/programs',
  '/prediabetes-and-insulin-resistance-how-to-reverse-metabolic-aging': '/programs',
  '/metabolic-health-vs-weight-for-longevity': '/programs',
  '/what-are-the-different-factors-affecting-metabolic-weight-loss-process': '/programs/metabolic-weight-loss',
  '/gut-health-metabolism-influence-biological-age': '/programs/gut-metabolic',

  // Gut health → /programs/gut-metabolic
  '/understanding-gut-health-in-india-digestive-issues-symptoms-treatment': '/programs/gut-metabolic',
  '/how-to-improve-gut-health': '/programs/gut-metabolic',
  '/gut-health-supplements': '/programs/gut-metabolic',

  // Wellness / generic health → home
  '/signs-of-accelerated-biological-aging': '/',
  '/biological-age-vs-chronological-age': '/',
  '/weak-immune-system': '/',
  '/improve-immunity-system': '/',
  '/sleep-deprivation-effects': '/',
  '/brain-fog-meaning': '/',
  '/heart-disease-prediction': '/',
  '/blood-pressure': '/',
  '/chronic-conditions': '/',
  '/knee-joint-pain': '/',
  '/joint-pain-causes': '/',
  '/low-back-pain': '/',
  '/bone-diseases': '/',
  '/genetic-disorders': '/',
  '/longevity-supplements': '/',
  '/how-tac-can-pave-your-way-to-a-long-life': '/',
  '/live-life-to-its-fullest': '/',
  '/quality-of-life': '/',
  '/longevity-for-a-healthier': '/',
  '/health-plan-helps-you-live-longer': '/',

  // Old WordPress blog index → new /blog
  '/category/blog': '/blog',
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
  { match: { path: '/programs' }, Component: ProgramsIndexPage },
  { match: { path: '/programs/', prefix: true }, Component: ProgramDetailPage },
  { match: { path: '/diagnostics' }, Component: DiagnosticsPage },
  { match: { path: '/diagnostics/', prefix: true }, Component: DiagnosticDetailPage },
  { match: { path: '/blog' }, Component: BlogListPage },
  { match: { path: '/sitemap' }, Component: SitemapPage },
  { match: { path: '/longevity-programme-india-lp' }, Component: AdLandingPage },
  { match: { path: '/gut-metabolic-india-lp' }, Component: GutMetabolicLandingPage },
  ...BLOG_SLUGS.map((slug) => ({
    match: { path: `/${slug}` },
    Component: BlogDetailPage,
  })),
  ...LANDING_SLUGS.map((slug) => ({
    match: { path: `/${slug}` },
    Component: LandingPage,
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
