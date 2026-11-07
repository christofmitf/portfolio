/**
 * Shape of `data/projects.json`.
 */

import type { DateRange } from './common'
import type { Text } from './i18n'

export const categories = ['university', 'work', 'personal'] as const

/** Where a project comes from, used for the category filter. */
export type Category = (typeof categories)[number]

export interface ProjectLink {
  label: Text
  url: string
}

export interface Project {
  id: string
  title: Text
  /** e.g. "Development project, team of 6" */
  context: Text
  description: Text
  period: DateRange
  category: Category
  /** Same in every language, so plain strings */
  technologies: string[]
  links?: ProjectLink[]
}
