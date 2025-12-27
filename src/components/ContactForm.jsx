import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LuSend, LuCheck, LuCircleAlert, LuLoader } from 'react-icons/lu'
import { VALIDATION } from '../constants'
import { trackFormSubmission } from '../utils/analytics'

// Validation functions
const validators = {
  name: (value) => {
    if (!value.trim()) return 'Name is required'
    if (value.length < VALIDATION.NAME_MIN_LENGTH) return `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`
    if (value.length > VALIDATION.NAME_MAX_LENGTH) return `Name must be less than ${VALIDATION.NAME_MAX_LENGTH} characters`
    return ''
  },
  email: (value) => {
    if (value && !VALIDATION.EMAIL_PATTERN.test(value)) return 'Please enter a valid email address'
    return ''
  },
  phone: (value) => {
    if (!value.trim()) return 'Phone number is required'
    if (!VALIDATION.PHONE_PATTERN.test(value.replace(/\s/g, ''))) return 'Please enter a valid phone number'
    return ''
  },
  message: (value) => {
    if (!value.trim()) return 'Message is required'
    if (value.length < VALIDATION.MESSAGE_MIN_LENGTH) return `Message must be at least ${VALIDATION.MESSAGE_MIN_LENGTH} characters`
    if (value.length > VALIDATION.MESSAGE_MAX_LENGTH) return `Message must be less than ${VALIDATION.MESSAGE_MAX_LENGTH} characters`
    return ''
  },
  vehicleBrand: () => '', // Optional field
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleBrand: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('')

  // Validate single field
  const validateField = useCallback((name, value) => {
    const validator = validators[name]
    return validator ? validator(value) : ''
  }, [])

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key])
      if (error) newErrors[key] = error
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, validateField])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Real-time validation for touched fields
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    setTouched(allTouched)
    
    // Validate form
    if (!validateForm()) {
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      // Formspree form for Super Motor Trading
      const response = await fetch('https://formspree.io/f/mjgvkrrk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          vehicleBrand: formData.vehicleBrand,
          message: formData.message,
          _subject: `New inquiry from ${formData.name} - Super Motor Trading`,
        }),
      })

      if (response.ok) {
        setStatus('success')
        trackFormSubmission('contact_form', true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          vehicleBrand: '',
          message: '',
        })
        setTouched({})
        setErrors({})
        // Reset to idle after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch {
      setStatus('error')
      trackFormSubmission('contact_form', false)
      setErrorMessage('Failed to send message. Please try again or contact us via WhatsApp.')
      // Reset to idle after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const getInputClasses = (fieldName) => {
    const baseClasses = "w-full bg-gray-50 border rounded-xl px-4 py-3 text-forge-900 font-body placeholder-steel-500 focus:outline-none focus:ring-2 transition-all duration-300"
    const hasError = touched[fieldName] && errors[fieldName]
    return `${baseClasses} ${hasError 
      ? 'border-error focus:border-error focus:ring-error/20' 
      : 'border-gray-200 focus:border-ignition-600 focus:ring-ignition-600/20'}`
  }
  
  const labelClasses = "block font-tech text-sm text-steel-600 uppercase tracking-wider mb-2"

  // Field error component
  const FieldError = ({ fieldName }) => (
    <AnimatePresence>
      {touched[fieldName] && errors[fieldName] && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="text-error text-xs mt-1 font-tech flex items-center gap-1"
          role="alert"
        >
          <LuCircleAlert className="w-3 h-3" />
          {errors[fieldName]}
        </motion.p>
      )}
    </AnimatePresence>
  )

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 lg:p-8 shadow-card border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="font-heading text-2xl font-bold text-forge-900 mb-6">
        Send Us a Message
      </h3>

      <div className="space-y-4">
        {/* Name & Phone Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className={labelClasses}>
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={touched.name && !!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              placeholder="John Doe"
              className={getInputClasses('name')}
            />
            <FieldError fieldName="name" />
          </div>
          <div>
            <label htmlFor="phone" className={labelClasses}>
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={touched.phone && !!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              placeholder="+94 77 123 4567"
              className={getInputClasses('phone')}
            />
            <FieldError fieldName="phone" />
          </div>
        </div>

        {/* Email & Vehicle Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className={labelClasses}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={touched.email && !!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              placeholder="john@example.com"
              className={getInputClasses('email')}
            />
            <FieldError fieldName="email" />
          </div>
          <div>
            <label htmlFor="vehicleBrand" className={labelClasses}>
              Vehicle Brand
            </label>
            <input
              type="text"
              id="vehicleBrand"
              name="vehicleBrand"
              value={formData.vehicleBrand}
              onChange={handleChange}
              placeholder="Toyota, Honda, BMW..."
              className={getInputClasses('vehicleBrand')}
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className={labelClasses}>
            Your Message *
            <span className="text-steel-400 normal-case ml-2">
              ({formData.message.length}/{VALIDATION.MESSAGE_MAX_LENGTH})
            </span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.message && !!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            rows={4}
            placeholder="Describe the parts you're looking for..."
            className={`${getInputClasses('message')} resize-none`}
          />
          <FieldError fieldName="message" />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className={`w-full py-4 rounded-xl font-tech font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
            status === 'success'
              ? 'bg-success text-white'
              : status === 'error'
              ? 'bg-error text-white'
              : 'bg-gradient-to-r from-ignition-700 via-ignition-600 to-ignition-400 text-white hover:shadow-orange-glow'
          }`}
          whileHover={status === 'idle' ? { scale: 1.02 } : {}}
          whileTap={status === 'idle' ? { scale: 0.98 } : {}}
        >
          {status === 'loading' ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <LuLoader className="w-5 h-5" />
              </motion.div>
              <span>Sending...</span>
            </>
          ) : status === 'success' ? (
            <>
              <LuCheck className="w-5 h-5" />
              <span>Message Sent!</span>
            </>
          ) : status === 'error' ? (
            <>
              <LuCircleAlert className="w-5 h-5" />
              <span>Try Again</span>
            </>
          ) : (
            <>
              <LuSend className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </motion.button>

        {/* Error Message */}
        <AnimatePresence>
          {status === 'error' && errorMessage && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-error text-sm text-center font-tech"
            >
              {errorMessage}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Privacy Note */}
        <p className="text-xs text-steel-500 text-center">
          By submitting, you agree to our privacy policy. We'll never share your information.
        </p>
      </div>
    </motion.form>
  )
}
