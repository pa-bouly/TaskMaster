import type { Meta, StoryObj } from '@storybook/vue3'
import FilterButton from '../components/FilterButton.vue'
import { userEvent, within, expect } from '@storybook/test'

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Open the filter
    await userEvent.click(canvas.getByTestId('show-filters-btn'))

    const completedSwitch = canvas.getByTestId('show-completed-tasks-switch')
    await userEvent.click(completedSwitch)
    expect(completedSwitch).not.toBeChecked()

    // Sort & order
    await userEvent.click(canvas.getByTestId('sort-dropdown'))
    await userEvent.click(canvas.getByTestId('sort-by-due-date'))
    const ascendingBtn = canvas.getByTestId('sort-ascending')
    const descendingBtn = canvas.getByTestId('sort-descending')
    expect(ascendingBtn).toHaveClass('is-active')
    expect(descendingBtn).not.toHaveClass('is-active')

    await userEvent.click(descendingBtn)
    expect(descendingBtn).toHaveClass('is-active')
    expect(ascendingBtn).not.toHaveClass('is-active')

    // Filter by due date
    await userEvent.click(canvas.getAllByLabelText('Due date')[1])
    await userEvent.click(canvas.getAllByText('Today')[0])

    // Reset the filter
    await userEvent.click(canvas.getByTestId('reset-filter-btn'))
    expect(canvas.getByTestId('sort-dropdown')).toHaveTextContent('Manual (default)')
    expect(completedSwitch).not.toBeChecked()
  }
}
