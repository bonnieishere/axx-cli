/**
 * @file 工具函数集合
 * @author dongkunshan(dongkunshan@gaosiedu.com)
 */

const path = require('path');

module.exports = {
  temp: {
    'vue-multi': path.resolve(__dirname, 'temp', 'vue2-multi'),
    'vue-spa': path.resolve(__dirname, 'temp', 'vue2-multi'),
    'react': path.resolve(__dirname, 'temp', 'react-temp'),
  },
  tempUrl: {
    'vue-multi': 'github:windwithfo/vue2-multi',
    'vue-spa': 'github:windwithfo/vue2-spa',
    'react': 'github:windwithfo/react-temp',
  }
};
