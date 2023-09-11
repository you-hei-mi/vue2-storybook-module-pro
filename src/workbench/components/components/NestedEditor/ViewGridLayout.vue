<!--
 * @Description: 组件外壳
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2022-05-05 17:55:00
 * @LastEditTime: 2022-09-21 16:46:58
 * @LastEditors: zou hua
 * @FilePath: \dss-new-ui\src\components\comps\KWorkbench\components\NestedEditor\ViewGridLayout.vue
-->
<template>
  <div class="view_grid_layout" @mouseover.self="$emit('onMmouseOver')" @mouseleave.self="$emit('onMouseLeave')"
    @click="$emit('onActive')">
    <div class="operation_box" v-show="(query === 1 && isQuery) || query === 2"
      :class="{ no_bg: !(editorItem.componentPack && editorItem.componentPack.View && type !== 'drop') }">
      <el-button type="text" @click.stop="$emit('editItem')" v-if="query === 2">
        <i class="el-icon-edit-outline"></i>
      </el-button>
      <el-button type="text"
        v-if="query === 2 && (isDelete || !(editorItem.componentPack && editorItem.componentPack.View && type !== 'drop'))"
        :disabled="(editorItem.componentPack && editorItem.componentPack.View && type !== 'drop') ? !isDelete : false"
        @click.stop="$emit('removeItem')">
        <i class="el-icon-close"></i>
      </el-button>
      <el-button type="text" @click.stop="$emit('search')" v-if="query === 1 && isQuery">
        <i class="el-icon-search" style="color:#555555"></i>
      </el-button>
    </div>
    <template v-if="editorItem.componentPack && editorItem.componentPack.View && type !== 'drop'">
      <component ref="component" :is="editorItem.componentPack.View" :view-data="viewData" :view-id="viewId">
      </component>
    </template>
    <template v-else>
      <el-empty description="组件加载失败" class="loading_err">
        <i slot="image" class="el-icon-warning-outline"></i>
      </el-empty>
    </template>
  </div>
</template>

<script>
import { componentData } from '../../config/tools' // 模型默认配置文件
import { getComponentsAndInit } from '../../assets/js/utils' // 模型默认配置文件
const components = getComponentsAndInit(componentData)
// console.log('注册注册')
// console.log(components)
export default {
  props: {
    /**
     * @description: 组件数据
     * @author: zou hua
     */
    viewData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
     * @description: 组件实例id
     * @author: zou hua
     */
    viewId: {
      type: String,
      default: ''
    },
    /**
     * @description: 是否可移除
     * @author: zou hua
     */
    isDelete: {
      type: Boolean,
      default: true
    },
    /**
     * @description: 组件类型
     * @author: zou hua
     */
    type: {
      type: [Number, String],
      default: ''
    },
    /**
     * @description: 是否显示搜索
     * @author: ccy
     */
    query: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      editorItem: {
        componentPack: null
      },
      isQuery: false
    }
  },
  watch: {
    viewData: {
      handler (value) {
        // console.log('数据发生变化', value)
        this.editorItem = value
        this.isQuery = value.componentPack?.propsSchema.default.query
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    initData () {
      this.$refs.component.initData()
    }
  },
  components: {
    ...components
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable.scss";

.view_grid_layout {
  position: relative;
  width: 100%;
  height: 100%;

  .operation_box.no_bg {
    background: transparent;
  }

  .operation_box {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 20;
    // min-width: 74px;
    background: $layout-operation-background-color;
    text-align: center;
    display: flex;
    justify-content: flex-end;
    // width: $layout-operation-width;
    max-width: $layout-operation-max-width;
    padding-right: 16px;
    height: $layout-handle-height;
    line-height: $layout-handle-height;

    .el-button {
      // cursor: pointer;
      font-size: 16px;
      // width: 20px;
      // height: 24px;
      margin-left: 6px;
      // line-height: 24px;
      i {
        color: $color-text-second;
      }
    }
  }

  .loading_err {
    height: 100%;
    font-size: 20px;
    padding: 0;

    ::v-deep .el-empty__image i,
    ::v-deep .el-empty__description {
      margin-top: 5px;
      color: $color-text-third;
    }

    ::v-deep .el-empty__description {
      margin-top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
