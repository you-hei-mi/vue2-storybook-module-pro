/*
 * @Description: KWorkbench 组件接口
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2022-05-08 13:14:07
 * @LastEditTime: 2023-09-11 19:01:28
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue2-storybook-module-pro\src\api\workbench\index.js
 */

/**
 * 查询所有组件
 */
export const basicInfoList = ({
    mockData = { "comList": [ { "comId": "1557290544791093249", "comCode": "industryFunds", "comName": "组件1", "comTypeValue": "common", "comDesc": "组件1", "comImg": "list" }, { "comId": "1598615300347445250", "comCode": "redemptionAnalysis", "comName": "组件2", "comTypeValue": "common", "comDesc": "组件2", "comImg": "chart" } ], "typeList": [ { "id": "173", "dictId": "999", "label": "通用", "value": "common", "sort": "1", "remarks": "组件通用类型" }, { "id": "174", "dictId": "999", "label": "宏观市场", "value": "macro", "sort": "2", "remarks": "组件宏观类行" }, { "id": "175", "dictId": "999", "label": "操作", "value": "operate", "sort": "3", "remarks": "组件操作类型" } ] },
    delay = 500
  } = {}) => new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: '200',
        data: mockData
      })
    }, delay)
  })

/**
 * 工作台根据组件代码查询组件
 */
export const basicInfoQuery = ({
    mockData = { "comId": "1648601741189509121", "comCode": "investmentLinkage", "comName": "测试组件", "comImg": "list", "comTypeValue": "common", "comDesc": "展示代表公司整体的规模及收益的投连排名指标。", "layoutX": null, "layoutY": null, "layoutW": 12, "layoutH": 9, "minW": 12, "minH": 9, "maxW": 24, "maxH": 16, "isDraggable": "1", "isResizable": "1", "isDelete": "1", "createBy": "dssdev", "createTime": "2023-04-20 14:31:02", "updateBy": "dssdev", "updateTime": "2023-04-19 16:17:39", "enable": "1", "delFlag": "0" },
    delay = 500
  } = {}) => new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: '200',
        data: mockData
      })
    }, delay)
  })

/**
 * 工作台开通校验
 */
export const wbcheck = ({
    mockData = true,
    delay = 500
  } = {}) => new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: '200',
        data: mockData
      })
    }, delay)
  })
/**
 * 重置工作台
 */
export const wbreset = ({
    mockData = true,
    delay = 500
  } = {}) => new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: '200',
        data: mockData
      })
    }, delay)
  })
/**
 * 工作台模板新增
 */
export function workbenchTempAdd (data) {
  return request({
    url: `${baseUrl}/workbench/temp/add`,
    method: 'post',
    data
  })
}

/**
 * 查询所有组件类型
 */
export function basicInfoType () {
  return request({
    url: `${baseUrl}/workbench/basicInfo/type`,
    method: 'get'
  })
}

/**
 * 工作台组件重命名
 *
 * {
    "comId":"",
    "comName":""
  }
 */

export function basicInfoRename (data) {
  return request({
    url: `${baseUrl}/workbench/basicInfo/rename`,
    method: 'post',
    data
  })
}

/**
 * 分页查询组件信息
 */
export function basicInfoPage (query) {
  return request({
    url: `${baseUrl}/workbench/basicInfo/page`,
    method: 'get',
    params: query
  })
}

/**
 * 工作台组件新增
 *
 * {
    "comName":"xx",
    "typeId":"xx",
    "comDesc":"xx",
    "layoutX":"1",
    "layoutY":"1",
    "layoutW":"1",
    "layoutH":"1",
    "minW":"1",
    "minH":"1",
    "maxW":"1",
    "maxH":"1",
    "isDraggable":"1",
    "isResizable":"1",
    "isDelete":"1"
}
 */
export function basicInfoAdd (data) {
  return request({
    url: `${baseUrl}/workbench/basicInfo/add`,
    method: 'post',
    data
  })
}

