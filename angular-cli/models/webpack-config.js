"use strict";
var webpack_build_typescript_1 = require('./webpack-build-typescript');
var webpackMerge = require('webpack-merge');
var config_1 = require('./config');
var _1 = require('./');
var NgCliWebpackConfig = (function () {
    function NgCliWebpackConfig(ngCliProject, target, environment, outputDir, baseHref, isAoT) {
        if (isAoT === void 0) { isAoT = false; }
        this.ngCliProject = ngCliProject;
        this.target = target;
        this.environment = environment;
        var config = config_1.CliConfig.fromProject();
        var appConfig = config.config.apps[0];
        appConfig.outDir = outputDir || appConfig.outDir;
        var baseConfig = _1.getWebpackCommonConfig(this.ngCliProject.root, environment, appConfig, baseHref);
        var targetConfigPartial = this.getTargetConfig(this.ngCliProject.root, appConfig);
        var typescriptConfigPartial = isAoT
            ? webpack_build_typescript_1.getWebpackAotConfigPartial(this.ngCliProject.root, appConfig)
            : webpack_build_typescript_1.getWebpackNonAotConfigPartial(this.ngCliProject.root, appConfig);
        if (appConfig.mobile) {
            var mobileConfigPartial = _1.getWebpackMobileConfigPartial(this.ngCliProject.root, appConfig);
            var mobileProdConfigPartial = _1.getWebpackMobileProdConfigPartial(this.ngCliProject.root, appConfig);
            baseConfig = webpackMerge(baseConfig, mobileConfigPartial);
            if (this.target == 'production') {
                targetConfigPartial = webpackMerge(targetConfigPartial, mobileProdConfigPartial);
            }
        }
        this.config = webpackMerge(baseConfig, targetConfigPartial, typescriptConfigPartial);
    }
    NgCliWebpackConfig.prototype.getTargetConfig = function (projectRoot, appConfig) {
        switch (this.target) {
            case 'development':
                return _1.getWebpackDevConfigPartial(projectRoot, appConfig);
            case 'production':
                return _1.getWebpackProdConfigPartial(projectRoot, appConfig);
            default:
                throw new Error("Invalid build target. Only 'development' and 'production' are available.");
        }
    };
    return NgCliWebpackConfig;
}());
exports.NgCliWebpackConfig = NgCliWebpackConfig;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/models/webpack-config.js.map