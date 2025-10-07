# 🔐 Security Features Documentation

## Overview

This NEXUS portfolio terminal includes comprehensive security measures to protect against automated scrapers, DOS attacks, and bot abuse while maintaining a smooth experience for legitimate users.

---

## 🛡️ Security Features

### 1. **Rate Limiting**

Prevents abuse by limiting command execution frequency:

- **30 commands per minute** - Normal operation limit
- **5 commands per second** - Prevents rapid-fire spam
- **50 commands per minute** - Suspicious activity threshold (triggers lockout)
- **60-second lockout** - Automatic temporary ban for suspicious behavior

**User Experience:**
- Legitimate users rarely hit these limits
- Clear error messages explain rate limits
- Automatic cooldown and reset

---

### 2. **Bot Detection**

Multi-layered approach to identify automated tools:

#### **Behavioral Analysis:**
- Tracks mouse movements
- Monitors keyboard inputs
- Calculates interaction score
- Detects lack of human-like behavior

#### **User Agent Detection:**
- Identifies known bot patterns (curl, wget, scrapers)
- Flags headless browsers
- Detects automation tools

#### **Bot Score System:**
- Score increases with suspicious behavior
- Score decreases with normal interaction
- High score (>50) triggers lockout

---

### 3. **Command Pattern Detection**

Prevents spam and repetitive abuse:

- Tracks command frequency patterns
- Detects same command repeated >10 times in 30 seconds
- Increases bot score for pattern violations
- Provides helpful messages to guide behavior

---

### 4. **Honeypot System**

Hidden trap for scrapers:

- Invisible input field added to DOM
- Positioned off-screen with CSS
- Any interaction triggers immediate flag
- Marks session as bot/scraper
- Prevents further access

**Implementation:**
```javascript
// Automatically injected on mount
const honeypot = document.createElement('input')
honeypot.style.position = 'absolute'
honeypot.style.opacity = '0'
honeypot.addEventListener('focus', () => {
  securityManager.triggerHoneypot()
})
```

---

### 5. **Content Obfuscation**

Protects content from simple text scrapers:

- Inserts zero-width Unicode characters
- Breaks automated text extraction
- Invisible to human readers
- Disrupts pattern matching

**Example:**
```javascript
// Before: "Hello World"
// After: "Hel​lo Wo​rld" (contains invisible characters)
```

---

### 6. **Session Tracking**

Monitors user session for anomalies:

- Tracks session duration
- Records interaction patterns
- Analyzes command history
- Detects automated behavior

---

## 📊 Security Manager API

### Methods

#### `checkRateLimit()`
```javascript
const result = securityManager.checkRateLimit()
// Returns: { allowed: boolean, reason: string }
```

#### `checkCommandPattern(command)`
```javascript
const result = securityManager.checkCommandPattern('help')
// Returns: { allowed: boolean, reason: string }
```

#### `triggerHoneypot()`
```javascript
securityManager.triggerHoneypot()
// Marks session as bot - blocks all future commands
```

#### `getStatus()`
```javascript
const status = securityManager.getStatus()
// Returns: {
//   commandsPerMinute: number,
//   botScore: number,
//   isLockedOut: boolean,
//   honeypotTriggered: boolean,
//   interactionScore: number
// }
```

#### `reset()`
```javascript
securityManager.reset()
// Admin override - clears all security flags
```

---

## 🎯 Configuration

All security thresholds can be adjusted in `src/utils/security.js`:

```javascript
{
  maxCommandsPerMinute: 30,      // Normal rate limit
  maxCommandsPerSecond: 5,       // Burst prevention
  suspiciousThreshold: 50,       // Lockout trigger
  lockoutDuration: 60000,        // 1 minute (in ms)
}
```

---

## ⚠️ Error Messages

Users see friendly, informative messages:

### Rate Limit Exceeded:
```
⚠️ Rate limit: Maximum 30 commands per minute.

For security purposes, this terminal implements rate limiting to prevent abuse.
```

### Too Fast:
```
⚠️ Too fast! Please wait a moment between commands.
```

### Suspicious Activity:
```
⚠️ SUSPICIOUS ACTIVITY DETECTED. System temporarily locked.

For security purposes, this terminal implements rate limiting to prevent abuse.
```

### Pattern Spam:
```
⚠️ Command spam detected. Please vary your interactions.
```

### Bot Detected:
```
⚠️ Automated behavior detected. Please interact naturally.
```

---

## 🧪 Testing Security

### Test Rate Limiting:
```bash
# Run this command rapidly in browser console
for(let i=0; i<35; i++) {
  // Try to execute command
}
// Should trigger rate limit after 30 commands
```

### Test Pattern Detection:
```bash
# Type the same command 15 times quickly
help
help
help
... (15 times)
// Should trigger pattern warning
```

### Check Security Status:
```javascript
// In browser console
import { securityManager } from './src/utils/security'
console.log(securityManager.getStatus())
```

---

## 🔒 Best Practices

### For Users:
1. **Interact naturally** - Normal typing and mouse movement
2. **Don't spam commands** - Wait for responses
3. **Vary commands** - Explore different features
4. **Use Tab autocomplete** - Efficient and human-like

### For Developers:
1. **Monitor false positives** - Adjust thresholds if needed
2. **Log security events** - Track bot attempts
3. **Update bot patterns** - Keep detection current
4. **Test with real users** - Ensure legitimate users aren't blocked

---

## 📈 Metrics to Monitor

1. **Lockout Rate** - How often users hit limits
2. **Bot Score Distribution** - Average scores of sessions
3. **Honeypot Triggers** - Number of bot detections
4. **False Positives** - Legitimate users flagged

---

## 🚀 Future Enhancements

Potential additions:

1. **CAPTCHA Integration** - For high bot scores
2. **IP-based Rate Limiting** - Server-side tracking
3. **Machine Learning** - Adaptive bot detection
4. **Whitelist System** - Trusted user bypass
5. **Analytics Dashboard** - Real-time security metrics

---

## 🐛 Troubleshooting

### "I keep getting rate limited!"
- You're typing too fast
- Wait 60 seconds for cooldown
- Vary your commands
- Refresh page to reset

### "Automated behavior detected" but I'm human!
- Move your mouse while typing
- Don't copy-paste commands rapidly
- Interact with the page naturally
- Clear browser cache

### Admin Override:
```javascript
// Emergency reset (developer console)
securityManager.reset()
```

---

## 📝 Implementation Details

### File Structure:
```
src/
├── utils/
│   ├── security.js              ← Main security manager
│   ├── commandRouter.js         ← Integrates security checks
│   └── portfolioHandlers.js     ← Clean handler separation
└── components/
    └── Terminal.jsx             ← Uses security manager
```

### Integration Points:
1. **Terminal.jsx** - Calls security checks before command execution
2. **CommandRouter** - Routes commands after security approval
3. **Handlers** - Process approved commands only

---

## ✅ Security Checklist

- [x] Rate limiting implemented
- [x] Bot detection active
- [x] Pattern recognition working
- [x] Honeypot deployed
- [x] Content obfuscation enabled
- [x] Session tracking active
- [x] Clear error messages
- [x] User-friendly experience
- [x] Admin override available
- [x] Documented and tested

---

**Security is a balance between protection and usability. This system errs on the side of user experience while maintaining robust protection against automated abuse.**

---

*Last Updated: October 6, 2025*
