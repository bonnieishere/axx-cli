const path = require('path')
const views = require('./views')

module.exports = function() {
  var newObj = {}

  for(var key in views) {
    newObj[key] = `${path.resolve()}/src/apps/${key}/index.jsx`
  }
  
  return newObj
}