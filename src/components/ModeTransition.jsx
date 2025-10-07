import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const ModeTransition = ({ isTransitioning, darkMode }) => {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (isTransitioning) {
      setStage(1) // Start glitch
      
      setTimeout(() => setStage(2), 300) // Heavy corruption
      setTimeout(() => setStage(3), 600) // Logo reveal
      setTimeout(() => setStage(4), 1200) // Fade out
    } else {
      setStage(0)
    }
  }, [isTransitioning])

  if (!isTransitioning) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Screen corruption overlay */}
        <motion.div
          className="absolute inset-0 bg-black"
          animate={{
            opacity: stage === 1 ? [0, 0.3, 0.6] : stage === 2 ? [0.6, 0.9, 0.6] : stage === 3 ? 0.95 : 0,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Horizontal glitch bars - screen tearing */}
        {(stage === 1 || stage === 2) && (
          <>
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`h-glitch-${i}`}
                className="absolute left-0 right-0 bg-gradient-to-r from-red-500 via-violet-500 to-red-500"
                style={{
                  height: Math.random() * 4 + 2,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.6,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 0.15,
                  repeat: 3,
                  delay: i * 0.05,
                }}
              />
            ))}
          </>
        )}

        {/* RGB split / Chromatic aberration */}
        {stage === 1 && (
          <motion.div
            className="absolute inset-0"
            animate={{
              filter: [
                'none',
                'drop-shadow(5px 0 0 red) drop-shadow(-5px 0 0 cyan)',
                'drop-shadow(10px 0 0 red) drop-shadow(-10px 0 0 cyan)',
                'none',
              ],
            }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Static noise overlay */}
        {(stage === 1 || stage === 2) && (
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{ duration: 0.2, repeat: 2 }}
          />
        )}

        {/* Corruption blocks */}
        {stage === 2 && (
          <>
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`block-${i}`}
                className="absolute bg-red-500/50"
                style={{
                  width: Math.random() * 200 + 50,
                  height: Math.random() * 150 + 30,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.7, 0],
                  x: [0, Math.random() * 20 - 10],
                }}
                transition={{
                  duration: 0.15,
                  delay: i * 0.02,
                }}
              />
            ))}
          </>
        )}

        {/* Logo/Text Reveal */}
        {stage === 3 && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Glitch logo container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              {/* Main logo text with glitch effect */}
              <div className="relative text-8xl font-bold">
                {/* Red glitch layer - offset left */}
                <motion.div
                  className="absolute inset-0 text-red-500 opacity-50 select-none"
                  style={{ transform: 'translate(-4px, 0)' }}
                  animate={{
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{ duration: 0.3, repeat: 2 }}
                >
                  {darkMode ? 'DARK AI' : 'NEXUS'}
                </motion.div>
                
                {/* Cyan glitch layer - offset right */}
                <motion.div
                  className="absolute inset-0 text-cyan-500 opacity-50 select-none"
                  style={{ transform: 'translate(4px, 0)' }}
                  animate={{
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{ duration: 0.3, repeat: 2 }}
                >
                  {darkMode ? 'DARK AI' : 'NEXUS'}
                </motion.div>
                
                {/* Main text - center */}
                <motion.div
                  className={darkMode ? 'text-red-400 relative z-10' : 'text-cyan-400 relative z-10'}
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(239, 68, 68, 0.8)',
                      '0 0 30px rgba(239, 68, 68, 1), 0 0 60px rgba(139, 92, 246, 0.8)',
                      '0 0 10px rgba(239, 68, 68, 0.8)',
                    ],
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {darkMode ? 'DARK AI' : 'NEXUS'}
                </motion.div>
              </div>

              {/* Subtitle */}
              <motion.div
                className={`text-center mt-4 text-xl font-mono ${
                  darkMode ? 'text-violet-400' : 'text-cyber-violet'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.6, times: [0, 0.3, 0.7, 1] }}
              >
                {darkMode ? '// PROTOCOLS ENGAGED' : '// ONLINE'}
              </motion.div>

              {/* Scanlines over logo */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'linear-gradient(transparent 50%, rgba(255, 0, 0, 0.1) 50%)',
                  backgroundSize: '100% 4px',
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 0.15, repeat: 2 }}
              />

              {/* Border flash */}
              <motion.div
                className="absolute -inset-8 border-4"
                style={{
                  borderColor: darkMode ? 'rgba(239, 68, 68, 0.8)' : 'rgba(0, 255, 255, 0.8)',
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.9, 1.1, 1],
                }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          </div>
        )}

        {/* Screen flash at the end */}
        {stage === 4 && (
          <motion.div
            className={`absolute inset-0 ${darkMode ? 'bg-red-500' : 'bg-cyan-500'}`}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Digital "scan" effect */}
        {stage >= 2 && stage <= 3 && (
          <motion.div
            className="absolute left-0 right-0 h-1"
            style={{
              background: darkMode
                ? 'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.8), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.8), transparent)',
              boxShadow: darkMode ? '0 0 20px rgba(239, 68, 68, 0.6)' : '0 0 20px rgba(0, 255, 255, 0.6)',
            }}
            animate={{
              top: ['0%', '100%'],
            }}
            transition={{ duration: 0.6, ease: 'linear' }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default ModeTransition
