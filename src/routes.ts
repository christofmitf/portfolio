/**
 * Which component is shown for which page.
 *
 * `Record<PageId, ...>` makes TypeScript check that every page in
 * `lib/navigation.ts` has a component, so a new page can't be forgotten here.
 */

import type { ComponentType } from 'react'
import About from './components/pages/About'
import Education from './components/pages/Education'
import Home from './components/pages/Home'
import Projects from './components/pages/Projects'
import Skills from './components/pages/Skills'
import Work from './components/pages/Work'
import type { PageId } from './lib/navigation'

export const pageComponents: Record<PageId, ComponentType> = {
  home: Home,
  about: About,
  education: Education,
  projects: Projects,
  skills: Skills,
  work: Work,
}
