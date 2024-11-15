import BrowserApp from '@renderer/app/browser/App'
import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserApp />
  </React.StrictMode>
)
