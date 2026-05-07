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
    hero: '/clinic-photos/delhi-bangalore-clinic.jpg',
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
    hero: '/clinic-photos/gurugram-exterior.jpg',
    description:
      "Our Gurgaon centre on Sohna Road is the architectural anchor of the network — a calm, well-designed clinical space built for the next twenty years of preventive medicine. It serves the entire DLF / Cyber Hub / Golf Course Road corridor with the full TLC diagnostic stack, on-site BCA and EndoPAT scans, and direct access to all six longevity programmes.",
    highlights: [
      'Flagship architecture — designed for premium clinical experience',
      'Complete diagnostic suite including precision BCA',
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
    area: 'Worli · LIFT × TLC',
    address:
      'Unit No 3, 1st Floor, Atur House, Dr Annie Besant Rd, opposite Bharat Petrol Pump, above MG Select Showroom, Worli Naka, Siddharth Nagar, Worli, Mumbai, Maharashtra — 400018',
    phone: '+91 88268 09123',
    email: 'info@thelongevitycentre.com',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Atur+House+Dr+Annie+Besant+Rd+Worli+Mumbai+400018',
    mapsEmbed:
      'https://www.google.com/maps?q=Atur+House+Dr+Annie+Besant+Rd+Worli+Naka+Mumbai+400018&output=embed',
    hero: '/clinic-photos/clinic-interior-1.jpg',
    description:
      "TLC Mumbai operates in partnership with LIFT Face & Body Aesthetics in Worli — bringing premium preventive medicine and longevity care to South Mumbai. The centre offers TLC's full diagnostics, programme onboarding and aesthetic-medicine suite, anchored by the same physician panel that runs every TLC clinic.",
    highlights: [
      'Full TLC diagnostic suite — 160+ blood biomarkers, BCA, hormonal panels',
      'On-site dermatology and aesthetic-medicine suite via LIFT partnership',
      'Convenient South Mumbai location at Worli Naka',
      'Shared medical record with the wider TLC network',
    ],
    timings: 'Mon–Sat · 10:00 AM to 7:00 PM',
    status: 'open',
    verified: true,
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
    email: 'info@thelongevitycentre.com',
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
    timings: 'Mon–Sat · 9:00 AM to 8:00 PM',
    status: 'open',
    verified: true,
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
    email: 'info@thelongevitycentre.com',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Asian+KHMC+Multispeciality+Hospital+Dharampeth+Nagpur+440010',
    mapsEmbed:
      'https://www.google.com/maps?q=Asian+KHMC+Multispeciality+Hospital+W+High+Ct+Rd+Dharampeth+Nagpur+440010&output=embed',
    hero: '/clinic-photos/clinic-interior-2.jpg',
    description:
      "TLC Nagpur operates in partnership with Asian KHMC Multispeciality Hospital in Dharampeth — extending precision longevity medicine into Central India and serving the entire Vidarbha region. The centre offers TLC's full diagnostics, programme onboarding and aesthetic-medicine suite, anchored by the same physician panel that runs every TLC clinic.",
    highlights: [
      'Full TLC diagnostic suite — 160+ blood biomarkers, BCA, hormonal panels',
      'Hospital-grade infrastructure via Asian KHMC partnership',
      'Central Nagpur location at Shankar Nagar Square, Dharampeth',
      'Shared medical record with the wider TLC network',
    ],
    timings: 'Mon–Sat · 9:00 AM to 8:00 PM',
    status: 'open',
    verified: true,
  },
  {
    slug: 'goa',
    city: 'Goa',
    region: 'Goa',
    state: 'Goa',
    area: 'Dona Paula · LIFT × TLC',
    address:
      'Villa 1, Dona Paula, Tesoro Building, opp. Le Valencia, Vainguinim Valley, Panaji, Durgavado, Goa — 403004',
    phone: '+91 88268 09123',
    email: 'info@thelongevitycentre.com',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=LIFT+Dona+Paula+Vainguinim+Valley+Panaji+Goa+403004',
    mapsEmbed:
      'https://www.google.com/maps?q=Tesoro+Building+Dona+Paula+Vainguinim+Valley+Panaji+Goa+403004&output=embed',
    hero: '/clinic-photos/clinic-interior-1.jpg',
    description:
      "TLC Goa operates in partnership with LIFT Face & Body Aesthetics in Dona Paula, Panaji — bringing precision longevity medicine to Goa, designed around the unique opportunity of preventive health combined with restorative travel. The centre offers TLC's full diagnostics, programme onboarding and on-site aesthetic-medicine suite, anchored by the same physician panel that runs every TLC clinic.",
    highlights: [
      'Full TLC diagnostic suite — 160+ blood biomarkers, BCA, hormonal panels',
      'On-site dermatology and aesthetic-medicine suite via LIFT partnership',
      'Coordinated wellness-retreat integration across Goa',
      'Shared medical record with the wider TLC network',
    ],
    timings: 'Mon–Sat · 10:00 AM to 7:00 PM',
    status: 'open',
    verified: true,
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
    hero: '/clinic-photos/clinic-interior-2.jpg',
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
    area: 'Sadashivanagar · Clinic Next Face × TLC',
    address:
      '73, 3, First Floor, Railway Parallel Rd, 4th Block, Kumara Park West, Sadashivanagar, Seshadripuram, Bengaluru, Karnataka — 560020',
    phone: '+91 80767 19637',
    email: 'info@thelongevitycentre.com',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Clinic+Next+Face+Sadashivanagar+Kumara+Park+West+Bengaluru+560020',
    mapsEmbed:
      'https://www.google.com/maps?q=Railway+Parallel+Rd+Kumara+Park+West+Sadashivanagar+Bengaluru+560020&output=embed',
    hero: '/clinic-photos/delhi-bangalore-clinic.jpg',
    description:
      "TLC Bangalore operates in partnership with Clinic Next Face at Sadashivanagar — bringing premium preventive medicine and longevity care to North Bengaluru, with city-wide coverage from Malleshwaram and Sankey to Whitefield and Yelahanka. The centre offers TLC's full diagnostics, programme onboarding and aesthetic-medicine suite, anchored by the same physician panel that runs every TLC clinic.",
    highlights: [
      'Full TLC diagnostic suite — 160+ blood biomarkers, BCA, hormonal panels',
      'On-site dermatology and aesthetic-medicine suite via Clinic Next Face partnership',
      'Convenient North Bengaluru location off Railway Parallel Road',
      'Shared medical record with the wider TLC network',
    ],
    timings: 'Mon–Sat · 9:00 AM to 8:00 PM',
    status: 'open',
    verified: true,
  },
]

export function getCentreBySlug(slug: string): Centre | undefined {
  return CENTRES.find((c) => c.slug === slug)
}
