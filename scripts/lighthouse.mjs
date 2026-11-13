/**
 * Runs Lighthouse on Home and Projects, once with the mobile and once with the
 * desktop preset, and prints the scores as a table (evaluation, NFR-2 and NFR-3).
 *
 * Usage:
 *   npm run lighthouse                                     live site
 *   npm run lighthouse -- http://localhost:4173/portfolio/  local build (`npm run preview` first)
 *
 * The full HTML reports are saved in lighthouse-reports/.
 * https://github.com/GoogleChrome/lighthouse/blob/main/docs/readme.md#using-programmatically
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import * as chromeLauncher from 'chrome-launcher'
import lighthouse from 'lighthouse'
import desktopConfig from 'lighthouse/core/config/desktop-config.js'

const base = process.argv[2] ?? 'https://christofmitf.github.io/portfolio/'
const pages = { Home: '#/', Projects: '#/projects' }
// Edge is installed on every Windows machine, use it unless CHROME_PATH says otherwise
const edge = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const chromePath =
  process.env.CHROME_PATH ?? (process.platform === 'win32' ? edge : undefined)

const outDir = 'lighthouse-reports'
mkdirSync(outDir, { recursive: true })

const browser = await chromeLauncher.launch({
  chromePath,
  chromeFlags: ['--headless=new'],
})
const rows = []

for (const [name, path] of Object.entries(pages)) {
  for (const device of ['mobile', 'desktop']) {
    // the default config is the mobile preset (slow phone, throttled network)
    const config = device === 'desktop' ? desktopConfig : undefined
    const result = await lighthouse(
      base + path,
      { port: browser.port, output: 'html', logLevel: 'error' },
      config,
    )
    const { categories, audits } = result.lhr
    const score = (id) => Math.round(categories[id].score * 100)
    rows.push({
      page: `${name}, ${device}`,
      performance: score('performance'),
      accessibility: score('accessibility'),
      'best practices': score('best-practices'),
      SEO: score('seo'),
      LCP: audits['largest-contentful-paint'].displayValue,
      TBT: audits['total-blocking-time'].displayValue,
      CLS: audits['cumulative-layout-shift'].displayValue,
    })
    writeFileSync(
      `${outDir}/${name.toLowerCase()}-${device}.html`,
      result.report,
    )
  }
}

await browser.kill()
console.log(`Lighthouse results for ${base}`)
console.table(rows)
console.log(`Full reports: ${outDir}/`)
