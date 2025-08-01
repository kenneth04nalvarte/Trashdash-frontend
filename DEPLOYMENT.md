# 🚀 TrashDash Frontend Deployment Guide

This guide covers deploying all TrashDash frontend applications (Customer, Dasher, Admin) to production.

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- TrashDash backend deployed and accessible
- Environment variables configured
- Domain names and SSL certificates ready

## 🏗️ Project Structure

```
TrashDash-frontend/
├── apps/
│   ├── customer/          # Next.js Customer App (Port 3000)
│   ├── dasher/           # React Native/Expo Dasher App
│   └── admin/            # Next.js Admin Panel (Port 3002)
├── packages/
│   ├── api/              # Shared API integration
│   ├── ui/               # Shared UI components
│   └── shared/           # Shared utilities
└── scripts/
    └── setup.sh          # Automated setup script
```

## 🔧 Environment Configuration

### 1. Customer App Environment

Create `apps/customer/.env.production`:
```env
NEXT_PUBLIC_API_URL=https://api.trashdash.com/api
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
NEXT_PUBLIC_FIREBASE_CONFIG=your_firebase_config
```

### 2. Dasher App Environment

Create `apps/dasher/.env.production`:
```env
EXPO_PUBLIC_API_URL=https://api.trashdash.com/api
EXPO_PUBLIC_ENVIRONMENT=production
EXPO_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key
EXPO_PUBLIC_FIREBASE_CONFIG=your_firebase_config
```

### 3. Admin Panel Environment

Create `apps/admin/.env.production`:
```env
NEXT_PUBLIC_API_URL=https://api.trashdash.com/api
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## 🚀 Deployment Methods

### Method 1: Vercel (Recommended for Web Apps)

#### Customer App Deployment

1. **Connect to Vercel:**
   ```bash
   cd apps/customer
   npx vercel --prod
   ```

2. **Configure Environment Variables in Vercel Dashboard:**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.production`

3. **Custom Domain Setup:**
   - Add domain: `customer.trashdash.com`
   - Configure DNS records
   - Enable SSL certificate

#### Admin Panel Deployment

1. **Deploy to Vercel:**
   ```bash
   cd apps/admin
   npx vercel --prod
   ```

2. **Configure Environment Variables**
3. **Setup Domain:** `admin.trashdash.com`

### Method 2: Netlify

#### Customer App Deployment

1. **Build the app:**
   ```bash
   cd apps/customer
   npm run build
   ```

2. **Deploy to Netlify:**
   - Drag `out` folder to Netlify
   - Or use Netlify CLI: `netlify deploy --prod`

3. **Configure Environment Variables**
4. **Setup Custom Domain**

### Method 3: Traditional Hosting

#### Customer App Deployment

1. **Build for production:**
   ```bash
   cd apps/customer
   npm run build
   npm run export  # Static export
   ```

2. **Upload to server:**
   ```bash
   # Upload out/ directory to web server
   scp -r out/ user@server:/var/www/customer.trashdash.com/
   ```

3. **Configure Nginx:**
   ```nginx
   server {
       listen 80;
       server_name customer.trashdash.com;
       
       location / {
           root /var/www/customer.trashdash.com;
           try_files $uri $uri/ /index.html;
       }
   }
   ```

## 📱 Dasher App Deployment

### Expo Application Services (EAS)

1. **Install EAS CLI:**
   ```bash
   npm install -g @expo/eas-cli
   ```

2. **Configure EAS:**
   ```bash
   cd apps/dasher
   eas build:configure
   ```

3. **Build for production:**
   ```bash
   # Android APK
   eas build --platform android --profile production
   
   # iOS IPA
   eas build --platform ios --profile production
   ```

4. **Submit to stores:**
   ```bash
   # Google Play Store
   eas submit --platform android
   
   # Apple App Store
   eas submit --platform ios
   ```

### Alternative: React Native CLI

