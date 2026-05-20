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

type AnyComponent = ComponentType | LazyExoticComponent<ComponentType>

interface RouteEntry {
  /** Either an exact path (e.g. '/about') or a prefix matched via startsWith. */
  match: { path: string; prefix?: boolean }
  Component: AnyComponent
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
  const [path, setPath] = useState(() =>
    window.location.pathname.replace(/\/$/, '')
  )
  useEffect(() => {
    const onPop = () =>
      setPath(window.location.pathname.replace(/\/$/, ''))
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
