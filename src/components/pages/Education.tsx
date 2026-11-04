import './Education.css'

interface Module {
  name: string
  grade: string
  description?: string
}

interface EducationEntry {
  degree: string
  institution: string
  location: string
  period: string
  ongoing?: boolean
  facts: { label: string; value: string }[]
  thesis?: { title: string; grade: string } // TODO Institute?
  modules?: Module[]
  courses?: string[]
}

const educationEntries: EducationEntry[] = [
  {
    degree: 'M.Sc. Software Engineering',
    institution: 'University of Stuttgart',
    location: 'Stuttgart, Germany',
    period: 'Oct 2025 - present',
    ongoing: true,
    facts: [
      { label: 'Current average', value: '1.5' },
      { label: 'Expected graduation', value: 'Summer 2027' },
    ],
    modules: [
      {
        name: 'Program verification',
        grade: '1.0',
        description:
          'Introduction to formally proving that programs behave correctly. Starting from propositional and first-order logic and SMT solving, the course covered deductive verification with the Hoare calculus, bounded model checking, CEGAR, abstract interpretation, and termination analysis.',
      },
      {
        name: 'Development project',
        grade: '1.3',
        description:
          'In a team of six, I mainly developed the AI model and the Flutter app of an automatic darts scoring system. The model was trained on a synthetic dataset rendered in Blender and calculates scores from photos of the dartboard.',
      },
    ],
  },
  {
    degree: 'ERASMUS Semester',
    institution: 'University of Limerick',
    location: 'Limerick, Ireland',
    period: 'Sep 2026 - Dec 2026',
    ongoing: true,
    facts: [{ label: 'Program', value: 'ERASMUS+ exchange during my M.Sc.' }],
    courses: [
      'SE Evolution',
      'SE Development Paradigms',
      'Language Engineering & Translation Technology',
      'Best Practices: Software Internationalization',
    ],
  },
  {
    degree: 'B.Sc. Computer Science',
    institution: 'University of Stuttgart',
    location: 'Stuttgart, Germany',
    period: 'Oct 2021 - Oct 2025',
    facts: [{ label: 'Final grade', value: '1.9' }],
    thesis: { title: 'Data flow graph guided trace abstraction', grade: '1.0' },
    modules: [
      { name: 'Programming paradigms', grade: '1.0' },
      { name: 'Information Retrieval and Text Mining', grade: '1.3' },
    ],
  },
  {
    degree: 'Abitur',
    institution: 'Max-Planck-Gymnasium',
    location: 'Schorndorf, Germany',
    period: '2012 - 2020',
    facts: [{ label: 'Final grade', value: '2.0' }],
  },
]

function Education() {
  return (
    <section className="education">
      <h1>Education</h1>
      <p className="education-intro">
        Grades use the German scale: 1.0 is the best, 4.0 the lowest passing
        grade.
      </p>

      <div className="education-list">
        {educationEntries.map((entry) => (
          <article key={entry.degree} className="education-card">
            <div className="education-card-header">
              <h2>{entry.degree}</h2>
              <span
                className={
                  entry.ongoing
                    ? 'education-period ongoing'
                    : 'education-period'
                }
              >
                {entry.period}
              </span>
            </div>
            <p>
              {entry.institution} | {entry.location}
            </p>

            <dl className="education-facts">
              {entry.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            {entry.courses && (
              <div className="education-courses">
                {entry.courses.map((course) => (
                  <span key={course} className="education-course">
                    {course}
                  </span>
                ))}
              </div>
            )}

            {entry.thesis && (
              <div className="education-thesis">
                <p>Thesis</p>
                <div className="education-module-header">
                  <span>{entry.thesis.title}</span>
                  <span>{entry.thesis.grade}</span>
                </div>
              </div>
            )}

            {entry.modules && (
              <ul className="education-modules">
                {entry.modules.map((mod) => (
                  <li key={mod.name}>
                    <div className="education-module-header">
                      <span>{mod.name}</span>
                      <span>{mod.grade}</span>
                    </div>
                    {mod.description && <p>{mod.description}</p>}
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
