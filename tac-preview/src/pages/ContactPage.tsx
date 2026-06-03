// ContactPage — dedicated /contact form page.
// Two-column editorial layout: form on the left, direct-contact card on
// the right (phone, WhatsApp, email + the 4 operational clinics).
//
// Lead handling: form submissions open WhatsApp directly with the
// patient's details pre-filled as a message to the clinic line. No
// email backend, no API key, no monthly cost — leads land in the
// clinic's WhatsApp inbox and the medical team replies from there.
//
// To switch to email later, replace the handleSubmit body with a
// Web3Forms / Formspree POST.
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'
import { useDocumentMeta, breadcrumbList } from '../lib/seo'
import { CENTRES } from '../lib/centres'
import { PROGRAMS } from '../lib/programs'
import { BrandAmbassador } from '../components/sections/BrandAmbassador'

gsap.registerPlugin(ScrollTrigger)

// Clinic WhatsApp number (digits only — Indian country code prefixed).
const WHATSAPP_NUMBER = '918826809123'

const META = {
  title: 'Begin a Consultation · TLC',
  description:
    'Speak with the TLC medical team via WhatsApp. A 30-minute personalised consultation across our eight clinics in India — no commitment, just clarity.',
  path: '/contact',
  ogImage: '/og/contact.jpg',
  jsonLd: [
    breadcrumbList([
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact' },
    ]),
  ],
}

type FormState = 'idle' | 'submitting' | 'success'

