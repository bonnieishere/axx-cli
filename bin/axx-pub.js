#!/usr/bin/env node

const program = require('commander');

program.usage('axx pub');

program.on('--help', function() {
  console.log('');
  console.log('  Examples:');
  console.log('');
  console.log('    $ axx pub');
  console.log('');
});

program.parse(process.argv);
