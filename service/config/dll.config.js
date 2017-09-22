const webpack = require('webpack')
const path = require('path')
let config = require(path.resolve(process.cwd(), 'config'))

const vendors = [
  'react',
  'react-dom',
  'react-router',
  'react-redux',
  'lodash',
  'redux',
  'antd'
]

module.exports = {
  output: {
    path: path.resolve(config.devpath, 'assets/libs'),
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
