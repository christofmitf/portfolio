import { useTranslation } from 'react-i18next'
import './Projects.css'

function Projects() {
  const { t } = useTranslation()

  return (
    <section className="projects">
      <h1>{t('projects.title')}</h1>
      <p>{t('projects.comingSoon')}</p>
    </section>
  )
}

export default Projects
