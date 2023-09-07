<!--
 * @Description: 账套资金划转
 * @Version: 1.0
 * @Author: wuxr
 * @Date: 2022-06-10 18:59:06
 * @LastEditTime: 2023-08-21 15:11:06
 * @LastEditors: Please set LastEditors
 * @FilePath: \k-cbm\packages\components\b-workbench\src\components\viewComponents\test2\View.vue
-->

<template>
  <b-card
    theme="routine"
    class="accountFundsTransfer"
  >
    <template slot="header">
      <span>
        {{ viewData.attribute.config.comName || viewData.attribute.comName }}
      </span>
      <k-button k-type="text">
        更多
      </k-button>
    </template>
    <div style="width: 100%; height: 100%">
      <div class="fundcontent">
        <k-table-com
          ref="my-table-com"
          :open-page="true"
          :query-value="queryValue"
          :data="tableData"
          :columns="columns"
          highlight-current-row
          style="width: 100%"
          @edit-btn="editBtn"
        />
        <k-pager
          :current-page.sync="page.currentPage"
          :page-size.sync="page.pageSize"
          :total="page.totalResult"
          :layouts="['Sizes', 'PrevPage', 'Number', 'NextPage', 'FullJump']"
          @page-change="pageChange"
        />
      </div>
    </div>
  </b-card>
</template>
  <script>
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
      }
    },
    data () {
      return {
          queryValue: {
          pageNum: 1, // 页数
          pageSize: 10, // 条数
          total: 100 // 总数
        },
        // columns: [
        //   { key: 'cityCode', title: '业务3品种' },
        //   { key: 'bondBal', title: '事项标题' },
        //   { key: 'actCtlName', title: '交互环节' },
        //   { key: 'compType', title: '截至日期' },
        //   { key: 'prvnCode', title: '发起人' }
        //   // { key: 'caozuo', title: '操作', editStyle: 'editBtn', editBtn: [{ title: '查看', key: 'detail', size: 'small', kType: 'main' }, { title: '删除', key: 'delete', size: 'small', kType: 'danger' }] }
        // ],
        columns: [
          { key: 'name', title: '产品名称' },
          { key: 'bondBal', title: '产品策略' },
          { key: 'actCtlName', title: '投资主体' },
          { key: 'compType', title: '已实现费后年化收益(%)' },
          { key: 'compType', title: '业绩比较基准(%)' },
          { key: 'compType', title: '决策持有到期日' },
          { key: 'compType', title: '管理机构名称' }
          // { key: 'caozuo', title: '操作', editStyle: 'editBtn', editBtn: [{ title: '查看', key: 'detail', size: 'small', kType: 'main' }, { title: '删除', key: 'delete', size: 'small', kType: 'danger' }] }
        ],
        page: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 11
            },

        tableData: [],
        tableDataAll:[
          {
            batId: 1,
            name: '利多多鑫盈利封闭式定制24期',
            bondBal: '信用债策略(集团)有限公司',
            actCtlName: '有限公司',
            compType: 'xxxxx',
          },
          {
            batId: 1,
            name: '利多多鑫盈利封闭式定制24期',
            bondBal: '信用债策略(集团)有限公司',
            actCtlName: '有限公司',
            compType: 'xxxxx',
          },
          {
            batId: 1,
            name: '利多多鑫盈利封闭式定制24期',
            bondBal: '信用债策略(集团)有限公司',
            actCtlName: '有限公司',
            compType: 'xxxxx',
          },
          {
            batId: 1,
            name: '利多多鑫盈利封闭式定制24期',
            bondBal: '信用债策略(集团)有限公司',
            actCtlName: '有限公司',
            compType: 'xxxxx',
          },
          {
            batId: 1,
            name: '利多多鑫盈利封闭式定制24期',
            bondBal: '信用债策略(集团)有限公司',
            actCtlName: '有限公司',
            compType: 'xxxxx',
          },
          {
            batId: 1,
            name: '利多多鑫盈利封闭式定制24期',
            bondBal: '信用债策略(集团)有限公司',
            actCtlName: '有限公司',
            compType: 'xxxxx',
          },
          {
            batId: 1,
            name: '利多多鑫盈利封闭式定制24期',
            bondBal: '信用债策略(集团)有限公司',
            actCtlName: '有限公司',
            compType: 'xxxxx',
          },
          {
            batId: 1,
            name: '利多多鑫盈利封闭式定制24期',
            bondBal: '信用债策略(集团)有限公司',
            actCtlName: '有限公司',
            compType: 'xxxxx',
          },
          {
            batId: 1,
            name: '利多多鑫盈利封闭式定制24期',
            bondBal: '信用债策略(集团)有限公司',
            actCtlName: '有限公司',
            compType: 'xxxxx',
          },
          {
            batId: 1,
            name: '利多多鑫盈利封闭式定制24期',
            bondBal: '信用债策略(集团)有限公司',
            actCtlName: '有限公司',
            compType: 'xxxxx',
          },
          {
            batId: 1,
            name: '利多多鑫盈利封闭式定制24期',
            bondBal: '信用债策略(集团)有限公司',
            actCtlName: '有限公司',
            compType: 'xxxxx',
          },
  
        ]
      }
    },
    created () {
        const { currentPage, pageSize } = this.page
        this.tableData = this.tableDataAll.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    },
    mounted () {
      // 页面初始化加载
      this.initData()
    },
    methods: {
      /**
       * @title 初始化数据请求
       *
       **/
      initData () {
      },
      /**
       * 页面跳转
       */
        pageChange ({ currentPage, pageSize }) {
            this.page.currentPage = currentPage
            this.page.pageSize = pageSize
            this.tableData = this.tableDataAll.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        }
    }
  }
  </script>
  <style lang="scss" scoped>
  //局部样式控制(防止全局改变)
  .accountFundsTransfer {
    width: 100%;
    height: 100%;
  
    //基金划入划出表头
    .fundcontent {
      height: 100%;
      overflow: auto;
    }
    ::v-deep .el-table td {
      padding: 0 !important;
    }
    ::v-deep .k-table-com-edit-page{
      display: none;
    }
  }
  </style>
  