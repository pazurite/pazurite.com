module.exports = {
    mode: 'development',
    context: '/Volumes/D/Programming/Pazurite/Experiments/hello-world',
    devtool: 'eval-cheap-module-source-map',
    node: {
        setImmediate: false,
        process: 'mock',
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    output: {
        path: '/Volumes/D/Programming/Pazurite/Experiments/hello-world/dist',
        filename: 'js/[name].js',
        publicPath: '/',
        chunkFilename: 'js/[name].js',
        globalObject: "(typeof self !== 'undefined' ? self : this)"
    },
    resolve: {
        alias: {
            '@': '/Volumes/D/Programming/Pazurite/Experiments/hello-world/src',
            'vue$': 'vue/dist/vue.runtime.esm.js'
        },
        extensions: ['.mjs', '.js', '.jsx', '.vue', '.json', '.wasm'],
        modules: [
            'node_modules',
            '/Volumes/D/Programming/Pazurite/Experiments/hello-world/node_modules',
            '/Volumes/D/Programming/Pazurite/Experiments/hello-world/node_modules/@vue/cli-service/node_modules'
        ],
        plugins: [[Object]]
    },
    resolveLoader: {
        modules: [
            '/Volumes/D/Programming/Pazurite/Experiments/hello-world/node_modules/@vue/cli-plugin-babel/node_modules',
            'node_modules',
            '/Volumes/D/Programming/Pazurite/Experiments/hello-world/node_modules',
            '/Volumes/D/Programming/Pazurite/Experiments/hello-world/node_modules/@vue/cli-service/node_modules'
        ],
        plugins: [[Object]]
    },
    module: {
        noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
        rules: [
            [Object], [Object],
            [Object], [Object],
            [Object], [Object],
            [Object], [Object],
            [Object], [Object],
            [Object], [Object],
            [Object], [Object]
        ]
    },
    optimization: {
        splitChunks: {cacheGroups: [Object]},
        minimizer: [[TerserPlugin]]
    },
    plugins: [
        VueLoaderPlugin {},
        DefinePlugin {definitions: [Object]},
        CaseSensitivePathsPlugin {
            options: {},
            logger: [Object],
            pathCache: {},
            fsOperations: 0,
            primed: false
        },
        FriendlyErrorsWebpackPlugin {
            compilationSuccessInfo: {},
            onErrors: undefined,
            shouldClearConsole: true,
            formatters: [Array],
            transformers: [Array],
            previousEndTimes: {}
        },
        HtmlWebpackPlugin {options: [Object]},
        PreloadPlugin {options: [Object]},
        PreloadPlugin {options: [Object]},
        CopyPlugin {patterns: [Array], options: {}},
        HotModuleReplacementPlugin {
            options: {},
            multiStep: undefined,
            fullBuildTimeout: 200,
            requestTimeout: 10000
        },
        ProgressPlugin {
            profile: false,
            handler: undefined,
            modulesCount: 500,
            showEntries: false,
            showModules: true,
            showActiveModules: true
        }
    ],
    entry: {
        app: [
            '/Volumes/D/Programming/Pazurite/Experiments/hello-world/node_modules/webpack-dev-server/client/index.js?http://192.168.1.54:8080&sockPath=/sockjs-node',
            '/Volumes/D/Programming/Pazurite/Experiments/hello-world/node_modules/webpack/hot/dev-server.js',
            './src/main.js'
        ]
    }
}
