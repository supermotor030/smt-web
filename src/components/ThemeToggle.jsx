import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useTheme } from '../context/ThemeContext'
import { LuSun, LuMoon } from 'react-icons/lu'

export default function ThemeToggle({ className = '' }) {
  const { toggleTheme, isDark } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative flex items-center justify-center w-10 h-10 rounded-full
        transition-colors duration-300 group
        ${isDark 
          ? 'bg-forge-800/50 hover:bg-forge-700/50 border border-steel-700/30' 
          : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'
        }
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Glow effect on hover */}
      <div 
        className={`
          absolute inset-0 rounded-full transition-all duration-300
          ${isDark 
            ? 'bg-gradient-to-r from-ignition-500/0 to-forge-500/0 group-hover:from-ignition-500/20 group-hover:to-forge-500/20' 
            : 'bg-gradient-to-r from-yellow-400/0 to-orange-400/0 group-hover:from-yellow-400/20 group-hover:to-orange-400/20'
          }
        `} 
        aria-hidden="true"
      />
      
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDark ? 0 : 180,
          scale: isDark ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <LuMoon className={`w-5 h-5 ${isDark ? 'text-steel-300' : 'text-gray-600'}`} />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{ 
          rotate: !isDark ? 0 : -180,
          scale: !isDark ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <LuSun className="w-5 h-5 text-ignition-500" />
      </motion.div>
    </motion.button>
  )
}

ThemeToggle.propTypes = {
  className: PropTypes.string,
}
