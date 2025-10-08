# 🚀 Deployment Guide

## Quick Deploy Options

### Option 1: GitHub Pages (Recommended)

1. **Update `vite.config.js`** - Set your base URL:
```js
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',  // Change this!
})
```

2. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

3. **Add deploy scripts to `package.json`**:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

4. **Deploy**:
```bash
npm run deploy
```

5. **Enable GitHub Pages** in your repo settings (Settings → Pages → Source: gh-pages branch)

---

### Option 2: Vercel

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
vercel
```

3. **Production deployment**:
```bash
vercel --prod
```

Or use the Vercel dashboard to import your GitHub repo.

---

### Option 3: Netlify

#### Method A: Drag & Drop
1. Build your project: `npm run build`
2. Go to [Netlify](https://app.netlify.com)
3. Drag the `dist` folder to deploy

#### Method B: Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Method C: Continuous Deployment
1. Connect your GitHub repo in Netlify dashboard
2. Build command: `npm run build`
3. Publish directory: `dist`

---

### Option 4: GitHub Actions (Automated)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Enable GitHub Pages in: Settings → Pages → Source: GitHub Actions

---

## Custom Domain Setup

### For GitHub Pages:
1. Add a `CNAME` file in the `public` folder with your domain
2. Configure DNS settings with your domain provider:
   - Add A records pointing to GitHub's IPs
   - Or add a CNAME record pointing to `yourusername.github.io`

### For Vercel/Netlify:
Follow their respective domain configuration guides in the dashboard.

---

## Environment Variables

If you need environment variables:

1. Create `.env` file (don't commit this!):
```env
VITE_API_KEY=your_key_here
```

2. Access in code:
```js
const apiKey = import.meta.env.VITE_API_KEY
```

3. Add to your hosting platform's environment variables settings

---

## Troubleshooting

### Blank page after deployment?
- Check your `base` path in `vite.config.js`
- Ensure it matches your deployment URL structure

### 404 errors on refresh?
- Configure redirects for SPA routing
- For Netlify: Create `public/_redirects`:
  ```
  /*    /index.html   200
  ```

### Build fails?
- Check Node version (use 18+)
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for missing dependencies

---

## Performance Optimization

Before deploying:

```bash
# Analyze bundle size
npm run build -- --mode production

# Check for unused dependencies
npx depcheck

# Optimize images (if you add any)
# Use tools like imagemin or squoosh
```

---

## Post-Deployment Checklist

✅ Test all commands in the terminal  
✅ Verify all links work  
✅ Check mobile responsiveness  
✅ Test Dark AI mode toggle  
✅ Verify secret commands work  
✅ Check browser console for errors  
✅ Test performance (Lighthouse score)  
✅ Update contact information  
✅ Set up analytics (optional)  

---

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all dependencies are installed
3. Ensure Node version is 18 or higher
4. Clear cache and rebuild

Happy deploying! 🚀
