# TrashDash Customer App

A Next.js application for TrashDash customers to manage their trash bin services.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- TrashDash backend running on `http://localhost:3001`

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Create .env.local file
   echo "NEXT_PUBLIC_API_URL=http://localhost:3001/api" > .env.local
   echo "NEXT_PUBLIC_ENVIRONMENT=development" >> .env.local
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication

### Test Credentials
Use these credentials to test the application:

- **Email:** `customer@trashdash.com`
- **Password:** `password123`

### Features
- ✅ User registration and login
- ✅ JWT token authentication
- ✅ Protected dashboard
- ✅ Real-time API integration
- ✅ Responsive design with Ant Design
- ✅ Tailwind CSS styling

## 📱 Pages

- **`/`** - Redirects to login or dashboard
- **`/auth/login`** - User login page
- **`/auth/register`** - User registration page
- **`/dashboard`** - Main dashboard (protected)

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── services/              # API services
│   ├── api.ts            # API configuration
│   └── authService.ts    # Authentication service
└── stores/               # State management
    └── authStore.ts      # Authentication store
```

## 🔧 Configuration

### Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (default: `http://localhost:3001/api`)
- `NEXT_PUBLIC_ENVIRONMENT` - Environment (development/production)

### API Integration

The app connects to the TrashDash backend API with the following endpoints:

- **Authentication:** `/auth/login`, `/auth/register`, `/auth/logout`, `/auth/profile`
- **Customer:** `/customer/dashboard`, `/customer/addresses`, `/customer/service-requests`
- **Tasks:** `/tasks` (CRUD operations)
- **Addresses:** `/addresses` (CRUD operations)

## 🎨 Styling

- **Ant Design** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Custom theme** - Green color scheme for environmental focus

## 📦 Dependencies

### Core
- Next.js 14 (App Router)
- React 18
- TypeScript

### UI & Styling
- Ant Design
- Tailwind CSS
- @ant-design/nextjs-registry

### State Management & API
- Zustand (state management)
- Axios (HTTP client)
- React Query (server state)

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Environment Setup
Make sure to set the correct environment variables for production:
- `NEXT_PUBLIC_API_URL` - Production API URL
- `NEXT_PUBLIC_ENVIRONMENT=production`

## 🔍 Testing

The app is ready for integration testing with the TrashDash backend. Test the following flows:

1. **Registration** - Create a new customer account
2. **Login** - Authenticate with existing credentials
3. **Dashboard** - View customer statistics and recent tasks
4. **Logout** - Clear authentication and redirect to login

## 🐛 Troubleshooting

### Common Issues

1. **Backend Connection Error**
   - Ensure the TrashDash backend is running on `http://localhost:3001`
   - Check the `NEXT_PUBLIC_API_URL` environment variable

2. **Authentication Issues**
   - Clear browser localStorage
   - Generate fresh test tokens from the backend
   - Check JWT token expiration

3. **Build Errors**
   - Clear `.next` directory: `rm -rf .next`
   - Reinstall dependencies: `npm install`

## 📞 Support

For issues related to:
- **Frontend:** Check this README and the codebase
- **Backend:** Refer to the TrashDash backend documentation
- **API:** Test endpoints directly with curl or Postman

---

**TrashDash Customer App** - Making trash bin services simple and sustainable! 🌱 