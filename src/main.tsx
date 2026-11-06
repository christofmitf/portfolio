import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* HashRouter keeps the page in the part after #, which GitHub Pages never sees, so reloads work */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
