<!--
 * @Description: 
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2023-09-07 17:21:01
 * @FilePath: \vue2-storybook-module-pro\src\button\button.vue
-->
<template>
    <div>
        <img src="@/_docs/assets/accessibility.png" alt="">
        <button type="button" :class="classes" @click="onClick" :style="style">{{ label }}</button>
    </div>
</template>

<script>
export default {
  name: 'my-button',
  props: {
    label: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
      validator: function (value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      },
    },
    backgroundColor: {
      type: String,
    },
  },

  computed: {
    classes() {
      return {
        'storybook-button': true,
        'storybook-button--primary': this.primary,
        'storybook-button--secondary': !this.primary,
        [`storybook-button--${this.size}`]: true,
      };
    },
    style() {
      return {
        backgroundColor: this.backgroundColor,
      };
    },
  },

  methods: {
    onClick() {
      this.$emit('onClick');
    },
  },
};
</script>
