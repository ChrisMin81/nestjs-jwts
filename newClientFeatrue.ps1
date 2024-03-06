Param(
    [Parameter (Mandatory=$true)]
    [string]
    $featureName
)

Write-Host "generating Client Feature: $featureName "

nx generate @nrwl/angular:library $featureName --style=scss --directory=client --importPath=@fst/client/$featureName --simpleName --skipModule --standalone --standaloneConfig --routing --tags=type:feature,scope:client