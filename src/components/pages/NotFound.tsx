/**
 * Shown for any URL that doesn't belong to a page, e.g. a mistyped link.
 */

import { Link } from 'react-router'
import { paths } from '../../lib/navigation'
import './NotFound.css'

function NotFound() {
  return (
    <section className="not-found">
      <h1>Page not found</h1>
      <p>This page doesn't exist (anymore).</p>
      <Link to={paths.home} className="button primary">
        Back to the home page
      </Link>
    </section>
  )
}

export default NotFound
