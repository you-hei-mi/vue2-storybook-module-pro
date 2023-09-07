/*
 * @Description: 
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2023-09-06 16:24:56
 * @FilePath: \k-field-module\src\main.js
*/
import Vue from 'vue'
import App from './App.vue'
import MyStorybookUi from 'k-field-ui'
import 'k-field-ui/k-field-ui.css'
Vue.use(MyStorybookUi)

import * as components from './components';

console.log('components', components)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
