<!--
 * @Description: 编辑
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2022-05-08 15:41:52
 * @LastEditTime: 2023-08-31 13:36:46
 * @LastEditors: Please set LastEditors
 * @FilePath: \k-cbm\packages\components\b-workbench\src\components\views\components\editDialog.vue
-->
<template>
  <el-dialog
    v-bind="$attrs"
    ref="drawer"
    class="edit_dialog"
    top="5vh"
    :title="editTitle"
    custom-class="demo-drawer"
    width="830px"
    @close="closeDrawer"
  >
    <div class="drawer_content">
      <el-form
        ref="tempEditForm"
        :model="tempEditForm"
      >
        <b-card
          header="内置字段"
          style="min-height: 50px; overflow: hidden"
        >
          <el-row>
            <el-col :span="24">
              <el-col :span="12">
                <el-form-item
                  label="组件代码："
                  prop="comCode"
                  label-width="110px"
                  :rules="[{ required: true, message: '请选择组件代码', trigger: ['change'] }]"
                >
                  <el-select
                    v-model="tempEditForm.comCode"
                    placeholder="请选择"
                    style="width: 100%"
                    filterable
                    @change="comDefaultAttribute"
                  >
                    <el-option
                      v-for="(item, key) in componentData"
                      :key="key"
                      :label="item.propsSchema.id"
                      :value="item.propsSchema.id"
                    >
                      <span style="float: left">{{ item.propsSchema.id }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.propsSchema.title }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="初始宽度："
                prop="layoutW"
                label-width="110px"
                :rules="[{ required: true, message: '请输入初始宽度', trigger: ['blur'] }]"
              >
                <el-input-number
                  v-model="tempEditForm.layoutW"
                  :controls="false"
                  :step="1"
                  :min="tempEditForm.minW"
                  :max="tempEditForm.maxW"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="初始高度："
                prop="layoutH"
                label-width="110px"
                :rules="[{ required: true, message: '请输入初始高度', trigger: ['blur'] }]"
              >
                <el-input-number
                  v-model="tempEditForm.layoutH"
                  :controls="false"
                  :step="1"
                  :min="tempEditForm.minH"
                  :max="tempEditForm.maxH"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="最小宽度："
                prop="minW"
                label-width="110px"
                :rules="[{ required: true, message: '请输入最小宽度', trigger: ['blur'] }]"
              >
                <el-input-number
                  v-model="tempEditForm.minW"
                  :controls="false"
                  :step="1"
                  :min="minNum"
                  :max="tempEditForm.layoutW"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="最大宽度："
                prop="maxW"
                label-width="110px"
                :rules="[{ required: true, message: '请输入最大宽度', trigger: ['blur'] }]"
              >
                <el-input-number
                  v-model="tempEditForm.maxW"
                  :controls="false"
                  :step="1"
                  :min="tempEditForm.layoutW"
                  :max="maxNum"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="最小高度："
                prop="minH"
                label-width="110px"
                :rules="[{ required: true, message: '请输入最小高度', trigger: ['blur'] }]"
              >
                <el-input-number
                  v-model="tempEditForm.minH"
                  :controls="false"
                  :step="1"
                  :min="minNum"
                  :max="tempEditForm.layoutH"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="最大高度："
                prop="maxH"
                label-width="110px"
                :rules="[{ required: true, message: '请输入最大高度', trigger: ['blur'] }]"
              >
                <el-input-number
                  v-model="tempEditForm.maxH"
                  :controls="false"
                  :step="1"
                  :min="tempEditForm.layoutH"
                  :max="maxNum"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="初始x坐标："
                prop="layoutX"
                label-width="110px"
                :rules="[
                  {
                    required: tempEditForm.isDraggable === false,
                    message: '请输入初始x坐标',
                  },
                ]"
              >
                <el-input-number
                  v-model="tempEditForm.layoutX"
                  :controls="false"
                  :step="1"
                  :disabled="tempEditForm.isDraggable"
                  :min="0"
                  :max="maxNum"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="初始y坐标："
                prop="layoutY"
                label-width="110px"
                :rules="[
                  {
                    required: tempEditForm.isDraggable === false,
                    message: '请输入初始y坐标',
                  },
                ]"
              >
                <el-input-number
                  v-model="tempEditForm.layoutY"
                  :controls="false"
                  :step="1"
                  :disabled="tempEditForm.isDraggable"
                  :min="0"
                  :max="maxNum"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col />
            <el-col :span="6">
              <el-form-item
                label="是否可拖拽："
                label-width="110px"
              >
                <el-switch
                  v-model="tempEditForm.isDraggable"
                  @change="changeDraggable"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="是否可调整大小："
                label-width="125px"
              >
                <el-switch v-model="tempEditForm.isResizable" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="是否可删除："
                label-width="110px"
              >
                <el-switch v-model="tempEditForm.isDelete" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="是否启用："
                label-width="110px"
              >
                <el-switch v-model="tempEditForm.enable" />
              </el-form-item>
            </el-col>
          </el-row>
        </b-card>
        <b-card
          header="字段属性"
          style="min-height: 50px; overflow: hidden"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="组件名称："
                prop="comName"
                label-width="110px"
                :rules="[{ whitespace: true, message: '请勿只输入空格内容', trigger: 'blur' },{ required: true, message: '请输入组件名称', trigger: ['blur'] }]"
              >
                <el-input
                  v-model="tempEditForm.comName"
                  maxlength="15"
                  show-word-limit
                  style="width: 100%"
                  placeholder="请输入组件名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="组件分类："
                prop="comTypeValue"
                label-width="110px"
                :rules="[{ required: true, message: '请选择组件分类', trigger: ['change'] }]"
              >
                <el-select
                  v-model="tempEditForm.comTypeValue"
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择分类"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in comTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="组件图标："
                prop="comImg"
                label-width="110px"
                :rules="[
                  { required: false, message: '请选择组件图标', trigger: ['change'] },
                ]"
              >
                <el-popover
                  placement="bottom-start"
                  width="460"
                  trigger="click"
                  @show="$refs['iconSelect'].reset()"
                >
                  <IconSelect
                    ref="iconSelect"
                    :value="tempEditForm.comImg"
                    @selected="selected"
                  />
                  <el-input
                    slot="reference"
                    v-model="tempEditForm.comImg"
                    placeholder="点击选择图标"
                    readonly
                  >
                    <!-- <svg-icon
                      v-if="tempEditForm.comImg"
                      slot="prefix"
                      :icon-class="tempEditForm.comImg"
                      class="el-input__icon"
                      style="height: 32px;width: 16px;"
                    /> -->
                    <i
                      slot="prefix"
                      class="el-icon-search el-input__icon"
                    />
                  </el-input>
                </el-popover>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item
                label="组件描述："
                label-width="110px"
              >
                <el-input
                  v-model="tempEditForm.comDesc"
                  type="textarea"
                  placeholder="请输入组件描述"
                  style="width: 100%"
                  maxlength="70"
                  show-word-limit
                  :rows="3"
                  resize="none"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </b-card>
        <b-card
          header="角色"
          style="min-height: 50px; overflow: hidden"
        >
          <el-form-item
            label="角色："
            label-width="110px"
          >
            <new-select-tree
              v-model="tempEditForm.roleList"
              :tree-data="deptRoleLists"
              :need-all="false"
              filterable
              clearable
              multiple
              :default-expand-all="false"
              :default-expanded-keys="[64]"
              :collapse-tags="false"
              :default-props="{
                label: 'name',
                value: 'id',
                children:'child',
                disabled:isdisabled
              }"
              style="width:100%"
            />
          </el-form-item>
        </b-card>
      </el-form>
    </div>
    <div
      slot="footer"
      style="text-align: right"
      class="dialog-footer"
    >
      <el-button @click="closeDrawer">
        取消
      </el-button>
      <el-button
        type="primary"
        @click="submitForm('tempEditForm')"
      >
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { componentData, panelConfig } from '../../config/tools' // 模型默认配置文件
import * as api from '@/api/workbench/index' // 接口
import IconSelect from '../components/IconSelect.vue' // 图片选择器
import NewSelectTree from './new-select-tree/index.vue' // 树形下拉框
// import SvgIcon from './SvgIcon' // svg 查看器

