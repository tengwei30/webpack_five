const { merge } = require('webpack-merge');
const commonConfig = require('./common');

module.exports = merge(commonConfig('development'), {
    optimization: {
        minimize: false,
        minimizer: [],
        splitChunks: {
            chunks: 'all',
            minSize: 0,
        },
    },
    devServer: {
        contentBase: './dist',
        port: '3000',
        hot: true,
        open: true,
        noInfo: true,
    }
})

