/**
 * Navigation bar shown on every page. NavLink marks the link of the
 * current page with the `active` class.
 *
 * On small screens the links don't fit next to each other, so they are hidden
 * behind a menu button and open as a dropdown below the header.
 */

import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router'
import { pages, paths } from '../lib/navigation'
import './Header.css'
import LanguageSwitch from './LanguageSwitch'

function Header() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  // Escape closes the menu and puts the focus back on the button, like in a native dropdown
  useEffect(() => {
    if (!menuOpen) {
      return
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="header">
      {/* With the HashRouter, "#main" would be read as a page URL, so the focus is moved by hand */}
      <a
        href="#main"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main')?.focus()
        }}
      >
        {t('header.skipToContent')}
      </a>
      <Link to={paths.home} className="header-name">
        Christof Schuster
      </Link>
      <div className="header-actions">
        <nav id="main-nav" className={menuOpen ? 'nav open' : 'nav'}>
          {pages.map((id) => (
            // `end` so that Home ("/") isn't marked active on every page
            <NavLink
              key={id}
              to={paths[id]}
              end
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {t(`nav.${id}`)}
            </NavLink>
          ))}
        </nav>
        <LanguageSwitch />
        <button
          ref={menuButton}
          type="button"
          className="menu-button"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label={t(menuOpen ? 'header.closeMenu' : 'header.openMenu')}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  )
}

export default Header
