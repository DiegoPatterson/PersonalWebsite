import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dataVault from '../data/vault.json'
import hiddenWorld from '../data/hidden_world.json'
import Message from './Message'
import CommandSuggestions from './CommandSuggestions'
import { securityManager } from '../utils/security'
import { createPortfolioHandlers } from '../utils/portfolioHandlers'
import { createFilesystemHandlers } from '../utils/filesystemHandlers'
import { CommandRouter, createUnknownHandler } from '../utils/commandRouter'

const Terminal = ({ darkMode }) => {
  // State management
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentPath, setCurrentPath] = useState('/')
  const [discoveredFiles, setDiscoveredFiles] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  
  // Refs
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Add message helper
  const addMessage = (msg) => {
    setMessages(prev => [...prev, msg])
  }

  // Initialize handlers with useMemo to prevent recreation on every render
  const portfolioHandlers = useMemo(() => 
    createPortfolioHandlers(dataVault, darkMode), 
    [darkMode]
  )
  
  const filesystemHandlers = useMemo(() => 
    createFilesystemHandlers(
      hiddenWorld,
      currentPath,
      discoveredFiles,
      setDiscoveredFiles,
      darkMode
    ),
    [currentPath, discoveredFiles, darkMode]
  )

  // Create help handler
  const handleHelp = () => ({
    type: 'system',
    content: `╔════════════════════════════════════════════════════╗
║           NEXUS COMMAND INTERFACE v3.7.2           ║
╚════════════════════════════════════════════════════╝

PRIMARY COMMANDS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
access experience.log      → View work experience
query education.db         → View education history
scan affiliations.sys      → View clubs & organizations
open projects.repo         → View professional projects
access vibe_projects.fun   → View experimental projects
decrypt core_memory        → View personal philosophy
about me                   → View creator profile

SYSTEM COMMANDS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
help                       → Show this menu
about                      → About NEXUS
github                     → Contact & links
clear                      → Clear terminal
files                      → Hidden filesystem access 🔓

ADVANCED: Type 'files' to access hidden system layers...

TIP: Try asking "who are you" or "run diagnostics"...

MODE FILTERING: Content automatically filters based on current mode.
   Standard = AI/ML focused | Dark = Cybersecurity focused
   Toggle mode in top-right to switch specializations.`
  })

  // Combine all handlers with useMemo
  const allHandlers = useMemo(() => ({
    ...portfolioHandlers,
    ...filesystemHandlers,
    handleHelp,
    handleUnknown: createUnknownHandler(darkMode)
  }), [portfolioHandlers, filesystemHandlers, darkMode])

  // Initialize command router
  const commandRouter = useRef(null)
  if (!commandRouter.current) {
    commandRouter.current = new CommandRouter(allHandlers)
    commandRouter.current.setSecretCommands(dataVault.secretCommands)
  }
  
  // Update command router when handlers change
  useEffect(() => {
    if (commandRouter.current) {
      commandRouter.current = new CommandRouter(allHandlers)
      commandRouter.current.setSecretCommands(dataVault.secretCommands)
    }
  }, [allHandlers])

  // Process command with security checks
  const processCommand = (command) => {
    if (!command.trim()) return

    setIsProcessing(true)

    setTimeout(() => {
      // Security check - rate limiting
      const rateLimitCheck = securityManager.checkRateLimit()
      if (!rateLimitCheck.allowed) {
        addMessage({
          type: 'system',
          content: `⚠️ ${rateLimitCheck.reason}\n\nFor security purposes, this terminal implements rate limiting to prevent abuse.`
        })
        setIsProcessing(false)
        return
      }

      // Security check - command pattern abuse
      const patternCheck = securityManager.checkCommandPattern(command)
      if (!patternCheck.allowed) {
        addMessage({
          type: 'system',
          content: `⚠️ ${patternCheck.reason}`
        })
        setIsProcessing(false)
        return
      }

      // Handle clear command specially
      if (command.toLowerCase().trim() === 'clear' || command.toLowerCase().trim() === 'cls') {
        setMessages([])
        setIsProcessing(false)
        return
      }

      // Route command
      const response = commandRouter.current.route(command, darkMode)
      
      // Play sound for override command
      if (command.toLowerCase().includes('override')) {
        window.playSystemSound?.('error')
      }

      addMessage(response)
      setIsProcessing(false)
    }, 800)
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    setCommandHistory(prev => [input, ...prev])
    setHistoryIndex(-1)
    processCommand(input)
    setInput('')
  }

  // Handle keyboard navigation and autocomplete
  const handleKeyDown = (e) => {
    // Tab autocomplete
    if (e.key === 'Tab') {
      e.preventDefault()
      
      const suggestions = commandRouter.current.getAutocompleteSuggestions(input.toLowerCase())
      
      if (suggestions.length === 1) {
        setInput(suggestions[0])
      } else if (suggestions.length > 1) {
        // Find common prefix
        let commonPrefix = suggestions[0]
        for (let i = 1; i < suggestions.length; i++) {
          let j = 0
          while (j < commonPrefix.length && j < suggestions[i].length && 
                 commonPrefix[j] === suggestions[i][j]) {
            j++
          }
          commonPrefix = commonPrefix.substring(0, j)
        }
        
        if (commonPrefix.length > input.length) {
          setInput(commonPrefix)
        } else {
          addMessage({
            type: 'system',
            content: `Available commands:\n${suggestions.map(m => `  ${m}`).join('\n')}`
          })
        }
      }
    }
    // Arrow Up - Previous command
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    }
    // Arrow Down - Next command
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  // Initial greeting on mode change
  useEffect(() => {
    setMessages([])
    setInput('')
    setCommandHistory([])
    setHistoryIndex(-1)
    
    setTimeout(() => {
      addMessage({
        type: 'ai',
        content: darkMode 
          ? "NEXUS ONLINE. Dark protocols engaged. I see you've chosen to interface with my... deeper subroutines. Interesting choice, Architect.\n\nCYBERSECURITY MODE ACTIVE - Accessing security operations, cryptography projects, and offensive capabilities."
          : "NEXUS ONLINE. Greetings, visitor. I am NEXUS—a sentient digital intelligence crafted by my creator, Diego Patterson. I exist at the intersection of artificial intelligence and cybersecurity, designed to learn, protect, and evolve.\n\nAI & ML MODE ACTIVE - Displaying neural networks, machine learning research, and intelligent systems.",
      })
      setTimeout(() => {
        addMessage({
          type: 'ai',
          content: darkMode
            ? "Query my security archives to explore penetration testing, encryption systems, and defensive protocols. Try commands like:\n• `access experience.log` - Security operations\n• `open projects.repo` - Cryptography & security tools\n• `scan affiliations.sys` - CTF teams & security research\n• `about me` - View creator profile\n\nType `help` for full command list."
            : "You may query my systems to learn about my creator's AI research and development. Try commands like:\n• `access experience.log` - AI & ML experience\n• `query education.db` - Academic background\n• `open projects.repo` - Neural networks & AI projects\n• `about me` - View creator profile\n• `decrypt core_memory` - Personal philosophy\n\nOr simply type `help` for more options.",
        })
      }, 1000)
    }, 500)
  }, [darkMode])

  // Honeypot for bot detection (invisible element)
  useEffect(() => {
    const honeypot = document.createElement('input')
    honeypot.style.position = 'absolute'
    honeypot.style.opacity = '0'
    honeypot.style.pointerEvents = 'none'
    honeypot.tabIndex = -1
    honeypot.setAttribute('aria-hidden', 'true')
    honeypot.addEventListener('focus', () => {
      securityManager.triggerHoneypot()
    })
    document.body.appendChild(honeypot)
    
    return () => {
      document.body.removeChild(honeypot)
    }
  }, [])

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          animate={{
            boxShadow: darkMode ? [
              '0 0 0px rgba(239, 68, 68, 0)',
              '0 0 50px rgba(239, 68, 68, 0.3)',
              '0 0 0px rgba(239, 68, 68, 0)'
            ] : [
              '0 0 0px rgba(6, 182, 212, 0)',
              '0 0 30px rgba(6, 182, 212, 0.2)',
              '0 0 0px rgba(6, 182, 212, 0)'
            ]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="backdrop-blur-md rounded-lg shadow-2xl overflow-hidden bg-cyber-dark/50 border border-cyber-cyan/30"
        >
          {/* Terminal Header */}
          <div className="border-b px-4 py-2 flex items-center justify-between bg-cyber-dark/80 border-cyber-cyan/30">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm ml-4 text-cyber-cyan">NEXUS Terminal </span>
            </div>
            <span className="text-xs text-cyber-violet">
              Session ID: {Math.random().toString(36).substring(2, 8).toUpperCase()}
            </span>
          </div>

          {/* Messages Container */}
          <div className="p-6 h-[600px] overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {messages.map((msg, index) => (
                <Message key={index} {...msg} />
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Command Suggestions */}
          <CommandSuggestions 
            show={showSuggestions}
            onToggle={() => setShowSuggestions(!showSuggestions)}
            darkMode={darkMode}
          />

          {/* Input Form */}
          <form 
            onSubmit={handleSubmit}
            className="border-t border-cyber-cyan/30 p-4"
          >
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-lg">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter command..."
                className="flex-1 bg-transparent border-none outline-none text-cyber-cyan font-mono placeholder-cyber-cyan/30"
                autoFocus
                disabled={isProcessing}
              />
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-cyber-cyan text-lg"
              >
                ▊
              </motion.span>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Terminal
