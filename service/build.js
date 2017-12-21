/**
 * 编译脚本
 */
process.env.NODE_ENV = 'production'

require('shelljs/global')
let path = require('path')
let config = require(path.resolve(process.cwd(), 'axx-cli-config/config'))

let os = require("os")
let fs = require("fs")
let ora = require('ora')
let moment = require('moment')

let webpack = require('webpack')
let webpackConfig = require('./config/prod.config')
let ProgressPlugin = require('webpack/lib/ProgressPlugin')
let hook = require(path.resolve(process.cwd(), 'axx-cli-config/custom/hook'))

// webpack编译
function webpackCompile() {

  let spinner = ora('')
  spinner.start()

  webpackConfig.progress = true
  
  hook.onBeforeBuild(webpackConfig)

  let compiler = webpack(webpackConfig)

  compiler.apply(
    new ProgressPlugin(function (percentage, msg) {
      spinner.text = 'building for production... ' + (percentage * 100).toFixed(0) + '% ' + msg;
    })
  )

  compiler.run(function (err, stats) {
    hook.onBeforeBuild(err, stats)

    if(stats.hasErrors()) {
      console.log('构建失败，错误信息如下：')
      console.log(stats.toString({
        'errors-only': true
      }))
    } else {
      console.log('\nwebpack打包完成, 时间为：' + (stats.endTime - stats.startTime) + 'ms')
    }

    spinner.stop()
    if (err) throw err
  })
}

module.exports = () => {
  webpackCompile()
}
