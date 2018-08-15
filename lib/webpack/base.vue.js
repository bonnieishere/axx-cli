/**
 * @file 基础配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

const path       = require('path');
const webpack    = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const entry      = require(process.cwd() + '/project.view.json');
const config     = require(process.cwd() + '/project.config.json');
const manifest   = require(process.cwd() + '/static/vendor-manifest');

const { VueLoaderPlugin } = require('vue-loader');

const bableConfig = {
  presets: [
    ['env', {
      targets: {
        chrome: 52,
        browsers: ['last 2 versions', 'safari >= 7']
      },
      useBuiltIns: true
    }],
    'stage-2'
  ],
  plugins: [
    'transform-runtime',
    'transform-decorators-legacy',
    ['component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ],
  comments: false
}

const entrys = {};
Object.keys(entry).forEach((item) => {
  entrys[item] = entry[item].path;
});

const webpackConfig = {
  entry: entrys,
  resolve: {
    modules: [
      'node_modules',
      process.cwd() + '/node_modules'
    ],
    alias: {
      '@': process.cwd() + '/src',
      component: process.cwd() + '/src/components',
      asset: process.cwd() + '/src/assets',
      view: process.cwd() + '/src/views'
    },
    extensions: ['.js', '.ts', '.vue', '.json', '.less', '.css']
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: 'pug-plain-loader'
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: bableConfig
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: bableConfig
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        use: {
          loader: 'json'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'img/[name].[hash:7].[ext]'
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DllReferencePlugin({
      manifest
    }),
    new CopyPlugin([{
      from: path.resolve(process.cwd(), 'static'),
      to: config.dev.subassetsRir,
      ignore: ['.*']
    }]),
  ]
};

module.exports = webpackConfig;
