$ErrorActionPreference= 'silentlycontinue'

# Assign the value random password to the password variable
$rustdesk_pw=(-join ((65..90) + (97..122) | Get-Random -Count 12 | % {[char]$_}))

# Get your config string from your Web portal and Fill Below
$rustdesk_cfg="configstring"

################################### Please Do Not Edit Below This Line #########################################

# Run as administrator and stays in the current directory
if (-Not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator))
{
    if ([int](Get-CimInstance -Class Win32_OperatingSystem | Select-Object -ExpandProperty BuildNumber) -ge 6000)
    {
        Start-Process PowerShell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command `"cd '$pwd'; & '$PSCommandPath';`"";
        Exit;
    }
}

# This function will return the latest version and download link as an object
function getLatest()
{
    $Page = Invoke-WebRequest -Uri 'https://github.com/rustdesk/rustdesk/releases/latest' -UseBasicParsing
    $HTML = New-Object -Com "HTMLFile"
    try
    {
        $HTML.IHTMLDocument2_write($Page.Content)
    }
    catch
    {
        $src = [System.Text.Encoding]::Unicode.GetBytes($Page.Content)
        $HTML.write($src)
    }

    # Current example link: https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe
    $Downloadlink = ($HTML.Links | Where {$_.href -match '(.)+\/rustdesk\/rustdesk\/releases\/download\/\d{1}.\d{1,2}.\d{1,2}(.{0,3})\/rustdesk(.)+x86_64.exe'} | select -first 1).href

    # bugfix - sometimes you need to replace "about:"
    $Downloadlink = $Downloadlink.Replace('about:', 'https://github.com')

    $Version = "unknown"
    if ($Downloadlink -match './rustdesk/rustdesk/releases/download/(?<content>.*)/rustdesk-(.)+x86_64.exe')
    {
        $Version = $matches['content']
    }

    if ($Version -eq "unknown" -or $Downloadlink -eq "")
    {
        Write-Output "ERROR: Version or download link not found."
        Exit
    }

    # Create object to return
    $params += @{Version = $Version}
    $params += @{Downloadlink = $Downloadlink}
    $Result = New-Object PSObject -Property $params

    return($Result)
}

$RustDeskOnGitHub = getLatest


$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if ($rdver -eq $RustDeskOnGitHub.Version)
{
    Write-Output "RustDesk $rdver is the newest version."
    Exit
}

if (!(Test-Path C:\Temp))
{
    New-Item -ItemType Directory -Force -Path C:\Temp > null
}

cd C:\Temp

Write-Output "Downloading RustDesk..."
Invoke-WebRequest $RustDeskOnGitHub.Downloadlink -Outfile "rustdesk.exe"
Write-Output "Installing RustDesk..."
Start-Process .\rustdesk.exe --silent-install
Start-Sleep -seconds 1

$ServiceName = 'Rustdesk'
$arrService = Get-Service -Name $ServiceName -ErrorAction SilentlyContinue

if ($arrService -eq $null)
{
    Write-Output "Installing service..."
    cd $env:ProgramFiles\RustDesk
    Start-Process .\rustdesk.exe --install-service
    Start-Sleep -seconds 1
}

while ($arrService.Status -ne 'Running')
{
    Start-Service $ServiceName
    Start-Sleep -seconds 1
    $arrService.Refresh()
}

net stop rustdesk Out-Null

$username = ((Get-WMIObject -ClassName Win32_ComputerSystem).Username).Split('\')[1]
Remove-Item C:\Users\$username\AppData\Roaming\RustDesk\config\RustDesk_default.toml
New-Item C:\Users\$username\AppData\Roaming\RustDesk\config\RustDesk_default.toml
Set-Content C:\Users\$username\AppData\Roaming\RustDesk\config\RustDesk_default.toml "[options]`nview_style = 'adaptive'"

Remove-Item C:\Users\$username\AppData\Roaming\RustDesk\config\RustDesk2.toml
New-Item C:\Users\$username\AppData\Roaming\RustDesk\config\RustDesk2.toml
Set-Content C:\Users\$username\AppData\Roaming\RustDesk\config\RustDesk2.toml "rendezvous_server = 'rustdesk.consoicongnghe.com:21116' `nnat_type = 1`nserial = 0`n`n[options]`ndirect-server = 'Y'`nallow-remote-config-modification = 'Y'`ncustom-rendezvous-server = 'rustdesk.consoicongnghe.com'`nkey = 'N3V5GGIIcsXUd9TD8rzuEB2F3+1jyoslIBwp3Na3028='"

net start rustdesk Out-Null

cd $env:ProgramFiles\RustDesk\
.\rustdesk.exe --get-id | Write-Verbose -OutVariable rustdesk_id

.\rustdesk.exe --config $rustdesk_cfg

.\rustdesk.exe --password $rustdesk_pw

Write-Output "..............................................."
Write-Output "Copy 2 dong nay gui cho Linh:"
Write-Output " "

# Show the value of the ID Variable
Write-Output "RustDesk ID: $rustdesk_id"

# Show the value of the Password Variable
Write-Output "Password: $rustdesk_pw"
Write-Output "..............................................."

rm -r -fo C:\Temp

Start-Sleep -seconds 60