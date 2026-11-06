import './Work.css'
import workData from '../../data/work.json'
import { useTranslation } from 'react-i18next'
import useLanguage from '../../hooks/useLanguage'
import { formatPeriod } from '../../lib/format'
import { localize } from '../../lib/localize'
import type { WorkData } from '../../types/work'

const { jobs, otherJobs }: WorkData = workData

function Work() {
  const { t } = useTranslation()
  const { language } = useLanguage()

  return (
    <section className="work">
      <h1>{t('work.title')}</h1>

      <div className="work-list">
        {jobs.map((job) => (
          <article key={job.id} className="work-card">
            <div className="work-card-header">
              <h2>{localize(job.role, language)}</h2>
              <span className="work-period">
                {formatPeriod(job.period, language)}
              </span>
            </div>
            <p>
              {localize(job.company, language)} |{' '}
              {localize(job.location, language)}
              {job.type && <> | {localize(job.type, language)}</>}
            </p>

            <ul className="work-tasks">
              {job.tasks.map((task) => (
                <li key={localize(task, language)}>
                  {localize(task, language)}
                </li>
              ))}
            </ul>

            {job.skills && (
              <div className="work-skills">
                {job.skills.map((skill) => (
                  <span key={localize(skill, language)} className="work-skill">
                    {localize(skill, language)}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
      {/* TODO maybe some description for other work */}
      <h2 className="work-other-title">{t('work.otherTitle')}</h2>
      <ul className="work-other">
        {otherJobs.map((job) => (
          <li key={job.id}>
            <span>
              {localize(job.role, language)}, {job.company}
            </span>
            <span>{formatPeriod(job.period, language)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Work
