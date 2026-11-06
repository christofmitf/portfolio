import './Home.css'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { paths, type PageId } from '../../lib/navigation'
import photo from '../../assets/cliffs.webp'

/** The big value is the same in every language, label and link text are translated (home.cards.*) */
interface PreviewCard {
  value: string
  target: Extract<PageId, 'work' | 'education' | 'skills'>
}

// TODO Projects card later
const previewCards: PreviewCard[] = [
  { value: '3', target: 'work' },
  { value: 'M.Sc.', target: 'education' },
  { value: 'Python, Java, Flutter', target: 'skills' },
]

function Home() {
  const { t } = useTranslation()

  return (
    <section className="home">
      <div className="home-intro">
        <div className="home-text">
          <p className="home-overline">{t('home.overline')}</p>
          <h1>{t('home.greeting')}</h1>
          <p className="home-tagline">{t('home.tagline')}</p>
          <div className="home-actions">
            <Link to={paths.about} className="button primary">
              {t('home.moreAboutMe')}
            </Link>
            <Link to={paths.work} className="button">
              {t('home.seeExperience')}
            </Link>
          </div>
        </div>
        {/* width and height reserve the space before the image has loaded */}
        <img
          src={photo}
          alt={t('home.photoAlt')}
          width={900}
          height={1125}
          className="home-photo"
        />
      </div>
      <h2 className="home-label">{t('home.overview')}</h2>
      <div className="home-overview">
        {previewCards.map((card) => (
          <article key={card.target} className="home-card">
            <p className="home-card-value">{card.value}</p>
            <p>{t(`home.cards.${card.target}.label`)}</p>
            <Link to={paths[card.target]} className="home-card-link">
              {t(`home.cards.${card.target}.link`)} -&gt;
            </Link>
          </article>
        ))}
      </div>
      <p className="home-now">
        <span className="home-now-dot" />
        {t('home.status')}
      </p>
    </section>
  )
}

export default Home
