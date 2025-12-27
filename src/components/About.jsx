import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { LuArrowRight, LuCheck } from 'react-icons/lu'
import { GiGears } from 'react-icons/gi'

export default function About() {
  const [ref, inView] = useInView({
    threshold: 0.2,
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const features = [
    'OEM & Aftermarket Parts',
    'Japanese, European & Indian',
    'Professional Consultation',
    'Islandwide Delivery',
  ]

  return (
    <section id="about" className="py-20 lg:py-28 bg-concrete relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left - Image placeholder */}
          <motion.div variants={itemVariants} className="relative">
            {/* Image container */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              {/* Placeholder gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-forge-700 via-forge-800 to-forge-900" />
              
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 blueprint-grid opacity-30" />
              
              {/* Decorative elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <GiGears className="w-32 h-32 text-ignition-600/20" />
                </motion.div>
              </div>

              {/* Workshop silhouette */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-void/80 to-transparent" />
            </div>

            {/* Orange frame offset */}
            <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 w-full h-full border-2 border-ignition-600/30 rounded-2xl -z-10" />

            {/* Floating badge */}
            <motion.div
              className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 bg-ignition-600 text-white px-6 py-4 rounded-xl shadow-orange-glow"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="font-mono text-3xl font-bold">100%</span>
              <span className="block font-tech text-sm uppercase tracking-wider">Genuine</span>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div variants={containerVariants}>
            {/* Label */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
              <GiGears className="w-5 h-5 text-ignition-600" />
              <span className="font-tech font-semibold text-sm text-ignition-600 uppercase tracking-wider">
                About Us
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={itemVariants}
              className="font-heading text-section font-bold text-forge-900 leading-tight mb-4"
            >
              BUILT ON EXPERTISE.
              <br />
              <span className="gradient-text">DRIVEN BY PASSION.</span>
            </motion.h2>

            {/* Orange line */}
            <motion.div
              variants={itemVariants}
              className="w-20 h-1 bg-gradient-to-r from-ignition-600 to-ignition-400 rounded-full mb-6"
            />

            {/* Description */}
            <motion.p variants={itemVariants} className="text-steel-600 text-lg mb-4">
              <strong className="text-forge-900">Super Motor Trading</strong> is 
              Sri Lanka's trusted source for genuine vehicle spare parts. Located in Kadawatha, 
              we serve mechanics, workshops, and car enthusiasts across the island.
            </motion.p>

            <motion.p variants={itemVariants} className="text-steel-600 text-lg mb-8">
              Our commitment to quality means you get authentic OEM parts and premium aftermarket 
              alternatives at competitive prices. We have the expertise to know exactly what your vehicle needs.
            </motion.p>

            {/* Feature checklist */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-3 mb-8"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-ignition-600/10 flex items-center justify-center flex-shrink-0">
                    <LuCheck className="w-3 h-3 text-ignition-600" />
                  </div>
                  <span className="font-tech text-sm text-forge-800 font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants}>
              <motion.a
                href="#contact"
                className="btn-secondary group inline-flex"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get In Touch
                <LuArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
