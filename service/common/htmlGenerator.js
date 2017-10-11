'use strict'

let fs = require('fs')
let path = require('path')
let config = require(path.resolve(process.cwd(), 'axx-cli-config/config'))

var onlineConfig;
if (process.env.NODE_ENV === 'production') {
  onlineConfig = config.build;
} else {
  onlineConfig = config.dev;
}

let htmlGenerator = function (views) {
  let r = []
  let HtmlWebpackPlugin = require('html-webpack-plugin')
  
  for(let key in views) {
    let re = new RegExp("(.{" + key.lastIndexOf('/') + "})")
    let jsFile = key.replace(re, 'src/apps/$1')

    let conf = {
      filename: key + '.html',
      template: path.join(config.rootpath, 'axx-cli-config/template.ejs'),
      inject: 'body',
      chunks: [jsFile],
      minify: {
        removeAttributeQuotes: true,
        minifyJS: true,
        minifyCSS: true,
        removeComments: true
      },
      params: Object.assign({
        id: key,
        staticUrl: (process.env.NODE_ENV  === 'production' ? '../../assets' : '/assets'),
        env: process.env.NODE_ENV,
        onlineConfig: onlineConfig,
        srcConfig: config
      }, views[key])
    }
    r.push(new HtmlWebpackPlugin(conf))
  }
  return r
}

module.exports = htmlGenerator
