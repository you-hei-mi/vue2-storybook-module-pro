<!--
 * @Description: 查询属性
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2022-05-06 14:07:25
 * @LastEditTime: 2022-09-23 15:57:22
 * @LastEditors: caicy caicy@kaiyufound.com
 * @FilePath: \kstar-dss-ui\src\components\comps\KWorkbench\components\queryCard.vue
-->
<template>
  <el-dialog :close-on-click-modal="false" class="k_workshop_set_card" title="查询" v-bind="$attrs"
    custom-class="demo-drawer" ref="drawer" @close="closeDrawer" width="608px">
    <div class="drawer_content set_card-modal-body">
      <el-skeleton :loading="loading" animated>
        <template slot="template">
          <!-- 表单内容 -->
          <el-form class="attribute_form_box" :model="validateForm" ref="validateForm">
            <el-form-item prop="comName" label="" style="height: 27px;">
              <el-skeleton-item variant="text" style="width: 120px;height:27px;margin-right:10px" />
              <el-skeleton-item variant="text" style="width: 270px;height:27px;" />
            </el-form-item>
            <el-form-item prop="comName" label="" style="height: 27px;">
              <el-skeleton-item variant="text" style="width: 120px;height:27px;margin-right:10px" />
              <el-skeleton-item variant="text" style="width: 270px;height:27px;" />
            </el-form-item>
            <!-- 提交按钮 -->
            <div class="attribute_form_footer">
              <el-skeleton-item variant="text" style="width: 56.22px;height:22px;" />
              <el-skeleton-item variant="text" style="width: 56.22px;height:22px;margin-left: 10px;" />
            </div>
          </el-form>

        </template>
        <template>
          <template v-if="cardData">
            <!-- 表单内容 -->
            <el-form class="attribute_form_box" :model="validateForm" ref="validateForm" label-width="100px">
              <!-- 组件私有属性开始 -->
              <template v-if="isExistence">
                <component ref="attribute" :is="cardData.comCode" :validateForm="validateForm"></component>
              </template>
              <!-- 组件私有属性结束 -->

            </el-form>
            <!-- 提交按钮 -->
            <div class="attribute_form_footer">
              <el-button @click="$emit('cancel')">取消</el-button>
              <el-button type="primary" @click="submitForm('validateForm')" :loading="btnLoading">
                {{ btnLoading ?"提交中..." : "确定"}}</el-button>
            </div>
          </template>
          <template v-else>
            <k-empty description="加载失败"></k-empty>
          </template>
        </template>
      </el-skeleton>
    </div>
  </el-dialog>
</template>

<script>
// import * as api from '@/api/workbench/index' // 接口
import { componentData } from '../config/tools' // 模型默认配置文件
import { getComponentsAndInit } from '../assets/js/utils' // 模型默认配置文件
const components = getComponentsAndInit(
  componentData,
  'attribute'
)
export default {
  name: 'SelectCard',
  components: {
    ...components
  },
  props: {
    /**
     * @description: 组件id
     * @author: zou hua
     */
    comId: {
      type: String,
      require: true,
      default: ''
    },
    /**
     * @description: 组件属性字段
     * @author: zou hua
     */
    attribute: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
     * @description: 组件数据
     * @author: ccy
     */
    viewData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    comId: {
      handler () {
        // 初始化数据
        this.initData()
      },
      deep: true
    }
  },
  data () {
    return {
      // 加载动画
      loading: true,
      // 提交按钮加载动画
      btnLoading: false,
      // 判断组件是否存在
      isExistence: false,
      // 卡片数据
      cardData: {
        comId: undefined,
        comCode: undefined,
        comName: undefined,
        comDesc: undefined,
        comImg: undefined,
        comType: undefined,
        objectType: undefined
      },
      // 表单信息
      validateForm: {
        comName: ''
      }
    }
  },
  created () {
    this.cardData = this.viewData.attribute
    this.isExistence = (componentData[this.cardData.comCode] && componentData[this.cardData.comCode].attribute)
    this.validateForm = this.viewData.attribute.config
    setTimeout(() => {
      this.loading = false
    }, 100)
  },
  methods: {
    // 关闭抽屉后
    closeDrawer () {
      this.$emit('update:visible', false)
    },
    // 提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const cardData = {
            comCode: this.cardData.comCode,
            attribute: {
              comId: this.comId,
              comName: this.validateForm.comName,
              config: this.validateForm
            },
            layout: this.cardData
          }
          // console.log('提交')
          // console.log(cardData)
          this.$emit('submitQuery', cardData)
        } else {
          return false
        }
      })
    },
    // 取消
    cancel () {
      // 关闭弹窗
      this.closeDrawer()
      // console.log('取消' + this.comId)
      this.$emit('cancel')
    }
  }
}
</script>
<style scoped lang="scss">
@import "../assets/css/variable.scss";
::v-deep .attribute_form_footer {
  text-align: right;
}
.k_workshop_set_card {
  // 头部样式
  .set_card-modal-body {
    .card-type-content {
      padding: 4px 0 11px 0;

      .intro {
        width: 432px;
      }
    }
  }

  // 设置组件弹窗-- 属性设置

  .attribute_form_box {
    .el-form-item,
    ::v-deep .el-form-item {
      margin-bottom: 20px;

      .el-form-item {
        margin: 0;
      }
    }
  }
}
</style>
