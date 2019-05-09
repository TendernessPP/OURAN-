// base module
const webpack = require('webpack');

// own module
const pathConf         = require('./path.conf');
const config           = require('./config');
const vueLoaderOptions = require('./vueloader.options');

// variable
const hash      = config.prod.needHash
    ? `?[hash:${config.prod.hashLength}]`
    : '';
const chunkHash = config.prod.needHash
    ? `?[chunkhash:${config.prod.hashLength}]`
    : '';
// utils
// extract css
// https://github.com/webpack-contrib/extract-text-webpack-plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// extract commonChunk
// https://webpack.js.org/plugins/commons-chunk-plugin/
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
// auto create html
const HtmlWebpackPlugin  = require('html-webpack-plugin');
//create vendor.dll.js?[hash] to html scriptElement
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// copy custom assets
// https://github.com/webpack-contrib/copy-webpack-plugin
// use gracefulFs to avoid "EMFILE: too many open files" or "ENFILE: file table overflow"
// https://github.com/webpack-contrib/copy-webpack-plugin#emfile-too-many-open-files-or-enfile-file-table-overflow
const fs         = require('fs');
const gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: pathConf.src,
    entry  : {
        main: ['babel-polyfill','./main.js']
    },
    output : {
        filename     : `[name].js${hash}`,
        chunkFilename: `[name].js${chunkHash}`
    },
    module : {
        rules: [
            // import not in .vue
            {
                test: /\.css$/,
                use : [
                    'style-loader',
                    {
                        loader : 'css-loader',
                        options: {importLoaders: 1}
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.(styl|stylus)$/,
                use : [
                    'style-loader',
                    {
                        loader : 'css-loader',
                        options: {importLoaders: 1}
                    },
                    'stylus-loader'
                ]
            },
            {
                test   : /\.js$/,
                loader : 'babel-loader',
                include: [pathConf.src],
                exclude: pathConf.node_modules
            },
            {
                test   : /\.vue$/,
                loader : 'vue-loader',
                options: vueLoaderOptions
            },
            // file-loader
            // https://github.com/webpack-contrib/file-loader
            // load image
            {
                test: /\.(png|jpg|gif)$/,
                use : [
                    {
                        loader : 'file-loader',
                        options: {
                            // extract image
                            name: `static/images/[name].[ext]${hash}`
                        }
                    },
                    {
                        // compress image
                        // https://github.com/tcoopman/image-webpack-loader
                        loader : 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true
                        }
                    }

                ]
            },
            // load font
            {
                test   : /\.(woff|woff2|eot|ttf|otf|svg)$/,
                loader : 'file-loader',
                exclude: [pathConf.icons],
                options: {
                    // extract font
                    name: `static/fonts/[name].[ext]${hash}`
                }
            },
            // svg-sprite-loader
            {
                test   : /\.svg$/,
                loader : 'svg-sprite-loader',
                include: [pathConf.icons],
                options: {
                    symbolId: 'icon-[name]'
                }
            }
        ]
    },
    resolve: {
        enforceExtension: false,
        extensions      : ['.js', '.vue'],
        alias           : {
            'vue$': 'vue/dist/vue.esm.js', // 'vue/dist/vue.common.js' for webpack 1
            '@'   : pathConf.src
        }
    },
    plugins: [
        // use module everywhere
        // https://webpack.js.org/plugins/provide-plugin/
        new webpack.ProvidePlugin({}),
        //Ignore json file path
        new webpack.DllReferencePlugin({
            context : __dirname,
            manifest: require('../common/vendor-manifest.json')
        }),
        new ExtractTextPlugin({
            filename : `static/css/[name].css${chunkHash}`,
            // set the following option to `true` if you want to extract CSS from codesplit chunks into this main css file as well.
            // This will result in *all* of your app's CSS being loaded upfront.
            allChunks: false
        }),
        new HtmlWebpackPlugin({
            filename      : `index.html${hash}`,
            template      : 'index.html',
            inject        : true,
            minify        : {
                removeComments    : true,
                collapseWhitespace: true
                // removeAttributeQuotes: true,
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency',
            favicon:'./favicon.ico'
        }),
        // create vendor.dll.js[hash] to html scriptElement
        new AddAssetHtmlPlugin({
            filepath        : pathConf.vendor,
            hash            : true,
            includeSourcemap: false
        }),
        // copy custom assets
        new CopyWebpackPlugin([
            {
                from: pathConf.assets,
                to  : 'static/assets'
            }
        ])
    ]
};
