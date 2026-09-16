$nodeDir = (Join-Path $PSScriptRoot 'node')
$env:PATH = "$nodeDir;$env:PATH"
& (Join-Path $nodeDir 'npm.cmd') $args
