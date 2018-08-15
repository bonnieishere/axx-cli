#!/usr/bin/env node

const program = require('commander');

program.version(require('../package').version, '-v, --version')
  .usage('<command> [options] \n  淘宝镜像：--registry=https://registry.npm.taobao.org')
  .command('init', '创建新项目')
  .command('run', '启动项目')
  .command('clean', '清理项目')
  .command('pub', '构建项目');

program.parse(process.argv);
