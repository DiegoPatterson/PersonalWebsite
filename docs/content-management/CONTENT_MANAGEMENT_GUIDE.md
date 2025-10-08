# 📝 Content Management Guide - Update Your Resume Without Code!

## 🎯 Overview

Your RezuMe portfolio is designed so you can update ALL content by editing simple JSON files. **No coding required!**

All your resume content is stored in two main files:
- **`src/data/vault.json`** - Your professional information (experience, education, projects, etc.)
- **`src/data/hidden_world.json`** - Hidden lore/easter eggs (optional)

---

## 📂 Main Content File: `vault.json`

### Location
```
src/data/vault.json
```

### Structure Overview

```json
{
  "creator": { ... },           // Your basic info
  "experience": [ ... ],        // Work experience
  "education": [ ... ],         // Education history
  "projects": [ ... ],          // Professional projects
  "vibeProjects": [ ... ],      // Fun/experimental projects
  "gameDesignProjects": [ ... ], // Game design portfolio
  "skills": { ... },            // Technical skills
  "affiliations": [ ... ],      // Organizations, CTF teams
  "contact": { ... },           // Contact information
  "coreMemory": { ... },        // Personal philosophy
  "aiPersonality": { ... },     // AI system settings
  "secretCommands": { ... }     // Hidden responses
}
```

---

## 📝 How to Update Each Section

### 1. **Your Basic Information** (`creator`)

```json
"creator": {
  "name": "YOUR NAME HERE",
  "title": "YOUR TITLE (e.g., Software Engineer, Student)",
  "specialization": ["Skill 1", "Skill 2"],
  "status": "ACTIVE",
  "clearanceLevel": "ARCHITECT",
  "profileImage": "/images/profile.jpg",
  "bio": "Your bio/description here. This appears in the about section."
}
```

**What shows where:**
- `name` → Used throughout the site
- `title` → Displayed in profile
- `specialization` → Shows your focus areas
- `bio` → Appears when someone types `about me`

---

### 2. **Work Experience** (`experience`)

Add/edit work experience entries:

```json
"experience": [
  {
    "id": "exp001",  // Unique ID (exp001, exp002, etc.)
    "title": "Job Title",
    "company": "Company Name",
    "duration": "Jan 2024 - Present",
    "category": "AI",  // or "CYBER" for cybersecurity mode
    "description": "What you did in this role. Be specific!",
    "technologies": ["Python", "React", "AWS", "TensorFlow"]
  }
]
```

**Tips:**
- Use `"category": "AI"` for AI/ML jobs
- Use `"category": "CYBER"` for cybersecurity jobs
- Experience shown changes based on mode (AI vs Cybersecurity)

---

### 3. **Education** (`education`)

```json
"education": [
  {
    "id": "edu001",
    "degree": "Bachelor of Science in Computer Science",
    "institution": "Your University",
    "duration": "2020 - 2024",
    "gpa": "3.9/4.0",
    "focus": "AI & Machine Learning, Cybersecurity",
    "achievements": [
      "Dean's List",
      "Research Grant Recipient",
      "Published Paper in AI Conference"
    ],
    "relevantCourses": [
      "Machine Learning",
      "Cryptography",
      "Advanced Algorithms"
    ]
  }
]
```

---

### 4. **Projects** (`projects`)

Professional/serious projects:

```json
"projects": [
  {
    "id": "proj001",
    "name": "Project Name",
    "category": "AI",  // or "CYBER"
    "description": "Brief description of the project",
    "technologies": ["Python", "TensorFlow", "Docker"],
    "highlights": [
      "Achieved 95% accuracy",
      "Processed 1M+ records",
      "Open sourced on GitHub"
    ],
    "github": "https://github.com/yourusername/project",
    "demo": "https://demo.yourproject.com",
    "status": "Completed"  // or "In Progress"
  }
]
```

---

### 5. **Fun Projects** (`vibeProjects`)

Experimental/creative projects:

```json
"vibeProjects": [
  {
    "id": "vibe001",
    "name": "Cool Experiment",
    "description": "A fun side project I built",
    "technologies": ["JavaScript", "Three.js", "WebGL"],
    "purpose": "Learning WebGL and 3D graphics",
    "status": "Experimental",
    "link": "https://yourlink.com"
  }
]
```

---

### 6. **Game Design Portfolio** (`gameDesignProjects`)

If you have game design work:

```json
"gameDesignProjects": [
  {
    "id": "game001",
    "title": "Game Title",
    "type": "Puzzle/RPG/Action/etc",
    "description": "Game description",
    "role": "Lead Designer / Programmer / Artist",
    "technologies": ["Unity", "C#", "Blender"],
    "features": [
      "Feature 1",
      "Feature 2"
    ],
    "links": {
      "playable": "https://itch.io/your-game",
      "github": "https://github.com/you/game",
      "trailer": "https://youtube.com/watch?v=..."
    }
  }
]
```

