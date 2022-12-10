/** @type {import('snowpack').SnowpackUserConfig} */
export default {
    mode: 'production',
    mount: {
        'components': '/components',
        'assets': '/assets',
        'themes': '/themes',
        'app': '/app',
        'utils': '/utils',
        'styles': '/styles',
        'www': '/'
    },
    routes: [
        {
            match: 'routes',
            src: '/search',
            dest: '/index.html'
        }
    ],
    optimize: {
        bundle: true,
        minify: true
    },
    buildOptions: {
        out: 'dist'
    },
    plugins: [
        '@snowpack/plugin-sass'
    ],
    packageOptions: {
        knownEntrypoints: ['react-dom', '@redux-saga/core/effects']
    }
}
