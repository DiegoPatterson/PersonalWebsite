import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const DarkAIBackground = () => {
  const [glitches, setGlitches] = useState([])

  useEffect(() => {
    // Create random glitch particles - reduced for readability
    const glitchArray = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 3,
      size: 20 + Math.random() * 60,
      opacity: 0.05 + Math.random() * 0.15
    }))
    setGlitches(glitchArray)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Red grid background - subtle */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(239, 68, 68, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'grid-shift 30s linear infinite'
        }}
      />

      {/* Diagonal red lines - very subtle */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
        <defs>
          <pattern id="diagonals" width="60" height="60" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="60" y2="60" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonals)" />
      </svg>

      {/* Glitch particles - red/violet */}
      {glitches.map((glitch) => (
        <motion.div
          key={glitch.id}
          className="absolute"
          style={{
            width: glitch.size,
            height: 2,
            left: `${glitch.x}%`,
            top: `${glitch.y}%`,
            background: Math.random() > 0.5 
              ? 'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.8), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.8), transparent)',
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            opacity: [0, glitch.opacity, 0],
          }}
          transition={{
            duration: glitch.duration,
            delay: glitch.delay,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}

      {/* Vertical glitch bars - fewer */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`vbar-${i}`}
          className="absolute w-0.5 h-screen"
          style={{
            left: `${(i + 1) * 12}%`,
            background: 'linear-gradient(180deg, transparent, rgba(239, 68, 68, 0.2), transparent)',
          }}
          animate={{
            opacity: [0, 0.3, 0],
            scaleY: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Pulsing red vignette - subtle */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(139, 0, 0, 0.2) 100%)',
        }}
        animate={{
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Random corruption blocks - STATIC (no shake) */}
      <motion.div
        className="absolute"
        style={{
          top: '20%',
          left: '10%',
          width: '150px',
          height: '3px',
          background: 'rgba(239, 68, 68, 0.5)',
        }}
        animate={{
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      />

      <motion.div
        className="absolute"
        style={{
          top: '60%',
          right: '15%',
          width: '100px',
          height: '2px',
          background: 'rgba(139, 92, 246, 0.5)',
        }}
        animate={{
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 4,
        }}
      />

      {/* Matrix-style falling characters - subtle */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`matrix-${i}`}
            className="absolute text-red-500 font-mono text-xs"
            style={{
              left: `${i * 7}%`,
              top: '-20px',
            }}
            animate={{
              y: ['0vh', '110vh'],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'linear',
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j} className="leading-tight">
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Screen tear effect */}
      <motion.div
        className="absolute left-0 right-0 h-1"
        style={{
          background: 'rgba(239, 68, 68, 0.8)',
          boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
        }}
        animate={{
          top: ['10%', '90%', '10%'],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

export default DarkAIBackground
