import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { GitHubRepoResponse } from '../types/github'

function repo(overrides: Partial<GitHubRepoResponse>): GitHubRepoResponse {
  return {
    name: 'repo',
    description: null,
    language: null,
    html_url: 'https://github.com/christofmitf/repo',
    pushed_at: '2026-01-01T00:00:00Z',
    fork: false,
    ...overrides,
  }
}

// github.ts keeps the request for the whole visit, so every test loads a fresh copy of the module
async function loadModule() {
  vi.resetModules()
  return import('./github')
}

describe('toRepos', () => {
  it('leaves out forks and sorts by last push, newest first', async () => {
    const { toRepos } = await loadModule()
    const repos = toRepos([
      repo({ name: 'old', pushed_at: '2025-03-01T10:00:00Z' }),
      repo({ name: 'forked', fork: true }),
      repo({ name: 'new', pushed_at: '2026-11-07T12:30:10Z' }),
    ])
    expect(repos.map((r) => r.name)).toEqual(['new', 'old'])
  })

  it('keeps only the fields the page needs', async () => {
    const { toRepos } = await loadModule()
    const [result] = toRepos([
      repo({ name: 'portfolio', language: 'TypeScript', description: 'Site' }),
    ])
    expect(result).toEqual({
      name: 'portfolio',
      description: 'Site',
      language: 'TypeScript',
      url: 'https://github.com/christofmitf/repo',
      pushedAt: '2026-01-01T00:00:00Z',
    })
  })
})

describe('fetchRepos', () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    fetchMock.mockReset()
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  const ok = (body: unknown) => ({ ok: true, json: async () => body })
  const failed = { ok: false, status: 403, json: async () => ({}) }

  it('loads the repos only once per visit', async () => {
    const { fetchRepos } = await loadModule()
    fetchMock.mockResolvedValue(ok([repo({ name: 'portfolio' })]))

    await fetchRepos()
    const repos = await fetchRepos()

    expect(repos.map((r) => r.name)).toEqual(['portfolio'])
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('fails if GitHub answers with an error, e.g. the rate limit', async () => {
    const { fetchRepos } = await loadModule()
    fetchMock.mockResolvedValue(failed)
    await expect(fetchRepos()).rejects.toThrow('403')
  })

  it('tries again after a failed request', async () => {
    const { fetchRepos } = await loadModule()
    fetchMock.mockResolvedValueOnce(failed)
    fetchMock.mockResolvedValueOnce(ok([repo({ name: 'portfolio' })]))

    await expect(fetchRepos()).rejects.toThrow()
    const repos = await fetchRepos()

    expect(repos).toHaveLength(1)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
