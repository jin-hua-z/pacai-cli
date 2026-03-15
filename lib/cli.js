#! /usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const figlet = require("figlet");
const chalk = require('chalk');

program
  .name('zr')
  .description('A simple CLI tool for creating projects from templates')
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]');

program
  .command('create <app-name>')
  .description('create a new project')
  .option('-f, --force', 'overwrite target directory if it exists')
  .action((name, options) => {
    require('./create')(name, options);
  });

program
  .command('config [value]')
  .description('inspect and modify the config')
  .option('-g, --get <path>', 'get value from config')
  .option('-s, --set <path> <value>', 'set value in config')
  .option('-d, --delete <path>', 'delete option from config')
  .action((value, options) => {
    console.log(chalk.yellow('⚙️  Config command is not implemented yet'));
    console.log(chalk.gray('This feature is planned for a future release'));
  });

// 配置 ui 命令
program
  .command('ui')
  .description('start the interactive UI server')
  .option('-p, --port <port>', 'Port used for the UI Server')
  .action((option) => {
    console.log(chalk.yellow('🖥️  UI command is not implemented yet'));
    console.log(chalk.gray('This feature is planned for a future release'));
  });

// 监听 --help 执行
program
  .on('--help', () => {
    // 使用 figlet 绘制 Logo
    console.log('\r\n' + figlet.textSync('ZR-CLI', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
      }));
    // 新增说明信息
    console.log(`\r\n${chalk.cyan('Run zr <command> --help for detailed usage of given command')}\r\n`);
  });

// 解析用户执行命令传入参数
program.parse(process.argv);