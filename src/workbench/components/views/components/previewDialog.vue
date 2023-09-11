<!--
 * @Description: 组件预览弹窗
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2022-05-08 15:41:52
 * @LastEditTime: 2022-06-20 13:12:06
 * @LastEditors: wuxr
 * @FilePath: \dss-ui\src\components\comps\KWorkbench\views\components\previewDialog.vue
-->
<template>
  <el-dialog
    v-bind="$attrs"
    ref="drawer"
    class="preview_dialog"
    title="组件预览"
    custom-class="demo-drawer"
    width="430px"
    @close="closeDrawer"
  >
    <div class="drawer_content">
      <div class="drawer_com">
        <div>
          <div>组件1</div>
          <div>
            <k-charts
              height="400px"
              :data-echarts="previewEcharts"
            />
          </div>
        </div>
        <div
          slot="footer"
          style="text-align: right"
          class="dialog-footer"
        >
          <el-button @click="closeDrawer">
            取 消
          </el-button>
          <el-button
            type="primary"
            :loading="btnLoading"
            @click="submit()"
          >
            {{
              btnLoading ? "提交中 ..." : "确定"
            }}
          </el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'PreviewDialog',
  props: {
    /**
     * @description: 提交按钮加载动画
     * @author: zou hua
     */
    btnLoading: {
      type: Boolean,
      default: false
    },
    /**
     * @description: 表单数据
     * @author: zou hua
     */
    previewEcharts: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
    }
  },
  created () {
    // 初始化数据
    this.initData()
  },
  methods: {
    // 初始化数据
    initData () { },
    // 关闭抽屉后
    closeDrawer () {
      this.$emit('update:visible', false)
    },
    // 提交
    submit () {
      // console.log('提交')
      this.$emit('submit')
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../assets/css/variable.scss";
</style>
