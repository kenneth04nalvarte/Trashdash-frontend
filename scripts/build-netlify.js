#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building TrashDash for Netlify deployment...');

// Ensure dist directory exists
const distDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

try {
  // Build customer app
  console.log('📱 Building customer app...');
  execSync('npm run build:customer', { 
    cwd: path.join(__dirname, '..'), 
    stdio: 'inherit' 
  });

  // Build admin app
  console.log('👨‍💼 Building admin app...');
  execSync('npm run build:admin', { 
    cwd: path.join(__dirname, '..'), 
    stdio: 'inherit' 
  });

  // Copy customer build to dist/customer
  const customerBuildDir = path.join(__dirname, '..', 'apps', 'customer', 'out');
  const customerDistDir = path.join(distDir, 'customer');
  
  if (fs.existsSync(customerBuildDir)) {
    fs.mkdirSync(customerDistDir, { recursive: true });
    copyDirectory(customerBuildDir, customerDistDir);
  }

  // Copy admin build to dist/admin
  const adminBuildDir = path.join(__dirname, '..', 'apps', 'admin', 'out');
  const adminDistDir = path.join(distDir, 'admin');
  
  if (fs.existsSync(adminBuildDir)) {
    fs.mkdirSync(adminDistDir, { recursive: true });
    copyDirectory(adminBuildDir, adminDistDir);
  }

  // Note: Next.js static export creates its own index.html files
  // No need to create custom ones

  console.log('✅ Build completed successfully!');
  console.log('📁 Output directory: dist/');
  console.log('🌐 Customer app: /customer/');
  console.log('👨‍💼 Admin app: /admin/');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Removed createIndexFile function as Next.js handles this automatically 