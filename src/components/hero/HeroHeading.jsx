import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { GiGears } from 'react-icons/gi'
import TypewriterTagline from './TypewriterTagline'

export default function HeroHeading({ itemVariants }) {
  return (
    <>
      <motion.div variants={itemVariants} className="mb-3 lg:mb-8">
        <h1 className="font-display leading-[0.9] tracking-tight">
          <span className="block text-steel-100 text-[2.5rem] xs:text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] drop-shadow-lg">
            PRECISION
          </span>
          <span className="block gradient-text text-[2.5rem] xs:text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            ENGINEERED
          </span>
          <span className="block text-steel-100 text-[2.5rem] xs:text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] drop-shadow-lg">
            EXCELLENCE
          </span>
        </h1>
      </motion.div>

      <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-4 mb-3 lg:mb-4">
        <motion.div 
          className="h-[2px] bg-gradient-to-r from-ignition-600 via-ignition-500 to-transparent"
          initial={{ width: 0 }}
          animate={{ width: '80px' }}
          transition={{ duration: 1, delay: 0.8 }}
          aria-hidden="true"
        />
        <GiGears className="w-4 h-4 lg:w-5 lg:h-5 text-ignition-500 animate-spin-slow" aria-hidden="true" />
        <motion.div 
          className="h-[2px] bg-gradient-to-l from-ignition-600 via-ignition-500 to-transparent lg:hidden"
          initial={{ width: 0 }}
          animate={{ width: '80px' }}
          transition={{ duration: 1, delay: 0.8 }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Typing animation tagline */}
      <motion.div variants={itemVariants} className="mb-4 lg:mb-6">
        <TypewriterTagline />
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="text-steel-400 text-sm sm:text-base lg:text-xl max-w-xl mx-auto lg:mx-0 mb-5 lg:mb-8 leading-relaxed px-1 lg:px-0"
      >
        Sri Lanka's trusted source for <span className="text-ignition-500 font-semibold">genuine spare parts</span>. 
        Premium quality components for Japanese, European & Indian vehicles.
      </motion.p>
    </>
  )
}

HeroHeading.propTypes = {
  itemVariants: PropTypes.object.isRequired,
}
