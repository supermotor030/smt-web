# 🚀 Super Motor Trading - Deployment & Staging Guide

## Table of Contents
- [Local Development](#local-development)
- [Staging Environment](#staging-environment)
- [Production Deployment](#production-deployment)
- [Environment Variables](#environment-variables)
- [CI/CD Pipeline](#cicd-pipeline)

---

## Local Development

### Prerequisites
- Node.js 18.x or 20.x
- npm 9.x or higher

### Setup
```bash
# Clone the repository
git clone https://github.com/your-org/super-motor-trading.git
cd super-motor-trading

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server runs at `http://localhost:5173`

### Available Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run test:coverage` | Run tests with coverage report |

---

## Staging Environment

### Option 1: Vercel (Recommended)

#### Initial Setup
1. Create a Vercel account at https://vercel.com
2. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
3. Login and link project:
   ```bash
   vercel login
   vercel link
   ```

#### Deploy to Staging
```bash
# Deploy preview (staging)
vercel

# The CLI will provide a preview URL like:
# https://super-motor-trading-xxxxx.vercel.app
```

#### Automatic Preview Deployments
- Every push to a non-main branch creates a preview deployment
- Pull requests get unique preview URLs for testing
- Preview URLs are automatically commented on PRs

### Option 2: Netlify

#### Initial Setup
1. Create a Netlify account at https://netlify.com
2. Install Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```
3. Login and link:
   ```bash
   netlify login
   netlify init
   ```

#### Deploy to Staging
```bash
# Deploy draft (staging)
netlify deploy

# For production
netlify deploy --prod
```

### Option 3: Self-Hosted Staging

#### Using Docker
```dockerfile
# Dockerfile.staging
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run staging container
docker build -f Dockerfile.staging -t smt-staging .
docker run -p 8080:80 smt-staging
```

#### Using PM2 + Serve
```bash
# Install serve globally
npm i -g serve pm2

# Build the application
npm run build

# Serve with PM2
pm2 serve dist 3000 --name "smt-staging" --spa
```

---

## Production Deployment

### Vercel Production
```bash
vercel --prod
```

### Netlify Production
```bash
netlify deploy --prod
```

### Manual Deployment
```bash
# Build for production
npm run build

# The `dist` folder contains all production files
# Upload to your web server or CDN
```

### Domain Configuration

1. **Add custom domain** in your hosting provider's dashboard
2. **Update DNS records**:
   - A record: `@` → Your hosting IP
   - CNAME: `www` → Your hosting URL

3. **Update these files** with your actual domain:
   - `public/sitemap.xml` - Replace `supermotortrading.lk`
   - `public/robots.txt` - Update sitemap URL
   - `index.html` - Update OG meta tags
   - `vite.config.js` - Update PWA manifest URLs

---

## Environment Variables

Create `.env` files for different environments:

### `.env.development`
```env
VITE_APP_ENV=development
VITE_GA_ID=
VITE_FORMSPREE_ID=your-formspree-id
```

### `.env.staging`
```env
VITE_APP_ENV=staging
VITE_GA_ID=G-XXXXXXXXXX
VITE_FORMSPREE_ID=your-formspree-id
```

### `.env.production`
```env
VITE_APP_ENV=production
VITE_GA_ID=G-XXXXXXXXXX
VITE_FORMSPREE_ID=your-formspree-id
```

### Using Environment Variables
```javascript
// In your code
const gaId = import.meta.env.VITE_GA_ID
const isProd = import.meta.env.VITE_APP_ENV === 'production'
```

---

## CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:

### On Pull Request
1. ✅ Runs linting
2. ✅ Runs tests
3. ✅ Builds application
4. ✅ Runs Lighthouse CI
5. 🚀 Deploys to preview environment

### On Push to Main
1. ✅ Runs all checks
2. ✅ Lighthouse performance audit
3. 🚀 Deploys to production

### Setting Up GitHub Secrets

For Vercel deployment, add these secrets to your GitHub repository:
- `VERCEL_TOKEN` - Your Vercel API token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID

Get these values from:
```bash
vercel link
cat .vercel/project.json
```

---

## Performance Checklist

Before deploying to production:

- [ ] Run `npm run build` and check bundle size
- [ ] Run Lighthouse audit: `npx lhci autorun`
- [ ] Test on mobile devices
- [ ] Verify all images are optimized
- [ ] Check accessibility (keyboard navigation, screen readers)
- [ ] Verify PWA functionality
- [ ] Test contact form submission
- [ ] Verify all links work correctly
- [ ] Check SEO meta tags

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### PWA Not Updating
```bash
# Force service worker update in browser DevTools:
# Application > Service Workers > Update on reload
```

### Preview 404 Errors
Ensure your hosting provider supports SPA routing. For Vercel, create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## Support

For issues or questions:
- 📧 Email: info@supermotortrading.lk
- 💬 Create a GitHub issue

---

*Last updated: December 2024*
