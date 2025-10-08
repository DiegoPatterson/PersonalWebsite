# 📋 Customization Guide

## Quick Start Checklist

Before deploying, personalize your portfolio:

### 1. Update Personal Information

Edit `src/data/vault.json`:

```json
{
  "creator": {
    "name": "Your Name",  // Change this!
    "title": "Your Title",
    "specialization": ["Your", "Specialties"]
  }
}
```

### 2. Update Experience

Replace the example entries with your actual work experience:

```json
"experience": [
  {
    "id": "exp001",
    "title": "Your Job Title",
    "company": "Company Name",
    "duration": "Start - End",
    "description": "What you did...",
    "technologies": ["Tech1", "Tech2"]
  }
]
```

### 3. Update Education

```json
"education": [
  {
    "id": "edu001",
    "degree": "Your Degree",
    "institution": "Your School",
    "duration": "Years",
    "gpa": "Your GPA",
    "focus": "Your Focus Area",
    "achievements": ["Achievement 1", "Achievement 2"]
  }
]
```

### 4. Add Your Projects

```json
"projects": [
  {
    "id": "proj001",
    "name": "Project Name",
    "tagline": "One-line description",
    "description": "Detailed description...",
    "technologies": ["Tech1", "Tech2"],
    "github": "https://github.com/yourusername/repo",
    "status": "ACTIVE",
    "classification": "OPEN_SOURCE"
  }
]
```

### 5. Update Core Memory (Philosophy)

```json
"coreMemory": {
  "philosophy": "Your philosophy...",
  "motivation": "What drives you...",
  "vision": "Your vision for the future...",
  "values": ["Value 1", "Value 2"],
  "quote": "Your favorite quote or personal motto"
}
```

### 6. Update Contact Information

In `src/components/Terminal.jsx`, find the `handleContact` function:

```js
const handleContact = (dark) => ({
  type: 'ai',
  content: "📧 Email: your.email@example.com\n💻 GitHub: github.com/yourusername\n💼 LinkedIn: linkedin.com/in/yourusername\n🌐 Website: yourwebsite.com"
})
```

### 7. Customize AI Responses (Optional)

Make NEXUS sound more like you! Edit responses in:
- `src/components/Terminal.jsx` - All the handle functions
- `src/data/vault.json` - Secret commands

### 8. Add Secret Commands (Optional)

```json
"secretCommands": {
  "your_command": "Your custom response here",
  "another_command": "Another response..."
}
```

Then add the handler in `Terminal.jsx`:

```js
else if (command.includes('your_command')) {
  response = { 
    type: 'ai', 
    content: dataVault.secretCommands.your_command, 
    isSecret: true 
  }
}
```

---

## Color Customization

### Change Color Scheme

Edit `tailwind.config.js`:

```js
colors: {
  cyber: {
    cyan: '#00FFFF',     // Main accent
    violet: '#8B00FF',   // Secondary accent
    dark: '#0A0E27',     // Background
    darker: '#050814',   // Darker background
    // Add your own colors!
    yourcolor: '#HEX',
  }
}
```

### Apply Custom Colors

In any component:
```jsx
<div className="text-cyber-yourcolor">
  Custom colored text
</div>
```

---

## Animation Customization

### Adjust Animation Speed

In `tailwind.config.js`:

```js
animation: {
  'pulse-slow': 'pulse 3s ...',  // Change 3s to your preference
  'scanline': 'scanline 8s ...',  // Adjust speed here
}
```

### Disable Scanline Effect

In `src/App.jsx`, remove:
```jsx
<Scanline />
```

### Disable Glitch Effect

In `src/index.css`, remove the `.glitch` styles.

---

## Font Customization

### Change Font

1. Import a font in `index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');
```

2. Update `tailwind.config.js`:
```js
fontFamily: {
  mono: ['Your Font', 'monospace'],
}
```

---

## Background Customization

### Change Particle Count

In `src/components/Background.jsx`:

```js
const particleArray = Array.from({ length: 50 }, ...)  // Change 50
```

### Disable Grid Background

In `Background.jsx`, remove the grid div.

### Change Gradient Orbs

```jsx
<div className="... w-96 h-96 ..." />  // Adjust size
```

---

## Boot Sequence Customization

In `src/App.jsx`, update `bootMessages`:

```js
const bootMessages = [
  'YOUR CUSTOM MESSAGE 1...',
  'YOUR CUSTOM MESSAGE 2...',
  // Add more messages
]
```

---

## Adding New Commands

### 1. Define the command in `Terminal.jsx`:

```js
else if (command.includes('your_command')) {
  response = handleYourCommand(darkMode)
}
```

### 2. Create the handler:

```js
const handleYourCommand = (dark) => ({
  type: 'ai',
  content: 'Your response here',
})
```

### 3. Add to help menu:

```js
const handleHelp = () => ({
  content: `
  ...
  your_command → Your command description
  ...`
})
```

### 4. Add to suggestions (optional):

In `CommandSuggestions.jsx`:

```js
const suggestions = [
  { cmd: 'your_command', desc: 'Description', icon: '🎯' },
  // ...
]
```

---

## Testing Your Changes

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Test all commands
# Try each command in the terminal
# Toggle Dark AI mode
# Test on mobile (responsive design)
# Check browser console for errors

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Pro Tips

💡 **Keep it concise**: Short, impactful descriptions work best  
💡 **Be authentic**: Let your personality shine through  
💡 **Test everything**: Try all commands before deploying  
💡 **Mobile first**: Test on different screen sizes  
💡 **Update regularly**: Keep your projects and experience current  
💡 **Backup your data**: Keep a copy of `vault.json`  

---

## Common Customizations

### Add a Resume Download

In `Terminal.jsx`:

```js
else if (command === 'download resume' || command === 'resume') {
  window.open('/path/to/resume.pdf', '_blank')
  response = { 
    type: 'ai', 
    content: 'Downloading resume... Opening in new tab.' 
  }
}
```

### Add Social Media Links

Update the `handleContact` function with more links.

### Add a Blog Section

Create a new data type and handler for blog posts.

---

## Need Help?

- Check the main README.md for setup instructions
- Review DEPLOYMENT.md for deployment guides
- Look at existing handlers in Terminal.jsx for examples
- Test changes locally before deploying

Happy customizing! 🎨