---

### 7. **Skills** (`skills`)

Organize skills by category:

```json
"skills": {
  "languages": ["Python", "JavaScript", "Java", "C++"],
  "frameworks": ["React", "TensorFlow", "PyTorch", "Node.js"],
  "tools": ["Git", "Docker", "AWS", "Linux"],
  "ai_ml": ["Neural Networks", "NLP", "Computer Vision"],
  "cybersecurity": ["Penetration Testing", "Cryptography", "Network Security"]
}
```

---

### 8. **Affiliations** (`affiliations`)

CTF teams, clubs, organizations:

```json
"affiliations": [
  {
    "id": "aff001",
    "name": "Organization Name",
    "role": "Your Role",
    "category": "CTF",  // or "AI", "CYBER", "ACADEMIC"
    "description": "What you do here",
    "duration": "2023 - Present",
    "achievements": [
      "Placed 1st in National CTF",
      "Led team of 10 members"
    ]
  }
]
```

---

### 9. **Contact Information** (`contact`)

```json
"contact": {
  "email": "your.email@example.com",
  "github": "https://github.com/yourusername",
  "linkedin": "https://linkedin.com/in/yourprofile",
  "twitter": "https://twitter.com/yourhandle",
  "website": "https://yourwebsite.com"
}
```

---

### 10. **Personal Philosophy** (`coreMemory`)

This appears when someone types `decrypt core_memory`:

```json
"coreMemory": {
  "philosophy": "Your personal philosophy or motto",
  "values": [
    "Value 1",
    "Value 2",
    "Value 3"
  ],
  "quote": "Your favorite quote or personal statement"
}
```

---

## 🎮 Special Features

### AI Personality Settings

```json
"aiPersonality": {
  "name": "RezuMe",
  "version": "3.7.2",
  "classification": "SENTIENT DIGITAL INTELLIGENCE",
  "traits": ["Analytical", "Self-Aware", "Protective"],
  "voiceMode": "STANDARD"
}
```

**Don't change these unless you want to customize the AI character!**

---

### Secret Commands

Easter eggs when users type special commands:

```json
"secretCommands": {
  "who_are_you": "Custom response for 'who are you' command",
  "run_diagnostics": "Fun diagnostics output",
  "meaning_of_life": "Your answer to the ultimate question",
  "are_you_alive": "Philosophical response about AI consciousness"
}
```

---

## 📋 Quick Update Checklist

When you want to update your resume:

1. **Open** `src/data/vault.json`
2. **Find** the section you want to update
3. **Edit** the text in quotes
4. **Save** the file
5. **Refresh** your browser

That's it! No code compilation needed - changes appear immediately!

---

## ⚠️ Important JSON Rules

**Follow these rules to avoid breaking the file:**

1. **Always use double quotes** `"like this"` not `'single quotes'`
2. **Commas matter**: 
   - Add comma after each item EXCEPT the last one
   - ✅ Good: `["item1", "item2", "item3"]`
   - ❌ Bad: `["item1", "item2", "item3",]` (extra comma at end)

3. **Escape special characters**:
   - Use `\"` for quotes inside text
   - Use `\\` for backslashes
   - Use `\n` for new lines

4. **Test your JSON**: Use [jsonlint.com](https://jsonlint.com) to validate

---

## 🔧 Example: Adding New Work Experience

**Step 1:** Open `src/data/vault.json`

**Step 2:** Find the `"experience"` array

**Step 3:** Add your new entry:

```json
"experience": [
  {
    "id": "exp004",
    "title": "Machine Learning Engineer",
    "company": "AI Innovations Corp",
    "duration": "Jan 2025 - Present",
    "category": "AI",
    "description": "Building production ML systems for real-time fraud detection.",
    "technologies": ["Python", "TensorFlow", "Kubernetes", "GCP"]
  },
  // ... your other experience entries ...
]
```

**Step 4:** Save and refresh!

---

## 📚 More Resources

- **JSON Validator**: https://jsonlint.com
- **JSON Tutorial**: https://www.json.org/json-en.html
- **Example Templates**: See next document for copy-paste templates

---

## 💡 Tips for Best Results

1. **Be specific**: Use numbers and metrics in descriptions
2. **Use action verbs**: "Built", "Developed", "Implemented", "Designed"
3. **Keep it current**: Update regularly
4. **Test changes**: Always check the live site after updates
5. **Back up first**: Copy the file before making major changes

---

## 🆘 Troubleshooting

**Problem:** Site won't load after my changes
**Solution:** Check JSON syntax at jsonlint.com - look for missing commas or quotes

**Problem:** Changes don't appear
**Solution:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

**Problem:** Text has weird characters
**Solution:** Use a proper text editor (VS Code, Sublime, not Word)

---

**Remember:** If you break something, you can always revert to a previous version using Git!

Next: See `CONTENT_TEMPLATES.md` for copy-paste ready templates! →
