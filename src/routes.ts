/**
 * Which component is shown for which page.
 *
 * Pages are lazy loaded: each one is built into its own JavaScript file,
 * which the browser only downloads when the page is opened for the first time.
 *
 * `Record<PageId, ...>` makes TypeScript check that every page in
 * `lib/navigation.ts` has a component, so a new page can't be forgotten here.
 */

import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import type { PageId } from './lib/navigation'

export const pageComponents: Record<
  PageId,
  LazyExoticComponent<ComponentType>
> = {
  home: lazy(() => import('./components/pages/Home')),
  about: lazy(() => import('./components/pages/About')),
  education: lazy(() => import('./components/pages/Education')),
  projects: lazy(() => import('./components/pages/Projects')),
  skills: lazy(() => import('./components/pages/Skills')),
  work: lazy(() => import('./components/pages/Work')),
}
