import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { SeasonalProvider } from './context/SeasonalContext.jsx'
import { setupGlobalErrorHandlers } from './utils/errorTracking.js'

// Set up global error handlers for production monitoring
setupGlobalErrorHandlers()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <SeasonalProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </SeasonalProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
)
