#!/usr/bin/env node

const program = require('commander');

program.usage('axx run');

program.on('--help', function() {
  console.log('');
  console.log('  Examples:');
  console.log('');
  console.log('    $ axx run');
  console.log('');
});

program.parse(process.argv);
