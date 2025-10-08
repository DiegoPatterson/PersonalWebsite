# Tab Completion Guide

Your terminal now features intelligent tab completion to make navigation and command entry faster and more intuitive.

## 🎯 Overview

Press **Tab** at any time to:
- Autocomplete commands
- Autocomplete file names
- Autocomplete directory paths
- See available options when multiple matches exist

---

## 📝 Basic Tab Completion

### Empty Input
Press Tab with no input to see available commands:
```bash
> [Press Tab]
Available commands: help, ls, cd, pwd, cat, decrypt, open, scan, trace, files, clear
Press Tab to autocomplete commands and paths
```

### Partial Command
Start typing and press Tab to complete:
```bash
> l[Tab]          → ls
> c[Tab]          → Shows: cat, cd, clear, cls, contact
> de[Tab]         → decrypt
> ls -[Tab]       → ls -la
```

### Exact Match
When only one match exists, Tab completes immediately:
```bash
> pw[Tab]         → pwd
> tr[Tab]         → trace
> ana[Tab]        → analytics
```

---

## 📁 Directory Completion (cd command)

### Absolute Paths
```bash
> cd /[Tab]
Available directories:
  /
  /.architect
  /.traces
  /.void
  /.rootmind
  /opt
  /echoes

> cd /.a[Tab]     → cd /.architect
> cd /.t[Tab]     → cd /.traces
```

### Relative Paths
```bash
# In root directory
> cd .[Tab]
Available directories:
  ..
  ~
  /
  .architect
  .traces
  .void

# Subdirectories
> cd opt/[Tab]
Available directories:
  opt/logs
  opt/surveillance
```

### Special Shortcuts
```bash
> cd ..[Tab]      → cd ..      (parent directory)
> cd ~[Tab]       → cd ~       (home/root)
> cd /[Tab]       → cd /       (root)
```

---

## 📄 File Completion (cat, decrypt, open, scan, trace)

### Basic File Completion
```bash
# In /.architect directory
> cat [Tab]
Available files:
  README.md
  blueprint_alpha.txt
  genesis_protocol.txt
  warning.txt

> cat b[Tab]      → cat blueprint_alpha.txt
> cat R[Tab]      → cat README.md
```

### Command-Specific Files
```bash
# Encrypted files work with decrypt
> decrypt [Tab]
Available files:
  .system_override
  consciousness.enc
  echo_chamber.dat

> decrypt c[Tab]  → decrypt consciousness.enc
```

### Hidden Files
Files starting with `.` are shown:
```bash
> cat .[Tab]
Available files:
  .system_override
  .hidden_log
  .memory_fragment
```

---

## 🧠 Smart Context Awareness

### Command Detection
Tab completion knows which command you're using:

**For `cd`:** Only shows directories
```bash
> cd [Tab]    → Shows only directories
```

**For `cat`:** Shows readable files
```bash
> cat [Tab]   → Shows files in current directory
```

**For `decrypt`:** Shows encrypted files
```bash
> decrypt [Tab]   → Shows .enc, .dat, .sys files
```

### Current Directory Awareness
Tab completion respects your current location:
```bash
# In root
> cat [Tab]       → Shows files in /

# After cd /.architect
> cat [Tab]       → Shows files in /.architect
```

---

## 💡 Pro Tips

### 1. Double Tab for Options
Press Tab twice to see all available options:
```bash
> c[Tab][Tab]
Available:
  cat
  cd
  cd ..
  cd ~
  cd /
  clear
  cls
  contact
```

### 2. Partial Matching
Tab completes to the longest common prefix:
```bash
> cat echo[Tab]
Available files:
  echo_01.txt
  echo_02.txt
  echo_chamber.dat

# Completes to: cat echo
```

### 3. Case Insensitive
Tab completion ignores case:
```bash
> cat READ[Tab]   → cat README.md
> cd .ARCH[Tab]   → cd /.architect
```

### 4. Space After Commands
The system knows when you're typing a command vs an argument:
```bash
> cat[Tab]        → Completes command "cat"
> cat [Tab]       → Shows available files for cat
```

---

## 🎮 Workflow Examples

### Exploring Directories
```bash
> pwd                    # Check location
/

> cd .[Tab][Tab]         # See hidden dirs
> cd .a[Tab]             # Completes to .architect
> cd .architect

> ls -la                 # See files

> cat [Tab][Tab]         # See all files
> cat R[Tab]             # Read README.md
```

### Finding Encrypted Files
```bash
> cd /.traces

> decrypt [Tab][Tab]     # See encrypted files
Available files:
  signal_degradation.enc
  timestamp_00423.dat
  observer_notes.enc

> decrypt s[Tab]         # Autocomplete
> decrypt signal_degradation.enc
```

### Quick Navigation
```bash
> cd /[Tab][Tab]         # See all top-level dirs
> cd /.v[Tab]            # Jump to /.void
> cd ..[Tab]             # Go back up
> cd ~[Tab]              # Return to root
```

---

## 🔧 Technical Details

### What Gets Completed

**Commands:**
- All portfolio commands (help, about, projects, etc.)
- All navigation commands (cd, ls, pwd)
- All file commands (cat, decrypt, open, scan, trace)
- All secret commands (who are you, diagnostics, etc.)

**Directories:**
- All paths in filesystem structure
- Relative paths from current directory
- Absolute paths starting with `/`
- Special shortcuts (`.`, `..`, `~`, `/`)

**Files:**
- All visible files in current directory
- All hidden files (shown with `ls -la`)
- All files defined in lore system
- Random discovery files (if spawned)

### Completion Algorithm

1. **Parse Input:** Splits command and arguments
2. **Context Detection:** Determines what you're trying to complete
3. **Filter Matches:** Finds all items starting with your input
4. **Smart Completion:**
   - Single match: Completes immediately
   - Multiple matches: Completes to common prefix
   - No common prefix: Shows all options

---

## 🎯 Quick Reference

| Input Pattern | Result |
|--------------|--------|
| `[Tab]` | Show available commands |
| `c[Tab]` | Complete command starting with 'c' |
| `cat [Tab]` | Show files in current directory |
| `cd [Tab]` | Show available directories |
| `cd /[Tab]` | Show all absolute paths |
| `cd ..[Tab]` | Complete to parent directory |
| `decrypt [Tab]` | Show encrypted files |

---

## 🚀 Try It Out!

### Beginner Flow
```bash
> [Tab]                  # See commands
> h[Tab]                 # Type help
> l[Tab]                 # Type ls
> ls -[Tab]              # Type ls -la
> c[Tab] R[Tab]          # Type cat README.md
```

### Advanced Flow
```bash
> cd /[Tab][Tab]         # Explore dirs
> cd /.a[Tab]            # Go to architect
> cat [Tab][Tab]         # See files
> cat b[Tab]             # Read blueprint
> cd ..[Tab]             # Go back
```

### Power User Flow
```bash
> cd /.v[Tab]            # Jump to void
> decrypt [Tab][Tab]     # Find encrypted
> decrypt m[Tab]         # Decrypt file
> cd ~[Tab]              # Home
```

---

## 📚 Related Guides

- **[Navigation Guide](./NAVIGATION_GUIDE.md)** - Full navigation tutorial
- **[Lore System](./LORE_SYSTEM.md)** - Complete lore documentation
- **[Lore Map](./LORE_MAP.md)** - Discovery paths and secrets
- **[Commands Reference](../reference/COMMANDS.md)** - All available commands

---

**Pro Tip:** Combine Tab completion with arrow keys (↑↓) to cycle through command history for maximum efficiency! 🎯
