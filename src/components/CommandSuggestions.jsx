import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const CommandSuggestions = ({ darkMode, onCommandSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const suggestions = [
    { cmd: 'access experience.log', desc: 'View work experience', icon: '💼' },
    { cmd: 'query education.db', desc: 'View education', icon: '🎓' },
    { cmd: 'open projects.repo', desc: 'View pro projects', icon: '🚀' },
    { cmd: 'access vibe_projects.fun', desc: 'View vibe experiments', icon: '✨' },
    { cmd: 'scan affiliations.sys', desc: 'View affiliations', icon: '🤝' },
    { cmd: 'decrypt core_memory', desc: 'View philosophy', icon: '💭' },
  ]

  return (
    <motion.div
      className="border-t border-cyber-cyan/30 bg-cyber-dark/30 px-4 py-2"
      initial={false}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-cyber-violet text-sm hover:text-cyber-cyan transition-colors"
      >
        <span>Quick Commands</span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
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
                    // Focus the input field
                    const input = document.querySelector('input[type="text"]')
                    if (input) {
                      input.focus()
                    }
                  }}
                  className="flex items-center space-x-2 px-3 py-2 bg-cyber-dark/50 border border-cyber-cyan/20 rounded hover:border-cyber-cyan/50 hover:bg-cyber-cyan/5 transition-all text-left"
                >
                  <span className="text-lg">{suggestion.icon}</span>
                  <div className="flex-1">
                    <div className="text-cyber-cyan text-xs font-mono">{suggestion.cmd}</div>
                    <div className="text-gray-400 text-xs">{suggestion.desc}</div>
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
