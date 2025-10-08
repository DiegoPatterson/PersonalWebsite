# 🎯 Quick Start: How to Update Your Resume Content

**No coding required!** Just edit a simple text file.

---

## 🏃 5-Minute Quick Start

### Step 1: Open the Content File
```
Open: src/data/vault.json
```

**Windows:** Right-click → Edit with → VS Code (or any text editor)  
**Mac/Linux:** Open with TextEdit or your preferred editor

### Step 2: Find What You Want to Change

Use **Ctrl+F** (Cmd+F on Mac) to search for the section:

- Want to update your bio? → Search for `"bio"`
- Add work experience? → Search for `"experience"`
- Update education? → Search for `"education"`
- Add project? → Search for `"projects"`

### Step 3: Make Your Changes

Just edit the text between the quotes!

**Before:**
```json
"bio": "I'm a software engineer"
```

**After:**
```json
"bio": "I'm a machine learning engineer specializing in NLP"
```

### Step 4: Save & Refresh

1. **Save** the file (Ctrl+S / Cmd+S)
2. **Refresh** your browser (F5 or Ctrl+R)
3. **Done!** Changes appear immediately

---

## 📱 Common Updates

### ✏️ Update Your Name
```json
"creator": {
  "name": "Your Name Here",  // ← Change this
  "title": "Your Title"       // ← And this
}
```

### 💼 Add New Job
Find the `"experience"` array and add:

```json
"experience": [
  {
    "id": "exp999",  // ← Use next number
    "title": "New Job Title",
    "company": "Company Name",
    "duration": "Month Year - Present",
    "category": "AI",
    "description": "What you do in this role",
    "technologies": ["Tech1", "Tech2", "Tech3"]
  },
  // ... rest of your experience
]
```

**Remember:** Add a comma after the closing `}` if there are more items below!

### 🚀 Add New Project
Find the `"projects"` array and add:

```json
"projects": [
  {
    "id": "proj999",
    "name": "Awesome Project",
    "category": "AI",  // or "CYBER"
    "description": "What it does",
    "technologies": ["Python", "React", "AWS"],
    "highlights": [
      "Achievement 1",
      "Achievement 2"
    ],
    "github": "https://github.com/you/project",
    "status": "Completed"
  },
  // ... rest of your projects
]
```

### 📧 Update Contact Info
Find the `"contact"` section:

```json
"contact": {
  "email": "new.email@example.com",     // ← Update these
  "github": "https://github.com/newusername",
  "linkedin": "https://linkedin.com/in/newprofile"
}
```

---

## 🎯 What Each Section Does

| Section | Shows In | Command |
|---------|----------|---------|
| `creator` → `bio` | Profile/About | `about me` |
| `experience` | Work history | `experience` |
| `education` | Education history | `education` |
| `projects` | Professional projects | `projects` |
| `vibeProjects` | Fun/experimental | `vibe projects` |
| `skills` | Skills list | `skills` |
| `contact` | Contact info | `contact` |
| `coreMemory` | Philosophy | `decrypt core_memory` |

---

## ⚠️ Important Rules

### ✅ DO:
- Use double quotes `"like this"`
- Add commas between items (but not after the last one)
- Save and test after each change
- Back up the file before major edits

### ❌ DON'T:
- Use single quotes `'like this'` ← Won't work!
- Forget commas between items
- Add comma after the last item in a list
- Edit while the dev server is compiling

---

## 🔍 Validation Checklist

Before saving, check:

- [ ] All quotes are double quotes `"`
- [ ] Commas after each item (except the last)
- [ ] No trailing commas at end of lists
- [ ] All brackets match: `{...}` and `[...]`

**Test your JSON:** Paste into https://jsonlint.com to check for errors

---

## 🆘 Troubleshooting

### Problem: "Site won't load after my changes"
**Solution:** 
1. Go to https://jsonlint.com
2. Copy-paste your `vault.json` content
3. Click "Validate JSON"
4. Fix any errors shown (usually missing comma or quote)

### Problem: "Changes don't appear"
**Solution:**
1. Hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
2. Check if file was saved
3. Check browser console for errors (F12)

### Problem: "I broke everything!"
**Solution:**
1. Use Git to revert: `git checkout src/data/vault.json`
2. Or restore from backup (always keep a backup!)

---

## 💡 Pro Tips

1. **Test Small Changes First** → Edit one thing, save, test, then continue
2. **Use ID Numbers** → Keep IDs sequential: proj001, proj002, proj003...
3. **Copy Existing Entries** → Easiest way to add new items is copy an existing one
4. **Keep Backups** → Before major changes, copy `vault.json` to `vault.backup.json`
5. **Use Templates** → See `CONTENT_TEMPLATES.md` for ready-to-use examples

---

## 📚 Full Documentation

For detailed information:
- **Complete Guide:** [CONTENT_MANAGEMENT_GUIDE.md](CONTENT_MANAGEMENT_GUIDE.md)
- **Templates:** [CONTENT_TEMPLATES.md](CONTENT_TEMPLATES.md)
- **JSON Help:** https://www.json.org/json-en.html

---

## 🎨 Example: Complete Update Flow

Let's add a new job step-by-step:

**1. Open file:**
```
src/data/vault.json
```

**2. Search for:** `"experience"`

**3. You'll see:**
```json
"experience": [
  { existing job... },
  { existing job... }
]
```

**4. Add your new job at the top:**
```json
"experience": [
  {
    "id": "exp005",
    "title": "Senior ML Engineer",
    "company": "AI Startup Inc",
    "duration": "Jan 2025 - Present",
    "category": "AI",
    "description": "Leading ML infrastructure team, building real-time recommendation systems.",
    "technologies": ["Python", "PyTorch", "Kubernetes", "AWS"]
  },
  { existing job... },  // ← Don't forget comma!
  { existing job... }
]
```

**5. Save** (Ctrl+S)

**6. Refresh browser** (F5)

**7. Type** `experience` in terminal → See your new job!

---

## 🎉 You're All Set!

Remember: Your resume content lives in **one file** → `src/data/vault.json`

Edit it anytime, save, refresh browser. That's it!

Questions? See the full guide: [CONTENT_MANAGEMENT_GUIDE.md](CONTENT_MANAGEMENT_GUIDE.md)

---

**Next Steps:**
1. ✅ Read this guide
2. ✅ Open `vault.json`
3. ✅ Make a small test change
4. ✅ Save & refresh
5. ✅ Update with your real content!
