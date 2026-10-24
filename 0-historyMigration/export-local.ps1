param(
    [string]$SourceConfig = "E:\历史地理古籍整理\myHistorySys\.local\database.url",
    [string]$OutputDirectory = ".\export"
)
$ErrorActionPreference = 'Stop'
$output = [System.IO.Path]::GetFullPath($OutputDirectory)
New-Item -ItemType Directory -Force -Path $output | Out-Null
$dsn = (Get-Content -LiteralPath $SourceConfig -Raw -Encoding utf8).Trim()
if (-not $dsn) { throw "源数据库连接配置为空: $SourceConfig" }

$dump = Join-Path $output 'history-data.dump'
$manifest = Join-Path $output 'history-data.manifest'

& pg_dump --dbname=$dsn --schema=history --data-only --format=custom --compress=6 --no-owner --no-acl --file=$dump
if ($LASTEXITCODE -ne 0) { throw "pg_dump 导出失败" }

function Read-Count([string]$table) {
    $value = (& psql --dbname=$dsn --no-align --tuples-only --command="SELECT count(*) FROM history.$table").Trim()
    if ($LASTEXITCODE -ne 0 -or $value -notmatch '^\d+$') { throw "无法读取 $table 数量" }
    return $value
}

$hash = (Get-FileHash -LiteralPath $dump -Algorithm SHA256).Hash.ToLowerInvariant()
$lines = @(
    "DUMP_SHA256=$hash"
    "BOOKS=$(Read-Count 'books')"
    "CHAPTERS=$(Read-Count 'chapters')"
    "PARAGRAPHS=$(Read-Count 'paragraphs')"
    "CHARACTER_NOTES=$(Read-Count 'character_notes')"
    "CHAPTER_ASSETS=$(Read-Count 'chapter_assets')"
)
[System.IO.File]::WriteAllText($manifest, ($lines -join "`n") + "`n", [System.Text.UTF8Encoding]::new($false))
Write-Host "导出完成：$dump"
Write-Host "校验清单：$manifest"
Get-Content -LiteralPath $manifest
