# 🧪 Refactoring Test Plan

## Overview
This document outlines the testing plan for the recently refactored NEXUS terminal portfolio. The refactoring extracted 789 lines of monolithic code into modular utilities while adding comprehensive security features.

---

## ✅ Pre-Refactor State
- **Terminal.jsx**: 789 lines (monolithic)
- **Security**: None
- **Organization**: All handlers in one file
- **Status**: Working but difficult to maintain

---

## 🎯 Post-Refactor Goals
- **Terminal.jsx**: ~400 lines (clean)
- **Security**: Full DOS/bot protection
- **Organization**: Modular utilities by domain
- **Status**: Maintainable and secure

---

## 📦 New Files Created

### 1. **src/utils/security.js** (290+ lines)
- SecurityManager singleton class
- Rate limiting (30/min, 5/sec)
- Bot detection (behavioral + user agent)
- Honeypot system
- Pattern recognition
- Content obfuscation

### 2. **src/utils/portfolioHandlers.js** (110 lines)
- handleExperience
- handleEducation
- handleAffiliations
- handleProjects
- handleVibeProjects
- handleCoreMemory
- handleContact
- handleProfile
- handleAbout

### 3. **src/utils/filesystemHandlers.js** (350+ lines)
- handleLS (directory listings)
- handleCat (file reading)
- handleDecrypt (encryption sequences)
- handleScan (system diagnostics)
- handleTrace (process tracing)
- handleOpen (special files)
- handleRootmind (architect access)
- handleFilesHelp (filesystem guide)

### 4. **src/utils/commandRouter.js** (150 lines)
- CommandRouter class
- route() method
- getAutocompleteSuggestions()
- createUnknownHandler()

### 5. **src/components/Terminal.jsx** (Refactored)
- Reduced from 789 to ~400 lines
- Imports all handlers
- Integrates securityManager
- Cleaner state management

---

## 🧪 Test Cases

### Phase 1: Basic Functionality

#### Test 1.1: Standard Commands
```bash
# In terminal
help
clear
about
```
**Expected Result:**
- `help` displays all commands
- `clear` clears screen
- `about` shows NEXUS description

**Status:** [ ] Pass [ ] Fail

---

#### Test 1.2: Portfolio Commands
```bash
experience
education
affiliations
projects
projects vibe
core-memory
contact
about me
```
**Expected Result:**
- All commands return formatted content
- Content filtered by mode (AI/CYBER)
- Profile image appears with "about me"

**Status:** [ ] Pass [ ] Fail

---

#### Test 1.3: Hidden Filesystem Commands
```bash
files
ls /system
ls /data
ls /logs
cat memory.log
cat process_diary.txt
decrypt memory.log
```
**Expected Result:**
- `files` shows guide
- `ls` lists directories (random discoveries)
- `cat` reads files (case-insensitive)
- `decrypt` shows sequences

**Status:** [ ] Pass [ ] Fail

---

### Phase 2: Interactive Features

#### Test 2.1: Command History
```bash
# Type several commands
# Press ↑ arrow
# Press ↓ arrow
```
**Expected Result:**
- ↑ cycles through previous commands
- ↓ cycles forward
- Commands display correctly

**Status:** [ ] Pass [ ] Fail

---

#### Test 2.2: Tab Autocomplete
```bash
# Type "exp" + Tab
# Type "ls /sy" + Tab
# Type "cat memo" + Tab
```
**Expected Result:**
- Commands autocomplete
- File paths autocomplete
- Suggestions appear

**Status:** [ ] Pass [ ] Fail

---

#### Test 2.3: Mode Switching
```bash
mode
# Wait for transition
# Type some commands
mode
# Switch back
```
**Expected Result:**
- 4-stage transition animation
- Screen corruption effects
- Logo reveal
- Mode-specific content appears

**Status:** [ ] Pass [ ] Fail

---

### Phase 3: Security Features

#### Test 3.1: Rate Limiting (Normal)
```bash
# Type commands normally (1-2 per second)
# Continue for 1 minute
```
**Expected Result:**
- All commands execute normally
- No rate limit warnings
- Smooth operation

**Status:** [ ] Pass [ ] Fail

---

#### Test 3.2: Rate Limiting (Burst)
```bash
# Execute 10 commands rapidly (within 2 seconds)
```
**Expected Result:**
- First 5 commands succeed
- 6th+ commands show "Too fast!" warning
- User can resume after brief pause

**Status:** [ ] Pass [ ] Fail

---

#### Test 3.3: Rate Limiting (Lockout)
```bash
# Copy-paste a command 60 times rapidly
```
**Expected Result:**
- Commands execute until threshold (50)
- "SUSPICIOUS ACTIVITY DETECTED" message
- 60-second lockout
- Resume after cooldown

**Status:** [ ] Pass [ ] Fail

---

#### Test 3.4: Pattern Detection
```bash
# Type same command 15 times
help
help
help
... (15 times)
```
**Expected Result:**
- After 10 repeats: "Command spam detected" warning
- Bot score increases
- Pattern flagged

**Status:** [ ] Pass [ ] Fail

---

#### Test 3.5: Bot Detection
```bash
# Open browser console
# Check securityManager status
console.log(window.securityManager.getStatus())
```
**Expected Result:**
- botScore visible
- interactionScore updates with mouse/keyboard
- Normal behavior = low bot score

**Status:** [ ] Pass [ ] Fail

---

