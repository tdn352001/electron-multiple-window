import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import NodeApp from './app/node/App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NodeApp />
  </React.StrictMode>
)
