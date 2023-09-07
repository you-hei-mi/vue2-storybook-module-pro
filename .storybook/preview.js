/** @type { import('@storybook/vue').Preview } */
import DocumentationTemplate from './DocumentationTemplate.mdx';

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
        page: DocumentationTemplate,
    },
  },
};

export default preview;
