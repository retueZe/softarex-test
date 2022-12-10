/** @type {import('snowpack').SnowpackUserConfig} */
export default {
    extends: './snowpack.config.prod.mjs',
    mode: 'development',
    optimize: undefined,
    devOptions: {
        openUrl: '/'
    }
}
