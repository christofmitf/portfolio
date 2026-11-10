/**
 * Shape of `data/education.json`.
 */

import type { DateRange } from './common'
import type { Text } from './i18n'

/** A label and value pair like "Final grade: 1.9". Numbers are shown as grades. */
export interface Fact {
  label: Text
  value: Text | number
}

export interface Module {
  name: Text
  grade: number
  description?: Text
}

export interface Thesis {
  title: string
  grade: number
}

/** A degree or exchange semester, shown as one card. */
export interface EducationEntry {
  id: string
  degree: Text
  institution: Text
  location: Text
  /** Counts as ongoing until the end date has passed */
  period: DateRange
  facts: Fact[]
  thesis?: Thesis
  modules?: Module[]
  courses?: Text[]
}
