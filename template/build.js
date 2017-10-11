require('shelljs/global')

module.exports = () => {
  rm('-rf', config.build.prodRoot)
  mkdir('-p', config.build.prodRoot)
  mkdir('-p', config.build.prodRoot + '/')
  cp('-R', path.join(config.devpath, 'assets'),
    config.build.prodRoot + (os.platform() === 'darwin' ? '/assets/' : '/assets/')
  )
}