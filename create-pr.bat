@echo off
echo ========================================
echo CPSquad Footer PR - Complete Workflow
echo ========================================
echo.

echo STEP 1: Fork the Repository
echo ----------------------------
echo 1. Open this URL in your browser:
echo    https://github.com/CPSquad1/CPSquad
echo.
echo 2. Click the "Fork" button (top-right corner)
echo.
echo 3. Wait for GitHub to create your fork
echo.
echo Press any key when fork is created...
pause > nul

echo.
echo STEP 2: Add Your Fork as Remote
echo --------------------------------
cd /d e:\CP\CPSquad
git remote add myfork https://github.com/Brij123179/CPSquad.git
echo Fork remote added!
echo.

echo STEP 3: Push to Your Fork
echo --------------------------
echo Pushing branch to your fork...
git push -u myfork add-footer-component
echo.

if %errorlevel% neq 0 (
    echo.
    echo ⚠️ Push failed! You may need to authenticate.
    echo.
    echo To create a Personal Access Token:
    echo 1. Go to: https://github.com/settings/tokens
    echo 2. Click "Generate new token (classic)"
    echo 3. Name it: "CPSquad PR"
    echo 4. Select scope: repo (check the box)
    echo 5. Click "Generate token" and COPY it
    echo 6. When prompted for password, use the token
    echo.
    echo Then run this script again.
    pause
    exit /b 1
)

echo.
echo ✅ Branch pushed successfully!
echo.
echo STEP 4: Create Pull Request
echo ----------------------------
echo 1. Go to: https://github.com/CPSquad1/CPSquad
echo 2. Click "Compare & pull request" button
echo.
echo 3. Use this TITLE:
echo    feat: Add Footer with Club Info, Quick Links & Social Media
echo.
echo 4. Copy the description from PR_INSTRUCTIONS.md
echo.
echo 5. Click "Create pull request"
echo.
echo ========================================
echo 🎉 All Done! Check your browser!
echo ========================================
pause
