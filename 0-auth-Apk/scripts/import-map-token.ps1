param(
    [string]$Source = (Join-Path $PSScriptRoot '..\..\token.json'),
    [string]$Destination = (Join-Path $PSScriptRoot '..\config\token.json')
)

$ErrorActionPreference = 'Stop'
$sourcePath = (Resolve-Path -LiteralPath $Source).Path
$destinationPath = [System.IO.Path]::GetFullPath($Destination)
$sourceConfig = Get-Content -Raw -Encoding utf8 -LiteralPath $sourcePath | ConvertFrom-Json

# Keep the same public resource schema as the SDK token.example.json while
# excluding serverToken, mapbox.serverToken and every unknown top-level field.
$sourceDemo = $sourceConfig.demo
$sourceTerrain = $sourceDemo.terrain
$safeBasemaps = @()
foreach ($item in @($sourceDemo.basemaps)) {
    if ($null -eq $item) { continue }
    $safeItem = [ordered]@{
        id = [string]$item.id
        name = [string]$item.name
        type = [string]$item.type
    }
    if ($item.type -eq 'xyz') {
        $safeItem.url = [string]$item.url
        $safeItem.scheme = if ($item.scheme -eq 'tms') { 'tms' } else { 'xyz' }
        if ($null -ne $item.minLevel) { $safeItem.minLevel = [int]$item.minLevel }
        $safeItem.maxLevel = if ($null -ne $item.maxLevel) { [int]$item.maxLevel } else { 20 }
        $safeItem.levelOffset = if ($null -ne $item.levelOffset) { [double]$item.levelOffset } else { -1.7 }
        $safeItem.attribution = [string]$item.attribution
    } elseif ($item.type -eq 'vector-style') {
        $safeItem.style = [string]$item.style
        $safeItem.sourceId = [string]$item.sourceId
        $safeItem.symbols = $item.symbols -ne $false
        $safeItem.levelOffset = if ($null -ne $item.levelOffset) { [double]$item.levelOffset } else { -1.7 }
        $safeItem.attribution = [string]$item.attribution
    } else {
        continue
    }
    $safeBasemaps += [pscustomobject]$safeItem
}

$apkConfig = [ordered]@{
    tianditu = [ordered]@{
        token = [string]$sourceConfig.tianditu.token
    }
    maptiler = [ordered]@{
        key = [string]$sourceConfig.maptiler.key
    }
    geovis = [ordered]@{
        terrainToken = [string]$sourceConfig.geovis.terrainToken
    }
    osm = [ordered]@{
        rasterUrl = [string]$sourceConfig.osm.rasterUrl
        styleUrl = [string]$sourceConfig.osm.styleUrl
        attribution = if ($sourceConfig.osm.attribution) { [string]$sourceConfig.osm.attribution } else { '© OpenStreetMap contributors' }
    }
    demo = [ordered]@{
        defaultBaseMap = [string]$sourceDemo.defaultBaseMap
        basemaps = $safeBasemaps
        terrain = [ordered]@{
            tileJsonUrl = [string]$sourceTerrain.tileJsonUrl
            urlTemplates = @($sourceTerrain.urlTemplates)
            encoding = if ($sourceTerrain.encoding -eq 'terrarium') { 'terrarium' } else { 'mapbox' }
            scheme = if ($sourceTerrain.scheme -eq 'tms') { 'tms' } else { 'xyz' }
            maxLevel = if ($null -ne $sourceTerrain.maxLevel) { [int]$sourceTerrain.maxLevel } else { 14 }
            attribution = if ($sourceTerrain.attribution) { [string]$sourceTerrain.attribution } else { '用户提供 DEM' }
        }
    }
}

$destinationDirectory = Split-Path -Parent $destinationPath
if (-not (Test-Path -LiteralPath $destinationDirectory)) {
    New-Item -ItemType Directory -Path $destinationDirectory | Out-Null
}
$json = $apkConfig | ConvertTo-Json -Depth 8
[System.IO.File]::WriteAllText($destinationPath, $json + [Environment]::NewLine, [System.Text.UTF8Encoding]::new($false))
Write-Host 'APK map token configuration imported with the standard public resource schema.'
