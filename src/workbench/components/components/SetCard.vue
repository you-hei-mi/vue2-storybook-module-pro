<!--
 * @Description: 设置卡片属性
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2022-05-06 14:07:25
 * @FilePath: \dss-new-ui-xh\src\components\comps\KWorkbench\components\SetCard.vue
-->
<template>
  <el-dialog :close-on-click-modal="false" class="k_workshop_set_card" title="编辑" v-bind="$attrs"
    custom-class="demo-drawer" ref="drawer" @close="closeDrawer" width="608px">
    <div class="drawer_content set_card-modal-body">
      <el-skeleton :loading="loading" animated>
        <template slot="template">
          <!-- 头部 -->
          <div class="dashboard-dialog-card-config">
            <div class="card-type-content">
              <div class="wrapper">
                <div class="sample-card">
                  <!-- cardData.comImg -->
                  <div class="sample-card-img sample-card-img-recent_projects">
                    <!-- <el-skeleton-item variant="image" style="width: 100%;height:100%;" /> -->
                  </div>
                </div>
                <div class="intro">
                  <div class="card-title">
                    <el-skeleton-item variant="text" style="width: 30%;" />
                  </div>
                  <div class="card-desc">
                    <el-skeleton-item variant="text" style="width: 70%;" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 表单内容 -->
          <el-form class="attribute_form_box" :model="validateForm" ref="validateForm" label-width="100px">
            <el-form-item prop="comName" label="组件名称：" style="height: 27px;" :rules="[
              { whitespace: true, message: '请勿只输入空格内容', trigger: 'blur' },
              { required: true, message: '请输入组件名称', trigger: 'blur' },
            ]">
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
            <!-- 头部 -->
            <div class="dashboard-dialog-card-config">
              <div class="card-type-content">
                <div class="wrapper">
                  <div class="sample-card">
                    <!-- cardData.comImg -->
                    <div class="sample-card-img sample-card-img-recent_projects">
                      <template v-if="iconList[cardData.comImg] && iconList[cardData.comImg].file">
                        <el-image :src="iconList[cardData.comImg].file" fit="scale-down"></el-image>
                      </template>
                    </div>
                  </div>
                  <div class="intro">
                    <div class="card-title">{{ cardData.comName }}</div>
                    <div class="card-desc">{{ cardData.comDesc }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 表单内容 -->
            <el-form class="attribute_form_box" :model="validateForm" ref="validateForm" label-width="110px">
              <el-form-item prop="comName" label="组件名称：" :rules="[
                { whitespace: true, message: '请勿只输入空格内容', trigger: 'blur' },
                { required: true, message: '请输入组件名称', trigger: 'blur' },
              ]">
                <el-input v-model="validateForm.comName"></el-input>
              </el-form-item>

              <!-- 组件私有属性开始 -->
              <template v-if="isExistence">
                <component ref="attribute" :is="cardData.comCode" :validateForm="validateForm" :cardData="cardData">
                </component>
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
import * as api from '@/api/workbench/index' // 接口
import { componentData, getGenerateImagesLibrary } from '../config/tools' // 模型默认配置文件
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
      // 图片库
      iconList: getGenerateImagesLibrary,
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
    // 初始化数据
    this.initData()
  },
  methods: {
    // 初始化数据
    initData () {
      if (!this.comId) return false

      // 更具组件id 查询组件信息
      this.loading = true
      api.basicInfoQuery({ comId: this.comId })
        .then(({ data }) => {
          this.loading = false
          if (data.data) {
            this.cardData = data.data

            // console.log('更具组件id 查询组件信息更具组件id 查询组件信息')
            // console.log(this.cardData)
            // console.log(this.attribute)

            const attribute = JSON.parse(JSON.stringify(this.attribute))
            let validateForm = {}
            if (attribute.config) {
              validateForm = attribute.config
            } else {
              validateForm = attribute
            }
            validateForm.comName = this.attribute.comName || data.data.comName
            // 市场因子初始化为近一周
            if (validateForm.comName.indexOf('市场因子') !== -1 && validateForm.timetype === '') {
              validateForm.timetype = '301'
            }
            this.validateForm = validateForm

            // console.log(this.validateForm)
            // console.log(this.cardData.comCode)

            // console.log(componentData)

            this.isExistence = (componentData[this.cardData.comCode] && componentData[this.cardData.comCode].attribute)
          }
          // this.cardData = {
          //   comId: '组件id',
          //   comCode: 'propsSchema',
          //   comName: '我是标题',
          //   comDesc: '我是描述',
          //   comImg: '我是图片',
          //   comType: '我是分类',
          //   objectType: 'dashboard',
          //   // 数据参数
          //   config: {
          //     name: '最近浏览的项目'
          //   }
          // }
        })
        .catch(() => {
          this.loading = false
        })
    },
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
          this.$emit('submit', cardData)
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
