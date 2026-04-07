$content = Get-Content -Path "index.html" -Raw -Encoding UTF8

$content = $content -replace 'Smart Services GN', 'OC Business Center'
$content = $content -replace 'Smart Services', 'OC Business Center'
$content = $content -replace 'Smart Service', 'OC Business Center'

$content = $content -replace 'https://imagedelivery\.net/[a-zA-Z0-9_\-]+/[a-zA-Z0-9\-]+/publicContain', 'assets/logo.jpg'
$content = $content -replace 'https://facebook\.com/[^\"]+', 'https://web.facebook.com/profile.php?id=61585298978266'

Set-Content -Path "index.html" -Value $content -Encoding UTF8
Write-Host "Done replacing base branding."
