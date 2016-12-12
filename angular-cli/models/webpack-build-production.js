"use strict";
var path = require('path');
var WebpackMd5Hash = require('webpack-md5-hash');
var CompressionPlugin = require('compression-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
exports.getWebpackProdConfigPartial = function (projectRoot, appConfig) {
    var appRoot = path.resolve(projectRoot, appConfig.root);
    var styles = appConfig.styles
        ? appConfig.styles.map(function (style) { return path.resolve(appRoot, style); })
        : [];
    var cssLoaders = ['css-loader?sourcemap&minimize', 'postcss-loader'];
    return {
        devtool: 'source-map',
        output: {
            path: path.resolve(projectRoot, appConfig.outDir),
            filename: '[name].[chunkhash].bundle.js',
            sourceMapFilename: '[name].[chunkhash].bundle.map',
            chunkFilename: '[id].[chunkhash].chunk.js'
        },
        module: {
            rules: [
                // outside of main, load it via extract-text-plugin for production builds
                {
                    include: styles,
                    test: /\.css$/,
                    loaders: ExtractTextPlugin.extract(cssLoaders)
                }, {
                    include: styles,
                    test: /\.styl$/,
                    loaders: ExtractTextPlugin.extract(cssLoaders.concat(['stylus-loader?sourcemap']))
                }, {
                    include: styles,
                    test: /\.less$/,
                    loaders: ExtractTextPlugin.extract(cssLoaders.concat(['less-loader?sourcemap']))
                }, {
                    include: styles,
                    test: /\.scss$|\.sass$/,
                    loaders: ExtractTextPlugin.extract(cssLoaders.concat(['sass-loader?sourcemap']))
                },
            ]
        },
        plugins: [
            new ExtractTextPlugin('[name].[contenthash].bundle.css'),
            new WebpackMd5Hash(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new webpack.optimize.UglifyJsPlugin({
                mangle: { screw_ie8: true },
                compress: { screw_ie8: true },
                sourceMap: true
            }),
            new CompressionPlugin({
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            }),
            new webpack.LoaderOptionsPlugin({
                options: {
                    postcss: [
                        require('postcss-discard-comments')
                    ]
                }
            })
        ]
    };
};
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/models/webpack-build-production.js.map