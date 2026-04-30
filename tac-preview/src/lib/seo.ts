// SEO meta hook — updates per-route <title>, description, OG/Twitter tags,
// canonical link, and per-page JSON-LD structured data.
//
// Site-wide MedicalBusiness JSON-LD lives in index.html. Page-specific JSON-LD
// (e.g. Person for founders on /about) is injected via this hook with cleanup.
import { useEffect } from 'react'

export const SITE_URL = 'https://theantiagingcentre.com'
const DEFAULT_OG_IMAGE = '/new-logo-white.webp'

export type PageMeta = {
  title: string
  description: string
  /** Path including leading slash, e.g. '/about'. Defaults to '/'. */
  path?: string
  /** Optional override for og:image. Defaults to logo. */
  ogImage?: string
  /** One or more JSON-LD objects to inject into <head>. */
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>
}

function setNamedMeta(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.content = content
}

function setPropMeta(prop: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${prop}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', prop)
    document.head.appendChild(el)
  }
  el.content = content
}

function setCanonical(url: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = url
}

export function useDocumentMeta(meta: PageMeta) {
  useEffect(() => {
    const path = meta.path ?? '/'
    const url = SITE_URL + path
    const ogImage = meta.ogImage
      ? meta.ogImage.startsWith('http')
        ? meta.ogImage
        : SITE_URL + meta.ogImage
      : SITE_URL + DEFAULT_OG_IMAGE

    document.title = meta.title
    setNamedMeta('description', meta.description)
    setPropMeta('og:title', meta.title)
    setPropMeta('og:description', meta.description)
    setPropMeta('og:url', url)
    setPropMeta('og:image', ogImage)
    setNamedMeta('twitter:title', meta.title)
    setNamedMeta('twitter:description', meta.description)
    setNamedMeta('twitter:image', ogImage)
    setCanonical(url)

    // Inject per-page JSON-LD blocks; remove on cleanup so route changes don't pile up.
    const injected: HTMLScriptElement[] = []
    if (meta.jsonLd) {
      const items = Array.isArray(meta.jsonLd) ? meta.jsonLd : [meta.jsonLd]
      items.forEach((item) => {
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.dataset.pageJsonld = '1'
        script.textContent = JSON.stringify(item)
        document.head.appendChild(script)
        injected.push(script)
      })
    }

    return () => {
      injected.forEach((s) => s.remove())
    }
  }, [meta])
}
