# Quick start for LUNAR (Go backend + Vite frontend + Firebase)

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendPath = Join-Path $projectRoot "Backend"
$frontendPath = Join-Path $projectRoot "Frontend"

Write-Host ""
Write-Host "LUNAR - Quick Start" -ForegroundColor Cyan
Write-Host "Project: $projectRoot" -ForegroundColor Yellow
Write-Host ""

if (-not (Test-Path $backendPath)) { Write-Host "Backend folder missing." -ForegroundColor Red; exit 1 }
if (-not (Test-Path $frontendPath)) { Write-Host "Frontend folder missing." -ForegroundColor Red; exit 1 }

Write-Host "1) Start Backend (Go, default port 5000)" -ForegroundColor Cyan
Write-Host "2) Start Frontend (Vite, port 5173)" -ForegroundColor Cyan
Write-Host "3) Open two terminals: instructions for both" -ForegroundColor Cyan
Write-Host "4) Copy .env.example to .env at repo root (if missing)" -ForegroundColor Cyan
Write-Host "5) Test GET http://localhost:5000/health" -ForegroundColor Cyan
Write-Host ""

$choice = Read-Host "Choice (1-5)"

switch ($choice) {
    "1" {
        Set-Location $backendPath
        Write-Host "Starting Go API from Backend/ (loads ../.env then .env)..." -ForegroundColor Green
        go run ./cmd/main.go
    }
    "2" {
        Set-Location $frontendPath
        if (-not (Test-Path (Join-Path $frontendPath "node_modules"))) {
            npm install
        }
        Write-Host "Starting Vite (env from repo root via envDir)..." -ForegroundColor Green
        npm run dev
    }
    "3" {
        Write-Host ""
        Write-Host "Terminal A: cd Backend; go run ./cmd/main.go" -ForegroundColor White
        Write-Host "Terminal B: cd Frontend; npm install; npm run dev" -ForegroundColor White
        Write-Host "Copy .env.example to Lunar/.env and set FIREBASE_SERVICE_ACCOUNT + JWT_SECRET." -ForegroundColor Yellow
        Read-Host "Press Enter to start Backend in this window"
        Set-Location $backendPath
        go run ./cmd/main.go
    }
    "4" {
        $example = Join-Path $projectRoot ".env.example"
        $target = Join-Path $projectRoot ".env"
        if (-not (Test-Path $example)) {
            Write-Host ".env.example not found at repo root." -ForegroundColor Red
            exit 1
        }
        if (Test-Path $target) {
            Write-Host ".env already exists: $target" -ForegroundColor Yellow
            exit 0
        }
        Copy-Item $example $target
        Write-Host "Created $target — edit FIREBASE_SERVICE_ACCOUNT and JWT_SECRET." -ForegroundColor Green
    }
    "5" {
        try {
            $r = Invoke-WebRequest -Uri "http://localhost:5000/health" -UseBasicParsing
            Write-Host "OK: $($r.StatusCode)" -ForegroundColor Green
            Write-Host $r.Content
        } catch {
            Write-Host "Backend not reachable. Start with option 1." -ForegroundColor Red
            Write-Host $_
        }
    }
    default {
        Write-Host "Invalid choice." -ForegroundColor Red
    }
}
