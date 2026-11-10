/**
 * Formats dates and grades for the current language with the built-in Intl API,
 * so "Oct 2025" becomes "Okt. 2025" and "1.5" becomes "1,5" in German.
 */

import type { DateRange } from '../types/common'
import type { Language, Localized, Text } from '../types/i18n'
import { localize } from './localize'

// kept here instead of the i18next translations so that the formatting functions stay pure
const presentLabel: Localized = { en: 'present', de: 'heute' }

/** "2025-10" becomes a Date in October 2025, "2020" one in January 2020. */
function parseDate(isoDate: string): Date {
  const [year, month = 1] = isoDate.split('-').map(Number)
  return new Date(year, month - 1)
}

/** Dates in the data either all have a month ("2025-10") or only a year ("2020"). */
function dateFormat(isoDate: string, language: Language): Intl.DateTimeFormat {
  const hasMonth = isoDate.includes('-')
  return new Intl.DateTimeFormat(
    language,
    hasMonth ? { month: 'short', year: 'numeric' } : { year: 'numeric' },
  )
}

/**
 * Formats a period for display, e.g. "Oct 2023 – Mar 2025" or "Okt. 2023 – März 2025".
 * Irregular periods like "Summer semester 2023" are stored as text and only localized.
 */
export function formatPeriod(
  period: DateRange | Text,
  language: Language,
): string {
  if (typeof period === 'string' || !('start' in period)) {
    return localize(period, language)
  }

  const format = dateFormat(period.start, language)
  const start = parseDate(period.start)

  if (!period.end) {
    return `${format.format(start)} – ${localize(presentLabel, language)}`
  }
  // formatRange also merges what both dates share, e.g. "Sep – Dec 2026"
  return format.formatRange(start, parseDate(period.end))
}

/** True if the period has no end or the end month is not over yet. */
export function isOngoing(period: DateRange): boolean {
  if (!period.end) {
    return true
  }
  const today = new Date()
  const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
  // ISO dates can be compared as strings, a year-only end counts as the whole year
  return period.end.length === 4
    ? period.end >= currentMonth.slice(0, 4)
    : period.end >= currentMonth
}

/** Formats a German grade with one decimal, "1.5" in English and "1,5" in German. */
export function formatGrade(grade: number, language: Language): string {
  return grade.toLocaleString(language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })
}

/** Formats an ISO timestamp as a day, "Nov 7, 2026" in English and "07.11.2026" in German. */
export function formatDay(isoTimestamp: string, language: Language): string {
  return new Intl.DateTimeFormat(language, { dateStyle: 'medium' }).format(
    new Date(isoTimestamp),
  )
}
