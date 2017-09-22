#!/usr/bin/env node

require('commander')
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('init', 'generate a new project from a template')
  .command('service', 'run dev env or run build')
  .command('add <lang>', 'add node modules')
  .parse(process.argv)
