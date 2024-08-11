import type { Meta, StoryObj } from '@storybook/vue3'
import NewTaskItem from '../components/NewTaskItem.vue'
import { fn } from '@storybook/test'

const meta = {
  title: 'NewTaskItem',
  component: NewTaskItem,
  render: (args: any) => ({
    components: { NewTaskItem },
    setup() {
      return { args }
    },
    template: '<new-task-item  />'
  }),

  args: {
    onAddTask: fn()
  },
  tags: ['autodocs']
} satisfies Meta<typeof NewTaskItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

// Click on the div to show the form
export const ShowForm: Story = {
  args: {}
}
