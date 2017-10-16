let webpack = require('webpack')
let merge = require('webpack-merge')
let htmlGenerator = require('../common/htmlGenerator')
let path = require('path')
let ExtractTextPlugin = require("extract-text-webpack-plugin")
let config = require(path.resolve(process.cwd(), 'axx-cli-config/config'))
let baseWebpackConfig = require('./base.config')

baseWebpackConfig.module.loaders[5] = ({
  test: /\.css?$/,
  loader: ExtractTextPlugin.extract("style-loader","css-loader")
})

module.exports = merge(baseWebpackConfig, {
  output: config.build.output,

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })

  ].concat(htmlGenerator(config.views))
})

