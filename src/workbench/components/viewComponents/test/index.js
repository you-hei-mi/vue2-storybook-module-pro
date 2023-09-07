/*
 * @Description: 账套资金划转
 * @Version: 1.0
 * @Author: wuxr
 * @Date: 2022-06-10 18:59:06
 * @LastEditTime: 2023-08-18 14:51:03
 * @LastEditors: Please set LastEditors
 * @FilePath: \k-cbm\packages\components\b-workbench\src\components\viewComponents\test\index.js
*/
import propsSchema from './propsSchema.json'

const View = () => import('./View.vue')
const attribute = () => import('../attributeForm/test')

export default {
  View,
  attribute,
  propsSchema
}
