#!/usr/bin/env node

require('shelljs/global')
let ora = require('ora')
let path = require('path')
let program = require('commander')
let webpack = require('webpack')
let ProgressPlugin = require('webpack/lib/ProgressPlugin')

let colors = require('colors')

if (!process.argv.slice(2).length) {
  program.outputHelp(make_red);
}

function make_red(txt) {
  return colors.red(txt); //display the help text in red on the console
}

const temp = path.join(__dirname, '../template/*')

let _createEmptyProject = function () {
  console.log('hello world')
}


let _initProject = function () {
  let spinner = ora('')

  let dllConfig = require('../service/config/dll.config')
  spinner.start()
  dllConfig.watch = true
  dllConfig.progress = true

  console.log(dllConfig)

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
}

let _initConfig = function () {
  mkdir('-p', path.resolve(process.cwd(), 'axx-cli-config'))
  cp('-R', temp, path.resolve(process.cwd(), 'axx-cli-config'))
}

program
  .usage('<command> [options]')
  .option('-b, --begin', '初始化一个空项目（暂无）', _createEmptyProject)
  .option('-c, --config', '初始化配置文件', _initConfig)
  .option('-s, --start', '执行配置文件', _initProject)
  .parse(process.argv)


