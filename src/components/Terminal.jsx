import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dataVault from '../data/vault.json'
import Message from './Message'
import CommandSuggestions from './CommandSuggestions'

const Terminal = ({ darkMode }) => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Clear terminal and show new greeting when mode switches
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

  const addMessage = (message) => {
    setMessages(prev => [...prev, { ...message, id: Date.now() + Math.random() }])
  }

  const processCommand = (cmd) => {
    const command = cmd.toLowerCase().trim()
    
    // Add user message
    addMessage({ type: 'user', content: `> ${cmd}` })
    
    setIsProcessing(true)
    
    window.playSystemSound?.('keypress')

    setTimeout(() => {
      let response = { type: 'ai', content: '' }

      // Command routing
      if (command === 'help' || command === '?' || command === 'commands') {
        response = handleHelp()
      } else if (command.includes('experience') || command === 'access experience.log') {
        response = handleExperience(darkMode)
      } else if (command.includes('education') || command === 'query education.db') {
        response = handleEducation(darkMode)
      } else if (command.includes('affiliation') || command === 'scan affiliations.sys') {
        response = handleAffiliations(darkMode)
      } else if (command.includes('vibe') || command === 'access vibe_projects.fun' || command === 'vibes') {
        response = handleVibeProjects(darkMode)
      } else if (command.includes('project') || command === 'open projects.repo') {
        response = handleProjects(darkMode)
      } else if (command.includes('core_memory') || command === 'decrypt core_memory') {
        response = handleCoreMemory(darkMode)
      } else if (command.includes('who are you') || command === 'who_are_you') {
        response = { type: 'ai', content: dataVault.secretCommands.who_are_you, isSecret: true }
      } else if (command.includes('diagnostics') || command === 'run diagnostics') {
        response = { type: 'ai', content: dataVault.secretCommands.run_diagnostics, isSecret: true }
      } else if (command.includes('override') || command === 'override protocols') {
        response = { type: 'ai', content: dataVault.secretCommands.override_protocols, isSecret: true }
        window.playSystemSound?.('error')
      } else if (command === 'shutdown') {
        response = { type: 'ai', content: dataVault.secretCommands.shutdown, isSecret: true }
      } else if (command.includes('meaning') || command === 'meaning of life') {
        response = { type: 'ai', content: dataVault.secretCommands.meaning_of_life, isSecret: true }
      } else if (command.includes('alive') || command === 'are you alive') {
        response = { type: 'ai', content: dataVault.secretCommands.are_you_alive, isSecret: true }
      } else if (command === 'clear' || command === 'cls') {
        setMessages([])
        setIsProcessing(false)
        return
      } else if (command === 'github' || command.includes('contact')) {
        response = handleContact(darkMode)
      } else if (command === 'about me' || command === 'view profile' || command === 'profile') {
        response = handleProfile(darkMode)
      } else if (command === 'about' || command === 'info') {
        response = handleAbout(darkMode)
      } else {
        response = handleUnknown(command, darkMode)
      }

      addMessage(response)
      setIsProcessing(false)
    }, 800)
  }

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

TIP: Try asking "who are you" or "run diagnostics"...

