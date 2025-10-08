# 📑 Reference Documentation

Quick reference guides and command lists.

---

## 🎯 Quick References

### [COMMANDS.md](./COMMANDS.md)
**Complete command list** - All available terminal commands with descriptions, examples, and categories.

### [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
**Quick lookup guide** - Fast reference for common tasks, commands, and file locations.

### [QUICK_VERIFICATION.md](./QUICK_VERIFICATION.md)
**Testing checklist** - Quick checklist to verify all features work correctly.

### [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
**Project overview** - High-level summary of RezuMe project, features, and architecture.

---

## 📋 Command Categories

### Portfolio Commands
```bash
experience          # View work history
education           # View education
projects            # View professional projects
skills              # View technical skills
contact             # Get contact information
```

### System Commands
```bash
help                # Show command list
about               # About RezuMe AI
clear               # Clear terminal
game                # Launch pixel game
```

### Secret Commands
```bash
who are you         # AI identity
run diagnostics     # System check
access hidden       # Hidden world
decrypt core_memory # Philosophy
```

See [COMMANDS.md](./COMMANDS.md) for complete list with details.

---

## 🗂️ File Quick Reference

| File | Purpose |
|------|---------|
| `src/data/vault.json` | Resume content |
| `src/data/hidden_world.json` | Secret lore |
| `public/images/profile.jpg` | Profile picture |
| `src/components/Terminal.jsx` | Terminal UI |
| `src/components/QuickCommandsPanel.jsx` | Command panel |
| `src/utils/commandRouter.js` | Command handling |
| `src/utils/portfolioHandlers.js` | Portfolio logic |

---

## 🎨 Color Reference

### AI/ML Mode (Light)
```css
--cyber-cyan: #00ffff
--neon-pink: #ff00ff
--electric-purple: #bf00ff
--matrix-green: #00ff41
```

### Cybersecurity Mode (Dark)
```css
--blood-red: #ff0033
--dark-crimson: #8b0000
--hacker-orange: #ff6600
--deep-purple: #4a0080
```

---

## 🔧 Common Paths

### Content Updates
```
src/data/vault.json
```

### Component Files
```
src/components/
├── Terminal.jsx
├── QuickCommandsPanel.jsx
├── StatusBar.jsx
├── ModeTransition.jsx
└── [other components]
```

### Utility Functions
```
src/utils/
├── commandRouter.js
├── portfolioHandlers.js
├── filesystemHandlers.js
└── security.js
```

---

## 📦 NPM Scripts

```bash
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run linter
```

---

## 🌐 Deployment Platforms

| Platform | Command | Time |
|----------|---------|------|
| Netlify | `netlify deploy` | ~2 min |
| Vercel | `vercel` | ~2 min |
| GitHub Pages | `npm run build` + push | ~5 min |

See [DEPLOYMENT.md](../development/DEPLOYMENT.md) for details.

---

## 🎯 Feature Toggle Reference

### Mode Toggle
- **Location:** Top-right corner
- **Icon:** Skull (🔴 or 💀)
- **Switches:** AI/ML ↔ Cybersecurity

### Quick Commands
- **Location:** Right panel
- **Toggle:** Always visible
- **Draggable:** Yes

### Terminal
- **Location:** Left panel
- **Input:** Bottom of terminal
- **Draggable:** Yes

---

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large */
2xl: 1536px /* 2X Extra large */
```

---

## 🔍 Search Tips

### In Terminal
- Type partial command, see suggestions
- Use `help` to see all commands
- Tab completion (coming soon)

### In Docs
- Use Ctrl+F in browser
- Check category folders
- See main [README.md](../README.md)

---

## 🚀 Quick Tasks

| Want to... | Do this... |
|------------|-----------|
| Update resume | Edit `src/data/vault.json` |
| Add command | Edit `src/utils/commandRouter.js` |
| Change colors | Edit `tailwind.config.js` |
| Add feature | Create component in `src/components/` |
| Deploy site | Follow [DEPLOYMENT.md](../development/DEPLOYMENT.md) |
| Test changes | Run `npm run dev` |

---

## 📊 Project Stats

- **Components:** ~15
- **Commands:** 30+
- **Secret Commands:** 10+
- **Lines of Code:** ~3000
- **Bundle Size:** ~150KB
- **Load Time:** <1s

---

## 🎓 Learning Resources

### React
- [Official Docs](https://react.dev)
- [React Hooks](https://react.dev/reference/react)

### Tailwind CSS
- [Documentation](https://tailwindcss.com/docs)
- [Playground](https://play.tailwindcss.com)

### Framer Motion
- [API Reference](https://www.framer.com/motion/)
- [Examples](https://www.framer.com/motion/examples/)

### Vite
- [Guide](https://vitejs.dev/guide/)
- [Config](https://vitejs.dev/config/)

---

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Dev server won't start | Check Node version, restart |
| Changes don't show | Hard refresh (Ctrl+Shift+R) |
| JSON error | Validate at jsonlint.com |
| Build fails | Check console for errors |
| Styles broken | Clear Tailwind cache |

---

## 📞 Quick Links

- **[Main Documentation](../README.md)**
- **[Content Management](../content-management/)**
- **[Features](../features/)**
- **[Guides](../guides/)**
- **[Development](../development/)**

---

← [Back to Main Docs](../README.md)
