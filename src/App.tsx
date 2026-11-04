import './App.css'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Education from './components/pages/Education'
import Projects from './components/pages/Projects'
import Skills from './components/pages/Skills'
import Work from './components/pages/Work'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import type { PageId } from './lib/navigation'

function App() {
  const [page, setPage] = useState<PageId>('home')

  // otherwise switching to a page while scrolled down keeps the scrolling state => unwanted
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home onNavigate={setPage} />
      case 'about':
        return <About onNavigate={setPage} />
      case 'education':
        return <Education />
      case 'projects':
        return <Projects />
      case 'skills':
        return <Skills />
      case 'work':
        return <Work />
    }
  }

  return (
    <>
      <Header current={page} onNavigate={setPage} />
      <main>{renderPage()}</main>
      <Footer />
    </>
  )
}

export default App
