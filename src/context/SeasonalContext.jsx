import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'

const SeasonalContext = createContext()

// Seasonal theme configurations
const SEASONAL_THEMES = {
  christmas: {
    id: 'christmas',
    name: 'Christmas',
    startDate: '12-15',
    endDate: '12-26',
    snowfall: true,
  },
  newYear: {
    id: 'newYear',
    name: "New Year's",
    startDate: '12-27',
    endDate: '01-05',
    fireworks: true,
  },
  sinhalaTamil: {
    id: 'sinhalaTamil',
    name: 'Sinhala & Tamil New Year',
    startDate: '04-10',
    endDate: '04-20',
    lanterns: true,
  },
  vesak: {
    id: 'vesak',
    name: 'Vesak',
    startDate: '05-20',
    endDate: '05-26',
    lanterns: true,
  },
  default: {
    id: 'default',
    name: 'Default',
  },
}

// Check if current date is within a range (handles year wrap for new year)
function isDateInRange(startDate, endDate) {
  const now = new Date()
  const [startMonth, startDay] = startDate.split('-').map(Number)
  const [endMonth, endDay] = endDate.split('-').map(Number)
  
  // Use 1-indexed month for easier comparison (month * 100 + day)
  const currentMonthDay = (now.getMonth() + 1) * 100 + now.getDate()
  const startMonthDay = startMonth * 100 + startDay
  const endMonthDay = endMonth * 100 + endDay
  
  // Handle year wrap (e.g., Dec 27 to Jan 5)
  if (startMonthDay > endMonthDay) {
    return currentMonthDay >= startMonthDay || currentMonthDay <= endMonthDay
  }
  
  return currentMonthDay >= startMonthDay && currentMonthDay <= endMonthDay
}

// Get current seasonal theme
function getCurrentTheme() {
  for (const [key, theme] of Object.entries(SEASONAL_THEMES)) {
    if (key === 'default') continue
    if (theme.startDate && theme.endDate && isDateInRange(theme.startDate, theme.endDate)) {
      return theme
    }
  }
  return SEASONAL_THEMES.default
}

export function SeasonalProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme)
  const [effects, setEffects] = useState({
    snowfall: false,
    fireworks: false,
    lanterns: false,
  })

  useEffect(() => {
    const theme = getCurrentTheme()
    setCurrentTheme(theme)
    
    // Enable special effects
    setEffects({
      snowfall: theme.snowfall || false,
      fireworks: theme.fireworks || false,
      lanterns: theme.lanterns || false,
    })

    // Check every hour for theme changes
    const interval = setInterval(() => {
      const newTheme = getCurrentTheme()
      if (newTheme.id !== theme.id) {
        setCurrentTheme(newTheme)
      }
    }, 3600000)

    return () => clearInterval(interval)
  }, [])

  const value = useMemo(() => ({
    theme: currentTheme,
    effects,
    isHoliday: currentTheme.id !== 'default',
  }), [currentTheme, effects])

  return (
    <SeasonalContext.Provider value={value}>
      {children}
    </SeasonalContext.Provider>
  )
}

SeasonalProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useSeasonal() {
  const context = useContext(SeasonalContext)
  if (!context) {
    throw new Error('useSeasonal must be used within a SeasonalProvider')
  }
  return context
}

export { SEASONAL_THEMES }
