/**
 * Navigation bar shown on every page. NavLink marks the link of the
 * current page with the `active` class.
 */

import { Link, NavLink } from 'react-router'
import { pages, paths } from '../lib/navigation'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <Link to={paths.home} className="header-name">
        Christof Schuster
      </Link>
      <nav className="nav">
        {pages.map((p) => (
          // `end` so that Home ("/") isn't marked active on every page
          <NavLink key={p.id} to={paths[p.id]} end className="nav-link">
            {p.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Header
