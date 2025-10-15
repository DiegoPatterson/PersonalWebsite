import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dataVault from '../data/vault.json'

const PixelGame = ({ onExit, onBringToFront }) => {
  const [playerPos, setPlayerPos] = useState({ x: 5, y: 5 })
  const [playerDirection, setPlayerDirection] = useState('down')
  const [nearbyInteractable, setNearbyInteractable] = useState(null)
  const [showingProject, setShowingProject] = useState(null)
  const [keysPressed, setKeysPressed] = useState({})
  const [isMobile, setIsMobile] = useState(false)
  const gameRef = useRef(null)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Grid size (responsive for mobile)
  const TILE_SIZE = isMobile ? 25 : 40
  const GRID_WIDTH = isMobile ? 15 : 20
  const GRID_HEIGHT = isMobile ? 12 : 15

  // Prevent scrolling and lock body when game is active
  useEffect(() => {
    // Store original overflow
    const originalOverflow = document.body.style.overflow
    const originalPosition = document.body.style.position
    
    // Prevent scrolling
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.height = '100%'
    
    // Focus the game container
    if (gameRef.current) {
      gameRef.current.focus()
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.position = originalPosition
      document.body.style.width = ''
      document.body.style.height = ''
    }
  }, [])

  // Convert game design projects to interactables
  const gameProjects = dataVault.gameDesignProjects || []
  
  // Game world objects/interactables
  const interactables = [
    // Position projects around the world
    ...gameProjects.slice(0, 5).map((project, index) => ({
      id: project.id,
      x: [10, 15, 5, 12, 18][index] || 10,
      y: [5, 8, 10, 12, 6][index] || 5,
      type: ['terminal', 'arcade', 'console', 'terminal', 'arcade'][index],
      title: project.title,
      description: project.description,
      color: project.color,
      project: project // Store full project data
    })),
    // Exit door
    {
      id: 'exit',
      x: 1,
      y: 1,
      type: 'door',
      title: 'Exit Game',
      description: 'Return to terminal',
      color: '#ff0000'
    }
  ]

  // Walls/boundaries with more detail
  const walls = [
    // Outer walls
    ...Array.from({ length: GRID_WIDTH }, (_, i) => ({ x: i, y: 0, type: 'wall-top' })),
    ...Array.from({ length: GRID_WIDTH }, (_, i) => ({ x: i, y: GRID_HEIGHT - 1, type: 'wall-bottom' })),
    ...Array.from({ length: GRID_HEIGHT }, (_, i) => ({ x: 0, y: i, type: 'wall-left' })),
    ...Array.from({ length: GRID_HEIGHT }, (_, i) => ({ x: GRID_WIDTH - 1, y: i, type: 'wall-right' })),
  ]
  
  // Floor tiles for decoration
  const floorTiles = Array.from({ length: (GRID_WIDTH - 2) * (GRID_HEIGHT - 2) }, (_, i) => {
    const x = (i % (GRID_WIDTH - 2)) + 1
    const y = Math.floor(i / (GRID_WIDTH - 2)) + 1
    // Random floor variations
    const variant = (x + y) % 3
    return { x, y, variant }
  })

  // Check if position is valid (not a wall)
  const isValidPosition = (x, y) => {
    return !walls.some(wall => wall.x === x && wall.y === y)
  }

  // Check for nearby interactables
  useEffect(() => {
    const nearby = interactables.find(obj => 
      Math.abs(obj.x - playerPos.x) <= 1 && 
      Math.abs(obj.y - playerPos.y) <= 1
    )
    setNearbyInteractable(nearby || null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerPos])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent default behavior for arrow keys and space to avoid scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', ' '].includes(e.key)) {
        e.preventDefault()
      }
      
      setKeysPressed(prev => ({ ...prev, [e.key]: true }))

      // Interaction
      if (e.key === 'e' || e.key === 'E') {
        e.preventDefault()
        if (nearbyInteractable) {
          if (nearbyInteractable.id === 'exit') {
            onExit()
          } else {
            setShowingProject(nearbyInteractable)
          }
        }
      }

      // Close project view
      if (e.key === 'Escape' && showingProject) {
        e.preventDefault()
        setShowingProject(null)
      }
    }

    const handleKeyUp = (e) => {
      // Prevent default for game keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
        e.preventDefault()
      }
      setKeysPressed(prev => ({ ...prev, [e.key]: false }))
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [nearbyInteractable, showingProject, onExit])

  // Movement loop with faster response
  useEffect(() => {
    let lastMoveTime = 0
    const moveDelay = 100 // Reduced from 150ms to 100ms for snappier movement
    
    const moveInterval = setInterval(() => {
      const now = Date.now()
      if (now - lastMoveTime < moveDelay) return
      
      setPlayerPos(prev => {
        let newX = prev.x
        let newY = prev.y
        let newDirection = playerDirection
        let moved = false

        // Arrow keys or WASD
        if (keysPressed['ArrowUp'] || keysPressed['w'] || keysPressed['W']) {
          newY = prev.y - 1
          newDirection = 'up'
          moved = true
        } else if (keysPressed['ArrowDown'] || keysPressed['s'] || keysPressed['S']) {
          newY = prev.y + 1
          newDirection = 'down'
          moved = true
        } else if (keysPressed['ArrowLeft'] || keysPressed['a'] || keysPressed['A']) {
          newX = prev.x - 1
          newDirection = 'left'
          moved = true
        } else if (keysPressed['ArrowRight'] || keysPressed['d'] || keysPressed['D']) {
          newX = prev.x + 1
          newDirection = 'right'
          moved = true
        }

        // Check if new position is valid
        if (moved && isValidPosition(newX, newY)) {
          setPlayerDirection(newDirection)
          lastMoveTime = now
          return { x: newX, y: newY }
        }

        return prev
      })
    }, 16) // Check more frequently (~60fps) but only move based on moveDelay

    return () => clearInterval(moveInterval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keysPressed, playerDirection])

  return (
    <div 
      ref={gameRef}
      className="fixed inset-0 bg-black flex items-center justify-center"
      style={{ zIndex: 9999 }}
      onPointerDown={onBringToFront}
      tabIndex={0}
    >
      {/* Game Canvas */}
      <div 
        className="relative border-4 shadow-2xl overflow-hidden"
        style={{
          width: `${GRID_WIDTH * TILE_SIZE}px`,
          height: `${GRID_HEIGHT * TILE_SIZE}px`,
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          imageRendering: 'pixelated',
          borderImage: 'linear-gradient(45deg, #00ffff, #ff00ff, #00ffff) 1',
          boxShadow: '0 0 50px rgba(0,255,255,0.5), inset 0 0 100px rgba(0,0,0,0.5)'
        }}
      >
        {/* Animated background stars */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.7
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Floor tiles with pattern */}
        {floorTiles.map((tile, idx) => (
          <div
            key={`floor-${idx}`}
            className="absolute"
            style={{
              left: `${tile.x * TILE_SIZE}px`,
              top: `${tile.y * TILE_SIZE}px`,
              width: `${TILE_SIZE}px`,
              height: `${TILE_SIZE}px`,
              background: tile.variant === 0 
                ? 'rgba(30, 30, 60, 0.4)' 
                : tile.variant === 1 
                ? 'rgba(25, 25, 55, 0.4)' 
                : 'rgba(35, 35, 65, 0.4)',
              border: '1px solid rgba(100, 100, 255, 0.1)',
              boxShadow: 'inset 0 0 5px rgba(0,0,0,0.3)'
            }}
          />
        ))}

        {/* Walls with detailed design */}
        {walls.map((wall, idx) => (
          <motion.div
            key={`wall-${idx}`}
            className="absolute"
            style={{
              left: `${wall.x * TILE_SIZE}px`,
              top: `${wall.y * TILE_SIZE}px`,
              width: `${TILE_SIZE}px`,
              height: `${TILE_SIZE}px`,
              background: 'linear-gradient(135deg, #0a4d68 0%, #088395 50%, #05bfdb 100%)',
              border: '2px solid rgba(0, 255, 255, 0.3)',
              boxShadow: 'inset 0 0 10px rgba(0,255,255,0.5), 0 0 15px rgba(0,255,255,0.3)',
              position: 'relative'
            }}
            animate={{
              boxShadow: [
                'inset 0 0 10px rgba(0,255,255,0.5), 0 0 15px rgba(0,255,255,0.3)',
                'inset 0 0 15px rgba(0,255,255,0.7), 0 0 20px rgba(0,255,255,0.5)',
                'inset 0 0 10px rgba(0,255,255,0.5), 0 0 15px rgba(0,255,255,0.3)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: idx * 0.05
            }}
          >
            {/* Wall texture pattern */}
            <div className="absolute inset-1 bg-gradient-to-br from-cyan-600/20 to-transparent" />
            <div className="absolute top-1 left-1 w-1 h-1 bg-cyan-400/50 rounded-full" />
            <div className="absolute bottom-1 right-1 w-1 h-1 bg-cyan-400/50 rounded-full" />
          </motion.div>
        ))}

        {/* Interactable objects with detailed sprites */}
        {interactables.map(obj => (
          <motion.div
            key={obj.id}
            className="absolute flex items-center justify-center"
            style={{
              left: `${obj.x * TILE_SIZE}px`,
              top: `${obj.y * TILE_SIZE}px`,
              width: `${TILE_SIZE}px`,
              height: `${TILE_SIZE}px`,
              zIndex: 10
            }}
            animate={{
              scale: nearbyInteractable?.id === obj.id ? [1, 1.15, 1] : 1,
              y: nearbyInteractable?.id === obj.id ? [0, -5, 0] : 0,
            }}
            transition={{ duration: 0.6, repeat: nearbyInteractable?.id === obj.id ? Infinity : 0 }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-lg blur-md"
              style={{
                background: obj.color,
                opacity: 0.3
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Object sprite - Terminal */}
            {obj.type === 'terminal' && (
              <div className="relative w-8 h-8 flex flex-col items-center justify-center">
                <div 
                  className="w-full h-full rounded border-2 flex flex-col items-center justify-center"
                  style={{
                    backgroundColor: `${obj.color}20`,
                    borderColor: obj.color,
                    boxShadow: `0 0 15px ${obj.color}, inset 0 0 10px ${obj.color}40`
                  }}
                >
                  <div className="w-5 h-3 border flex flex-col gap-0.5 p-0.5" style={{ borderColor: obj.color }}>
                    <div className="h-0.5 w-full" style={{ backgroundColor: obj.color }} />
                    <div className="h-0.5 w-3/4" style={{ backgroundColor: obj.color }} />
                  </div>
                  <div className="text-[6px] font-bold mt-0.5" style={{ color: obj.color }}>█</div>
                </div>
              </div>
            )}
            
            {/* Object sprite - Arcade Machine */}
            {obj.type === 'arcade' && (
              <div className="relative w-8 h-8 flex items-end justify-center">
                <div className="w-6 h-7 rounded-t relative" style={{
                  background: `linear-gradient(180deg, ${obj.color} 0%, ${obj.color}80 100%)`,
                  boxShadow: `0 0 15px ${obj.color}, inset 0 0 10px rgba(0,0,0,0.5)`,
                  border: '1px solid rgba(255,255,255,0.3)'
                }}>
                  <div className="absolute top-1 left-1 right-1 h-2 bg-black/50 rounded flex items-center justify-center">
                    <motion.div 
                      className="w-3 h-1 rounded-sm"
                      style={{ backgroundColor: obj.color }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </div>
                  <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-red-500" />
                  <div className="absolute bottom-1 left-3 w-1 h-1 rounded-full bg-blue-500" />
                </div>
                <div className="absolute -bottom-0.5 w-7 h-1 rounded-b" style={{ backgroundColor: `${obj.color}40` }} />
              </div>
            )}
            
            {/* Object sprite - Console */}
            {obj.type === 'console' && (
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="w-7 h-5 rounded relative" style={{
                  background: `linear-gradient(135deg, ${obj.color} 0%, ${obj.color}80 100%)`,
                  boxShadow: `0 0 15px ${obj.color}, inset 0 0 10px rgba(0,0,0,0.3)`,
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-green-400" />
                  <motion.div 
                    className="absolute top-1 right-1 w-1 h-1 rounded-full bg-yellow-400"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <div className="absolute bottom-0.5 left-1.5 right-1.5 h-1 bg-black/30 rounded" />
                </div>
              </div>
            )}
            
            {/* Object sprite - Exit Door */}
            {obj.type === 'door' && (
              <div className="relative w-8 h-10 flex items-end justify-center">
                <motion.div 
                  className="w-6 h-9 rounded border-2 relative"
                  style={{
                    background: 'linear-gradient(180deg, #ff0000 0%, #cc0000 100%)',
                    borderColor: '#ffaa00',
                    boxShadow: '0 0 20px #ff0000, inset 0 0 10px rgba(0,0,0,0.5)'
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 20px #ff0000, inset 0 0 10px rgba(0,0,0,0.5)',
                      '0 0 30px #ff0000, inset 0 0 15px rgba(0,0,0,0.5)',
                      '0 0 20px #ff0000, inset 0 0 10px rgba(0,0,0,0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="absolute inset-1 border border-yellow-400/50 rounded" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-400 text-xs font-bold">
                    EXIT
                  </div>
                  <div className="absolute bottom-1 right-1 w-1 h-2 bg-yellow-300 rounded-sm" />
                </motion.div>
              </div>
            )}
            
            {/* Label */}
            {nearbyInteractable?.id === obj.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: -15 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap 
                          bg-black/90 px-2 py-1 rounded border text-xs font-bold"
                style={{
                  borderColor: obj.color,
                  color: obj.color,
                  boxShadow: `0 0 10px ${obj.color}`
                }}
              >
                {obj.title}
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* Player with detailed sprite */}
        <motion.div
          className="absolute"
          animate={{
            left: `${playerPos.x * TILE_SIZE}px`,
            top: `${playerPos.y * TILE_SIZE}px`,
          }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          style={{
            width: `${TILE_SIZE}px`,
            height: `${TILE_SIZE}px`,
            zIndex: 20
          }}
        >
          {/* Player glow */}
          <motion.div
            className="absolute inset-0 rounded-full blur-md"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,0,0.6) 0%, transparent 70%)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          {/* Player sprite - detailed character */}
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              className="relative"
              style={{
                transform: playerDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)'
              }}
              animate={{
                y: [0, -2, 0]
              }}
              transition={{ duration: 0.4, repeat: Infinity }}
            >
              {/* Head */}
              <div className="relative w-5 h-5 mx-auto mb-0.5">
                <div className="w-full h-full rounded-full bg-gradient-to-b from-yellow-300 to-yellow-500 border-2 border-yellow-600"
                  style={{ boxShadow: '0 0 10px rgba(255,255,0,0.5), inset 0 1px 2px rgba(255,255,255,0.5)' }}
                >
                  {/* Eyes */}
                  <div className="absolute top-1.5 left-1 w-1 h-1 bg-black rounded-full" />
                  <div className="absolute top-1.5 right-1 w-1 h-1 bg-black rounded-full" />
                  {/* Smile */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-black rounded-full" />
                </div>
                {/* Hair/antenna */}
                <motion.div 
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-yellow-600 rounded-full"
                  animate={{ rotate: [-10, 10, -10] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
              
              {/* Body */}
              <div className="relative w-4 h-6 mx-auto bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-sm border border-cyan-700"
                style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.3)' }}
              >
                {/* Buttons */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-white rounded-full" />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-white rounded-full" />
              </div>
              
              {/* Legs */}
              <div className="flex justify-center gap-1 mt-0.5">
                <motion.div 
                  className="w-1 h-3 bg-gradient-to-b from-blue-600 to-blue-800 rounded-sm"
                  animate={{ scaleY: [1, 0.9, 1] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                />
                <motion.div 
                  className="w-1 h-3 bg-gradient-to-b from-blue-600 to-blue-800 rounded-sm"
                  animate={{ scaleY: [1, 0.9, 1] }}
                  transition={{ duration: 0.3, repeat: Infinity, delay: 0.15 }}
                />
              </div>
              
              {/* Shadow */}
              <motion.div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-black/30 blur-sm"
                animate={{
                  scale: [1, 0.9, 1],
                  opacity: [0.3, 0.2, 0.3]
                }}
                transition={{ duration: 0.4, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Interaction prompt */}
        <AnimatePresence>
          {nearbyInteractable && !showingProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="bg-gradient-to-br from-black/95 to-cyan-900/80 border-2 
                          px-6 py-3 rounded-lg backdrop-blur-sm text-center"
                style={{
                  borderColor: nearbyInteractable.color,
                  boxShadow: `0 0 30px ${nearbyInteractable.color}60, inset 0 0 20px rgba(0,0,0,0.5)`
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="flex items-center justify-center gap-2 mb-1"
                >
                  <span className="text-yellow-400 text-xl font-bold animate-pulse">⌨</span>
                  <span className="text-yellow-400 text-2xl font-bold border-2 border-yellow-400 px-2 rounded">
                    E
                  </span>
                </motion.div>
                <p className="text-cyan-300 text-xs font-mono mb-1">
                  PRESS TO INTERACT
                </p>
                <p 
                  className="text-sm font-bold"
                  style={{ 
                    color: nearbyInteractable.color,
                    textShadow: `0 0 10px ${nearbyInteractable.color}`
                  }}
                >
                  {nearbyInteractable.title}
                </p>
                {nearbyInteractable.id === 'exit' && (
                  <p className="text-red-400 text-[10px] mt-1 animate-pulse">
                    ⚠️ Leave Game World
                  </p>
                )}
              </motion.div>
              
              {/* Arrow pointer */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="mx-auto w-0 h-0 border-l-8 border-l-transparent 
                          border-r-8 border-r-transparent"
                style={{
                  borderTop: `12px solid ${nearbyInteractable.color}`,
                  filter: `drop-shadow(0 0 10px ${nearbyInteractable.color})`
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced HUD - Responsive */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-gradient-to-br from-black/90 to-cyan-900/50 
                   border-2 border-cyan-500 px-2 sm:px-6 py-2 sm:py-3 rounded-lg backdrop-blur-sm text-xs sm:text-base"
        style={{ boxShadow: '0 0 30px rgba(0,255,255,0.3)' }}
      >
        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
          <motion.div
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <p className="text-cyan-400 text-xs sm:text-base font-bold font-mono tracking-wider">
            {isMobile ? 'PORTFOLIO' : 'GAME PORTFOLIO v2.0'}
          </p>
        </div>
        {!isMobile && (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-cyan-300 flex items-center gap-2">
              <span className="text-yellow-400">↑↓←→</span> or 
              <span className="text-yellow-400">WASD</span> - Move
            </p>
            <p className="text-cyan-300 flex items-center gap-2">
              <span className="text-yellow-400">E</span> - Interact with projects
            </p>
            <p className="text-cyan-300 flex items-center gap-2">
              <span className="text-yellow-400">ESC</span> - Exit
            </p>
          </div>
        )}
        <div className="mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-cyan-500/30">
          <p className="text-cyan-400/70 text-[8px] sm:text-[10px]">
            Projects: {gameProjects.length}/5
          </p>
        </div>
      </motion.div>

      {/* Styled Exit button - Responsive */}
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onExit}
        className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gradient-to-br from-red-600 to-red-800 
                   hover:from-red-500 hover:to-red-700 border-2 border-red-400 
                   px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-bold text-xs sm:text-sm 
                   transition-all duration-300 backdrop-blur-sm"
        style={{ boxShadow: '0 0 30px rgba(255,0,0,0.4)' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex items-center gap-1 sm:gap-2">
          <span className="text-yellow-300">⎋</span> {isMobile ? 'EXIT' : 'EXIT GAME'}
        </span>
      </motion.button>
      
      {/* Score/Info bar at bottom - Hidden on mobile when controls are visible */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 
                     bg-gradient-to-r from-purple-900/80 via-black/90 to-purple-900/80 
                     border-2 border-purple-500 px-8 py-2 rounded-full backdrop-blur-sm
                     flex items-center gap-6"
          style={{ boxShadow: '0 0 30px rgba(168,85,247,0.4)' }}
        >
          <div className="text-center">
            <p className="text-purple-400 text-[10px] font-mono">POSITION</p>
            <p className="text-purple-300 text-xs font-bold">{playerPos.x}, {playerPos.y}</p>
          </div>
          <div className="w-px h-6 bg-purple-500/30" />
          <div className="text-center">
            <p className="text-cyan-400 text-[10px] font-mono">STATUS</p>
            <p className="text-cyan-300 text-xs font-bold">
              {nearbyInteractable ? '📍 Near Object' : '🎮 Exploring'}
            </p>
          </div>
        </motion.div>
      )}

      {/* Mobile Touch Controls */}
      {isMobile && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4 pointer-events-none">
          {/* Virtual Joystick */}
          <div 
            className="relative w-32 h-32 pointer-events-auto touch-none"
            onTouchStart={(e) => {
              e.preventDefault()
              const rect = e.currentTarget.getBoundingClientRect()
              const centerX = rect.left + rect.width / 2
              const centerY = rect.top + rect.height / 2
              
              const handleTouchMove = (moveEvent) => {
                moveEvent.preventDefault()
                const moveTouch = moveEvent.touches[0]
                const deltaX = moveTouch.clientX - centerX
                const deltaY = moveTouch.clientY - centerY
                
                // Calculate direction based on angle and distance
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
                const deadzone = 15
                
                if (distance > deadzone) {
                  const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI
                  
                  // Reset all directions first
                  setKeysPressed(prev => ({
                    ...prev,
                    'ArrowUp': false,
                    'ArrowDown': false,
                    'ArrowLeft': false,
                    'ArrowRight': false
                  }))
                  
                  // Set direction based on angle
                  if (angle >= -45 && angle < 45) {
                    // Right
                    setKeysPressed(prev => ({ ...prev, 'ArrowRight': true }))
                  } else if (angle >= 45 && angle < 135) {
                    // Down
                    setKeysPressed(prev => ({ ...prev, 'ArrowDown': true }))
                  } else if (angle >= -135 && angle < -45) {
                    // Up
                    setKeysPressed(prev => ({ ...prev, 'ArrowUp': true }))
                  } else {
                    // Left
                    setKeysPressed(prev => ({ ...prev, 'ArrowLeft': true }))
                  }
                } else {
                  // In deadzone, release all keys
                  setKeysPressed(prev => ({
                    ...prev,
                    'ArrowUp': false,
                    'ArrowDown': false,
                    'ArrowLeft': false,
                    'ArrowRight': false
                  }))
                }
              }
              
              const handleTouchEnd = (endEvent) => {
                endEvent.preventDefault()
                // Release all direction keys
                setKeysPressed(prev => ({
                  ...prev,
                  'ArrowUp': false,
                  'ArrowDown': false,
                  'ArrowLeft': false,
                  'ArrowRight': false
                }))
                document.removeEventListener('touchmove', handleTouchMove)
                document.removeEventListener('touchend', handleTouchEnd)
              }
              
              document.addEventListener('touchmove', handleTouchMove, { passive: false })
              document.addEventListener('touchend', handleTouchEnd, { passive: false })
              
              // Initial touch position check
              handleTouchMove(e)
            }}
          >
            {/* Outer circle */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 to-purple-900/40 rounded-full border-2 border-cyan-500/50 backdrop-blur-sm" />
            
            {/* Inner joystick knob */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full border-2 border-cyan-300 shadow-lg shadow-cyan-500/50"
              animate={{
                scale: keysPressed['ArrowUp'] || keysPressed['ArrowDown'] || keysPressed['ArrowLeft'] || keysPressed['ArrowRight'] ? 0.9 : 1,
              }}
            >
              {/* Directional indicator */}
              <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                {keysPressed['ArrowUp'] && '↑'}
                {keysPressed['ArrowDown'] && '↓'}
                {keysPressed['ArrowLeft'] && '←'}
                {keysPressed['ArrowRight'] && '→'}
              </div>
            </motion.div>
            
            {/* Directional guides */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div className="text-cyan-400 text-xs font-bold">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2">↑</div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">↓</div>
                <div className="absolute -left-1 top-1/2 -translate-y-1/2">←</div>
                <div className="absolute -right-1 top-1/2 -translate-y-1/2">→</div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (nearbyInteractable) {
                if (nearbyInteractable.id === 'exit') {
                  onExit()
                } else {
                  setShowingProject(nearbyInteractable)
                }
              }
            }}
            className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full border-4 border-yellow-300 flex items-center justify-center text-white text-2xl font-bold shadow-lg active:from-yellow-400 active:to-yellow-600"
            style={{ boxShadow: '0 0 20px rgba(255,255,0,0.5)' }}
            disabled={!nearbyInteractable}
          >
            E
          </motion.button>
        </div>
      )}

      {/* Project Display Modal */}
      <AnimatePresence>
        {showingProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 flex items-center justify-center z-50 p-2 sm:p-4"
            onClick={() => setShowingProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-900 to-black border-4 rounded-lg p-4 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              style={{ borderColor: showingProject.color }}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 
                  className="text-xl sm:text-3xl font-bold"
                  style={{ color: showingProject.color, textShadow: `0 0 20px ${showingProject.color}` }}
                >
                  {showingProject.title}
                </h2>
                <button
                  onClick={() => setShowingProject(null)}
                  className="text-white hover:text-red-400 text-xl sm:text-2xl"
                >
                  ✕
                </button>
              </div>

              <p className="text-cyan-200 text-sm sm:text-lg mb-3 sm:mb-4">
                {showingProject.description}
              </p>

              {/* Project Type Badge */}
              <div className="mb-4">
                <span 
                  className="inline-block px-3 py-1 rounded-full text-sm font-bold"
                  style={{ 
                    backgroundColor: `${showingProject.color}20`,
                    color: showingProject.color,
                    border: `2px solid ${showingProject.color}`
                  }}
                >
                  {showingProject.project?.type || 'Game Project'}
                </span>
              </div>

              <div className="bg-black/50 border-2 border-cyan-500/30 rounded p-4 mb-4">
                <h3 className="text-cyan-400 font-bold mb-2">Project Details:</h3>
                <ul className="text-cyan-300 text-sm space-y-1 list-disc list-inside">
                  {showingProject.project?.engine && <li>Engine: {showingProject.project.engine}</li>}
                  {showingProject.project?.role && <li>Role: {showingProject.project.role}</li>}
                  {showingProject.project?.duration && <li>Duration: {showingProject.project.duration}</li>}
                  {showingProject.project?.teamSize && <li>Team Size: {showingProject.project.teamSize}</li>}
                  {showingProject.project?.status && <li>Status: {showingProject.project.status}</li>}
                </ul>
              </div>

              {/* Key Features */}
              {showingProject.project?.features && (
                <div className="bg-black/50 border-2 border-purple-500/30 rounded p-4 mb-4">
                  <h3 className="text-purple-400 font-bold mb-2">Key Features:</h3>
                  <ul className="text-purple-300 text-sm space-y-1 list-disc list-inside">
                    {showingProject.project.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {showingProject.project?.technologies && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {showingProject.project.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                {showingProject.project?.playable && (
                  <button 
                    className="flex-1 bg-green-600 hover:bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded font-bold text-sm sm:text-base transition-colors"
                    onClick={() => {
                      if (showingProject.project?.itchLink) {
                        window.open(showingProject.project.itchLink, '_blank')
                      }
                    }}
                  >
                    ▶ Play Demo
                  </button>
                )}
                {showingProject.project?.githubRepo && (
                  <button 
                    className="flex-1 bg-purple-600 hover:bg-purple-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded font-bold text-sm sm:text-base transition-colors"
                    onClick={() => window.open(showingProject.project.githubRepo, '_blank')}
                  >
                    📁 GitHub Repo
                  </button>
                )}
              </div>

              <p className="text-center text-gray-400 text-xs sm:text-sm mt-3 sm:mt-4">
                {isMobile ? 'Tap outside to close' : 'Press ESC or click outside to close'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PixelGame
