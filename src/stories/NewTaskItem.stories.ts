import type { Meta, StoryObj } from '@storybook/vue3'
import NewTaskItem from '../components/NewTaskItem.vue'
import { fn } from '@storybook/test'
import { userEvent, within, expect } from '@storybook/test'
import { sleep } from '../../.storybook/helpers'

const meta = {
  title: 'NewTaskItem',
  component: NewTaskItem,
  render: (args: any) => ({
    components: { NewTaskItem },
    setup() {
      return { args }
    },
    template: '<new-task-item v-bind="args"/>'
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

export const FilledForm: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    // 👇 Simulate interactions with the component
    await userEvent.click(canvas.getByTestId('open-form-button'))

    // Wait for the form to open
    await sleep(1000)

    await userEvent.type(canvas.getByTestId('task-title-input'), 'Task title')
    await userEvent.type(canvas.getByTestId('task-description-input'), 'Task description')

    await userEvent.click(canvas.getByTestId('add-task-button'))
    await expect(args.onAddTask).toHaveBeenCalledWith({
      title: 'Task title',
      description: 'Task description'
    })
  }
}
