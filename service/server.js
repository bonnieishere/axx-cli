/**
 * 本地调试脚本
 */
process.env.NODE_ENV = 'development'
let ora = require('ora')
let path = require('path')
let express = require('express')
let proxy = require('express-http-proxy')
let webpack = require('webpack')
let _ = require('./common/utils')
let config = require(path.resolve(process.cwd(), 'config'))
let ProgressPlugin = require('webpack/lib/ProgressPlugin')
let webpackConfig = require('./config/dev.config')
let app = express()
// 监听端口
let port = config.port
// 代理配置
let proxyTable = config.proxy

let compiler = webpack(webpackConfig)
// 编译webpack
function webpackCompiler() {
  let spinner = ora('building...')

  process.nextTick(() => {
    spinner.start()
  })
  compiler.apply(
    new ProgressPlugin(function (percentage, msg) {
      spinner.text = 'building... ' + (percentage * 100).toFixed(0) + '% ' + msg
      if (percentage === 1) {
        spinner.stop()
      }
    })
  )
  let devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    quiet: false,
    noInfo: true,
    stats: {
      colors: true,
      chunks: false,
      assets: true
    }
  })
  let hotMiddleware = require('webpack-hot-middleware')(compiler)
  // force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({ action: 'reload' })
      cb()
    })
  })
  app.use(require('connect-history-api-fallback')())
  app.use(devMiddleware)
  app.use(hotMiddleware)
}
// 设置后端接口代理
function setProxy() {
  proxyTable.forEach(function (_proxy) {
    app.all(
      _proxy.url,
      proxy(
        _proxy.host,
        decorateProxy.call(this)
      )
    )
  })
}
//代理装饰
function decorateProxy() {
  return {
    decorateRequest: function (proxyReq, originalReq) {
      proxyReq.headers['appId'] = '2'
      return proxyReq
    }
  }
}
// 设置静态文件目录
function setStatic() {
  app.use('/assets', express.static(path.join(config.rootpath, 'src/assets')))
  app.use('/libs', express.static(path.join(config.rootpath, 'src/assets/libs')))
  app.use('/css', express.static(path.join(config.rootpath, 'src/assets/css')))
}
// 绑定mock apis
function bindMock() {
  app.use('/api', _.mock(path.join(config.rootpath, 'src/mocks')))
}
// 启动服务
function startServer() {
  if (config.mock) {
    bindMock()
  } else {
    setProxy()
  }
  webpackCompiler()
  setStatic()
  app.listen(port, function (err) {
    if(err) {
      console.log(err)
      return
    }
    console.log('Listening at http://' + _.getIpV4() + ':' + port + '\n')
  })
}
module.exports = () => {
  startServer()
}
