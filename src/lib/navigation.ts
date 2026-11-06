/**
 * Pages of the site, their URL paths and their labels in the header.
 *
 * The components for each page are assigned in `src/routes.ts`. They are kept
 * out of here so that pages can import `paths` without importing each other.
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

interface Page {
  id: PageId
  label: string
}

/** Pages in the order they appear in the header */
export const pages: Page[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
]
