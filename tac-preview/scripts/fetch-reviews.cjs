/**
 * fetch-reviews.cjs
 *
 * Build-time fetcher for the More Good Reviews API. Runs as the
 * first step of `npm run build`, pulls the latest published reviews
 * from the clinic's MGR project, filters them, and writes a
 * compact JSON file the React app reads at runtime.
 *
 * Why build-time:
 *   - API key stays out of the browser bundle (it's only used in
 *     this Node script, never shipped to the client)
 *   - Page renders instantly with prebaked JSON, no runtime fetch
 *   - Works with CSP / shared-hosting setups that don't allow
 *     long-running backends
 *
 * Refresh strategy:
 *   - Reviews auto-update on every site build / deploy
 *   - To keep reviews fresh without manual rebuilds, schedule a
 *     daily cron job that pulls the repo, runs `npm run build`,
 *     and uploads the resulting `dist/` (or just the JSON +
 *     rebuilt HTML files) to Hostinger
 *
 * Fallback:
 *   - If the API call fails OR no real reviews come back (only
 *     "[SAMPLE]" placeholders), the script writes an empty array.
 *   - AdLandingPage.tsx then falls back to its hardcoded REVIEWS
 *     constant so the section never renders empty.
 */

const fs = require('fs')
const path = require('path')

const API_KEY = 'YhLngfZLGzyhmM3Kae7HitAtySvedRHv5dwxsJn0V5YyOqcDMNDpTGCtbMhfYErU'
const ENDPOINT = 'https://api.moregoodreviews.com/beacon/reviews'

// Where the React app will read from. public/ ships verbatim into
// dist/, so the path becomes /reviews.json at the website root.
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'reviews.json')

/**
 * Convert a Unix timestamp (seconds) into a human-readable relative
 * date string like "2 months ago" / "3 weeks ago". Mirrors the
 * format Google Reviews uses so the card UI reads as authentic.
 */
function relativeDate(unixSec) {
  if (!unixSec) return ''
  const nowSec = Math.floor(Date.now() / 1000)
  const diff = Math.max(0, nowSec - unixSec)
  const day = 86400
  if (diff < day * 2) return diff < 3600 ? 'just now' : Math.floor(diff / 3600) + ' hours ago'
  if (diff < day * 14) return Math.floor(diff / day) + ' days ago'
  if (diff < day * 60) return Math.floor(diff / (day * 7)) + ' weeks ago'
  if (diff < day * 365) return Math.floor(diff / (day * 30)) + ' months ago'
  return Math.floor(diff / (day * 365)) + ' year' + (diff >= day * 730 ? 's' : '') + ' ago'
}

/**
 * Strip the "[SAMPLE]" prefix MGR uses for placeholder reviews so
 * if the clinic ever pushes a real review with the same wording
 * it doesn't get filtered out.
 */
function isSamplePlaceholder(text) {
  return /^\s*\[SAMPLE\]/i.test(text || '')
}

async function main() {
  console.log('[reviews] fetching from More Good Reviews…')

  let raw
  try {
    const res = await fetch(ENDPOINT, {
      headers: {
        Authorization: 'Bearer ' + API_KEY,
        Accept: 'application/json',
      },
    })
    if (!res.ok) throw new Error('HTTP ' + res.status)
    raw = await res.json()
  } catch (err) {
    console.warn('[reviews] FETCH FAILED — falling back to empty list. Reason:', err.message)
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify([], null, 2))
    return
  }

  const list = Array.isArray(raw?.data) ? raw.data : []
  console.log('[reviews] received ' + list.length + ' from API')

  // Filter pipeline:
  //   1. Drop "[SAMPLE]" placeholders
  //   2. Keep only 5-star reviews (score === 5)
  //   3. Drop empty / hidden / duplicate reviews
  //   4. Sort by recency (latest first)
  //   5. Cap at 3 — the LP grid renders three cards
  const filtered = list
    .filter((r) => !isSamplePlaceholder(r.review))
    .filter((r) => Number(r.score) === 5)
    .filter((r) => r.review && !r.is_hidden && !r.is_duplicate)
    .sort((a, b) => (b.created_at || 0) - (a.created_at || 0))
    .slice(0, 3)
    .map((r) => ({
      quote: (r.review || '').trim(),
      name: r.reviewer?.name || r.reviewer?.first_name || 'Verified patient',
      role: r.rating?.label || 'Verified review',
      date: relativeDate(r.created_at),
      score: Number(r.score) || 5,
    }))

  console.log('[reviews] after filter pipeline: ' + filtered.length + ' real 5-star reviews')

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(filtered, null, 2))
  console.log('[reviews] wrote ' + OUTPUT_PATH)

  if (filtered.length === 0) {
    console.warn('[reviews] no real reviews to display — AdLandingPage will use its hardcoded fallback')
  }
}

main().catch((err) => {
  console.warn('[reviews] unexpected failure:', err)
  // Still write an empty array so the build doesn't break the
  // React side's `import` from this path.
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify([], null, 2))
})
