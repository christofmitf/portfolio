import './Home.css'
import type { PageId } from '../../lib/navigation'
import photo from '../../assets/cliffs.png'

interface HomeProps {
  onNavigate: (page: PageId) => void
}

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

function Home({ onNavigate }: HomeProps) {
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
            <button
              className="button primary"
              onClick={() => onNavigate('about')}
            >
              More about me
            </button>
            <button className="button" onClick={() => onNavigate('work')}>
              See my experience
            </button>
          </div>
        </div>
        <img src={photo} alt="Christof Schuster" className="home-photo" />
      </div>
      <h2 className="home-label">Overview</h2>
      <div className="home-overview">
        {previewCards.map((card) => (
          <article key={card.target} className="home-card">
            <p className="home-card-value">{card.value}</p>
            <p>{card.label}</p>
            <button
              className="home-card-link"
              onClick={() => onNavigate(card.target)}
            >
              {card.linkText} -&gt;
            </button>
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
