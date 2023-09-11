import MyWorkbench from './index';



// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: '示例/工作台',
  tags: ['autodocs'],
  
  component: MyWorkbench,
  argTypes: {
    backgroundColor: { control: 'color' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { MyWorkbench },
    template: '<my-workbench v-bind="$props" />',
})


// eslint-disable-next-line storybook/prefer-pascal-case
export const 默认 = Template.bind({});
默认.args = {
    primary: true,
    label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
    label: 'Button',
};


export const Large = Template.bind({});
Large.args = {
    size: 'large',
    label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
    size: 'small',
    label: 'Button',
};

