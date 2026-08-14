// centres.ts — single source of truth for the 6 TLC clinic cities.
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
  /**
   * Geographic coordinates for this centre — used by the LocalBusiness /
   * MedicalClinic JSON-LD on the detail page, by the homepage map pins,
   * and by the site-wide JSON-LD in index.html. Approximate to the
   * area / postal code (street-level fidelity is unnecessary and would
   * leak more PII than needed for a marketing site). For opening-soon
   * centres we still emit a coordinate so the city pin renders on the
   * map; the JSON-LD just won't claim the location is a fully open
   * MedicalClinic.
   */
  geo: {
    lat: number
    lon: number
  }
  /**
   * Google Business Profile (GMB) details — when present, the centre
   * detail page renders a "Verified on Google" panel with reviews +
   * directions CTAs in addition to the standard map embed.
   */
  gmb?: {
    /** Public Google share link to the GMB profile */
    shareUrl: string
    /** Exact business name as shown on Google */
    businessName: string
    /** Optional partnership label (e.g. "TLC × Clinic Next Face") */
    partnership?: string
  }
  /**
   * Real patient reviews shown on the detail page. Sourced from
   * verified channels (partner clinic site, GMB) and attributed via
   * `source` so we don't pass third-party reviews off as our own.
   */
  reviews?: Array<{
    author: string
    rating: 1 | 2 | 3 | 4 | 5
    text: string
    /** Where the review was published — shown next to the star rating */
    source: string
  }>
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
    email: 'info@thelongevitycentre.co',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=The+Longevity+Centre+Greater+Kailash+New+Delhi',
    mapsEmbed:
      'https://www.google.com/maps?q=Greater+Kailash-1+New+Delhi+110048&output=embed',
    hero: '/clinic-photos/delhi-bangalore-clinic.jpg',
    description:
      "TLC's Delhi flagship sits in the heart of Greater Kailash-1 — South Delhi's premier residential and lifestyle district. The centre is designed around quiet consultation rooms, a dedicated diagnostics suite, and the same shared medical record used by every TLC clinic. Patients across NCR can access the full longevity, metabolic, gut and aesthetic programmes here with the same physician panel that anchors the network.",
    highlights: [
      'Full longevity diagnostics on-site (160+ blood biomarkers, BCA, Oligoscan, EndoPAT)',
      'Direct sample handover to our Netherlands genomic partner laboratory',
      'On-site dermatology and aesthetic-medicine suite',
      'Weekly physician availability across endocrinology, gastroenterology, dermatology',
    ],
    timings: 'Open all days · 9:00 AM to 8:00 PM',
    status: 'open',
    verified: true,
    geo: { lat: 28.5456, lon: 77.2417 }, // Greater Kailash-1, New Delhi
    reviews: [
      {
        author: 'Vikas',
        rating: 5,
        text: "I've tried various wellness programs, but TAC stands out. Their commitment to longevity through cutting-edge testing — gut and genetic analysis — is unmatched. The personalised recommendations have significantly improved my mental clarity and physical health.",
        source: 'TAC patient',
      },
      {
        author: 'Shruti',
        rating: 5,
        text: 'I was skeptical about wellness programs until I discovered TAC. Their holistic approach, including gut testing and genetic testing, has been a game-changer. The personalised guidance has improved my overall well-being, and I feel more energetic than ever.',
        source: 'TAC patient',
      },
      {
        author: 'Aditya',
        rating: 5,
        text: "TAC's comprehensive approach to wellness is unparalleled. Their fat-loss programme helped me shed 20 kg, and I've never felt healthier. The genetic testing revealed valuable insights that let me tailor my lifestyle choices.",
        source: 'TAC patient',
      },
    ],
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
    email: 'info@thelongevitycentre.co',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=The+Longevity+Centre+Sector+48+Gurugram',
    mapsEmbed:
      'https://www.google.com/maps?q=Block+A1+Tikri+Vipul+World+Sohna+Road+Sector+48+Gurugram+122018&output=embed',
    hero: '/clinic-photos/gurgaon-centre.webp',
    description:
      "Our Gurgaon centre on Sohna Road is the architectural anchor of the network — a calm, well-designed clinical space built for the next twenty years of preventive medicine. It serves the entire DLF / Cyber Hub / Golf Course Road corridor with the full TLC diagnostic stack, on-site BCA and EndoPAT scans, and direct access to all seven longevity programmes.",
    highlights: [
      'Flagship architecture — designed for premium clinical experience',
      'Complete diagnostic suite including precision BCA',
      'Dedicated parking and ground-floor accessibility',
      'Walk-in availability for follow-up consultations',
    ],
    timings: 'Open all days · 9:00 AM to 8:00 PM',
    status: 'open',
    verified: true,
    geo: { lat: 28.4126, lon: 77.0382 }, // Sector 48 / Sohna Road, Gurugram
    reviews: [
      {
        author: 'Varun',
        rating: 5,
        text: 'The treatment at TAC was truly transformative. I felt rejuvenated immediately after my session. Highly recommend.',
        source: 'Justdial · Gurgaon',
      },
      {
        author: 'Ankur Srivastava',
        rating: 5,
        text: 'Exceptional service and results. My skin has never felt better — the staff are knowledgeable and caring.',
        source: 'Justdial · Gurgaon',
      },
      {
        author: 'Aditya',
        rating: 5,
        text: "TAC's comprehensive approach to wellness is unparalleled. Their fat-loss programme helped me shed 20 kg, and I've never felt healthier. The genetic testing revealed valuable insights that let me tailor my lifestyle choices.",
        source: 'TAC patient',
      },
    ],
  },
  {
    slug: 'mumbai',
    city: 'Mumbai',
    region: 'Maharashtra',
    state: 'Maharashtra',
    area: 'Bandra West · Link Corner Mall',
    address:
      'Muscleheadon, Under Starbucks, Link Corner Mall, Upper Basement Level, 33rd Road, Bandra West, Mumbai, Maharashtra — 400052',
    phone: '+91 88268 09123',
    email: 'info@thelongevitycentre.co',
    mapsUrl: 'https://maps.app.goo.gl/uFeha1vhKE3wWRxH9',
    mapsEmbed:
      'https://www.google.com/maps?q=Muscleheadon+Link+Corner+Mall+33rd+Road+Bandra+West+Mumbai+400052&output=embed',
    hero: '/clinic-photos/mumbai-centre.webp',
    description:
      "TLC Mumbai sits in the heart of Bandra West, at Link Corner Mall on 33rd Road — bringing diagnostics-led preventive medicine and longevity care to Mumbai's western suburbs. The centre offers TLC's full diagnostics suite and programme onboarding, anchored by the same physician panel that runs every TLC clinic.",
    highlights: [
      'Full TLC diagnostic suite — 160+ blood biomarkers, BCA, hormonal panels',
      'Doctor-led programme onboarding and follow-up reviews',
      'Central Bandra West location at Link Corner Mall, 33rd Road',
      'Shared medical record with the wider TLC network',
    ],
    timings: 'Open all days · 10:00 AM to 7:00 PM',
    status: 'open',
    verified: true,
    geo: { lat: 19.0657612, lon: 72.8331167 }, // Bandra West — Link Corner Mall, 33rd Road
    reviews: [
      {
        author: 'Vikas',
        rating: 5,
        text: "I've tried various wellness programs, but TAC stands out. Their commitment to longevity through cutting-edge testing — gut and genetic analysis — is unmatched. The personalised recommendations have significantly improved my mental clarity and physical health.",
        source: 'TAC patient',
      },
      {
        author: 'Shruti',
        rating: 5,
        text: 'I was skeptical about wellness programs until I discovered TAC. Their holistic approach, including gut testing and genetic testing, has been a game-changer. The personalised guidance has improved my overall well-being, and I feel more energetic than ever.',
        source: 'TAC patient',
      },
      {
        author: 'Aditya',
        rating: 5,
        text: "TAC's comprehensive approach to wellness is unparalleled. Their fat-loss programme helped me shed 20 kg, and I've never felt healthier. The genetic testing revealed valuable insights that let me tailor my lifestyle choices.",
        source: 'TAC patient',
      },
    ],
  },
  {
    slug: 'pune',
    city: 'Pune',
    region: 'Maharashtra',
    state: 'Maharashtra',
    area: 'Hadapsar · Amanora Town Centre',
    address:
      'Kumar Prism, 2nd Floor, 201, Amanora Town Centre, above Yes Bank, opp. Fab India, Kirtane Baug, Amanora Park Town, Hadapsar, Pune, Maharashtra — 411036',
    phone: '+91 11 408 44840',
    email: 'info@thelongevitycentre.co',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Kumar+Prism+Amanora+Town+Centre+Hadapsar+Pune+411036',
    mapsEmbed:
      'https://www.google.com/maps?q=Kumar+Prism+Amanora+Town+Centre+Hadapsar+Pune+411036&output=embed',
    hero: '/clinic-photos/pune-clinic.jpg',
    description:
      "The Pune centre at Kumar Prism, Hadapsar is a flagship treatment + diagnostics clinic serving the entire Western Pune corridor — from Magarpatta to Kharadi. Designed around the patient-treatment-room workflow, it offers in-clinic dermatology, aesthetic medicine, and the complete longevity-programme intake including BCA, blood biomarkers and metabolic diagnostics.",
    highlights: [
      'Dermatology + aesthetics suite with treatment rooms',
      'Full longevity diagnostics under one roof',
      'Direct gut-microbiome sample handoff to Netherlands lab',
      'Convenient parking · ground-floor access',
    ],
    timings: 'Open all days · 9:00 AM to 8:00 PM',
    status: 'open',
    verified: true,
    geo: { lat: 18.5089, lon: 73.9259 }, // Hadapsar / Amanora, Pune
    reviews: [
      {
        author: 'Liza',
        rating: 5,
        text: "I love the results I've seen — the staff is so friendly and knowledgeable.",
        source: 'Justdial · Pune',
      },
      {
        author: 'Akilesh',
        rating: 5,
        text: 'Amazing experience, highly recommend this place for anti-aging treatments.',
        source: 'Justdial · Pune',
      },
      {
        author: 'Anjali',
        rating: 5,
        text: 'The specialists are very attentive and make you feel comfortable throughout the process.',
        source: 'Justdial · Pune',
      },
    ],
  },
  {
    slug: 'nagpur',
    city: 'Nagpur',
    region: 'Maharashtra',
    state: 'Maharashtra',
    area: 'Dharampeth · Asian KHMC × TLC',
    address:
      '213, W High Ct Rd, near Shankar Nagar Square, Dharampeth, Nagpur, Maharashtra — 440010',
    phone: '+91 88268 09123',
    email: 'info@thelongevitycentre.co',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Asian+KHMC+Multispeciality+Hospital+Dharampeth+Nagpur+440010',
    mapsEmbed:
      'https://www.google.com/maps?q=Asian+KHMC+Multispeciality+Hospital+W+High+Ct+Rd+Dharampeth+Nagpur+440010&output=embed',
    hero: '/clinic-photos/nagpur-centre.webp',
    description:
      "TLC Nagpur operates in partnership with Asian KHMC Multispeciality Hospital in Dharampeth — extending precision longevity medicine into Central India and serving the entire Vidarbha region. The centre offers TLC's full diagnostics, programme onboarding and aesthetic-medicine suite, anchored by the same physician panel that runs every TLC clinic.",
    highlights: [
      'Full TLC diagnostic suite — 160+ blood biomarkers, BCA, hormonal panels',
      'Hospital-grade infrastructure via Asian KHMC partnership',
      'Central Nagpur location at Shankar Nagar Square, Dharampeth',
      'Shared medical record with the wider TLC network',
    ],
    timings: 'Open all days · 9:00 AM to 8:00 PM',
    status: 'open',
    verified: true,
    geo: { lat: 21.1458, lon: 79.0882 }, // Civil Lines, Nagpur
    reviews: [
      {
        author: 'Bhimprakash Ramteke',
        rating: 5,
        text: 'One of the best multispeciality hospitals in Nagpur. Asian KHMC offers exceptional services — ICU, dialysis centre, and now the kidney transplant facility. Dr. Sameer Choubey is among the finest nephrologists in the West zone, supported by a great care team.',
        source: 'Asian KHMC · Nagpur',
      },
      {
        author: 'Vikas',
        rating: 5,
        text: "I've tried various wellness programs, but TAC stands out. Their commitment to longevity through cutting-edge testing — gut and genetic analysis — is unmatched. The personalised recommendations have significantly improved my mental clarity and physical health.",
        source: 'TAC patient',
      },
      {
        author: 'Shruti',
        rating: 5,
        text: 'I was skeptical about wellness programs until I discovered TAC. Their holistic approach, including gut testing and genetic testing, has been a game-changer. The personalised guidance has improved my overall well-being, and I feel more energetic than ever.',
        source: 'TAC patient',
      },
    ],
  },
  {
    slug: 'bangalore',
    city: 'Bangalore',
    region: 'Karnataka',
    state: 'Karnataka',
    area: 'Sadashivanagar · Clinic Next Face × TLC',
    address:
      '73, 3, First Floor, Railway Parallel Rd, 4th Block, Kumara Park West, Sadashivanagar, Seshadripuram, Bengaluru, Karnataka — 560020',
    phone: '+91 80767 19637',
    email: 'info@thelongevitycentre.co',
    mapsUrl: 'https://share.google/wtT8CHje6mZfDhNCL',
    mapsEmbed:
      'https://www.google.com/maps?q=Clinic+Next+Face+Skin+Hair+Aesthetic+Clinic+Sadashivanagar+Kumara+Park+West+Bengaluru&output=embed',
    hero: '/clinic-photos/bangalore-centre.webp',
    description:
      "TLC Bangalore operates in partnership with Clinic Next Face at Sadashivanagar — bringing premium preventive medicine and longevity care to North Bengaluru, with city-wide coverage from Malleshwaram and Sankey to Whitefield and Yelahanka. The centre offers TLC's full diagnostics, programme onboarding and aesthetic-medicine suite, anchored by the same physician panel that runs every TLC clinic.",
    highlights: [
      'Full TLC diagnostic suite — 160+ blood biomarkers, BCA, hormonal panels',
      'On-site dermatology and aesthetic-medicine suite via Clinic Next Face partnership',
      'Convenient North Bengaluru location off Railway Parallel Road',
      'Shared medical record with the wider TLC network',
    ],
    timings: 'Open all days · 9:00 AM to 8:00 PM',
    status: 'open',
    verified: true,
    geo: { lat: 12.9352, lon: 77.6245 }, // Koramangala, Bengaluru
    gmb: {
      shareUrl: 'https://share.google/wtT8CHje6mZfDhNCL',
      businessName: 'Clinic Next Face — Skin, Hair & Aesthetic Clinic',
      partnership: 'TLC × Clinic Next Face',
    },
    reviews: [
      {
        author: 'Vasundhra K.',
        rating: 5,
        text: 'Doctor is very nice and suggests the right type of post-care services after the treatment. My skin looks way better now. The best skin-care clinic in Bangalore.',
        source: 'Clinic Next Face',
      },
      {
        author: 'Vinod K.',
        rating: 5,
        text: 'I had gone to consult about the hair-fall problem I was having due to COVID. The condition of my hair was a nightmare for me. Clinic Next Face helped me regrow them and made them even better than before.',
        source: 'Clinic Next Face',
      },
      {
        author: 'Reema L.',
        rating: 5,
        text: 'One of the best places in Bangalore for hydrafacials and Korean glass-skin treatments. Love their therapists — and now, my skin.',
        source: 'Clinic Next Face',
      },
    ],
  },
]

