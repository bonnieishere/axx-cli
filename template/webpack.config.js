/**
 * webpack 主体配置
 */
const path = require('path')
const getEntry = require('./custom/getEntry')
const getHtml = require('./custom/getHtml')

module.exports = function(rootpath, devpath, views) {

	return {
		// 入口文件
		entry: getEntry(rootpath, devpath),

		// html文件配置
		html: getHtml(rootpath, devpath),

	  // 生产配置
	  build: {
	    output: {
	      path:  path.join(rootpath, 'prod') + '/assets/',
	      publicPath: '../../assets/',
	      filename: '[name].[hash:6].min.js'
	    }
	  },

		// 需要解析的文件后缀
	  extensions: [ '', '.js', '.jsx', '.css', '.less', '.json' ],

	  // 定义import引用别名
	  externals: {
	    'Jquery': '$'
	  },

	  // 定义别名
	  alias: {
	    'fantasy': path.resolve(rootpath, 'fantasy/src/'),
	    'redux-common': path.resolve(rootpath, 'fantasy/src/redux-common'),
	    'components': path.resolve(devpath, 'components'),
	    'apis': path.resolve(devpath, 'apis'),
	    'utils': path.resolve(devpath, 'utils'),
	    'filters': path.resolve(devpath, 'apps/filters'),
	    'modules': path.resolve(devpath, 'modules'),
	    'mocks': path.resolve(devpath, 'mocks')
	  },

	  // 抽离需要抽离的依赖
	  vendors: [
	    'react',
	    'react-dom',
	    'react-router',
	    'react-redux',
	    'lodash',
	    'redux',
	    'antd'
		],
		
		// source map config
		devtool: '#eval-source-map'
	}
}