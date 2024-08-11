<script setup lang="ts">
import { ElDatePicker } from 'element-plus'

export interface Props {
  canSelectPastDates?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  canSelectPastDates: false
})

const shortcuts = [
  {
    text: 'Today',
    value: new Date()
  },
  {
    text: 'Tomorrow',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24)
      return date
    }
  },
  {
    text: 'Next week',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
      return date
    }
  }
]

const disabledDate = (time: Date) => {
  if (props.canSelectPastDates) {
    return false
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return time.getTime() < today.getTime()
}
</script>

<template>
  <el-date-picker
    v-bind="$attrs"
    type="date"
    placeholder="Due date"
    :disabled-date="disabledDate"
    :shortcuts="shortcuts"
  />
</template>
