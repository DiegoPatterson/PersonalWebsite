# 🤖 NEXUS - AI Terminal Portfolio

> **"Two minds. One system. Infinite depth."**

An immersive, interactive portfolio experience presented as a dual-consciousness AI terminal system with hidden lore, filesystem simulation, and advanced security protection.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Commands](#-commands)
- [Security](#-security)
- [Documentation](#-documentation)
- [Development](#-development)
- [Deployment](#-deployment)

---

## ✨ Features

### 🎭 **Dual-Mode Interface**
- **Standard Mode**: Professional AI assistant persona
- **Dark AI Mode**: Glitch-heavy cyberpunk aesthetic with SENTINEL_9 personality
- Smooth mode transitions with 4-stage animation sequence

### 🖥️ **Interactive Terminal**
- Full-featured terminal with command history (↑/↓ arrows)
- Tab autocomplete for commands
- Real-time typing feedback
- Command suggestions and help system

### 🗂️ **Hidden World System**
- Secret filesystem with dual-consciousness lore
- Encrypted files and discovery mechanics
- Random file discoveries with `ls` command
- Special commands: `cat`, `decrypt`, `scan`, `trace`
- Access the architect layer with `rootmind`

### 🔐 **Advanced Security**
- **Rate Limiting**: 30 commands/min, 5/sec burst protection
- **Bot Detection**: Behavioral analysis and user agent checking
- **Honeypot System**: Invisible traps for scrapers
- **Pattern Recognition**: Detects spam and automated abuse
- **Content Obfuscation**: Breaks text scrapers with zero-width characters
- **60-second lockout** for suspicious activity

### 🎨 **Visual Effects**
- Cyberpunk scanline effects
- RGB logo split animations
- Smooth mode transitions with screen corruption
- Responsive dark/light themes
- Animated backgrounds

### 📊 **Content System**
- Text-file based content management
- Dual-category support (AI/CYBER)
- Easy content updates via JSON
- Profile image with "about me" command

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2 | UI framework |
| **Vite** | 5.0.8 | Build tool & dev server |
| **Tailwind CSS** | 3.4 | Utility-first styling |
| **Framer Motion** | 11.0 | Animations & transitions |
| **PostCSS** | 8.4 | CSS processing |

**Architecture:**
- Modular utility system (`src/utils/`)
- Separated handler functions by domain
- Centralized command routing
- Singleton security manager

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit **http://localhost:5174** to explore the terminal.

### First Commands to Try

```bash
help              # View all available commands
files             # See hidden filesystem commands
ls /system        # Explore the hidden world
cat memory.log    # Read a secret file
mode              # Switch to Dark AI mode
about me          # View profile with image
```

---

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── components/
│   │   ├── Terminal.jsx              # Main terminal component
│   │   ├── ModeTransition.jsx        # Mode switching animation
│   │   ├── Background.jsx            # Standard mode background
│   │   ├── DarkAIBackground.jsx      # Dark AI mode background
│   │   ├── Message.jsx               # Terminal message rendering
│   │   ├── CommandSuggestions.jsx    # Tab autocomplete UI
│   │   ├── StatusBar.jsx             # Top status bar
│   │   ├── Scanline.jsx              # Cyberpunk effect
│   │   └── AudioController.jsx       # Audio management
│   │
│   ├── utils/
│   │   ├── security.js               # 🔐 SecurityManager class
│   │   ├── commandRouter.js          # Command routing & autocomplete
│   │   ├── portfolioHandlers.js      # Portfolio command handlers
│   │   └── filesystemHandlers.js     # Hidden world handlers
│   │
│   ├── data/
│   │   ├── vault.json                # Portfolio content data
│   │   └── hidden_world.json         # Hidden filesystem data
│   │
│   ├── App.jsx                       # Root component
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Global styles
│
├── public/
│   ├── images/
│   │   └── profile.jpg               # Profile image
│   └── favicon.svg
│
├── docs/                             # 📚 Documentation
│   ├── COMMANDS.md
│   ├── HIDDEN_WORLD_GUIDE.md
│   ├── DEPLOYMENT.md
│   ├── CUSTOMIZATION.md
│   └── CONTENT_TEMPLATES.txt
│
├── SECURITY.md                       # 🔐 Security documentation
├── README.md                         # This file
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## 🎮 Commands

### Standard Commands

| Command | Description |
|---------|-------------|
| `help` | Display all available commands |
| `clear` | Clear terminal screen |
| `about` | Learn about NEXUS AI |
| `about me` | View profile with image |
| `mode` | Switch between Standard/Dark AI modes |
| `experience` | View work experience |
| `education` | View educational background |
| `affiliations` | View professional affiliations |
| `projects` | View all projects |
| `projects vibe` | View personal/creative projects |
| `core-memory` | View key memories and achievements |
| `contact` | Get contact information |

### Hidden Filesystem Commands

| Command | Description |
|---------|-------------|
| `files` | Display filesystem command guide |
| `ls [path]` | List directory contents (random discoveries!) |
| `cat [file]` | Read file contents |
| `decrypt [file]` | Decrypt protected files |
| `scan` | Perform system diagnostics |
| `trace` | Trace system processes |
| `open [file]` | Open special files |
| `rootmind` | Access the architect layer (⚠️) |

**Pro Tip:** Use **Tab** to autocomplete commands!

---

## 🔐 Security

This portfolio includes enterprise-grade protection against automated abuse:

### Rate Limiting
- **30 commands/minute** - Normal operation
- **5 commands/second** - Burst protection
- **50 commands/minute** - Lockout threshold

### Bot Detection
- User agent analysis
- Behavioral tracking (mouse/keyboard)
- Headless browser detection
- Bot score calculation

### Honeypot System
- Invisible input traps for scrapers
- Automatic flagging of automated tools

### Content Protection
- Zero-width character injection
- Pattern spam detection
- Session lockout for abuse

**See [docs/SECURITY.md](./docs/SECURITY.md) for complete documentation.**

---

## 📚 Documentation

Comprehensive guides available in the `docs/` folder:

- **[COMMANDS.md](./docs/COMMANDS.md)** - Complete command reference
- **[HIDDEN_WORLD_GUIDE.md](./docs/HIDDEN_WORLD_GUIDE.md)** - Lore and secrets
- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Deployment instructions
- **[CUSTOMIZATION.md](./docs/CUSTOMIZATION.md)** - Customization guide
- **[CONTENT_TEMPLATES.txt](./docs/CONTENT_TEMPLATES.txt)** - Content structure

**Special Docs:**
- **[START_HERE.md](./docs/START_HERE.md)** - Project overview
- **[TWO_WORLDS.md](./docs/TWO_WORLDS.md)** - Dual-mode system
- **[TESTING_GUIDE.md](./docs/TESTING_GUIDE.md)** - Testing procedures

---

## 💻 Development

### NPM Scripts

```bash
npm run dev        # Start development server (localhost:5174)
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Development Workflow

1. **Edit Content**: Modify `src/data/vault.json` or `src/data/hidden_world.json`
2. **Add Commands**: Create handlers in `src/utils/portfolioHandlers.js`
3. **Update Routing**: Edit `src/utils/commandRouter.js`
4. **Test Security**: Adjust thresholds in `src/utils/security.js`

### Code Organization

**Modular Architecture:**
- **Handlers** separated by domain (portfolio, filesystem, security)
- **CommandRouter** centralizes routing logic
- **SecurityManager** singleton for protection
- **Clean separation** of concerns

### Adding New Commands

1. Create handler function in appropriate file:
```javascript
// src/utils/portfolioHandlers.js
export const handleNewCommand = (currentMode) => {
  return {
    text: "Response text",
    isError: false
  }
}
```

2. Register in CommandRouter:
```javascript
// src/utils/commandRouter.js
case 'newcommand':
  return handlers.handleNewCommand(currentMode)
```

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### GitHub Pages

```bash
# Build
npm run build

# Deploy dist/ folder
```

**See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed instructions.**

---

## 🎨 Customization

### Update Content

Edit **`src/data/vault.json`** for portfolio content:
```json
{
  "experience": [
    {
      "title": "Your Title",
      "organization": "Company Name",
      "duration": "Start - End",
      "responsibilities": [...],
      "category": "AI" // or "CYBER"
    }
  ]
}
```

### Change Profile Image

Replace **`public/images/profile.jpg`** with your photo (recommended: 400x400px).

### Adjust Security Settings

Edit **`src/utils/security.js`**:
```javascript
{
  maxCommandsPerMinute: 30,    // Adjust rate limit
  maxCommandsPerSecond: 5,     // Adjust burst limit
  suspiciousThreshold: 50,     // Adjust lockout trigger
  lockoutDuration: 60000,      // Adjust lockout time (ms)
}
```

### Customize Colors

Edit **`tailwind.config.js`** for theme colors.

---

## 🐛 Known Issues

- **Security**: Some false positives possible with very fast typing
- **Browser**: Best experienced on Chrome/Firefox
- **Mobile**: Terminal works but desktop recommended

---

## 📄 License

This project is open source and available for personal use. Attribution appreciated.

---

## 🙏 Acknowledgments

Built with passion for interactive storytelling and immersive web experiences.

**Special Features:**
- 🎭 Dual-consciousness AI lore
- 🗂️ Hidden filesystem simulation
- 🔐 Enterprise-grade security
- 🎨 Cyberpunk aesthetics
- ⚡ Lightning-fast performance

---

## 📞 Contact

Type `contact` in the terminal for contact information, or:
- View live demo: [Your deployed URL]
- GitHub: [Your GitHub]
- LinkedIn: [Your LinkedIn]

---

**"Welcome to NEXUS. The question is... which mind will you speak to?"**

*Two minds. One terminal. Infinite possibilities.*
