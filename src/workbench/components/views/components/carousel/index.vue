<template>
  <div :class="carouselClasses" @mouseenter.stop="handleMouseEnter" @mouseleave.stop="handleMouseLeave">
    <div class="el-carousel__container" :style="{ height: height }">
      <transition v-if="arrowDisplay" name="carousel-arrow-left">
        <button type="button" v-show="(arrow === 'always' || hover) && (loop || activeIndex > 0)"
          @mouseenter="handleButtonEnter('left')" @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex - 1)" class="el-carousel__arrow el-carousel__arrow--left">
          <i class="el-icon-arrow-left"></i>
        </button>
      </transition>
      <transition v-if="arrowDisplay" name="carousel-arrow-right">
        <button type="button" v-show="(arrow === 'always' || hover) && (loop || activeIndex < items.length - 1)"
          @mouseenter="handleButtonEnter('right')" @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex + 1)" class="el-carousel__arrow el-carousel__arrow--right">
          <i class="el-icon-arrow-right"></i>
        </button>
      </transition>
      <slot></slot>
    </div>
    <ul v-if="indicatorPosition !== 'none'" :class="indicatorsClasses">
      <li v-for="(item, index) in items" :key="index" :class="['el-carousel__indicator', 'el-carousel__indicator--' + direction,
  { 'is-active': index === activeIndex }]" @mouseenter="throttledIndicatorHover(index)"
        @click.stop="handleIndicatorClick(index)">
        <el-tooltip class="item" :content="item.label" placement="top">
          <button class="el-carousel__button" style="height: 4px;">
            <!-- <span v-if="hasLabel">{{ item.label }}</span> -->
          </button>
        </el-tooltip>
      </li>
    </ul>
  </div>
</template>

<script>
import { Carousel } from 'element-ui'
export default {
  name: 'KCarousel',
  extends: Carousel,
  computed: {
    indicatorsClasses () {
      const classes = ['el-carousel__indicators', 'el-carousel__indicators--' + this.direction]
      if (this.indicatorPosition === 'outside' || this.type === 'card') {
        classes.push('el-carousel__indicators--outside')
      }
      return classes
    }
  }
}
</script>
