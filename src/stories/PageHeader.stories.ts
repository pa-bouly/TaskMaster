import type { Meta, StoryObj } from '@storybook/vue3'
import PageHeader from '../components/PageHeader.vue'
import { fn } from '@storybook/test'
import { userEvent, within, expect } from '@storybook/test'
import { sleep } from '../../.storybook/helpers'

const meta = {
  title: 'PageHeader',
  component: PageHeader,
  render: (args: any) => ({
    components: { PageHeader },
    setup() {
      return { args }
    },
    template: '<page-header v-bind="args" />'
  }),

  args: {
    onSearch: fn()
  },
  tags: ['autodocs']
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const Search: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.type(canvas.getByTestId('search-input-desktop'), 'test')

    // Wait for the search due to debounce
    await sleep(400)

    await expect(args.onSearch).toHaveBeenCalled()
  }
}
