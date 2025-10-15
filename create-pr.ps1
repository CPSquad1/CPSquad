# CPSquad Footer PR - Automated Workflow

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "CPSquad Footer PR - Complete Workflow" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Fork Instructions
Write-Host "STEP 1: Fork the Repository" -ForegroundColor Yellow
Write-Host "----------------------------" -ForegroundColor Yellow
Write-Host "1. Open this URL in your browser:"
Write-Host "   https://github.com/CPSquad1/CPSquad" -ForegroundColor Green
Write-Host ""
Write-Host "2. Click the 'Fork' button (top-right corner)"
Write-Host ""
Write-Host "3. Wait for GitHub to create your fork"
Write-Host ""
Write-Host "Press any key when fork is created..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host ""
Write-Host "STEP 2: Add Your Fork as Remote" -ForegroundColor Yellow
Write-Host "--------------------------------" -ForegroundColor Yellow
Set-Location "e:\CP\CPSquad"

# Check if myfork remote exists
$remotes = git remote
if ($remotes -contains "myfork") {
    Write-Host "Removing existing myfork remote..." -ForegroundColor Gray
    git remote remove myfork
}

git remote add myfork https://github.com/Brij123179/CPSquad.git
Write-Host "✅ Fork remote added!" -ForegroundColor Green
Write-Host ""

# Step 3: Push to fork
Write-Host "STEP 3: Push to Your Fork" -ForegroundColor Yellow
Write-Host "--------------------------" -ForegroundColor Yellow
Write-Host "Pushing branch to your fork..." -ForegroundColor Gray
Write-Host ""

git push -u myfork add-footer-component

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "⚠️ Push failed! You may need to authenticate." -ForegroundColor Red
    Write-Host ""
    Write-Host "To create a Personal Access Token:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://github.com/settings/tokens" -ForegroundColor Green
    Write-Host "2. Click 'Generate new token (classic)'"
    Write-Host "3. Name it: 'CPSquad PR'"
    Write-Host "4. Select scope: repo (check the box)"
    Write-Host "5. Click 'Generate token' and COPY it"
    Write-Host "6. When prompted for password, use the token (not your GitHub password)"
    Write-Host ""
    Write-Host "Then run this script again." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "✅ Branch pushed successfully!" -ForegroundColor Green
Write-Host ""

# Step 4: PR Instructions
Write-Host "STEP 4: Create Pull Request" -ForegroundColor Yellow
Write-Host "----------------------------" -ForegroundColor Yellow
Write-Host "1. Go to: https://github.com/CPSquad1/CPSquad" -ForegroundColor Green
Write-Host "2. Click 'Compare & pull request' button"
Write-Host ""
Write-Host "3. Use this TITLE:" -ForegroundColor Cyan
Write-Host "   feat: Add Footer with Club Info, Quick Links & Social Media" -ForegroundColor White
Write-Host ""
Write-Host "4. Copy the description from PR_INSTRUCTIONS.md"
Write-Host ""
Write-Host "5. Click 'Create pull request'"
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🎉 All Done! Check your browser!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Optional: Open browser
$openBrowser = Read-Host "Open GitHub in browser now? (y/n)"
if ($openBrowser -eq "y" -or $openBrowser -eq "Y") {
    Start-Process "https://github.com/CPSquad1/CPSquad"
}

Write-Host ""
Read-Host "Press Enter to exit"
