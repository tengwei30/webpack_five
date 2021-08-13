const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const commonConfig = require('./common.js');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(commonConfig('production'), {
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    compress: { pure_funcs: ['console.log'] },
                }
            }),
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 0,
        },
    },
});
