# 🚀 TrashDash Netlify Deployment Guide

This guide covers deploying the TrashDash frontend applications (Customer and Admin) to Netlify as a single project.

## 📋 Overview

- **Single Netlify Project**: Both customer and admin apps deployed from one repository
- **Path-based Routing**: 
  - Customer app: `https://your-domain.netlify.app/customer/`
  - Admin app: `https://your-domain.netlify.app/admin/`
- **Shared API**: Both apps connect to the same backend API

## 🏗️ Project Structure

```
TrashDash-frontend/
├── apps/
│   ├── customer/          # Next.js Customer App
│   └── admin/            # Next.js Admin Panel
├── packages/
│   └── api/              # Shared API integration
├── scripts/
│   └── build-netlify.js  # Custom build script
├── netlify.toml          # Netlify configuration
└── package.json          # Root package.json
```

## 🔧 Setup Instructions

### 1. Prepare Your Repository

Ensure your repository has the following files:
- `netlify.toml` - Netlify configuration
- `scripts/build-netlify.js` - Custom build script
- Updated `package.json` with build scripts

### 2. Configuration

The applications are pre-configured with:
- **Backend API**: `https://trashdash-backend-7188044708.us-central1.run.app/api`
- **Google Maps API Key**: `AIzaSyAtiOmzWU8hbyTn-mj0Dcc_c_9qH_I5zIE`

No environment variables are required for basic functionality.

### 3. Netlify Deployment Steps

#### Step 1: Connect Repository
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click "New site from Git"
3. Choose your Git provider (GitHub, GitLab, Bitbucket)
4. Select the `TrashDash-frontend` repository

#### Step 2: Configure Build Settings
- **Build command**: `npm run build:netlify`
- **Publish directory**: `dist`
- **Node version**: `18` (set in netlify.toml)

#### Step 3: Deploy
1. Click "Deploy site"
2. Wait for the build to complete
3. Your site will be available at the provided Netlify URL



## 🌐 URL Structure

After deployment, your applications will be available at:

- **Main Site**: `https://your-site-name.netlify.app/`
- **Customer App**: `https://your-site-name.netlify.app/customer/`
- **Admin App**: `https://your-site-name.netlify.app/admin/`

## 🔧 Custom Domain Setup

### Option 1: Single Domain with Paths
- **Domain**: `trashdash.com`
- **Customer**: `trashdash.com/customer/`
- **Admin**: `trashdash.com/admin/`

### Option 2: Subdomains (Advanced)
You can set up subdomains by creating separate Netlify sites or using redirects:

```toml
# In netlify.toml
[[redirects]]
  from = "https://customer.trashdash.com/*"
  to = "https://trashdash.com/customer/:splat"
  status = 301

[[redirects]]
  from = "https://admin.trashdash.com/*"
  to = "https://trashdash.com/admin/:splat"
  status = 301
```

## 🧪 Testing Your Deployment

### Local Testing
```bash
# Test the build process locally
npm run build:netlify

# Check the dist directory structure
ls -la dist/
```

### Production Testing
1. **Customer App**: Visit `/customer/` and test all features
2. **Admin App**: Visit `/admin/` and test admin functionality
3. **API Integration**: Verify both apps can connect to your backend
4. **Authentication**: Test login/logout flows
5. **Mobile Responsiveness**: Test on different devices

## 🔍 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Check if all dependencies are installed
npm install

# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build:netlify
```

#### Routing Issues
- Ensure `netlify.toml` redirects are correct
- Check that Next.js is configured for static export
- Verify the build script creates the correct directory structure

#### Environment Variables
- Check that all required variables are set in Netlify
- Verify variable names match what the apps expect
- Test with a simple variable first

### Debug Commands
```bash
# Check build output
npm run build:netlify

# Test individual apps
npm run build:customer
npm run build:admin

# Check file structure
tree dist/
```

## 📊 Monitoring & Analytics

### Netlify Analytics
- Enable Netlify Analytics in your site settings
- Monitor page views, unique visitors, and performance

### Custom Analytics
```javascript
// Add to your apps for custom tracking
gtag('config', 'GA_MEASUREMENT_ID', {
  page_path: window.location.pathname
});
```

## 🔄 Continuous Deployment

### Automatic Deploys
- Netlify automatically deploys on every push to main branch
- Preview deployments are created for pull requests
- Branch deployments for feature development

### Manual Deploys
```bash
# Trigger a manual deploy
netlify deploy --prod
```

## 🚨 Rollback Plan

### Quick Rollback
1. Go to Netlify Dashboard → Deploys
2. Find the previous successful deploy
3. Click "Publish deploy"

### Emergency Rollback
```bash
# Revert to previous commit
git revert HEAD
git push origin main
```

## 📞 Support

### Netlify Support
- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Community](https://community.netlify.com/)
- [Netlify Status](https://status.netlify.com/)

### TrashDash Support
- Check the main [DEPLOYMENT.md](./DEPLOYMENT.md) for general deployment info
- Review [README.md](./README.md) for project overview
- Check [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for architecture details

---

## 🎯 Quick Deploy Checklist

- [ ] Repository connected to Netlify
- [ ] Build command set to `npm run build:netlify`
- [ ] Publish directory set to `dist`
- [ ] Configuration verified (API and Google Maps)
- [ ] Custom domain set up (optional)
- [ ] SSL certificate enabled
- [ ] Both apps tested and working
- [ ] API integration verified
- [ ] Mobile responsiveness checked
- [ ] Analytics configured

**TrashDash** - Successfully deployed on Netlify! 🚀 