/**
 * Loads the GitHub repositories when a component is shown and tells it
 * whether they are still loading, failed to load or are ready.
 */

import { useEffect, useState } from 'react'
import { fetchRepos } from '../lib/github'
import type { Repo } from '../types/github'

// One state instead of separate loading/error/data variables, so impossible
// combinations like "loading and failed at the same time" can't happen
export type ReposState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; repos: Repo[] }

function useGitHubRepos(): ReposState {
  const [state, setState] = useState<ReposState>({ status: 'loading' })

  useEffect(() => {
    // if the page is left before the answer arrives, the result is ignored
    let ignore = false
    fetchRepos()
      .then((repos) => {
        if (!ignore) setState({ status: 'success', repos })
      })
      .catch(() => {
        if (!ignore) setState({ status: 'error' })
      })
    return () => {
      ignore = true
    }
  }, [])

  return state
}

export default useGitHubRepos
