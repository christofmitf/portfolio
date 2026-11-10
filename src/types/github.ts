/**
 * Types for the public repositories loaded from the GitHub REST API.
 */

/** The fields of a repository that the site uses, as GitHub sends them. */
export interface GitHubRepoResponse {
  name: string
  description: string | null
  language: string | null
  html_url: string
  pushed_at: string
  fork: boolean
}

/** A repository as it is shown on the Projects page. */
export interface Repo {
  name: string
  /** Written on GitHub, so only in English */
  description: string | null
  language: string | null
  url: string
  /** ISO timestamp of the last push, e.g. "2026-11-07T12:30:10Z" */
  pushedAt: string
}
