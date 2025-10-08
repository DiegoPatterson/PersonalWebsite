# 🎮 Game Design Portfolio Feature

## Overview
An interactive pixel cyberpunk world where visitors can explore your game design projects in a fun, immersive way!

---

## How to Access

### From Terminal
Type any of these commands:
```bash
play game
boot game
game
game.exe
```

The game will load with a cool initialization sequence, then launch into the pixel world!

---

## How to Play

### Controls
- **Arrow Keys** or **WASD** - Move your character around the world
- **E** - Interact with nearby projects
- **ESC** - Exit game and return to terminal
- **Click "Exit Game"** button - Alternative exit method

### Gameplay
1. **Explore the World** - Walk around the cyberpunk pixel environment
2. **Find Projects** - Look for glowing colored objects scattered around
3. **Get Close** - When you're near a project, you'll see a prompt
4. **Press E** - Interact to open detailed project information
5. **View Details** - See full descriptions, features, tech stack, and links
6. **Play Demos** - Click "Play Demo" for playable projects
7. **View Code** - Click "GitHub Repo" to see the source code

---

## Game World Layout

### Object Types
- **🟦 Terminal** (Cyan) - Technical/coding projects
- **🟪 Arcade** (Magenta) - Action/competitive games
- **🟨 Console** (Yellow) - Story/adventure games
- **🔴 Door** (Red) - Exit back to terminal (located at top-left)

### Projects Included
1. **Neon Heist: Cyber Syndicate** - Stealth Action RPG
2. **Quantum Echoes** - Puzzle Platformer
3. **Neural Arena** - Competitive Multiplayer
4. **Rogue Algorithm** - Roguelike Deckbuilder
5. **Memory Fragments** - Narrative Adventure

---

## Features

### Visual Design
- **Pixel art aesthetic** - Retro cyberpunk style
- **Glowing objects** - Projects pulse when you're nearby
- **Smooth movement** - Grid-based character movement
- **Atmospheric background** - Cyberpunk gradient environment
- **Grid overlay** - Subtle grid for that terminal feel

### Project Display
Each project shows:
- **Title & Type** - What kind of game it is
- **Description** - Full project overview
- **Project Details** - Engine, role, duration, team size, status
- **Key Features** - Top 3 standout features
- **Technologies** - Tech stack badges
- **Interactive Buttons**:
  - ▶ **Play Demo** - Opens playable demos (if available)
  - 📁 **GitHub Repo** - Opens GitHub repository

---

## Technical Details

### Component Structure
```
PixelGame.jsx
├── Game Canvas (640x480px, 20x15 grid)
├── Player Character (yellow sprite)
├── Interactable Objects (project displays)
├── Walls/Boundaries (cyan borders)
├── HUD (instructions overlay)
├── Project Modal (detailed view)
└── Exit Button
```

### Data Source
Projects are pulled from `src/data/vault.json`:
```json
{
  "gameDesignProjects": [
    {
      "id": "game001",
      "title": "Project Name",
      "type": "Game Type",
      "category": "AI" or "CYBER",
      "color": "#hexcolor",
      "description": "...",
      "features": [...],
      "technologies": [...],
      "playable": true/false,
      "githubRepo": "url",
      "itchLink": "url" (optional)
    }
  ]
}
```

---

## Customization Guide

### Adding New Projects

1. **Edit vault.json**
   Add a new project to the `gameDesignProjects` array:
   ```json
   {
     "id": "game006",
     "title": "Your New Game",
     "type": "Game Type",
     "category": "AI",
     "color": "#00ff00",
     "description": "Game description",
     "role": "Your Role",
     "engine": "Unity/Unreal/etc",
     "duration": "X months",
     "teamSize": "Solo/Team",
     "features": ["Feature 1", "Feature 2"],
     "technologies": ["Tech1", "Tech2"],
     "status": "Complete/In Progress",
     "playable": true,
     "githubRepo": "github.com/...",
     "itchLink": "itch.io/..." // optional
   }
   ```

2. **Update PixelGame.jsx** (optional)
   If you want to customize positions:
   ```javascript
   x: [10, 15, 5, 12, 18, YOUR_X_POS]
   y: [5, 8, 10, 12, 6, YOUR_Y_POS]
   ```

### Changing Colors
Projects automatically use the `color` field from vault.json:
- Terminal gint
- Modal borders
- Text highlights
- Particle effects

### Adjusting World Size
In `PixelGame.jsx`:
```javascript
const TILE_SIZE = 32  // Size of each grid tile
const GRID_WIDTH = 20  // Number of tiles wide
const GRID_HEIGHT = 15 // Number of tiles tall
```

---

## Integration with Terminal

### Command Handler
Located in `Terminal.jsx`:
```javascript
else if (command === 'play game' || command === 'boot game' || command === 'game' || command === 'game.exe') {
  response = { 
    type: 'system', 
    content: `[Game initialization sequence]`
  }
  setTimeout(() => setShowGame(true), 1000)
}
```

### State Management
- `showGame` state controls visibility
- `setShowGame(false)` in `onExit` returns to terminal
- Terminal remains in background while game is active

---

## Future Enhancement Ideas

### Gameplay
- 🗺️ **Multiple Rooms** - Different areas for different game types
- 🎵 **Sound Effects** - Walking sounds, interaction beeps
- 🎨 **Animated Sprites** - Walking animations for character
- 💬 **NPC Characters** - Talk to design philosophy NPCs
- 🏆 **Achievements** - Find all projects, speedrun, etc.
- 🔍 **Hidden Easter Eggs** - Secret areas with bonus content

### Visual
- ✨ **Particle Effects** - Dust, glows, screen shake
- 🌃 **Dynamic Lighting** - Project glow affects environment
- 📺 **CRT Effect** - Scanlines, chromatic aberration
- 🎬 **Cutscenes** - Brief intro when entering game

### Content
- 📝 **Development Blog** - Interactable objects with dev insights
- 🖼️ **Screenshot Gallery** - In-game screenshot viewers
- 🎥 **Video Displays** - Embedded gameplay videos
- 🎤 **Audio Logs** - Voice-over commentary about projects

### Technical
- 💾 **Save System** - Remember which projects viewed
- 📊 **Analytics** - Track which projects most visited
- 🎮 **Gamepad Support** - Controller input
- 📱 **Mobile Touch** - On-screen D-pad

---

## Browser Compatibility
- ✅ Chrome/Edge (best performance)
- ✅ Firefox (fully supported)
- ✅ Safari (works, some visual differences)
- ⚠️ Mobile (works but keyboard required)

---

## Performance Notes
- Grid: 20x15 tiles (300 tiles)
- Render: Canvas-style with React
- Animation: Framer Motion for smooth transitions
- FPS: 60fps target, movement at 6.67 updates/sec
- Memory: ~50MB (including React overhead)

---

## Tips for Visitors
1. **Take your time** - Explore every corner
2. **Read descriptions** - Each project has a story
3. **Check tech stacks** - See what tools were used
4. **Try demos** - Some projects are playable!
5. **View code** - GitHub repos available
6. **Come back later** - Projects will be updated!

---

**Built with ❤️ using React, Framer Motion, and pure creativity!**

---

*Last Updated: [Current Date]*
