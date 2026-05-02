import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { CentresPage } from './pages/CentresPage'
import { LongevityProgramPage } from './pages/LongevityProgramPage'

// Tiny path-based router — no react-router needed for a handful of pages
function getPage() {
  const path = window.location.pathname.replace(/\/$/, '')
  if (path === '/about') return <AboutPage />
  if (path === '/centres') return <CentresPage />
  if (path === '/longevity-program') return <LongevityProgramPage />
  return <HomePage />
}

createRoot(document.getElementById('root')!).render(<App>{getPage()}</App>)
