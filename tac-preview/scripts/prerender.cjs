// prerender.cjs — post-build step (runs AFTER inject-meta.cjs).
//
// WHY: inject-meta ships a hand-written <noscript> *summary* per route. Real
// crawlers / "disable JavaScript" tests / View-Source only see that summary, so
// section copy that lives inside React components (e.g. the homepage benefit
// cards) is NOT findable in the HTML source. This closes that gap: it renders
// each route in a real headless Chrome (with a bot UA so all entrance
// animations are skipped and every element is at its natural, fully-visible
// state), captures the ACTUAL rendered DOM of #root, strips presentational
// noise (class/style/data-*/svg/script), and writes that complete semantic HTML
// into the route's <noscript> block — replacing the summary.
//
// RESULT: every word visible on the page is present in the static HTML source
// for bots + no-JS. The live JS app is untouched (a <noscript> is inert when JS
// is enabled, so JS users never see or pay for this payload).
//
// Safe to re-run; it only rewrites the content <noscript> of each dist route.

const { spawn } = require('child_process')
const http = require('http')
const fs = require('fs')
const path = require('path')

const DIST = path.join(__dirname, '..', 'dist')
const PORT = 4123
const BOT_UA =
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

// Chrome discovery (Windows-first, then common *nix paths).
const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  process.env.CHROME_PATH || '',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
]
const CHROME = CHROME_CANDIDATES.find((p) => p && fs.existsSync(p))

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// ---- tiny static server for dist (dir -> index.html) --------------------
const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp4': 'video/mp4',
  '.xml': 'application/xml', '.ico': 'image/x-icon', '.txt': 'text/plain',
}
function startServer() {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      let p = decodeURIComponent(req.url.split('?')[0])
      let fp = path.join(DIST, p)
      try {
        if (fs.existsSync(fp) && fs.statSync(fp).isDirectory())
          fp = path.join(fp, 'index.html')
        if (!fs.existsSync(fp)) fp = path.join(DIST, 'index.html') // SPA fallback
        const body = fs.readFileSync(fp)
        res.writeHead(200, { 'content-type': MIME[path.extname(fp)] || 'application/octet-stream' })
        res.end(body)
      } catch (e) {
        res.writeHead(404); res.end('nf')
      }
    })
    srv.listen(PORT, () => resolve(srv))
  })
}

// ---- enumerate all built routes (every dist/**/index.html) --------------
function listRoutes(dir = DIST, base = '') {
  const out = []
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const st = fs.statSync(full)
    if (st.isDirectory()) {
      if (name === 'assets') continue
      out.push(...listRoutes(full, base + '/' + name))
    } else if (name === 'index.html') {
      out.push({ route: base === '' ? '/' : base + '/', file: full })
    }
  }
  return out
}

// ---- sanitise captured HTML: keep semantics + text + links, drop noise --
function sanitize(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')            // decorative icons
    .replace(/<video[\s\S]*?<\/video>/gi, '')        // media, no text value
    .replace(/\sclass="[^"]*"/gi, '')
    .replace(/\sstyle="[^"]*"/gi, '')
    .replace(/\sdata-[\w-]+="[^"]*"/gi, '')
    .replace(/\saria-hidden="[^"]*"/gi, '')
    .replace(/\s(on\w+)="[^"]*"/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim()
}

// ---- CDP helpers --------------------------------------------------------
function getPageTarget(port) {
  return new Promise((res, rej) => {
    http.get(`http://127.0.0.1:${port}/json`, (r) => {
      let d = ''; r.on('data', (c) => (d += c))
      r.on('end', () => res(JSON.parse(d)))
    }).on('error', rej)
  })
}

