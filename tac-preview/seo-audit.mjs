import fs from 'fs';
import path from 'path';

const DIST = path.resolve('dist');
const ORIGIN = 'https://thelongevitycentre.co';

// collect all index.html files
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}

const files = walk(DIST).sort();

function routeOf(file) {
  const rel = path.relative(DIST, path.dirname(file)).split(path.sep).join('/');
  return rel === '' ? '/' : '/' + rel + '/';
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

const results = [];
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const route = routeOf(file);
  const r = { route, file: path.relative(DIST, file).split(path.sep).join('/'), issues: [] };

  // 1. title
  const titleM = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  r.title = titleM ? decodeEntities(titleM[1].trim()) : null;
  r.titleLen = r.title ? r.title.length : 0;

  // 2. meta description
  let descM = html.match(/<meta\s+[^>]*name=["']description["'][^>]*>/i);
  if (descM) {
    const c = descM[0].match(/content=(?:"([^"]*)"|'([^']*)')/i);
    r.desc = c ? decodeEntities((c[1] ?? c[2]).trim()) : '';
  } else r.desc = null;
  r.descLen = r.desc ? r.desc.length : 0;

  // 3. canonical
  const canonTags = [...html.matchAll(/<link\s+[^>]*rel=["']canonical["'][^>]*>/gi)];
  r.canonicals = canonTags.map(m => {
    const h = m[0].match(/href=(?:"([^"]*)"|'([^']*)')/i);
    return h ? (h[1] ?? h[2]) : '';
  });

  // 4. h1
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  r.h1Count = h1s.length;
  r.h1Texts = h1s.map(m => decodeEntities(m[1].replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim());

  // 5. JSON-LD
  const ldBlocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  r.ldCount = ldBlocks.length;
  r.ldErrors = [];
  ldBlocks.forEach((m, i) => {
    try { JSON.parse(m[1]); } catch (e) { r.ldErrors.push(`block ${i + 1}: ${e.message.slice(0, 80)}`); }
  });

  // 6. internal links
  const links = [...html.matchAll(/<a\s[^>]*href=(?:"(\/[^"]*)"|'(\/[^']*)')/gi)].map(m => m[1] ?? m[2]);
  // exclude protocol-relative //... URLs
  r.internalLinkHrefs = links.filter(h => !h.startsWith('//'));
  r.internalLinks = r.internalLinkHrefs.length;

  // 7. noindex
  const robotsTags = [...html.matchAll(/<meta\s+[^>]*name=["'](?:robots|googlebot)["'][^>]*>/gi)];
  r.noindex = robotsTags.some(m => /noindex/i.test(m[0]));

  // 8. visible word count — two variants: with and without <noscript> content
  const countWords = (src) => {
    let t = decodeEntities(src.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
    return t ? t.split(' ').length : 0;
  };
  const base = html.replace(/<script[\s\S]*?<\/script>/gi, ' ')
                   .replace(/<style[\s\S]*?<\/style>/gi, ' ')
                   .replace(/<!--[\s\S]*?-->/g, ' ');
  r.wordCount = countWords(base); // static HTML text incl. noscript
  r.wordCountJsOn = countWords(base.replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')); // what a JS-enabled user sees pre-hydration
  // where do h1 and internal links live?
  const outsideNs = base.replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ');
  r.h1OutsideNoscript = [...outsideNs.matchAll(/<h1[^>]*>/gi)].length;
  r.linksOutsideNoscript = [...outsideNs.matchAll(/<a\s[^>]*href=(?:"(\/[^"]*)"|'(\/[^']*)')/gi)].filter(m => !(m[1] ?? m[2]).startsWith('//')).length;

  results.push(r);
}

// uniqueness of titles
const titleMap = new Map();
for (const r of results) {
  if (r.title) {
    if (!titleMap.has(r.title)) titleMap.set(r.title, []);
    titleMap.get(r.title).push(r.route);
  }
}

// evaluate
const fails = { title: [], titleDup: [], titleLong: [], desc: [], canon: [], h1: [], ld: [], links: [], noindex: [], words: [] };
for (const r of results) {
  if (!r.title) fails.title.push(`${r.route} -> MISSING <title>`);
  else if (r.titleLen > 70) fails.titleLong.push(`${r.route} -> ${r.titleLen} chars: "${r.title}"`);

  if (r.desc === null) fails.desc.push(`${r.route} -> MISSING meta description`);
  else if (r.descLen < 80 || r.descLen > 170) fails.desc.push(`${r.route} -> ${r.descLen} chars: "${r.desc}"`);

  const expected = ORIGIN + (r.route === '/' ? '/' : r.route);
  const expectedAlt = expected.replace(/\/$/, ''); // allow no trailing slash
  if (r.canonicals.length === 0) fails.canon.push(`${r.route} -> MISSING canonical`);
  else if (r.canonicals.length > 1) fails.canon.push(`${r.route} -> MULTIPLE canonicals: ${r.canonicals.join(', ')}`);
  else {
    const c = r.canonicals[0];
    if (c !== expected && c !== expectedAlt) fails.canon.push(`${r.route} -> "${c}" (expected "${expected}" or "${expectedAlt}")`);
  }

  if (r.h1Count !== 1) fails.h1.push(`${r.route} -> ${r.h1Count} h1 tags${r.h1Texts.length ? ': ' + r.h1Texts.map(t => `"${t.slice(0, 60)}"`).join(' | ') : ''}`);
  else if (!r.h1Texts[0]) fails.h1.push(`${r.route} -> h1 is EMPTY`);

  if (r.ldErrors.length) fails.ld.push(`${r.route} -> ${r.ldErrors.join('; ')}`);

  if (r.internalLinks < 5) fails.links.push(`${r.route} -> only ${r.internalLinks} internal links`);

  if (r.noindex) fails.noindex.push(`${r.route} -> has noindex`);

  if (r.wordCount < 100) fails.words.push(`${r.route} -> ${r.wordCount} words (static incl. noscript); ${r.wordCountJsOn} outside noscript`);
}
for (const [t, routes] of titleMap) {
  if (routes.length > 1) fails.titleDup.push(`"${t}" used by ${routes.length} pages: ${routes.join(', ')}`);
}

// sitemap check
const sm = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
const locs = [...sm.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map(m => m[1].trim());
const sitemapIssues = { badLoc: [], missingFile: [], notInSitemap: [] };
const locRoutes = new Set();
for (const loc of locs) {
  let u;
  try { u = new URL(loc); } catch { sitemapIssues.badLoc.push(loc); continue; }
  if (u.origin !== ORIGIN) sitemapIssues.badLoc.push(`${loc} (wrong origin)`);
  let p = u.pathname;
  if (!p.endsWith('/')) p += '/';
  locRoutes.add(p);
  const fsPath = p === '/' ? path.join(DIST, 'index.html') : path.join(DIST, ...p.split('/').filter(Boolean), 'index.html');
  if (!fs.existsSync(fsPath)) sitemapIssues.missingFile.push(`${loc} -> no ${path.relative(DIST, fsPath).split(path.sep).join('/')}`);
}
for (const r of results) {
  if (!locRoutes.has(r.route)) sitemapIssues.notInSitemap.push(r.route);
}

// report
const out = {
  totalPages: results.length,
  totalSitemapLocs: locs.length,
  checks: {
    title_missing: fails.title,
    title_over_70: fails.titleLong,
    title_duplicates: fails.titleDup,
    description: fails.desc,
    canonical: fails.canon,
    h1: fails.h1,
    jsonld_invalid: fails.ld,
    internal_links_lt5: fails.links,
    noindex: fails.noindex,
    words_lt100: fails.words,
  },
  sitemap: sitemapIssues,
  stats: {
    titleLenMin: Math.min(...results.map(r => r.titleLen)),
    titleLenMax: Math.max(...results.map(r => r.titleLen)),
    descLenMin: Math.min(...results.filter(r => r.desc !== null).map(r => r.descLen)),
    descLenMax: Math.max(...results.filter(r => r.desc !== null).map(r => r.descLen)),
    ldBlocksTotal: results.reduce((a, r) => a + r.ldCount, 0),
    pagesWithZeroLd: results.filter(r => r.ldCount === 0).map(r => r.route),
    wordCountMin: Math.min(...results.map(r => r.wordCount)),
    wordCountMax: Math.max(...results.map(r => r.wordCount)),
    wordCountMedian: results.map(r => r.wordCount).sort((a, b) => a - b)[Math.floor(results.length / 2)],
    wordCountJsOnMax: Math.max(...results.map(r => r.wordCountJsOn)),
    internalLinksMin: Math.min(...results.map(r => r.internalLinks)),
    pagesWithH1OnlyInNoscript: results.filter(r => r.h1Count >= 1 && r.h1OutsideNoscript === 0).length,
    pagesWithLinksOnlyInNoscript: results.filter(r => r.internalLinks >= 5 && r.linksOutsideNoscript < 5).length,
    bottom10WordCounts: results.map(r => ({ route: r.route, words: r.wordCount })).sort((a, b) => a.words - b.words).slice(0, 10),
  },
};
console.log(JSON.stringify(out, null, 2));
