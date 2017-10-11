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

// baseConfig.entry['demo'] = `${path.join(__dirname, '../../demo/index.jsx')}`
// config.views['demo'] = {
//   key: 'demo',
//   title: 'CRUD DEMO'
// }

Object.keys(baseConfig.entry).forEach(function (name) {
  baseConfig.entry[name] = [ path.join(config.rootpath, 'axx-cli-config/dev-client') ].concat(baseConfig.entry[name])
})

module.exports = merge(baseConfig, {

  devtool: '#eval-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ].concat(
    htmlGenerator(config.views)
  )
})
