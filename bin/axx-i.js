const execSync = require('child_process').execSync
const args = process.argv.slice(2)

execSync('npm install ' + args.join(' ') +' --registry=https://registry.npm.taobao.org', {stdio:[0, 1, 2]})