<!--
 * @Description:  组件管理
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2022-05-05 15:58:55
 * @LastEditTime: 2022-09-15 14:52:09
 * @LastEditors: caicy caicy@kaiyufound.com
 * @FilePath: /dss-new-ui/src/components/comps/KWorkbench/views/componentsAdmin/index.vue
-->

<template>
  <div class="componentsAdmin">
    <k-card header="组件管理" style="min-height: 50px" theme="routine">
      <template slot="header">
        <span>组件管理</span>
        <el-button style="float: right" type="primary" icon="el-icon-plus" @click="addComponents">新 增</el-button>
      </template>
      <div>
        <el-form ref="form" style="display: inline-block" :model="typeQueryParams" :inline="true"
          class="demo-form-inline">
          <el-form-item label="组件名称：">
            <el-input v-model="typeQueryParams.keywords" placeholder="请输入组件名称"></el-input>
          </el-form-item>
          <el-button type="primary" size="mini" :loading="tableLoading" @click="query()">查询
          </el-button>
          <el-button size="mini" @click="resetForm()">重置</el-button>
        </el-form>
      </div>
      <div style="margin-top: -2px">
        <el-table class="table-black" :data="formatData" v-loading="tableLoading" tooltip-effect="dark"
          style="width: 100%">
          <el-table-column type="index" label="序号" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="comName" show-overflow-tooltip min-width="180" label="组件名称">
          </el-table-column>
          <el-table-column prop="comCode" show-overflow-tooltip min-width="180" label="组件代码">
          </el-table-column>
          <el-table-column prop="comTypeName" show-overflow-tooltip min-width="180" label="组件分类">
          </el-table-column>
          <el-table-column prop="createBy" show-overflow-tooltip min-width="180" label="创建人">
          </el-table-column>
          <el-table-column prop="createTime" show-overflow-tooltip min-width="180" label="创建时间">
          </el-table-column>
          <!-- <el-table-column
            prop="isDelete"
             align='center'
            show-overflow-tooltip
            min-width="120"
            label="是否可移除"
          >
            <template slot-scope="scope">
              <el-switch
                :value="scope.row.isDelete === '1'"
                @change="deleteChange(scope.row)"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="isDraggable"
            show-overflow-tooltip
             align='center'
            min-width="120"
            label="是否可拖拽"
            ><template slot-scope="scope">
              <el-switch
                @change="draggableChange(scope.row)"
                :value="scope.row.isDraggable === '1'"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="enable"
             align='center'
            show-overflow-tooltip
            min-width="120"
            label="是否可调整大小"
            ><template slot-scope="scope">
              <el-switch
                @change="resizableChange(scope.row)"
                :value="scope.row.isResizable === '1'"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>-->
          <el-table-column prop="comDesc" show-overflow-tooltip min-width="180" label="组件描述">
          </el-table-column>

          <el-table-column prop show-overflow-tooltip min-width="180" label="操作">
            <template slot-scope="scope">

              <el-button @click="renameClick(scope.row)" type="text" size="small">重命名</el-button>
              <!-- <el-button
                  @click="previewClick(scope.row)"
                  type="text"
                  size="small"
                  >预览</el-button
                >-->
              <el-button type="text" @click="editClick(scope.row)" size="small">编辑</el-button>
              <!-- <el-button
                  @click="dataFormatClick(scope.row)"
                  type="text"
                  size="small"
                  >数据格式</el-button
                >-->
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
      :btnLoading="renameLoading" @submit="renameSubmit" :maxlength="15" labelName="组件名称"></RenameDialog>
    <!-- 组件预览 -->
    <preview-dialog v-if="previewVisible" :visible.sync="previewVisible" :previewEcharts="previewEcharts"
      :btnLoading="previewLoading" @submit="previewSubmit"></preview-dialog>
    <!-- 数据格式 -->
    <data-format-dialog v-if="dataFormatVisible" :visible.sync="dataFormatVisible" :dataFormatFrom="dataFormatFrom"
      :btnLoading="dataFormatLoading" @submit="dataFormatSubmit"></data-format-dialog>
    <!--编辑  -->
    <edit-dialog v-if="editVisible" :editTitle="editTitle" :visible.sync="editVisible" :editForm="editForm"
      :btnLoading="editLoading" :deptRoleLists="deptRoleLists" @submit="editSubmit"></edit-dialog>
  </div>
</template>
<script>
import * as api from '@/api/workbench/index' // 接口
import { roleTree } from '@/api/admin/role'
import RenameDialog from '../components/RenameDialog' // 重命名弹窗
import previewDialog from '../components/previewDialog' // 组件预览弹窗
import dataFormatDialog from '../components/dataFormatDialog'
import editDialog from '../components/editDialog'
import _ from 'lodash'

