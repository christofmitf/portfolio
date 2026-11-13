import { defineConfig } from '@playwright/test'

/**
 * Playwright runs the walkthrough in `e2e/` in a real browser.
 *
 * It builds the site and starts `vite preview` by itself, so the tests run
 * against the same files that get deployed, not the dev server.
 * https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: 'e2e',
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    // the preview server serves the site under /portfolio/, like GitHub Pages
    baseURL: 'http://localhost:4173/portfolio/',
    // uses the installed Microsoft Edge, so no extra browser download is needed
    channel: 'msedge',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4173/portfolio/',
    // if `npm run preview` is already running, use it instead of starting another one
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
