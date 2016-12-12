"use strict";
var rimraf = require('rimraf');
var path = require('path');
var Task = require('../ember-cli/lib/models/task');
var webpack = require('webpack');
var ProgressPlugin = require('webpack/lib/ProgressPlugin');
var webpack_config_1 = require('../models/webpack-config');
var _1 = require('../models/');
var config_1 = require('../models/config');
var lastHash = null;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Task.extend({
    run: function (runTaskOptions) {
        var project = this.cliProject;
        var outputDir = runTaskOptions.outputPath || config_1.CliConfig.fromProject().config.apps[0].outDir;
        rimraf.sync(path.resolve(project.root, outputDir));
        var config = new webpack_config_1.NgCliWebpackConfig(project, runTaskOptions.target, runTaskOptions.environment, outputDir, runTaskOptions.baseHref, runTaskOptions.aot).config;
        var webpackCompiler = webpack(config);
        webpackCompiler.apply(new ProgressPlugin({
            profile: true
        }));
        return new Promise(function (resolve, reject) {
            webpackCompiler.watch({}, function (err, stats) {
                if (err) {
                    lastHash = null;
                    console.error(err.stack || err);
                    if (err.details) {
                        console.error(err.details);
                    }
                    reject(err.details);
                }
                if (stats.hash !== lastHash) {
                    lastHash = stats.hash;
                    process.stdout.write(stats.toString(_1.webpackOutputOptions) + '\n');
                }
            });
        });
    }
});
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/tasks/build-webpack-watch.js.map