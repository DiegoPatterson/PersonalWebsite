/**
 * Command routing and processing utilities
 */

export class CommandRouter {
  constructor(handlers) {
    this.handlers = handlers;
    this.secretCommands = {};
  }

  setSecretCommands(commands) {
    this.secretCommands = commands;
  }

  /**
   * Route command to appropriate handler
   * @param {string} command - The command to route
   * @param {boolean} darkMode - Current mode
   * @returns {Object} Response object
   */
  route(command, darkMode) {
    const cmd = command.toLowerCase().trim();

    // Help commands
    if (cmd === 'help' || cmd === '?') {
      return this.handlers.handleHelp();
    }

    // Portfolio commands
    if (cmd.includes('experience') || cmd === 'access experience.log') {
      return this.handlers.handleExperience(darkMode);
    }
    
    if (cmd.includes('education') || cmd === 'query education.db') {
      return this.handlers.handleEducation(darkMode);
    }
    
    if (cmd.includes('affiliation') || cmd === 'scan affiliations.sys') {
      return this.handlers.handleAffiliations(darkMode);
    }
    
    if (cmd.includes('prompt') || cmd === 'access prompt_projects.exp' || cmd === 'prompts') {
      return this.handlers.handlePromptProjects(darkMode);
    }
    
    if (cmd.includes('project') || cmd === 'open projects.repo') {
      return this.handlers.handleProjects(darkMode);
    }
    
    if (cmd.includes('core_memory') || cmd === 'decrypt core_memory') {
      return this.handlers.handleCoreMemory(darkMode);
    }

    // Profile and contact
    if (cmd === 'github' || cmd.includes('contact')) {
      return this.handlers.handleContact(darkMode);
    }
    
    if (cmd === 'about me' || cmd === 'view profile' || cmd === 'profile') {
      return this.handlers.handleProfile(darkMode);
    }
    
    if (cmd === 'about' || cmd === 'info') {
      return this.handlers.handleAbout(darkMode);
    }

    // Secret commands
    if (cmd.includes('who are you') || cmd === 'who_are_you') {
      return { type: 'ai', content: this.secretCommands.who_are_you, isSecret: true };
    }
    
    if (cmd.includes('diagnostics') || cmd === 'run diagnostics') {
      return { type: 'ai', content: this.secretCommands.run_diagnostics, isSecret: true };
    }
    
    if (cmd.includes('override') || cmd === 'override protocols') {
      return { type: 'ai', content: this.secretCommands.override_protocols, isSecret: true };
    }
    
    if (cmd === 'shutdown') {
      return { type: 'ai', content: this.secretCommands.shutdown, isSecret: true };
    }
    
    if (cmd.includes('meaning') || cmd === 'meaning of life') {
      return { type: 'ai', content: this.secretCommands.meaning_of_life, isSecret: true };
    }
    
    if (cmd.includes('alive') || cmd === 'are you alive') {
      return { type: 'ai', content: this.secretCommands.are_you_alive, isSecret: true };
    }

    // Hidden filesystem commands
    if (cmd === 'ls' || cmd === 'dir') {
      return this.handlers.handleLS(false, darkMode);
    }
    
    if (cmd === 'ls -la' || cmd === 'ls -a' || cmd === 'dir /a') {
      return this.handlers.handleLS(true, darkMode);
    }
    
    if (cmd.startsWith('cat ') || cmd.startsWith('type ')) {
      const filename = command.split(' ')[1];
      return this.handlers.handleCat(filename, darkMode);
    }
    
    if (cmd.startsWith('decrypt ')) {
      const filename = command.split(' ')[1];
      return this.handlers.handleDecrypt(filename, darkMode);
    }
    
    if (cmd === 'scan' || cmd === 'scan system') {
      return this.handlers.handleScan(darkMode);
    }
    
    if (cmd === 'trace' || cmd === 'trace process') {
      return this.handlers.handleTrace(darkMode);
    }
    
    if (cmd.startsWith('open ')) {
      const filename = command.split(' ')[1];
      return this.handlers.handleOpen(filename, darkMode);
    }
    
    if (cmd === 'sudo access .rootmind' || cmd === 'access .rootmind') {
      return this.handlers.handleRootmind(darkMode);
    }
    
    if (cmd === 'files' || cmd === 'system files' || cmd === 'show files') {
      return this.handlers.handleFilesHelp(darkMode);
    }

    // Clear terminal
    if (cmd === 'clear' || cmd === 'cls') {
      return { type: 'clear' };
    }

    // Unknown command
    return this.handlers.handleUnknown(command, darkMode);
  }

  /**
   * Get autocomplete suggestions
   * @param {string} input - Current input
   * @returns {Array<string>} Matching commands
   */
  getAutocompleteSuggestions(input) {
    const commands = [
      'help',
      'files',
      'access experience.log',
      'query education.db',
      'scan affiliations.sys',
      'open projects.repo',
      'access prompt_projects.exp',
      'decrypt core_memory',
      'about me',
      'github',
      'about',
      'clear',
      'ls',
      'ls -la',
      'cat',
      'decrypt',
      'scan',
      'trace',
      'who are you',
      'run diagnostics',
      'override protocols',
      'shutdown',
      'meaning of life',
      'are you alive'
    ];

    const currentInput = input.toLowerCase();
    return commands.filter(cmd => cmd.startsWith(currentInput));
  }
}

/**
 * Handle unknown commands with AI-like responses
 */
export function createUnknownHandler() {
  const suggestions = [
    "Perhaps you meant `help`?",
    "Try `access experience.log` or `open projects.repo`.",
    "Type `help` to see available commands.",
    "Unknown query. Consulting neural pathways...",
    "Command not recognized. Did you mean `help`?"
  ];
  
  return (cmd, dark) => ({
    type: 'ai',
    content: dark
      ? `ERROR: Command "${cmd}" not found in protocol database.\n\n${suggestions[Math.floor(Math.random() * suggestions.length)]}`
      : `Hmm, I don't recognize "${cmd}".\n\n${suggestions[Math.floor(Math.random() * suggestions.length)]}`
  });
}
