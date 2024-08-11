import type { Meta, StoryObj } from '@storybook/vue3'
import TaskDialog from '../components/TaskDialog.vue'
import { useTasksStore } from '@/stores/tasks'

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
