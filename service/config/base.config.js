/**
 * 公共编译模块配置
 */

let path = require('path')
let webpack = require('webpack')
let config = require(path.resolve(process.cwd(), 'axx-cli-config/config'))
let _ = require('../common/utils')
let HappyPack = require('happypack')
let os = require('os')
let ExtractTextPlugin = require("extract-text-webpack-plugin")
let happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

let postcssSalad = require('postcss-salad')

let postcssPlugins = [postcssSalad]



module.exports = {
  entry: _.getEntry(config),
  output: {
    path: config.devpath + '/assets/',
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    root: config.rootpath,
    extensions: config.extensions,
    alias: config.alias
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../../node_modules')]
  },
  externals: config.externals,
  //配置happypack
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(path.resolve(config.rootpath, 'manifest.json')),
      sourceType: 'var'
    }),

    new HappyPack({
      id: 'style',
      loaders: [ 'style-loader', 'css-loader', 'less-loader?{"sourceMap":true}' ],
      threads: 4,
      threadPool: happyThreadPool,
      verbose: true
    }),
    new HappyPack({
      id: 'css',
      loaders: [ 'style-loader', 'css-loader' ],
      threads: 4,
      threadPool: happyThreadPool,
      verbose: true
    }),
    new HappyPack({
      id: 'js',
      threads: 4,
      loaders: [ 'babel?cacheDirectory' ],
      threadPool: happyThreadPool,
      verbose: true
    }),

    //样式分离
    new ExtractTextPlugin(config.build.cssPath),

    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    preLoaders: [
      // {
      //   test: /\.js$/,
      //   loader: 'eslint',
      //   exclude: /node_modules/
      // }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: config.rootpath,
        exclude: /node_modules/
      },
      {
        test: /\.js|.jsx$/,
        loaders: [ 'happypack/loader?id=js' ],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file',
        query: {
          name: config.imagePath
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: config.fontPath
        }
      },
      {
        test: /\.css?$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.less?$/,
        loaders:  ['happypack/loader?id=style' ],
        exclude: /node_modules/
      },
      {test: /\.json$/, loader: 'json'}
    ]
  },

  vue: {
    loaders: _.cssLoaders(),
    postcss: postcssPlugins
  },

  postcss: function () {
    return postcssPlugins
  },

  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
