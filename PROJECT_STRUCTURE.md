# TrashDash Frontend - Project Structure

This document provides a comprehensive overview of the TrashDash frontend monorepo structure.

## 📁 Root Directory

```
trashdash-frontend/
├── 📄 package.json                 # Root package.json with workspace configuration
├── 📄 README.md                    # Main project documentation
├── 📄 PROJECT_STRUCTURE.md         # This file
├── 📄 env.example                  # Environment variables template
├── 📄 .gitignore                   # Git ignore rules
├── 📁 apps/                        # Application packages
├── 📁 packages/                    # Shared packages
├── 📁 docs/                        # Documentation
├── 📁 scripts/                     # Build and deployment scripts
└── 📁 .github/                     # GitHub workflows (if using GitHub)
```

## 📱 Applications (`apps/`)

### Customer App (`apps/customer/`)
**Purpose**: Web/mobile application for homeowners booking trash bin services

```
apps/customer/
├── 📄 package.json                 # Customer app dependencies
├── 📄 next.config.js              # Next.js configuration
├── 📄 tsconfig.json               # TypeScript configuration
├── 📄 tailwind.config.js          # Tailwind CSS configuration
├── 📁 src/
│   ├── 📁 app/                    # Next.js 13+ app directory
│   │   ├── 📄 layout.tsx          # Root layout
│   │   ├── 📄 page.tsx            # Home page
│   │   ├── 📄 globals.css         # Global styles
│   │   ├── 📁 auth/               # Authentication pages
│   │   │   ├── 📁 login/
│   │   │   │   └── 📄 page.tsx    # Login page
│   │   │   └── 📁 register/
│   │   │       └── 📄 page.tsx    # Registration page
│   │   ├── 📁 dashboard/
│   │   │   └── 📄 page.tsx        # Dashboard page
│   │   ├── 📁 book-service/
│   │   │   └── 📄 page.tsx        # Service booking page
│   │   ├── 📁 tasks/
│   │   │   ├── 📄 page.tsx        # Tasks list page
│   │   │   └── 📁 [id]/
│   │   │       └── 📄 page.tsx    # Task detail page
│   │   ├── 📁 addresses/
│   │   │   └── 📄 page.tsx        # Address management page
│   │   ├── 📁 payments/
│   │   │   └── 📄 page.tsx        # Payment management page
│   │   ├── 📁 profile/
│   │   │   └── 📄 page.tsx        # User profile page
│   │   └── 📁 settings/
│   │       └── 📄 page.tsx        # Settings page
│   ├── 📁 components/             # React components
│   │   ├── 📁 layout/             # Layout components
│   │   │   └── 📄 DashboardLayout.tsx
│   │   ├── 📁 ui/                 # UI components
│   │   │   ├── 📄 LoadingScreen.tsx
│   │   │   ├── 📄 Button.tsx
│   │   │   ├── 📄 Card.tsx
│   │   │   └── 📄 Modal.tsx
│   │   ├── 📁 forms/              # Form components
│   │   │   ├── 📄 LoginForm.tsx
│   │   │   ├── 📄 RegisterForm.tsx
│   │   │   └── 📄 ServiceBookingForm.tsx
│   │   ├── 📁 dashboard/          # Dashboard components
│   │   │   ├── 📄 StatsCard.tsx
│   │   │   ├── 📄 RecentTasks.tsx
│   │   │   └── 📄 QuickActions.tsx
│   │   └── 📁 providers/          # Context providers
│   │       └── 📄 Providers.tsx
│   ├── 📁 hooks/                  # Custom React hooks
│   │   ├── 📄 useAuth.ts
│   │   ├── 📄 useTasks.ts
│   │   └── 📄 useNotifications.ts
│   ├── 📁 utils/                  # Utility functions
│   │   ├── 📄 api.ts
│   │   ├── 📄 validation.ts
│   │   └── 📄 helpers.ts
│   └── 📁 types/                  # TypeScript type definitions
│       └── 📄 index.ts
└── 📁 public/                     # Static assets
    ├── 📄 favicon.ico
    ├── 📄 logo.png
    └── 📁 images/
```

### Dasher App (`apps/dasher/`)
**Purpose**: Mobile application for gig workers performing trash bin services

