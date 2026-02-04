import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { SeasonalProvider } from './context/SeasonalContext'
import { setupGlobalErrorHandlers } from './utils/errorTracking'

// Set up global error handlers for production monitoring
setupGlobalErrorHandlers()

const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error('Root element not found')
}

createRoot(rootElement).render(
    <StrictMode>
        <HelmetProvider>
            <SeasonalProvider>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </SeasonalProvider>
        </HelmetProvider>
    </StrictMode>,
)
