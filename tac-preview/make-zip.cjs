// Deploy-zip builder — packs dist/ contents into a Linux-friendly zip
// (forward-slash paths, dot-files included) for Hostinger public_html.
const AdmZip = require('adm-zip')
const fs = require('fs')
const path = require('path')

const DIST = path.join(__dirname, 'dist')
const OUT = path.join(require('os').homedir(), 'Desktop', 'tlc_updated-website.zip')

if (!fs.existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first.')
  process.exit(1)
}

const zip = new AdmZip()
let count = 0

function addDir(absDir, relDir) {
  for (const name of fs.readdirSync(absDir)) {
    const abs = path.join(absDir, name)
    const rel = relDir ? relDir + '/' + name : name // forward slashes always
    const stat = fs.statSync(abs)
    if (stat.isDirectory()) {
      addDir(abs, rel)
    } else {
      zip.addFile(rel, fs.readFileSync(abs))
      count++
    }
  }
}

addDir(DIST, '')
zip.writeZip(OUT)
const mb = (fs.statSync(OUT).size / (1024 * 1024)).toFixed(1)
console.log(`Wrote ${OUT}`)
console.log(`${count} files, ${mb} MB`)
