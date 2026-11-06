/**
 * Sets up i18next for the UI texts (headings, buttons, navigation).
 *
 * The language is chosen in this order:
 * 1. the language the visitor picked before (saved in localStorage)
 * 2. the browser language, e.g. "de-DE" becomes "de"
 * 3. English if neither is supported
 *
 * Content like jobs and degrees is translated in `src/data` instead, see `lib/localize.ts`.
 */

import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import de from './locales/de.json'
import en from './locales/en.json'
import { languages } from './types/i18n'

export const resources = {
  en: { translation: en },
  // `satisfies` makes the build fail if a key from en.json is missing in de.json
  de: { translation: de satisfies typeof en },
}

// keep the page in sync with the language, for screen readers, search engines and the browser tab
i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language
  document.title = i18n.t('meta.title')
})

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: languages,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      // "de-DE" or "de-AT" -> "de"
      convertDetectedLanguage: (language) => language.split('-')[0],
    },
    interpolation: {
      // React already escapes everything it renders
      escapeValue: false,
    },
  })

export default i18n
