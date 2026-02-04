import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GiTrophyCup } from 'react-icons/gi'
import CountUp from 'react-countup'
import { features } from '../data/siteData'

export default function WhyUs() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Parse stat value for CountUp
  const parseStatValue = (stat: string): { value: number; suffix: string } => {
    const match = stat.match(/^(\d+)(.*)$/)
    if (match) {
      return { value: parseInt(match[1], 10), suffix: match[2] }
    }
    return { value: 0, suffix: stat }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-concrete relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <GiTrophyCup className="w-5 h-5 text-ignition-600" />
            <span className="font-tech font-semibold text-sm text-ignition-600 uppercase tracking-wider">
              Why Choose Us
            </span>
          </div>

          <h2 className="font-heading text-section font-bold text-forge-900 mb-4">
            THE <span className="gradient-text">SUPER MOTOR</span> DIFFERENCE
          </h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const { value, suffix } = parseStatValue(feature.stat || '')
            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2"
              >
                {/* Colored top bar */}
                <div
                  className="h-1.5"
                  style={{ backgroundColor: feature.color }}
                />

                <div className="p-6 lg:p-8 space-y-3">
                  {/* Icon with Stat Badge */}
                  <div className="relative inline-block mb-4">
                    <motion.div
                      className="w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${feature.color}15` }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <feature.icon
                        className="w-8 h-8"
                        style={{ color: feature.color }}
                      />
                    </motion.div>

                    {/* Stat Badge with CountUp */}
                    {feature.stat && (
                      <motion.div
                        className="absolute -top-2 -right-2 px-2 py-1 rounded-lg text-white text-xs font-bold shadow-lg"
                        style={{ backgroundColor: feature.color }}
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {inView ? (
                          <CountUp end={value} suffix={suffix} duration={2} />
                        ) : (
                          feature.stat
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-semibold text-lg text-forge-900 mb-2 uppercase tracking-wide">
                    {feature.title}
                  </h3>

                  {/* Stat Label - Enhanced Contrast */}
                  {feature.statLabel && (
                    <div className="font-tech text-xs font-extrabold mb-2 uppercase tracking-wider"
                      style={{
                        color: feature.color,
                        filter: 'brightness(0.7) saturate(1.2)'
                      }}
                    >
                      {feature.statLabel}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-steel-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover border glow */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none transition-colors duration-300"
                  style={{
                    borderColor: 'transparent',
                  }}
                  whileHover={{
                    borderColor: `${feature.color}40`,
                  }}
                />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 lg:mt-16"
        >
          <div className="bg-forge-900 rounded-2xl py-4 overflow-hidden relative">
            {/* Animated marquee */}
            <div className="flex animate-scroll">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 px-8 whitespace-nowrap">
                  <GiTrophyCup className="text-warning text-lg w-5 h-5" />
                  <span className="font-tech font-semibold text-steel-100 uppercase tracking-wider">
                    TRUSTED BY MECHANICS & WORKSHOPS ACROSS SRI LANKA
                  </span>
                  <span className="text-ignition-600">•</span>
                  <span className="font-tech font-semibold text-steel-100 uppercase tracking-wider">
                    100% GENUINE PARTS
                  </span>
                  <span className="text-ignition-600">•</span>
                  <span className="font-tech font-semibold text-steel-100 uppercase tracking-wider">
                    GENUINE OEM & AFTERMARKET PARTS
                  </span>
                  <span className="text-ignition-600">•</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
