const webpack = require('webpack')
const path = require('path')
const _ = require('lodash')
let config = require(path.resolve(process.cwd(), 'axx-cli-config/config'))

//修改entry路径，entry路径指向axx-cli内部集成的node_modules
let vendors = _.flatMap(config.vendors, (o) => path.join(path.resolve(__dirname, '../../node_modules'), o))

module.exports = {
  output: {
    path: config.dllpath,
    filename: '[name].js',
    library: '[name]',
  },
  entry: {
    vendor: vendors
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../../node_modules')]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DllPlugin({
      path: path.join(config.rootpath, 'manifest.json'),
      name: '[name]',
      context: __dirname,
    }),
  ]
}

