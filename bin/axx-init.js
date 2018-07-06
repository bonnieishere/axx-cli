#!/usr/bin/env node

const inquirer      = require('inquirer');
const program       = require('commander');
const { initVue }   = require('../lib/feature-vue');
const { initReact } = require('../lib/feature-react');

program.usage('axx init');

program.on('--help', () => {
  console.log('');
  console.log('  Examples:');
  console.log('');
  console.log('    $ axx init');
  console.log('');
});

program.action(function () {
  inquirer.prompt([{
    type: 'checkbox',
    name: 'type',
    message: 'select project type'
  }]).then((answers) => {
    console.log(answers);
  });
});

program.parse(process.argv);

// initVue('multi', 'demo');
// return;
// initReact('multi', 'demo');

// 获取用户输入
inquirer.prompt([{
  type: 'list',
  name: 'type',
  message: 'select project type',
  choices: ['vue', 'react']
},
{
  type: 'list',
  name: 'page',
  message: 'select view type',
  choices: ['multi', 'spa']
}, {
  type: 'input',
  name: 'name',
  message: 'input your project name',
  default: 'demo'
}]).then((answers) => {
  // 判断用户输入，调用项目初始化方法
  switch (answers.type) {
    case 'vue':
      initVue(answers.page, answers.name);
      break;
    case 'react':
      initReact(answers.page, answers.name);
      break;
  }
}).catch((error) => {
  console.log(error);
});
