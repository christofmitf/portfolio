/**
 * Projects page: the projects from `data/projects.json` with search and
 * filters, followed by my public repositories from GitHub.
 */

import './Projects.css'
import projectsData from '../../data/projects.json'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import GitHubRepos from '../GitHubRepos'
import useLanguage from '../../hooks/useLanguage'
import { filterProjects } from '../../lib/filterProjects'
import { formatPeriod } from '../../lib/format'
import { localize } from '../../lib/localize'
import { categories, type Category, type Project } from '../../types/projects'

function isCategory(value: string | null): value is Category {
  return categories.some((category) => category === value)
}

// JSON only knows "string", so the category is checked once here
const projects: Project[] = projectsData.map((project) => {
  if (!isCategory(project.category)) {
    throw new Error(`Unknown category "${project.category}" in ${project.id}`)
  }
  return { ...project, category: project.category }
})

// Only show chips for categories that have projects, e.g. no "Personal" chip while there are none
const usedCategories = categories.filter((category) =>
  projects.some((project) => project.category === category),
)

function Projects() {
  const { t } = useTranslation()
  const { language } = useLanguage()

  // The filter lives in the URL (#/projects?tech=Python), so a filtered view can be shared
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const categoryParam = searchParams.get('category')
  const category = isCategory(categoryParam) ? categoryParam : null
  const technology = searchParams.get('tech')

  const visibleProjects = filterProjects(
    projects,
    { query, category, technology },
    language,
  )

  const updateParam = (key: string, value: string | null) => {
    setSearchParams(
      (params) => {
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
        return params
      },
      // don't add a history entry for every typed letter
      { replace: true },
    )
  }

  const hasFilter = query !== '' || category !== null || technology !== null

  return (
    <section className="projects">
      <h1>{t('projects.title')}</h1>

      {/* Search and category filter, both write into the URL */}
      <div className="projects-filters">
        <input
          type="search"
          className="projects-search"
          value={query}
          onChange={(event) => updateParam('q', event.target.value)}
          placeholder={t('projects.searchPlaceholder')}
          aria-label={t('projects.searchLabel')}
        />

        <div
          className="projects-categories"
          role="group"
          aria-label={t('projects.categoryLabel')}
        >
          <button
            type="button"
            className="projects-chip"
            aria-pressed={category === null}
            onClick={() => updateParam('category', null)}
          >
            {t('projects.categories.all')}
          </button>
          {usedCategories.map((id) => (
            <button
              key={id}
              type="button"
              className="projects-chip"
              aria-pressed={category === id}
              onClick={() => updateParam('category', id)}
            >
              {t(`projects.categories.${id}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Result count, read out by screen readers whenever it changes */}
      <p className="projects-status" aria-live="polite">
        {t('projects.results', { count: visibleProjects.length })}
        {technology && <> · {t('projects.withTechnology', { technology })}</>}
        {hasFilter && (
          <button
            type="button"
            className="projects-reset"
            onClick={() => setSearchParams({}, { replace: true })}
          >
            {t('projects.reset')}
          </button>
        )}
      </p>

      {visibleProjects.length === 0 && (
        <p className="projects-empty">{t('projects.noResults')}</p>
      )}

      {/* Project cards, only the ones that match the filter */}
      <div className="projects-list">
        {visibleProjects.map((project) => (
          <article key={project.id} className="project-card">
            <div className="project-card-header">
              <h2>{localize(project.title, language)}</h2>
              <span className="project-period">
                {formatPeriod(project.period, language)}
              </span>
            </div>
            <p className="project-context">
              {localize(project.context, language)}
            </p>
            <p>{localize(project.description, language)}</p>

            {/* Each technology is also a filter: click to show only projects that use it */}
            <div className="project-technologies">
              {project.technologies.map((name) => (
                <button
                  key={name}
                  type="button"
                  className="projects-chip"
                  aria-pressed={technology === name}
                  onClick={() =>
                    updateParam('tech', technology === name ? null : name)
                  }
                >
                  {name}
                </button>
              ))}
            </div>

            {project.links && (
              <ul className="project-links">
                {project.links.map((link) => (
                  <li key={link.url}>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {localize(link.label, language)} ↗
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>

      {/* Live list of my public repositories, loaded from GitHub */}
      <GitHubRepos />
    </section>
  )
}

export default Projects
