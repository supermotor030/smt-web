import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { LuArrowRight, LuGlobe } from 'react-icons/lu'
import { GiCarWheel, GiJapan } from 'react-icons/gi'
import { FaEuroSign, FaIndustry } from 'react-icons/fa6'
import { vehicleBrands, contact } from '../data/siteData'

// Icon mapping for regions
const regionIcons = {
  japanese: GiJapan,
  european: FaEuroSign,
  indian: FaIndustry,
}

export default function Vehicles() {
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [ref, inView] = useInView({
    threshold: 0.1,
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
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand)
    const message = `Hi! I need parts for my ${brand}. Can you help?`
    window.open(`https://wa.me/94704344855?text=${encodeURIComponent(message)}`, '_blank')
  }

  const regions = Object.entries(vehicleBrands)

  return (
    <section className="py-20 lg:py-28 bg-forge-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 blueprint-grid opacity-20" />
      
      {/* Decorative Gears */}
      <div className="absolute top-10 left-10 opacity-10">
        <GiCarWheel className="w-32 h-32 text-ignition-500 animate-spin-slow" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10">
        <GiCarWheel className="w-24 h-24 text-ignition-500 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
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
            <LuGlobe className="w-5 h-5 text-ignition-500" />
            <span className="font-tech font-semibold text-sm text-ignition-500 uppercase tracking-wider">
              Global Coverage
            </span>
          </div>
          
          <h2 className="font-heading text-section font-bold text-white mb-4">
            PARTS FOR{' '}
            <span className="text-ignition-500">ALL MAJOR BRANDS</span>
          </h2>
          
          <p className="text-steel-400 max-w-2xl mx-auto">
            We stock genuine and aftermarket parts for Japanese, European, and Indian vehicles. 
            Click on any brand to inquire about parts availability.
          </p>
        </motion.div>

        {/* Brand Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {regions.map(([key, region]) => {
            const RegionIcon = regionIcons[key] || LuGlobe
            
            return (
              <motion.div
                key={key}
                variants={itemVariants}
                className="group relative bg-forge-800/50 backdrop-blur-sm rounded-2xl border border-steel-700/30 overflow-hidden hover:border-ignition-500/50 transition-all duration-500"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${region.gradient} p-6 relative overflow-hidden`}>
                  {/* Background Icon */}
                  <div className="absolute -right-4 -bottom-4 opacity-20">
                    <RegionIcon className="w-24 h-24 text-white" />
                  </div>
                  
                  <div className="relative z-10 flex items-center gap-4">
                    <motion.div 
                      className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <RegionIcon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-heading font-bold text-xl text-white uppercase tracking-wide">
                        {region.label}
                      </h3>
                      <p className="text-white/80 text-sm font-tech">
                        {region.brands.length} Brands
                      </p>
                    </div>
                  </div>
                </div>

                {/* Brands */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {region.brands.map((brand) => (
                      <motion.button
                        key={brand}
                        onClick={() => handleBrandClick(brand)}
                        className="px-4 py-2.5 rounded-lg bg-forge-700/50 text-steel-300 font-tech text-sm font-medium border border-steel-600/30 transition-all duration-300 hover:bg-ignition-600 hover:text-white hover:border-ignition-500"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {brand}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Bottom Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-ignition-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-steel-400 mb-4">
            Can't find your brand? We source parts for all makes and models!
          </p>
          <motion.a
            href="#contact"
            className="btn-primary inline-flex"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Us
            <LuArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
