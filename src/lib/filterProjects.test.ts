import { describe, expect, it } from 'vitest'
import type { Project } from '../types/projects'
import { filterProjects, type ProjectFilter } from './filterProjects'

// Small made-up projects, so the tests don't break when the real content changes
const projects: Project[] = [
  {
    id: 'darts',
    title: { en: 'Darts scoring app', de: 'Dart-Zähl-App' },
    context: 'Team of 6',
    description: { en: 'Scores darts from a photo.', de: 'Zählt Punkte.' },
    period: { start: '2025-11', end: '2026-04' },
    category: 'university',
    technologies: ['Flutter', 'Python'],
  },
  {
    id: 'naptime',
    title: 'NAPTIME',
    context: 'Job',
    description: { en: 'Sleep study pipeline.', de: 'Schlafstudie.' },
    period: { start: '2025-10' },
    category: 'work',
    technologies: ['Python'],
  },
]

const noFilter: ProjectFilter = { query: '', category: null, technology: null }

function ids(filter: Partial<ProjectFilter>, language: 'en' | 'de' = 'en') {
  return filterProjects(projects, { ...noFilter, ...filter }, language).map(
    (project) => project.id,
  )
}

describe('filterProjects', () => {
  it('returns everything without a filter', () => {
    expect(ids({})).toEqual(['darts', 'naptime'])
  })

  it('searches title, description and technologies, ignoring case', () => {
    expect(ids({ query: 'DARTS' })).toEqual(['darts'])
    expect(ids({ query: 'sleep' })).toEqual(['naptime'])
    expect(ids({ query: 'flutter' })).toEqual(['darts'])
  })

  it('ignores spaces around the search text', () => {
    expect(ids({ query: '  sleep  ' })).toEqual(['naptime'])
  })

  it('searches the texts of the current language', () => {
    expect(ids({ query: 'Schlaf' }, 'de')).toEqual(['naptime'])
    expect(ids({ query: 'Schlaf' }, 'en')).toEqual([])
  })

  it('filters by category and technology', () => {
    expect(ids({ category: 'work' })).toEqual(['naptime'])
    expect(ids({ technology: 'Python' })).toEqual(['darts', 'naptime'])
    expect(ids({ technology: 'Flutter' })).toEqual(['darts'])
  })

  it('combines all filters', () => {
    expect(ids({ technology: 'Python', category: 'work' })).toEqual(['naptime'])
    expect(ids({ technology: 'Flutter', category: 'work' })).toEqual([])
    expect(ids({ query: 'pipeline', technology: 'Python' })).toEqual([
      'naptime',
    ])
  })

  it('returns an empty list if nothing matches', () => {
    expect(ids({ query: 'cobol' })).toEqual([])
  })
})
