Clear-Host
$rootPath =  $PSScriptRoot
$pluginPath = [System.IO.Path]::Combine($rootPath, "dynamic_action", "dynamic_action_plugin_at_rammelhof_client-side-pdf.sql");

$pluginContent = get-content $pluginPath 
$pluginContent | Where-Object{$_ -match "p_version_yyyy_mm_dd"}
$pluginContent = $pluginContent -replace "p_version_yyyy_mm_dd\=>'([0-9]{4}\.[0-9]{2}\.[0-9]{2})'","p_version_yyyy_mm_dd=>'2019.03.31'"
$pluginContent | Where-Object{$_ -match "p_version_yyyy_mm_dd"}
Set-Content -Path $pluginPath -Value $pluginContent
