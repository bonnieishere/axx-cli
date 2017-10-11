const webpack = require('webpack')
const path = require('path')
let config = require(path.resolve(process.cwd(), 'axx-cli-config/config'))

const vendors = config.vendors

module.exports = {
  output: {
    path: config.dllpath,
    filename: '[name].js',
    library: '[name]',
  },
  entry: {
    vendor: vendors
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

