/**
 * Loads my public repositories from the GitHub REST API.
 *
 * Without a token GitHub allows 60 requests per hour and IP address, which is
 * plenty for a portfolio. The result is kept for the rest of the visit, so
 * opening the Projects page again doesn't send another request.
 */

import type { GitHubRepoResponse, Repo } from '../types/github'

export const githubUser = 'christofmitf'
export const githubProfileUrl = `https://github.com/${githubUser}`

const reposUrl = `https://api.github.com/users/${githubUser}/repos?per_page=100`

/** Turns the API response into the repos shown on the page: no forks, most recently pushed first. */
export function toRepos(response: GitHubRepoResponse[]): Repo[] {
  return response
    .filter((repo) => !repo.fork)
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      url: repo.html_url,
      pushedAt: repo.pushed_at,
    }))
    .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt))
}

let cachedRequest: Promise<Repo[]> | null = null

export function fetchRepos(): Promise<Repo[]> {
  cachedRequest ??= fetch(reposUrl, {
    headers: { Accept: 'application/vnd.github+json' },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`GitHub answered with ${response.status}`)
      }
      return response.json() as Promise<GitHubRepoResponse[]>
    })
    .then(toRepos)
    .catch((error: unknown) => {
      // forget the failed request, so the next visit of the page tries again
      cachedRequest = null
      throw error
    })
  return cachedRequest
}