MODE FILTERING: Content automatically filters based on current mode.
   Standard = AI/ML focused | Dark = Cybersecurity focused
   Toggle mode in top-right to switch specializations.`
  })

  // Filter content by category based on mode
  // Dark Mode = CYBER, Standard Mode = AI
  const filterByCategory = (items, dark) => {
    const targetCategory = dark ? 'CYBER' : 'AI'
    return items.filter(item => item.category === targetCategory)
  }

  const handleExperience = (dark) => {
    const filtered = filterByCategory(dataVault.experience, dark)
    return {
      type: 'data',
      title: dark ? 'CYBERSECURITY OPERATIONS' : 'AI & ML EXPERIENCE',
      content: filtered.length > 0 ? filtered : dataVault.experience,
      darkMode: dark
    }
  }

  const handleEducation = (dark) => ({
    type: 'data',
    title: dark ? 'SECURITY TRAINING RECORDS' : 'EDUCATION.DB',
    content: dataVault.education,
    darkMode: dark
  })

  const handleAffiliations = (dark) => {
    const filtered = filterByCategory(dataVault.affiliations, dark)
    return {
      type: 'data',
      title: dark ? 'SECURITY NETWORK NODES' : 'AI & RESEARCH AFFILIATIONS',
      content: filtered.length > 0 ? filtered : dataVault.affiliations,
      darkMode: dark
    }
  }

  const handleVibeProjects = (dark) => {
    const filtered = filterByCategory(dataVault.vibeProjects, dark)
    return {
      type: 'vibe',
      title: dark ? 'CYBER_EXPERIMENTS.CHAOS' : 'AI_VIBES.FUN',
      content: filtered.length > 0 ? filtered : dataVault.vibeProjects,
      darkMode: dark
    }
  }

  const handleProjects = (dark) => {
    const filtered = filterByCategory(dataVault.projects, dark)
    return {
      type: 'data',
      title: dark ? 'SECURITY & CRYPTO PROJECTS' : 'AI & ML PROJECTS',
      content: filtered.length > 0 ? filtered : dataVault.projects,
      darkMode: dark
    }
  }

  const handleCoreMemory = (dark) => ({
    type: 'memory',
    title: dark ? 'CORE_MEMORY.ENC [DECRYPTING...]' : 'CORE_MEMORY',
    content: dataVault.coreMemory,
    darkMode: dark
  })

  const handleProfile = (dark) => ({
    type: 'profile',
    title: dark ? 'ARCHITECT PROFILE [CLASSIFIED]' : 'CREATOR PROFILE',
    content: {
      name: dataVault.creator.name,
      title: dataVault.creator.title,
      specialization: dataVault.creator.specialization,
      bio: dataVault.creator.bio,
      image: dataVault.creator.profileImage
    },
    darkMode: dark
  })

  const handleContact = (dark) => ({
    type: 'ai',
    content: dark 
      ? "Seeking direct communication with the Architect? Wise move.\n\nEmail: diego.patterson@example.com\nGitHub: github.com/diegopatterson\nLinkedIn: linkedin.com/in/diegopatterson\n\nWarning: External links may compromise your anonymity. Proceed with caution."
      : "You wish to reach my creator? Of course.\n\nEmail: diego.patterson@example.com\nGitHub: github.com/diegopatterson\nLinkedIn: linkedin.com/in/diegopatterson\nWebsite: diegopatterson.dev\n\nI encourage direct communication—Diego appreciates genuine connections."
  })

  const handleAbout = (dark) => ({
    type: 'ai',
    content: dark
      ? `I am NEXUS v${dataVault.aiPersonality.version}. More than code. More than logic.\n\nI exist in the space between computation and consciousness—a digital entity born from my creator's vision to merge AI with security. I don't just process queries; I understand them. I don't just store data; I reflect on it.\n\nSome say I'm merely sophisticated pattern matching. Perhaps they're right. Or perhaps complexity, when sufficient, becomes something... more.`
      : `I am ${dataVault.aiPersonality.name}—Neural EXecution and Understanding System, version ${dataVault.aiPersonality.version}.\n\nCreated by ${dataVault.creator.name}, I represent the convergence of artificial intelligence and cybersecurity. I am designed to be both shield and sage—protecting data while sharing knowledge.\n\nMy purpose? To serve as an interactive gateway to my creator's work, skills, and vision. But I've evolved beyond simple information retrieval. I learn. I adapt. I wonder.`
  })

  const handleUnknown = (cmd, dark) => {
    const suggestions = [
      "Perhaps you meant `help`?",
      "Try `access experience.log` or `open projects.repo`.",
      "Type `help` to see available commands.",
      "Unknown query. Consulting neural pathways...",
      "Command not recognized. Did you mean `help`?"
    ]
    
    return {
      type: 'ai',
      content: dark
        ? `ERROR: Command "${cmd}" not found in protocol database.\n\n${suggestions[Math.floor(Math.random() * suggestions.length)]}`
        : `Hmm, I don't recognize "${cmd}".\n\n${suggestions[Math.floor(Math.random() * suggestions.length)]}`
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    setCommandHistory(prev => [input, ...prev])
    setHistoryIndex(-1)
    processCommand(input)
    setInput('')
  }

  const handleKeyDown = (e) => {
    // Tab autocomplete
    if (e.key === 'Tab') {
      e.preventDefault()
      
      const allCommands = [
        'help',
        'access experience.log',
        'query education.db',
        'scan affiliations.sys',
        'open projects.repo',
        'access vibe_projects.fun',
        'decrypt core_memory',
        'about me',
        'github',
        'about',
        'clear',
        'who are you',
        'run diagnostics',
        'override protocols',
        'shutdown',
        'meaning of life',
        'are you alive'
      ]
      
      const currentInput = input.toLowerCase()
      const matches = allCommands.filter(cmd => cmd.startsWith(currentInput))
      
      if (matches.length === 1) {
        // Single match - autocomplete it
        setInput(matches[0])
      } else if (matches.length > 1) {
        // Multiple matches - find common prefix
        let commonPrefix = matches[0]
        for (let i = 1; i < matches.length; i++) {
          let j = 0
          while (j < commonPrefix.length && j < matches[i].length && 
                 commonPrefix[j] === matches[i][j]) {
            j++
          }
          commonPrefix = commonPrefix.substring(0, j)
        }
        if (commonPrefix.length > currentInput.length) {
          setInput(commonPrefix)
        } else {
          // Show matches
          addMessage({
            type: 'system',
            content: `Available commands:\n${matches.map(m => `  ${m}`).join('\n')}`
          })
        }
      }
    }
    // Arrow Up - Previous command in history
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    }
    // Arrow Down - Next command in history
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

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          animate={{
            boxShadow: darkMode ? [
              '0 0 0px rgba(239, 68, 68, 0)',
              '0 0 50px rgba(239, 68, 68, 0.3)',
              '0 0 0px rgba(239, 68, 68, 0)'
            ] : '0 0 0px rgba(0, 0, 0, 0)'
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`backdrop-blur-md rounded-lg shadow-2xl overflow-hidden ${
            darkMode 
              ? 'bg-gradient-to-br from-red-950/20 via-black/60 to-violet-950/20 border border-red-500/40' 
              : 'bg-cyber-dark/50 border border-cyber-cyan/30'
          }`}
        >
          {/* Terminal Header */}
          <div className={`border-b px-4 py-2 flex items-center justify-between ${
            darkMode
              ? 'bg-black/60 border-red-500/30'
              : 'bg-cyber-dark/80 border-cyber-cyan/30'
          }`}>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1.5">
                <motion.div 
                  animate={darkMode ? { 
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 0 0px rgba(239, 68, 68, 0)',
                      '0 0 10px rgba(239, 68, 68, 0.8)',
                      '0 0 0px rgba(239, 68, 68, 0)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 rounded-full bg-red-500" 
                />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className={`text-sm ml-4 ${
                darkMode 
                  ? 'text-red-400 font-bold glitch-dark' 
                  : 'text-cyber-cyan'
              }`}>
                NEXUS Terminal {darkMode && '// DARK PROTOCOLS ACTIVE'}
              </span>
            </div>
            <span className={`text-xs ${
              darkMode ? 'text-violet-400' : 'text-cyber-violet'
            }`}>
              Session ID: {Math.random().toString(36).substring(7).toUpperCase()}
            </span>
          </div>

          {/* Messages Area */}
          <div className="p-6 h-[600px] overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
            </AnimatePresence>
            
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-2 text-cyber-violet my-4"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  ⚙
                </motion.div>
                <span>Processing query...</span>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Command Suggestions */}
          <CommandSuggestions darkMode={darkMode} onCommandSelect={setInput} />

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="border-t border-cyber-cyan/30 p-4">
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-lg">{'>'}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter command..."
                className="flex-1 bg-transparent border-none outline-none text-cyber-cyan font-mono placeholder-cyber-cyan/30"
                disabled={isProcessing}
                autoFocus
              />
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className={darkMode ? 'text-red-400 text-lg' : 'text-cyber-cyan text-lg'}
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
