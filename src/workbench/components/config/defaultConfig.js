/*
 * @Description: 配置文件
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2023-08-17 18:16:31
 * @FilePath: /k-cbm/packages/components/b-workbench/src/components/config/defaultConfig.js
*/

import test from '../viewComponents/test'
import test2 from '../viewComponents/test2'
import test3 from '../viewComponents/test3'
import operation from '../viewComponents/operation'
import toDoList from '../viewComponents/toDoList'
let certifiedComponents= {
    test,
    test2,
    test3,
    operation,
    toDoList
}


















// -------------------------------------- 下面最好不要动 ----------------------------------------------------------
const files = require.context('@/app-config/', false, /\workbench-tools.js/)
console.log(files.keys())
const filedata = files.keys()
let newdefaultConfig = {}
// 判断是否有该文件
if (filedata.length > 0) {
  const workbenchTools = require('@/app-config/workbench-tools.js')
  console.log('workbenchTools', workbenchTools)
  if (JSON.stringify(workbenchTools) !== '{}') {
    newdefaultConfig = workbenchTools.default
  }
}

let customConfig = newdefaultConfig['componentData'] || {}
const defaultConfig = {
  componentData: {
    ...certifiedComponents,
    ...customConfig,
  },
  URLConfig: {
    // 编辑
    edit: newdefaultConfig?.URLConfig?.edit || '/workbench/custom/edit',
    // 预览
    preview: newdefaultConfig?.URLConfig?.preview || '/workbench/custom/see',
    // 组件管理
    components: newdefaultConfig?.URLConfig?.components || '/workbench/custom/admin?index=1',
    // 模板管理
    template: newdefaultConfig?.URLConfig?.template || '/workbench/custom/admin?index=0'
  },
  // 跳转编辑工作台页面快捷键
  shortcutKey: newdefaultConfig?.shortcutKey || [{
    show: false, // 是否在工作台页面启用快捷键 （true:启用  false:不启用，如果您在非工作台设置了快捷键，建议将他设置为false）
    url: '/workbench/custom/edit',
    key: ['ctrl', 'shift', 'e'],
    desc: '组合快捷键 ctrl + shift + e 跳转到工作台编辑页面'
  }],
  // 画布相关数据
  panelConfig: {
    gridLayoutConfig: {
      colNum: newdefaultConfig?.panelConfig?.gridLayoutConfig?.colNum || 38, // type: Number   default: 12             定义栅格系统的列数，其值需为自然数。
      maxRows: newdefaultConfig?.panelConfig?.gridLayoutConfig?.maxRows || Infinity, // type: Number   default: Infinity      定义最大行数。
      rowHeight: newdefaultConfig?.panelConfig?.gridLayoutConfig?.rowHeight || '48', // type: Number   default: 48 || 0.7vh       每行的高度，单位像素。
      isDraggable: newdefaultConfig?.panelConfig?.gridLayoutConfig?.isDraggable || true, // type: Boolean   default: true          标识栅格中的元素是否可拖拽。
      isResizable: newdefaultConfig?.panelConfig?.gridLayoutConfig?.isResizable || true, // type: Boolean   default: true           标识栅格中的元素是否可调整大小。
      verticalCompact: newdefaultConfig?.panelConfig?.gridLayoutConfig?.verticalCompact || true, // type: Boolean   default: true           标识布局是否垂直压缩
      useCssTransforms: newdefaultConfig?.panelConfig?.gridLayoutConfig?.useCssTransforms || true, // type: Boolean   default: true           标识是否使用CSS属性 transition-property: transform;
      margin: newdefaultConfig?.panelConfig?.gridLayoutConfig?.margin || [2, 2], // type: Array   default: [10, 10]           定义栅格中的元素边距。
      zIndexType: newdefaultConfig?.panelConfig?.gridLayoutConfig?.zIndexType || 'silence', // type: String   default: "silence"        组件层级。  仅在子组件没有设置zIndex 的情况下生效 【silence：添加多少组件，z-index 始终为 0。 superposition：通过index 下标作为层级表示】
      minHeight: newdefaultConfig?.panelConfig?.gridLayoutConfig?.minHeight || '700px' // type: Number         定义最小高度，单位像素。
    }
  }
}

export default defaultConfig
