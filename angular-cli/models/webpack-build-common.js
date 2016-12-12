"use strict";
var webpack = require('webpack');
var path = require('path');
var glob_copy_webpack_plugin_1 = require('../plugins/glob-copy-webpack-plugin');
var base_href_webpack_1 = require('@angular-cli/base-href-webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var fs = require('fs');
var path = require('path');
var _root = path.resolve(__dirname, '..');
var helpers = {
        root : function root(args) {
            args = Array.prototype.slice.call(arguments, 0);
            return path.join.apply(path, [_root].concat(args));
        }
    }

function getWebpackCommonConfig(projectRoot, environment, appConfig, baseHref) {
    var alfrescoLibs = [
            helpers.root('../../node_modules/ng2-alfresco-login'),
            helpers.root('../../node_modules/ng2-activiti-analytics'),
            helpers.root('../../node_modules/ng2-activiti-diagrams'),
            helpers.root('../../node_modules/ng2-activiti-form'),
            helpers.root('../../node_modules/ng2-activiti-processlist'),
            helpers.root('../../node_modules/ng2-activiti-tasklist'),
            helpers.root('../../node_modules/ng2-alfresco-core'),
            helpers.root('../../node_modules/ng2-alfresco-datatable'),
            helpers.root('../../node_modules/ng2-alfresco-documentlist'),
            helpers.root('../../node_modules/ng2-alfresco-search'),
            helpers.root('../../node_modules/ng2-alfresco-tag'),
            helpers.root('../../node_modules/ng2-alfresco-upload'),
            helpers.root('../../node_modules/ng2-alfresco-userinfo'),
            helpers.root('../../node_modules/ng2-alfresco-viewer'),
            helpers.root('../../node_modules/ng2-alfresco-webscript')
        ].map((entry) => fs.realpathSync(entry));

    var appRoot = path.resolve(projectRoot, appConfig.root);
    var appMain = path.resolve(appRoot, appConfig.main);
    var styles = appConfig.styles
        ? appConfig.styles.map(function (style) { return path.resolve(appRoot, style); })
        : [];
    var scripts = appConfig.scripts
        ? appConfig.scripts.map(function (script) { return path.resolve(appRoot, script); })
        : [];
    var entry = {
        main: [appMain]
    };
    // Only add styles/scripts if there's actually entries there
    if (appConfig.styles.length > 0) {
        entry['styles'] = styles;
    }
    if (appConfig.scripts.length > 0) {
        entry['scripts'] = scripts;
    }
    return {
        devtool: 'source-map',
        resolve: {
            extensions: ['.ts', '.js'],
            modules: [path.resolve(projectRoot, 'node_modules')]
        },
        context: path.resolve(__dirname, './'),
        entry: entry,
        output: {
            path: path.resolve(projectRoot, appConfig.outDir),
            filename: '[name].bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|ts)$/,
                    use: [
                        'systemjs-webpack-loader'
                    ],
                    include: [
                        ...alfrescoLibs
                    ],
                },
    {
        enforce: 'pre',
            test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
        /node_modules/
    ]
    },
                // in main, load css as raw text
                {
                    exclude: styles,
                    test: /\.css$/,
                    loaders: ['raw-loader', 'postcss-loader']
                }, {
                    exclude: styles,
                    test: /\.styl$/,
                    loaders: ['raw-loader', 'postcss-loader', 'stylus-loader'] },
                {
                    exclude: styles,
                    test: /\.less$/,
                    loaders: ['raw-loader', 'postcss-loader', 'less-loader']
                }, {
                    exclude: styles,
                    test: /\.scss$|\.sass$/,
                    loaders: ['raw-loader', 'postcss-loader', 'sass-loader']
                },
                // load global scripts using script-loader
                { include: scripts, test: /\.js$/, loader: 'script-loader' },
                { test: /\.json$/, loader: 'json-loader' },
                { test: /\.(jpg|png|gif)$/, loader: 'url-loader?limit=10000' },
                { test: /\.html$/, loader: 'raw-loader' },
                { test: /\.(otf|ttf|woff|woff2)$/, loader: 'url?limit=10000' },
                { test: /\.(eot|svg)$/, loader: 'file-loader' }
]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(appRoot, appConfig.index),
                filename: path.resolve(appConfig.outDir, appConfig.index),
                chunksSortMode: 'dependency'
            }),
            new base_href_webpack_1.BaseHrefWebpackPlugin({
                baseHref: baseHref
            }),
            new webpack.NormalModuleReplacementPlugin(
            // This plugin is responsible for swapping the environment files.
            // Since it takes a RegExp as first parameter, we need to escape the path.
            // See https://webpack.github.io/docs/list-of-plugins.html#normalmodulereplacementplugin
            new RegExp(path.resolve(appRoot, appConfig.environments['source'])
                .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')), path.resolve(appRoot, appConfig.environments[environment])),
            new webpack.optimize.CommonsChunkPlugin({
                // Optimizing ensures loading order in index.html
                name: ['styles', 'scripts', 'main'].reverse()
            }),
            new webpack.optimize.CommonsChunkPlugin({
                minChunks: Infinity,
                name: 'inline'
            }),
            new glob_copy_webpack_plugin_1.GlobCopyWebpackPlugin({
                patterns: appConfig.assets,
                globOptions: { cwd: appRoot, dot: true, ignore: '**/.gitkeep' }
            }),
            new webpack.LoaderOptionsPlugin({
                test: /\.(css|scss|sass|less|styl)$/,
                options: {
                    postcss: [autoprefixer()]
                },
            }),
        ],
        node: {
            fs: 'empty',
            global: true,
            crypto: 'empty',
            tls: 'empty',
            net: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    };
}
exports.getWebpackCommonConfig = getWebpackCommonConfig;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/models/webpack-build-common.js.map
