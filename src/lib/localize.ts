/**
 * Picks the right language from translated content.
 */

import type { Language, Text } from '../types/i18n'

/** Returns the text in the given language. Plain strings are returned as they are. */
export function localize(text: Text, language: Language): string {
  return typeof text === 'string' ? text : text[language]
}
