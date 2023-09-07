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
        columns: [
          { key: 'cityCode', title: '业务品种' },
          { key: 'bondBal', title: '事项标题' },
          { key: 'actCtlName', title: '交互环节' },
          { key: 'compType', title: '截至日期' },
          { key: 'prvnCode', title: '发起人' }
          // { key: 'caozuo', title: '操作', editStyle: 'editBtn', editBtn: [{ title: '查看', key: 'detail', size: 'small', kType: 'main' }, { title: '删除', key: 'delete', size: 'small', kType: 'danger' }] }
        ],
        tableData: [
          {
            batId: 1,
            bondBal: '天津铁路建设投资控股(集团)有限公司',
            ctlLvl: '天津铁路建设投资控股(集团)有限公司',
            cityCode: '理财',
            funcAreaName: '天津铁路建设投资控股(集团)有限公司',
            platImpt: '天津铁路建设投资控股(集团)有限公司',
            actCtlName: '天津铁路建设投资控股(集团)有限公司',
            creTime: '2022-11-11 10:45:29',
            regionRating: '天津铁路建设投资控股(集团)有限公司',
            totAsset: '天津铁路建设投资控股(集团)有限公司',
            compType: '天津铁路建设投资控股(集团)有限公司',
            prvnCode: '天津铁路建设投资控股(集团)有限公司'
          },
          {
            batId: 1,
            bondBal: '天津铁路建设投资控股(集团)有限公司',
            ctlLvl: '天津铁路建设投资控股(集团)有限公司',
            cityCode: '理财',
            funcAreaName: '天津铁路建设投资控股(集团)有限公司',
            platImpt: '天津铁路建设投资控股(集团)有限公司',
            actCtlName: '现代投资股份有限公司',
            creTime: '2022-11-11 10:45:29',
            regionRating: '天津铁路建设投资控股(集团)有限公司',
            totAsset: '天津铁路建设投资控股(集团)有限公司',
            compType: '天津铁路建设投资控股(集团)有限公司'
          }
        ]
      }
    },
    mounted () {
      // 页面初始化加载
      this.initData()
    },
    methods: {
      /**
       *获取资金划入
       */
      handleClick () {
        // 获取资金划入/划出数据
        this.getCapitalData()
      },
      /**
       * @title 初始化数据请求
       *
       **/
      initData () {
      },
      /**
       * 页面跳转
       */
      linkFun (row) {
        this.$router.push({
          path: '/investmentAnalysis/ACSetInvestment/index', // 投后账套
          query: {
            KeyCode: encodeURIComponent(
              encodeURIComponent(row.fund ? row.fund : row.code)
            ), // code
            KeyName: encodeURIComponent(
              encodeURIComponent(row.fundName ? row.fundName : row.name)
            ) // name
          }
        })
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
  