$config = 'dev'

if ($args.Length -gt 0 -or $args[0] -eq '--production' -or $args[0] -eq '-p') {
    $config = 'prod'
}


npx snowpack build --config "snowpack.config.$config.mjs"
