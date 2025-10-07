import { motion } from 'framer-motion'

const Scanline = ({ darkMode }) => {
  return (
    <>
      {/* Scanline effect */}
      <motion.div
        className="scanline"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: darkMode ? '2px' : '2px',
          background: darkMode 
            ? 'linear-gradient(to bottom, transparent, rgba(239, 68, 68, 0.4), transparent)'
            : 'linear-gradient(to bottom, transparent, #00FFFF, transparent)',
          opacity: darkMode ? 0.15 : 0.1,
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: darkMode ? '0 0 8px rgba(239, 68, 68, 0.3)' : 'none',
        }}
        animate={{
          y: ['0vh', '100vh'],
        }}
        transition={{
          duration: darkMode ? 4 : 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Screen flicker overlay - different for each mode */}
      <motion.div
        className={`fixed inset-0 pointer-events-none mix-blend-overlay ${
          darkMode ? 'bg-red-500/5' : 'bg-cyber-cyan/5'
        }`}
        animate={{
          opacity: darkMode ? [0.02, 0.08, 0.02] : [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: darkMode ? 0.1 : 0.1,
          repeat: Infinity,
        }}
        style={{ zIndex: 9998 }}
      />

      {/* Extra chaos for Dark AI mode - SUBTLE */}
      {darkMode && (
        <>
          {/* Horizontal glitch lines - STATIC (no movement) */}
          <motion.div
            className="fixed left-0 right-0 h-px bg-red-500/50 pointer-events-none"
            style={{ zIndex: 9996, top: '50%' }}
            animate={{
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatDelay: 8,
              ease: 'easeInOut',
            }}
          />

          {/* Random corruption blocks - STATIC (no movement) */}
          <motion.div
            className="fixed w-24 h-16 pointer-events-none"
            style={{
              left: '30%',
              top: '40%',
              background: 'rgba(239, 68, 68, 0.05)',
              zIndex: 9995,
              mixBlendMode: 'overlay',
            }}
            animate={{
              opacity: [0, 0.1, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatDelay: 10,
            }}
          />

          {/* Chromatic aberration flash - REMOVED to prevent headaches */}
        </>
      )}
    </>
  )
}

export default Scanline
