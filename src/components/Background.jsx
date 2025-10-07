import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Background = () => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const particleArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 5,
      size: 1 + Math.random() * 2
    }))
    setParticles(particleArray)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-cyber-cyan"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: ['0vh', '100vh'],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyber-violet/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-3xl animate-pulse-slow" 
           style={{ animationDelay: '1s' }} />
      
      {/* Neural network lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <motion.line
          x1="10%" y1="10%" x2="90%" y2="90%"
          stroke="#00FFFF"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />
        <motion.line
          x1="90%" y1="10%" x2="10%" y2="90%"
          stroke="#8B00FF"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 1, repeat: Infinity, repeatDelay: 2 }}
        />
      </svg>
    </div>
  )
}

export default Background
