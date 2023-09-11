<!--
 * @Description: 
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2023-09-07 09:26:20
 * @FilePath: \vue2-storybook-module-pro\src\App.vue
-->
<template>
  <div id="app">
    <!-- <my-button label="这是 k-field-ui 组件按钮"></my-button> -->
    <div>

        123123123
        <template v-if="viewType === 'preview'">
            <!-- <workbench-preview></workbench-preview> -->
        </template>
        <template v-else-if="viewType === 'edit'">
            <!-- <workbench-edit></workbench-edit> -->
        </template>
        <template v-else-if="viewType === 'components'">
            <!-- <workbench-components></workbench-components> -->
        </template>
        <template v-else-if="viewType === 'template'">
            <!-- <workbench-edit></workbench-edit> -->
        </template>
    </div>
  </div>
</template>

<script>
// import workbenchPreview from '@/workbench/components/views/layoutAdmin/preview.vue' // 预览页
// import workbenchEdit from '@/workbench/components/views/layoutAdmin/edit.vue' // 编辑页
// import workbenchComponents from '@/workbench/components/views/componentsAdmin/index.vue' // 组件页
// import workbenchTemplate from '@/workbench/components/views/templateAdmin/index.vue' // 模板页
export default {
  name: 'App',
  components:{
    // workbenchPreview,
    // workbenchEdit,
    // workbenchComponents
  },
  data () {
    return {
      viewType: 'preview',
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
