/**
 * Security utilities for DOS protection and bot detection
 */

class SecurityManager {
  constructor() {
    // Rate limiting configuration
    this.commandHistory = [];
    this.maxCommandsPerMinute = 30;
    this.maxCommandsPerSecond = 5;
    this.suspiciousThreshold = 50; // Commands per minute that trigger lockout
    this.lockoutDuration = 60000; // 1 minute lockout
    this.isLockedOut = false;
    this.lockoutUntil = null;
    
    // Bot detection
    this.mouseMovements = 0;
    this.keyboardInputs = 0;
    this.botScore = 0;
    
    // Honeypot for scrapers
    this.honeypotTriggered = false;
    
    // Session tracking
    this.sessionStart = Date.now();
    this.commandPatterns = new Map();
    
    this.initListeners();
  }

  initListeners() {
    // Track human-like behavior
    if (typeof document !== 'undefined') {
      document.addEventListener('mousemove', () => {
        this.mouseMovements++;
        if (this.botScore > 0) this.botScore = Math.max(0, this.botScore - 1);
      }, { passive: true });

      document.addEventListener('keydown', () => {
        this.keyboardInputs++;
        if (this.botScore > 0) this.botScore = Math.max(0, this.botScore - 1);
      }, { passive: true });
    }
  }

  /**
   * Check if a command should be allowed
   * @returns {Object} { allowed: boolean, reason: string }
   */
  checkRateLimit() {
    const now = Date.now();

    // Check if currently locked out
    if (this.isLockedOut) {
      if (now < this.lockoutUntil) {
        const remainingSeconds = Math.ceil((this.lockoutUntil - now) / 1000);
        return {
          allowed: false,
          reason: `RATE LIMIT EXCEEDED. System locked for ${remainingSeconds}s.`
        };
      } else {
        // Lockout expired, reset
        this.isLockedOut = false;
        this.lockoutUntil = null;
        this.commandHistory = [];
      }
    }

    // Check honeypot
    if (this.honeypotTriggered) {
      return {
        allowed: false,
        reason: 'SECURITY VIOLATION DETECTED.'
      };
    }

    // Remove commands older than 1 minute
    this.commandHistory = this.commandHistory.filter(
      time => now - time < 60000
    );

    // Check commands per minute
    if (this.commandHistory.length >= this.suspiciousThreshold) {
      this.isLockedOut = true;
      this.lockoutUntil = now + this.lockoutDuration;
      this.botScore += 50;
      return {
        allowed: false,
        reason: 'SUSPICIOUS ACTIVITY DETECTED. System temporarily locked.'
      };
    }

    if (this.commandHistory.length >= this.maxCommandsPerMinute) {
      this.botScore += 10;
      return {
        allowed: false,
        reason: 'Rate limit: Maximum 30 commands per minute.'
      };
    }

    // Check commands in last second
    const lastSecondCommands = this.commandHistory.filter(
      time => now - time < 1000
    );

    if (lastSecondCommands.length >= this.maxCommandsPerSecond) {
      this.botScore += 5;
      return {
        allowed: false,
        reason: 'Too fast! Please wait a moment between commands.'
      };
    }

    // Bot detection based on lack of interaction
    const sessionDuration = (now - this.sessionStart) / 1000; // in seconds
    if (sessionDuration > 10) {
      const interactionScore = this.mouseMovements + this.keyboardInputs;
      if (interactionScore === 0 && this.commandHistory.length > 5) {
        this.botScore += 20;
      }
    }

    // High bot score triggers warning
    if (this.botScore > 50) {
      return {
        allowed: false,
        reason: 'Automated behavior detected. Please interact naturally.'
      };
    }

    // All checks passed
    this.commandHistory.push(now);
    return { allowed: true };
  }

  /**
   * Detect command pattern abuse (same command repeated)
   */
  checkCommandPattern(command) {
    const count = this.commandPatterns.get(command) || 0;
    this.commandPatterns.set(command, count + 1);

    // Reset pattern counts after 30 seconds
    setTimeout(() => {
      const current = this.commandPatterns.get(command) || 0;
      this.commandPatterns.set(command, Math.max(0, current - 1));
    }, 30000);

    // Same command repeated more than 10 times in 30 seconds
    if (count > 10) {
      this.botScore += 15;
      return {
        allowed: false,
        reason: 'Command spam detected. Please vary your interactions.'
      };
    }

    return { allowed: true };
  }

  /**
   * Trigger honeypot (called when hidden elements are interacted with)
   */
  triggerHoneypot() {
    this.honeypotTriggered = true;
    this.botScore = 100;
    console.warn('Honeypot triggered - scraper detected');
  }

  /**
   * Get current security status
   */
  getStatus() {
    return {
      commandsPerMinute: this.commandHistory.length,
      botScore: this.botScore,
      isLockedOut: this.isLockedOut,
      honeypotTriggered: this.honeypotTriggered,
      interactionScore: this.mouseMovements + this.keyboardInputs
    };
  }

  /**
   * Reset security state (for admin override)
   */
  reset() {
    this.commandHistory = [];
    this.botScore = 0;
    this.isLockedOut = false;
    this.lockoutUntil = null;
    this.honeypotTriggered = false;
    this.commandPatterns.clear();
  }
}

// Singleton instance
export const securityManager = new SecurityManager();

/**
 * Obfuscate sensitive content from scrapers
 */
export function obfuscateContent(text) {
  // Add zero-width characters to break simple text scrapers
  if (typeof text !== 'string') return text;
  
  // Don't obfuscate short strings
  if (text.length < 20) return text;
  
  // Randomly insert zero-width spaces (invisible)
  const chars = text.split('');
  const zeroWidthSpace = '\u200B';
  
  for (let i = chars.length - 1; i > 0; i -= 5) {
    if (Math.random() > 0.7) {
      chars.splice(i, 0, zeroWidthSpace);
    }
  }
  
  return chars.join('');
}

/**
 * Detect if user agent is a known bot/scraper
 */
export function detectBot() {
  if (typeof navigator === 'undefined') return false;
  
  const botPatterns = [
    /bot/i,
    /spider/i,
    /crawl/i,
    /scrape/i,
    /curl/i,
    /wget/i,
    /python/i,
    /java(?!script)/i,
    /http/i
  ];
  
  const userAgent = navigator.userAgent;
  return botPatterns.some(pattern => pattern.test(userAgent));
}

/**
 * Check if headless browser (common for scrapers)
 */
export function detectHeadless() {
  if (typeof navigator === 'undefined') return false;
  
  // Check for common headless indicators
  const checks = [
    () => !navigator.webdriver === false,
    () => navigator.plugins.length === 0,
    () => !navigator.languages || navigator.languages.length === 0,
    () => /HeadlessChrome/.test(navigator.userAgent),
    () => window.outerWidth === 0 || window.outerHeight === 0
  ];
  
  return checks.filter(check => {
    try {
      return check();
    } catch {
      return false;
    }
  }).length >= 2;
}

export default securityManager;
