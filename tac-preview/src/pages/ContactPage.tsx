// ContactPage — dedicated /contact form page.
// Two-column editorial layout: form on the left, direct-contact card on
// the right (phone, WhatsApp, email + the 4 operational clinics).
//
// Form submission goes to Web3Forms — a free email-relay service. Client
// signs up at https://web3forms.com (1 minute, no library), gets an
// access key, and pastes it into Vercel as VITE_WEB3FORMS_KEY.
// Form submissions land directly in the client's email inbox.
//
// Until the key is configured, the form runs in a "demo" mode and shows
// the success state without actually sending — useful for design review.
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../lib/motion'
import { useDocumentMeta } from '../lib/seo'
import { CENTRES } from '../lib/centres'
import { PROGRAMS } from '../lib/programs'

gsap.registerPlugin(ScrollTrigger)

// Read the key from Vite env. Empty string = demo mode (no real send).
const WEB3FORMS_KEY = (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) || ''

const META = {
  title: 'Begin a Consultation · TLC — The Longevity Centre',
  description:
    'Speak with the TLC medical team. Submit the form for a 30-minute personalised consultation across our eight clinics in Delhi, Gurgaon, Mumbai, Pune, Nagpur, Goa, Hyderabad and Bangalore.',
  path: '/contact',
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactPage() {
  useDocumentMeta(META)
  const root = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    setErrorMsg('')
    const form = e.currentTarget
    const data = new FormData(form)

    // Demo mode — no key configured yet. Show success without sending.
    if (!WEB3FORMS_KEY) {
      await new Promise((r) => setTimeout(r, 700))
      setState('success')
      return
    }

    // Real submission via Web3Forms.
    const payload: Record<string, unknown> = {
      access_key: WEB3FORMS_KEY,
      subject: `New consultation request — ${data.get('name')} (${data.get('city')})`,
      from_name: 'TLC Website Contact Form',
    }
    data.forEach((v, k) => {
      payload[k] = v
    })

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok && json.success !== false) {
        setState('success')
        form.reset()
      } else {
        setState('error')
        setErrorMsg(
          (json.message as string) ||
            'Something went wrong. Please call or WhatsApp us directly — we usually reply within an hour.'
        )
      }
    } catch {
      setState('error')
      setErrorMsg(
        'Network issue. Please try again, or reach us on WhatsApp / phone — links on the right.'
      )
    }
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
            Tell us a little about yourself and what you're hoping to address.
            A member of our medical team will reach out within 24 hours to
            schedule the call — at the centre nearest to you, or online.
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
                            {c.status === 'opening-soon' ? ' (opening 2026)' : ''}
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

                  {/* Preferred contact method — segmented radios */}
                  <div>
                    <label className="block text-[10.5px] tracking-[0.32em] uppercase text-stone font-semibold mb-3">
                      Preferred way to reach you
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { v: 'Phone', l: 'Phone' },
                        { v: 'WhatsApp', l: 'WhatsApp' },
                        { v: 'Email', l: 'Email' },
                      ].map((opt, i) => (
                        <label
                          key={opt.v}
                          className="relative cursor-pointer"
                          data-cursor="hover"
                        >
                          <input
                            type="radio"
                            name="preferred_contact"
                            value={opt.v}
                            defaultChecked={i === 0}
                            className="peer sr-only"
                          />
                          <div className="text-center text-[12px] tracking-[0.18em] uppercase font-semibold py-3 px-2 border border-ink/15 rounded-full text-graphite transition-colors duration-300 peer-checked:bg-ink peer-checked:text-white peer-checked:border-ink hover:border-rust">
                            {opt.l}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

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

                  {/* Error */}
                  {state === 'error' && errorMsg && (
                    <div className="bg-rust/5 border border-rust/30 rounded-xl px-4 py-3 text-[13px] leading-[1.6] text-rust-deep">
                      {errorMsg}
                    </div>
                  )}

                  {/* Submit */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={state === 'submitting'}
                      data-cursor="hover"
                      data-magnetic
                      className="group inline-flex items-center gap-3 pl-6 pr-8 py-4 bg-ink text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className="relative flex h-2 w-2" aria-hidden>
                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-soft opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-soft" />
                      </span>
                      {state === 'submitting' ? 'Sending…' : 'Submit Request'}
                      <span
                        aria-hidden
                        className="inline-block transition-transform duration-500 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </button>
                    <span className="text-[11px] tracking-[0.28em] uppercase text-stone font-semibold">
                      We reply within 24 hrs
                    </span>
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
        <div className="grid grid-cols-3 gap-px bg-ink/10 max-w-[860px] mx-auto rounded-2xl overflow-hidden border border-ink/10">
          {[
            { k: '8', l: 'Centres pan-India' },
            { k: '60+ yrs', l: 'In preventive medicine' },
            { k: '163', l: 'Biomarkers per patient' },
          ].map((s) => (
            <div key={s.l} className="bg-white px-5 py-6 text-center">
              <div className="font-display font-bold text-[22px] md:text-[30px] text-rust leading-none mb-2 tabular-nums tracking-[-0.01em]">
                {s.k}
              </div>
              <div className="text-[10px] tracking-[0.28em] uppercase text-graphite font-semibold">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>
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
        — Request received —
      </div>
      <h3 className="font-display font-light text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.02em] text-ink mb-4">
        Thank you. <span className="font-bold text-rust">We'll be in touch.</span>
      </h3>
      <p className="text-[14.5px] leading-[1.7] text-graphite font-light max-w-[460px] mx-auto mb-8">
        A member of our medical team will reach out within 24 hours to
        schedule your consultation. If it's urgent, please WhatsApp or call
        us directly — we usually reply within an hour.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0"
          data-cursor="hover"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-ink text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
        >
          WhatsApp Now
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
