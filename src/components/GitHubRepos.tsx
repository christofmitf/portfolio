/**
 * List of my public GitHub repositories, loaded live from the GitHub API.
 * Shown below the projects, so new repositories appear without changing the site.
 */

import { useTranslation } from 'react-i18next'
import useGitHubRepos from '../hooks/useGitHubRepos'
import useLanguage from '../hooks/useLanguage'
import { formatDay } from '../lib/format'
import { githubProfileUrl } from '../lib/github'
import './GitHubRepos.css'

function GitHubRepos() {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const state = useGitHubRepos()

  return (
    <section className="github" aria-busy={state.status === 'loading'}>
      <h2>{t('github.title')}</h2>

      {state.status === 'loading' && <p>{t('github.loading')}</p>}

      {state.status === 'error' && <p>{t('github.error')}</p>}

      {state.status === 'success' && state.repos.length === 0 && (
        <p>{t('github.empty')}</p>
      )}

      {state.status === 'success' && state.repos.length > 0 && (
        <ul className="github-list">
          {state.repos.map((repo) => (
            <li key={repo.name} className="github-repo">
              <a href={repo.url} target="_blank" rel="noreferrer">
                {repo.name}
              </a>
              {/* descriptions come from GitHub and are only in English */}
              {repo.description && <p lang="en">{repo.description}</p>}
              <p className="github-meta">
                {repo.language && <>{repo.language} · </>}
                {t('github.updated', {
                  date: formatDay(repo.pushedAt, language),
                })}
              </p>
            </li>
          ))}
        </ul>
      )}

      <a
        className="github-profile"
        href={githubProfileUrl}
        target="_blank"
        rel="noreferrer"
      >
        {t('github.profile')} ↗
      </a>
    </section>
  )
}

export default GitHubRepos
