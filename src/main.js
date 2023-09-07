/*
 * @Description: 
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2023-09-06 16:24:56
 * @FilePath: \vue2-storybook-module\src\main.js
*/
import Vue from 'vue'
import App from './App.vue'
import MyStorybookUi from 'my-storybook-ui'
import 'my-storybook-ui/my-storybook-ui.css'
Vue.use(MyStorybookUi)

import * as components from './components';

console.log('components', components)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
