/**
 * Shape of `data/work.json`.
 */

import type { DateRange } from './common'
import type { Text } from './i18n'

/** A software job, shown as a card with tasks and skills. */
export interface Job {
  id: string
  role: Text
  company: Text
  location: Text
  /** Text for irregular periods like "Summer semester 2023" */
  period: DateRange | Text
  /** e.g. "Working student", shown after the location */
  type?: Text
  tasks: Text[]
  skills?: Text[]
}

/** A job outside of software, only listed with role and period. */
export interface OtherJob {
  id: string
  role: Text
  company: string
  period: DateRange | Text
}

export interface WorkData {
  jobs: Job[]
  otherJobs: OtherJob[]
}