```
apps/dasher/
├── 📄 package.json                # Dasher app dependencies
├── 📄 app.json                    # Expo configuration
├── 📄 babel.config.js             # Babel configuration
├── 📄 tsconfig.json               # TypeScript configuration
├── 📁 src/
│   ├── 📁 screens/                # Screen components
│   │   ├── 📄 LoginScreen.tsx
│   │   ├── 📄 DashboardScreen.tsx
│   │   ├── 📄 TaskListScreen.tsx
│   │   ├── 📄 TaskDetailScreen.tsx
│   │   ├── 📄 MapScreen.tsx
│   │   ├── 📄 EarningsScreen.tsx
│   │   └── 📄 ProfileScreen.tsx
│   ├── 📁 components/             # React Native components
│   │   ├── 📁 ui/
│   │   ├── 📁 forms/
│   │   └── 📁 navigation/
│   ├── 📁 navigation/             # Navigation configuration
│   │   └── 📄 AppNavigator.tsx
│   ├── 📁 services/               # API services
│   ├── 📁 hooks/                  # Custom hooks
│   ├── 📁 utils/                  # Utility functions
│   └── 📁 types/                  # TypeScript types
└── 📁 assets/                     # Static assets
    ├── 📁 images/
    └── 📁 fonts/
```

### Admin Panel (`apps/admin/`)
**Purpose**: Web application for platform operators and managers

```
apps/admin/
├── 📄 package.json                # Admin app dependencies
├── 📄 next.config.js              # Next.js configuration
├── 📄 tsconfig.json               # TypeScript configuration
├── 📄 tailwind.config.js          # Tailwind CSS configuration
├── 📁 src/
│   ├── 📁 app/                    # Next.js app directory
│   │   ├── 📄 layout.tsx
│   │   ├── 📄 page.tsx
│   │   ├── 📁 dashboard/
│   │   ├── 📁 users/
│   │   ├── 📁 tasks/
│   │   ├── 📁 dashers/
│   │   ├── 📁 analytics/
│   │   └── 📁 settings/
│   ├── 📁 components/             # React components
│   │   ├── 📁 layout/
│   │   ├── 📁 ui/
│   │   ├── 📁 charts/             # Data visualization
│   │   ├── 📁 tables/             # Data tables
│   │   └── 📁 forms/              # Admin forms
│   ├── 📁 hooks/                  # Custom hooks
│   ├── 📁 utils/                  # Utility functions
│   └── 📁 types/                  # TypeScript types
└── 📁 public/                     # Static assets
```

## 📦 Shared Packages (`packages/`)

### API Package (`packages/api/`)
**Purpose**: API integration layer with authentication, services, and types

```
packages/api/
├── 📄 package.json                # API package dependencies
├── 📄 tsconfig.json               # TypeScript configuration
├── 📁 src/
│   ├── 📄 index.ts                # Main exports
│   ├── 📄 config.ts               # API configuration
│   ├── 📄 types.ts                # TypeScript types
│   ├── 📁 services/               # API services
│   │   ├── 📄 authService.ts      # Authentication service
│   │   ├── 📄 taskService.ts      # Task management service
│   │   ├── 📄 userService.ts      # User management service
│   │   ├── 📄 addressService.ts   # Address management service
│   │   ├── 📄 paymentService.ts   # Payment service
│   │   ├── 📄 notificationService.ts # Notification service
│   │   └── 📄 firebaseService.ts  # Firebase real-time service
│   ├── 📁 stores/                 # State management
│   │   ├── 📄 authStore.ts        # Authentication store
│   │   ├── 📄 taskStore.ts        # Task store
│   │   └── 📄 userStore.ts        # User store
│   └── 📁 utils/                  # Utility functions
│       ├── 📄 validation.ts       # Form validation
│       ├── 📄 formatting.ts       # Data formatting
│       └── 📄 constants.ts        # Application constants
└── 📁 dist/                       # Built package
```

### UI Package (`packages/ui/`)
**Purpose**: Reusable UI components and design system

