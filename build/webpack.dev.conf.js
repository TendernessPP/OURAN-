// base module
const webpack         = require('webpack');
const merge           = require('webpack-merge');
// own module
const pathConf        = require('./path.conf');
const webpackBaseConf = require('./webpack.base.conf');
const config          = require('./config');
// plugins
// FriendlyErrors
// https://github.com/geowarin/friendly-errors-webpack-plugin
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

let webpackDevConf = merge(webpackBaseConf, {
        devtool  : config.dev.sourceMap ? config.sourceMapType : false,
        devServer: {
            // https://doc.webpack-china.org/configuration/dev-server/#devserver
            host       : config.dev.host,
            contentBase: pathConf.dev,
            port       : config.dev.port,
            quiet      : true,
        },
        plugins  : [
            new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${config.dev.host}:${config.dev.port}`]
                }
            })
        ]
    })
;

// whether need WebpackBundleAnalyzer
if (config.dev.bundleAnalyzer.open) {
    // bundle Analysis
    // https://webpack.js.org/guides/code-splitting/#bundle-analysis
    const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackDevConf.plugins.push(new WebpackBundleAnalyzer(config.dev.bundleAnalyzer.options));
}

module.exports = webpackDevConf;