export function ContactPage() {
  useDocumentMeta(META)
  const root = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<FormState>('idle')

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
        scrollTrigger: { trigger: mask, start: 'top 92%' },
      })
    })
    const fade = el.querySelectorAll<HTMLElement>('.fade-up')
    gsap.set(fade, { opacity: 0, y: 18 })
    gsap.to(fade, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: { trigger: el, start: 'top 80%' },
    })
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot — bots fill this, drop the submission silently.
    if (data.get('botcheck')) {
      setState('success')
      return
    }

    // Build a clean WhatsApp message from the form values. The clinic
    // team gets every field as a single readable message in their
    // WhatsApp business inbox.
    const name = (data.get('name') as string) || ''
    const email = (data.get('email') as string) || ''
    const phone = (data.get('phone') as string) || ''
    const centre = (data.get('centre') as string) || 'Not selected'
    const programme = (data.get('programme') as string) || 'Not specified'
    const message = ((data.get('message') as string) || '').trim()

    const lines = [
      'Hello TLC team — new consultation request from the website.',
      '',
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      `*Email:* ${email}`,
      `*Preferred centre:* ${centre}`,
      `*Programme of interest:* ${programme}`,
    ]
    if (message) {
      lines.push('', '*Message:*', message)
    }

    const text = encodeURIComponent(lines.join('\n'))
    const url = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${text}&type=phone_number&app_absent=0`

    // Open WhatsApp in a new tab so the user can come back to /contact
    // (success state) without losing context.
    window.open(url, '_blank', 'noopener,noreferrer')
    setState('success')
    form.reset()
  }

  const operationalCentres = CENTRES.filter((c) => c.status === 'open')

  return (
    <div ref={root}>
      {/* HERO */}
      <section className="relative pt-32 md:pt-40 pb-10 md:pb-14 px-6 md:px-12 bg-white overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 500px at 18% 20%, rgba(148,84,85,0.05), transparent 60%), radial-gradient(700px 400px at 85% 80%, rgba(238,230,219,0.5), transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-[1180px] mx-auto">
          <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-5">
            — Begin a Consultation —
          </div>
          <h1 className="font-display font-light text-[36px] md:text-[60px] xl:text-[72px] leading-[1.02] tracking-[-0.03em] text-ink mb-6 max-w-[900px]">
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block">A 30-minute conversation.</span>
            </span>
            <br />
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="inline-block font-bold text-rust">No commitment.</span>
            </span>
          </h1>
          <p className="text-[14.5px] md:text-[16px] leading-[1.65] text-graphite font-light max-w-[640px]">
            Share a few details and our medical team will be in touch to
            schedule your consultation — at the centre nearest you or online.
          </p>
        </div>
      </section>

      {/* MAIN — form (left) + contact card (right) */}
      <section className="px-6 md:px-12 pb-16 md:pb-24 bg-white">
        <div className="max-w-[1180px] mx-auto grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-14 items-start">
          {/* LEFT — form */}
          <div className="fade-up">
            <div className="relative bg-cream/40 border border-ink/8 rounded-[24px] p-6 md:p-10">
              {state === 'success' ? (
                <SuccessPanel />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Honeypot — bots fill this, humans don't see it */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ display: 'none' }}
                  />

                  {/* Name + Email — two columns on md+ */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label="Full name" name="name" required>
                      <input
                        type="text"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="e.g. Aanya Sharma"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Email" name="email" required>
                      <input
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  {/* Phone + Preferred centre */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label="Phone" name="phone" required>
                      <input
                        type="tel"
                        name="phone"
                        required
                        autoComplete="tel"
                        placeholder="+91 98xxxxxxxx"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Preferred centre" name="centre">
                      <select name="centre" className={inputCls} defaultValue="">
                        <option value="" disabled>
                          Select a city
                        </option>
                        {CENTRES.map((c) => (
                          <option key={c.slug} value={c.city}>
                            {c.city}
                          </option>
                        ))}
                        <option value="Online consultation">
                          Online consultation
                        </option>
                      </select>
                    </Field>
                  </div>

                  {/* Programme dropdown */}
                  <Field label="Programme of interest" name="programme">
                    <select name="programme" className={inputCls} defaultValue="">
                      <option value="" disabled>
                        Select a programme (optional)
                      </option>
                      <option value="Not sure yet">
                        Not sure yet — help me decide
                      </option>
                      {PROGRAMS.map((p) => (
                        <option key={p.slug} value={p.shortTitle}>
                          {p.shortTitle}
                        </option>
                      ))}
                    </select>
                  </Field>

                  {/* Message */}
                  <Field label="Anything specific?" name="message">
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Symptoms, goals, questions — whatever you'd like our doctors to know in advance."
                      className={`${inputCls} resize-none`}
                    />
                  </Field>

                  {/* Consent */}
                  <p className="text-[12px] leading-[1.65] text-stone font-light">
                    By submitting, you agree to our{' '}
                    <a
                      href="/privacy"
                      data-cursor="hover"
                      className="text-rust hover:underline"
                    >
                      Privacy Policy
                    </a>
                    . We'll only use your details to schedule and follow up on
                    this consultation.
                  </p>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={state === 'submitting'}
                      data-cursor="hover"
                      data-magnetic
                      className="group inline-flex items-center gap-3 pl-6 pr-8 py-4 bg-ink text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {state === 'submitting' ? 'Opening WhatsApp…' : 'Send via WhatsApp'}
                      <span
                        aria-hidden
                        className="inline-block transition-transform duration-500 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT — direct contact card */}
          <aside className="fade-up space-y-6">
            <div className="bg-ink text-white rounded-[24px] p-6 md:p-8 relative overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay hero-grain"
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(500px 350px at 80% 0%, rgba(148,84,85,0.30), transparent 60%)',
                }}
              />
              <div className="relative z-10">
                <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust-soft font-semibold mb-5">
                  — Reach us directly —
                </div>
                <h3 className="font-display font-light text-[26px] md:text-[30px] leading-[1.1] tracking-[-0.02em] text-white mb-7">
                  Prefer not to fill a form?{' '}
                  <span className="font-bold text-rust-soft">
                    Write or call.
                  </span>
                </h3>

                <div className="space-y-4">
                  <DirectLink
                    label="Phone"
                    value="+91 88268 09123"
                    href="tel:+918826809123"
                  />
                  <DirectLink
                    label="WhatsApp"
                    value="Chat on WhatsApp"
                    href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0"
                    external
                  />
                  <DirectLink
                    label="Email"
                    value="info@thelongevitycentre.com"
                    href="mailto:info@thelongevitycentre.com"
                  />
                </div>
              </div>
            </div>

            {/* Visit a centre */}
            <div className="border border-ink/10 rounded-[24px] p-6 md:p-8 bg-white">
              <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-5">
                — Or visit a centre —
              </div>
              <div className="space-y-3">
                {operationalCentres.map((c) => (
                  <a
                    key={c.slug}
                    href={`/centres/${c.slug}`}
                    data-cursor="hover"
                    className="group flex items-center justify-between py-3 border-b border-ink/8 last:border-0 hover:px-1 transition-all duration-300"
                  >
                    <div>
                      <div className="font-display font-bold text-[16px] tracking-[-0.015em] text-ink group-hover:text-rust transition-colors">
                        {c.city}
                      </div>
                      <div className="text-[10.5px] tracking-[0.22em] uppercase text-stone font-medium mt-0.5">
                        {c.area}
                      </div>
                    </div>
                    <span
                      aria-hidden
                      className="text-rust text-[16px] transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                ))}
              </div>
              <a
                href="/centres"
                data-cursor="hover"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.32em] uppercase text-rust font-semibold mt-5 hover:text-ink transition-colors"
              >
                See all 8 centres →
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* TRUST BAND — same numbers as CtaBand for consistency */}
      <section className="px-6 md:px-12 pb-20 md:pb-28 bg-white">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-px bg-ink/10 max-w-[1080px] mx-auto rounded-2xl overflow-hidden border border-ink/10">
          {[
            { k: '8', l: 'Centres pan-India' },
            { k: '20+ years', l: 'In preventive medicine' },
            { k: '1000+', l: 'Biomarkers per patient' },
            { k: '3', l: 'Biological ages — Epigenetic · Blood · Gut' },
          ].map((s) => (
            <div key={s.l} className="bg-white px-5 py-6 text-center">
              <div className="font-display font-bold text-[22px] md:text-[30px] text-rust leading-none mb-2 tabular-nums tracking-[-0.01em]">
                {s.k}
              </div>
              <div className="text-[10px] tracking-[0.28em] uppercase text-graphite font-semibold leading-[1.4]">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      <BrandAmbassador />
    </div>
  )
}

// ---------- Helpers ----------

const inputCls =
  'w-full bg-white border border-ink/15 rounded-xl px-4 py-3.5 text-[14.5px] text-ink placeholder:text-stone/70 font-light focus:outline-none focus:border-rust focus:ring-2 focus:ring-rust/20 transition-colors'

function Field({
  label,
  name,
  required = false,
  children,
}: {
  label: string
  name: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label htmlFor={name} className="block">
      <div className="text-[10.5px] tracking-[0.32em] uppercase text-stone font-semibold mb-2">
        {label}
        {required && <span className="text-rust ml-1">*</span>}
      </div>
      {children}
    </label>
  )
}

function DirectLink({
  label,
  value,
  href,
  external = false,
}: {
  label: string
  value: string
  href: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      data-cursor="hover"
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group flex items-center justify-between py-3 border-b border-white/10 last:border-0 hover:px-1 transition-all duration-300"
    >
      <div>
        <div className="text-[10px] tracking-[0.32em] uppercase text-white/50 font-semibold">
          {label}
        </div>
        <div className="text-[15px] text-white tracking-tight mt-0.5 group-hover:text-rust-soft transition-colors">
          {value}
        </div>
      </div>
      <span
        aria-hidden
        className="text-rust-soft text-[16px] transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  )
}

function SuccessPanel() {
  return (
    <div className="text-center py-6 md:py-10">
      <div
        aria-hidden
        className="mx-auto w-14 h-14 rounded-full bg-rust/10 border border-rust/30 flex items-center justify-center mb-6"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-rust"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-3">
        — WhatsApp opening —
      </div>
      <h3 className="font-display font-light text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.02em] text-ink mb-4">
        One last step. <span className="font-bold text-rust">Send the message.</span>
      </h3>
      <p className="text-[14.5px] leading-[1.7] text-graphite font-light max-w-[460px] mx-auto mb-8">
        We've opened WhatsApp in a new tab with your details pre-filled.
        Just hit <em>send</em> and our medical team will reply — usually
        within an hour. If WhatsApp didn't open, tap the button below.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0"
          data-cursor="hover"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-ink text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
        >
          Open WhatsApp
        </a>
        <a
          href="/"
          data-cursor="hover"
          className="inline-flex items-center gap-2 px-6 py-3.5 border border-ink/15 text-ink text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:border-rust hover:text-rust transition-colors duration-500"
        >
          Back to home
        </a>
      </div>
    </div>
  )
}
