// centres.ts — single source of truth for the 8 TLC clinic cities.
// Used by:
//   - components/Footer.tsx (clinics column links)
//   - pages/CentresPage.tsx (/centres directory)
//   - pages/CentreDetailPage.tsx (/centres/[slug] individual pages)
//   - App.tsx ClinicsBand (homepage map + directory)
//
// Verified addresses are sourced from theantiagingcentre.com.
// "Opening soon" cities have placeholder phone (main line) and no
// street address — we explicitly mark them so the detail page can
// show a "centre opening soon" treatment instead of a fake map.

export type Centre = {
  slug: string
  city: string
  region: string
  state: string
  area: string
  address: string
  phone: string
  email: string
  mapsUrl: string         // direct Google Maps link
  mapsEmbed: string       // iframe-friendly Maps embed URL
  hero: string            // hero image path
  description: string     // 2-3 paragraph "about this centre" body
  highlights: string[]    // 3-5 bullet points (programmes / facilities)
  timings: string         // operating hours
  status: 'open' | 'opening-soon'
  /** When false (opening-soon), we omit MedicalClinic JSON-LD */
  verified: boolean
}

export const CENTRES: Centre[] = [
  {
    slug: 'delhi',
    city: 'Delhi',
    region: 'NCR',
    state: 'Delhi',
    area: 'Greater Kailash-1',
    address: 'S-79, Ground Floor, Greater Kailash-1, New Delhi — 110048',
    phone: '+91 80 473 60047',
    email: 'info@thelongevitycentre.com',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=The+Longevity+Centre+Greater+Kailash+New+Delhi',
    mapsEmbed:
      'https://www.google.com/maps?q=Greater+Kailash-1+New+Delhi+110048&output=embed',
    hero: '/tac-photos/delhi-bangalore-clinic.jpg',
    description:
      "TLC's Delhi flagship sits in the heart of Greater Kailash-1 — South Delhi's premier residential and lifestyle district. The centre is designed around quiet consultation rooms, a dedicated diagnostics suite, and the same shared medical record used by every TLC clinic. Patients across NCR can access the full longevity, metabolic, gut and aesthetic programmes here with the same physician panel that anchors the network.",
    highlights: [
      'Full longevity diagnostics on-site (160+ blood biomarkers, BCA, Oligoscan, EndoPAT)',
      'Direct sample handover to our Netherlands genomic partner laboratory',
      'On-site dermatology and aesthetic-medicine suite',
      'Weekly physician availability across endocrinology, gastroenterology, dermatology',
    ],
    timings: 'Mon–Sat · 9:00 AM to 8:00 PM',
    status: 'open',
    verified: true,
  },
  {
    slug: 'gurgaon',
    city: 'Gurgaon',
    region: 'NCR',
    state: 'Haryana',
    area: 'Sector 48 · Sohna Road',
    address:
      'Block A1, Tikri, Vipul World, Sohna Road, Near GD Goenka Public School, Sector 48, Gurugram, Haryana — 122018',
    phone: '+91 11 408 44848',
    email: 'info@thelongevitycentre.com',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=The+Longevity+Centre+Sector+48+Gurugram',
    mapsEmbed:
      'https://www.google.com/maps?q=Block+A1+Tikri+Vipul+World+Sohna+Road+Sector+48+Gurugram+122018&output=embed',
    hero: '/tac-photos/gurugram-exterior.jpg',
    description:
      "Our Gurgaon centre on Sohna Road is the architectural anchor of the network — a calm, well-designed clinical space built for the next twenty years of preventive medicine. It serves the entire DLF / Cyber Hub / Golf Course Road corridor with the full TLC diagnostic stack, on-site BCA and EndoPAT scans, and direct access to all six longevity programmes.",
    highlights: [
      'Flagship architecture — designed for premium clinical experience',
      'Complete diagnostic suite including DEXA-grade BCA',
      'Dedicated parking and ground-floor accessibility',
      'Walk-in availability for follow-up consultations',
    ],
    timings: 'Mon–Sat · 9:00 AM to 8:00 PM',
    status: 'open',
    verified: true,
  },
  {
    slug: 'mumbai',
    city: 'Mumbai',
    region: 'Maharashtra',
    state: 'Maharashtra',
    area: 'Opening soon',
    address: 'Mumbai · Maharashtra (centre opening 2026)',
    phone: '+91 88268 09123',
    email: 'info@thelongevitycentre.com',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mumbai+Maharashtra',
    mapsEmbed:
      'https://www.google.com/maps?q=Mumbai+Maharashtra+India&output=embed',
    hero: '/tac-photos/clinic-interior-1.jpg',
    description:
      "TLC's Mumbai centre is opening in 2026 — bringing premium preventive medicine to India's commercial capital. Until the Mumbai location goes live, Mumbai-based patients are coordinated through our Pune flagship (Hadapsar) with at-home phlebotomy + diagnostics collection across the city. Programme onboarding can begin remotely.",
    highlights: [
      'At-home phlebotomy and sample collection across all of Mumbai',
      'Virtual physician consultations until the centre opens',
      'Programme enrolment available now — onboarding via video call',
      'Coordinated with our Pune flagship for in-person diagnostics',
    ],
    timings: 'Opening 2026 · Remote onboarding available now',
    status: 'opening-soon',
    verified: false,
  },
  {
    slug: 'pune',
    city: 'Pune',
    region: 'Maharashtra',
    state: 'Maharashtra',
    area: 'Hadapsar · Amanora',
    address:
      '2nd Floor, Kumar Prism, Amanora Road, Opp. Fab India, Hadapsar, Pune — 411028',
    phone: '+91 11 408 44840',
    email: 'info@thelongevitycentre.com',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=The+Longevity+Centre+Hadapsar+Pune',
    mapsEmbed:
      'https://www.google.com/maps?q=Kumar+Prism+Amanora+Road+Hadapsar+Pune+411028&output=embed',
    hero: '/tac-photos/pune-clinic.jpg',
    description:
      "The Pune centre at Kumar Prism, Hadapsar is a flagship treatment + diagnostics clinic serving the entire Western Pune corridor — from Magarpatta to Kharadi. Designed around the patient-treatment-room workflow, it offers in-clinic dermatology, aesthetic medicine, and the complete longevity-programme intake including BCA, blood biomarkers and metabolic diagnostics.",
    highlights: [
      'Dermatology + aesthetics suite with treatment rooms',
      'Full longevity diagnostics under one roof',
      'Direct gut-microbiome sample handoff to Netherlands lab',
      'Convenient parking · ground-floor access',
    ],
    timings: 'Mon–Sat · 9:00 AM to 8:00 PM',
    status: 'open',
    verified: true,
  },
  {
    slug: 'nagpur',
    city: 'Nagpur',
    region: 'Maharashtra',
    state: 'Maharashtra',
    area: 'Opening soon',
    address: 'Nagpur · Maharashtra (centre opening 2026)',
    phone: '+91 88268 09123',
    email: 'info@thelongevitycentre.com',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nagpur+Maharashtra',
    mapsEmbed:
      'https://www.google.com/maps?q=Nagpur+Maharashtra+India&output=embed',
    hero: '/tac-photos/clinic-interior-2.jpg',
    description:
      "TLC's Nagpur centre is opening in 2026 — extending precision longevity medicine into Central India. Until the Nagpur location goes live, patients across Vidarbha are coordinated through Pune and Hyderabad flagships, with at-home phlebotomy and diagnostics collection arranged across the city.",
    highlights: [
      'At-home sample collection across Nagpur',
      'Virtual physician consultations until centre opens',
      'Programme enrolment open — remote onboarding',
      'Coordinated with Pune + Hyderabad flagships',
    ],
    timings: 'Opening 2026 · Remote onboarding available now',
    status: 'opening-soon',
    verified: false,
  },
  {
    slug: 'goa',
    city: 'Goa',
    region: 'Goa',
    state: 'Goa',
    area: 'Opening soon',
    address: 'Goa (centre opening 2026)',
    phone: '+91 88268 09123',
    email: 'info@thelongevitycentre.com',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Goa+India',
    mapsEmbed:
      'https://www.google.com/maps?q=Panaji+Goa+India&output=embed',
    hero: '/tac-photos/clinic-interior-1.jpg',
    description:
      "TLC's Goa centre is opening in 2026 — built around the unique opportunity of precision health combined with restorative travel. Until the Goa location is operational, patients can begin programmes remotely with at-home diagnostic collection coordinated across North and South Goa. In-person visits are coordinated through Bangalore and Pune.",
    highlights: [
      'At-home sample collection across North + South Goa',
      'Virtual physician consultations until opening',
      'Wellness-retreat integration (planned)',
      'Coordinated with Bangalore + Pune flagships',
    ],
    timings: 'Opening 2026 · Remote onboarding available now',
    status: 'opening-soon',
    verified: false,
  },
  {
    slug: 'hyderabad',
    city: 'Hyderabad',
    region: 'Telangana',
    state: 'Telangana',
    area: 'Opening soon',
    address: 'Hyderabad · Telangana (centre opening 2026)',
    phone: '+91 88268 09123',
    email: 'info@thelongevitycentre.com',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Hyderabad+Telangana',
    mapsEmbed:
      'https://www.google.com/maps?q=Hyderabad+Telangana+India&output=embed',
    hero: '/tac-photos/clinic-interior-2.jpg',
    description:
      "TLC's Hyderabad centre is opening in 2026 — bringing precision longevity medicine to South-Central India. Until the centre is operational, Hyderabad patients are onboarded via virtual consultation with at-home sample collection coordinated across Banjara Hills, Jubilee Hills, and Gachibowli. In-person diagnostics are coordinated through our Bangalore flagship.",
    highlights: [
      'At-home phlebotomy across Hyderabad',
      'Virtual consultations available now',
      'Coordinated with Bangalore flagship for in-person diagnostics',
      'Programme enrolment open',
    ],
    timings: 'Opening 2026 · Remote onboarding available now',
    status: 'opening-soon',
    verified: false,
  },
  {
    slug: 'bangalore',
    city: 'Bangalore',
    region: 'Karnataka',
    state: 'Karnataka',
    area: 'JP Nagar · Sadashivnagar',
    address:
      'JP Nagar (Phase 4) · Sadashivnagar (CV Raman Avenue) — Bengaluru, Karnataka',
    phone: '+91 80767 19637',
    email: 'info@thelongevitycentre.com',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=The+Longevity+Centre+Bangalore',
    mapsEmbed:
      'https://www.google.com/maps?q=JP+Nagar+Bangalore+Karnataka&output=embed',
    hero: '/tac-photos/delhi-bangalore-clinic.jpg',
    description:
      "Bangalore is served by two TLC centres — JP Nagar Phase 4 in the south, and Sadashivnagar near CV Raman Avenue in the north — covering the full city from BTM Layout and Jayanagar to Malleshwaram and Sankey. Both share the same medical record system and physician panel, so patients can choose either branch for any visit.",
    highlights: [
      'Two locations: JP Nagar (south) + Sadashivnagar (north)',
      'Full longevity diagnostics at both branches',
      'Shared medical record between centres',
      'Coordinated coverage from Whitefield to Yelahanka',
    ],
    timings: 'Mon–Sat · 9:00 AM to 8:00 PM (both branches)',
    status: 'open',
    verified: true,
  },
]

export function getCentreBySlug(slug: string): Centre | undefined {
  return CENTRES.find((c) => c.slug === slug)
}
