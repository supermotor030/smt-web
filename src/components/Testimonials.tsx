import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { LuQuote, LuChevronLeft, LuChevronRight, LuCheck, LuStar } from 'react-icons/lu'
import { testimonials } from '../data/siteData'

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  // Memoize particle positions
  const particles = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 4 + Math.random() * 2,
      delay: Math.random() * 2,
    })), [])

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isPaused])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 lg:py-28 bg-forge-900 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-ignition-600/30 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <LuQuote className="w-5 h-5 text-ignition-600" />
            <span className="font-tech font-semibold text-sm text-ignition-600 uppercase tracking-wider">
              Testimonials
            </span>
          </div>

          <h2 className="font-heading text-section font-bold text-steel-100 mb-4">
            WHAT OUR{' '}
            <span className="gradient-text">CUSTOMERS SAY</span>
          </h2>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cards container */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  {/* Testimonial Card */}
                  <div className="relative bg-forge-800/50 backdrop-blur-sm border border-forge-600 rounded-2xl p-8 lg:p-10">
                    {/* Paper clip decoration */}
                    <div className="absolute -top-3 left-8 w-6 h-8 bg-steel-400 rounded-full" />
                    <div className="absolute -top-1 left-9 w-4 h-4 bg-forge-800 rounded-full" />

                    {/* Quote */}
                    <div className="relative mb-6">
                      <LuQuote className="absolute -top-2 -left-2 w-8 h-8 text-ignition-600/30" />
                      <p className="text-steel-200 text-lg lg:text-xl leading-relaxed pl-6">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* Star Rating */}
                    <div className="flex gap-0.5 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <LuStar
                          key={i}
                          className={`w-5 h-5 transition-all duration-200 ${i < testimonial.rating
                              ? 'text-warning fill-warning'
                              : 'text-steel-600'
                            }`}
                        />
                      ))}
                    </div>

                    {/* Author with Photo */}
                    <div className="flex items-center gap-4">
                      {/* Customer Photo */}
                      <div className="relative">
                        <img
                          src={testimonial.photo}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-ignition-500/30"
                          loading="lazy"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                          <LuCheck className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-steel-100">
                          {testimonial.name}
                        </p>
                        <p className="font-tech text-sm text-ignition-500">
                          {testimonial.role}
                        </p>
                        <p className="font-tech text-xs text-steel-500">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>

                    {/* Verified badge */}
                    <div className="absolute top-6 right-6 flex items-center gap-1 px-3 py-1 bg-success/20 rounded-full rotate-3">
                      <LuCheck className="w-3 h-3 text-success" />
                      <span className="font-tech text-xs text-success font-semibold uppercase">
                        Verified
                      </span>
                    </div>

                    {/* Tape decoration */}
                    <div className="absolute -bottom-2 right-12 w-16 h-6 bg-warning/30 -rotate-6 rounded" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prevSlide}
              className="p-2 rounded-full bg-forge-700 text-steel-300 hover:bg-ignition-600 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonial"
            >
              <LuChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots - styled as bolts */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-sm rotate-45 transition-all duration-300 ${currentIndex === index
                      ? 'bg-ignition-600 scale-110'
                      : 'bg-forge-600 hover:bg-forge-500'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextSlide}
              className="p-2 rounded-full bg-forge-700 text-steel-300 hover:bg-ignition-600 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonial"
            >
              <LuChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
