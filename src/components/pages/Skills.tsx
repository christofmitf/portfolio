import './Skills.css'
import skillsData from '../../data/skills.json'
import { useTranslation } from 'react-i18next'
import useLanguage from '../../hooks/useLanguage'
import { localize } from '../../lib/localize'
import type { SkillsData } from '../../types/skills'

const {
  programmingLanguages,
  tools,
  spokenLanguages,
  otherSkills,
}: SkillsData = skillsData

const maxLevel = 5

function Skills() {
  const { t } = useTranslation()
  const { language } = useLanguage()

  return (
    <section className="skills">
      <h1>{t('skills.title')}</h1>

      <h2 className="skills-label">{t('skills.programming')}</h2>
      <div className="skills-grid">
        {programmingLanguages.map((lang) => (
          <article key={lang.id} className="skills-card">
            <div className="skills-card-header">
              <span className="skills-name">
                {localize(lang.name, language)}
              </span>
              <span className="skills-dots">
                {Array.from({ length: maxLevel }, (_, i) => (
                  <span
                    key={i}
                    className={
                      i < lang.level ? 'skills-dot filled' : 'skills-dot'
                    }
                  />
                ))}
              </span>
            </div>
            <p>{localize(lang.note, language)}</p>
          </article>
        ))}
      </div>

      <h2 className="skills-label">{t('skills.tools')}</h2>
      <div className="skills-chips">
        {tools.map((tool) => (
          <span key={tool} className="skills-chip">
            {tool}
          </span>
        ))}
      </div>

      <div className="skills-columns">
        <div>
          <h2 className="skills-label">{t('skills.spoken')}</h2>
          <ul className="skills-spoken">
            {spokenLanguages.map((lang) => (
              <li key={lang.id}>
                <span>{localize(lang.name, language)}</span>
                <span>{localize(lang.level, language)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="skills-label">{t('skills.other')}</h2>
          <div className="skills-chips">
            {otherSkills.map((skill) => (
              <span key={localize(skill, language)} className="skills-chip">
                {localize(skill, language)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
