Param(
    [Parameter (Mandatory=$true)]
    [string]
    $featureName
)

Write-Host "generating Server Feature: $featureName "

npx nx generate @nx/nest:library $featureName --projectNameAndRootFormat=derived --directory=server --controller --importPath=@fst/server/$featureName --service --strict --tags=scope:server,type:feature