
<!--
 * @Description: 工作台编辑页面
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2022-04-21 15:30:24
 * @LastEditTime: 2023-08-19 14:23:46
 * @LastEditors: Please set LastEditors
 * @FilePath: \k-cbm\packages\components\b-workbench\src\components\views\layoutAdmin\edit.vue
-->

<template>
  <div
    v-loading="loading"
    class="k_workshop"
    :class="'k_workshop__zoom_'+zoom"
  >
    <!-- 头部 -->
    <EditorHeader
      ref="EditorHeader"
      :template-id="(pathType === 'edit' ? templateId : '')"
      default-active="4"
      :options="selectOptions"
      @operation="operationFn"
      @selectChange="selectChange"
    />

    <!-- 中间区域 -->
    <div class="k_workshop_content_box">
      <div
        id="content"
        v-loading="loading"
        class="content_box"
      >
        <template v-if="layout.length > 0">
          <div class="content_box_bg" />
          <grid-layout
            ref="gridlayout"
            class="row_view_grid_layout"
            :layout.sync="layout"
            :col-num="panelConfig.gridLayoutConfig.colNum"
            :max-rows="panelConfig.gridLayoutConfig.maxRows"
            :row-height="rowHeight"
            :is-draggable="panelConfig.gridLayoutConfig.isDraggable"
            :is-resizable="panelConfig.gridLayoutConfig.isResizable"
            :vertical-compact="panelConfig.gridLayoutConfig.verticalCompact"
            :margin="panelConfig.gridLayoutConfig.margin"
            :use-css-transforms="panelConfig.gridLayoutConfig.useCssTransforms"
            :responsive="false"
            @layout-updated="layoutUpdatedEvent"
          >
            <grid-item
              v-for="(item, i) in layout"
              :key="item.i"
              :i="item.i"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :min-w="item.minW"
              :min-h="item.minH"
              :max-w="item.maxW"
              :max-h="item.maxH"
              :is-draggable="item.isDraggable"
              :is-resizable="item.isResizable"
              :static="item.static"
              :style="{ 'z-index': (item.itmeData && item.itmeData.componentPack && item.itmeData.componentPack.propsSchema.zIndex) ? item.itmeData.componentPack.propsSchema.zIndex : ((panelConfig && panelConfig.gridLayoutConfig && panelConfig.gridLayoutConfig.zIndexType === 'superposition') ? i : 0) }"
              :class="{ 'grid-item-active': activeIndex === i }"
            >
              <template v-if="item.itmeData">
                <ViewGridLayout
                  :id="'layout-' + item.i"
                  :is-delete="item.isDelete"
                  :view-data="item.itmeData"
                  :type="item.i"
                  :view-id="item.i"
                  class="ViewGridLayout"
                  :class="{ active: activeIndex === i }"
                  @onActive="onActive(item, i)"
                  @removeItem="removeItem(item, i)"
                  @editItem="editItem(item, i)"
                />
              </template>
            </grid-item>
          </grid-layout>
        </template>
        <template v-else>
          <div
            v-if="!loading"
            class="k_workshop_empty k_workshop_empty"
          >
            <el-empty description="当前无组件，请点击新增组件进行添加">
              <div slot="image">
                <svg
                  width="231px"
                  height="167px"
                  viewBox="0 0 231 167"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                    <filter
                      id="filter-1"
                      color-interpolation-filters="auto"
                    >
                      <feColorMatrix
                        in="SourceGraphic"
                        type="matrix"
                        values="0 0 0 0 0.650980 0 0 0 0 0.650980 0 0 0 0 0.650980 0 0 0 1.000000 0"
                      />
                    </filter>
                  </defs>
                  <g
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g transform="translate(-605.000000, -253.000000)">
                      <g
                        transform="translate(601.000000, 253.000000)"
                        filter="url(#filter-1)"
                      >
                        <g transform="translate(4.000000, 0.000000)">
                          <path
                            d="M22.2298718,114.006187 L25.6670732,114.006187 C26.5935159,114.024719 27.3348117,114.781143 27.3346264,115.707771 C27.3346264,116.647046 26.6029449,117.409356 25.6670732,117.409356 L22.2298718,117.409356 L22.2298718,120.846558 C22.2113393,121.773 21.454915,122.514333 20.5282869,122.514111 C20.0806986,122.521393 19.6488321,122.349143 19.3291165,122.035822 C19.0094009,121.722501 18.8284625,121.294202 18.826702,120.846558 L18.826702,117.409356 L15.3895005,117.409356 C14.4630578,117.390824 13.721762,116.634399 13.7219473,115.707771 C13.7219473,114.768497 14.4536288,114.006187 15.3895005,114.006187 L18.826702,114.006187 L18.826702,110.568985 C18.8452346,109.642542 19.6016589,108.901246 20.5282869,108.901432 C21.4675618,108.901432 22.2298718,109.633113 22.2298718,110.568985 L22.2298718,114.006187 L22.2298718,114.006187 Z M227.500057,105.000095 L227.500057,102.643467 C227.49885,102.336551 227.374794,102.042899 227.15559,101.828078 C226.936385,101.613258 226.640287,101.495159 226.333409,101.500152 C225.698091,101.5 225.179468,102.008275 225.166762,102.643467 L225.166762,105.000095 L222.810133,105.000095 C222.503218,105.001302 222.209566,105.125358 221.994745,105.344563 C221.779925,105.563767 221.661826,105.859865 221.666819,106.166743 C221.666819,106.792066 222.180144,107.33339 222.810133,107.33339 L225.166762,107.33339 L225.166762,109.690019 C225.166762,110.331675 225.68942,110.833333 226.333409,110.833333 C226.968728,110.83346 227.487351,110.32521 227.500057,109.690019 L227.500057,107.33339 L229.856685,107.33339 C230.498342,107.33339 231,106.810732 231,106.166743 C231.000127,105.531424 230.491877,105.012801 229.856685,105.000095 L227.500057,105.000095 Z M123.208724,156.545808 L37.5339261,156.545808 C36.6320065,156.546721 35.7669138,156.18814 35.1301188,155.549429 C34.4933239,154.910717 34.1373431,154.044551 34.1409384,153.142639 C34.1409384,151.264089 35.6826018,149.739469 37.5339261,149.739469 L52.9673008,149.739469 C51.7761722,147.675401 51.1515959,145.33324 51.1568146,142.950145 L51.1568146,44.2241908 C51.1586157,40.6136399 52.5957959,37.1519332 55.1517122,34.601762 C57.7076285,32.0515907 61.1725605,30.6222041 64.7831063,30.6285277 L74.9790027,30.6285277 L74.9790027,27.2083421 C74.9808039,23.5977912 76.417984,20.1360845 78.9739003,17.5859133 C81.5298166,15.0357421 84.9947486,13.6063554 88.6052944,13.6126445 L170.254143,13.6126445 C173.865241,13.6045439 177.331225,15.0333478 179.887534,17.5839115 C182.443844,20.1344752 183.880444,23.5972351 183.880435,27.2083421 L183.880435,125.934296 C183.880435,128.408401 183.22022,130.725959 182.066545,132.72362 L200.89288,132.72362 C202.774833,132.72362 204.299453,134.234627 204.299453,136.12679 C204.299453,138.00534 202.785043,139.52996 200.896283,139.52996 L160.058246,139.52996 L160.058246,142.950145 C160.058246,145.42425 159.398031,147.741808 158.244357,149.739469 L160.068456,149.739469 C161.940199,149.739469 163.461416,151.250476 163.461416,153.142639 C163.461416,155.021188 161.91978,156.545808 160.068456,156.545808 L142.16438,156.545808 C143.719629,159.152636 143.382715,162.569419 141.119607,164.832527 C139.845454,166.112702 138.113713,166.832405 136.307525,166.832405 C134.501337,166.832405 132.769596,166.112702 131.495443,164.832527 L123.208724,156.545808 Z M135.650713,149.739469 L146.472793,149.739469 C150.21628,149.739469 153.251907,146.710648 153.251907,142.916114 L153.251907,44.0642419 C153.251907,40.3888186 150.311568,37.4348671 146.683789,37.4348671 L64.5312717,37.4348671 C60.9034927,37.4348671 57.9631541,40.4024312 57.9631541,44.0642419 L57.9631541,142.916114 C57.9631541,146.683422 61.0260068,149.739469 64.7388651,149.739469 L116.398982,149.739469 L114.649752,147.986836 C112.923505,146.269704 112.248357,143.75997 112.880104,141.408509 L109.667512,138.192514 C99.6579382,145.643599 85.5952635,144.110737 77.4260502,134.678123 C69.2568368,125.24551 69.7480838,111.108071 78.552331,102.265251 C87.3833101,93.4027249 101.565385,92.8817482 111.022812,101.072452 C120.48024,109.263155 121.990052,123.374255 114.479594,133.380432 L117.695589,136.596427 C120.04644,135.961617 122.557182,136.635738 124.273917,138.362672 L135.650713,149.739469 L135.650713,149.739469 Z M160.058246,132.72362 L170.298384,132.72362 C174.044677,132.704898 177.07227,129.66362 177.074095,125.917281 L177.074095,27.2253579 C177.074095,23.4546459 174.038468,20.4190185 170.298384,20.4190185 L88.5576501,20.4190185 C84.8126877,20.4396054 81.7871574,23.4803394 81.7853423,27.2253579 L81.7853423,30.6285277 L146.431955,30.6285277 C150.043053,30.6203925 153.509037,32.0491965 156.065346,34.5997602 C158.621656,37.1503239 160.058256,40.6130838 160.058246,44.2241908 L160.058246,132.72362 L160.058246,132.72362 Z M35.5833334,5.24999997 L39.06,5.24999997 C40.04,5.24999997 40.8333333,6.02699996 40.8333333,7 C40.8333333,7.96600003 40.04,8.75000003 39.06,8.75000003 L35.5833334,8.75000003 L35.5833334,12.2266666 C35.5833334,13.2066667 34.8063334,14 33.8333333,14 C33.3661071,13.996916 32.9192434,13.8083482 32.5910525,13.4757814 C32.2628617,13.1432147 32.0802288,12.6938928 32.0833333,12.2266666 L32.0833333,8.75000003 L28.6066667,8.75000003 C28.1390687,8.7543507 27.6890264,8.57212206 27.3561879,8.24366298 C27.0233493,7.9152039 26.8351761,7.46761465 26.8333333,7 C26.8333333,6.03399997 27.6266666,5.24999997 28.6066667,5.24999997 L32.0833333,5.24999997 L32.0833333,1.77333336 C32.0833333,0.793333306 32.8603333,0 33.8333333,0 C34.7993334,0 35.5833334,0.793333306 35.5833334,1.77333336 L35.5833334,5.24999997 Z M0.109241067,153.142639 C0.109241067,151.264089 1.65090441,149.739469 3.50222856,149.739469 L23.9416661,149.739469 C25.8134094,149.739469 27.3346264,151.250476 27.3346264,153.142639 C27.3346264,155.021188 25.7929904,156.54581 23.9416661,156.54581 L3.50222856,156.54581 C2.600309,156.546721 1.7352164,156.18814 1.09842144,155.549428 C0.461626482,154.910717 0.105645783,154.044551 0.109241067,153.142639 L0.109241067,153.142639 Z M107.431629,131.144549 C111.730824,126.845355 113.40985,120.579143 111.836236,114.706335 C110.262622,108.833526 105.675436,104.246341 99.8026277,102.672726 C93.9298192,101.099112 87.6636072,102.778139 83.3644131,107.077333 C76.718435,113.723311 76.7184351,124.498571 83.3644133,131.144549 C90.0103915,137.790527 100.785651,137.790527 107.431629,131.144549 L107.431629,131.144549 Z M71.5758177,51.0475462 C71.5758177,49.1693557 73.09741,47.6462546 74.9755996,47.6443764 L112.41387,47.6443764 C114.293389,47.6443764 115.81704,49.1680274 115.81704,51.0475462 C115.81704,52.927065 114.293389,54.4507314 112.41387,54.4507314 L74.9790027,54.4507314 C74.0755942,54.4534384 73.2084019,54.0957655 72.5695927,53.4569563 C71.9307835,52.818147 71.5731106,51.9509548 71.5758177,51.0475462 Z M71.5757714,68.0633949 C71.5757714,66.1848451 73.0902436,64.6602252 74.9551806,64.6602252 L129.453541,64.6602252 C131.318478,64.6602252 132.832889,66.1712326 132.832889,68.0633949 C132.832889,69.9419446 131.318478,71.4665647 129.453541,71.4665647 L74.9551806,71.4665647 C74.0550602,71.4656755 73.1924118,71.1060786 72.5581697,70.4673655 C71.9239276,69.8286524 71.5703993,68.9634993 71.5757714,68.0633949 L71.5757714,68.0633949 Z M71.5758057,85.0792437 C71.5758057,83.2006939 73.0936467,81.6760739 74.9721965,81.6760739 L98.8079974,81.6760739 C100.683144,81.6760739 102.204361,83.1870813 102.204361,85.0792437 C102.204361,86.9577935 100.686547,88.4824202 98.8079974,88.4824202 L74.9721965,88.4824202 C74.0696876,88.4842329 73.2037184,88.1260515 72.5661861,87.4872416 C71.9286537,86.8484317 71.5722067,85.9817471 71.5758057,85.0792437 Z M5.76432807,60.9371806 C3.70493202,60.9371806 1.80197157,59.838506 0.772273531,58.0550167 C-0.25742451,56.2715275 -0.25742451,54.074178 0.772273531,52.2906887 C1.80197157,50.5071995 3.70493202,49.4085248 5.76432807,49.4085248 C8.94787839,49.4085248 11.5286558,51.9893024 11.5286558,55.1728527 C11.5286558,58.3564031 8.94787839,60.9371806 5.76432807,60.9371806 L5.76432807,60.9371806 Z M5.76364137,59.015738 C7.13673553,59.0159832 8.40563183,58.2835871 9.09224973,57.0944936 C9.77886764,55.9054 9.77886764,54.4403055 9.09224973,53.2512119 C8.40563183,52.0621184 7.13673553,51.3297222 5.76364137,51.3299675 C3.64154258,51.3303466 1.92144263,53.0507539 1.92144263,55.1728527 C1.92144263,57.2949516 3.64154258,59.0153588 5.76364137,59.015738 L5.76364137,59.015738 Z M214.927083,38.7033445 C210.833947,38.7033445 207.515804,35.3852019 207.515804,31.2920657 C207.515804,27.1989295 210.833947,23.880787 214.927083,23.880787 C219.020219,23.880787 222.338362,27.1989295 222.338362,31.2920657 C222.338362,35.3852019 219.020219,38.7033445 214.927083,38.7033445 L214.927083,38.7033445 Z M214.9262,36.2329182 C216.691607,36.2332335 218.323045,35.2915814 219.20584,33.7627468 C220.088634,32.2339122 220.088634,30.3502193 219.20584,28.8213847 C218.323045,27.2925501 216.691607,26.3508979 214.9262,26.3512132 C212.197788,26.3517008 209.986231,28.563653 209.986231,31.2920657 C209.986231,34.0204785 212.197788,36.2324307 214.9262,36.2329182 L214.9262,36.2329182 Z"
                            fill="#8A96A3"
                            fill-rule="nonzero"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </el-empty>
            <el-button
              size="mini"
              type="primary"
              @click="operationFn('addCard')"
            >
              新增组件
            </el-button>
          </div>
        </template>
      </div>
    </div>

    <!-- 选择卡片 -->
    <SelectCard
      key="SelectCard"
      :loading="componentListLoading"
      :visible.sync="showSelectCard"
      :type-list="typeList"
      :card-data="componentList"
      @submit="(data) => { return operationFn('selectCard', data) }"
    />

    <!-- 设置卡片属性 -->
    <SetCard
      v-if="showSetCard"
      key="SetCard"
      :com-id="comId"
      :attribute="cardAttribute"
      :visible.sync="showSetCard"
      @submit="(data) => { return operationFn('setCard', data) }"
      @cancel="operationFn('cancelEditCard')"
    />

    <!-- 新增模板 -->
    <RenameDialog
      key="RenameDialog"
      title="新增模板"
      :visible.sync="addTempVisible"
      :rename-from="addTempFrom"
      :btn-loading="addTempLoading"
      @submit="addTempSubmit"
    />
  </div>
