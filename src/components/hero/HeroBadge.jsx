import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

export default function HeroBadge({ text, itemVariants }) {
  return (
    <motion.div variants={itemVariants} className="mb-4 lg:mb-6">
      <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-ignition-600/20 to-transparent border border-ignition-600/30 backdrop-blur-sm">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ignition-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-ignition-500"></span>
        </span>
        <span className="font-tech text-xs sm:text-sm text-ignition-400 tracking-wider">
          {text}
        </span>
      </div>
    </motion.div>
  )
}

HeroBadge.propTypes = {
  text: PropTypes.string.isRequired,
  itemVariants: PropTypes.object.isRequired,
}
