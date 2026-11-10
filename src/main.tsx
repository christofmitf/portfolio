/**
 * Entry point: loads the global styles and the translations, then mounts the
 * app inside the router into the `#root` element of `index.html`.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import './index.css'
import './i18n'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* HashRouter keeps the page in the part after #, which GitHub Pages never sees, so reloads work */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
