// PrivacyPage — privacy policy. Editorial document layout matching the
// rest of the site (white canvas, rust accents, hairline rules).
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'
import { useDocumentMeta } from '../lib/seo'
import { CtaBand } from '../components/sections/CtaBand'
import { BrandAmbassador } from '../components/sections/BrandAmbassador'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  {
    n: '01',
    title: 'Information We Collect',
    body: [
      'When you book a consultation, enrol in a programme, or contact us for any reason, we collect personal information that includes — name, contact details, date of birth, address, medical history, diagnostic results, biomarker readings, and any clinical information you choose to share with our physicians.',
      'When you visit our website, we may also collect technical information automatically — your IP address, browser type, device, the pages you visit, and how long you spend on each page. This helps us understand how the site is used and improve it.',
    ],
  },
  {
    n: '02',
    title: 'How We Use Your Information',
    body: [
      'Your medical information is used solely to deliver the clinical care you have engaged us for — diagnosis, programme design, ongoing monitoring, follow-up, and physician-to-physician handoff within the TLC network.',
      'Your contact information may be used to send appointment reminders, programme updates, results notifications, and (with your explicit consent) educational content about longevity medicine.',
      'We do not sell your personal information. Ever. To anyone.',
    ],
  },
  {
    n: '03',
    title: 'Sharing Your Information',
    body: [
      'Within the TLC physician panel — every doctor on your care team has access to your complete medical record so that decisions are informed and consistent.',
      'With our diagnostic partner laboratories — including our Netherlands genomic partner — strictly for processing the samples you have authorised. These labs operate under their own data-protection regimes (GDPR for European labs).',
      'When required by law — court order, valid subpoena, or statutory obligation under Indian law.',
      'We do not share your information for marketing, advertising, or any commercial purpose outside of your direct clinical care.',
    ],
  },
  {
    n: '04',
    title: 'Data Storage & Security',
    body: [
      'Your records are stored on encrypted servers within India, with role-based access controls so that only authorised members of your care team can view them.',
      'Diagnostic samples shipped abroad are processed under chain-of-custody documentation and destroyed after analysis per the partner laboratory\'s retention policy (typically 90 days for residual samples).',
      'We retain medical records for the duration legally required under Indian medical practice rules — typically 10 years after the last consultation.',
    ],
  },
  {
    n: '05',
    title: 'Your Rights',
    body: [
      'You have the right to access your complete medical record at any time — written request to info@thelongevitycentre.co gets you a copy within 30 days.',
      'You can correct any inaccuracies in your information.',
      'You can withdraw consent for any non-essential processing (newsletters, educational content, etc.) at any time.',
      'You can request deletion of your information, subject to medical-record retention requirements under Indian law.',
    ],
  },
  {
    n: '06',
    title: 'Cookies',
    body: [
      'Our website uses essential cookies for functionality (form submissions, session state) and optional analytics cookies to understand traffic patterns. You can disable cookies in your browser; the site will still function but some convenience features may not work.',
    ],
  },
  {
    n: '07',
    title: 'Children\'s Privacy',
    body: [
      'TLC programmes are designed for adults (18+). We do not knowingly collect or process information from anyone under 18 without explicit parental consent and a verified clinical indication.',
    ],
  },
  {
    n: '08',
    title: 'Changes to This Policy',
    body: [
      'We may update this policy from time to time. Material changes will be communicated by email to active patients before they take effect. The current version is always available at thelongevitycentre.co/privacy.',
    ],
  },
  {
    n: '09',
    title: 'Contact',
    body: [
      'For any privacy-related question, request, or complaint — email info@thelongevitycentre.co or call +91 88268 09123. Our Data Protection Officer responds within 5 working days.',
    ],
  },
]

const META = {
  title: 'Privacy Policy · TLC — The Longevity Centre',
  description:
    'How The Longevity Centre collects, uses, stores, and protects your personal and medical information. Privacy is a clinical responsibility, not just a legal one.',
  path: '/privacy',
}

export function PrivacyPage() {
  useDocumentMeta(META)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion()) return
    const el = root.current
    if (!el) return
    const lines = el.querySelectorAll<HTMLElement>('.line-mask > span')
    gsap.set(lines, { yPercent: 110 })
    gsap.utils.toArray<HTMLElement>('.line-mask').forEach((mask) => {
      const span = mask.querySelector<HTMLElement>('span')
      if (!span) return
      gsap.to(span, {
        yPercent: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: mask, start: 'top 88%' },
      })
    })
    const fade = el.querySelectorAll<HTMLElement>('.fade-up')
    gsap.set(fade, { opacity: 0, y: 18 })
    gsap.to(fade, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      stagger: 0.05,
      scrollTrigger: { trigger: el, start: 'top 80%' },
    })
  }, [])

  return (
    <div ref={root}>
      {/* HERO — compact policy header on white */}
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 px-6 md:px-12 bg-white overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 500px at 18% 20%, rgba(148,84,85,0.05), transparent 60%), radial-gradient(700px 400px at 85% 80%, rgba(238,230,219,0.5), transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-[820px] mx-auto">
          <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-5">
            — Privacy Policy —
          </div>
          <h1 className="font-display font-light text-[36px] md:text-[52px] xl:text-[60px] leading-[1.05] tracking-[-0.025em] text-ink mb-6">
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block">Your biology is yours.</span>
            </span>
            <br />
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block font-bold text-rust">We treat it that way.</span>
            </span>
          </h1>
          <p className="text-[14.5px] md:text-[16px] leading-[1.65] text-graphite font-light max-w-[600px] mb-6">
            This policy describes what we collect, how we use it, where it
            lives, and the rights you hold over it. Privacy at TLC is a
            clinical responsibility — not a legal afterthought.
          </p>
          <div className="text-[11px] tracking-[0.32em] uppercase text-stone font-semibold">
            Last updated · April 2026
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-white">
        <div className="max-w-[820px] mx-auto">
          <div className="space-y-10 md:space-y-12">
            {SECTIONS.map((s) => (
              <article key={s.n} className="fade-up">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-display text-[13px] text-rust font-semibold tabular-nums tracking-tight shrink-0">
                    {s.n}
                  </span>
                  <span aria-hidden className="h-px w-7 bg-rust/40 shrink-0" />
                  <h2 className="font-display font-bold text-[20px] md:text-[24px] leading-[1.2] tracking-[-0.015em] text-ink">
                    {s.title}
                  </h2>
                </div>
                <div className="ml-9 space-y-3.5 text-[14px] md:text-[15px] leading-[1.7] text-graphite font-light">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BrandAmbassador />
      <CtaBand />
    </div>
  )
}
