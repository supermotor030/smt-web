import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LuSearch, 
  LuX, 
  LuSend, 
  LuCar, 
  LuCalendar,
  LuSettings,
  LuCheck,
  LuCircleAlert
} from 'react-icons/lu'
import { GiSpanner, GiGears } from 'react-icons/gi'
import { FaWhatsapp } from 'react-icons/fa6'

// Common vehicle makes for autocomplete
const VEHICLE_MAKES = [
  'Toyota', 'Honda', 'Nissan', 'Suzuki', 'Mitsubishi', 'Mazda', 'Subaru',
  'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Peugeot', 'Renault',
  'Hyundai', 'Kia', 'Tata', 'Mahindra', 'Maruti', 'Ford', 'Chevrolet'
]

// Common part categories
const PART_CATEGORIES = [
  { id: 'engine', label: 'Engine Parts', icon: GiGears },
  { id: 'suspension', label: 'Suspension', icon: GiSpanner },
  { id: 'brakes', label: 'Brakes', icon: LuSettings },
  { id: 'electrical', label: 'Electrical', icon: LuSettings },
  { id: 'body', label: 'Body Parts', icon: LuCar },
  { id: 'other', label: 'Other', icon: GiSpanner },
]

export default function PartRequestForm({ isOpen, onClose }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    partCategory: '',
    partDescription: '',
    urgency: 'normal',
    name: '',
    phone: '',
    preferredContact: 'whatsapp',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [filteredMakes, setFilteredMakes] = useState([])

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
    
    // Filter vehicle makes for autocomplete
    if (field === 'vehicleMake') {
      if (value.length > 0) {
        const filtered = VEHICLE_MAKES.filter(make => 
          make.toLowerCase().startsWith(value.toLowerCase())
        )
        setFilteredMakes(filtered)
      } else {
        setFilteredMakes([])
      }
    }
  }

  const validateStep = (stepNum) => {
    const newErrors = {}
    
    if (stepNum === 1) {
      if (!formData.vehicleMake) newErrors.vehicleMake = 'Vehicle make is required'
      if (!formData.vehicleModel) newErrors.vehicleModel = 'Vehicle model is required'
      if (!formData.vehicleYear) newErrors.vehicleYear = 'Year is required'
    } else if (stepNum === 2) {
      if (!formData.partCategory) newErrors.partCategory = 'Select a category'
      if (!formData.partDescription) newErrors.partDescription = 'Describe the part you need'
    } else if (stepNum === 3) {
      if (!formData.name) newErrors.name = 'Name is required'
      if (!formData.phone) newErrors.phone = 'Phone number is required'
      else if (!/^[\d\s+()-]{9,15}$/.test(formData.phone)) {
        newErrors.phone = 'Enter a valid phone number'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setStep(prev => prev - 1)
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return
    
    setIsSubmitting(true)
    
    // Construct WhatsApp message
    const message = `🔧 *PART REQUEST*

*Vehicle Details:*
• Make: ${formData.vehicleMake}
• Model: ${formData.vehicleModel}
• Year: ${formData.vehicleYear}

*Part Needed:*
• Category: ${PART_CATEGORIES.find(c => c.id === formData.partCategory)?.label}
• Description: ${formData.partDescription}
• Urgency: ${formData.urgency === 'urgent' ? '🚨 URGENT' : 'Normal'}

*Contact:*
• Name: ${formData.name}
• Phone: ${formData.phone}
• Preferred: ${formData.preferredContact === 'whatsapp' ? 'WhatsApp' : 'Phone Call'}`

    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Open WhatsApp with the message
    const whatsappUrl = `https://wa.me/94704344855?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setStep(1)
    setFormData({
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      partCategory: '',
      partDescription: '',
      urgency: 'normal',
      name: '',
      phone: '',
      preferredContact: 'whatsapp',
    })
    setErrors({})
    setIsSubmitted(false)
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 40 }, (_, i) => currentYear - i)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-void/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-ignition-600 to-ignition-500 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <LuSearch className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-lg">REQUEST A PART</h3>
                <p className="text-white/80 text-sm">Can't find what you need? We'll source it!</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <LuX className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Progress Steps */}
          {!isSubmitted && (
            <div className="px-6 py-3 bg-gray-50 border-b">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        step >= s ? 'bg-ignition-600 text-white' : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step > s ? <LuCheck className="w-4 h-4" /> : s}
                    </div>
                    {s < 3 && (
                      <div className={`w-16 sm:w-24 h-1 mx-2 ${step > s ? 'bg-ignition-600' : 'bg-gray-200'}`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Vehicle</span>
                <span>Part Details</span>
                <span>Contact</span>
              </div>
            </div>
          )}

          {/* Form Content */}
          <div className="p-6">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LuCheck className="w-8 h-8 text-success" />
                </div>
                <h4 className="font-heading font-bold text-xl text-forge-900 mb-2">Request Sent!</h4>
                <p className="text-gray-600 mb-6">
                  We'll check availability and get back to you within 5 minutes on WhatsApp.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
                  >
                    New Request
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-ignition-600 hover:bg-ignition-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Step 1: Vehicle Details */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <LuCar className="inline w-4 h-4 mr-1" />
                        Vehicle Make *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.vehicleMake}
                          onChange={(e) => handleChange('vehicleMake', e.target.value)}
                          placeholder="e.g., Toyota, Honda, BMW"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.vehicleMake ? 'border-error' : 'border-gray-300'
                          } focus:ring-2 focus:ring-ignition-500 focus:border-transparent`}
                        />
                        {filteredMakes.length > 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto">
                            {filteredMakes.map((make) => (
                              <button
                                key={make}
                                type="button"
                                onClick={() => {
                                  handleChange('vehicleMake', make)
                                  setFilteredMakes([])
                                }}
                                className="w-full px-4 py-2 text-left hover:bg-gray-50"
                              >
                                {make}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      {errors.vehicleMake && (
                        <p className="mt-1 text-sm text-error flex items-center gap-1">
                          <LuCircleAlert className="w-3 h-3" />
                          {errors.vehicleMake}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Vehicle Model *
                      </label>
                      <input
                        type="text"
                        value={formData.vehicleModel}
                        onChange={(e) => handleChange('vehicleModel', e.target.value)}
                        placeholder="e.g., Corolla, Civic, 3 Series"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.vehicleModel ? 'border-error' : 'border-gray-300'
                        } focus:ring-2 focus:ring-ignition-500 focus:border-transparent`}
                      />
                      {errors.vehicleModel && (
                        <p className="mt-1 text-sm text-error flex items-center gap-1">
                          <LuCircleAlert className="w-3 h-3" />
                          {errors.vehicleModel}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <LuCalendar className="inline w-4 h-4 mr-1" />
                        Year *
                      </label>
                      <select
                        value={formData.vehicleYear}
                        onChange={(e) => handleChange('vehicleYear', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.vehicleYear ? 'border-error' : 'border-gray-300'
                        } focus:ring-2 focus:ring-ignition-500 focus:border-transparent`}
                      >
                        <option value="">Select Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      {errors.vehicleYear && (
                        <p className="mt-1 text-sm text-error flex items-center gap-1">
                          <LuCircleAlert className="w-3 h-3" />
                          {errors.vehicleYear}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Part Details */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Part Category *
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {PART_CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => handleChange('partCategory', cat.id)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              formData.partCategory === cat.id
                                ? 'border-ignition-600 bg-ignition-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <cat.icon className={`w-5 h-5 mx-auto mb-1 ${
                              formData.partCategory === cat.id ? 'text-ignition-600' : 'text-gray-400'
                            }`} />
                            <span className="text-xs font-medium">{cat.label}</span>
                          </button>
                        ))}
                      </div>
                      {errors.partCategory && (
                        <p className="mt-1 text-sm text-error flex items-center gap-1">
                          <LuCircleAlert className="w-3 h-3" />
                          {errors.partCategory}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Part Description *
                      </label>
                      <textarea
                        value={formData.partDescription}
                        onChange={(e) => handleChange('partDescription', e.target.value)}
                        placeholder="Describe the part you need (e.g., Front brake pads, Timing belt, Alternator...)"
                        rows={3}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.partDescription ? 'border-error' : 'border-gray-300'
                        } focus:ring-2 focus:ring-ignition-500 focus:border-transparent resize-none`}
                      />
                      {errors.partDescription && (
                        <p className="mt-1 text-sm text-error flex items-center gap-1">
                          <LuCircleAlert className="w-3 h-3" />
                          {errors.partDescription}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Urgency
                      </label>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => handleChange('urgency', 'normal')}
                          className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                            formData.urgency === 'normal'
                              ? 'border-ignition-600 bg-ignition-50'
                              : 'border-gray-200'
                          }`}
                        >
                          Normal
                        </button>
                        <button
                          type="button"
                          onClick={() => handleChange('urgency', 'urgent')}
                          className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                            formData.urgency === 'urgent'
                              ? 'border-error bg-error/10 text-error'
                              : 'border-gray-200'
                          }`}
                        >
                          🚨 Urgent
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Contact Details */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Enter your name"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.name ? 'border-error' : 'border-gray-300'
                        } focus:ring-2 focus:ring-ignition-500 focus:border-transparent`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-error flex items-center gap-1">
                          <LuCircleAlert className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+94 XX XXX XXXX"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.phone ? 'border-error' : 'border-gray-300'
                        } focus:ring-2 focus:ring-ignition-500 focus:border-transparent`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-error flex items-center gap-1">
                          <LuCircleAlert className="w-3 h-3" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Preferred Contact Method
                      </label>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => handleChange('preferredContact', 'whatsapp')}
                          className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                            formData.preferredContact === 'whatsapp'
                              ? 'border-whatsapp bg-whatsapp/10 text-whatsapp'
                              : 'border-gray-200'
                          }`}
                        >
                          <FaWhatsapp className="w-4 h-4" />
                          WhatsApp
                        </button>
                        <button
                          type="button"
                          onClick={() => handleChange('preferredContact', 'call')}
                          className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                            formData.preferredContact === 'call'
                              ? 'border-ignition-600 bg-ignition-50'
                              : 'border-gray-200'
                          }`}
                        >
                          📞 Call
                        </button>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 text-sm">
                      <h5 className="font-semibold text-gray-700 mb-2">Request Summary:</h5>
                      <p className="text-gray-600">
                        {formData.vehicleYear} {formData.vehicleMake} {formData.vehicleModel} - {formData.partDescription}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-3 mt-6">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 px-4 py-3 bg-ignition-600 hover:bg-ignition-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-3 bg-whatsapp hover:bg-whatsapp/90 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <LuSend className="w-4 h-4" />
                          Send via WhatsApp
                        </>
                      )}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
