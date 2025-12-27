import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  LuCalculator, 
  LuCar, 
  LuCalendar, 
  LuSettings,
  LuArrowRight,
  LuCheck
} from 'react-icons/lu'
import { FaWhatsapp } from 'react-icons/fa6'
import { GiGears } from 'react-icons/gi'

// Vehicle makes
const vehicleMakes = [
  'Toyota', 'Honda', 'Nissan', 'Suzuki', 'Mitsubishi', 'Mazda', 
  'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Hyundai', 'Kia',
  'TATA', 'Mahindra', 'Subaru', 'Isuzu', 'Other'
]

// Part categories
const partCategories = [
  'Engine Parts',
  'Brake System',
  'Suspension',
  'Transmission',
  'Filters',
  'Cooling System',
  'Belts & Hoses',
  'Electrical',
  'Body Parts',
  'Other'
]

// Year range
const years = Array.from({ length: 30 }, (_, i) => 2025 - i)

export default function PriceQuoteCalculator() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    partCategory: '',
    partName: '',
    quantity: 1,
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Build WhatsApp message
    const message = `🚗 *Price Quote Request*

*Vehicle:* ${formData.make} ${formData.model} (${formData.year})
*Part Category:* ${formData.partCategory}
*Part Name:* ${formData.partName}
*Quantity:* ${formData.quantity}

Please provide a price quote for this part. Thank you!`

    window.open(`https://wa.me/94704344855?text=${encodeURIComponent(message)}`, '_blank')
    setSubmitted(true)
    
    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        make: '',
        model: '',
        year: '',
        partCategory: '',
        partName: '',
        quantity: 1,
      })
    }, 3000)
  }

  const isValid = formData.make && formData.model && formData.year && formData.partCategory && formData.partName

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-forge-900 via-forge-950 to-void relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-64 h-64 border border-ignition-500 rounded-full" />
        <div className="absolute bottom-10 left-10 w-48 h-48 border border-electric-500 rounded-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <LuCalculator className="w-5 h-5 text-ignition-500" />
              <span className="font-tech font-semibold text-sm text-ignition-500 uppercase tracking-wider">
                Instant Quote
              </span>
            </div>
            
            <h2 className="font-heading text-section font-bold text-white leading-tight mb-4">
              GET A <span className="gradient-text">PRICE QUOTE</span>
            </h2>
            
            {/* Orange line */}
            <div className="w-20 h-1 bg-gradient-to-r from-ignition-600 to-ignition-400 rounded-full mb-6" />
            
            <p className="text-steel-300 text-lg mb-8 max-w-md">
              Fill in your vehicle details and the part you need. We'll send you a competitive price quote via WhatsApp within minutes.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                'Free quotes with no obligation',
                'Response within 30 minutes',
                'Best prices guaranteed',
                'Expert recommendations included'
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                    <LuCheck className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-steel-200">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-forge-800/50 backdrop-blur-sm rounded-2xl border border-forge-700 p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                    <LuCheck className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">Quote Requested!</h3>
                  <p className="text-steel-400">We'll respond on WhatsApp shortly.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-forge-800/50 backdrop-blur-sm rounded-2xl border border-forge-700 p-6 lg:p-8"
                >
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Vehicle Make */}
                    <div>
                      <label className="block font-tech text-xs text-steel-400 uppercase tracking-wider mb-2">
                        <LuCar className="w-3 h-3 inline mr-1" /> Make *
                      </label>
                      <select
                        name="make"
                        value={formData.make}
                        onChange={handleChange}
                        className="w-full bg-forge-900 border border-forge-600 rounded-xl px-4 py-3 text-white font-body focus:border-ignition-500 focus:outline-none transition-colors"
                        required
                      >
                        <option value="">Select make</option>
                        {vehicleMakes.map(make => (
                          <option key={make} value={make}>{make}</option>
                        ))}
                      </select>
                    </div>

                    {/* Model */}
                    <div>
                      <label className="block font-tech text-xs text-steel-400 uppercase tracking-wider mb-2">
                        Model *
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        placeholder="e.g., Corolla"
                        className="w-full bg-forge-900 border border-forge-600 rounded-xl px-4 py-3 text-white font-body placeholder-steel-600 focus:border-ignition-500 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Year */}
                    <div>
                      <label className="block font-tech text-xs text-steel-400 uppercase tracking-wider mb-2">
                        <LuCalendar className="w-3 h-3 inline mr-1" /> Year *
                      </label>
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full bg-forge-900 border border-forge-600 rounded-xl px-4 py-3 text-white font-body focus:border-ignition-500 focus:outline-none transition-colors"
                        required
                      >
                        <option value="">Select year</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>

                    {/* Part Category */}
                    <div>
                      <label className="block font-tech text-xs text-steel-400 uppercase tracking-wider mb-2">
                        <LuSettings className="w-3 h-3 inline mr-1" /> Category *
                      </label>
                      <select
                        name="partCategory"
                        value={formData.partCategory}
                        onChange={handleChange}
                        className="w-full bg-forge-900 border border-forge-600 rounded-xl px-4 py-3 text-white font-body focus:border-ignition-500 focus:outline-none transition-colors"
                        required
                      >
                        <option value="">Select category</option>
                        {partCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Part Name */}
                  <div className="mb-4">
                    <label className="block font-tech text-xs text-steel-400 uppercase tracking-wider mb-2">
                      <GiGears className="w-3 h-3 inline mr-1" /> Part Name *
                    </label>
                    <input
                      type="text"
                      name="partName"
                      value={formData.partName}
                      onChange={handleChange}
                      placeholder="e.g., Front brake pads, Timing belt kit"
                      className="w-full bg-forge-900 border border-forge-600 rounded-xl px-4 py-3 text-white font-body placeholder-steel-600 focus:border-ignition-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Quantity */}
                  <div className="mb-6">
                    <label className="block font-tech text-xs text-steel-400 uppercase tracking-wider mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      min="1"
                      max="100"
                      className="w-24 bg-forge-900 border border-forge-600 rounded-xl px-4 py-3 text-white font-body focus:border-ignition-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!isValid}
                    className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-tech font-bold uppercase tracking-wide transition-all duration-300 ${
                      isValid
                        ? 'bg-gradient-to-r from-whatsapp to-green-600 text-white hover:shadow-whatsapp-glow hover:scale-[1.02]'
                        : 'bg-forge-700 text-steel-500 cursor-not-allowed'
                    }`}
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    Get Quote via WhatsApp
                    <LuArrowRight className="w-5 h-5" />
                  </button>

                  <p className="text-center text-xs text-steel-500 mt-4">
                    We typically respond within 30 minutes during business hours
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
