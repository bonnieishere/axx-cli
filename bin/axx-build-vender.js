require('shelljs/global')

let ora = require('ora')
let path = require('path')
let program = require('commander')
let webpack = require('webpack')
let ProgressPlugin = require('webpack/lib/ProgressPlugin')

let spinner = ora('')

let dllConfig = require('../service/config/dll.config')
spinner.start()
dllConfig.watch = true
dllConfig.progress = true

let compiler = webpack(dllConfig)
compiler.apply(
  new ProgressPlugin(function (percentage, msg) {
    spinner.text = '初始化中 ... ' + (percentage * 100).toFixed(0) + '% ' + msg;
  })
)

compiler.run(function (err, stats) {

  if(stats.hasErrors()) {
    console.log('构建失败，错误信息如下：')
    console.log(stats.toString({
      'errors-only': true
    }))
  } else {
    console.log('\n初始化完毕, 时间为：' + (stats.endTime - stats.startTime) + 'ms')
  }

  spinner.stop()
  if (err) throw err
})
