<!--
 * @Description:
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2022-05-05 17:53:47
 * @LastEditTime: 2023-09-11 18:15:17
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue2-storybook-module-pro\src\workbench\components\components\EditorHeader.vue
-->
<template>
  <div class="k_workshop_header">
    <div class="k_workshop_header_left">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/workbench/custom/see' }">工作台</el-breadcrumb-item>
        <el-breadcrumb-item>编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="k_workshop_header_right">
      <!-- <span style="color:red">
      {{templateId && !$route.query.type && options.length > 1}}
      {{templateId }}
      {{!$route.query.type}}
      {{options.length > 1}}
      {{ options }}
      </span> -->

      <el-select class="base-mr4" v-model="temId" placeholder="请选择"
        v-if="templateId && !$route.query.type && options.length > 1" @change="selectChange">
        <el-option v-for="(item, index) in options" :key="item.value" :label="item.name" :value="item.value">
          <span style="float: left">{{ item.name }}</span>
          <span style="float: right;" class="base-ml4 select-right">
            <el-button class="select-button" type="primary" icon="el-icon-caret-top" circle
              @click.stop="sortSelectOption('top', item, index)"></el-button>
            <el-button class="select-button" type="primary" icon="el-icon-caret-bottom" circle
              @click.stop="sortSelectOption('bottom', item, index)"></el-button>
          </span>
        </el-option>
      </el-select>
      <el-button size="mini" class="cancelButton" @click="operation('resetCard')" :loading="resetLoading"
        v-if="templateId && !$route.query.type">重置工作台</el-button>
      <el-button size="mini" class="cancelButton" @click="operation('addCard')">新增组件</el-button>
      <el-button size="mini" type="primary" :disabled="$refs.parent" @click="operation('saveCard')"
        :loading="saveLoading">完成编辑</el-button>
    </div>
  </div>
</template>

<script>
import { updateSort } from '@/api/workbench/index.js'
export default {
  name: 'EditorHeader',
  props: {
    /**
     * @description: 模板id
     * @author: zou hua
     */
    templateId: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      // 重置加载动画
      resetLoading: false,
      // 完成编辑
      saveLoading: false,
      // 下拉框选中模板id
      temId: ''
    }
  },
  watch: {
    templateId (val) {
      this.temId = val
    }
  },
  methods: {
    determine (data) {
      // console.log(data)
    },
    // 操作方法
    operation (type, data) {
      this.updateSort()
      this.$emit('operation', type, data)
    },
    // 下载保存
    inspectTab () { },
    // 返回
    backGo () {
        if(this.$router){
            this.$router.push({
              path: '/reportWorkshop/combFilter'
            })
        }
    },
    selectProject () {
      this.$refs.selectProduct.open()
    },
    selectChange () {
      this.$emit('selectChange', this.temId)
    },
    // 排序
    sortSelectOption (type, row, index) {
      if (type === 'top') {
        if (index === 0) {
          this.$message.warning('已经是第一个了')
          return
        }
        this.options.splice(index, 1)
        this.options.splice(index - 1, 0, row)
      } else {
        if (index === this.options.length - 1) {
          this.$message.warning('已经是最后一个了')
          return
        }
        this.options.splice(index, 1)
        this.options.splice(index + 1, 0, row)
      }
    },
    updateSort () {
      const data = this.options.map((item, index) => {
        // console.log('item.isDefTemp', item)
        return {
          sortNum: index,
          tempId: item.isDefTemp === '0' ? item.fromTempId : item.value,
          name: item.name,
          isDefTemp: item.isDefTemp
        }
      })
      updateSort(data).then(res => { })
    }
  }
}
</script>
<style scoped lang="scss">
@import "../assets/css/variable.scss";

.k_workshop_header {
  border: 1px solid $--background-color-base !important;
  background-color: $--border-color-lighter !important;
  height: $nav-height;
  position: fixed;
  left: 0;
  top: $nav-fixed-top;
  z-index: 2000;
  padding: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ::v-deep .el-breadcrumb {
    .el-breadcrumb__inner.is-link {
      color: $color-text-base;
    }

    .el-breadcrumb__inner.is-link {
      color: $color-text-second;
    }
  }
}

.select-right {
  width: 56px;

  ::v-deep .select-button.el-button.is-circle {
    padding: 3px;
    margin-left: 8px;
    display: none;
  }
}

.el-select-dropdown__item:hover {
  .select-right .select-button {
    display: inline-block;
  }
}
</style>
