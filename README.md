# TrashDash Frontend

A comprehensive frontend solution for the TrashDash platform, featuring three main applications:

- **Customer App** - For homeowners who need trash bin services
- **Dasher App** - For gig workers who perform trash bin services  
- **Admin Panel** - For platform operators and managers

## 🏗️ Project Structure

```
trashdash-frontend/
├── apps/
│   ├── customer/          # Customer web/mobile app
│   ├── dasher/           # Dasher mobile app
│   └── admin/            # Admin web panel
├── packages/
│   ├── shared/           # Shared components & utilities
│   ├── api/              # API integration layer
│   └── ui/               # Design system & UI components
├── docs/                 # Documentation
└── scripts/              # Build & deployment scripts
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd trashdash-frontend

# Install all dependencies
npm run install:all

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration
```

### Development

```bash
# Start customer app
npm run dev:customer

# Start dasher app  
npm run dev:dasher

# Start admin panel
npm run dev:admin

# Start all apps (in separate terminals)
npm run dev:all
```

### Building

```bash
# Build all applications
npm run build:all

# Build individual apps
npm run build:customer
npm run build:dasher
npm run build:admin
```

## 📱 Applications

### Customer App
- **URL**: http://localhost:3000
- **Purpose**: Homeowners booking trash bin services
- **Features**: Service booking, task tracking, payment management

### Dasher App
- **URL**: http://localhost:3001  
- **Purpose**: Gig workers performing services
- **Features**: Task management, location tracking, earnings dashboard

### Admin Panel
- **URL**: http://localhost:3002
- **Purpose**: Platform management and analytics
- **Features**: User management, task oversight, reporting

## 🛠️ Technology Stack

### Core Technologies
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Next.js** - React framework with SSR
- **React Native** - Mobile development (Dasher app)

### State Management
- **Zustand** - Lightweight state management
- **React Query** - Server state management

### UI & Styling
- **Ant Design** - Component library
- **Tailwind CSS** - Utility-first CSS
- **Styled Components** - CSS-in-JS

### Backend Integration
- **Axios** - HTTP client
- **Firebase** - Real-time features
- **JWT** - Authentication

### Maps & Location
- **Google Maps API** - Maps and geocoding
- **React Native Maps** - Mobile maps

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
REACT_APP_API_URL=https://api.trashdash.com
REACT_APP_API_VERSION=v1

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id

# Google Maps
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Payment Gateway
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Analytics
REACT_APP_GA_TRACKING_ID=your_ga_tracking_id
```

## 📦 Shared Packages

### @trashdash/shared
Common utilities, types, and constants used across all applications.

### @trashdash/api
API integration layer with authentication, error handling, and request/response interceptors.

### @trashdash/ui
Reusable UI components and design system.

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 📊 Performance

- Lighthouse score > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Bundle size optimization

## 🔒 Security

- JWT token management
- Input validation
- XSS prevention
- HTTPS enforcement
- GDPR compliance

## 🚀 Deployment

### Web Applications (Customer & Admin)
- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**

### Mobile Application (Dasher)
- **Expo** (development)
- **App Store** & **Google Play** (production)

## 📚 Documentation

- [API Documentation](./docs/api.md)
- [Component Library](./docs/components.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guidelines](./docs/contributing.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**TrashDash Frontend** - Making trash management simple and efficient. 