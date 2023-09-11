/*
 * @Description: 
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2023-09-11 09:55:27
 * @FilePath: \vue2-storybook-module-pro\src\workbench\index.js
*/
import _Workbench from './workbench';
import compRename from '../_utils/comp-rename';


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from "vue";
Vue.use(ElementUI)

import empty from '../empty/index.vue';
Vue.component('KEmpty',empty)

import './style';

export const Workbench = compRename(_Workbench);
export default Workbench;
