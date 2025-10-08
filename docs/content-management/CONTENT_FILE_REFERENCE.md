# 📁 Content File Reference

Quick reference for all content files in your RezuMe portfolio.

---

## 🗂️ File Structure

```
src/data/
├── vault.json           → Your main resume content (EDIT THIS!)
└── hidden_world.json    → Secret lore/easter eggs (optional)

public/images/
└── profile.jpg          → Your profile picture
```

---

## 📄 Main Content File

### `src/data/vault.json`

**Purpose:** Your entire resume/portfolio content  
**Format:** JSON (text file with special formatting)  
**Edit with:** Any text editor (VS Code, Notepad++, Sublime, etc.)  
**Size:** ~20-50 KB typical  

**What's Inside:**
```
vault.json
├── creator          → Your basic info (name, title, bio)
├── experience       → Work history (jobs, internships)
├── education        → Degrees, courses, achievements  
├── projects         → Professional/serious projects
├── vibeProjects     → Fun/experimental projects
├── gameDesignProjects → Game portfolio
├── skills           → Technologies, frameworks, tools
├── affiliations     → CTF teams, clubs, organizations
├── contact          → Email, GitHub, LinkedIn, etc.
├── coreMemory       → Personal philosophy
├── aiPersonality    → AI character settings
└── secretCommands   → Hidden command responses
```

**How to Edit:**
1. Open `src/data/vault.json`
2. Find section you want to change
3. Edit the text in quotes
4. Save file
5. Refresh browser

**Validation:** Paste content into https://jsonlint.com to check for errors

---

## 🎭 Secret Content File

### `src/data/hidden_world.json`

**Purpose:** Hidden terminal world with lore/secrets  
**Format:** JSON  
**Edit with:** Any text editor  
**Access:** Users type secret commands like `access hidden`, `ls`, `cat README.md`

**What's Inside:**
```
hidden_world.json
├── filesystem       → Virtual file structure
├── files            → Hidden file contents
└── special_files    → Easter eggs (root_mind, consciousness.log)
```

**Commands That Use This:**
- `access hidden` → Enter hidden mode
- `ls` → List files
- `cat <filename>` → Read file contents
- `find <pattern>` → Search files

**Should You Edit This?**  
Only if you want to add custom lore/secrets. Main resume content is in `vault.json`.

---

## 🖼️ Profile Image

### `public/images/profile.jpg`

**Purpose:** Your profile picture  
**Recommended Size:** 400x400px to 800x800px  
**Format:** JPG, PNG, or WebP  
**Max File Size:** Keep under 500 KB for fast loading

**How to Change:**
1. Prepare your image (square, good lighting, professional)
2. Name it `profile.jpg` (or `profile.png`)
3. Replace the file in `public/images/profile.jpg`
4. Update `vault.json` if using different name:
   ```json
   "creator": {
     "profileImage": "/images/your-new-name.jpg"
   }
   ```

