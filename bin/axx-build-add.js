#!/usr/bin/env node

require('shelljs/global')
let program = require('commander')

let colors = require('colors')

if (!process.argv.slice(2).length) {
  program.outputHelp(make_red);
}

function make_red(txt) {
  return colors.red(txt); //display the help text in red on the console
}

program
  .usage('<command> [options]')
  .parse(process.argv)

cd(__dirname)

exec('npm install ' + program.args[0] + ' --save --registry=https://registry.npm.taobao.org')
