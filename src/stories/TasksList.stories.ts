import type { Meta, StoryObj } from '@storybook/vue3'
import TasksList from '../components/TasksList.vue'
import { fn } from '@storybook/test'
import { userEvent, within, expect } from '@storybook/test'

const meta = {
  title: 'TasksList',
  component: TasksList,
  render: (args: any) => ({
    components: { TasksList },
    setup() {
      return { args }
    },
    template: '<tasks-list v-bind="args" />'
  }),

  args: {
    tasks: [],
    onDeleteTask: fn(),
    onShowTask: fn(),
    onToggleTask: fn()
  },
  tags: ['autodocs']
} satisfies Meta<typeof TasksList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tasks: [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description of Task 1',
        isCompleted: false,
        dueDate: new Date()
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description of Task 2',
        isCompleted: false,
        dueDate: (new Date() as any).setDate(new Date().getDate() + 1)
      },
      {
        id: 3,
        title: 'Task 3',
        description: 'Description of Task 3',
        isCompleted: false,
        dueDate: new Date()
      }
    ]
  }
}

export const Empty: Story = {
  args: {
    tasks: []
  }
}

export const EventsAndActions: Story = {
  args: {
    tasks: [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description of Task 1',
        isCompleted: false,
        dueDate: new Date()
      }
    ]
  },
  render: (args: any) => ({
    components: { TasksList },
    setup() {
      return { args }
    },
    template: '<tasks-list v-bind="args" :use-teleport="false"/>'
  }),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    // checkbox
    await userEvent.click(canvas.getAllByRole('checkbox')[0])
    await expect(args.onToggleTask).toHaveBeenCalledWith(1)

    // delete btn
    await userEvent.click(canvas.getByTestId('delete-task-button'))
    await userEvent.click(canvas.getByText('Yes'))
    await expect(args.onDeleteTask).toHaveBeenCalledWith(1)

    // show btn
    await userEvent.click(canvas.getByTestId('task-card'))
    await expect(args.onShowTask).toHaveBeenCalledWith(1)
  }
}
