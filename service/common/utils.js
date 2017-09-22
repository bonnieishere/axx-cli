/**
 * 公共方法，公共的方法都挂载到这里
 */

let lodash = require('lodash')
let path = require('path')
let fs = require('fs')
let os = require('os')
let Mock = require('mockjs')

let _ = module.exports = function () {}

// 将lodash内部方法的引用挂载到utils上，方便使用
lodash.assign(_, lodash)

/**
 * 生成js路径
 * @param  {String}  config 配置项
 * @return {String}
 * @memberOf axx-common.util
 * @name getEntry
 * @function
 */
_.getEntry = function (config) {
  return _.reduce(config.views, (result, value, key) => {
    result[key] = `${config.devpath}/apps/${key}/index.jsx`
    return result;
  }, {})
}

/**
 * mock代理
 * @param  {String}   dir   目录
 * @return  {String}  req   require
 * @return  {String}  res   response
 * @return  {String}  next  上下文
 * @memberOf axx-common.util
 * @name mock
 * @function
 */
_.mock = function (dir) {
  return function (req, res, next) {
    let url = req.url.split('?')[0]
    let filepath = path.join(path.resolve(), 'src/mocks') + url + '.js'
    try {
      let content = String(fs.readFileSync(filepath, 'utf8')).trim() || '{}'


      if (content) {
        let data = new Function('req', content)(req)

        res.set('Access-Control-Allow-Origin', '*')
        res.set('Access-Control-Allow-Headers', 'X-Requested-With')
        res.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')

        res.json(Mock.mock(data))
      } else {
        res.json({ error: '文件内容为空' })
      }
    }catch(e) {
      res.json({ error: '没有找到接口文件' })
    }

  }
}

/**
 * 判断当前系统是否是Mac
 * @return  {Boolean} 返回是否是Mac
 * @memberOf axx-common.util
 * @name isMac
 * @function
 */
_.isMac = function () {
  return os.platform() === 'darwin'
}

/**
 * 获取当前机器的ipv4
 * @return  {String} 返回当前机器的ipv4
 * @memberOf axx-common.util
 * @name getIpV4
 * @function
 */
_.getIpV4 = function () {
  let interfaces = require('os').networkInterfaces()

  for(let devName in interfaces){
    let iface = interfaces[devName]

    for(let i = 0;i < iface.length;i++){
      let alias = iface[i]
      if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
        return alias.address
      }
    }
  }
}