async function main() {
  if (!CHROME) {
    console.error('prerender: Chrome not found — skipping (set CHROME_PATH).')
    process.exit(0) // don't fail the build
  }
  const srv = await startServer()
  const routes = listRoutes()
  const CDP_PORT = 9222
  const UD = path.join(require('os').tmpdir(), 'tlc-prerender-profile')
  const chrome = spawn(
    CHROME,
    ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-sandbox',
     `--remote-debugging-port=${CDP_PORT}`, `--user-data-dir=${UD}`,
     `--user-agent=${BOT_UA}`, '--window-size=1280,1200', 'about:blank'],
    { stdio: 'ignore' }
  )

  let page
  for (let i = 0; i < 50; i++) {
    try { const t = await getPageTarget(CDP_PORT); page = t.find((x) => x.type === 'page' && x.webSocketDebuggerUrl); if (page) break } catch (e) {}
    await sleep(300)
  }
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  let id = 0; const pend = {}
  let inflight = 0 // in-flight network requests (for network-idle detection)
  ws.addEventListener('message', (ev) => {
    const m = JSON.parse(ev.data)
    if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; return }
    if (m.method === 'Network.requestWillBeSent') inflight++
    else if (m.method === 'Network.loadingFinished' || m.method === 'Network.loadingFailed') inflight = Math.max(0, inflight - 1)
  })
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })) })
  await new Promise((r) => ws.addEventListener('open', r))
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable')

  let done = 0, skipped = 0
  const thin = []
  for (const { route, file } of routes) {
    const html = fs.readFileSync(file, 'utf8')
    // only rewrite routes whose index.html carries our content <noscript>
    const nsRe = /<noscript>\s*<style>#hero-boot,#root\{display:none!important\}<\/style>[\s\S]*?<\/noscript>/
    if (!nsRe.test(html)) { skipped++; continue }

    inflight = 0
    await send('Page.navigate', { url: `http://localhost:${PORT}${route}` })

    // Wait for the LAZY route component to actually render — not just the
    // header/footer shell (whose mega-menu alone exceeds a naive char count).
    // Strategy: network-idle (all JS chunks loaded) AND the #root text length
    // has stabilised (stopped growing) at a non-trivial size.
    let captured = ''
    let last = -1, idleStable = 0, contentStable = 0
    const start = Date.now()
    while (Date.now() - start < 18000) {
      await sleep(250)
      const r = await send('Runtime.evaluate', {
        expression: `(function(){var r=document.getElementById('root');if(!r)return '0';return String((r.textContent||'').replace(/\\s+/g,' ').trim().length);})()`,
        returnByValue: true,
      })
      const len = parseInt((r.result && r.result.result && r.result.result.value) || '0', 10)
      const sizeStable = len === last && len > 600
      last = len
      if (inflight <= 0 && sizeStable) idleStable++; else idleStable = 0
      if (sizeStable) contentStable++; else contentStable = 0
      // Fast path: network idle AND size steady ~750ms. Fallback (media pages
      // whose looping bg video keeps the network busy): size steady ~2s alone.
      if (idleStable >= 3 || contentStable >= 8) {
        const g = await send('Runtime.evaluate', { expression: `document.getElementById('root').innerHTML`, returnByValue: true })
        captured = (g.result && g.result.result && g.result.result.value) || ''
        break
      }
    }
    if (!captured) { skipped++; console.warn('  no content:', route); continue }

    const inner = sanitize(captured)
    const headings = (inner.match(/<h[1-6]/g) || []).length
    if (headings === 0) { thin.push(route) }
    const block =
      `<noscript>\n<style>#hero-boot,#root{display:none!important}</style>\n<main>\n` +
      inner + `\n</main>\n</noscript>`
    fs.writeFileSync(file, html.replace(nsRe, block))
    done++
  }
  console.log(`prerender: rewrote ${done} routes with full rendered content (${skipped} skipped)`)
  if (thin.length) console.warn(`prerender: WARNING ${thin.length} route(s) captured with 0 headings (possible shell-only): ${thin.slice(0, 10).join(', ')}`)
  chrome.kill(); srv.close(); process.exit(0)
}

main().catch((e) => { console.error('prerender error:', e); process.exit(1) })
