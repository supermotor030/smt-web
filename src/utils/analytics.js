/**
 * Analytics utility for tracking user interactions
 * Supports Google Analytics 4 (GA4) and custom events
 */

// Check if GA4 is available
const isGA4Available = () => typeof window !== 'undefined' && typeof window.gtag === 'function'

/**
 * Track a custom event
 * @param {string} eventName - Name of the event
 * @param {object} params - Event parameters
 */
export const trackEvent = (eventName, params = {}) => {
  // Log in development
  if (import.meta.env.DEV) {
    console.log(`[Analytics] Event: ${eventName}`, params)
  }

  // Send to GA4 if available
  if (isGA4Available()) {
    window.gtag('event', eventName, params)
  }
}

/**
 * Track button clicks
 * @param {string} buttonName - Name/label of the button
 * @param {string} location - Where the button is located
 */
export const trackButtonClick = (buttonName, location = 'unknown') => {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: location,
  })
}

/**
 * Track form submissions
 * @param {string} formName - Name of the form
 * @param {boolean} success - Whether submission was successful
 */
export const trackFormSubmission = (formName, success = true) => {
  trackEvent('form_submission', {
    form_name: formName,
    success: success,
  })
}

/**
 * Track WhatsApp interactions
 * @param {string} context - Where the WhatsApp click happened
 * @param {string} message - The pre-filled message (truncated)
 */
export const trackWhatsAppClick = (context, message = '') => {
  trackEvent('whatsapp_click', {
    click_context: context,
    message_preview: message.substring(0, 50),
  })
}

/**
 * Track phone calls
 * @param {string} context - Where the call was initiated
 */
export const trackPhoneCall = (context) => {
  trackEvent('phone_call', {
    call_context: context,
  })
}

/**
 * Track section views (for scroll tracking)
 * @param {string} sectionId - ID of the section viewed
 */
export const trackSectionView = (sectionId) => {
  trackEvent('section_view', {
    section_id: sectionId,
  })
}

/**
 * Track product interactions
 * @param {string} productName - Name of the product
 * @param {string} action - Action taken (view, inquire, etc.)
 */
export const trackProductInteraction = (productName, action) => {
  trackEvent('product_interaction', {
    product_name: productName,
    action: action,
  })
}

/**
 * Track brand clicks in Vehicles section
 * @param {string} brandName - Name of the brand clicked
 */
export const trackBrandClick = (brandName) => {
  trackEvent('brand_click', {
    brand_name: brandName,
  })
}

/**
 * Track FAQ interactions
 * @param {string} question - The FAQ question
 * @param {boolean} opened - Whether it was opened or closed
 */
export const trackFAQInteraction = (question, opened) => {
  trackEvent('faq_interaction', {
    question: question.substring(0, 100),
    action: opened ? 'opened' : 'closed',
  })
}

export default {
  trackEvent,
  trackButtonClick,
  trackFormSubmission,
  trackWhatsAppClick,
  trackPhoneCall,
  trackSectionView,
  trackProductInteraction,
  trackBrandClick,
  trackFAQInteraction,
}
