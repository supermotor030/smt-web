import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  LuShieldCheck,
  LuRefreshCw,
  LuTruck,
  LuHeadphones,
  LuBadgeCheck,
  LuCreditCard
} from 'react-icons/lu'

const guarantees = [
  {
    id: 1,
    icon: LuShieldCheck,
    title: 'Warranty Guaranteed',
    description: 'OEM manufacturer warranty',
    tooltip: 'All genuine OEM parts come with full manufacturer warranty. Aftermarket parts include our satisfaction guarantee covering defects and fitment issues.',
    color: '#22C55E',
    animation: 'pulse',
  },
  {
    id: 2,
    icon: LuRefreshCw,
    title: '7-Day Returns',
    description: 'Easy hassle-free returns',
    tooltip: 'Return any unused part in its original packaging within 7 days for a full refund or exchange. No questions asked. We make returns simple.',
    color: '#0077FF',
    animation: 'spin',
  },
  {
    id: 3,
    icon: LuBadgeCheck,
    title: '100% Genuine',
    description: 'Certified authentic parts',
    tooltip: 'Every part we sell is sourced directly from certified manufacturers or authorized distributors. We never compromise on authenticity.',
    color: '#FF5500',
    animation: 'bounce',
  },
  {
    id: 4,
    icon: LuTruck,
    title: 'Fast Delivery',
    description: 'Same-day Colombo dispatch',
    tooltip: 'Orders placed before 2 PM for Colombo and suburbs ship the same day. Islandwide delivery within 2-3 business days via trusted couriers.',
    color: '#8B5CF6',
    animation: 'slide',
  },
  {
    id: 5,
    icon: LuHeadphones,
    title: 'Expert Support',
    description: '7 days a week',
    tooltip: 'Our automotive experts are available 7 days a week to help you find the right parts, answer technical questions, and provide installation guidance.',
    color: '#06B6D4',
    animation: 'pulse',
  },
  {
    id: 6,
    icon: LuCreditCard,
    title: 'Secure Payment',
    description: 'Multiple options',
    tooltip: 'We accept cash on delivery, all major credit/debit cards, and bank transfers. All online payments are secured with bank-level encryption.',
    color: '#F59E0B',
    animation: 'bounce',
  },
]

// Animation variants for different icon types
const iconAnimations = {
  pulse: {
    animate: { scale: [1, 1.15, 1] },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
  spin: {
    animate: { rotate: 360 },
    transition: { duration: 8, repeat: Infinity, ease: 'linear' },
  },
  bounce: {
    animate: { y: [0, -4, 0] },
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
  slide: {
    animate: { x: [0, 3, 0] },
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
}

export default function ServiceGuarantees() {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null)
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="py-12 lg:py-16 bg-forge-900">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6"
        >
          {guarantees.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center p-4 lg:p-5 rounded-xl hover:bg-forge-800/50 transition-colors group cursor-pointer"
              onMouseEnter={() => setActiveTooltip(item.id)}
              onMouseLeave={() => setActiveTooltip(null)}
              onClick={() => setActiveTooltip(activeTooltip === item.id ? null : item.id)}
            >
              {/* Animated Icon */}
              <motion.div
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${item.color}20` }}
                whileHover={{ scale: 1.15 }}
                {...iconAnimations[item.animation]}
              >
                <item.icon className="w-6 h-6 lg:w-7 lg:h-7" style={{ color: item.color }} />
              </motion.div>

              <h3 className="font-tech text-sm lg:text-base font-semibold text-white mb-1">
                {item.title}
              </h3>
              <p className="text-xs lg:text-sm text-steel-400 leading-relaxed">
                {item.description}
              </p>

              {/* Tooltip */}
              <AnimatePresence>
                {activeTooltip === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-white rounded-xl shadow-xl border border-gray-100"
                  >
                    {/* Arrow */}
                    <div
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-100"
                    />

                    <div className="relative">
                      <div className="flex items-center gap-2 mb-2">
                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                        <span className="font-tech font-bold text-sm text-forge-900">{item.title}</span>
                      </div>
                      <p className="text-sm text-steel-500 leading-relaxed">
                        {item.tooltip}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
