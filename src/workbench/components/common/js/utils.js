/*
 * @Description:
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2022-05-13 14:14:57
 * @LastEditTime: 2023-08-19 17:17:31
 * @LastEditors: Please set LastEditors
 * @FilePath: \k-cbm\packages\components\b-workbench\src\components\common\js\utils.js
*/

// 生成UUID
export function getUUID () {
  // 用于生成uuid
  const S4UUID = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4UUID() + S4UUID() + '-' + S4UUID() + '-' + S4UUID() + '-' + S4UUID() + '-' + S4UUID() + S4UUID() + S4UUID())
}

// 解决屏幕显示缩放比例125%,150%对页面布局的影响
export const detectZoom = (way) => {
  let ratio = 0
  const SYSTEM_ZOOM_SIZE = localStorage.getItem('SYSTEM_ZOOM_STATE')
  if (SYSTEM_ZOOM_SIZE && SYSTEM_ZOOM_SIZE === 'true' && way !== 'SYSTEM') {
    ratio = 100
  } else {
    const screen = window.screen
    const ua = navigator.userAgent.toLowerCase()
    // eslint-disable-next-line no-undefined
    if (window.devicePixelRatio !== undefined) {
      ratio = window.devicePixelRatio
    } else if (~ua.indexOf('msie')) {
      if (screen.deviceXDPI && screen.logicalXDPI) {
        ratio = screen.deviceXDPI / screen.logicalXDPI
      }
    } else if (
        // eslint-disable-next-line no-undefined
      window.outerWidth !== undefined &&
      // eslint-disable-next-line no-undefined
        window.innerWidth !== undefined
    ) {
      ratio = window.outerWidth / window.innerWidth
    }
    if (ratio) {
      ratio = Math.round(ratio * 100)
    }
    if (way === 'INIT' || way === 'SYSTEM') {
      if (ratio >= 200) {
        ratio = 200
      } else if (ratio >= 175) {
        ratio = 175
      } else if (ratio >= 150) {
        ratio = 150
      } else if (ratio >= 125) {
        ratio = 125
      }
    }
  }
  return ratio
}

// 只保证同时生成不重复
export default function genIdFn () {
  let preKey = `${+new Date()}`
  let key = 0
  return () => {
    const curTimestamp = `${+new Date()}`
    // console.log('只保证同时生成不重复')
    if (curTimestamp === preKey) {
      key += 1
    } else {
      // 重置 key
      key = 0
    }

    preKey = curTimestamp
    return `${preKey}x${key}`
  }
}

// 初始化配置数据并返回所有组件
export function getComponentsAndInit (configTools, name = 'View') {
  // console.log('初始化配置数据并返回所有组件初始化配置数据并返回所有组件初始化配置数据并返回所有组件初始化配置数据并返回所有组件')
  // console.log(configTools)

  const data = {}
  for (const key in configTools) {
    if (configTools[key][name]) {
      data[key] = configTools[key][name]
    }
  }

  // console.log('datadatadata')
  // console.log(data)

  // 冻结配置数据
  Object.freeze(configTools)
  return data
}

// 初始化配置数据并返回所有组件
export function getComponentsAndInitToolsConfig (configTools, name = 'View') {
  // 平铺开所有组
  const componentList = configTools.reduce((preVal, curVal) => [
    ...preVal,
    ...curVal.componentList
  ], [])

  // console.log('平铺开所有组')
  // console.log(componentList)

  // 注册组件结构
  const data = componentList.reduce((preVal, { componentPack }) => {
    // 修改原数据
    // 生成 From组件和View组件 Name
    const needViewName = !componentPack.componentViewName

    // 需要生成viewName
    // console.log('需要生成viewName')
    if (needViewName) {
      const id = ((componentPack.propsSchema && (componentPack.propsSchema.id || componentPack.propsSchema.$id)) || genIdFn())
      if (needViewName) {componentPack.componentViewName = `${id}`}
    }

    preVal[componentPack.componentViewName] = componentPack[name]

    Object.freeze(componentPack)
    return preVal
  }, {})

  // 冻结配置数据
  Object.freeze(configTools)
  return data
}
