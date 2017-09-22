let webpack = require('webpack')
let merge = require('webpack-merge')
let htmlGenerator = require('../common/htmlGenerator')
let path = require('path')
let config = require(path.resolve(process.cwd(), 'config'))
let baseWebpackConfig = require('./base.config')


module.exports = merge(baseWebpackConfig, {
  output: {
    path: config.build.prodRoot + '/assets/',
    publicPath: '../../assets/',
    filename: '[name].[hash:6].min.js'
  },

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

