// HomePage — composition of all main marketing sections.
// Extracted from App.tsx so App can stay as a chrome shell
// (Preloader · Cursor · Header · {children} · Footer · Lenis smooth scroll).
import { Hero } from '../components/Hero'
import { BenefitsHome } from '../components/BenefitsHome'
import { ProgramsHome as Programs } from '../components/ProgramsHome'
import { Method } from '../components/Method'
import { VideoTestimonials } from '../components/VideoTestimonials'
import {
  PressStrip,
  ScienceCards,
  ResultsSplit,
  Editorial,
  ClinicsBand,
  BrochureCTA,
  CtaBand,
} from '../App'
import { useDocumentMeta } from '../lib/seo'

const HOME_META = {
  title: 'TLC — The Longevity Centre · Precision Longevity Medicine, India',
  description:
    "India's first doctor-led personalised longevity programme. Diagnostics-led, physician-guided programmes for longevity, metabolic health (diabetes, prediabetes, PCOD, thyroid), gut microbiome, weight loss and biological age reversal. Twenty-plus years of clinical experience. Six centres pan-India.",
  path: '/',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://theantiagingcentre.com/#webpage',
    url: 'https://theantiagingcentre.com/',
    name: 'TLC — The Longevity Centre · Precision Longevity Medicine, India',
    isPartOf: { '@id': 'https://theantiagingcentre.com/#organization' },
    about: { '@id': 'https://theantiagingcentre.com/#organization' },
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
