// HomePage — composition of all main marketing sections.
// Extracted from App.tsx so App can stay as a chrome shell
// (Preloader · Cursor · Header · {children} · Footer · Lenis smooth scroll).
import { Hero } from '../components/Hero'
import { BenefitsHome } from '../components/BenefitsHome'
import { ProgramsHome as Programs } from '../components/ProgramsHome'
import { Method } from '../components/Method'
import { VideoTestimonials } from '../components/VideoTestimonials'
import { PressStrip } from '../components/sections/PressStrip'
import { ScienceCards } from '../components/sections/ScienceCards'
import { ResultsSplit } from '../components/sections/ResultsSplit'
import { Editorial } from '../components/sections/Editorial'
import { ClinicsBand } from '../components/sections/ClinicsBand'
import { BrochureCTA } from '../components/sections/BrochureCTA'
import { CtaBand } from '../components/sections/CtaBand'
import { useDocumentMeta } from '../lib/seo'

const HOME_META = {
  title: 'TLC — Precision Longevity Medicine, India',
  description:
    "India's first doctor-led personalised longevity programme. Diagnostics-led care across longevity, metabolic, gut, weight loss and biological-age reversal.",
  path: '/',
  ogImage: '/og/home.jpg',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://thelongevitycentre.com/#webpage',
    url: 'https://thelongevitycentre.com/',
    name: 'TLC — The Longevity Centre · Precision Longevity Medicine, India',
    isPartOf: { '@id': 'https://thelongevitycentre.com/#organization' },
    about: { '@id': 'https://thelongevitycentre.com/#organization' },
    description:
      "India's first doctor-led personalised longevity programme. Diagnostics-led, physician-guided care across longevity, metabolic, gut and weight programmes.",
    inLanguage: 'en-IN',
  },
}

export function HomePage() {
  useDocumentMeta(HOME_META)
  return (
    <>
      <Hero />
      <BenefitsHome />
      <Programs />
      <PressStrip />
      <ScienceCards />
      <Method />
      <ResultsSplit />
      <Editorial />
      <VideoTestimonials />
      <ClinicsBand />
      <BrochureCTA />
      <CtaBand />
    </>
  )
}
