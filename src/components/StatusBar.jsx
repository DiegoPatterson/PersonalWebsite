import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const StatusBar = ({ darkMode, onModeToggle }) => {
  const [time, setTime] = useState(new Date())
  const [cpuUsage, setCpuUsage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 70)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    })
  }

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-cyber-dark/80 backdrop-blur-sm border-b border-cyber-cyan/30 px-2 sm:px-6 py-2 sm:py-3"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] sm:text-xs">
        {/* Left side */}
        <div className="flex items-center space-x-2 sm:space-x-6">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-cyber-cyan font-bold hidden sm:inline">RezuMe v3.7.2</span>
            <span className="text-cyber-cyan font-bold sm:hidden">RezuMe</span>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            <span className="text-cyber-violet hidden sm:inline">MODE:</span>
            <span className={darkMode ? "text-red-400" : "text-cyan-400"}>
              {darkMode ? "CYBER" : "AI"}
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-cyber-violet">STATUS:</span>
            <span className="text-green-400">ONLINE</span>
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            <span className="text-cyber-violet">CPU:</span>
            <div className="w-20 bg-cyber-dark h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-cyber-cyan"
                animate={{ width: `${cpuUsage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-cyber-cyan">{cpuUsage}%</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2 sm:space-x-6">
          <button
            onClick={onModeToggle}
            className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 border rounded transition-all ${
              darkMode 
                ? 'border-red-500/40 hover:bg-red-500/10 hover:border-red-500/60' 
                : 'border-cyan-500/40 hover:bg-cyan-500/10 hover:border-cyan-500/60'
            }`}
            title={darkMode ? "Switch to AI & ML Mode" : "Switch to Cybersecurity Mode"}
          >
            <span className="text-cyber-violet hidden sm:inline">TOGGLE:</span>
            <span className={darkMode ? 'text-red-400' : 'text-cyan-400'}>
              {darkMode ? '[X]' : '[O]'}
            </span>
          </button>

          <div className="hidden md:flex items-center space-x-2">
            <span className="text-cyber-violet">CLEARANCE:</span>
            <span className="text-yellow-400">ARCHITECT</span>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyber-cyan hidden sm:inline" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-cyber-cyan font-mono">{formatTime(time)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default StatusBar
