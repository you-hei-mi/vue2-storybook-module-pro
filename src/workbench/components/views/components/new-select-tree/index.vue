<!--
 * @Description: KSelectTree 树形下拉框
 * @Version: 1.0
 * @Author: li quan
 * @Date: 2022-07-06 18:19:12
 * @LastEditTime: 2023-05-29 11:09:16
 * @LastEditors: hanbingxu
 * @FilePath: /dss-new-ui/src/components/comps/KSelectTree/index.vue
-->
<template>
  <el-select class="k-select-tree" ref="KSelectTree" v-model="selected" :multiple="multiple"
    :collapse-tags="collapseTags" @change="handleChange" @visible-change="visibleChange"
    :filterable="filterable && !multiple" :filter-method="filterMethod" :placeholder="placeholder"
    :popper-class="'k-select-tree-dropdown ' + `k-select-tree-dropdown-${uid}`" v-bind="$attrs" v-on="$listeners">
    <el-input placeholder="输入关键字进行过滤" v-model="filterText" v-if="search" style="margin: 0 6px;width:calc(100% - 12px);">
    </el-input>
    <el-option v-for="item in formatData(treeDataList)" :key="item.value" :label="item.label" :value="item.value"
      v-show="false" />
    <el-tree height="228px" :class="['k-select-tree',hiddenParentCheckbox?'hiddenParentCheckbox':'']" id="testtree" ref="selecteltree" :data="treeDataList" :node-key="treeProps.value"
      highlight-current :show-checkbox="multiple" :props="treeProps" :current-node-key="!multiple ? value : ''"
      :expand-on-click-node="multiple ? false : selectParent ? false : true" check-on-click-node
      :default-expand-all="defaultExpandAll" :filter-node-method="filterNode" @check-change="handleCheckChange"
      @check="handleCheckChange1" @node-click="handleNodeClick" v-bind="$attrs" v-on="$listeners">
    </el-tree>

    <!-- 底部按钮 start -->
    <template v-if="showFootBtn">
      <li style="height: 40px;"></li>
      <div class="k-select-tree__footer-button-wrapper">
        <el-button size="mini" @click="cancelAll">取消全选</el-button>
      </div>
    </template>
    <!-- 底部按钮 end -->
  </el-select>
</template>

