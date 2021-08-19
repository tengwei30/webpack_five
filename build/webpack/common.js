const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const paths = require('../paths');

// 获取路径文件
const resolve = dir => {
  return path.join(__dirname, '../..', dir);
};

const isProductionMode = process.env.NODE_ENV === 'production';
// 开发模式 style-loader, 生产模式 minicss
const styleLoaderMode = isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader';
// 关闭 ts 的类型检查，异步到插件去做，能提升打包速度
const babelOptions = { transpileOnly: true };

const commonConfig = {
  target: 'web',
  entry: {
    polyfills: resolve('src/polyfills'), // 对不支持ES6的浏览器进行支持
    index: paths.appIndexJs
  },
  output: {
    path: paths.appBuild,
    filename: 'js/[id].[contenthash].js',
    publicPath: '/',
    clean: true, // 清理 /dist 文件夹
    charset: true,
    pathinfo: false // 输出结果不携带路径信息
    // assetModuleFilename: 'images/[hash][ext][query]' // 等同于下面 generator 的配置，自定义输出路径
  },
  cache: {
    // 使用缓存
    type: 'filesystem', // memory:使用内容缓存 filesystem：使用文件缓存
    allowCollectingMemory: true,
    buildDependencies: {
      // 当模块代码没有发生变化时，缓存失效
      config: [__filename]
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader' // vue 的需要在ts-loader 前面添加babel-loader，因为tsjson中 "jsx" 设置成了 "preserve", 。否则 ts不会被转成 js
          },
          {
            loader: 'ts-loader',
            options: babelOptions
          }
        ]
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: [
          styleLoaderMode,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
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
        use: [
          {
            loader: 'ts-loader',
            options: babelOptions
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          styleLoaderMode,
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          styleLoaderMode,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: paths.moduleFileExtensions,
    alias: {
      '@': resolve(__dirname, '../../src'),
      assets: resolve(__dirname, '../../assets')
    }
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new ESLintPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: isProductionMode
        ? `css/[id].[contenthash].css`
        : `css/[path]/[name]_[hash:base64:5].css`,
      chunkFilename: isProductionMode
        ? `css/[name].[contenthash].css`
        : `css/[path]/[name]_[hash:base64:5].css`,
      ignoreOrder: true
    }),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      inject: 'body',
      title: 'Vue'
    })
  ]
};

module.exports = commonConfig;
