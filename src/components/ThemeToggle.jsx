import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { LuSun, LuMoon } from 'react-icons/lu'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative flex items-center justify-center w-10 h-10 rounded-full
        bg-void-800/50 hover:bg-void-700/50 border border-steel-700/30
        transition-colors duration-300 group
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-ignition-500/0 to-forge-500/0 group-hover:from-ignition-500/20 group-hover:to-forge-500/20 transition-all duration-300" />
      
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === 'dark' ? 0 : 180,
          scale: theme === 'dark' ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <LuMoon className="w-5 h-5 text-steel-400" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === 'light' ? 0 : -180,
          scale: theme === 'light' ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <LuSun className="w-5 h-5 text-ignition-400" />
      </motion.div>
    </motion.button>
  )
}
