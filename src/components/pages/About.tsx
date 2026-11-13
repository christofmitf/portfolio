/**
 * About page: bio, what I enjoy in my work, hobbies and a contact box.
 * All texts come from the translations (`about.*`).
 */

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { emailUrl } from '../../lib/contact'
import { paths } from '../../lib/navigation'
import './About.css'

// The texts are in the translations (about.values.* and about.hobbies.*), these only set the order
const values = ['results', 'efficiency', 'explaining'] as const

const hobbies = [
  'boardGames',
  'videoGames',
  'badminton',
  'darts',
  'tableTennis',
  'football',
  'basketball',
] as const

function About() {
  const { t } = useTranslation()

  return (
    <section className="about">
      <h1>{t('about.title')}</h1>

      {/* Bio */}
      <div className="about-bio">
        <p>{t('about.bio1')}</p>
        <p>{t('about.bio2')}</p>
        <p>{t('about.bio3')}</p>
      </div>

      {/* What I enjoy in my work */}
      <h2 className="about-label">{t('about.enjoyTitle')}</h2>
      <div className="about-values">
        {values.map((value) => (
          <article key={value} className="about-card">
            <h3>{t(`about.values.${value}.title`)}</h3>
            <p>{t(`about.values.${value}.text`)}</p>
          </article>
        ))}
      </div>

      {/* Hobbies */}
      <h2 className="about-label">{t('about.hobbiesTitle')}</h2>
      <div className="about-hobbies">
        {hobbies.map((hobby) => (
          <span key={hobby} className="about-chip">
            {t(`about.hobbies.${hobby}`)}
          </span>
        ))}
      </div>

      {/* Contact box: email and a link to the work experience */}
      <div className="about-contact">
        <p className="about-contact-title">{t('about.contactTitle')}</p>
        <div className="about-contact-actions">
          <a className="button primary" href={emailUrl}>
            {t('about.getInTouch')}
          </a>
          <Link to={paths.work} className="button">
            {t('about.seeExperience')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default About
