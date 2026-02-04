import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LuChevronUp } from 'react-icons/lu'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-40 lg:bottom-6 right-4 lg:right-24 z-30 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-forge-800/90 backdrop-blur-sm border border-steel-600/30 shadow-lg flex items-center justify-center text-ignition-500 hover:bg-ignition-600 hover:text-white hover:border-ignition-500 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <LuChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