</template>

<script>
import EditorHeader from '../../components/EditorHeader.vue' // 头部导航
import ViewGridLayout from '../../components/NestedEditor/ViewGridLayout' // 操作区拖拽组件
import SelectCard from '../../components/SelectCard' // 选择卡片
import SetCard from '../../components/SetCard' // 设置卡片属性
import RenameDialog from '../components/RenameDialog' // 设置卡片属性
import { panelConfig, componentData, URLConfig } from '../../config/tools' // 模型默认配置文件
import { getUUID, detectZoom } from '../../common/js/utils' // 模型默认配置文件
import { GridLayout, GridItem } from 'vue-grid-layout'
import * as api from '@/api/workbench/index' // 接口

export default {
  name: 'LayoutAdminEdit',
  components: {
    EditorHeader,
    ViewGridLayout,
    SelectCard,
    SetCard,
    RenameDialog,
    GridLayout,
    GridItem
  },
  data () {
    return {
      // 屏幕缩放比例  处理笔记本系统默认系统比例为125%,150%,175%带来的布局影响
      zoom: detectZoom(),
      // ------------ 页面状态相关代码开始 ------------
      // 页面类型  add:新增  edit:编辑
      pathType: 'edit',
      // 页面模板id  用于判断是否是从模板管理页面进来的
      pathKey: undefined,
      // 模板id
      templateId: '',
      // 模板名称
      tempName: '',
      // 加载动画
      loading: true,
      // ------------ 页面状态相关代码结束 ------------
      // ------------ 新增模板相关代码开始 ------------
      // 是否显示新增模板弹窗
      addTempVisible: false,
      // 新增模板加载动画
      addTempLoading: false,
      // 新增模板表单数据
      addTempFrom: {
        moduleName: ''
      },
      // ------------ 新增模板相关代码结束 ------------
      // 是否显示选择卡片弹窗
      showSelectCard: false,
      // 是否显示设置卡片属性弹窗
      showSetCard: false,
      // ------------ 组件添加/编辑相关代码开始 ------------
      mouseXY: { x: null, y: null },
      // 模型数据
      layout: [],
      // 组件id
      comId: '',
      // 分组列表
      typeList: [],
      // 组件列表
      componentList: [],
      // 组件列表加载动画
      componentListLoading: true,
      // ------------ 组件添加/编辑相关代码结束 ------------

      // ------------ 配置文件相关开始 ------------
      // 画布配置
      panelConfig: panelConfig,

      // 被编辑组件属性
      cardAttribute: {},
      // ------------ 配置文件相关结束 ------------
      // ------------ 属性配置开始 ------------
      // 组件属性
      curEditorItem: {},
      // 当前选中下标
      activeIndex: 'null',
      rowHeight: 36,
      // ------------ 属性配置结束 ------------
      // 下拉框数据
      selectOptions: [],
      // 模板列表
      resList: [],
      // 模板数据
      templateObj: {}
    }
  },
  mounted () {
    // 监听窗口变化
    const tempRowHeight = this.panelConfig.gridLayoutConfig.rowHeight
    // console.log('监听窗口变化12222222')
    // console.log(tempRowHeight)
    if (typeof tempRowHeight === 'string' && tempRowHeight.indexOf('vh') !== -1) {
      // console.log('监听窗口变化1111111111111')
      this.resize()
      window.onresize = () => {
        return (() => {
          this.resize()
        })()
      }
    } else {
      this.rowHeight = Number(this.panelConfig.gridLayoutConfig.rowHeight)
      // console.log(this.rowHeight)
    }

    // 从 header 编辑进入时
    const { pathKey = '', pathCopyKey = '', type = '' } = this.$route.query
    if (!type && (!pathKey || !pathCopyKey)) {
      // 获取当前工作台走马灯的index
      const workbenchCarouselIndex = sessionStorage.getItem('workbenchCarouselIndex') ? JSON.parse(sessionStorage.getItem('workbenchCarouselIndex')) : {}
      this.templateId = workbenchCarouselIndex.tempId || ''
      this.templateObj = workbenchCarouselIndex.tempObj || {}
    }
    // 页面初始化
    this.initData()
  },
  methods: {
    // 页面初始化
    initData () {

      const urlQuery = this.$route.query

      if (urlQuery.pathKey) {
        this.pathKey = urlQuery.pathKey
      }
      if (urlQuery.pathCopyKey) {
        this.loading = false
        this.pathCopyKey = urlQuery.pathCopyKey
      }
      if (urlQuery.type) {
        this.pathType = urlQuery.type
        if (this.pathType !== 'add') {
          if (this.pathType === 'copy' && (!this.pathCopyKey || this.pathCopyKey === undefined)) {
            this.loading = false
            // 复制异常
            this.$alert('参数异常，请返回重新操作', '复制失败', {
              confirmButtonText: '返回',
              showClose: false,
              type: 'warning'
            }).then(() => {
              // 返回到模板管理页面
              this.$router.push(URLConfig.template)
            }).catch(() => {
            })
          } else if (this.pathType !== 'copy' && (!this.pathKey || this.pathKey === undefined)) {
            this.loading = false
            // 编辑异常
            this.$alert('参数异常，请返回重新操作', '编辑失败', {
              confirmButtonText: '返回',
              showClose: false,
              type: 'warning'
            }).then(() => {
              // 返回到模板管理页面
              this.$router.push(URLConfig.template)
            }).catch(() => {
            })
          }
        } else {
          this.loading = false
        }
      }

      document.addEventListener(
        'dragover',
        function (e) {
            this.mouseXY.x = e.clientX
            this.mouseXY.y = e.clientY
        },
        false
      )

      // 获取模板数据
      this.getLayoutData()
      // 获取组件数据
      this.getComponentList()
    },
    // 获取模板数据
    getLayoutData () {
      if (this.pathType !== 'add') {
        this.loading = true
        this.layout = []
        api.basicInfoListAll(this.pathKey || this.pathCopyKey).then(({ data }) => {
          this.loading = false
          let res = data
          if (!Array.isArray(res) && typeof res === 'object') {
            res = [res]
          }
          // const res = [data, data]
          this.resList = res

          if (res.length > 1) {
            this.selectOptions = res.map(item => {
              return {
                value: item.tempId,
                name: item.tempName || `自定义模板-${item.tempId}`,
                sortNum: item.sortNum,
                isDefTemp: item.isDefTemp,
                fromTempId: item.fromTempId
              }
            }).sort((a, b) => {
              return a.sortNum - b.sortNum
            })
          }
          this.templateChange(this.templateId)
          // const layoutArr = []
          // res.componentList.forEach((itemDrag) => {
          //   // 更具组件code 获取组件实例
          //   itemDrag.componentPack = componentData[itemDrag.attribute.comCode]

          //   const isDraggable = !((itemDrag.layout.isDraggable !== null && itemDrag.layout.isDraggable !== undefined && itemDrag.layout.isDraggable !== '1'))
          //   const isResizable = !((itemDrag.layout.isResizable !== null && itemDrag.layout.isResizable !== undefined && itemDrag.layout.isResizable !== '1'))

          //   layoutArr.push({
          //     comCode: itemDrag.comCode,
          //     // 组件属性
          //     attribute: itemDrag.attribute,
          //     // 实例信息
          //     itmeData: itemDrag,
          //     i: getUUID(),
          //     x: itemDrag.layout.layoutX,
          //     y: itemDrag.layout.layoutY,
          //     w: itemDrag.layout.layoutW,
          //     h: itemDrag.layout.layoutH,
          //     minW: itemDrag.layout.minW,
          //     minH: itemDrag.layout.minH,
          //     maxW: itemDrag.layout.maxW,
          //     maxH: itemDrag.layout.maxH,
          //     // 标识栅格元素是否可拖拽。如果值为null则取决于父容器。
          //     isDraggable: isDraggable,
          //     // 标识栅格元素是否可调整大小。如果值为null则取决于父容器。
          //     isResizable: isResizable,
          //     // 标识栅格元素是否为静态的（无法拖拽、调整大小或被其他元素移动），如果该标记为true, 必须要求有x 和 y 轴
          //     static: (isDraggable === false && isResizable === false),
          //     // 是否可移除
          //     isDelete: itemDrag.layout.isDelete === '1'
          //   })
          // })
          // this.templateId = res.tempId

          // this.layout = layoutArr
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.loading = false
      }
    },
    /**
     * 下拉框切换
     */
    selectChange (id) {
      this.templateId = id
      this.templateObj = this.selectOptions.find(item => item.value === id)
      this.templateChange(id)
    },
    /**
     * 模板切换
     */
    templateChange (id) {
      const layoutArr = []
      const tempItem = this.resList.find(item => item.tempId === id || item.fromTempId === this.templateObj.fromTempId) || this.resList[0]

      this.templateId = tempItem.tempId
      this.templateObj = tempItem
      tempItem.componentList.forEach((itemDrag) => {
        // 更具组件code 获取组件实例
        itemDrag.componentPack = componentData[itemDrag.attribute.comCode]

        const isDraggable = !((itemDrag.layout.isDraggable !== null && itemDrag.layout.isDraggable !== undefined && itemDrag.layout.isDraggable !== '1'))
        const isResizable = !((itemDrag.layout.isResizable !== null && itemDrag.layout.isResizable !== undefined && itemDrag.layout.isResizable !== '1'))
        layoutArr.push({
          comCode: itemDrag.comCode,
          // 组件属性
          attribute: itemDrag.attribute,
          // 实例信息
          itmeData: itemDrag,
          i: getUUID(),
          x: itemDrag.layout.layoutX,
          y: itemDrag.layout.layoutY,
          w: itemDrag.layout.layoutW,
          h: itemDrag.layout.layoutH,
          minW: itemDrag.layout.minW,
          minH: itemDrag.layout.minH,
          maxW: itemDrag.layout.maxW,
          maxH: itemDrag.layout.maxH,
          // 标识栅格元素是否可拖拽。如果值为null则取决于父容器。
          isDraggable: isDraggable,
          // 标识栅格元素是否可调整大小。如果值为null则取决于父容器。
          isResizable: isResizable,
          // 标识栅格元素是否为静态的（无法拖拽、调整大小或被其他元素移动），如果该标记为true, 必须要求有x 和 y 轴
          static: (isDraggable === false && isResizable === false),
          // 是否可移除
          isDelete: itemDrag.layout.isDelete === '1'
        })
      })
      this.layout = layoutArr
    },
    // 获取组件数据
    getComponentList () {
      if (this.componentList.length < 1) {
        this.componentListLoading = true
        api.basicInfoList().then(({ data }) => {
            console.log('获取组件数据',data )
          this.componentListLoading = false
          // this.componentList = data.typeMap
          // data = {
          //   typeList: [{ typeId: '0', typeName: '组合' }, { typeId: '1', typeName: '基金' }, { typeId: '2', typeName: '股票' }],
          //   comList: [
          //     { comId: '1524373972561477634', comeCode: 'portfolioOverview', comName: '组件标题1', comDesc: '我是描述我是描述我是描述我是描述', comImg: 'xxx', typeId: '0' },
          //     { comId: '222', comeCode: 'positionAnalysis', comName: '组件标题2', comDesc: '我是描述我是描述我是描述我是描述', comImg: 'xxx', typeId: '1' },
          //     { comId: '333', comeCode: 'positionAnalysis', comName: '组件标题3', comDesc: '我是描述我是描述我是描述我是描述', comImg: 'xxx', typeId: '2' },
          //     { comId: '4444', comeCode: 'positionAnalysis', comName: '组件标题4', comDesc: '我是描述我是描述我是描述我是描述', comImg: 'xxx', typeId: '1' },
          //     { comId: '555', comeCode: 'positionAnalysis', comName: '组件标题5', comDesc: '我是描述我是描述我是描述我是描述', comImg: 'xxx', typeId: '1' },
          //     { comId: '6666', comeCode: 'positionAnalysis', comName: '组件标题6', comDesc: '我是描述我是描述我是描述我是描述', comImg: 'xxx', typeId: '1' },
          //     { comId: '77', comeCode: 'positionAnalysis', comName: '组件标题7', comDesc: '我是描述我是描述我是描述我是描述', comImg: 'xxx', typeId: '1' },
          //     { comId: '888', comeCode: 'positionAnalysis', comName: '组件标题8', comDesc: '我是描述我是描述我是描述我是描述', comImg: 'xxx', typeId: '1' },
          //     { comId: '1524327061895385090', comeCode: 'positionAnalysis', comName: '组件标题91111111111111', comDesc: '我是描述我是描述我是描述我是描述', comImg: 'xxx', typeId: '1' }
          //   ]
          //   // typeList: [],
          //   // comList: []
          // }
          this.typeList = data.typeList
          this.componentList = data.comList
        }).catch(() => {
          this.componentListLoading = false
        })
      }
    },
    // 布局updated事件
    layoutUpdatedEvent: function (newLayout) {
      // console.log('布局updated')
    },
    // ---------------------- 头部导航操作开始  ----------------------
    // 操作方法
    operationFn (type, data) {
      if (type === 'addCard') {
        // ------------------ 添加组件 ------------------
        // if (this.activeIndex === 1) {
        // 设置步骤
        this.activeIndex = 'null'
        // 清空属性
        this.cardAttribute = {}
        // 显示添加卡片弹窗
        this.showSelectCard = true
        // 获取组件数据
        this.getComponentList()
        // }
      } else if (type === 'selectCard') {
        // console.log('------------------ 选择组件 ------------------')
        // ------------------ 选择组件 ------------------
        // 设置步骤
        this.activeIndex = 'null'
        // 清空属性
        this.cardAttribute = {}
        // 关闭添加卡片弹窗
        this.showSelectCard = false
        // 显示设置卡片属性弹窗
        this.showSetCard = true
        // 设置卡片id
        this.comId = data
      } else if (type === 'setCard') {
        // ------------------ 设置组件 ------------------
        // 关闭设置卡片属性弹窗
        this.showSetCard = false

        this.editComplete(data)
        // this.addComponents({
        //   comCode: 'propsSchema',
        //   attribute: {
        //     comName: '组合概览',
        //     config: {}
        //   },
        //   layout: {
        //     layoutX: 0,
        //     layoutY: 0,
        //     layoutW: 1,
        //     layoutH: 5,
        //     minW: 3,
        //     minH: 3,
        //     maxW: 5,
        //     maxH: 6,
        //     isDraggable: '0',
        //     isResizable: '1'
        //   }
        // })
      } else if (type === 'cancelEditCard') {
        // ------------------ 取消编辑组件 ------------------
        this.showSetCard = false
        if (this.activeIndex === 'null') {
          // 设置步骤
          this.activeIndex = 'null'
          // 清空属性
          this.cardAttribute = {}
          // 显示添加卡片弹窗
          this.showSelectCard = true
          // 获取组件数据
          this.getComponentList()
        }
      } else if (type === 'resetCard') {
        // ------------------ 重置组件 ------------------
        // 重置组件
        this.resetComponents()
      } else if (type === 'saveCard') {
        // ------------------ 保存组件 ------------------

        if (this.pathType === 'add' || this.pathType === 'copy') {
          // 打开新增模板弹窗
          this.addTempVisible = true
        } else {
          // 保存组件
          this.saveComponents()
        }
      }
    },
    // ---------------------- 头部导航操作结束  ----------------------
    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&& 组件相关操作开始 &&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    /** 新增/修改组件 */
    editComplete (itemComData) {
      if (!itemComData && itemComData.comCode) {return}

      const itemDrag = JSON.parse(JSON.stringify(itemComData))
      itemDrag.componentPack = componentData[itemDrag.comCode]
      // console.log('添加组件')
      // console.log(itemDrag)
      // console.log(itemDrag.comCode)
      // console.log(componentData)
      const isDraggable = !((itemDrag.layout.isDraggable !== null && itemDrag.layout.isDraggable !== undefined && itemDrag.layout.isDraggable !== '1'))
      const isResizable = !((itemDrag.layout.isResizable !== null && itemDrag.layout.isResizable !== undefined && itemDrag.layout.isResizable !== '1'))

      const XYNum = Number(panelConfig.gridLayoutConfig && panelConfig.gridLayoutConfig.colNum ? panelConfig.gridLayoutConfig.colNum : 24)
      // console.log('添加组件')
      // console.log(itemDrag.layout.layoutX)
      // console.log(itemDrag.layout.layoutY)
      if (this.activeIndex === 'null') {
        // 初始化元素
        const newItem = {
          comCode: itemDrag.comCode,
          // 组件属性
          attribute: itemDrag.attribute,
          itmeData: itemDrag,
          i: getUUID(),
          x: itemDrag.layout.layoutX,
          y: itemDrag.layout.layoutY,
          // x: itemDrag.layout.layoutX || (this.layout.length * 6) % (this.panelConfig.gridLayoutConfig.colNum || XYNum),
          // y: itemDrag.layout.layoutY || (!(itemDrag.layout.isDraggable && itemDrag.layout.isResizable) ? 0 : this.layout.length + (this.panelConfig.gridLayoutConfig.colNum || XYNum)),
          w: itemDrag.layout.layoutW,
          h: itemDrag.layout.layoutH,
          minW: itemDrag.layout.minW,
          minH: itemDrag.layout.minH,
          maxW: itemDrag.layout.maxW,
          maxH: itemDrag.layout.maxH,
          // 标识栅格元素是否可拖拽。如果值为null则取决于父容器。
          isDraggable: isDraggable,
          // 标识栅格元素是否可调整大小。如果值为null则取决于父容器。
          isResizable: isResizable,
          // 标识栅格元素是否为静态的（无法拖拽、调整大小或被其他元素移动），如果该标记为true, 必须要求有x 和 y 轴
          static: (isDraggable === false && isResizable === false),
          // 是否可移除
          isDelete: itemDrag.layout.isDelete === '1'
        }
        // console.log('x')
        // console.log(itemDrag.layout.layoutX)
        // console.log('y')
        // console.log(itemDrag.layout.layoutY)
        if (itemDrag.layout.layoutX || itemDrag.layout.layoutY) {
          // console.log('x 和 y 有默认值')
          // x 和 y 有默认值
          this.layout.push(newItem)
        } else {
          // console.log('x 和 y 没有默认值')
          const item = JSON.parse(JSON.stringify(newItem))

          // 确定边界
          const Ys = []
          let maxY = 0
          let edgeX = 0
          let edgeY = 0
          this.layout.map(item => {
            // console.log('item.y + item.h')
            // console.log(item.y + item.h)
            Ys.push(item.y + item.h)
          })
          maxY = (Ys.length && Math.max.apply(null, Ys)) || 1
          edgeX = XYNum
          edgeY = maxY

          // 使用二维数组生成地图
          const gridMap = []
          for (let x = 0; x < edgeX; x++) {
            gridMap[x] = []
            for (let y = 0; y < edgeY; y++) {
              gridMap[x][y] = 0
            }
          }
          // console.log('gridMap=')
          // console.log(gridMap)

          // 标记占位
          this.layout.map(item => {
            // 将layout中卡片所占区域标记为1
            for (let x = item.x; x < (item.x + item.w); x++) {
              for (let y = item.y; y < (item.y + item.h); y++) {
                gridMap[x][y] = 1
              }
            }
          })

          // 遍历地图，申请位置
          for (let y = 0; y < edgeY; y++) {
            for (let x = 0; x < edgeX; x++) {
              // 申请所需空间
              if (edgeX - x >= item.w && edgeY - y >= item.h) {
                // console.log('申请所需空间')
                // console.log('edgeX - x')
                // console.log(x)
                // console.log('edgeY - y')
                // console.log(y)
                const itemSignArr = []
                for (let a = x; a < (x + item.w); a++) {
                  for (let b = y; b < (y + item.h); b++) {
                    itemSignArr.push(gridMap[x][y])
                  }
                }
                // console.log(itemSignArr)
                // console.log(x)
                // console.log(y)
                // console.log(itemSignArr.indexOf(1))
                if (itemSignArr.indexOf(1) < 0) {
                  // console.log('x,y')
                  // console.log(x)
                  // console.log(y)
                  newItem.x = x
                  newItem.y = y
                  // console.log('newItem=')
                  // console.log(newItem)
                  this.layout.push(newItem)
                  // console.log(this.layout)
                  return
                }
              }
            }
          }

          // 无满足条件
          // console.log('无满足条件')
          newItem.x = 0
          newItem.y = edgeY + 1

          this.layout.push(newItem)
        }

        // console.log(this.layout)
      } else {
        const json = JSON.parse(JSON.stringify(this.layout[this.activeIndex]))
        json.i = getUUID()
        json.attribute = itemDrag.attribute
        json.itmeData = itemDrag
        this.$set(this.layout, this.activeIndex, json)
      }
    },
    // 组件被点击
    onActive (item, i) {
      if (item) {
        this.activeIndex = i
        this.curEditorItem = JSON.parse(JSON.stringify(item.itmeData))
        // console.log('点击某组件')
        // console.log(this.curEditorItem)
      } else {
        this.curEditorItem = {}
        this.activeIndex = 'null'
      }
    },
    // 编辑组件
    editItem (item, i) {
      // console.log('编辑组件')
      // console.log(item)

      // console.log(this.layout)

      const attribute = JSON.parse(JSON.stringify(item.attribute))

      this.comId = attribute.comId
      this.cardAttribute = attribute
      // 设置步骤
      this.activeIndex = i
      // 关闭设置卡片属性弹窗
      this.showSetCard = true
    },
    // 删除组件
    removeItem (item, i) {
      this.layout.splice(i, 1)
      this.activeIndex = null
    },
    // 重置组件
    resetComponents () {
      // console.log('重置组件')
      this.$confirm('重置将恢复默认模板，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs.EditorHeader.resetLoading = true
        api.wbreset({
          tempId: this.templateId
        }).then(({ data }) => {
          this.$message({
            type: 'success',
            message: '重置工作台成功!'
          })
          // 判断是否有默认模板
          api.wbcheck().then(({ data }) => {
            this.$refs.EditorHeader.resetLoading = false
            if (data) {
              // 有默认模板开始页面初始化
              this.initData()
            } else {
              // 返回模板预览
              this.$router.push({
                path: URLConfig.preview,
                query: {
                  type: 'saveComplete'
                }
              })
            }
          }).catch(() => {
            this.$refs.EditorHeader.resetLoading = false
          })
        }).catch(() => {
          this.$refs.EditorHeader.resetLoading = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置工作台'
        })
      })
    },
    // 保存组件
    saveComponents () {
      // console.log('保存组件')

      const saveArr = []

      this.layout.forEach((item) => {
        saveArr.push({
          // 组件属性
          attribute: {
            comId: item.attribute.comId,
            comName: item.attribute.comName,
            config: JSON.stringify(item.attribute.config)
          },
          // 组件内置字段信息
          layout: {
            comInstId: item.i,
            layoutX: item.x,
            layoutY: item.y,
            layoutW: item.w,
            layoutH: item.h,
            minW: item.minW,
            minH: item.minH,
            maxW: item.maxW,
            maxH: item.maxH,
            // 标识栅格元素是否可拖拽。如果值为null则取决于父容器。
            isDraggable: item.isDraggable ? '1' : '0',
            // 标识栅格元素是否可调整大小。如果值为null则取决于父容器。
            isResizable: item.isResizable ? '1' : '0',
            // 是否可移除
            isDelete: item.isDelete ? '1' : '0'
          }
        })
      })
      // console.log(JSON.stringify(saveArr))
      // console.log(JSON.stringify(this.templateId))

      let isDefTemp = '0' // 是否是默认模板  1 是 0不是

      if (this.pathType === 'edit') {
        if (this.pathKey) {
          isDefTemp = '1' // 是否是默认模板  1 是 0不是
        } else {
          isDefTemp = '0' // 是否是默认模板  1 是 0不是
        }
      } else {
        isDefTemp = '1'
      }

      // 入口类型    workbench 工作台进入    temp 模板进入
      const entranceType = (this.templateId && !this.$route.query.type) ? 'workbench' : 'temp'
      const json = {
        isDefTemp: isDefTemp,
        type: this.pathType, // 操作类型
        componentList: saveArr,
        entranceType: entranceType // 入口类型
      }
      if (this.pathType === 'copy') {
        // 设置要复制的模板id
        json.fromTempId = this.pathCopyKey
      }

      if (this.pathType === 'add' || this.pathType === 'copy') {
        // 设置模板名称
        json.tempName = this.addTempFrom.moduleName
      } else {
        // 模板id
        json.tempId = this.templateId
      }

      // console.log('保存所需参数')
      // console.log(json)

      this.$refs.EditorHeader.saveLoading = true

      api.wbSave(json).then(({ data }) => {
        // this.cardData = data
        this.addTempLoading = false
        this.addTempVisible = false
        this.$refs.EditorHeader.saveLoading = false

        // console.log(data)
        if (json.isDefTemp === '1') {
          // 返回模板管理
          this.$router.push({
            path: URLConfig.template,
            query: {
              type: 'saveComplete'
            }
          })
        } else {
          // 返回模板预览
          this.$router.push({
            path: URLConfig.preview,
            query: {
              type: 'saveComplete'
            }
          })
        }
      }).catch(() => {
        this.addTempLoading = false
        this.$refs.EditorHeader.saveLoading = false
      })
    },
    // 新增/复制提交
    addTempSubmit (val) {
      // console.log('新增/复制提交')
      // console.log()
      this.addTempLoading = true

      this.saveComponents()
    },
    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&& 组件相关操作结束 &&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    // 监听窗口变化
    resize () {
      // const h = document.documentElement.clientHeight || document.body.clientHeight
      // const h = document.documentElement.clientHeight || document.body.clientHeight
      // const h = window.innerHeight
      // // const rowH = Number(h)
      // const tempRowHeight = Number(this.panelConfig.gridLayoutConfig.rowHeight.replace('vh', '')) || 70
      // this.rowHeight = (tempRowHeight * h) / 100
      // // this.rowHeight = rowH / rowHeight
      // const innerH = window.innerHeight - 55 - 100
      let num = 55 + 100
      if (this.zoom === 125) {
        num = -28
      } else if (this.zoom === 150) {
        num = -135
      } else if (this.zoom === 175) {
        num = -200
      } else if (this.zoom === 200) {
        num = -243.5
      }

      const innerH = window.innerHeight - num
      // const innerH = window.innerHeight - 55 - 46 - 4
      // console.log('监听窗口变化' + innerH)
      // console.log(innerH / 11)
      // const innerH = document.getElementById('avue-view').clientHeight

      // const tempRowHeight = Number(this.panelConfig.gridLayoutConfig.rowHeight.replace('vh', '')) || 70
      // this.rowHeight = (innerH - this.panelConfig.gridLayoutConfig[1] * 5) / 11
      this.rowHeight = (innerH / 21)
      // console.log(innerH)
      // console.log('视窗高度' + innerH)
      // console.log(this.rowHeight)
    }
    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&& 组件相关操作结束 &&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  }
}
</script>
<style scoped lang="scss">
@import "../../common/css/variable.scss";
</style>