export function getCentreBySlug(slug: string): Centre | undefined {
  return CENTRES.find((c) => c.slug === slug)
}

// ── Centre FAQ (single source) ────────────────────────────────────────
// Answer-first Q&A from each centre's OWN data (location, timings, contact,
// facilities) — the exact "where / when / what" questions AI engines get
// asked about a local clinic. Consumed by the centre detail page (visible
// <Faq />) AND scripts/inject-meta.cjs (FAQPage schema + <noscript> Q&A).
const cLower = (s: string): string =>
  s ? s.charAt(0).toLowerCase() + s.slice(1) : s

export function centreFaqs(c: Centre): { q: string; a: string }[] {
  const faqs: { q: string; a: string }[] = []

  faqs.push({
    q: `Where is The Longevity Centre in ${c.city}?`,
    a: `The Longevity Centre ${c.city} is located in ${c.area}, ${c.city}${
      c.state ? ', ' + c.state : ''
    }. Address: ${c.address}.`,
  })

  if (c.timings) {
    faqs.push({
      q: `What are the timings of the ${c.city} centre?`,
      a: `The ${c.city} centre operates ${c.timings}.${
        c.phone ? ` You can call ${c.phone} to book an appointment.` : ''
      }`,
    })
  }

  if (c.highlights && c.highlights.length) {
    faqs.push({
      q: `What does the ${c.city} centre offer?`,
      a: `The ${c.city} centre offers ${c.highlights
        .slice(0, 5)
        .map(cLower)
        .join('; ')}.`,
    })
  }

  return faqs
}
