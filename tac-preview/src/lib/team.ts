// team.ts — single source of truth for TLC's clinical team.
//
// Founders and the wider physician panel, with their REAL credentials and
// institutions (from the client's brochure, pages 10–12). Used by:
//   - pages/AboutPage.tsx      (visible founders + specialist grid)
//   - scripts/inject-meta.cjs  (static /about-us <noscript> + Physician JSON-LD)
//
// Keeping this in lib/ (not inside the page component) is deliberate: the
// build-time SEO injector can only require() lib modules, and the named
// physicians + qualifications are the site's strongest first-hand E-E-A-T
// (Experience/Expertise) signal — they must be visible to non-JS crawlers
// and expressed as schema, not locked inside React-only render.

export type Founder = {
  name: string
  creds: string
  role: string
  bio: string
  img: string
}

export type Specialist = {
  name: string
  creds: string
  role: string
  photo: string
  objectPosition?: string
}

export const FOUNDERS: Founder[] = [
  {
    name: 'Dr. Abhinav Sharma',
    creds: 'MBBS, MAMC, Delhi University · MS, PGI, Chandigarh',
    role: 'Co-Founder · Anti-Aging & Preventive Medicine',
    bio: 'Accomplished minimally invasive surgeon with over 11,000 successful surgeries. Educated at Maulana Azad Medical College, Delhi, with postgraduate training at PGI Chandigarh — one of India’s most acclaimed centres. A visionary health entrepreneur who pioneers advancements in anti-aging, preventive medicine and wellness, blending clinical expertise with innovation for holistic, root-cause care.',
    img: '/team/dr-abhinav.jpg?v=2',
  },
  {
    name: 'Dr. Bhavna Sharma',
    creds:
      'MBBS, MAMC, Delhi University · DGO, MAMC, Delhi University · F ART, Linz, Austria · D ART, Kiel University, Germany · DPE, Kiel University, Germany',
    role: 'Co-Founder · Reproductive & Sexual Anti-Aging',
    bio: 'A leading IVF specialist credited with over 8,000 IVF babies. Educated at Maulana Azad Medical College, Delhi, where she also completed her postgraduation. She now extends her expertise to hormonal and reproductive anti-aging, women’s health, oocyte preservation and HRT — helping patients preserve fertility, balance hormones and optimise long-term healthspan with compassion and cutting-edge science.',
    img: '/team/dr-bhavna-2026.jpg?v=2',
  },
]

// Specialist team — Dr. Karan Mane (Director) is listed first per client
// request.
export const SPECIALISTS: Specialist[] = [
  {
    name: 'Dr. Karan Mane',
    creds: 'MBBS · MS',
    role: 'Director · The Longevity Centre',
    photo: '/team/dr-karan-mane.jpg?v=1',
    objectPosition: 'center 25%',
  },
  {
    name: 'Dr. Rahul Chaube',
    creds: 'MD Medicine',
    role: 'Physician & Diabetologist',
    photo: '/team/dr-rahul-chaube.jpg?v=5',
  },
  {
    name: 'Dr. Rizwan',
    creds: 'MBBS',
    role: '',
    photo: '/team/dr-rizwan.jpg?v=1',
    objectPosition: 'center 25%',
  },
  {
    name: 'Dr. Aniket Agarwal',
    creds: 'MBBS · CPS',
    role: 'Dermatologist & Trichologist',
    photo: '/team/dr-aniket-agarwal.jpg',
  },
  {
    name: 'Dr. Surekha Sawant',
    creds: 'Longevity Consultant',
    role: 'Patient Care · Programme Coordination',
    photo: '/team/dr-surekha-sawant.jpg',
  },
  {
    name: 'Dr. Pooja Dahiya',
    creds: 'Longevity Consultant',
    role: 'Patient Care · Programme Coordination',
    photo: '/team/dr-pooja-dahiya.jpg?v=2',
    objectPosition: 'center top',
  },
  {
    name: 'Dr. Niloufar Hayat',
    creds: 'Longevity Consultant',
    role: 'Patient Care · Programme Coordination',
    photo: '/team/dr-niloufar-hayat.jpg',
  },
]

// First-hand, verifiable experience signals (E-E-A-T "Experience") — every
// number is stated on the About page / brochure, not invented.
export const TEAM_EXPERIENCE = {
  years: '20+ years',
  surgeries: '11,000+ surgeries',
  ivfBabies: '8,000+ IVF babies',
  centres: '6 centres across India',
}

const SITE = 'https://thelongevitycentre.co'

// Physician JSON-LD for the founders + panel. `alumniOf` is only set where
// the institution is explicit in the credentials, so no affiliation is
// invented. Returns an array of schema.org Physician nodes.
export function physicianSchema(): Record<string, unknown>[] {
  const worksFor = { '@type': 'MedicalOrganization', name: 'The Longevity Centre', url: SITE }

  const founderNodes = FOUNDERS.map((f) => {
    const node: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Physician',
      name: f.name,
      honorificPrefix: 'Dr.',
      jobTitle: f.role,
      description: f.bio,
      worksFor,
      medicalSpecialty: 'PreventiveMedicine',
    }
    if (/Maulana Azad|MAMC/.test(f.creds)) {
      node.alumniOf = [{ '@type': 'CollegeOrUniversity', name: 'Maulana Azad Medical College, Delhi' }]
    }
    if (/PGI/.test(f.creds)) {
      node.alumniOf = [
        { '@type': 'CollegeOrUniversity', name: 'Maulana Azad Medical College, Delhi' },
        { '@type': 'CollegeOrUniversity', name: 'PGIMER, Chandigarh' },
      ]
    }
    return node
  })

  const panelNodes = SPECIALISTS.filter((s) => /^(MBBS|MD|MS)/.test(s.creds)).map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: s.name,
    honorificPrefix: 'Dr.',
    jobTitle: s.role || 'Physician',
    description: s.creds,
    worksFor,
  }))

  return [...founderNodes, ...panelNodes]
}
