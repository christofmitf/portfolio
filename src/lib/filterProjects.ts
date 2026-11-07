import type { Category, Project } from '../types/projects'
import type { Language } from '../types/i18n'
import { localize } from './localize'

export interface ProjectFilter {
  /** Free text, matched against title, description and technologies */
  query: string
  /** `null` means all categories */
  category: Category | null
  /** `null` means any technology */
  technology: string | null
}

/**
 * Returns the projects that match every part of the filter.
 * Pure function, so the page can call it on every render and tests don't need React.
 */
export function filterProjects(
  projects: Project[],
  filter: ProjectFilter,
  language: Language,
): Project[] {
  const query = filter.query.trim().toLowerCase()

  return projects.filter((project) => {
    if (filter.category && project.category !== filter.category) {
      return false
    }
    if (
      filter.technology &&
      !project.technologies.includes(filter.technology)
    ) {
      return false
    }
    if (!query) {
      return true
    }
    const searchable = [
      localize(project.title, language),
      localize(project.description, language),
      ...project.technologies,
    ]
    return searchable.some((text) => text.toLowerCase().includes(query))
  })
}
