<!--
 * @Description: 用户弹窗
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2022-05-08 15:41:52
 * @LastEditTime: 2023-09-11 16:28:39
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue2-storybook-module-pro\src\workbench\components\views\components\assignRolesDialog.vue
-->
<template>
  <el-dialog
    v-bind="$attrs"
    ref="drawer"
    class="assignRoles_dialog"
    title="用户分配"
    custom-class="demo-drawer"
    width="430px"
    @close="closeDrawer"
  >
    <div class="drawer_content">
      <div class="drawer_com">
        <el-form
          ref="assignRolesFrom"
          :model="assignRolesFrom"
          label-width="100px"
        >
          <el-form-item label="模板名称：">
            {{ assignRolesFrom.moduleName }}
          </el-form-item>
          <el-form-item
            label="选择用户："
            prop="assignRoles"
            :rules="[{ required: true, message: '请输入选择用户' }]"
          >
            <el-select
              v-model="assignRolesFrom.assignRoles"
              style="width:100%"
              filterable
              multiple
              collapse-tags
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.userId"
                :label="item.usernameCn"
                :value="item.userId"
                :disabled="item.isAllot === '0'"
              />
            </el-select>
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
        @click="submit('assignRolesFrom')"
      >
        {{ btnLoading ? "提交中 ..." :
          "确定"
        }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as api from '@/api/workbench/index' // 接口

export default {
  name: 'AssignRolesDialog',
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
    assignRolesFrom: {
      type: Object,
      default: () => {
        return {
          moduleName: '',
          tempId: '',
          assignRoles: []
        }
      }
    }
  },
  data () {
    return {
      options: []
    }
  },
  created () {
    // 初始化数据
    this.initData()
  },
  methods: {
    // 初始化数据
    initData () {
      this.assignRolesFrom.assignRoles = []
      api.tempListUser({ tempId: this.assignRolesFrom.tempId })
        .then(({data}) => {
          this.options = data
          for (let i = 0; i < this.options.length; i++) {
            if (this.options[i].userFlag) {
              this.assignRolesFrom.assignRoles.push(this.options[i].userId)
            }
          }
        })
        .catch(() => {
          this.tableLoading = false
        })
    },
    // 选择组件
    groupChange (val) {
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
          // console.log('提交')
          this.$emit('update:assignRolesFrom', this.assignRolesFrom)
          this.$emit('submit', this.assignRolesFrom)
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