/**
 * 工作台组件修改
 *
 * {
    "comName":"xx",
    "typeId":"xx",
    "comDesc":"xx",
    "layoutX":"1",
    "layoutY":"1",
    "layoutW":"1",
    "layoutH":"1",
    "minW":"1",
    "minH":"1",
    "maxW":"1",
    "maxH":"1",
    "isDraggable":"1",
    "isResizable":"1",
    "isDelete":"1"
}
 */
export function basicInfoUpdate (data) {
  return request({
    url: `${baseUrl}/workbench/basicInfo/update`,
    method: 'post',
    data
  })
}

/**
 * 工作台组件删除
 *
 * comId
 */
export function basicInfoRemove (query) {
  return request({
    url: `${baseUrl}/workbench/basicInfo/remove`,
    method: 'get',
    params: query
  })
}
/**
 * 工作台修改组件状态
 *
 * comId
 */
export function basicInfoState (data) {
  return request({
    url: `${baseUrl}/workbench/basicInfo/state`,
    method: 'post',
    data
  })
}

/**
 * 增加组件实例信息
 *
 * {
    "comInstName":"xx",
    "comCode":"xx",
    "tempId":"xx",
    "layoutX":"xx",
    "layoutY":"xx",
    "layoutW":"xx",
    "layoutH":"xx",
    "config":"xx",
    "enable":"xx"

}
 */
export function instanceInfoAdd (data) {
  return request({
    url: `${baseUrl}/workbench/instanceInfo/add`,
    method: 'post',
    data
  })
}

/**
 * 更新组件实例
 *
 * {
    "comInstName":"xx",
    "comCode":"xx",
    "tempId":"xx",
    "layoutX":"xx",
    "layoutY":"xx",
    "layoutW":"xx",
    "layoutH":"xx",
    "config":"xx",
    "enable":"xx"
}
 */
export function instanceInfoUpdate (data) {
  return request({
    url: `${baseUrl}/workbench/instanceInfo/update`,
    method: 'post',
    data
  })
}

/**
 * 工作台模板分页查询
 */
export function tempPage (query) {
  return request({
    url: `${baseUrl}/workbench/temp/page`,
    method: 'get',
    params: query
  })
}

/**
 * 工作台模板重命名
 *
 * {
    "tempId":"xxx",
    "tempName":"xxx"
}
 */

export function tempRename (data) {
  return request({
    url: `${baseUrl}/workbench/temp/rename`,
    method: 'post',
    data
  })
}

/**
 * 工作台模板启用禁用
 *
 * {
    "tenpId":"xxx",
    "enable":"xxx"
}
 */

export function tempEnable (data) {
  return request({
    url: `${baseUrl}/workbench/temp/enable`,
    method: 'post',
    data
  })
}

/**
 * 工作台模板启用禁用
 *
 * tempId
 */

export function tempRemove (query) {
  return request({
    url: `${baseUrl}/workbench/temp/remove`,
    method: 'get',
    params: query
  })
}
/**
 * 工作台分配角色模板
 * @param {*} data
 * @returns
 */
export function tempAllot (data) {
  return request({
    url: `${baseUrl}/workbench/temp/allot`,
    method: 'post',
    data
  })
}
/**
 * 工作台查询所有用户
 * @param {*} data
 * @returns
 */
export function tempListUser (query) {
  return request({
    url: `${baseUrl}/workbench/temp/listUser`,
    method: 'get',
    params: query
  })
}
/**
 * 获取模板数据
 */
export const basicInfoListAll = ({
    mockData = [ { "tempId": "1658356855960305665", "tempName": "持仓行业分布数据-自定义", "isDefTemp": "0", "fromTempId": "1658308567603613697", "sortNum": "2", "componentList": [ { "layout": { "comInstId": "1673208056632651778", "layoutW": 19, "layoutH": 10, "layoutX": 19, "layoutY": 0, "minW": 1, "maxW": 24, "minH": 1, "maxH": 20, "isDraggable": "1", "isResizable": "1", "isDelete": "1" }, "attribute": { "comCode": "industryDistribution", "comId": "1640972725934682113", "comName": "持仓行业分布", "config": { "defaultSet": "2", "compose": [], "comName": "持仓行业分布" } } } ] } ],
    delay = 500
  } = {}) => new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: '200',
        data: mockData
      })
    }, delay)
  })

