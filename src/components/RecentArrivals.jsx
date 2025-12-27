import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { LuSparkles, LuClock, LuArrowRight, LuBadgeCheck } from 'react-icons/lu'
import { GiGears } from 'react-icons/gi'
import { FaWhatsapp } from 'react-icons/fa6'

// Recent arrivals data
const recentArrivals = [
  {
    id: 1,
    name: 'Toyota Timing Belt Kit',
    category: 'Engine Parts',
    price: 'Rs. 12,500',
    badge: 'NEW',
    badgeColor: '#22C55E',
    image: '🔧',
    forVehicle: 'Toyota Corolla 2015-2022',
    inStock: true,
    daysAgo: 2,
  },
  {
    id: 2,
    name: 'Honda Civic Brake Pads',
    category: 'Brake System',
    price: 'Rs. 4,800',
    badge: 'HOT',
    badgeColor: '#EF4444',
    image: '🛞',
    forVehicle: 'Honda Civic 2016-2023',
    inStock: true,
    daysAgo: 1,
  },
  {
    id: 3,
    name: 'BMW Oil Filter Set',
    category: 'Filters',
    price: 'Rs. 3,200',
    badge: 'NEW',
    badgeColor: '#22C55E',
    image: '🛢️',
    forVehicle: 'BMW 3 Series 2018-2024',
    inStock: true,
    daysAgo: 3,
  },
  {
    id: 4,
    name: 'Nissan Shock Absorbers',
    category: 'Suspension',
    price: 'Rs. 18,500',
    badge: 'LIMITED',
    badgeColor: '#8B5CF6',
    image: '⚙️',
    forVehicle: 'Nissan X-Trail 2017-2023',
    inStock: true,
    daysAgo: 1,
  },
]

export default function RecentArrivals() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const handleInquire = (item) => {
    const message = `Hi! I'm interested in the ${item.name} for ${item.forVehicle}. Is it available?`
    window.open(`https://wa.me/94704344855?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <LuSparkles className="w-5 h-5 text-ignition-600" />
            <span className="font-tech text-sm text-ignition-600 uppercase tracking-wider">
              Fresh Stock
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-forge-900 mb-3">
            RECENT <span className="gradient-text">ARRIVALS</span>
          </h2>
          <p className="text-steel-500 max-w-xl mx-auto">
            Check out our latest parts just arrived from trusted manufacturers
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {recentArrivals.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Badge */}
              <div className="relative">
                <div
                  className="absolute top-3 left-3 px-2 py-1 rounded-full text-white text-xs font-tech font-bold uppercase z-10"
                  style={{ backgroundColor: item.badgeColor }}
                >
                  {item.badge}
                </div>
                
                {/* Image placeholder */}
                <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-6xl">
                  {item.image}
                </div>

                {/* Days ago */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs text-steel-600">
                  <LuClock className="w-3 h-3" />
                  {item.daysAgo === 1 ? 'Yesterday' : `${item.daysAgo} days ago`}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <span className="text-xs text-steel-500 font-tech uppercase">{item.category}</span>
                <h3 className="font-tech font-semibold text-forge-900 mt-1 mb-2 line-clamp-1">
                  {item.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <LuBadgeCheck className="w-4 h-4 text-success" />
                  <span className="text-xs text-steel-500">{item.forVehicle}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-display text-xl text-ignition-600">{item.price}</span>
                  {item.inStock && (
                    <span className="text-xs text-success font-tech">● In Stock</span>
                  )}
                </div>

                {/* Action button */}
                <button
                  onClick={() => handleInquire(item)}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 bg-forge-900 hover:bg-ignition-600 text-white font-tech text-sm uppercase rounded-xl transition-colors group"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  Inquire Now
                  <LuArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View more */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <a
            href="#products"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-forge-900 text-forge-900 hover:bg-forge-900 hover:text-white font-tech font-semibold uppercase rounded-xl transition-all duration-300"
          >
            <GiGears className="w-5 h-5" />
            View All Products
            <LuArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
