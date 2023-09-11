<!--
 * @Description: 账套资金划转
 * @Version: 1.0
 * @Author: wuxr
 * @Date: 2022-06-10 18:59:06
 * @LastEditTime: 2023-09-11 18:37:45
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue2-storybook-module-pro\src\workbench\components\viewComponents\operation\View.vue
-->

<template>
  <div
    theme="routine"
    class="accountFundsTransfer"
  >
    <template slot="header">
      <span>
        {{ viewData.attribute.config.comName || viewData.attribute.comName }}
      </span>
    </template>
    <div style="width: 100%; height: 100%">
      <!-- <div class="fundcontent"> -->
      <div 
        style="width: 100%; height: 100%; " 
        class="co-middle">
        <div 
          v-for="i in buttonArr" 
          :key="i.id" 
          :class="[i.id === '1' ? 'on-pick' : '','img-btn']"
          @click="onPick(i.id)"
        >
          <div style="text-align:center;">
            <i 
              class="el-icon-tickets icon" 
            />
            <br/>
        
            <span>{{ i.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
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
       
        onpick: '1',
        buttonArr: [
        { name: '发起主动征询', id: '1'},
          { name: '查看机构推荐', id: '2'},
          { name: 'XXXXXXXXXXX', id: '3'},
          { name: 'XXXXXXXXXXX', id: '4'},
          { name: 'XXXXXXXXXXX', id: '5'},
          { name: 'XXXXXXXXXXX', id: '6'}
      ],
      }
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
      onPick(index) {
        console.log(this.onpick , index)
        this.onpick = index
      }
    }
  }
  </script>
  <style lang="scss" scoped>
  //局部样式控制(防止全局改变)
  .accountFundsTransfer {
    width: 100%;
    height: 100%;
    background-color: #ecf3fc;


    .co-middle {
         display: flex;
         flex-wrap: wrap;
         clear: both;
         height: 100%;
         /* margin: 25px; */
         ;
}
        .img-btn {
          /* margin-bottom: 20px; */
          border-radius: 8px;
          width: 33.33%;
          height: 50%;
          // background-color: blueviolet;
          display: flex; 
          justify-content: center; 
          align-items: center;
}

    .icon {
      font-size: 40px; 
      padding:20px 0; 
      color: #8ab5ef;
    }
    .on-pick{
      background-color: #ecf3fc;
    }
    ::v-deep .el-table td {
      padding: 0 !important;
    }
    ::v-deep .k-table-com-edit-page{
      display: none;
    }
  }
  </style>
  