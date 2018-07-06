/**
 * @file vue项目处理工具
 * @author dongkunshan(dongkunshan@gaosiedu.com)
 */

const fs     = require('fs');
const config = require('./config');

const {
  getTemp, copyTemp
} = require('./utils');

/**
 * 生成vue项目
 *
 * @param {String} page 页面类型 multi|spa
 * @param {String} name 项目名称
 */
function initVue(page, name) {
  console.log(`page is ${page}, name is ${name}`);
  // 判断模板是否存在
  fs.stat(config.temp['vue-' + page], (err, file) => {
    if (err) {
      // 不存在时下载模板
      getTemp(config.tempUrl['vue-' + page], config.temp['vue-' + page], name);
    }
    else {
      // 存在是直接拷贝
      copyTemp(config.temp['vue-' + page], name);
    }
  });
}

module.exports = {
  initVue
};
