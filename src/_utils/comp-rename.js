/*
 * @Description: 组件重命名
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2023-09-07 10:30:27
 * @FilePath: \vue2-storybook-module\src\_utils\comp-rename.js
 */
import capitalize from "lodash/capitalize";
import { prefix }from '../config'

export default function compRename(comp = {}) {
    let { options = {}, __docgenInfo = {}, name } = comp;
    const installConfig = { prefix };

    let newName = ''
    if(!name){
        newName = comp.__file.split('/').pop().split('.')[0];
        console.log('newName', newName)
        name = newName
    }
    
    let componentName = name.replace("my-", "").replace("-mapprops", "");
    componentName = `${capitalize(installConfig.prefix)}${capitalize(componentName)}`;

    if(newName){
        console.error('\x1B[34m%s\x1B[0m', `${comp.__file} 没用定义组件名称，程序自动生成新名字 ${componentName}\n`)
    }
  
    if (options && options.name) {
        comp.options.name = componentName;
    }
    if (__docgenInfo && __docgenInfo.displayName) {
        comp.__docgenInfo.displayName = componentName;
    }
    if (name) {
        comp.name = componentName;
    }
    return comp;
}