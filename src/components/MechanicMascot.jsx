import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { GiSpanner } from 'react-icons/gi'
import useMediaQuery from '../hooks/useMediaQuery'
import useReducedMotion from '../hooks/useReducedMotion'

// Mechanic mascot states based on scroll and interaction
const MASCOT_STATES = {
  IDLE: 'idle',
  WAVING: 'waving',
  WORKING: 'working',
  EXCITED: 'excited',
  SLEEPING: 'sleeping',
}

// Speech bubbles for different sections
const SPEECH_BUBBLES = {
  home: "Welcome! 👋 Need parts?",
  about: "We've got experience! 💪",
  products: "Check out our parts! 🔧",
  'why-us': "Quality guaranteed! ⭐",
  vehicles: "All brands covered! 🚗",
  testimonials: "Happy customers! 😊",
  faq: "Got questions? 🤔",
  contact: "Let's chat! 📞",
}

export default function MechanicMascot() {
  const [state, setState] = useState(MASCOT_STATES.IDLE)
  const [speech, setSpeech] = useState('')
  const [isVisible] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [idleTime, setIdleTime] = useState(0)
  
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const prefersReducedMotion = useReducedMotion()
  useScroll()
  
  // Track current section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'products', 'why-us', 'vehicles', 'testimonials', 'faq', 'contact']
      
      for (const sectionId of sections.reverse()) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200) {
            setSpeech(SPEECH_BUBBLES[sectionId])
            setState(MASCOT_STATES.WORKING)
            setIdleTime(0)
            return
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Idle timer - mascot falls asleep after 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIdleTime(prev => prev + 1)
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  useEffect(() => {
    if (idleTime > 30) {
      setState(MASCOT_STATES.SLEEPING)
    } else if (idleTime > 15) {
      setState(MASCOT_STATES.IDLE)
    }
  }, [idleTime])
  
  // Wake up on user interaction
  useEffect(() => {
    const handleInteraction = () => {
      setIdleTime(0)
      setState(MASCOT_STATES.WAVING)
      setTimeout(() => setState(MASCOT_STATES.IDLE), 2000)
    }
    
    window.addEventListener('mousemove', handleInteraction, { passive: true })
    window.addEventListener('touchstart', handleInteraction, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
    }
  }, [])
  
  // Don't show on mobile or if reduced motion preferred
  if (!isDesktop || prefersReducedMotion) {
    return null
  }
  
  // Mascot expressions based on state
  const getExpression = () => {
    switch (state) {
      case MASCOT_STATES.SLEEPING:
        return { eyes: '- -', mouth: '~' }
      case MASCOT_STATES.WAVING:
        return { eyes: '^ ^', mouth: 'D' }
      case MASCOT_STATES.EXCITED:
        return { eyes: '★ ★', mouth: 'O' }
      case MASCOT_STATES.WORKING:
        return { eyes: '• •', mouth: 'o' }
      default:
        return { eyes: '• •', mouth: '‿' }
    }
  }
  
  const expression = getExpression()
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed bottom-28 right-4 z-40"
        >
          {/* Minimized state */}
          {isMinimized ? (
            <motion.button
              onClick={() => setIsMinimized(false)}
              className="w-12 h-12 bg-ignition-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Show mascot"
            >
              <GiSpanner className="w-6 h-6 text-white" />
            </motion.button>
          ) : (
            <div className="relative">
              {/* Speech bubble */}
              <AnimatePresence mode="wait">
                {speech && state !== MASCOT_STATES.SLEEPING && (
                  <motion.div
                    key={speech}
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                    className="absolute -top-16 right-0 bg-white text-forge-900 px-4 py-2 rounded-xl shadow-lg text-sm font-semibold whitespace-nowrap"
                  >
                    {speech}
                    <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* ZZZ for sleeping */}
              {state === MASCOT_STATES.SLEEPING && (
                <motion.div
                  className="absolute -top-8 right-0 text-2xl"
                  animate={{ y: [-2, 2, -2], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💤
                </motion.div>
              )}
              
              {/* Mascot body */}
              <motion.div
                className="relative cursor-pointer"
                onClick={() => {
                  setState(MASCOT_STATES.EXCITED)
                  setIdleTime(0)
                  setTimeout(() => setState(MASCOT_STATES.IDLE), 2000)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Main body */}
                <motion.div
                  className="w-20 h-24 bg-gradient-to-b from-ignition-500 to-ignition-600 rounded-t-3xl rounded-b-xl relative shadow-lg overflow-hidden"
                  animate={
                    state === MASCOT_STATES.WORKING 
                      ? { rotate: [-2, 2, -2] } 
                      : state === MASCOT_STATES.SLEEPING
                      ? { y: [0, 2, 0] }
                      : {}
                  }
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  {/* Hard hat */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-warning rounded-t-full">
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-warning/80" />
                  </div>
                  
                  {/* Face */}
                  <div className="mt-8 text-center">
                    {/* Eyes */}
                    <motion.div 
                      className="text-lg font-bold text-white mb-0.5"
                      animate={state === MASCOT_STATES.WAVING ? { scaleY: [1, 0.3, 1] } : {}}
                      transition={{ duration: 0.3, repeat: state === MASCOT_STATES.WAVING ? 2 : 0 }}
                    >
                      {expression.eyes}
                    </motion.div>
                    {/* Mouth */}
                    <div className="text-lg font-bold text-white">
                      {expression.mouth}
                    </div>
                  </div>
                  
                  {/* Overalls */}
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-blue-600">
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-steel-300 rounded-full" />
                    <div className="absolute top-4 left-2 w-6 h-5 bg-blue-700 rounded-sm" />
                    <div className="absolute top-4 right-2 w-6 h-5 bg-blue-700 rounded-sm" />
                  </div>
                  
                  {/* Tool in pocket */}
                  <div className="absolute bottom-2 left-3">
                    <GiSpanner className="w-3 h-3 text-steel-300 rotate-45" />
                  </div>
                </motion.div>
                
                {/* Arm waving */}
                {state === MASCOT_STATES.WAVING && (
                  <motion.div
                    className="absolute -right-4 top-10 w-4 h-10 bg-ignition-500 rounded-full origin-top"
                    animate={{ rotate: [0, 30, -10, 30, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    {/* Hand */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#F5D0C5] rounded-full" />
                  </motion.div>
                )}
                
                {/* Working arm with wrench */}
                {state === MASCOT_STATES.WORKING && (
                  <motion.div
                    className="absolute -left-6 top-12 origin-right"
                    animate={{ rotate: [-20, 20, -20] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <div className="w-4 h-8 bg-ignition-500 rounded-full" />
                    <GiSpanner className="absolute -bottom-2 -left-1 w-5 h-5 text-steel-400 -rotate-45" />
                  </motion.div>
                )}
              </motion.div>
              
              {/* Minimize button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsMinimized(true)
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-forge-800 rounded-full text-white text-xs hover:bg-forge-700 transition-colors flex items-center justify-center"
                aria-label="Minimize mascot"
              >
                ×
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
