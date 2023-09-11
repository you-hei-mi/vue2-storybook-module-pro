<!--
 * @Description: 模板管理
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2022-05-05 15:59:18
 * @LastEditTime: 2022-10-19 18:07:18
 * @LastEditors: hanbingxu
 * @FilePath: /dss-new-ui/src/components/comps/KWorkbench/views/templateAdmin/index.vue
-->

<template>
  <div class="templateManagement">
    <k-card header="模板管理" style="min-height: 50px" theme="routine">
      <template slot="header">
        <span>模板管理</span>
        <el-button style="float: right" type="primary" icon="el-icon-plus" @click="addTemplate">新 增</el-button>
      </template>
      <div>
        <el-form style="display: inline-block" ref="form" :model="typeQueryParams" :inline="true"
          class="demo-form-inline">
          <el-form-item label="模板名称：">
            <el-input v-model="typeQueryParams.keywords" placeholder="请输入模板名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" :loading="tableLoading" @click="query()">查询
            </el-button>
            <el-button size="mini" @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-top: -2px">
        <el-table class="table-black table-auto-height" :data="formatData" v-loading="tableLoading"
          tooltip-effect="dark" table-auto-height style="width: 100%;">
          <el-table-column type="index" label="序号" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="tempName" show-overflow-tooltip min-width="180" label="模板名称">
          </el-table-column>
          <el-table-column prop="createBy" show-overflow-tooltip min-width="180" label="创建人">
          </el-table-column>
          <el-table-column prop="createTime" show-overflow-tooltip min-width="180" label="创建时间">
          </el-table-column>
          <el-table-column prop="updateTime" show-overflow-tooltip min-width="180" label="修改时间">
          </el-table-column>
          <!-- <el-table-column
            prop="createTime"
            show-overflow-tooltip
            min-width="180"
            label="用户"
          ></el-table-column>-->
          <el-table-column prop="enable" show-overflow-tooltip min-width="80" label="是否启用">
            <template slot-scope="scope">
              <el-switch @change="enableChange(scope.row)" :value="scope.row.enable === '1'" active-color="#13ce66"
                inactive-color="#ff4949"></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop show-overflow-tooltip min-width="200" label="操作">
            <template slot-scope="scope">
              <el-button @click="renameClick(scope.row)" type="text" size="small">重命名</el-button>
              <el-button @click="copyClick(scope.row)" type="text" size="small">复制</el-button>
              <el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button>
              <el-button @click="assignRolesClick(scope.row)" type="text" size="small">分配用户</el-button>
              <el-button @click="removeClick(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
          <div slot="empty">
            <k-empty type="table"></k-empty>
          </div>
        </el-table>
        <k-pagination :total="total" :page.sync="queryParams.current" :limit.sync="queryParams.size"
          @pagination="getList"></k-pagination>
      </div>
    </k-card>
    <!-- 重命名 -->
    <RenameDialog v-if="renameVisible" :visible.sync="renameVisible" :renameFrom="renameFrom"
      :btnLoading="renameLoading" @submit="renameSubmit"></RenameDialog>
    <!-- 权限分配 -->
    <assignUsersDialog :submitLoading="assignUsersDialogSubmitLoading" v-if="assignUsersVisible"
      :roleUserList="templateUserList" :visible.sync="assignUsersVisible" @submit="assignUsersSubmit">
    </assignUsersDialog>
  </div>
</template>
<script>
import RenameDialog from '../components/RenameDialog' // 重命名弹窗
import * as api from '@/api/workbench/index' // 接口
import assignUsersDialog from '../components/assignUsers'
import { URLConfig } from '../../config/tools' // 模型默认配置文件
import _ from 'lodash'

