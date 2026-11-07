import { describe, expect, it } from 'vitest'
import { localize } from './localize'

describe('localize', () => {
  it('picks the text in the given language', () => {
    const text = { en: 'Education', de: 'Bildung' }
    expect(localize(text, 'en')).toBe('Education')
    expect(localize(text, 'de')).toBe('Bildung')
  })

  it('returns plain strings unchanged in every language', () => {
    expect(localize('Java', 'en')).toBe('Java')
    expect(localize('Java', 'de')).toBe('Java')
  })
})
