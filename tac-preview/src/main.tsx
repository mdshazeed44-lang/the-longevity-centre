import { createRoot } from 'react-dom/client'
import { lazy, Suspense } from 'react'
import './index.css'
import App from './App.tsx'
import { HomePage } from './pages/HomePage'

// Non-home pages are lazy-loaded — keeps the initial bundle small so the
// homepage paints quickly. The route the user is currently on is the only
// one that's downloaded eagerly.
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const CentresPage = lazy(() => import('./pages/CentresPage').then((m) => ({ default: m.CentresPage })))
const LongevityProgramPage = lazy(() => import('./pages/LongevityProgramPage').then((m) => ({ default: m.LongevityProgramPage })))
const BenefitsDemoPage = lazy(() => import('./pages/BenefitsDemoPage').then((m) => ({ default: m.BenefitsDemoPage })))
const ProgramsIndexPage = lazy(() => import('./pages/ProgramsIndexPage').then((m) => ({ default: m.ProgramsIndexPage })))
const ProgramDetailPage = lazy(() => import('./pages/ProgramDetailPage').then((m) => ({ default: m.ProgramDetailPage })))
const DiagnosticsPage = lazy(() => import('./pages/DiagnosticsPage').then((m) => ({ default: m.DiagnosticsPage })))
const DiagnosticDetailPage = lazy(() => import('./pages/DiagnosticDetailPage').then((m) => ({ default: m.DiagnosticDetailPage })))
const CentreDetailPage = lazy(() => import('./pages/CentreDetailPage').then((m) => ({ default: m.CentreDetailPage })))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })))
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })))
const BlogPage = lazy(() => import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })))
const CareersPage = lazy(() => import('./pages/CareersPage').then((m) => ({ default: m.CareersPage })))

// Lightweight skeleton during page-chunk fetch — keeps layout reserved
function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold animate-pulse">
        — Loading —
      </div>
    </div>
  )
}

// Tiny path-based router — no react-router needed for a handful of pages
function getPage() {
  const path = window.location.pathname.replace(/\/$/, '')
  if (path === '/about') return <AboutPage />
  if (path === '/centres') return <CentresPage />
  if (path.startsWith('/centres/')) return <CentreDetailPage />
  if (path === '/privacy') return <PrivacyPage />
  if (path === '/terms') return <TermsPage />
  if (path === '/blog') return <BlogPage />
  if (path === '/careers') return <CareersPage />
  if (path === '/longevity-program') return <LongevityProgramPage />
  if (path === '/demo') return <BenefitsDemoPage />
  if (path === '/programs') return <ProgramsIndexPage />
  if (path.startsWith('/programs/')) return <ProgramDetailPage />
  if (path === '/diagnostics') return <DiagnosticsPage />
  if (path.startsWith('/diagnostics/')) return <DiagnosticDetailPage />
  return <HomePage />
}

createRoot(document.getElementById('root')!).render(
  <App>
    <Suspense fallback={<PageFallback />}>{getPage()}</Suspense>
  </App>
)
