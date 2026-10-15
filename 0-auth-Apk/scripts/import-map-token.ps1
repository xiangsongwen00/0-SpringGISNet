param(
    [string]$Source = (Join-Path $PSScriptRoot '..\..\token.json'),
    [string]$Destination = (Join-Path $PSScriptRoot '..\config\token.json')
)

$ErrorActionPreference = 'Stop'
$sourcePath = (Resolve-Path -LiteralPath $Source).Path
$destinationPath = [System.IO.Path]::GetFullPath($Destination)
$sourceConfig = Get-Content -Raw -Encoding utf8 -LiteralPath $sourcePath | ConvertFrom-Json

# Only public, browser-safe map fields may enter an APK. In particular, do not
# copy serverToken, mapbox.serverToken, database credentials, or API secrets.
$apkConfig = [ordered]@{
    tianditu = [ordered]@{
        token = [string]$sourceConfig.tianditu.token
    }
    google = [ordered]@{
        satelliteUrl = [string]$sourceConfig.google.satelliteUrl
        scheme = if ($sourceConfig.google.scheme) { [string]$sourceConfig.google.scheme } else { 'xyz' }
        minLevel = if ($null -ne $sourceConfig.google.minLevel) { [int]$sourceConfig.google.minLevel } else { 0 }
        maxLevel = if ($null -ne $sourceConfig.google.maxLevel) { [int]$sourceConfig.google.maxLevel } else { 20 }
        levelOffset = if ($null -ne $sourceConfig.google.levelOffset) { [double]$sourceConfig.google.levelOffset } else { -1.7 }
        attribution = if ($sourceConfig.google.attribution) { [string]$sourceConfig.google.attribution } else { 'Google Satellite (authorised source)' }
    }
    maptiler = [ordered]@{
        key = [string]$sourceConfig.maptiler.key
    }
    geovis = [ordered]@{
        terrainToken = [string]$sourceConfig.geovis.terrainToken
    }
    demo = [ordered]@{
        defaultBaseMap = if ($sourceConfig.demo.defaultBaseMap) { [string]$sourceConfig.demo.defaultBaseMap } else { 'tianditu-imagery' }
        terrain = [ordered]@{
            tileJsonUrl = [string]$sourceConfig.demo.terrain.tileJsonUrl
            urlTemplates = @($sourceConfig.demo.terrain.urlTemplates)
            encoding = if ($sourceConfig.demo.terrain.encoding) { [string]$sourceConfig.demo.terrain.encoding } else { 'mapbox' }
            scheme = if ($sourceConfig.demo.terrain.scheme) { [string]$sourceConfig.demo.terrain.scheme } else { 'xyz' }
            minLevel = if ($null -ne $sourceConfig.demo.terrain.minLevel) { [int]$sourceConfig.demo.terrain.minLevel } else { 0 }
            maxLevel = if ($null -ne $sourceConfig.demo.terrain.maxLevel) { [int]$sourceConfig.demo.terrain.maxLevel } else { 14 }
            attribution = if ($sourceConfig.demo.terrain.attribution) { [string]$sourceConfig.demo.terrain.attribution } else { '用户提供 DEM' }
        }
    }
}

$destinationDirectory = Split-Path -Parent $destinationPath
if (-not (Test-Path -LiteralPath $destinationDirectory)) {
    New-Item -ItemType Directory -Path $destinationDirectory | Out-Null
}
$json = $apkConfig | ConvertTo-Json -Depth 8
[System.IO.File]::WriteAllText($destinationPath, $json + [Environment]::NewLine, [System.Text.UTF8Encoding]::new($false))
Write-Host 'APK map token configuration imported. Server-only fields were excluded.'
