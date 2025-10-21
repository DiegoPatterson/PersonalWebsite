import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

const Message = ({ message }) => {
  const { type, content, title, isSecret, darkMode } = message

  const renderContent = () => {
    switch (type) {
      case 'user':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              textShadow: darkMode ? [
                '0 0 0px rgba(34, 197, 94, 0)',
                '0 0 10px rgba(34, 197, 94, 0.5)',
                '0 0 0px rgba(34, 197, 94, 0)'
              ] : '0 0 0px rgba(0, 0, 0, 0)'
            }}
            transition={{
              textShadow: { duration: 2, repeat: Infinity }
            }}
            className={`font-mono mb-4 ${
              darkMode ? 'text-green-400' : 'text-green-400'
            }`}
          >
            {content}
          </motion.div>
        )

      case 'ai':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 ${
              isSecret 
                ? 'border-l-2 border-cyber-violet pl-4' 
                : darkMode 
                  ? 'border-l-2 border-red-500/50 pl-4' 
                  : ''
            }`}
          >
            <div className={`whitespace-pre-wrap font-mono text-sm leading-relaxed ${
              isSecret 
                ? 'text-cyber-violet' 
                : darkMode 
                  ? 'text-red-400'
                  : 'text-cyber-cyan'
            }`}>
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </motion.div>
        )

      case 'system':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 bg-cyber-dark/50 border border-cyber-cyan/20 rounded p-4"
          >
            <pre className="text-cyber-cyan text-xs font-mono whitespace-pre-wrap">
              {content}
            </pre>
          </motion.div>
        )

      case 'data':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            {title && (
              <div className="flex items-center space-x-2 mb-4">
                <motion.div
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    scale: darkMode ? [1, 1.2, 1] : 1
                  }}
                  transition={{ duration: darkMode ? 1.5 : 2, repeat: Infinity }}
                  className={`w-2 h-2 rounded-full ${
                    darkMode ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-cyber-cyan'
                  }`}
                />
                <h3 className={`font-bold text-lg ${
                  darkMode 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-violet-500 to-red-500 bg-[length:200%_auto] animate-gradient'
                    : 'text-cyber-cyan'
                }`}>{title}</h3>
                {darkMode && (
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-red-500 text-xs"
                  >
                    [DECRYPTING...]
                  </motion.span>
                )}
              </div>
            )}
            
            <div className="space-y-4">
              {Array.isArray(content) ? content.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    boxShadow: darkMode ? [
                      '0 0 0px rgba(239, 68, 68, 0)',
                      '0 0 20px rgba(239, 68, 68, 0.3)',
                      '0 0 0px rgba(239, 68, 68, 0)'
                    ] : '0 0 0px rgba(0, 0, 0, 0)'
                  }}
                  transition={{ 
                    delay: idx * 0.1,
                    boxShadow: { duration: 3, repeat: Infinity, delay: idx * 0.5 }
                  }}
                  className={`rounded-lg p-4 transition-all ${
                    darkMode
                      ? 'bg-gradient-to-br from-red-950/20 to-violet-950/20 border border-red-500/30 hover:border-red-500/60 hover:shadow-xl hover:shadow-red-500/20'
                      : 'bg-cyber-dark/30 border border-cyber-cyan/20 hover:border-cyber-cyan/40'
                  }`}
                >
                  {renderDataItem(item, darkMode)}
                </motion.div>
              )) : renderDataItem(content, darkMode)}
            </div>
          </motion.div>
        )

      case 'prompt':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            {title && (
              <div className="flex items-center space-x-2 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="text-2xl"
                >
                  ✨
                </motion.div>
                <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-violet to-pink-500 font-bold text-lg">
                  {title}
                </h3>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="text-2xl"
                >
                  ✨
                </motion.div>
              </div>
            )}
            
            <div className="space-y-4">
              {Array.isArray(content) && content.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-cyan-900/20 border border-purple-500/30 rounded-lg p-4 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                >
                  {renderPromptItem(item)}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )

      case 'memory':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              boxShadow: darkMode ? [
                '0 0 0px rgba(239, 68, 68, 0)',
                '0 0 40px rgba(239, 68, 68, 0.4)',
                '0 0 0px rgba(239, 68, 68, 0)'
              ] : '0 0 0px rgba(0, 0, 0, 0)'
            }}
            transition={{
              boxShadow: { duration: 4, repeat: Infinity }
            }}
            className="mb-6"
          >
            {title && (
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`font-bold text-lg mb-4 ${
                  darkMode
                    ? 'text-red-500'
                    : 'text-cyber-violet'
                }`}
                data-text={title}
              >
                {title}
              </motion.h3>
            )}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`rounded-lg p-6 space-y-4 ${
                darkMode
                  ? 'bg-gradient-to-br from-red-950/30 via-violet-950/20 to-black/50 border border-red-500/40'
                  : 'bg-gradient-to-br from-cyber-dark/50 to-cyber-violet/10 border border-cyber-violet/30'
              }`}
            >
              <p className="text-cyber-cyan leading-relaxed">{content.philosophy}</p>
              <p className="text-cyber-cyan leading-relaxed">{content.motivation}</p>
              <p className="text-cyber-cyan leading-relaxed">{content.vision}</p>
              
              <div className="mt-6">
                <h4 className="text-cyber-violet font-bold mb-2">Core Values:</h4>
                <ul className="space-y-1">
                  {content.values.map((value, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + idx * 0.1 }}
                      className="text-cyber-cyan flex items-center"
                    >
                      <span className="text-cyber-violet mr-2">▸</span>
                      {value}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-6 pt-4 border-t border-cyber-violet/30 italic text-cyber-violet"
              >
                {content.quote}
              </motion.div>
            </motion.div>
          </motion.div>
        )

      case 'profile':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`border rounded-lg p-6 ${
                darkMode 
                  ? 'border-red-500/30 bg-red-950/20' 
                  : 'border-cyber-cyan/30 bg-cyber-cyan/5'
              }`}
            >
              <h3 className={`text-lg font-bold mb-6 ${
                darkMode ? 'text-red-400' : 'text-cyber-cyan'
              }`}>
                {title}
              </h3>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Image */}
                {content.image && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <img 
                      src={content.image} 
                      alt={content.name}
                      className={`w-48 h-72 object-cover rounded-lg border-2 ${
                        darkMode 
                          ? 'border-red-500/50' 
                          : 'border-cyber-cyan/50'
                      }`}
                      style={{ objectPosition: 'center top' }}
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </motion.div>
                )}

                {/* Profile Info */}
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className={`text-2xl font-bold mb-2 ${
                      darkMode ? 'text-red-300' : 'text-cyber-cyan'
                    }`}>
                      {content.name}
                    </h4>
                    <p className={`text-sm mb-4 ${
                      darkMode ? 'text-violet-400' : 'text-cyber-violet'
                    }`}>
                      {content.title}
                    </p>
                    
                    {content.specialization && (
                      <div className="mb-4">
                        <span className={`text-xs uppercase tracking-wide ${
                          darkMode ? 'text-red-400' : 'text-cyber-cyan'
                        }`}>
                          Specialization:
                        </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {content.specialization.map((spec, i) => (
                            <span 
                              key={i}
                              className={`px-3 py-1 text-xs rounded border ${
                                darkMode 
                                  ? 'border-red-500/40 bg-red-500/10 text-red-300' 
                                  : 'border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan'
                              }`}
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {content.bio && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className={`text-sm leading-relaxed ${
                          darkMode ? 'text-gray-300' : 'text-gray-300'
                        }`}
                      >
                        {content.bio}
                      </motion.p>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )

      case 'contact':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-mono text-sm leading-relaxed ${
              darkMode ? 'text-green-400' : 'text-cyber-cyan'
            }`}
          >
            <div className={`p-4 rounded-lg mb-4 ${
              darkMode ? 'bg-gray-800/50' : 'bg-white/10'
            }`}>
              <h3 className={`text-lg font-bold mb-4 ${
                darkMode ? 'text-red-400' : 'text-cyber-pink'
              }`}>
                📬 Contact Information
              </h3>
              
              {content && (
                <div className="space-y-3">
                  <div>
                    <span className="opacity-70">Email:</span>{' '}
                    <a 
                      href={`mailto:${content.email}`}
                      className={`hover:underline ${
                        darkMode ? 'text-green-300' : 'text-cyan-300'
                      }`}
                    >
                      {content.email}
                    </a>
                  </div>
                  
                  <div className="mt-4">
                    <span className="opacity-70">Connect with me:</span>
                    <div className="flex gap-4 mt-2 flex-wrap">
                      {content.github && (
                        <a
                          href={content.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                            darkMode 
                              ? 'bg-gray-700 hover:bg-gray-600 text-green-400' 
                              : 'bg-white/10 hover:bg-white/20 text-cyan-300'
                          }`}
                        >
                          💻 GitHub
                        </a>
                      )}
                      {content.linkedin && (
                        <a
                          href={content.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                            darkMode 
                              ? 'bg-gray-700 hover:bg-gray-600 text-green-400' 
                              : 'bg-white/10 hover:bg-white/20 text-cyan-300'
                          }`}
                        >
                          💼 LinkedIn
                        </a>
                      )}
                      {content.twitter && content.twitter !== 'N/A' && (
                        <a
                          href={content.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                            darkMode 
                              ? 'bg-gray-700 hover:bg-gray-600 text-green-400' 
                              : 'bg-white/10 hover:bg-white/20 text-cyan-300'
                          }`}
                        >
                          🐦 Twitter
                        </a>
                      )}
                      {content.discord && content.discord !== 'N/A' && (
                        <div
                          className={`flex items-center gap-2 px-3 py-2 rounded ${
                            darkMode ? 'bg-gray-700 text-green-400' : 'bg-white/10 text-cyan-300'
                          }`}
                        >
                          💬 {content.discord}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )

      case 'resume':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-mono text-sm leading-relaxed ${
              darkMode ? 'text-green-400' : 'text-cyber-cyan'
            }`}
          >
            <div className={`p-4 rounded-lg mb-4 ${
              darkMode ? 'bg-gray-800/50' : 'bg-white/10'
            }`}>
              <h3 className={`text-lg font-bold mb-4 ${
                darkMode ? 'text-red-400' : 'text-cyber-pink'
              }`}>
                📄 Resume / CV
              </h3>
              
              {content && (
                <div className="space-y-4">
                  <p className="opacity-70">
                    Download my complete resume in PDF format:
                  </p>
                  
                  <div className="flex gap-3 flex-wrap">
                    <a
                      href={content.pdfUrl}
                      download
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                        darkMode
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-cyber-pink hover:bg-pink-600 text-white'
                      }`}
                    >
                      Download Resume
                    </a>
                    
                    <a
                      href={content.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                        darkMode
                          ? 'bg-violet-500 hover:bg-violet-600 text-white'
                          : 'bg-cyber-cyan hover:bg-cyan-600 text-white'
                      }`}
                    >
                      Open in New Tab
                    </a>
                  </div>
                  
                  {content.lastUpdated && (
                    <p className="text-xs opacity-50">
                      Last updated: {content.lastUpdated}
                    </p>
                  )}
                  
                  {/* PDF Preview */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.3 }}
                    className={`mt-6 border rounded-lg overflow-hidden ${
                      darkMode ? 'border-red-500/30' : 'border-cyber-cyan/30'
                    }`}
                  >
                    <div className={`p-2 text-xs opacity-70 ${
                      darkMode ? 'bg-red-950/20' : 'bg-cyber-cyan/5'
                    }`}>
                      Resume Preview (scroll to view full document)
                    </div>
                    <iframe
                      src={content.pdfUrl}
                      className="w-full bg-white"
                      style={{ height: '600px' }}
                      title="Resume Preview"
                    />
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        )

      case 'certifications':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-mono text-sm leading-relaxed ${
              darkMode ? 'text-green-400' : 'text-cyber-cyan'
            }`}
          >
            <div className={`p-4 rounded-lg mb-4 ${
              darkMode ? 'bg-gray-800/50' : 'bg-white/10'
            }`}>
              <h3 className={`text-lg font-bold mb-4 ${
                darkMode ? 'text-red-400' : 'text-cyber-pink'
              }`}>
                🏆 Certifications & Credentials
              </h3>
              
              {content && Array.isArray(content) && content.length > 0 && (
                <div className="space-y-4">
                  {content.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded border ${
                        darkMode
                          ? 'border-gray-700 bg-gray-900/50'
                          : 'border-cyan-500/30 bg-white/5'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{cert.icon}</span>
                        <div className="flex-1">
                          <h4 className={`font-bold ${
                            darkMode ? 'text-green-300' : 'text-cyan-300'
                          }`}>
                            {cert.name}
                          </h4>
                          <p className="opacity-70 text-sm mt-1">
                            {cert.issuer} • {cert.date}
                          </p>
                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-block mt-2 text-xs px-3 py-1 rounded transition-colors ${
                                darkMode
                                  ? 'bg-gray-700 hover:bg-gray-600'
                                  : 'bg-white/10 hover:bg-white/20'
                              }`}
                            >
                              🔗 View Credential
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )

      case 'social':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-mono text-sm leading-relaxed ${
              darkMode ? 'text-green-400' : 'text-cyber-cyan'
            }`}
          >
            <div className={`p-4 rounded-lg mb-4 ${
              darkMode ? 'bg-gray-800/50' : 'bg-white/10'
            }`}>
              <h3 className={`text-lg font-bold mb-4 ${
                darkMode ? 'text-red-400' : 'text-cyber-pink'
              }`}>
                🌐 Social Media & Links
              </h3>
              
              {content && (
                <div className="space-y-3">
                  <p className="opacity-70 mb-4">
                    Find me on these platforms:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {content.github && (
                      <a
                        href={content.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                          darkMode
                            ? 'bg-gray-700 hover:bg-gray-600 hover:scale-105'
                            : 'bg-white/10 hover:bg-white/20 hover:scale-105'
                        }`}
                      >
                        <span className="text-2xl">💻</span>
                        <div>
                          <div className={`font-bold ${
                            darkMode ? 'text-green-300' : 'text-cyan-300'
                          }`}>
                            GitHub
                          </div>
                          <div className="text-xs opacity-70">View my repositories</div>
                        </div>
                      </a>
                    )}
                    
                    {content.linkedin && (
                      <a
                        href={content.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                          darkMode
                            ? 'bg-gray-700 hover:bg-gray-600 hover:scale-105'
                            : 'bg-white/10 hover:bg-white/20 hover:scale-105'
                        }`}
                      >
                        <span className="text-2xl">💼</span>
                        <div>
                          <div className={`font-bold ${
                            darkMode ? 'text-green-300' : 'text-cyan-300'
                          }`}>
                            LinkedIn
                          </div>
                          <div className="text-xs opacity-70">Professional network</div>
                        </div>
                      </a>
                    )}
                    
                    {content.twitter && content.twitter !== 'N/A' && (
                      <a
                        href={content.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                          darkMode
                            ? 'bg-gray-700 hover:bg-gray-600 hover:scale-105'
                            : 'bg-white/10 hover:bg-white/20 hover:scale-105'
                        }`}
                      >
                        <span className="text-2xl">🐦</span>
                        <div>
                          <div className={`font-bold ${
                            darkMode ? 'text-green-300' : 'text-cyan-300'
                          }`}>
                            Twitter
                          </div>
                          <div className="text-xs opacity-70">Follow for updates</div>
                        </div>
                      </a>
                    )}
                    
                    {content.portfolio && content.portfolio !== 'N/A' && (
                      <a
                        href={content.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                          darkMode
                            ? 'bg-gray-700 hover:bg-gray-600 hover:scale-105'
                            : 'bg-white/10 hover:bg-white/20 hover:scale-105'
                        }`}
                      >
                        <span className="text-2xl">🌐</span>
                        <div>
                          <div className={`font-bold ${
                            darkMode ? 'text-green-300' : 'text-cyan-300'
                          }`}>
                            Portfolio
                          </div>
                          <div className="text-xs opacity-70">Visit my website</div>
                        </div>
                      </a>
                    )}
                    
                    {content.discord && content.discord !== 'N/A' && (
                      <div
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          darkMode ? 'bg-gray-700' : 'bg-white/10'
                        }`}
                      >
                        <span className="text-2xl">💬</span>
                        <div>
                          <div className={`font-bold ${
                            darkMode ? 'text-green-300' : 'text-cyan-300'
                          }`}>
                            Discord
                          </div>
                          <div className="text-xs opacity-70">{content.discord}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )

      case 'skills':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-mono text-sm leading-relaxed ${
              darkMode ? 'text-green-400' : 'text-cyber-cyan'
            }`}
          >
            <div className={`p-4 rounded-lg mb-4 ${
              darkMode ? 'bg-gray-800/50' : 'bg-white/10'
            }`}>
              <h3 className={`text-lg font-bold mb-4 ${
                darkMode ? 'text-red-400' : 'text-cyber-pink'
              }`}>
                💪 Skills & Expertise
              </h3>
              
              {content && (
                <div className="space-y-6">
                  {/* Languages */}
                  {content.languages && (
                    <div>
                      <h4 className={`font-bold mb-3 ${
                        darkMode ? 'text-violet-400' : 'text-cyan-400'
                      }`}>
                        Programming Languages
                      </h4>
                      <div className="space-y-2">
                        {content.languages.map((skill, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="flex items-center gap-2">
                                <span className="text-xl">{skill.icon}</span>
                                <span>{skill.name}</span>
                              </span>
                              <span className="text-xs opacity-70">{skill.level}%</span>
                            </div>
                            <div className={`w-full h-2 rounded-full overflow-hidden ${
                              darkMode ? 'bg-gray-700' : 'bg-gray-800/30'
                            }`}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: index * 0.05 }}
                                className={`h-full ${
                                  darkMode 
                                    ? 'bg-gradient-to-r from-red-500 to-violet-500' 
                                    : 'bg-gradient-to-r from-cyan-500 to-pink-500'
                                }`}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Frameworks */}
                  {content.frameworks && (
                    <div>
                      <h4 className={`font-bold mb-3 ${
                        darkMode ? 'text-violet-400' : 'text-cyan-400'
                      }`}>
                        Frameworks & Libraries
                      </h4>
                      <div className="space-y-2">
                        {content.frameworks.map((skill, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="flex items-center gap-2">
                                <span className="text-xl">{skill.icon}</span>
                                <span>{skill.name}</span>
                              </span>
                              <span className="text-xs opacity-70">{skill.level}%</span>
                            </div>
                            <div className={`w-full h-2 rounded-full overflow-hidden ${
                              darkMode ? 'bg-gray-700' : 'bg-gray-800/30'
                            }`}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
                                className={`h-full ${
                                  darkMode 
                                    ? 'bg-gradient-to-r from-red-500 to-violet-500' 
                                    : 'bg-gradient-to-r from-cyan-500 to-pink-500'
                                }`}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tools */}
                  {content.tools && (
                    <div>
                      <h4 className={`font-bold mb-3 ${
                        darkMode ? 'text-violet-400' : 'text-cyan-400'
                      }`}>
                        Tools & Technologies
                      </h4>
                      <div className="space-y-2">
                        {content.tools.map((skill, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.05 }}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="flex items-center gap-2">
                                <span className="text-xl">{skill.icon}</span>
                                <span>{skill.name}</span>
                              </span>
                              <span className="text-xs opacity-70">{skill.level}%</span>
                            </div>
                            <div className={`w-full h-2 rounded-full overflow-hidden ${
                              darkMode ? 'bg-gray-700' : 'bg-gray-800/30'
                            }`}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: 0.6 + index * 0.05 }}
                                className={`h-full ${
                                  darkMode 
                                    ? 'bg-gradient-to-r from-red-500 to-violet-500' 
                                    : 'bg-gradient-to-r from-cyan-500 to-pink-500'
                                }`}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Specialties */}
                  {content.specialties && (
                    <div>
                      <h4 className={`font-bold mb-3 ${
                        darkMode ? 'text-violet-400' : 'text-cyan-400'
                      }`}>
                        Specializations
                      </h4>
                      <div className="space-y-2">
                        {content.specialties.map((skill, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9 + index * 0.05 }}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="flex items-center gap-2">
                                <span className="text-xl">{skill.icon}</span>
                                <span>{skill.name}</span>
                              </span>
                              <span className="text-xs opacity-70">{skill.level}%</span>
                            </div>
                            <div className={`w-full h-2 rounded-full overflow-hidden ${
                              darkMode ? 'bg-gray-700' : 'bg-gray-800/30'
                            }`}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: 0.9 + index * 0.05 }}
                                className={`h-full ${
                                  darkMode 
                                    ? 'bg-gradient-to-r from-red-500 to-violet-500' 
                                    : 'bg-gradient-to-r from-cyan-500 to-pink-500'
                                }`}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )

      case 'analytics':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-mono text-sm leading-relaxed ${
              darkMode ? 'text-green-400' : 'text-cyber-cyan'
            }`}
          >
            <div className={`p-4 rounded-lg mb-4 ${
              darkMode ? 'bg-gray-800/50' : 'bg-white/10'
            }`}>
              <h3 className={`text-lg font-bold mb-4 ${
                darkMode ? 'text-red-400' : 'text-cyber-pink'
              }`}>
                📊 Portfolio Analytics & Metrics
              </h3>
              
              {content && (
                <div className="space-y-6">
                  {/* Portfolio Stats */}
                  {content.portfolio && (
                    <div>
                      <h4 className={`font-bold mb-3 flex items-center gap-2 ${
                        darkMode ? 'text-violet-400' : 'text-cyan-400'
                      }`}>
                        🌐 Portfolio Statistics
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className={`p-3 rounded ${
                          darkMode ? 'bg-gray-900/50' : 'bg-white/5'
                        }`}>
                          <div className="text-2xl font-bold">
                            {content.portfolio.totalVisitors.toLocaleString()}
                          </div>
                          <div className="text-xs opacity-70">Total Visitors</div>
                        </div>
                        <div className={`p-3 rounded ${
                          darkMode ? 'bg-gray-900/50' : 'bg-white/5'
                        }`}>
                          <div className="text-2xl font-bold">
                            {content.portfolio.uniqueVisitors.toLocaleString()}
                          </div>
                          <div className="text-xs opacity-70">Unique Visitors</div>
                        </div>
                        <div className={`p-3 rounded ${
                          darkMode ? 'bg-gray-900/50' : 'bg-white/5'
                        }`}>
                          <div className="text-2xl font-bold">
                            {content.portfolio.avgSessionDuration}
                          </div>
                          <div className="text-xs opacity-70">Avg. Session</div>
                        </div>
                        <div className={`p-3 rounded ${
                          darkMode ? 'bg-gray-900/50' : 'bg-white/5'
                        }`}>
                          <div className="text-2xl font-bold">
                            {content.portfolio.bounceRate}
                          </div>
                          <div className="text-xs opacity-70">Bounce Rate</div>
                        </div>
                      </div>
                      
                      {content.portfolio.topPages && (
                        <div className="mt-3">
                          <div className="text-xs opacity-70 mb-2">Top Pages:</div>
                          <div className="space-y-1">
                            {content.portfolio.topPages.map((page, index) => (
                              <div key={index} className="flex justify-between items-center text-xs">
                                <span>{page.page}</span>
                                <span className="opacity-70">{page.views.toLocaleString()} views</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* GitHub Stats */}
                  {content.github && (
                    <div>
                      <h4 className={`font-bold mb-3 flex items-center gap-2 ${
                        darkMode ? 'text-violet-400' : 'text-cyan-400'
                      }`}>
                        💻 GitHub Activity
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className={`p-3 rounded ${
                          darkMode ? 'bg-gray-900/50' : 'bg-white/5'
                        }`}>
                          <div className="text-2xl font-bold">
                            {content.github.totalRepos}
                          </div>
                          <div className="text-xs opacity-70">Repositories</div>
                        </div>
                        <div className={`p-3 rounded ${
                          darkMode ? 'bg-gray-900/50' : 'bg-white/5'
                        }`}>
                          <div className="text-2xl font-bold">
                            {content.github.totalStars.toLocaleString()}
                          </div>
                          <div className="text-xs opacity-70">Total Stars</div>
                        </div>
                        <div className={`p-3 rounded ${
                          darkMode ? 'bg-gray-900/50' : 'bg-white/5'
                        }`}>
                          <div className="text-2xl font-bold">
                            {content.github.totalCommits.toLocaleString()}
                          </div>
                          <div className="text-xs opacity-70">Total Commits</div>
                        </div>
                        <div className={`p-3 rounded ${
                          darkMode ? 'bg-gray-900/50' : 'bg-white/5'
                        }`}>
                          <div className="text-2xl font-bold">
                            {content.github.contributionStreak}
                          </div>
                          <div className="text-xs opacity-70">Streak</div>
                        </div>
                      </div>
                      
                      {content.github.topLanguages && (
                        <div className="mt-3">
                          <div className="text-xs opacity-70 mb-2">Language Distribution:</div>
                          <div className="space-y-1">
                            {content.github.topLanguages.map((lang, index) => (
                              <div key={index}>
                                <div className="flex justify-between items-center text-xs mb-1">
                                  <span>{lang.language}</span>
                                  <span className="opacity-70">{lang.percentage}%</span>
                                </div>
                                <div className={`w-full h-1.5 rounded-full overflow-hidden ${
                                  darkMode ? 'bg-gray-700' : 'bg-gray-800/30'
                                }`}>
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${lang.percentage}%` }}
                                    transition={{ duration: 1, delay: index * 0.1 }}
                                    className={`h-full ${
                                      darkMode 
                                        ? 'bg-gradient-to-r from-red-500 to-violet-500' 
                                        : 'bg-gradient-to-r from-cyan-500 to-pink-500'
                                    }`}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Project Stats */}
                  {content.projects && (
                    <div>
                      <h4 className={`font-bold mb-3 flex items-center gap-2 ${
                        darkMode ? 'text-violet-400' : 'text-cyan-400'
                      }`}>
                        🚀 Project Metrics
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className={`p-3 rounded ${
                          darkMode ? 'bg-gray-900/50' : 'bg-white/5'
                        }`}>
                          <div className="text-2xl font-bold">
                            {content.projects.totalProjects}
                          </div>
                          <div className="text-xs opacity-70">Total Projects</div>
                        </div>
                        <div className={`p-3 rounded ${
                          darkMode ? 'bg-gray-900/50' : 'bg-white/5'
                        }`}>
                          <div className="text-2xl font-bold">
                            {content.projects.activeProjects}
                          </div>
                          <div className="text-xs opacity-70">Active</div>
                        </div>
                        <div className={`p-3 rounded ${
                          darkMode ? 'bg-gray-900/50' : 'bg-white/5'
                        }`}>
                          <div className="text-2xl font-bold">
                            {content.projects.totalDownloads.toLocaleString()}
                          </div>
                          <div className="text-xs opacity-70">Downloads</div>
                        </div>
                        <div className={`p-3 rounded ${
                          darkMode ? 'bg-gray-900/50' : 'bg-white/5'
                        }`}>
                          <div className="text-2xl font-bold">
                            {content.projects.totalStars.toLocaleString()}
                          </div>
                          <div className="text-xs opacity-70">Stars</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Engagement Stats */}
                  {content.engagement && (
                    <div>
                      <h4 className={`font-bold mb-3 flex items-center gap-2 ${
                        darkMode ? 'text-violet-400' : 'text-cyan-400'
                      }`}>
                        🤝 Community Engagement
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className={`p-3 rounded ${
                          darkMode ? 'bg-gray-900/50' : 'bg-white/5'
                        }`}>
                          <div className="text-2xl font-bold">
                            {content.engagement.linkedinConnections.toLocaleString()}
                          </div>
                          <div className="text-xs opacity-70">LinkedIn</div>
                        </div>
                        <div className={`p-3 rounded ${
                          darkMode ? 'bg-gray-900/50' : 'bg-white/5'
                        }`}>
                          <div className="text-2xl font-bold">
                            {content.engagement.twitterFollowers.toLocaleString()}
                          </div>
                          <div className="text-xs opacity-70">Twitter</div>
                        </div>
                        <div className={`p-3 rounded ${
                          darkMode ? 'bg-gray-900/50' : 'bg-white/5'
                        }`}>
                          <div className="text-2xl font-bold">
                            {content.engagement.discordMembers}
                          </div>
                          <div className="text-xs opacity-70">Discord</div>
                        </div>
                        <div className={`p-3 rounded ${
                          darkMode ? 'bg-gray-900/50' : 'bg-white/5'
                        }`}>
                          <div className="text-2xl font-bold">
                            {content.engagement.emailSubscribers}
                          </div>
                          <div className="text-xs opacity-70">Subscribers</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  const renderDataItem = (item, dark) => {
    // Experience
    if (item.company) {
      return (
        <div>
          <div className="flex items-start justify-between mb-2">
            <h4 className={`font-bold text-base ${
              dark ? 'text-red-400' : 'text-cyber-cyan'
            }`}>{item.title}</h4>
            <span className={`text-xs ${
              dark ? 'text-violet-400' : 'text-cyber-violet'
            }`}>{item.duration}</span>
          </div>
          <p className={`text-sm mb-2 ${
            dark ? 'text-violet-400' : 'text-cyber-violet'
          }`}>{item.company}</p>
          <p className="text-gray-300 text-sm mb-3">{item.description}</p>
          <div className="flex flex-wrap gap-2">
            {item.technologies?.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded text-cyber-cyan text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )
    }

    // Education
    if (item.degree) {
      return (
        <div>
          <h4 className="text-cyber-cyan font-bold text-base mb-2">{item.degree}</h4>
          {item.institution && (
            <>
              <p className="text-cyber-violet text-sm">{item.institution}</p>
              <p className="text-gray-400 text-xs mb-2">{item.duration}</p>
              {item.gpa && <p className="text-gray-300 text-sm mb-2">GPA: {item.gpa}</p>}
              {item.focus && <p className="text-gray-300 text-sm mb-3">Focus: {item.focus}</p>}
              {item.achievements && (
                <ul className="space-y-1 mt-2">
                  {item.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-gray-300 text-sm flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
          {item.courses && (
            <div className="flex flex-wrap gap-2 mt-2">
              {item.courses.map((course, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-cyber-violet/10 border border-cyber-violet/30 rounded text-cyber-violet text-xs"
                >
                  {course}
                </span>
              ))}
            </div>
          )}
        </div>
      )
    }

    // Affiliations
    if (item.role && item.name) {
      return (
        <div>
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-cyber-cyan font-bold text-base">{item.name}</h4>
            <span className="text-cyber-violet text-xs">{item.duration}</span>
          </div>
          <p className="text-cyber-violet text-sm mb-2">{item.role}</p>
          <p className="text-gray-300 text-sm">{item.description}</p>
        </div>
      )
    }

    // Projects
    if (item.tagline) {
      return (
        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="text-cyber-cyan font-bold text-lg">{item.name}</h4>
              <p className="text-cyber-violet text-sm italic">{item.tagline}</p>
            </div>
            <div className="flex space-x-2">
              <span className={`px-2 py-1 rounded text-xs ${
                item.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400 border border-green-400/30' :
                item.status === 'BETA' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30' :
                'bg-blue-500/20 text-blue-400 border border-blue-400/30'
              }`}>
                {item.status}
              </span>
            </div>
          </div>
          <p className="text-gray-300 text-sm mb-3">{item.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {item.technologies?.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded text-cyber-cyan text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-cyber-violet hover:text-cyber-cyan transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>View on GitHub</span>
            </a>
          )}
        </div>
      )
    }

    return null
  }

  const renderPromptItem = (item) => {
    return (
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold text-lg">
                {item.name}
              </h4>
              <span className="text-xl">{item.mood?.split(' ')[0]}</span>
            </div>
            <p className="text-purple-300 text-sm italic mb-2">{item.prompt}</p>
          </div>
          <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/40 rounded-full text-purple-300 text-xs whitespace-nowrap">
            {item.mood}
          </span>
        </div>
        
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">{item.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {item.builtWith?.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded text-purple-300 text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        {item.github && (
          <a
            href={item.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-purple-400 hover:text-pink-400 transition-colors text-sm group"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="group-hover:underline">See prompt projects →</span>
          </a>
        )}
      </div>
    )
  }

  return renderContent()
}

export default Message
