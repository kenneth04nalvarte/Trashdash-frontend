# TrashDash Admin Panel

A comprehensive admin panel for managing the TrashDash platform, built with Next.js and Ant Design.

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
   Navigate to [http://localhost:3002](http://localhost:3002)

## 🔐 Authentication

### Admin Credentials
Use these credentials to access the admin panel:

- **Email:** `admin@trashdash.com`
- **Password:** `password123`

### Security Features
- ✅ Role-based access control (Admin only)
- ✅ JWT token authentication
- ✅ Secure session management
- ✅ Protected admin routes

## 📊 Dashboard Features

### Key Statistics
- **Total Users** - Platform user count
- **Active Dashers** - Currently working dashers
- **Total Revenue** - Platform revenue
- **Customer Satisfaction** - Average rating

### Analytics & Charts
- **Revenue Trend** - Line chart showing revenue over time
- **Task Status Distribution** - Pie chart of task statuses
- **Real-time Data** - Live updates from backend

### User Management
- **Recent Users** - Latest user registrations
- **User Status** - Active, pending, suspended
- **Role Management** - Customer, Dasher, Admin

### Task Oversight
- **Recent Tasks** - Latest service requests
- **Task Status** - Pending, in progress, completed
- **Dasher Assignment** - Task assignment tracking

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server (Port 3002)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Admin dashboard
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

The admin panel connects to the TrashDash backend with these endpoints:

- **Authentication:** `/auth/login`, `/auth/logout`, `/auth/profile`
- **Admin Dashboard:** `/admin/dashboard`, `/admin/analytics`
- **User Management:** `/admin/users` (CRUD operations)
- **Task Management:** `/admin/tasks` (CRUD operations)
- **Dasher Management:** `/admin/dashers` (CRUD operations)
- **Reports:** `/admin/reports/*` (Analytics and reports)

## 🎨 Design System

### Theme
- **Primary Color:** Dark gray (#1f2937)
- **Secondary Color:** Light gray (#f9fafb)
- **Accent Colors:** Green, blue, orange for status indicators

### Components
- **Ant Design** - Professional UI components
- **Recharts** - Interactive charts and graphs
- **Tailwind CSS** - Utility-first styling
- **Custom Admin Theme** - Dark professional look

## 📦 Dependencies

### Core
- Next.js 14 (App Router)
- React 18
- TypeScript

### UI & Charts
- Ant Design
- Recharts (for analytics)
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

The admin panel is ready for integration testing. Test the following flows:

1. **Admin Login** - Authenticate with admin credentials
2. **Dashboard Access** - View platform statistics and charts
3. **User Management** - View and manage platform users
4. **Task Oversight** - Monitor and manage service tasks
5. **Analytics** - View revenue and performance data

## 🐛 Troubleshooting

### Common Issues

1. **Backend Connection Error**
   - Ensure the TrashDash backend is running on `http://localhost:3001`
   - Check the `NEXT_PUBLIC_API_URL` environment variable

2. **Authentication Issues**
   - Verify admin credentials
   - Check JWT token format
   - Ensure admin role is assigned

3. **Chart Display Issues**
   - Check if Recharts is properly installed
   - Verify data format for charts

## 📞 Support

For issues related to:
- **Admin Panel:** Check this README and the codebase
- **Backend:** Refer to the TrashDash backend documentation
- **API:** Test endpoints directly with curl or Postman

---

**TrashDash Admin Panel** - Complete platform management at your fingertips! 🎯 