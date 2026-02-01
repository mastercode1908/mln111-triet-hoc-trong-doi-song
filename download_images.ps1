param (
    [string]$Url,
    [string]$Prefix,
    [string]$OutputDir
)

# Create directory
if (!(Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null
}

# Download HTML
try {
    $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    $html = $response.Content
} catch {
    Write-Host "Error downloading URL: $_"
    exit 1
}

# Extract Image URLs (Simple Regex)
# Matches src="..." with common image extensions
$pattern = 'src=["''](https?://[^"'' >]+\.(?:jpg|jpeg|png|webp))["'']'
$matches = [regex]::Matches($html, $pattern)

$count = 1
$images = @()

foreach ($match in $matches) {
    $imgUrl = $match.Groups[1].Value
    
    # Filter out common junk (tracking pixels, small icons, etc if possible, but hard to do generic)
    if ($imgUrl -match "icon" -or $imgUrl -match "logo" -or $imgUrl -match "pixel") { continue }

    # Generate local filename
    $ext = [IO.Path]::GetExtension($imgUrl)
    if ($ext -notmatch "\.(jpg|jpeg|png|webp)") { $ext = ".jpg" }
    $localName = "${Prefix}-${count}${ext}"
    $localPath = Join-Path $OutputDir $localName

    # Check if already downloaded (simple dedupe based on URL processing order)
    if (!($images | Where-Object { $_.Original -eq $imgUrl })) {
        try {
            Invoke-WebRequest -Uri $imgUrl -OutFile $localPath -ErrorAction SilentlyContinue
            $images += [PSCustomObject]@{
                Original = $imgUrl
                Local = $localName
            }
            Write-Host "Downloaded: $imgUrl -> $localName"
            $count++
        } catch {
            Write-Host "Failed to download: $imgUrl"
        }
    }
}

# Return list of images
$images | ConvertTo-Json
