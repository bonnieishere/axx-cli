/**
 * @file 工具函数集合
 * @author dongkunshan(dongkunshan@gaosiedu.com)
 */

const fs       = require('fs');
const ora      = require('ora');
const path     = require('path');
const chalk    = require('chalk');
const config   = require('./config');
const download = require('download-git-repo');

/**
 * 下载模板
 *
 * @param {String} url git url
 * @param {String} dir 模板存放目录
 *
 * @return {Promise}
 */
async function getTemp(url, dir) {
  const spinner = ora(chalk.green('download template from ' + url));
  spinner.start();
  return new Promise(function(resolve) {
    // 下载模板
    download(url, dir, function(err) {
      if (!err) {
        spinner.stop();
        resolve('ok');
      }
      else {
        spinner.stop();
        console.log(err);
      }
    });
  });
}

/**
 * 拷贝模板到当前目录
 *
 * @param {String} dir 模板目录
 * @param {String} dirName 目标目录名
 */
function copyTemp(dir, dirName) {
  console.log(chalk.green('coyp templage'));
  console.log(chalk.green(`from ${dir}`));
  console.log(chalk.green(`to ${path.join(process.cwd(), dirName)}`));
  copyDir(dir, process.cwd(), dirName);
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

/**
 * 检查模板
 *
 * @return {Promise}
 */
async function checkTemp() {
  return new Promise(async function(resolve) {
    try {
      fs.statSync(config.temp.dir);
    }
    catch (e) {
      console.log(chalk.blue('templage is not exists'));
      await getTemp(config.temp.url, config.temp.dir);
      resolve('ok');
    }
    console.log(chalk.blue('get templage suceess'));
    resolve('ok');
  });
}

module.exports = {
  copyTemp,
  copyDir,
  copyFile,
  checkTemp
};
