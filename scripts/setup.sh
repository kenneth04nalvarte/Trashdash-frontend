#!/bin/bash

# TrashDash Frontend Setup Script
# This script sets up the complete TrashDash frontend monorepo

set -e

echo "🚀 Setting up TrashDash Frontend..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18 or higher."
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18 or higher is required. Current version: $(node -v)"
        exit 1
    fi
    
    print_success "Node.js version: $(node -v)"
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
    
    print_success "npm version: $(npm -v)"
}

# Install dependencies
install_dependencies() {
    print_status "Installing root dependencies..."
    npm install
    
    print_status "Installing workspace dependencies..."
    npm run install:workspaces
    
    print_success "All dependencies installed successfully!"
}

# Build packages
build_packages() {
    print_status "Building shared packages..."
    
    # Build API package
    print_status "Building @trashdash/api..."
    cd packages/api
    npm run build
    cd ../..
    
    print_success "All packages built successfully!"
}

# Setup environment files
setup_env() {
    print_status "Setting up environment files..."
    
    # Copy example env file if it doesn't exist
    if [ ! -f .env ]; then
        cp env.example .env
        print_warning "Created .env file from env.example. Please update with your actual values."
    else
        print_status ".env file already exists."
    fi
    
    # Create app-specific env files
    for app in customer dasher admin; do
        if [ ! -f "apps/$app/.env.local" ]; then
            cp env.example "apps/$app/.env.local"
            print_status "Created apps/$app/.env.local"
        fi
    done
}

# Setup Git hooks
setup_git_hooks() {
    print_status "Setting up Git hooks..."
    
    # Create .gitignore if it doesn't exist
    if [ ! -f .gitignore ]; then
        cat > .gitignore << EOF
# Dependencies
node_modules/
.pnp
.pnp.js

# Production builds
dist/
build/
.next/
out/

# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Editor directories and files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Firebase
.firebase/
firebase-debug.log
firestore-debug.log

# Testing
coverage/
.nyc_output/

# Misc
*.log
*.tsbuildinfo
EOF
        print_success "Created .gitignore file"
    fi
}

# Create basic documentation
create_docs() {
    print_status "Creating documentation..."
    
    mkdir -p docs
    
    # Create API documentation
    cat > docs/api.md << EOF
# API Documentation

## Overview
This document describes the API integration for TrashDash applications.

## Authentication
All API requests require authentication via JWT tokens.

## Endpoints
- \`POST /auth/login\` - User login
- \`POST /auth/register\` - User registration
- \`GET /auth/profile\` - Get user profile
- \`PUT /auth/profile\` - Update user profile

## Error Handling
All API responses follow a standard format:
\`\`\`json
{
  "success": boolean,
  "data": any,
  "message": string,
  "error": string
}
\`\`\`
EOF

    # Create deployment guide
    cat > docs/deployment.md << EOF
# Deployment Guide

## Prerequisites
- Node.js 18+
- npm 9+
- Git

## Environment Setup
1. Copy \`env.example\` to \`.env\`
2. Update environment variables with your values
3. Configure Firebase, Google Maps, and Stripe

## Build Commands
\`\`\`bash
# Build all applications
npm run build:all

# Build individual apps
npm run build:customer
npm run build:dasher
npm run build:admin
\`\`\`

## Deployment Platforms
- **Vercel**: Recommended for web applications
- **Expo**: For mobile applications
- **AWS Amplify**: Alternative cloud deployment
EOF

    print_success "Documentation created in docs/ directory"
}

# Main setup function
main() {
    print_status "Starting TrashDash Frontend setup..."
    
    # Check prerequisites
    check_node
    check_npm
    
    # Install dependencies
    install_dependencies
    
    # Build packages
    build_packages
    
    # Setup environment
    setup_env
    
    # Setup Git hooks
    setup_git_hooks
    
    # Create documentation
    create_docs
    
    print_success "🎉 TrashDash Frontend setup completed successfully!"
    echo ""
    print_status "Next steps:"
    echo "1. Update .env file with your API keys and configuration"
    echo "2. Run 'npm run dev:customer' to start the customer app"
    echo "3. Run 'npm run dev:dasher' to start the dasher app"
    echo "4. Run 'npm run dev:admin' to start the admin panel"
    echo ""
    print_status "For more information, see the README.md file"
}

# Run main function
main "$@" 