<!--
 * @Description: 
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2023-09-07 17:21:01
 * @FilePath: \vue2-storybook-module-pro\src\workbench\workbench.vue
-->
<template>
    <div>
        <template v-if="viewType === 'preview'">
            <workbench-preview></workbench-preview>
        </template>
        <template v-else-if="viewType === 'edit'">
            <!-- <workbench-edit></workbench-edit> -->
        </template>
        <template v-else-if="viewType === 'components'">
            <workbench-components></workbench-components>
        </template>
        <template v-else-if="viewType === 'template'">
            <!-- <workbench-edit></workbench-edit> -->
        </template>
    </div>
</template>

<script>
import workbenchPreview from './components/views/layoutAdmin/preview.vue' // 预览页
// import workbenchEdit from './components/views/layoutAdmin/edit.vue' // 编辑页
import workbenchComponents from './components/views/componentsAdmin/index.vue' // 组件页
// import workbenchTemplate from './components/views/templateAdmin/index.vue' // 模板页
export default {
  name: 'my-workbench',
  components:{
    workbenchPreview,
    // workbenchEdit,
    workbenchComponents
  },
  props: {
    // 类型
    // preview： 预览页(默认)    edit： 编辑页      components： 组件页      template： 模板页
    viewType: {
      type: String,
      default: 'components',
    },
  },
};
</script>
