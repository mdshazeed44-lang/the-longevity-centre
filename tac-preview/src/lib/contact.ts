/**
 * contact.ts — single source of truth for the clinic's contact endpoints.
 *
 * Every "Call us / WhatsApp / Email" surface across the site reads from
 * here. If the business swaps a number, change it ONCE in this file —
 * not in 25 places.
 */

/** Display number with spaces (Indian convention). Use for visible UI. */
export const PHONE_DISPLAY = '+91 88268 09123'

/** Tel-link format (no spaces, leading +). Use in `href={`tel:${PHONE_TEL}`}`. */
export const PHONE_TEL = '+918826809123'

/** Primary clinic email. */
export const EMAIL = 'info@thelongevitycentre.com'

/** WhatsApp deep link to the clinic line — opens Web/native WhatsApp pre-loaded. */
export const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=918826809123&text&type=phone_number&app_absent=0'

/**
 * Build a WhatsApp link with a pre-filled message body.
 *
 * @param message - Plain text. Will be URL-encoded.
 * @example
 *   waLink('Hello, I have a question about the Longevity Plus programme')
 */
export function waLink(message: string): string {
  return `https://api.whatsapp.com/send/?phone=918826809123&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`
}

/**
 * E-brochure URL. Every lead form on the site (ConsultationModal,
 * CtaBand, ContactPage) opens this in a new tab on successful submit
 * so the user gets the TLC brochure as a thank-you for sharing
 * their contact details. Hosted as a static Netlify site.
 */
export const BROCHURE_URL =
  'https://tlc-e-brochure-the-longevity-centre.netlify.app/'

/**
 * Helper called from every lead-form success handler. Opens the
 * brochure in a new tab. Wrapped so we have one consistent
 * `noopener,noreferrer` policy everywhere, and one place to
 * disable / swap the brochure if we ever migrate it off Netlify.
 */
export function openBrochure(): void {
  if (typeof window === 'undefined') return
  window.open(BROCHURE_URL, '_blank', 'noopener,noreferrer')
}
