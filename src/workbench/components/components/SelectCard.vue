<!--
 * @Description: 选择卡片
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2022-05-06 12:07:37
 * @LastEditTime: 2022-06-20 13:34:03
 * @LastEditors: wuxr
 * @FilePath: \dss-ui\src\components\comps\KWorkbench\components\SelectCard.vue
-->
<template>
  <el-dialog :close-on-click-modal="false" class="k_workshop_select_card" title="选择组件类型" v-bind="$attrs"
    custom-class="demo-drawer" ref="drawer" @close="closeDrawer" width="608px">
    <div class="drawer_content" v-loading="loading">
      <template v-if="typeList.length > 0">
        <div class="drawer_com">
          <el-input placeholder="搜索组件名称" v-model="keyWord" clearable @input="initData" @change="initData">
          </el-input>
          <el-radio-group v-model="comId">
            <el-tabs tab-position="left">
              <el-tab-pane :label="item.label + ' （' + ((item.comList.length > 99) ? '99+' : item.comList.length) + '）'"
                v-for="(item) in componentsData" :key="item.id">
                <template v-if="item.comList.length > 0">
                  <div v-for="(itemJ) in item.comList" :key="itemJ.comId">
                    <el-radio :label="itemJ.comId">
                      <div class="dashboard-dialog-card-config">
                        <div class="card-type-content">
                          <div class="wrapper">
                            <div class="sample-card">
                              <div class="sample-card-img sample-card-img-recent_projects">
                                <template v-if="iconList[itemJ.comImg] && iconList[itemJ.comImg].file">
                                  <el-image :src="iconList[itemJ.comImg].file" fit="scale-down"></el-image>
                                </template>
                              </div>
                            </div>
                            <div class="intro">
                              <div class="card-title">{{ itemJ.comName }}</div>
                              <div class="card-desc">{{ itemJ.comDesc }}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-radio>
                  </div>
                </template>
                <el-empty v-else image=" " description="暂无匹配结果"></el-empty>
              </el-tab-pane>
            </el-tabs>
          </el-radio-group>
        </div>
        <div class="attribute_form_footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" :disabled="!comId" @click="submit">确定</el-button>
        </div>
      </template>
      <div class="drawer_com_null" v-else>
        <el-empty v-if="!loading" description="暂无数据"></el-empty>
      </div>
    </div>
  </el-dialog>

</template>

<script>
import { getGenerateImagesLibrary } from '../config/tools' // 模型默认配置文件
export default {
  name: 'SelectCard',
  props: {
    /**
     * @description: 组件数据
     * @author: zou hua
     */
    cardData: {
      type: Array,
      require: true,
      default: () => {
        return []
      }
    },
    /**
     * @description: 分类列表
     * @author: zou hua
     */
    typeList: {
      type: Array,
      require: true,
      default: () => {
        return []
      }
    },
    /**
     * @description: 加载动画
     * @author: zou hua
     */
    loading: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    typeList: {
      handler (val) {
        // 初始化数据
        this.initData()
      },
      deep: true
    }
  },
  data () {
    return {
      // 图片库
      iconList: getGenerateImagesLibrary,
      // 关键词
      keyWord: '',
      // 当前选择的组件id
      comId: '',
      // 卡片组
      componentsData: []
    }
  },
  created () {
    // 初始化数据
    this.initData()
  },
  methods: {
    // 初始化数据
    initData (key) {
      if (!key && this.cardData.length > 0) {
        this.comId = this.cardData[0].comId
      }
      // this.componentsData = componentsConfig
      // console.log('初始化数据')
      // console.log(key)

      const componentsData = JSON.parse(JSON.stringify(this.typeList))
      const keyArr = []
      componentsData.forEach((item) => {
        item.comList = []

        this.cardData.forEach((itemJ) => {
          if (item.value === itemJ.comTypeValue) {
            if (key) {
              if (itemJ.comName.indexOf(key) !== -1) {
                item.comList.push(itemJ)
              }
            } else {
              item.comList.push(itemJ)
            }
          }
          // 统计全部
          if (key) {
            if (itemJ.comName.indexOf(key) !== -1) {
              keyArr.push(itemJ)
            }
          }
        })
      })

      componentsData.unshift({
        id: 'all',
        label: '全部',
        comList: key ? [...new Set(keyArr)] : this.cardData
      })
      this.componentsData = componentsData
    },
    // 关闭弹窗
    closeDrawer () {
      this.$emit('update:visible', false)
    },
    // 提交
    submit () {
      // console.log('提交' + this.comId)
      this.$emit('submit', this.comId)
    },
    // 取消
    cancel () {
      // 关闭弹窗
      this.closeDrawer()
    }
  }
}
</script>
<style scoped lang="scss">
@import "../assets/css/variable.scss";

::v-deep .attribute_form_footer {
  text-align: right;
}

.k_workshop_select_card {
  .drawer_com {
    padding: 0 16px;

    .el-radio-group {
      width: 100%;
      padding-top: 16px;
    }
  }

  .drawer_com_null,
  .el-tabs {
    height: 480px;

    .el-empty {
      height: 100%;
    }
  }

  .el-tabs {
    ::v-deep .el-tabs__header {
      width: 164px;
      border-right: 1px solid $border-color-active;

      .el-tabs__nav-scroll {
        .el-tabs__item {
          height: 32px !important;
          line-height: 32px !important;
          text-align: left;
          color: $color-text-base;

          &.is-active {
            background: $--el-menu-bg-active;
            color: $--el-menu-color-active;
          }
        }

        .el-tabs__active-bar {
          display: none;
        }
      }
    }

    ::v-deep .el-tabs__content {
      height: 100%;
    }

    ::v-deep .el-tab-pane {
      height: 100%;
      overflow-y: auto;

      .el-radio {
        width: 100%;

        .el-radio__input {
          display: none;
        }

        .el-radio__label {
          padding: 0;
          background: $background-color-base;

          .intro {
            color: $color-text-third;
            max-width: 252px;
          }
        }
      }

      .el-radio.is-checked {
        background: $background-color-hover;
      }
    }
  }
}
</style>
