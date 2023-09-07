<!--
 * @Description: 数据格式弹窗
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2022-05-08 15:41:52
 * @LastEditTime: 2023-08-16 16:06:31
 * @LastEditors: Please set LastEditors
 * @FilePath: \k-cbm\packages\components\b-workbench\src\components\views\components\dataFormatDialog.vue
-->
<template>
  <el-dialog
    v-bind="$attrs"
    ref="drawer"
    class="dataFormat_dialog"
    title="数据格式"
    custom-class="demo-drawer"
    width="630px"
    @close="closeDrawer"
  >
    <div>
      <el-row>
        <el-col :span="12">
          <div style="background: #333333; color: #ffffff; padding: 10px">
            {data: [{ date: '2016-05-02', name: '王小虎', address:
            '上海市普陀区金沙江路 1518 弄' }, { date: '2016-05-04', name:
            '王小虎', address: '上海市普陀区金沙江路 1517 弄' }, { date:
            '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路
            1519 弄' }, { date: '2016-05-03', name: '王小虎', address:
            '上海市普陀区金沙江路 1516 弄' }]}
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <el-form
              ref="dataFormatFrom"
              :model="dataFormatFrom"
            >
              <el-form-item
                label="date:"
                label-width="25%"
              >
                <el-input
                  v-model="dataFormatFrom.date"
                  style="width: 75%"
                  placeholder="时间"
                />
              </el-form-item>
              <el-form-item
                label="name:"
                label-width="25%"
              >
                <el-input
                  v-model="dataFormatFrom.name"
                  style="width: 75%"
                  placeholder="名称"
                />
              </el-form-item>
              <el-form-item
                label="address:"
                label-width="25%"
              >
                <el-input
                  v-model="dataFormatFrom.address"
                  style="width: 75%"
                  placeholder="地址"
                />
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
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
        @click="submit('dataFormatFrom')"
      >
        {{ btnLoading ? '提交中 ...' : '确定'
        }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DataFormatDialog',
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
    dataFormatFrom: {
      type: Object,
      default: () => {
        return {
          date: '',
          name: '',
          address: ''
        }
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
          // console.log('提交')
          this.$emit('update:dataFormatFrom', this.dataFormatFrom)
          this.$emit('submit', this.dataFormatFrom)
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
@import "../../common/css/variable.scss";
</style>
