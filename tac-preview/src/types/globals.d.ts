/**
 * Ambient global type augmentations.
 *
 * Lenis is exposed on `window` so other modules (e.g. the Header's
 * smooth-scroll-to-anchor handler) can `lenis.scrollTo(target)` without
 * needing to thread a ref through props or context.
 */
import type Lenis from '@studio-freight/lenis'

declare global {
  interface Window {
    /** Set in App.tsx after Lenis initialises; may be undefined during SSR or before mount. */
    __lenis?: Lenis
  }
}

export {}
