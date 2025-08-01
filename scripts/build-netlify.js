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

  // Create index.html files for SPA routing
  createIndexFile(path.join(customerDistDir, 'index.html'), 'Customer App');
  createIndexFile(path.join(adminDistDir, 'index.html'), 'Admin App');

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

function createIndexFile(filePath, title) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - TrashDash</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            text-align: center;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
        }
        p {
            color: #666;
            margin-bottom: 30px;
        }
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>${title}</h1>
        <p>Loading application...</p>
        <div class="loading"></div>
    </div>
    <script>
        // Redirect to the actual app
        window.location.href = window.location.pathname.replace('/index.html', '');
    </script>
</body>
</html>`;

  fs.writeFileSync(filePath, html);
} 