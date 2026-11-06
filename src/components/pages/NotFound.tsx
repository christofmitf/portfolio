/**
 * Shown for any URL that doesn't belong to a page, e.g. a mistyped link.
 */

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { paths } from '../../lib/navigation'
import './NotFound.css'

function NotFound() {
  const { t } = useTranslation()

  return (
    <section className="not-found">
      <h1>{t('notFound.title')}</h1>
      <p>{t('notFound.text')}</p>
      <Link to={paths.home} className="button primary">
        {t('notFound.back')}
      </Link>
    </section>
  )
}

export default NotFound
