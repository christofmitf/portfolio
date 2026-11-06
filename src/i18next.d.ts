/**
 * Tells TypeScript which keys exist in the UI translations, so `t('nav.wrok')`
 * is a type error instead of showing the key on the page.
 */

import 'i18next'
import type en from './locales/en.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof en
    }
  }
}
