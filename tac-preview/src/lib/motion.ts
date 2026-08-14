/**
 * Motion utilities — single source of truth for animation hygiene.
 *
 * All scroll-triggered animations across the site call `reduceMotion()`
 * at the top of their effect to bail out for users who have set the
 * "Reduce motion" OS preference. Keeps animations accessible without
 * each component re-implementing the matchMedia check.
 */
export const reduceMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Is the current visitor almost certainly an automated renderer — a search
 * or AI crawler running headless Chrome (Googlebot WRS, Bing, Screaming Frog),
 * or a bot fetching with a crawler user-agent?
 *
 * Our entrance animations hide content first (gsap.set opacity:0 / yPercent)
 * and reveal it over ~1s. A crawler that snapshots the page before that reveal
 * fires captures a BLANK body under the header (the "rendered page looks empty"
 * finding in the crawlability audit). Real users never hit that because rAF
 * drives the reveal smoothly; headless renderers throttle rAF, so the reveal
 * can stall past their capture window.
 *
 * When this returns true we skip the hide/animate entirely and let the content
 * render in its natural, fully-visible state — so crawlers and render snapshots
 * always see a populated hero. Zero effect on real users (no bot signals).
 */
export const isLikelyBot = (): boolean => {
  if (typeof navigator === 'undefined') return false
  const nav = navigator as Navigator & { webdriver?: boolean }
  if (nav.webdriver === true) return true
  const ua = nav.userAgent || ''
  return /bot|crawl|spider|slurp|headless|lighthouse|screaming\s*frog|gptbot|oai-searchbot|chatgpt-user|claudebot|anthropic|perplexity|bingpreview|google-inspectiontool|googleother|applebot|bytespider|amazonbot/i.test(
    ua
  )
}

/**
 * Skip entrance animations that hide-then-reveal content. True for users with
 * the reduce-motion OS preference AND for automated crawlers/renderers, so the
 * content is painted immediately in both cases. Prefer this over `reduceMotion`
 * in any effect whose FIRST action is to hide an element.
 */
export const instantMotion = (): boolean => reduceMotion() || isLikelyBot()
