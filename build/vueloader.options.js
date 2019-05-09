const ExtractTextPlugin = require('extract-text-webpack-plugin');

let loaders = {
    css    : ExtractTextPlugin.extract({
        use       : [
            'css-loader?sourceMap',
            'stylus-loader'
        ],
        fallback  : 'vue-style-loader', // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
        publicPath: '../'
    }),
    postcss: ExtractTextPlugin.extract({
        use: [
            'postcss-loader'
        ]
    })
};

module.exports = {
    loaders
};
