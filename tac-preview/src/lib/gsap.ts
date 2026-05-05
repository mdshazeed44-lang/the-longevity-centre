/**
 * Central GSAP plugin registration.
 *
 * `gsap.registerPlugin(ScrollTrigger)` was previously called in 14 different
 * files. Importing this module once anywhere in the bundle ensures the plugin
 * is registered exactly once — register-side-effect happens at module load.
 *
 * Convention: `App.tsx` imports this at the top so it runs before any page
 * mounts. Page/component files just import `{ ScrollTrigger }` from
 * `'gsap/ScrollTrigger'` for the type if they need it.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
