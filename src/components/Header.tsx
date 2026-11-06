/**
 * Navigation bar shown on every page. NavLink marks the link of the
 * current page with the `active` class.
 */

import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router'
import { pages, paths } from '../lib/navigation'
import './Header.css'
import LanguageSwitch from './LanguageSwitch'

function Header() {
  const { t } = useTranslation()

  return (
    <header className="header">
      <Link to={paths.home} className="header-name">
        Christof Schuster
      </Link>
      <div className="header-actions">
        <nav className="nav">
          {pages.map((id) => (
            // `end` so that Home ("/") isn't marked active on every page
            <NavLink key={id} to={paths[id]} end className="nav-link">
              {t(`nav.${id}`)}
            </NavLink>
          ))}
        </nav>
        <LanguageSwitch />
      </div>
    </header>
  )
}

export default Header
