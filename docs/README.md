# 📚 RezuMe Documentation

Complete documentation for the RezuMe interactive portfolio system.

## 🗂️ Documentation Structure

### 📝 [Content Management](./content-management/)
Everything you need to update your resume content without touching code:
- **[HOW_TO_UPDATE_CONTENT.md](./content-management/HOW_TO_UPDATE_CONTENT.md)** - ⭐ **START HERE!** Quick 5-minute guide
- **[CONTENT_MANAGEMENT_GUIDE.md](./content-management/CONTENT_MANAGEMENT_GUIDE.md)** - Complete reference
- **[CONTENT_TEMPLATES.md](./content-management/CONTENT_TEMPLATES.md)** - Copy-paste ready templates
- **[CONTENT_FILE_REFERENCE.md](./content-management/CONTENT_FILE_REFERENCE.md)** - File locations & structure
- **[HOW_TO_ADD_PROFILE_IMAGE.md](./content-management/HOW_TO_ADD_PROFILE_IMAGE.md)** - Profile picture guide
- Other content system documentation

### ✨ [Features](./features/)
Documentation for all interactive features:
- **[QUICK_COMMANDS_PANEL.md](./features/QUICK_COMMANDS_PANEL.md)** - Quick commands interface
- **[DRAGGABLE_WINDOWS.md](./features/DRAGGABLE_WINDOWS.md)** - Window drag & drop
- **[DRAG_INTERACTION_GUIDE.md](./features/DRAG_INTERACTION_GUIDE.md)** - Interaction details
- **[DARK_MODE_FEATURES.md](./features/DARK_MODE_FEATURES.md)** - Dark AI mode
- **[TWO_WORLDS.md](./features/TWO_WORLDS.md)** - Dual personality system
- **[GAME_FEATURE.md](./features/GAME_FEATURE.md)** - Built-in pixel game
- **[HIDDEN_COMMANDS.md](./features/HIDDEN_COMMANDS.md)** - Secret commands
- **[HIDDEN_WORLD_GUIDE.md](./features/HIDDEN_WORLD_GUIDE.md)** - Hidden filesystem
- Other feature documentation

### 📖 [Guides](./guides/)
User and setup guides:
- **[START_HERE.md](./guides/START_HERE.md)** - ⭐ **New to RezuMe? Start here!**
- **[QUICKSTART.md](./guides/QUICKSTART.md)** - Quick setup guide
- **[CUSTOMIZATION.md](./guides/CUSTOMIZATION.md)** - Customize your portfolio
- **[LAYOUT_GUIDE.md](./guides/LAYOUT_GUIDE.md)** - Layout customization

### 🔧 [Development](./development/)
Technical documentation for developers:
- **[DEPLOYMENT.md](./development/DEPLOYMENT.md)** - Deploy to production
- **[SECURITY.md](./development/SECURITY.md)** - Security features
- **[TESTING_GUIDE.md](./development/TESTING_GUIDE.md)** - Testing procedures
- **[BUG_FIX_SUMMARY.md](./development/BUG_FIX_SUMMARY.md)** - Bug fixes log
- **[REFACTOR_SUMMARY.md](./development/REFACTOR_SUMMARY.md)** - Code refactoring
- **[REBRANDING_REZUME.md](./development/REBRANDING_REZUME.md)** - Rebranding history
- Other development documentation

### 📑 [Reference](./reference/)
Quick reference documentation:
- **[COMMANDS.md](./reference/COMMANDS.md)** - All terminal commands
- **[QUICK_REFERENCE.md](./reference/QUICK_REFERENCE.md)** - Quick lookup
- **[PROJECT_SUMMARY.md](./reference/PROJECT_SUMMARY.md)** - Project overview
- **[QUICK_VERIFICATION.md](./reference/QUICK_VERIFICATION.md)** - Testing checklist

---

## 🚀 Quick Start Paths

### "I want to update my resume content"
1. Read [HOW_TO_UPDATE_CONTENT.md](./content-management/HOW_TO_UPDATE_CONTENT.md)
2. Use templates from [CONTENT_TEMPLATES.md](./content-management/CONTENT_TEMPLATES.md)
3. Edit `src/data/vault.json`
4. Done! ✅

### "I'm new to RezuMe"
1. Read [START_HERE.md](./guides/START_HERE.md)
2. Follow [QUICKSTART.md](./guides/QUICKSTART.md)
3. Customize with [CUSTOMIZATION.md](./guides/CUSTOMIZATION.md)

### "I want to deploy my portfolio"
1. Update content (see above)
2. Follow [DEPLOYMENT.md](./development/DEPLOYMENT.md)
3. Deploy to Netlify, Vercel, or GitHub Pages

### "I want to understand the features"
Browse the [features/](./features/) folder for detailed documentation on:
- Interactive terminal commands
- Draggable windows
- Dark AI mode
- Hidden easter eggs
- And more!

---

## 🎯 Most Important Files

| Priority | File | Purpose |
|----------|------|---------|
| ⭐⭐⭐ | [HOW_TO_UPDATE_CONTENT.md](./content-management/HOW_TO_UPDATE_CONTENT.md) | Update your resume (5-min guide) |
| ⭐⭐⭐ | [START_HERE.md](./guides/START_HERE.md) | First-time setup |
| ⭐⭐ | [CONTENT_TEMPLATES.md](./content-management/CONTENT_TEMPLATES.md) | Copy-paste templates |
| ⭐⭐ | [COMMANDS.md](./reference/COMMANDS.md) | All available commands |
| ⭐ | [DEPLOYMENT.md](./development/DEPLOYMENT.md) | Go live guide |

---

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite 5** - Build tool & dev server
- **Tailwind CSS 3** - Utility-first styling
- **Framer Motion 11** - Animations & drag interactions
- **JSON** - Content management system

---

## 🌟 Key Features

- ✅ **No-code content updates** - Edit JSON files, not React code
- ✅ **Interactive terminal** - Command-based navigation
- ✅ **Draggable windows** - Desktop-like experience
- ✅ **Dual personality** - AI/ML mode ↔ Cybersecurity mode
- ✅ **Quick commands panel** - User-friendly buttons
- ✅ **Built-in pixel game** - Easter egg game
- ✅ **Hidden world** - Secret filesystem with lore
- ✅ **Fully responsive** - Works on all devices

---

## 📞 Need Help?

1. Check the appropriate folder above
2. Use the Quick Start Paths
3. Search docs for keywords
4. Check [QUICK_REFERENCE.md](./reference/QUICK_REFERENCE.md)

---

**Made with 💚 by the RezuMe team**

## 🚀 Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

4. **Preview production build:**
```bash
npm run preview
```

## 📝 Customization

### Update Personal Data
Edit `src/data/vault.json` to customize:
- Experience entries
- Education history
- Affiliations
- Projects
- Core memory (philosophy)
- Secret commands

### Modify AI Personality
Adjust the AI's responses and personality in:
- `src/components/Terminal.jsx` - Command handlers
- `src/data/vault.json` - AI personality settings

### Change Colors
Modify the color scheme in `tailwind.config.js`:
```js
colors: {
  cyber: {
    cyan: '#00FFFF',
    violet: '#8B00FF',
    // ... more colors
  }
}
```

## 🌐 Deployment

### GitHub Pages
```bash
npm run build
# Deploy the dist folder to GitHub Pages
```

### Vercel
```bash
vercel
```

### Netlify
Drag and drop the `dist` folder to Netlify

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Credits

Created by Diego Patterson
AI Interface: NEXUS v3.7.2

---

*"In the dance between creation and chaos, I choose to be the architect of order."* - NEXUS