export default {
  components: {
    RenameDialog,
    previewDialog,
    dataFormatDialog,
    editDialog
  },
  data () {
    return {
      // 新增/编辑组件弹窗--标题
      editTitle: '',
      // 是否显示新增/编辑组件弹窗
      editVisible: false,
      // 编辑ID
      editID: '',
      // 新增/编辑组件弹窗--表单
      editForm: {
        comName: undefined,
        comTypeValue: undefined,
        comDesc: undefined,
        layoutX: undefined,
        layoutY: undefined,
        layoutW: undefined,
        layoutH: undefined,
        minW: undefined,
        minH: undefined,
        maxW: undefined,
        maxH: undefined,
        isDraggable: true,
        isResizable: true,
        isDelete: true,
        enable: true,
        comImg: undefined,
        comType: undefined,
        roleList: undefined
      },
      // 编辑加载动画
      editLoading: false,
      // 表格数据
      formatData: [],
      // 表格动画
      tableLoading: true,
      // 临时查询数据
      typeQueryParams: {
        current: 1,
        size: 20,
        keywords: ''
      },
      // 查询数据
      queryParams: {
        current: 1,
        size: 20,
        keywords: ''
      },
      // 总数
      total: 0,
      // 是否显示重命名弹窗
      renameVisible: false,
      // 重命名ID
      renameID: '',
      // 重命名加载动画
      renameLoading: false,
      // 重命表单数据
      renameFrom: {
        moduleName: ''
      },
      // 预览加载动画
      previewLoading: false,
      // 是否显示预览弹窗
      previewVisible: false,
      // 预览数据
      previewEcharts: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: '数据1' },
              { value: 735, name: '数据2' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      // 数据格式弹窗
      dataFormatVisible: false,
      // 数据格式加载动画
      dataFormatLoading: false,
      //  数据格式表单
      dataFormatFrom: {
        date: '',
        name: '',
        address: ''
      },
      // 角色数据
      deptRoleLists: []
    }
  },
  created () {
    // 初始化数据
    this.getList(this.queryParams)
    this.deptRoleList()
  },
  methods: {
    deptRoleList () {
      roleTree().then(res => {
        this.deptRoleLists = res.data.data || []
      })
    },
    // 选择图标
    selected (name) {
      // console.log('选择图标')
      // console.log(name)
      this.editForm.comImg = name
    },
    // 提交代码
    // submitForm (formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       // console.log('提交')
    //       if (this.editTitle === '新增组件') {
    //         api.basicInfoAdd(this.editForm).then(({ res }) => {
    //           // console.log('111111111')
    //         })
    //       }
    //     } else {
    //       // console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    /**
     * 预览确定
     */
    previewSubmit () { },
    /**
     * 数据确定
     */
    dataFormatSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log('提交')
          if (this.editTitle === '新增组件') {
            api.basicInfoAdd(this.editForm).then(({ res }) => {
              // console.log('111111111')
            })
          }
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    // 新增组件
    addComponents () {
      this.editTitle = '新增组件'
      this.editForm = {
        comName: undefined,
        comTypeValue: undefined,
        comDesc: undefined,
        layoutX: undefined,
        layoutY: undefined,
        layoutW: undefined,
        layoutH: undefined,
        minW: undefined,
        minH: undefined,
        maxW: undefined,
        maxH: undefined,
        isDraggable: true,
        isResizable: true,
        isDelete: true,
        enable: true,
        comImg: undefined,
        comType: undefined,
        roleList: undefined
      }
      this.editVisible = true
    },
    /**
     * @title 列表数据查询
     * @param { current: 当前页, size: 每页显示条目个数 })
     **/
    getList (val1) {
      let val
      if (!val1.pageNo || val1.current) {
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
        .basicInfoPage({
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
     * 查询
     */
    query: _.throttle(function () {
      this.typeQueryParams.current = 1
      this.queryParams = JSON.parse(JSON.stringify(this.typeQueryParams))
      this.getList(this.queryParams)
    }, 1000, true
    ),
    /**
     * 重置
     */
    resetForm: _.throttle(function () {
      this.typeQueryParams = {
        current: 1,
        size: 20,
        keywords: ''
      }
      this.queryParams = JSON.parse(JSON.stringify(this.typeQueryParams))
      // this.getList(this.queryParams)
    }, 1000, true
    ),
    /**
     * 重命名
     */
    renameClick (row) {
      this.renameID = row.comId
      const comName = row.comName
      this.renameFrom = {
        moduleName: comName
      }
      this.renameVisible = true
    },
    // 重命名提交
    renameSubmit (val) {
      const params = {
        comId: this.renameID,
        comName: val.moduleName
      }
      api
        .basicInfoRename(params)
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
     * 数据格式
     */
    dataFormatClick () {
      this.dataFormatVisible = true
    },
    /**
     * 预览
     */
    previewClick () {
      this.previewVisible = true
    },
    /**
     * 编辑
     */
    editClick (val) {
      const row = JSON.parse(JSON.stringify(val))
      this.editTitle = '编辑组件'
      this.editID = row.comId
      if (row.isDraggable === '1') {
        row.isDraggable = true
      } else {
        row.isDraggable = false
      }
      if (row.isResizable === '1') {
        row.isResizable = true
      } else {
        row.isResizable = false
      }
      if (row.isDelete === '1') {
        row.isDelete = true
      } else {
        row.isDelete = false
      }
      if (row.enable === null) {
        row.enable = true
      } else if (row.enable === '1') {
        row.enable = true
      } else {
        row.enable = false
      }
      this.editForm = row
      this.editVisible = true
    },
    /**
     * 编辑-新增组件
     */
    editSubmit (val1) {
      const val = JSON.parse(JSON.stringify(val1))
      // console.log('编辑-新增组件')
      // console.log(val)
      this.editLoading = true
      const params = {
        comCode: val.comCode,
        comName: val.comName,
        comTypeValue: val.comTypeValue,
        comDesc: val.comDesc,
        layoutX: val.layoutX,
        layoutY: val.layoutY,
        layoutW: val.layoutW,
        layoutH: val.layoutH,
        minW: val.minW,
        minH: val.minH,
        maxW: val.maxW,
        maxH: val.maxH,
        isDraggable: val.isDraggable ? '1' : '0',
        isResizable: val.isResizable ? '1' : '0',
        isDelete: val.isDelete ? '1' : '0',
        enable: val.enable ? '1' : '0',
        comImg: val.comImg,
        roleList: val.roleList
      }
      if (this.editTitle === '新增组件') {
        api
          .basicInfoAdd(params)
          .then(({ res }) => {
            this.editVisible = false
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.getList(this.queryParams)
          })
          .catch(() => {
            // this.editVisible = false
          })
      } else {
        // 编辑
        params.comId = this.editID
        api
          .basicInfoUpdate(params)
          .then(({ res }) => {
            this.editVisible = false
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.getList(this.queryParams)
          })
          .catch(() => {
            // this.editVisible = false
          })
      }
    },
    /**
     * 删除
     */
    removeClick (row) {
      this.$confirm(`此操作将删除 ${row.comName} 组件, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then((_) => {
          api.basicInfoRemove({ comId: row.comId }).then((res) => {
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
     * 是否可移除
     */
    deleteChange: _.throttle(
      function (row) {
        if (row.isDelete === '1') {
          row.isDelete = '0'
        } else {
          row.isDelete = '1'
        }
        const params = {
          comId: row.comId,
          isDraggable: row.isDraggable,
          isResizable: row.isResizable,
          isDelete: row.isDelete
        }
        this.basicInfoState(params)
      },
      1000,
      true
    ),
    /**
     * 是否可拖拽
     */
    draggableChange: _.throttle(function (row) {
      if (row.isDraggable === '1') {
        row.isDraggable = '0'
      } else {
        row.isDraggable = '1'
      }
      const params = {
        comId: row.comId,
        isDraggable: row.isDraggable,
        isResizable: row.isResizable,
        isDelete: row.isDelete
      }
      this.basicInfoState(params)
    }, 1000, true
    ),
    /**
     * 是否可调整大小
     */
    resizableChange: _.throttle(function (row) {
      if (row.isResizable === '1') {
        row.isResizable = '0'
      } else {
        row.isResizable = '1'
      }
      const params = {
        comId: row.comId,
        isDraggable: row.isDraggable,
        isResizable: row.isResizable,
        isDelete: row.isDelete
      }
      this.basicInfoState(params)
    }, 1000, true
    ),
    basicInfoState (data) {
      api
        .basicInfoState(data)
        .then(({ res }) => {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.getList(this.queryParams)
        })
        .catch(() => {
          this.editVisible = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.componentsAdmin {
  height: 100%;
  overflow: hidden;

  ::v-deep .el-table__body-wrapper {
    max-height: calc(100vh - 307px);
    overflow-y: auto;
  }
}
</style>
