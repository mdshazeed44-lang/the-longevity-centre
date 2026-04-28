import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DnaPreviewPage } from './dna-preview/DnaPreviewPage'

const root = createRoot(document.getElementById('root')!)

// Simple route check — `?dna=1` shows the DNA-options preview page
const isDnaPreview = new URLSearchParams(window.location.search).has('dna')

root.render(isDnaPreview ? <DnaPreviewPage /> : <App />)
