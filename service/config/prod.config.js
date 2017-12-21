let webpack = require('webpack')
let merge = require('webpack-merge')
let htmlGenerator = require('../common/htmlGenerator')
let path = require('path')
let _ = require('lodash')
let ExtractTextPlugin = require("extract-text-webpack-plugin")
let config = require(path.resolve(process.cwd(), 'axx-cli-config/config'))

let baseConfig = require('./base.config')
let baseConfigClone = _.cloneDeep(baseConfig)

baseConfigClone.module.loaders[6] = ({
  test: /\.css?$/,
  loader: ExtractTextPlugin.extract("style-loader", "css-loader")
})

module.exports = merge(baseConfigClone, {
  output: config.build.output,

  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   comments: false
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new ExtractTextPlugin(config.build.cssPath),

  ].concat(htmlGenerator())

})