#!/usr/bin/env node

let program = require('commander')
let service = require('../service')

let colors = require('colors')

if (!process.argv.slice(2).length) {
  program.outputHelp(make_red);
}

function make_red(txt) {
  return colors.red(txt); //display the help text in red on the console
}


program
  .usage('<command> [options]')
  .option('-b, --build', '启动编译', service.build)
  .option('-d, --dev', '启动本地调试', service.server)
  .parse(process.argv)