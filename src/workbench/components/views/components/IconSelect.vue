<!--
 * @Description: 图标名称
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2022-05-09 21:01:45
 * @LastEditTime: 2022-06-20 13:12:14
 * @LastEditors: wuxr
 * @FilePath: \dss-ui\src\components\comps\KWorkbench\views\components\IconSelect.vue
-->
<template>
  <div class="icon-body">
    <el-input
      v-model="name"
      style="position: relative;"
      clearable
      placeholder="请输入图标名称"
      @clear="filterIcons"
      @input.native="filterIcons"
    >
      <i
        slot="suffix"
        class="el-icon-search el-input__icon"
      />
    </el-input>
    <div
      v-if="JSON.stringify(iconList) !== '{}'"
      class="icon-list"
      :class="{ 'icon-list-scroll': Object.keys(iconList).length > 6 }"
    >
      <div
        v-for="(item, key) in iconList"
        :key="key"
        :class="{ 'active': item.name === activeName }"
        @click="selectedIcon(item)"
      >
        <el-image
          style="width: 100%;"
          :src="item.file"
          fit="scale-down"
        />
        <span class="name_img">{{ item.name }}</span>
      </div>
    </div>
    <el-empty
      v-else
      image=" "
      description="暂无匹配结果"
    />
  </div>
</template>

<script>

import { getGenerateImagesLibrary } from '../../config/tools' // 模型默认配置文件
export default {
  name: 'IconSelect',
  components: {
    // SvgIcon
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      activeName: '',
      name: '',
      iconList: getGenerateImagesLibrary
    }
  },
  watch: {
    value: {
      handler (val) {
        if (val !== this.activeName) {
          this.activeName = val
        }
      },
      deep: true
    }
  },
  mounted () {
    if (this.value !== this.activeName) {
      this.activeName = this.value
    }
  },
  methods: {
    iconName (item) {
      return `#${item}`
    },
    filterIcons () {
      this.iconList = getGenerateImagesLibrary
      if (this.name) {
        const json = {}
        for (const key in this.iconList) {
          if (key.includes(this.name)) {
            json[key] = this.iconList[key]
          }
        }
        this.iconList = json
      }
    },
    selectedIcon (item) {
      this.activeName = item.name
      this.$emit('selected', item.name)
      document.body.click()
    },
    reset () {
      this.name = ''
      this.iconList = getGenerateImagesLibrary
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.icon-body {
  width: 100%;
  padding: 10px;

  .el-empty {
    ::v-deep .el-empty__image {
      display: none;
    }
  }

  .icon-list-scroll {
    overflow-y: scroll;
  }

  .icon-list {
    max-height: 250px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 5px;

    &>div {
      line-height: 30px;
      cursor: pointer;
      width: 33.3%;
      text-align: center;
    }

    .el-image {
      border: 2px solid transparent;
    }

    .name_img {
      display: inline-block;
      fill: currentColor;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 90%;
      height: 24px;
      line-height: 24px;
      font-size: 14px;
    }

    .active {
      .el-image {
        border: 2px solid #409eff;
      }

      .name_img {
        color: #409eff;
      }
    }
  }
}
</style>
