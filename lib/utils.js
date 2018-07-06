/**
 * @file 工具函数集合
 * @author dongkunshan(dongkunshan@gaosiedu.com)
 */

const fs       = require('fs');
const ora      = require('ora');
const path     = require('path');
const download = require('download-git-repo');

/**
 * 下载模板
 *
 * @param {String} url git url
 * @param {String} path 模板目录
 * @param {String} dir 目标目录
 */
function getTemp(url, path, dir) {
  const spinner = ora('download template from ' + url);
  spinner.start();
  // 下载模板
  download(url, path, function(err) {
    if (!err) {
      spinner.stop();
      // 下载完成后拷贝
      copyTemp(path, dir);
    }
    else {
      spinner.stop();
      console.log(err);
    }
  });
}

/**
 * 拷贝模板到当前目录
 *
 * @param {String} path 模板目录
 * @param {String} dir 目标目录名
 */
function copyTemp(path, dir) {
  copyDir(path, process.cwd(), dir);
}

/**
 * 复制文件
 *
 * @param {String} from 源路径
 * @param {String} to 目标路径
 */
function copyFile(from, to) {
  fs.createReadStream(from).pipe(fs.createWriteStream(to));
}

/**
 * 复制文件夹
 *
 * @param {String} from 源路径
 * @param {String} to 目标路径
 * @param {String=} dirName 新文件夹名
 */
function copyDir(from, to, dirName) {
  // 创建文件夹
  if (dirName) {
    // 创建指定名称文件夹
    fs.mkdirSync(path.join(to, dirName));
  }
  else {
    // 创建默认名称文件夹
    fs.mkdirSync(path.join(to, path.basename(from)));
  }
  // 读取所有文件
  const files = fs.readdirSync(from);
  // 遍历文件
  files.forEach(function(file) {
    // 获取文件状态
    const info = fs.statSync(path.join(from, file));
    // 如果是文件夹递归调用
    if(info.isDirectory()) {
      copyDir(path.join(from, file), path.join(to, dirName), file);
    }
    // 如果是文件直接复制
    else {
      copyFile(path.join(from, file), path.join(to, dirName, file));
    }
  });
}

module.exports = {
  copyTemp,
  getTemp,
  copyDir,
  copyFile
};