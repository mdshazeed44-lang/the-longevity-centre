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
import { FoundersNote } from '../components/sections/FoundersNote'
import { ClinicsBand } from '../components/sections/ClinicsBand'
import { Faq } from '../components/sections/Faq'
import { CtaBand } from '../components/sections/CtaBand'
import { BrandAmbassadorHero } from '../components/sections/BrandAmbassadorHero'
import { useDocumentMeta } from '../lib/seo'

const HOME_META = {
  title: 'TLC — Precision Longevity Medicine, India · 8 Centres',
  description:
    "The Longevity Centre (TLC) — India's first doctor-led longevity programme. Diagnostics-led metabolic, gut, weight & biological-age care across 8 centres.",
  path: '/',
  ogImage: '/og/home.jpg',
  jsonLd: [
    // Primary WebPage entity — links to the site-wide Organization
    // and WebSite blocks defined in index.html.
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://thelongevitycentre.co/#webpage',
      url: 'https://thelongevitycentre.co/',
      name: 'TLC — The Longevity Centre · Precision Longevity Medicine, India',
      isPartOf: { '@id': 'https://thelongevitycentre.co/#website' },
      about: { '@id': 'https://thelongevitycentre.co/#organization' },
      primaryImageOfPage: 'https://thelongevitycentre.co/og/home.jpg',
      description:
        "India's first doctor-led personalised longevity programme. Eight centres pan-India. Diagnostics-led, physician-guided care across longevity, metabolic, gut, weight loss and biological-age reversal.",
      inLanguage: 'en-IN',
      // Speakable — tells voice assistants and AI engines (Google
      // AI Overview, Alexa, ChatGPT voice, Perplexity Pages) which
      // parts of the page to read aloud as a spoken summary.
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '#hero p', '#science h2', '#science p'],
      },
    },
    // ItemList of the 7 flagship programmes — gives AI engines a
    // direct list of services without having to crawl detail pages.
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': 'https://thelongevitycentre.co/#programmes',
      name: "TLC's seven flagship longevity programmes",
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Longevity Plus Programme', url: 'https://thelongevitycentre.co/programs/longevity-plus' },
        { '@type': 'ListItem', position: 2, name: 'Metabolic & Weight-Loss Programme', url: 'https://thelongevitycentre.co/programs/metabolic-weight-loss' },
        { '@type': 'ListItem', position: 3, name: 'Gut & Metabolic Programme', url: 'https://thelongevitycentre.co/programs/gut-metabolic' },
        { '@type': 'ListItem', position: 4, name: 'Diabetes & Fatty-Liver Reversal', url: 'https://thelongevitycentre.co/programs/diabetes-fatty-liver-reversal' },
        { '@type': 'ListItem', position: 5, name: 'PCOD Correction Programme', url: 'https://thelongevitycentre.co/programs/pcod-correction' },
        { '@type': 'ListItem', position: 6, name: 'Advanced Metabolomics', url: 'https://thelongevitycentre.co/programs/advanced-metabolomics' },
        { '@type': 'ListItem', position: 7, name: 'Cancer Detection & Prevention Programme', url: 'https://thelongevitycentre.co/programs/cancer-prevention' },
      ],
    },
  ],
}

export function HomePage() {
  useDocumentMeta(HOME_META)
  return (
    <>
      <Hero />
      <BrandAmbassadorHero />
      <BenefitsHome />
      <Programs />
      <PressStrip />
      <ScienceCards />
      <Method />
      <ResultsSplit />
      <FoundersNote />
      <VideoTestimonials />
      <ClinicsBand />
      <Faq />
      <CtaBand withPortrait />
    </>
  )
}
