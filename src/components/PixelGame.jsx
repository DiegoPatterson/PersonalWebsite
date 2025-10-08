import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dataVault from '../data/vault.json'

const PixelGame = ({ onExit, zIndex, onBringToFront }) => {
  const [playerPos, setPlayerPos] = useState({ x: 5, y: 5 })
  const [playerDirection, setPlayerDirection] = useState('down')
  const [nearbyInteractable, setNearbyInteractable] = useState(null)
  const [showingProject, setShowingProject] = useState(null)
  const [keysPressed, setKeysPressed] = useState({})
  const gameRef = useRef(null)

  // Grid size (each tile is 32px)
  const TILE_SIZE = 32
  const GRID_WIDTH = 20
  const GRID_HEIGHT = 15

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

  // Walls/boundaries
  const walls = [
    // Outer walls
    ...Array.from({ length: GRID_WIDTH }, (_, i) => ({ x: i, y: 0 })),
    ...Array.from({ length: GRID_WIDTH }, (_, i) => ({ x: i, y: GRID_HEIGHT - 1 })),
    ...Array.from({ length: GRID_HEIGHT }, (_, i) => ({ x: 0, y: i })),
    ...Array.from({ length: GRID_HEIGHT }, (_, i) => ({ x: GRID_WIDTH - 1, y: i })),
  ]

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
  }, [keysPressed, playerDirection])

  return (
    <div 
      ref={gameRef}
      className="fixed inset-0 bg-black flex items-center justify-center"
      style={{ zIndex: zIndex || 2000 }}
      onPointerDown={onBringToFront}
      tabIndex={0}
    >
      {/* Game Canvas */}
      <div 
        className="relative border-4 border-cyan-500 shadow-2xl"
        style={{
          width: `${GRID_WIDTH * TILE_SIZE}px`,
          height: `${GRID_HEIGHT * TILE_SIZE}px`,
          background: 'linear-gradient(180deg, #0a0a1f 0%, #1a1a3f 100%)',
          imageRendering: 'pixelated'
        }}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: GRID_HEIGHT }).map((_, y) => (
            <div key={y} className="flex">
              {Array.from({ length: GRID_WIDTH }).map((_, x) => (
                <div
                  key={x}
                  className="border border-cyan-500/20"
                  style={{ width: TILE_SIZE, height: TILE_SIZE }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Walls */}
        {walls.map((wall, idx) => (
          <div
            key={`wall-${idx}`}
            className="absolute bg-gradient-to-br from-cyan-700 to-cyan-900"
            style={{
              left: `${wall.x * TILE_SIZE}px`,
              top: `${wall.y * TILE_SIZE}px`,
              width: `${TILE_SIZE}px`,
              height: `${TILE_SIZE}px`,
              boxShadow: 'inset 0 0 10px rgba(0,255,255,0.3)'
            }}
          />
        ))}

        {/* Interactable objects */}
        {interactables.map(obj => (
          <motion.div
            key={obj.id}
            className="absolute flex items-center justify-center"
            style={{
              left: `${obj.x * TILE_SIZE}px`,
              top: `${obj.y * TILE_SIZE}px`,
              width: `${TILE_SIZE}px`,
              height: `${TILE_SIZE}px`,
            }}
            animate={{
              scale: nearbyInteractable?.id === obj.id ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.5, repeat: nearbyInteractable?.id === obj.id ? Infinity : 0 }}
          >
            {/* Object sprite */}
            <div
              className="w-6 h-6 rounded"
              style={{
                backgroundColor: obj.color,
                boxShadow: `0 0 20px ${obj.color}`
              }}
            >
              {obj.type === 'terminal' && (
                <div className="text-[10px] text-black font-bold text-center leading-6">▦</div>
              )}
              {obj.type === 'arcade' && (
                <div className="text-[10px] text-black font-bold text-center leading-6">▣</div>
              )}
              {obj.type === 'console' && (
                <div className="text-[10px] text-black font-bold text-center leading-6">◆</div>
              )}
              {obj.type === 'door' && (
                <div className="text-[10px] text-black font-bold text-center leading-6">◄</div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Player */}
        <motion.div
          className="absolute"
          animate={{
            left: `${playerPos.x * TILE_SIZE}px`,
            top: `${playerPos.y * TILE_SIZE}px`,
          }}
          transition={{ duration: 0.15 }}
          style={{
            width: `${TILE_SIZE}px`,
            height: `${TILE_SIZE}px`,
          }}
        >
          {/* Player sprite - simple character */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className="w-4 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-sm"
              style={{
                boxShadow: '0 0 15px rgba(255,255,0,0.8)',
                transform: playerDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)'
              }}
            >
              {/* Simple face */}
              <div className="w-1 h-1 bg-black rounded-full absolute top-1 left-1" />
              <div className="w-1 h-1 bg-black rounded-full absolute top-1 right-1" />
            </div>
          </div>
        </motion.div>

        {/* Interaction prompt */}
        <AnimatePresence>
          {nearbyInteractable && !showingProject && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
                         bg-black/90 border-2 border-cyan-500 px-4 py-2 rounded"
            >
              <p className="text-cyan-400 text-sm font-mono">
                Press <span className="text-yellow-400 font-bold">E</span> to interact
              </p>
              <p className="text-cyan-300 text-xs text-center mt-1">
                {nearbyInteractable.title}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* HUD */}
      <div className="absolute top-4 left-4 bg-black/80 border-2 border-cyan-500 px-4 py-2 rounded">
        <p className="text-cyan-400 text-sm font-mono">
          GAME DESIGN PORTFOLIO v1.0
        </p>
        <p className="text-cyan-300 text-xs mt-1">
          Use Arrow Keys / WASD to move
        </p>
        <p className="text-cyan-300 text-xs">
          Press E to interact with projects
        </p>
      </div>

      {/* Exit button */}
      <button
        onClick={onExit}
        className="absolute top-4 right-4 bg-red-600/80 hover:bg-red-500 
                   border-2 border-red-400 px-4 py-2 rounded text-white 
                   font-mono text-sm transition-colors"
      >
        ESC - Exit Game
      </button>

      {/* Project Display Modal */}
      <AnimatePresence>
        {showingProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 flex items-center justify-center z-50"
            onClick={() => setShowingProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-900 to-black border-4 rounded-lg p-8 max-w-2xl"
              style={{ borderColor: showingProject.color }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 
                  className="text-3xl font-bold"
                  style={{ color: showingProject.color, textShadow: `0 0 20px ${showingProject.color}` }}
                >
                  {showingProject.title}
                </h2>
                <button
                  onClick={() => setShowingProject(null)}
                  className="text-white hover:text-red-400 text-2xl"
                >
                  ✕
                </button>
              </div>

              <p className="text-cyan-200 text-lg mb-4">
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

              <div className="flex gap-4">
                {showingProject.project?.playable && (
                  <button 
                    className="flex-1 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded font-bold transition-colors"
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
                    className="flex-1 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded font-bold transition-colors"
                    onClick={() => window.open(showingProject.project.githubRepo, '_blank')}
                  >
                    📁 GitHub Repo
                  </button>
                )}
              </div>

              <p className="text-center text-gray-400 text-sm mt-4">
                Press ESC or click outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PixelGame
