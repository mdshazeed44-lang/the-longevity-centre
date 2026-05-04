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
      // Long cache for static assets in dev too — keeps reloads quick
      'Cache-Control': 'public, max-age=3600',
    },
  },
})
