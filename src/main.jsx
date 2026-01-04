import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/routes.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { RoleProvider } from './context/RoleContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RoleProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </RoleProvider>
    </AuthProvider>
  </StrictMode>,
)
