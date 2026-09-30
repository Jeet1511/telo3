# Telo3 Publishing Script
# Run this after npm login

Write-Host "🚀 Publishing Telo3 to npm..." -ForegroundColor Cyan

# Check if logged in
Write-Host "`nChecking npm authentication..." -ForegroundColor Yellow
npm whoami
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Not logged in to npm. Run: npm login" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Authenticated" -ForegroundColor Green

# Verify package
Write-Host "`nVerifying package contents..." -ForegroundColor Yellow
npm pack --dry-run

# Publish
Write-Host "`nPublishing to npm registry..." -ForegroundColor Yellow
npm publish

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Successfully published Telo3!" -ForegroundColor Green
    Write-Host "`nPackage available at: https://www.npmjs.com/package/telo3" -ForegroundColor Cyan
    Write-Host "Install with: npm install -g telo3" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Publishing failed" -ForegroundColor Red
    exit 1
}
