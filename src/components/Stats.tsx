import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { stats } from '../data/siteData'

export default function Stats() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative py-16 lg:py-20 bg-snow overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ignition-700 via-ignition-500 to-warning" />

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative bg-white rounded-2xl p-6 lg:p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300 group"
              whileHover={{ y: -5 }}
            >
              {/* Corner bolts */}
              <div className="absolute top-3 left-3 w-2 h-2 bg-steel-400 rounded-sm rotate-45" />
              <div className="absolute top-3 right-3 w-2 h-2 bg-steel-400 rounded-sm rotate-45" />
              <div className="absolute bottom-3 left-3 w-2 h-2 bg-steel-400 rounded-sm rotate-45" />
              <div className="absolute bottom-3 right-3 w-2 h-2 bg-steel-400 rounded-sm rotate-45" />

              {/* Content */}
              <div className="text-center">
                {/* Animated Icon */}
                {stat.icon && (
                  <motion.div
                    className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}15` }}
                    whileHover={{
                      scale: 1.2,
                      rotate: 10,
                    }}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      y: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      },
                    }}
                  >
                    <stat.icon
                      className="w-7 h-7"
                      style={{ color: stat.color }}
                    />
                  </motion.div>
                )}

                {/* Number */}
                <div
                  className="font-mono text-4xl lg:text-5xl font-bold mb-2 tracking-tight"
                  style={{ color: stat.color }}
                >
                  {inView ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      suffix={stat.suffix}
                      useEasing={true}
                    />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </div>

                {/* Decorative gauge arc */}
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ backgroundColor: stat.color }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: '100%' } : { width: 0 }}
                    transition={{ duration: 1.5, delay: index * 0.2, ease: 'easeOut' }}
                  />
                </div>

                {/* Label */}
                <span className="font-tech text-xs lg:text-sm font-semibold text-steel-400 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>

              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: `0 0 30px ${stat.color}20`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
