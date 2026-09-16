$ErrorActionPreference = 'Stop'
$url = 'https://nodejs.org/dist/v20.18.0/node-v20.18.0-win-x64.zip'
$zipPath = Join-Path $PSScriptRoot 'node.zip'
$toolsDir = $PSScriptRoot

Write-Host "Downloading Node.js portable from $url ..."
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri $url -OutFile $zipPath

Write-Host "Extracting Node.js zip..."
Expand-Archive -Path $zipPath -DestinationPath $toolsDir -Force

$extractedDir = Join-Path $toolsDir 'node-v20.18.0-win-x64'
$finalDir = Join-Path $toolsDir 'node'

if (Test-Path $finalDir) {
    Remove-Item -Recurse -Force $finalDir
}

Move-Item -Path $extractedDir -Destination $finalDir -Force
Remove-Item -Force $zipPath

Write-Host "Verifying Node.js:"
& (Join-Path $finalDir 'node.exe') -v
& (Join-Path $finalDir 'npm.cmd') -v
Write-Host "Node.js setup successfully!"
