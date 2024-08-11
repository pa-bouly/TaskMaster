import type { Meta, StoryObj } from '@storybook/vue3'
import FilterButton from '../components/FilterButton.vue'

const meta = {
  title: 'FilterButton',
  component: FilterButton,
  render: (args: any) => ({
    components: { FilterButton },
    setup() {
      return { args }
    },
    template: '<FilterButton v-bind="args" />',
    parameters: {
      layout: 'fullscreen'
    }
  }),

  args: {
    isOpenByDefault: false
  },
  tags: ['autodocs']
} satisfies Meta<typeof FilterButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const Active: Story = {
  args: {
    isOpenByDefault: true
  }
}
