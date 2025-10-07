import { motion } from 'framer-motion'

const Scanline = () => {
  return (
    <>
      <motion.div
        className="scanline"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '2px',
          background: 'linear-gradient(to bottom, transparent, #00FFFF, transparent)',
          opacity: 0.1,
          pointerEvents: 'none',
          zIndex: 9999,
        }}
        animate={{
          y: ['0vh', '100vh'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Screen flicker overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none bg-cyber-cyan/5 mix-blend-overlay"
        animate={{
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
        }}
        style={{ zIndex: 9998 }}
      />
    </>
  )
}

export default Scanline
