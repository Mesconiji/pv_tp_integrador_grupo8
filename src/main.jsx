import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import routes from './routes/routes'
import { UsuarioProvider } from './context/UsuarioContext'
import './css/indexstyle.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsuarioProvider>
      <RouterProvider router={routes} />
    </UsuarioProvider>
  </StrictMode>,
)