```
packages/ui/
├── 📄 package.json                # UI package dependencies
├── 📄 tsconfig.json               # TypeScript configuration
├── 📁 src/
│   ├── 📄 index.ts                # Main exports
│   ├── 📁 components/             # UI components
│   │   ├── 📁 buttons/
│   │   ├── 📁 forms/
│   │   ├── 📁 cards/
│   │   ├── 📁 modals/
│   │   ├── 📁 navigation/
│   │   └── 📁 feedback/
│   ├── 📁 hooks/                  # UI hooks
│   ├── 📁 utils/                  # UI utilities
│   └── 📁 styles/                 # Styled components
└── 📁 dist/                       # Built package
```

### Shared Package (`packages/shared/`)
**Purpose**: Common utilities, constants, and types

```
packages/shared/
├── 📄 package.json                # Shared package dependencies
├── 📄 tsconfig.json               # TypeScript configuration
├── 📁 src/
│   ├── 📄 index.ts                # Main exports
│   ├── 📁 constants/              # Application constants
│   │   ├── 📄 api.ts
│   │   ├── 📄 routes.ts
│   │   └── 📄 config.ts
│   ├── 📁 utils/                  # Utility functions
│   │   ├── 📄 date.ts
│   │   ├── 📄 string.ts
│   │   ├── 📄 number.ts
│   │   └── 📄 validation.ts
│   ├── 📁 types/                  # Shared types
│   │   ├── 📄 common.ts
│   │   ├── 📄 api.ts
│   │   └── 📄 forms.ts
│   └── 📁 helpers/                # Helper functions
│       ├── 📄 storage.ts
│       ├── 📄 permissions.ts
│       └── 📄 analytics.ts
└── 📁 dist/                       # Built package
```

## 📚 Documentation (`docs/`)

```
docs/
├── 📄 api.md                      # API documentation
├── 📄 deployment.md               # Deployment guide
├── 📄 contributing.md             # Contributing guidelines
├── 📄 architecture.md             # System architecture
├── 📄 testing.md                  # Testing strategy
├── 📄 security.md                 # Security guidelines
└── 📁 assets/                     # Documentation assets
    └── 📁 images/
```

## 🔧 Scripts (`scripts/`)

```
scripts/
├── 📄 setup.sh                    # Initial setup script
├── 📄 build.sh                    # Build script
├── 📄 deploy.sh                   # Deployment script
├── 📄 test.sh                     # Testing script
└── 📄 lint.sh                     # Linting script
```

## 🚀 Key Features by Application

### Customer App Features
- ✅ User authentication (login/register)
- ✅ Dashboard with statistics
- ✅ Service booking wizard
- ✅ Task tracking and management
- ✅ Address management
- ✅ Payment processing
- ✅ Real-time notifications
- ✅ Profile management
- ✅ Settings and preferences

### Dasher App Features
- ✅ Dasher authentication
- ✅ Task acceptance and management
- ✅ Real-time location tracking
- ✅ Photo upload for task completion
- ✅ Earnings dashboard
- ✅ Route optimization
- ✅ Push notifications
- ✅ Profile and vehicle management

### Admin Panel Features
- ✅ Admin authentication
- ✅ User management (customers and dashers)
- ✅ Task oversight and management
- ✅ Analytics and reporting
- ✅ System configuration
- ✅ Payment management
- ✅ Notification management
- ✅ Performance monitoring

## 🛠️ Technology Stack

### Core Technologies
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Next.js 14** - React framework (Customer & Admin)
- **React Native** - Mobile development (Dasher)
- **Expo** - React Native development platform

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

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Cypress** - E2E testing

## 📱 Development Workflow

1. **Setup**: Run `./scripts/setup.sh` to initialize the project
2. **Development**: Use `npm run dev:customer|dasher|admin` to start apps
3. **Building**: Use `npm run build:all` to build all applications
4. **Testing**: Use `npm test` to run tests across all packages
5. **Deployment**: Use platform-specific deployment commands

## 🔄 Monorepo Benefits

- **Shared Code**: Common utilities and components across apps
- **Consistent Tooling**: Unified build, test, and deployment processes
- **Type Safety**: Shared TypeScript types across all applications
- **Efficient Development**: Single repository for all frontend code
- **Version Management**: Coordinated releases across all applications

This structure provides a scalable, maintainable foundation for the TrashDash frontend ecosystem. 