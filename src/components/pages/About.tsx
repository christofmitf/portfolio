import type { PageId } from '../../lib/navigation'
import './About.css'

interface AboutProps {
  onNavigate: (page: PageId) => void
}

interface Value {
  title: string
  text: string
}

const values: Value[] = [
  {
    title: 'Tangible results',
    text: 'I like seeing progress early. Getting a first version running quickly and then improving it step by step keeps me motivated.',
  },
  {
    title: 'Efficiency',
    text: 'Whether finding the optimal way of playing a game, optimizing processes or shaving time off of runtimes, efficiency is a word that I resonate with.',
  },
  {
    title: 'Explaining',
    text: 'Articulating knowledge is a skill that is difficult but very rewarding if done right. My tutoring jobs have taught me as much as I taught my students.',
  },
]

const hobbies: string[] = [
  'Board games',
  'Video games',
  'Badminton',
  'Darts',
  'Table tennis',
  'Football',
  'Basketball',
]

function About({ onNavigate }: AboutProps) {
  return (
    <section className="about">
      <h1>About me</h1>

      <div className="about-bio">
        <p>
          I have always loved puzzles and problem solving, from riddles and
          board games to computer games and real-life sports. An amazing
          computer science teacher at school turned that into a real interest
          and I have been enjoying Computer Science ever since.
        </p>
        <p>
          I studied Computer Science at the University of Stuttgart, where my
          bachelor's thesis on trace abstraction solidified my desire to fully
          understand programs. I am now doing my M.Sc. in Software Engineering
          there, currently with an ERASMUS semester at the University of
          Limerick in Ireland.
        </p>
        <p>
          After my ERASMUS semester, the master's thesis is the last step. I
          will most likely stay in program analysis for it as well. After that,
          from summer 2027, I am excited to finally work full-time in industry.
        </p>
      </div>

      <h2 className="about-label">What I enjoy</h2>
      <div className="about-values">
        {values.map((value) => (
          <article key={value.title} className="about-card">
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </article>
        ))}
      </div>

      <h2 className="about-label">Beyond code</h2>
      <div className="about-hobbies">
        {hobbies.map((hobby) => (
          <span key={hobby} className="about-chip">
            {hobby}
          </span>
        ))}
      </div>

      <div className="about-contact">
        <p className="about-contact-title">
          Looking for a software engineer from Summer 2027?
        </p>
        <div className="about-contact-actions">
          <a className="button primary" href="mailto:christof.schuster@gmx.de">
            Get in touch
          </a>
          <button className="button" onClick={() => onNavigate('work')}>
            See my experience
          </button>
        </div>
      </div>
    </section>
  )
}

export default About
