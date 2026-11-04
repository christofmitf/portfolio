import { type PageId, pages } from '../lib/navigation'
import './Header.css'

type HeaderProps = {
  current: PageId
  onNavigate: (page: PageId) => void
}

function Header({ current, onNavigate }: HeaderProps) {
  return (
    <header className="header">
      <button className="header-name" onClick={() => onNavigate('home')}>
        Christof Schuster
      </button>
      <nav className="nav">
        {pages.map((p) => (
          <button
            key={p.id}
            onClick={() => onNavigate(p.id)}
            className={p.id === current ? 'nav-link active' : 'nav-link'}
          >
            {p.label}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Header
