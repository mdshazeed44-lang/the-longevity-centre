// LongevityProgramPage — content sourced verbatim from
// theantiagingcentre.com/landing/ ("Your Anti-Aging Blueprint").
//
// Sections: Hero · 3-Step Process · Lifestyle Programs · Trust & Credibility ·
//           FAQ · Final CTA with health-concern chips.
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'
import { useDocumentMeta } from '../lib/seo'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    n: '01',
    title: 'Deep Diagnostics',
    body: 'We start with advanced metabolic, DNA, and gut microbiome tests, giving us an accurate snapshot of your health and existing biomarkers.',
  },
  {
    n: '02',
    title: 'Precision Analytics',
    body: 'Our experienced doctors, while leveraging AI tech, analyze your data in-depth, uncovering insights at a cellular level.',
  },
  {
    n: '03',
    title: 'Personalised Solutions',
    body: 'Get tailored protocols designed by experienced doctors to support your optimal health based on your diagnostics and reports.',
  },
]

const LIFESTYLES = [
  {
    n: '01',
    title: 'Leadership Elite',
    body: 'Struggling with burnout, demanding schedules, and maintaining energy and focus? Long-term health optimisation strategies and biomarker reversal programmes for peak performance — without compromising on health.',
  },
  {
    n: '02',
    title: 'Fitness Enthusiasts',
    body: "Concerned about performance optimisation, injury prevention and recovery times? Precision diagnostics and tailored recommendations reduce injury risk and enhance athletic performance.",
  },
  {
    n: '03',
    title: 'Individuals with Health Conditions',
    body: "Facing persistent health issues that are difficult to manage? Comprehensive diagnostics uncover root causes and offer targeted solutions for chronic conditions, with customised plans focused on long-term recovery.",
  },
  {
    n: '04',
    title: 'Wellness-Centred Families',
    body: "Balancing the health and wellness needs of every family member? TAC supports your family's journey with sustainable healthy habits and long-term wellness strategies.",
  },
]

const TRUST = [
  {
    title: 'Certified Medical Expertise',
    body: 'Our doctors, specialists and longevity experts come from top-tier institutions, with decades of experience in preventive, regenerative and precision medicine.',
  },
  {
    title: 'AI-Enhanced Human Insight',
    body: 'Our AI platforms analyse thousands of biomarkers across genetics, microbiome, metabolism and inflammation — delivering insights no traditional check-up can match.',
  },
  {
    title: 'Regular Expert Check-ins',
    body: "Nutritionists check in weekly and senior doctors monthly — so you never feel alone in your longevity journey.",
  },
  {
    title: 'Backed by Clinical Studies',
    body: "TAC's approach is grounded in scientific research and clinical evidence. From genetic testing to gut-health optimisation, our methods have been refined through rigorous clinical trials.",
  },
]

const HEALTH_CONCERNS = [
  'Pre-diabetes',
  'Fatty Liver',
  'Fatigue',
  'Gut Issues',
  'Metabolism',
  'Cholesterol',
  'Anti-Aging',
]

const FAQS = [
  {
    q: "How is TAC's approach different from a regular doctor or health checkup?",
    a: 'TAC goes beyond traditional health checkups by offering personalised, data-driven diagnostics across metabolic health, genetics and gut microbiome — powered by AI insights and supported by expert medical teams.',
  },
  {
    q: 'Will my health plan be personalised to me, or is it a pre-made protocol?',
    a: 'Your health plan at TAC is fully personalised. We use your individual diagnostics to create a customised programme tailored specifically to your unique biological markers and goals.',
  },
  {
    q: 'How useful is TAC to me if I feel fine?',
    a: 'Even if you feel fine, TAC helps you uncover hidden health issues that could affect your long-term wellness — such as early metabolic slowdowns, inflammation or genetic risks — so you can prevent future problems before they arise.',
  },
  {
    q: 'What exactly happens after I take the free longevity assessment?',
    a: 'After taking the free longevity assessment with a senior doctor, who guides you on the right programme, you undergo the tests associated with that programme. Your results are analysed by a senior doctor to create a personalised protocol for you.',
  },
  {
    q: 'How long does it take to see noticeable results once I start a TAC program?',
    a: 'Results may vary for each individual, but some people have experienced changes such as weight loss within 15 days of starting the program.',
  },
  {
    q: 'Is this an in-person or virtual service?',
    a: 'TAC offers both virtual consultations and in-person visits at select locations, providing flexible options based on your preference and convenience.',
  },
  {
    q: 'Is there a consultation fee or initial cost after the free assessment?',
    a: 'There is no fee for the initial consultation. After your free assessment, we provide a personalised health plan and outline the costs based on your chosen programme.',
  },
  {
    q: "What happens if I don't see improvements after following the plan?",
    a: "If you don't see the expected improvements, our team of experts will re-evaluate your plan, adjust it based on your ongoing diagnostics, and ensure you're on the right track to achieve your health goals.",
  },
]

