/**
 * Footer shown on every page with the copyright and links to GitHub,
 * LinkedIn and email. Kept as text links, they are clearer than icons alone.
 */

import { useTranslation } from 'react-i18next'
import { emailUrl, linkedinUrl } from '../lib/contact'
import { githubProfileUrl } from '../lib/github'
import './Footer.css'

interface FooterLink {
  /** key of the label in the translations (footer.*) */
  id: 'github' | 'linkedin' | 'email'
  href: string
}

const footerLinks: FooterLink[] = [
  { id: 'github', href: githubProfileUrl },
  { id: 'linkedin', href: linkedinUrl },
  { id: 'email', href: emailUrl },
]

const year = new Date().getFullYear()

function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="footer-info">
        <p>© {year} Christof Schuster</p>
        <p className="footer-built">{t('footer.builtWith')}</p>
      </div>
      <nav className="footer-links">
        {footerLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            // email opens the mail program, a new tab would only stay empty
            target={link.id === 'email' ? undefined : '_blank'}
            rel="noopener noreferrer"
          >
            {t(`footer.${link.id}`)}
          </a>
        ))}
      </nav>
    </footer>
  )
}

export default Footer
