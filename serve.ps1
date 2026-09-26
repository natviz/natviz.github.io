$ErrorActionPreference = 'SilentlyContinue'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 8123
$url = "http://localhost:$port/"

$listener = $null
try {
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($url)
    $listener.Start()
} catch {
    $listener = $null
}

if ($null -eq $listener) {
    exit
}

$mime = @{
    '.html' = 'text/html; charset=utf-8'
    '.css'  = 'text/css; charset=utf-8'
    '.js'   = 'application/javascript'
    '.jpg'  = 'image/jpeg'
    '.jpeg' = 'image/jpeg'
    '.png'  = 'image/png'
    '.svg'  = 'image/svg+xml'
    '.ico'  = 'image/x-icon'
}

while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    try {
        $rel = [System.Uri]::UnescapeDataString($ctx.Request.Url.LocalPath).TrimStart('/')
        if ($rel -eq '') { $rel = 'index.html' }

        if ($rel -eq 'assets/panoramas/list.json') {
            $panoDir = Join-Path $root 'assets\panoramas'
            $items = @()
            if (Test-Path -LiteralPath $panoDir) {
                $rootFull = [System.IO.Path]::GetFullPath($panoDir)
                $thumbPattern = '(?i)(^|[-_\. ])(thumb|превью|preview|thumbnail|mini)([-_\. ]|$)'
                function Get-PanoRel([string]$fullPath) {
                    $name = $fullPath.Substring($rootFull.Length).TrimStart('\', '/')
                    return ('assets/panoramas/' + $name) -replace '\\', '/'
                }

                $subDirs = Get-ChildItem -LiteralPath $panoDir -Directory | Sort-Object Name
                foreach ($dir in $subDirs) {
                    $files = @(Get-ChildItem -LiteralPath $dir.FullName -File | Where-Object {
                        $_.Extension -match '^\.(jpe?g|png)$'
                    })
                    if ($files.Count -eq 0) { continue }
                    $thumbs = @($files | Where-Object { $_.Name -match $thumbPattern })
                    $mains  = @($files | Where-Object { $_.Name -notmatch $thumbPattern } | Sort-Object Name)
                    foreach ($m in $mains) {
                        $base = [System.IO.Path]::GetFileNameWithoutExtension($m.Name)
                        $mainClean = [regex]::Replace($base.ToLower(), '(?i)^(проект|pano|panorama|панорама)\s*\.?\s*', '')
                        $bestThumb = $null
                        $bestScore = 0
                        foreach ($t in $thumbs) {
                            $tClean = [regex]::Replace([System.IO.Path]::GetFileNameWithoutExtension($t.Name), $thumbPattern, ' ')
                            $tokens = @([regex]::Split($tClean, '[^а-яёa-z0-9]+') | Where-Object { $_.Length -ge 3 })
                            if ($tokens.Count -eq 0) { continue }
                            $score = ($tokens | Where-Object { $mainClean.Contains($_) }).Count
                            if ($score -gt $bestScore) { $bestScore = $score; $bestThumb = $t }
                        }
                        $thumbFull = if ($null -ne $bestThumb) { $bestThumb.FullName } else { $m.FullName }
                        $title = $base -replace '[-_]+', ' '
                        if ([string]::IsNullOrWhiteSpace($title)) { $title = 'Панорама 360°' }
                        $items += @{
                            src = Get-PanoRel $m.FullName
                            thumb = Get-PanoRel $thumbFull
                            title = $title
                        }
                    }
                }

                $rootFiles = @(Get-ChildItem -LiteralPath $panoDir -File | Where-Object {
                    $_.Extension -match '^\.(jpe?g|png)$' -and $_.Name -notmatch $thumbPattern
                })
                foreach ($f in $rootFiles) {
                    $thumbPath = Join-Path $panoDir ('thumb-' + $f.Name)
                    $thumbName = if (Test-Path -LiteralPath $thumbPath) { 'thumb-' + $f.Name } else { $f.Name }
                    $title = [System.IO.Path]::GetFileNameWithoutExtension($f.Name) -replace '[-_]+', ' '
                    if ([string]::IsNullOrWhiteSpace($title)) { $title = 'Панорама 360°' }
                    $title = $title.Substring(0, 1).ToUpper() + $title.Substring(1)
                    $items += @{
                        src = 'assets/panoramas/' + $f.Name
                        thumb = 'assets/panoramas/' + $thumbName
                        title = $title
                    }
                }
            }
            $json = $items | ConvertTo-Json -Compress -Depth 4
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
            $ctx.Response.ContentType = 'application/json; charset=utf-8'
            $ctx.Response.Headers.Add('Cache-Control', 'no-store, no-cache')
            $ctx.Response.ContentLength64 = $bytes.Length
            $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
            $ctx.Response.StatusCode = 200
        } else {
            $full = [System.IO.Path]::GetFullPath((Join-Path $root $rel))
            $rootFull = [System.IO.Path]::GetFullPath($root)
            if ($full.StartsWith($rootFull) -and (Test-Path -LiteralPath $full -PathType Leaf)) {
                $bytes = [System.IO.File]::ReadAllBytes($full)
                $ext = [System.IO.Path]::GetExtension($full).ToLower()
                $ctx.Response.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
                $ctx.Response.Headers.Add('Cache-Control', 'no-store, no-cache')
                $ctx.Response.ContentLength64 = $bytes.Length
                $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
                $ctx.Response.StatusCode = 200
            } else {
                $ctx.Response.StatusCode = 404
            }
        }
    } catch {
        $ctx.Response.StatusCode = 500
    }
    $ctx.Response.Close()
}
$listener.Stop()