<script>
// import KTree from '@/components/comps/KTree'
export default {
  name: 'KSelectTree',
  // components: {
  //   KTree
  // },
  props: {
    /**
     * @description: tree数据
     * @author: li quan
     */
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
     * @description: value 值
     * @author: li quan
     */
    value: {
      type: [String, Array, Number],
      require: true
    },
    /**
     * @description: 是否多选
     * @author: li quan
     */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * @description: 配置选项
     * @author: li quan
     */
    defaultProps: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          value: 'id'
        }
      }
    },
    /**
     * @description: 是否可以选择父节点
     * @author: li quan
     */
    selectParent: {
      type: Boolean,
      default: false
    },
    /**
     * @description: 多选时是否需要全部
     * @author: li quan
     */
    needAll: {
      type: Boolean,
      default: true
    },
    /**
     * @description: 是否可以搜索
     * @author: li quan
     */
    filterable: {
      type: Boolean,
      default: true
    },
    /**
     * @description: 搜索字段
     * @author: li quan
     */
    filterField: {
      type: Array,
      default: () => []
    },
    /**
     * @description: 最大可选数量
     */
    maxLimit: {
      type: [String, Number],
      default: ''
    },
    /**
     * @description: 多选时是否将选中值按文字的形式展示
     */
    collapseTags: {
      type: [Boolean],
      default: true
    },
    /**
     * 是否需要底部按钮
     */
    showFootBtn: {
      type: Boolean,
      default: false
    },
    /**
     * children名称
     */
    childrenName: {
      type: String,
      default: 'children'
    },
    /**
     * 是否需要搜索
     */
    search: {
      type: Boolean,
      default: true
    },
    /**
     * 是否展开全部
     */
    defaultExpandAll: {
      type: Boolean,
      default: true
    },
    /**
     * 占位符
     */
    placeholder: {
      type: String,
      default: '请选择'
    },
    /**
     * 子集有选中，是否带父级
     */
    selectParentAuto: {
      type: Boolean,
      default: false
    },
    /**
     * 是否隐藏父级多选框
     */
    hiddenParentCheckbox: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 选中的值
      selected: '',
      // tree数据
      treeDataList: [],
      // 下拉框唯一calss标识
      uid: (((1 + Math.random()) * new Date().getTime()) | 0).toString(32),
      // 多选时搜索的值
      filterText: '',
      // 配置项
      // props: {
      //   // ID字段名
      //   value: 'id',
      //   // 显示名称
      //   label: 'label',
      //   // 子级字段名
      //   children: 'children',
      //   disabled: (data, node) => {
      //     const maxLimit = Number(this.maxLimit)
      //     if (maxLimit && this.selected.length === maxLimit) {
      //       return !this.checkAllId.includes(data[this.treeProps.value])
      //     }
      //   }
      // },
      checkAllId: []
    }
  },
  computed: {
    treeProps () {
      return { ...this.props, ...this.defaultProps }
    },
    props () {
      const props = {
        // ID字段名
        value: 'id',
        // 显示名称
        label: 'label',
        // 子级字段名
        children: this.childrenName,
        disabled: (data, node) => {
          const maxLimit = Number(this.maxLimit)
          if (maxLimit && this.selected.length === maxLimit) {
            return !this.checkAllId.includes(data[this.treeProps.value])
          }
        }
      }
      !this.maxLimit && delete props.disabled
      return props
    }
  },
  watch: {
    value: {
      handler (val) {
        if (this.multiple && val === '') {
          val = []
        }
        this.selected = val
        this.$nextTick(() => {
          if (this.multiple) {
            console.log('我执行了', val)
            this.$refs.selecteltree.setCheckedKeys(val)
          } else {
            this.$refs.selecteltree.setCurrentKey(val)
          }
        })
      },
      immediate: true,
      deep: true
    },
    treeData: {
      handler (val) {
        this.allSymbol = Symbol('all')
        if (this.multiple && this.needAll) {
          this.treeDataList = [
            {
              [this.treeProps.value]: this.allSymbol,
              [this.treeProps.label]: '全部',
              // disabled: true,
              [this.treeProps.children]: JSON.parse(JSON.stringify(val))
            }
          ]
        } else {
          this.treeDataList = JSON.parse(JSON.stringify(val))
        }
      },
      deep: true,
      immediate: true
    },
    filterText (val) {
      this.$refs.selecteltree.filter(val)
    }
  },
  methods: {
    /**
     *
     * @param {*} value
     * @param {*} data
     */
    filterNode (value, data) {
      if (!value) return true
      if (this.filterField.length) {
        for (let index = 0; index < this.filterField.length; index++) {
          const element = this.filterField[index]
          return data[element].indexOf(value.toLocaleUpperCase()) !== -1
        }
      } else {
        return data[this.treeProps.label].indexOf(value) !== -1
      }
      // return data?.label?.indexOf(value.toLocaleUpperCase()) !== -1
    },
    /**
     * select搜索方法
     */
    filterMethod (val) {
      this.$refs.selecteltree.filter(val)
    },
    /**
     * 下拉框出现/隐藏时触发
     * @param {*} val 出现则为 true，隐藏则为 false
     */
    visibleChange (val) {
      this.$emit('visibleChange', val)
      if (val) {
        // 获取treeDOM宽度
        this.$nextTick(() => {
          const width = document.querySelector('.k-select-tree-dropdown-' + this.uid).offsetWidth
          this.$refs.selecteltree.$el.style.width = Number(width) + 10 + 'px'
        })
      } else if (!this.multiple) {
        setTimeout(() => {
          this.$refs.selecteltree.filter('')
        }, 500)
      }
    },
    /**
     * 点击下拉树列表触发，单选方法
     * @param {*} node 传递给 data 属性的数组中该节点所对应的对象
     */
    handleNodeClick (node) {
      if (this.multiple) return
      // 不选择父节点时 return
      if (!this.selectParent && (node[this.treeProps.children] && node[this.treeProps.children].length)) return
      this.selected = node[this.treeProps.value]
      this.$emit('input', this.selected)
      this.$emit('change', node)
      this.$refs.KSelectTree.blur()
    },
    /**
     * 点击下拉树列表触发，多选方法
     * @param {*} data 传递给 data 属性的数组中该节点所对应的对象
     * @param {*} checked 节点本身是否被选中
     */
    handleCheckChange (data, checked) {
      /**
       * 全选卡顿原因
       * this.selected.push(data[this.treeProps.value])
       * this.selected.splice(index, 1)
       * this.$emit('input', this.selected)
       */

      // if (!this.multiple) return
      // // 不选择父节点时 return
      // if (!this.selectParent && (data.children && data.children.length)) return
      // if (data[this.treeProps.value] === this.allSymbol) return
      // const index = this.selected.indexOf(data[this.treeProps.value])
      // if (checked) {
      //   if (this.maxLimit && this.selected.length === Number(this.maxLimit)) {
      //     return
      //   }
      //   index < 0 && this.selected.push(data[this.treeProps.value])
      // } else {
      //   index > -1 && this.selected.splice(index, 1)
      // }
      // this.$emit('input', this.selected)
      // // this.$emit('change', node)
      // this.$nextTick(() => {
      //   this.checkAllId = this.$refs.selecteltree.getCheckedKeys()
      // })
    },

    /**
     * 点击下拉树列表触发，多选方法
     */
    handleCheckChange1 () {
      if (!this.multiple) return
      // 获取当前已选的数据集合
      const checkData = this.$refs.selecteltree.getCheckedNodes()

      // console.log('checkData--', checkData)

      // 去掉拥有子节点的数据
      const filterTreeChild = (tree) => {
        const data = []
        for (let i = 0; i < tree.length; i++) {
          if (this.selectParent) {
            // 需要父节点
            if (tree[i][this.treeProps.value] !== this.allSymbol) {
              // console.log(1111)
              if (this.selectParentAuto) {
                // 子集有选中，是否带父级
                const pNode = this.$refs.selecteltree.getNode(tree[i]).parent.data
                // 查看有没有重复的
                const arr = data.filter(item => item[this.treeProps.value] === pNode[this.treeProps.value])
                if (pNode[this.treeProps.value] && pNode[this.treeProps.value] !== this.allSymbol && arr.length === 0) {
                  data.push(pNode)
                }
              }
              data.push(tree[i])
            }
          } else {
            // 不需要父节点
            if (tree[i][this.treeProps.value] !== this.allSymbol && !(tree[i][this.treeProps.children] && tree[i][this.treeProps.children].length > 0)) {
              // console.log(2222)
              data.push(tree[i])
            }
          }
        }

        return data
      }
      // !this.selectParent && (data.children && data.children.length)
      const treeData = filterTreeChild(checkData)

      // console.log('treeData--', treeData)

      /**
       * 获取遍历数据的长度
       * 如果当前子节点超过了最大限制数量，则只保留最大限制数量的数据
       * 如果没有超过，则查找当前数据
       */
      const treeLength = this.maxLimit && treeData.length >= Number(this.maxLimit) ? this.maxLimit : treeData.length

      // 最后得到的数据key集合
      const maxData = []
      for (let j = 0; j < treeLength; j++) {
        maxData.push(treeData[j][this.treeProps.value])
      }

      // console.log('maxData--', maxData)

      this.selected = maxData

      this.$emit('input', maxData)
      // 如果超过最大数量，超过的节点disabled
      this.$nextTick(() => {
        // 没有延时器会导致所有数据都会disabled
        setTimeout(() => {
          this.checkAllId = this.$refs.selecteltree.getCheckedKeys()
          this.$emit('change', this.checkAllId)
        }, 10)
      })
    },
    // check (currentCheck, { checkedKeys, checkedNodes }) {

    // }
    /**
     * 改变select中的值触发
     * @param {*} val 改变的值
     */
    handleChange (val) {
      if (this.multiple) {
        this.$refs.selecteltree.setCheckedKeys(val)
      } else {
        this.$refs.selecteltree.setCurrentKey(val)
      }
      this.$emit('change', val)
    },
    /**
     * 格式化数据
     */
    formatData (data) {
      const options = []
      const format = (data) => {
        if (!Array.isArray(data)) return
        data && data.forEach((item) => {
          options.push({ label: item[this.treeProps.label], value: item[this.treeProps.value] })
          if (item[this.treeProps.children]) {
            format(item[this.treeProps.children])
          }
        })
      }
      format(data)
      return options
    },
    /**
     * 取消全选
     */
    cancelAll () {
      this.selected = []
      this.$emit('input', [])
    }
  }
}
</script>

<style lang="scss">
.k-select-tree-dropdown {
  .is-vertical {
    z-index: 23;
  }

  .el-checkbox {
    .el-checkbox__inner,
    .el-checkbox__inner::after {
      transition: initial !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.k-select-tree-dropdown ::v-deep {
  .el-tree-node__content {
    padding-right: 10px;
  }
}

.k-select-tree-dropdown {
  .k-select-tree__footer-button-wrapper {
    box-sizing: border-box;
    position: absolute;
    left: 0px;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    padding: 6px 10px;
    border-top: 1px solid #4e4e4e;
    background-color: #000;
    z-index: 10;
    text-align: right;
  }

  .is-vertical ::v-deep {
    z-index: 23;
  }
}

.hiddenParentCheckbox{
  ::v-deep .el-checkbox {
    display: none;
  }
  ::v-deep div[role="group"] {
    .el-checkbox {
      display: inline-block;
    }
  }
}
</style>
