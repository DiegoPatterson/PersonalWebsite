import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const CommandSuggestions = ({ onCommandSelect }) => {
  const [isExpanded, setIsExpanded] = useState(true) // Start expanded on mobile

  const suggestions = [
    { cmd: 'about me', desc: 'View creator profile', icon: '@' },
    { cmd: 'access experience.log', desc: 'View work experience', icon: '#' },
    { cmd: 'query education.db', desc: 'View education', icon: '+' },
    { cmd: 'open projects.repo', desc: 'View pro projects', icon: '*' },
    { cmd: 'access prompt_projects.exp', desc: 'View prompt experiments', icon: '~' },
    { cmd: 'play game', desc: 'Launch game portfolio', icon: '>' },
    { cmd: 'scan affiliations.sys', desc: 'View affiliations', icon: '=' },
    { cmd: 'decrypt core_memory', desc: 'View philosophy', icon: '%' },
    { cmd: 'contact form', desc: 'Send me a message', icon: '$' },
    { cmd: 'contact', desc: 'Contact information', icon: '&' },
    { cmd: 'resume', desc: 'Download resume', icon: '|' },
    { cmd: 'social', desc: 'Social media links', icon: '-' },
  ]

  return (
    <motion.div
      className="border-t border-cyber-cyan/30 bg-cyber-dark/30 px-4 py-2 max-h-[40vh] overflow-y-auto"
      initial={false}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-cyber-violet text-sm hover:text-cyber-cyan transition-colors touch-manipulation py-2"
      >
        <span className="font-semibold">{'>'} Quick Commands</span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-lg"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-2 mt-3">
              {suggestions.map((suggestion, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => {
                    if (onCommandSelect) {
                      onCommandSelect(suggestion.cmd)
                    }
                    // Auto-submit on mobile
                    const form = document.querySelector('form')
                    if (form) {
                      setTimeout(() => {
                        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
                      }, 100)
                    }
                  }}
                  className="flex items-center space-x-3 px-4 py-3 bg-cyber-dark/50 border border-cyber-cyan/20 rounded-lg hover:border-cyber-cyan/50 hover:bg-cyber-cyan/5 active:bg-cyber-cyan/10 transition-all text-left touch-manipulation"
                >
                  <span className="text-2xl">{suggestion.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-cyber-cyan text-sm font-mono font-semibold truncate">{suggestion.cmd}</div>
                    <div className="text-gray-400 text-xs truncate">{suggestion.desc}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default CommandSuggestions
