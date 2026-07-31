#!/usr/bin/env node
/**
 * Dev-only visual QA helper.
 *
 *   node scripts/screenshot.mjs <outDir> <baseUrl> <width> <height> [route]
 *
 * Scrolls the whole page (so every ScrollTrigger fires and any pinned section
 * plays through), capturing a viewport-sized frame per section anchor plus a
 * few evenly spaced frames. Viewport frames — not fullPage — because fullPage
 * capture of a pinned ScrollTrigger renders the pin spacer as dead space.
 */
import { chromium } from 'playwright'
import { promises as fs } from 'node:fs'
import path from 'node:path'

const [outDir, base = 'http://localhost:3000', w = '1440', h = '900', route = '/'] =
  process.argv.slice(2)

await fs.mkdir(outDir, { recursive: true })

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({
  viewport: { width: Number(w), height: Number(h) },
  deviceScaleFactor: 1,
})

const problems = []
page.on('console', (m) => {
  if (m.type() === 'error') problems.push(`console: ${m.text()}`)
})
page.on('pageerror', (e) => problems.push(`pageerror: ${e}`))
page.on('response', (r) => {
  if (r.status() >= 400) problems.push(`${r.status()} ${r.url()}`)
})

await page.goto(base + route, { waitUntil: 'networkidle' })

const total = await page.evaluate(() => document.body.scrollHeight)
const step = Number(h) * 0.85
const shots = []
for (let y = 0, i = 0; y < total; y += step, i++) {
  await page.evaluate((to) => window.scrollTo(0, to), y)
  await page.waitForTimeout(320)
  const file = path.join(outDir, `${String(i).padStart(2, '0')}.png`)
  await page.screenshot({ path: file })
  shots.push(file)
}

// Anything left invisible after a full scroll-through is a stuck reveal.
const stuck = await page.evaluate(() =>
  [...document.querySelectorAll('main *')]
    .filter((el) => {
      const s = getComputedStyle(el)
      return s.opacity === '0' && el.getBoundingClientRect().height > 40
    })
    .slice(0, 10)
    .map((el) => `${el.tagName}.${el.className}`.slice(0, 120))
)

console.log(`saved ${shots.length} frames to ${outDir}`)
if (stuck.length) console.log('STUCK AT OPACITY 0:\n' + stuck.join('\n'))
if (problems.length) console.log('PROBLEMS:\n' + [...new Set(problems)].join('\n'))
await browser.close()
