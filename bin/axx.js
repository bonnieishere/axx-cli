#!/usr/bin/env node

require('commander')
  .version(require('../package').version)
  .usage('<command> [options] \n  淘宝镜像：--registry=https://registry.npm.taobao.org')
  .command('build', '执行构建模块相关执行')
  .command('i', '执行 npm i <packages> --registry=https://registry.npm.taobao.org 指令')
  .parse(process.argv)
