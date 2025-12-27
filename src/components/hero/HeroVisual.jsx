import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import EngineVisual from './EngineVisual'

export default function HeroVisual({ prefersReducedMotion = false, isMobile = false }) {
  // Mobile layout - simplified and compact
  if (isMobile) {
    return (
      <motion.div
        className="relative mt-4 mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.3 }}
      >
        <div className="flex flex-col items-center">
          {/* Mobile Engine Visual - Optimized size */}
          <div className="w-full max-w-[240px] xs:max-w-[280px] sm:max-w-[320px]">
            <EngineVisual />
          </div>
        </div>
      </motion.div>
    )
  }

  // Desktop layout
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.4 }}
    >
      <div className="relative max-w-[420px] mx-auto">
        {/* Engine Visual */}
        <EngineVisual className="w-full" />

        {/* Floating badge - Genuine parts */}
        <motion.div
          className="absolute -top-4 -right-4 xl:right-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="bg-forge-800/95 backdrop-blur-sm border border-ignition-600/40 rounded-xl px-3 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ignition-600 to-ignition-700 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-display text-lg text-ignition-400">100%</div>
                <div className="font-tech text-[10px] text-steel-500 uppercase">Genuine</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating badge - Fast service */}
        <motion.div
          className="absolute bottom-16 -left-4 xl:left-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="bg-forge-800/95 backdrop-blur-sm border border-electric-600/40 rounded-xl px-3 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-600 to-electric-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-display text-lg text-electric-400">Fast</div>
                <div className="font-tech text-[10px] text-steel-500 uppercase">Service</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

HeroVisual.propTypes = {
  prefersReducedMotion: PropTypes.bool,
  isMobile: PropTypes.bool,
}
