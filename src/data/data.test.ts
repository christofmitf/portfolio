/**
 * Checks the content in `src/data` and `src/locales` for mistakes the type checker can't see,
 * e.g. a duplicate id, "2025-13" as a date or a forgotten German text.
 */

import { describe, expect, it } from 'vitest'
import { categories } from '../types/projects'
import en from '../locales/en.json'
import de from '../locales/de.json'
import education from './education.json'
import projects from './projects.json'
import skills from './skills.json'
import work from './work.json'

const dataFiles = { education, projects, skills, work }

/** Calls `visit` for every object and array inside `value`, with a readable path for error messages. */
function walk(
  value: unknown,
  visit: (node: Record<string, unknown>, path: string) => void,
  path = '',
) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, visit, `${path}[${index}]`))
  } else if (typeof value === 'object' && value !== null) {
    const node = value as Record<string, unknown>
    visit(node, path)
    for (const [key, child] of Object.entries(node)) {
      walk(child, visit, path ? `${path}.${key}` : key)
    }
  }
}

/** All strings inside `value`, together with their path. */
function strings(value: unknown, path = ''): [string, string][] {
  if (typeof value === 'string') {
    return [[path, value]]
  }
  if (typeof value === 'object' && value !== null) {
    return Object.entries(value).flatMap(([key, child]) =>
      strings(child, path ? `${path}.${key}` : key),
    )
  }
  return []
}

function duplicates(ids: string[]): string[] {
  return ids.filter((id, index) => ids.indexOf(id) !== index)
}

describe('ids', () => {
  const lists = {
    education: education,
    jobs: [...work.jobs, ...work.otherJobs],
    projects: projects,
    programmingLanguages: skills.programmingLanguages,
    spokenLanguages: skills.spokenLanguages,
  }

  for (const [name, list] of Object.entries(lists)) {
    it(`are unique in ${name}`, () => {
      expect(duplicates(list.map((item) => item.id))).toEqual([])
    })
  }
})

describe('dates', () => {
  // "2025" or "2025-01" to "2025-12"
  const isoDate = /^\d{4}(-(0[1-9]|1[0-2]))?$/

  for (const [file, data] of Object.entries(dataFiles)) {
    it(`are valid in ${file}.json`, () => {
      const problems: string[] = []
      walk(data, (node, path) => {
        if (typeof node.start !== 'string') {
          return
        }
        const { start, end } = node
        if (!isoDate.test(start)) {
          problems.push(`${path}: invalid start "${start}"`)
        }
        if (end === undefined) {
          return
        }
        if (typeof end !== 'string' || !isoDate.test(end)) {
          problems.push(`${path}: invalid end "${String(end)}"`)
        } else if (end.length !== start.length) {
          problems.push(`${path}: start and end use different formats`)
        } else if (end < start) {
          problems.push(`${path}: ends before it starts`)
        }
      })
      expect(problems).toEqual([])
    })
  }
})

describe('translations', () => {
  for (const [file, data] of Object.entries(dataFiles)) {
    it(`are complete in ${file}.json`, () => {
      const problems: string[] = []
      walk(data, (node, path) => {
        if (!('en' in node) && !('de' in node)) {
          return
        }
        for (const language of ['en', 'de']) {
          const text = node[language]
          if (typeof text !== 'string' || text.trim() === '') {
            problems.push(`${path}.${language} is missing or empty`)
          }
        }
      })
      expect(problems).toEqual([])
    })
  }

  it('have no placeholders left', () => {
    const all = [
      ...strings(dataFiles),
      ...strings(en, 'en'),
      ...strings(de, 'de'),
    ]
    expect(all.filter(([, text]) => text.includes('DE_'))).toEqual([])
  })

  it('have no empty UI texts, except ones that are hidden on purpose', () => {
    // see D24 in the report notes: the grade scale is obvious to German readers
    const hiddenOnPurpose = ['de.education.gradeScale']
    const empty = [...strings(en, 'en'), ...strings(de, 'de')]
      .filter(([path, text]) => text === '' && !hiddenOnPurpose.includes(path))
      .map(([path]) => path)
    expect(empty).toEqual([])
  })
})

describe('projects', () => {
  it('have a known category', () => {
    const unknown = projects.filter(
      (project) =>
        !categories.some((category) => category === project.category),
    )
    expect(unknown.map((project) => project.id)).toEqual([])
  })

  it('have at least one technology', () => {
    const without = projects.filter(
      (project) => project.technologies.length === 0,
    )
    expect(without.map((project) => project.id)).toEqual([])
  })

  it('only link to https pages', () => {
    const links = projects.flatMap((project) => project.links ?? [])
    const insecure = links.filter((link) => !link.url.startsWith('https://'))
    expect(insecure).toEqual([])
  })
})
