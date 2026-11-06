/**
 * Pages of the site and their URL paths.
 *
 * The components for each page are assigned in `src/routes.ts`, the labels in
 * the header come from the translations (`nav.*`). The components are kept out
 * of here so that pages can import `paths` without importing each other.
 */

/** URL path of every page. Links use these, so a wrong page name is a type error. */
export const paths = {
  home: '/',
  about: '/about',
  education: '/education',
  projects: '/projects',
  skills: '/skills',
  work: '/work',
} as const

export type PageId = keyof typeof paths

/** Pages in the order they appear in the header */
export const pages: PageId[] = [
  'home',
  'about',
  'education',
  'projects',
  'skills',
  'work',
]