export default {
  name: 'EditDialog',
  components: {
    IconSelect,
    NewSelectTree
    // SvgIcon
  },
  props: {
    /**
     * @description: 提交按钮加载动画
     * @author: zou hua
     */
    btnLoading: {
      type: Boolean,
      default: false
    },
    editTitle: {
      type: String,
      default: ''
    },
    /**
     * @description: 表单数据
     * @author: zou hua
     */
    editForm: {
      type: Object,
      default: () => {
        return {
          comCode: null,
          comName: null,
          comTypeValue: null,
          comDesc: null,
          layoutX: null,
          layoutY: null,
          layoutW: null,
          layoutH: null,
          minW: null,
          minH: null,
          maxW: null,
          maxH: null,
          isDraggable: null,
          isResizable: null,
          isDelete: null,
          enable: null,
          comImg: null,
          comType: null,
          roleList: null
        }
      }
    },
    /**
     * @description: 角色数据
     * @author: ccy
     */
    deptRoleLists: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // 记录组件代码上一次操作
      notebook: null,
      // 所有组件数据
      componentData: componentData,
      // 数值最小值
      minNum: 1,
      // 数值最大值
      maxNum: Number(panelConfig.gridLayoutConfig && panelConfig.gridLayoutConfig.colNum ? panelConfig.gridLayoutConfig.colNum : 12),
      // 分类选项
      comTypeOptions: [],
      // 表单数据
      tempEditForm: {},
      // 临时存储x和y
      tempX: '',
      tempY: ''
    }
  },
  watch: {
    editForm: {
      handler () {
        // 初始化数据
        this.initData()
      },
      deep: true
    }
  },
  created () {
    // 初始化数据
    this.initData()
  },
  methods: {
    // 判断是否可以选择
    isdisabled (data) {
      if (data.type === 2) {
        return false
      }
      return true
    },
    // 选择图标
    selected (name) {
      // console.log('选择图标')
      // console.log(name)
      this.$set(this.tempEditForm, 'comImg', name)
      // this.tempEditForm.comImg = name
    },
    // 初始化数据
    initData () {
      // 加载分类
      this.basicInfoType()
      if (this.tempEditForm) {
        this.tempEditForm = JSON.parse(JSON.stringify(this.editForm))
        if (this.tempEditForm.comCode) {
          this.notebook = JSON.parse(JSON.stringify(this.tempEditForm.comCode))
        }
        this.changeDraggable(this.tempEditForm.isDraggable)
      }
    },
    // 判断是否显示x 和 y
    changeDraggable (val) {
      this.tempX = this.tempEditForm.layoutX ? JSON.parse(JSON.stringify(this.tempEditForm.layoutX)) : null
      this.tempY = this.tempEditForm.layoutY ? JSON.parse(JSON.stringify(this.tempEditForm.layoutY)) : null
      if (val) {
        this.tempEditForm.layoutY = null
        this.tempEditForm.layoutX = null
      } else {
        this.tempEditForm.layoutX = this.tempX ? JSON.parse(JSON.stringify(this.tempX)) : null
        this.tempEditForm.layoutY = this.tempY ? JSON.parse(JSON.stringify(this.tempY)) : null
      }
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('update:editFrom', this.tempEditForm)
          // console.log('tempEditForm', this.tempEditForm)
          this.$emit('submit', this.tempEditForm)
        } else {
          return false
        }
      })
    },
    // 获取组件分类
    basicInfoType () {
      api.basicInfoType().then(({data}) => {
        this.comTypeOptions = data
      })
    },
    // 动态载入默认数据
    comDefaultAttribute (val) {
      // console.log(val)
      // console.log('初始化数据')
      // console.log(this.componentData)
      if (this.componentData[this.tempEditForm.comCode] && this.componentData[this.tempEditForm.comCode].propsSchema && this.componentData[this.tempEditForm.comCode].propsSchema.default) {
        // console.log('笔记')
        // console.log(this.notebook)
        // console.log(this.componentData[this.tempEditForm.comCode].propsSchema.default)
        const defaultJson = this.componentData[val].propsSchema.default
        // console.log(defaultJson)
        const tempJson = JSON.parse(JSON.stringify(this.tempEditForm))
        // console.log(tempJson)
        if (JSON.stringify(defaultJson) !== '{}') {
          if (!this.notebook) {
            this.tempEditForm = { ...tempJson, ...defaultJson, ...{ comCode: tempJson.comCode, comId: tempJson.comId } }
          } else {
            this.$confirm('该组件有默认数据，是否合并', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.tempEditForm = { ...tempJson, ...defaultJson, ...{ comCode: tempJson.comCode, comId: tempJson.comId } }

              // this.tempEditForm = defaultJson
              this.$message({
                type: 'success',
                message: '合并成功!'
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消合并'
              })
            })
          }
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../common/css/variable.scss";

.edit_dialog {
  ::v-deep .el-dialog__body {
    max-height: none !important;
    .el-select {
      .el-select__tags {
        .el-tag--light:nth-child(2) {
          max-width: none;
        }
      }
    }
  }
  ::v-deep .b_card {
    background-color: transparent !important;
    .b_card_header,
    .b_card_body {
      background-color: transparent !important;
      border: none !important;
    }
  }
}
</style>
