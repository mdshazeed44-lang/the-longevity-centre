// TermsPage — terms of service. Same editorial document layout as Privacy.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { instantMotion } from '../lib/motion'
import { useDocumentMeta } from '../lib/seo'
import { CtaBand } from '../components/sections/CtaBand'
import { BrandAmbassador } from '../components/sections/BrandAmbassador'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  {
    n: '01',
    title: 'Acceptance of Terms',
    body: [
      'By using thelongevitycentre.co, booking a consultation, or enrolling in any TLC programme, you agree to these terms. If you do not agree, please do not use our services.',
    ],
  },
  {
    n: '02',
    title: 'Medical Information Disclaimer',
    body: [
      'Information on this website is provided for educational purposes only. It is not a substitute for personalised medical advice, diagnosis, or treatment from a qualified physician.',
      'Reading our content does not establish a doctor-patient relationship. That relationship begins only when you formally consult with a TLC physician through a paid programme or consultation.',
      'Always seek the advice of a qualified healthcare provider for any medical condition.',
    ],
  },
  {
    n: '03',
    title: 'Programmes & Consultations',
    body: [
      'Programme descriptions, pricing, and timelines are provided in good faith but are subject to clinical judgement. Your physician may modify a recommended protocol based on your specific biology and diagnostic results.',
      'Programme fees are due at enrolment. Diagnostic costs not bundled in your programme are billed separately at the time of testing.',
      'Refunds for unused diagnostic tests or unused months of a multi-month programme are evaluated on a case-by-case basis. Specific refund terms are documented in your programme agreement.',
    ],
  },
  {
    n: '04',
    title: 'No Guarantee of Outcomes',
    body: [
      'Medicine deals with biology, not certainty. While our protocols are evidence-based and our outcomes are tracked, individual results vary based on genetics, lifestyle, adherence, and many factors outside our control.',
      'Any statistics, ranges or outcomes referenced on this site reflect aggregate observations across our patient cohort and are not promises of specific results for any individual patient.',
    ],
  },
  {
    n: '05',
    title: 'Patient Responsibilities',
    body: [
      'Provide accurate and complete medical history.',
      'Disclose all medications, supplements, and substances you use.',
      'Follow protocol recommendations and attend scheduled follow-ups.',
      'Inform your physician promptly of any new symptoms, side effects, or significant changes in health.',
    ],
  },
  {
    n: '06',
    title: 'Intellectual Property',
    body: [
      'All content on this website text, images, design, logos, programme descriptions is the property of TLC (The Longevity Centre) and protected under Indian copyright and trademark law.',
      'You may share links to our pages and quote brief excerpts with attribution. You may not copy, redistribute, or use our content for commercial purposes without written permission.',
    ],
  },
  {
    n: '07',
    title: 'Third-Party Links',
    body: [
      'Our website may link to third-party websites (educational resources, partner laboratories, social media). We are not responsible for the content, privacy practices, or actions of these external sites.',
    ],
  },
  {
    n: '08',
    title: 'Limitation of Liability',
    body: [
      'To the fullest extent permitted by Indian law, TLC and its physicians are not liable for any indirect, incidental, or consequential damages arising from use of this website or our services. Our total liability for any claim is limited to the amount you have paid us in the 12 months preceding the claim.',
      'Nothing in these terms limits our liability for medical malpractice, gross negligence, or wilful misconduct, those remain governed by Indian medical law.',
    ],
  },
  {
    n: '09',
    title: 'Governing Law & Dispute Resolution',
    body: [
      'These terms are governed by Indian law. Any dispute arising from these terms or the services provided will be resolved through arbitration in Delhi under the Indian Arbitration and Conciliation Act, with each party bearing its own costs.',
    ],
  },
  {
    n: '10',
    title: 'Changes to Terms',
    body: [
      'We may update these terms from time to time. Material changes will be communicated to active patients by email. Continued use of our services after a change constitutes acceptance of the updated terms.',
    ],
  },
  {
    n: '11',
    title: 'Contact',
    body: [
      'Questions about these terms, email info@thelongevitycentre.co or write to us at the registered office address provided on our Centres page.',
    ],
  },
]

const META = {
  title: 'Terms of Service · TLC, The Longevity Centre',
  description:
    'Terms governing use of TLC programmes, consultations, and the thelongevitycentre.co website. Indian law applies.',
  path: '/terms',
}

export function TermsPage() {
  useDocumentMeta(META)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (instantMotion()) return
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
            Terms of Service
          </div>
          <h1 className="font-display font-light text-[36px] md:text-[52px] xl:text-[60px] leading-[1.05] tracking-[-0.025em] text-ink mb-6">
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block">Plain language.</span>
            </span>
            <br />
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block font-bold text-rust">Honest expectations.</span>
            </span>
          </h1>
          <p className="text-[14.5px] md:text-[16px] leading-[1.65] text-graphite font-light max-w-[600px] mb-6">
            These are the terms under which TLC delivers care, charges fees,
            handles disputes, and what we promise (and don't promise). No
            buried clauses. No legal trapdoors.
          </p>
          <div className="text-[11px] tracking-[0.32em] uppercase text-stone font-semibold">
            Last updated · April 2026
          </div>
        </div>
      </section>

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
