// lib/create.js
const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer');
const Generator = require('./generator')

module.exports = async function (name, options) {
    // 当前命令行选择的目录
    const cwd = process.cwd();
    console.log('cwd',cwd);
    
    // 需要创建的目录地址
    const targetAir = path.join(cwd, name)
    console.log('targetAir',targetAir);
    
    // 目录是否已经存在？
    if (fs.existsSync(targetAir)) {

        // 是否为强制创建？
        if (options.force) {
            await fs.remove(targetAir)
        } else {
            // TODO：询问用户是否确定要覆盖
            // 询问用户是否确定要覆盖
            const { action } = await inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: 'Target directory already exists Pick an action:',
                    choices: [
                        {
                            name: 'Overwrite',
                            value: 'overwrite'
                        }, {
                            name: 'Cancel',
                            value: false
                        }
                    ]
                }
            ])

            if (!action) {
                return;
              } else if (action === 'overwrite') {
                // 移除已存在的目录
                console.log(`\r\nRemoving...`)
                await fs.remove(targetAir)
              }
        }
    }

    // 创建项目
  const generator = new Generator(name, targetAir);

  // 开始创建项目
  generator.create()
}