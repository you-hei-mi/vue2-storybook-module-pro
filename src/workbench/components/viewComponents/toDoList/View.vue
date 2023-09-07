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
      <div>
        <k-button k-type="text">
          更多待办
        </k-button>
        <k-button k-type="text">
          更多订阅
        </k-button>
      </div>
    </template>
    <div style="width: 100%; height: 100%">
      <div class="fundcontent">
        <k-tag 
          k-type="warning" 
          class="tag"
        >
          待办事项 (3)
        </k-tag>
        <k-timeline>
          <k-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
          >
            <div style="display: inline-block; "> 
              <span style="font-weight: 600; ">{{ activity.label }}</span>
              <span
                class="operation"
              >
                办理
              </span>
            </div>
           
            <k-card :show-header="false">
              <p>{{ activity.content }}</p>
              <p>{{ activity.timestamp }}</p>
            </k-card>
          </k-timeline-item>
        </k-timeline>
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
        activities: [{
                label: '机构推荐',
                content: '兴银理财推荐:信用债策略66个月产信用债策略66个月产信用债策略...',
                timestamp: '2018-04-12 20:46',
            }, {
                label: 'xxxxxx',
                content: '这是待办事项名称',
                timestamp: '2018-04-03 20:46',
                color: '#0bbd87'
            }, {
                label: 'xxxxxx',
                content: '这是待办事项名称',
                timestamp: '2018-04-03 20:46',
            }, {
                label: 'xxxxxx',
                content: '这是待办事项名称',
                timestamp: '2018-04-03 20:46',
            },
            {
                label: 'xxxxxx',
                content: '这是待办事项名称',
                timestamp: '2018-04-03 20:46',
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
  
    }
  }
  </script>
  <style lang="scss" scoped >
  .accountFundsTransfer {
    width: 100%;
    height: 100%;

    .tag {
      margin-bottom: 8px;
    }
    .operation {
      position: absolute; 
      right: 16px; 
      color: #409eff;
    }
  
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
  