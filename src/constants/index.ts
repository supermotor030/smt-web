// Animation constants
export const ANIMATION = {
  DURATION: {
    FAST: 0.3,
    DEFAULT: 0.6,
    SLOW: 1,
  },
  EASE: {
    DEFAULT: [0.22, 1, 0.36, 1],
    EASE_OUT: 'easeOut',
    EASE_IN_OUT: 'easeInOut',
  },
  STAGGER: {
    FAST: 0.05,
    DEFAULT: 0.1,
    SLOW: 0.2,
  },
}

// Breakpoints (should match tailwind.config.js)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
}

// Media queries
export const MEDIA_QUERIES = {
  MOBILE: '(max-width: 767px)',
  TABLET: '(min-width: 768px) and (max-width: 1023px)',
  DESKTOP: '(min-width: 1024px)',
  REDUCED_MOTION: '(prefers-reduced-motion: reduce)',
}

// Z-index layers
export const Z_INDEX = {
  BACKGROUND: -1,
  DEFAULT: 0,
  DROPDOWN: 10,
  STICKY: 20,
  FIXED: 30,
  MODAL_BACKDROP: 40,
  MODAL: 50,
  POPOVER: 60,
  TOOLTIP: 70,
  CURSOR: 9999,
  TURBO_BADGE: 100,
}

// Timing
export const TIMING = {
  DEBOUNCE: 300,
  THROTTLE: 100,
  TOAST_DURATION: 5000,
  TURBO_MODE_DURATION: 5000,
  KONAMI_EFFECT_DURATION: 10000,
  LOGO_CLICKS_FOR_TURBO: 5,
}

// Intersection Observer defaults
export const INTERSECTION_OBSERVER = {
  THRESHOLD: 0.1,
  ROOT_MARGIN: '0px',
  TRIGGER_ONCE: true,
}

// Form validation
export const VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 500,
  PHONE_PATTERN: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
}

// External links
export const EXTERNAL_LINKS = {
  GOOGLE_MAPS: 'https://maps.google.com/?q=Super+Motor+Trading+Kadawatha',
}

// Image dimensions (for CLS optimization)
export const IMAGE_DIMENSIONS = {
  LOGO: { width: 40, height: 40 },
  PRODUCT_ICON: { width: 48, height: 48 },
  HERO_BACKGROUND: { width: 1920, height: 1080 },
}

// Scroll behavior
export const SCROLL = {
  OFFSET: 80, // Navbar height
  BEHAVIOR: 'smooth',
}

// Colors (reference - should match tailwind.config.js)
export const COLORS = {
  IGNITION: {
    600: '#FF5500',
    500: '#FF6A1A',
  },
  WHATSAPP: '#25D366',
  SUCCESS: '#22C55E',
  ERROR: '#EF4444',
}
