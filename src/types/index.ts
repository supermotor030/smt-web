/// <reference types="vite/client" />

// Site Data Types
export interface Company {
  name: string
  tagline: string
  subTagline: string
  established: number
  yearsInBusiness: number
}

export interface Contact {
  address: string
  storePhone: string
  mobile: string
  whatsapp: string
  whatsappLink: string
  email: string
  facebook: string
  callLink: string
  emailLink: string
  mapsEmbed: string
  mapsLink: string
}

export interface DaySchedule {
  day: string
  open: number
  close: number
}

export interface BusinessHours {
  days: string
  daysShort: string
  time: string
  timezone: string
  schedule: DaySchedule[]
}

export interface NavLink {
  id: string
  label: string
  href: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
  color: string
  description: string
}

export interface Product {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  description: string
  tagline: string
  items: string[]
  popular: string[]
}

export interface VehicleBrandCategory {
  label: string
  flag: string
  gradient: string
  brands: string[]
}

export interface VehicleBrands {
  japanese: VehicleBrandCategory
  european: VehicleBrandCategory
  indian: VehicleBrandCategory
}

export interface Feature {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  description: string
}

export interface Testimonial {
  id: number
  name: string
  role: string
  quote: string
  rating: number
  avatar: string
}

export interface FAQ {
  id: number
  question: string
  answer: string
}

export interface TrustBadge {
  icon: React.ComponentType<{ className?: string }>
  text: string
}

export interface FloatingPart {
  icon: React.ComponentType<{ className?: string }>
  size: number
  delay: number
}

// Hook Types
export interface BusinessHoursStatus {
  isOpen: boolean
  message: string
  timeUntilChange: number
  currentHour: number
  currentDay: string
  todaySchedule: DaySchedule
  formattedTime: string
}

// Component Props Types
export interface SectionLoaderProps {
  height?: string
}

export interface OpenClosedStatusProps {
  compact?: boolean
}

export interface ThemeToggleProps {
  className?: string
}

export interface NavbarProps {
  onMenuToggle: () => void
  isMenuOpen: boolean
  onLogoClick?: () => void
}

export interface MobileMenuProps {
  onClose: () => void
}

export interface ProductsProps {
  onProductSelect: (product: Product) => void
}

export interface ProductModalProps {
  product: Product
  onClose: () => void
}

// Animation Types
export interface AnimationVariants {
  hidden: object
  visible: object
}

// Theme Types
export type Theme = 'dark' | 'light'

export interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  isDark: boolean
  isLight: boolean
}

// Seasonal Types
export type Season = 'christmas' | 'new-year' | 'vesak' | 'sinhala-tamil-new-year' | null

export interface SeasonalContextValue {
  currentSeason: Season
  isSeasonalBannerVisible: boolean
  dismissBanner: () => void
}
