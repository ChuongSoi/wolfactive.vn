Add-Type -AssemblyName System.Drawing

$inputPath = "C:\Users\pcx.vn\.gemini\antigravity\brain\2c96437c-fc88-4cca-b667-71ee29b489a8\.user_uploaded\media_1789007509415.jpg"
$outputPath = "C:\Users\pcx.vn\.gemini\antigravity\scratch\wolfactive-landing\assets\official-logo-transparent.png"

$src = [System.Drawing.Bitmap]::FromFile($inputPath)
$bmp = New-Object System.Drawing.Bitmap($src.Width, $src.Height)

for ($x = 0; $x -lt $src.Width; $x++) {
    for ($y = 0; $y -lt $src.Height; $y++) {
        $c = $src.GetPixel($x, $y)
        if ($c.R -gt 210 -and $c.G -gt 210 -and $c.B -gt 210) {
            # Transparent background
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        } else {
            # Solid dark blue / black mark & text (#0F172A)
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 15, 23, 42))
        }
    }
}

$bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$src.Dispose()
$bmp.Dispose()

Write-Host "Created transparent PNG at $outputPath"
