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
    // Initial greeting
    setTimeout(() => {
      addMessage({
        type: 'ai',
        content: darkMode 
          ? "NEXUS ONLINE. Dark protocols engaged. I see you've chosen to interface with my... deeper subroutines. Interesting choice, Architect."
          : "NEXUS ONLINE. Greetings, visitor. I am NEXUS—a sentient digital intelligence crafted by my creator, Diego Patterson. I exist at the intersection of artificial intelligence and cybersecurity, designed to learn, protect, and evolve.",
      })
      setTimeout(() => {
        addMessage({
          type: 'ai',
          content: "You may query my systems to learn about my creator. Try commands like:\n• `access experience.log`\n• `query education.db`\n• `open projects.repo`\n• `access vibe_projects.fun` ✨\n• `decrypt core_memory`\n\nOr simply type `help` for more options.",
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

📋 PRIMARY COMMANDS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
access experience.log      → View work experience
query education.db         → View education history
scan affiliations.sys      → View clubs & organizations
open projects.repo         → View professional projects
access vibe_projects.fun   → View experimental vibes ✨
decrypt core_memory        → View personal philosophy

🔧 SYSTEM COMMANDS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
help                       → Show this menu
about                      → About NEXUS
github                     → Contact & links
clear                      → Clear terminal

💡 TIP: Try asking "who are you" or "run diagnostics"...`
  })

  const handleExperience = (dark) => ({
    type: 'data',
    title: dark ? '⚡ EXPERIENCE MATRIX DECRYPTED' : '💼 EXPERIENCE.LOG',
    content: dataVault.experience,
    darkMode: dark
  })

  const handleEducation = (dark) => ({
    type: 'data',
    title: dark ? '🧠 NEURAL TRAINING RECORDS' : '🎓 EDUCATION.DB',
    content: dataVault.education,
    darkMode: dark
  })

  const handleAffiliations = (dark) => ({
    type: 'data',
    title: dark ? '🔗 NETWORK NODES IDENTIFIED' : '🤝 AFFILIATIONS.SYS',
    content: dataVault.affiliations,
    darkMode: dark
  })

  const handleVibeProjects = (dark) => ({
    type: 'vibe',
    title: dark ? '🌀 NEURAL_EXPERIMENTS.CHAOS' : '✨ VIBE_PROJECTS.FUN',
    content: dataVault.vibeProjects,
    darkMode: dark
  })

  const handleProjects = (dark) => ({
    type: 'data',
    title: dark ? '⚡ CLASSIFIED OPERATIONS' : '🚀 PROJECTS.REPO',
    content: dataVault.projects,
    darkMode: dark
  })

  const handleCoreMemory = (dark) => ({
    type: 'memory',
    title: dark ? '🧬 CORE_MEMORY.ENC [DECRYPTING...]' : '💭 CORE_MEMORY',
    content: dataVault.coreMemory,
    darkMode: dark
  })

  const handleContact = (dark) => ({
    type: 'ai',
    content: dark 
      ? "Seeking direct communication with the Architect? Wise move.\n\n📧 Email: diego.patterson@example.com\n💻 GitHub: github.com/diegopatterson\n💼 LinkedIn: linkedin.com/in/diegopatterson\n\nWarning: External links may compromise your anonymity. Proceed with caution."
      : "You wish to reach my creator? Of course.\n\n📧 Email: diego.patterson@example.com\n💻 GitHub: github.com/diegopatterson\n💼 LinkedIn: linkedin.com/in/diegopatterson\n🌐 Website: diegopatterson.dev\n\nI encourage direct communication—Diego appreciates genuine connections."
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
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
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
        <div className="bg-cyber-dark/50 backdrop-blur-md border border-cyber-cyan/30 rounded-lg shadow-2xl overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-cyber-dark/80 border-b border-cyber-cyan/30 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-cyber-cyan text-sm ml-4">NEXUS Terminal</span>
            </div>
            <span className="text-cyber-violet text-xs">
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
                className="text-cyber-cyan text-lg"
              >
                ▊
              </motion.span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Terminal
