import { motion } from 'framer-motion'

const QuickCommandsPanel = ({ darkMode, onCommandSelect, onModeToggle, zIndex, onBringToFront }) => {
  const commands = [
    { 
      cmd: 'about me', 
      desc: 'View Creator Profile', 
      icon: '👤',
      category: 'Profile'
    },
    { 
      cmd: 'access experience.log', 
      desc: 'Work Experience', 
      icon: '💼',
      category: 'Professional'
    },
    { 
      cmd: 'query education.db', 
      desc: 'Education Background', 
      icon: '🎓',
      category: 'Professional'
    },
    { 
      cmd: 'open projects.repo', 
      desc: 'Professional Projects', 
      icon: '🚀',
      category: 'Projects'
    },
    { 
      cmd: 'all projects', 
      desc: 'ALL Projects (Unfiltered)', 
      icon: '📂',
      category: 'Projects'
    },
    { 
      cmd: 'access prompt_projects.exp', 
      desc: 'Prompt Engineering Experiments', 
      icon: '🤖',
      category: 'Projects'
    },
    { 
      cmd: 'play game', 
      desc: 'Game Portfolio', 
      icon: '🎮',
      category: 'Interactive'
    },
    { 
      cmd: 'scan affiliations.sys', 
      desc: 'Professional Groups', 
      icon: '🤝',
      category: 'Professional'
    },
    { 
      cmd: 'decrypt core_memory', 
      desc: 'Personal Philosophy', 
      icon: '💭',
      category: 'Profile'
    },
    { 
      cmd: 'contact', 
      desc: 'Contact Information', 
      icon: '📬',
      category: 'Contact'
    },
    { 
      cmd: 'contact form', 
      desc: 'Send Message', 
      icon: '✉️',
      category: 'Contact'
    },
    { 
      cmd: 'social', 
      desc: 'Social Media Links', 
      icon: '🌐',
      category: 'Contact'
    },
    { 
      cmd: 'resume', 
      desc: 'Download Resume', 
      icon: '📄',
      category: 'Credentials'
    },
    { 
      cmd: 'certifications', 
      desc: 'View Certifications', 
      icon: '🏆',
      category: 'Credentials'
    },
    { 
      cmd: 'skills', 
      desc: 'Skills & Tech Stack', 
      icon: '💪',
      category: 'Skills & Analytics'
    },
    { 
      cmd: 'analytics', 
      desc: 'Portfolio Metrics', 
      icon: '📊',
      category: 'Skills & Analytics'
    },
    { 
      cmd: 'help', 
      desc: 'All Commands', 
      icon: '❓',
      category: 'System'
    },
  ]

  const categories = ['Profile', 'Professional', 'Projects', 'Interactive', 'Contact', 'Credentials', 'Skills & Analytics', 'System']

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={{ top: -100, left: -300, right: 300, bottom: 100 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
      onPointerDown={onBringToFront}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`backdrop-blur-md rounded-lg shadow-2xl overflow-hidden flex flex-col cursor-grab ${
        darkMode 
          ? 'bg-gradient-to-br from-red-950/20 via-black/60 to-violet-950/20 border border-red-500/40' 
          : 'bg-cyber-dark/50 border border-cyber-cyan/30'
      }`}
      style={{ height: '692px', position: 'relative', zIndex: zIndex || 10 }} // Match terminal total height (header + content + footer)
    >
      {/* Panel Header */}
      <div className={`border-b px-4 py-3 flex-shrink-0 cursor-grab active:cursor-grabbing ${
        darkMode
          ? 'bg-black/60 border-red-500/30'
          : 'bg-cyber-dark/80 border-cyber-cyan/30'
      }`}>
        <h2 className={`text-sm font-bold ${
          darkMode 
            ? 'text-red-400 glitch-dark' 
            : 'text-cyber-cyan'
        }`}>
          QUICK ACCESS
        </h2>
        <p className={`text-xs mt-1 ${
          darkMode ? 'text-violet-400/70' : 'text-cyber-violet/70'
        }`}>
          Click to execute
        </p>
      </div>

      {/* Commands List - Scrollable */}
      <div className="p-4 space-y-4 flex-1 overflow-y-auto custom-scrollbar" onPointerDown={(e) => e.stopPropagation()}>
        {/* Mode Toggle Button - Prominent */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          onClick={onModeToggle}
          className={`w-full px-4 py-4 rounded-lg transition-all group relative overflow-hidden ${
            darkMode
              ? 'bg-gradient-to-r from-red-900/40 to-violet-900/40 border-2 border-red-500/50 hover:border-red-400 hover:shadow-lg hover:shadow-red-500/20'
              : 'bg-gradient-to-r from-cyan-900/40 to-violet-900/40 border-2 border-cyber-cyan/50 hover:border-cyber-cyan hover:shadow-lg hover:shadow-cyber-cyan/20'
          }`}
        >
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">
                {darkMode ? '🔓' : '🔒'}
              </span>
              <div className="text-left">
                <div className={`text-sm font-bold ${
                  darkMode ? 'text-red-400' : 'text-cyber-cyan'
                }`}>
                  {darkMode ? 'View AI/ML Portfolio' : 'View Cybersecurity Portfolio'}
                </div>
                <div className={`text-xs mt-0.5 ${
                  darkMode ? 'text-violet-400/70' : 'text-gray-400'
                }`}>
                  {darkMode ? 'Switch to standard mode' : 'Switch to dark mode'}
                </div>
              </div>
            </div>
            <motion.span 
              className={`text-xl ${darkMode ? 'text-red-400' : 'text-cyber-cyan'}`}
              animate={{ rotate: darkMode ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ⟲
            </motion.span>
          </div>
          
          {/* Animated background effect */}
          <motion.div
            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${
              darkMode 
                ? 'bg-gradient-to-r from-red-500/10 to-violet-500/10' 
                : 'bg-gradient-to-r from-cyan-500/10 to-violet-500/10'
            }`}
          />
        </motion.button>

        {/* Game Design Portfolio Button - Prominent */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          onClick={() => onCommandSelect('play game')}
          className={`w-full px-4 py-4 rounded-lg transition-all group relative overflow-hidden ${
            darkMode
              ? 'bg-gradient-to-r from-violet-900/40 to-pink-900/40 border-2 border-pink-500/50 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/20'
              : 'bg-gradient-to-r from-violet-900/40 to-pink-900/40 border-2 border-pink-500/50 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/20'
          }`}
        >
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">
                🎮
              </span>
              <div className="text-left">
                <div className={`text-sm font-bold ${
                  darkMode ? 'text-pink-400' : 'text-pink-400'
                }`}>
                  View Game Design Portfolio
                </div>
                <div className={`text-xs mt-0.5 ${
                  darkMode ? 'text-violet-400/70' : 'text-violet-400/70'
                }`}>
                  Interactive game projects & design
                </div>
              </div>
            </div>
            <motion.span 
              className={`text-xl ${darkMode ? 'text-pink-400' : 'text-pink-400'}`}
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ duration: 0.2 }}
            >
              🕹️
            </motion.span>
          </div>
          
          {/* Animated background effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-pink-500/10 to-violet-500/10"
          />
        </motion.button>

        <div className={`h-px ${darkMode ? 'bg-red-500/20' : 'bg-cyber-cyan/20'}`} />

        {categories.map((category, catIdx) => {
          const categoryCommands = commands.filter(cmd => cmd.category === category)
          if (categoryCommands.length === 0) return null
          
          return (
            <div key={category}>
              <div className={`text-xs font-bold mb-2 px-2 ${
                darkMode ? 'text-red-400/60' : 'text-cyber-cyan/60'
              }`}>
                {category.toUpperCase()}
              </div>
              <div className="space-y-2">
                {categoryCommands.map((command, idx) => (
                  <motion.button
                    key={command.cmd}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: catIdx * 0.1 + idx * 0.05 }}
                    onClick={() => {
                      if (onCommandSelect) {
                        onCommandSelect(command.cmd)
                      }
                    }}
                    className={`w-full flex items-start space-x-3 px-3 py-2.5 rounded transition-all text-left group ${
                      darkMode
                        ? 'bg-black/40 border border-red-500/20 hover:border-red-500/50 hover:bg-red-900/20'
                        : 'bg-cyber-dark/50 border border-cyber-cyan/20 hover:border-cyber-cyan/50 hover:bg-cyber-cyan/5'
                    }`}
                  >
                    <span className="text-xl flex-shrink-0">{command.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-mono font-semibold truncate ${
                        darkMode ? 'text-red-400 group-hover:text-red-300' : 'text-cyber-cyan group-hover:text-cyan-300'
                      }`}>
                        {command.cmd}
                      </div>
                      <div className={`text-xs mt-0.5 ${
                        darkMode ? 'text-violet-400/70' : 'text-gray-400'
                      }`}>
                        {command.desc}
                      </div>
                    </div>
                    <motion.span 
                      className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity ${
                        darkMode ? 'text-red-400' : 'text-cyber-cyan'
                      }`}
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer Tip */}
      <div className={`border-t px-4 py-2 text-xs flex-shrink-0 ${
        darkMode
          ? 'bg-black/60 border-red-500/30 text-violet-400/50'
          : 'bg-cyber-dark/80 border-cyber-cyan/30 text-cyber-violet/50'
      }`}>
        💡 Type freely in the terminal for more commands
      </div>
    </motion.div>
  )
}

export default QuickCommandsPanel