const HERO_PILLS = [
  { k: 'Lives Reformed', v: '50,000+' },
  { k: 'Experience', v: '20+ Years' },
  { k: 'Centres', v: '5 Pan-India' },
]

const PROGRAM_META = {
  title: 'Longevity Program — Your Anti-Aging Blueprint | TAC',
  description:
    "TAC's flagship Longevity Program — advanced metabolic, DNA and gut microbiome diagnostics, AI-enhanced precision analytics and doctor-designed personalised protocols. 50,000+ lives reformed across India.",
  path: '/longevity-program',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://theantiagingcentre.com/longevity-program#webpage',
      url: 'https://theantiagingcentre.com/longevity-program',
      name: 'Longevity Program — Your Anti-Aging Blueprint | TAC',
      isPartOf: { '@id': 'https://theantiagingcentre.com/#organization' },
      about: { '@id': 'https://theantiagingcentre.com/#organization' },
      inLanguage: 'en-IN',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      '@id': 'https://theantiagingcentre.com/longevity-program#procedure',
      name: 'Longevity Program',
      procedureType: 'PreventiveMedicine',
      description:
        'A 12-month medical longevity protocol — comprehensive blood panels, body composition (BCA, BMD), cardiovascular function (EndoPAT), DNA-based genetic testing and gut microbiome mapping with personalised interventions and ongoing follow-ups under one coordinated team.',
      bodyLocation: 'Whole body',
      preparation: 'Free initial assessment with a senior doctor',
      followup: 'Weekly nutritionist check-ins, monthly senior-doctor reviews',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

export function LongevityProgramPage() {
  useDocumentMeta(PROGRAM_META)
  const heroRef = useRef<HTMLHeadingElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const lifestyleRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    if (reduceMotion()) return
    const cleanups: Array<() => void> = []

    // Hero heading masked-line reveal
    const heroLines = heroRef.current?.querySelectorAll<HTMLElement>('.line-mask > span')
    if (heroLines?.length) {
      gsap.set(heroLines, { yPercent: 110 })
      const t = gsap.to(heroLines, {
        yPercent: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.08,
        delay: 0.1,
      })
      cleanups.push(() => t.kill())
    }

    // Step cards stagger
    const stepCards = stepsRef.current?.querySelectorAll<HTMLElement>('.step-card')
    if (stepCards?.length) {
      gsap.set(stepCards, { y: 50, opacity: 0 })
      const t = gsap.to(stepCards, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' },
      })
      cleanups.push(() => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }

    // Lifestyle cards stagger
    const lifestyleCards = lifestyleRef.current?.querySelectorAll<HTMLElement>('.lifestyle-card')
    if (lifestyleCards?.length) {
      gsap.set(lifestyleCards, { y: 50, opacity: 0 })
      const t = gsap.to(lifestyleCards, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: lifestyleRef.current, start: 'top 80%' },
      })
      cleanups.push(() => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }

    // Trust cards stagger
    const trustCards = trustRef.current?.querySelectorAll<HTMLElement>('.trust-card')
    if (trustCards?.length) {
      gsap.set(trustCards, { y: 40, opacity: 0 })
      const t = gsap.to(trustCards, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: trustRef.current, start: 'top 82%' },
      })
      cleanups.push(() => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <div id="longevity-program">
      {/* HERO — cinematic dark with same cross-fading anti-aging montage as Centres:
          DNA helix → laboratory equipment → modern clinic corridor.
          Three short Pexels clips (~7 MB total, already cached if user
          visited /centres) cross-fade on a 24s cycle. */}
      <section className="relative bg-ink text-white pt-28 md:pt-32 pb-12 md:pb-16 px-6 md:px-12 overflow-hidden min-h-[100vh] flex items-center">
        <video
          className="hero-clip clip-1"
          src="/videos/centres-clips/dna.mp4"
          autoPlay loop muted playsInline preload="metadata"
          aria-hidden="true"
        />
        <video
          className="hero-clip clip-2"
          src="/videos/centres-clips/lab.mp4"
          autoPlay loop muted playsInline preload="metadata"
          aria-hidden="true"
        />
        <video
          className="hero-clip clip-3"
          src="/videos/centres-clips/clinic.mp4"
          autoPlay loop muted playsInline preload="metadata"
          aria-hidden="true"
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,8,7,0.65) 0%, rgba(10,8,7,0.35) 30%, rgba(10,8,7,0.55) 75%, rgba(10,8,7,0.85) 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(10,8,7,0.75) 0%, rgba(10,8,7,0.45) 45%, rgba(10,8,7,0.0) 70%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 600px at 80% 20%, rgba(178,122,123,0.20), transparent 60%), radial-gradient(700px 500px at 0% 80%, rgba(148,84,85,0.12), transparent 60%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay hero-grain"
        />

        <div className="relative max-w-[1280px] mx-auto w-full">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-px bg-rust-soft" />
            <span className="text-[11px] tracking-[0.32em] text-rust-soft font-semibold uppercase">
              Longevity Program
            </span>
          </div>
          <h1
            ref={heroRef}
            className="font-display font-bold text-[38px] md:text-[64px] xl:text-[84px] leading-[0.98] tracking-[-0.04em] text-white max-w-[1080px]"
          >
            <span className="line-mask">
              <span>Your Anti-Aging</span>
            </span>
            <br />
            <span className="line-mask">
              <span>Blueprint.</span>
            </span>
          </h1>

          <p className="mt-6 text-[15px] md:text-[17px] leading-[1.65] text-white/75 max-w-[640px] font-light">
            Where science meets wellness, through guided intervention. Advanced
            diagnostics, AI-powered analytics and doctor-designed protocols
            tailored to your unique biology.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-2.5 md:gap-3">
            {HERO_PILLS.map((p) => (
              <div
                key={p.k}
                className="inline-flex items-center gap-2.5 md:gap-3 backdrop-blur-md bg-white/[0.06] hover:bg-white/[0.10] transition-colors duration-500 border border-white/15 rounded-full pl-3.5 pr-4 md:pl-4 md:pr-5 py-2 md:py-2.5 shadow-[0_18px_40px_-25px_rgba(0,0,0,0.6)]"
              >
                <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-rust-soft shrink-0" />
                <span className="text-[9.5px] tracking-[0.32em] uppercase text-white/60 font-semibold whitespace-nowrap">
                  {p.k}
                </span>
                <span className="text-[12.5px] md:text-[13px] tracking-[-0.005em] text-white font-semibold whitespace-nowrap tabular-nums">
                  {p.v}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#program-cta"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 pl-6 pr-7 py-4 bg-white text-ink text-[12px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust hover:text-white transition-colors duration-500"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
              </span>
              Free Longevity Assessment
              <span aria-hidden="true" className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="https://wa.me/918826809123"
              data-cursor="hover"
              className="inline-flex items-center gap-2 px-6 py-4 border border-white/20 text-white text-[12px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-white/10 transition-colors duration-500"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* THREE-STEP PROCESS */}
      <section className="bg-cream/40 py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                How It Works
              </span>
              <span className="w-7 h-px bg-rust" />
            </div>
            <h2 className="font-display font-bold text-[28px] md:text-[44px] leading-[1.0] tracking-[-0.03em] text-ink max-w-[760px] mx-auto">
              Three steps to a measurably longer healthspan.
            </h2>
          </div>

          <div ref={stepsRef} className="grid md:grid-cols-3 gap-5 md:gap-6">
            {STEPS.map((s) => (
              <article
                key={s.n}
                className="step-card group relative bg-white hover:bg-cream rounded-[20px] border border-mist/70 hover:border-rust/30 p-7 md:p-8 overflow-hidden transition-colors duration-500"
                style={{ willChange: 'transform, opacity' }}
              >
                <span
                  aria-hidden
                  className="absolute -right-2 -bottom-4 font-display font-bold text-[140px] md:text-[180px] leading-none text-ink/[0.04] tabular-nums tracking-[-0.04em] pointer-events-none select-none transition-all duration-700 group-hover:text-rust/[0.08]"
                >
                  {s.n}
                </span>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-display font-bold text-[14px] tracking-[-0.01em] text-rust tabular-nums">
                      {s.n}
                    </span>
                    <span className="w-7 h-px bg-rust" />
                  </div>
                  <h3 className="font-display font-bold text-[22px] md:text-[26px] leading-[1.05] tracking-[-0.025em] text-ink mb-3">
                    {s.title}
                  </h3>
                  <p className="text-[14px] md:text-[15px] leading-[1.65] text-graphite font-light">
                    {s.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LIFESTYLE PROGRAMS */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                Tailored to You
              </span>
              <span className="w-7 h-px bg-rust" />
            </div>
            <h2 className="font-display font-bold text-[28px] md:text-[44px] leading-[1.0] tracking-[-0.03em] text-ink max-w-[820px] mx-auto">
              Personalised longevity solutions for every lifestyle.
            </h2>
          </div>

          <div ref={lifestyleRef} className="grid md:grid-cols-2 gap-5 md:gap-6">
            {LIFESTYLES.map((l) => (
              <article
                key={l.n}
                className="lifestyle-card group relative bg-cream/40 hover:bg-cream rounded-[20px] border border-mist/70 hover:border-rust/30 p-7 md:p-8 lg:p-10 overflow-hidden transition-colors duration-500"
                style={{ willChange: 'transform, opacity' }}
              >
                <span
                  aria-hidden
                  className="absolute -right-2 -bottom-4 font-display font-bold text-[160px] md:text-[200px] leading-none text-ink/[0.04] tabular-nums tracking-[-0.04em] pointer-events-none select-none transition-all duration-700 group-hover:text-rust/[0.08]"
                >
                  {l.n}
                </span>
                <div className="relative">
                  <div className="text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold mb-4 tabular-nums">
                    {l.n} · For
                  </div>
                  <h3 className="font-display font-bold text-[22px] md:text-[28px] leading-[1.05] tracking-[-0.025em] text-ink mb-4">
                    {l.title}
                  </h3>
                  <p className="text-[14px] md:text-[15px] leading-[1.65] text-graphite font-light max-w-[520px]">
                    {l.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST & CREDIBILITY */}
      <section className="bg-cream/40 py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                Why TAC
              </span>
              <span className="w-7 h-px bg-rust" />
            </div>
            <h2 className="font-display font-bold text-[28px] md:text-[44px] leading-[1.0] tracking-[-0.03em] text-ink max-w-[820px] mx-auto">
              Trusted by experts. Powered by technology. Backed by science.
            </h2>
          </div>

          <div ref={trustRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {TRUST.map((t, i) => (
              <article
                key={t.title}
                className="trust-card group relative bg-white hover:bg-cream rounded-[20px] border border-mist/70 hover:border-rust/30 p-6 md:p-7 overflow-hidden transition-colors duration-500"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="text-[10px] tracking-[0.28em] uppercase text-stone/55 font-medium mb-4 tabular-nums">
                  0{i + 1}
                </div>
                <h3 className="font-display font-bold text-[18px] md:text-[20px] leading-[1.15] tracking-[-0.02em] text-ink mb-3">
                  {t.title}
                </h3>
                <p className="text-[13.5px] leading-[1.65] text-graphite font-light">
                  {t.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[920px] mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                FAQ
              </span>
              <span className="w-7 h-px bg-rust" />
            </div>
            <h2 className="font-display font-bold text-[28px] md:text-[40px] leading-[1.0] tracking-[-0.03em] text-ink">
              Things people ask us.
            </h2>
          </div>

          <ul className="border-t border-mist">
            {FAQS.map((f, i) => {
              const open = openFaq === i
              return (
                <li key={i} className="border-b border-mist">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    data-cursor="hover"
                    className="w-full text-left py-5 md:py-6 flex items-start gap-5 md:gap-7 group"
                  >
                    <span className="font-display font-bold text-[12px] md:text-[13px] text-rust tabular-nums tracking-tight pt-1 shrink-0 w-7">
                      0{i + 1}
                    </span>
                    <span className="flex-1 font-display font-semibold text-[16px] md:text-[18px] leading-[1.35] tracking-[-0.01em] text-ink group-hover:text-rust-deep transition-colors duration-300">
                      {f.q}
                    </span>
                    <span
                      aria-hidden
                      className={`shrink-0 w-8 h-8 rounded-full border border-mist flex items-center justify-center text-ink transition-all duration-500 ${
                        open ? 'bg-ink text-white rotate-45' : 'group-hover:border-rust/60'
                      }`}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    className="overflow-hidden transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] grid"
                    style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                  >
                    <div className="min-h-0">
                      <div className="pb-6 md:pb-7 pl-12 md:pl-14 pr-12 md:pr-14 text-[14px] md:text-[15px] leading-[1.7] text-graphite font-light">
                        {f.a}
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* FINAL CTA — health-concern chips + free assessment */}
      <section
        id="program-cta"
        className="relative bg-ink py-16 md:py-24 px-6 md:px-12 overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 600px at 20% 30%, rgba(148,84,85,0.18), transparent 60%), radial-gradient(800px 500px at 85% 70%, rgba(178,122,123,0.12), transparent 60%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay hero-grain"
        />
        <div className="relative z-10 max-w-[1180px] mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="w-7 h-px bg-rust-soft" />
            <span className="text-[11px] tracking-[0.32em] uppercase text-rust-soft font-semibold">
              Ready to Age Backwards?
            </span>
            <span className="w-7 h-px bg-rust-soft" />
          </div>
          <h2 className="font-display font-bold text-[32px] md:text-[60px] leading-[0.98] tracking-[-0.035em] text-white text-center mb-6">
            Let's begin.
          </h2>
          <p className="text-[15px] md:text-[17px] text-white/70 max-w-[600px] mx-auto leading-[1.65] mb-10 text-center font-light">
            Free 30-minute assessment with a senior doctor. Choose what brings
            you here — we'll guide you to the right protocol.
          </p>

          {/* Health concern chips */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 mb-10 max-w-[820px] mx-auto">
            {HEALTH_CONCERNS.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-2 backdrop-blur-md bg-white/[0.06] hover:bg-white/[0.12] transition-colors duration-500 border border-white/15 rounded-full px-4 py-2 text-[12px] tracking-[-0.005em] text-white/85 font-medium cursor-default"
              >
                <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-rust-soft" />
                {c}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/#cta"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 pl-6 pr-7 py-4 bg-white text-ink text-[12px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust hover:text-white transition-colors duration-500"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
              </span>
              Book Free Assessment
              <span aria-hidden="true" className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="https://wa.me/918826809123"
              data-cursor="hover"
              className="inline-flex items-center gap-2 px-6 py-4 border border-white/20 text-white text-[12px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-white/10 transition-colors duration-500"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
