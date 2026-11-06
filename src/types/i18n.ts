/**
 * Types for content that exists in more than one language.
 *
 * Content in `src/data` stores translatable fields as `{ en, de }` objects,
 * everything else (dates, links, names) only once.
 */

/** All supported languages. The `Language` type is derived from this list. */
export const languages = ['en', 'de'] as const

export type Language = (typeof languages)[number]

/** A text in every supported language. TypeScript complains if one is missing. */
export type Localized = Record<Language, string>

/** Either a translated text or a plain string that is the same in every language (e.g. "Java"). */
export type Text = string | Localized
