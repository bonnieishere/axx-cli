const path = require("path")
const exec = require("child_process").exec
const tempPath = path.join(__dirname, '../template')
const rootFile = '.babelrc .gitignore .eslintrc package.json'

exec('mkdir -p ' + path.resolve(process.cwd(), 'axx-cli-config'), () => {
  exec('cd '+ tempPath +';cp -R `ls '+ tempPath +' | grep -v "' + rootFile + '"| xargs` ' + path.resolve(process.cwd(), 'axx-cli-config'))
  exec('cd '+ tempPath +';cp -R ' + rootFile + ' ' + path.resolve())

  console.info('')
})