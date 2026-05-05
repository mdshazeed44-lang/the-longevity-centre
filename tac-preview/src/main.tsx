/**
 * Application entry. Mounts <App> which provides the chrome (Header,
 * Footer, smooth scroll, cursor) and renders the current route inside
 * a <Suspense> boundary so lazy-loaded pages show a skeleton fallback
 * during chunk fetch.
 */
import { createRoot } from 'react-dom/client'
import { Suspense } from 'react'
import './index.css'
import App from './App'
import { Router } from './routes'
import { PageFallback } from './components/PageFallback'

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root not found in index.html')

createRoot(root).render(
  <App>
    <Suspense fallback={<PageFallback />}>
      <Router />
    </Suspense>
  </App>
)
