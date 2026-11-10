/**
 * Education page: one card per degree from `data/education.json`, with
 * period, grades, thesis and selected modules or courses.
 */

import './Education.css'
import educationData from '../../data/education.json'
import { useTranslation } from 'react-i18next'
import useLanguage from '../../hooks/useLanguage'
import { formatGrade, formatPeriod, isOngoing } from '../../lib/format'
import { localize } from '../../lib/localize'
import type { EducationEntry } from '../../types/education'

const educationEntries: EducationEntry[] = educationData

function Education() {
  const { t } = useTranslation()
  const { language } = useLanguage()

  return (
    <section className="education">
      <h1>{t('education.title')}</h1>
      {t('education.gradeScale') && (
        <p className="education-intro">{t('education.gradeScale')}</p>
      )}

      <div className="education-list">
        {educationEntries.map((entry) => (
          <article key={entry.id} className="education-card">
            <div className="education-card-header">
              <h2>{localize(entry.degree, language)}</h2>
              <span
                className={
                  isOngoing(entry.period)
                    ? 'education-period ongoing'
                    : 'education-period'
                }
              >
                {formatPeriod(entry.period, language)}
              </span>
            </div>
            <p>
              {localize(entry.institution, language)} |{' '}
              {localize(entry.location, language)}
            </p>

            {/* Facts like grade or expected graduation. Numbers are grades and get formatted per language */}
            <dl className="education-facts">
              {entry.facts.map((fact) => (
                <div key={localize(fact.label, language)}>
                  <dt>{localize(fact.label, language)}</dt>
                  <dd>
                    {typeof fact.value === 'number'
                      ? formatGrade(fact.value, language)
                      : localize(fact.value, language)}
                  </dd>
                </div>
              ))}
            </dl>
            {/* The optional parts below only appear for degrees that have them */}
            {entry.courses && (
              <div className="education-courses">
                {entry.courses.map((course) => (
                  <span
                    key={localize(course, language)}
                    className="education-course"
                  >
                    {localize(course, language)}
                  </span>
                ))}
              </div>
            )}

            {entry.thesis && (
              <div className="education-thesis">
                <p>{t('education.thesis')}</p>
                <div className="education-module-header">
                  <span>{entry.thesis.title}</span>
                  <span>{formatGrade(entry.thesis.grade, language)}</span>
                </div>
              </div>
            )}

            {entry.modules && (
              <ul className="education-modules">
                {entry.modules.map((mod) => (
                  <li key={localize(mod.name, language)}>
                    <div className="education-module-header">
                      <span>{localize(mod.name, language)}</span>
                      <span>{formatGrade(mod.grade, language)}</span>
                    </div>
                    {mod.description && (
                      <p>{localize(mod.description, language)}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default Education
