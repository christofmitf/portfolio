/**
 * Scenario walkthrough for the two personas from the README, run in a real browser.
 *
 * Each test follows one scenario step by step and checks the user stories (US)
 * and non-functional requirements (NFR) it touches, so the evaluation can be
 * repeated after every change with `npm run test:e2e`.
 */

import { expect, test, type Page } from '@playwright/test'

/** True if the page is wider than the window, i.e. it scrolls sideways */
function scrollsSideways(page: Page) {
  return page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  )
}

// ---------- Rosa: recruiter, German browser, phone ----------

test.describe('Rosa (recruiter, phone, German)', () => {
  test.use({
    locale: 'de-DE',
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  })

  test('finds degree, work experience and contact', async ({ page }) => {
    await page.goto('')

    // US4: the site opens in German because her browser is German
    await expect(page.locator('html')).toHaveAttribute('lang', 'de')

    // US1: degree visible without scrolling, graduation date one tap away
    await expect(page.locator('.home-overline')).toBeInViewport()
    await page.locator('.home-card-link[href="#/education"]').click()
    await expect(page).toHaveURL(/#\/education$/)
    await expect(page.locator('.education-card').first()).toBeVisible()

    // US5: the menu opens on the phone and closes with Escape
    const menuButton = page.locator('.menu-button')
    await menuButton.click()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    // US2: jobs with dates and what was done
    await menuButton.click()
    await page.locator('.nav-link[href="#/work"]').click()
    await expect(page.locator('.work-card').first()).toBeVisible()

    // US3: one click to email, in the same tab
    const email = page.locator('.footer-links a[href^="mailto:"]')
    await expect(email).toBeVisible()
    await expect(email).not.toHaveAttribute('target', '_blank')

    // US5 / NFR-1: nothing scrolls sideways on the phone
    expect(await scrollsSideways(page)).toBe(false)
  })
})

// ---------- Zohran: hiring engineer, German browser, laptop ----------

test.describe('Zohran (hiring engineer, laptop, switches to English)', () => {
  test.use({ locale: 'de-DE', viewport: { width: 1280, height: 800 } })

  test('switches to English, filters projects and checks skills', async ({
    page,
    browser,
  }) => {
    await page.goto('')
    await expect(page.locator('html')).toHaveAttribute('lang', 'de')

    // US12: switch to English with the button in the header
    await page.locator('.language-option[lang="en"]').click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')

    // US7: search and filter the projects
    await page.locator('.nav-link[href="#/projects"]').click()
    const cards = page.locator('.project-card')
    await expect(cards.first()).toBeVisible()

    await page.getByRole('searchbox').fill('Flutter')
    await expect(cards.first()).toContainText('Flutter')
    await page.getByRole('searchbox').fill('')

    await page.getByRole('button', { name: 'University' }).click()
    await expect(page).toHaveURL(/category=university/)
    const titles = await cards.locator('h2').allTextContents()
    expect(titles.length).toBeGreaterThan(0)

    // US8: projects link to their code on GitHub
    await expect(
      page.locator('.project-links a[href*="github.com"]').first(),
    ).toBeVisible()

    // US10: a colleague who opens the same link sees the same projects
    const colleague = await browser.newPage({ locale: 'en-US' })
    await colleague.goto(page.url())
    await expect(colleague.locator('.project-card h2')).toHaveText(titles)
    await colleague.close()

    // US8: the GitHub section always links to the profile, even if the API fails
    await expect(page.locator('.github-profile')).toBeVisible()

    // US9: the skill level is readable, also for screen readers
    await page.locator('.nav-link[href="#/skills"]').click()
    await expect(page.locator('.skills-dots').first()).toHaveAttribute(
      'aria-label',
      /Level \d of \d/,
    )
  })

  test('skip link moves the focus to the content (NFR-3)', async ({ page }) => {
    await page.goto('')
    // wait until the lazy loaded page is there, otherwise Tab can go nowhere
    await expect(page.locator('main h1')).toBeVisible()
    await page.keyboard.press('Tab')
    await expect(page.locator('.skip-link')).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page.locator('#main')).toBeFocused()
  })
})

// ---------- NFR-1: no sideways scrolling on any page, width or language ----------

const pagePaths = ['', 'about', 'education', 'projects', 'skills', 'work']

for (const width of [360, 768, 1280]) {
  for (const locale of ['de-DE', 'en-US']) {
    test.describe(`NFR-1 at ${width} px, ${locale}`, () => {
      test.use({ locale, viewport: { width, height: 800 } })

      test('no page scrolls sideways', async ({ page }) => {
        for (const path of pagePaths) {
          await page.goto(`#/${path}`)
          await expect(page.locator('main h1')).toBeVisible()
          expect(await scrollsSideways(page), `#/${path}`).toBe(false)
        }
      })
    })
  }
}
