/**
 * Returns the language the site is currently shown in.
 *
 * For now this is always English. Once the language switch exists, only this
 * hook changes and every page that uses it gets the selected language.
 */

import type { Language } from '../types/i18n'

function useLanguage(): Language {
  return 'en'
}

export default useLanguage
