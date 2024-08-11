<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Task } from '@/stores/tasks'
import { ElPopconfirm } from 'element-plus'
import { useDateFormat } from '@vueuse/core'
import { Calendar, Delete } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import CheckboxRounded from '@/components/CheckboxRounded.vue'

const props = defineProps<{
  task: Task
}>()

enum DueDateStatus {
  Undefined,
  Expired,
  Yesterday,
  Today,
  Future
}

const emit = defineEmits<{
  (e: 'toggleTask', id: number): void
  (e: 'showTask', id: number): void
  (e: 'deleteTask', id: number): void
}>()

watch(
  () => props.task.isCompleted,
  () => {
    isTaskCompleted.value = props.task.isCompleted
  }
)

watch(
  () => props.task.dueDate,
  () => {
    formattedDueDate.value = props.task.dueDate
      ? useDateFormat(props.task.dueDate, 'YYYY-MM-DD').value
      : ''
  }
)

const isTaskCompleted = ref(props.task.isCompleted)

const formattedDueDate = ref(
  props.task.dueDate ? useDateFormat(props.task.dueDate, 'YYYY-MM-DD').value : ''
)

const dueDateStatus = computed(() => {
  if (!props.task.dueDate) return DueDateStatus.Undefined

  const yesterday = dayjs().subtract(1, 'day')
  const today = dayjs()

  if (dayjs(props.task.dueDate).isSame(yesterday, 'day')) {
    return DueDateStatus.Yesterday
  }
  if (dayjs(props.task.dueDate).isSame(today, 'day')) {
    return DueDateStatus.Today
  }
  if (dayjs(props.task.dueDate).isBefore(yesterday, 'day')) {
    return DueDateStatus.Expired
  }

  return DueDateStatus.Future
})

const dueDateStatusColor = computed(() => {
  switch (dueDateStatus.value) {
    case DueDateStatus.Expired:
      return 'text-red-500'
    case DueDateStatus.Yesterday:
      return 'text-yellow-500'
    case DueDateStatus.Today:
      return 'text-violet-500'
    case DueDateStatus.Future:
      return 'text-green-500'
    default:
      return 'text-gray-500'
  }
})

const dueDateLabel = computed(() => {
  switch (dueDateStatus.value) {
    case DueDateStatus.Yesterday:
      return 'Yesterday'
    case DueDateStatus.Today:
      return 'Today'
    default:
      return useDateFormat(props.task.dueDate, 'YYYY-MM-DD').value
  }
})
</script>

<template>
  <div
    class="flex cursor-pointer space-x-2 rounded border border-slate-100 bg-white p-2 shadow-sm transition hover:border-slate-400"
    @click="() => emit('showTask', task.id)"
  >
    <CheckboxRounded
      v-model="isTaskCompleted"
      size="large"
      @change="() => emit('toggleTask', task.id)"
      @click.stop
    />

    <div class="flex flex-1 flex-col justify-center">
      <div class="font-light">{{ task.title }}</div>
      <div v-if="task.description" class="text-sm font-light text-gray-500">
        {{ task.description }}
      </div>

      <div v-if="props.task.dueDate" class="flex items-center">
        <el-icon class="mr-1"><Calendar :class="dueDateStatusColor" /></el-icon>
        <span :class="[dueDateStatusColor, 'text-sm']">
          {{ dueDateLabel }}
        </span>
      </div>
    </div>

    <div class="flex items-center">
      <el-popconfirm title="Are you sure to delete this?" @confirm="emit('deleteTask', task.id)">
        <template #reference>
          <el-button :icon="Delete" circle @click.stop />
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>
