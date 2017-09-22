#!/usr/bin/env node

require('shelljs/global')
let program = require('commander')

program
  .usage('<command> [options]')
  .parse(process.argv)

cd(__dirname)

exec('npm install ' + program.args[0])
