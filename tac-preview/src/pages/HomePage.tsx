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

export function HomePage() {
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
