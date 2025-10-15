import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ContactForm = ({ darkMode, onClose, onBringToFront, zIndex }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [captchaAnswer, setCaptchaAnswer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Simple math CAPTCHA
  const num1 = Math.floor(Math.random() * 10) + 1
  const num2 = Math.floor(Math.random() * 10) + 1
  const correctAnswer = num1 + num2

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.name.trim()) {
      setError('Please enter your name')
      return
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setError('Please enter a valid email address')
      return
    }
    if (!formData.message.trim()) {
      setError('Please enter a message')
      return
    }
    if (parseInt(captchaAnswer) !== correctAnswer) {
      setError('Incorrect CAPTCHA answer. Please try again.')
      return
    }

    setIsSubmitting(true)

    // Simulate submission (replace with actual backend call)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      
      // Open email client as fallback
      const mailtoLink = `mailto:diego.patterson@example.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact')}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`
      window.location.href = mailtoLink
    }, 1000)
  }

  if (submitted) {
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center p-4"
        style={{ 
          zIndex: zIndex || 9999, 
          pointerEvents: 'none',
          isolation: 'isolate',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          style={{ pointerEvents: 'auto' }}
        />
        
        {/* Success Modal */}
        <motion.div
          drag
          dragMomentum={false}
          dragConstraints={{ top: -200, left: -400, right: 400, bottom: 200 }}
          dragElastic={0.1}
          whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={onBringToFront}
          className={`relative p-8 rounded-lg border-2 text-center cursor-grab ${
            darkMode
              ? 'bg-black/95 border-green-500/50'
              : 'bg-cyber-dark/95 border-green-500/50'
          }`}
          style={{ pointerEvents: 'auto' }}
        >
          <div className="text-6xl mb-4">✅</div>
          <h3 className={`text-xl font-bold mb-2 ${
            darkMode ? 'text-green-400' : 'text-green-400'
          }`}>
            Message Sent Successfully!
          </h3>
          <p className={`text-sm mb-6 ${
            darkMode ? 'text-gray-400' : 'text-gray-400'
          }`}>
            Your email client should open shortly. If not, please email directly.
          </p>
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-lg transition-all ${
              darkMode
                ? 'bg-red-900/50 hover:bg-red-900/70 text-red-400 border border-red-500/50'
                : 'bg-cyber-cyan/20 hover:bg-cyber-cyan/30 text-cyber-cyan border border-cyber-cyan/50'
            }`}
          >
            Close
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-2 sm:p-4"
      style={{ 
        zIndex: zIndex || 9999, 
        pointerEvents: 'none',
        isolation: 'isolate',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        style={{ pointerEvents: 'auto' }}
      />
      
      {/* Draggable Form Modal - Disabled drag on mobile */}
      <motion.div
        drag="false"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={onBringToFront}
        className={`relative rounded-lg border-2 w-full max-w-2xl max-h-[95vh] overflow-hidden ${
          darkMode
            ? 'bg-black/95 border-red-500/50'
            : 'bg-cyber-dark/95 border-cyber-cyan/50'
        }`}
        style={{ pointerEvents: 'auto' }}
      >
      {/* Header */}
      <div className={`flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b ${
        darkMode ? 'bg-black/60 border-red-500/30' : 'bg-cyber-dark/80 border-cyber-cyan/30'
      }`}>
        <h2 className={`text-lg sm:text-2xl font-bold ${
          darkMode ? 'text-red-400' : 'text-cyber-cyan'
        }`}>
          📧 Contact Form
        </h2>
        <button
          onClick={onClose}
          onPointerDown={(e) => e.stopPropagation()}
          className={`text-2xl hover:scale-110 transition-transform ${
            darkMode ? 'text-red-400 hover:text-red-300' : 'text-cyber-cyan hover:text-cyan-300'
          }`}
        >
          ×
        </button>
      </div>
      
      {/* Form Content - Scrollable on mobile */}
      <div className="p-3 sm:p-6 overflow-y-auto max-h-[calc(95vh-80px)]" onPointerDown={(e) => e.stopPropagation()}>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className={`block text-sm font-bold mb-2 ${
            darkMode ? 'text-violet-400' : 'text-cyber-violet'
          }`}>
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded border-2 bg-transparent outline-none transition-all ${
              darkMode
                ? 'border-red-500/30 focus:border-red-500 text-gray-200'
                : 'border-cyber-cyan/30 focus:border-cyber-cyan text-gray-200'
            }`}
            placeholder="Your Name"
          />
        </div>

        {/* Email */}
        <div>
          <label className={`block text-sm font-bold mb-2 ${
            darkMode ? 'text-violet-400' : 'text-cyber-violet'
          }`}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded border-2 bg-transparent outline-none transition-all ${
              darkMode
                ? 'border-red-500/30 focus:border-red-500 text-gray-200'
                : 'border-cyber-cyan/30 focus:border-cyber-cyan text-gray-200'
            }`}
            placeholder="your.email@example.com"
          />
        </div>

        {/* Subject */}
        <div>
          <label className={`block text-sm font-bold mb-2 ${
            darkMode ? 'text-violet-400' : 'text-cyber-violet'
          }`}>
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded border-2 bg-transparent outline-none transition-all ${
              darkMode
                ? 'border-red-500/30 focus:border-red-500 text-gray-200'
                : 'border-cyber-cyan/30 focus:border-cyber-cyan text-gray-200'
            }`}
            placeholder="Project Inquiry / Job Opportunity / etc."
          />
        </div>

        {/* Message */}
        <div>
          <label className={`block text-sm font-bold mb-2 ${
            darkMode ? 'text-violet-400' : 'text-cyber-violet'
          }`}>
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className={`w-full px-4 py-2 rounded border-2 bg-transparent outline-none transition-all resize-none ${
              darkMode
                ? 'border-red-500/30 focus:border-red-500 text-gray-200'
                : 'border-cyber-cyan/30 focus:border-cyber-cyan text-gray-200'
            }`}
            placeholder="Your message here..."
          />
        </div>

        {/* CAPTCHA */}
        <div>
          <label className={`block text-sm font-bold mb-2 ${
            darkMode ? 'text-violet-400' : 'text-cyber-violet'
          }`}>
            Security Check: What is {num1} + {num2}? *
          </label>
          <input
            type="number"
            value={captchaAnswer}
            onChange={(e) => setCaptchaAnswer(e.target.value)}
            className={`w-full px-4 py-2 rounded border-2 bg-transparent outline-none transition-all ${
              darkMode
                ? 'border-red-500/30 focus:border-red-500 text-gray-200'
                : 'border-cyber-cyan/30 focus:border-cyber-cyan text-gray-200'
            }`}
            placeholder="Your answer"
          />
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-500/20 border border-red-500/50 rounded px-4 py-2 text-red-400 text-sm"
            >
              ⚠️ {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold text-sm sm:text-base transition-all ${
              darkMode
                ? 'bg-red-900/50 hover:bg-red-900/70 text-red-400 border-2 border-red-500/50 hover:border-red-400'
                : 'bg-cyber-cyan/20 hover:bg-cyber-cyan/30 text-cyber-cyan border-2 border-cyber-cyan/50 hover:border-cyber-cyan'
            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? '⏳ Sending...' : '📤 Send Message'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold text-sm sm:text-base transition-all ${
              darkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-400 border-2 border-gray-700'
                : 'bg-gray-800 hover:bg-gray-700 text-gray-400 border-2 border-gray-700'
            }`}
          >
            Cancel
          </button>
        </div>
      </form>

      <p className={`text-xs mt-4 text-center ${
        darkMode ? 'text-gray-600' : 'text-gray-600'
      }`}>
        🔒 Your information is secure and will not be shared with third parties.
      </p>
      </div>
    </motion.div>
    </div>
  )
}

export default ContactForm
