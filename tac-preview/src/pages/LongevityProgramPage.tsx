// LongevityProgramPage — content sourced verbatim from
// theantiagingcentre.com/landing/ ("Your Anti-Aging Blueprint").
//
// This is the brand's flagship page — built to impress.
// Sections: Hero · Biological-Age stat · 3-Step Process · Diagnostics grid ·
//           Lifestyle Programs · Trust & Credibility · FAQ · Final CTA.
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
    icon: '/longevity/step-diagnostics.png',
  },
  {
    n: '02',
    title: 'Precision Analytics',
    body: 'Our experienced doctors, while leveraging AI tech, analyze your data in-depth, uncovering insights at a cellular level.',
    icon: '/longevity/dna-icon.svg',
  },
  {
    n: '03',
    title: 'Personalised Solutions',
    body: 'Get tailored protocols designed by experienced doctors to support your optimal health based on your diagnostics and reports.',
    icon: '/longevity/step-solutions.png',
  },
]

// Verified from clinic nav: 9 diagnostic technologies offered
const DIAGNOSTICS = [
  { n: '01', name: 'Cell Scan Test', tag: 'Cellular Function' },
  { n: '02', name: 'Genetic Test', tag: 'DNA Analysis' },
  { n: '03', name: 'Blood Tests', tag: '163+ Biomarkers' },
  { n: '04', name: 'Gut Microbiota', tag: 'Microbiome Mapping' },
  { n: '05', name: 'Face Scan', tag: 'Skin & Aesthetic' },
  { n: '06', name: 'BCA', tag: 'Body Composition' },
  { n: '07', name: 'BMD', tag: 'Bone Mineral Density' },
  { n: '08', name: 'EndoPAT', tag: 'Vascular Function' },
  { n: '09', name: 'Biological Clock', tag: 'Epigenetic Age' },
]

const LIFESTYLES = [
  {
    n: '01',
    tag: 'Executive · Burnout',
    title: 'Leadership Elite',
    body: 'Struggling with burnout, demanding schedules, and maintaining energy and focus? Long-term health optimisation strategies and biomarker reversal programmes for peak performance — without compromising on health.',
    img: '/longevity/leadership.png',
  },
  {
    n: '02',
    tag: 'Athletic · Performance',
    title: 'Fitness Enthusiasts',
    body: "Concerned about performance optimisation, injury prevention and recovery times? Precision diagnostics and tailored recommendations reduce injury risk and enhance athletic performance.",
    img: '/longevity/fitness.png',
  },
  {
    n: '03',
    tag: 'Chronic · Root Cause',
    title: 'Individuals with Health Conditions',
    body: "Facing persistent health issues that are difficult to manage? Comprehensive diagnostics uncover root causes and offer targeted solutions for chronic conditions, with customised plans focused on long-term recovery.",
    img: '/longevity/health-conditions.png',
  },
  {
    n: '04',
    tag: 'Family · Longevity',
    title: 'Wellness-Centred Families',
    body: "Balancing the health and wellness needs of every family member? TLC supports your family's journey with sustainable healthy habits and long-term wellness strategies.",
    img: '/longevity/wellness-families.png',
  },
]

