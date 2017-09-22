/**
 * webpack 主体配置
 */

const path = require('path')
const proxy = require('./proxy.config')

const devpath = path.join(process.cwd(), 'src')
const rootpath = process.cwd()

module.exports = {
  // 监听端口
  port: 8004,

  // 开发源文件路径
  devpath: devpath,

  //根路径
  rootpath: rootpath,

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

  // 是否请求mock接口
  mock: false,

  // 请求代理配置
  proxy: proxy,

  views: require(path.resolve(rootpath, 'src/views')),

  build: {
    env: 'production',

    // 资源文件访问路径
    assetsSubDirectory: 'static',

    // 生产时输出路径配置
    prodRoot: path.join(rootpath, 'prod'),

    // 是否有source map
    productionSourceMap: true
  },

  //抽离需要抽离的依赖
  vendors: [
    'react',
    'react-dom',
    'react-router',
    'react-redux',
    'lodash',
    'redux',
    'antd'
  ],

  //配置全局依赖
  externals: {
    'Jquery': '$'
  }
}
