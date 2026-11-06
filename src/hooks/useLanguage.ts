/**
 * The language the site is currently shown in and a function to change it.
 *
 * The state itself lives in i18next, so the UI texts (`t(...)`) and the
 * translated content (`localize(...)`) always use the same language.
 * Changing it re-renders every component that uses this hook.
 */

import { useTranslation } from 'react-i18next'
import { languages, type Language } from '../types/i18n'

function isLanguage(value: string | undefined): value is Language {
  return languages.some((language) => language === value)
}

function useLanguage() {
  const { i18n } = useTranslation()

  const language: Language = isLanguage(i18n.resolvedLanguage)
    ? i18n.resolvedLanguage
    : 'en'

  const setLanguage = (newLanguage: Language) => {
    // also saves the choice in localStorage, see src/i18n.ts
    i18n.changeLanguage(newLanguage)
  }

  return { language, setLanguage }
}

export default useLanguage
