const fs = require('fs')
const path = require('path')
const views = require('./views')

module.exports = function(context) {
  const r = []
  const staticUrl = (process.env.NODE_ENV  === 'production' ? '../../assets' : '/assets')

  for(let key in views) {
    let re = new RegExp("(.{" + key.lastIndexOf('/') + "})")
    let jsFile = key.replace(re, 'src/apps/$1')

    let conf = {
      filename: key + '.html',
      template: path.join(__dirname, '../template.ejs'),
      inject: 'body',
      chunks: [ jsFile ],
      minify: {
        removeAttributeQuotes: true, minifyJS: true, minifyCSS: true, removeComments: true
      },
      params: Object.assign({
        id: key,
        staticUrl: staticUrl,
        env: process.env.NODE_ENV
      }, views[key])
    }

    if(key == 'login') {
      delete conf.template
      conf.templateContent = '<html><head><title>爱学习管理后台</title><script src="'+ staticUrl +'/libs/vendor.js"></script></head><body><div id="root"></div></body></html>'
    }
    
    r.push(conf)
  }

  return r
}