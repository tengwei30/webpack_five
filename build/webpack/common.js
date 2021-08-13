const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

// 获取路径文件
const resolve = (dir) => {
  return path.join(__dirname, "../..", dir);
}

const commonConfig = (env) => {
  const devMode = env !== 'production' ? true : false
  return {
    entry: {
      polyfills: resolve('src/polyfills'),
      index: resolve('src/index.tsx')
    },
    cache: {
      type: 'filesystem',
      buildDependencies: {  // 当模块代码没有发生变化时，缓存失效
        config: [__filename],
      },
    },
    target: "web",
    mode: !devMode ? 'production' : 'development',
    devtool:  !devMode ? 'source-map' : 'inline-source-map',
    output: {
      filename: '[name].[contenthash].js',
      path: resolve('dist'),
      clean: true, // 清理 /dist 文件夹
      charset: true,
      pathinfo: false,  // 输出结果不携带路径信息
      // assetModuleFilename: 'images/[hash][ext][query]' // 等同于下面 generator 的配置，自定义输出路径
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext][query]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/font/[hash][ext][query]'
          }
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [{
            loader: 'ts-loader',
            options: {
              transpileOnly: true,  // 关闭 ts 的类型检查，异步到插件去做，能提升打包速度
            },
          }]
          // use: 'ts-loader',
          // options: {
          //   transpileOnly: true,  // 关闭 ts 的类型检查，异步到插件去做，能提升打包速度
          // },
        },
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve('public/index.html'),
        title: "自定义模版"
      }),
      new ForkTsCheckerWebpackPlugin(),
      new ESLintPlugin()
    ].concat(devMode ? [] : [new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
      ignoreOrder: true,
    })])
  }
}

module.exports = commonConfig

