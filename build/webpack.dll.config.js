const path             = require("path");
const pathConf       = require('./path.conf');
const webpack          = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        vendor: ['babel-polyfill', 'vue/dist/vue.esm.js', 'vuex', 'vue-router','axios']
    },
    output: {
        path: path.join(pathConf.common),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(pathConf.common, '[name]-manifest.json'),
            name: '[name]_library',
            context: __dirname
        }),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i
        })
    ]
};