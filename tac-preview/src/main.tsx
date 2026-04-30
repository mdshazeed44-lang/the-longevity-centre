import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'

// Tiny path-based router — no react-router needed for two pages
function getPage() {
  const path = window.location.pathname.replace(/\/$/, '')
  if (path === '/about') return <AboutPage />
  return <HomePage />
}

createRoot(document.getElementById('root')!).render(<App>{getPage()}</App>)