const TRUST = [
  {
    title: 'Certified Medical Expertise',
    body: 'Our doctors, specialists and longevity experts come from top-tier institutions, with decades of experience in preventive, regenerative and precision medicine.',
    icon: '/longevity/trust-expertise.png',
  },
  {
    title: 'AI-Enhanced Human Insight',
    body: 'Our AI platforms analyse thousands of biomarkers across genetics, microbiome, metabolism and inflammation — delivering insights no traditional check-up can match.',
    icon: '/longevity/trust-ai.png',
  },
  {
    title: 'Regular Expert Check-ins',
    body: "Nutritionists check in weekly and senior doctors monthly — so you never feel alone in your longevity journey.",
    icon: '/longevity/trust-checkin.png',
  },
  {
    title: 'Backed by Clinical Studies',
    body: "TLC's approach is grounded in scientific research and clinical evidence. From genetic testing to gut-health optimisation, our methods have been refined through rigorous clinical trials.",
    icon: '/longevity/trust-clinical.png',
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
    q: "How is TLC's approach different from a regular doctor or health checkup?",
    a: 'TLC goes beyond traditional health checkups by offering personalised, data-driven diagnostics across metabolic health, genetics and gut microbiome — powered by AI insights and supported by expert medical teams.',
  },
  {
    q: 'Will my health plan be personalised to me, or is it a pre-made protocol?',
    a: 'Your health plan at TLC is fully personalised. We use your individual diagnostics to create a customised programme tailored specifically to your unique biological markers and goals.',
  },
  {
    q: 'How useful is TLC to me if I feel fine?',
    a: 'Even if you feel fine, TLC helps you uncover hidden health issues that could affect your long-term wellness — such as early metabolic slowdowns, inflammation or genetic risks — so you can prevent future problems before they arise.',
  },
  {
    q: 'What exactly happens after I take the free longevity assessment?',
    a: 'After taking the free longevity assessment with a senior doctor, who guides you on the right programme, you undergo the tests associated with that programme. Your results are analysed by a senior doctor to create a personalised protocol for you.',
  },
  {
    q: 'How long does it take to see noticeable results once I start a TLC program?',
    a: 'Results may vary for each individual, but some people have experienced changes such as weight loss within 15 days of starting the program.',
  },
  {
    q: 'Is this an in-person or virtual service?',
    a: 'TLC offers both virtual consultations and in-person visits at select locations, providing flexible options based on your preference and convenience.',
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
  { k: 'Centres', v: '8 Pan-India' },
]

const PROGRAM_META = {
  title: 'Longevity Program · TLC — Your Anti-Aging Blueprint',
  description:
    "TLC's flagship 12-month protocol — advanced metabolic, DNA and gut microbiome diagnostics, AI analytics, doctor-designed personalised plans.",
  path: '/longevity-program',
  ogImage: '/og/longevity-program.jpg',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://thelongevitycentre.com/longevity-program#webpage',
      url: 'https://thelongevitycentre.com/longevity-program',
      name: 'Longevity Program · TLC — Your Anti-Aging Blueprint',
      isPartOf: { '@id': 'https://thelongevitycentre.com/#organization' },
      about: { '@id': 'https://thelongevitycentre.com/#organization' },
      inLanguage: 'en-IN',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      '@id': 'https://thelongevitycentre.com/longevity-program#procedure',
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
  const dnaRef = useRef<HTMLDivElement>(null)
  const ageRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const stepLineRef = useRef<HTMLDivElement>(null)
  const diagnosticsRef = useRef<HTMLDivElement>(null)
  const lifestyleRef = useRef<HTMLDivElement>(null)
  const lifestyleCardsRef = useRef<(HTMLDivElement | null)[]>([])
  const trustRef = useRef<HTMLDivElement>(null)
  const moodRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLElement>(null)
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

    // DNA helix floating animation — gentle Y bob + slow rotation
    if (dnaRef.current) {
      const bob = gsap.to(dnaRef.current, {
        y: '-=20',
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
      const spin = gsap.to(dnaRef.current, {
        rotation: 360,
        duration: 60,
        ease: 'none',
        repeat: -1,
      })
      cleanups.push(() => {
        bob.kill()
        spin.kill()
      })
    }

    // Biological age count-up — animate "5" → "15"
    const ageNum = ageRef.current?.querySelector<HTMLElement>('.age-num')
    if (ageNum) {
      const obj = { v: 0 }
      const t = gsap.to(obj, {
        v: 15,
        duration: 2.4,
        ease: 'expo.out',
        scrollTrigger: { trigger: ageRef.current, start: 'top 75%' },
        onUpdate: () => {
          ageNum.textContent = `5–${Math.round(obj.v)}`
        },
      })
      cleanups.push(() => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }

    // Step cards stagger + animated connecting line draw
    const stepCards = stepsRef.current?.querySelectorAll<HTMLElement>('.step-card')
    if (stepCards?.length) {
      gsap.set(stepCards, { y: 60, opacity: 0, scale: 0.96 })
      const t = gsap.to(stepCards, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: 'expo.out',
        stagger: 0.15,
        scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' },
      })
      cleanups.push(() => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }

    if (stepLineRef.current) {
      const t = gsap.fromTo(
        stepLineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 70%' },
        }
      )
      cleanups.push(() => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }

    // Diagnostics chips — staggered reveal with subtle scale
    const diagChips = diagnosticsRef.current?.querySelectorAll<HTMLElement>('.diag-chip')
    if (diagChips?.length) {
      gsap.set(diagChips, { y: 30, opacity: 0, scale: 0.9 })
      const t = gsap.to(diagChips, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'expo.out',
        stagger: { each: 0.05, from: 'random' },
        scrollTrigger: { trigger: diagnosticsRef.current, start: 'top 80%' },
      })
      cleanups.push(() => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }

    // Lifestyle cards — stacking-deck (mirrors home Programs section)
    const lifestyleCards = lifestyleCardsRef.current.filter(Boolean) as HTMLDivElement[]
    if (lifestyleCards.length) {
      const pinTop = window.innerWidth >= 768 ? 110 : 90
      lifestyleCards.forEach((card, i) => {
        const inner = card.querySelector<HTMLElement>('.card-inner')
        const img = card.querySelector<HTMLElement>('.card-img')
        if (!inner) return
        const next = lifestyleCards[i + 1]

        if (next) {
          const pinST = ScrollTrigger.create({
            trigger: card,
            start: `top top+=${pinTop}`,
            endTrigger: next,
            end: `top top+=${pinTop + 60}`,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
          })
          cleanups.push(() => pinST.kill())

          const depthTween = gsap.fromTo(
            inner,
            { scale: 1, opacity: 1, y: 0 },
            {
              scale: 0.94,
              opacity: 0,
              y: -90,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: next,
                start: 'top bottom-=80',
                end: `top top+=${pinTop + 20}`,
                scrub: 1.4,
              },
            }
          )
          cleanups.push(() => {
            depthTween.scrollTrigger?.kill()
            depthTween.kill()
          })
        }

        // ENTER — gentle slide-up
        const enterTween = gsap.fromTo(
          inner,
          { y: 140, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', once: true },
          }
        )
        cleanups.push(() => {
          enterTween.scrollTrigger?.kill()
          enterTween.kill()
        })

        // Image parallax
        if (img) {
          const imgTween = gsap.fromTo(
            img,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          )
          cleanups.push(() => {
            imgTween.scrollTrigger?.kill()
            imgTween.kill()
          })
        }
      })
    }

    // Mood images — staggered scale-in reveal
    const moodTiles = moodRef.current?.querySelectorAll<HTMLElement>('.mood-tile')
    if (moodTiles?.length) {
      gsap.set(moodTiles, { opacity: 0, scale: 0.9, y: 20 })
      const t = gsap.to(moodTiles, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: { each: 0.06, from: 'start' },
        scrollTrigger: { trigger: moodRef.current, start: 'top 75%' },
      })
      cleanups.push(() => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }

    // Pull-quote — masked-line reveal
    if (quoteRef.current) {
      const lines = quoteRef.current.querySelectorAll<HTMLElement>('.line-mask > span')
      if (lines.length) {
        gsap.set(lines, { yPercent: 110 })
        const t = gsap.to(lines, {
          yPercent: 0,
          duration: 1.4,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: { trigger: quoteRef.current, start: 'top 75%' },
        })
        cleanups.push(() => {
          t.scrollTrigger?.kill()
          t.kill()
        })
      }
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
      {/* HERO — cinematic dark with cross-fading montage + floating DNA glyph */}
      <section className="relative bg-ink text-white pt-28 md:pt-32 pb-12 md:pb-16 px-6 md:px-12 overflow-hidden min-h-screen min-h-[100svh] flex items-center">
        <video className="hero-clip clip-1" src="/videos/centres-clips/dna.mp4" autoPlay loop muted playsInline preload="metadata" aria-hidden="true" />
        <video className="hero-clip clip-2" src="/videos/centres-clips/lab.mp4" autoPlay loop muted playsInline preload="metadata" aria-hidden="true" />
        <video className="hero-clip clip-3" src="/videos/centres-clips/clinic.mp4" autoPlay loop muted playsInline preload="metadata" aria-hidden="true" />

        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(10,8,7,0.65) 0%, rgba(10,8,7,0.35) 30%, rgba(10,8,7,0.55) 75%, rgba(10,8,7,0.85) 100%)' }} />
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(10,8,7,0.75) 0%, rgba(10,8,7,0.45) 45%, rgba(10,8,7,0.0) 70%)' }} />
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(900px 600px at 80% 20%, rgba(178,122,123,0.20), transparent 60%), radial-gradient(700px 500px at 0% 80%, rgba(148,84,85,0.12), transparent 60%)' }} />
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay hero-grain" />

        {/* Floating DNA glyph — top right, multi-ring ambient + slow rotation + bob */}
        <div
          ref={dnaRef}
          aria-hidden
          className="hidden lg:block absolute top-32 right-12 xl:right-24 w-[160px] h-[160px] flex items-center justify-center pointer-events-none"
          style={{ willChange: 'transform' }}
        >
          {/* Outermost glow */}
          <span className="absolute inset-[-40px] rounded-full opacity-50" style={{ background: 'radial-gradient(circle, rgba(178,122,123,0.45), transparent 65%)' }} />
          {/* Pulsing rings */}
          <span className="absolute inset-0 rounded-full border border-rust-soft/40 animate-[ping_4s_ease-in-out_infinite]" />
          <span className="absolute inset-3 rounded-full border border-rust-soft/25 animate-[ping_5s_ease-in-out_infinite]" style={{ animationDelay: '0.8s' }} />
          {/* Inner disc */}
          <div className="relative w-[120px] h-[120px] rounded-full backdrop-blur-md bg-white/[0.08] border border-white/20 flex items-center justify-center shadow-[0_30px_80px_-25px_rgba(178,122,123,0.65)]">
            <img src="/longevity/dna-icon.svg" alt="" className="w-12 h-12 opacity-95" style={{ animation: 'spin 50s linear infinite' }} />
            {/* Inner highlight */}
            <span className="absolute inset-2 rounded-full" style={{ background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.18), transparent 55%)' }} />
          </div>
        </div>

        <div className="relative max-w-[1280px] mx-auto w-full">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-px bg-rust-soft" />
            <span className="text-[11px] tracking-[0.32em] text-rust-soft font-semibold uppercase">
              Longevity Program · Flagship
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
              <div key={p.k} className="inline-flex items-center gap-2.5 md:gap-3 backdrop-blur-md bg-white/[0.06] hover:bg-white/[0.10] transition-colors duration-500 border border-white/15 rounded-full pl-3.5 pr-4 md:pl-4 md:pr-5 py-2 md:py-2.5 shadow-[0_18px_40px_-25px_rgba(0,0,0,0.6)]">
                <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-rust-soft shrink-0" />
                <span className="text-[9.5px] tracking-[0.32em] uppercase text-white/60 font-semibold whitespace-nowrap">{p.k}</span>
                <span className="text-[12.5px] md:text-[13px] tracking-[-0.005em] text-white font-semibold whitespace-nowrap tabular-nums">{p.v}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#program-cta" data-cursor="hover" className="group inline-flex items-center gap-3 pl-6 pr-7 py-4 bg-white text-ink text-[12px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust hover:text-white transition-colors duration-500">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
              </span>
              Free Longevity Assessment
              <span aria-hidden="true" className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
            <a href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0" data-cursor="hover" className="inline-flex items-center gap-2 px-6 py-4 border border-white/20 text-white text-[12px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-white/10 transition-colors duration-500">WhatsApp</a>
          </div>
        </div>
      </section>

      {/* BIOLOGICAL AGE — dramatic stat band */}
      <section ref={ageRef} className="relative bg-ink text-white py-20 md:py-28 px-6 md:px-12 overflow-hidden border-t border-white/5">
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(900px 560px at 50% 50%, rgba(148,84,85,0.22), transparent 60%)' }} />
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay hero-grain" />
        <div className="relative max-w-[1180px] mx-auto grid md:grid-cols-[1fr_1.05fr] gap-12 md:gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-px bg-rust-soft" />
              <span className="text-[11px] tracking-[0.32em] uppercase text-rust-soft font-semibold">
                Biological Age
              </span>
            </div>
            <h2 className="font-display font-bold text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.03em] text-white mb-5">
              Reverse the clock, measurably.
            </h2>
            <p className="text-[15px] md:text-[16px] text-white/70 leading-[1.65] font-light max-w-[460px]">
              With evidence-based protocols our patients improve their biological
              age by years and meaningfully slow their rate of ageing —
              verified by repeat diagnostics.
            </p>
          </div>
          <div className="text-center md:text-left">
            <div className="inline-flex items-baseline gap-3 md:gap-4 max-w-full">
              <span
                className="age-num font-display font-bold text-[88px] sm:text-[104px] md:text-[148px] xl:text-[180px] leading-[0.88] tracking-[-0.05em] tabular-nums bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #B27A7B 100%)' }}
              >
                5–15
              </span>
              <span className="font-display font-medium text-rust-soft text-[22px] md:text-[34px] xl:text-[42px] leading-none tracking-[-0.02em]">
                years
              </span>
            </div>
            <div className="mt-5 md:mt-6 inline-flex items-center gap-3 text-[11px] md:text-[12px] tracking-[0.28em] uppercase text-white/60 font-medium">
              <span className="w-7 h-px bg-rust-soft/70" />
              Younger biological age · Evidence-based
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL DIRECTION — official TLC brand-guide mood imagery + voice */}
      <section className="bg-cream/40 py-16 md:py-20 px-6 md:px-12 overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid md:grid-cols-[5fr_7fr] gap-10 md:gap-14 items-center">
            {/* Left — brand-voice copy verbatim from the brand guide */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-px bg-rust" />
                <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                  The Longevity Centre · Visual Direction
                </span>
              </div>
              <h2 className="font-display font-bold text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.03em] text-ink mb-6">
                Calm. Human-centered. Rooted in nature.
              </h2>
              <div className="space-y-4 text-[14.5px] md:text-[15.5px] leading-[1.7] text-graphite font-light max-w-[480px]">
                <p>
                  Inspired by nature, skin textures, natural light and organic
                  materials — the mood emphasises warmth, softness and
                  authenticity.
                </p>
                <p>
                  The overall aesthetic balances clinical precision with a more
                  emotional, lifestyle-oriented experience. This direction
                  supports our transition from anti-aging to longevity —
                  focusing on long-term wellbeing, balance and inner vitality.
                </p>
              </div>
              <div className="mt-7 flex items-center gap-2.5">
                {/* Brand swatch row — official Casual Rust + Nougat + secondary trio */}
                {[
                  { hex: '#945455', name: 'Casual Rust' },
                  { hex: '#EEE6DB', name: 'Nougat' },
                  { hex: '#323C31', name: 'Tropical Green' },
                  { hex: '#AB542E', name: 'Paarl' },
                  { hex: '#A19B7B', name: 'Iguana' },
                ].map((c) => (
                  <div key={c.hex} className="group relative">
                    <span
                      className="block w-7 h-7 rounded-full border border-mist/60 shadow-[0_4px_10px_-4px_rgba(0,0,0,0.2)]"
                      style={{ background: c.hex }}
                      title={`${c.name} ${c.hex}`}
                    />
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.18em] uppercase text-stone whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — dense masonry of brand-guide mood imagery */}
            <div ref={moodRef} className="grid grid-cols-3 gap-2 md:gap-3 auto-rows-[110px] md:auto-rows-[120px]">
              <div className="mood-tile row-span-2 relative overflow-hidden rounded-[16px] bg-mist group" style={{ willChange: 'transform, opacity' }}>
                <img src="/longevity/brand/mood-feet-moss.jpg" alt="Bare feet on moss" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]" />
                <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-rust/0 group-hover:ring-rust/30 rounded-[16px] transition-all duration-500" />
              </div>
              <div className="mood-tile relative overflow-hidden rounded-[16px] bg-mist group" style={{ willChange: 'transform, opacity' }}>
                <img src="/longevity/brand/mood-zen-sand.jpg" alt="Zen sand garden" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]" />
                <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-rust/0 group-hover:ring-rust/30 rounded-[16px] transition-all duration-500" />
              </div>
              <div className="mood-tile row-span-2 relative overflow-hidden rounded-[16px] bg-mist group" style={{ willChange: 'transform, opacity' }}>
                <img src="/longevity/brand/mood-hands-pose.jpg" alt="Elegant hand pose" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]" />
                <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-rust/0 group-hover:ring-rust/30 rounded-[16px] transition-all duration-500" />
              </div>
              <div className="mood-tile relative overflow-hidden rounded-[16px] bg-mist group" style={{ willChange: 'transform, opacity' }}>
                <img src="/longevity/brand/mood-leaf-skeleton.jpg" alt="Skeleton leaf detail" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]" />
                <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-rust/0 group-hover:ring-rust/30 rounded-[16px] transition-all duration-500" />
              </div>
              <div className="mood-tile relative overflow-hidden rounded-[16px] bg-mist group" style={{ willChange: 'transform, opacity' }}>
                <img src="/longevity/brand/mood-water-ripple.jpg" alt="Water ripple" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]" />
                <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-rust/0 group-hover:ring-rust/30 rounded-[16px] transition-all duration-500" />
              </div>
              <div className="mood-tile relative overflow-hidden rounded-[16px] bg-mist group" style={{ willChange: 'transform, opacity' }}>
                <img src="/longevity/brand/mood-yoga-duo.jpg" alt="Yoga movement" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]" />
                <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-rust/0 group-hover:ring-rust/30 rounded-[16px] transition-all duration-500" />
              </div>
              <div className="mood-tile relative overflow-hidden rounded-[16px] bg-mist group" style={{ willChange: 'transform, opacity' }}>
                <img src="/longevity/brand/mood-terracotta.jpg" alt="Terracotta texture" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]" />
                <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-rust/0 group-hover:ring-rust/30 rounded-[16px] transition-all duration-500" />
              </div>
              <div className="mood-tile col-span-2 relative overflow-hidden rounded-[16px] bg-mist group" style={{ willChange: 'transform, opacity' }}>
                <img src="/longevity/brand/mood-forest-light.jpg" alt="Meditation under tree with light beams" loading="lazy" className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]" />
                <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-rust/0 group-hover:ring-rust/30 rounded-[16px] transition-all duration-500" />
              </div>
              <div className="mood-tile relative overflow-hidden rounded-[16px] bg-mist group" style={{ willChange: 'transform, opacity' }}>
                <img src="/longevity/brand/mood-body-mind-soul.jpg" alt="Stone with body mind soul text" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]" />
                <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-rust/0 group-hover:ring-rust/30 rounded-[16px] transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE-STEP PROCESS — with icons + animated connecting line */}
      <section className="bg-cream/40 py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">How It Works</span>
              <span className="w-7 h-px bg-rust" />
            </div>
            <h2 className="font-display font-bold text-[28px] md:text-[44px] leading-[1.0] tracking-[-0.03em] text-ink max-w-[760px] mx-auto">
              Three steps to a measurably longer healthspan.
            </h2>
          </div>

          <div ref={stepsRef} className="relative">
            {/* Animated connecting line — desktop only */}
            <div
              ref={stepLineRef}
              aria-hidden
              className="hidden md:block absolute top-[58px] left-[16%] right-[16%] h-px bg-rust/40 origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
            <div className="grid md:grid-cols-3 gap-5 md:gap-6 relative">
              {STEPS.map((s) => (
                <article
                  key={s.n}
                  className="step-card group relative bg-white hover:bg-cream rounded-[22px] border border-mist/70 hover:border-rust/30 p-7 md:p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-50px_rgba(27,26,24,0.30)]"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <span aria-hidden className="absolute -right-2 -bottom-4 font-display font-bold text-[140px] md:text-[180px] leading-none text-ink/[0.04] tabular-nums tracking-[-0.04em] pointer-events-none select-none transition-all duration-700 group-hover:text-rust/[0.10] group-hover:scale-110">
                    {s.n}
                  </span>
                  <div className="relative">
                    {/* Icon disc */}
                    <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-ink flex items-center justify-center mb-5 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3 shadow-[0_18px_40px_-15px_rgba(27,26,24,0.4)]">
                      <img src={s.icon} alt="" loading="lazy" className="w-7 h-7 md:w-8 md:h-8 object-contain" style={s.icon.endsWith('.svg') ? { filter: 'invert(56%) sepia(25%) saturate(630%) hue-rotate(317deg) brightness(94%) contrast(86%)' } : undefined} />
                      <span aria-hidden className="absolute inset-0 rounded-full border border-rust-soft/0 group-hover:border-rust-soft/40 transition-all duration-700 scale-110 group-hover:scale-125" />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-display font-bold text-[14px] tracking-[-0.01em] text-rust tabular-nums">{s.n}</span>
                      <span className="w-7 h-px bg-rust" />
                    </div>
                    <h3 className="font-display font-bold text-[22px] md:text-[26px] leading-[1.05] tracking-[-0.025em] text-ink mb-3">{s.title}</h3>
                    <p className="text-[14px] md:text-[15px] leading-[1.65] text-graphite font-light">{s.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DIAGNOSTICS — 9 technology grid */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">Our Diagnostics</span>
              <span className="w-7 h-px bg-rust" />
            </div>
            <h2 className="font-display font-bold text-[28px] md:text-[44px] leading-[1.0] tracking-[-0.03em] text-ink max-w-[760px] mx-auto">
              Nine technologies. One clear picture.
            </h2>
            <p className="mt-5 text-[14.5px] md:text-[15.5px] text-graphite/80 font-light max-w-[600px] mx-auto leading-[1.65]">
              From cellular scans to epigenetic age — every signal mapped, every
              variable measured.
            </p>
          </div>

          <div ref={diagnosticsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {DIAGNOSTICS.map((d) => (
              <div
                key={d.name}
                className="diag-chip group relative bg-cream/40 hover:bg-white rounded-2xl border border-mist/70 hover:border-rust/40 p-5 md:p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(148,84,85,0.25)] cursor-default overflow-hidden"
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Subtle radial glow on hover */}
                <span aria-hidden className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(148,84,85,0.18), transparent 70%)' }} />

                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    {/* DNA icon disc */}
                    <span className="w-9 h-9 rounded-full bg-ink/[0.04] group-hover:bg-rust/10 border border-mist group-hover:border-rust/30 flex items-center justify-center transition-all duration-500">
                      <img src="/longevity/dna-icon.svg" alt="" className="w-4 h-4 transition-transform duration-700 group-hover:rotate-180" style={{ filter: 'invert(56%) sepia(25%) saturate(630%) hue-rotate(317deg) brightness(94%) contrast(86%)' }} />
                    </span>
                    <span className="font-display font-bold text-[12px] tracking-[-0.005em] text-rust tabular-nums">{d.n}</span>
                  </div>
                  <h3 className="font-display font-semibold text-[17px] md:text-[18px] tracking-[-0.015em] text-ink mb-1.5">
                    {d.name}
                  </h3>
                  <div className="text-[10.5px] tracking-[0.28em] uppercase text-stone font-medium mb-3">
                    {d.tag}
                  </div>
                  {/* Animated underline */}
                  <span aria-hidden className="block h-px w-8 bg-rust origin-left scale-x-100 group-hover:scale-x-[6] group-hover:opacity-60 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIFESTYLE PROGRAMS — stacking deck (matches home Programs section) */}
      <section className="relative bg-cream/40 py-20 md:py-28 px-6 md:px-12 overflow-hidden">
        {/* ambient backdrop */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              'radial-gradient(900px 600px at 80% 0%, rgba(167,75,42,0.05), transparent 60%), radial-gradient(700px 500px at 0% 80%, rgba(54,73,68,0.04), transparent 60%)',
          }}
        />

        {/* Header */}
        <div className="relative max-w-[1280px] mx-auto mb-16 md:mb-24">
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-end">
            <div>
              <div className="flex items-center gap-3 mb-7">
                <span className="w-8 h-px bg-rust" />
                <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                  Tailored to You
                </span>
              </div>
              <h2 className="font-display font-bold text-[36px] md:text-[56px] leading-[1.0] tracking-[-0.03em] text-ink">
                Personalised longevity solutions for every lifestyle.
              </h2>
            </div>
            <p className="text-[15px] md:text-[17px] leading-[1.7] text-graphite md:pb-4 max-w-[440px] font-light">
              Whichever season of life you're in, we'll meet you there — with a
              programme shaped around your goals, biology and routine.
            </p>
          </div>
        </div>

        {/* Stacking deck */}
        <div ref={lifestyleRef} className="relative max-w-[1240px] mx-auto">
          {LIFESTYLES.map((l, i) => (
            <div
              key={l.n}
              ref={(el) => {
                lifestyleCardsRef.current[i] = el
              }}
              className="lifestyle-card relative mb-[18vh] md:mb-[26vh] last:mb-0"
              style={{
                transformOrigin: 'center top',
                willChange: 'transform, opacity',
              }}
            >
              <div
                className="card-inner relative bg-white rounded-[28px] md:rounded-[36px] border border-mist/70 overflow-hidden"
                style={{
                  boxShadow:
                    '0 1px 0 rgba(255,255,255,0.7) inset, 0 40px 80px -50px rgba(27,26,24,0.22), 0 12px 30px -20px rgba(27,26,24,0.10)',
                  willChange: 'transform, opacity',
                }}
              >
                <div className="grid md:grid-cols-[1.05fr_1fr] min-h-[480px] md:min-h-[560px]">
                  {/* Content */}
                  <div className="relative px-9 py-12 md:px-14 md:py-16 lg:px-16 lg:py-20 flex flex-col justify-between">
                    {/* top row — number + tag */}
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <span className="font-display text-[20px] md:text-[22px] text-rust font-semibold tabular-nums tracking-tight">
                          {l.n}
                        </span>
                        <span className="h-px w-10 bg-rust/40" />
                        <span className="text-[10.5px] tracking-[0.3em] uppercase text-stone font-medium">
                          {l.tag}
                        </span>
                      </div>
                      <span className="text-[10.5px] tracking-[0.28em] uppercase text-stone/70 hidden md:inline">
                        {l.n} / {String(LIFESTYLES.length).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="mt-12 md:mt-0">
                      <h3 className="font-display font-bold text-[34px] md:text-[44px] lg:text-[52px] leading-[1.02] tracking-[-0.03em] text-ink mb-7">
                        {l.title}
                      </h3>
                      <p className="text-[15px] md:text-[17px] leading-[1.7] text-graphite max-w-[480px] mb-12 font-light">
                        {l.body}
                      </p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <a
                          href="#program-cta"
                          data-cursor="hover"
                          data-magnetic
                          className="group inline-flex items-center gap-3 pl-5 pr-7 py-4 bg-ink text-white text-[11.5px] tracking-[0.2em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
                        >
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
                          </span>
                          Explore this path
                          <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative overflow-hidden bg-mist min-h-[300px] md:min-h-full md:m-3 md:rounded-[24px]">
                    <img
                      src={l.img}
                      alt={l.title}
                      loading="lazy"
                      className="card-img absolute inset-0 w-full h-[112%] -top-[6%] object-cover"
                    />
                    {/* soft top-left vignette to anchor against text */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(255,255,255,0.0) 50%, rgba(27,26,24,0.18) 100%)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PULL QUOTE — magazine-style editorial spread with brand image */}
      <section ref={quoteRef} className="relative bg-cream/60 py-16 md:py-20 px-6 md:px-12 overflow-hidden">
        {/* Decorative ambient blobs */}
        <div aria-hidden className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(148,84,85,0.18), transparent 70%)' }} />
        <div aria-hidden className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(171,84,46,0.15), transparent 70%)' }} />

        <div className="relative max-w-[1180px] mx-auto grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-14 items-center">
          {/* Left — pull quote */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">
                Our Conviction
              </span>
            </div>
            <blockquote className="font-display font-bold text-[28px] md:text-[40px] xl:text-[48px] leading-[1.05] tracking-[-0.035em] text-ink">
              <span className="line-mask">
                <span>Longevity isn't</span>
              </span>
              <br />
              <span className="line-mask">
                <span>a luxury —</span>
              </span>
              <br />
              <span className="line-mask">
                <span><span className="text-rust">it's a priority.</span></span>
              </span>
            </blockquote>
            <div className="mt-7 flex items-center gap-3 text-[12px] tracking-[0.28em] uppercase text-stone font-medium">
              <span className="w-9 h-px bg-rust" />
              The Longevity Centre
            </div>
          </div>

          {/* Right — featured brand image with floating caption card */}
          <div className="relative max-w-[460px] md:max-w-none mx-auto md:mx-0 w-full">
            <div className="relative aspect-[4/5] md:aspect-[5/4] rounded-[24px] overflow-hidden bg-mist shadow-[0_40px_100px_-50px_rgba(27,26,24,0.35)]">
              <img src="/longevity/brand/mood-forest-light.jpg" alt="Meditation under a tree with morning light" loading="lazy" className="absolute inset-0 w-full h-full object-cover object-center" />
              <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.45) 100%)' }} />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="text-[10px] tracking-[0.32em] uppercase text-white/75 font-semibold mb-1.5">
                  Inner vitality
                </div>
                <div className="font-display font-semibold text-[16px] md:text-[18px] leading-[1.2] tracking-[-0.015em]">
                  Where stillness meets science.
                </div>
              </div>
            </div>
            {/* Floating accent badge */}
            <div className="absolute -bottom-5 -left-5 md:-bottom-6 md:-left-6 backdrop-blur-md bg-white/90 border border-mist rounded-[18px] px-4 py-3 shadow-[0_30px_60px_-30px_rgba(27,26,24,0.3)] hidden sm:block">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-ink flex items-center justify-center">
                  <img src="/longevity/dna-icon.svg" alt="" className="w-4 h-4" style={{ filter: 'invert(56%) sepia(25%) saturate(630%) hue-rotate(317deg) brightness(94%) contrast(86%)' }} />
                </span>
                <div>
                  <div className="text-[9px] tracking-[0.32em] uppercase text-stone font-semibold mb-0.5">Brand DNA</div>
                  <div className="font-display font-bold text-[12px] tracking-[-0.005em] text-ink">Calm · Human · Rooted</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND VOICE — editorial campaign tiles, infinite scrolling marquee */}
      <section
        aria-label="Brand campaigns"
        className="relative bg-ink text-white py-16 md:py-20 overflow-hidden border-y border-white/5"
      >
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(800px 500px at 50% 50%, rgba(148,84,85,0.15), transparent 70%)' }} />
        <div className="relative max-w-[1280px] mx-auto px-6 md:px-12 mb-10 md:mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-7 h-px bg-rust-soft" />
            <span className="text-[11px] tracking-[0.32em] text-rust-soft font-semibold uppercase">
              Editorial · Brand Voice
            </span>
            <span className="w-7 h-px bg-rust-soft" />
          </div>
          <h2 className="font-display font-bold text-[28px] md:text-[44px] leading-[1.0] tracking-[-0.03em] text-white max-w-[760px] mx-auto">
            Longevity, said out loud.
          </h2>
          <p className="mt-5 text-[14.5px] md:text-[15.5px] text-white/65 font-light max-w-[600px] mx-auto leading-[1.65]">
            From our editorial campaigns — the questions, habits and ideas that
            shape a longer, calmer, healthier life.
          </p>
        </div>

        {/* Marquee track — duplicated for seamless loop */}
        <div className="relative w-full overflow-hidden marquee">
          <div className="marquee-track items-stretch">
            {[...Array(2)].flatMap((_, dup) => [
              { src: '/longevity/brand/campaign-mind-body-soul.jpg', label: 'We Take Care of Mind, Body & Soul', dup },
              { src: '/longevity/brand/campaign-spirit.jpg', label: 'Empower Your Mind, Body & Spirit', dup },
              { src: '/longevity/brand/campaign-3-3-3.jpg', label: 'The 3-3-3 Rule for Longevity', dup },
              { src: '/longevity/brand/campaign-5-habits.jpg', label: '5 Habits for a Quality Life', dup },
              { src: '/longevity/brand/campaign-longevity-guide.jpg', label: 'The Longevity Guide', dup },
              { src: '/longevity/brand/campaign-name-feel.jpg', label: 'Name What You Feel', dup },
              { src: '/longevity/brand/campaign-body-aesthetics.jpg', label: 'Body Aesthetics, Refined', dup },
            ]).map((c, i) => (
              <a
                key={`${c.dup}-${i}`}
                href="#program-cta"
                data-cursor="hover"
                className="group relative w-[260px] md:w-[300px] aspect-[4/5] shrink-0 overflow-hidden rounded-[18px] bg-white/5 border border-white/10 hover:border-rust-soft/50 transition-colors duration-500"
              >
                <img
                  src={c.src}
                  alt={c.label}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                <div aria-hidden className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(148,84,85,0.55) 100%)' }} />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                  <div className="text-[9.5px] tracking-[0.32em] uppercase text-white/70 font-semibold mb-1">
                    Campaign
                  </div>
                  <div className="font-display font-semibold text-[14px] leading-[1.2] tracking-[-0.01em]">
                    {c.label}
                  </div>
                </div>
              </a>
            ))}
          </div>
          {/* Edge fades */}
          <div aria-hidden className="absolute inset-y-0 left-0 w-24 md:w-40 pointer-events-none" style={{ background: 'linear-gradient(90deg, #1B1A18, transparent)' }} />
          <div aria-hidden className="absolute inset-y-0 right-0 w-24 md:w-40 pointer-events-none" style={{ background: 'linear-gradient(270deg, #1B1A18, transparent)' }} />
        </div>
      </section>

      {/* TRUST & CREDIBILITY — with icons */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">Why TLC</span>
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
                className="trust-card group relative bg-cream/40 hover:bg-white rounded-[20px] border border-mist/70 hover:border-rust/40 p-6 md:p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_-30px_rgba(148,84,85,0.30)]"
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Soft radial accent on hover */}
                <span aria-hidden className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(148,84,85,0.18), transparent 70%)' }} />

                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <div className="relative w-14 h-14 rounded-full bg-white border border-mist flex items-center justify-center group-hover:bg-rust/[0.06] group-hover:border-rust/40 transition-all duration-500">
                      <img src={t.icon} alt="" loading="lazy" className="w-7 h-7 object-contain transition-all duration-700 group-hover:scale-110" />
                      {/* Pulsing ring */}
                      <span aria-hidden className="absolute inset-0 rounded-full border border-rust/0 group-hover:border-rust/30 scale-100 group-hover:scale-125 transition-all duration-700" />
                    </div>
                    <span className="text-[10px] tracking-[0.28em] uppercase text-stone/55 font-medium tabular-nums">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-[17px] md:text-[19px] leading-[1.15] tracking-[-0.02em] text-ink mb-3">
                    {t.title}
                  </h3>
                  <p className="text-[13.5px] leading-[1.65] text-graphite font-light">
                    {t.body}
                  </p>
                  {/* Bottom accent line draws on hover */}
                  <span aria-hidden className="block h-px w-8 bg-rust mt-5 origin-left scale-x-100 group-hover:scale-x-[5] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream/40 py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[920px] mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-7 h-px bg-rust" />
              <span className="text-[11px] tracking-[0.32em] text-rust font-semibold uppercase">FAQ</span>
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
                    <span aria-hidden className={`shrink-0 w-8 h-8 rounded-full border border-mist flex items-center justify-center text-ink transition-all duration-500 ${open ? 'bg-ink text-white rotate-45' : 'group-hover:border-rust/60'}`}>
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
      <section id="program-cta" className="relative bg-ink py-12 md:py-16 px-6 md:px-12 overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(900px 600px at 20% 30%, rgba(148,84,85,0.18), transparent 60%), radial-gradient(800px 500px at 85% 70%, rgba(178,122,123,0.12), transparent 60%)' }} />
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay hero-grain" />
        <div className="relative z-10 max-w-[1180px] mx-auto">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-7 h-px bg-rust-soft" />
            <span className="text-[11px] tracking-[0.32em] uppercase text-rust-soft font-semibold">Ready to Age Backwards?</span>
            <span className="w-7 h-px bg-rust-soft" />
          </div>
          <h2 className="font-display font-bold text-[28px] md:text-[44px] leading-[1.0] tracking-[-0.035em] text-white text-center mb-4">
            Let's begin.
          </h2>
          <p className="text-[14px] md:text-[15px] text-white/70 max-w-[560px] mx-auto leading-[1.6] mb-7 text-center font-light">
            Free 30-minute assessment with a senior doctor. Choose what brings
            you here — we'll guide you to the right protocol.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-7 max-w-[760px] mx-auto">
            {HEALTH_CONCERNS.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5 backdrop-blur-md bg-white/[0.06] hover:bg-white/[0.12] hover:scale-105 transition-all duration-500 border border-white/15 rounded-full px-3 py-1.5 text-[11.5px] tracking-[-0.005em] text-white/85 font-medium cursor-default">
                <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-rust-soft" />
                {c}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="/contact" data-cursor="hover" className="group inline-flex items-center gap-3 pl-5 pr-6 py-3.5 bg-white text-ink text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust hover:text-white transition-colors duration-500">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
              </span>
              Book Free Assessment
              <span aria-hidden="true" className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
            <a href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0" data-cursor="hover" className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-white/10 transition-colors duration-500">WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  )
}
