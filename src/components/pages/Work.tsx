import './Work.css'

interface Job {
  role: string
  company: string
  location: string
  period: string
  type?: string
  tasks: string[]
  skills?: string[]
}

interface OtherJob {
  role: string
  company: string
  period: string
}

const jobs: Job[] = [
  {
    // TODO Add link to the study somehow?
    role: 'Research Assistant, SLEEPMUSIC Study',
    company: 'IPVS, University of Stuttgart',
    location: 'Stuttgart, Germany',
    period: 'Oct 2025 - Jul 2026',
    type: 'Student Research Assistant',
    tasks: [
      'Team member of the SLEEPMUSIC research study',
      'Data analysis and data cleaning',
      'Testing and co-developing the study software SLUMBER',
      'Creating support materials and supporting study participants',
    ],
    skills: ['Python', 'Data analysis', 'Software testing'],
  },
  {
    role: 'Software Developer (Polarion)',
    company: 'Swoboda Schorndorf KG',
    location: 'Schorndorf, Germany',
    period: 'Oct 2023 - Mar 2025',
    type: 'Working student',
    tasks: [
      'Wrote scripts and reports in the internal ALM platform Polarion',
      'Designed, developed and maintained a web server for data access',
      'Developed and documented new and legacy Java extensions for Polarion',
      'Onboarded new colleagues',
    ],
    skills: [
      'Java',
      'Polarion ALM',
      'HTML/JavaScript/CSS & Velocity',
      'Documentation',
    ],
  },
  {
    role: 'Teaching Assistant',
    company: 'University of Stuttgart (FMI & IPVS)',
    location: 'Stuttgart, Germany',
    period: 'Summer semester 2023',
    tasks: [
      'Led weekly tutorials for Theoretical Computer Science II and Data Structures and Algorithms',
      "Graded students' exercise sheets",
    ],
    skills: ['Teaching', 'Theoretical CS', 'Algorithms'],
  },
]

const otherJobs: OtherJob[] = [
  { role: 'Warehouse worker', company: 'Kübler', period: '2020 - 2021' },
  { role: 'Production worker (foundry)', company: 'Föhl', period: '2020' },
  {
    role: 'Summer jobs in production',
    company: 'Klingele Papierwerke',
    period: '2018, 2019',
  },
]

function Work() {
  return (
    <section className="work">
      <h1>Work</h1>

      <div className="work-list">
        {jobs.map((job) => (
          <article key={job.role} className="work-card">
            <div className="work-card-header">
              <h2>{job.role}</h2>
              <span className="work-period">{job.period}</span>
            </div>
            <p>
              {job.company} | {job.location}
              {job.type && <> | {job.type}</>}
            </p>

            <ul className="work-tasks">
              {job.tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>

            {job.skills && (
              <div className="work-skills">
                {job.skills.map((skill) => (
                  <span key={skill} className="work-skill">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
      {/* TODO maybe some description for other work */}
      <h2 className="work-other-title">Other work experience</h2>
      <ul className="work-other">
        {otherJobs.map((job) => (
          <li key={job.company}>
            <span>
              {job.role}, {job.company}
            </span>
            <span>{job.period}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Work
