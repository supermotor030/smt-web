/**
 * Error tracking utility for production monitoring
 * Replace the reportToService function with your error tracking service
 * (e.g., Sentry, LogRocket, Bugsnag)
 */

const isDevelopment = import.meta.env.DEV

/**
 * Report error to external service
 * @param {Object} errorData - Error data object
 */
const reportToService = async (errorData) => {
  // TODO: Replace with actual error tracking service
  // Example with Sentry:
  // Sentry.captureException(errorData.error, {
  //   tags: errorData.tags,
  //   extra: errorData.context,
  // })
  
  // For now, just log to console in production
  if (!isDevelopment) {
    console.error('[Error Tracker]', errorData)
  }
}

/**
 * Track an error with context
 * @param {Error} error - The error object
 * @param {Object} context - Additional context
 */
export const trackError = (error, context = {}) => {
  const errorData = {
    error,
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    context,
    tags: {
      environment: isDevelopment ? 'development' : 'production',
    },
  }

  if (isDevelopment) {
    console.error('[Dev Error]', errorData)
  } else {
    reportToService(errorData)
  }

  return errorData
}

/**
 * Track a custom event
 * @param {string} eventName - Name of the event
 * @param {Object} properties - Event properties
 */
export const trackEvent = (eventName, properties = {}) => {
  const eventData = {
    event: eventName,
    properties,
    timestamp: new Date().toISOString(),
    url: window.location.href,
  }

  if (isDevelopment) {
    console.log('[Dev Event]', eventData)
  } else {
    // Send to analytics service
    if (window.gtag) {
      window.gtag('event', eventName, properties)
    }
  }

  return eventData
}

/**
 * Track page view
 * @param {string} pageName - Name of the page
 */
export const trackPageView = (pageName) => {
  trackEvent('page_view', { page: pageName })
}

/**
 * Track user interaction
 * @param {string} action - Action type (click, submit, etc.)
 * @param {string} category - Category of the element
 * @param {string} label - Label for the interaction
 */
export const trackInteraction = (action, category, label) => {
  trackEvent(action, { category, label })
}

/**
 * Set up global error handlers
 */
export const setupGlobalErrorHandlers = () => {
  // Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    trackError(new Error(event.reason), {
      type: 'unhandledrejection',
    })
  })

  // Catch global errors
  window.addEventListener('error', (event) => {
    trackError(event.error || new Error(event.message), {
      type: 'global',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    })
  })
}

export default {
  trackError,
  trackEvent,
  trackPageView,
  trackInteraction,
  setupGlobalErrorHandlers,
}
