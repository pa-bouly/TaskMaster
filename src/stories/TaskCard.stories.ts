import type { Meta, StoryObj } from '@storybook/vue3'
import TaskCard from '../components/TaskCard.vue'
import { fn } from '@storybook/test'
import { userEvent, within, expect } from '@storybook/test'

const meta = {
  title: 'TaskCard',
  component: TaskCard,
  render: (args: any) => ({
    components: { TaskCard },
    setup() {
      return { args }
    },
    template: '<task-card v-bind="args" />'
  }),

  args: {
    task: {
      id: 1,
      title: 'Task 1',
      description: 'Description of Task 1',
      isCompleted: false,
      dueDate: undefined
    },
    useTeleport: false,
    onDeleteTask: fn(),
    onShowTask: fn(),
    onToggleTask: fn()
  },
  tags: ['autodocs']
} satisfies Meta<typeof TaskCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    task: {
      id: 1,
      title: 'Task 1',
      description: 'Description of Task 1',
      isCompleted: false,
      dueDate: new Date()
    }
  }
}

export const Completed: Story = {
  args: {
    task: {
      id: 1,
      title: 'Task 1',
      description: 'Description of Task 1',
      isCompleted: true,
      dueDate: new Date()
    }
  }
}

export const NoDescription: Story = {
  args: {
    task: {
      id: 1,
      title: 'Task 1',
      description: '',
      isCompleted: false,
      dueDate: new Date()
    }
  }
}

export const NoDueDate: Story = {
  args: {
    task: {
      id: 1,
      title: 'Task 1',
      description: 'Description of Task 1',
      isCompleted: false,
      dueDate: undefined
    }
  }
}

export const Overdue: Story = {
  args: {
    task: {
      id: 1,
      title: 'Task 1',
      description: 'Description of Task 1',
      isCompleted: false,
      dueDate: new Date('2021-01-01')
    }
  }
}

export const YesterdayDueDate: Story = {
  args: {
    task: {
      id: 1,
      title: 'Task 1',
      description: 'Description of Task 1',
      isCompleted: false,
      dueDate: (new Date() as any).setDate(new Date().getDate() - 1)
    }
  }
}

export const FutureDueDate: Story = {
  args: {
    task: {
      id: 1,
      title: 'Task 1',
      description: 'Description of Task 1',
      isCompleted: false,
      dueDate: (new Date() as any).setDate(new Date().getDate() + 1)
    }
  }
}

export const ClickToComplete: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getAllByRole('checkbox')[0])
    await expect(args.onToggleTask).toHaveBeenCalledWith(args.task.id)

    expect(canvas.getAllByRole('checkbox')[0]).toHaveClass('is-checked')
  }
}

export const ClickToDelete: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByTestId('delete-task-button'))
    await userEvent.click(canvas.getByText('Yes'))

    await expect(args.onDeleteTask).toHaveBeenCalledWith(args.task.id)
  }
}

export const ClickToShow: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByTestId('task-card'))
    await expect(args.onShowTask).toHaveBeenCalledWith(args.task.id)
  }
}
