import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { LuSearch, LuChevronDown, LuArrowRight, LuZap } from 'react-icons/lu'
import { GiCarWheel } from 'react-icons/gi'
import { vehicleBrands, products } from '../data/siteData'

export default function PartFinder() {
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchComplete, setSearchComplete] = useState(false)
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  // Get all brands as a flat array
  const allBrands = Object.values(vehicleBrands).flatMap(region => region.brands)

  const popularParts = ['Brake Pads', 'Oil Filters', 'Timing Belts', 'Clutch Kits', 'Shock Absorbers']

  const handleSearch = () => {
    if (!selectedBrand && !selectedCategory) return

    setIsSearching(true)
    setSearchComplete(false)

    // Simulate search animation
    setTimeout(() => {
      setIsSearching(false)
      setSearchComplete(true)

      // Open WhatsApp with search query
      setTimeout(() => {
        const message = `Hi! I'm looking for ${selectedCategory || 'parts'} for my ${selectedBrand || 'vehicle'}. Can you help?`
        window.open(`https://wa.me/94704344855?text=${encodeURIComponent(message)}`, '_blank')
        setSearchComplete(false)
      }, 1500)
    }, 2000)
  }

  const handleQuickSearch = (part) => {
    const message = `Hi! I'm looking for ${part}. Do you have them in stock?`
    window.open(`https://wa.me/94704344855?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Orange gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-ignition-700 via-ignition-600 to-ignition-500"
        style={{
          clipPath: 'polygon(0 5%, 100% 0, 100% 95%, 0 100%)',
        }}
      />

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(0,0,0,0.1) 10px,
            rgba(0,0,0,0.1) 20px
          )`
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <GiCarWheel className="w-6 h-6 text-white" />
              <span className="font-tech font-semibold text-sm text-white/80 uppercase tracking-wider">
                Part Finder
              </span>
            </div>
            
            <h2 className="font-heading text-section font-bold text-white mb-2">
              FIND YOUR PART INSTANTLY
            </h2>
            <p className="text-white/80 text-lg">
              Select your vehicle and category to get started
            </p>
          </div>

          {/* Search Form */}
          <motion.div
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 lg:p-10"
            initial={{ scale: 0.95 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mb-6">
              {/* Brand Select */}
              <div className="relative">
                <label className="block font-tech text-sm text-white/80 uppercase tracking-wider mb-2">
                  Vehicle Brand
                </label>
                <div className="relative">
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full appearance-none bg-white border border-white/20 rounded-xl px-4 py-3 pr-10 text-forge-900 font-tech focus:outline-none focus:border-ignition-500 focus:ring-2 focus:ring-ignition-500/20 transition-colors cursor-pointer"
                  >
                    <option value="">Select Brand</option>
                    {allBrands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                  <LuChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-steel-500 pointer-events-none" />
                </div>
              </div>

              {/* Category Select */}
              <div className="relative">
                <label className="block font-tech text-sm text-white/80 uppercase tracking-wider mb-2">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full appearance-none bg-white border border-white/20 rounded-xl px-4 py-3 pr-10 text-forge-900 font-tech focus:outline-none focus:border-ignition-500 focus:ring-2 focus:ring-ignition-500/20 transition-colors cursor-pointer"
                  >
                    <option value="">Select Category</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.name}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                  <LuChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-steel-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <motion.button
              onClick={handleSearch}
              disabled={isSearching || (!selectedBrand && !selectedCategory)}
              className={`w-full font-tech font-bold uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 ${
                !selectedBrand && !selectedCategory 
                  ? 'bg-white/30 text-white/60 cursor-not-allowed' 
                  : 'bg-white text-ignition-600 hover:bg-white/90'
              } disabled:opacity-70`}
              whileHover={selectedBrand || selectedCategory ? { scale: 1.02 } : {}}
              whileTap={selectedBrand || selectedCategory ? { scale: 0.98 } : {}}
            >
              {isSearching ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <LuZap className="w-5 h-5" />
                  </motion.div>
                  <span>SCANNING...</span>
                </>
              ) : searchComplete ? (
                <>
                  <LuZap className="w-5 h-5" />
                  <span>FOUND! OPENING WHATSAPP...</span>
                </>
              ) : !selectedBrand && !selectedCategory ? (
                <>
                  <LuSearch className="w-5 h-5" />
                  <span>SELECT A BRAND OR CATEGORY</span>
                </>
              ) : (
                <>
                  <LuSearch className="w-5 h-5" />
                  <span>FIND PARTS NOW</span>
                  <LuArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* Progress bar animation */}
            {isSearching && (
              <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                />
              </div>
            )}
          </motion.div>

          {/* Quick Search */}
          <div className="text-center mt-8">
            <p className="text-white/60 text-sm mb-3 font-tech">
              Popular searches:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularParts.map((part) => (
                <motion.button
                  key={part}
                  onClick={() => handleQuickSearch(part)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/90 font-tech text-sm hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {part}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
