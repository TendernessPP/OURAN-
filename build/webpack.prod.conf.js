// base module
const webpack         = require('webpack');
const merge           = require('webpack-merge');
// own module
const pathConf        = require('./path.conf');
const webpackBaseConf = require('./webpack.base.conf');
const config          = require('./config');
// plugins
// clean output dir
// https://github.com/johnagan/clean-webpack-plugin
const CleanWebpackPlugin = require('clean-webpack-plugin');
// minify js
// current webpack.optimize.UglifyJsPlugin cant support es6
// https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let webpackProdConf = merge(webpackBaseConf, {
    devtool: config.prod.sourceMap ? config.sourceMapType : false,
    output : {
        path: pathConf.dist
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            // https://github.com/johnagan/clean-webpack-plugin#options-and-defaults-optional
            root: pathConf.root
        }),
        // https://github.com/webpack-contrib/uglifyjs-webpack-plugin
        new UglifyJsPlugin({
            test: /\.js($|\?)/i
        })
    ]
});

// define env production
webpackProdConf.plugins.push(
    // https://doc.webpack-china.org/guides/production/
    // https://vue-loader.vuejs.org/en/workflow/production.html
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    })
);

// whether need WebpackBundleAnalyzer
if (config.prod.bundleAnalyzer.open) {
    // bundle Analysis
    // https://webpack.js.org/guides/code-splitting/#bundle-analysis
    const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackProdConf.plugins.push(new WebpackBundleAnalyzer(config.prod.bundleAnalyzer.options));
}

module.exports = webpackProdConf;