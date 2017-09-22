#!/usr/bin/env node

/**
 * 自动化工具模块，入口文件，对外开放，编译、本地调试、打包接口
 */

let server = require('./server')
let build = require('./build')

module.exports = { server, build }