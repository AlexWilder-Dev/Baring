// After each deploy: open the live site, click through the main links on a phone and a desktop,
// and fail if any page doesn't show, a script errors, or a file on the site 404s.
// Usage: node scripts/check-live.mjs https://alexwilder-dev.github.io/Baring/
import { chromium } from 'playwright'

const site = (process.argv[2] || 'https://alexwilder-dev.github.io/Baring/').replace(/\/*$/, '/')
const origin = new URL(site).origin

const routes = [
  { link: 'Menus', hash: '#/menus/' },
  { link: 'Private dining', hash: '#/private-dining' },
  { link: 'The pub', hash: '#/the-pub' },
  { link: 'Visit', hash: '#/visit' },
]

const failures = []
const browser = await chromium.launch()

for (const phone of [true, false]) {
  const label = phone ? 'phone' : 'desktop'
  const context = await browser.newContext(
    phone
      ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }
      : { viewport: { width: 1440, height: 900 } },
  )
  const page = await context.newPage()
  // Mark this browser as ours so the demo ping stays quiet.
  await page.addInitScript(() => localStorage.setItem('me', '1'))
  page.on('pageerror', (e) => failures.push(`${label}: script error: ${e.message}`))
  page.on('response', (r) => {
    if (r.url().startsWith(origin) && r.status() >= 400) failures.push(`${label}: ${r.status()} ${r.url()}`)
  })

  const pageShows = async (what) => {
    await page.waitForTimeout(900)
    const s = await page.evaluate(() => {
      const main = document.querySelector('main')
      const wrap = main?.firstElementChild
      return {
        hash: location.hash,
        opacity: wrap ? getComputedStyle(wrap).opacity : '0',
        text: (main?.innerText || '').trim().length,
      }
    })
    const ok = s.opacity === '1' && s.text > 200
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${label} ${what} -> ${s.hash} (opacity ${s.opacity}, ${s.text} chars)`)
    if (!ok) failures.push(`${label}: ${what} showed nothing (${s.hash})`)
    return s
  }

  await page.goto(site, { waitUntil: 'networkidle' })
  await pageShows('home')

  for (const r of routes) {
    for (const back of [false, true]) {
      if (phone) {
        await page.locator('.burger').click()
        await page.locator('.phone-nav a', { hasText: r.link }).first().click()
      } else {
        await page.locator('.side nav a', { hasText: r.link }).first().click()
      }
      const s = await pageShows(`${back ? 'again: ' : ''}${r.link}`)
      if (!s.hash.startsWith(r.hash)) failures.push(`${label}: ${r.link} went to ${s.hash}`)
      await page.locator(phone ? '.topbar-logo' : '.side-logo').click()
      await pageShows('home (logo)')
    }
  }
  await context.close()
}

await browser.close()
if (failures.length) {
  console.error('\nLive check failed:\n' + failures.map((f) => ` - ${f}`).join('\n'))
  process.exit(1)
}
console.log(`\nLive check passed: ${site}`)
