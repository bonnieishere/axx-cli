let webpack = require('webpack')
let merge = require('webpack-merge')
let htmlGenerator = require('../common/htmlGenerator')
let path = require('path')
let config = require(path.resolve(process.cwd(), 'axx-cli-config/config'))
let baseWebpackConfig = require('./base.config')


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

