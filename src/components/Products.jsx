import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { LuArrowRight } from 'react-icons/lu'
import { GiSpanner } from 'react-icons/gi'
import { products } from '../data/siteData'

export default function Products({ onProductSelect }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

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
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const handleInquire = (product) => {
    const message = `Hi! I'm interested in ${product.name}. Can you help me find the right parts?`
    window.open(`https://wa.me/94704344855?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <section id="products" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <GiSpanner className="w-5 h-5 text-ignition-600" />
            <span className="font-tech font-semibold text-sm text-ignition-600 uppercase tracking-wider">
              Our Products
            </span>
          </div>
          
          <h2 className="font-heading text-section font-bold text-forge-900 mb-4">
            QUALITY PARTS FOR{' '}
            <span className="gradient-text">EVERY SYSTEM</span>
          </h2>
          
          {/* Decorative lines */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-ignition-600" />
            <div className="w-2 h-2 bg-ignition-600 rotate-45" />
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-ignition-600" />
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="product-card group relative bg-white rounded-2xl border-2 border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:-translate-y-3 hover:border-gray-200"
              onClick={() => onProductSelect(product)}
              role="button"
              tabIndex={0}
              aria-label={`View ${product.name} details`}
              onKeyDown={(e) => e.key === 'Enter' && onProductSelect(product)}
            >
              {/* Garage door lines */}
              <div className="absolute inset-0 garage-lines pointer-events-none" />

              {/* Corner bolts */}
              <div className="absolute top-3 left-3 w-2 h-2 bg-steel-400 rounded-sm rotate-45" />
              <div className="absolute top-3 right-3 w-2 h-2 bg-steel-400 rounded-sm rotate-45" />
              <div className="absolute bottom-3 left-3 w-2 h-2 bg-steel-400 rounded-sm rotate-45" />
              <div className="absolute bottom-3 right-3 w-2 h-2 bg-steel-400 rounded-sm rotate-45" />

              <div className="relative p-6 lg:p-8">
                {/* Icon */}
                <motion.div
                  className="w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${product.color}15` }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <product.icon 
                    className="w-10 h-10 lg:w-12 lg:h-12" 
                    style={{ color: product.color }} 
                  />
                </motion.div>

                {/* Name */}
                <h3 className="font-heading font-semibold text-lg text-center text-forge-900 mb-1">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="font-tech text-sm text-steel-600 text-center mb-4">
                  "{product.description}"
                </p>

                {/* Colored line */}
                <div 
                  className="w-12 h-0.5 mx-auto mb-4 rounded-full"
                  style={{ backgroundColor: product.color }}
                />

                {/* Items preview */}
                <p className="text-sm text-forge-700 font-medium text-center mb-4 line-clamp-2">
                  {product.items.slice(0, 3).join(' • ')}
                </p>

                {/* CTA Button */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleInquire(product)
                  }}
                  className="w-full py-2.5 rounded-lg border-2 font-tech font-semibold text-sm uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  style={{ 
                    borderColor: product.color,
                    color: product.color,
                  }}
                  whileHover={{ 
                    backgroundColor: product.color,
                    color: '#ffffff',
                  }}
                >
                  Inquire Now
                  <LuArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </motion.button>
              </div>

              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{
                  boxShadow: `inset 0 0 30px ${product.color}15`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
