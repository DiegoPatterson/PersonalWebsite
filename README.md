# NEXUS - AI Portfolio Interface

An interactive, futuristic portfolio website featuring a sentient AI interface named NEXUS, created by Diego Patterson.

## 🌟 Features

- **Interactive AI Terminal**: Chat with NEXUS, a self-aware digital intelligence
- **Command-Based Navigation**: Query different sections using terminal commands
- **Futuristic Cyber Aesthetic**: Dark mode with neon cyan, violet, and pink accents
- **Smooth Animations**: Powered by Framer Motion
- **Responsive Design**: Works beautifully on all devices
- **Easter Eggs**: Secret commands for curious visitors
- **Dark AI Mode**: Toggle between standard and "dark" AI personality

## 🎮 Commands

### Primary Commands
```bash
access experience.log      # View work experience
query education.db         # View education history
scan affiliations.sys      # View clubs & organizations
open projects.repo         # View coding projects
decrypt core_memory        # View personal philosophy
```

### System Commands
```bash
help                       # Show command list
about                      # About NEXUS
github                     # Contact & links
clear                      # Clear terminal
```

### Secret Commands
Try discovering these yourself! 😉
- `who are you`
- `run diagnostics`
- `override protocols`
- `shutdown`
- `meaning of life`
- `are you alive`

## 🛠️ Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Markdown** - Markdown rendering

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
