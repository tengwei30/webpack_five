const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const TerserPlugin = require('terser-webpack-plugin');
const commonConfig = require('./common.js');

module.exports = merge(commonConfig, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new ProgressBarPlugin({
            format:
                `${chalk.green.bold('build[:bar]')} ` +
                chalk.green.bold(':percent') +
                ' (:elapsed seconds)',
            clear: false,
            width: 60
        })
    ],
    stats: 'normal', //标准输出
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
                    compress: { pure_funcs: ['console.log'] }
                }
            })
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 0
        }
    }
});
