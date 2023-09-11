<!--
 * @Description: KEmpty 空状态
 * @Version: 1.0
 * @Autor: zou hua
 * @Date: 2022-03-14 16:06:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-09-11 18:48:24
-->
<template>
  <div class="k_empty">
    <template v-if="theme === 'element'">
      <el-empty :image="image" :imageSize="imageSize" :description="description"></el-empty>
    </template>
    <template v-else-if="theme === 'text'">
      <div class="k_empty_box">
        <i class="el-icon-warning-outline"></i>
        {{ description }}
      </div>
    </template>
    <!-- 2023-04-04 新增监控大屏空状态-动态效果 -->
    <template v-else-if="theme ==='animation'">
      <div class="k_empty_nodata">
        <div id="screen-empty">
          <div class="image circle"></div>
          <div class="image outside"></div>
          <div class="image inner"></div>
          <div :class="['text','empty_'+$store.getters.themeName+'_text']">{{ text }}</div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'KEmpty',
  props: {
    /**
     * @description: 呈现风格
     * @param 'default' | 'element' | 'text'
     * @author: zou hua
     */
    theme: {
      type: String,
      default: 'default'
    },
    /**
     * @description: 图片地址
     * @param
     * @author: zou hua
     */
    image: {
      type: String,
      default: ''
    },
    /**
     * @description: 图片大小（宽度）
     * @param
     * @author: zou hua
     */
    imageSize: Number,
    /**
     * @description: 文本描述
     * @param
     * @author: zou hua
     */
    // 2022-09-27 由 当前暂无数据！ 变更为 暂无数据
    description: {
      type: String,
      default: '暂无数据'
    },
    /**
     * @description: 动态图中心文本描述
     * @param 最多4个字，宽度已经写死
     * @author: lxx
     */
    text: {
      type: String,
      default: '等待指令'
    }
  },
}
</script>
<style scoped lang="scss">
.k_empty {
  height: inherit;
  width: 100%;
  position: relative;
  .k_empty_box {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-sizing: border-box;
    padding: 40px 0;
    // color: $--empty-text-color;
    height: inherit;

    .el-icon-warning-outline {
      margin-right: 5px;
      font-size: 16px;
      color: #0C6BD8;
    }
  }

  .k_empty_content {
    padding: 20px 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-sizing: border-box;

    // padding: 40px 0;
    // color: $--empty-text-color;

    ::v-deep .el-empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      padding: 0;

      .el-empty__image {
        height: 50%;
        max-height: 160px;

        img {
          height: 100%;
          // filter: $--k-empty-brightness;
        }
      }

      .el-empty__description {
        margin-top: 0;

        p {
          // margin-block-start: 1em;
          // margin-block-end: 1em;
          line-height: 60px;
          color: #616365;
          font-weight: 500;
        }
      }
    }
  }

  .k_empty_nodata {
    width: 90px;
    height: 90px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -45px;
    margin-left: -45px;
    // 另一种水平垂直居中
    // position: absolute;
    // top: 0;
    // left: 0;
    // bottom: 0;
    // right: 0;
    // margin: auto;
    #screen-empty {
      width: 100%;
      height: 100%;
      position: relative;
      .image {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    //   .circle {
    //     z-index: 0;
    //     animation: rotation 1s linear infinite;
    //     background: url(require('@/assets/icon/screen/empty-circle-blue.png')) no-repeat;
    //     // transform-origin: 50% 50%;
    //     // background: url('../../../../assets/icon/screen/empty-circle-black.png') no-repeat;
    //     background-size: 90px 90px;
    //   }
    //   .outside {
    //     z-index: 1;
    //     animation: rotation 2s ease infinite;
    //     background: url(require('@/assets/icon/screen/empty-outside-blue.png')) no-repeat;
    //     // background: url('../../../../assets/icon/screen/empty-outside-black.png');
    //     background-size: 90px 90px;
    //     // position: absolute;
    //     // top: 0;
    //     // left: 0;
    //   }
    //   .inner {
    //     z-index: 2;
    //     animation: rotationReverse 2s ease infinite;
    //     background: url(require('@/assets/icon/screen/empty-inner-blue.png')) no-repeat;
    //     // background: url('../../../../assets/icon/screen/empty-inner-black.png');
    //     background-size: 90px 90px;
    //     // position: absolute;
    //     // top: 0;
    //     // left: 0;
    //   }
      .text {
        width: auto;
        max-width: 56px;
        overflow: hidden;
        height: 24px;
        line-height: 24px;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        z-index: 3;
        font-weight: 700;
      }
      .empty_theme-red_text {
        color: #fff;
        background: linear-gradient(180deg, #ffffff 0%, #ffc1c1 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .empty_theme-black_text,
      .empty_theme-blue_text {
        color: #fff;
        background: linear-gradient(180deg, #ffffff 0%, #4298e8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  @keyframes rotation {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes rotationReverse {
    0% {
      -webkit-transform: rotate(360deg) scale(0.9);
    }
    100% {
      -webkit-transform: rotate(0deg) scale(0.9);
    }
  }
}
</style>
