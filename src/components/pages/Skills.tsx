import './Skills.css'

interface ProgrammingLanguage {
  name: string
  level: number
  note: string
}

interface SpokenLanguage {
  name: string
  level: string
}

const programmingLanguages: ProgrammingLanguage[] = [
  {
    name: 'Python',
    level: 5,
    note: 'Most confident | Data analysis, Machine learning, Uni projects',
  },
  {
    name: 'Java',
    level: 5,
    note: "Learned programming with it | Many uni projects, Bachelor's thesis, Work experience",
  },
  {
    name: 'Dart / Flutter',
    level: 4,
    note: 'Three larger uni projects | Private sandbox projects',
  },
  {
    name: 'Web (HTML, CSS, JS/TS)',
    level: 3,
    note: 'Uni projects | This website',
  },
  {
    name: 'Kotlin/Android',
    level: 3,
    note: 'One larger scale, very recent project',
  },
  { name: 'R', level: 2, note: 'Statistics course | No larger project yet' },
]

const tools: string[] = ['Git', 'LaTeX', 'Docker', 'Polarion', 'MemoQ']

const spokenLanguages: SpokenLanguage[] = [
  { name: 'German', level: 'Native' },
  { name: 'English', level: 'C1' },
  { name: 'Romanian', level: 'A1' },
]

const otherSkills: string[] = [
  'Teaching',
  'Onboarding',
  'Technical documentation',
  'Data analysis & cleansing',
  'Research',
  'Software internationalization',
]

const maxLevel = 5

function Skills() {
  return (
    <section className="skills">
      <h1>Skills</h1>

      <h2 className="skills-label">Programming languages</h2>
      <div className="skills-grid">
        {programmingLanguages.map((lang) => (
          <article key={lang.name} className="skills-card">
            <div className="skills-card-header">
              <span className="skills-name">{lang.name}</span>
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
            <p>{lang.note}</p>
          </article>
        ))}
      </div>

      <h2 className="skills-label">Frameworks & tools</h2>
      <div className="skills-chips">
        {tools.map((tool) => (
          <span key={tool} className="skills-chip">
            {tool}
          </span>
        ))}
      </div>

      <div className="skills-columns">
        <div>
          <h2 className="skills-label">Spoken languages</h2>
          <ul className="skills-spoken">
            {spokenLanguages.map((lang) => (
              <li key={lang.name}>
                <span>{lang.name}</span>
                <span>{lang.level}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="skills-label">Other skills</h2>
          <div className="skills-chips">
            {otherSkills.map((skill) => (
              <span key={skill} className="skills-chip">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
