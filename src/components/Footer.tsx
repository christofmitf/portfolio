import "./Footer.css"

// TODO add icons
interface FooterLink {
    label: string
    href: string
}

const footerLinks: FooterLink[] = [
    { label: "GitHub", href: "https://github.com/christofmitf"},
    { label: "LinkedIn", href: "https://www.linkedin.com/in/christof-schuster-179431326/"},
    { label: "Email", href: "mailto:christof.schuster@gmx.de"}
]

const year  = new Date().getFullYear()

function Footer(){
    return (
        <footer className="footer">
            <div className="footer-info">
                <p>© {year} Christof Schuster</p>
                <p className="footer-built">Built with React, TypeScript & Vite</p>
            </div>
            <nav className="footer-links">
                {footerLinks.map((link)=>(
                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}
                    </a>
                ))}
            </nav>
        </footer>
    )
}

export default Footer