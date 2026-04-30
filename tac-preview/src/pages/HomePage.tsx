// HomePage — composition of all main marketing sections.
// Extracted from App.tsx so App can stay as a chrome shell
// (Preloader · Cursor · Header · {children} · Footer · Lenis smooth scroll).
import { Hero } from '../components/Hero'
import { Programs } from '../components/Programs'
import { Method } from '../components/Method'
import { VideoTestimonials } from '../components/VideoTestimonials'
import {
  PressStrip,
  ScienceCards,
  ResultsSplit,
  Editorial,
  Benefits,
  ClinicsBand,
  BrochureCTA,
  CtaBand,
} from '../App'
import { useDocumentMeta } from '../lib/seo'

const HOME_META = {
  title: 'TAC — Premium Anti-Aging & Preventive Medicine Clinic, India',
  description:
    "India's leading anti-aging and preventive medicine clinic. Personalised programmes for longevity, metabolic health (diabetes, prediabetes, PCOD, thyroid), gut microbiome, weight loss and elegant aesthetics. Twenty-plus years of experience. Five centres pan-India.",
  path: '/',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://theantiagingcentre.com/#webpage',
    url: 'https://theantiagingcentre.com/',
    name: 'TAC — Premium Anti-Aging & Preventive Medicine Clinic, India',
    isPartOf: { '@id': 'https://theantiagingcentre.com/#organization' },
    about: { '@id': 'https://theantiagingcentre.com/#organization' },
    description:
      "India's leading anti-aging and preventive medicine clinic. Personalised programmes for longevity, metabolic, gut, weight loss and aesthetics.",
    inLanguage: 'en-IN',
  },
}

export function HomePage() {
  useDocumentMeta(HOME_META)
  return (
    <>
      <Hero />
      <Programs />
      <PressStrip />
      <ScienceCards />
      <Method />
      <ResultsSplit />
      <Editorial />
      <Benefits />
      <VideoTestimonials />
      <ClinicsBand />
      <BrochureCTA />
      <CtaBand />
    </>
  )
}