export default {
  components: {
    RenameDialog,
    assignUsersDialog
  },
  data () {
    return {
      // 权限分配 按钮加载效果
      assignUsersDialogSubmitLoading: false,
      // 是否显示重命名弹窗
      renameVisible: false,
      // 重命名加载动画
      renameLoading: false,
      // 重命名ID
      renameID: '',
      // 重命表单数据
      renameFrom: {
        moduleName: ''
      },
      // 是否显示角色分配弹窗
      assignRolesVisible: false,
      //  角色分配加载动画
      assignRolesLoading: false,
      assignUsersVisible: false, // 用户分配弹窗开关
      templateUserList: [], // 模板下用户List
      // 角色分配id
      assignRolesId: '',
      //  角色分配表单数据
      assignRolesFrom: {
        moduleName: '',
        tempId: '',
        assignRoles: ''
      },
      // 表格数据
      formatData: [],
      // 表格动画
      tableLoading: true,
      // 临时查询数据
      typeQueryParams: {
        current: 1,
        size: 10,
        keywords: ''
      },
      // 查询数据
      queryParams: {
        current: 1,
        size: 20,
        keywords: ''
      },
      // 临时存储点击当前行数据
      rowData: {},
      // 总数
      total: 0
    }
  },
  created () {
    // 初始化数据
    this.getList(this.queryParams)
  },
  computed: {},
  methods: {
    /**
     * 查询
     */
    query: _.throttle(
      function () {
        this.typeQueryParams.current = 1
        this.queryParams = JSON.parse(JSON.stringify(this.typeQueryParams))
        this.getList(this.queryParams)
      },
      1000,
      true
    ),
    /**
     * 重置
     */
    resetForm: _.throttle(
      function () {
        this.typeQueryParams = {
          current: 1,
          size: 20,
          keywords: ''
        }
        this.queryParams = JSON.parse(JSON.stringify(this.typeQueryParams))
        // this.getList(this.queryParams)
      },
      1000,
      true
    ),
    /**
     * @title 列表数据查询
     * @param { current: 当前页, size: 每页显示条目个数 })
     **/
    getList (val1) {
      let val
      if (!val1.pageNo || !val1.current) {
        val = {
          pageNo: val1.current,
          pageSize: val1.size,
          keywords: this.queryParams.keywords
        }
      } else {
        val = val1
      }
      this.tableLoading = true
      api
        .tempPage({
          ...val
        })
        .then((res) => {
          this.tableLoading = false
          this.queryParams.current = res.data.data.current
          this.total = res.data.data.total
          this.formatData = res.data.data.records
        })
        .catch(() => {
          this.tableLoading = false
        })
    },
    /**
     * 重命名
     */
    renameClick (row) {
      this.renameID = row.tempId
      const comName = row.tempName
      this.renameFrom = {
        moduleName: comName
      }
      this.renameVisible = true
    },
    /**
     * 提交重命名
     * @param {重命名表单数据} val
     */
    renameSubmit (val) {
      const params = {
        tempId: this.renameID,
        tempName: val.moduleName
      }
      api
        .tempRename(params)
        .then(({ res }) => {
          this.renameVisible = false
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.getList(this.queryParams)
        })
        .catch(() => {
          // this.renameVisible = false
        })
    },
    /**
     * 分配角色
     */
    assignRolesClick (row) {
      const data = JSON.parse(JSON.stringify(row))
      this.rowData = data
      this.dialogTitle = '分配用户'
      // 获取用户信息
      api.getFindUserByTempId(data).then(res => {
        this.templateUserList = res.data.data.records
        this.assignUsersVisible = true
      })
      this.assignRolesVisible = true
    },
    /**
     * 分配角色提交
     * @param {分配角色数据} val
     */
    assignUsersSubmit: _.throttle(function (userId) {
      this.assignUsersDialogSubmitLoading = true
      api.setTempAllot({ tempId: this.rowData.tempId, userId }).then(res => {
        this.assignUsersDialogSubmitLoading = false
        this.assignUsersVisible = false
        this.$message.success('保存成功')
        this.getList(this.queryParams)
      }).catch(err => {
        // console.log(err)
      })
    }, 1000, true
    ),
    /**
     * 是否禁用
     */
    enableChange: _.throttle(
      function (val) {
        if (val.enable === '1') {
          val.enable = '0'
        } else {
          val.enable = '1'
        }
        const params = {
          tempId: val.tempId,
          enable: val.enable
        }
        api
          .tempEnable(params)
          .then(({ res }) => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.getList(this.queryParams)
          })
          .catch((res) => {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          })
      },
      1000,
      true
    ),
    /**
     * 新增
     */
    addTemplate (res) {
      this.goLayoutEdit({ type: 'add' })
    },
    /**
     * 复制
     */
    copyClick (res) {
      this.goLayoutEdit({ type: 'copy', pathCopyKey: res.tempId })
    },
    /**
     * 编辑
     */
    editClick (res) {
      this.goLayoutEdit({ type: 'edit', pathKey: res.tempId })
    },
    /**
     * 删除
     */
    removeClick (row) {
      this.$confirm(`此操作将删除 ${row.tempName} 模板, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then((_) => {
          api.tempRemove({ tempId: row.tempId }).then((res) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getList(this.queryParams)
          })
        })
        .catch((_) => {
          this.$message({
            message: '已取消删除',
            type: 'warning'
          })
        })
    },
    /**
     * 跳转逻辑处理
     * @param {跳转类型} param
     */
    goLayoutEdit (param) {
      // let url = JSON.parse(JSON.stringify(URLConfig.edit))
      // if (url.indexOf('?') === -1) {
      //   url = url + param
      // } else {
      //   url = url + param.replace('?', '&')
      // }
      // console.log('前往工作台编辑页面')
      // // console.log(url)
      // this.$router.push({url})
      // 返回模板预览
      this.$router.push({
        path: URLConfig.edit,
        query: param
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.templateManagement {
  height: 100%;
  overflow: hidden;
  min-height: 100%;
  overflow: hidden;
  ::v-deep(.el-table) {
    &.table-auto-height {
      .el-table__body-wrapper {
        overflow-y: auto !important;
        max-height: calc(100vh - 307px);
      }
    }
  }
}
</style>
