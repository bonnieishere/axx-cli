#!/usr/bin/env node

require('commander')
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('build', '执行构建模块相关执行')
  .parse(process.argv)
