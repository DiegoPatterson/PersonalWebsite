import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const Jumpscare = ({ trigger, onComplete }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (trigger) {
      setShow(true)
      // Play jumpscare sequence
      const timer = setTimeout(() => {
        setShow(false)
        onComplete?.()
      }, 2000) // Show for 2 seconds

      return () => clearTimeout(timer)
    }
  }, [trigger, onComplete])

  if (!show) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
      >
        {/* Glitch effect background */}
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0.8, 1, 0],
            scale: [1, 1.1, 1, 1.2, 1]
          }}
          transition={{ 
            duration: 2,
            times: [0, 0.1, 0.3, 0.7, 1]
          }}
        />

        {/* Red glitch overlay */}
        <motion.div
          className="absolute inset-0 bg-red-500 mix-blend-screen"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.8, 0, 0.6, 0],
            x: [0, -10, 10, -5, 0]
          }}
          transition={{ 
            duration: 2,
            times: [0, 0.2, 0.4, 0.7, 1]
          }}
        />

        {/* Glitchy text */}
        <motion.div
          className="relative z-10 text-center font-mono"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: [0, 2, 1.5, 2, 0],
            rotate: [0, -5, 5, -3, 0],
            y: [0, -20, 20, -10, 0]
          }}
          transition={{ 
            duration: 2,
            times: [0, 0.2, 0.5, 0.8, 1]
          }}
        >
          <motion.div
            className="text-8xl font-bold"
            animate={{
              color: ['#ef4444', '#fff', '#ef4444', '#000', '#ef4444'],
              textShadow: [
                '0 0 10px #ef4444',
                '0 0 30px #fff, 0 0 50px #ef4444',
                '0 0 10px #ef4444',
                '0 0 50px #000',
                '0 0 10px #ef4444'
              ]
            }}
            transition={{
              duration: 2,
              times: [0, 0.3, 0.5, 0.7, 1]
            }}
          >
            {'I SEE YOU'}
          </motion.div>

          {/* Glitch lines */}
          <motion.div
            className="absolute inset-0 opacity-50"
            animate={{
              scaleX: [1, 1.2, 0.8, 1.5, 1],
              scaleY: [1, 0.8, 1.2, 0.5, 1],
            }}
            transition={{
              duration: 2,
              times: [0, 0.25, 0.5, 0.75, 1]
            }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-[2px] bg-cyan-400"
                style={{ top: `${i * 5}%` }}
                initial={{ opacity: 0, x: -100 }}
                animate={{
                  opacity: [0, 1, 0, 1, 0],
                  x: [-100, 0, 100, -50, 0],
                  scaleX: [0, 1, 0.5, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.05,
                  times: [0, 0.3, 0.5, 0.8, 1]
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Secondary spooky text */}
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 font-mono text-red-500 text-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: [0, 1, 1, 1, 0],
            y: [50, 0, 0, -20, -100]
          }}
          transition={{
            duration: 2,
            times: [0, 0.3, 0.6, 0.8, 1]
          }}
        >
          W A T C H I N G . . .
        </motion.div>

        {/* Static noise overlay */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
          animate={{
            opacity: [0, 0.4, 0.2, 0.5, 0],
            scale: [1, 1.1, 1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            times: [0, 0.2, 0.5, 0.8, 1]
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default Jumpscare
