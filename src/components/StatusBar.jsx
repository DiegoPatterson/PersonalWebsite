import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const StatusBar = ({ darkMode, setDarkMode }) => {
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
      className="fixed top-0 left-0 right-0 z-50 bg-cyber-dark/80 backdrop-blur-sm border-b border-cyber-cyan/30 px-6 py-3"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
        {/* Left side */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-cyber-cyan font-bold">NEXUS v3.7.2</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-cyber-violet">STATUS:</span>
            <span className="text-green-400">ONLINE</span>
          </div>

          <div className="flex items-center space-x-2">
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
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center space-x-2 px-3 py-1 border border-cyber-cyan/30 rounded hover:bg-cyber-cyan/10 transition-colors"
          >
            <span className="text-cyber-violet">MODE:</span>
            <span className="text-cyber-cyan">{darkMode ? 'DARK_AI' : 'STANDARD'}</span>
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-cyber-violet">CLEARANCE:</span>
            <span className="text-yellow-400">ARCHITECT</span>
          </div>

          <div className="flex items-center space-x-2">
            <svg className="w-3 h-3 text-cyber-cyan" fill="currentColor" viewBox="0 0 20 20">
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
