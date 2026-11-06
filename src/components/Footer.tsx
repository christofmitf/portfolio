import { useTranslation } from 'react-i18next'
import './Footer.css'

// TODO add icons
interface FooterLink {
  /** key of the label in the translations (footer.*) */
  id: 'github' | 'linkedin' | 'email'
  href: string
}

const footerLinks: FooterLink[] = [
  { id: 'github', href: 'https://github.com/christofmitf' },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/christof-schuster-179431326/',
  },
  { id: 'email', href: 'mailto:christof.schuster@gmx.de' },
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
            target="_blank"
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
