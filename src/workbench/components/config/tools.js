/*
 * @Description: 配置文件
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2022-05-06 15:30:26
 * @LastEditTime: 2023-08-17 18:13:47
 * @LastEditors: Please set LastEditors
 * @FilePath: \dss-new-ui-xh\src\components\comps\KWorkbench\config\tools.js
 */

import defaultConfig from './defaultConfig'

console.log('defaultConfig', defaultConfig)

// 注册组件
const componentData = (function () {
  const components = Object.freeze(defaultConfig.componentData)

  // 组件逻辑
  const newComponents = {}
  for (const key in components) {
    const item = components[key]
    if (item.propsSchema && item.propsSchema.id) {
      newComponents[item.propsSchema.id] = item
    }
  }
  return Object.freeze(newComponents)
}())

// 跳转链接配置
const URLConfig = defaultConfig.URLConfig

/*
 * @description: 跳转编辑工作台页面快捷键
 * 快捷键功能是功能需要按照 Vue ShortKey插件
 * 安装 (Install)
 * npm install vue-shortkey --save
 * 用法 (Usage)
 * Vue.use(require('vue-shortkey'))
 */
const shortcutKey = defaultConfig.shortcutKey

// 画布相关数据
const panelConfig = defaultConfig.panelConfig

// 初始化配置--图片库
const getGenerateImagesLibrary = (function () {
  const path = require('path')
  // 读取文件的路径 是否遍历文件的子目录 匹配文件正则表达式
  const files = require.context('@/assets/icon/library', false, /\.(png|jpg|gif|jpeg|webp|ico|svg)$/)
  // files(key).default拿到该模板的vue对象
  const imgJson = {}
  files.keys().forEach(key => {
    const name = path.basename(key).replace(path.extname(key), '')
    imgJson[name] = {
      extname: path.extname(key),
      basename: path.basename(key),
      file: require('@/assets/icon/library' + key.slice(1)),
      name: name
    }
  })

  return Object.freeze(imgJson)
}())

export {
  URLConfig,
  panelConfig,
  componentData,
  shortcutKey,
  getGenerateImagesLibrary
}
