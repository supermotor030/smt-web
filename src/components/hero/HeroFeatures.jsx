import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { LuShield, LuZap, LuClock } from 'react-icons/lu'

const features = [
  { label: '100% Genuine', Icon: LuShield },
  { label: 'Expert Advice', Icon: LuZap },
  { label: 'Fast Service', Icon: LuClock },
]

export default function HeroFeatures({ itemVariants }) {
  return (
    <motion.div 
      variants={itemVariants} 
      className="flex flex-wrap justify-center lg:justify-start items-center gap-2 sm:gap-4 lg:gap-6"
      role="list"
      aria-label="Key features"
    >
      {features.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5 sm:gap-2" role="listitem">
          <span 
            className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-lg bg-forge-800 border border-forge-600 flex items-center justify-center"
            aria-hidden="true"
          >
            <item.Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-ignition-500" />
          </span>
          <span className="font-tech text-[11px] sm:text-xs lg:text-sm text-steel-400">{item.label}</span>
        </div>
      ))}
    </motion.div>
  )
}

HeroFeatures.propTypes = {
  itemVariants: PropTypes.object.isRequired,
}
