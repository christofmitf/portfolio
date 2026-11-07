import { afterEach, describe, expect, it, vi } from 'vitest'
import { formatGrade, formatPeriod, isOngoing } from './format'

// Intl uses thin and narrow no-break spaces around the dash, which look the same as normal spaces
function normalizeSpaces(text: string): string {
  return text.replace(/\s/g, ' ')
}

describe('formatPeriod', () => {
  it('formats a month range in English and German', () => {
    const period = { start: '2023-10', end: '2025-03' }
    expect(normalizeSpaces(formatPeriod(period, 'en'))).toBe(
      'Oct 2023 – Mar 2025',
    )
    expect(normalizeSpaces(formatPeriod(period, 'de'))).toBe(
      'Okt. 2023 – März 2025',
    )
  })

  it('only shows the year once if both dates are in the same year', () => {
    const period = { start: '2026-09', end: '2026-12' }
    expect(normalizeSpaces(formatPeriod(period, 'en'))).toBe('Sep – Dec 2026')
  })

  it('formats year-only periods without months', () => {
    expect(
      normalizeSpaces(formatPeriod({ start: '2020', end: '2021' }, 'en')),
    ).toBe('2020 – 2021')
    expect(formatPeriod({ start: '2020', end: '2020' }, 'en')).toBe('2020')
  })

  it('shows "present" for periods without an end', () => {
    expect(normalizeSpaces(formatPeriod({ start: '2025-10' }, 'en'))).toBe(
      'Oct 2025 – present',
    )
    expect(normalizeSpaces(formatPeriod({ start: '2025-10' }, 'de'))).toBe(
      'Okt. 2025 – heute',
    )
  })

  it('returns text periods as they are, in the right language', () => {
    const period = { en: 'Summer semester 2023', de: 'Sommersemester 2023' }
    expect(formatPeriod(period, 'de')).toBe('Sommersemester 2023')
    expect(formatPeriod('2023', 'en')).toBe('2023')
  })
})

describe('isOngoing', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  // pretend it is 15 November 2026, so the result doesn't depend on when the tests run
  function setToday() {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 10, 15))
  }

  it('is true without an end date', () => {
    setToday()
    expect(isOngoing({ start: '2025-10' })).toBe(true)
  })

  it('compares month dates with the current month', () => {
    setToday()
    expect(isOngoing({ start: '2026-09', end: '2026-12' })).toBe(true)
    expect(isOngoing({ start: '2026-09', end: '2026-11' })).toBe(true)
    expect(isOngoing({ start: '2026-01', end: '2026-10' })).toBe(false)
  })

  it('counts a year-only end as the whole year', () => {
    setToday()
    expect(isOngoing({ start: '2020', end: '2026' })).toBe(true)
    expect(isOngoing({ start: '2020', end: '2025' })).toBe(false)
  })
})

describe('formatGrade', () => {
  it('always shows one decimal with the right separator', () => {
    expect(formatGrade(1, 'en')).toBe('1.0')
    expect(formatGrade(1, 'de')).toBe('1,0')
    expect(formatGrade(1.3, 'de')).toBe('1,3')
  })
})
