import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LuSend, LuCheck, LuCircleAlert, LuLoader } from 'react-icons/lu'
import emailjs from '@emailjs/browser'
import { VALIDATION } from '../constants'
import { trackFormSubmission } from '../utils/analytics'
import { EMAILJS_CONFIG } from '../config/emailjs'

interface FormData {
  name: string
  email: string
  phone: string
  vehicleBrand: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  vehicleBrand?: string
  message?: string
}

interface TouchedFields {
  name?: boolean
  email?: boolean
  phone?: boolean
  vehicleBrand?: boolean
  message?: boolean
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

// Retry configuration
const MAX_RETRIES = 3
const BASE_DELAY_MS = 1000
const RATE_LIMIT_MS = 30000 // 30 seconds between submissions

// Delay helper for retry logic
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

// Validation functions
const validators: Record<keyof FormData, (value: string) => string> = {
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

// Get user-friendly error message based on error type
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Network errors
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return 'Network error. Please check your connection and try again.'
    }
  }

  // EmailJS specific errors
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = (error as { status: number }).status
    if (status === 0) {
      return 'Network error. Please check your internet connection.'
    }
    if (status === 400) {
      return 'Configuration error. Please check your EmailJS IDs.'
    }
    if (status === 403) {
      return 'Access denied. Domain validation failed or Public Key invalid.'
    }
    if (status >= 500) {
      return 'Server error. Please try again in a few minutes.'
    }
    if (status === 429) {
      console.warn('Rate limited')
      return 'Too many requests. Please wait a moment.'
    }
  }

  return 'Failed to send message. Please try WhatsApp for immediate assistance.'
}

interface FieldErrorProps {
  fieldName: keyof FormData
  touched: TouchedFields
  errors: FormErrors
}

// Field error component
function FieldError({ fieldName, touched, errors }: FieldErrorProps) {
  return (
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
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    vehicleBrand: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [shake, setShake] = useState(false)
  const lastSubmitTimeRef = useRef<number>(0)

  // Validate single field
  const validateField = useCallback((name: keyof FormData, value: string): string => {
    const validator = validators[name]
    return validator ? validator(value) : ''
  }, [])

  // Validate all fields
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {}
      ; (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
        const error = validateField(key, formData[key])
        if (error) newErrors[key] = error
      })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, validateField])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Real-time validation for touched fields
    if (touched[name as keyof TouchedFields]) {
      const error = validateField(name as keyof FormData, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name as keyof FormData, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  // Submit with retry logic
  async function submitWithRetry(templateParams: Record<string, string>, attempt = 1): Promise<void> {
    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      )
    } catch (error) {
      if (attempt < MAX_RETRIES) {
        // Exponential backoff: 1s, 2s, 4s
        await delay(BASE_DELAY_MS * Math.pow(2, attempt - 1))
        return submitWithRetry(templateParams, attempt + 1)
      }
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    // Rate limiting check
    const now = Date.now()
    const timeSinceLastSubmit = now - lastSubmitTimeRef.current
    if (timeSinceLastSubmit < RATE_LIMIT_MS && lastSubmitTimeRef.current > 0) {
      const waitSeconds = Math.ceil((RATE_LIMIT_MS - timeSinceLastSubmit) / 1000)
      setStatus('error')
      setErrorMessage(`Please wait ${waitSeconds} seconds before submitting again.`)
      setTimeout(() => setStatus('idle'), 3000)
      return
    }

    // Mark all fields as touched
    const allTouched = (Object.keys(formData) as Array<keyof FormData>).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as TouchedFields
    )
    setTouched(allTouched)

    // Validate form
    if (!validateForm()) {
      // Trigger shake animation
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      setStatus('error')
      setErrorMessage('EmailJS not configured. Please add your credentials in src/config/emailjs.js')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        vehicle: formData.vehicleBrand || 'Not specified',
        message: formData.message,
      }

      // Send admin notification email with retry
      await submitWithRetry(templateParams)

      // Update last submit time
      lastSubmitTimeRef.current = Date.now()

      // Send auto-reply to customer if email is provided
      if (formData.email) {
        try {
          await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.AUTO_REPLY_TEMPLATE_ID,
            templateParams,
            EMAILJS_CONFIG.PUBLIC_KEY
          )
        } catch (autoReplyError) {
          console.warn('Auto-reply email failed, but main email sent:', autoReplyError)
          // Don't fail the whole submission if auto-reply fails
        }
      }

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
    } catch (error) {
      console.error('EmailJS Error:', error)
      setStatus('error')
      trackFormSubmission('contact_form', false)
      setErrorMessage(getErrorMessage(error))
      // Reset to idle after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const getInputClasses = (fieldName: keyof FormData): string => {
    const baseClasses = "w-full bg-gray-50 border rounded-xl px-4 py-3 text-forge-900 font-body placeholder-steel-500 focus:outline-none focus:ring-2 transition-all duration-300"
    const hasError = touched[fieldName] && errors[fieldName]
    return `${baseClasses} ${hasError
      ? 'border-error focus:border-error focus:ring-error/20'
      : 'border-gray-200 focus:border-ignition-600 focus:ring-ignition-600/20'}`
  }

  const labelClasses = "block font-tech text-sm text-steel-400 uppercase tracking-wider mb-2"

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl p-6 lg:p-8 shadow-card border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        x: shake ? [0, -10, 10, -10, 10, 0] : 0
      }}
      transition={{ duration: shake ? 0.4 : 0.5 }}
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
            <FieldError fieldName="name" touched={touched} errors={errors} />
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
            <FieldError fieldName="phone" touched={touched} errors={errors} />
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
            <FieldError fieldName="email" touched={touched} errors={errors} />
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
          <FieldError fieldName="message" touched={touched} errors={errors} />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          aria-label={status === 'loading' ? 'Sending message' : status === 'success' ? 'Message sent' : 'Send message'}
          className={`w-full py-4 rounded-xl font-tech font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${status === 'success'
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
              role="alert"
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
