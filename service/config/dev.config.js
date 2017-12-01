/**
 * 本地调试编译
 */
let webpack = require('webpack')
let path = require('path')
let merge = require('webpack-merge')
let _ = require('../common/utils')
let htmlGenerator = require('../common/htmlGenerator')
let config = require(path.resolve(process.cwd(), 'axx-cli-config/config'))

let baseConfig = require('./base.config')
let baseConfigClone = _.cloneDeep(baseConfig)

Object.keys(baseConfigClone.entry).forEach(function (name) {
  baseConfigClone.entry[name] = [ path.join(config.rootpath, 'axx-cli-config/dev-client') ].concat(baseConfigClone.entry[name])
})

module.exports = merge(baseConfigClone, {

  devtool: config.devtool,

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ].concat(
    htmlGenerator()
  )
})
