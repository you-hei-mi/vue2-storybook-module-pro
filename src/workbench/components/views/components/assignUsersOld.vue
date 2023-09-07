<!--
 * @Description:分配用户-弹窗（老版本2个下拉树）
 * @Version: 1.0
 * @Author: hanbingxu
 * @Date: 2022-10-11 16:31:58
 * @LastEditTime: 2023-08-19 13:35:33
 * @LastEditors: Please set LastEditors
 * @FilePath: \k-cbm\packages\components\b-workbench\src\components\views\components\assignUsersOld.vue
-->
<template>
  <el-dialog
    v-bind="$attrs"
    ref="drawer"
    :close-on-click-modal="false"
    class="assignUsers_dialog"
    :title="title"
    custom-class="demo-drawer"
    width="1200px"
    @close="closeDrawer"
  >
    <div
      v-loading="loading&&loadingRole"
      class="drawer_content"
    >
      <div class="drawer_com">
        <div class="com">
          <el-input
            v-model="filterText"
            placeholder="输入关键字进行过滤（部门）"
          />
          <new-el-tree
            ref="tree"
            show-checkbox
            class="filter-tree"
            :data="dataTree"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            node-key="id"
            @check-change="(data,check)=>handleCheckChange(data,check, 'dept')"
          >
            <span slot-scope="{ data }">
              {{ data.labelName }}
            </span>
          </new-el-tree>
        </div>
        <div class="com">
          <el-input
            v-model="filterTextRole"
            placeholder="输入关键字进行过滤（角色）"
          />
          <new-el-tree
            ref="treeRole"
            show-checkbox
            class="filter-tree"
            :data="dataTreeRole"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            node-key="id"
            @check-change="(data,check)=>handleCheckChange(data,check, 'role')"
          >
            <span slot-scope="{ data }">
              {{ data.labelName }}
            </span>
          </new-el-tree>
        </div>
      </div>

      <!-- <div class="drawer_table"> -->
      <el-table
        class="drawer_table"
        height="540"
        :data="tableData"
      >
        <el-table-column
          type="index"
          label="序号"
          width="90"
        />
        <el-table-column
          prop="name"
          label="人员名称"
        />
        <el-table-column
          prop="deptName"
          label="部门"
        />
        <el-table-column
          prop="userName"
          label="登录名"
        />
        <el-table-column
          prop="authName"
          label="角色名称"
        />
        <el-table-column
          prop="status"
          label="状态"
        >
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.status==='0'"> <span style="color:#49AA19;">●</span> 有效</span>
              <span v-else> <span style="color:#d83039;">●</span> 锁定</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label=""
          width="90"
        >
          <template slot-scope="scope">
            <div>
              <span
                class="el-icon-close"
                @click="deleteRow(scope.row)"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- </div> -->
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
        @click="submit()"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import NewElTree from '@/components/comps/new-el-tree/src/tree.vue'
