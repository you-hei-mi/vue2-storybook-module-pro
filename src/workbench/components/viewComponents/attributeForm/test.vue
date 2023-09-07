<!-- eslint-disable vue/no-mutating-props -->
<!--
 * @Description: 测试测试
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2023-08-19 10:52:11
 * @FilePath: \k-cbm\packages\components\b-workbench\src\components\viewComponents\attributeForm\test.vue
-->

<template>
  <div>
    <el-form-item
      prop="timetype"
      label="时间区间："
      :rules="[
        { required: true, message: '请选择时间区间', trigger: 'change' },
      ]"
    >
      <el-select
        v-model="validateForm.timetype"
        :options="optionsProps"
        placeholder="请选择"
      >
        <el-option
          v-for="item in optionsProps"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
export default {
  props: {
    /**
     * @description: 表单数据
     * @author: zou hua
     */
    validateForm: {
      type: Object,
      require: true,
      default: () => {
        return {
          cardForm: '001'
        }
      }
    }
  },
  data () {
    return {
        optionsProps: [
            { value: '001', label: '今年来' },
            { value: '301', label: '近一周' },
            { value: '201', label: '近一月' },
            { value: '203', label: '近三月' }
        ],
    }
  },
  mounted () {
    // 初始化数据
    this.initData()
  },
  methods: {
    // 初始化数据
    initData () {
      if (!this.validateForm.timetype) {
        this.$emit('setValidateForm',{
            ...this.validateForm,
            timetype: '001'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
