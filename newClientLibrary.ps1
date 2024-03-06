Param(
    [Parameter (Mandatory=$true)]
    [string]
    $libraryName
)

Write-Host "generating Client Library: $libraryName "

nx generate @nrwl/angular:library $libraryName --style=scss --directory=client --importPath=@fst/client/$libraryName --simpleName --skipModule --standalone --standaloneConfig