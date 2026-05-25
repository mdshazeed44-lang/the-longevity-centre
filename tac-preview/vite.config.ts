import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Build optimisations:
//  - Manual chunking so vendor libs (react / gsap / lenis) are cached
//    separately from app code, and per-page chunks load on demand.
//  - Higher chunk-warn limit since gsap is intentionally one big chunk.
//  - Production minify + console drops.
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 700,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler')) return 'react'
            if (id.includes('gsap')) return 'gsap'
            if (id.includes('lenis')) return 'lenis'
            return 'vendor'
          }
          // Pages that ship a lot of inline data — keep them lazy
          if (id.includes('/pages/DiagnosticDetailPage')) return 'page-diagnostics-detail'
          if (id.includes('/pages/DiagnosticsPage')) return 'page-diagnostics'
          if (id.includes('/pages/ProgramDetailPage')) return 'page-program-detail'
          if (id.includes('/pages/ProgramsIndexPage')) return 'page-programs'
        },
      },
    },
  },
  server: {
    headers: {
      // No-cache in dev — prevents browser from holding onto a broken
      // module/HTML after a fix has shipped (a stale cache here made
      // an "Invalid hook call" error survive long after the underlying
      // cause was removed). Production has its own caching via build
      // asset hashing, so disabling this header has no effect there.
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  },
})