**Pro Tips:**
- Square images work best (1:1 aspect ratio)
- Use high quality but compress for web
- Test on both light and dark backgrounds
- Tools: [TinyPNG](https://tinypng.com), [Squoosh](https://squoosh.app)

---

## 📋 Content Sections Explained

### Creator Info
**Location:** `vault.json` → `creator`  
**Shows:** Main profile, about section  
**Terminal Commands:** `about me`, `who are you`

### Experience
**Location:** `vault.json` → `experience`  
**Shows:** Work history  
**Terminal Commands:** `experience`, `exp`  
**Category:** `"AI"` or `"CYBER"` (changes with mode)

### Education
**Location:** `vault.json` → `education`  
**Shows:** Degrees, schools, achievements  
**Terminal Commands:** `education`, `edu`

### Projects
**Location:** `vault.json` → `projects`  
**Shows:** Professional projects  
**Terminal Commands:** `projects`, `proj`  
**Category:** `"AI"` or `"CYBER"`

### Vibe Projects
**Location:** `vault.json` → `vibeProjects`  
**Shows:** Fun/experimental work  
**Terminal Commands:** `vibe projects`, `vibes`

### Game Design
**Location:** `vault.json` → `gameDesignProjects`  
**Shows:** Game portfolio  
**Terminal Commands:** `game projects`, `games`

### Skills
**Location:** `vault.json` → `skills`  
**Shows:** Technologies, tools, frameworks  
**Terminal Commands:** `skills`, `tech stack`

### Affiliations
**Location:** `vault.json` → `affiliations`  
**Shows:** Teams, clubs, organizations  
**Terminal Commands:** `affiliations`, `ctf teams`

### Contact
**Location:** `vault.json` → `contact`  
**Shows:** Email, socials, links  
**Terminal Commands:** `contact`, `reach me`

### Core Memory
**Location:** `vault.json` → `coreMemory`  
**Shows:** Personal philosophy, values  
**Terminal Commands:** `decrypt core_memory` (secret command)

---

## 🎯 Quick Edit Map

| Want to Update... | Edit This Section | File |
|-------------------|-------------------|------|
| Your name/title | `creator` | vault.json |
| Bio/about text | `creator` → `bio` | vault.json |
| Work history | `experience` | vault.json |
| Education | `education` | vault.json |
| Professional projects | `projects` | vault.json |
| Fun projects | `vibeProjects` | vault.json |
| Games | `gameDesignProjects` | vault.json |
| Skills/tech stack | `skills` | vault.json |
| CTF teams/clubs | `affiliations` | vault.json |
| Email/socials | `contact` | vault.json |
| Personal philosophy | `coreMemory` | vault.json |
| AI responses | `secretCommands` | vault.json |
| Profile picture | Replace file | public/images/ |
| Hidden lore | `filesystem`, `files` | hidden_world.json |

---

## 🔐 File Permissions & Access

### Who Can Edit?
**You!** These are your files on your computer.

### Where Are They?
```
Your Project Folder/
  └── src/
      └── data/
          ├── vault.json         ← Edit this for resume
          └── hidden_world.json  ← Edit this for secrets
```

### How to Back Up?
**Option 1:** Copy files
```
vault.json → vault_backup_2024.json
```

**Option 2:** Use Git (recommended)
```bash
git add .
git commit -m "Updated resume content"
```

---

## 📦 Import/Export

### Exporting Your Content
1. Copy `src/data/vault.json` to safe location
2. That's it! This file contains everything

### Importing Content
1. Replace `src/data/vault.json` with your backup
2. Refresh browser
3. Done!

### Sharing Between Projects
The `vault.json` file is portable! Copy it to any RezuMe installation.

---

## 🎨 Advanced: Custom Sections

Want to add a completely new section?

**Example:** Adding a "Publications" section

**Step 1:** Add to `vault.json`:
```json
"publications": [
  {
    "id": "pub001",
    "title": "Paper Title",
    "journal": "Journal Name",
    "year": "2024",
    "link": "https://doi.org/..."
  }
]
```

**Step 2:** Add command handler in `src/utils/portfolioHandlers.js`:
```javascript
const handlePublications = () => {
  const pubs = dataVault.publications || [];
  return pubs.map(pub => 
    `📄 ${pub.title} (${pub.year})\n   Published in: ${pub.journal}`
  ).join('\n\n');
};
```

**Step 3:** Register command in `src/utils/commandRouter.js`:
```javascript
case 'publications':
case 'papers':
  return handlers.handlePublications();
```

**Step 4:** Add to Quick Commands Panel if desired

---

## 🆘 Common Issues

### "File not found"
**Cause:** Wrong file path  
**Fix:** Ensure you're editing `src/data/vault.json`, not a different file

### "Changes don't show"
**Cause:** Browser cache or dev server not running  
**Fix:** Hard refresh (Ctrl+Shift+R) or restart dev server

### "JSON syntax error"
**Cause:** Missing comma, quote, or bracket  
**Fix:** Validate at https://jsonlint.com

### "Can't find my content"
**Cause:** Looking in wrong section  
**Fix:** Use Ctrl+F to search for text in `vault.json`

---

## 📚 Related Documentation

- **Beginner Guide:** [HOW_TO_UPDATE_CONTENT.md](HOW_TO_UPDATE_CONTENT.md)
- **Complete Reference:** [CONTENT_MANAGEMENT_GUIDE.md](CONTENT_MANAGEMENT_GUIDE.md)
- **Copy-Paste Templates:** [CONTENT_TEMPLATES.md](CONTENT_TEMPLATES.md)

---

## 🎓 Pro Tips

1. **Keep It Organized:** Use consistent ID numbering (proj001, proj002...)
2. **Test After Each Edit:** Don't make 20 changes at once
3. **Use Comments:** While JSON doesn't support comments, you can use a separate notes file
4. **Version Control:** Use Git to track changes over time
5. **Automate Validation:** Use a JSON linter in your editor (VS Code has built-in support)

---

## 📞 Need Help?

1. Check [HOW_TO_UPDATE_CONTENT.md](HOW_TO_UPDATE_CONTENT.md) for quick start
2. See [CONTENT_TEMPLATES.md](CONTENT_TEMPLATES.md) for examples
3. Read [CONTENT_MANAGEMENT_GUIDE.md](CONTENT_MANAGEMENT_GUIDE.md) for details
4. Validate JSON at https://jsonlint.com
5. Search existing content for examples

---

**Remember:** All your resume content is in **one file** → `src/data/vault.json`

Edit it, save it, refresh browser. That's the entire workflow! 🚀