1. **Build Android APK:**
   ```bash
   cd apps/dasher
   npx react-native run-android --variant=release
   ```

2. **Build iOS:**
   ```bash
   cd apps/dasher
   npx react-native run-ios --configuration Release
   ```

## 🔒 Security Configuration

### 1. HTTPS Setup

Ensure all web applications use HTTPS:

```nginx
server {
    listen 443 ssl http2;
    server_name customer.trashdash.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

### 2. CORS Configuration

Update backend CORS settings for production domains:

```javascript
// Backend CORS configuration
const allowedOrigins = [
  'https://customer.trashdash.com',
  'https://admin.trashdash.com',
  'https://trashdash.com'
];
```

### 3. Environment Variable Security

- Never commit `.env` files to version control
- Use environment-specific files (`.env.production`)
- Rotate API keys regularly
- Use secrets management services

## 📊 Monitoring & Analytics

### 1. Application Monitoring

#### Vercel Analytics
```bash
# Enable Vercel Analytics
npx vercel analytics enable
```

#### Custom Analytics
```javascript
// Google Analytics 4
gtag('config', 'GA_MEASUREMENT_ID');

// Error tracking with Sentry
Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: 'production'
});
```

### 2. Performance Monitoring

#### Core Web Vitals
- Monitor LCP, FID, CLS
- Use Lighthouse CI
- Set up performance budgets

#### API Monitoring
- Monitor API response times
- Set up alerts for 4xx/5xx errors
- Track API usage metrics

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy TrashDash Frontend

on:
  push:
    branches: [main]

jobs:
  deploy-customer:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd apps/customer
          npm install
      
      - name: Build
        run: |
          cd apps/customer
          npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.API_URL }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./apps/customer
```

## 🧪 Testing Before Deployment

### 1. Local Testing

```bash
# Test customer app
cd apps/customer
npm run build
npm run start

# Test admin panel
cd apps/admin
npm run build
npm run start

# Test dasher app
cd apps/dasher
npx expo start --no-dev --minify
```

### 2. Staging Environment

1. Deploy to staging first
2. Test all user flows
3. Verify API integration
4. Check performance metrics
5. Test on different devices/browsers

### 3. Production Checklist

- [ ] All environment variables set
- [ ] SSL certificates installed
- [ ] Custom domains configured
- [ ] CORS settings updated
- [ ] Analytics tracking enabled
- [ ] Error monitoring configured
- [ ] Performance optimized
- [ ] Security headers set
- [ ] Mobile responsiveness tested
- [ ] Cross-browser compatibility verified

## 🚨 Rollback Plan

### Quick Rollback Steps

1. **Vercel Rollback:**
   ```bash
   npx vercel rollback
   ```

2. **Manual Rollback:**
   - Revert to previous git commit
   - Redeploy with previous configuration
   - Update DNS if needed

3. **Database Rollback:**
   - Restore from backup if needed
   - Coordinate with backend team

## 📞 Support & Maintenance

### Monitoring Tools

- **Vercel Analytics** - Performance monitoring
- **Sentry** - Error tracking
- **Google Analytics** - User behavior
- **Uptime Robot** - Availability monitoring

### Maintenance Tasks

- Weekly dependency updates
- Monthly security audits
- Quarterly performance reviews
- Annual SSL certificate renewal

### Emergency Contacts

- **Frontend Team** - UI/UX issues
- **Backend Team** - API integration issues
- **DevOps Team** - Infrastructure issues
- **Security Team** - Security incidents

---

## 🎯 Quick Deployment Commands

```bash
# Customer App (Vercel)
cd apps/customer && npx vercel --prod

# Admin Panel (Vercel)
cd apps/admin && npx vercel --prod

# Dasher App (EAS)
cd apps/dasher && eas build --platform all --profile production

# Traditional Hosting
cd apps/customer && npm run build && npm run export
```

**TrashDash Frontend** - Deployed and ready to serve! 🚀 