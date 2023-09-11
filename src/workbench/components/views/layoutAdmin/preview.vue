<!--
 * @Description: 工作台预览页面
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2022-05-11 17:38:17
 * @LastEditTime: 2023-09-11 18:16:30
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue2-storybook-module-pro\src\workbench\components\views\layoutAdmin\preview.vue
-->
<template>
  <div
    v-loading="loading"
    class="k_workshop preview_workshop"
    :class="'k_workshop__zoom_'+zoom"
  >
    <!-- 中间区域 -->
    <div class="k_workshop_content_box">
      <template v-if="shortcutKey">
        <span
          v-for="(item, index) in shortcutKey"
          :key="index"
          class="shortcut_key_box"
        >
          <span
            v-if="item.show"
            v-shortkey="item.key"
            @shortkey="goWorkEdit()"
          />
        </span>
      </template>
      <div
        id="content"
        v-loading="loading"
        class="content_box"
      >
        <template v-if="layout.length > 0">
          <div class="content_box_bg" />
          <!-- 左右切换按钮 -->
          <div class="layout_carousel_left_arrow">
            <el-button
              class="el-carousel__arrow el-carousel__arrow--right"
              icon="el-icon-arrow-left"
              :class="{ hover: carouselArrow === 'left' }"
              :style="{ display }"
              @click="$refs.carousel.prev()"
            />
          </div>
          <div class="layout_carousel_right_arrow">
            <el-button
              class="el-carousel__arrow el-carousel__arrow--left"
              icon="el-icon-arrow-right"
              :class="{ hover: carouselArrow === 'right' }"
              :style="{ display }"
              @click="$refs.carousel.next()"
            />
          </div>
          <carousel
            ref="carousel"
            trigger="click"
            :initial-index="carouselIndex"
            arrow="never"
            class="layout_carousel"
            :autoplay="false"
            :indicator-position="resList.length === 1 ? 'none' : ''"
            @change="carouselChange"
          >
            <el-carousel-item
              v-for="(item, index) in resList"
              :key="index"
              :label="item.tempName"
            >
              <grid-layout
                v-if="carouselIndex === index"
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
                  :is-draggable="false"
                  :is-resizable="false"
                  :static="item.static"
                  :style="{ 'z-index': (item.itmeData && item.itmeData.componentPack && item.itmeData.componentPack.propsSchema.zIndex) ? item.itmeData.componentPack.propsSchema.zIndex : ((panelConfig && panelConfig.gridLayoutConfig && panelConfig.gridLayoutConfig.zIndexType === 'superposition') ? i : 0) }"
                  :class="{ 'grid-item-active': activeIndex === i }"
                >
                  <template v-if="item.itmeData">
                    <ViewGridLayout
                      :ref="'ViewGridLayout' + i"
                      :is-remove="item.isDelete"
                      :view-data="item.itmeData"
                      :type="item.i"
                      class="ViewGridLayout"
                      :query="1"
                      :class="{ active: activeIndex === i }"
                      @onActive="onActive(item, i)"
                      @search="search(item, i)"
                    />
                  </template>
                </grid-item>
              </grid-layout>
            </el-carousel-item>
          </carousel>
        </template>
        <template v-else>
          <div
            v-if="!loading"
            class="k_workshop_empty"
          >
            <el-empty description="当前无组件，请点击下方按钮或通过快捷键 ctrl + shift + e，跳转到编辑工作台页面进行添加。">
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
              @click="operationFn"
            >
              前往编辑工作台页面
            </el-button>
          </div>
        </template>
      </div>
    </div>
    <!-- 设置卡片属性 -->
    <queryCard
      v-if="showSetCard"
      key="queryCard"
      :com-id="comId"
      :attribute="cardAttribute"
      :visible.sync="showSetCard"
      :view-data="curEditorItem"
      @submitQuery="(data) => { return operationFn2('query', data) }"
      @cancel="operationFn2('cancelEditCard')"
    />
  </div>
