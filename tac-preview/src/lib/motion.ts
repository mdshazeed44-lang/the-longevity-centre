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
