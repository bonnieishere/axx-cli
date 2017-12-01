/**
 * webpack 主体配置
 */

const path = require('path')

const devpath = path.join(process.cwd(), 'src')
const rootpath = process.cwd()

const views = require('./custom/views')
const proxy = require('./proxy')
const webpackConfig = require('./webpack.config')

module.exports = Object.assign({
  // 监听端口
  port: 8004,

  // 开发源文件路径
  devpath: devpath,

  // 根路径
  rootpath: rootpath,

  dllpath: path.resolve(devpath, 'assets/libs'),

  // 是否请求mock接口
  mock: false,

  // 是否开启eslist
  eslint: false,

  // 请求代理配置
  proxy: proxy['online.js'],

  // 模板配置
  views: views,

  // 图片产出路径
  imagePath: 'assets/images/[name].[ext]',

  // 字体文件产出路径
  fontPath: 'static/fonts/[name].[hash:7].[ext]',

  // 设置静态文件目录
  devStatic: {
    '/assets': 'src/assets',
    '/libs': 'src/assets/libs',
    '/css': 'src/assets/css',
    '/static': 'src/assets/static',
  }
}, webpackConfig(rootpath, devpath, views))
