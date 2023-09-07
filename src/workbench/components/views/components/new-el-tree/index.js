/*
 * @Description: 解决 id 相同可同时多选 变更原有 el-tree 源码
 * @Version: 1.0
 * @Author: hanbingxu
 * @Date: 2022-10-18 12:46:53
 * @LastEditTime: 2022-10-18 14:18:22
 * @LastEditors: hanbingxu
 * @FilePath: /dss-new-ui/src/components/comps/new-el-tree/index.js
*/
import Tree from './src/tree.vue'

/* istanbul ignore next */
Tree.install = function (Vue) {
  Vue.component(Tree.name, Tree)
}

export default Tree
