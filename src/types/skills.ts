/**
 * Shape of `data/skills.json`.
 */

import type { Text } from './i18n'

export interface ProgrammingLanguage {
  id: string
  name: Text
  /** From 1 to 5, shown as dots */
  level: number
  note: Text
}

export interface SpokenLanguage {
  id: string
  name: Text
  /** "Native" or a CEFR level like "C1" */
  level: Text
}

export interface SkillsData {
  programmingLanguages: ProgrammingLanguage[]
  tools: string[]
  spokenLanguages: SpokenLanguage[]
  otherSkills: Text[]
}
