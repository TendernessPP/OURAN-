module.exports = {
    // sourceMapType: 'eval-source-map',
    sourceMapType: 'source-map',
    dev          : {
        // host          : '192.168.1.106',
        // host          : 'localhost',
        host          : 'localhost',
        port          : 8099,
        sourceMap     : true,
        bundleAnalyzer: {
            open   : false,
            // https://github.com/webpack-contrib/webpack-bundle-analyzer
            options: {analyzerPort: '9998'}
        },

        /*代理*/
        // assetsSubDirectory: 'static',
        // assetsPublicPath: '/',
        // proxyTable: {
        //     '/api': {
        //         target: 'http://10.73.4.226:6003',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     },
        // },
    },
    prod         : {
        sourceMap     : false,
        bundleAnalyzer: {
            open   : false,
            // https://github.com/webpack-contrib/webpack-bundle-analyzer
            options: {analyzerPort: '9999'}
        },
        needHash      : true,
        hashLength    : 5
    }
};
