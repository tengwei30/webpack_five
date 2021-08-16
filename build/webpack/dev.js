const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const commonConfig = require('./common');

module.exports = merge(commonConfig, {
    mode: "development",
    devtool: 'eval-cheap-module-source-map',
    // stats: "errors-only", //只在发生错误或有新的编译时输出
    target: 'web',
    optimization: {
        minimize: false,
        minimizer: [],
        splitChunks: {
            chunks: 'all',
            minSize: 0,
        },
    },
    devServer: {
        injectClient: true,
        port: '3000',
        hot: true,
        open: true,
        inline:true,
        // historyApiFallback: true,
        contentBase: path.resolve(__dirname, './dist'),
        publicPath: '/',
        watchOptions: {
            ignored: ['**/node_modules'],
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
})

