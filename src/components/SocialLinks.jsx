import { motion } from 'framer-motion'

const SocialLinks = ({ darkMode, contact }) => {
  const socialPlatforms = [
    { name: 'GitHub', url: contact.github, icon: '💻', color: darkMode ? 'hover:text-violet-400' : 'hover:text-cyber-cyan' },
    { name: 'LinkedIn', url: contact.linkedin, icon: '💼', color: darkMode ? 'hover:text-blue-400' : 'hover:text-blue-400' },
    { name: 'Twitter', url: contact.twitter, icon: '🐦', color: darkMode ? 'hover:text-sky-400' : 'hover:text-sky-400' },
    { name: 'Portfolio', url: contact.portfolio, icon: '🌐', color: darkMode ? 'hover:text-pink-400' : 'hover:text-pink-400' },
    { name: 'Discord', url: null, handle: contact.discord, icon: '💬', color: darkMode ? 'hover:text-indigo-400' : 'hover:text-indigo-400' },
  ]

  return (
    <div className="flex flex-wrap gap-3">
      {socialPlatforms.map((platform, idx) => (
        platform.url ? (
          <motion.a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all group ${
              darkMode
                ? 'bg-black/40 border-red-500/30 hover:border-red-500/60 text-gray-300'
                : 'bg-cyber-dark/40 border-cyber-cyan/30 hover:border-cyber-cyan/60 text-gray-300'
            } ${platform.color}`}
          >
            <span className="text-xl">{platform.icon}</span>
            <span className="text-sm font-medium">{platform.name}</span>
            <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </motion.a>
        ) : platform.handle ? (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
              darkMode
                ? 'bg-black/40 border-red-500/30 text-gray-300'
                : 'bg-cyber-dark/40 border-cyber-cyan/30 text-gray-300'
            }`}
            title={`Add me: ${platform.handle}`}
          >
            <span className="text-xl">{platform.icon}</span>
            <span className="text-sm font-medium">{platform.handle}</span>
          </motion.div>
        ) : null
      ))}
    </div>
  )
}

export default SocialLinks
