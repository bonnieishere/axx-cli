const fs = require('fs')

const files = fs.readdirSync(__dirname)
const proxys = {}

files.forEach(function(file) {
  if(!file.match('index.js')) {
    proxys[file] = require('./' + file)
  }
})

module.exports = proxys
