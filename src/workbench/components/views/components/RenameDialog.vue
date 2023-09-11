<!--
 * @Description: 重命名弹窗
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2022-05-08 15:41:52
 * @LastEditTime: 2022-09-15 14:43:38
 * @LastEditors: caicy caicy@kaiyufound.com
 * @FilePath: \dss-ui\src\components\comps\KWorkbench\views\components\RenameDialog.vue
-->
<template>
  <el-dialog
    v-bind="$attrs"
    ref="drawer"
    :close-on-click-modal="false"
    class="rename_dialog"
    :title="title"
    custom-class="demo-drawer"
    width="430px"
    @close="closeDrawer"
  >
    <div class="drawer_content">
      <div class="drawer_com">
        <el-form
          ref="renameFrom"
          :model="renameFrom"
        >
          <el-form-item
            :label="labelName + '：'"
            prop="moduleName"
            label-width="110px"
            :rules="[
              { whitespace: true, message: '请勿只输入空格内容', trigger: 'blur' },
              { required: true, message: `请输入${labelName}` },
            ]"
          >
            <el-input
              v-model="renameFrom.moduleName"
              :maxlength="maxlength"
              :placeholder="`请输入${labelName}`"
              show-word-limit
              @input="e => (renameFrom.moduleName = noSpecialCode(e))"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div
      slot="footer"
      class="drawer_footer"
    >
      <el-button @click="closeDrawer">
        取 消
      </el-button>
      <el-button
        type="primary"
        :loading="btnLoading"
        @click="submit('renameFrom')"
      >
        {{ btnLoading ? '提交中 ...' : '确定'
        }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'RenameDialog',
  props: {
    /**
     * @description: 弹窗标题
     * @author: zou hua
     */
    title: {
      type: String,
      default: '重命名'
    },
    /**
     * @description: 弹窗标题
     * @author: zou hua
     */
    labelName: {
      type: String,
      default: '模板名称'
    },
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
    renameFrom: {
      type: Object,
      default: () => {
        return {
          moduleName: ''
        }
      }
    },
    /**
     * @description: 最多长度限制
     * @author: zou hua
     */
    maxlength: {
      type: [Number, String],
      default: 32
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
    // 输入限制
    noSpecialCode (e, type) {
      let pattern = ''
      switch (type) {
        case 1:
          // 只能输入数字
          pattern = /[\D]*/g
          break
        case 2:
          // 只能输入大写字母和数字
          pattern = /[^A-Z\d]*/g
          break
        default:
          // 只能输入字母数字和汉字
          pattern = /[^0-9A-Za-z\u4e00-\u9fa5]*/g
          break
      }
      return e.replace(pattern, '')
    },
    // 初始化数据
    initData () {

    },
    // 选择组件
    groupChange () {
      // console.log(val)
    },
    // 关闭抽屉后
    closeDrawer () {
      this.$emit('update:visible', false)
    },
    // 提交
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('update:renameFrom', this.renameFrom)
          this.$emit('submit', this.renameFrom)
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../assets/css/variable.scss";
</style>
