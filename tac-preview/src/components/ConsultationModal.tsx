/**
 * ConsultationModal — popup form opened from the header's
 * "Arrange a Consultation" CTA.
 *
 * Same minimal fields as the contact page (name, phone, email,
 * preferred centre, programme of interest, free-text message). On
 * submit the lead is pushed to LeadSquared CRM (only destination —
 * no WhatsApp lead delivery as of 2026-06-06 per client) and an
 * in-modal thank-you confirmation is shown. (The e-brochure auto-open
 * was removed on 2026-07-21 per client — no brochure opens on submit.)
 * Mounts conditionally — does nothing at all when `open` is false
 * (no offscreen DOM, no listeners attached).
 *
 * Accessibility:
 *   - role="dialog" + aria-modal="true" + aria-labelledby
 *   - Backdrop click → close
 *   - ESC key → close
 *   - Body scroll lock while open
 *   - Initial focus on the first field (Name) so keyboard users
 *     land inside the form immediately
 */
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { CENTRES } from '../lib/centres'
import { PROGRAMS } from '../lib/programs'
import { BROCHURE_URL } from '../lib/contact'
import { submitToLeadSquared } from '../lib/leadsquared'

interface Props {
  open: boolean
  onClose: () => void
}

export function ConsultationModal({ open, onClose }: Props) {
  const [state, setState] = useState<'idle' | 'submitting' | 'success'>('idle')
  const firstFieldRef = useRef<HTMLInputElement | null>(null)
  const operationalCentres = CENTRES.filter((c) => c.status === 'open')

  // Body scroll lock + Lenis pause + ESC handler — only active while open.
  // The site uses Lenis smooth-scroll which hijacks wheel events at the
  // page level, so plain `overflow: hidden` on body is not enough — we
  // must also call lenis.stop() so the wheel events bubble up to the
  // modal's own overflow-y-auto container instead of being consumed by
  // Lenis to scroll the page underneath.
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Pause Lenis so wheel/touch events on the modal scroll the modal,
    // not the page beneath the backdrop.
    window.__lenis?.stop()

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)

    // Focus the first field after the modal mounts.
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 60)

    return () => {
      document.body.style.overflow = previousOverflow
      window.__lenis?.start()
      document.removeEventListener('keydown', handleKey)
      window.clearTimeout(t)
    }
  }, [open, onClose])

  // Reset the form state when the modal is closed so reopening it
  // shows a fresh form (rather than the post-submit success view).
  useEffect(() => {
    if (!open) setState('idle')
  }, [open])

  if (!open) return null

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = new FormData(e.currentTarget)

    // Honeypot — bots fill `botcheck`; drop the submission silently
    // (show success so the bot believes it worked, but never call LSQ).
    if (data.get('botcheck')) {
      setState('success')
      return
    }

    const name = ((data.get('name') as string) || '').trim()
    const email = ((data.get('email') as string) || '').trim()
    const phone = ((data.get('phone') as string) || '').trim()
    const centre = (data.get('centre') as string) || 'Not selected'
    const programme = (data.get('programme') as string) || 'Not specified'
    const message = ((data.get('message') as string) || '').trim()

    // Hard validation — LSQ submit MUST be gated on real Name + Phone.
    // Belt-and-suspenders on top of the browser-native required check.
    if (!name || !phone) {
      setState('idle')
      return
    }

    setState('submitting')

    // Leads now flow ONLY to LeadSquared CRM (no WhatsApp lead delivery).
    // Per client instruction (2026-06-06): "WhatsApp pe lead nahi jaye,
    // LSQ mein jaye". WhatsApp message construction removed.
    submitToLeadSquared({
      name,
      phone,
      email,
      centre,
      programme,
      message,
      source: 'Website - Header Consultation Popup',
    })

    // Show the in-modal thank-you confirmation. No e-brochure opens
    // (removed 2026-07-21 per client).
    setState('success')
  }

  const inputCls =
    'w-full bg-white border border-ink/15 rounded-[10px] px-4 py-3 text-[14px] text-ink placeholder:text-ink/35 font-light focus:outline-none focus:border-rust focus:ring-2 focus:ring-rust/20 transition-colors'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consult-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
    >
      {/* Backdrop — dim layer behind the modal. Click closes. */}
      <button
        type="button"
        aria-label="Close consultation form"
        onClick={onClose}
        className="absolute inset-0 bg-ink/65 backdrop-blur-sm animate-[fadeIn_0.25s_ease-out]"
      />

      {/* Card — sits centred above the backdrop. Max-h with internal
          scroll so it never overflows the viewport. `data-lenis-prevent`
          tells the site-wide Lenis smooth-scroll to ignore wheel/touch
          events here so the modal scrolls instead of the page. */}
      <div
        data-lenis-prevent
        className="relative z-10 w-full max-w-[560px] max-h-[92svh] overflow-y-auto overscroll-contain bg-cream rounded-[20px] shadow-[0_45px_90px_-30px_rgba(0,0,0,0.45)] animate-[scaleIn_0.28s_ease-out]"
      >
        {/* Close button — top-right */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-ink/70 hover:text-white hover:bg-ink transition-colors duration-300"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="px-5 md:px-7 pt-6 md:pt-7 pb-5 md:pb-6">
          {state === 'success' ? (
            // ─── SUCCESS STATE ─────────────────────────────────────
            <div className="text-center py-6">
              <div className="inline-flex w-14 h-14 rounded-full bg-rust/10 items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-3">
                — Thank you —
              </div>
              <h2
                id="consult-title"
                className="font-display font-light text-[24px] md:text-[28px] leading-[1.15] text-ink mb-3"
              >
                Your appointment request has been received.
              </h2>
              <p className="text-[14px] leading-[1.65] text-graphite font-light max-w-[400px] mx-auto">
                Thank you for reaching out to The Longevity Centre. Our medical
                team will be in touch shortly to schedule your consultation.
              </p>
              <a
                href={BROCHURE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-rust hover:text-ink text-[12px] tracking-[0.18em] font-semibold uppercase transition-colors"
              >
                Open Brochure
                <span aria-hidden>→</span>
              </a>
              <div>
              <button
                type="button"
                onClick={onClose}
                className="mt-7 inline-flex items-center gap-2 pl-5 pr-6 py-3 bg-ink text-white text-[11px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
              >
                Done
              </button>
              </div>
            </div>
          ) : (
            // ─── FORM STATE ────────────────────────────────────────
            <>
              <div className="mb-4">
                <div className="inline-flex items-center gap-2.5 mb-3">
                  <span className="w-7 h-px bg-rust" />
                  <span className="text-[9.5px] md:text-[10px] tracking-[0.4em] uppercase text-rust font-semibold">
                    Arrange a Consultation
                  </span>
                </div>
                <h2
                  id="consult-title"
                  className="font-display font-light text-[20px] md:text-[24px] leading-[1.15] tracking-[-0.02em] text-ink"
                >
                  A 30-minute conversation.{' '}
                  <span className="font-bold italic text-rust">No commitment.</span>
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Honeypot — invisible to humans, bots fill it. */}
                <input
                  type="text"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] opacity-0 pointer-events-none"
                />

                {/* Name + Phone — required */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="cm-name"
                      className="block text-[10px] tracking-[0.3em] uppercase text-stone font-semibold mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      ref={firstFieldRef}
                      id="cm-name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Aanya Sharma"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cm-phone"
                      className="block text-[10px] tracking-[0.3em] uppercase text-stone font-semibold mb-1.5"
                    >
                      Phone *
                    </label>
                    <input
                      id="cm-phone"
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98xxxxxxxx"
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="cm-email"
                    className="block text-[10px] tracking-[0.3em] uppercase text-stone font-semibold mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="cm-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </div>

                {/* Centre + Programme — both optional */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="cm-centre"
                      className="block text-[10px] tracking-[0.3em] uppercase text-stone font-semibold mb-1.5"
                    >
                      Preferred Centre
                    </label>
                    <select
                      id="cm-centre"
                      name="centre"
                      defaultValue=""
                      className={`${inputCls} appearance-none bg-no-repeat bg-[right_14px_center] pr-9`}
                      style={{
                        backgroundImage:
                          'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\' fill=\'none\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%23945455\' stroke-width=\'1.6\' stroke-linecap=\'round\'/%3E%3C/svg%3E")',
                      }}
                    >
                      <option value="" disabled>
                        Select a city
                      </option>
                      {operationalCentres.map((c) => (
                        <option key={c.slug} value={c.city}>
                          {c.city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="cm-programme"
                      className="block text-[10px] tracking-[0.3em] uppercase text-stone font-semibold mb-1.5"
                    >
                      Programme
                    </label>
                    <select
                      id="cm-programme"
                      name="programme"
                      defaultValue=""
                      className={`${inputCls} appearance-none bg-no-repeat bg-[right_14px_center] pr-9`}
                      style={{
                        backgroundImage:
                          'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\' fill=\'none\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%23945455\' stroke-width=\'1.6\' stroke-linecap=\'round\'/%3E%3C/svg%3E")',
                      }}
                    >
                      <option value="">Select (optional)</option>
                      {PROGRAMS.map((p) => (
                        <option key={p.slug} value={p.shortTitle}>
                          {p.shortTitle}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Consent */}
                <p className="text-[11px] leading-[1.55] text-stone font-light pt-1">
                  By submitting, you agree to our{' '}
                  <a href="/privacy" className="text-rust hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={state === 'submitting'}
                  className="group w-full inline-flex items-center justify-center gap-3 pl-5 pr-6 py-3.5 bg-ink text-white text-[11px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state === 'submitting' ? 'Submitting…' : 'Book Appointment'}
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-500 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Inline keyframes — fade & scale entrance for the modal */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
      `}</style>
    </div>
  )
}
