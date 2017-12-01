const path = require('path')
const os = require("os")
const exec = require("child_process").exec

const config = require('./config')

module.exports = {
	/**
	 * 生成编译文件 执行前
	 *
	 * @param {Object} webpackConfig 最终生成的webpackConfig文件 可修改
	 */
	onBeforeBuild: (webpackConfig) => {
	  exec('rm -rf ' + config.build.prodRoot, () => {
	    exec('mkdir -p ' + config.build.prodRoot, () => {
	      exec('cp -R ' + 
	        path.join(config.devpath, 'assets') + ' ' + 
	        config.build.prodRoot + (os.platform() === 'darwin' ? '/assets/' : '/assets/')
	      )
	    })
	  })
	},

	/**
	 * 生成编译文件 执行后
	 */
	onAfterBuild: (compilation) => {},

	/**
	 * 运行开发命令 执行前
	 */
	onBeforeDev: (webpackConfig) => {},

	/**
	 * 运行开发命令 执行后
	 *
	 * @param {Object} app express app对象
	 * @param {Object} compilation webpack编译对象
	 */
	onAfterDev: (app, compilation) => {}

}