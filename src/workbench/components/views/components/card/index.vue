<!--
 * @Description: KCard 卡片
 * @Version: 1.0
 * @Autor: zou hua
 * @Date: 2022-03-14 16:06:27
-->
<template>
  <div class="k_card" :class="[shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow', 'theme_' + theme]">
    <div :id="headerId" class="k_card_header" v-if="$slots.header || header">
      <span v-if="theme === 'default' || theme === 'routine'" class="ico_line"></span>
      <div class="k_card_clearfix">
        <span class="k_card_title" v-if="!$slots.header">{{ header }}</span>
        <slot name="header"></slot>
      </div>
    </div>
    <div class="k_card_body" :style="newBodyStyle" :id="bodyId">
      <slot></slot>
    </div>
    <!-- 2022-08-24 扩展页脚，策略平台需要底部定位 走fixed -->
    <div class="k_card_footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
// import elementResizeDetectorMaker from 'element-resize-detector'
import { mapGetters } from 'vuex'
export default {
  name: 'KCard',
  computed: {
    ...mapGetters(['themeName'])
  },
  props: {
    /**
     * @description: pId
     * @param { default / work / routine }
     * @author: zou hua
     */
    pId: {
      type: String,
      default: ''
    },
    /**
     * @description: 主题风格 （做作主题作废此功能）
     * @param { default / work / routine / TH  / second / whole}
     * @author: zou hua
     */
    theme: {
      type: String,
      default: 'default'
    },
    /**
     * @description: 设置 header，也可以通过 slot#header 传入 DOM
     * @author: zou hua
     */
    header: {
      type: String,
      default: ''
    },
    /**
     * @description: 设置 body 的样式
     * @param { padding: '16px' }
     * @author: zou hua
     */
    bodyStyle: {
      type: Object,
      default: () => {
        return { padding: '16px' }
      }
    },
    /**
     * @description: 设置阴影显示时机
     * @param { always / hover / never }
     * @author: zou hua
     */
    shadow: {
      type: String,
      default: 'never'
    }
    /**
     * 监听 body 高度
     * @description:
     * @return {*}
     */
    // watchBodyHeight: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data () {
    return {
      // 主题风格
      // theme: 'routine',
      newBodyStyle: {},
      headerId: '',
      bodyId: '',
      lockBodyHeight: true
    }
  },
  watch: {
    themeName: {
      handler (val) {
        // 改变主题
        this.updateTheme()
      },
      deep: true
    }
  },
  mounted () {
    // 改变主题
    this.updateTheme()
    const UUID = this.getUUID()
    this.headerId = 'card_header_' + UUID
    this.bodyId = this.pId || 'card_body_' + UUID
    // if (this.watchBodyHeight && this.lockBodyHeight) {
    //   this.lockBodyHeight = false
    //   this.$nextTick(() => {
    //     this.watchSize()
    //     window.addEventListener('resize', this.watchSize)
    //   })
    // } else {
    this.$nextTick(() => {
      this.bodyHeight()
    })
    // }
  },
  methods: {
    // 改变主题
    updateTheme () {
      // if (this.themeName === 'theme-black') {
      //   this.theme = 'routine'
      // } if (this.themeName === 'theme-default') {
      //   this.theme = 'default'
      // }
    },
    /**
     * 计算 header 高度
     */
    bodyHeight () {
      // header 高度
      const height = document.getElementById(this.headerId)?.offsetHeight
      const style = {
        height: (!this.$slots.header && this.header === '') ? '100%' : `calc(100% - ${height || 0}px)`,
        ...this.bodyStyle
      }
      this.newBodyStyle = style
    },
    /**
     * 监听元素对象
     */
    // watchSize () {
    //   const _this = this
    //   // console.log('监听元素对象')
    //   const erd = elementResizeDetectorMaker()
    //   if (erd && erd.listenTo && document.getElementById(this.headerId)) {
    //     erd.listenTo(
    //       document.getElementById(this.headerId),
    //       (element) => {
    //         // 这里的this.$refs.fan指定要监听的元素对象，对应的是<div ref="fan"></div>
    //         _this.$nextTick(() => {
    //           // 这里填写监听改变后的操做
    //           // 可以处理一些页面改变的逻辑动作
    //           this.bodyHeight()
    //         })
    //       }
    //     )
    //   }
    // },
    /**
     * 生成UUID
     * @return {*}
     */
    getUUID () {
      // 用于生成uuid
      const S4UUID = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }
      return (S4UUID() + S4UUID() + '-' + S4UUID() + '-' + S4UUID() + '-' + S4UUID() + '-' + S4UUID() + S4UUID() + S4UUID())
    }
  }
  /**
   * 销毁前
   */
  // beforeDestroy () {
  //   // 清空监听元素事件
  //   window.removeEventListener('resize', this.watchSize)
  // },
}
</script>
<style scoped lang="scss">
.k_card {
  // background-color: #fff;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  font-size: 14px;
  height: 100%;

  .k_card_header {
    height: 37px;
    padding: 0 8px;
    border-bottom: 1px solid #ebeef5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    left: 0;
    top: 0;
    color: #4f4f4f;
    font-weight: bold;
    font-size: 14px;

    .k_card_clearfix {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      overflow: hidden;
      max-width: 100%;
      white-space: nowrap;

      .k_card_title {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }

  .k_card_footer {
    height: 37px;
    padding: 0 8px;
    border-top: 1px solid #ebeef5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #4f4f4f;
    font-weight: bold;
    font-size: 14px;
  }
}

.k_card.is-always-shadow {
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
}

.k_card.is-hover-shadow:focus,
.k_card.is-hover-shadow:hover {
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
}

// 主题样式
.k_card,
.k_card.theme_work,
.k_card.theme_second,
.k_card.theme_routine {
  // border: 1px solid #36353A;
  .k_card_header {
    padding: 0 8px;
    background-color: $--border-color-extra-light;
    color: $--color-text-primary;
    border-bottom: 1px solid $--background-color-base;
    font-weight: bold;
  }

  .k_card_body {
    // border: 1px solid #36353A;

    // 2022-08-23 现主题为 #151618，无数据情况下页面显示突兀，是否为必要改成 #151618
    ::v-deep .el-table {
      background-color: $--border-color-extra-light;
    }

    background-color: $--border-color-extra-light;
  }

  .k_card_footer {
    height: 37px;
    padding: 0 8px;
    border-top: 1px solid #000;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #4f4f4f;
    font-weight: bold;
    font-size: 14px;
  }
}

.k_card.theme_second {
  .k_card_header {
    background-color: $--top-tags-bg;
    border-color: $--top-tags-bg;
  }
}

.k_card.theme_routine,
.k_card.theme_work,
.k_card.theme_second,
.k_card.theme_whole {
  background: $--border-color-extra-light;
  color: $--color-text-primary;

  .k_card_clearfix {
    padding-left: 0;
  }
}

.k_card.theme_default,
.k_card.theme_routine {
  .ico_line {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 9px;
    width: 2px;
    height: 12px;
    display: inline-block;
    background: $--k_card-ico-line;
  }

  .k_card_clearfix {
    padding-left: 6px;
  }
}

.k_card.theme_work {
  .k_card_header {
    background-color: #262529;
  }

  .k_card_clearfix {
    padding-left: 0 !important;
  }

  .k_card_footer {
    background-color: $--notice-search-bg;
  }
}

.k_card.theme_second {
  // .k_card_header {
  //   background-color: $--color-black3;
  //   // background-color: #1c1f22;
  //   border-bottom: none;
  //   height: 32px;
  // }

  .k_card_body {
    background-color: $--border-color-extra-light;
    // background-color: #151618;
  }

  .k_card_clearfix {
    padding-left: 0 !important;
  }

  .k_card_footer {
    // background-color: $--color-black3;
    background-color: #1c1f22;
    border-top: none;
    height: 32px;
  }
}

// 2022-09-07 新增整体通透背景 适用场景（个股全景图/评级与预测）
.k_card.theme_whole {
  .k_card_header {
    background-color: $--color-black2;
    border-bottom: none;
    color: $--color-text-primary;
    height: 44px;
  }

  .k_card_body {
    background-color: $--color-black2;
    // background-color: #191a1c;
  }

  .k_card_clearfix {
    padding-left: 0 !important;
  }

  .k_card_footer {
    background-color: #191a1c;
    border-top: none;
    color: rgba(255, 255, 255, 0.85);
    height: 44px;
  }
}
</style>
