/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
  test: {
    // only the unit tests in src; the browser tests in e2e/ are run by Playwright
    include: ['src/**/*.test.ts'],
  },
})