/**
 * 工作台布局保存
 */

export function wbSave (data) {
  return request({
    url: `${baseUrl}/wb/save`,
    method: 'post',
    data
  })
}
/**
 * 我的事宜- 事宜列表
 * **/

export function getMyBusiness (data) {
  return request({
    url: `${baseUrl}/assist/myMatter/list`,
    method: 'post',
    data
  })
}
/**
 * 我的事宜- 事宜类别
 * **/

export function getMatterType () {
  return request({
    url: `${baseUrl}/assist/myMatter/type`,
    method: 'get'
  })
}
/**
 * 重仓资产
 */

export function assets (query) {
  return request({
    url: `${baseUrl}/wb/top/manager/net/assets`,
    method: 'get',
    params: query
  })
}
/**
 * 金融产品
 */
export function distribution (query) {
  return request({
    url: `${baseUrl}/wb/top/manager/product/distribution`,
    method: 'get',
    params: query
  })
}
/**
 * 大类资产配置及收益情况
 */
export function categoryConf (query) {
  return request({
    url: `${baseUrl}/wb/top/manager/asset/category/conf`,
    method: 'get',
    params: query
  })
}

// 根据模板找用户
export function getFindUserByTempId (query) {
  return request({
    url: `${baseUrl}/workbench/temp/findUserByTempId`,
    // url: `${baseUrl}/admin/userRole/findUserByTempId`,
    method: 'get',
    params: query
  })
}

// 部门用户列表
export function getDeptAndUser (query) {
  return request({
    url: `${baseUrl}/admin/userRole/getDeptAndUser`,
    method: 'get',
    params: query
  })
}

// 设置用户模板
export function setTempAllot (data) {
  return request({
    url: `${baseUrl}/workbench/temp/allot`,
    method: 'post',
    data: data
  })
}

/**
 * 获取证券池数据
 * @param
 */
export function getPoolTreeData () {
  return request({
    url: `${baseUrl}/manage/pool/investmentPoolSee`,
    method: 'get'
  })
}

/**
 * 调池面板
 * @param
 */
export function getPoolPanel (query) {
  return request({
    url: `${baseUrl}/wb/top/manager/pool/panel`,
    method: 'get',
    params: query
  })
}

/**
 * 调池表格
 * @param
 */
export function getPoolOperatinge (query) {
  return request({
    url: `${baseUrl}/wb/top/manager/pool/operating`,
    method: 'get',
    params: query
  })
}

/**
 * 用户修改模板顺序
 * @param
 */
export function updateSort (data, userId = '') {
  return request({
    url: `${baseUrl}/workbench/temp/updateSort?userId=${userId}`,
    method: 'post',
    data
  })
}

/**
 * 调池表格
 * @param
 */
export function myMessageType () {
  return request({
    url: `${baseUrl}/assist/myMessage/type`,
    method: 'get'
  })
}
/**
 * 持仓区域分布
 * @param
 */
export function getDistribution (query) {
  return request({
    url: `${baseUrl}/leaderWb/position/distribution`,
    method: 'get',
    params: query
  })
}

/**
 * 我的消息列表
 * @param
 */
export function myMessageList (data) {
  return request({
    url: `${baseUrl}/assist/myMessage/list`,
    method: 'post',
    data
  })
}
/**
 * 持仓分布明细
 * @param
 */
export function getDistributionDetail (query) {
  return request({
    url: `${baseUrl}/leaderWb/position/distribution/detail`,
    method: 'get',
    params: query
  })
}

/**
 * 投连排名-工作台列表
 * @param
 */
export function getUnitLink (query) {
  return request({
    url: `${baseUrl}/analysis/unitLink/workbench`,
    method: 'get',
    params: query
  })
}

/**
 * 投连排名-头部
 * @param
 */
export function getRankHeader (query) {
  return request({
    url: `${baseUrl}/analysis/unitLink/rankHeader`,
    method: 'get',
    params: query
  })
}
