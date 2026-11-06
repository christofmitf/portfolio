import './Home.css'
import { Link } from 'react-router'
import { paths, type PageId } from '../../lib/navigation'
import photo from '../../assets/cliffs.webp'

interface PreviewCard {
  value: string
  label: string
  linkText: string
  target: PageId
}

// TODO Projects card later
const previewCards: PreviewCard[] = [
  {
    value: '3',
    label: 'CS jobs so far',
    linkText: 'Work experience',
    target: 'work',
  },
  {
    value: 'M.Sc.',
    label: 'Software Engineering, University of Stuttgart',
    linkText: 'Education',
    target: 'education',
  },
  {
    value: 'Python, Java, Flutter',
    label: 'Main languages',
    linkText: 'All skills',
    target: 'skills',
  },
]

function Home() {
  return (
    <section className="home">
      <div className="home-intro">
        <div className="home-text">
          <p className="home-overline">
            M.Sc. Software Engineering | University of Stuttgart
          </p>
          <h1>Hi, I'm Christof.</h1>
          <p className="home-tagline">
            I like computers, software, science and games.
          </p>
          <div className="home-actions">
            <Link to={paths.about} className="button primary">
              More about me
            </Link>
            <Link to={paths.work} className="button">
              See my experience
            </Link>
          </div>
        </div>
        {/* width and height reserve the space before the image has loaded */}
        <img
          src={photo}
          alt="Christof Schuster at the Cliffs of Moher, Ireland"
          width={900}
          height={1125}
          className="home-photo"
        />
      </div>
      <h2 className="home-label">Overview</h2>
      <div className="home-overview">
        {previewCards.map((card) => (
          <article key={card.target} className="home-card">
            <p className="home-card-value">{card.value}</p>
            <p>{card.label}</p>
            <Link to={paths[card.target]} className="home-card-link">
              {card.linkText} -&gt;
            </Link>
          </article>
        ))}
      </div>
      <p className="home-now">
        <span className="home-now-dot" />
        Currently on an ERASMUS semester at the University of Limerick, Ireland.
      </p>
    </section>
  )
}

export default Home
