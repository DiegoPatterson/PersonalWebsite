# ✨ Features Documentation

Documentation for all interactive features in RezuMe.

---

## 🎮 Interactive Features

### [QUICK_COMMANDS_PANEL.md](./QUICK_COMMANDS_PANEL.md)
**Quick Commands Interface** - Always-visible panel with categorized command buttons for non-technical users. Learn how it works and how to customize it.

### [DRAGGABLE_WINDOWS.md](./DRAGGABLE_WINDOWS.md)
**Draggable Windows** - Desktop-like drag-and-drop functionality for terminal and command panel. Implementation details and customization options.

### [DRAG_INTERACTION_GUIDE.md](./DRAG_INTERACTION_GUIDE.md)
**Interaction Details** - Complete guide to drag interactions, constraints, and user experience design.

---

## 🎭 Dual Personality System

### [TWO_WORLDS.md](./TWO_WORLDS.md)
**Dual Mode System** - Learn about the AI/ML mode vs Cybersecurity mode, how content changes, and the philosophy behind it.

### [DARK_MODE_FEATURES.md](./DARK_MODE_FEATURES.md)
**Dark AI Mode** - Deep dive into the cybersecurity persona, visual changes, and personality shifts.

### [MODE_TRANSITION.md](./MODE_TRANSITION.md)
**Mode Transitions** - Animation system for smooth transitions between modes, visual effects, and timing.

---

## 🕹️ Games & Easter Eggs

### [GAME_FEATURE.md](./GAME_FEATURE.md)
**Built-in Pixel Game** - Documentation for the retro-style pixel game. How to access it, customize it, and add it to commands.

### [HIDDEN_COMMANDS.md](./HIDDEN_COMMANDS.md)
**Secret Commands** - List of hidden terminal commands and their responses. Add your own easter eggs!

### [HIDDEN_WORLD_GUIDE.md](./HIDDEN_WORLD_GUIDE.md)
**Hidden Filesystem** - Complete guide to the secret virtual filesystem with lore, files, and navigation.

---

## 📁 File System Features

### [FILES_COMMAND.md](./FILES_COMMAND.md)
**File Commands** - How to use file system commands like `ls`, `cat`, `find` in the hidden world.

---

## 🎯 Feature Overview

| Feature | Access Method | Documentation |
|---------|--------------|---------------|
| Quick Commands | Always visible on right | [QUICK_COMMANDS_PANEL.md](./QUICK_COMMANDS_PANEL.md) |
| Drag Windows | Click & drag title bars | [DRAGGABLE_WINDOWS.md](./DRAGGABLE_WINDOWS.md) |
| Dark AI Mode | Click mode toggle (top-right) | [DARK_MODE_FEATURES.md](./DARK_MODE_FEATURES.md) |
| Pixel Game | Type `game` or click Quick Command | [GAME_FEATURE.md](./GAME_FEATURE.md) |
| Hidden World | Type `access hidden` | [HIDDEN_WORLD_GUIDE.md](./HIDDEN_WORLD_GUIDE.md) |
| Secret Commands | Discover them! | [HIDDEN_COMMANDS.md](./HIDDEN_COMMANDS.md) |

---

## 🔧 Customization

Most features can be customized by editing:
- **`src/components/`** - React components for UI
- **`src/data/vault.json`** - Content and responses
- **`src/data/hidden_world.json`** - Hidden world content
- **`src/utils/commandRouter.js`** - Command handling

See individual feature docs for specific customization instructions.

---

## 🎨 Design Philosophy

RezuMe features are designed to be:
- **Intuitive** - Easy to discover and use
- **Delightful** - Smooth animations and interactions
- **Accessible** - Multiple ways to access content (commands + buttons)
- **Engaging** - Easter eggs reward exploration

---

## 💡 Adding New Features

Want to add your own features?

1. Study existing feature implementation
2. Check [CUSTOMIZATION.md](../guides/CUSTOMIZATION.md)
3. Modify components in `src/components/`
4. Add new commands in `src/utils/commandRouter.js`
5. Update content in `src/data/vault.json`

---

← [Back to Main Docs](../README.md)
