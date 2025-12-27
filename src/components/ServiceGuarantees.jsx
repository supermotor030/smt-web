import { motion } from 'framer-motion'
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
    description: 'All OEM parts come with manufacturer warranty',
    color: '#22C55E',
  },
  {
    id: 2,
    icon: LuRefreshCw,
    title: '7-Day Returns',
    description: 'Easy returns for unused parts in original packaging',
    color: '#0077FF',
  },
  {
    id: 3,
    icon: LuBadgeCheck,
    title: '100% Genuine',
    description: 'Authentic parts from certified suppliers only',
    color: '#FF5500',
  },
  {
    id: 4,
    icon: LuTruck,
    title: 'Fast Delivery',
    description: 'Same-day dispatch for Colombo orders',
    color: '#8B5CF6',
  },
  {
    id: 5,
    icon: LuHeadphones,
    title: 'Expert Support',
    description: '7 days a week technical assistance',
    color: '#06B6D4',
  },
  {
    id: 6,
    icon: LuCreditCard,
    title: 'Secure Payment',
    description: 'Cash, card & bank transfer accepted',
    color: '#F59E0B',
  },
]

export default function ServiceGuarantees() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="py-12 bg-forge-900">
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
              className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-forge-800/50 transition-colors group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <item.icon className="w-6 h-6" style={{ color: item.color }} />
              </div>
              <h3 className="font-tech text-sm font-semibold text-white mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-steel-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
