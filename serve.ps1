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

Start-Process $url

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
    } catch {
        $ctx.Response.StatusCode = 500
    }
    $ctx.Response.Close()
}
$listener.Stop()