</template>
<script>
import ViewGridLayout from '../../components/NestedEditor/ViewGridLayout' // 操作区拖拽组件
import queryCard from '../../components/queryCard' // 设置卡片属性
import { panelConfig, componentData, URLConfig, shortcutKey } from '../../config/tools' // 模型默认配置文件
import { getUUID, detectZoom } from '../../assets/js/utils' // 模型默认配置文件
import { GridLayout, GridItem } from 'vue-grid-layout'
import * as api from '@/api/workbench/index' // 接口
import _ from 'lodash'
import Vue from 'vue'
import Carousel from '../components/carousel'
Vue.use(require('vue-shortkey')) // 快捷键
export default {
  name: 'my-workbench-preview',
  components: {
    ViewGridLayout,
    GridLayout,
    GridItem,
    queryCard,
    Carousel
  },
  data () {
    return {
      // 屏幕缩放比例  处理笔记本系统默认系统比例为125%,150%,175%带来的布局影响
      zoom: detectZoom(),
      // ------------ 页面状态相关代码开始 ------------
      // 加载动画
      loading: true,
      // ------------ 页面状态相关代码结束 ------------
      // ------------ 新增模板相关代码开始 ------------
      // 画布配置
      panelConfig: panelConfig,
      // ------------ 新增模板相关代码结束 ------------
      // 模型数据
      layout: [],
      // 分组列表
      typeList: [],
      // ------------ 组件添加/编辑相关代码结束 ------------
      // --------------------- 快捷键相关代码开始 ---------------------
      shortcutKey: shortcutKey,
      // --------------------- 快捷键相关代码结束 ---------------------
      // ------------ 属性配置开始 ------------
      // 组件属性
      curEditorItem: {},
      // 当前选中下标
      activeIndex: 'null',
      // 鼠标移入下标
      mouseIndex: 'null',
      rowHeight: 70,
      // ------------ 属性配置结束 ------------
      // 组件id
      comId: '',
      // 被编辑组件属性
      cardAttribute: {},
      // 是否显示设置卡片属性弹窗
      showSetCard: false,
      // 显示左右轮播箭头
      carouselArrow: '',
      // 模板列表
      resList: [],
      // 初始状态激活的幻灯片的索引
      carouselIndex: 0,
      // 是否显示模板列表
      display: 'none'
    }
  },
  computed: {

  },
  created () {
    // 监听窗口变化
    let tempRowHeight = this.panelConfig?.gridLayoutConfig?.rowHeight
    // console.log(tempRowHeight)
    // console.log(tempRowHeight)
    if (typeof tempRowHeight === 'string') {
      tempRowHeight = tempRowHeight.replace('px', '')
    }
    if (typeof tempRowHeight === 'string' && tempRowHeight.indexOf('vh') !== -1) {
      // console.log('进来了')
      // console.log(tempRowHeight)
      // console.log(typeof tempRowHeight === 'string' && tempRowHeight.indexOf('vh') !== -1)
      // console.log(typeof tempRowHeight === 'string')
      // console.log(tempRowHeight.indexOf('vh') !== -1)
      this.resize()
      window.onresize = () => {
        return (() => {
          this.resize()
        })()
      }
    } else {
      this.rowHeight = Number(this.panelConfig.gridLayoutConfig.rowHeight)

      // console.log('this.rowHeight')
      // console.log(this.rowHeight)
      // console.log(Number(tempRowHeight))
      // this.rowHeight = Number(tempRowHeight)
    }
    // 页面初始化
    this.initData()
  },
  methods: {
    // 页面初始化
    initData () {

      // 获取模板数据
      this.getLayoutData()
    },
    // 获取模板数据
    getLayoutData () {
      this.loading = true
      this.layout = []
      api.basicInfoListAll(this.pathKey).then(({ data }) => {
        this.loading = false
        // console.log('获取模板数据')
        // const res = [data, data]
        let res = data
        if (!Array.isArray(res) && typeof res === 'object') {
          res = [res]
        }
        this.resList = res.sort((a, b) => {
          return a.sortNum - b.sortNum
        }).map(item => {
          item.tempName = item.tempName.replace('-自定义', '')
          return item
        })
        // res =
        // console.log(res)
        if (res.length) {
          this.carouselChange(0)
          if (res.length > 1) {
            this.$nextTick(() => {
              this.display = 'block'
              const el = this.$refs.carousel.$el
              el.addEventListener('mousemove', this.initCarouselArrow)
            })
          } else {
            this.display = 'none'
          }
        }
        // console.log(this.layout)
      }).catch(() => {
        this.loading = false
      })
    },
    /**
     * 走马灯切换
     */
    carouselChange (index) {
      this.carouselIndex = index
      const layoutArr = []
      const item = this.resList[index]
      // 保存当前工作台走马灯的index
      sessionStorage.setItem('workbenchCarouselIndex', item)
      item.componentList.forEach((itemDrag) => {
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
    /**
     * 初始化走马灯箭头
     */
    initCarouselArrow: _.throttle(function (e) {
      const width = this.$refs.carousel.$el.offsetWidth
      const newW = width * (100 / Number(detectZoom('INIT')))
      const x = e.clientX
      if (x < 300) {
        this.carouselArrow = 'left'
      } else if (x > newW - 300) {
        this.carouselArrow = 'right'
      } else {
        this.carouselArrow = ''
      }
    }, 300
    ),
    // 组件被点击
    onActive (item, i) {
      if (item) {
        this.activeIndex = i
        this.curEditorItem = JSON.parse(JSON.stringify(item.itmeData))
      } else {
        this.curEditorItem = {}
        this.activeIndex = 'null'
      }
    },
    // 添加组件
    operationFn () {
        if(this.$router){
            this.$router.push(URLConfig.edit)
        }
    },
    // 操作方法
    operationFn2 (type, data) {
      if (type === 'query') {
        // ------------------ 查询 ------------------
        // 关闭设置卡片属性弹窗
        this.showSetCard = false
        const config = JSON.parse(JSON.stringify(data.attribute.config))
        this.$set(this.layout[this.activeIndex].attribute, 'config', config)
        this.$refs['ViewGridLayout' + this.activeIndex][0].initData()
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
      }
    },
    // ------------------------------- 快捷键相关逻辑开始 -------------------------------
    goWorkEdit () {
        if(this.$route){
            if (this.$route.path !== this.shortcutKey[0].url) {
              // 前往工作台编辑页面
              this.$router.push(this.shortcutKey[0].url)
            }
        }
    },
    handleKeyUp (e) {
      const key = window.event.keyCode ? window.event.keyCode : window.event.which

      for (let i = 0; i < shortcutKey.length; i++) {
        if (shortcutKey[i].key && shortcutKey[i].key.length > 0) {
          const key0 = Number(shortcutKey[i].key[0])
          const key1 = Number(shortcutKey[i].key[1])
          // 组合按键相关逻辑
          if (key === key0) {
            // 第一次按键
            this.lastCode = JSON.parse(JSON.stringify(key0))
            if (shortcutKey[i].key.length === 1) {
              e.preventDefault()
              this.flag = true
            }
            break
          } else if (key === key1) {
            if (this.lastCode === key0) {
              e.preventDefault()
              this.flag = true
            }
            break
          } else {
            this.lastCode = ''
          }
        }
      }
    },
    // ------------------------------- 快捷键相关逻辑结束 -------------------------------
    // 监听窗口变化
    resize () {
      // const h = document.documentElement.clientHeight || document.body.clientHeight
      // const h = document.documentElement.clientHeight || document.body.clientHeight
      // const innerH = window.innerHeight - 55 - 46 + (18)
      // const innerH = window.innerHeight - 55 - 105

      let num = 155
      if (this.zoom === 125) {
        num = -20
      } else if (this.zoom === 150) {
        num = -127
      } else if (this.zoom === 175) {
        num = -194
      } else if (this.zoom === 200) {
        num = -232
      }

      const innerH = window.innerHeight - num
      // console.log('监听窗口变化' + innerH)
      // console.log(innerH / 11)
      // const minHeight = Number(this.panelConfig.gridLayoutConfig.minHeight.replace('px', '')) || 700
      // const minRowHeight = (minHeight - 55 - 105) / 11
      // // this.rowHeight = (innerH - this.panelConfig.gridLayoutConfig[1] * 5) / 11
      // this.rowHeight = innerH / 11 > minRowHeight ? innerH / 11 : minRowHeight
      this.rowHeight = (innerH / 21)
      // console.log(innerH)
      // console.log('视窗高度' + innerH)
      // console.log(this.rowHeight)
    },
    // ------------------------------- 快捷键相关逻辑结束 -------------------------------
    // 编辑组件
    search (item, i) {
      // console.log('编辑组件')
      // console.log(item)

      // console.log(this.layout)
      this.activeIndex = i
      this.curEditorItem = JSON.parse(JSON.stringify(item.itmeData))
      const attribute = JSON.parse(JSON.stringify(item.attribute))

      this.comId = attribute.comId
      this.cardAttribute = attribute
      // 关闭设置卡片属性弹窗
      this.showSetCard = true
    }
  },
  /**
   * 销毁前
   */
  beforeDestroy () {
    window.removeEventListener('mousemove', this.initCarouselArrow)
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/variable.scss";

.preview_workshop,
.k_workshop {
  margin-top: 0;

  .content_box_bg {
    display: none;
  }

  ::v-deep .content_box {
    position: relative;

    .layout_carousel_left_arrow,
    .layout_carousel_right_arrow {
      z-index: 3;
      width: 0px;
      height: 100%;
      position: absolute;

      .el-button {
        transition: 0.3s;
        opacity: 0;
        border: none;
        outline: 0;
        text-align: center;
        font-size: 12px;
        background-color: #1f2d3d;
        border-radius: 50%;
        color: #fff;
        padding: 0;

        &.hover {
          opacity: 0.75 !important;
        }
      }
    }

    .layout_carousel_right_arrow {
      right: 0;

      .el-carousel__arrow--left {
        left: -55px;
      }
    }

    .layout_carousel_left_arrow {
      left: 0;

      .el-carousel__arrow--right {
        right: -55px;
      }
    }
  }

  .layout_carousel {
    position: absolute;
    height: 100%;
    width: 100%;

    > ::v-deep .el-carousel__indicators {
      .el-carousel__button {
        background-color: $color-primary;
      }
    }

    > ::v-deep .el-carousel__container {
      height: 100%;

      // > .el-carousel__arrow {
      //   background-color: rgba(31, 45, 61, 0);
      //   &::before {
      //     content: "";
      //     display: inline-block;
      //     width: 100%;
      //     height: 100%;
      //     transform: scale(3);
      //   }
      //   &:hover {
      //     background-color: rgba(31, 45, 61, 0.23);
      //   }
      // }
      .el-carousel__item {
        overflow: auto;
      }
    }
  }

  // ::v-deep .view_grid_layout {
  //   .operation_box {
  //     display: none;
  //   }
  // }
  ::v-deep .title-timeslot {
    height: 100%;
    display: flex;
    align-items: center;

    .k_timeslot {
      margin-left: 10px;

      .el-radio.is-bordered + .el-radio.is-bordered {
        margin-left: 5px;
      }

      .k_timeslot_choice {
        display: flex;
        height: 28px;
      }

      .el-radio--mini.is-bordered {
        padding: 0px 15px 0 10px;
        height: 28px;
        line-height: 28px;

        span {
          line-height: 100%;
        }
      }

      .el-input {
        height: 28px;
        display: flex;
      }

      .el-input__inner {
        height: 28px;
        line-height: 28px;
      }

      .el-input__suffix-inner {
        display: block;
        line-height: 28px;
      }

      .el-input__icon {
        line-height: 28px;
      }
    }
  }
}
</style>
