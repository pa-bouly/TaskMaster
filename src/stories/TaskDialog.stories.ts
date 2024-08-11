import type { Meta, StoryObj } from '@storybook/vue3'
import TaskDialog from '../components/TaskDialog.vue'
import { useTasksStore } from '@/stores/tasks'
import { userEvent, within, expect } from '@storybook/test'

const meta = {
  title: 'TaskDialog',
  component: TaskDialog,
  render: (args: any) => ({
    components: { TaskDialog },
    setup() {
      const store = useTasksStore()
      store.addTask({
        title: 'Task 1',
        description: 'Description of Task 1',
        dueDate: undefined
      })
      store.showTask(1)

      return { args }
    },
    parameters: {
      layout: 'fullscreen'
    },
    template: '<task-dialog />'
  }),

  args: {},
  tags: ['autodocs']
} satisfies Meta<typeof TaskDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const titleUpdate = 'Task title updated'
    const descriptionUpdate = 'Task description updated'

    const checkbox = canvas.getAllByRole('checkbox')[0].getElementsByTagName('input')[0]
    await userEvent.click(checkbox)

    const titleInput = canvas.getByTestId('task-title-input')
    await userEvent.clear(titleInput)
    await userEvent.type(titleInput, titleUpdate)

    const descriptionInput = canvas.getByTestId('task-description-input')
    await userEvent.clear(descriptionInput)
    await userEvent.type(descriptionInput, descriptionUpdate)

    await userEvent.click(canvas.getByTestId('save-task-button'))

    // verify the pinia store
    const store = useTasksStore()
    const task = store.tasks[store.tasks.length - 1]
    expect(task.title).toBe(titleUpdate)
    expect(task.description).toBe(descriptionUpdate)
  }
}

export const CancelForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const titleUpdate = 'Task title updated'

    const titleInput = canvas.getByTestId('task-title-input')
    await userEvent.clear(titleInput)
    await userEvent.type(titleInput, titleUpdate)

    await userEvent.click(canvas.getByTestId('cancel-task-button'))

    // verify the input value
    expect(titleInput).toHaveValue('Task 1')
  }
}
