/**
 * Small types that are shared by several kinds of content.
 */

/**
 * A period of time as ISO dates, either "YYYY-MM" or "YYYY".
 * No `end` means it is still ongoing.
 */
export interface DateRange {
  start: string
  end?: string
}