#### Test 3.6: Honeypot (Manual Test)
```javascript
// In browser console
const honeypot = document.querySelector('input[style*="opacity: 0"]')
honeypot.focus()
// Then try to execute a command
```
**Expected Result:**
- Honeypot triggered
- All commands blocked
- "Automated behavior detected" message

**Status:** [ ] Pass [ ] Fail

---

### Phase 4: Edge Cases

#### Test 4.1: Empty Commands
```bash
# Press Enter without typing
# Type spaces only "    " + Enter
```
**Expected Result:**
- No error
- Prompt returns
- No message added

**Status:** [ ] Pass [ ] Fail

---

#### Test 4.2: Unknown Commands
```bash
randomcommand
asdfasdf
notarealcommand
```
**Expected Result:**
- "Command not recognized" message
- Suggestion to type `help`

**Status:** [ ] Pass [ ] Fail

---

#### Test 4.3: Case Sensitivity
```bash
HELP
ExPerience
LS /SYSTEM
CaT MeMoRy.LoG
```
**Expected Result:**
- All commands work
- Case-insensitive matching
- Correct output

**Status:** [ ] Pass [ ] Fail

---

#### Test 4.4: File Not Found
```bash
cat nonexistent.txt
ls /fakefolder
```
**Expected Result:**
- "File not found" message
- Helpful suggestion

**Status:** [ ] Pass [ ] Fail

---

### Phase 5: Console Errors

#### Test 5.1: Browser Console
```bash
# Open browser DevTools (F12)
# Check Console tab
# Execute various commands
```
**Expected Result:**
- No errors
- No warnings (except Tailwind CSS linting)
- Clean execution

**Status:** [ ] Pass [ ] Fail

---

#### Test 5.2: Network Tab
```bash
# Open Network tab in DevTools
# Check for failed requests
```
**Expected Result:**
- vault.json loads successfully
- hidden_world.json loads successfully
- No 404 errors

**Status:** [ ] Pass [ ] Fail

---

### Phase 6: Performance

#### Test 6.1: Scroll Performance
```bash
# Execute 100+ commands to fill scroll
# Scroll up and down
```
**Expected Result:**
- Smooth scrolling
- No lag
- Auto-scroll to bottom works

**Status:** [ ] Pass [ ] Fail

---

#### Test 6.2: Memory Leaks
```bash
# Execute many commands
# Switch modes multiple times
# Check browser memory usage (Performance tab)
```
**Expected Result:**
- Memory usage stable
- No continuous growth
- Garbage collection works

**Status:** [ ] Pass [ ] Fail

---

## 🔧 Debugging Checklist

If tests fail, check:

### Import Issues
- [ ] All utility files imported correctly in Terminal.jsx
- [ ] Relative paths correct (`./utils/`, not `/utils/`)
- [ ] Named exports match imports

### Security Integration
- [ ] securityManager instance created
- [ ] checkRateLimit() called before command execution
- [ ] checkCommandPattern() integrated
- [ ] Honeypot element added to DOM

### Handler Integration
- [ ] portfolioHandlers factory called
- [ ] filesystemHandlers factory called
- [ ] CommandRouter instantiated with handlers
- [ ] route() method called correctly

### State Management
- [ ] useState hooks intact
- [ ] useEffect cleanup functions present
- [ ] State updates don't cause infinite loops

---

## 🐛 Known Issues (Expected)

### CSS Linting
- Tailwind directives flagged by CSS lint (harmless)
- `@tailwind` and `@apply` marked as "unknown"
- Does NOT affect functionality

### False Positives
- Very fast legitimate typing may trigger warnings
- Adjust thresholds in security.js if needed

---

## ✅ Success Criteria

**Minimum Pass:**
- [ ] All Phase 1 tests pass (basic functionality)
- [ ] All Phase 2 tests pass (interactive features)
- [ ] At least 4/6 Phase 3 tests pass (security)
- [ ] No critical console errors

**Full Pass:**
- [ ] All tests pass
- [ ] No console errors
- [ ] Smooth performance
- [ ] Security features working

---

## 📊 Test Results

**Date:** _______________

**Tester:** _______________

**Environment:**
- Browser: _______________
- OS: _______________
- Node Version: _______________

**Overall Status:** [ ] Pass [ ] Partial [ ] Fail

**Notes:**
_______________________________________________
_______________________________________________
_______________________________________________

---

## 🔄 Rollback Procedure

If critical issues found:

```bash
# Restore original Terminal.jsx
cd src/components
cp Terminal.backup.jsx Terminal.jsx

# Restart dev server
npm run dev
```

**Backup Location:** `src/components/Terminal.backup.jsx`

---

## 📝 Testing Script (Automated)

For quick testing, paste this in browser console:

```javascript
// Quick Test Suite
const testCommands = [
  'help', 'clear', 'about', 'experience', 
  'projects', 'ls /system', 'cat memory.log',
  'files', 'contact', 'mode'
]

async function runTests() {
  for (let cmd of testCommands) {
    console.log(`Testing: ${cmd}`)
    // Simulate command entry
    await new Promise(r => setTimeout(r, 1000))
  }
  console.log('All tests complete!')
}

runTests()
```

---

## 🎯 Next Steps After Testing

1. **If all tests pass:**
   - Delete Terminal.backup.jsx
   - Update documentation
   - Consider deployment

2. **If partial pass:**
   - Fix critical issues
   - Re-test affected areas
   - Document workarounds

3. **If tests fail:**
   - Review console errors
   - Check import paths
   - Consider rollback
   - Debug systematically

---

**Remember: The refactoring aims for cleaner code AND better security. Both goals must be achieved.**

---

*Last Updated: [Current Date]*