import { getDeptAndUser, getRoleAndUser } from '@/api/admin/role'
export default {
  name: 'AssignUsers',
  components: {
    NewElTree
  },
  props: {
    /**
     * @description: 弹窗标题
     * @author: zou hua
     */
    title: {
      type: String,
      default: '分配用户'
    },
    /**
     * @description: 角色用户List
     * @return {*}
     */
    roleUserList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      // loading加载效果
      loading: true,
      loadingRole: true,
      // tree过滤文字
      filterText: '',
      // tree过滤文字
      filterTextRole: '',
      // tree数据
      dataTree: [],
      // 角色树
      dataTreeRole: [],
      // tree组件默认属性
      defaultProps: {
        children: 'child',
        label: 'label'
      },
      // tree表格选中信息
      tableData: [],
      // 行业代码
      selected: []
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
    filterTextRole (val) {
      this.$refs.treeRole.filter(val)
    }
  },
  mounted () {
    // 初始化数据
    this.getDeptAndUser()
    this.getRoleAndUser()
  },
  methods: {

    /**
     * 筛选树节点
     * @param {*} value
     * @param {*} data
     */
    filterNode (value, data) {
      if (!value) {return true}
      return data.label.toLocaleUpperCase().indexOf(value.toLocaleUpperCase()) !== -1
    },
    /**
     * 查询弹窗部门树数据
     */
    getDeptAndUser () {
      this.dataTree = []
      this.loading = true
      getDeptAndUser().then(({data}) => {
        if (data) {
          this.dataTree = this.formatData(data, 'deptName')
          // 赋值高亮
          this.$nextTick(() => {
            this.roleUserList.forEach(item => {
              this.$refs.tree.setMyChecked(item.userId, true, true)
              this.selected.push(this.getItemByIdInTree(item.userId, this.dataTree))
            })
            this.tableData = this.selected
            this.loading = false
          })
        }
      }).catch(() => {
        this.loading = false
        this.dataTree = []
      })
    },
    /**
     * 查询弹窗角色树数据
     */
    getRoleAndUser () {
      this.dataTree = []
      this.loadingRole = true
      getRoleAndUser().then(({data}) => {
        if (data) {
          this.dataTreeRole = this.formatData(data, 'name')
          // 赋值高亮
          this.$nextTick(() => {
            this.roleUserList.forEach(item => {
              this.$refs.treeRole.setMyChecked(item.userId, true, true)
            })
            this.loadingRole = false
          })
        }
      }).catch(() => {
        this.loadingRole = false
        this.dataTreeRole = []
      })
    },
    /**
     * 格式化树数据
     */
    formatData (data, nameStr) {
      // const treeData = []
      if (!Array.isArray(data)) {return}
      data.forEach((item, index) => {
        if (item.child) {
          this.formatData(item.child, nameStr)
        }
        item.onlyKey = new Date().getTime() + index + item.id
        item.labelName = item.child ? item[nameStr] : item.name
        item.label = item.child ? item[nameStr] : item.name
      })
      return data
    },
    /**
     * 点击下拉树列表触发，多选方法
     * @param {*} data 传递给 data 属性的数组中该节点所对应的对象
     * @param {*} type 类型
     */
    handleCheckChange (data, check, type) {
      const index = this.selected.findIndex(item => {
        return item.id === data.id
      })
      if (check) {
        if (index < 0) {
          this.selected.push(data)
          this.$refs[type === 'dept' ? 'treeRole' : 'tree'].setMyChecked(data.id, true, true)
          type !== 'dept' && this.$refs.treeRole.setMyChecked(data.id, true, true)
        }
      } else {
        if (index > -1) {
          this.selected.splice(index, 1)
          this.$refs[type === 'dept' ? 'treeRole' : 'tree'].setMyChecked(data.id, false, true)
          type !== 'dept' && this.$refs.treeRole.setMyChecked(data.id, false, true)
        }
      }
      // 过滤父级选项
      const tableData = this.selected.filter(item => {
        return item.deptOrUser === 'user' || item.deptOrUser === '4'
      })
      // 数组去重操作
      const obj = {}
      const onlyData = tableData.reduce((cur, next) => {
        // eslint-disable-next-line no-unused-expressions
        obj[next.id] ? '' : obj[next.id] = true && cur.push(next)
        return cur
      }, [])
      this.tableData = JSON.parse(JSON.stringify(onlyData))
      this.tableData = tableData
    },
    // 关闭抽屉后
    closeDrawer () {
      this.$emit('update:visible', false)
    },
    /**
     * @description: 删除当前行
     * @return {*}
     */
    deleteRow (data) {
      const index = this.selected.findIndex(item => {
        return item.id === data.id
      })
      index > -1 && this.selected.splice(index, 1)
      // 过滤父级选项
      const tableData = this.selected.filter(item => {
        return item.deptOrUser === 'user' || item.deptOrUser === '4'
      })
      // 数组去重操作
      const obj = {}
      const onlyData = tableData.reduce((cur, next) => {
        // eslint-disable-next-line no-unused-expressions
        obj[next.id] ? '' : obj[next.id] = true && cur.push(next)
        return cur
      }, [])
      this.tableData = JSON.parse(JSON.stringify(onlyData))
      this.$refs.tree.setMyChecked(data.id, false, true)
      this.$refs.treeRole.setMyChecked(data.id, false, true)
    },
    /**
     * @description: 根据id获取指定节点
     * @params: id-要查询的节点id
     * @params: tree-树形结构的数组
     * @return: 要查找的节点对象
    **/
    getItemByIdInTree (id, tree) {
      let res = null
      for (let i = 0; i < tree.length; i++) {
        const ele = tree[i]
        if (ele.id === id) {
          res = ele
        }
        if (res) {break}
        if (ele.child && ele.child.length) {
          res = this.getItemByIdInTree(id, ele.child)
        }
      }
      return res
    },
    // 提交
    submit () {
      this.$emit('submit', this.tableData.map(item => item.id))
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../common/css/variable.scss";
.assignUsers_dialog {
  .drawer_content {
    display: flex;
    height: 100%;
    .drawer_com {
      width: 200px;
      // height: 540px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .com {
        // overflow: auto;
        .filter-tree {
          height: 240px;
          overflow: auto;
        }
      }
    }
    .drawer_table {
      margin-left: 16px;
      .el-icon-close {
        cursor: pointer;
      }
    }
  }
}
</style>
