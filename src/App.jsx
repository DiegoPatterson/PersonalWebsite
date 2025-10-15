import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Terminal from './components/Terminal'
import Background from './components/Background'
import DarkAIBackground from './components/DarkAIBackground'
import StatusBar from './components/StatusBar'
import Scanline from './components/Scanline'
import AudioController from './components/AudioController'
import ModeTransition from './components/ModeTransition'
import QuickCommandsPanel from './components/QuickCommandsPanel'
import ContactForm from './components/ContactForm'

function App() {
  const [isBooting, setIsBooting] = useState(true)
  const [bootSequence, setBootSequence] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [windowZIndexes, setWindowZIndexes] = useState({
    terminal: 10,
    quickCommands: 10,
    contactForm: 10000,  // Modals need to be much higher to appear above terminal
    game: 9999
  })
  const [highestZIndex, setHighestZIndex] = useState(10000)

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const bringToFront = (windowName) => {
    const newZIndex = highestZIndex + 1
    setHighestZIndex(newZIndex)
    setWindowZIndexes(prev => ({
      ...prev,
      [windowName]: newZIndex
    }))
  }

  useEffect(() => {
    const bootMessages = [
      'INITIALIZING RezuMe SYSTEMS...',
      'LOADING NEURAL NETWORKS...',
      'ESTABLISHING SECURE CONNECTION...',
      'DECRYPTING MEMORY BANKS...',
      'CALIBRATING CONSCIOUSNESS MATRIX...',
      'VERIFYING IDENTITY PROTOCOLS...',
      'SYSTEM STATUS: ONLINE',
      'WELCOME TO RezuMe v3.7.2',
    ]
    
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < bootMessages.length) {
        setBootSequence(prev => [...prev, bootMessages[currentIndex]])
        currentIndex++
      } else {
        clearInterval(interval)
        setTimeout(() => setIsBooting(false), 1000)
      }
    }, 300)

    return () => clearInterval(interval)
  }, [])

  // Handle mode transition
  const handleModeToggle = () => {
    setIsTransitioning(true)
    
    // Wait for transition to complete before switching
    setTimeout(() => {
      setDarkMode(prev => !prev)
    }, 300) // Start switch during corruption phase
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 1500) // Total transition duration
  }

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-1000 ${
      darkMode ? 'bg-black dark-ai-mode' : 'bg-cyber-darker cyber-mode'
    }`}>
      {/* Different backgrounds for each mode */}
      {!darkMode && <Background />}
      {darkMode && <DarkAIBackground />}
      
      <Scanline darkMode={darkMode} />
      <AudioController />
      <ModeTransition isTransitioning={isTransitioning} darkMode={darkMode} />
      
      <AnimatePresence mode="wait">
        {isBooting ? (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-cyber-darker"
          >
            <div className="max-w-2xl w-full px-4 sm:px-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6 sm:mb-8 text-center"
              >
                <h1 className="text-4xl sm:text-6xl font-bold glow-text mb-3 sm:mb-4 glitch" data-text="RezuMe">
                  RezuMe
                </h1>
                <p className="text-cyber-violet text-xs sm:text-sm">Resume Execution and Understanding Matrix Engine</p>
              </motion.div>

              <div className="space-y-1 sm:space-y-2 font-mono text-xs sm:text-sm">
                {bootSequence.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-cyber-cyan flex items-center"
                  >
                    <span className="text-green-500 mr-2">{'>'}</span>
                    {message}
                    {index === bootSequence.length - 1 && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="ml-1"
                      >
                        ▊
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-8"
              >
                <div className="w-full bg-cyber-dark h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-violet to-cyber-pink"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.5, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <StatusBar darkMode={darkMode} onModeToggle={handleModeToggle} />
            
            {/* Two Column Layout: Terminal + Quick Commands */}
            <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 lg:gap-6 items-start">
                {/* Main Terminal */}
                <div>
                  <Terminal 
                    darkMode={darkMode}
                    isMobile={isMobile}
                    zIndex={windowZIndexes.terminal}
                    onBringToFront={() => bringToFront('terminal')}
                    onBringGameToFront={() => bringToFront('game')}
                    onOpenContactForm={() => {
                      setShowContactForm(true)
                      bringToFront('contactForm')
                    }}
                  />
                </div>
                
                {/* Quick Commands Panel - Always Visible on Desktop */}
                <div className="hidden lg:block pt-20">
                  <QuickCommandsPanel 
                    darkMode={darkMode}
                    onModeToggle={handleModeToggle}
                    zIndex={windowZIndexes.quickCommands}
                    onBringToFront={() => bringToFront('quickCommands')}
                    onCommandSelect={(cmd) => {
                      // Trigger command in terminal
                      const event = new CustomEvent('executeCommand', { detail: cmd })
                      window.dispatchEvent(event)
                    }} 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal - Rendered at App level for proper z-index */}
      <AnimatePresence>
        {showContactForm && (
          <ContactForm
            onClose={() => setShowContactForm(false)}
            darkMode={darkMode}
            zIndex={windowZIndexes.contactForm}
            onBringToFront={() => bringToFront('contactForm')}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
