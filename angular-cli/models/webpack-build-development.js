"use strict";
var path = require('path');
exports.getWebpackDevConfigPartial = function (projectRoot, appConfig) {
    var appRoot = path.resolve(projectRoot, appConfig.root);
    var styles = appConfig.styles
        ? appConfig.styles.map(function (style) { return path.resolve(appRoot, style); })
        : [];
    var cssLoaders = ['style-loader', 'css-loader?sourcemap', 'postcss-loader'];
    return {
        devtool: 'source-map',
        output: {
            path: path.resolve(projectRoot, appConfig.outDir),
            filename: '[name].bundle.js',
            sourceMapFilename: '[name].map',
            chunkFilename: '[id].chunk.js'
        },
        module: {
            rules: [
                // outside of main, load it via style-loader for development builds
                {
                    include: styles,
                    test: /\.css$/,
                    loaders: cssLoaders
                }, {
                    include: styles,
                    test: /\.styl$/,
                    loaders: cssLoaders.concat(['stylus-loader?sourcemap'])
                }, {
                    include: styles,
                    test: /\.less$/,
                    loaders: cssLoaders.concat(['less-loader?sourcemap'])
                }, {
                    include: styles,
                    test: /\.scss$|\.sass$/,
                    loaders: cssLoaders.concat(['sass-loader?sourcemap'])
                },
            ]
        }
    };
};
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/models/webpack-build-development.js.map