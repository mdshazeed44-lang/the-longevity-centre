/**
 * leadsquared.ts — LeadSquared (LSQ) lead-capture integration.
 *
 * Every website lead form (ConsultationModal, CtaBand, ContactPage)
 * pushes a new lead into LSQ alongside the existing WhatsApp + e-brochure
 * delivery. Leads land directly in the client's LSQ CRM where the sales
 * team manages outreach.
 *
 * Architecture: client-side fetch to LSQ's Lead Capture API. The API
 * endpoint supports CORS and the access keys are scoped to
 * lead-creation only (no read / delete / account access), so it is
 * safe to ship the keys in the frontend JS bundle. This is the
 * pattern LSQ recommends for static / SPA sites without a backend.
 *
 * Reliability: callers should treat submitToLeadSquared as
 * fire-and-forget — never `await` it on the critical UX path. If LSQ
 * is down or the network drops, the user still gets the WhatsApp
 * window and the brochure tab; the LSQ failure is logged to the
 * console for monitoring but never surfaces to the user.
 */

/** LSQ region — derived from the account's API host (in21 = India region 21). */
const LSQ_ENDPOINT =
  'https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Capture'

/** Lead Capture credentials. Scoped to lead-creation only. */
const LSQ_ACCESS_KEY = 'u$rdbdc6077a98a9414161018f873be2263'
const LSQ_SECRET_KEY = '3d9ef519d3c11bb71ceb2abd5828fc70337d72a3'

/** Payload type — every field optional except name + phone (matches form validation). */
export interface LeadSquaredPayload {
  /** Visitor full name. Stored as FirstName in LSQ; LastName left empty. */
  name: string
  /** Phone with country code, e.g. "+919876543210". LSQ rejects locally-formatted numbers. */
  phone: string
  /** Optional — visitor email. LSQ stores in EmailAddress. */
  email?: string
  /** Optional — preferred clinic city. Bundled into Notes today; can move
   *  to mx_PreferredCentre once that custom field is created in LSQ. */
  centre?: string
  /** Optional — programme of interest. Same treatment as centre. */
  programme?: string
  /** Optional — free-text "anything specific" from the form. */
  message?: string
  /** Required — origin form label, e.g. "Website - Header Consultation Popup".
   *  Stored in LSQ's Source attribute so the team can filter / report by form. */
  source: string
}

/**
 * Submit a lead to LeadSquared.
 *
 * Fire-and-forget by design — never await on the critical UX path.
 * Resolves with `true` on success, `false` on any failure (network,
 * CORS, validation, LSQ rejection). Errors are logged to console
 * for the dev team to monitor without surfacing to the user.
 *
 * The centre + programme + message fields are bundled into LSQ's
 * Notes attribute today so the integration works on day one without
 * waiting for custom-field creation on the LSQ side. When the client
 * creates mx_PreferredCentre and mx_Programme custom fields, swap
 * the two lines marked TODO below.
 */
export async function submitToLeadSquared(
  payload: LeadSquaredPayload
): Promise<boolean> {
  // Build the LSQ attribute array. Each attribute is { Attribute, Value }.
  const attrs: Array<{ Attribute: string; Value: string }> = [
    { Attribute: 'FirstName', Value: payload.name },
    { Attribute: 'Phone', Value: payload.phone },
    { Attribute: 'Source', Value: payload.source },
    { Attribute: 'SourceMedium', Value: 'Website' },
    { Attribute: 'SourceCampaign', Value: 'thelongevitycentre.co' },
  ]

  if (payload.email) {
    attrs.push({ Attribute: 'EmailAddress', Value: payload.email })
  }

  // Bundle centre / programme / message into Notes — keeps payload valid
  // even if custom LSQ fields haven't been created yet.
  // TODO: when mx_PreferredCentre + mx_Programme custom fields are live
  // in LSQ, replace this block with two dedicated attributes.
  const notesParts: string[] = []
  if (payload.centre) notesParts.push(`Preferred Centre: ${payload.centre}`)
  if (payload.programme) notesParts.push(`Programme of Interest: ${payload.programme}`)
  if (payload.message) notesParts.push(`Message: ${payload.message}`)
  if (notesParts.length > 0) {
    attrs.push({ Attribute: 'Notes', Value: notesParts.join('\n') })
  }

  const url = `${LSQ_ENDPOINT}?accessKey=${encodeURIComponent(
    LSQ_ACCESS_KEY
  )}&secretKey=${encodeURIComponent(LSQ_SECRET_KEY)}`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attrs),
    })

    if (!res.ok) {
      console.warn(
        `[LSQ] HTTP ${res.status} from Lead Capture API, lead NOT pushed to CRM. WhatsApp + brochure still delivered.`
      )
      return false
    }

    const data = (await res.json().catch(() => null)) as
      | { Status?: string; Message?: unknown }
      | null

    if (data?.Status !== 'Success') {
      console.warn('[LSQ] non-success response:', data)
      return false
    }

    return true
  } catch (err) {
    // CORS / network / parsing errors land here. Logged but swallowed —
    // the rest of the submit flow (WhatsApp, brochure) must continue.
    console.warn('[LSQ] submit failed:', err)
    return false
  }
}
