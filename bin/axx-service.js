#!/usr/bin/env node

let program = require('commander')
let service = require('../service')


program
  .option('-b, --build', 'run build product', service.build)
  .option('-d, --dev', 'run project dev', service.server)
  .parse(process.argv)