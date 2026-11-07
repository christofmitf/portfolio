/**
 * Layout of every page: header, the current page and footer.
 *
 * Which page is shown depends on the URL (e.g. `#/work`), not on React state,
 * so reloading or sharing a link opens the same page.
 */

import './App.css'
import { Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import Footer from './components/Footer'
import Header from './components/Header'
import NotFound from './components/pages/NotFound'
import { pages, paths } from './lib/navigation'
import { pageComponents } from './routes'

function App() {
  const { pathname } = useLocation()

  // otherwise switching to a page while scrolled down keeps the scrolling state => unwanted
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Header />
      {/* tabIndex -1 so the skip link in the header can move the focus here */}
      <main id="main" tabIndex={-1}>
        {/* shows nothing while a lazy page is still loading, header and footer stay */}
        <Suspense fallback={null}>
          <Routes>
            {pages.map((id) => {
              const Page = pageComponents[id]
              return <Route key={id} path={paths[id]} element={<Page />} />
            })}
            {/* any URL that matches none of the pages above */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default App
