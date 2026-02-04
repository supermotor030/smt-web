import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { LuArrowRight, LuCheck } from 'react-icons/lu'
import { GiGears } from 'react-icons/gi'
import { useRef } from 'react'

export default function About() {
  const sectionRef = useRef(null)
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  // Parallax effect for image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50])

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

  // Staggered checklist animation
  const checklistVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const checkItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }

  const features = [
    'OEM & Aftermarket Parts',
    'Japanese, European & Indian',
    'Professional Consultation',
    'Islandwide Delivery',
  ]

  return (
    <section ref={sectionRef} id="about" className="py-20 lg:py-28 bg-concrete relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left - Shop Image */}
          <motion.div variants={itemVariants} className="relative">
            {/* Image container with parallax */}
            <motion.div
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
              style={{ y: imageY }}
            >
              {/* Actual shop image */}
              <img
                src="/images/shop-interior.png"
                alt="Super Motor Trading Shop Interior"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />

              {/* Overlay gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-void/50 via-void/10 to-transparent" />
            </motion.div>

            {/* Orange frame offset */}
            <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 w-full h-full border-2 border-ignition-600/30 rounded-2xl -z-10" />

            {/* Floating badge */}
            <motion.div
              className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 bg-ignition-600 text-white px-4 py-2 lg:px-6 lg:py-4 rounded-xl shadow-orange-glow"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="font-mono text-2xl lg:text-3xl font-bold">100%</span>
              <span className="block font-tech text-xs lg:text-sm uppercase tracking-wider">Genuine</span>
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
            <motion.p variants={itemVariants} className="text-steel-400 text-lg mb-4">
              <strong className="text-forge-900">Super Motor Trading</strong> is
              Sri Lanka's trusted source for genuine vehicle spare parts. Located in Kadawatha,
              we serve mechanics, workshops, and car enthusiasts across the island.
            </motion.p>

            <motion.p variants={itemVariants} className="text-steel-400 text-lg mb-8">
              Our commitment to quality means you get authentic OEM parts and premium aftermarket
              alternatives at competitive prices. We have the expertise to know exactly what your vehicle needs.
            </motion.p>

            {/* Feature checklist with staggered animation */}
            <motion.div
              variants={checklistVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="grid grid-cols-2 gap-3 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={checkItemVariants}
                  className="flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="w-5 h-5 rounded-full bg-ignition-600/10 flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.2, backgroundColor: 'rgba(255, 106, 26, 0.2)' }}
                  >
                    <LuCheck className="w-3 h-3 text-ignition-600" />
                  </motion.div>
                  <span className="font-tech text-sm text-forge-800 font-medium">
                    {feature}
                  </span>
                </motion.div>
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
