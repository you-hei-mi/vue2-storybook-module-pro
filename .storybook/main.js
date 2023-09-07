/*
 * @Description: 
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2023-09-06 16:37:39
 * @FilePath: \vue2-storybook-module-pro\.storybook\main.js
*/
/** @type { import('@storybook/vue-webpack5').StorybookConfig } */

const path = require('path');

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-scss",
    "@storybook/addon-notes/register"
  ],
  framework: {
    name: "@storybook/vue-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  /**
   * @param {import('webpack').Configuration} config
   *  */
  webpackFinal: async (config, { configType }) => {
    if (!config.resolve) config.resolve = {};
    // this config allows to resolve `view/...` as `src/view/...`
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, '../src'),
    };
    return config;
  },
};
export default config;
