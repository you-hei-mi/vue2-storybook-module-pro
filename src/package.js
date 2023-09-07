import * as components from './components';
import { __VERSION__ }from './config'

// 批量组件注册
const install = function (Vue, config) {
  Object.keys(components).forEach((key) => {
    if (components[key]) {
      /plugin/i.test(key) ? Vue.use(components[key]) : Vue.use(components[key], config);
    }
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    version: typeof __VERSION__ === 'undefined' ? '' : __VERSION__,
};
  