# Quick Start Script for LUNAR Application
# This script helps you start both backend and frontend servers

Write-Host ""
Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║        🌙 LUNAR - Quick Start Server Setup 🌙            ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Get project root
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendPath = Join-Path $projectRoot "Backend"
$frontendPath = Join-Path $projectRoot "Frontend"

Write-Host "📁 Project Path: $projectRoot" -ForegroundColor Yellow
Write-Host ""

# Check if folders exist
if (-not (Test-Path $backendPath)) {
    Write-Host "❌ Backend folder not found!" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $frontendPath)) {
    Write-Host "❌ Frontend folder not found!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Backend folder found: $backendPath" -ForegroundColor Green
Write-Host "✅ Frontend folder found: $frontendPath" -ForegroundColor Green
Write-Host ""

# Menu
Write-Host "┌─────────────────────────────────────────────────────────┐" -ForegroundColor Cyan
Write-Host "│ What would you like to do?                              │" -ForegroundColor Cyan
Write-Host "├─────────────────────────────────────────────────────────┤" -ForegroundColor Cyan
Write-Host "│ 1) Start Backend Server (Port 5000)                     │" -ForegroundColor Cyan
Write-Host "│ 2) Start Frontend Server (Port 5173)                    │" -ForegroundColor Cyan
Write-Host "│ 3) Start Both Servers (Requires 2 terminals)            │" -ForegroundColor Cyan
Write-Host "│ 4) Setup Backend (.env file)                            │" -ForegroundColor Cyan
Write-Host "│ 5) Test Backend Health                                  │" -ForegroundColor Cyan
Write-Host "│ 6) Seed Test Accounts                                   │" -ForegroundColor Cyan
Write-Host "└─────────────────────────────────────────────────────────┘" -ForegroundColor Cyan
Write-Host ""

$choice = Read-Host "Enter your choice (1-6)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🚀 Starting Backend Server..." -ForegroundColor Green
        Write-Host ""
        Write-Host "📂 Changing to Backend folder..." -ForegroundColor Yellow
        
        cd $backendPath
        
        Write-Host "📦 Checking dependencies..." -ForegroundColor Yellow
        if (-not (Test-Path "node_modules")) {
            Write-Host "Installing dependencies..." -ForegroundColor Yellow
            npm install
        }
        
        Write-Host ""
        Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
        Write-Host "║           Starting Backend on Port 5000                   ║" -ForegroundColor Cyan
        Write-Host "║        Press Ctrl+C to stop the server                    ║" -ForegroundColor Cyan
        Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
        Write-Host ""
        
        npm run dev
    }
    "2" {
        Write-Host ""
        Write-Host "🚀 Starting Frontend Server..." -ForegroundColor Green
        Write-Host ""
        Write-Host "📂 Changing to Frontend folder..." -ForegroundColor Yellow
        
        cd $frontendPath
        
        Write-Host "📦 Checking dependencies..." -ForegroundColor Yellow
        if (-not (Test-Path "node_modules")) {
            Write-Host "Installing dependencies..." -ForegroundColor Yellow
            npm install
        }
        
        Write-Host ""
        Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
        Write-Host "║          Starting Frontend on Port 5173                   ║" -ForegroundColor Cyan
        Write-Host "║        Press Ctrl+C to stop the server                    ║" -ForegroundColor Cyan
        Write-Host "║     🌐 Open browser: http://localhost:5173               ║" -ForegroundColor Cyan
        Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
        Write-Host ""
        
        npm run dev -- --force
    }
    "3" {
        Write-Host ""
        Write-Host "🚀 Starting Both Servers..." -ForegroundColor Green
        Write-Host ""
        Write-Host "⚠️  IMPORTANT: You need 2 separate terminals!" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Instructions:" -ForegroundColor Cyan
        Write-Host "1️⃣  In THIS terminal, I'll start the Backend" -ForegroundColor Cyan
        Write-Host "2️⃣  Open a NEW PowerShell window and run again, choose option 2" -ForegroundColor Cyan
        Write-Host ""
        
        Read-Host "Press Enter to start Backend Server..."
        
        cd $backendPath
        
        if (-not (Test-Path "node_modules")) {
            npm install
        }
        
        Write-Host ""
        Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
        Write-Host "║           Starting Backend on Port 5000                   ║" -ForegroundColor Cyan
        Write-Host "║                                                           ║" -ForegroundColor Cyan
        Write-Host "║  ✅ When you see 'Server running on port 5000':           ║" -ForegroundColor Cyan
        Write-Host "║     1. Open a NEW PowerShell window                       ║" -ForegroundColor Cyan
        Write-Host "║     2. Run this script again and choose option 2          ║" -ForegroundColor Cyan
        Write-Host "║                                                           ║" -ForegroundColor Cyan
        Write-Host "║     Press Ctrl+C to stop the backend                      ║" -ForegroundColor Cyan
        Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
        Write-Host ""
        
        npm run dev
    }
    "4" {
        Write-Host ""
        Write-Host "⚙️  Setting up Backend .env file..." -ForegroundColor Green
        Write-Host ""
        
        $envFile = Join-Path $backendPath ".env"
        
        if (Test-Path $envFile) {
            Write-Host "⚠️  .env file already exists!" -ForegroundColor Yellow
            $overwrite = Read-Host "Overwrite? (y/n)"
            if ($overwrite -ne "y") {
                Write-Host "Cancelled." -ForegroundColor Yellow
                exit 0
            }
        }
        
        $envContent = @"
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=lunar_db
JWT_SECRET=lunar_jwt_secret_key_2024
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
"@
        
        Set-Content -Path $envFile -Value $envContent
        
        Write-Host "✅ .env file created at: $envFile" -ForegroundColor Green
        Write-Host ""
        Write-Host "📝 Contents:" -ForegroundColor Cyan
        Write-Host $envContent -ForegroundColor White
        Write-Host ""
        Write-Host "⚠️  Make sure MySQL is running with these credentials:" -ForegroundColor Yellow
        Write-Host "   - Host: localhost" -ForegroundColor White
        Write-Host "   - User: root" -ForegroundColor White
        Write-Host "   - Password: 123456" -ForegroundColor White
    }
    "5" {
        Write-Host ""
        Write-Host "🧪 Testing Backend Health..." -ForegroundColor Green
        Write-Host ""
        
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:5000/health" -Method GET -ErrorAction Stop
            
            if ($response.StatusCode -eq 200) {
                Write-Host "✅ Backend is RUNNING!" -ForegroundColor Green
                Write-Host ""
                Write-Host "Response:" -ForegroundColor Cyan
                Write-Host ($response.Content | ConvertFrom-Json | ConvertTo-Json) -ForegroundColor White
            }
        }
        catch {
            Write-Host "❌ Backend is NOT running!" -ForegroundColor Red
            Write-Host ""
            Write-Host "Error: $_" -ForegroundColor Yellow
            Write-Host ""
            Write-Host "💡 Solution: Start backend with option 1" -ForegroundColor Cyan
        }
    }
    "6" {
        Write-Host ""
        Write-Host "👥 Seeding Test Accounts..." -ForegroundColor Green
        Write-Host ""
        
        cd $backendPath
        
        if (-not (Test-Path "node_modules")) {
            Write-Host "Installing dependencies first..." -ForegroundColor Yellow
            npm install
        }
        
        Write-Host "Running seed script..." -ForegroundColor Yellow
        npm run seed:users
        
        Write-Host ""
        Write-Host "✅ Test accounts created!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Use these credentials to login:" -ForegroundColor Cyan
        Write-Host "  Email: admin@lunar.com" -ForegroundColor White
        Write-Host "  Password: admin123456" -ForegroundColor White
        Write-Host ""
        Write-Host "  Email: user@lunar.com" -ForegroundColor White
        Write-Host "  Password: user123456" -ForegroundColor White
    }
    default {
        Write-Host "❌ Invalid choice. Please try again." -ForegroundColor Red
    }
}

Write-Host ""
