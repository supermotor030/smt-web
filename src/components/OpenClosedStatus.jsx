import { motion } from 'framer-motion'
import useBusinessHours from '../hooks/useBusinessHours'

export default function OpenClosedStatus({ compact = false }) {
  const { isOpen, message } = useBusinessHours()

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <motion.div
          className={`w-2 h-2 rounded-full ${isOpen ? 'bg-success' : 'bg-steel-600'}`}
          animate={isOpen ? { 
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1]
          } : {}}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <span className={`font-tech text-xs font-semibold uppercase tracking-wide ${isOpen ? 'text-success' : 'text-steel-600'}`}>
          {isOpen ? 'Open' : 'Closed'}
        </span>
      </div>
    )
  }

  return (
    <motion.div
      className="relative perspective-1000"
      initial={{ rotateX: -90 }}
      animate={{ rotateX: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Chain decoration */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-steel-600" />
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-steel-600" />

      {/* Sign */}
      <div
        className={`
          relative px-4 py-2 rounded-lg flex items-center gap-3
          transition-all duration-300
          ${isOpen 
            ? 'bg-success text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
            : 'bg-steel-600 text-white'
          }
        `}
      >
        {/* Pulsing dot */}
        <motion.div
          className={`w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-white' : 'bg-steel-400'}`}
          animate={isOpen ? {
            scale: [1, 1.3, 1],
            opacity: [1, 0.7, 1],
          } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Text */}
        <div className="flex flex-col">
          <span className="font-tech font-bold text-sm uppercase tracking-wider">
            {isOpen ? "We're Open" : 'Closed'}
          </span>
          <span className="text-xs opacity-80 font-tech">
            {message}
          </span>
        </div>
      </div>

      {/* Subtle reflection */}
      <div 
        className={`
          absolute inset-x-0 bottom-0 h-1/2 rounded-b-lg opacity-20
          bg-gradient-to-b from-transparent to-white
          pointer-events-none
        `}
      />
    </motion.div>
  )
}
